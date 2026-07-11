/* ============================================================
   study.js — flashcard decks + local study notes (additive).
   ============================================================ */

import { store, KEYS } from './store.js';
import { GLOSSARY } from './data/glossary.js';
import { TRACKS, getTrack } from './data/tracks.js';
import { markToday } from './today.js';

function uid() {
  return `n_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
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

/** Flashcard: { id, front, back, source, trackId } */
export function buildGlossaryDeck(trackId = null, lang = 'en') {
  let pool = GLOSSARY.slice();
  if (trackId) pool = pool.filter((g) => (g.tracks || []).includes(trackId));
  if (pool.length < 8) pool = GLOSSARY.slice();
  return shuffle(pool).slice(0, 24).map((g, i) => ({
    id: `g:${g.term}:${i}`,
    front: g.term,
    back: lang === 'ur' ? g.ur : g.en,
    source: 'glossary',
    trackId: (g.tracks || [])[0] || null,
  }));
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
        id: `q:${trackId}:${weekId}:${qi}`,
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
        id: `m:${trackId}:${weekId}:${i}`,
        front: lang === 'en' ? 'Must memorize' : 'Yad rakho',
        back: m,
        source: 'memo',
        trackId,
      });
    });
  }
  // pad with glossary for that track
  if (cards.length < 6) {
    cards.push(...buildGlossaryDeck(trackId, lang).slice(0, 8));
  }
  return shuffle(cards).slice(0, 20);
}

export function buildMixDeck(lang = 'en') {
  const live = TRACKS.filter((t) => t.status === 'live');
  const pick = live[Math.floor(Math.random() * live.length)]?.id;
  const gloss = buildGlossaryDeck(null, lang).slice(0, 12);
  const weekCards = [];
  live.slice(0, 4).forEach((t) => {
    const tr = getTrack(t.id);
    const w = tr.weeks[0];
    if (w) weekCards.push(...buildWeekDeck(t.id, w.id, lang).slice(0, 2));
  });
  return shuffle([...gloss, ...weekCards]).slice(0, 16);
}

export function getCardStats() {
  return store.get(KEYS.flashStats, { seen: 0, known: 0, again: 0, streak: 0 }) || { seen: 0, known: 0, again: 0, streak: 0 };
}

export function recordCard(result) {
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
