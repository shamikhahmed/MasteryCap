/* ============================================================
   retention.js — daily streak + Leitner-lite review (P4).
   ============================================================ */

import { store, KEYS } from './store.js';
import { TRACKS, getTrack } from './data/tracks.js';
import { pickDueSimMistakes, clearMistake } from './mistakes.js';

function dayKey(d = new Date()) {
  const x = new Date(d);
  const p = (n) => String(n).padStart(2, '0');
  return `${x.getFullYear()}-${p(x.getMonth() + 1)}-${p(x.getDate())}`;
}

function addDays(key, n) {
  const [y, m, d] = key.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + n);
  return dayKey(dt);
}

export function getStreak() {
  return store.get(KEYS.streak, { lastDay: null, current: 0, best: 0 });
}

/** Qualifying action bumps streak for local calendar day. */
export function touchStreak() {
  const today = dayKey();
  const s = getStreak();
  if (s.lastDay === today) return s;
  const yday = addDays(today, -1);
  if (s.lastDay === yday) s.current = (s.current || 0) + 1;
  else s.current = 1;
  if (s.current > (s.best || 0)) s.best = s.current;
  s.lastDay = today;
  store.set(KEYS.streak, s);
  return s;
}

export function getReview() {
  return store.get(KEYS.review, {});
}

function setReview(obj) { store.set(KEYS.review, obj); }

/** Collect quiz items from completed/mastered weeks across tracks. */
export function poolQuestions() {
  const course = store.get(KEYS.course, {});
  const out = [];
  TRACKS.forEach((raw) => {
    if (raw.status !== 'live') return;
    const t = getTrack(raw.id);
    const prog = course[t.id] || {};
    const ws = prog.weekStatus || {};
    t.weeks.forEach((w) => {
      const st = ws[w.id];
      if (st !== 'completed' && st !== 'mastered') return;
      (w.quiz || []).forEach((q, qi) => {
        out.push({
          qKey: `${t.id}:${w.id}:${qi}`,
          trackId: t.id,
          weekId: w.id,
          qi,
          q,
        });
      });
    });
  });
  return out;
}

function dueItems(pool, review, today) {
  return pool.filter((item) => {
    const r = review[item.qKey];
    if (!r) return true;
    return !r.due || r.due <= today;
  });
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

/** Pick up to 3 review questions for today (sim process fails first, then week quizzes). */
export function pickDailyReview(n = 3) {
  const today = dayKey();
  const sims = pickDueSimMistakes(Math.min(2, n));
  const need = Math.max(0, n - sims.length);
  const pool = poolQuestions();
  const review = getReview();
  const due = dueItems(pool, review, today);
  const src = due.length ? due : pool;
  const quiz = shuffle(src).slice(0, need);
  const merged = [...sims, ...quiz];
  return merged.slice(0, Math.min(n, merged.length));
}

export function answerReview(qKey, correct) {
  const today = dayKey();
  const review = getReview();
  const cur = review[qKey] || { box: 1, due: today };
  if (correct) {
    const box = Math.min(3, (cur.box || 1) + 1);
    const delay = box === 1 ? 1 : box === 2 ? 3 : 7;
    review[qKey] = { box, due: addDays(today, delay) };
    if (String(qKey).startsWith('sim:')) clearMistake(qKey);
  } else {
    review[qKey] = { box: 1, due: addDays(today, 1) };
  }
  setReview(review);
  return review[qKey];
}

export function completeReviewXp() {
  const course = store.get(KEYS.course, {});
  const bucket = course._review || { placementDone: true, weekStatus: {}, xp: 0 };
  bucket.xp = (bucket.xp || 0) + 15;
  course._review = bucket;
  store.set(KEYS.course, course);
  touchStreak();
  return 15;
}

export function reviewAvailable() {
  return poolQuestions().length > 0 || pickDueSimMistakes(1).length > 0;
}

/** Habit calendar: mark today as active day. */
export function markHabitDay() {
  const today = dayKey();
  const days = store.get(KEYS.habitDays, {}) || {};
  days[today] = true;
  store.set(KEYS.habitDays, days);
  return days;
}

export function getHabitDays() {
  return store.get(KEYS.habitDays, {}) || {};
}

/**
 * Streak with 1 freeze/week. If gap of 1 day and freeze available, consume silently.
 */
export function touchStreakWithFreeze() {
  const today = dayKey();
  const s = getStreak();
  if (s.lastDay === today) return s;
  const yday = addDays(today, -1);
  const freeze = store.get(KEYS.streakFreeze, { week: null, used: false });
  const week = isoWeek(today);
  if (freeze.week !== week) { freeze.week = week; freeze.used = false; }

  if (s.lastDay === yday) {
    s.current = (s.current || 0) + 1;
  } else if (s.lastDay === addDays(today, -2) && !freeze.used) {
    freeze.used = true;
    store.set(KEYS.streakFreeze, freeze);
    s.current = (s.current || 0) + 1;
    s.froze = true;
  } else {
    s.current = 1;
    s.broken = true;
  }
  if (s.current > (s.best || 0)) s.best = s.current;
  s.lastDay = today;
  store.set(KEYS.streak, s);
  store.set(KEYS.streakFreeze, freeze);
  markHabitDay();
  return s;
}

function isoWeek(dayStr) {
  const [y, m, d] = dayStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  const onejan = new Date(y, 0, 1);
  return `${y}-W${Math.ceil((((dt - onejan) / 86400000) + onejan.getDay() + 1) / 7)}`;
}

/** Offer recovery after streak break (once). Call from CTA after user commits to reviews. */
export function tryStreakRecovery() {
  const s = getStreak();
  if (!s.broken || s.recovered) return false;
  s.current = Math.max(s.current || 1, 2);
  s.broken = false;
  s.recovered = true;
  store.set(KEYS.streak, s);
  return true;
}

export function dueReviewCount() {
  const today = dayKey();
  const pool = poolQuestions();
  const review = getReview();
  return dueItems(pool, review, today).length;
}
