import { store, KEYS } from '../store.js';

/** Brand-new learners start Foundations at week 1 without loading curriculum data. */
export function seedFoundationsSoftStart(experience) {
  if (experience && experience !== 'new' && experience !== 'some') return;
  const course = store.get(KEYS.course, {}) || {};
  const current = course.foundations || {};
  if (current.placementDone && Object.keys(current.weekStatus || {}).length) return;
  course.foundations = {
    placementDone: true,
    weekStatus: { ...(current.weekStatus || {}), 1: current.weekStatus?.[1] || 'current' },
    xp: current.xp || 0,
    softStart: true,
  };
  store.set(KEYS.course, course);
}
