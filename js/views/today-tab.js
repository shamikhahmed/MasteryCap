/* Today — P-MST-1 / MST-P1-01: name prompt · one primary session CTA · Foundations list row · standing hidden at 0% */

import { icon } from '../icons.js';
import { openSettings } from '../settings.js';
import { loadCourse } from '../data/institute/courses.js';
import { getCourse } from '../data/institute/catalog.js';
import {
  getInstitute, nextLesson, courseProgressPct, dueSrs, srsCapForProfile, setActiveCourse,
} from '../institute/progress.js';
import { getStudentId, getStudentPhoto } from '../institute/student-id.js';
import { renderStudentIdCard } from './student-id-view.js';
import { dueFlashCount } from '../study.js';
import { foundationsGateOpen } from '../gates.js';
import { getTrack } from '../data/tracks.js';
import { openSessionRunner, sessionStatus } from '../session.js';
import { store, KEYS } from '../store.js';
import { mistakeCountDue } from '../mistakes.js';
import { dueReviewCount } from '../retention.js';

export function renderToday(App, el) {
  const p = App.profile || {};
  const hasName = Boolean((p.name || '').trim()) && !p.nameSkipped;
  const name = (p.name || '').trim();
  const inst = getInstitute();
  const rawCode = inst.activeCourse || p.starterCourse || null;
  const meta = rawCode ? getCourse(rawCode) : null;
  const code = (rawCode === 'MKT-LEGACY' || meta?.status === 'session') ? rawCode : null;
  const course = code && code !== 'MKT-LEGACY' ? loadCourse(code) : null;
  const nxt = course ? nextLesson(course) : null;
  const pct = course ? courseProgressPct(course) : 0;
  const cap = srsCapForProfile(p);
  const due = dueSrs(cap).length;
  const flashDue = dueFlashCount();
  const en = App.lang === 'en';
  const card = getStudentId();
  const photo = getStudentPhoto();
  const fProg = App.getCourse('foundations');
  const fTrack = getTrack('foundations');
  const fDone = fTrack
    ? fTrack.weeks.filter((w) => ['completed', 'mastered'].includes(fProg.weekStatus?.[w.id])).length
    : 0;
  const fTotal = fTrack?.weeks?.length || 6;
  const fPct = Math.round((fDone / fTotal) * 100);
  const gateOpen = foundationsGateOpen(App);
  const showNamePrompt = !hasName && !p.nameSkipped;

  const nameBlock = showNamePrompt
    ? `<section class="hb-section" data-testid="name-prompt">
        <div class="inst-card accent-rule">
          <div class="kicker">${en ? 'Welcome' : 'Khush aamdeed'}</div>
          <h2 class="inst-h2">${en ? 'What should we call you?' : 'Hum aapko kya bulayein?'}</h2>
          <p class="inst-muted">${en ? 'Just for greetings. Stays on this device.' : 'Sirf greetings ke liye. Isi device pe.'}</p>
          <label class="sr-only" for="tdNameInput">${en ? 'Your name' : 'Aapka naam'}</label>
          <input id="tdNameInput" class="atelier-input mc-name-input" type="text" maxlength="32" autocomplete="nickname" placeholder="${en ? 'Your name' : 'Naam'}" />
          <div class="inst-row mt10" style="gap:8px">
            <button type="button" class="btn accent" id="tdNameSave" style="flex:1">${en ? 'Save' : 'Save'}</button>
            <button type="button" class="btn ghost" id="tdNameSkip" style="flex:1">${en ? 'Skip' : 'Skip'}</button>
          </div>
        </div>
      </section>`
    : '';

  const marketsPath = code === 'MKT-LEGACY' || p.primaryBranch === 'markets' || p.starterSchool === 'markets';
  let continueBlock = '';
  if (marketsPath) {
    continueBlock = `<section class="hb-section" data-testid="campus-dashboard">
      <div class="hb-label">${en ? 'Continue' : 'Jari'}</div>
      <button type="button" class="list-row" id="tdMarkets" data-testid="recommended-course">
        <span class="grow">
          <span class="list-row__title">${en ? 'Open Foundations' : 'Foundations kholo'}</span>
          <span class="list-row__sub">${gateOpen
            ? (en ? 'Gate open — specialties unlocked.' : 'Gate open — specialties unlocked.')
            : (en ? `${fDone}/${fTotal} weeks · unlock specialties` : `${fDone}/${fTotal} weeks`)}</span>
        </span>
        <span class="mono">${fPct}%</span>
      </button>
    </section>`;
  } else if (nxt && course) {
    continueBlock = `<section class="hb-section">
      <div class="hb-label">${en ? 'Continue' : 'Jari'}</div>
      <button type="button" class="list-row" id="tdContinue" data-testid="recommended-course">
        <span class="grow">
          <span class="list-row__title">${esc(nxt.title[App.lang] || nxt.title.en)}</span>
          <span class="list-row__sub">${esc(meta?.code || '')} · ${pct}%</span>
        </span>
      </button>
    </section>`;
  } else if (course && !nxt) {
    continueBlock = `<section class="hb-section">
      <div class="hb-label">${en ? 'Continue' : 'Jari'}</div>
      <button type="button" class="list-row" id="tdFinal">
        <span class="grow">
          <span class="list-row__title">${en ? 'Final assessment' : 'Final imtihaan'}</span>
          <span class="list-row__sub">${esc(meta?.code || '')}</span>
        </span>
      </button>
    </section>`;
  } else {
    continueBlock = `<section class="hb-section">
      <div class="hb-label">${en ? 'Continue' : 'Jari'}</div>
      <button type="button" class="list-row" id="tdCampus" data-testid="recommended-course">
        <span class="grow">
          <span class="list-row__title">${en ? 'Explore Campus' : 'Campus dekho'}</span>
          <span class="list-row__sub">${en ? 'Software, Markets, or Money' : 'Software, Markets, ya Money'}</span>
        </span>
      </button>
    </section>`;
  }

  const idStrip = !hasName
    ? ''
    : card
      ? `<button type="button" class="mini-id-btn" id="tdViewId" data-testid="mini-id">${renderStudentIdCard(card, { lang: App.lang, photoUrl: photo, compact: true })}</button>`
      : `<button type="button" class="inst-card" id="tdFinishAdmit" style="width:100%;text-align:left">
          <div class="kicker">${en ? 'Student ID' : 'Student ID'}</div>
          <p class="inst-muted">${en ? 'Complete admission to create your Student ID' : 'Admission mukammal karo'}</p>
        </button>`;

  const showStanding = (marketsPath && fPct > 0) || (code && code !== 'MKT-LEGACY' && pct > 0);
  const standing = showStanding
    ? `<section class="hb-section">
    <div class="hb-label">${en ? 'Your standing' : 'Standing'}</div>
    <div class="inst-list">
      ${marketsPath
        ? `<div class="list-row static">
            <span class="grow">${en ? 'Markets Foundations' : 'Markets Foundations'}</span>
            <span class="mono">${fPct}%</span>
          </div>`
        : ''}
      ${code && code !== 'MKT-LEGACY' ? `<div class="list-row static">
            <span class="grow">${esc(meta?.title?.[App.lang] || meta?.title?.en || code)}</span>
            <span class="mono">${pct}%</span>
          </div>` : ''}
    </div>
  </section>`
    : '';

  const sessionMins = store.get(KEYS.settings, {}).sessionMins || 15;
  const sess = sessionStatus();
  const sessCta = sess.active
    ? `${App.t('session_resume')} · ${sess.step}/${sess.total}`
    : sess.doneToday
      ? (en ? `Session done · ${sessionMins} min` : `Session mukammal · ${sessionMins} min`)
      : (en
        ? `Start today's session · ${sessionMins} min`
        : `Aaj ki session shuru · ${sessionMins} min`);
  const missDue = mistakeCountDue();
  const quizDue = dueReviewCount();
  const sessionBlock = `<section class="hb-section">
      <div class="hb-label">${App.t('session_title')}</div>
      <div class="inst-card accent-rule">
        <p class="inst-muted">${en
          ? 'Markets daily plan — lesson, flashcards, quiz, sim when unlocked.'
          : 'Markets daily plan — lesson, cards, quiz, sim.'}</p>
        <button class="btn accent mt10" id="tdSession" style="width:100%" data-testid="today-primary-cta">${icon('learn', { size: 17 })} ${sessCta}</button>
      </div>
    </section>`;

  const title = hasName
    ? (en ? `Hello, ${esc(name)}` : `Salam, ${esc(name)}`)
    : (en ? 'Today' : 'Aaj');

  el.innerHTML = `<div class="screen inst-screen homeboard" data-testid="campus-dashboard">
    <div class="lt-head head-row">
      <div>
        <div class="kicker">${en ? 'Today' : 'Aaj'}</div>
        <h1>${title}</h1>
      </div>
      <button class="icon-btn" id="tdSettings" aria-label="${App.t('settings')}">${icon('settings', { size: 18 })}</button>
    </div>
    ${nameBlock}
    ${sessionBlock}
    ${continueBlock}
    ${standing}
    ${hasName ? `<section class="hb-section">
      <div class="hb-label">${en ? 'Student ID' : 'Student ID'}</div>
      ${idStrip}
    </section>` : ''}
    <section class="hb-section">
      <div class="hb-label">${en ? 'Study due' : 'Ab due'}</div>
      <div class="inst-row">
        <button class="inst-stat" id="tdReview">
          <span class="mono">${due + quizDue + missDue}</span>
          <span>${en ? 'Reviews' : 'Reviews'}</span>
        </button>
        <button class="inst-stat" id="tdStudy">
          <span class="mono">${flashDue}</span>
          <span>${en ? 'Flashcards' : 'Cards'}</span>
        </button>
      </div>
    </section>
    <p class="inst-foot-note">${en
      ? 'MasteryCap is educational. Nothing here is financial advice. Certificates are self-issued and not accredited.'
      : 'MasteryCap educational hai. Financial advice nahi. Certificates self-issued hain — accredited nahi.'}</p>
  </div>`;

  document.getElementById('tdSettings')?.addEventListener('click', () => openSettings(App));
  document.getElementById('tdCampus')?.addEventListener('click', () => App.navigate('campus'));
  document.getElementById('tdSession')?.addEventListener('click', () => openSessionRunner(App));
  document.getElementById('tdReview')?.addEventListener('click', () => {
    if (quizDue + missDue > 0) App.openReview();
    else App.navigate('practice');
  });
  document.getElementById('tdStudy')?.addEventListener('click', () => App.openStudy());
  document.getElementById('tdViewId')?.addEventListener('click', () => {
    App._recordsPane = 'profile';
    App._showStudentId = true;
    App.navigate('records');
  });
  document.getElementById('tdFinishAdmit')?.addEventListener('click', () => {
    App._recordsPane = 'profile';
    App.navigate('records');
  });
  document.getElementById('tdMarkets')?.addEventListener('click', () => {
    App._campusView = { level: 'school', schoolId: 'markets' };
    App.navigate('campus');
  });
  document.getElementById('tdContinue')?.addEventListener('click', () => {
    setActiveCourse(code);
    App.openLesson(code, nxt.id);
  });
  document.getElementById('tdFinal')?.addEventListener('click', () => {
    App.openFinal(code);
  });

  document.getElementById('tdNameSave')?.addEventListener('click', () => {
    const n = (document.getElementById('tdNameInput')?.value || '').trim();
    if (!n) {
      App.toast?.(en ? 'Enter a name, or Skip.' : 'Naam likho, ya Skip.');
      return;
    }
    App.profile = { ...(App.profile || {}), name: n, nameSkipped: false };
    store.set(KEYS.profile, App.profile);
    App.render();
  });
  document.getElementById('tdNameSkip')?.addEventListener('click', () => {
    App.profile = { ...(App.profile || {}), nameSkipped: true };
    store.set(KEYS.profile, App.profile);
    App.render();
  });
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
