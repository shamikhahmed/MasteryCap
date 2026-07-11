/* ============================================================
   journal.js — position-sizing calculator + trade log.
   Risk math + emotion tags ported verbatim. Presentation rebuilt.
   ============================================================ */

import { icon } from '../icons.js';
import { store, KEYS } from '../store.js';

let direction = null;
let pendingDebriefId = null;
const EMOTIONS = [
  { v: 'calm', key: 'emo_calm' }, { v: 'fomo', key: 'emo_fomo' },
  { v: 'revenge', key: 'emo_revenge' }, { v: 'greed', key: 'emo_greed' }, { v: 'bored', key: 'emo_bored' },
];
const FLAGGED = ['revenge', 'greed'];
const emoShort = (e) => ({ calm: 'Calm', fomo: 'FOMO', revenge: 'Revenge', greed: 'Greed', bored: 'Bored' }[e] || e);

function settings() {
  return store.get(KEYS.settings, {});
}

function checklistComplete(App) {
  const cl = App.getChecklist() || {};
  return ['stop', 'risk', 'calm', 'plan'].every((id) => !!cl[id]);
}

function cooldownActive() {
  const until = store.get(KEYS.coolDownUntil);
  if (!until) return null;
  const t = new Date(until).getTime();
  if (Date.now() >= t) { store.remove(KEYS.coolDownUntil); return null; }
  return until;
}

export function renderJournal(App, c) {
  const lang = App.lang;
  const balance = App.getBalance();
  const cd = cooldownActive();
  const s = settings();

  c.innerHTML = `
  <div class="screen">
    <div class="lt-head"><div class="kicker">${App.t('nav_journal')}</div><h1>${App.t('j_title')}</h1></div>
    <p style="font-size:13.5px;color:var(--t3);margin:-10px 0 18px;line-height:1.5">${App.t('j_sub')}</p>
    ${cd ? `<div class="note-box warn" id="cdPill" style="margin-bottom:12px">${App.t('cooldown_pill').replace('{t}', new Date(cd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))}
      ${s.strictMode ? '' : `<button class="pill" id="cdOverride" style="margin-left:8px">${App.t('cooldown_override')}</button>`}
    </div>` : ''}
    <div id="debriefBox" class="hidden"></div>

    <div class="panel" style="margin-bottom:16px">
      <div class="balance-bar">
        <span class="bb-l">${App.t('portfolio')}</span>
        <span class="bb-in"><span>$</span><input id="jBalance" class="mono" type="number" step="0.01" value="${balance}" /></span>
      </div>
    </div>

    <div class="panel">
      <div class="panel-h"><span class="ph-t">${App.t('calc_title')}</span>${icon('target', { size: 17, cls: '' })}</div>
      <div class="pad" style="padding-bottom:14px">
        <div class="f-row three">
          <div class="field" style="margin-bottom:0"><label>${App.t('entry_price')}</label><input id="calcEntry" class="num" type="number" step="any" placeholder="148.20" /></div>
          <div class="field" style="margin-bottom:0"><label>${App.t('stop_price')}</label><input id="calcStop" class="num" type="number" step="any" placeholder="146.70" /></div>
          <div class="field" style="margin-bottom:0"><label>${App.t('risk_pct')}</label><input id="calcRisk" class="num" type="number" step="0.1" value="2" /></div>
        </div>
        <div id="calcOut" class="calc-hint mt14">${App.t('calc_hint')}</div>
        <div class="note-box warn hidden mt10" id="calcWarn"></div>
      </div>
    </div>

    <div class="panel mt14">
      <div class="panel-h"><span class="ph-t">${App.t('log_trade')}</span></div>
      <div class="pad">
        <div class="field"><label>${App.t('direction')}</label>
          <div class="dir-seg">
            <button id="btnLong" data-dir="long">${icon('arrowUp', { size: 16 })} ${App.t('long')}</button>
            <button id="btnShort" data-dir="short">${icon('arrowDown', { size: 16 })} ${App.t('short')}</button>
          </div>
        </div>
        <div class="f-row three">
          <div class="field"><label>${App.t('pair')}</label><input id="pair" type="text" placeholder="SOLUSDT" /></div>
          <div class="field"><label>${App.t('leverage')}</label><input id="leverage" class="num" type="number" step="0.1" placeholder="5" /></div>
          <div class="field"><label>${App.t('size')}</label><input id="size" class="num" type="number" step="0.01" placeholder="10" /></div>
        </div>
        <div class="f-row three">
          <div class="field"><label>${App.t('entry')}</label><input id="entry" class="num" type="number" step="any" /></div>
          <div class="field"><label>${App.t('stop')}</label><input id="stop" class="num" type="number" step="any" /></div>
          <div class="field"><label>${App.t('exit')}</label><input id="exit" class="num" type="number" step="any" inputmode="decimal" /></div>
        </div>
        <div class="grid-3">
          <div class="field"><label>Setup</label><input id="setup" type="text" list="setupList" placeholder="breakout" /></div>
          <div class="field"><label>Market</label>
            <select id="market"><option value="">—</option><option>crypto</option><option>stocks</option><option>forex</option><option>futures</option><option>other</option></select>
          </div>
          <div class="field"><label>TF</label>
            <select id="timeframe"><option value="">—</option><option>scalp</option><option>intraday</option><option>swing</option><option>position</option></select>
          </div>
        </div>
        <datalist id="setupList"></datalist>
        <div class="f-row">
          <div class="field"><label>${App.t('result')}</label><input id="pl" class="num" type="number" step="0.01" placeholder="+/− $" /></div>
          <div class="field"><label>${App.t('mental')}</label><select id="emotion">${EMOTIONS.map((e) => `<option value="${e.v}">${App.t(e.key)}</option>`).join('')}</select></div>
        </div>
        <div class="field"><label>${App.t('notes')}</label><input id="notes" type="text" placeholder="${App.t('notes_ph')}" /></div>
        <div class="check-row" id="togStop" data-on="0" style="border:1px solid var(--line);border-radius:var(--r2);margin-bottom:10px">
          <span class="check-box">${icon('checkThin', { size: 13, sw: 2.6 })}</span>
          <span class="check-t">${App.t('disc_stop_placed')}</span>
        </div>
        <div class="check-row" id="togMoved" data-on="0" style="border:1px solid var(--line);border-radius:var(--r2);margin-bottom:14px">
          <span class="check-box">${icon('checkThin', { size: 13, sw: 2.6 })}</span>
          <span class="check-t">${App.t('disc_moved_stop')}</span>
        </div>
        <button class="btn accent" id="saveTrade">${App.t('save_trade')}</button>
      </div>
      <div class="rule-note" style="border-top:1px solid var(--line)">${icon('shield', { size: 17 })}<span>${App.t('rule_text')}</span></div>
    </div>

    <div class="panel mt14">
      <div class="panel-h"><span class="ph-t">${App.t('history')}</span></div>
      <div class="pad" style="padding-bottom:8px">
        <div class="grid-3">
          <div class="field" style="margin:0"><label>Setup</label><input id="filtSetup" type="search" placeholder="…" /></div>
          <div class="field" style="margin:0"><label>Market</label>
            <select id="filtMarket"><option value="">—</option><option>crypto</option><option>stocks</option><option>forex</option><option>futures</option><option>other</option></select>
          </div>
          <div class="field" style="margin:0"><label>TF</label>
            <select id="filtTf"><option value="">—</option><option>scalp</option><option>intraday</option><option>swing</option><option>position</option></select>
          </div>
        </div>
      </div>
      <div id="log"></div>
    </div>
  </div>`;

  const balInput = document.getElementById('jBalance');
  balInput.addEventListener('input', updateCalc);
  balInput.addEventListener('change', () => App.setBalance(balInput.value));

  function setDir(d) {
    direction = d;
    const l = document.getElementById('btnLong'), s = document.getElementById('btnShort');
    l.classList.toggle('on', d === 'long'); l.classList.toggle('long', d === 'long');
    s.classList.toggle('on', d === 'short'); s.classList.toggle('short', d === 'short');
    App.haptic();
  }
  document.getElementById('btnLong').addEventListener('click', () => setDir('long'));
  document.getElementById('btnShort').addEventListener('click', () => setDir('short'));

  function updateCalc() {
    const bal = parseFloat(balInput.value) || 0;
    const entry = parseFloat(document.getElementById('calcEntry').value);
    const stop = parseFloat(document.getElementById('calcStop').value);
    const riskPct = parseFloat(document.getElementById('calcRisk').value) || 2;
    const out = document.getElementById('calcOut');
    const warn = document.getElementById('calcWarn');
    warn.classList.add('hidden');
    if (!entry || !stop || entry === stop || bal <= 0) { out.className = 'calc-hint mt14'; out.textContent = App.t('calc_hint'); return; }
    const stopDistPct = Math.abs(entry - stop) / entry;
    const riskDollars = bal * (riskPct / 100);
    const maxPositionSize = riskDollars / stopDistPct;
    const impliedLeverage = maxPositionSize / bal;
    out.className = 'calc-result mt14';
    out.innerHTML = `
      <div class="cr"><div class="cr-l">${App.t('max_risk')}</div><div class="cr-v">${App.money(riskDollars)}</div></div>
      <div class="cr"><div class="cr-l">${App.t('pos_size')}</div><div class="cr-v acc">${App.money(maxPositionSize)}</div></div>
      <div class="cr"><div class="cr-l">${App.t('leverage')}</div><div class="cr-v">${impliedLeverage.toFixed(1)}x</div></div>`;
    if (impliedLeverage > 20) { warn.textContent = App.t('warn_lev'); warn.classList.remove('hidden'); }
  }
  ['calcEntry', 'calcStop', 'calcRisk'].forEach((id) => document.getElementById(id).addEventListener('input', updateCalc));

  function wireToggle(id) {
    const el = document.getElementById(id);
    el.addEventListener('click', () => {
      const on = el.dataset.on !== '1';
      el.dataset.on = on ? '1' : '0';
      el.classList.toggle('on', on);
      App.haptic();
    });
  }
  wireToggle('togStop');
  wireToggle('togMoved');

  document.getElementById('saveTrade').addEventListener('click', () => {
    const g = (id) => document.getElementById(id).value;
    const pl = parseFloat(g('pl'));
    if (!direction) { alert(lang === 'en' ? 'Pick long or short.' : 'Long ya short chuno.'); return; }
    if (isNaN(pl)) { alert(lang === 'en' ? 'Enter the P/L result in dollars.' : 'P/L result dollars mein daalo.'); return; }
    if (s.checklistGate && !checklistComplete(App)) {
      alert(lang === 'en' ? 'Checklist must be 4/4 on Home first.' : 'Pehle Home pe checklist 4/4.');
      return;
    }
    const until = cooldownActive();
    if (until) {
      alert(App.t('cooldown_pill').replace('{t}', new Date(until).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })));
      return;
    }
    const emotion = g('emotion');
    const list = App.getTrades();
    const trade = {
      id: Date.now(), date: new Date().toISOString(),
      pair: g('pair').trim() || '—', direction, leverage: g('leverage'), size: g('size'),
      entry: g('entry'), stop: g('stop'), exit: g('exit'), pl, emotion, notes: g('notes').trim(),
      stopPlaced: document.getElementById('togStop').dataset.on === '1',
      movedStop: document.getElementById('togMoved').dataset.on === '1',
      setup: (document.getElementById('setup')?.value || '').trim() || undefined,
      market: document.getElementById('market')?.value || undefined,
      timeframe: document.getElementById('timeframe')?.value || undefined,
      r: (() => {
        const entry = parseFloat(g('entry')), stop = parseFloat(g('stop')), exit = parseFloat(g('exit'));
        if (!(entry > 0) || !(stop > 0) || !(exit > 0) || entry === stop) return undefined;
        const risk = Math.abs(entry - stop);
        if (!(risk > 0)) return undefined;
        const signed = direction === 'short' ? (entry - exit) : (exit - entry);
        return Math.round((signed / risk) * 100) / 100;
      })(),
    };
    list.unshift(trade);
    App.setTrades(list);
    if (FLAGGED.includes(emotion)) {
      store.set(KEYS.coolDownUntil, new Date(Date.now() + 30 * 60 * 1000).toISOString());
    }
    App.haptic(14); App.bumpStreak();
    pendingDebriefId = trade.id;
    App.render();
    showDebrief(App, trade.id);
  });

  document.getElementById('cdOverride')?.addEventListener('click', () => {
    // long-press simulated: require confirm
    if (!confirm(App.t('cooldown_override') + '?')) return;
    store.remove(KEYS.coolDownUntil);
    const list = App.getTrades();
    if (list[0]) { list[0].overrode = true; App.setTrades(list); }
    App.render();
  });

  // setup autocomplete from history
  const setups = [...new Set(App.getTrades().map((t) => t.setup).filter(Boolean))];
  const dl = document.getElementById('setupList');
  if (dl) dl.innerHTML = setups.map((s) => `<option value="${s}">`).join('');

  ['filtSetup', 'filtMarket', 'filtTf'].forEach((id) => {
    document.getElementById(id)?.addEventListener('input', () => renderLog());
    document.getElementById(id)?.addEventListener('change', () => renderLog());
  });

  renderLog();
  if (pendingDebriefId) showDebrief(App, pendingDebriefId);

  function showDebrief(App, id) {
    const box = document.getElementById('debriefBox');
    if (!box) return;
    box.classList.remove('hidden');
    box.className = 'panel pad mt14';
    box.innerHTML = `<div class="slabel">${App.t('debrief_title')}</div>
      <div class="field"><label>${App.t('debrief_plan')}</label>
        <div class="seg" style="width:100%"><button data-fp="1">Y</button><button data-fp="0">N</button></div></div>
      <div class="field"><label>${App.t('debrief_worked')}</label><input id="dbWorked" type="text" /></div>
      <div class="field"><label>${App.t('debrief_fix')}</label><input id="dbFix" type="text" /></div>
      <button class="btn secondary" id="dbSave">${App.t('debrief_save')}</button>
      <button class="btn ghost mt10" id="dbSkip">${App.t('debrief_skip')}</button>`;
    let followed = null;
    box.querySelectorAll('[data-fp]').forEach((b) => b.addEventListener('click', () => {
      followed = b.dataset.fp === '1';
      box.querySelectorAll('[data-fp]').forEach((x) => x.classList.toggle('on', x === b));
    }));
    const close = () => { pendingDebriefId = null; box.classList.add('hidden'); box.innerHTML = ''; };
    document.getElementById('dbSkip').addEventListener('click', close);
    document.getElementById('dbSave').addEventListener('click', () => {
      const list = App.getTrades();
      const t = list.find((x) => x.id === id);
      if (t) {
        t.followedPlan = followed;
        t.worked = document.getElementById('dbWorked').value.trim();
        t.toFix = document.getElementById('dbFix').value.trim();
        App.setTrades(list);
      }
      close();
    });
  }

  function renderLog() {
    const log = document.getElementById('log');
    let list = App.getTrades();
    const fSetup = document.getElementById('filtSetup')?.value?.trim().toLowerCase() || '';
    const fMarket = document.getElementById('filtMarket')?.value || '';
    const fTf = document.getElementById('filtTf')?.value || '';
    if (fSetup) list = list.filter((t) => (t.setup || '').toLowerCase().includes(fSetup));
    if (fMarket) list = list.filter((t) => t.market === fMarket);
    if (fTf) list = list.filter((t) => t.timeframe === fTf);
    if (!list.length) {
      log.innerHTML = `<div class="empty">${icon('journal', { size: 40, cls: 'e-ic', sw: 1.3 })}${App.t('no_trades')}</div>`;
      return;
    }
    log.innerHTML = list.map((t) => {
      const pos = Number(t.pl) >= 0;
      const d = new Date(t.date);
      const ds = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const flagged = FLAGGED.includes(t.emotion);
      const tags = [t.setup, t.market, t.timeframe].filter(Boolean).join(' · ');
      return `<div class="trade-row">
        <span class="trade-dir ${t.direction}">${icon(t.direction === 'long' ? 'arrowUp' : 'arrowDown', { size: 16 })}</span>
        <div class="trade-body">
          <div class="tb-t">${t.pair} <span class="tag ${flagged ? 'flag' : ''}">${emoShort(t.emotion)}</span></div>
          <div class="tb-m">${t.leverage || '?'}x · ${ds}${t.r != null ? ` · ${t.r}R` : ''}${tags ? ' · ' + tags : ''}${t.notes ? ' · ' + t.notes : ''}</div>
        </div>
        <span class="trade-pl ${pos ? 'up' : 'down'}">${pos ? '+' : ''}${App.money(t.pl)}</span>
        <button class="del" data-del="${t.id}">${icon('trash', { size: 15 })}</button>
      </div>`;
    }).join('');
    log.querySelectorAll('[data-del]').forEach((b) => b.addEventListener('click', () => { App.setTrades(App.getTrades().filter((x) => x.id !== Number(b.dataset.del))); App.render(); }));
  }
}
