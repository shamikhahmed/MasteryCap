/* ============================================================
   time.js — active learning timer (lesson / quiz / sim / desk).
   Idle > IDLE_MS pauses. Additive KEYS.timeStats.
   ============================================================ */

import { store, KEYS } from './store.js';

const IDLE_MS = 60000;

let active = null; // { scope, courseId, topicId, started, lastBeat }
let idleTimer = null;

function empty() {
  return { totalMs: 0, byCourse: {}, byTopic: {}, sessions: 0 };
}

export function getTimeStats() {
  return store.get(KEYS.timeStats, empty());
}

function persist(delta, courseId, topicId) {
  if (!(delta > 0)) return;
  const s = getTimeStats();
  s.totalMs = (s.totalMs || 0) + delta;
  if (courseId) {
    s.byCourse[courseId] = (s.byCourse[courseId] || 0) + delta;
  }
  if (topicId) {
    const key = `${courseId || 'app'}:${topicId}`;
    s.byTopic[key] = (s.byTopic[key] || 0) + delta;
  }
  store.set(KEYS.timeStats, s);
}

function beat() {
  if (!active) return;
  const now = Date.now();
  const delta = now - active.lastBeat;
  active.lastBeat = now;
  persist(delta, active.courseId, active.topicId);
}

function armIdle() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => pauseTime(), IDLE_MS);
}

/** Start or switch active scope. */
export function startTime(scope, { courseId = null, topicId = null } = {}) {
  if (active) {
    if (active.scope === scope && active.courseId === courseId && active.topicId === topicId) {
      armIdle();
      return;
    }
    pauseTime();
  }
  active = { scope, courseId, topicId, started: Date.now(), lastBeat: Date.now() };
  const s = getTimeStats();
  s.sessions = (s.sessions || 0) + 1;
  store.set(KEYS.timeStats, s);
  armIdle();
}

export function pauseTime() {
  if (!active) return;
  beat();
  active = null;
  clearTimeout(idleTimer);
}

/** Call on user interaction while learning. */
export function touchTime() {
  if (!active) return;
  beat();
  armIdle();
}

export function formatDuration(ms, lang = 'en') {
  const m = Math.floor((ms || 0) / 60000);
  const h = Math.floor(m / 60);
  const rm = m % 60;
  if (h <= 0) return lang === 'ur' ? `${rm} min` : `${rm} min`;
  return lang === 'ur' ? `${h}h ${rm}m` : `${h}h ${rm}m`;
}

export function softSessionNudge(App) {
  if (!active) return null;
  const mins = (Date.now() - active.started) / 60000;
  if (mins < 20) return null;
  if (active._nudged) return null;
  active._nudged = true;
  return App?.t?.('time_nudge') || '20+ min — short break helps retention.';
}
