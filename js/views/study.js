/* ============================================================
   study.js view — Flashcards + Notes + Mix round (fun, not boring).
   ============================================================ */

import { icon } from '../icons.js';
import {
  buildGlossaryDeck, buildWeekDeck, buildMixDeck,
  getNotes, saveNote, deleteNote, getCardStats, recordCard, dueFlashCount,
} from '../study.js';
import { TRACKS } from '../data/tracks.js';
import { markToday } from '../today.js';

let APP = null;
let ROOT = null;
let S = {
  mode: 'hub', // hub | cards | notes
  deck: [],
  idx: 0,
  flipped: false,
  filterTrack: '',
  noteDraft: '',
};

export function renderStudy(App, c) {
  APP = App;
  ROOT = c;
  if (S.mode === 'cards') return drawCards();
  if (S.mode === 'notes') return drawNotes();
  drawHub();
}

function drawHub() {
  const App = APP;
  const lang = App.lang;
  const stats = getCardStats();
  const notes = getNotes();
  ROOT.innerHTML = `<div class="screen study-hub">
    <button class="backlink" id="studyBack">${icon('back', { size: 16 })} ${App.t('back')}</button>
    <div class="kicker">${App.t('study_kicker')}</div>
    <h1>${App.t('study_title')}</h1>
    <p style="font-size:14px;color:var(--t2);line-height:1.55;margin:8px 0 18px">${App.t('study_blurb')}</p>

    <div class="stat-strip" style="margin-bottom:16px">
      <div class="stat-cell"><div class="sc-l">${App.t('study_due')}</div><div class="sc-v" style="color:var(--acc)">${dueFlashCount()}</div></div>
      <div class="stat-cell"><div class="sc-l">${App.t('study_seen')}</div><div class="sc-v">${stats.seen || 0}</div></div>
      <div class="stat-cell"><div class="sc-l">${App.t('study_known')}</div><div class="sc-v" style="color:var(--up)">${stats.known || 0}</div></div>
      <div class="stat-cell"><div class="sc-l">${App.t('study_notes_n')}</div><div class="sc-v">${notes.length}</div></div>
    </div>

    <button class="btn accent study-launch" id="goFlashMix" style="width:100%;margin-bottom:10px">
      ${icon('bolt', { size: 18 })} ${App.t('study_mix')}
    </button>
    <button class="btn secondary" id="goFlashGloss" style="width:100%;margin-bottom:10px">
      ${icon('book', { size: 17 })} ${App.t('study_gloss_cards')}
    </button>
    <button class="btn secondary" id="goNotes" style="width:100%;margin-bottom:10px">
      ${icon('journal', { size: 17 })} ${App.t('study_notes')}
    </button>

    <div class="panel pad mt14">
      <div class="slabel">${App.t('study_track_deck')}</div>
      <div class="seg" style="width:100%;margin-top:10px;flex-wrap:wrap;gap:4px">
        ${TRACKS.filter((t) => t.status === 'live').slice(0, 8).map((t) =>
          `<button type="button" data-deck-track="${t.id}" style="flex:1;min-width:28%">${t.name[lang]}</button>`).join('')}
      </div>
    </div>
    <p class="note-box mt14" style="font-size:13px">${App.t('study_fun_hint')}</p>
    <p class="note-box mt10" style="font-size:12.5px;color:var(--t3)">${App.t('study_srs_hint')}</p>
  </div>`;

  document.getElementById('studyBack')?.addEventListener('click', () => {
    App.tab = App._studyReturn || 'dashboard';
    App.render(); App.renderNav();
  });
  document.getElementById('goFlashMix')?.addEventListener('click', () => startDeck(buildMixDeck(lang)));
  document.getElementById('goFlashGloss')?.addEventListener('click', () => startDeck(buildGlossaryDeck(null, lang)));
  document.getElementById('goNotes')?.addEventListener('click', () => { S.mode = 'notes'; App.haptic(); drawNotes(); });
  ROOT.querySelectorAll('[data-deck-track]').forEach((b) => b.addEventListener('click', () => {
    startDeck(buildGlossaryDeck(b.dataset.deckTrack, lang));
  }));
}

function startDeck(deck) {
  if (!deck.length) return;
  S.deck = deck;
  S.idx = 0;
  S.flipped = false;
  S.mode = 'cards';
  APP.haptic(8);
  drawCards();
}

function drawCards() {
  const App = APP;
  const lang = App.lang;
  const card = S.deck[S.idx];
  if (!card) {
    S.mode = 'hub';
    const stats = getCardStats();
    ROOT.innerHTML = `<div class="screen">
      <div class="kicker">${App.t('study_kicker')}</div>
      <h1>${App.t('study_done')}</h1>
      <p style="color:var(--t2);margin:12px 0 18px;line-height:1.5">${App.t('study_done_body').replace('{n}', String(stats.streak || 0))}</p>
      <div class="study-burst" aria-hidden="true"></div>
      <button class="btn accent" id="studyAgain" style="width:100%">${App.t('study_again')}</button>
      <button class="btn ghost mt10" id="studyHub" style="width:100%">${App.t('study_hub')}</button>
    </div>`;
    document.getElementById('studyAgain')?.addEventListener('click', () => startDeck(buildMixDeck(lang)));
    document.getElementById('studyHub')?.addEventListener('click', () => { S.mode = 'hub'; drawHub(); });
    markToday('review');
    if (typeof App.bumpStreak === 'function') App.bumpStreak();
    return;
  }

  const progress = Math.round(((S.idx) / S.deck.length) * 100);
  ROOT.innerHTML = `<div class="screen">
    <button class="backlink" id="cardBack">${icon('back', { size: 16 })} ${App.t('study_hub')}</button>
    <div class="spread" style="align-items:center;margin-bottom:8px">
      <div class="lesson-kicker" style="margin:0">${App.t('study_cards')} · ${S.idx + 1}/${S.deck.length}</div>
      <span class="pill mono">${card.source}</span>
    </div>
    <div class="prog-track" style="margin-bottom:16px"><i style="width:${progress}%"></i></div>

    <button type="button" class="fc-stage ${S.flipped ? 'flipped' : ''}" id="fcFlip" aria-label="${App.t('study_flip')}">
      <div class="fc-inner">
        <div class="fc-face fc-front">
          <div class="fc-label">${App.t('study_front')}</div>
          <div class="fc-text">${escapeHtml(card.front)}</div>
          <div class="fc-hint">${App.t('study_tap_flip')}</div>
        </div>
        <div class="fc-face fc-back">
          <div class="fc-label">${App.t('study_back')}</div>
          <div class="fc-text">${escapeHtml(card.back)}</div>
        </div>
      </div>
    </button>

    <div class="btn-row mt18" style="${S.flipped ? '' : 'opacity:0.35;pointer-events:none'}">
      <button class="btn secondary" id="fcAgain" style="flex:1">${App.t('study_again_card')}</button>
      <button class="btn accent" id="fcKnown" style="flex:1">${App.t('study_known_card')}</button>
    </div>
  </div>`;

  document.getElementById('cardBack')?.addEventListener('click', () => { S.mode = 'hub'; drawHub(); });
  document.getElementById('fcFlip')?.addEventListener('click', () => {
    S.flipped = !S.flipped;
    App.haptic(4);
    drawCards();
  });
  document.getElementById('fcAgain')?.addEventListener('click', () => {
    recordCard('again', card.id);
    App.haptic(6);
    const cur = S.deck.splice(S.idx, 1)[0];
    S.deck.push(cur);
    S.flipped = false;
    drawCards();
  });
  document.getElementById('fcKnown')?.addEventListener('click', () => {
    recordCard('known', card.id);
    App.haptic(10);
    S.idx++;
    S.flipped = false;
    drawCards();
  });
}

function drawNotes() {
  const App = APP;
  const lang = App.lang;
  const notes = getNotes();
  ROOT.innerHTML = `<div class="screen">
    <button class="backlink" id="notesBack">${icon('back', { size: 16 })} ${App.t('study_hub')}</button>
    <div class="kicker">${App.t('study_notes')}</div>
    <h1>${App.t('study_notes_title')}</h1>
    <p style="font-size:13.5px;color:var(--t3);margin:8px 0 14px;line-height:1.5">${App.t('study_notes_hint')}</p>

    <div class="panel pad" style="margin-bottom:14px">
      <textarea id="noteIn" rows="4" placeholder="${App.t('study_notes_ph')}" style="width:100%;background:var(--surface-2);border:1px solid var(--line);border-radius:var(--r2);color:var(--t1);padding:12px;font:inherit;resize:vertical">${escapeHtml(S.noteDraft)}</textarea>
      <button class="btn accent mt10" id="noteSave" style="width:100%">${App.t('study_notes_save')}</button>
    </div>

    ${notes.length ? notes.map((n) => `
      <div class="panel pad" style="margin-bottom:10px" data-note="${n.id}">
        <div style="font-size:12px;color:var(--t3);margin-bottom:6px" class="mono">${(n.trackId || '—')}${n.weekId != null ? ` · W${n.weekId}` : ''} · ${String(n.updatedAt || '').slice(0, 10)}</div>
        <div style="font-size:14.5px;line-height:1.5;color:var(--t1);white-space:pre-wrap">${escapeHtml(n.text)}</div>
        <button class="pill mt10" data-del-note="${n.id}">${App.t('study_notes_del')}</button>
      </div>`).join('') : `<div class="empty">${App.t('study_notes_empty')}</div>`}
  </div>`;

  document.getElementById('notesBack')?.addEventListener('click', () => { S.mode = 'hub'; drawHub(); });
  const inp = document.getElementById('noteIn');
  inp?.addEventListener('input', (e) => { S.noteDraft = e.target.value; });
  document.getElementById('noteSave')?.addEventListener('click', () => {
    saveNote({ text: S.noteDraft });
    S.noteDraft = '';
    App.haptic(8);
    markToday('review');
    drawNotes();
  });
  ROOT.querySelectorAll('[data-del-note]').forEach((b) => b.addEventListener('click', () => {
    deleteNote(b.dataset.delNote);
    App.haptic();
    drawNotes();
  }));
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Open week-specific deck from Learn. */
export function openWeekFlash(App, trackId, weekId) {
  APP = App;
  S.mode = 'cards';
  S.deck = buildWeekDeck(trackId, weekId, App.lang);
  S.idx = 0;
  S.flipped = false;
  App._studyReturn = 'learn';
  App.tab = 'study';
  App.render();
  App.renderNav();
}

export function openStudyNotes(App, seed = {}) {
  APP = App;
  S.mode = 'notes';
  if (seed.text) S.noteDraft = seed.text;
  App._studyReturn = App.tab === 'study' ? 'dashboard' : App.tab;
  App.tab = 'study';
  App.render();
  App.renderNav();
}
