/* ============================================================
   study.js — flashcard decks + Leitner SRS + local notes.
   ============================================================ */

import { store, KEYS } from './store.js';
import { GLOSSARY } from './data/glossary.js';
import { TRACKS, getTrack } from './data/tracks.js';
import { markToday } from './today.js';

const BOX_DELAY = [1, 3, 7, 14, 30]; // days by box 1..5 after a "known"

function uid() {
  return `n_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

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

export function getNotes() {
  return store.get(KEYS.studyNotes, []) || [];
}

export function saveNote({ trackId, weekId, text, id }) {
  const notes = getNotes();
  const clean = String(text || '').trim();
  if (!clean) return notes;
  if (id) {
    const i = notes.findIndex((n) => n.id === id);
    if (i >= 0) {
      notes[i] = { ...notes[i], text: clean, updatedAt: new Date().toISOString() };
      store.set(KEYS.studyNotes, notes);
      return notes;
    }
  }
  notes.unshift({
    id: uid(),
    trackId: trackId || null,
    weekId: weekId ?? null,
    text: clean,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  store.set(KEYS.studyNotes, notes);
  return notes;
}

export function deleteNote(id) {
  const notes = getNotes().filter((n) => n.id !== id);
  store.set(KEYS.studyNotes, notes);
  return notes;
}

export function notesForWeek(trackId, weekId) {
  return getNotes().filter((n) => n.trackId === trackId && Number(n.weekId) === Number(weekId));
}

function stableCardId(prefix, parts) {
  return `${prefix}:${parts.join(':')}`;
}

function getSrs() {
  return store.get(KEYS.flashSrs, {}) || {};
}

function setSrs(map) {
  store.set(KEYS.flashSrs, map);
}

/** Is card due today (or never seen)? */
export function isCardDue(cardId, today = dayKey()) {
  const cur = getSrs()[cardId];
  if (!cur || !cur.due) return true;
  return cur.due <= today;
}

export function dueFlashCount(today = dayKey()) {
  const srs = getSrs();
  return Object.values(srs).filter((c) => c && c.due && c.due <= today).length;
}

function prioritizeDue(cards) {
  const today = dayKey();
  const due = [];
  const later = [];
  cards.forEach((c) => {
    if (isCardDue(c.id, today)) due.push(c);
    else later.push(c);
  });
  if (due.length >= 6) return shuffle(due).slice(0, 24);
  return shuffle([...due, ...shuffle(later)]).slice(0, 24);
}

/** Flashcard: { id, front, back, source, trackId } */
export function buildGlossaryDeck(trackId = null, lang = 'en') {
  let pool = GLOSSARY.slice();
  if (trackId) pool = pool.filter((g) => (g.tracks || []).includes(trackId));
  if (pool.length < 8) pool = GLOSSARY.slice();
  const cards = shuffle(pool).slice(0, 32).map((g) => ({
    id: stableCardId('g', [g.term]),
    front: g.term,
    back: lang === 'ur' ? g.ur : g.en,
    source: 'glossary',
    trackId: (g.tracks || [])[0] || null,
  }));
  return prioritizeDue(cards);
}

export function buildWeekDeck(trackId, weekId, lang = 'en') {
  const track = getTrack(trackId);
  const w = track?.weeks?.find((x) => x.id === Number(weekId));
  if (!w) return buildGlossaryDeck(trackId, lang);
  const cards = [];
  (w.quiz || []).forEach((q, qi) => {
    const front = q.q?.[lang] || q.q?.en;
    const back = q.explain?.[lang] || q.explain?.en
      || (q.opts?.[lang] || q.opts?.en)?.[q.correct];
    if (front && back) {
      cards.push({
        id: stableCardId('q', [trackId, weekId, qi]),
        front,
        back,
        source: 'quiz',
        trackId,
      });
    }
  });
  const memo = w.memo?.[lang] || w.memo?.en;
  if (Array.isArray(memo)) {
    memo.forEach((m, i) => {
      cards.push({
        id: stableCardId('m', [trackId, weekId, i]),
        front: lang === 'en' ? 'Must memorize' : 'Yad rakho',
        back: m,
        source: 'memo',
        trackId,
      });
    });
  }
  if (cards.length < 6) {
    cards.push(...buildGlossaryDeck(trackId, lang).slice(0, 8));
  }
  return prioritizeDue(shuffle(cards).slice(0, 24));
}

export function buildMixDeck(lang = 'en') {
  const live = TRACKS.filter((t) => t.status === 'live');
  const gloss = buildGlossaryDeck(null, lang).slice(0, 14);
  const weekCards = [];
  live.slice(0, 5).forEach((t) => {
    const tr = getTrack(t.id);
    const w = tr.weeks[0];
    if (w) weekCards.push(...buildWeekDeck(t.id, w.id, lang).slice(0, 3));
  });
  return prioritizeDue(shuffle([...gloss, ...weekCards]).slice(0, 18));
}

export function getCardStats() {
  return store.get(KEYS.flashStats, { seen: 0, known: 0, again: 0, streak: 0 }) || { seen: 0, known: 0, again: 0, streak: 0 };
}

/**
 * Record answer + update Leitner box for cardId.
 * Again → box 1, due tomorrow. Got it → bump box, delay [1,3,7,14,30].
 */
export function recordCard(result, cardId) {
  const s = getCardStats();
  s.seen = (s.seen || 0) + 1;
  if (result === 'known') {
    s.known = (s.known || 0) + 1;
    s.streak = (s.streak || 0) + 1;
  } else {
    s.again = (s.again || 0) + 1;
    s.streak = 0;
  }
  store.set(KEYS.flashStats, s);

  if (cardId) {
    const today = dayKey();
    const map = getSrs();
    const cur = map[cardId] || { box: 1, due: today };
    if (result === 'known') {
      const box = Math.min(5, (cur.box || 1) + 1);
      const delay = BOX_DELAY[box - 1] || 30;
      map[cardId] = { box, due: addDays(today, delay) };
    } else {
      map[cardId] = { box: 1, due: addDays(today, 1) };
    }
    setSrs(map);
  }

  if (s.seen % 5 === 0) markToday('review');
  return s;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
