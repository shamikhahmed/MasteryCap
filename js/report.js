/* ============================================================
   report.js — weekly report card. Local only: snapshots totals
   each ISO week; deltas vs snapshot = "this week" numbers.
   ============================================================ */

import { store, KEYS } from './store.js';
import { TRACKS, getTrack } from './data/tracks.js';
import { dueReviewCount, getStreak } from './retention.js';

function isoWeek(d = new Date()) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return `${t.getUTCFullYear()}-W${String(Math.ceil((((t - y0) / 86400000) + 1) / 7)).padStart(2, '0')}`;
}

function totals(App) {
  let weeksDone = 0;
  for (const t of TRACKS) {
    if (t.status !== 'live') continue;
    const prog = App.getCourse(t.id);
    weeksDone += t.weeks.filter((w) => ['completed', 'mastered'].includes(prog.weekStatus[w.id])).length;
  }
  return { xp: App.totalXp(), weeksDone };
}

/**
 * Report for the PREVIOUS snapshot period. Rotates the snapshot when the
 * ISO week changes. Returns null until there is a full prior week on record.
 */
export function weeklyReport(App) {
  const nowWeek = isoWeek();
  const snap = store.get(KEYS.weeklySnapshot, null);
  const cur = totals(App);

  if (!snap) {
    store.set(KEYS.weeklySnapshot, { week: nowWeek, ...cur });
    return null;
  }
  if (snap.week === nowWeek) return null; // mid-week — nothing to report yet

  const report = {
    week: snap.week,
    xpGained: Math.max(0, cur.xp - snap.xp),
    weeksCompleted: Math.max(0, cur.weeksDone - snap.weeksDone),
    reviewsDue: dueReviewCount(),
    streak: getStreak().current || 0,
  };
  report.focus = report.weeksCompleted === 0
    ? { en: 'Open one lesson — momentum beats intensity.', ur: 'Aik lesson kholo — momentum sab se ahm.' }
    : report.reviewsDue > 5
      ? { en: `Clear your ${report.reviewsDue} due reviews before new material.`, ur: `${report.reviewsDue} reviews pehle clear karo.` }
      : { en: 'On rhythm. Continue the plan.', ur: 'Rhythm theek. Plan jari rakho.' };

  store.set(KEYS.weeklySnapshot, { week: nowWeek, ...cur });
  store.set(KEYS.lastReport, report);
  return report;
}

/** Last rotated report, if the learner wants to re-open it. */
export function lastReport() {
  return store.get(KEYS.lastReport, null);
}
