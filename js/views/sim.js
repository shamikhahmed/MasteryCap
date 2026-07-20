/* ============================================================
   sim.js view — S1 paper-trading simulator (crypto pack).
   Picker → live session → debrief. Stop is mandatory by design.
   ============================================================ */

import { icon } from '../icons.js';
import { store, KEYS } from '../store.js';
import { renderCandles } from '../candles.js';
import { createSession } from '../sim/engine.js';
import { SIM_SCENARIOS, getScenario, SIM_TRACK_ORDER, SIM_TRACK_LABEL, scenariosByTrack } from '../sim/scenarios.js';
import { createPortfolioSession, PORTFOLIO_IDS } from '../sim/portfolio.js';
import { teacherLine } from '../teacher.js';
import { startTime, pauseTime } from '../time.js';
import { markToday } from '../today.js';

let S = {
  view: 'picker', session: null, scenario: null,
  playTimer: null, playSpeed: 1,
  msg: null, debrief: null, orderType: 'market',
  pf: null, // portfolio session state
};
let APP = null, ROOT = null;

const PLAY_MS = { 1: 600, 2: 300, 4: 150 };

export function renderSim(App, c) {
  APP = App; ROOT = c;
  draw();
}

/** Kill play interval — call when leaving sim (tabs / closeSim). */
export function stopSimPlayback() { stopPlay(); }

function stopPlay() { if (S.playTimer) { clearInterval(S.playTimer); S.playTimer = null; } }

function fmt(n, dp = 2) { return Number(n).toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp }); }

function draw() {
  if (S.view === 'session') return drawSession();
  if (S.view === 'debrief') return drawDebrief();
  if (S.view === 'pf_plan') return drawPfPlan();
  if (S.view === 'pf_run') return drawPfRun();
  if (S.view === 'pf_debrief') return drawPfDebrief();
  drawPicker();
}

/* ---------------- picker ---------------- */
function drawPicker() {
  const App = APP, c = ROOT, lang = App.lang;
  const stats = store.get(KEYS.simStats, {});
  const pfStat = (id) => {
    const st = stats[id] || { runs: 0, pass: 0 };
    return st.runs ? `${st.pass}/${st.runs} ${App.t('pf_pass')}` : App.t('sim_not_run');
  };
  const byTrack = scenariosByTrack();
  let idx = 0;
  const sections = SIM_TRACK_ORDER.map((trackId) => {
    const list = byTrack[trackId] || [];
    if (!list.length) return '';
    const label = (SIM_TRACK_LABEL[trackId] || { en: trackId, ur: trackId })[lang];
    const rows = list.map((sc) => {
      idx += 1;
      const st = stats[sc.id] || { runs: 0, pass: 0 };
      return `<div class="week-row" data-sc="${sc.id}">
        <span class="week-idx mono">${String(idx).padStart(2, '0')}</span>
        <div class="week-body">
          <div class="wb-t">${sc.name[lang]}</div>
          <div class="wb-s ${st.pass > 0 ? 's-done' : 's-current'}">${st.runs ? `${st.pass}/${st.runs} ${App.t('sim_process_pass')}` : App.t('sim_not_run')}</div>
        </div>
        ${icon('chevron', { size: 20, cls: 'week-state-ic' })}
      </div>`;
    }).join('');
    return `<div class="slabel" style="margin:16px 0 8px;padding:0 4px">${label}</div>
      <div class="panel">${rows}</div>`;
  }).join('');

  c.innerHTML = `<div class="screen">
    <button class="backlink" id="simBack">${icon('back', { size: 16 })} ${App.t('back')}</button>
    <div class="lt-head"><div class="kicker">${App.t('sim_kicker')}</div><h1>${App.t('sim_title')}</h1></div>
    <p style="font-size:13.5px;color:var(--t3);margin:-8px 0 16px;line-height:1.55">${App.t('sim_intro')}</p>
    <div class="slabel" style="margin:0 0 8px;padding:0 4px">${App.t('pf_section')}</div>
    <div class="panel" style="margin-bottom:14px">
      <div class="week-row" data-pf="invest">
        <span class="week-idx mono">PF</span>
        <div class="week-body">
          <div class="wb-t">${App.t('pf_invest')}</div>
          <div class="wb-s s-current">${pfStat('portfolio_invest')}</div>
        </div>
        ${icon('chevron', { size: 20, cls: 'week-state-ic' })}
      </div>
      <div class="week-row" data-pf="spot">
        <span class="week-idx mono">PF</span>
        <div class="week-body">
          <div class="wb-t">${App.t('pf_spot')}</div>
          <div class="wb-s s-current">${pfStat('portfolio_spot')}</div>
        </div>
        ${icon('chevron', { size: 20, cls: 'week-state-ic' })}
      </div>
    </div>
    ${sections}
  </div>`;
  document.getElementById('simBack').addEventListener('click', () => APP.closeSim());
  c.querySelectorAll('[data-sc]').forEach((el) => el.addEventListener('click', () => startSession(el.dataset.sc)));
  c.querySelectorAll('[data-pf]').forEach((el) => el.addEventListener('click', () => startPortfolio(el.dataset.pf)));
}

function startSession(id, seed) {
  const sc = getScenario(id);
  S.scenario = sc;
  const useSeed = seed != null && seed !== '' ? Number(seed) : (Date.now() % 1e9);
  S.session = createSession({ scenario: sc, seed: useSeed, balance: 1000 });
  S.view = 'session'; S.msg = null;
  S._coachShown = false;
  startTime('sim', { courseId: sc.track, topicId: sc.id });
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
    ${!pos ? `<div class="note-box" style="margin-bottom:12px;font-size:12.5px">${teacherLine(App, 'sim_coach_tip')}</div>` : ''}

    <div class="panel" style="padding:8px 8px 4px;margin-bottom:12px">
      ${renderCandles(sess.visible(), { w: 340, h: 200, lines })}
      <div class="spread" style="padding:6px 8px 8px">
        <span class="mono" style="font-size:13px;color:var(--t2)">${fmt(sess.price())}</span>
        <span class="mono" style="font-size:13px">${App.t('sim_balance')}: <span class="${st.balance >= st.startBalance ? 'up' : 'down'}">$${fmt(st.balance)}</span></span>
      </div>
    </div>

    <div class="btn-row" style="margin-bottom:10px">
      <button class="btn secondary" id="simStep">${App.t('sim_step')}</button>
      <button class="btn secondary" id="simPlay">${S.playTimer ? App.t('sim_pause') : App.t('sim_play')}</button>
    </div>
    <div class="seg" style="margin-bottom:14px">
      ${[1, 2, 4].map((sp) => `<button type="button" class="${S.playSpeed === sp ? 'on' : ''}" data-speed="${sp}">${sp}x</button>`).join('')}
    </div>

    ${S.msg ? `<div class="note-box err" style="margin-bottom:12px">${S.msg}</div>` : ''}

    ${st.pending && !pos ? pendingStrip(App, st.pending) : ''}

    ${pos ? posPanel(App, pos, u) : orderPanel(App, sc, sess.price())}

    ${st.trades.length ? `<div class="panel mt14"><div class="panel-h"><span class="ph-t">${App.t('sim_closed')}</span></div>
      ${st.trades.map((t) => tradeRow(App, t)).join('')}</div>` : ''}
  </div>`;

  document.getElementById('simEnd').addEventListener('click', endSession);
  document.getElementById('simStep').addEventListener('click', () => { doStep(); });
  document.getElementById('simPlay').addEventListener('click', togglePlay);
  c.querySelectorAll('[data-speed]').forEach((b) => b.addEventListener('click', () => {
    const sp = parseInt(b.dataset.speed, 10);
    if (S.playSpeed === sp) return;
    S.playSpeed = sp;
    APP.haptic();
    if (S.playTimer) { stopPlay(); startPlay(); }
    else draw();
  }));

  if (pos) {
    document.getElementById('simClose').addEventListener('click', () => { stopPlay(); sess.closeManual(); APP.haptic(14); draw(); });
    c.querySelectorAll('[data-partial]').forEach((b) => b.addEventListener('click', () => {
      const r = sess.closePartial(parseFloat(b.dataset.partial));
      S.msg = r.ok ? null : APP.t('sim_err_' + r.err);
      APP.haptic(r.ok ? 10 : 6);
      draw();
    }));
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
    c.querySelectorAll('[data-otype]').forEach((b) => b.addEventListener('click', () => {
      S.orderType = b.dataset.otype;
      APP.haptic();
      draw();
    }));
    document.getElementById('simEnter').addEventListener('click', () => {
      const riskPct = parseFloat(document.getElementById('simRisk').value);
      const stop = parseFloat(document.getElementById('simStop').value);
      const tpv = parseFloat(document.getElementById('simTp').value);
      if (!dir) { S.msg = APP.t('sim_err_bad_dir'); draw(); return; }
      const tp = isNaN(tpv) ? null : tpv;
      let r;
      if (S.orderType === 'limit') {
        const limitPx = parseFloat(document.getElementById('simLimit').value);
        r = S.session.placeLimit({ dir, price: limitPx, riskPct, stop, tp });
      } else {
        r = S.session.enter({ dir, riskPct, stop, tp });
      }
      S.msg = r.ok ? null : APP.t('sim_err_' + r.err);
      APP.haptic(r.ok ? 14 : 6);
      draw();
    });
  }
  document.getElementById('simCancelLimit')?.addEventListener('click', () => {
    S.session.cancelLimit();
    S.msg = null;
    APP.haptic();
    draw();
  });
}

function pendingStrip(App, pending) {
  return `<div class="panel pad" style="margin-bottom:12px">
    <div class="spread" style="align-items:center">
      <div>
        <div class="slabel">${App.t('sim_pending')}</div>
        <div class="mono" style="font-size:13px;margin-top:6px">${App.t(pending.dir)} @ ${fmt(pending.price)} · stop ${fmt(pending.stop)}</div>
      </div>
      <button class="pill" id="simCancelLimit">${App.t('sim_cancel_limit')}</button>
    </div>
  </div>`;
}

function orderPanel(App, sc, mark) {
  const isLimit = S.orderType === 'limit';
  return `<div class="panel">
    <div class="panel-h"><span class="ph-t">${App.t('sim_order')}</span><span class="pill mono">${App.t('sim_max_risk')} ${sc.constraints?.maxRiskPct ?? 2}%</span></div>
    <div class="pad" style="padding:14px 16px 16px">
      <div class="seg" style="margin-bottom:12px">
        <button type="button" class="${!isLimit ? 'on' : ''}" data-otype="market">${App.t('sim_otype_market')}</button>
        <button type="button" class="${isLimit ? 'on' : ''}" data-otype="limit">${App.t('sim_otype_limit')}</button>
      </div>
      <div class="field"><label>${App.t('direction')}</label>
        <div class="dir-seg">
          <button data-dir="long">${icon('arrowUp', { size: 16 })} ${App.t('long')}</button>
          <button data-dir="short">${icon('arrowDown', { size: 16 })} ${App.t('short')}</button>
        </div>
      </div>
      ${isLimit ? `<div class="field"><label>${App.t('sim_limit_price')}</label><input id="simLimit" class="num" type="number" inputmode="decimal" step="any" value="${fmt(mark * 0.995)}" /></div>` : ''}
      <div class="f-row three">
        <div class="field"><label>${App.t('risk_pct')}</label><input id="simRisk" class="num" type="number" inputmode="decimal" step="0.1" value="1" /></div>
        <div class="field"><label>${App.t('stop')} *</label><input id="simStop" class="num" type="number" inputmode="decimal" step="any" data-mark="${fmt(mark)}" /></div>
        <div class="field"><label>TP</label><input id="simTp" class="num" type="number" inputmode="decimal" step="any" /></div>
      </div>
      <button class="btn accent" id="simEnter">${isLimit ? App.t('sim_place_limit') : App.t('sim_enter')}</button>
      <p style="font-size:11.5px;color:var(--t3);margin:10px 0 0;line-height:1.5">${isLimit ? App.t('sim_limit_note') : App.t('sim_stop_note')}</p>
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
      <div class="seg" style="margin-top:12px">
        <button type="button" data-partial="0.25">${App.t('sim_partial_25')}</button>
        <button type="button" data-partial="0.5">${App.t('sim_partial_50')}</button>
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
  startPlay();
  draw();
}

function startPlay() {
  stopPlay();
  const ms = PLAY_MS[S.playSpeed] || 600;
  S.playTimer = setInterval(() => {
    const r = S.session.step();
    if (r.closed || r.done) { stopPlay(); if (r.done) { endSession(); return; } }
    draw();
  }, ms);
}

/* ---------------- debrief ---------------- */
function endSession() {
  stopPlay();
  pauseTime();
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
  markToday('lab');
  window.dispatchEvent(new CustomEvent('masterycap:session-milestone', {
    detail: { kind: 'sim', App: APP },
  }));

  S.debrief = {
    trades: st.trades, balance: st.balance, start: st.startBalance,
    noTrade: st.trades.length === 0, seed: st.seed,
    limitExpired: (st.events || []).some((e) => e.type === 'limit_expired'),
  };
  S.view = 'debrief';
  draw();
}

function drawDebrief() {
  const App = APP, c = ROOT, lang = App.lang;
  const d = S.debrief, sc = S.scenario;
  const allPass = d.trades.length > 0 && d.trades.every((t) => t.process.pass);
  const netPl = d.balance - d.start;
  const rangeOk = sc.id === 'c3_range_patience' || sc.id === 'c8_news_gap';
  const passN = d.trades.filter((t) => t.process.pass).length;
  const processLine = d.trades.length
    ? App.t('sim_process_summary').replace('{n}', String(passN)).replace('{m}', String(d.trades.length))
    : null;
  const rTimeline = d.trades.length
    ? `<div class="panel mt14"><div class="panel-h"><span class="ph-t">${App.t('sim_r_timeline')}</span></div>
      <div class="pad" style="padding:12px 16px 14px">
        <div class="mono" style="font-size:13px;display:flex;flex-wrap:wrap;gap:8px 14px">
          ${d.trades.map((t, i) => `<span>T${i + 1}: <span class="${t.r >= 0 ? 'up' : 'down'}">${fmt(t.r, 2)}R</span></span>`).join('')}
        </div>
      </div></div>`
    : '';

  c.innerHTML = `<div class="screen">
    <div class="lesson-kicker">${sc.name[lang].toUpperCase()} · ${App.t('sim_debrief')}</div>
    <div class="result">
      <div class="r-score ${d.noTrade ? '' : allPass ? 'up' : 'down'}">${d.noTrade ? (rangeOk ? App.t('sim_no_trade_pass') : App.t('sim_no_trade')) : allPass ? App.t('sim_process_pass') : App.t('sim_process_fail')}</div>
      ${processLine ? `<div class="r-msg mono" style="margin-top:8px">${processLine}</div>` : ''}
      <div class="r-msg">${App.t('sim_process_note')}</div>
    </div>
    ${d.limitExpired ? `<div class="note-box warn mt14">${App.t('sim_limit_expired')}</div>` : ''}
    ${rTimeline}
    ${d.trades.length ? `<div class="panel mt14">${d.trades.map((t) => `
      ${tradeRow(App, t)}
      ${t.process.fails.length ? `<div style="padding:0 18px 12px"><span class="tag flag">${t.process.fails.map((f) => App.t('sim_fail_' + f)).join(' · ')}</span></div>` : ''}
    `).join('')}</div>` : ''}
    <div class="spread mono mt14" style="font-size:14px;padding:0 4px">
      <span>${App.t('sim_net')}</span>
      <span class="${netPl >= 0 ? 'up' : 'down'}">${netPl >= 0 ? '+' : ''}$${fmt(netPl)}</span>
    </div>
    <div class="note-box warn mt14">${App.t('sim_honesty')}</div>
    <div class="btn-row mt18" style="flex-wrap:wrap">
      <button class="btn secondary" id="simSameSeed">${App.t('sim_same_seed')}</button>
      <button class="btn secondary" id="simAgain">${App.t('sim_again')}</button>
      <button class="btn accent" id="simDone">${App.t('next')}</button>
    </div>
  </div>`;

  document.getElementById('simSameSeed').addEventListener('click', () => startSession(sc.id, d.seed));
  document.getElementById('simAgain').addEventListener('click', () => startSession(sc.id));
  document.getElementById('simDone').addEventListener('click', () => { S.view = 'picker'; draw(); });
}

/* ---------------- portfolio (S5) ---------------- */
function startPortfolio(track) {
  S.pf = { track, seed: Date.now() % 1e9, plan: null, session: null, debrief: null, event: null };
  S.view = 'pf_plan';
  APP.haptic();
  draw();
}

function drawPfPlan() {
  const App = APP, c = ROOT;
  const title = S.pf.track === 'spot' ? App.t('pf_spot') : App.t('pf_invest');
  c.innerHTML = `<div class="screen">
    <button class="backlink" id="pfBack">${icon('back', { size: 16 })} ${App.t('back')}</button>
    <div class="lesson-kicker">${title.toUpperCase()}</div>
    <p style="font-size:13.5px;color:var(--t3);line-height:1.55;margin:0 0 14px">${App.t('pf_intro')}</p>
    <div class="panel pad">
      <div class="slabel">${App.t('pf_alloc')}</div>
      <div class="f-row three" style="margin-top:10px">
        <div class="field"><label>${App.t('pf_broad')}</label><input id="pfB" class="num" type="number" value="60" /></div>
        <div class="field"><label>${App.t('pf_single')}</label><input id="pfS" class="num" type="number" value="20" /></div>
        <div class="field"><label>${App.t('pf_cash')}</label><input id="pfC" class="num" type="number" value="20" /></div>
      </div>
      <div class="field"><label>${App.t('pf_dca')}</label><input id="pfDca" class="num" type="number" value="200" /></div>
      <div class="field"><label>${App.t('pf_rebalance')}</label>
        <div class="seg">
          <button type="button" class="on" data-reb="none">${App.t('pf_reb_none')}</button>
          <button type="button" data-reb="quarterly">${App.t('pf_reb_q')}</button>
        </div>
      </div>
      <div class="check-row" id="pfPlanned" data-on="0" style="border:1px solid var(--line);border-radius:var(--r2);margin:12px 0">
        <span class="check-box">${icon('checkThin', { size: 13, sw: 2.6 })}</span>
        <span class="check-t">${App.t('pf_planned_add')}</span>
      </div>
      <button class="btn accent" id="pfGo">${App.t('pf_start')}</button>
    </div>
  </div>`;
  let reb = 'none';
  document.getElementById('pfBack').addEventListener('click', () => { S.view = 'picker'; draw(); });
  c.querySelectorAll('[data-reb]').forEach((b) => b.addEventListener('click', () => {
    reb = b.dataset.reb;
    c.querySelectorAll('[data-reb]').forEach((x) => x.classList.toggle('on', x === b));
  }));
  const planned = document.getElementById('pfPlanned');
  planned.addEventListener('click', () => {
    const on = planned.dataset.on !== '1';
    planned.dataset.on = on ? '1' : '0';
    planned.classList.toggle('on', on);
  });
  document.getElementById('pfGo').addEventListener('click', () => {
    const plan = {
      alloc: {
        broad: parseFloat(document.getElementById('pfB').value) || 0,
        single: parseFloat(document.getElementById('pfS').value) || 0,
        cash: parseFloat(document.getElementById('pfC').value) || 0,
      },
      dca: parseFloat(document.getElementById('pfDca').value) || 200,
      rebalance: reb,
      plannedAdd: planned.dataset.on === '1',
    };
    S.pf.plan = plan;
    S.pf.session = createPortfolioSession({
      seed: S.pf.seed, balance: 10000, plan, track: S.pf.track,
    });
    S.pf.event = null;
    S.view = 'pf_run';
    APP.haptic();
    draw();
  });
}

function drawPfRun() {
  const App = APP, c = ROOT, lang = App.lang;
  const sess = S.pf.session;
  const st = sess.state;
  const val = sess.portfolioValue();
  const ev = S.pf.event;
  const monthLabel = st.month < 0 ? '—' : String(st.month + 1);

  c.innerHTML = `<div class="screen">
    <button class="backlink" id="pfEnd">${icon('back', { size: 16 })} ${App.t('sim_end')}</button>
    <div class="lesson-kicker">${App.t('pf_month')} ${monthLabel} / 24</div>
    <div class="panel pad" style="margin-bottom:12px">
      <div class="slabel">${App.t('pf_value')}</div>
      <div class="mono" style="font-size:22px;margin-top:6px">$${fmt(val)}</div>
    </div>
    ${ev ? `<div class="panel pad" style="margin-bottom:12px">
      <div class="slabel">${App.t('pf_decision')}</div>
      <p style="font-size:14px;margin:8px 0 14px;line-height:1.5">${ev[lang] || ev.en}</p>
      <button class="btn accent" id="pfStick" style="width:100%">${App.t('pf_stick')}</button>
      <button class="btn secondary mt10" id="pfAdd" style="width:100%">${App.t('pf_add')}</button>
      <button class="btn mt10" id="pfSell" style="width:100%">${App.t('pf_sell')}</button>
    </div>` : `<button class="btn accent" id="pfNext" style="width:100%">${App.t('pf_next')}</button>`}
    <div class="note-box warn mt14">${App.t('pf_honesty')}</div>
  </div>`;

  document.getElementById('pfEnd').addEventListener('click', () => { S.view = 'picker'; draw(); });
  document.getElementById('pfNext')?.addEventListener('click', () => pfAdvance());
  document.getElementById('pfStick')?.addEventListener('click', () => pfDecide('stick'));
  document.getElementById('pfAdd')?.addEventListener('click', () => pfDecide('add'));
  document.getElementById('pfSell')?.addEventListener('click', () => pfDecide('sell'));
}

function pfAdvance() {
  const r = S.pf.session.step();
  if (r.done) return endPortfolio(r.debrief || S.pf.session.debrief());
  if (r.event) { S.pf.event = r.event; APP.haptic(8); }
  else S.pf.event = null;
  draw();
}

function pfDecide(choice) {
  S.pf.session.decide(choice);
  S.pf.event = null;
  APP.haptic(choice === 'sell' ? 6 : 10);
  // auto-continue until next event or end
  let guard = 0;
  while (guard++ < 30) {
    const r = S.pf.session.step();
    if (r.done) return endPortfolio(r.debrief || S.pf.session.debrief());
    if (r.event) { S.pf.event = r.event; break; }
  }
  draw();
}

function endPortfolio(d) {
  const id = PORTFOLIO_IDS[S.pf.track] || 'portfolio_invest';
  const stats = store.get(KEYS.simStats, {});
  const s = stats[id] || { runs: 0, pass: 0, trades: 0 };
  s.runs += 1;
  if (d.pass) s.pass += 1;
  s.trades += 1;
  stats[id] = s;
  store.set(KEYS.simStats, stats);
  if (typeof APP.bumpStreak === 'function') APP.bumpStreak();
  markToday('lab');
  window.dispatchEvent(new CustomEvent('masterycap:session-milestone', {
    detail: { kind: 'sim', App: APP },
  }));
  S.pf.debrief = d;
  S.view = 'pf_debrief';
  draw();
}

function drawPfDebrief() {
  const App = APP, c = ROOT;
  const d = S.pf.debrief;
  c.innerHTML = `<div class="screen">
    <div class="lesson-kicker">${App.t('pf_debrief')}</div>
    <div class="result">
      <div class="r-score ${d.pass ? 'up' : 'down'}">${d.pass ? App.t('pf_pass') : App.t('pf_fail')}</div>
      <div class="r-msg">${App.t('pf_compound_note')}</div>
    </div>
    ${d.fails?.length ? `<div class="note-box err mt14"><span class="tag flag">${d.fails.join(' · ')}</span></div>` : ''}
    <div class="spread mono mt14" style="font-size:14px;padding:0 4px">
      <span>${App.t('pf_value')}</span>
      <span>$${fmt(d.final)}</span>
    </div>
    <div class="spread mono mt10" style="font-size:13px;padding:0 4px;color:var(--t3)">
      <span>${App.t('pf_vs_plan')}</span>
      <span>$${fmt(d.baseline)}</span>
    </div>
    <div class="note-box warn mt14">${App.t('pf_honesty')}</div>
    <div class="btn-row mt18">
      <button class="btn secondary" id="pfAgain">${App.t('pf_again')}</button>
      <button class="btn accent" id="pfDone">${App.t('next')}</button>
    </div>
  </div>`;
  document.getElementById('pfAgain').addEventListener('click', () => startPortfolio(S.pf.track));
  document.getElementById('pfDone').addEventListener('click', () => { S.view = 'picker'; draw(); });
}
