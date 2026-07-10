/* ============================================================
   store.js — local persistence (replaces Claude's window.storage)
   Namespaced localStorage with JSON helpers + change events.
   Data is small (trades + course progress) so localStorage is plenty.
   ============================================================ */

const NS = 'masterycap:';

function _key(k) { return NS + k; }

export const store = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(_key(key));
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      console.warn('store.get failed', key, e);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(_key(key), JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('store.set failed', key, e);
      return false;
    }
  },

  remove(key) {
    try { localStorage.removeItem(_key(key)); } catch (e) {}
  },

  /* export/import for manual device migration (no backend sync) */
  exportAll() {
    const out = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(NS)) out[k.slice(NS.length)] = localStorage.getItem(k);
    }
    return out;
  },

  importAll(obj) {
    Object.entries(obj || {}).forEach(([k, v]) => {
      try { localStorage.setItem(_key(k), typeof v === 'string' ? v : JSON.stringify(v)); } catch (e) {}
    });
  },

  /* wipe only masterycap: keys (used before overwrite import) */
  clearAll() {
    const doomed = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(NS)) doomed.push(k);
    }
    doomed.forEach((k) => { try { localStorage.removeItem(k); } catch (e) {} });
  },

  /* true if every key looks like a safe storage id */
  validateBackup(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
    const keys = Object.keys(obj);
    if (!keys.length) return false;
    return keys.every((k) => typeof k === 'string' && /^[a-zA-Z][a-zA-Z0-9._-]*$/.test(k));
  },
};

/* storage keys used across the app */
export const KEYS = {
  profile: 'profile',        // { name, experience, markets[] }
  onboarded: 'onboarded',    // bool
  settings: 'settings',      // { lang }
  balance: 'balance',        // number
  trades: 'trades',          // [ {..} ]
  course: 'course',          // { [trackId]: { placementDone, weekStatus, xp } }
  checklist: 'checklist',    // { [ruleId]: bool, _date }
  drillStats: 'drillStats',  // { attempts, correct, byType, xpDay, xpToday }
  streak: 'streak',          // { lastDay, current, best }
  review: 'review',          // { [qKey]: { box, due } }
};
