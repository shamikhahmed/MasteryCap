/* Today tab — desk: next lesson, reviews, pace */

import { icon } from '../icons.js';
import { openSettings } from '../settings.js';
import { loadCourse } from '../data/institute/courses.js';
import { getCourse } from '../data/institute/catalog.js';
import {
  getInstitute, nextLesson, courseProgressPct, dueSrs, srsCapForProfile, setActiveCourse,
} from '../institute/progress.js';

export function renderToday(App, el) {
  const p = App.profile || {};
  const name = p.name || 'Learner';
  const inst = getInstitute();
  const rawCode = inst.activeCourse || p.starterCourse || null;
  const meta = rawCode ? getCourse(rawCode) : null;
  // Announced / unloaded courses (FE-202→APP-403) fall back to Campus CTA
  const code = (rawCode === 'MKT-LEGACY' || meta?.status === 'session') ? rawCode : null;
  const course = code && code !== 'MKT-LEGACY' ? loadCourse(code) : null;
  const nxt = course ? nextLesson(course) : null;
  const pct = course ? courseProgressPct(course) : 0;
  const cap = srsCapForProfile(p);
  const due = dueSrs(cap).length;
  const en = App.lang === 'en';

  let hero = '';
  if (code === 'MKT-LEGACY') {
    hero = `<div class="inst-card accent-rule">
      <div class="kicker">${en ? 'Active path' : 'Active path'}</div>
      <h2 class="inst-h2">${en ? 'School of Markets' : 'School of Markets'}</h2>
      <p class="inst-muted">${en ? 'Education only — not financial advice or income promises.' : 'Sirf education — financial advice ya income promise nahi.'}</p>
      <button class="btn accent" id="tdMarkets">${en ? 'Open market tracks' : 'Market tracks kholo'}</button>
    </div>`;
  } else if (nxt && course) {
    hero = `<div class="inst-card accent-rule">
      <div class="kicker">${meta?.code || ''} · ${pct}%</div>
      <h2 class="inst-h2">${nxt.title[App.lang] || nxt.title.en}</h2>
      <p class="inst-muted">${nxt.objective[App.lang] || nxt.objective.en}</p>
      <button class="btn accent" id="tdContinue">${en ? 'Continue lesson' : 'Lesson jari'}</button>
    </div>`;
  } else if (course && !nxt) {
    hero = `<div class="inst-card accent-rule">
      <div class="kicker">${meta?.code || ''}</div>
      <h2 class="inst-h2">${en ? 'Lessons complete' : 'Lessons mukammal'}</h2>
      <p class="inst-muted">${en ? 'Take the final assessment when ready.' : 'Final assessment lo jab ready ho.'}</p>
      <button class="btn accent" id="tdFinal">${en ? 'Final assessment' : 'Final assessment'}</button>
    </div>`;
  } else {
    hero = `<div class="inst-card accent-rule">
      <div class="kicker">${en ? 'Campus' : 'Campus'}</div>
      <h2 class="inst-h2">${en ? 'Your campus is waiting' : 'Campus intezaar kar raha'}</h2>
      <p class="inst-muted">${en ? 'Choose a school and start an In Session course.' : 'School chuno — In Session course shuru.'}</p>
      <button class="btn accent" id="tdCampus">${en ? 'Explore Campus' : 'Campus dekho'}</button>
    </div>`;
  }

  el.innerHTML = `<div class="screen inst-screen">
    <div class="lt-head head-row">
      <div>
        <div class="kicker">${en ? 'Today' : 'Aaj'}</div>
        <h1>${en ? `Hello, ${esc(name)}` : `Salam, ${esc(name)}`}</h1>
      </div>
      <button class="icon-btn" id="tdSettings" aria-label="Settings">${icon('check', { size: 18 })}</button>
    </div>
    ${hero}
    <div class="inst-row mt16">
      <button class="inst-stat" id="tdReview">
        <span class="mono">${due}</span>
        <span>${en ? 'Reviews due' : 'Reviews due'}</span>
      </button>
      <button class="inst-stat" id="tdCampus2">
        <span class="mono">${en ? 'Schools' : 'Schools'}</span>
        <span>${en ? 'Browse catalog' : 'Catalog'}</span>
      </button>
    </div>
    <p class="inst-foot-note">${en
      ? 'No accounts. Progress stays on this device. Export from Records.'
      : 'No accounts. Progress is device pe. Records se export.'}</p>
  </div>`;

  document.getElementById('tdSettings')?.addEventListener('click', () => openSettings(App));
  document.getElementById('tdCampus')?.addEventListener('click', () => App.navigate('campus'));
  document.getElementById('tdCampus2')?.addEventListener('click', () => App.navigate('campus'));
  document.getElementById('tdReview')?.addEventListener('click', () => App.navigate('practice'));
  document.getElementById('tdMarkets')?.addEventListener('click', () => {
    App._marketsMode = true;
    App.navigate('learn');
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
