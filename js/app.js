/* ============================================================
   app.js — MasteryCap shell: state, router, splash, onboarding,
   bottom nav, shared UI helpers.
   ============================================================ */

import { store, KEYS } from './store.js';
import { tr } from './i18n.js';
import { icon } from './icons.js';
import { renderDashboard } from './views/dashboard.js';
import { renderCourse, confirmCourseLeave, clearCourseDirty } from './views/course.js';
import { renderJournal } from './views/journal.js';
import { renderProgress } from './views/progress.js';
import { renderDrills } from './views/drills.js';
import { renderReview } from './views/review.js';
import { renderCharts } from './views/charts.js';
import { touchStreak, touchStreakWithFreeze, markHabitDay, dueReviewCount, tryStreakRecovery, getStreak } from './retention.js';
import { applySettings, openSettings, APP_VERSION } from './settings.js';
import { mistakeCountDue } from './mistakes.js';

const root = () => document.getElementById('app-root');

export const App = {
  lang: 'en',
  tab: 'dashboard',
  profile: null,

  t(key) { return tr(this.lang, key); },
  icon(name, opts) { return icon(name, opts); },

  /* ----- persistence ----- */
  getBalance() { return Number(store.get(KEYS.balance, 100)) || 0; },
  setBalance(v) { store.set(KEYS.balance, Number(v) || 0); },
  getTrades() { return store.get(KEYS.trades, []); },
  setTrades(arr) { store.set(KEYS.trades, arr); },
  getCourse(id) { const a = store.get(KEYS.course, {}); return a[id] || { placementDone: false, weekStatus: {}, xp: 0 }; },
  setCourse(id, data) { const a = store.get(KEYS.course, {}); a[id] = data; store.set(KEYS.course, a); },
  totalXp() { return Object.values(store.get(KEYS.course, {})).reduce((s, c) => s + (c.xp || 0), 0); },
  getChecklist() { return store.get(KEYS.checklist, {}); },
  setChecklist(v) { store.set(KEYS.checklist, v); },

  setLang(l) {
    this.lang = l;
    const s = store.get(KEYS.settings, {}); s.lang = l; store.set(KEYS.settings, s);
    this.render(); this.renderNav();
  },

  /* ----- helpers ----- */
  haptic(ms = 8) {
    if (this._haptics === false) return;
    try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {}
  },

  money(n, { sign = false, dp = 2 } = {}) {
    const v = Number(n) || 0;
    const s = Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });
    return (v < 0 ? '−$' : (sign ? '+$' : '$')) + s;
  },

  countUp(node, to, { dp = 2, prefix = '$', dur = 850 } = {}) {
    if (!node) return;
    // skip animation when reduced-motion or tiny change
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fmt = (v) => prefix + v.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });
    if (reduce || dur <= 0) { node.textContent = fmt(to); return; }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      node.textContent = fmt(to * e);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },

  /* SVG area sparkline. color: 'acc' | 'auto' (up/down) */
  sparkline(values, { w = 600, h = 128, pad = 4, id = 'sp', animate = true, color = 'acc' } = {}) {
    if (!values || values.length === 0) values = [0, 0];
    if (values.length === 1) values = [values[0], values[0]];
    const min = Math.min(...values), max = Math.max(...values);
    const range = max - min || 1;
    const n = values.length;
    const x = (i) => pad + (i / (n - 1)) * (w - pad * 2);
    const y = (v) => h - 8 - ((v - min) / range) * (h - 26);
    let line = '';
    values.forEach((v, i) => { line += (i === 0 ? 'M' : 'L') + x(i).toFixed(1) + ' ' + y(v).toFixed(1) + ' '; });
    const area = line + `L ${x(n - 1).toFixed(1)} ${h} L ${x(0).toFixed(1)} ${h} Z`;
    const up = values[n - 1] >= values[0];
    const stroke = color === 'auto' ? (up ? 'var(--up)' : 'var(--down)') : 'var(--acc)';
    const fillTop = color === 'auto' ? (up ? 'rgba(22,199,132,0.22)' : 'rgba(234,57,67,0.22)') : 'rgba(255,107,44,0.20)';
    const draw = animate ? `<style>#pl-${id}{stroke-dasharray:2200;stroke-dashoffset:2200;animation:dr-${id} 1.05s var(--out) forwards}@keyframes dr-${id}{to{stroke-dashoffset:0}}@keyframes fa-${id}{to{opacity:1}}</style>` : '';
    return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      <defs><linearGradient id="fg-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${fillTop}"/><stop offset="1" stop-color="transparent"/>
      </linearGradient></defs>${draw}
      <path d="${area}" fill="url(#fg-${id})" opacity="${animate ? 0 : 1}" ${animate ? `style="animation:fa-${id} .8s .35s var(--out) forwards"` : ''}/>
      <path id="pl-${id}" d="${line}" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  },

  /* ----- routing ----- */
  navigate(tab) {
    if (tab === this.tab) { this.render(); return; }
    if (this.tab === 'learn' && tab !== 'learn') {
      if (!confirmCourseLeave(this)) return;
      clearCourseDirty();
    }
    this.tab = tab; this.haptic(6);
    window.scrollTo({ top: 0 });
    this.render(); this.renderNav();
  },

  openDrills() {
    this._drillReturn = this.tab === 'drills' ? 'dashboard' : this.tab;
    this.tab = 'drills'; this.haptic(6);
    window.scrollTo({ top: 0 });
    this.render(); this.renderNav();
  },

  openReview() {
    this._reviewReturn = this.tab === 'review' ? 'dashboard' : this.tab;
    this.tab = 'review'; this.haptic(6);
    window.scrollTo({ top: 0 });
    this.render(); this.renderNav();
  },

  openCharts() {
    this._chartReturn = this.tab === 'charts' ? 'dashboard' : this.tab;
    this.tab = 'charts'; this.haptic(6);
    window.scrollTo({ top: 0 });
    this.render(); this.renderNav();
  },

  bumpStreak() { markHabitDay(); return touchStreakWithFreeze(); },

  render() {
    const c = root(); if (!c) return;
    ({ dashboard: renderDashboard, learn: renderCourse, journal: renderJournal, progress: renderProgress, drills: renderDrills, review: renderReview, charts: renderCharts }[this.tab])(this, c);
  },

  renderNav() {
    const nav = document.getElementById('tabbar');
    if (!nav) return;
    nav.classList.remove('hidden');
    const due = dueReviewCount() + mistakeCountDue();
    const tabs = [['dashboard', 'home', 'nav_dashboard'], ['learn', 'learn', 'nav_learn'], ['journal', 'journal', 'nav_journal'], ['progress', 'progress', 'nav_progress']];
    nav.innerHTML = `<div class="tabbar-inner">${tabs.map(([id, ic, key]) => `
      <button class="tab ${this.tab === id ? 'active' : ''}" data-tab="${id}">
        ${icon(ic, { size: 21 })}<span class="tab-label">${this.t(key)}${id === 'learn' && due > 0 ? ` <span class="mono" style="color:var(--acc)">${due}</span>` : ''}</span>
      </button>`).join('')}</div>`;
    nav.querySelectorAll('.tab').forEach((b) => b.addEventListener('click', () => this.navigate(b.dataset.tab)));
  },
};

/* ============================================================
   Onboarding — editorial, no emoji
   ============================================================ */
function renderOnboarding() {
  document.getElementById('tabbar').classList.add('hidden');
  let step = 0;
  const data = { name: '', experience: '', markets: [] };
  const steps = ['welcome', 'name', 'exp', 'markets'];

  const expOpts = [
    ['new', 'seed', 'exp_new', { en: 'Starting from zero', ur: 'Zero se shuru' }],
    ['some', 'spark', 'exp_some', { en: 'Traded a little, no system', ur: 'Thora kiya, koi system nahi' }],
    ['exp', 'target', 'exp_exp', { en: 'Trade regularly', ur: 'Regularly trade karta hoon' }],
  ];
  const mktOpts = [
    ['crypto', 'crypto', { en: 'Crypto & Perps', ur: 'Crypto & Perps' }],
    ['stocks', 'stocks', { en: 'Stocks & Options', ur: 'Stocks & Options' }],
    ['futures', 'futures', { en: 'Futures', ur: 'Futures' }],
    ['forex', 'forex', { en: 'Forex', ur: 'Forex' }],
    ['binary', 'binary', { en: 'Binary Options', ur: 'Binary Options' }],
  ];

  function draw() {
    const c = root();
    const key = steps[step];
    const last = step === steps.length - 1;
    let main = '';

    if (key === 'welcome') {
      main = `<div class="onb-main">
        <div class="onb-eyebrow">MasteryCap</div>
        <h1 class="onb-title">Learn every market.<br/>Trade with discipline.</h1>
        <p class="onb-sub">${App.t('onb_welcome_sub')}</p>
      </div>`;
    } else if (key === 'name') {
      main = `<div class="onb-main">
        <div class="onb-eyebrow">${App.lang === 'en' ? 'Identity' : 'Shanakht'}</div>
        <h1 class="onb-title">${App.t('onb_name_t')}</h1>
        <p class="onb-sub">${App.t('onb_name_sub')}</p>
        <div class="onb-field"><input class="onb-input" id="onbName" placeholder="Name" autocomplete="off" value="${data.name}" /></div>
      </div>`;
    } else if (key === 'exp') {
      main = `<div class="onb-main">
        <div class="onb-eyebrow">${App.lang === 'en' ? 'Level' : 'Level'}</div>
        <h1 class="onb-title">${App.t('onb_exp_t')}</h1>
        <div class="opt-list">${expOpts.map(([v, ic, lk, sub]) => `
          <button class="opt-card ${data.experience === v ? 'on' : ''}" data-exp="${v}">
            <span class="oc-icon">${icon(ic, { size: 20 })}</span>
            <span class="oc-body"><span class="oc-t">${App.t(lk)}</span><span class="oc-s">${sub[App.lang]}</span></span>
            <span class="oc-check">${icon('checkThin', { size: 13, sw: 2.4 })}</span>
          </button>`).join('')}</div>
      </div>`;
    } else if (key === 'markets') {
      main = `<div class="onb-main">
        <div class="onb-eyebrow">${App.lang === 'en' ? 'Markets' : 'Markets'}</div>
        <h1 class="onb-title">${App.t('onb_markets_t')}</h1>
        <p class="onb-sub">${App.t('onb_markets_sub')}</p>
        <div class="opt-list">${mktOpts.map(([v, ic, nm]) => `
          <button class="opt-card ${data.markets.includes(v) ? 'on' : ''}" data-mkt="${v}">
            <span class="oc-icon">${icon(ic, { size: 20 })}</span>
            <span class="oc-body"><span class="oc-t">${nm[App.lang]}</span></span>
            <span class="oc-check">${icon('checkThin', { size: 13, sw: 2.4 })}</span>
          </button>`).join('')}</div>
      </div>`;
    }

    const btnLabel = key === 'welcome' ? (App.lang === 'en' ? 'Begin' : 'Shuru karo') : last ? App.t('onb_get') : App.t('onb_next');
    c.innerHTML = `<div class="onb">
      <div class="onb-top">
        ${step > 0 ? `<button class="icon-btn" id="onbBack" style="width:34px;height:34px">${icon('back', { size: 17 })}</button>` : '<span style="width:34px"></span>'}
        <div class="onb-progress"><i style="width:${((step + 1) / steps.length) * 100}%"></i></div>
        <button class="pill" id="onbSkip" style="font-size:11px">${App.t('onb_skip')}</button>
      </div>
      ${main}
      <div class="onb-foot"><button class="btn accent" id="onbNext">${btnLabel}</button></div>
    </div>`;

    const nameInput = document.getElementById('onbName');
    if (nameInput) { nameInput.addEventListener('input', (e) => { data.name = e.target.value; }); setTimeout(() => nameInput.focus(), 60); }
    c.querySelectorAll('[data-exp]').forEach((b) => b.addEventListener('click', () => { data.experience = b.dataset.exp; App.haptic(); draw(); }));
    c.querySelectorAll('[data-mkt]').forEach((b) => b.addEventListener('click', () => {
      const m = b.dataset.mkt;
      data.markets.includes(m) ? data.markets.splice(data.markets.indexOf(m), 1) : data.markets.push(m);
      App.haptic(); draw();
    }));
    const back = document.getElementById('onbBack');
    if (back) back.addEventListener('click', () => { App.haptic(); step--; draw(); });
    document.getElementById('onbSkip')?.addEventListener('click', () => {
      data.name = data.name || 'Trader';
      data.experience = data.experience || 'new';
      if (!data.markets.length) data.markets = ['crypto'];
      finish();
    });
    document.getElementById('onbNext').addEventListener('click', () => {
      App.haptic();
      if (last) return finish();
      step++; draw();
    });
  }

  function finish() {
    App.profile = { name: (data.name || '').trim() || 'Trader', experience: data.experience || 'new', markets: data.markets.length ? data.markets : ['crypto'] };
    store.set(KEYS.profile, App.profile);
    store.set(KEYS.onboarded, true);
    App.tab = 'dashboard'; App.render(); App.renderNav();
    maybeTour();
  }

  draw();
}

/* ============================================================
   Boot
   ============================================================ */
function showUpdateToast(version) {
  if (document.getElementById('sw-toast')) return;
  const pill = document.createElement('div');
  pill.id = 'sw-toast';
  pill.className = 'sw-toast';
  const label = App.t('sw_updated').replace('{v}', version || 'v4');
  pill.innerHTML = `<span>${label}</span><button type="button" id="swReload">${App.t('sw_reload')}</button>`;
  document.body.appendChild(pill);
  requestAnimationFrame(() => pill.classList.add('on'));
  document.getElementById('swReload').addEventListener('click', () => location.reload());
}

function watchServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'SW_UPDATED') showUpdateToast(e.data.version);
  });
  navigator.serviceWorker.ready.then((reg) => {
    if (reg.waiting) showUpdateToast('v4');
    reg.addEventListener('updatefound', () => {
      const nw = reg.installing;
      if (!nw) return;
      nw.addEventListener('statechange', () => {
        if (nw.state === 'installed' && navigator.serviceWorker.controller) {
          /* activate posts SW_UPDATED; toast also covers waiting edge */
        }
      });
    });
  }).catch(() => {});
}

function boot() {
  store.hydrate().then(() => {
    const settings = store.get(KEYS.settings, {});
    App.lang = settings.lang || 'en';
    App.profile = store.get(KEYS.profile, null);
    const onboarded = store.get(KEYS.onboarded, false);
    applySettings(App);
    watchServiceWorker();
    watchOnline();
    maybeCorruptSheet();
    maybeWhatsNew();
    maybeMorningBrief();
    maybeNotifyReviews();
    maybeStreakRecovery();

    setTimeout(() => {
      const splash = document.getElementById('splash');
      if (splash) splash.classList.add('hide');
      setTimeout(() => splash && splash.remove(), 500);
      if (onboarded && App.profile) { App.render(); App.renderNav(); }
      else renderOnboarding();
    }, 1700);
  });
}

function maybeCorruptSheet() {
  const bad = store.listCorrupt();
  if (!bad.length) return;
  if (document.getElementById('corrupt-sheet')) return;
  const el = document.createElement('div');
  el.id = 'corrupt-sheet';
  el.className = 'sheet-root on';
  el.innerHTML = `<div class="sheet-backdrop" data-close></div>
    <div class="sheet" role="dialog">
      <div class="sheet-handle"></div>
      <div class="sheet-head"><div class="slabel">${App.t('corrupt_title')}</div>
        <button class="sheet-x" data-close aria-label="Close">${icon('x', { size: 18 })}</button></div>
      <div class="sheet-body">
        <p style="font-size:14px;color:var(--t2);line-height:1.55">${App.t('corrupt_body')}</p>
        <p class="mono" style="font-size:12px;color:var(--t3)">${bad.join(', ')}</p>
        <button class="btn secondary mt14" id="corruptKeep">${App.t('corrupt_keep')}</button>
        <button class="btn ghost mt10" id="corruptBackup">${App.t('backup_export')}</button>
      </div>
    </div>`;
  document.body.appendChild(el);
  const close = () => el.remove();
  el.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', close));
  document.getElementById('corruptKeep')?.addEventListener('click', () => {
    bad.forEach((k) => store.discardCorrupt(k));
    close();
  });
  document.getElementById('corruptBackup')?.addEventListener('click', () => {
    close();
    openSettings(App);
  });
}

function maybeWhatsNew() {
  const seen = store.get(KEYS.lastSeenVersion);
  if (seen === APP_VERSION) return;
  store.set(KEYS.lastSeenVersion, APP_VERSION);
  if (!seen) return; // first install — skip sheet
  const el = document.createElement('div');
  el.id = 'whatsnew-sheet';
  el.className = 'sheet-root on';
  el.innerHTML = `<div class="sheet-backdrop" data-close></div>
    <div class="sheet" role="dialog">
      <div class="sheet-handle"></div>
      <div class="sheet-head"><div class="slabel">${App.t('whats_new')} · ${APP_VERSION}</div>
        <button class="sheet-x" data-close>${icon('x', { size: 18 })}</button></div>
      <div class="sheet-body" style="font-size:14px;color:var(--t2);line-height:1.55">
        <p>P11–P15: exam + cert, binary gate, search, cooldown, insights v2, drills challenge/timed, tour, a11y.</p>
        <p style="color:var(--t3)">See CHANGELOG.md for full notes.</p>
      </div>
    </div>`;
  document.body.appendChild(el);
  el.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => el.remove()));
}

function maybeTour() {
  if (store.get(KEYS.tourDone)) return;
  let step = 0;
  const lines = [App.t('tour_1'), App.t('tour_2'), App.t('tour_3')];
  const el = document.createElement('div');
  el.id = 'tour-sheet';
  el.className = 'sheet-root on';
  const paint = () => {
    el.innerHTML = `<div class="sheet-backdrop"></div>
      <div class="sheet" role="dialog">
        <div class="sheet-handle"></div>
        <div class="sheet-body">
          <div class="slabel">0${step + 1} / 03</div>
          <p style="font-size:16px;color:var(--t1);line-height:1.5;margin:12px 0 18px">${lines[step]}</p>
          <button class="btn accent" id="tourNext">${step < 2 ? App.t('tour_next') : App.t('tour_done')}</button>
        </div>
      </div>`;
    document.getElementById('tourNext').addEventListener('click', () => {
      if (step < 2) { step++; paint(); }
      else { store.set(KEYS.tourDone, true); el.remove(); }
    });
  };
  document.body.appendChild(el);
  paint();
}

function maybeMorningBrief() {
  const today = new Date().toISOString().slice(0, 10);
  if (store.get(KEYS.morningBriefDay) === today) return;
  if (!store.get(KEYS.onboarded)) return;
  store.set(KEYS.morningPending, true);
}

function maybeStreakRecovery() {
  const s = getStreak();
  if (!s?.broken || s.recovered) return;
  const el = document.createElement('div');
  el.id = 'streak-recover';
  el.className = 'sheet-root on';
  el.innerHTML = `<div class="sheet-backdrop" data-close></div>
    <div class="sheet" role="dialog">
      <div class="sheet-handle"></div>
      <div class="sheet-body">
        <div class="slabel">${App.t('streak_broken')}</div>
        <p style="font-size:14px;color:var(--t2);line-height:1.5;margin:10px 0 16px">${App.t('streak_recover_body')}</p>
        <button class="btn accent" id="srDo">${App.t('streak_recover_cta')}</button>
        <button class="btn ghost mt10" data-close>${App.t('morning_dismiss')}</button>
      </div>
    </div>`;
  document.body.appendChild(el);
  el.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => {
    s.broken = false; store.set(KEYS.streak, s); el.remove();
  }));
  document.getElementById('srDo')?.addEventListener('click', () => {
    el.remove();
    App.openReview();
    // recovery granted after reviews via mark on review complete — soft grant now if user commits
    tryStreakRecovery();
  });
}

function maybeNotifyReviews() {
  if (!store.get(KEYS.notifyOptIn)) return;
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  import('./retention.js').then(({ dueReviewCount }) => {
    const n = dueReviewCount();
    if (n > 0) {
      try { new Notification('MasteryCap', { body: `${n} review(s) due`, silent: true }); } catch (e) {}
    }
  });
}

function watchOnline() {
  const paint = () => {
    let pill = document.getElementById('offline-pill');
    if (navigator.onLine) {
      pill?.remove();
      return;
    }
    if (!pill) {
      pill = document.createElement('div');
      pill.id = 'offline-pill';
      pill.className = 'pill';
      pill.style.cssText = 'position:fixed;top:calc(10px + var(--st));left:50%;transform:translateX(-50%);z-index:80;background:var(--surface-2);border:1px solid var(--line-2)';
      pill.textContent = 'Offline';
      document.body.appendChild(pill);
    }
  };
  window.addEventListener('online', paint);
  window.addEventListener('offline', paint);
  paint();
}

boot();
