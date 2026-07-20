/* ============================================================
   charts.js view — worked examples + chart-replay drills (v49).
   ============================================================ */

import { icon } from '../icons.js';
import { store, KEYS } from '../store.js';
import { renderCandles, priceAtY } from '../candles.js';
import { generateChart, checkTap } from '../chartgen.js';
import { awardDrillXp, recordDrillType } from '../drills.js';
import { listWorkedCharts, renderWorkedChart } from '../worked-charts.js';

let S = { mode: 'hub', scenario: null, feedback: null, pick: null, exampleId: null };
let APP = null, ROOT = null;
const LETTERS = ['A', 'B', 'C', 'D'];

export function renderCharts(App, c) {
  APP = App; ROOT = c;
  if (S.mode === 'example' && S.exampleId) return drawExample();
  if (S.mode === 'drill') {
    if (!S.scenario) S.scenario = generateChart();
    return drawDrill();
  }
  drawHub();
}

function drawHub() {
  const App = APP, c = ROOT, lang = App.lang;
  const examples = listWorkedCharts();
  c.innerHTML = `<div class="screen">
    <button class="backlink" id="chBack">${icon('back', { size: 16 })} ${App.t('back')}</button>
    <div class="lt-head" style="padding-top:4px">
      <div class="kicker">${App.t('chart_title')}</div>
      <h1>${App.t('chart_h1')}</h1>
      <p style="font-size:13.5px;color:var(--t3);line-height:1.45;margin:8px 0 0">${lang === 'en'
        ? 'Study annotated structure first. Then drill. Labels are literacy — not live signals.'
        : 'Pehle annotated structure. Phir drill. Labels literacy — live signal nahi.'}</p>
    </div>
    <div class="panel pad" style="margin-top:14px">
      <div class="slabel">${lang === 'en' ? 'Worked examples' : 'Worked examples'}</div>
      ${examples.map((ex) => `
        <button type="button" class="check-row" data-ex="${ex.id}" style="width:100%;text-align:left;background:none;border:0;color:inherit;cursor:pointer;margin-top:8px">
          <span class="check-box">${icon('progress', { size: 12 })}</span>
          <span class="check-t"><strong>${ex.title[lang] || ex.title.en}</strong><br/>
          <span style="color:var(--t3);font-size:12px">${(ex.teach[lang] || ex.teach.en).slice(0, 90)}…</span></span>
        </button>`).join('')}
    </div>
    <button class="btn accent mt14" id="chDrill" style="width:100%">${icon('target', { size: 17 })} ${lang === 'en' ? 'Start chart drill' : 'Chart drill shuru'}</button>
  </div>`;

  document.getElementById('chBack').addEventListener('click', () => {
    S.mode = 'hub'; S.scenario = null; S.feedback = null; S.pick = null; S.exampleId = null;
    App.tab = App._chartReturn || 'practice'; App.render(); App.renderNav();
  });
  c.querySelectorAll('[data-ex]').forEach((b) => b.addEventListener('click', () => {
    S.mode = 'example'; S.exampleId = b.dataset.ex; App.haptic(); drawExample();
  }));
  document.getElementById('chDrill')?.addEventListener('click', () => {
    S.mode = 'drill'; S.scenario = generateChart(); S.feedback = null; S.pick = null;
    App.haptic(); drawDrill();
  });
}

function drawExample() {
  const App = APP, c = ROOT, lang = App.lang;
  const html = renderWorkedChart(S.exampleId, lang);
  c.innerHTML = `<div class="screen">
    <button class="backlink" id="exBack">${icon('back', { size: 16 })} ${lang === 'en' ? 'Examples' : 'Examples'}</button>
    <div class="panel pad" style="margin-top:10px">${html}
      <div class="note-box warn mt14">${lang === 'en'
        ? 'Not a trade signal. Use Practice Ledger only after checklist.'
        : 'Trade signal nahi. Checklist ke baad Practice Ledger.'}</div>
      <button class="btn accent mt14" id="exDrill" style="width:100%">${lang === 'en' ? 'Drill this skill' : 'Is skill pe drill'}</button>
    </div>
  </div>`;
  document.getElementById('exBack')?.addEventListener('click', () => {
    S.mode = 'hub'; S.exampleId = null; App.haptic(); drawHub();
  });
  document.getElementById('exDrill')?.addEventListener('click', () => {
    S.mode = 'drill'; S.scenario = generateChart(); S.feedback = null; S.pick = null;
    App.haptic(); drawDrill();
  });
}

function drawDrill() {
  const App = APP, c = ROOT, lang = App.lang;
  const sc = S.scenario;

  const chartHtml = renderCandles(sc.ohlc, {
    highlight: sc.mode === 'tap_resistance' ? null : sc.highlight,
    w: 320, h: 190,
  });

  let body;
  if (S.feedback) {
    const fb = S.feedback;
    body = `
      <div class="result">
        <div class="r-score ${fb.ok ? 'up' : 'down'}">${fb.ok ? App.t('drill_correct') : App.t('drill_wrong')}</div>
      </div>
      <div class="note-box warn mt14">${(sc.explain && (sc.explain[lang] || sc.explain.en)) || ''}</div>
      ${fb.xp > 0 ? `<div class="pill acc mt14 mono">+${fb.xp} pts</div>` : ''}
      <button class="btn accent mt18" id="chNext">${App.t('drill_next')}</button>`;
  } else if (sc.mode === 'tap_resistance') {
    body = `
      <p class="lesson-body" style="font-size:14.5px;color:var(--t1);margin:0 0 12px">${sc.prompt[lang]}</p>
      <div class="fig" id="tapChart" style="touch-action:none;cursor:crosshair">${chartHtml}
        <figcaption class="fig-cap">${App.t('chart_tap_hint')}</figcaption>
      </div>
      ${S.pick != null ? `<div class="pill mono mt10">${App.t('chart_picked')}: ${S.pick.toFixed(2)}</div>
        <button class="btn accent mt14" id="chSubmit">${App.t('submit')}</button>` : ''}`;
  } else {
    const opts = sc.options[lang] || sc.options.en;
    body = `
      <p class="lesson-body" style="font-size:14.5px;color:var(--t1);margin:0 0 12px">${sc.prompt[lang]}</p>
      <div class="fig">${chartHtml}</div>
      <div class="mt14">${opts.map((o, i) => `
        <button class="opt ${S.pick === i ? 'selected' : ''}" data-o="${i}">
          <span class="opt-key">${LETTERS[i]}</span><span>${o}</span>
        </button>`).join('')}</div>
      <button class="btn accent mt14" id="chSubmit" ${S.pick == null ? 'disabled style="opacity:0.5"' : ''}>${App.t('submit')}</button>`;
  }

  c.innerHTML = `<div class="screen">
    <button class="backlink" id="chBack">${icon('back', { size: 16 })} ${lang === 'en' ? 'Chart hub' : 'Chart hub'}</button>
    <div class="lt-head" style="padding-top:4px">
      <div class="kicker">${App.t('chart_title')}</div>
      <h1>${lang === 'en' ? 'Drill' : 'Drill'}</h1>
    </div>
    <div class="panel pad">${body}</div>
  </div>`;

  document.getElementById('chBack').addEventListener('click', () => {
    S.mode = 'hub'; S.scenario = null; S.feedback = null; S.pick = null;
    App.haptic(); drawHub();
  });

  if (S.feedback) {
    document.getElementById('chNext')?.addEventListener('click', () => {
      S.scenario = generateChart(); S.feedback = null; S.pick = null; App.haptic(); drawDrill();
    });
    return;
  }

  if (sc.mode === 'tap_resistance') {
    const svg = c.querySelector('.candle-chart');
    const onTap = (clientY) => {
      S.pick = priceAtY(svg, clientY, sc.ohlc, { h: 190 });
      App.haptic(); drawDrill();
    };
    svg?.addEventListener('click', (e) => onTap(e.clientY));
    document.getElementById('chSubmit')?.addEventListener('click', () => finishTap(App, sc));
  } else {
    c.querySelectorAll('[data-o]').forEach((b) => b.addEventListener('click', () => {
      S.pick = Number(b.dataset.o); App.haptic(); drawDrill();
    }));
    document.getElementById('chSubmit')?.addEventListener('click', () => finishMcq(App, sc));
  }
}

function finishMcq(App, sc) {
  const ok = S.pick === sc.correct;
  recordDrillType(store, KEYS, 'chart_' + sc.mode, ok);
  const xp = awardDrillXp(store, KEYS, ok);
  S.feedback = { ok, xp };
  App.bumpStreak(); App.haptic(ok ? 16 : 8); drawDrill();
}

function finishTap(App, sc) {
  const ok = checkTap(S.pick, sc.band);
  recordDrillType(store, KEYS, 'chart_tap_resistance', ok);
  const xp = awardDrillXp(store, KEYS, ok);
  S.feedback = { ok, xp };
  App.bumpStreak(); App.haptic(ok ? 16 : 8); drawDrill();
}
