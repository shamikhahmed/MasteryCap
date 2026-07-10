/* ============================================================
   dashboard.js — editorial home: equity hero, stat strip,
   pre-trade discipline checklist, quick actions.
   ============================================================ */

import { getTrack } from '../data/tracks.js';
import { icon } from '../icons.js';
import { openSettings } from '../settings.js';

const CHECK_RULES = [
  { id: 'stop', en: 'Stop loss placed before entry', ur: 'Entry se pehle stop loss laga' },
  { id: 'risk', en: 'Risk within my max %', ur: 'Risk mere max % ke andar' },
  { id: 'calm', en: 'Calm — not FOMO or revenge', ur: 'Calm — FOMO/revenge nahi' },
  { id: 'plan', en: 'Setup matches my plan', ur: 'Setup mere plan se match' },
];

const todayKey = () => new Date().toISOString().slice(0, 10);

function greeting(App) {
  const h = new Date().getHours();
  return App.t(h < 12 ? 'goodmorning' : h < 18 ? 'goodafternoon' : 'goodevening');
}

function equityPoints(App) {
  const balance = App.getBalance();
  const trades = App.getTrades().slice().reverse();
  const totalPl = trades.reduce((s, t) => s + (Number(t.pl) || 0), 0);
  const base = balance - totalPl;
  const pts = [base]; let run = base;
  trades.forEach((t) => { run += Number(t.pl) || 0; pts.push(run); });
  return pts;
}

export function renderDashboard(App, c) {
  const lang = App.lang;
  const balance = App.getBalance();
  const trades = App.getTrades();
  const count = trades.length;
  const wins = trades.filter((t) => Number(t.pl) > 0).length;
  const winRate = count ? Math.round((wins / count) * 100) : 0;
  const totalPl = trades.reduce((s, t) => s + (Number(t.pl) || 0), 0);
  const xp = App.totalXp();

  const crypto = App.getCourse('crypto');
  const wk = getTrack('crypto').weeks;
  const doneCount = wk.filter((w) => ['completed', 'mastered'].includes(crypto.weekStatus[w.id])).length;
  const currentW = wk.find((w) => crypto.weekStatus[w.id] === 'current');
  const curWeek = currentW ? currentW.id : 0;

  const initials = (App.profile?.name || 'T').trim().slice(0, 2).toUpperCase();
  const pts = equityPoints(App);
  const up = totalPl >= 0;

  let checklist = App.getChecklist();
  if (checklist._date !== todayKey()) { checklist = { _date: todayKey() }; App.setChecklist(checklist); }
  const checkedNow = () => CHECK_RULES.filter((r) => App.getChecklist()[r.id]).length;

  c.innerHTML = `
  <div class="screen">
    <div class="lt-head">
      <div class="head-row">
        <div>
          <div class="kicker">${greeting(App)}</div>
          <h1>${App.profile?.name || 'Trader'}</h1>
        </div>
        <div class="hstack">
          <div class="seg">
            <button class="${lang === 'en' ? 'on' : ''}" data-lang="en">EN</button>
            <button class="${lang === 'ur' ? 'on' : ''}" data-lang="ur">UR</button>
          </div>
          <div class="avatar" id="openSettings" role="button" tabindex="0" aria-label="Settings">${initials}</div>
        </div>
      </div>
    </div>

    <!-- EQUITY -->
    <div class="equity">
      <div class="spread">
        <div class="eq-label">${App.t('portfolio')}</div>
        <button class="pill" id="editBal">${icon('edit', { size: 13 })} ${App.t('edit')}</button>
      </div>
      <div class="eq-bal mono">$<span id="eqBal">0.00</span></div>
      <div class="eq-delta ${up ? 'up' : 'down'}">
        ${icon(up ? 'triUp' : 'triDown', { size: 13 })} ${App.money(totalPl)} · ${count} ${count === 1 ? 'trade' : 'trades'}
      </div>
      ${count === 0
        ? `<div class="eq-empty">${lang === 'en' ? 'Your equity curve appears once you log a trade.' : 'Trade log karte hi equity curve nazar ayega.'}</div>`
        : `<div class="eq-chart">${App.sparkline(pts, { id: 'hero', color: up ? 'acc' : 'auto', animate: true })}</div>`}
    </div>

    <!-- STAT STRIP -->
    <div class="stat-strip">
      <div class="stat-cell">
        <div class="sc-l">${App.t('stat_winrate')}</div>
        <div class="sc-v">${winRate}<span style="font-size:13px;color:var(--t3)">%</span></div>
        <div class="sc-s mono">${wins}/${count}</div>
      </div>
      <div class="stat-cell">
        <div class="sc-l">${App.t('stat_pl')}</div>
        <div class="sc-v ${up ? 'up' : 'down'}">${App.money(totalPl, { sign: totalPl > 0 })}</div>
        <div class="sc-s">${lang === 'en' ? 'net' : 'net'}</div>
      </div>
      <div class="stat-cell">
        <div class="sc-l">${App.t('stat_xp')}</div>
        <div class="sc-v" style="color:var(--warn)">${xp}</div>
        <div class="sc-s">${lang === 'en' ? 'earned' : 'earned'}</div>
      </div>
      <div class="stat-cell">
        <div class="sc-l">${App.t('stat_week')}</div>
        <div class="sc-v">${curWeek || '—'}</div>
        <div class="sc-s mono">${doneCount}/${wk.length}</div>
      </div>
    </div>

    <!-- CHECKLIST -->
    <div class="panel">
      <div class="panel-h">
        <span class="ph-t">${App.t('pretrade')}</span>
        <span class="pill mono" id="checkCount">${checkedNow()}/${CHECK_RULES.length}</span>
      </div>
      <div>${CHECK_RULES.map((r) => `
        <div class="check-row ${checklist[r.id] ? 'on' : ''}" data-rule="${r.id}">
          <span class="check-box">${icon('checkThin', { size: 13, sw: 2.6 })}</span>
          <span class="check-t">${lang === 'en' ? r.en : r.ur}</span>
        </div>`).join('')}</div>
    </div>

    <!-- ACTIONS -->
    <div class="btn-row mt14">
      <button class="btn secondary" id="goLearn">${icon('learn', { size: 17 })} ${App.t('continueLearning')}</button>
      <button class="btn accent" id="goJournal">${icon('plus', { size: 17 })} ${App.t('jumpJournal')}</button>
    </div>
  </div>`;

  App.countUp(document.getElementById('eqBal'), balance, { prefix: '' });

  c.querySelectorAll('[data-lang]').forEach((b) => b.addEventListener('click', () => App.setLang(b.dataset.lang)));
  document.getElementById('editBal').addEventListener('click', () => {
    const v = prompt(App.t('portfolio') + ' ($)', balance);
    if (v !== null && !isNaN(parseFloat(v))) { App.setBalance(parseFloat(v)); App.render(); }
  });
  c.querySelectorAll('.check-row').forEach((el) => el.addEventListener('click', () => {
    const cl = App.getChecklist(); cl[el.dataset.rule] = !cl[el.dataset.rule]; App.setChecklist(cl);
    el.classList.toggle('on', cl[el.dataset.rule]); App.haptic();
    document.getElementById('checkCount').textContent = `${checkedNow()}/${CHECK_RULES.length}`;
  }));
  document.getElementById('goLearn').addEventListener('click', () => App.navigate('learn'));
  document.getElementById('goJournal').addEventListener('click', () => App.navigate('journal'));
  const av = document.getElementById('openSettings');
  if (av) {
    av.addEventListener('click', () => { App.haptic(); openSettings(App); });
    av.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSettings(App); } });
  }
}
