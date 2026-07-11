/* ============================================================
   drills.js — practice drill generators + checkers (P2).
   Seeded params; ±1% numeric tolerance; worked solutions.
   ============================================================ */

const TYPES = [
  'sizing_crypto', 'sizing_forex', 'sizing_futures',
  'options', 'binary', 'r_multiple', 'pip_tick',
  'funding_cost', 'liq_distance', 'binary_ev', 'expense_drag',
  'swap_cost', 'carry_cost', 'roll_cost', 'multi_step',
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
    funding_cost: { en: 'Funding cost', ur: 'Funding cost' },
    liq_distance: { en: 'Liq distance', ur: 'Liq distance' },
    binary_ev: { en: 'Binary EV / 100', ur: 'Binary EV / 100' },
    expense_drag: { en: 'Expense-ratio drag', ur: 'Expense-ratio drag' },
    swap_cost: { en: 'FX swap cost', ur: 'FX swap cost' },
    carry_cost: { en: 'Carry cost', ur: 'Carry cost' },
    roll_cost: { en: 'Futures roll', ur: 'Futures roll' },
    multi_step: { en: 'Multi-step sizing', ur: 'Multi-step sizing' },
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

  funding_cost(rng) {
    const notional = pick(rng, [5000, 10000, 20000]);
    const ratePct = pick(rng, [0.01, 0.03, 0.05, 0.1]);
    const days = pick(rng, [3, 7, 14]);
    const cost = notional * (ratePct / 100) * days;
    return {
      prompt: {
        en: `Notional $${notional}. Funding ${ratePct}%/day for ${days} days. Total funding cost ($)?`,
        ur: `Notional $${notional}. Funding ${ratePct}%/din, ${days} din. Total funding cost ($)?`,
      },
      answer: round(cost, 2), unit: '$',
      solution: {
        en: `Cost = ${notional} × ${ratePct}% × ${days} = $${round(cost, 2)}.`,
        ur: `Cost = ${notional} × ${ratePct}% × ${days} = $${round(cost, 2)}.`,
      },
    };
  },

  liq_distance(rng) {
    const lev = pick(rng, [5, 10, 20, 25]);
    const mmr = 0.5; // maintenance approx % of notional as buffer simplification
    const dist = round(100 / lev - mmr, 2);
    return {
      prompt: {
        en: `Isolated ${lev}x. Approx liquidation distance (%) ≈ 100/lev − 0.5. What %?`,
        ur: `Isolated ${lev}x. Approx liq distance (%) ≈ 100/lev − 0.5. Kitna %?`,
      },
      answer: dist, unit: '%',
      solution: {
        en: `100/${lev} − 0.5 = ${round(100 / lev, 2)} − 0.5 = ${dist}%. Rough isolated model — not exchange exact.`,
        ur: `100/${lev} − 0.5 = ${dist}%. Rough model — exchange exact nahi.`,
      },
    };
  },

  binary_ev(rng) {
    const winRate = pick(rng, [45, 50, 52, 55]);
    const payout = pick(rng, [70, 80, 85]);
    const wins = winRate;
    const losses = 100 - winRate;
    const ev = wins * payout - losses * 100;
    return {
      prompt: {
        en: `Win rate ${winRate}%, payout ${payout}%. EV per 100 trades of $1 stake ($)?`,
        ur: `Win rate ${winRate}%, payout ${payout}%. 100 trades × $1 stake pe EV ($)?`,
      },
      answer: round(ev, 2), unit: '$',
      solution: {
        en: `EV = ${wins}×${payout} − ${losses}×100 = ${ev}.`,
        ur: `EV = ${wins}×${payout} − ${losses}×100 = ${ev}.`,
      },
    };
  },

  expense_drag(rng) {
    const start = 10000;
    const gross = pick(rng, [8, 10, 12, 15]);
    const fee = pick(rng, [1, 2, 2.5, 3]);
    const years = pick(rng, [10, 20, 30]);
    const net = gross - fee;
    const endGross = start * ((1 + gross / 100) ** years);
    const endNet = start * ((1 + net / 100) ** years);
    const drag = round(endGross - endNet, 0);
    return {
      prompt: {
        en: `$${start} for ${years}y at ${gross}% gross minus ${fee}% fee. How many $ did fees cost vs gross path?`,
        ur: `$${start}, ${years} saal, ${gross}% gross − ${fee}% fee. Fees ne gross path vs kitne $ khaye?`,
      },
      answer: drag, unit: '$',
      solution: {
        en: `Gross end ≈ $${round(endGross, 0)}. Net end ≈ $${round(endNet, 0)}. Drag = $${drag}.`,
        ur: `Gross ≈ $${round(endGross, 0)}. Net ≈ $${round(endNet, 0)}. Drag = $${drag}.`,
      },
    };
  },

  swap_cost(rng) {
    const lots = pick(rng, [0.5, 1, 2]);
    const swapPts = pick(rng, [-8, -12, -20, 5]);
    const pipVal = 10;
    const nights = pick(rng, [3, 5, 7]);
    const cost = round(lots * swapPts * pipVal * nights, 2);
    return {
      prompt: {
        en: `${lots} lot(s), swap ${swapPts} pts/night, $10/pt, hold ${nights} nights. Total swap P/L ($)?`,
        ur: `${lots} lot(s), swap ${swapPts} pts/night, $10/pt, ${nights} nights. Total swap P/L ($)?`,
      },
      answer: cost, unit: '$',
      solution: {
        en: `P/L = lots × pts × $/pt × nights = ${lots} × ${swapPts} × 10 × ${nights} = $${cost}.`,
        ur: `P/L = ${lots} × ${swapPts} × 10 × ${nights} = $${cost}.`,
      },
    };
  },

  carry_cost(rng) {
    const notional = pick(rng, [10000, 25000, 50000]);
    const rateDiff = pick(rng, [1, 2, 3, 4]);
    const days = pick(rng, [30, 60, 90]);
    const cost = round(notional * (rateDiff / 100) * (days / 365), 2);
    return {
      prompt: {
        en: `Notional $${notional}. Rate differential ${rateDiff}%/yr for ${days} days. Carry cost ($)?`,
        ur: `Notional $${notional}. Rate diff ${rateDiff}%/saal, ${days} din. Carry cost ($)?`,
      },
      answer: cost, unit: '$',
      solution: {
        en: `Carry ≈ notional × rate × days/365 = ${notional} × ${rateDiff}% × ${days}/365 = $${cost}.`,
        ur: `Carry ≈ ${notional} × ${rateDiff}% × ${days}/365 = $${cost}.`,
      },
    };
  },

  roll_cost(rng) {
    const contracts = pick(rng, [1, 2, 5]);
    const front = pick(rng, [100, 105, 110]);
    const back = front + pick(rng, [0.5, 1, 1.5, 2]);
    const mult = pick(rng, [50, 100]);
    const cost = round(contracts * (back - front) * mult, 2);
    return {
      prompt: {
        en: `Roll ${contracts} contract(s): front ${front} → back ${back}, multiplier $${mult}. Roll cost ($)?`,
        ur: `Roll ${contracts} contract(s): front ${front} → back ${back}, mult $${mult}. Roll cost ($)?`,
      },
      answer: cost, unit: '$',
      solution: {
        en: `Cost = contracts × (back − front) × mult = ${contracts} × ${round(back - front, 2)} × ${mult} = $${cost}.`,
        ur: `Cost = ${contracts} × ${round(back - front, 2)} × ${mult} = $${cost}.`,
      },
    };
  },

  multi_step(rng) {
    const balance = pick(rng, [5000, 10000, 20000]);
    const riskPct = pick(rng, [0.5, 1, 1.5]);
    const entry = pick(rng, [100, 200, 500]);
    const stop = round(entry * (1 - pick(rng, [0.02, 0.03, 0.04])), 2);
    const risk$ = balance * (riskPct / 100);
    const stopDist = entry - stop;
    const size = round(risk$ / (stopDist / entry), 2);
    return {
      prompt: {
        en: `Step: (1) risk $ from $${balance} @ ${riskPct}% (2) stop ${stop} under entry ${entry} (3) position size $. What size?`,
        ur: `Steps: (1) $${balance} pe ${riskPct}% risk $ (2) stop ${stop}, entry ${entry} (3) size $. Size?`,
      },
      answer: size, unit: '$',
      steps: 3,
      solution: {
        en: `Risk $ = ${round(risk$, 2)}. Stop dist % = ${round((stopDist / entry) * 100, 2)}%. Size = risk $ ÷ stop% = $${size}.`,
        ur: `Risk $ = ${round(risk$, 2)}. Stop% = ${round((stopDist / entry) * 100, 2)}%. Size = $${size}.`,
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
  return { attempts: 0, correct: 0, byType: {}, xpDay: todayKey(), xpToday: 0, recent: [], timedAttempts: 0, timedCorrect: 0 };
}

export function getDrillStats(store, KEYS) {
  return store.get(KEYS.drillStats, emptyStats());
}

/** Tier I/II/III from last-10 accuracy. */
export function rampTier(store, KEYS) {
  const stats = getDrillStats(store, KEYS);
  const recent = stats.recent || [];
  if (recent.length < 5) return { tier: 1, label: 'I', acc: null };
  const slice = recent.slice(-10);
  const acc = slice.filter(Boolean).length / slice.length;
  if (acc >= 0.8) return { tier: 3, label: 'III', acc };
  if (acc >= 0.55) return { tier: 2, label: 'II', acc };
  return { tier: 1, label: 'I', acc };
}

export function pushRecent(store, KEYS, correct) {
  const stats = getDrillStats(store, KEYS);
  if (!stats.recent) stats.recent = [];
  stats.recent.push(!!correct);
  if (stats.recent.length > 20) stats.recent = stats.recent.slice(-20);
  store.set(KEYS.drillStats, stats);
}

/** Scale numeric ranges by tier (harder = bigger numbers / tighter stops). */
export function generateDrillRamped(type, seed, store, KEYS) {
  const { tier } = rampTier(store, KEYS);
  const d = generateDrill(type, seed);
  d.tier = tier;
  return d;
}
