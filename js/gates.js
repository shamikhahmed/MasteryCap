/* ============================================================
   gates.js — Zero-beginner safety: soft-start, track locks, lab gate.
   ============================================================ */

import { store, KEYS } from './store.js';
import { getTrack } from './data/tracks.js';
import { missingPrereqs } from './syllabus.js';

const ADVANCED = new Set(['crypto', 'forex', 'futures', 'options', 'greeks', 'bots', 'binary']);

function weeksDone(prog, trackId) {
  const t = getTrack(trackId);
  if (!t || !prog) return 0;
  return t.weeks.filter((w) => ['completed', 'mastered'].includes(prog.weekStatus?.[w.id])).length;
}

/** Brand-new / thin-experience users skip Foundations placement wall → Week 1 open. */
export function seedFoundationsSoftStart(experience) {
  if (experience && experience !== 'new' && experience !== 'some') return;
  const course = store.get(KEYS.course, {}) || {};
  const cur = course.foundations || {};
  if (cur.placementDone && Object.keys(cur.weekStatus || {}).length) return;
  course.foundations = {
    placementDone: true,
    weekStatus: { ...(cur.weekStatus || {}), 1: cur.weekStatus?.[1] || 'current' },
    xp: cur.xp || 0,
    softStart: true,
  };
  store.set(KEYS.course, course);
}

/**
 * Soft-lock advanced tracks until Foundations literacy exists.
 * Greeks also needs Options basics.
 * @returns {false|string} false = open, else lock reason key suffix
 */
export function trackLockReason(trackId, App) {
  // Strict university prerequisites (2026-07-12 decision): a track opens only
  // when every prerequisite track is fully credited (all weeks completed).
  // Placement/exam mastery marks weeks complete, so experienced learners
  // accelerate through credits rather than skipping them.
  const missing = missingPrereqs(App, trackId);
  return missing.length ? missing[0] : false;
}

/** Trading sim / perps lab — not day-1 for zeros. */
export function canOpenTradingLab(App) {
  if (App.profile?.experience === 'exp') return true;
  const f = App.getCourse('foundations');
  return weeksDone(f, 'foundations') >= 4 || !!f.examPassed;
}

export function preferredStartTrack(App) {
  if (App.profile?.experience === 'new') return 'foundations';
  const mk = App.profile?.markets || [];
  if (mk.includes('foundations')) return 'foundations';
  if (mk[0] && getTrack(mk[0])) return mk[0];
  return 'foundations';
}
