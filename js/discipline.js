/* ============================================================
   discipline.js — rolling 20-trade discipline grade (P6).
   Old trades with null stopPlaced/movedStop excluded.
   ============================================================ */

const WINDOW = 20;

function num(n) { return Number(n) || 0; }

export function isScoredTrade(t) {
  return t && (t.stopPlaced === true || t.stopPlaced === false)
    && (t.movedStop === true || t.movedStop === false);
}

/** Revenge candidate: entry within 30 min of a prior losing trade. */
export function isRevengeCandidate(trade, allTrades) {
  if (!trade?.date) return false;
  const t0 = new Date(trade.date).getTime();
  if (Number.isNaN(t0)) return false;
  return allTrades.some((other) => {
    if (other.id === trade.id) return false;
    if (num(other.pl) >= 0) return false;
    const t1 = new Date(other.date).getTime();
    if (Number.isNaN(t1)) return false;
    const dt = t0 - t1;
    return dt > 0 && dt <= 30 * 60 * 1000;
  });
}

/** Oversized: planned risk % > maxRiskPct (default 2). */
export function isOversized(trade, balance, maxRiskPct = 2) {
  const entry = num(trade.entry);
  const stop = num(trade.stop);
  const size = num(trade.size);
  const bal = num(balance);
  if (!(entry > 0) || !(stop > 0) || !(size > 0) || !(bal > 0)) return false;
  const stopDist = Math.abs(entry - stop) / entry;
  if (!(stopDist > 0)) return false;
  const plannedRiskPct = (stopDist * size / bal) * 100;
  return plannedRiskPct > maxRiskPct + 1e-9;
}

/**
 * Score one trade 0–1 across available checks.
 * Points: stopPlaced, !movedStop, !revenge, !oversized.
 */
export function scoreTrade(trade, allTrades, balance, maxRiskPct = 2) {
  if (!isScoredTrade(trade)) return null;
  let pts = 0, max = 0;
  max++; if (trade.stopPlaced === true) pts++;
  max++; if (trade.movedStop === false) pts++;
  max++; if (!isRevengeCandidate(trade, allTrades)) pts++;
  max++; if (!isOversized(trade, balance, maxRiskPct)) pts++;
  return { pts, max, ratio: pts / max };
}

export function gradeFromRatio(r) {
  if (r >= 0.9) return 'A';
  if (r >= 0.8) return 'B';
  if (r >= 0.7) return 'C';
  if (r >= 0.55) return 'D';
  return 'F';
}

export function disciplineReport(trades, balance, maxRiskPct = 2) {
  const chrono = trades.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const scored = [];
  for (const t of chrono) {
    const s = scoreTrade(t, trades, balance, maxRiskPct);
    if (s) scored.push({ trade: t, ...s });
    if (scored.length >= WINDOW) break;
  }
  if (!scored.length) return null;
  const pts = scored.reduce((a, x) => a + x.pts, 0);
  const max = scored.reduce((a, x) => a + x.max, 0);
  const ratio = max ? pts / max : 0;
  const breakdown = {
    stopPlaced: scored.filter((x) => x.trade.stopPlaced === true).length,
    heldStop: scored.filter((x) => x.trade.movedStop === false).length,
    notRevenge: scored.filter((x) => !isRevengeCandidate(x.trade, trades)).length,
    sizedOk: scored.filter((x) => !isOversized(x.trade, balance, maxRiskPct)).length,
    n: scored.length,
  };
  return {
    n: scored.length,
    pts,
    max,
    ratio,
    grade: gradeFromRatio(ratio),
    breakdown,
  };
}
