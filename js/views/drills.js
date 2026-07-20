/* ============================================================
   drills.js view — practice drills UI (P2 + P14 timed/challenge/ramp)
   ============================================================ */

import { icon } from '../icons.js';
import { store, KEYS } from '../store.js';
import {
  generateDrill, checkAnswer, drillTypes, typeLabel,
  awardDrillXp, recordDrillType, getDrillStats,
  rampTier, pushRecent,
} from '../drills.js';

let S = { drill: null, feedback: null, filter: null, timed: false, deadline: null, challenge: false, challengeLeft: 0 };
let APP = null, ROOT = null;
let timerId = null;

function isoWeekSeed() {
  const d = new Date();
  const onejan = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7);
  return d.getFullYear() * 100 + week;
}

export function renderDrills(App, c) {
  APP = App; ROOT = c;
  if (!S.drill) S.drill = generateDrill(S.filter || undefined, S.challenge ? isoWeekSeed() + (7 - S.challengeLeft) : undefined);
  draw();
}

function draw() {
  const App = APP, c = ROOT, lang = App.lang;
  const d = S.drill;
  const stats = getDrillStats(store, KEYS);
  const dayXp = stats.xpDay === new Date().toISOString().slice(0, 10) ? (stats.xpToday || 0) : 0;
  const ramp = rampTier(store, KEYS);

  let body;
  if (S.feedback) {
    const fb = S.feedback;
    body = `
      <div class="result">
        <div class="r-score ${fb.ok ? 'up' : 'down'}">${fb.ok ? App.t('drill_correct') : App.t('drill_wrong')}</div>
        <div class="r-msg mono">${App.t('drill_answer')}: ${fb.answer}${d.unit ? ' ' + d.unit : ''}</div>
      </div>
      <div class="note-box warn mt14">${fb.solution[lang] || fb.solution.en}</div>
      ${fb.xp > 0 ? `<div class="pill acc mt14 mono">+${fb.xp} pts</div>` : (fb.ok ? `<div class="pill mt14">${App.t('drill_cap')}</div>` : '')}
      <button class="btn accent mt18" id="drillNext">${App.t('drill_next')}</button>`;
  } else {
    body = `
      <div class="slabel" style="margin-bottom:8px">${typeLabel(d.type, lang)}${S.timed ? ' · timed' : ''}${d.steps ? ` · ${d.steps}-step` : ''}</div>
      <p class="lesson-body" style="font-size:15px;color:var(--t1);margin:0 0 18px">${d.prompt[lang] || d.prompt.en}</p>
      <div class="field">
        <label>${App.t('drill_your_answer')}</label>
        <input class="num" id="drillIn" type="number" inputmode="decimal" step="any" placeholder="0" autocomplete="off" />
      </div>
      <button class="btn accent" id="drillSubmit">${App.t('submit')}</button>
      ${S.timed ? `<div class="pill mono mt10" id="drillTimer">60</div>` : ''}`;
  }

  const timedLine = (stats.timedAttempts || 0) > 0
    ? `<span class="pill mono">${App.t('timed_stats')}: ${stats.timedCorrect || 0}/${stats.timedAttempts}</span>`
    : '';

  c.innerHTML = `<div class="screen">
    <button class="backlink" id="drillBack">${icon('back', { size: 16 })} ${App.t('back')}</button>
    <div class="lt-head" style="padding-top:4px">
      <div class="head-row">
        <div><div class="kicker">${App.t('drill_title')}</div><h1>${App.t('drill_h1')}</h1></div>
        <span class="pill mono">${dayXp}/50 pts</span>
      </div>
    </div>
    <div class="hstack" style="gap:8px;margin-bottom:12px;flex-wrap:wrap">
      <button class="pill ${S.timed ? 'acc' : ''}" id="togTimed">${App.t('timed_mode')}</button>
      <button class="pill ${S.challenge ? 'acc' : ''}" id="togChallenge">${App.t('challenge_title')}</button>
      ${S.challenge ? `<span class="pill mono">${S.challengeLeft}/7</span>` : ''}
      <span class="pill mono" title="${App.t('ramp_hint')}">${App.t('ramp_tier')} ${ramp.label}</span>
      ${timedLine}
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

  clearInterval(timerId);
  if (S.timed && !S.feedback) {
    S.deadline = Date.now() + 60000;
    const tick = () => {
      const el = document.getElementById('drillTimer');
      if (!el) return;
      const left = Math.max(0, Math.ceil((S.deadline - Date.now()) / 1000));
      el.textContent = String(left);
      if (left <= 0) {
        clearInterval(timerId);
        const inp = document.getElementById('drillIn');
        submit(inp?.value || '');
      }
    };
    timerId = setInterval(tick, 250);
    tick();
  }

  document.getElementById('drillBack').addEventListener('click', () => {
    S.drill = null; S.feedback = null; S.challenge = false;
    App.tab = App._drillReturn || 'dashboard'; App.render(); App.renderNav();
  });
  document.getElementById('togTimed')?.addEventListener('click', () => {
    S.timed = !S.timed; S.feedback = null; App.haptic(); draw();
  });
  document.getElementById('togChallenge')?.addEventListener('click', () => {
    S.challenge = !S.challenge;
    S.challengeLeft = S.challenge ? 7 : 0;
    S.feedback = null;
    S.drill = generateDrill(S.filter || undefined, S.challenge ? isoWeekSeed() : undefined);
    App.haptic(); draw();
  });
  c.querySelectorAll('[data-ft]').forEach((b) => b.addEventListener('click', () => {
    S.filter = b.dataset.ft || null;
    S.drill = generateDrill(S.filter || undefined);
    S.feedback = null; App.haptic(); draw();
  }));

  function submit(raw) {
    const res = checkAnswer(d, raw);
    recordDrillType(store, KEYS, d.type, res.ok);
    pushRecent(store, KEYS, res.ok);
    if (S.timed) {
      const st = getDrillStats(store, KEYS);
      st.timedAttempts = (st.timedAttempts || 0) + 1;
      if (res.ok) st.timedCorrect = (st.timedCorrect || 0) + 1;
      store.set(KEYS.drillStats, st);
    }
    const xp = awardDrillXp(store, KEYS, res.ok);
    S.feedback = { ok: res.ok, answer: res.answer, solution: d.solution, xp };
    // challenge counts attempts (any submit), not only corrects
    if (S.challenge) {
      S.challengeLeft = Math.max(0, S.challengeLeft - 1);
      if (S.challengeLeft === 0) {
        const course = store.get(KEYS.course, {});
        const bucket = course._drills || { placementDone: true, weekStatus: {}, xp: 0 };
        bucket.xp = (bucket.xp || 0) + 30;
        course._drills = bucket;
        store.set(KEYS.course, course);
        const habit = store.get(KEYS.habitDays, {}) || {};
        habit[new Date().toISOString().slice(0, 10)] = true;
        store.set(KEYS.habitDays, habit);
      }
    }
    App.bumpStreak();
    App.haptic(res.ok ? 16 : 8); draw();
  }

  const sub = document.getElementById('drillSubmit');
  if (sub) {
    const inp = document.getElementById('drillIn');
    inp?.focus();
    sub.addEventListener('click', () => submit(inp.value));
    inp?.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(inp.value); });
  }
  const next = document.getElementById('drillNext');
  if (next) next.addEventListener('click', () => {
    const seed = S.challenge ? isoWeekSeed() + (7 - S.challengeLeft) : undefined;
    S.drill = generateDrill(S.filter || undefined, seed);
    S.feedback = null; App.haptic(); draw();
  });
}
