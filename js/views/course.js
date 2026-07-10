/* ============================================================
   course.js — Learn tab. Track selector + course engine
   (placement, gated weeks, quizzes, XP) scoped per track.
   Engine ported verbatim; presentation rebuilt.
   ============================================================ */

import { TRACKS, getTrack } from '../data/tracks.js';
import { icon, TRACK_ICON } from '../icons.js';
import { injectFigures } from '../figures.js';

let S = {
  track: 'crypto', view: 'home', activeWeek: null,
  placementAnswers: {}, placementMsg: null, placementOrder: null,
  quizAnswers: {}, quizSubmitted: false, quizMsg: null, quizOrder: null, lastMastered: 0,
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

const pct = (n) => Math.round(n);
const scls = (st) => ({ completed: 'done', current: 'current', mastered: 'mastered', locked: 'locked' }[st] || 'locked');
const slabel = (App, st) => App.t(st === 'completed' ? 'completed' : st === 'current' ? 'current' : st === 'mastered' ? 'mastered' : 'locked');

function draw() {
  if (S.view === 'placement') return drawPlacement();
  if (S.view === 'placementResult') return drawPlacementResult();
  if (S.view === 'week') return drawWeek();
  if (S.view === 'quiz') return drawQuiz();
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
    <span class="pill mono">${icon('bolt', { size: 13 })} ${App.totalXp()} XP</span>
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
      body = `${warnBox}
        <div class="prog-line">
          <span class="prog-num">${done}/${weeks.length}</span>
          <div class="prog-track"><i style="width:${pct((done / weeks.length) * 100)}%"></i></div>
          <span class="prog-num">${pct((done / weeks.length) * 100)}%</span>
        </div>
        <div class="panel">${weeks.map((w) => {
          const st = prog.weekStatus[w.id] || 'locked';
          return weekRow(App, w, st, st !== 'locked');
        }).join('')}</div>`;
    }
  }

  c.innerHTML = `<div class="screen">${header}${rail}${body}</div>`;

  c.querySelectorAll('[data-track]').forEach((el) => el.addEventListener('click', () => { S.track = el.dataset.track; S.view = 'home'; App.haptic(); draw(); }));
  const activeChip = c.querySelector('.track-chip.on');
  if (activeChip) activeChip.scrollIntoView({ block: 'nearest', inline: 'center' });
  const sp = document.getElementById('startPlacement');
  if (sp) sp.addEventListener('click', () => {
    S.view = 'placement'; S.placementAnswers = {}; S.placementMsg = null;
    buildPlacementOrders(track); draw();
  });
  c.querySelectorAll('[data-week]').forEach((el) => el.addEventListener('click', () => { S.activeWeek = Number(el.dataset.week); S.view = 'week'; App.haptic(); draw(); }));
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
  const w = track.weeks.find((x) => x.id === S.activeWeek);
  const st = App.getCourse(track.id).weekStatus[w.id];
  c.innerHTML = `<div class="screen">
    <button class="backlink" id="back">${icon('back', { size: 16 })} ${App.t('back')}</button>
    <div class="lesson-kicker">${App.t('week').toUpperCase()} ${String(w.id).padStart(2, '0')}</div>
    <h1 class="lesson-title">${w.title[lang]}</h1>
    <div class="lesson-body mt18">${injectFigures(w.body[lang], lang)}</div>
    <button class="btn accent mt22" id="startQuiz">${st === 'completed' || st === 'mastered' ? App.t('retakeQuiz') : App.t('takeQuiz')}</button>
  </div>`;
  document.getElementById('back').addEventListener('click', () => { S.view = 'home'; draw(); });
  document.getElementById('startQuiz').addEventListener('click', () => {
    S.view = 'quiz'; S.quizAnswers = {}; S.quizSubmitted = false; S.quizMsg = null;
    buildQuizOrders(w); App.haptic(); draw();
  });
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

  document.getElementById('back').addEventListener('click', () => { S.view = 'week'; draw(); });
  c.querySelectorAll('[data-q]').forEach((b) => b.addEventListener('click', () => {
    if (S.quizSubmitted) return;
    S.quizAnswers[Number(b.dataset.q)] = Number(b.dataset.o); S.quizMsg = null; App.haptic(); draw();
  }));
  const sub = document.getElementById('submitQuiz'); if (sub) sub.addEventListener('click', submitQuiz);
  const done = document.getElementById('quizDone'); if (done) done.addEventListener('click', () => { S.view = 'home'; draw(); });
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
  const prog = App.getCourse(track.id);
  if (sc.passed) {
    prog.weekStatus[w.id] = 'completed'; prog.xp = (prog.xp || 0) + 50;
    const next = track.weeks.find((x) => x.id === w.id + 1);
    if (next && !['completed', 'mastered'].includes(prog.weekStatus[next.id])) prog.weekStatus[next.id] = 'current';
    App.haptic(20);
  } else prog.xp = (prog.xp || 0) + 10;
  App.setCourse(track.id, prog);
  draw();
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
