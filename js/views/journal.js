/* ============================================================
   journal.js — position-sizing calculator + trade log.
   Risk math + emotion tags ported verbatim. Presentation rebuilt.
   ============================================================ */

import { icon } from '../icons.js';

let direction = null;
const EMOTIONS = [
  { v: 'calm', key: 'emo_calm' }, { v: 'fomo', key: 'emo_fomo' },
  { v: 'revenge', key: 'emo_revenge' }, { v: 'greed', key: 'emo_greed' }, { v: 'bored', key: 'emo_bored' },
];
const FLAGGED = ['revenge', 'greed'];
const emoShort = (e) => ({ calm: 'Calm', fomo: 'FOMO', revenge: 'Revenge', greed: 'Greed', bored: 'Bored' }[e] || e);

export function renderJournal(App, c) {
  const lang = App.lang;
  const balance = App.getBalance();

  c.innerHTML = `
  <div class="screen">
    <div class="lt-head"><div class="kicker">${App.t('nav_journal')}</div><h1>${App.t('j_title')}</h1></div>
    <p style="font-size:13.5px;color:var(--t3);margin:-10px 0 18px;line-height:1.5">${App.t('j_sub')}</p>

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
          <div class="field"><label>${App.t('exit')}</label><input id="exit" class="num" type="number" step="any" /></div>
        </div>
        <div class="f-row">
          <div class="field"><label>${App.t('result')}</label><input id="pl" class="num" type="number" step="0.01" placeholder="+/− $" /></div>
          <div class="field"><label>${App.t('mental')}</label><select id="emotion">${EMOTIONS.map((e) => `<option value="${e.v}">${App.t(e.key)}</option>`).join('')}</select></div>
        </div>
        <div class="field"><label>${App.t('notes')}</label><input id="notes" type="text" placeholder="${App.t('notes_ph')}" /></div>
        <button class="btn accent" id="saveTrade">${App.t('save_trade')}</button>
      </div>
      <div class="rule-note" style="border-top:1px solid var(--line)">${icon('shield', { size: 17 })}<span>${App.t('rule_text')}</span></div>
    </div>

    <div class="panel mt14">
      <div class="panel-h"><span class="ph-t">${App.t('history')}</span></div>
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

  document.getElementById('saveTrade').addEventListener('click', () => {
    const g = (id) => document.getElementById(id).value;
    const pl = parseFloat(g('pl'));
    if (!direction) { alert(lang === 'en' ? 'Pick long or short.' : 'Long ya short chuno.'); return; }
    if (isNaN(pl)) { alert(lang === 'en' ? 'Enter the P/L result in dollars.' : 'P/L result dollars mein daalo.'); return; }
    const list = App.getTrades();
    list.unshift({ id: Date.now(), date: new Date().toISOString(), pair: g('pair').trim() || '—', direction, leverage: g('leverage'), size: g('size'), entry: g('entry'), stop: g('stop'), exit: g('exit'), pl, emotion: g('emotion'), notes: g('notes').trim() });
    App.setTrades(list); App.haptic(14); App.bumpStreak(); App.render();
  });

  renderLog();
  function renderLog() {
    const log = document.getElementById('log');
    const list = App.getTrades();
    if (!list.length) { log.innerHTML = `<div class="empty">${icon('journal', { size: 40, cls: 'e-ic', sw: 1.3 })}${App.t('no_trades')}</div>`; return; }
    log.innerHTML = list.map((t) => {
      const pos = Number(t.pl) >= 0;
      const d = new Date(t.date);
      const ds = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const flagged = FLAGGED.includes(t.emotion);
      return `<div class="trade-row">
        <span class="trade-dir ${t.direction}">${icon(t.direction === 'long' ? 'arrowUp' : 'arrowDown', { size: 16 })}</span>
        <div class="trade-body">
          <div class="tb-t">${t.pair} <span class="tag ${flagged ? 'flag' : ''}">${emoShort(t.emotion)}</span></div>
          <div class="tb-m">${t.leverage || '?'}x · ${ds}${t.notes ? ' · ' + t.notes : ''}</div>
        </div>
        <span class="trade-pl ${pos ? 'up' : 'down'}">${pos ? '+' : ''}${App.money(t.pl)}</span>
        <button class="del" data-del="${t.id}">${icon('trash', { size: 15 })}</button>
      </div>`;
    }).join('');
    log.querySelectorAll('[data-del]').forEach((b) => b.addEventListener('click', () => { App.setTrades(App.getTrades().filter((x) => x.id !== Number(b.dataset.del))); App.render(); }));
  }
}
