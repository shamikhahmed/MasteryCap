/* ============================================================
   enrich.js — merge week-extras + quiz-extra onto week objects
   ============================================================ */

import { mergeWeekExtras } from '../week-extras.js';
import { mergeWeekQuiz } from './quiz-extra.js';

export function enrichWeek(trackId, week) {
  return mergeWeekQuiz(trackId, mergeWeekExtras(trackId, week));
}

export function enrichTrack(track) {
  if (!track) return track;
  return {
    ...track,
    weeks: (track.weeks || []).map((w) => enrichWeek(track.id, w)),
  };
}
