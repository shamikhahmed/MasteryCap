/* ============================================================
   dashboard.js — editorial home: equity hero, stat strip,
   pre-trade discipline checklist, quick actions.
   ============================================================ */

import { getTrack } from '../data/tracks.js';
import { icon } from '../icons.js';
import { openSettings } from '../settings.js';
import { worstCostLine } from '../insights.js';
import { getStreak, reviewAvailable } from '../retention.js';
import { disciplineReport } from '../discipline.js';
import { store, KEYS } from '../store.js';

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
  const streak = getStreak();
  const disc = disciplineReport(trades, balance);

  let checklist = App.getChecklist();
  if (checklist._date !== todayKey()) { checklist = { _date: todayKey() }; App.setChecklist(checklist); }
  const checkedNow = () => CHECK_RULES.filter((r) => App.getChecklist()[r.id]).length;

  c.innerHTML = `
  <div class="screen">
    <div class="lt-head">
      <div class="head-row">
        <div>
          <div class="kicker">${greeting(App)}${store.getNs().startsWith('masterycap-demo') ? ` · <span class="pill acc">${App.t('demo_pill')}</span>` : ''}</div>
          <h1>${App.profile?.name || 'Trader'}</h1>
        </div>
        <div class="hstack">
          ${streak.current ? `<span class="pill mono acc">${icon('flame', { size: 13 })} ${streak.current}</span>` : ''}
          <div class="seg">
            <button class="${lang === 'en' ? 'on' : ''}" data-lang="en">EN</button>
            <button class="${lang === 'ur' ? 'on' : ''}" data-lang="ur">UR</button>
          </div>
          <div class="avatar" id="openSettings" role="button" tabindex="0" aria-label="Settings">${initials}</div>
        </div>
      </div>
    </div>

    ${(() => {
      const notices = [];
      if (store.get(KEYS.morningPending)) {
        notices.push(`<div class="panel pad" id="morningBrief" style="margin-bottom:12px">
          <div class="slabel">${App.t('morning_brief')}</div>
          <div class="hstack" style="gap:8px;margin-top:10px;flex-wrap:wrap">
            <button class="btn secondary" id="mbReview" style="flex:1">${App.t('morning_review')}</button>
            <button class="btn secondary" id="mbDrill" style="flex:1">${App.t('morning_drill')}</button>
          </div>
          <button class="pill mt10" id="mbDismiss">${App.t('morning_dismiss')}</button>
        </div>`);
      }
      const cdUntil = store.get(KEYS.coolDownUntil);
      if (cdUntil && Date.now() < Number(cdUntil)) {
        notices.push(`<div class="note-box warn" style="margin-bottom:12px">${App.t('cooldown_pill').replace('{t}', new Date(Number(cdUntil)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))}</div>`);
      }
      if (store.overQuota() && !store.get(KEYS.quotaDismissed)) {
        notices.push(`<div class="note-box warn" id="quotaPill" style="margin-bottom:12px">${App.t('quota_warn')} <button class="pill" id="quotaDismiss" style="margin-left:8px">${App.t('backup_remind_dismiss')}</button></div>`);
      }
      const last = store.get(KEYS.lastExportAt);
      const overdue = !last || (Date.now() - new Date(last).getTime() > 7 * 86400000);
      if (overdue && !store.get(KEYS.backupRemindDismissed) && store.get(KEYS.onboarded)) {
        notices.push(`<div class="note-box" id="backupPill" style="margin-bottom:12px">${App.t('backup_remind')} <button class="pill" id="backupDismiss" style="margin-left:8px">${App.t('backup_remind_dismiss')}</button></div>`);
      }
      return notices.join('');
    })()}

    <!-- EQUITY -->
    <div class="equity">
      <div class="spread">
        <div class="eq-label">${App.t('portfolio')}</div>
        <button type="button" class="pill" id="editBal">${icon('edit', { size: 13 })} ${App.t('edit')}</button>
      </div>
      <div class="eq-bal mono" id="eqBalWrap">$<span id="eqBal">0.00</span></div>
      <div id="eqEditRow" class="hidden" style="margin-top:12px">
        <div class="field" style="margin:0">
          <label>${App.t('portfolio')} ($)</label>
          <input id="eqEditIn" class="num mono" type="number" inputmode="decimal" step="0.01" value="${balance}" />
        </div>
        <div class="hstack" style="gap:8px;margin-top:10px">
          <button type="button" class="btn accent" id="eqSave" style="flex:1">${App.t('save_bal')}</button>
          <button type="button" class="btn secondary" id="eqCancel" style="flex:1">${App.t('cancel')}</button>
        </div>
      </div>
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
      ${disc ? `<div class="stat-cell">
        <div class="sc-l">${App.t('disc_grade')}</div>
        <div class="sc-v" style="color:var(--acc-2)">${disc.grade}</div>
        <div class="sc-s mono">${disc.n}t</div>
      </div>` : ''}
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

    ${(() => {
      const line = worstCostLine(trades, lang);
      return line ? `<div class="note-box warn mt14" style="margin-bottom:0">${line}</div>` : '';
    })()}

    <!-- ACTIONS -->
    <div class="btn-row mt14">
      <button class="btn secondary" id="goLearn">${icon('learn', { size: 17 })} ${App.t('continueLearning')}</button>
      <button class="btn accent" id="goJournal">${icon('plus', { size: 17 })} ${App.t('jumpJournal')}</button>
    </div>
    <button class="btn ghost mt14" id="goDrills" style="width:100%">${icon('target', { size: 17 })} ${App.t('drill_cta')}</button>
    <button class="btn ghost mt10" id="goCharts" style="width:100%">${icon('progress', { size: 17 })} ${App.t('chart_cta')}</button>
    ${reviewAvailable() ? `<button class="btn secondary mt10" id="goReview" style="width:100%">${icon('book', { size: 17 })} ${App.t('review_cta').replace('{n}', String(streak.current || 0))}</button>` : ''}
  </div>`;

  App.countUp(document.getElementById('eqBal'), balance, { prefix: '', dur: 0 });

  c.querySelectorAll('[data-lang]').forEach((b) => b.addEventListener('click', () => App.setLang(b.dataset.lang)));
  const openEqEdit = () => {
    document.getElementById('eqBalWrap')?.classList.add('hidden');
    document.getElementById('eqEditRow')?.classList.remove('hidden');
    document.getElementById('editBal')?.classList.add('hidden');
    const inp = document.getElementById('eqEditIn');
    if (inp) { inp.value = String(App.getBalance()); inp.focus(); inp.select(); }
    App.haptic();
  };
  document.getElementById('editBal')?.addEventListener('click', openEqEdit);
  document.getElementById('eqCancel')?.addEventListener('click', () => App.render());
  document.getElementById('eqSave')?.addEventListener('click', () => {
    const raw = document.getElementById('eqEditIn')?.value;
    const n = parseFloat(raw);
    if (!Number.isFinite(n) || n < 0) {
      document.getElementById('eqEditIn')?.focus();
      return;
    }
    App.setBalance(n);
    App.haptic(12);
    App.render();
  });
  document.getElementById('eqEditIn')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('eqSave')?.click();
    if (e.key === 'Escape') App.render();
  });
  c.querySelectorAll('.check-row').forEach((el) => el.addEventListener('click', () => {
    const cl = App.getChecklist(); cl[el.dataset.rule] = !cl[el.dataset.rule]; App.setChecklist(cl);
    el.classList.toggle('on', cl[el.dataset.rule]); App.haptic();
    document.getElementById('checkCount').textContent = `${checkedNow()}/${CHECK_RULES.length}`;
  }));
  document.getElementById('goLearn').addEventListener('click', () => App.navigate('learn'));
  document.getElementById('goJournal').addEventListener('click', () => App.navigate('journal'));
  document.getElementById('goDrills').addEventListener('click', () => App.openDrills());
  document.getElementById('goCharts')?.addEventListener('click', () => App.openCharts());
  document.getElementById('goReview')?.addEventListener('click', () => App.openReview());
  document.getElementById('quotaDismiss')?.addEventListener('click', () => {
    store.set(KEYS.quotaDismissed, true); App.render();
  });
  document.getElementById('backupDismiss')?.addEventListener('click', () => {
    store.set(KEYS.backupRemindDismissed, true); App.render();
  });
  document.getElementById('mbDismiss')?.addEventListener('click', () => {
    store.remove(KEYS.morningPending);
    store.set(KEYS.morningBriefDay, new Date().toISOString().slice(0, 10));
    App.render();
  });
  document.getElementById('mbReview')?.addEventListener('click', () => {
    store.remove(KEYS.morningPending);
    store.set(KEYS.morningBriefDay, new Date().toISOString().slice(0, 10));
    App.openReview();
  });
  document.getElementById('mbDrill')?.addEventListener('click', () => {
    store.remove(KEYS.morningPending);
    store.set(KEYS.morningBriefDay, new Date().toISOString().slice(0, 10));
    App.openDrills();
  });
  const av = document.getElementById('openSettings');
  if (av) {
    av.addEventListener('click', () => { App.haptic(); openSettings(App); });
    av.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSettings(App); } });
  }
}
