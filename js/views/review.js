/* ============================================================
   review.js view — daily 3-question Leitner review (P4).
   ============================================================ */

import { icon } from '../icons.js';
import {
  pickDailyReview, answerReview, completeReviewXp, touchStreak,
} from '../retention.js';
import { markToday } from '../today.js';

const KEYS = ['A', 'B', 'C', 'D'];
let S = { items: null, idx: 0, answers: {}, order: null, done: false, xp: 0 };
let APP = null, ROOT = null;

function shuffleOrder(n) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

export function renderReview(App, c) {
  APP = App; ROOT = c;
  if (!S.items) {
    S.items = pickDailyReview(3);
    S.idx = 0; S.answers = {}; S.done = false; S.xp = 0;
    S.order = S.items.map((it) => shuffleOrder(it.q.opts.en.length));
    touchStreak();
  }
  draw();
}

function draw() {
  const App = APP, c = ROOT, lang = App.lang;

  if (!S.items.length) {
    c.innerHTML = `<div class="screen">
      <button class="backlink" id="rvBack">${icon('back', { size: 16 })} ${App.t('back')}</button>
      <div class="panel pad mt14">
        <div class="slabel">${App.t('review_title')}</div>
        <p style="font-size:14px;color:var(--t3);line-height:1.55">${App.t('review_empty')}</p>
        <button class="btn secondary mt18" id="rvBack2">${App.t('back')}</button>
      </div></div>`;
    const go = () => { S.items = null; App.tab = App._reviewReturn || 'dashboard'; App.render(); App.renderNav(); };
    document.getElementById('rvBack').addEventListener('click', go);
    document.getElementById('rvBack2').addEventListener('click', go);
    return;
  }

  if (S.done) {
    c.innerHTML = `<div class="screen">
      <div class="panel pad">
        <div class="result">
          <div class="r-score" style="color:var(--acc-2)">+${S.xp} pts</div>
          <div class="r-msg">${App.t('review_done')}</div>
        </div>
        <button class="btn accent mt18" id="rvDone">${App.t('next')}</button>
      </div></div>`;
    document.getElementById('rvDone').addEventListener('click', () => {
      S.items = null; App.tab = App._reviewReturn || 'dashboard'; App.render(); App.renderNav();
    });
    return;
  }

  const item = S.items[S.idx];
  const q = item.q;
  const order = S.order[S.idx];
  const answered = S.answers[S.idx] !== undefined;

  let opts = '';
  order.forEach((oi, di) => {
    let cls = 'opt';
    if (S.answers[S.idx] === oi) cls += ' selected';
    if (answered) {
      if (oi === q.correct) cls += ' correct';
      else if (S.answers[S.idx] === oi) cls += ' wrong';
    }
    opts += `<button class="${cls}" ${answered ? 'disabled' : ''} data-o="${oi}"><span class="opt-key">${KEYS[di]}</span><span>${q.opts[lang][oi]}</span></button>`;
  });

  c.innerHTML = `<div class="screen">
    <button class="backlink" id="rvBack">${icon('back', { size: 16 })} ${App.t('back')}</button>
    <div class="lesson-kicker">${App.t('review_title').toUpperCase()} · <span class="mono">${S.idx + 1}/${S.items.length}</span></div>
    <div class="q-block ${answered ? 'answered' : ''}">
      <div class="q-num mono">Q${String(S.idx + 1).padStart(2, '0')}</div>
      <div class="q-text">${q.q[lang]}</div>
      ${opts}
      ${answered ? `<div class="explain">${q.explain[lang]}</div>` : ''}
    </div>
    ${answered ? `<button class="btn accent mt18" id="rvNext">${S.idx + 1 >= S.items.length ? App.t('review_finish') : App.t('next')}</button>` : ''}
  </div>`;

  document.getElementById('rvBack').addEventListener('click', () => {
    S.items = null; App.tab = App._reviewReturn || 'dashboard'; App.render(); App.renderNav();
  });
  c.querySelectorAll('[data-o]').forEach((b) => b.addEventListener('click', () => {
    if (answered) return;
    const oi = Number(b.dataset.o);
    S.answers[S.idx] = oi;
    answerReview(item.qKey, oi === q.correct);
    App.haptic(); draw();
  }));
  document.getElementById('rvNext')?.addEventListener('click', () => {
    if (S.idx + 1 >= S.items.length) {
      S.xp = completeReviewXp();
      markToday('review');
      S.done = true;
    } else S.idx++;
    App.haptic(); draw();
  });
}
