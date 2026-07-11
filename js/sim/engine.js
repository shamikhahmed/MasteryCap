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
  const start = 100 + rng() * 60;
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

  function openPosition({ dir, entry, riskPct, stop, tp, overRisk }) {
    const stopDist = Math.abs(entry - stop) / entry;
    const riskD = S.balance * (riskPct / 100);
    const sizeD = riskD / stopDist;
    const lev = sizeD / S.balance;
    const liq = (scenario.instrument === 'perp' && lev > 1)
      ? (dir === 'long' ? entry * (1 - 1 / lev + MMR) : entry * (1 + 1 / lev - MMR))
      : null;
    const fee = sizeD * S.feePct;
    S.balance -= fee;
    S.pos = {
      dir, entry, stop, tp, sizeD, lev, liq,
      riskPct, riskD, openedAt: S.i,
      movedStop: 0, funding: 0, fees: fee,
      overRisk,
      stopBeyondLiq: liq !== null && (dir === 'long' ? stop < liq : stop > liq),
      partials: [],
    };
    log('enter', { dir, entry, stop, tp, sizeD, lev, overRisk });
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
    const entry = p * (dir === 'long' ? 1 + S.slipPct : 1 - S.slipPct);
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

  function closeAt(exitPrice, reason) {
    const P = S.pos;
    const gross = (P.dir === 'long' ? exitPrice - P.entry : P.entry - exitPrice) / P.entry * P.sizeD;
    const fee = P.sizeD * S.feePct;
    const pl = gross - fee - P.funding;
    S.balance += pl;
    S.balance -= 0; // fees already netted in pl
    const rDenom = P.riskD || 1;
    const trade = {
      id: Date.now() + Math.floor(Math.random() * 1e4),
      scenarioId: S.scenario.id, seed: S.seed,
      dir: P.dir, entry: P.entry, stop: P.stop, tp: P.tp, exit: exitPrice,
      sizeD: P.sizeD, lev: P.lev, riskPct: P.riskPct,
      pl, r: pl / rDenom, reason,
      movedStop: P.movedStop, overRisk: P.overRisk,
      bars: S.i - P.openedAt,
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
      // funding tick (perp)
      if (S.scenario.instrument === 'perp' && (S.i - P.openedAt) > 0 && (S.i - P.openedAt) % FUNDING_EVERY === 0) {
        const f = P.sizeD * FUNDING_RATE;
        P.funding += f;
        log('funding', { f });
      }
      // conservative fill order: liquidation → stop → tp within the same bar
      if (P.liq !== null && (P.dir === 'long' ? bar.l <= P.liq : bar.h >= P.liq)) {
        closed = closeAt(P.liq, 'liquidated');
      } else if (P.dir === 'long' ? bar.l <= P.stop : bar.h >= P.stop) {
        closed = closeAt(P.stop * (P.dir === 'long' ? 1 - S.slipPct : 1 + S.slipPct), 'stop');
      } else if (P.tp !== null && (P.dir === 'long' ? bar.h >= P.tp : bar.l <= P.tp)) {
        closed = closeAt(P.tp, 'tp');
      }
    }
    if (S.i >= S.bars.length - 1) {
      if (S.pos) closed = closeAt(price(), 'session_end');
      S.pending = null;
      S.done = true;
    }
    return { done: S.done, closed, filled: !!filled };
  }

  function closeManual() {
    if (!S.pos) return { ok: false };
    const exit = price() * (S.pos.dir === 'long' ? 1 - S.slipPct : 1 + S.slipPct);
    return { ok: true, trade: closeAt(exit, 'manual') };
  }

  function unrealized() {
    if (!S.pos) return null;
    const P = S.pos;
    const gross = (P.dir === 'long' ? price() - P.entry : P.entry - price()) / P.entry * P.sizeD;
    return { pl: gross - P.funding, r: (gross - P.funding) / P.riskD };
  }

  return {
    get state() { return S; },
    visible, price, enter, placeLimit, cancelLimit, moveStop, step, closeManual, unrealized,
  };
}
