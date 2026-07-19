/* ============================================================
   store.js — localStorage + IndexedDB mirror (P10).
   Sync API preserved for callers. hydrate() heals from IDB.
   ============================================================ */

let NS = (typeof localStorage !== 'undefined' && localStorage.getItem('masterycap_active_ns')) || 'masterycap:';
if (!NS.endsWith(':')) NS += ':';
const IDB_NAME = 'masterycap';
const IDB_STORE = 'kv';
const QUOTA_WARN = 4 * 1024 * 1024;

const MIGRATIONS = {
  /* future: 2: (store) => { ... } */
};

function _key(k) { return NS + k; }

function djb2(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
  return (h >>> 0).toString(16);
}

function openIdb() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') return resolve(null);
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}

async function idbSet(key, value) {
  const db = await openIdb();
  if (!db) return;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(value, NS + key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch (e) { resolve(); }
  });
}

async function idbGet(key) {
  const db = await openIdb();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const req = tx.objectStore(IDB_STORE).get(NS + key);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => resolve(null);
    } catch (e) { resolve(null); }
  });
}

async function idbDelete(key) {
  const db = await openIdb();
  if (!db) return;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).delete(NS + key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch (e) { resolve(); }
  });
}

async function idbClearNs() {
  const db = await openIdb();
  if (!db) return;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      const store = tx.objectStore(IDB_STORE);
      const req = store.getAllKeys();
      req.onsuccess = () => {
        (req.result || []).forEach((k) => {
          if (String(k).startsWith(NS)) store.delete(k);
        });
      };
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch (e) { resolve(); }
  });
}

function serializedSize() {
  let n = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(NS)) n += k.length + (localStorage.getItem(k) || '').length;
    }
  } catch (e) {}
  return n;
}

export const store = {
  getNs() { return NS; },
  setNs(prefix) {
    NS = prefix.endsWith(':') ? prefix : prefix + ':';
    try { localStorage.setItem('masterycap_active_ns', NS); } catch (e) {}
  },

  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(_key(key));
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('store.get corrupt', key, e);
      try {
        const raw = localStorage.getItem(_key(key));
        if (raw != null) {
          localStorage.setItem(`masterycap:corrupt:${key}`, raw);
          localStorage.removeItem(_key(key));
        }
      } catch (e2) {}
      return fallback;
    }
  },

  set(key, value) {
    try {
      const raw = JSON.stringify(value);
      localStorage.setItem(_key(key), raw);
      idbSet(key, raw);
      return true;
    } catch (e) {
      console.error('store.set failed', key, e);
      return false;
    }
  },

  remove(key) {
    try { localStorage.removeItem(_key(key)); } catch (e) {}
    idbDelete(key);
  },

  exportAll() {
    const out = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(NS)) out[k.slice(NS.length)] = localStorage.getItem(k);
    }
    return out;
  },

  /** Wrapped backup with djb2 checksum */
  exportBackup() {
    const data = this.exportAll();
    const payload = JSON.stringify(data);
    return { v: 1, checksum: djb2(payload), data, exportedAt: new Date().toISOString() };
  },

  importAll(obj) {
    Object.entries(obj || {}).forEach(([k, v]) => {
      try {
        const raw = typeof v === 'string' ? v : JSON.stringify(v);
        localStorage.setItem(_key(k), raw);
        idbSet(k, raw);
      } catch (e) {}
    });
  },

  /**
   * Import backup. Accepts legacy flat map OR {checksum,data}.
   * Returns { ok, error? }
   */
  importBackup(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
      return { ok: false, error: 'invalid' };
    }
    let data = obj;
    if (obj.data && typeof obj.data === 'object' && !Array.isArray(obj.data)) {
      if (obj.checksum) {
        const payload = JSON.stringify(obj.data);
        if (djb2(payload) !== obj.checksum) return { ok: false, error: 'checksum_fail' };
      }
      data = obj.data;
    }
    if (!this.validateBackup(data)) return { ok: false, error: 'invalid' };
    this.clearAll();
    this.importAll(data);
    return { ok: true };
  },

  clearAll() {
    const doomed = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(NS)) doomed.push(k);
    }
    doomed.forEach((k) => { try { localStorage.removeItem(k); } catch (e) {} });
    idbClearNs();
  },

  validateBackup(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
    const keys = Object.keys(obj);
    if (!keys.length) return false;
    return keys.every((k) => typeof k === 'string' && /^[a-zA-Z][a-zA-Z0-9._-]*$/.test(k));
  },

  byteSize() { return serializedSize(); },
  overQuota() { return serializedSize() > QUOTA_WARN; },

  listCorrupt() {
    const out = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('masterycap:corrupt:')) out.push(k.slice('masterycap:corrupt:'.length));
      }
    } catch (e) {}
    return out;
  },

  discardCorrupt(key) {
    try { localStorage.removeItem('masterycap:corrupt:' + key); } catch (e) {}
  },

  async hydrate() {
    /* Heal: for each known KEY, if LS missing try IDB */
    const keys = Object.values(KEYS);
    for (const key of keys) {
      try {
        if (localStorage.getItem(_key(key)) == null) {
          const raw = await idbGet(key);
          if (raw != null) localStorage.setItem(_key(key), typeof raw === 'string' ? raw : JSON.stringify(raw));
        }
      } catch (e) {}
    }
    this.migrate();
  },

  migrate() {
    let ver = this.get(KEYS.schemaVersion, 0);
    if (!ver) {
      this.set(KEYS.schemaVersion, 1);
      ver = 1;
    }
    const target = 1;
    for (let v = ver + 1; v <= target; v++) {
      const fn = MIGRATIONS[v];
      if (typeof fn === 'function') fn(this);
      this.set(KEYS.schemaVersion, v);
    }
  },
};

export const KEYS = {
  profile: 'profile',
  onboarded: 'onboarded',
  settings: 'settings',
  balance: 'balance',
  trades: 'trades',
  course: 'course',
  checklist: 'checklist',
  drillStats: 'drillStats',
  streak: 'streak',
  review: 'review',
  schemaVersion: 'schemaVersion',
  lastExportAt: 'lastExportAt',
  demo: 'demo',
  quotaDismissed: 'quotaDismissed',
  backupRemindDismissed: 'backupRemindDismissed',
  lastSeenVersion: 'lastSeenVersion',
  skimMode: 'skimMode',
  coolDownUntil: 'coolDownUntil',
  mistakeBank: 'mistakeBank',
  glossWeak: 'glossWeak',
  habitDays: 'habitDays',
  streakFreeze: 'streakFreeze',
  notifyOptIn: 'notifyOptIn',
  morningBriefDay: 'morningBriefDay',
  binaryGate: 'binaryGate',
  tourDone: 'tourDone',
  morningPending: 'morningPending',
  howtoChecks: 'howtoChecks',
  simTrades: 'simTrades',
  simStats: 'simStats',
  graduation: 'graduation',
  timeStats: 'timeStats',
  skills: 'skills',
  teacher: 'teacher',
  appearance: 'appearance',
  planStart: 'planStart',
  weeklySnapshot: 'weeklySnapshot',
  lastReport: 'lastReport',
  reportSeen: 'reportSeen',
  todayHabit: 'todayHabit',
  studyNotes: 'studyNotes',
  flashStats: 'flashStats',
  flashSrs: 'flashSrs',
  firstBackupDone: 'firstBackupDone',
  backupRemindDismissedAt: 'backupRemindDismissedAt',
  taxChecklist: 'taxChecklist',
  sessionRun: 'sessionRun',
};

export { djb2, QUOTA_WARN };
