/* ============================================================
   sim/scenarios.js — scenario packs (crypto + futures + forex + stocks).
   Missions are PROCESS briefs. Pass criteria live in the engine:
   a disciplined losing trade passes; a YOLO winner fails.
   ============================================================ */

const FUT_SPEC = { tickSize: 0.25, tickValue: 12.5, margin: 500 };
const FX_SPEC = { pipSize: 0.0001, pipValue: 10 };

export const SIM_SCENARIOS = [
  /* ---------- CRYPTO / PERP (S1) ---------- */
  {
    id: 'c1_uptrend_pullback', track: 'crypto', instrument: 'perp',
    name: { en: 'Uptrend pullback', ur: 'Uptrend pullback' },
    mission: {
      en: 'Clear uptrend. Long only. Risk ≤ 1%. Stop beyond the last pullback low. Let stop or target end the trade.',
      ur: 'Saaf uptrend. Sirf long. Risk ≤ 1%. Stop pichli pullback low ke paar. Trade stop ya target pe khatam ho.',
    },
    gen: { visible: 40, segments: [ { n: 46, drift: 0.004, vol: 0.008 }, { n: 34, drift: 0.005, vol: 0.009 } ] },
    constraints: { maxRiskPct: 1, dirAllowed: 'long' },
  },
  {
    id: 'c2_downtrend_rally', track: 'crypto', instrument: 'perp',
    name: { en: 'Downtrend rally short', ur: 'Downtrend rally short' },
    mission: {
      en: 'Downtrend. Short only. Risk ≤ 1%. Stop above the rally high. No flipping direction.',
      ur: 'Downtrend. Sirf short. Risk ≤ 1%. Stop rally high ke upar. Direction flip nahi.',
    },
    gen: { visible: 40, segments: [ { n: 44, drift: -0.004, vol: 0.008 }, { n: 36, drift: -0.004, vol: 0.01 } ] },
    constraints: { maxRiskPct: 1, dirAllowed: 'short' },
  },
  {
    id: 'c3_range_patience', track: 'crypto', instrument: 'perp',
    name: { en: 'Range: patience test', ur: 'Range: sabar ka test' },
    mission: {
      en: 'Choppy range. Either direction, but risk ≤ 0.5% and a real stop. Small size in chop IS the lesson — skipping (no trade) also passes.',
      ur: 'Choppy range. Koi bhi direction, magar risk ≤ 0.5% aur asli stop. Chop mein chhota size HI sabaq hai — trade na karna bhi pass hai.',
    },
    gen: { visible: 40, segments: [ { n: 80, drift: 0, vol: 0.006 } ] },
    constraints: { maxRiskPct: 0.5 },
  },
  {
    id: 'c4_stophunt_wick', track: 'crypto', instrument: 'perp',
    name: { en: 'Stop-hunt wick', ur: 'Stop-hunt wick' },
    mission: {
      en: 'Somewhere ahead a violent wick sweeps obvious lows. If long: stop needs ATR room beyond the obvious level (Crypto W7). Risk ≤ 1%.',
      ur: 'Aage kahin zordar wick obvious lows sweep karegi. Long ho to: stop ko obvious level se ATR room chahiye (Crypto W7). Risk ≤ 1%.',
    },
    gen: { visible: 40, segments: [ { n: 46, drift: 0.003, vol: 0.008 }, { n: 34, drift: 0.003, vol: 0.011 } ], stopHunt: true },
    constraints: { maxRiskPct: 1 },
  },
  {
    id: 'c5_leverage_lesson', track: 'crypto', instrument: 'perp',
    name: { en: 'Leverage: liq line lesson', ur: 'Leverage: liq line ka sabaq' },
    mission: {
      en: 'Volatile tape. Enter with a tight stop and watch where the liquidation line lands vs your stop. Stop must sit INSIDE the liq line. Risk ≤ 2%.',
      ur: 'Volatile tape. Tight stop se enter karo aur dekho liquidation line stop ke muqable kahan hai. Stop liq line ke ANDAR ho. Risk ≤ 2%.',
    },
    gen: { visible: 40, segments: [ { n: 40, drift: 0.001, vol: 0.014 }, { n: 40, drift: -0.002, vol: 0.016 } ] },
    constraints: { maxRiskPct: 2 },
  },
  {
    id: 'c6_reversal_trap', track: 'crypto', instrument: 'perp',
    name: { en: 'Trend end / reversal', ur: 'Trend ka anth / reversal' },
    mission: {
      en: 'Uptrend that breaks structure ahead. Either direction. Risk ≤ 1%. If your stop is hit — that is the system working, not failing.',
      ur: 'Uptrend jo aage structure torhega. Koi bhi direction. Risk ≤ 1%. Stop lage to — system kaam kar raha hai, fail nahi hua.',
    },
    gen: { visible: 40, segments: [ { n: 44, drift: 0.004, vol: 0.008 }, { n: 36, drift: -0.006, vol: 0.011 } ] },
    constraints: { maxRiskPct: 1 },
  },
  {
    id: 'c7_hold_winner', track: 'crypto', instrument: 'perp',
    name: { en: 'Hold the winner', ur: 'Winner ko pakro' },
    mission: {
      en: 'Strong trend ahead. Long, risk ≤ 1%, set a take-profit ≥ 2R and DO NOT touch the position. Moving the stop tighter is allowed; widening never.',
      ur: 'Aage strong trend. Long, risk ≤ 1%, take-profit ≥ 2R lagao aur position ko HATH NA lagao. Stop tight karna theek; wide karna kabhi nahi.',
    },
    gen: { visible: 40, segments: [ { n: 42, drift: 0.005, vol: 0.007 }, { n: 38, drift: 0.006, vol: 0.008 } ] },
    constraints: { maxRiskPct: 1, dirAllowed: 'long' },
  },
  {
    id: 'c8_news_gap', track: 'crypto', instrument: 'perp',
    name: { en: 'Violent volatility', ur: 'Zordar volatility' },
    mission: {
      en: 'High-volatility tape with big candles both ways. Risk ≤ 0.5%. Small size in violence — or no trade at all — is professional behavior.',
      ur: 'High-volatility tape, dono taraf bari candles. Risk ≤ 0.5%. Toofan mein chhota size — ya koi trade nahi — professional rawaiya hai.',
    },
    gen: { visible: 40, segments: [ { n: 80, drift: 0, vol: 0.02 } ] },
    constraints: { maxRiskPct: 0.5 },
  },

  /* ---------- FUTURES (S4) — tick / margin discipline ---------- */
  {
    id: 'f1_tick_discipline', track: 'futures', instrument: 'futures', spec: FUT_SPEC,
    name: { en: 'Tick discipline', ur: 'Tick discipline' },
    mission: {
      en: 'ES-style ticks (0.25 / $12.50). Long only. Risk ≤ 1%. Count ticks to stop before you click — size is floor(risk ÷ ticks×tickValue).',
      ur: 'ES-style ticks (0.25 / $12.50). Sirf long. Risk ≤ 1%. Enter se pehle ticks gino — size = floor(risk ÷ ticks×tickValue).',
    },
    gen: { start: 4500, visible: 40, segments: [ { n: 44, drift: 0.0008, vol: 0.002 }, { n: 36, drift: 0.001, vol: 0.0025 } ] },
    constraints: { maxRiskPct: 1, dirAllowed: 'long' },
  },
  {
    id: 'f2_margin_distance', track: 'futures', instrument: 'futures', spec: FUT_SPEC,
    name: { en: 'Margin distance', ur: 'Margin distance' },
    mission: {
      en: 'Watch the liq/margin line vs your stop. Stop must sit inside full-margin wipe. Risk ≤ 1.5%. Short allowed.',
      ur: 'Liq/margin line vs stop dekho. Stop full-margin wipe ke ANDAR. Risk ≤ 1.5%. Short allowed.',
    },
    gen: { start: 4480, visible: 40, segments: [ { n: 40, drift: -0.0005, vol: 0.003 }, { n: 40, drift: 0.0003, vol: 0.0035 } ] },
    constraints: { maxRiskPct: 1.5 },
  },
  {
    id: 'f3_roll_week_vol', track: 'futures', instrument: 'futures', spec: FUT_SPEC,
    name: { en: 'Roll-week volatility', ur: 'Roll-week volatility' },
    mission: {
      en: 'Elevated vol like roll week. Risk ≤ 0.75%. Wide enough stop in TICKS or skip — chop is a teacher.',
      ur: 'Roll week jaisi elevated vol. Risk ≤ 0.75%. Stop ticks mein kaafi wide — ya skip. Chop ustaad hai.',
    },
    gen: { start: 4520, visible: 40, segments: [ { n: 80, drift: 0, vol: 0.006 } ] },
    constraints: { maxRiskPct: 0.75 },
  },
  {
    id: 'f4_size_zero_trap', track: 'futures', instrument: 'futures', spec: FUT_SPEC,
    name: { en: 'Size-zero trap', ur: 'Size-zero trap' },
    mission: {
      en: 'Lesson: risk $ too small for your stop distance → engine rejects with size_zero. Tighten stop OR raise risk % — never invent fractional contracts.',
      ur: 'Sabaq: risk $ stop distance ke liye chhota → size_zero reject. Stop tight karo YA risk % barhao — fractional contracts invent mat karo.',
    },
    gen: { start: 4500, visible: 40, segments: [ { n: 80, drift: 0.0004, vol: 0.002 } ] },
    constraints: { maxRiskPct: 0.25 },
  },
  {
    id: 'f5_trend_day', track: 'futures', instrument: 'futures', spec: FUT_SPEC,
    name: { en: 'Trend day', ur: 'Trend day' },
    mission: {
      en: 'One-way trend day. Long only. Risk ≤ 1%. Let stop or ≥2R target finish it — no mid-trade heroics.',
      ur: 'One-way trend day. Sirf long. Risk ≤ 1%. Stop ya ≥2R target khatam kare — beech mein heroics nahi.',
    },
    gen: { start: 4460, visible: 40, segments: [ { n: 42, drift: 0.0012, vol: 0.002 }, { n: 38, drift: 0.0015, vol: 0.0022 } ] },
    constraints: { maxRiskPct: 1, dirAllowed: 'long' },
  },
  {
    id: 'f6_chop_day', track: 'futures', instrument: 'futures', spec: FUT_SPEC,
    name: { en: 'Chop day', ur: 'Chop day' },
    mission: {
      en: 'Mean-reverting chop. Risk ≤ 0.5%. Process > P/L: a stopped-out plan pass beats a oversized win.',
      ur: 'Mean-reverting chop. Risk ≤ 0.5%. Process > P/L: plan-wala stop-out, oversized win se behtar.',
    },
    gen: { start: 4500, visible: 40, segments: [ { n: 80, drift: 0, vol: 0.0035 } ] },
    constraints: { maxRiskPct: 0.5 },
  },

  /* ---------- FOREX (S4) — pip / session ---------- */
  {
    id: 'x1_session_open', track: 'forex', instrument: 'forex', spec: FX_SPEC,
    name: { en: 'Session open vol', ur: 'Session open vol' },
    mission: {
      en: 'London/NY open style vol. Risk ≤ 1%. Size from pips×pipValue. Stop mandatory in price (pips).',
      ur: 'London/NY open jaisi vol. Risk ≤ 1%. Size pips×pipValue se. Stop price (pips) mein lazmi.',
    },
    gen: { start: 1.085, visible: 40, segments: [ { n: 30, drift: 0.0001, vol: 0.0008 }, { n: 50, drift: 0.00015, vol: 0.0012 } ] },
    constraints: { maxRiskPct: 1 },
  },
  {
    id: 'x2_news_spike', track: 'forex', instrument: 'forex', spec: FX_SPEC,
    name: { en: 'News-spike spread', ur: 'News-spike spread' },
    mission: {
      en: 'Three bars of 4× vol + double slippage simulate spread blowout. Risk ≤ 0.5% or stand aside — that is process.',
      ur: 'Teen bars 4× vol + double slippage = spread blowout. Risk ≤ 0.5% ya side pe raho — yehi process.',
    },
    gen: {
      start: 1.10, visible: 40,
      segments: [
        { n: 42, drift: 0, vol: 0.0006 },
        { n: 3, drift: 0, vol: 0.0024 },
        { n: 35, drift: 0, vol: 0.0007 },
      ],
      slipBoost: { from: 42, n: 3, mult: 2 },
    },
    constraints: { maxRiskPct: 0.5 },
  },
  {
    id: 'x3_carry_hold', track: 'forex', instrument: 'forex', spec: FX_SPEC,
    name: { en: 'Carry hold', ur: 'Carry hold' },
    mission: {
      en: 'Slow drift “carry” tape. Long only. Risk ≤ 1%. Hold with stop — do not widen when bored.',
      ur: 'Slow drift carry tape. Sirf long. Risk ≤ 1%. Stop ke sath hold — boredom pe wide mat karo.',
    },
    gen: { start: 1.092, visible: 40, segments: [ { n: 80, drift: 0.0002, vol: 0.0005 } ] },
    constraints: { maxRiskPct: 1, dirAllowed: 'long' },
  },
  {
    id: 'x4_correlation_note', track: 'forex', instrument: 'forex', spec: FX_SPEC,
    name: { en: 'Correlation note mission', ur: 'Correlation note mission' },
    mission: {
      en: 'Mission is process: one pair, one risk budget. Pretend correlated pairs exist — do NOT stack risk. Risk ≤ 1%.',
      ur: 'Mission process: ek pair, ek risk budget. Correlate pairs hain maan lo — risk stack mat karo. Risk ≤ 1%.',
    },
    gen: { start: 1.078, visible: 40, segments: [ { n: 44, drift: -0.0001, vol: 0.0009 }, { n: 36, drift: 0.0001, vol: 0.0009 } ] },
    constraints: { maxRiskPct: 1 },
  },
  {
    id: 'x5_range_fade', track: 'forex', instrument: 'forex', spec: FX_SPEC,
    name: { en: 'Range fade', ur: 'Range fade' },
    mission: {
      en: 'Range. Fade edges with stop beyond range. Risk ≤ 0.75%. Missed fade = fine; revenge re-entry = fail.',
      ur: 'Range. Edges fade, stop range ke paar. Risk ≤ 0.75%. Miss theek; revenge re-entry = fail.',
    },
    gen: { start: 1.10, visible: 40, segments: [ { n: 80, drift: 0, vol: 0.0007 } ] },
    constraints: { maxRiskPct: 0.75 },
  },
  {
    id: 'x6_trend_pullback', track: 'forex', instrument: 'forex', spec: FX_SPEC,
    name: { en: 'Trend pullback', ur: 'Trend pullback' },
    mission: {
      en: 'Uptrend pullback. Long only. Risk ≤ 1%. Stop under swing; let R play out.',
      ur: 'Uptrend pullback. Sirf long. Risk ≤ 1%. Stop swing ke neeche; R ko khelne do.',
    },
    gen: { start: 1.070, visible: 40, segments: [ { n: 45, drift: 0.00025, vol: 0.0007 }, { n: 35, drift: 0.0003, vol: 0.0008 } ] },
    constraints: { maxRiskPct: 1, dirAllowed: 'long' },
  },

  /* ---------- STOCKS (S4) — shares, no leverage ---------- */
  {
    id: 's1_gap_open', track: 'stocks', instrument: 'stock',
    name: { en: 'Gap open', ur: 'Gap open' },
    mission: {
      en: 'Gap-style open then trend. Long only. Risk ≤ 1%. Shares = floor(risk$ ÷ stop$). No leverage.',
      ur: 'Gap-style open phir trend. Sirf long. Risk ≤ 1%. Shares = floor(risk$ ÷ stop$). No leverage.',
    },
    gen: { start: 48, visible: 40, segments: [ { n: 8, drift: 0.01, vol: 0.012 }, { n: 72, drift: 0.003, vol: 0.008 } ] },
    constraints: { maxRiskPct: 1, dirAllowed: 'long' },
  },
  {
    id: 's2_earnings_vol', track: 'stocks', instrument: 'stock',
    name: { en: 'Earnings-vol proxy', ur: 'Earnings-vol proxy' },
    mission: {
      en: 'Elevated vol proxy for earnings. Risk ≤ 0.5%. Small share count or no trade — process first.',
      ur: 'Earnings jaisi elevated vol. Risk ≤ 0.5%. Kam shares ya no trade — pehle process.',
    },
    gen: { start: 55, visible: 40, segments: [ { n: 80, drift: 0, vol: 0.02 } ] },
    constraints: { maxRiskPct: 0.5 },
  },
  {
    id: 's3_trend_swing', track: 'stocks', instrument: 'stock',
    name: { en: 'Trend swing', ur: 'Trend swing' },
    mission: {
      en: 'Multi-bar swing trend. Long. Risk ≤ 1%. Stop under structure; hold for process, not hope.',
      ur: 'Multi-bar swing trend. Long. Risk ≤ 1%. Stop structure ke neeche; process ke liye hold, umeed ke liye nahi.',
    },
    gen: { start: 42, visible: 40, segments: [ { n: 44, drift: 0.004, vol: 0.007 }, { n: 36, drift: 0.005, vol: 0.008 } ] },
    constraints: { maxRiskPct: 1, dirAllowed: 'long' },
  },
  {
    id: 's4_support_flip', track: 'stocks', instrument: 'stock',
    name: { en: 'Support flip', ur: 'Support flip' },
    mission: {
      en: 'Support that may flip to resistance. Either direction. Risk ≤ 1%. Honor the stop if structure fails.',
      ur: 'Support jo resistance ban sakta. Koi direction. Risk ≤ 1%. Structure fail ho to stop honor karo.',
    },
    gen: { start: 50, visible: 40, segments: [ { n: 40, drift: 0.002, vol: 0.007 }, { n: 40, drift: -0.003, vol: 0.009 } ] },
    constraints: { maxRiskPct: 1 },
  },
  {
    id: 's5_thin_liquidity', track: 'stocks', instrument: 'stock',
    name: { en: 'Thin-liquidity wide slip', ur: 'Thin-liquidity wide slip' },
    mission: {
      en: 'Wide slip window (double slip bars). Risk ≤ 0.5%. Expect worse fills — size down or skip.',
      ur: 'Wide slip window (double slip). Risk ≤ 0.5%. Worse fills expect — size kam ya skip.',
    },
    gen: {
      start: 28, visible: 40,
      segments: [ { n: 45, drift: 0.001, vol: 0.01 }, { n: 35, drift: -0.001, vol: 0.012 } ],
      slipBoost: { from: 40, n: 8, mult: 2 },
    },
    constraints: { maxRiskPct: 0.5 },
  },
  {
    id: 's6_no_leverage_sizing', track: 'stocks', instrument: 'stock',
    name: { en: 'No-leverage sizing', ur: 'No-leverage sizing' },
    mission: {
      en: 'Cash equity only. Risk ≤ 1%. Engine caps shares by balance — that IS the lesson. No borrow.',
      ur: 'Sirf cash equity. Risk ≤ 1%. Engine shares ko balance se cap karta — yehi sabaq. Borrow nahi.',
    },
    gen: { start: 120, visible: 40, segments: [ { n: 80, drift: 0.001, vol: 0.006 } ] },
    constraints: { maxRiskPct: 1, dirAllowed: 'long' },
  },
];

export const SIM_TRACK_ORDER = ['crypto', 'futures', 'forex', 'stocks'];

export const SIM_TRACK_LABEL = {
  crypto: { en: 'Crypto & Perps', ur: 'Crypto & Perps' },
  futures: { en: 'Futures', ur: 'Futures' },
  forex: { en: 'Forex', ur: 'Forex' },
  stocks: { en: 'Stocks', ur: 'Stocks' },
};

export function getScenario(id) {
  return SIM_SCENARIOS.find((s) => s.id === id) || SIM_SCENARIOS[0];
}

export function scenariosByTrack() {
  const map = {};
  for (const sc of SIM_SCENARIOS) {
    (map[sc.track] || (map[sc.track] = [])).push(sc);
  }
  return map;
}
