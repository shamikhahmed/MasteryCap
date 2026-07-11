/* ============================================================
   sim/portfolio.js — Invest/Spot portfolio practice (S5).
   Process = plan adherence. Panic-sell fails even if final value up.
   ============================================================ */

function mulberry32(a) {
  return function () {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Three abstract assets; crash months 8–10 (−30% broad over 3m) then recovery. */
export function buildPortfolioSeries(seed) {
  const rng = mulberry32(seed >>> 0);
  const months = 24;
  const series = { broad: [], single: [], cash: [] };
  let b = 100; let s = 100; let c = 100;
  for (let m = 0; m < months; m++) {
    let db = (rng() - 0.45) * 0.04;
    let ds = (rng() - 0.45) * 0.06;
    const dc = 0.002 + rng() * 0.001; // cash-yield slow grind
    if (m >= 8 && m <= 10) {
      db -= 0.11; // ~−30% over 3 months
      ds -= 0.14;
    } else if (m >= 11 && m <= 16) {
      db += 0.035; // recovery
      ds += 0.04;
    } else if (m === 18) {
      db += 0.08; // euphoria spike
      ds += 0.12;
    }
    b *= 1 + db;
    s *= 1 + ds;
    c *= 1 + dc;
    series.broad.push(+b.toFixed(4));
    series.single.push(+s.toFixed(4));
    series.cash.push(+c.toFixed(4));
  }
  return series;
}

/** Decision event months (0-indexed). */
export const PORTFOLIO_EVENTS = [
  { month: 8, id: 'crash_entry', en: 'Crash begins — markets down hard', ur: 'Crash shuru — markets zordar down' },
  { month: 10, id: 'crash_bottom', en: 'Crash bottom zone — fear peaks', ur: 'Crash bottom — dar peak' },
  { month: 18, id: 'euphoria', en: 'Euphoria spike — everyone feels smart', ur: 'Euphoria spike — sab smart feel' },
  { month: 14, id: 'boring', en: 'Boring stretch — nothing happening', ur: 'Boring stretch — kuch nahi ho raha' },
].sort((a, b) => a.month - b.month);

/**
 * @param {object} plan { alloc:{broad,single,cash}, dca, rebalance:'none'|'quarterly', plannedAdd:boolean }
 */
export function createPortfolioSession({ seed, balance = 10000, plan, track = 'invest' }) {
  const series = buildPortfolioSeries(seed);
  const S = {
    seed, track, plan: normalizePlan(plan),
    series, month: -1,
    cash: balance,
    startCash: balance,
    units: { broad: 0, single: 0, cash: 0 },
    history: [],
    decisions: [],
    violations: [],
    done: false,
    pendingEvent: null,
  };

  function prices() {
    const i = Math.max(0, Math.min(23, S.month < 0 ? 0 : S.month));
    return {
      broad: S.series.broad[i],
      single: S.series.single[i],
      cash: S.series.cash[i],
    };
  }

  function portfolioValue() {
    const p = prices();
    return S.units.broad * p.broad + S.units.single * p.single + S.units.cash * p.cash + S.cash;
  }

  function buyAlloc(dollars) {
    if (dollars <= 0) return;
    const a = S.plan.alloc;
    const p = prices();
    const parts = [
      ['broad', a.broad],
      ['single', a.single],
      ['cash', a.cash],
    ];
    const sum = parts.reduce((s, [, w]) => s + w, 0) || 1;
    for (const [k, w] of parts) {
      const spend = dollars * (w / sum);
      if (spend <= 0) continue;
      S.units[k] += spend / p[k];
      S.cash -= spend;
    }
  }

  function rebalanceIfDue() {
    if (S.plan.rebalance !== 'quarterly') return;
    if (S.month < 0 || S.month % 3 !== 2) return;
    const p = prices();
    const total = portfolioValue();
    if (total <= 0) return;
    const a = S.plan.alloc;
    const sum = a.broad + a.single + a.cash || 1;
    S.cash = 0;
    S.units.broad = (total * (a.broad / sum)) / p.broad;
    S.units.single = (total * (a.single / sum)) / p.single;
    S.units.cash = (total * (a.cash / sum)) / p.cash;
  }

  function eventAt(month) {
    return PORTFOLIO_EVENTS.find((e) => e.month === month) || null;
  }

  /** Advance one month (DCA + mark). May pause for decision event. */
  function step() {
    if (S.done) return { done: true };
    if (S.pendingEvent) return { event: S.pendingEvent };

    S.month += 1;
    if (S.month >= 24) {
      S.done = true;
      return { done: true, debrief: debrief() };
    }

    // monthly DCA from "income" — credited then invested
    S.cash += S.plan.dca;
    buyAlloc(S.plan.dca);
    rebalanceIfDue();

    S.history.push({ month: S.month, value: portfolioValue(), prices: prices() });

    const ev = eventAt(S.month);
    if (ev) {
      S.pendingEvent = ev;
      return { event: ev, month: S.month, value: portfolioValue() };
    }
    return { month: S.month, value: portfolioValue() };
  }

  /**
   * Decision: 'stick' | 'add' | 'sell'
   * Adherence: stick always OK; add OK only if plan.plannedAdd;
   * sell = panic violation always.
   */
  function decide(choice) {
    if (!S.pendingEvent) return { ok: false, err: 'no_event' };
    const ev = S.pendingEvent;
    S.pendingEvent = null;
    let violation = null;
    if (choice === 'sell') {
      // sell 50% of risk assets into cash units
      const p = prices();
      const sellB = S.units.broad * 0.5;
      const sellS = S.units.single * 0.5;
      S.cash += sellB * p.broad + sellS * p.single;
      S.units.broad -= sellB;
      S.units.single -= sellS;
      violation = 'panic_sell';
      S.violations.push({ month: S.month, event: ev.id, kind: 'panic_sell' });
    } else if (choice === 'add') {
      if (!S.plan.plannedAdd) {
        violation = 'unplanned_double';
        S.violations.push({ month: S.month, event: ev.id, kind: 'unplanned_double' });
      }
      // double DCA this month from pocket
      S.cash += S.plan.dca;
      buyAlloc(S.plan.dca);
    }
    // stick: do nothing extra
    S.decisions.push({ month: S.month, event: ev.id, choice, violation });
    return { ok: true, violation, value: portfolioValue() };
  }

  function baselineValue() {
    // Replay with same plan, always stick
    const series = S.series;
    let cash = S.startCash;
    const units = { broad: 0, single: 0, cash: 0 };
    const a = S.plan.alloc;
    const sum = a.broad + a.single + a.cash || 1;
    for (let m = 0; m < 24; m++) {
      cash += S.plan.dca;
      const p = { broad: series.broad[m], single: series.single[m], cash: series.cash[m] };
      const dollars = S.plan.dca;
      for (const [k, w] of [['broad', a.broad], ['single', a.single], ['cash', a.cash]]) {
        const spend = dollars * (w / sum);
        units[k] += spend / p[k];
        cash -= spend;
      }
      if (S.plan.rebalance === 'quarterly' && m % 3 === 2) {
        const total = units.broad * p.broad + units.single * p.single + units.cash * p.cash + cash;
        cash = 0;
        units.broad = (total * (a.broad / sum)) / p.broad;
        units.single = (total * (a.single / sum)) / p.single;
        units.cash = (total * (a.cash / sum)) / p.cash;
      }
    }
    const p = { broad: series.broad[23], single: series.single[23], cash: series.cash[23] };
    return units.broad * p.broad + units.single * p.single + units.cash * p.cash + cash;
  }

  function debrief() {
    const final = portfolioValue();
    const base = baselineValue();
    const pass = S.violations.length === 0;
    return {
      pass,
      fails: S.violations.map((v) => v.kind),
      final,
      baseline: base,
      start: S.startCash,
      decisions: S.decisions,
      process: { pass, fails: S.violations.map((v) => v.kind) },
    };
  }

  return {
    get state() { return S; },
    prices, portfolioValue, step, decide, debrief,
  };
}

function normalizePlan(plan = {}) {
  const alloc = plan.alloc || { broad: 60, single: 20, cash: 20 };
  const sum = (alloc.broad || 0) + (alloc.single || 0) + (alloc.cash || 0) || 100;
  return {
    alloc: {
      broad: (alloc.broad || 0) / sum * 100,
      single: (alloc.single || 0) / sum * 100,
      cash: (alloc.cash || 0) / sum * 100,
    },
    dca: Math.max(0, Number(plan.dca) || 200),
    rebalance: plan.rebalance === 'quarterly' ? 'quarterly' : 'none',
    plannedAdd: !!plan.plannedAdd,
  };
}

export const PORTFOLIO_IDS = {
  invest: 'portfolio_invest',
  spot: 'portfolio_spot',
};
