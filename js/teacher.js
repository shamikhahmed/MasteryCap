/* ============================================================
   teacher.js — coach voice tone for tips / next-step copy.
   ============================================================ */

import { store, KEYS } from './store.js';

export const TEACHERS = ['patient', 'coach', 'strict'];

export function getTeacher() {
  const t = store.get(KEYS.teacher, 'coach');
  return TEACHERS.includes(t) ? t : 'coach';
}

export function setTeacher(id) {
  const t = TEACHERS.includes(id) ? id : 'coach';
  store.set(KEYS.teacher, t);
  return t;
}

/** Pick tone-variant i18n key suffix or fallback base key. */
export function teacherLine(App, baseKey) {
  const t = getTeacher();
  const keyed = `${baseKey}_${t}`;
  const trial = App.t(keyed);
  if (trial && trial !== keyed) return trial;
  return App.t(baseKey);
}
