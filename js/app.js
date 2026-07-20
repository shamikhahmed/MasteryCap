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
import { renderSim, stopSimPlayback } from './views/sim.js';
import { renderStudy } from './views/study.js';
import { renderToday } from './views/today-tab.js';
import { renderCampus } from './views/campus.js';
import { renderPracticeTab } from './views/practice-tab.js';
import { renderRecords } from './views/records.js';
import { renderLesson, renderFinal } from './views/lesson.js';
import { renderHttpLab } from './views/http-lab.js';
import { isOn } from './institute/features.js';
import {
  recommendPath, AGE_OPTS, LANG_OPTS, BUILD_OPTS, GOAL_OPTS, TIME_OPTS,
} from './institute/placement.js';
import { enrollCourse } from './institute/progress.js';
import { touchStreak, touchStreakWithFreeze, markHabitDay, dueReviewCount, tryStreakRecovery, getStreak } from './retention.js';
import { applySettings, openSettings, APP_VERSION } from './settings.js';
import { mistakeCountDue } from './mistakes.js';
import { applyTheme } from './theme.js';
import { pauseTime, touchTime } from './time.js';
import { seedFoundationsSoftStart, preferredStartTrack } from './gates.js';
import { canOpenTradingLab } from './gates.js';
import { syncSessionBar } from './session.js';

const root = () => document.getElementById('app-root');

export const App = {
  lang: 'en',
  tab: 'today',
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

  toast(msg) {
    if (!msg) return;
    document.getElementById('mc-toast')?.remove();
    const el = document.createElement('div');
    el.id = 'mc-toast';
    el.setAttribute('role', 'status');
    el.style.cssText = 'position:fixed;left:50%;bottom:calc(72px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:120;max-width:min(92vw,420px);padding:12px 16px;background:var(--surface-3);color:var(--t0);border:1px solid var(--line-2);border-radius:10px;font-size:13.5px;line-height:1.4;box-shadow:0 8px 24px rgba(0,0,0,.25)';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2800);
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
    if (tab === 'dashboard') tab = 'today';
    if (tab === this.tab) { this.render(); return; }
    if (this.tab === 'learn' && tab !== 'learn') {
      if (!confirmCourseLeave(this)) return;
      clearCourseDirty();
    }
    if (this.tab === 'sim' && tab !== 'sim') stopSimPlayback();
    if (tab === 'today' || tab === 'campus' || tab === 'practice' || tab === 'records') {
      this._lesson = null;
      this._finalCode = null;
    }
    this.tab = tab; this.haptic(6);
    window.scrollTo({ top: 0 });
    this.render(); this.renderNav();
  },

  openLesson(courseCode, lessonId) {
    this._lesson = { courseCode, lessonId };
    this._lessonStep = 0;
    this._checkAnswers = null;
    this._checkGraded = false;
    this._checkOk = false;
    this.tab = 'lesson';
    this.haptic(6);
    window.scrollTo({ top: 0 });
    this.render(); this.renderNav();
  },

  openFinal(courseCode) {
    this._finalCode = courseCode;
    this._finalAnswers = [];
    this._finalOrder = null;
    this._finalResult = null;
    this.tab = 'final';
    this.haptic(6);
    window.scrollTo({ top: 0 });
    this.render(); this.renderNav();
  },

  openDrills() {
    this._drillReturn = this.tab === 'drills' ? 'today' : this.tab;
    this.tab = 'drills'; this.haptic(6);
    window.scrollTo({ top: 0 });
    this.render(); this.renderNav();
  },

  openReview() {
    this._reviewReturn = this.tab === 'review' ? 'practice' : this.tab;
    this.tab = 'review'; this.haptic(6);
    window.scrollTo({ top: 0 });
    this.render(); this.renderNav();
  },

  openCharts() {
    this._chartReturn = this.tab === 'charts' ? 'today' : this.tab;
    this.tab = 'charts'; this.haptic(6);
    window.scrollTo({ top: 0 });
    this.render(); this.renderNav();
  },

  openSim() {
    if (!canOpenTradingLab(this)) {
      this.openDrills();
      return;
    }
    this._simReturn = this.tab === 'sim' ? 'practice' : this.tab;
    this.tab = 'sim'; this.haptic(6);
    window.scrollTo({ top: 0 });
    this.render(); this.renderNav();
  },

  openStudy() {
    this._studyReturn = this.tab === 'study' ? 'practice' : this.tab;
    this.tab = 'study'; this.haptic(6);
    window.scrollTo({ top: 0 });
    this.render(); this.renderNav();
  },

  closeSim() {
    stopSimPlayback();
    this.tab = this._simReturn || 'practice';
    this.render(); this.renderNav();
  },

  bumpStreak() { markHabitDay(); return touchStreakWithFreeze(); },

  render() {
    const c = root(); if (!c) return;
    if (this.tab !== 'sim') stopSimPlayback();
    const map = {
      today: renderToday,
      campus: renderCampus,
      practice: renderPracticeTab,
      records: renderRecords,
      lesson: renderLesson,
      final: renderFinal,
      'http-lab': (App, el) => {
        if (!isOn('httpLab')) {
          App.tab = 'practice';
          renderPracticeTab(App, el);
          return;
        }
        renderHttpLab(App, el);
      },
      dashboard: renderDashboard,
      learn: renderCourse,
      journal: renderJournal,
      progress: renderProgress,
      drills: renderDrills,
      review: renderReview,
      charts: renderCharts,
      sim: renderSim,
      study: renderStudy,
    };
    (map[this.tab] || renderToday)(this, c);
    syncSessionBar(this);
  },

  renderNav() {
    const nav = document.getElementById('tabbar');
    if (!nav) return;
    const hide = this.tab === 'lesson' || this.tab === 'final' || this.tab === 'sim' || this.tab === 'http-lab';
    if (hide) { nav.classList.add('hidden'); return; }
    nav.classList.remove('hidden');
    const due = dueReviewCount() + mistakeCountDue();
    const tabs = [
      ['today', 'home', 'Today'],
      ['campus', 'book', 'Campus'],
      ['practice', 'target', 'Practice'],
      ['records', 'journal', 'Records'],
    ];
    const main = new Set(['today', 'campus', 'practice', 'records']);
    const active = main.has(this.tab) ? this.tab
      : (this.tab === 'learn' || this.tab === 'drills' || this.tab === 'review' || this.tab === 'study' || this.tab === 'sim' || this.tab === 'charts')
        ? (this.tab === 'learn' ? 'campus' : 'practice')
        : (this.tab === 'journal' || this.tab === 'progress' ? 'records' : 'today');
    nav.innerHTML = `<div class="tabbar-inner">${tabs.map(([id, ic, label]) => `
      <button class="tab ${active === id ? 'active' : ''}" data-tab="${id}">
        ${icon(ic, { size: 21 })}<span class="tab-label">${label}${id === 'practice' && due > 0 ? ` <span class="mono" style="color:var(--acc)">${due}</span>` : ''}</span>
      </button>`).join('')}</div>`;
    nav.querySelectorAll('.tab').forEach((b) => b.addEventListener('click', () => this.navigate(b.dataset.tab)));
  },
};

/* ============================================================
   Onboarding — institute placement (5 questions + plan letter)
   ============================================================ */
function renderOnboarding() {
  document.getElementById('tabbar').classList.add('hidden');
  let step = 0;
  const data = {
    name: '',
    ageBand: '',
    language: 'en',
    buildExp: '',
    goal: '',
    timeBand: '',
  };
  // welcome, notthis, name, age, lang, build, goal, time, plan
  const steps = ['welcome', 'notthis', 'name', 'age', 'lang', 'build', 'goal', 'time', 'plan'];
  let plan = null;

  function draw() {
    const c = root();
    const key = steps[step];
    const en = App.lang === 'en';
    let main = '';

    if (key === 'welcome') {
      main = `<div class="onb-main">
        <div class="onb-eyebrow">MasteryCap</div>
        <h1 class="onb-title">${en ? 'An institute in your pocket' : 'Pocket mein institute'}</h1>
        <p class="onb-sub">${en
          ? 'Complete courses in software, markets, and money — English and Roman Urdu, fully offline. No accounts. No promises we cannot keep.'
          : 'Software, markets, money — English aur Roman Urdu, fully offline. No accounts. Jo promise na kar saken woh nahi.'}</p>
      </div>`;
    } else if (key === 'notthis') {
      main = `<div class="onb-main">
        <div class="onb-eyebrow">${en ? 'Honesty' : 'Imandari'}</div>
        <h1 class="onb-title">${en ? 'What this is not' : 'Ye kya nahi hai'}</h1>
        <ul class="inst-ul onb-ul">
          <li>${en ? 'Not an accredited university or professional license.' : 'Accredited university ya professional license nahi.'}</li>
          <li>${en ? 'Not financial advice or an income promise.' : 'Financial advice ya income promise nahi.'}</li>
          <li>${en ? 'Certificates are self-issued on your device — proof of completed work, honestly.' : 'Certificates device pe self-issued — mukammal kaam ka imandar record.'}</li>
        </ul>
      </div>`;
    } else if (key === 'name') {
      main = `<div class="onb-main">
        <div class="onb-eyebrow">${en ? 'Identity' : 'Shanakht'}</div>
        <h1 class="onb-title">${en ? 'What should we call you?' : 'Naam kya likhen?'}</h1>
        <div class="onb-field"><input class="onb-input" id="onbName" placeholder="Name" autocomplete="off" value="${data.name}" /></div>
      </div>`;
    } else if (key === 'age') {
      main = optScreen(en ? 'Age range sets how we explain things — never what you can learn.' : 'Age se explanation change — seekhne ki had nahi.',
        en ? 'Your age range' : 'Age range', AGE_OPTS, 'ageBand', data.ageBand);
    } else if (key === 'lang') {
      main = optScreen(en ? 'Language for lessons' : 'Lessons ki language',
        en ? 'Preferred language' : 'Language', LANG_OPTS, 'language', data.language);
    } else if (key === 'build') {
      main = optScreen(en ? 'Honest placement — no ego trap.' : 'Imandar placement.',
        en ? 'Have you built software before?' : 'Pehle software banaya?', BUILD_OPTS, 'buildExp', data.buildExp);
    } else if (key === 'goal') {
      main = optScreen(en ? 'Your recommended school follows this.' : 'Is se school recommend hoga.',
        en ? 'What do you want to master first?' : 'Pehle kya master?', GOAL_OPTS, 'goal', data.goal);
    } else if (key === 'time') {
      main = optScreen(en ? 'Sets review card caps and week estimates.' : 'Review cap aur weeks.',
        en ? 'Time you can invest' : 'Kitna time', TIME_OPTS, 'timeBand', data.timeBand);
    } else if (key === 'plan') {
      plan = recommendPath(data);
      const nm = (data.name || 'Learner').trim() || 'Learner';
      main = `<div class="onb-main">
        <div class="onb-eyebrow">${en ? 'Placement' : 'Placement'}</div>
        <h1 class="onb-title">${en ? `Welcome, ${nm}` : `Khush amdeed, ${nm}`}</h1>
        <div class="inst-card accent-rule">
          <div class="kicker">${en ? 'START HERE' : 'YAHAN SE'}</div>
          <p class="inst-muted">${en ? 'Path' : 'Path'}</p>
          <div class="inst-h3">${plan.pathName[en ? 'en' : 'ur']}</div>
          <p class="inst-muted mt10">${en ? 'First lesson' : 'Pehli lesson'}</p>
          <div>${plan.firstLesson[en ? 'en' : 'ur']}</div>
          ${plan.weeks ? `<p class="mono mt10">~${plan.weeks} ${en ? 'weeks at your pace' : 'hafte aapki pace pe'}</p>` : ''}
        </div>
      </div>`;
    }

    function optScreen(sub, title, opts, field, val) {
      return `<div class="onb-main">
        <div class="onb-eyebrow">${en ? 'Placement' : 'Placement'}</div>
        <h1 class="onb-title">${title}</h1>
        <p class="onb-sub">${sub}</p>
        <div class="opt-list">${opts.map(([v, lab]) => `
          <button class="opt-card ${val === v ? 'on' : ''}" data-field="${field}" data-val="${v}">
            <span class="oc-body"><span class="oc-t">${lab[en ? 'en' : 'ur']}</span></span>
            <span class="oc-check">${icon('checkThin', { size: 13, sw: 2.4 })}</span>
          </button>`).join('')}</div>
      </div>`;
    }

    const last = key === 'plan';
    const btnLabel = key === 'welcome' ? (en ? 'Begin' : 'Shuru')
      : last ? (en ? 'Enter campus' : 'Campus mein')
        : (en ? 'Continue' : 'Aage');

    c.innerHTML = `<div class="onb">
      <div class="onb-top">
        ${step > 0 ? `<button class="icon-btn" id="onbBack" style="width:34px;height:34px">${icon('back', { size: 17 })}</button>` : '<span style="width:34px"></span>'}
        <div class="onb-progress"><i style="width:${((step + 1) / steps.length) * 100}%"></i></div>
        <button class="pill" id="onbSkip" style="font-size:11px">${en ? 'Skip' : 'Skip'}</button>
      </div>
      ${main}
      <div class="onb-foot"><button class="btn accent" id="onbNext">${btnLabel}</button></div>
    </div>`;

    const nameInput = document.getElementById('onbName');
    if (nameInput) {
      nameInput.addEventListener('input', (e) => { data.name = e.target.value; });
      setTimeout(() => nameInput.focus(), 60);
    }
    c.querySelectorAll('[data-field]').forEach((b) => b.addEventListener('click', () => {
      data[b.dataset.field] = b.dataset.val;
      if (b.dataset.field === 'language' && b.dataset.val !== 'both') {
        App.lang = b.dataset.val;
      }
      App.haptic();
      draw();
    }));
    document.getElementById('onbBack')?.addEventListener('click', () => { App.haptic(); step--; draw(); });
    document.getElementById('onbSkip')?.addEventListener('click', () => {
      data.name = data.name || 'Learner';
      data.ageBand = data.ageBand || '18-24';
      data.language = data.language || 'en';
      data.buildExp = data.buildExp || 'never';
      data.goal = data.goal || 'apps';
      data.timeBand = data.timeBand || '2-5';
      finish();
    });
    document.getElementById('onbNext')?.addEventListener('click', () => {
      App.haptic();
      if (key === 'age' && !data.ageBand) return;
      if (key === 'build' && !data.buildExp) return;
      if (key === 'goal' && !data.goal) return;
      if (key === 'time' && !data.timeBand) return;
      if (last) return finish();
      step++;
      draw();
    });
  }

  function finish() {
    plan = recommendPath(data);
    const lang = data.language === 'ur' ? 'ur' : 'en';
    App.lang = lang;
    const settings = store.get(KEYS.settings, {});
    settings.lang = lang;
    store.set(KEYS.settings, settings);

    App.profile = {
      name: (data.name || '').trim() || 'Learner',
      ageBand: data.ageBand || '18-24',
      language: data.language || 'en',
      buildExp: data.buildExp || 'never',
      goal: data.goal || 'apps',
      timeBand: data.timeBand || '2-5',
      starterCourse: plan.course,
      starterSchool: plan.school,
      register: plan.register,
      campus: true,
      // legacy fields for markets modules
      experience: data.goal === 'markets'
        ? (data.buildExp === 'shipped' ? 'exp' : data.buildExp === 'dabbled' ? 'some' : 'new')
        : 'new',
      markets: data.goal === 'markets' ? ['foundations'] : ['foundations'],
    };
    store.set(KEYS.profile, App.profile);
    store.set(KEYS.onboarded, true);
    if (plan.course && plan.course !== 'MKT-LEGACY') enrollCourse(plan.course, plan.school);
    if (plan.school === 'markets') enrollCourse('MKT-LEGACY', 'markets');
    seedFoundationsSoftStart(App.profile.experience);
    App.tab = 'today';
    App.render();
    App.renderNav();
    setTimeout(() => { maybeFirstBackup(); }, 300);
  }

  draw();
}

/* ============================================================
   Boot
   ============================================================ */
function showUpdateToast() {}

function maybeFirstBackup() {
  if (store.get(KEYS.firstBackupDone) || !store.get(KEYS.onboarded)) return;
  if (document.getElementById('first-backup-sheet')) return;
  const el = document.createElement('div');
  el.id = 'first-backup-sheet';
  el.className = 'sheet-root on';
  el.innerHTML = `<div class="sheet-backdrop" data-close></div>
    <div class="sheet" role="dialog">
      <div class="sheet-handle"></div>
      <div class="sheet-head"><div class="slabel">${App.t('backup_first_title')}</div>
        <button class="sheet-x" data-close>${icon('x', { size: 18 })}</button></div>
      <div class="sheet-body">
        <p style="font-size:14px;color:var(--t2);line-height:1.55;margin:0 0 16px">${App.t('backup_first_body')}</p>
        <button class="btn accent" id="firstBackupExport" style="width:100%">${App.t('backup_export')}</button>
        <button class="btn ghost mt10" data-close style="width:100%">${App.t('backup_first_later')}</button>
      </div>
    </div>`;
  document.body.appendChild(el);
  const close = () => { store.set(KEYS.firstBackupDone, true); el.remove(); };
  el.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', close));
  document.getElementById('firstBackupExport')?.addEventListener('click', () => {
    import('./settings.js').then(({ openSettings }) => {
      close();
      openSettings(App);
      setTimeout(() => document.getElementById('setExport')?.click(), 200);
    });
  });
}

function watchServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'SW_UPDATED') showUpdateToast(e.data.version);
  });
  const check = () => {
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg) return;
      reg.update().catch(() => {});
      if (reg.waiting) showUpdateToast(APP_VERSION);
    }).catch(() => {});
  };
  navigator.serviceWorker.ready.then((reg) => {
    if (reg.waiting) showUpdateToast(APP_VERSION);
    reg.addEventListener('updatefound', () => {
      const nw = reg.installing;
      if (!nw) return;
      nw.addEventListener('statechange', () => {
        if (nw.state === 'installed' && navigator.serviceWorker.controller) {
          showUpdateToast(APP_VERSION);
        }
      });
    });
  }).catch(() => {});
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') check();
  });
  window.addEventListener('focus', check);
}

function boot() {
  store.hydrate().then(() => {
    const settings = store.get(KEYS.settings, {});
    App.lang = settings.lang || 'en';
    App.profile = store.get(KEYS.profile, null);
    const onboarded = store.get(KEYS.onboarded, false);
    applySettings(App);
    applyTheme();
    watchServiceWorker();
    watchOnline();
    document.addEventListener('pointerdown', () => touchTime(), { passive: true });
    // Sheet queue: corrupt → whatsnew → streak → (tour after onboard)
    maybeCorruptSheet();
    maybeWhatsNew();
    maybeMorningBrief();
    maybeNotifyReviews();
    setTimeout(() => maybeStreakRecovery(), 400);

    setTimeout(() => {
      const splash = document.getElementById('splash');
      if (splash) splash.classList.add('hide');
      setTimeout(() => splash && splash.remove(), 500);
      if (onboarded && App.profile?.campus) { App.tab = 'today'; App.render(); App.renderNav(); }
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
  // Silent version stamp — no Welcome Update / changelog sheet on boot
  const seen = store.get(KEYS.lastSeenVersion);
  if (seen !== APP_VERSION) store.set(KEYS.lastSeenVersion, APP_VERSION);
}

function maybeTour() {
  if (store.get(KEYS.tourDone)) return;
  let step = 0;
  const lines = [App.t('tour_1'), App.t('tour_2'), App.t('tour_3')];
  const el = document.createElement('div');
  el.id = 'tour-sheet';
  el.className = 'sheet-root on';
  const paint = () => {
    el.innerHTML = `<div class="sheet-backdrop" data-skip></div>
      <div class="sheet" role="dialog">
        <div class="sheet-handle"></div>
        <div class="sheet-body">
          <div class="slabel">0${step + 1} / 03</div>
          <p style="font-size:16px;color:var(--t1);line-height:1.5;margin:12px 0 18px">${lines[step]}</p>
          <button class="btn accent" id="tourNext">${step < 2 ? App.t('tour_next') : App.t('tour_done')}</button>
          <button class="btn ghost mt10" id="tourSkip">${App.t('onb_skip')}</button>
        </div>
      </div>`;
    const done = () => { store.set(KEYS.tourDone, true); el.remove(); };
    document.getElementById('tourNext').addEventListener('click', () => {
      if (step < 2) { step++; paint(); }
      else done();
    });
    document.getElementById('tourSkip')?.addEventListener('click', done);
    el.querySelector('[data-skip]')?.addEventListener('click', done);
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
