/* ============================================================
   desk.js — shared practice-desk helpers (Journal)
   ============================================================ */

export const CHECK_RULES = [
  { id: 'stop', en: 'Stop loss placed before entry', ur: 'Entry se pehle stop loss laga' },
  { id: 'risk', en: 'Risk within my max %', ur: 'Risk mere max % ke andar' },
  { id: 'calm', en: 'Calm — not FOMO or revenge', ur: 'Calm — FOMO/revenge nahi' },
  { id: 'plan', en: 'Setup matches my plan', ur: 'Setup mere plan se match' },
];

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function equityPoints(App) {
  const balance = App.getBalance();
  const trades = App.getTrades().slice().reverse();
  const totalPl = trades.reduce((s, t) => s + (Number(t.pl) || 0), 0);
  const base = balance - totalPl;
  const pts = [base];
  let run = base;
  trades.forEach((t) => { run += Number(t.pl) || 0; pts.push(run); });
  return pts;
}

export function tradeStats(App) {
  const trades = App.getTrades();
  const count = trades.length;
  const wins = trades.filter((t) => Number(t.pl) > 0).length;
  const winRate = count ? Math.round((wins / count) * 100) : 0;
  const totalPl = trades.reduce((s, t) => s + (Number(t.pl) || 0), 0);
  return { trades, count, wins, winRate, totalPl, up: totalPl >= 0 };
}
