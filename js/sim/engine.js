/* ============================================================
   sim/engine.js — S1 paper-trading session core.
   Deterministic (seeded), offline. Process-first by design:
   THERE IS NO ENTRY WITHOUT A STOP — the API rejects it.
   ============================================================ */

function mulberry32(a) {
  return function () {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function candle(o, h, l, c) {
  return { o, h: Math.max(h, o, c), l: Math.min(l, o, c), c };
}

function walk(rng, start, n, drift, vol) {
  const out = [];
  let p = start;
  for (let i = 0; i < n; i++) {
    const shock = (rng() - 0.5) * 2 * vol;
    const close = p * (1 + drift + shock);
    const hi = Math.max(p, close) * (1 + rng() * vol * 0.5);
    const lo = Math.min(p, close) * (1 - rng() * vol * 0.5);
    out.push(candle(p, hi, lo, close));
    p = close;
  }
  return out;
}

/* Build the full (visible + hidden future) bar series from a scenario gen config. */
export function buildBars(gen, seed) {
  const rng = mulberry32(seed >>> 0);
  const start = gen.start != null ? gen.start : (100 + rng() * 60);
  const segs = gen.segments || [{ n: gen.bars || 80, drift: gen.drift || 0, vol: gen.vol || 0.008 }];
  let bars = [];
  let p = start;
  for (const s of segs) {
    const leg = walk(rng, p, s.n, s.drift, s.vol);
    bars = bars.concat(leg);
    p = bars[bars.length - 1].c;
  }
  // optional stop-hunt wick injection somewhere in the hidden half
  if (gen.stopHunt) {
    const at = Math.floor(bars.length * 0.6 + rng() * bars.length * 0.2);
    const b = bars[at];
    if (b) bars[at] = candle(b.o, b.h, b.l * (1 - 0.012 - rng() * 0.008), b.c);
  }
  return bars;
}

const MMR = 0.005;        // maintenance margin ratio (simplified)
const FUNDING_EVERY = 8;  // bars between funding ticks (perp mode)
const FUNDING_RATE = 0.0001;

export function createSession({ scenario, seed, balance = 1000, feePct = 0.0005, slipPct = 0.0005 }) {
  const bars = buildBars(scenario.gen, seed);
  const visibleStart = scenario.gen.visible || 40;

  const S = {
    scenario, seed, balance, startBalance: balance,
    feePct, slipPct,
    bars, i: visibleStart - 1,        // index of latest visible bar
    pos: null,                         // open position
    pending: null,                     // limit order awaiting fill
    trades: [],                        // closed trades this session
    events: [],                        // log lines for debrief
    done: false,
  };

  const price = () => S.bars[S.i].c;
  const visible = () => S.bars.slice(0, S.i + 1);

  function log(type, data = {}) { S.events.push({ type, bar: S.i, ...data }); }

  /** Optional gen.slipBoost: { from, n, mult } — news-spike double slippage window. */
  function currentSlip() {
    const boost = scenario.gen?.slipBoost;
    if (boost && S.i >= boost.from && S.i < boost.from + (boost.n || 3)) {
      return S.slipPct * (boost.mult || 2);
    }
    return S.slipPct;
  }

  function validateStopSide(dir, refPrice, stop, tp) {
    if (!(stop > 0)) return 'stop_required';
    if (dir === 'long' && stop >= refPrice) return 'stop_side';
    if (dir === 'short' && stop <= refPrice) return 'stop_side';
    if (tp !== null && tp !== undefined && !Number.isNaN(tp)) {
      if (dir === 'long' && tp <= refPrice) return 'tp_side';
      if (dir === 'short' && tp >= refPrice) return 'tp_side';
    }
    return null;
  }

  function pnlGross(P, exitPrice, sizeFrac = 1) {
    const inst = scenario.instrument || 'perp';
    const qty = (P.qty != null ? P.qty : 1) * sizeFrac;
    if (inst === 'futures') {
      const ticks = (exitPrice - P.entry) / P.tickSize;
      const signed = P.dir === 'long' ? ticks : -ticks;
      return signed * P.tickValue * qty;
    }
    if (inst === 'forex') {
      const pips = (exitPrice - P.entry) / P.pipSize;
      const signed = P.dir === 'long' ? pips : -pips;
      return signed * P.pipValue * qty;
    }
    if (inst === 'stock') {
      const signed = P.dir === 'long' ? (exitPrice - P.entry) : (P.entry - exitPrice);
      return signed * qty;
    }
    // perp: sizeD is notional; option premium proxy uses same % move on sizeD
    return (P.dir === 'long' ? exitPrice - P.entry : P.entry - exitPrice) / P.entry * (P.sizeD * sizeFrac);
  }

  function openPosition({ dir, entry, riskPct, stop, tp, overRisk }) {
    const inst = scenario.instrument || 'perp';
    const riskD = S.balance * (riskPct / 100);
    let sizeD;
    let lev;
    let liq = null;
    let qty = null;
    let tickSize; let tickValue; let margin;
    let pipSize; let pipValue;

    if (inst === 'futures') {
      const spec = scenario.spec || {};
      tickSize = spec.tickSize || 0.25;
      tickValue = spec.tickValue || 12.5;
      margin = spec.margin || 1000;
      const ticksToStop = Math.max(1, Math.round(Math.abs(entry - stop) / tickSize));
      const contracts = Math.floor(riskD / (ticksToStop * tickValue));
      if (contracts < 1) return { ok: false, err: 'size_zero' };
      qty = contracts;
      sizeD = contracts * margin; // margin capital at risk / fee base
      lev = sizeD / S.balance;
      const ticksToLiq = margin / tickValue;
      liq = dir === 'long'
        ? entry - ticksToLiq * tickSize
        : entry + ticksToLiq * tickSize;
    } else if (inst === 'forex') {
      const spec = scenario.spec || {};
      pipSize = spec.pipSize || 0.0001;
      pipValue = spec.pipValue || 10; // $ per pip per 1.0 lot
      const pipsToStop = Math.abs(entry - stop) / pipSize;
      if (!(pipsToStop > 0)) return { ok: false, err: 'stop_side' };
      let lots = riskD / (pipsToStop * pipValue);
      lots = Math.floor(lots * 100) / 100; // 0.01 lot steps
      if (lots < 0.01) return { ok: false, err: 'size_zero' };
      qty = lots;
      sizeD = lots * pipValue * 100; // fee / display notional proxy
      lev = sizeD / S.balance;
      liq = null; // margin-stop only — no liq
    } else if (inst === 'stock') {
      const stopDist = Math.abs(entry - stop);
      if (!(stopDist > 0)) return { ok: false, err: 'stop_side' };
      let shares = Math.floor(riskD / stopDist);
      if (shares < 1) return { ok: false, err: 'size_zero' };
      // no leverage: cannot buy more than balance allows
      const maxShares = Math.floor(S.balance / entry);
      if (maxShares < 1) return { ok: false, err: 'size_zero' };
      shares = Math.min(shares, maxShares);
      qty = shares;
      sizeD = shares * entry;
      lev = 1;
      liq = null;
    } else if (inst === 'option') {
      // Long-premium literacy proxy: size from stop distance; extrinsic burns via thetaPerBar.
      const stopDist = Math.abs(entry - stop) / entry;
      if (!(stopDist > 0)) return { ok: false, err: 'stop_side' };
      sizeD = riskD / stopDist;
      lev = sizeD / S.balance;
      liq = null;
      qty = sizeD;
    } else {
      // perp (default)
      const stopDist = Math.abs(entry - stop) / entry;
      if (!(stopDist > 0)) return { ok: false, err: 'stop_side' };
      sizeD = riskD / stopDist;
      lev = sizeD / S.balance;
      liq = (lev > 1)
        ? (dir === 'long' ? entry * (1 - 1 / lev + MMR) : entry * (1 + 1 / lev - MMR))
        : null;
      qty = sizeD; // treat notional as qty for partial frac
    }

    const fee = sizeD * S.feePct;
    S.balance -= fee;
    const thetaPct = (inst === 'option') ? (scenario.spec?.thetaPct ?? 0.003) : 0;
    S.pos = {
      dir, entry, stop, tp, sizeD, lev, liq, qty,
      tickSize, tickValue, margin, pipSize, pipValue,
      riskPct, riskD, openedAt: S.i,
      movedStop: 0, funding: 0, fees: fee,
      thetaPerBar: thetaPct ? sizeD * thetaPct : 0,
      overRisk,
      stopBeyondLiq: liq !== null && (dir === 'long' ? stop < liq : stop > liq),
      partials: [],
      instrument: inst,
    };
    log('enter', { dir, entry, stop, tp, sizeD, lev, qty, overRisk, instrument: inst });
    return { ok: true, pos: S.pos };
  }

  /* ---- entry: stop is REQUIRED and validated. No stop, no trade. ---- */
  function enter({ dir, riskPct, stop, tp = null }) {
    if (S.pos) return { ok: false, err: 'position_open' };
    if (S.pending) return { ok: false, err: 'pending_open' };
    if (S.done) return { ok: false, err: 'session_over' };
    if (dir !== 'long' && dir !== 'short') return { ok: false, err: 'bad_dir' };
    const p = price();
    const sideErr = validateStopSide(dir, p, stop, tp);
    if (sideErr) return { ok: false, err: sideErr };
    const cap = scenario.constraints?.maxRiskPct ?? 2;
    const rp = Math.min(Math.max(riskPct || 1, 0.1), 100);
    const overRisk = rp > cap;
    if (scenario.constraints?.dirAllowed && scenario.constraints.dirAllowed !== dir) {
      log('violation', { kind: 'direction' });
    }
    const entry = p * (dir === 'long' ? 1 + currentSlip() : 1 - currentSlip());
    return openPosition({ dir, entry, riskPct: rp, stop, tp, overRisk });
  }

  /** Limit order: stop validated vs LIMIT price (not mark). Fills when bar range touches. */
  function placeLimit({ dir, price: limitPx, riskPct, stop, tp = null }) {
    if (S.pos) return { ok: false, err: 'position_open' };
    if (S.pending) return { ok: false, err: 'pending_open' };
    if (S.done) return { ok: false, err: 'session_over' };
    if (dir !== 'long' && dir !== 'short') return { ok: false, err: 'bad_dir' };
    if (!(limitPx > 0)) return { ok: false, err: 'limit_price' };
    const sideErr = validateStopSide(dir, limitPx, stop, tp);
    if (sideErr) return { ok: false, err: sideErr };
    const cap = scenario.constraints?.maxRiskPct ?? 2;
    const rp = Math.min(Math.max(riskPct || 1, 0.1), 100);
    const overRisk = rp > cap;
    if (scenario.constraints?.dirAllowed && scenario.constraints.dirAllowed !== dir) {
      log('violation', { kind: 'direction' });
    }
    S.pending = {
      dir, price: limitPx, stop, tp: tp ?? null,
      riskPct: rp, overRisk,
      placedAt: S.i,
    };
    log('limit_place', { dir, price: limitPx, stop, tp });
    return { ok: true, pending: S.pending };
  }

  function cancelLimit() {
    if (!S.pending) return { ok: false, err: 'no_pending' };
    log('limit_cancel', {});
    S.pending = null;
    return { ok: true };
  }

  function tryFillLimit(bar) {
    const L = S.pending;
    if (!L || S.pos) return null;
    const hit = L.dir === 'long' ? bar.l <= L.price : bar.h >= L.price;
    if (!hit) return null;
    const entry = L.price; // fill at limit
    const r = openPosition({
      dir: L.dir, entry, riskPct: L.riskPct, stop: L.stop, tp: L.tp, overRisk: L.overRisk,
    });
    if (!r.ok) {
      log('limit_reject', { err: r.err });
      return r;
    }
    S.pending = null;
    log('limit_fill', { price: entry });
    return r;
  }

  function moveStop(newStop) {
    if (!S.pos) return { ok: false, err: 'no_pos' };
    const p = price();
    if (S.pos.dir === 'long' && newStop >= p) return { ok: false, err: 'stop_side' };
    if (S.pos.dir === 'short' && newStop <= p) return { ok: false, err: 'stop_side' };
    // widening the stop = increasing risk beyond plan → violation; tightening is fine
    const widened = S.pos.dir === 'long' ? newStop < S.pos.stop : newStop > S.pos.stop;
    S.pos.movedStop++;
    if (widened) log('violation', { kind: 'widened_stop' });
    else log('moved_stop_tighter', {});
    S.pos.stop = newStop;
    return { ok: true, widened };
  }

  /** Realize `fraction` of size at mark±slip+fee; keep remainder + same stop. R uses original riskD. */
  function closePartial(fraction) {
    if (!S.pos) return { ok: false, err: 'no_pos' };
    if (S.done) return { ok: false, err: 'session_over' };
    const f = Number(fraction);
    if (!(f > 0 && f < 1)) return { ok: false, err: 'bad_fraction' };
    const P = S.pos;
    const exitPrice = price() * (P.dir === 'long' ? 1 - currentSlip() : 1 + currentSlip());
    const closeSize = P.sizeD * f;
    const gross = pnlGross(P, exitPrice, f);
    const fee = closeSize * S.feePct;
    const fundShare = P.funding * f;
    const pl = gross - fee - fundShare;
    S.balance += pl;
    P.partials.push({ price: exitPrice, fraction: f, pl });
    P.sizeD -= closeSize;
    if (P.qty != null) P.qty = P.qty * (1 - f);
    P.funding -= fundShare;
    P.fees = (P.fees || 0) + fee;
    log('partial', { fraction: f, exitPrice, pl, remaining: P.sizeD });
    return { ok: true, pl, remaining: P.sizeD };
  }

  function closeAt(exitPrice, reason) {
    const P = S.pos;
    const gross = pnlGross(P, exitPrice, 1);
    const fee = P.sizeD * S.feePct;
    const plRemain = gross - fee - P.funding;
    S.balance += plRemain;
    const partialPl = (P.partials || []).reduce((s, x) => s + x.pl, 0);
    const pl = plRemain + partialPl;
    const rDenom = P.riskD || 1;
    const trade = {
      id: Date.now() + Math.floor(Math.random() * 1e4),
      scenarioId: S.scenario.id, seed: S.seed,
      dir: P.dir, entry: P.entry, stop: P.stop, tp: P.tp, exit: exitPrice,
      sizeD: P.sizeD, lev: P.lev, riskPct: P.riskPct, qty: P.qty,
      pl, r: pl / rDenom, reason,
      movedStop: P.movedStop, overRisk: P.overRisk,
      bars: S.i - P.openedAt,
      partials: P.partials || [],
      instrument: P.instrument || scenario.instrument || 'perp',
      process: processScore(P, reason),
    };
    S.trades.push(trade);
    log('exit', { reason, exitPrice, pl });
    S.pos = null;
    return trade;
  }

  /* process pass/fail — P/L plays NO part in this */
  function processScore(P, reason) {
    const fails = [];
    if (P.overRisk) fails.push('over_risk');
    if (S.events.some((e) => e.type === 'violation' && e.kind === 'widened_stop' && e.bar >= P.openedAt)) fails.push('widened_stop');
    if (S.events.some((e) => e.type === 'violation' && e.kind === 'direction' && e.bar === P.openedAt)) fails.push('direction');
    if (reason === 'liquidated') fails.push('liquidated');
    if (P.stopBeyondLiq) fails.push('stop_beyond_liq');
    return { pass: fails.length === 0, fails };
  }

  function step() {
    if (S.done) return { done: true };
    if (S.i >= S.bars.length - 1) { S.done = true; return { done: true }; }
    S.i++;
    const bar = S.bars[S.i];
    let closed = null;
    let filled = null;

    if (S.pending && !S.pos) {
      filled = tryFillLimit(bar);
    }

    if (S.pos) {
      const P = S.pos;
      const inst = P.instrument || S.scenario.instrument || 'perp';
      // option theta burn (extrinsic) — stored on funding field for P/L
      if (inst === 'option' && P.thetaPerBar > 0) {
        P.funding += P.thetaPerBar;
        log('theta', { f: P.thetaPerBar });
      } else if (inst === 'perp' && (S.i - P.openedAt) > 0 && (S.i - P.openedAt) % FUNDING_EVERY === 0) {
        const rate = S.scenario.gen?.fundingRate ?? FUNDING_RATE;
        let f = P.sizeD * rate;
        if (S.scenario.gen?.fundingLongPays) {
          f = P.dir === 'long' ? Math.abs(f) : -Math.abs(f) * 0.25;
        }
        P.funding += f;
        log('funding', { f });
      }
      // conservative fill order: liquidation → stop → tp within the same bar
      if (P.liq !== null && (P.dir === 'long' ? bar.l <= P.liq : bar.h >= P.liq)) {
        closed = closeAt(P.liq, 'liquidated');
      } else if (P.dir === 'long' ? bar.l <= P.stop : bar.h >= P.stop) {
        closed = closeAt(P.stop * (P.dir === 'long' ? 1 - currentSlip() : 1 + currentSlip()), 'stop');
      } else if (P.tp !== null && (P.dir === 'long' ? bar.h >= P.tp : bar.l <= P.tp)) {
        closed = closeAt(P.tp, 'tp');
      }
    }
    if (S.i >= S.bars.length - 1) {
      if (S.pos) closed = closeAt(price(), 'session_end');
      if (S.pending) {
        log('limit_expired', { price: S.pending.price, dir: S.pending.dir });
        S.pending = null;
      }
      S.done = true;
    }
    return { done: S.done, closed, filled: !!filled };
  }

  function closeManual() {
    if (!S.pos) return { ok: false };
    const exit = price() * (S.pos.dir === 'long' ? 1 - currentSlip() : 1 + currentSlip());
    return { ok: true, trade: closeAt(exit, 'manual') };
  }

  function unrealized() {
    if (!S.pos) return null;
    const P = S.pos;
    const gross = pnlGross(P, price(), 1);
    return { pl: gross - P.funding, r: (gross - P.funding) / P.riskD };
  }

  return {
    get state() { return S; },
    visible, price, enter, placeLimit, cancelLimit, moveStop, step, closeManual, closePartial, unrealized,
  };
}
