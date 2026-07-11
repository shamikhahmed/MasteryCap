/* ============================================================
   course.js — Learn tab. Track selector + course engine
   (placement, gated weeks, quizzes, XP) scoped per track.
   Engine ported verbatim; presentation rebuilt.
   ============================================================ */

import { TRACKS, getTrack } from '../data/tracks.js';
import { icon, TRACK_ICON } from '../icons.js';
import { injectFigures } from '../figures.js';
import { openGlossary } from '../glossary.js';
import { linkGlossaryTerms, findTerm } from '../data/glossary.js';
import { injectLessonExtras, renderMemoPanel, renderSkim, renderFormulaStrip } from '../lesson-extras.js';
import { mergeWeekExtras, prefixMarkers } from '../week-extras.js';
import { BEGINNER_PATH, graduationFor } from '../data/paths.js';
import { appendBody } from '../data/thicken.js';
import { store, KEYS as STORE_KEYS } from '../store.js';
import { recordMistake } from '../mistakes.js';
import {
  BINARY_GATE, buildExam, scoreExam, markExamPassed, trackComplete, downloadCertificate,
} from '../exam.js';
import { openSearch } from '../search.js';
import { GLOSSARY } from '../data/glossary.js';
import { openHowto } from '../howto.js';
import { gradStatus, markGraduated, isGraduated } from '../graduation.js';

let S = {
  track: 'foundations', view: 'home', activeWeek: null,
  placementAnswers: {}, placementMsg: null, placementOrder: null,
  quizAnswers: {}, quizSubmitted: false, quizMsg: null, quizOrder: null, lastMastered: 0,
  gateAnswers: {}, gateOrder: null,
  exam: null, examAnswers: {}, examSubmitted: false,
  glossMini: null, glossAnswers: {},
  dirty: false,
};
let APP = null, ROOT = null;
const KEYS = ['A', 'B', 'C', 'D'];

/* Fisher–Yates permutation of [0..n). Never mutates data modules. */
function shuffleOrder(n) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function buildQuizOrders(w) {
  S.quizOrder = w.quiz.map((q) => shuffleOrder(q.opts.en.length));
}

function buildPlacementOrders(track) {
  S.placementOrder = track.placement.map((q) => shuffleOrder(q.opts.en.length));
}

export function renderCourse(App, c) {
  APP = App; ROOT = c;
  if (S.view === 'placementResult') S.view = 'home';
  draw();
}

function applyFocusDetail(detail) {
  if (!detail?.trackId) return;
  S.track = detail.trackId;
  if (detail.kind === 'week' && detail.weekId != null) {
    S.activeWeek = detail.weekId;
    S.view = 'week';
  } else if (detail.kind === 'placement' || detail.kind === 'home' || detail.kind === 'start') {
    S.view = 'home';
    S.activeWeek = detail.weekId || null;
  } else {
    S.view = 'home';
  }
  S.dirty = false;
}

if (typeof window !== 'undefined' && !window.__mcFocusBound) {
  window.__mcFocusBound = true;
  window.addEventListener('masterycap:focus-track', (e) => {
    applyFocusDetail(e.detail || {});
    if (APP && ROOT) draw();
  });
}

const pct = (n) => Math.round(n);
const scls = (st) => ({ completed: 'done', current: 'current', mastered: 'mastered', locked: 'locked' }[st] || 'locked');
const slabel = (App, st) => App.t(st === 'completed' ? 'completed' : st === 'current' ? 'current' : st === 'mastered' ? 'mastered' : 'locked');

function draw() {
  if (S.view === 'placement') return drawPlacement();
  if (S.view === 'placementResult') return drawPlacementResult();
  if (S.view === 'week') return drawWeek();
  if (S.view === 'quiz') return drawQuiz();
  if (S.view === 'gate') return drawBinaryGate();
  if (S.view === 'exam') return drawExam();
  if (S.view === 'glossMini') return drawGlossMini();
  drawHome();
}

function drawHome() {
  const App = APP, c = ROOT, lang = App.lang;
  const track = getTrack(S.track);

  const rail = `<div class="track-rail">${TRACKS.map((t) => `
    <button class="track-chip ${t.id === S.track ? 'on' : ''}" data-track="${t.id}">
      <span class="tc-ic">${icon(TRACK_ICON[t.id], { size: 18 })}</span>
      <span><span class="tc-name">${t.name[lang]}</span><br/><span class="tc-meta">${t.weeks.length} MOD · <span class="tc-dot ${t.status === 'live' ? 'dot-live' : 'dot-soon'}" style="display:inline-block"></span> ${t.status === 'live' ? 'LIVE' : 'SOON'}</span></span>
    </button>`).join('')}</div>`;

  const header = `<div class="lt-head"><div class="head-row">
    <div><div class="kicker">${App.t('nav_learn')}</div><h1>${track.name[lang]}</h1></div>
    <div class="hstack">
      <button class="pill" id="openSearch" aria-label="${App.t('search_title')}">${icon('search', { size: 15 })}</button>
      <button class="pill" id="openGloss" aria-label="${App.t('glossary')}">${icon('book', { size: 15 })}</button>
      <span class="pill mono">${icon('bolt', { size: 13 })} ${App.totalXp()} XP</span>
    </div>
  </div></div>`;

  let body;
  if (track.status !== 'live') {
    body = `
      ${track.warning ? `<div class="note-box warn mt10" style="margin-bottom:16px"><strong>${App.lang === 'en' ? 'High-risk.' : 'High-risk.'}</strong> ${lang === 'en' ? 'Binary options are banned for retail in many countries and sit closer to gambling than trading. This track teaches why — not how to chase it.' : 'Binary options bohat mulkon mein retail ke liye banned hain, trading se zyada gambling ke qareeb. Ye track kyun samjhata hai — chase karna nahi.'}</div>` : ''}
      <div class="panel pad" style="text-align:center;margin-bottom:16px">
        <div style="width:44px;height:44px;margin:0 auto 12px;color:var(--acc-2)">${icon(TRACK_ICON[track.id], { size: 44, sw: 1.5 })}</div>
        <div style="font-size:17px;font-weight:600;letter-spacing:-0.02em">${lang === 'en' ? 'Curriculum ready' : 'Curriculum tayar'}</div>
        <p style="font-size:13.5px;color:var(--t3);margin:8px auto 0;line-height:1.55;max-width:34ch">${lang === 'en' ? 'The full path is mapped below. Bilingual lessons and quizzes are authored next.' : 'Poora rasta neeche mapped hai. Bilingual lessons aur quizzes agli baar likhe jayenge.'}</p>
      </div>
      <div class="panel">${track.weeks.map((w) => weekRow(App, w, 'locked', false)).join('')}</div>`;
  } else if (track.id === 'binary' && !store.get(STORE_KEYS.binaryGate)) {
    body = `${track.warning ? `<div class="note-box warn" style="margin-bottom:16px"><strong>High-risk.</strong> ${lang === 'en' ? 'Pass 3 harm-reduction questions before weeks unlock.' : 'Weeks se pehle 3 harm-reduction sawalat pass karo.'}</div>` : ''}
      <div class="panel pad">
        <div class="slabel">${App.t('gate_title')}</div>
        <p style="font-size:14px;color:var(--t2);line-height:1.55">${App.t('gate_body')}</p>
        <button class="btn accent mt18" id="startGate">${App.t('gate_start')}</button>
      </div>`;
  } else {
    const prog = App.getCourse(track.id);
    const warnBox = track.warning ? `<div class="note-box warn" style="margin-bottom:16px"><strong>${lang === 'en' ? 'High-risk.' : 'High-risk.'}</strong> ${lang === 'en' ? 'Binary options are banned for retail in many countries and sit closer to gambling than trading. This track teaches the math and the traps — self-defense, not endorsement.' : 'Binary options bohat mulkon mein retail ke liye banned hain, trading se zyada gambling ke qareeb. Ye track math aur jaal sikhata hai — self-defense, endorsement nahi.'}</div>` : '';
    if (!prog.placementDone) {
      body = `${warnBox}<div class="panel pad">
        <div class="slabel">${App.t('startPlacement')}</div>
        <p class="lesson-body" style="font-size:14.5px;color:var(--t1)">${App.t('placementIntro').replace('22', String(track.placement.length))}</p>
        <button class="btn accent mt18" id="startPlacement">${App.t('startPlacement')}</button>
      </div>`;
    } else {
      const weeks = track.weeks;
      const done = weeks.filter((w) => ['completed', 'mastered'].includes(prog.weekStatus[w.id])).length;
      const canExam = trackComplete(track.id, App);
      body = `${warnBox}
        <div class="prog-line">
          <span class="prog-num">${done}/${weeks.length}</span>
          <div class="prog-track"><i style="width:${pct((done / weeks.length) * 100)}%"></i></div>
          <span class="prog-num">${pct((done / weeks.length) * 100)}%</span>
        </div>
        ${beginnerPathPanel(App, track.id)}
        <div class="panel">${weeks.map((w) => {
          const st = prog.weekStatus[w.id] || 'locked';
          return weekRow(App, w, st, st !== 'locked');
        }).join('')}</div>
        ${graduationPanel(App, track.id, done, weeks.length, !!prog.examPassed)}
        ${canExam ? `<div class="panel pad mt14">
          <div class="slabel">${App.t('exam_title')}</div>
          <p style="font-size:13.5px;color:var(--t3);line-height:1.5;margin:8px 0 14px">${App.t('exam_body')}</p>
          ${prog.examPassed
            ? `<button class="btn secondary" id="dlCert">${App.t('exam_cert')}</button>
               <div class="pill mono mt10">${App.t('exam_passed')}: ${String(prog.examPassed).slice(0, 10)}</div>`
            : `<button class="btn accent" id="startExam">${App.t('exam_start')}</button>`}
        </div>` : ''}`;
    }
  }

  c.innerHTML = `<div class="screen">${header}${rail}
    ${track.id === 'foundations' ? `<div class="panel pad" style="margin-bottom:14px">
      <div class="slabel">${App.t('howto_title')}</div>
      <p style="font-size:13.5px;color:var(--t3);margin:8px 0 14px;line-height:1.5">${App.t('howto_honest')}</p>
      <button class="btn secondary" id="goHowtoLearn">${icon('check', { size: 17 })} ${App.t('howto_cta')}</button>
    </div>` : ''}
    <div class="panel pad" style="margin-bottom:14px">
      <div class="slabel">${App.t('drill_title')}</div>
      <p style="font-size:13.5px;color:var(--t3);margin:8px 0 14px;line-height:1.5">${App.t('drill_home_hint')}</p>
      <button class="btn secondary" id="goSimLearn" style="width:100%">${icon('journal', { size: 17 })} ${App.t('sim_cta')}</button>
      <button class="btn ghost mt10" id="goDrillsLearn" style="width:100%">${icon('target', { size: 17 })} ${App.t('drill_cta')}</button>
      <button class="btn ghost mt10" id="goChartsLearn" style="width:100%">${icon('progress', { size: 17 })} ${App.t('chart_cta')}</button>
    </div>
  ${body}</div>`;

  c.querySelectorAll('[data-track]').forEach((el) => el.addEventListener('click', () => { S.track = el.dataset.track; S.view = 'home'; App.haptic(); draw(); }));
  const activeChip = c.querySelector('.track-chip.on');
  if (activeChip) activeChip.scrollIntoView({ block: 'nearest', inline: 'center' });
  document.getElementById('goHowtoLearn')?.addEventListener('click', () => { App.haptic(); openHowto(App); });
  document.getElementById('goDrillsLearn')?.addEventListener('click', () => App.openDrills());
  document.getElementById('goChartsLearn')?.addEventListener('click', () => App.openCharts());
  document.getElementById('goSimLearn')?.addEventListener('click', () => App.openSim());
  document.getElementById('openGloss')?.addEventListener('click', () => { App.haptic(); openGlossary(App); });
  document.getElementById('openSearch')?.addEventListener('click', () => {
    App.haptic();
    openSearch(App, {
      onOpenWeek: (trackId, weekId) => {
        S.track = trackId; S.activeWeek = weekId; S.view = 'week'; draw();
      },
    });
  });
  document.getElementById('startGate')?.addEventListener('click', () => {
    S.view = 'gate'; S.gateAnswers = {}; S.gateOrder = BINARY_GATE.map((q) => shuffleOrder(q.opts.en.length));
    App.haptic(); draw();
  });
  document.getElementById('startExam')?.addEventListener('click', () => {
    S.exam = buildExam(track.id); S.examAnswers = {}; S.examSubmitted = false; S.view = 'exam'; S.dirty = true;
    App.haptic(); draw();
  });
  document.getElementById('dlCert')?.addEventListener('click', () => {
    const prog = App.getCourse(track.id);
    downloadCertificate({
      name: App.profile?.name || 'Trader',
      trackName: track.name[lang],
      dateIso: prog.examPassed || new Date().toISOString(),
      lang,
    });
  });
  document.getElementById('doGraduate')?.addEventListener('click', () => {
    const st = gradStatus(track.id, App);
    if (!st.ready || isGraduated(track.id)) return;
    markGraduated(track.id, st.evidence);
    const prog = App.getCourse(track.id);
    prog.xp = (prog.xp || 0) + 200;
    App.setCourse(track.id, prog);
    App.haptic(14);
    downloadCertificate({
      name: App.profile?.name || 'Trader',
      trackName: track.name[lang],
      dateIso: new Date().toISOString(),
      lang,
      evidence: st.evidence,
    });
    draw();
  });
  document.getElementById('gradCert')?.addEventListener('click', () => {
    const st = gradStatus(track.id, App);
    downloadCertificate({
      name: App.profile?.name || 'Trader',
      trackName: track.name[lang],
      dateIso: st.evidence.gradAt || new Date().toISOString(),
      lang,
      evidence: st.evidence,
    });
  });
  const sp = document.getElementById('startPlacement');
  if (sp) sp.addEventListener('click', () => {
    S.view = 'placement'; S.placementAnswers = {}; S.placementMsg = null; S.dirty = true;
    buildPlacementOrders(track); draw();
  });
  c.querySelectorAll('[data-week]').forEach((el) => el.addEventListener('click', () => { S.activeWeek = Number(el.dataset.week); S.view = 'week'; App.haptic(); draw(); }));
  c.querySelectorAll('[data-path-track]').forEach((el) => el.addEventListener('click', () => {
    S.track = el.dataset.pathTrack; S.view = 'home'; App.haptic(); draw();
  }));
}

function beginnerPathPanel(App, currentId) {
  const lang = App.lang;
  const steps = BEGINNER_PATH.map((p, i) => {
    const on = p.id === currentId;
    return `<button type="button" class="pill ${on ? 'acc' : ''}" data-path-track="${p.id}" style="margin:2px">${i + 1}. ${p.id}</button>`;
  }).join(' ');
  const cur = BEGINNER_PATH.find((p) => p.id === currentId);
  const why = cur ? (cur.why[lang] || cur.why.en) : '';
  return `<div class="panel pad" style="margin-bottom:14px">
    <div class="slabel">${App.t('path_title')}</div>
    <p style="font-size:12.5px;color:var(--t3);line-height:1.5;margin:8px 0 10px">${App.t('path_honest')}</p>
    <div style="display:flex;flex-wrap:wrap;gap:4px">${steps}</div>
    ${why ? `<p style="font-size:13px;color:var(--t2);line-height:1.5;margin:12px 0 0">${why}</p>` : ''}
  </div>`;
}

function missLabel(App, code, evidence) {
  const sim = evidence?.sim || {};
  const map = {
    exam: App.t('grad_miss_exam'),
    binary_gate: App.t('grad_miss_gate'),
    sim_trades_20: App.t('grad_miss_sim').replace('{n}', String(sim.tradeCount || 0)).replace('{m}', '20'),
    sim_pass_rate_80: App.t('grad_miss_rate').replace('{n}', String(Math.round((sim.processPassRate || 0) * 100))),
    sim_no_liq: App.t('grad_miss_liq'),
    sim_requires_s4: App.t('grad_miss_s4'),
    portfolio_coming: App.t('grad_miss_portfolio'),
    portfolio_adherence: App.t('grad_miss_portfolio_adh'),
  };
  return map[code] || code;
}

function metLabel(App, code, evidence) {
  const sim = evidence?.sim || {};
  const map = {
    exam: App.t('grad_met_exam'),
    binary_gate: App.t('grad_met_gate'),
    sim_trades_20: App.t('grad_met_sim').replace('{n}', String(sim.tradeCount || 0)).replace('{m}', '20'),
    sim_pass_rate_80: App.t('grad_met_rate').replace('{n}', String(Math.round((sim.processPassRate || 0) * 100))),
    sim_no_liq: App.t('grad_met_liq'),
    portfolio_adherence: App.t('grad_met_portfolio_adh'),
  };
  return map[code] || code;
}

function graduationPanel(App, trackId, done, total, examPassed) {
  const g = graduationFor(trackId);
  if (!g) return '';
  const lang = App.lang;
  const weeksReady = done >= total;
  const st = gradStatus(trackId, App);
  const graduated = isGraduated(trackId);
  const tone = g.tone === 'compound' ? 'acc' : g.tone === 'avoid' ? 'warn' : '';
  const steps = (g.steps[lang] || g.steps.en).map((s) => `<li style="margin-bottom:6px">${s}</li>`).join('');
  const metHtml = st.met.map((c) => `<div class="check-row on" style="border:1px solid var(--line);border-radius:var(--r2);margin-bottom:6px;pointer-events:none">
    <span class="check-box">${icon('checkThin', { size: 13, sw: 2.6 })}</span>
    <span class="check-t">${metLabel(App, c, st.evidence)}</span>
  </div>`).join('');
  const missHtml = st.missing.map((c) => `<div class="check-row" style="border:1px solid var(--line);border-radius:var(--r2);margin-bottom:6px;pointer-events:none">
    <span class="check-box"></span>
    <span class="check-t" style="color:var(--t3)">${missLabel(App, c, st.evidence)}</span>
  </div>`).join('');

  return `<div class="panel pad mt14">
    <div class="slabel">${App.t('grad_panel_title')}</div>
    <p style="font-size:13.5px;color:var(--t2);line-height:1.55;margin:8px 0 12px">${g.promise[lang] || g.promise.en}</p>
    ${!weeksReady ? `<div class="note-box" style="margin-bottom:12px">${App.t('path_finish_weeks').replace('{n}', String(total - done))}</div>` : ''}
    ${weeksReady && !examPassed ? `<div class="note-box" style="margin-bottom:12px">${App.t('path_take_exam')}</div>` : ''}
    <div class="slabel" style="margin-bottom:8px">${App.t('grad_requirements')}</div>
    ${metHtml}${missHtml}
    ${graduated
      ? `<div class="pill mono mt14">${App.t('grad_done')}: ${String(st.evidence.gradAt).slice(0, 10)}</div>
         <button class="btn secondary mt10" id="gradCert">${App.t('exam_cert')}</button>`
      : st.ready
        ? `<button class="btn accent mt14" id="doGraduate">${App.t('grad_cta')}</button>`
        : ''}
    <details style="margin-top:14px">
      <summary style="font-size:12px;color:var(--t3);cursor:pointer;text-transform:uppercase;letter-spacing:0.06em">${App.t('grad_howto')}</summary>
      <ol style="margin:10px 0 0;padding-left:18px;font-size:13.5px;color:var(--t1);line-height:1.45">${steps}</ol>
      <div class="note-box ${tone === 'warn' ? 'warn' : ''} mt14"><strong>${App.t('path_size_rule')}</strong> — ${g.sizeRule[lang] || g.sizeRule.en}</div>
    </details>
  </div>`;
}

function weekRow(App, w, st, clickable) {
  const cs = scls(st);
  const stIc = st === 'locked' ? 'lock' : (st === 'completed' || st === 'mastered') ? 'circleCheck' : 'chevron';
  return `<div class="week-row ${cs} ${st === 'locked' ? 'locked' : ''}" ${clickable ? `data-week="${w.id}"` : ''}>
    <span class="week-idx mono">${String(w.id).padStart(2, '0')}</span>
    <div class="week-body">
      <div class="wb-t">${w.title[App.lang]}</div>
      <div class="wb-s s-${cs}">${slabel(App, st)}</div>
    </div>
    ${icon(stIc, { size: 20, cls: 'week-state-ic' })}
  </div>`;
}

/* ---------------- WEEK ---------------- */
function drawWeek() {
  const App = APP, c = ROOT, lang = App.lang;
  const track = getTrack(S.track);
  const raw = track.weeks.find((x) => x.id === S.activeWeek);
  const w = mergeWeekExtras(track.id, raw);
  const st = App.getCourse(track.id).weekStatus[w.id];
  const skimOn = !!store.get(STORE_KEYS.skimMode);
  let body = prefixMarkers(w.body[lang], track.id, w.id, lang);
  body = appendBody(body, track.id, w.id, lang);
  body = injectFigures(body, lang);
  body = injectLessonExtras(body, lang);
  body = linkGlossaryTerms(body);
  const formula = renderFormulaStrip(w, lang);
  const memo = renderMemoPanel(w, lang);
  const skim = skimOn ? renderSkim(w, lang) : '';
  c.innerHTML = `<div class="screen">
    <button class="backlink" id="back">${icon('back', { size: 16 })} ${App.t('back')}</button>
    <div class="spread" style="align-items:center;margin-bottom:8px">
      <div class="lesson-kicker" style="margin:0">${App.t('week').toUpperCase()} ${String(w.id).padStart(2, '0')}</div>
      <button class="pill ${skimOn ? 'acc' : ''}" id="togSkim">${lang === 'en' ? 'Skim' : 'Skim'}</button>
    </div>
    ${formula}
    <h1 class="lesson-title">${w.title[lang]}</h1>
    <div class="lesson-progress"><i id="lessonProg" style="width:0%"></i></div>
    ${skim}
    <div class="lesson-body mt18" id="lessonBody">${body}</div>
    ${memo}
    <button class="btn accent mt22" id="startQuiz">${st === 'completed' || st === 'mastered' ? App.t('retakeQuiz') : App.t('takeQuiz')}</button>
  </div>`;
  document.getElementById('back').addEventListener('click', () => {
    if (S._back) {
      S.track = S._back.track;
      S.activeWeek = S._back.week;
      S._back = null;
      S.view = 'week';
      draw();
      return;
    }
    S.view = 'home'; draw();
  });
  document.getElementById('togSkim')?.addEventListener('click', () => {
    store.set(STORE_KEYS.skimMode, !store.get(STORE_KEYS.skimMode)); App.haptic(); draw();
  });
  document.getElementById('startQuiz').addEventListener('click', () => {
    S.view = 'quiz'; S.quizAnswers = {}; S.quizSubmitted = false; S.quizMsg = null;
    buildQuizOrders(w); App.haptic(); draw();
  });
  c.querySelectorAll('.gloss-term').forEach((el) => el.addEventListener('click', (e) => {
    e.preventDefault();
    App.haptic();
    showGlossPop(App, el);
  }));
  c.querySelectorAll('[data-xref-track]').forEach((el) => el.addEventListener('click', () => {
    S._back = { track: S.track, week: S.activeWeek };
    S.track = el.dataset.xrefTrack;
    S.activeWeek = Number(el.dataset.xrefWeek);
    S.view = 'week'; App.haptic(); draw();
  }));
  const bodyEl = document.getElementById('lessonBody');
  const bar = document.getElementById('lessonProg');
  if (bodyEl && bar) {
    const onScroll = () => {
      const screen = c.querySelector('.screen') || document.getElementById('app-root');
      const max = (screen?.scrollHeight || 1) - (screen?.clientHeight || 1);
      const pct = max > 0 ? Math.min(100, (screen.scrollTop / max) * 100) : 0;
      bar.style.width = pct + '%';
    };
    (document.getElementById('app-root') || c).addEventListener('scroll', onScroll, { passive: true });
  }
  App.bumpStreak();
}

function showGlossPop(App, el) {
  document.getElementById('gloss-pop')?.remove();
  const g = findTerm(el.dataset.term);
  if (!g) return;
  const pop = document.createElement('div');
  pop.id = 'gloss-pop';
  pop.className = 'gloss-pop';
  pop.innerHTML = `<div class="gp-term mono">${g.term}</div><div class="gp-def">${App.lang === 'ur' ? g.ur : g.en}</div>`;
  document.body.appendChild(pop);
  const r = el.getBoundingClientRect();
  const top = Math.min(window.innerHeight - 120, r.bottom + 8);
  let left = Math.max(12, Math.min(r.left, window.innerWidth - 280));
  pop.style.top = `${top}px`;
  pop.style.left = `${left}px`;
  const close = (ev) => {
    if (ev.target.closest?.('#gloss-pop') || ev.target.closest?.('.gloss-term')) return;
    pop.remove();
    document.removeEventListener('click', close, true);
  };
  setTimeout(() => document.addEventListener('click', close, true), 0);
}

/* ---------------- QUIZ ---------------- */
function quizScore(w) {
  let correct = 0; w.quiz.forEach((q, i) => { if (S.quizAnswers[i] === q.correct) correct++; });
  return { correct, total: w.quiz.length, passed: (correct / w.quiz.length) >= 0.7 };
}

function drawQuiz() {
  const App = APP, c = ROOT, lang = App.lang;
  const track = getTrack(S.track);
  const w = track.weeks.find((x) => x.id === S.activeWeek);

  let html = `<div class="screen"><button class="backlink" id="back">${icon('back', { size: 16 })} ${App.t('back')}</button>
    <div class="lesson-kicker">${App.t('week').toUpperCase()} ${String(w.id).padStart(2, '0')} · ${App.t('takeQuiz').toUpperCase()}</div>`;
  if (S.quizMsg && !S.quizSubmitted) html += `<div class="note-box err mt10" style="margin-bottom:6px">${S.quizMsg}</div>`;

  if (!S.quizOrder || S.quizOrder.length !== w.quiz.length) buildQuizOrders(w);

  w.quiz.forEach((q, i) => {
    const answered = S.quizSubmitted;
    const flag = !answered && S.quizMsg && S.quizAnswers[i] === undefined;
    const order = S.quizOrder[i];
    html += `<div class="q-block ${answered ? 'answered' : ''} ${flag ? 'flag' : ''}" id="qq${i}">
      <div class="q-num mono">Q${String(i + 1).padStart(2, '0')}</div>
      <div class="q-text">${q.q[lang]}</div>`;
    order.forEach((oi, di) => {
      const opt = q.opts[lang][oi];
      let cls = 'opt';
      if (S.quizAnswers[i] === oi) cls += ' selected';
      if (answered) { if (oi === q.correct) cls += ' correct'; else if (S.quizAnswers[i] === oi) cls += ' wrong'; }
      html += `<button class="${cls}" ${answered ? 'disabled' : ''} data-q="${i}" data-o="${oi}"><span class="opt-key">${KEYS[di]}</span><span>${opt}</span></button>`;
    });
    if (answered) html += `<div class="explain">${q.explain[lang]}</div>`;
    html += `</div>`;
  });

  if (!S.quizSubmitted) {
    html += `<button class="btn accent mt18" id="submitQuiz">${App.t('submit')}</button>`;
  } else {
    const sc = quizScore(w);
    html += `<div class="result">
      <div class="r-score ${sc.passed ? 'up' : 'down'}">${sc.correct}/${sc.total}</div>
      <div class="r-msg">${sc.passed ? App.t('passed') : App.t('failed')}</div>
    </div>
    <div class="note-box warn mt14"><strong>${App.t('psychTitle')} —</strong> ${lang === 'en' ? 'Before your next real trade on this topic: are you sizing from your risk calculator, or from how confident you feel right now?' : 'Is topic pe agli real trade se pehle: aap risk calculator se size kar rahe ho, ya abhi ke confidence se?'}</div>
    <button class="btn secondary mt14" id="quizDone">${App.t('next')}</button>`;
  }
  html += `</div>`;
  c.innerHTML = html;

  document.getElementById('back').addEventListener('click', () => {
    if (!S.quizSubmitted && Object.keys(S.quizAnswers).length && !confirmLeave(App)) return;
    S.view = 'week'; S.dirty = false; draw();
  });
  c.querySelectorAll('[data-q]').forEach((b) => b.addEventListener('click', () => {
    if (S.quizSubmitted) return;
    S.quizAnswers[Number(b.dataset.q)] = Number(b.dataset.o); S.quizMsg = null; S.dirty = true; App.haptic(); draw();
  }));
  const sub = document.getElementById('submitQuiz'); if (sub) sub.addEventListener('click', submitQuiz);
  const done = document.getElementById('quizDone'); if (done) done.addEventListener('click', () => {
    if (S._pendingGloss) { S.view = 'glossMini'; draw(); return; }
    S.view = 'home'; S.dirty = false; draw();
  });
}

function confirmLeave(App) {
  return confirm(App.t('leave_quiz'));
}

export function isCourseDirty() {
  if (!S.dirty) return false;
  if (S.view === 'quiz' && !S.quizSubmitted) return true;
  if (S.view === 'exam' && !S.examSubmitted) return true;
  if (S.view === 'placement' && Object.keys(S.placementAnswers).length) return true;
  if (S.view === 'gate' && Object.keys(S.gateAnswers).length) return true;
  return false;
}

export function confirmCourseLeave(App) {
  if (!isCourseDirty()) return true;
  return confirmLeave(App);
}

export function clearCourseDirty() {
  S.dirty = false;
  S.quizAnswers = {};
  S.examAnswers = {};
  S.view = 'home';
}

function submitQuiz() {
  const App = APP, lang = App.lang;
  const track = getTrack(S.track);
  const w = track.weeks.find((x) => x.id === S.activeWeek);
  if (w.quiz.some((q, i) => S.quizAnswers[i] === undefined)) {
    S.quizMsg = lang === 'en' ? 'Answer all questions first — unanswered ones are still open.' : 'Pehle sab jawab do — unanswered abhi khule hain.';
    draw(); return;
  }
  S.quizSubmitted = true; S.quizMsg = null;
  const sc = quizScore(w);
  w.quiz.forEach((q, i) => {
    if (S.quizAnswers[i] !== q.correct) {
      recordMistake(`${track.id}:${w.id}:${i}`, { kind: 'quiz' });
    }
  });
  const prog = App.getCourse(track.id);
  if (sc.passed) {
    prog.weekStatus[w.id] = 'completed'; prog.xp = (prog.xp || 0) + 50;
    const next = track.weeks.find((x) => x.id === w.id + 1);
    if (next && !['completed', 'mastered'].includes(prog.weekStatus[next.id])) prog.weekStatus[next.id] = 'current';
    App.haptic(20);
    S._pendingGloss = pickGlossMini(track.id, w);
  } else {
    prog.xp = (prog.xp || 0) + 10;
    S._pendingGloss = null;
  }
  App.setCourse(track.id, prog);
  App.bumpStreak();
  S.dirty = false;
  draw();
}

function pickGlossMini(trackId, week) {
  const terms = GLOSSARY.filter((g) => (g.tracks || []).includes(trackId)).slice(0, 12);
  if (terms.length < 3) return null;
  const shuffled = terms.slice().sort(() => Math.random() - 0.5).slice(0, 3);
  return shuffled.map((g) => {
    const wrong = GLOSSARY.filter((x) => x.term !== g.term).sort(() => Math.random() - 0.5).slice(0, 3);
    const opts = [g, ...wrong].sort(() => Math.random() - 0.5);
    return { term: g.term, correct: opts.findIndex((x) => x.term === g.term), opts };
  });
}

/* ---------------- PLACEMENT ---------------- */
function drawPlacement() {
  const App = APP, c = ROOT, lang = App.lang;
  const track = getTrack(S.track);
  const answered = Object.keys(S.placementAnswers).length;
  let html = `<div class="screen"><button class="backlink" id="back">${icon('back', { size: 16 })} ${App.t('back')}</button>
    <div class="lesson-kicker">${lang === 'en' ? 'PLACEMENT' : 'PLACEMENT'} · <span class="mono">${answered}/${track.placement.length}</span></div>`;
  if (S.placementMsg) html += `<div class="note-box err mt10" style="margin-bottom:6px">${S.placementMsg}</div>`;

  if (!S.placementOrder || S.placementOrder.length !== track.placement.length) buildPlacementOrders(track);

  track.placement.forEach((q, i) => {
    const flag = S.placementAnswers[i] === undefined && S.placementMsg;
    const order = S.placementOrder[i];
    html += `<div class="q-block ${flag ? 'flag' : ''}" id="pq${i}"><div class="q-num mono">Q${String(i + 1).padStart(2, '0')}</div><div class="q-text">${q.q[lang]}</div>`;
    order.forEach((oi, di) => {
      const opt = q.opts[lang][oi];
      html += `<button class="opt ${S.placementAnswers[i] === oi ? 'selected' : ''}" data-p="${i}" data-o="${oi}"><span class="opt-key">${KEYS[di]}</span><span>${opt}</span></button>`;
    });
    html += `</div>`;
  });
  html += `<button class="btn accent mt18" id="finishPlacement">${App.t('placementDone')}</button></div>`;
  c.innerHTML = html;

  document.getElementById('back').addEventListener('click', () => { S.view = 'home'; draw(); });
  c.querySelectorAll('[data-p]').forEach((b) => b.addEventListener('click', () => { S.placementAnswers[Number(b.dataset.p)] = Number(b.dataset.o); S.placementMsg = null; App.haptic(); draw(); }));
  document.getElementById('finishPlacement').addEventListener('click', finishPlacement);

  if (S.placementMsg) {
    const idx = track.placement.findIndex((q, i) => S.placementAnswers[i] === undefined);
    if (idx >= 0) { const el = document.getElementById('pq' + idx); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  }
}

function finishPlacement() {
  const App = APP, lang = App.lang;
  const track = getTrack(S.track);
  if (track.placement.some((q, i) => S.placementAnswers[i] === undefined)) {
    const missing = track.placement.filter((q, i) => S.placementAnswers[i] === undefined).length;
    S.placementMsg = lang === 'en' ? `${missing} still unanswered — guess if unsure, then submit.` : `${missing} abhi baqi hain — pata na ho to guess karo, phir submit.`;
    draw(); return;
  }
  const topicScore = {};
  track.placement.forEach((q, i) => {
    if (!topicScore[q.topic]) topicScore[q.topic] = { correct: 0, total: 0 };
    topicScore[q.topic].total++;
    if (S.placementAnswers[i] === q.correct) topicScore[q.topic].correct++;
  });
  const prog = App.getCourse(track.id);
  track.weeks.forEach((w) => { const s = topicScore[w.id]; if (s && (s.correct / s.total) >= 0.6) prog.weekStatus[w.id] = 'mastered'; });
  let firstOpen = false;
  for (const w of track.weeks) {
    if (prog.weekStatus[w.id] === 'mastered') continue;
    if (!firstOpen) { prog.weekStatus[w.id] = 'current'; firstOpen = true; }
    else if (!prog.weekStatus[w.id]) prog.weekStatus[w.id] = 'locked';
  }
  prog.placementDone = true; prog.xp = (prog.xp || 0) + 100;
  S.lastMastered = track.weeks.filter((w) => prog.weekStatus[w.id] === 'mastered').length;
  App.setCourse(track.id, prog); App.haptic(20);
  S.view = 'placementResult'; draw();
}

function drawPlacementResult() {
  const App = APP, c = ROOT, lang = App.lang;
  const track = getTrack(S.track);
  c.innerHTML = `<div class="screen"><div class="panel pad">
    <div class="result">
      <div class="r-score" style="color:var(--acc-2)">${S.lastMastered}/${track.weeks.length}</div>
      <div class="r-msg">${lang === 'en' ? 'weeks marked mastered from placement. The course is unlocked from where you actually need it.' : 'hafte placement se mastered mark ho gaye. Course wahan se unlock hai jahan se zaroorat hai.'}</div>
    </div>
    <button class="btn accent mt18" id="resultDone">${App.t('next')}</button>
  </div></div>`;
  document.getElementById('resultDone').addEventListener('click', () => { S.view = 'home'; draw(); });
}

/* ---------------- BINARY GATE ---------------- */
function drawBinaryGate() {
  const App = APP, c = ROOT, lang = App.lang;
  if (!S.gateOrder) S.gateOrder = BINARY_GATE.map((q) => shuffleOrder(q.opts.en.length));
  let html = `<div class="screen"><button class="backlink" id="back">${icon('back', { size: 16 })} ${App.t('back')}</button>
    <div class="lesson-kicker">${App.t('gate_title').toUpperCase()}</div>`;
  BINARY_GATE.forEach((q, i) => {
    html += `<div class="q-block"><div class="q-num mono">Q${i + 1}</div><div class="q-text">${q.q[lang]}</div>`;
    S.gateOrder[i].forEach((oi, di) => {
      html += `<button class="opt ${S.gateAnswers[i] === oi ? 'selected' : ''}" data-g="${i}" data-o="${oi}"><span class="opt-key">${KEYS[di]}</span><span>${q.opts[lang][oi]}</span></button>`;
    });
    html += `</div>`;
  });
  html += `<button class="btn accent mt18" id="submitGate">${App.t('submit')}</button></div>`;
  c.innerHTML = html;
  document.getElementById('back').addEventListener('click', () => { S.view = 'home'; draw(); });
  c.querySelectorAll('[data-g]').forEach((b) => b.addEventListener('click', () => {
    S.gateAnswers[Number(b.dataset.g)] = Number(b.dataset.o); App.haptic(); draw();
  }));
  document.getElementById('submitGate').addEventListener('click', () => {
    const ok = BINARY_GATE.every((q, i) => S.gateAnswers[i] === q.correct);
    if (!ok) {
      alert(App.t('gate_fail'));
      return;
    }
    store.set(STORE_KEYS.binaryGate, true);
    App.haptic(20);
    S.view = 'home'; draw();
  });
}

/* ---------------- FINAL EXAM ---------------- */
function drawExam() {
  const App = APP, c = ROOT, lang = App.lang;
  const exam = S.exam;
  if (!exam) { S.view = 'home'; draw(); return; }
  let html = `<div class="screen"><button class="backlink" id="back">${icon('back', { size: 16 })} ${App.t('back')}</button>
    <div class="lesson-kicker">${App.t('exam_title').toUpperCase()} · ${exam.items.length}Q · 80%</div>`;
  if (!S.examSubmitted) {
    exam.items.forEach((it, i) => {
      html += `<div class="q-block"><div class="q-num mono">Q${String(i + 1).padStart(2, '0')}</div><div class="q-text">${it.q.q[lang]}</div>`;
      it.order.forEach((oi, di) => {
        html += `<button class="opt ${S.examAnswers[i] === oi ? 'selected' : ''}" data-e="${i}" data-o="${oi}"><span class="opt-key">${KEYS[di]}</span><span>${it.q.opts[lang][oi]}</span></button>`;
      });
      html += `</div>`;
    });
    html += `<button class="btn accent mt18" id="submitExam">${App.t('submit')}</button>`;
  } else {
    const sc = scoreExam(exam, S.examAnswers);
    html += `<div class="result"><div class="r-score ${sc.passed ? 'up' : 'down'}">${sc.correct}/${sc.total}</div>
      <div class="r-msg">${sc.passed ? App.t('exam_pass_msg') : App.t('exam_fail_msg')}</div></div>`;
    if (sc.passed) html += `<button class="btn accent mt14" id="dlCert2">${App.t('exam_cert')}</button>`;
    html += `<button class="btn secondary mt10" id="examDone">${App.t('next')}</button>`;
  }
  html += `</div>`;
  c.innerHTML = html;
  document.getElementById('back').addEventListener('click', () => {
    if (!S.examSubmitted && Object.keys(S.examAnswers).length && !confirmLeave(App)) return;
    S.view = 'home'; S.dirty = false; draw();
  });
  c.querySelectorAll('[data-e]').forEach((b) => b.addEventListener('click', () => {
    if (S.examSubmitted) return;
    S.examAnswers[Number(b.dataset.e)] = Number(b.dataset.o); App.haptic(); draw();
  }));
  document.getElementById('submitExam')?.addEventListener('click', () => {
    if (exam.items.some((_, i) => S.examAnswers[i] === undefined)) {
      alert(App.t('leave_quiz')); return;
    }
    const sc = scoreExam(exam, S.examAnswers);
    S.examSubmitted = true; S.dirty = false;
    if (sc.passed) markExamPassed(exam.trackId, App);
    App.bumpStreak(); draw();
  });
  document.getElementById('examDone')?.addEventListener('click', () => { S.view = 'home'; draw(); });
  document.getElementById('dlCert2')?.addEventListener('click', () => {
    const track = getTrack(exam.trackId);
    downloadCertificate({
      name: App.profile?.name || 'Trader',
      trackName: track.name[lang],
      dateIso: new Date().toISOString(),
      lang,
    });
  });
}

/* ---------------- MINI GLOSSARY QUIZ ---------------- */
function drawGlossMini() {
  const App = APP, c = ROOT, lang = App.lang;
  const items = S._pendingGloss;
  if (!items) { S.view = 'home'; draw(); return; }
  let html = `<div class="screen"><div class="lesson-kicker">${App.t('gloss_mini')}</div>
    <p style="font-size:13.5px;color:var(--t3);margin:0 0 14px">${App.t('gloss_mini_sub')}</p>`;
  items.forEach((it, i) => {
    html += `<div class="q-block"><div class="q-text mono">${it.term}</div>`;
    it.opts.forEach((o, oi) => {
      const def = lang === 'ur' ? o.ur : o.en;
      html += `<button class="opt ${S.glossAnswers[i] === oi ? 'selected' : ''}" data-gm="${i}" data-o="${oi}"><span>${def}</span></button>`;
    });
    html += `</div>`;
  });
  html += `<button class="btn accent mt14" id="glossMiniDone">${App.t('next')}</button>
    <button class="btn ghost mt10" id="glossMiniSkip">${App.t('gloss_mini_skip')}</button></div>`;
  c.innerHTML = html;
  c.querySelectorAll('[data-gm]').forEach((b) => b.addEventListener('click', () => {
    S.glossAnswers[Number(b.dataset.gm)] = Number(b.dataset.o); App.haptic(); draw();
  }));
  const finish = (skip) => {
    if (!skip) {
      const weak = store.get(STORE_KEYS.glossWeak, {}) || {};
      items.forEach((it, i) => {
        if (S.glossAnswers[i] !== it.correct) {
          weak[it.term] = (weak[it.term] || 0) + 1;
        }
      });
      store.set(STORE_KEYS.glossWeak, weak);
    }
    S._pendingGloss = null; S.glossAnswers = {}; S.view = 'home'; draw();
  };
  document.getElementById('glossMiniDone').addEventListener('click', () => finish(false));
  document.getElementById('glossMiniSkip').addEventListener('click', () => finish(true));
}
