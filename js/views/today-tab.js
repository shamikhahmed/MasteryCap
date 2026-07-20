/* Today tab — student desk */

import { icon } from '../icons.js';
import { openSettings } from '../settings.js';
import { loadCourse } from '../data/institute/courses.js';
import { getCourse } from '../data/institute/catalog.js';
import { registerLabel } from '../institute/register.js';
import {
  getInstitute, nextLesson, courseProgressPct, dueSrs, srsCapForProfile, setActiveCourse,
} from '../institute/progress.js';
import { getAppearance, setAppearance } from '../theme.js';

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
  const en = App.lang === 'en';
  const reg = registerLabel(p.register || 'young', App.lang);
  const enrollN = Object.keys(inst.enrollments || {}).length;
  const mode = getAppearance().mode || 'light';

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
      <h2 class="inst-h2">${en ? 'Pick a branch' : 'Branch chuno'}</h2>
      <p class="inst-muted">${en ? 'Software Craft, Markets, or Money — enroll in an Open course.' : 'Software Craft, Markets, ya Money — Open course mein enroll.'}</p>
      <button class="btn accent" id="tdCampus">${en ? 'Explore Campus' : 'Campus dekho'}</button>
    </div>`;
  }

  el.innerHTML = `<div class="screen inst-screen workbench-campus">
    <div class="wb-bench" aria-hidden="true"></div>
    <div class="lt-head head-row">
      <div>
        <div class="kicker">${en ? 'Today' : 'Aaj'}</div>
        <h1>${en ? `Hello, ${esc(name)}` : `Salam, ${esc(name)}`}</h1>
      </div>
      <button class="icon-btn" id="tdSettings" aria-label="Settings">${icon('settings', { size: 18 })}</button>
    </div>
    <div class="inst-card student-strip">
      <div class="kicker">${en ? 'Student' : 'Student'}</div>
      <p class="inst-muted">${esc(reg)} · ${enrollN} ${en ? 'enrolled' : 'enrolled'} · ${en ? 'Theme' : 'Theme'}</p>
      <div class="seg theme-quick" style="width:100%;margin-top:10px">
        ${['light', 'sepia', 'dark'].map((m) => `<button style="flex:1" class="${mode === m ? 'on' : ''}" data-theme="${m}">${m === 'light' ? (en ? 'Light' : 'Light') : m === 'sepia' ? 'Sepia' : (en ? 'Dark' : 'Dark')}</button>`).join('')}
      </div>
    </div>
    ${hero}
    <div class="inst-row mt16">
      <button class="inst-stat" id="tdReview">
        <span class="mono">${due}</span>
        <span>${en ? 'Reviews due' : 'Reviews due'}</span>
      </button>
      <button class="inst-stat" id="tdCampus2">
        <span class="mono">${en ? 'Branches' : 'Branches'}</span>
        <span>${en ? 'Browse campus' : 'Campus'}</span>
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
  el.querySelectorAll('[data-theme]').forEach((b) => b.addEventListener('click', () => {
    setAppearance({ mode: b.dataset.theme });
    App.haptic?.(4);
    App.render();
  }));
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
