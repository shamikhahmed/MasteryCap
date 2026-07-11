/* ============================================================
   sim.js view — S1 paper-trading simulator (crypto pack).
   Picker → live session → debrief. Stop is mandatory by design.
   ============================================================ */

import { icon } from '../icons.js';
import { store, KEYS } from '../store.js';
import { renderCandles } from '../candles.js';
import { createSession } from '../sim/engine.js';
import { SIM_SCENARIOS, getScenario } from '../sim/scenarios.js';

let S = { view: 'picker', session: null, scenario: null, playTimer: null, msg: null, debrief: null };
let APP = null, ROOT = null;

export function renderSim(App, c) {
  APP = App; ROOT = c;
  draw();
}

function stopPlay() { if (S.playTimer) { clearInterval(S.playTimer); S.playTimer = null; } }

function fmt(n, dp = 2) { return Number(n).toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp }); }

function draw() {
  if (S.view === 'session') return drawSession();
  if (S.view === 'debrief') return drawDebrief();
  drawPicker();
}

/* ---------------- picker ---------------- */
function drawPicker() {
  const App = APP, c = ROOT, lang = App.lang;
  const stats = store.get(KEYS.simStats, {});
  c.innerHTML = `<div class="screen">
    <button class="backlink" id="simBack">${icon('back', { size: 16 })} ${App.t('back')}</button>
    <div class="lt-head"><div class="kicker">${App.t('sim_kicker')}</div><h1>${App.t('sim_title')}</h1></div>
    <p style="font-size:13.5px;color:var(--t3);margin:-8px 0 16px;line-height:1.55">${App.t('sim_intro')}</p>
    <div class="panel">${SIM_SCENARIOS.map((sc) => {
      const st = stats[sc.id] || { runs: 0, pass: 0 };
      return `<div class="week-row" data-sc="${sc.id}">
        <span class="week-idx mono">${String(SIM_SCENARIOS.indexOf(sc) + 1).padStart(2, '0')}</span>
        <div class="week-body">
          <div class="wb-t">${sc.name[lang]}</div>
          <div class="wb-s ${st.pass > 0 ? 's-done' : 's-current'}">${st.runs ? `${st.pass}/${st.runs} ${App.t('sim_process_pass')}` : App.t('sim_not_run')}</div>
        </div>
        ${icon('chevron', { size: 20, cls: 'week-state-ic' })}
      </div>`;
    }).join('')}</div>
  </div>`;
  document.getElementById('simBack').addEventListener('click', () => APP.closeSim());
  c.querySelectorAll('[data-sc]').forEach((el) => el.addEventListener('click', () => startSession(el.dataset.sc)));
}

function startSession(id) {
  const sc = getScenario(id);
  S.scenario = sc;
  S.session = createSession({ scenario: sc, seed: Date.now() % 1e9, balance: 1000 });
  S.view = 'session'; S.msg = null;
  APP.haptic();
  draw();
}

/* ---------------- session ---------------- */
function drawSession() {
  const App = APP, c = ROOT, lang = App.lang;
  const sess = S.session, st = sess.state, sc = S.scenario;
  const pos = st.pos;
  const u = sess.unrealized();
  const barsLeft = st.bars.length - 1 - st.i;

  const lines = pos ? [
    { price: pos.entry, color: 'var(--t1)', dash: '2 2', label: 'ENTRY' },
    { price: pos.stop, color: 'var(--down)', dash: '4 2', label: 'STOP' },
    pos.tp ? { price: pos.tp, color: 'var(--up)', dash: '4 2', label: 'TP' } : null,
    pos.liq ? { price: pos.liq, color: 'var(--warn)', dash: '1 3', label: 'LIQ' } : null,
  ].filter(Boolean) : null;

  c.innerHTML = `<div class="screen">
    <button class="backlink" id="simEnd">${icon('back', { size: 16 })} ${App.t('sim_end')}</button>
    <div class="lesson-kicker">${sc.name[lang].toUpperCase()} · <span class="mono">${barsLeft} ${App.t('sim_bars_left')}</span></div>
    <div class="note-box warn" style="margin-bottom:12px;font-size:12.5px">${sc.mission[lang]}</div>

    <div class="panel" style="padding:8px 8px 4px;margin-bottom:12px">
      ${renderCandles(sess.visible(), { w: 340, h: 200, lines })}
      <div class="spread" style="padding:6px 8px 8px">
        <span class="mono" style="font-size:13px;color:var(--t2)">${fmt(sess.price())}</span>
        <span class="mono" style="font-size:13px">${App.t('sim_balance')}: <span class="${st.balance >= st.startBalance ? 'up' : 'down'}">$${fmt(st.balance)}</span></span>
      </div>
    </div>

    <div class="btn-row" style="margin-bottom:14px">
      <button class="btn secondary" id="simStep">${App.t('sim_step')}</button>
      <button class="btn secondary" id="simPlay">${S.playTimer ? App.t('sim_pause') : App.t('sim_play')}</button>
    </div>

    ${S.msg ? `<div class="note-box err" style="margin-bottom:12px">${S.msg}</div>` : ''}

    ${pos ? posPanel(App, pos, u) : orderPanel(App, sc)}

    ${st.trades.length ? `<div class="panel mt14"><div class="panel-h"><span class="ph-t">${App.t('sim_closed')}</span></div>
      ${st.trades.map((t) => tradeRow(App, t)).join('')}</div>` : ''}
  </div>`;

  document.getElementById('simEnd').addEventListener('click', endSession);
  document.getElementById('simStep').addEventListener('click', () => { doStep(); });
  document.getElementById('simPlay').addEventListener('click', togglePlay);

  if (pos) {
    document.getElementById('simClose').addEventListener('click', () => { stopPlay(); sess.closeManual(); APP.haptic(14); draw(); });
    document.getElementById('simMove').addEventListener('click', () => {
      const v = parseFloat(document.getElementById('newStop').value);
      if (!v) return;
      const r = sess.moveStop(v);
      S.msg = r.ok ? null : APP.t('sim_err_' + r.err);
      if (r.ok && r.widened) S.msg = APP.t('sim_widen_warn');
      draw();
    });
  } else {
    let dir = null;
    c.querySelectorAll('[data-dir]').forEach((b) => b.addEventListener('click', () => {
      dir = b.dataset.dir;
      c.querySelectorAll('[data-dir]').forEach((x) => { x.classList.remove('on', 'long', 'short'); });
      b.classList.add('on', dir);
    }));
    document.getElementById('simEnter').addEventListener('click', () => {
      const riskPct = parseFloat(document.getElementById('simRisk').value);
      const stop = parseFloat(document.getElementById('simStop').value);
      const tpv = parseFloat(document.getElementById('simTp').value);
      if (!dir) { S.msg = APP.t('sim_err_bad_dir'); draw(); return; }
      const r = S.session.enter({ dir, riskPct, stop, tp: isNaN(tpv) ? null : tpv });
      S.msg = r.ok ? null : APP.t('sim_err_' + r.err);
      APP.haptic(r.ok ? 14 : 6);
      draw();
    });
  }
}

function orderPanel(App, sc) {
  return `<div class="panel">
    <div class="panel-h"><span class="ph-t">${App.t('sim_order')}</span><span class="pill mono">${App.t('sim_max_risk')} ${sc.constraints?.maxRiskPct ?? 2}%</span></div>
    <div class="pad" style="padding:14px 16px 16px">
      <div class="field"><label>${App.t('direction')}</label>
        <div class="dir-seg">
          <button data-dir="long">${icon('arrowUp', { size: 16 })} ${App.t('long')}</button>
          <button data-dir="short">${icon('arrowDown', { size: 16 })} ${App.t('short')}</button>
        </div>
      </div>
      <div class="f-row three">
        <div class="field"><label>${App.t('risk_pct')}</label><input id="simRisk" class="num" type="number" inputmode="decimal" step="0.1" value="1" /></div>
        <div class="field"><label>${App.t('stop')} *</label><input id="simStop" class="num" type="number" inputmode="decimal" step="any" /></div>
        <div class="field"><label>TP</label><input id="simTp" class="num" type="number" inputmode="decimal" step="any" /></div>
      </div>
      <button class="btn accent" id="simEnter">${App.t('sim_enter')}</button>
      <p style="font-size:11.5px;color:var(--t3);margin:10px 0 0;line-height:1.5">${App.t('sim_stop_note')}</p>
    </div>
  </div>`;
}

function posPanel(App, pos, u) {
  return `<div class="panel">
    <div class="panel-h"><span class="ph-t">${App.t('sim_position')}</span>
      <span class="pill ${pos.dir === 'long' ? 'up' : 'down'}">${App.t(pos.dir)} · ${fmt(pos.lev, 1)}x</span></div>
    <div class="pad" style="padding:14px 16px 16px">
      <div class="spread mono" style="font-size:14px;margin-bottom:12px">
        <span>uP/L: <span class="${u.pl >= 0 ? 'up' : 'down'}">${u.pl >= 0 ? '+' : ''}$${fmt(u.pl)}</span></span>
        <span>R: <span class="${u.r >= 0 ? 'up' : 'down'}">${fmt(u.r, 2)}</span></span>
      </div>
      <div class="f-row">
        <div class="field" style="margin-bottom:0"><label>${App.t('sim_move_stop')}</label><input id="newStop" class="num" type="number" inputmode="decimal" step="any" value="${fmt(pos.stop)}" /></div>
        <div class="field" style="margin-bottom:0;display:flex;align-items:flex-end"><button class="btn secondary" id="simMove">${App.t('sim_move')}</button></div>
      </div>
      <button class="btn mt14" id="simClose">${App.t('sim_close')}</button>
    </div>
  </div>`;
}

function tradeRow(App, t) {
  const pass = t.process.pass;
  return `<div class="trade-row">
    <span class="trade-dir ${t.dir}">${icon(t.dir === 'long' ? 'arrowUp' : 'arrowDown', { size: 16 })}</span>
    <div class="trade-body">
      <div class="tb-t">${App.t('sim_' + t.reason)} <span class="tag ${pass ? '' : 'flag'}">${pass ? App.t('sim_process_pass') : App.t('sim_process_fail')}</span></div>
      <div class="tb-m mono">${fmt(t.lev, 1)}x · ${t.bars} bars · R ${fmt(t.r, 2)}</div>
    </div>
    <span class="trade-pl ${t.pl >= 0 ? 'up' : 'down'}">${t.pl >= 0 ? '+' : ''}$${fmt(t.pl)}</span>
  </div>`;
}

function doStep() {
  const r = S.session.step();
  if (r.closed) { stopPlay(); APP.haptic(14); }
  if (r.done) { stopPlay(); endSession(); return; }
  draw();
}

function togglePlay() {
  if (S.playTimer) { stopPlay(); draw(); return; }
  S.playTimer = setInterval(() => {
    const r = S.session.step();
    if (r.closed || r.done) { stopPlay(); if (r.done) { endSession(); return; } }
    draw();
  }, 600);
  draw();
}

/* ---------------- debrief ---------------- */
function endSession() {
  stopPlay();
  const sess = S.session, st = sess.state;
  if (st.pos) sess.closeManual();

  // persist: simTrades + simStats (additive keys)
  const all = store.get(KEYS.simTrades, []);
  st.trades.forEach((t) => all.unshift({ ...t, date: new Date().toISOString(), track: S.scenario.track }));
  store.set(KEYS.simTrades, all);

  const stats = store.get(KEYS.simStats, {});
  const s = stats[S.scenario.id] || { runs: 0, pass: 0, trades: 0 };
  s.runs += 1;
  s.trades += st.trades.length;
  if (st.trades.length && st.trades.every((t) => t.process.pass)) s.pass += 1;
  stats[S.scenario.id] = s;
  store.set(KEYS.simStats, stats);

  if (typeof APP.bumpStreak === 'function') APP.bumpStreak();

  S.debrief = { trades: st.trades, balance: st.balance, start: st.startBalance, noTrade: st.trades.length === 0 };
  S.view = 'debrief';
  draw();
}

function drawDebrief() {
  const App = APP, c = ROOT, lang = App.lang;
  const d = S.debrief, sc = S.scenario;
  const allPass = d.trades.length > 0 && d.trades.every((t) => t.process.pass);
  const netPl = d.balance - d.start;
  const rangeOk = sc.id === 'c3_range_patience' || sc.id === 'c8_news_gap';

  c.innerHTML = `<div class="screen">
    <div class="lesson-kicker">${sc.name[lang].toUpperCase()} · ${App.t('sim_debrief')}</div>
    <div class="result">
      <div class="r-score ${d.noTrade ? '' : allPass ? 'up' : 'down'}">${d.noTrade ? (rangeOk ? App.t('sim_no_trade_pass') : App.t('sim_no_trade')) : allPass ? App.t('sim_process_pass') : App.t('sim_process_fail')}</div>
      <div class="r-msg">${App.t('sim_process_note')}</div>
    </div>
    ${d.trades.length ? `<div class="panel mt14">${d.trades.map((t) => `
      ${tradeRow(App, t)}
      ${t.process.fails.length ? `<div style="padding:0 18px 12px"><span class="tag flag">${t.process.fails.map((f) => App.t('sim_fail_' + f)).join(' · ')}</span></div>` : ''}
    `).join('')}</div>` : ''}
    <div class="spread mono mt14" style="font-size:14px;padding:0 4px">
      <span>${App.t('sim_net')}</span>
      <span class="${netPl >= 0 ? 'up' : 'down'}">${netPl >= 0 ? '+' : ''}$${fmt(netPl)}</span>
    </div>
    <div class="note-box warn mt14">${App.t('sim_honesty')}</div>
    <div class="btn-row mt18">
      <button class="btn secondary" id="simAgain">${App.t('sim_again')}</button>
      <button class="btn accent" id="simDone">${App.t('next')}</button>
    </div>
  </div>`;

  document.getElementById('simAgain').addEventListener('click', () => startSession(sc.id));
  document.getElementById('simDone').addEventListener('click', () => { S.view = 'picker'; draw(); });
}

function fmtGuard() {} /* keep module tidy */
