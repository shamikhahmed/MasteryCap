/* ============================================================
   session.js — Guided daily session Continuity (v48.3).
   Composes steps via syllabus.buildDailySession; resumes mid-day;
   auto-advances on lesson/cards/quiz/sim milestones.
   ============================================================ */

import { store, KEYS } from './store.js';
import { icon } from './icons.js';
import { buildDailySession } from './syllabus.js';
import { getTrack } from './data/tracks.js';
import { canOpenTradingLab } from './gates.js';
import { openWeekFlash } from './views/study.js';
import { markToday } from './today.js';

const STEP_LABEL = {
  lesson: { en: 'Lesson', ur: 'Lesson' },
  'lesson-continue': { en: 'Lesson (continue)', ur: 'Lesson (jari)' },
  cards: { en: 'Flashcards', ur: 'Flashcards' },
  quiz: { en: 'Quiz', ur: 'Quiz' },
  sim: { en: 'Sim practice', ur: 'Sim practice' },
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function stepLabel(kind, lang) {
  return (STEP_LABEL[kind] || { en: kind, ur: kind })[lang] || kind;
}

function closeSheet() {
  document.getElementById('session-sheet')?.remove();
}

function saveRun(run) {
  store.set(KEYS.sessionRun, run);
}

function clearRun() {
  store.remove(KEYS.sessionRun);
}

function getRun() {
  return store.get(KEYS.sessionRun, null);
}

function stepMatches(stepKind, milestone) {
  if (milestone === 'lesson') return stepKind === 'lesson' || stepKind === 'lesson-continue';
  return stepKind === milestone;
}

function lessonRef(run) {
  return run?.steps?.find((s) => s.trackId && s.weekId) || null;
}

/** Build a fresh run for today (or resume / keep done snapshot same day). */
function ensureRun(App) {
  const existing = getRun();
  if (existing && existing.day === todayKey()) return existing;
  const plan = buildDailySession(App);
  const run = {
    day: todayKey(),
    mins: plan.mins,
    step: 0,
    done: false,
    steps: plan.steps.map((s) => ({ ...s })),
  };
  saveRun(run);
  return run;
}

/**
 * Snapshot for Home CTA: Start / Resume / done today.
 * @returns {{ active: boolean, doneToday: boolean, step?: number, total?: number, kind?: string, mins?: number }}
 */
export function sessionStatus() {
  const run = getRun();
  if (!run || run.day !== todayKey()) return { active: false, doneToday: false };
  if (run.done) return { active: false, doneToday: true, mins: run.mins, total: run.steps.length };
  return {
    active: true,
    doneToday: false,
    step: run.step + 1,
    total: run.steps.length,
    kind: run.steps[run.step]?.kind,
    mins: run.mins,
  };
}

function executeStep(App, step) {
  if (!step) return;
  App.haptic();
  const ref = lessonRef(getRun());
  if (step.kind === 'lesson' || step.kind === 'lesson-continue') {
    const trackId = step.trackId || ref?.trackId;
    const weekId = step.weekId || ref?.weekId;
    if (!trackId) { App.navigate('learn'); return; }
    App.navigate('learn');
    window.dispatchEvent(new CustomEvent('masterycap:focus-track', {
      detail: { trackId, weekId: weekId || null, kind: weekId ? 'week' : 'home' },
    }));
    return;
  }
  if (step.kind === 'cards') {
    if (ref?.trackId && ref?.weekId) {
      openWeekFlash(App, ref.trackId, ref.weekId, { limit: step.count || 0 });
    } else {
      App.openStudy();
    }
    return;
  }
  if (step.kind === 'quiz') {
    const trackId = step.trackId || ref?.trackId;
    const weekId = step.weekId || ref?.weekId;
    if (trackId && weekId != null) {
      App.navigate('learn');
      window.dispatchEvent(new CustomEvent('masterycap:focus-track', {
        detail: { trackId, weekId, kind: 'quiz' },
      }));
    } else {
      App.navigate('learn');
    }
    return;
  }
  if (step.kind === 'sim') {
    if (canOpenTradingLab(App)) App.openSim();
    else App.openDrills();
  }
}

/** Advance to next step after user finishes current one. */
export function advanceSession(App) {
  const run = getRun();
  if (!run || run.done) return;
  run.step = Math.min(run.step + 1, run.steps.length);
  if (run.step >= run.steps.length) {
    run.done = true;
    saveRun(run);
    markToday('lesson');
    showDoneSheet(App, run);
    return;
  }
  saveRun(run);
  executeStep(App, run.steps[run.step]);
  renderSessionBar(App);
}

/**
 * Auto-advance when current step matches milestone kind.
 * @returns {boolean} true if advanced
 */
export function notifySessionMilestone(App, kind) {
  const run = getRun();
  if (!run || run.done || run.day !== todayKey()) return false;
  const cur = run.steps[run.step];
  if (!cur || !stepMatches(cur.kind, kind)) return false;
  advanceSession(App);
  return true;
}

function showDoneSheet(App, run) {
  closeSheet();
  document.getElementById('session-bar')?.remove();
  const lang = App.lang;
  const el = document.createElement('div');
  el.id = 'session-sheet';
  el.className = 'sheet-root';
  el.innerHTML = `
    <div class="sheet-backdrop" data-close></div>
    <div class="sheet" role="dialog" aria-label="${App.t('session_done')}">
      <div class="sheet-handle"></div>
      <div class="sheet-head"><div class="slabel">${App.t('session_done')}</div>
        <button class="sheet-x" data-close aria-label="${App.t('back')}">${icon('x', { size: 18 })}</button>
      </div>
      <div class="sheet-body">
        <p style="font-size:15px;line-height:1.5;color:var(--t2)">${lang === 'en'
          ? `You worked through a ${run.mins}-min plan. Come back tomorrow — or open Campus for more.`
          : `${run.mins}-min plan mukammal. Kal wapas ao — ya Campus kholo.`}</p>
        <button class="btn accent mt14" id="sessionHome" style="width:100%">${lang === 'en' ? 'Today' : 'Aaj'}</button>
      </div>
    </div>`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('on'));
  const close = () => { closeSheet(); App.navigate('today'); };
  el.querySelectorAll('[data-close]').forEach((n) => n.addEventListener('click', close));
  el.querySelector('#sessionHome')?.addEventListener('click', close);
}

/** Floating bar while a session is active. */
export function renderSessionBar(App) {
  document.getElementById('session-bar')?.remove();
  const run = getRun();
  if (!run || run.done || run.day !== todayKey()) return;
  const lang = App.lang;
  const cur = run.steps[run.step];
  if (!cur) return;
  const n = run.step + 1;
  const m = run.steps.length;
  const bar = document.createElement('div');
  bar.id = 'session-bar';
  bar.setAttribute('role', 'status');
  bar.style.cssText = 'position:fixed;left:12px;right:12px;bottom:calc(64px + env(safe-area-inset-bottom,0px));z-index:40;display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--bg2,#12141a);border:1px solid var(--line);border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.35)';
  const skipBtn = cur.optional
    ? `<button class="btn secondary" id="sessionSkip" style="flex-shrink:0;padding:8px 10px">${App.t('session_skip')}</button>`
    : '';
  bar.innerHTML = `
    <div style="flex:1;min-width:0">
      <div class="slabel" style="margin:0">${App.t('session_title')} · ${n}/${m}</div>
      <div style="font-size:13px;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${stepLabel(cur.kind, lang)}${cur.count ? ` ×${cur.count}` : ''}${cur.optional ? ` (${lang === 'en' ? 'optional' : 'optional'})` : ''}</div>
    </div>
    ${skipBtn}
    <button class="btn accent" id="sessionNext" style="flex-shrink:0;padding:8px 12px">${App.t('session_next')}</button>`;
  document.body.appendChild(bar);
  bar.querySelector('#sessionNext')?.addEventListener('click', () => advanceSession(App));
  bar.querySelector('#sessionSkip')?.addEventListener('click', () => advanceSession(App));
}

/**
 * Open the session plan sheet. Start runs step 0 and shows the bar.
 * Resume continues mid-session for today.
 */
export function openSessionRunner(App) {
  closeSheet();
  const run = ensureRun(App);
  const lang = App.lang;
  const el = document.createElement('div');
  el.id = 'session-sheet';
  const rows = run.steps.map((s, i) => {
    const done = i < run.step;
    const active = i === run.step && !run.done;
    const track = s.trackId ? getTrack(s.trackId) : null;
    const sub = track && s.weekId
      ? `${track.name[lang]} · ${App.t('week')} ${s.weekId}`
      : (s.count ? `×${s.count}` : (s.optional ? (lang === 'en' ? 'optional' : 'optional') : ''));
    return `<div class="check-row" style="opacity:${done ? 0.45 : 1};border-color:${active ? 'var(--acc)' : 'transparent'}">
      <span class="check-box" style="${done ? 'background:var(--acc);border-color:var(--acc);color:#000' : ''}">${done ? icon('check', { size: 12 }) : (i + 1)}</span>
      <span class="check-t"><strong>${stepLabel(s.kind, lang)}</strong>${sub ? `<br/><span style="color:var(--t3);font-size:12px">${sub}</span>` : ''}</span>
    </div>`;
  }).join('');

  el.className = 'sheet-root';
  el.innerHTML = `
    <div class="sheet-backdrop" data-close></div>
    <div class="sheet" role="dialog" aria-label="${App.t('session_title')}">
      <div class="sheet-handle"></div>
      <div class="sheet-head">
        <div class="slabel">${App.t('session_title')} · ${run.mins} min</div>
        <button class="sheet-x" data-close aria-label="${App.t('back')}">${icon('x', { size: 18 })}</button>
      </div>
      <div class="sheet-body">
        <p style="font-size:13px;color:var(--t3);line-height:1.45;margin-bottom:12px">${App.t('session_blurb')}</p>
        ${rows}
        <button class="btn accent mt14" id="sessionStart" style="width:100%">${
          run.done
            ? (lang === 'en' ? 'Start another plan' : 'Naya plan')
            : (run.step > 0 ? App.t('session_resume') : App.t('session_start'))
        }</button>
        ${run.step > 0 && !run.done ? `<button class="btn ghost mt10" id="sessionReset" style="width:100%">${lang === 'en' ? 'Restart plan' : 'Plan dubara'}</button>` : ''}
        ${run.done ? `<button class="btn ghost mt10" id="sessionReset" style="width:100%">${lang === 'en' ? 'Clear & rebuild' : 'Clear & rebuild'}</button>` : ''}
      </div>
    </div>`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('on'));

  el.querySelectorAll('[data-close]').forEach((n) => n.addEventListener('click', () => closeSheet()));
  el.querySelector('#sessionStart')?.addEventListener('click', () => {
    closeSheet();
    if (run.done) {
      clearRun();
      const fresh = ensureRun(App);
      executeStep(App, fresh.steps[0]);
      renderSessionBar(App);
      return;
    }
    executeStep(App, run.steps[run.step]);
    renderSessionBar(App);
  });
  el.querySelector('#sessionReset')?.addEventListener('click', () => {
    clearRun();
    closeSheet();
    openSessionRunner(App);
  });
}

/** Re-attach bar after App.render if mid-session. */
export function syncSessionBar(App) {
  const run = getRun();
  if (run && !run.done && run.day === todayKey()) renderSessionBar(App);
  else document.getElementById('session-bar')?.remove();
}

if (typeof window !== 'undefined' && !window.__mcSessionMilestoneBound) {
  window.__mcSessionMilestoneBound = true;
  window.addEventListener('masterycap:session-milestone', (e) => {
    const { kind, App } = e.detail || {};
    if (App && kind) notifySessionMilestone(App, kind);
  });
}
