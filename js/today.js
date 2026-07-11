/* ============================================================
   today.js — Campus "Today" habit path (lesson · lab · review).
   Additive KEYS.todayHabit only.
   ============================================================ */

import { store, KEYS } from './store.js';
import { markHabitDay, touchStreakWithFreeze } from './retention.js';

function dayKey(d = new Date()) {
  const x = new Date(d);
  const p = (n) => String(n).padStart(2, '0');
  return `${x.getFullYear()}-${p(x.getMonth() + 1)}-${p(x.getDate())}`;
}

const EMPTY = () => ({ day: dayKey(), lesson: false, lab: false, review: false });

export function getTodayHabit() {
  const raw = store.get(KEYS.todayHabit, null);
  if (!raw || raw.day !== dayKey()) {
    const fresh = EMPTY();
    store.set(KEYS.todayHabit, fresh);
    return fresh;
  }
  return raw;
}

/** Mark one of lesson | lab | review for local calendar day. */
export function markToday(kind) {
  if (!['lesson', 'lab', 'review'].includes(kind)) return getTodayHabit();
  const h = getTodayHabit();
  if (h[kind]) return h;
  h[kind] = true;
  store.set(KEYS.todayHabit, h);
  if (h.lesson && h.lab && h.review) {
    markHabitDay();
    touchStreakWithFreeze();
  }
  return h;
}

export function todayProgress() {
  const h = getTodayHabit();
  const done = [h.lesson, h.lab, h.review].filter(Boolean).length;
  return { ...h, done, total: 3, complete: done === 3 };
}
