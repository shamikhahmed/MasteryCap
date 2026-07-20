/* Today — school homeboard: Continue · Session · Standing · mini ID · Study due */

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
  const name = p.name || 'Learner';
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

  let continueBlock = '';
  if (code === 'MKT-LEGACY' || p.primaryBranch === 'markets' || p.starterSchool === 'markets') {
    continueBlock = `<section class="hb-section" data-testid="campus-dashboard">
      <div class="hb-label">${en ? 'Continue' : 'Continue'}</div>
      <div class="inst-card accent-rule hb-continue">
        <div class="kicker">${en ? 'Markets · Foundations' : 'Markets · Foundations'}</div>
        <h2 class="inst-h2">${en ? 'Market literacy path' : 'Market literacy path'}</h2>
        <p class="inst-muted">${gateOpen
          ? (en ? 'Foundations gate open — Crypto, Stocks, and Forex unlocked.' : 'Foundations gate open — specialties unlocked.')
          : (en ? `${fDone}/${fTotal} weeks · complete Foundations or pass the exam to unlock specialties.` : `${fDone}/${fTotal} weeks · specialties lock.`)}</p>
        <div class="prog-line mt10">
          <span class="prog-num">${fDone}/${fTotal}</span>
          <div class="prog-track"><i style="width:${fPct}%"></i></div>
          <span class="prog-num">${fPct}%</span>
        </div>
        <button class="btn accent mt14" id="tdMarkets" data-testid="recommended-course">${en ? 'Open Foundations' : 'Foundations kholo'}</button>
      </div>
    </section>`;
  } else if (nxt && course) {
    continueBlock = `<section class="hb-section">
      <div class="hb-label">${en ? 'Continue' : 'Continue'}</div>
      <div class="inst-card accent-rule hb-continue">
        <div class="kicker">${meta?.code || ''} · ${pct}%</div>
        <h2 class="inst-h2">${nxt.title[App.lang] || nxt.title.en}</h2>
        <p class="inst-muted">${nxt.objective[App.lang] || nxt.objective.en}</p>
        <button class="btn accent mt14" id="tdContinue" data-testid="recommended-course">${en ? 'Continue lesson' : 'Lesson jari'}</button>
      </div>
    </section>`;
  } else if (course && !nxt) {
    continueBlock = `<section class="hb-section">
      <div class="hb-label">${en ? 'Continue' : 'Continue'}</div>
      <div class="inst-card accent-rule">
        <div class="kicker">${meta?.code || ''}</div>
        <h2 class="inst-h2">${en ? 'Lessons complete' : 'Lessons mukammal'}</h2>
        <p class="inst-muted">${en ? 'Take the final assessment when ready.' : 'Final assessment lo jab ready ho.'}</p>
        <button class="btn accent mt14" id="tdFinal">${en ? 'Final assessment' : 'Final assessment'}</button>
      </div>
    </section>`;
  } else {
    continueBlock = `<section class="hb-section">
      <div class="hb-label">${en ? 'Continue' : 'Continue'}</div>
      <div class="inst-card accent-rule">
        <div class="kicker">${en ? 'Campus' : 'Campus'}</div>
        <h2 class="inst-h2">${en ? 'Pick a branch' : 'Branch chuno'}</h2>
        <p class="inst-muted">${en ? 'Software Craft, Markets, or Money — enroll in an Open course.' : 'Software, Markets, ya Money.'}</p>
        <button class="btn accent mt14" id="tdCampus" data-testid="recommended-course">${en ? 'Explore Campus' : 'Campus dekho'}</button>
      </div>
    </section>`;
  }

  const idStrip = card
    ? `<button type="button" class="mini-id-btn" id="tdViewId" data-testid="mini-id">${renderStudentIdCard(card, { lang: App.lang, photoUrl: photo, compact: true })}</button>`
    : `<button type="button" class="inst-card" id="tdFinishAdmit" style="width:100%;text-align:left">
        <div class="kicker">${en ? 'Student ID' : 'Student ID'}</div>
        <p class="inst-muted">${en ? 'Complete admission to create your Student ID' : 'Admission mukammal karo'}</p>
      </button>`;

  const standing = `<section class="hb-section">
    <div class="hb-label">${en ? 'Your standing' : 'Standing'}</div>
    <div class="inst-list">
      ${p.primaryBranch === 'markets' || p.starterSchool === 'markets' || code === 'MKT-LEGACY'
        ? `<div class="list-row static">
            <span class="grow">${en ? 'Markets Foundations' : 'Markets Foundations'}</span>
            <span class="mono">${fPct}%</span>
          </div>`
        : ''}
      ${code && code !== 'MKT-LEGACY' ? `<div class="list-row static">
            <span class="grow">${meta?.title?.[App.lang] || meta?.title?.en || code}</span>
            <span class="mono">${pct}%</span>
          </div>` : ''}
      ${!(p.primaryBranch === 'markets' || code) ? `<p class="inst-muted">${en ? 'Enroll on Campus to build standing.' : 'Campus pe enroll.'}</p>` : ''}
    </div>
  </section>`;

  const sessionMins = store.get(KEYS.settings, {}).sessionMins || 15;
  const sess = sessionStatus();
  const sessCta = sess.active
    ? `${App.t('session_resume')} · ${sess.step}/${sess.total}`
    : sess.doneToday
      ? (en ? `Session done · ${sessionMins} min` : `Session mukammal · ${sessionMins} min`)
      : `${App.t('session_start')} · ${sessionMins} min`;
  const missDue = mistakeCountDue();
  const quizDue = dueReviewCount();
  const sessionBlock = `<section class="hb-section">
      <div class="hb-label">${App.t('session_title')}</div>
      <div class="inst-card accent-rule">
        <p class="inst-muted">${en
          ? 'Markets daily plan — lesson, flashcards, quiz, sim when unlocked.'
          : 'Markets daily plan — lesson, cards, quiz, sim.'}</p>
        <button class="btn accent mt10" id="tdSession" style="width:100%">${icon('learn', { size: 17 })} ${sessCta}</button>
      </div>
    </section>`;

  el.innerHTML = `<div class="screen inst-screen homeboard" data-testid="campus-dashboard">
    <div class="lt-head head-row">
      <div>
        <div class="kicker">${en ? 'Today' : 'Aaj'}</div>
        <h1>${en ? `Hello, ${esc(name)}` : `Salam, ${esc(name)}`}</h1>
      </div>
      <button class="icon-btn" id="tdSettings" aria-label="${App.t('settings')}">${icon('settings', { size: 18 })}</button>
    </div>
    ${continueBlock}
    ${sessionBlock}
    ${standing}
    <section class="hb-section">
      <div class="hb-label">${en ? 'Student ID' : 'Student ID'}</div>
      ${idStrip}
    </section>
    <section class="hb-section">
      <div class="hb-label">${en ? 'Study due' : 'Study due'}</div>
      <div class="inst-row">
        <button class="inst-stat" id="tdReview">
          <span class="mono">${due + quizDue + missDue}</span>
          <span>${en ? 'Reviews' : 'Reviews'}</span>
        </button>
        <button class="inst-stat" id="tdStudy">
          <span class="mono">${flashDue}</span>
          <span>${en ? 'Flashcards' : 'Flashcards'}</span>
        </button>
      </div>
    </section>
    <p class="inst-foot-note">${en
      ? 'MasteryCap is an independent study app. Education only — not financial advice, not an accredited institution.'
      : 'Independent study app. Sirf education — financial advice ya accredited institute nahi.'}</p>
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
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
