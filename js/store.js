/* ============================================================
   store.js — localStorage + IndexedDB mirror (P10).
   Sync API preserved for callers. hydrate() heals from IDB.
   ============================================================ */

let NS = 'masterycap:';
if (typeof window !== 'undefined') {
  try { NS = window.localStorage.getItem('masterycap_active_ns') || NS; } catch (_) {}
}
if (!NS.endsWith(':')) NS += ':';
const IDB_NAME = 'masterycap';
const IDB_STORE = 'kv';
const QUOTA_WARN = 4 * 1024 * 1024;
const BACKUP_FORMAT = 2;
const MAX_BACKUP_BYTES = 20 * 1024 * 1024;
const PREIMPORT_KEY = () => `masterycap-preimport:${NS}`;

const MIGRATIONS = {
  2: (s) => {
    /* v47: studentId key may be absent — leave legacy profile alone */
    if (!s.get(KEYS.studentId, null) && s.get(KEYS.profile, null)?.studentIdNumber) {
      /* profile already has id number from newer admission; card rebuilt on demand */
    }
  },
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

async function idbReplaceNs(rawMap) {
  const db = await openIdb();
  if (!db) return;
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      const objectStore = tx.objectStore(IDB_STORE);
      const req = objectStore.getAllKeys();
      req.onsuccess = () => {
        (req.result || []).forEach((key) => {
          if (String(key).startsWith(NS)) objectStore.delete(key);
        });
        Object.entries(rawMap).forEach(([key, raw]) => objectStore.put(raw, NS + key));
      };
      req.onerror = () => tx.abort();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error || new Error('IndexedDB replace failed'));
      tx.onabort = () => reject(tx.error || new Error('IndexedDB replace aborted'));
    } catch (error) {
      reject(error);
    }
  });
}

async function idbSetAbsolute(key, value) {
  const db = await openIdb();
  if (!db) return false;
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(value, key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error || new Error('IndexedDB snapshot failed'));
      tx.onabort = () => reject(tx.error || new Error('IndexedDB snapshot aborted'));
    } catch (error) {
      reject(error);
    }
  });
}

async function idbGetAbsolute(key) {
  const db = await openIdb();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const req = tx.objectStore(IDB_STORE).get(key);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => resolve(null);
    } catch (_) {
      resolve(null);
    }
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

function normalizeRawMap(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return null;
  const entries = Object.entries(obj);
  if (!entries.length || entries.length > 256) return null;
  const out = {};
  let bytes = 0;
  for (const [key, value] of entries) {
    if (!/^[a-zA-Z][a-zA-Z0-9._-]*$/.test(key)) return null;
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') return null;
    let raw;
    try {
      raw = typeof value === 'string' ? value : JSON.stringify(value);
      JSON.parse(raw);
    } catch (_) {
      return null;
    }
    bytes += key.length + raw.length;
    if (bytes > MAX_BACKUP_BYTES) return null;
    out[key] = raw;
  }
  return out;
}

function replaceLocalNamespace(rawMap) {
  const stagingPrefix = `${NS}__import__:`;
  const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const staged = [];
  try {
    for (const [key, raw] of Object.entries(rawMap)) {
      const stageKey = `${stagingPrefix}${token}:${key}`;
      localStorage.setItem(stageKey, raw);
      if (localStorage.getItem(stageKey) !== raw) throw new Error('Staging verification failed');
      staged.push(stageKey);
    }

    const current = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(NS) && !key.startsWith(stagingPrefix)) current.push(key);
    }
    current.forEach((key) => localStorage.removeItem(key));
    Object.entries(rawMap).forEach(([key, raw]) => localStorage.setItem(_key(key), raw));
    for (const [key, raw] of Object.entries(rawMap)) {
      if (localStorage.getItem(_key(key)) !== raw) throw new Error('Import verification failed');
    }
  } finally {
    staged.forEach((key) => {
      try { localStorage.removeItem(key); } catch (_) {}
    });
  }
}

function restoreLocalNamespace(rawMap) {
  const doomed = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(NS)) doomed.push(key);
  }
  doomed.forEach((key) => localStorage.removeItem(key));
  Object.entries(rawMap).forEach(([key, raw]) => localStorage.setItem(_key(key), raw));
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

  /** Canonical full-device backup with checksum and schema metadata. */
  exportBackup() {
    const data = this.exportAll();
    const payload = JSON.stringify(data);
    return {
      format: 'masterycap-backup',
      v: BACKUP_FORMAT,
      schemaVersion: this.get(KEYS.schemaVersion, 0),
      checksum: djb2(payload),
      data,
      exportedAt: new Date().toISOString(),
    };
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
   * Import backup atomically. Accepts legacy flat map, v1, and canonical v2.
   * Returns Promise<{ ok, error?, rollbackAvailable? }>.
   */
  async importBackup(obj, { skipSnapshot = false } = {}) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
      return { ok: false, error: 'invalid' };
    }
    if (obj.version === 'institute' && !obj.data) {
      return { ok: false, error: 'partial_backup' };
    }
    if (obj.format && obj.format !== 'masterycap-backup') {
      return { ok: false, error: 'invalid' };
    }
    if (Number(obj.v || 1) > BACKUP_FORMAT) {
      return { ok: false, error: 'unsupported_version' };
    }
    let data = obj;
    if (obj.data && typeof obj.data === 'object' && !Array.isArray(obj.data)) {
      if (obj.checksum) {
        const payload = JSON.stringify(obj.data);
        if (djb2(payload) !== obj.checksum) return { ok: false, error: 'checksum_fail' };
      }
      data = obj.data;
    }
    const normalized = normalizeRawMap(data);
    if (!normalized) return { ok: false, error: 'invalid' };

    const before = this.exportBackup();
    let rollbackAvailable = false;
    try {
      if (!skipSnapshot) {
        rollbackAvailable = await idbSetAbsolute(PREIMPORT_KEY(), before);
      }
      replaceLocalNamespace(normalized);
      await idbReplaceNs(normalized);
      if (rollbackAvailable) {
        this.set(KEYS.preImportAvailable, true);
        await idbSet(KEYS.preImportAvailable, JSON.stringify(true));
      }
      return { ok: true, rollbackAvailable };
    } catch (_) {
      try {
        restoreLocalNamespace(before.data);
        await idbReplaceNs(before.data);
      } catch (_) {}
      return { ok: false, error: 'write_fail' };
    }
  },

  async restorePreImport() {
    const snapshot = await idbGetAbsolute(PREIMPORT_KEY());
    if (!snapshot) return { ok: false, error: 'missing_snapshot' };
    const result = await this.importBackup(snapshot, { skipSnapshot: true });
    if (result.ok) this.remove(KEYS.preImportAvailable);
    return result;
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
    return Boolean(normalizeRawMap(obj));
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
    const target = 2;
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
  readingGuideSeen: 'readingGuideSeen',
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
  preImportAvailable: 'preImportAvailable',
  taxChecklist: 'taxChecklist',
  sessionRun: 'sessionRun',
  institute: 'institute',
  studentId: 'studentId',
  studentPhoto: 'studentPhoto',
};

export { djb2, QUOTA_WARN };
