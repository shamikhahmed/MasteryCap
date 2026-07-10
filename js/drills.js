/* ============================================================
   drills.js — practice drill generators + checkers (P2).
   Seeded params; ±1% numeric tolerance; worked solutions.
   ============================================================ */

const TYPES = [
  'sizing_crypto', 'sizing_forex', 'sizing_futures',
  'options', 'binary', 'r_multiple', 'pip_tick',
];

function mulberry32(a) {
  return function () {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
function round(n, dp = 2) { const f = 10 ** dp; return Math.round(n * f) / f; }
function withinTol(got, want, tol = 0.01) {
  if (!Number.isFinite(got) || !Number.isFinite(want)) return false;
  if (want === 0) return Math.abs(got) < 1e-9;
  return Math.abs(got - want) / Math.abs(want) <= tol;
}

function todayKey() { return new Date().toISOString().slice(0, 10); }

export function drillTypes() { return TYPES.slice(); }

export function typeLabel(type, lang = 'en') {
  const L = {
    sizing_crypto: { en: 'Position sizing · crypto', ur: 'Position sizing · crypto' },
    sizing_forex: { en: 'Position sizing · forex', ur: 'Position sizing · forex' },
    sizing_futures: { en: 'Position sizing · futures', ur: 'Position sizing · futures' },
    options: { en: 'Options risk', ur: 'Options risk' },
    binary: { en: 'Binary breakeven', ur: 'Binary breakeven' },
    r_multiple: { en: 'R-multiples', ur: 'R-multiples' },
    pip_tick: { en: 'Pip / tick value', ur: 'Pip / tick value' },
  };
  return (L[type] && L[type][lang]) || type;
}

/** Generate one drill. seed optional for replay. */
export function generateDrill(type, seed = Date.now() % 1e9) {
  const rng = mulberry32(seed >>> 0);
  const t = type || pick(rng, TYPES);
  const gen = GENERATORS[t];
  const d = gen(rng);
  d.type = t;
  d.seed = seed;
  return d;
}

export function checkAnswer(drill, raw) {
  const n = typeof raw === 'number' ? raw : parseFloat(String(raw).replace(/,/g, ''));
  const ok = withinTol(n, drill.answer, 0.01);
  return { ok, parsed: n, answer: drill.answer, solution: drill.solution };
}

const GENERATORS = {
  sizing_crypto(rng) {
    const balance = pick(rng, [1000, 2500, 5000, 10000]);
    const riskPct = pick(rng, [0.5, 1, 1.5, 2]);
    const entry = pick(rng, [25000, 42000, 65000, 98000]);
    const stopDistPct = pick(rng, [1, 1.5, 2, 2.5, 3]);
    const risk$ = balance * (riskPct / 100);
    const size = risk$ / (stopDistPct / 100);
    return {
      prompt: {
        en: `Balance $${balance}. Risk ${riskPct}%. Stop is ${stopDistPct}% from entry. What position size ($)?`,
        ur: `Balance $${balance}. Risk ${riskPct}%. Stop entry se ${stopDistPct}% door. Position size ($)?`,
      },
      answer: round(size, 2),
      unit: '$',
      solution: {
        en: `Risk $ = ${balance} × ${riskPct}% = $${round(risk$, 2)}. Size = risk $ ÷ stop% = ${round(risk$, 2)} ÷ ${stopDistPct}% = $${round(size, 2)}.`,
        ur: `Risk $ = ${balance} × ${riskPct}% = $${round(risk$, 2)}. Size = risk $ ÷ stop% = $${round(size, 2)}.`,
      },
    };
  },

  sizing_forex(rng) {
    const balance = pick(rng, [2000, 5000, 10000]);
    const riskPct = pick(rng, [0.5, 1, 2]);
    const stopPips = pick(rng, [20, 30, 40, 50]);
    const pipValuePerLot = 10; // standard lot USD pair approx
    const risk$ = balance * (riskPct / 100);
    const lots = risk$ / (stopPips * pipValuePerLot);
    return {
      prompt: {
        en: `Balance $${balance}. Risk ${riskPct}%. Stop ${stopPips} pips. Pip value $10/lot. Lots?`,
        ur: `Balance $${balance}. Risk ${riskPct}%. Stop ${stopPips} pips. Pip value $10/lot. Lots?`,
      },
      answer: round(lots, 2),
      unit: 'lots',
      solution: {
        en: `Risk $ = $${round(risk$, 2)}. Risk per lot = ${stopPips} × $10 = $${stopPips * 10}. Lots = ${round(risk$, 2)} ÷ ${stopPips * 10} = ${round(lots, 2)}.`,
        ur: `Risk $ = $${round(risk$, 2)}. Per lot = ${stopPips}×$10. Lots = ${round(lots, 2)}.`,
      },
    };
  },

  sizing_futures(rng) {
    const balance = pick(rng, [5000, 10000, 25000]);
    const riskPct = pick(rng, [0.5, 1, 1.5]);
    const stopTicks = pick(rng, [8, 10, 12, 16]);
    const tickValue = pick(rng, [5, 10, 12.5]);
    const risk$ = balance * (riskPct / 100);
    const contracts = Math.floor(risk$ / (stopTicks * tickValue));
    const exact = risk$ / (stopTicks * tickValue);
    return {
      prompt: {
        en: `Balance $${balance}. Risk ${riskPct}%. Stop ${stopTicks} ticks × $${tickValue}/tick. Max whole contracts?`,
        ur: `Balance $${balance}. Risk ${riskPct}%. Stop ${stopTicks} ticks × $${tickValue}/tick. Max whole contracts?`,
      },
      answer: contracts,
      unit: 'contracts',
      solution: {
        en: `Risk $ = $${round(risk$, 2)}. Per contract = ${stopTicks}×$${tickValue} = $${stopTicks * tickValue}. Floor(${round(exact, 2)}) = ${contracts}.`,
        ur: `Risk $ = $${round(risk$, 2)}. Per contract = $${stopTicks * tickValue}. Floor = ${contracts}.`,
      },
    };
  },

  options(rng) {
    const mode = pick(rng, ['maxloss', 'breakeven', 'spread']);
    if (mode === 'maxloss') {
      const premium = pick(rng, [1.2, 2.5, 3.8, 5]);
      const mult = 100;
      const maxLoss = premium * mult;
      return {
        prompt: {
          en: `Long 1 call, premium $${premium}. Multiplier 100. Max loss ($)?`,
          ur: `Long 1 call, premium $${premium}. Multiplier 100. Max loss ($)?`,
        },
        answer: round(maxLoss, 2),
        unit: '$',
        solution: {
          en: `Max loss = premium × 100 = ${premium} × 100 = $${round(maxLoss, 2)}.`,
          ur: `Max loss = premium × 100 = $${round(maxLoss, 2)}.`,
        },
      };
    }
    if (mode === 'breakeven') {
      const strike = pick(rng, [100, 150, 200, 250]);
      const premium = pick(rng, [2, 3.5, 5, 7]);
      const be = strike + premium;
      return {
        prompt: {
          en: `Long call strike $${strike}, premium $${premium}. Breakeven price?`,
          ur: `Long call strike $${strike}, premium $${premium}. Breakeven price?`,
        },
        answer: round(be, 2),
        unit: '$',
        solution: {
          en: `Breakeven = strike + premium = ${strike} + ${premium} = $${round(be, 2)}.`,
          ur: `Breakeven = strike + premium = $${round(be, 2)}.`,
        },
      };
    }
    const width = pick(rng, [5, 10]);
    const debit = pick(rng, [1.5, 2.2, 3]);
    const maxLoss = debit * 100;
    const maxGain = (width - debit) * 100;
    const askGain = pick(rng, [true, false]);
    if (askGain) {
      return {
        prompt: {
          en: `Bull call spread: width $${width}, debit $${debit}. Max gain ($)?`,
          ur: `Bull call spread: width $${width}, debit $${debit}. Max gain ($)?`,
        },
        answer: round(maxGain, 2),
        unit: '$',
        solution: {
          en: `Max gain = (width − debit) × 100 = (${width} − ${debit}) × 100 = $${round(maxGain, 2)}.`,
          ur: `Max gain = (width − debit) × 100 = $${round(maxGain, 2)}.`,
        },
      };
    }
    return {
      prompt: {
        en: `Bull call spread: width $${width}, debit $${debit}. Max loss ($)?`,
        ur: `Bull call spread: width $${width}, debit $${debit}. Max loss ($)?`,
      },
      answer: round(maxLoss, 2),
      unit: '$',
      solution: {
        en: `Max loss = debit × 100 = ${debit} × 100 = $${round(maxLoss, 2)}.`,
        ur: `Max loss = debit × 100 = $${round(maxLoss, 2)}.`,
      },
    };
  },

  binary(rng) {
    const payout = pick(rng, [70, 75, 80, 85]);
    // breakeven WR = 1 / (1 + payout/100)
    const wr = 1 / (1 + payout / 100) * 100;
    return {
      prompt: {
        en: `Binary payout ${payout}% on win (stake returned + payout). Breakeven win-rate %?`,
        ur: `Binary payout ${payout}% on win. Breakeven win-rate %?`,
      },
      answer: round(wr, 2),
      unit: '%',
      solution: {
        en: `WR = 1 / (1 + payout/100) = 1 / (1 + ${payout}/100) = ${round(wr, 2)}%.`,
        ur: `WR = 1 / (1 + payout/100) = ${round(wr, 2)}%.`,
      },
    };
  },

  r_multiple(rng) {
    const mode = pick(rng, ['r', 'be_wr']);
    const entry = pick(rng, [100, 50, 200]);
    const stop = entry * (1 - pick(rng, [0.02, 0.03, 0.04]));
    const target = entry * (1 + pick(rng, [0.04, 0.06, 0.09]));
    const risk = entry - stop;
    const reward = target - entry;
    const R = reward / risk;
    if (mode === 'r') {
      return {
        prompt: {
          en: `Entry $${entry}, stop $${round(stop, 2)}, target $${round(target, 2)}. R-multiple?`,
          ur: `Entry $${entry}, stop $${round(stop, 2)}, target $${round(target, 2)}. R-multiple?`,
        },
        answer: round(R, 2),
        unit: 'R',
        solution: {
          en: `Risk = ${entry} − ${round(stop, 2)} = ${round(risk, 2)}. Reward = ${round(reward, 2)}. R = ${round(R, 2)}.`,
          ur: `Risk = ${round(risk, 2)}. Reward = ${round(reward, 2)}. R = ${round(R, 2)}.`,
        },
      };
    }
    const beWr = 1 / (1 + R) * 100;
    return {
      prompt: {
        en: `Your payoff is ${round(R, 2)}R. Win-rate % needed to break even?`,
        ur: `Payoff ${round(R, 2)}R. Breakeven ke liye win-rate %?`,
      },
      answer: round(beWr, 2),
      unit: '%',
      solution: {
        en: `Breakeven WR = 1 / (1 + R) = 1 / (1 + ${round(R, 2)}) = ${round(beWr, 2)}%.`,
        ur: `Breakeven WR = 1 / (1 + R) = ${round(beWr, 2)}%.`,
      },
    };
  },

  pip_tick(rng) {
    if (rng() < 0.5) {
      const lots = pick(rng, [0.1, 0.5, 1, 2]);
      const pips = pick(rng, [15, 25, 40]);
      const pipVal = 10; // per standard lot
      const pl = lots * pips * pipVal;
      return {
        prompt: {
          en: `${lots} lot(s), move ${pips} pips, $10/pip/lot. P/L ($)?`,
          ur: `${lots} lot(s), ${pips} pips, $10/pip/lot. P/L ($)?`,
        },
        answer: round(pl, 2),
        unit: '$',
        solution: {
          en: `P/L = lots × pips × $10 = ${lots} × ${pips} × 10 = $${round(pl, 2)}.`,
          ur: `P/L = ${lots} × ${pips} × 10 = $${round(pl, 2)}.`,
        },
      };
    }
    const contracts = pick(rng, [1, 2, 3]);
    const ticks = pick(rng, [6, 10, 14]);
    const tickVal = pick(rng, [5, 12.5]);
    const pl = contracts * ticks * tickVal;
    return {
      prompt: {
        en: `${contracts} contract(s), ${ticks} ticks, $${tickVal}/tick. P/L ($)?`,
        ur: `${contracts} contract(s), ${ticks} ticks, $${tickVal}/tick. P/L ($)?`,
      },
      answer: round(pl, 2),
      unit: '$',
      solution: {
        en: `P/L = contracts × ticks × tick$ = ${contracts} × ${ticks} × ${tickVal} = $${round(pl, 2)}.`,
        ur: `P/L = ${contracts} × ${ticks} × ${tickVal} = $${round(pl, 2)}.`,
      },
    };
  },
};

/** Award XP into drillStats + course xp bucket. Returns xp granted (0 if capped). */
export function awardDrillXp(store, KEYS, correct) {
  if (!correct) {
    const stats = store.get(KEYS.drillStats, emptyStats());
    stats.attempts = (stats.attempts || 0) + 1;
    store.set(KEYS.drillStats, stats);
    return 0;
  }
  const stats = store.get(KEYS.drillStats, emptyStats());
  const day = todayKey();
  if (stats.xpDay !== day) { stats.xpDay = day; stats.xpToday = 0; }
  const room = Math.max(0, 50 - (stats.xpToday || 0));
  const grant = Math.min(5, room);
  stats.attempts = (stats.attempts || 0) + 1;
  stats.correct = (stats.correct || 0) + 1;
  stats.xpToday = (stats.xpToday || 0) + grant;
  store.set(KEYS.drillStats, stats);
  if (grant > 0) {
    const course = store.get(KEYS.course, {});
    const bucket = course._drills || { placementDone: true, weekStatus: {}, xp: 0 };
    bucket.xp = (bucket.xp || 0) + grant;
    course._drills = bucket;
    store.set(KEYS.course, course);
  }
  return grant;
}

export function recordDrillType(store, KEYS, type, correct) {
  const stats = store.get(KEYS.drillStats, emptyStats());
  if (!stats.byType) stats.byType = {};
  if (!stats.byType[type]) stats.byType[type] = { attempts: 0, correct: 0 };
  stats.byType[type].attempts++;
  if (correct) stats.byType[type].correct++;
  store.set(KEYS.drillStats, stats);
}

export function emptyStats() {
  return { attempts: 0, correct: 0, byType: {}, xpDay: todayKey(), xpToday: 0 };
}

export function getDrillStats(store, KEYS) {
  return store.get(KEYS.drillStats, emptyStats());
}
