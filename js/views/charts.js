/* ============================================================
   charts.js view — chart-replay drills (P5).
   ============================================================ */

import { icon } from '../icons.js';
import { store, KEYS } from '../store.js';
import { renderCandles, priceAtY } from '../candles.js';
import { generateChart, checkTap } from '../chartgen.js';
import { awardDrillXp, recordDrillType } from '../drills.js';

let S = { scenario: null, feedback: null, pick: null };
let APP = null, ROOT = null;
const LETTERS = ['A', 'B', 'C', 'D'];

export function renderCharts(App, c) {
  APP = App; ROOT = c;
  if (!S.scenario) S.scenario = generateChart();
  draw();
}

function draw() {
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
    <button class="backlink" id="chBack">${icon('back', { size: 16 })} ${App.t('back')}</button>
    <div class="lt-head" style="padding-top:4px">
      <div class="kicker">${App.t('chart_title')}</div>
      <h1>${App.t('chart_h1')}</h1>
    </div>
    <div class="panel pad">${body}</div>
  </div>`;

  document.getElementById('chBack').addEventListener('click', () => {
    S.scenario = null; S.feedback = null; S.pick = null;
    App.tab = App._chartReturn || 'dashboard'; App.render(); App.renderNav();
  });

  if (S.feedback) {
    document.getElementById('chNext')?.addEventListener('click', () => {
      S.scenario = generateChart(); S.feedback = null; S.pick = null; App.haptic(); draw();
    });
    return;
  }

  if (sc.mode === 'tap_resistance') {
    const svg = c.querySelector('.candle-chart');
    const onTap = (clientY) => {
      S.pick = priceAtY(svg, clientY, sc.ohlc, { h: 190 });
      App.haptic(); draw();
    };
    svg?.addEventListener('click', (e) => onTap(e.clientY));
    document.getElementById('chSubmit')?.addEventListener('click', () => finishTap(App, sc));
  } else {
    c.querySelectorAll('[data-o]').forEach((b) => b.addEventListener('click', () => {
      S.pick = Number(b.dataset.o); App.haptic(); draw();
    }));
    document.getElementById('chSubmit')?.addEventListener('click', () => finishMcq(App, sc));
  }
}

function finishMcq(App, sc) {
  const ok = S.pick === sc.correct;
  recordDrillType(store, KEYS, 'chart_' + sc.mode, ok);
  const xp = awardDrillXp(store, KEYS, ok);
  S.feedback = { ok, xp };
  App.bumpStreak(); App.haptic(ok ? 16 : 8); draw();
}

function finishTap(App, sc) {
  const ok = checkTap(S.pick, sc.band);
  recordDrillType(store, KEYS, 'chart_tap_resistance', ok);
  const xp = awardDrillXp(store, KEYS, ok);
  S.feedback = { ok, xp };
  App.bumpStreak(); App.haptic(ok ? 16 : 8); draw();
}
