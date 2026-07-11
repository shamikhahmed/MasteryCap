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
  const map = Array.from({ length: 7 }, (_, i) => ({ day: names[i], n: 0, pl: 0, wins: 0 }));
  trades.forEach((t) => {
    const d = new Date(t.date);
    if (Number.isNaN(d.getTime())) return;
    const i = d.getDay();
    map[i].n++;
    map[i].pl += num(t.pl);
    if (num(t.pl) > 0) map[i].wins++;
  });
  return map.filter((x) => x.n >= MIN).map((x) => ({ ...x, winRate: x.wins / x.n }));
}

export function byTimeOfDay(trades) {
  if (trades.length < MIN) return null;
  const buckets = {
    morning: { label: 'morning', n: 0, wins: 0, pl: 0 },
    afternoon: { label: 'afternoon', n: 0, wins: 0, pl: 0 },
    night: { label: 'night', n: 0, wins: 0, pl: 0 },
  };
  trades.forEach((t) => {
    const d = new Date(t.date);
    if (Number.isNaN(d.getTime())) return;
    const h = d.getHours();
    const b = h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'night';
    buckets[b].n++;
    buckets[b].pl += num(t.pl);
    if (num(t.pl) > 0) buckets[b].wins++;
  });
  return Object.values(buckets)
    .filter((x) => x.n >= MIN)
    .map((x) => ({ ...x, winRate: x.wins / x.n }));
}

export function bySizeBucket(trades) {
  if (trades.length < MIN) return null;
  const sizes = trades.map((t) => num(t.size)).filter((n) => n > 0).sort((a, b) => a - b);
  if (sizes.length < MIN) return null;
  const median = sizes[Math.floor(sizes.length / 2)];
  const lo = { label: '≤ median size', n: 0, wins: 0, pl: 0 };
  const hi = { label: '> median size', n: 0, wins: 0, pl: 0 };
  trades.forEach((t) => {
    const s = num(t.size);
    if (!(s > 0)) return;
    const b = s <= median ? lo : hi;
    b.n++; b.pl += num(t.pl); if (num(t.pl) > 0) b.wins++;
  });
  return [lo, hi].filter((x) => x.n >= MIN).map((x) => ({ ...x, winRate: x.wins / x.n, median }));
}

/** Avg P/L of trades taken <30m after a loss vs >2h after a loss. */
export function revengeQuant(trades) {
  const sorted = trades.slice().sort((a, b) => String(a.date).localeCompare(String(b.date)));
  const fast = [], slow = [];
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    if (!(num(prev.pl) < 0)) continue;
    const t0 = new Date(prev.date).getTime();
    const t1 = new Date(sorted[i].date).getTime();
    if (Number.isNaN(t0) || Number.isNaN(t1)) continue;
    const dt = t1 - t0;
    if (dt > 0 && dt <= 30 * 60 * 1000) fast.push(sorted[i]);
    else if (dt > 2 * 60 * 60 * 1000) slow.push(sorted[i]);
  }
  const avg = (arr) => (arr.length ? arr.reduce((s, t) => s + num(t.pl), 0) / arr.length : null);
  if (fast.length < MIN && slow.length < MIN) return null;
  return {
    fast: fast.length >= MIN ? { n: fast.length, avgPl: avg(fast) } : null,
    slow: slow.length >= MIN ? { n: slow.length, avgPl: avg(slow) } : null,
  };
}

export function expectancyR(trades) {
  const withR = trades.filter((t) => Number.isFinite(Number(t.r)));
  if (withR.length < MIN) return null;
  const avgR = withR.reduce((s, t) => s + num(t.r), 0) / withR.length;
  const wins = withR.filter((t) => num(t.r) > 0).length;
  return { n: withR.length, avgR, winRate: wins / withR.length };
}

export function allInsights(trades) {
  return {
    emotions: byEmotion(trades),
    flagged: flaggedCost(trades),
    pairs: byPair(trades),
    expectancy: expectancy(trades),
    expectancyR: expectancyR(trades),
    streaks: streaks(trades),
    days: byDayOfWeek(trades),
    tod: byTimeOfDay(trades),
    size: bySizeBucket(trades),
    revengeQ: revengeQuant(trades),
  };
}

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
