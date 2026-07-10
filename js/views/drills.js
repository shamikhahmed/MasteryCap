/* ============================================================
   drills.js view — practice drills UI (P2).
   ============================================================ */

import { icon } from '../icons.js';
import { store, KEYS } from '../store.js';
import {
  generateDrill, checkAnswer, drillTypes, typeLabel,
  awardDrillXp, recordDrillType, getDrillStats,
} from '../drills.js';

let S = { drill: null, feedback: null, filter: null };
let APP = null, ROOT = null;

export function renderDrills(App, c) {
  APP = App; ROOT = c;
  if (!S.drill) S.drill = generateDrill(S.filter || undefined);
  draw();
}

function draw() {
  const App = APP, c = ROOT, lang = App.lang;
  const d = S.drill;
  const stats = getDrillStats(store, KEYS);
  const dayXp = stats.xpDay === new Date().toISOString().slice(0, 10) ? (stats.xpToday || 0) : 0;

  let body;
  if (S.feedback) {
    const fb = S.feedback;
    body = `
      <div class="result">
        <div class="r-score ${fb.ok ? 'up' : 'down'}">${fb.ok ? App.t('drill_correct') : App.t('drill_wrong')}</div>
        <div class="r-msg mono">${App.t('drill_answer')}: ${fb.answer}${d.unit ? ' ' + d.unit : ''}</div>
      </div>
      <div class="note-box warn mt14">${fb.solution[lang] || fb.solution.en}</div>
      ${fb.xp > 0 ? `<div class="pill acc mt14 mono">+${fb.xp} XP</div>` : (fb.ok ? `<div class="pill mt14">${App.t('drill_cap')}</div>` : '')}
      <button class="btn accent mt18" id="drillNext">${App.t('drill_next')}</button>`;
  } else {
    body = `
      <div class="slabel" style="margin-bottom:8px">${typeLabel(d.type, lang)}</div>
      <p class="lesson-body" style="font-size:15px;color:var(--t1);margin:0 0 18px">${d.prompt[lang] || d.prompt.en}</p>
      <div class="field">
        <label>${App.t('drill_your_answer')}</label>
        <input class="num" id="drillIn" type="number" inputmode="decimal" step="any" placeholder="0" autocomplete="off" />
      </div>
      <button class="btn accent" id="drillSubmit">${App.t('submit')}</button>`;
  }

  c.innerHTML = `<div class="screen">
    <button class="backlink" id="drillBack">${icon('back', { size: 16 })} ${App.t('back')}</button>
    <div class="lt-head" style="padding-top:4px">
      <div class="head-row">
        <div><div class="kicker">${App.t('drill_title')}</div><h1>${App.t('drill_h1')}</h1></div>
        <span class="pill mono">${dayXp}/50 XP</span>
      </div>
    </div>
    <div class="panel pad">${body}</div>
    <div class="panel mt14">
      <div class="panel-h"><span class="ph-t">${App.t('drill_types')}</span></div>
      <div class="pad" style="display:flex;flex-wrap:wrap;gap:8px">
        <button class="pill ${!S.filter ? 'acc' : ''}" data-ft="">${lang === 'en' ? 'Any' : 'Koi bhi'}</button>
        ${drillTypes().map((t) => `<button class="pill ${S.filter === t ? 'acc' : ''}" data-ft="${t}">${typeLabel(t, lang)}</button>`).join('')}
      </div>
    </div>
  </div>`;

  document.getElementById('drillBack').addEventListener('click', () => {
    S.drill = null; S.feedback = null;
    App.tab = App._drillReturn || 'dashboard'; App.render(); App.renderNav();
  });
  c.querySelectorAll('[data-ft]').forEach((b) => b.addEventListener('click', () => {
    S.filter = b.dataset.ft || null;
    S.drill = generateDrill(S.filter || undefined);
    S.feedback = null; App.haptic(); draw();
  }));
  const sub = document.getElementById('drillSubmit');
  if (sub) {
    const inp = document.getElementById('drillIn');
    inp?.focus();
    const go = () => {
      const res = checkAnswer(d, inp.value);
      recordDrillType(store, KEYS, d.type, res.ok);
      const xp = awardDrillXp(store, KEYS, res.ok);
      S.feedback = { ok: res.ok, answer: res.answer, solution: d.solution, xp };
      App.bumpStreak();
      App.haptic(res.ok ? 16 : 8); draw();
    };
    sub.addEventListener('click', go);
    inp?.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
  }
  const next = document.getElementById('drillNext');
  if (next) next.addEventListener('click', () => {
    S.drill = generateDrill(S.filter || undefined);
    S.feedback = null; App.haptic(); draw();
  });
}
