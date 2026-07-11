/* ============================================================
   sim/scenarios.js — S1 crypto scenario pack.
   Missions are PROCESS briefs. Pass criteria live in the engine:
   a disciplined losing trade passes; a YOLO winner fails.
   ============================================================ */

export const SIM_SCENARIOS = [
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
];

export function getScenario(id) {
  return SIM_SCENARIOS.find((s) => s.id === id) || SIM_SCENARIOS[0];
}
