/* ============================================================
   syllabus.js — University structure: semesters, prerequisites,
   dated personal plan, guided daily session composition.

   Zero-to-hero ladder (strict prereqs, decided 2026-07-12):
     Semester 1 — Foundations, Macro Backdrop           (everyone)
     Semester 2 — chosen market core:
        invest path : Investing PSX & Beyond, Tax
        trading path: Spot vs Derivatives, Stocks
     Semester 3 — specialisation:
        options → Options → Greeks Deep
        crypto  → Crypto & Perps
        futures → Futures · forex → Forex
     Electives  — Bots & Copy Trading, Binary Options (warn-only,
                  negative-EV literacy — never on the credit path)

   Placement 'experienced' does NOT skip credits — it accelerates
   (placement exam can mark weeks mastered), prereqs stay strict.
   ============================================================ */

import { store, KEYS } from './store.js';
import { getTrack, TRACKS } from './data/tracks.js';

export const SEMESTERS = [
  { id: 'sem1', name: { en: 'Semester 1 — Ground School', ur: 'Semester 1 — Bunyadi School' }, tracks: ['foundations', 'macro'] },
  { id: 'sem2', name: { en: 'Semester 2 — Market Core', ur: 'Semester 2 — Market Core' }, tracks: ['spot', 'stocks', 'invest', 'tax'] },
  { id: 'sem3', name: { en: 'Semester 3 — Specialisation', ur: 'Semester 3 — Specialisation' }, tracks: ['options', 'greeks', 'crypto', 'futures', 'forex'] },
  { id: 'elective', name: { en: 'Electives — Eyes Open', ur: 'Electives — Aankhein Khuli' }, tracks: ['bots', 'binary'] },
];

/** Prerequisites: track → tracks that must be CREDITED first (strict). */
export const PREREQS = {
  foundations: [],
  macro: ['foundations'],
  spot: ['foundations'],
  stocks: ['foundations', 'spot'],
  invest: ['foundations'],
  tax: ['foundations'],
  options: ['foundations', 'spot'],
  greeks: ['options'],
  crypto: ['foundations', 'spot'],
  futures: ['foundations', 'spot'],
  forex: ['foundations', 'spot'],
  bots: ['foundations'],
  binary: ['foundations'],
};

/** A track is credited when every week is completed/mastered. */
export function isCredited(App, trackId) {
  const t = getTrack(trackId);
  if (!t || t.status !== 'live') return false;
  const prog = App.getCourse(trackId);
  return t.weeks.every((w) => ['completed', 'mastered'].includes(prog.weekStatus[w.id]));
}

export function missingPrereqs(App, trackId) {
  return (PREREQS[trackId] || []).filter((req) => !isCredited(App, req));
}

/** Strict gate — UI must route through this before opening a track. */
export function canEnroll(App, trackId) {
  return missingPrereqs(App, trackId).length === 0;
}

export function semesterOf(trackId) {
  return SEMESTERS.find((s) => s.tracks.includes(trackId)) || null;
}

/* ---------- Dated personal plan ---------- */

/**
 * Build/refresh the plan: orders every live track respecting prereqs,
 * assigns week numbers from enrolment date. sessionMins drives pace:
 * 15min = 1 lesson-week per calendar week, 30 = 2, 45 = 3.
 */
export function buildPlan(App) {
  const settings = store.get(KEYS.settings, {});
  const pace = { 15: 1, 30: 2, 45: 3 }[settings.sessionMins || 15] || 1;
  const startIso = store.get(KEYS.planStart) || new Date().toISOString().slice(0, 10);
  store.set(KEYS.planStart, startIso);

  // Topological order: semesters in order, tracks inside semester in listed order
  const ordered = [];
  for (const sem of SEMESTERS) {
    if (sem.id === 'elective') continue; // electives never scheduled
    for (const tid of sem.tracks) {
      const t = getTrack(tid);
      if (t && t.status === 'live') ordered.push(tid);
    }
  }

  let weekCursor = 1;
  const items = [];
  for (const tid of ordered) {
    const t = getTrack(tid);
    const prog = App.getCourse(tid);
    for (const w of t.weeks) {
      const done = ['completed', 'mastered'].includes(prog.weekStatus[w.id]);
      items.push({
        trackId: tid, weekId: w.id, done,
        calWeek: Math.ceil(weekCursor / pace),
      });
      weekCursor += 1;
    }
  }
  const totalCalWeeks = items.length ? items[items.length - 1].calWeek : 0;
  return { startIso, pace, items, totalCalWeeks };
}

/** Where the learner is on the calendar: current week N of M + on-track flag. */
export function planPosition(App) {
  const plan = buildPlan(App);
  const firstOpen = plan.items.find((i) => !i.done);
  const doneCount = plan.items.filter((i) => i.done).length;
  const elapsedWeeks = Math.max(1, Math.floor((Date.now() - new Date(plan.startIso).getTime()) / (7 * 86400000)) + 1);
  return {
    currentCalWeek: firstOpen ? firstOpen.calWeek : plan.totalCalWeeks,
    totalCalWeeks: plan.totalCalWeeks,
    doneWeeks: doneCount,
    totalWeeks: plan.items.length,
    elapsedWeeks,
    onTrack: !firstOpen || firstOpen.calWeek >= elapsedWeeks,
    nextItem: firstOpen || null,
  };
}

/* ---------- Guided daily session ---------- */

/**
 * Compose today's session from sessionMins:
 *   15 → [lesson, cards(3), quiz(1)]
 *   30 → [lesson, lesson?, cards(5), quiz(2), sim?]
 *   45 → [lesson x2, cards(8), quiz(3), sim scenario]
 * Steps are descriptors; js/session.js runner executes them.
 */
export function buildDailySession(App) {
  const settings = store.get(KEYS.settings, {});
  const mins = settings.sessionMins || 15;
  const pos = planPosition(App);
  const steps = [];
  if (pos.nextItem) steps.push({ kind: 'lesson', trackId: pos.nextItem.trackId, weekId: pos.nextItem.weekId });
  if (mins >= 30 && pos.nextItem) steps.push({ kind: 'lesson-continue' });
  steps.push({ kind: 'cards', count: mins >= 45 ? 8 : mins >= 30 ? 5 : 3 });
  steps.push({ kind: 'quiz', count: mins >= 45 ? 3 : mins >= 30 ? 2 : 1 });
  if (mins >= 30) steps.push({ kind: 'sim', optional: mins === 30 });
  return { mins, steps, position: pos };
}
