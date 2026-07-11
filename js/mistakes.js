/* ============================================================
   mistakes.js — P11 mistake bank (feeds review)
   ============================================================ */

import { store, KEYS } from './store.js';

export function recordMistake(qKey, meta = {}) {
  const bank = store.get(KEYS.mistakeBank, {}) || {};
  bank[qKey] = { ...(bank[qKey] || {}), ...meta, box: 1, due: new Date().toISOString().slice(0, 10), wrong: (bank[qKey]?.wrong || 0) + 1 };
  store.set(KEYS.mistakeBank, bank);
  /* also seed review box 1 */
  const review = store.get(KEYS.review, {}) || {};
  review[qKey] = { box: 1, due: new Date().toISOString().slice(0, 10) };
  store.set(KEYS.review, review);
}

export function mistakeCountDue() {
  const bank = store.get(KEYS.mistakeBank, {}) || {};
  const today = new Date().toISOString().slice(0, 10);
  return Object.values(bank).filter((x) => !x.due || x.due <= today).length;
}

export function clearMistake(qKey) {
  const bank = store.get(KEYS.mistakeBank, {}) || {};
  delete bank[qKey];
  store.set(KEYS.mistakeBank, bank);
}
