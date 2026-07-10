/* ============================================================
   insights.js — pure journal analytics (P3).
   Each insight requires n ≥ 3 trades in its slice.
   ============================================================ */

const FLAGGED = new Set(['revenge', 'greed']);
const MIN = 3;

function num(n) { return Number(n) || 0; }

export function byEmotion(trades) {
  const map = {};
  trades.forEach((t) => {
    const e = t.emotion || 'unknown';
    if (!map[e]) map[e] = { emotion: e, n: 0, wins: 0, pl: 0 };
    map[e].n++;
    map[e].pl += num(t.pl);
    if (num(t.pl) > 0) map[e].wins++;
  });
  return Object.values(map)
    .filter((x) => x.n >= MIN)
    .map((x) => ({ ...x, winRate: x.wins / x.n }))
    .sort((a, b) => a.pl - b.pl);
}

export function flaggedCost(trades) {
  const flagged = trades.filter((t) => FLAGGED.has(t.emotion));
  if (flagged.length < MIN) return null;
  const pl = flagged.reduce((s, t) => s + num(t.pl), 0);
  return { n: flagged.length, pl, label: 'revenge+greed' };
}

export function byPair(trades) {
  const map = {};
  trades.forEach((t) => {
    const p = (t.pair || '?').toUpperCase();
    if (!map[p]) map[p] = { pair: p, n: 0, wins: 0, pl: 0 };
    map[p].n++;
    map[p].pl += num(t.pl);
    if (num(t.pl) > 0) map[p].wins++;
  });
  return Object.values(map)
    .filter((x) => x.n >= MIN)
    .map((x) => ({ ...x, winRate: x.wins / x.n }))
    .sort((a, b) => a.pl - b.pl);
}

export function expectancy(trades) {
  if (trades.length < MIN) return null;
  const wins = trades.filter((t) => num(t.pl) > 0);
  const losses = trades.filter((t) => num(t.pl) < 0);
  const avgWin = wins.length ? wins.reduce((s, t) => s + num(t.pl), 0) / wins.length : 0;
  const avgLoss = losses.length ? losses.reduce((s, t) => s + num(t.pl), 0) / losses.length : 0;
  const wr = wins.length / trades.length;
  const exp = wr * avgWin + (1 - wr) * avgLoss;
  return { n: trades.length, avgWin, avgLoss, winRate: wr, expectancy: exp };
}

export function streaks(trades) {
  if (trades.length < MIN) return null;
  // chronological: oldest first
  const sorted = trades.slice().sort((a, b) => String(a.date).localeCompare(String(b.date)));
  let bestW = 0, bestL = 0, curW = 0, curL = 0;
  sorted.forEach((t) => {
    if (num(t.pl) > 0) { curW++; curL = 0; if (curW > bestW) bestW = curW; }
    else if (num(t.pl) < 0) { curL++; curW = 0; if (curL > bestL) bestL = curL; }
    else { curW = 0; curL = 0; }
  });
  return { winStreak: bestW, lossStreak: bestL };
}

export function byDayOfWeek(trades) {
  if (trades.length < MIN) return null;
  const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const map = Array.from({ length: 7 }, (_, i) => ({ day: names[i], n: 0, pl: 0 }));
  trades.forEach((t) => {
    const d = new Date(t.date);
    if (Number.isNaN(d.getTime())) return;
    const i = d.getDay();
    map[i].n++;
    map[i].pl += num(t.pl);
  });
  return map.filter((x) => x.n >= MIN);
}

/** Single worst-cost line for Home (flagged cost, else worst emotion). */
export function worstCostLine(trades, lang = 'en') {
  const flag = flaggedCost(trades);
  if (flag && flag.pl < 0) {
    return lang === 'en'
      ? `Flagged trades (revenge/greed): ${flag.n} trades, ${fmt(flag.pl)} net`
      : `Flagged trades (revenge/greed): ${flag.n} trades, ${fmt(flag.pl)} net`;
  }
  const emos = byEmotion(trades);
  const worst = emos[0];
  if (worst && worst.pl < 0) {
    return lang === 'en'
      ? `Worst emotion: ${worst.emotion} · ${worst.n} trades · ${fmt(worst.pl)}`
      : `Sab se mehnga emotion: ${worst.emotion} · ${worst.n} trades · ${fmt(worst.pl)}`;
  }
  return null;
}

function fmt(n) {
  const v = num(n);
  const s = Math.abs(v).toFixed(2);
  return (v < 0 ? '−$' : '+$') + s;
}

export function allInsights(trades) {
  return {
    emotions: byEmotion(trades),
    flagged: flaggedCost(trades),
    pairs: byPair(trades),
    expectancy: expectancy(trades),
    streaks: streaks(trades),
    days: byDayOfWeek(trades),
  };
}
