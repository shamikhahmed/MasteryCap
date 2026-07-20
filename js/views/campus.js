/* Campus — MasteryCap → branches → courses (Open / Locked / Announced) */

import { icon } from '../icons.js';
import { CATALOG, getCourse, prereqsMet } from '../data/institute/catalog.js';
import { loadCourse } from '../data/institute/courses.js';
import { TRACKS, TRADING_TRACK_IDS } from '../data/tracks.js';
import { trackLockReason } from '../gates.js';
import {
  completedCourseCodes, setActiveCourse, courseProgressPct, getInstitute,
  projectComplete, enrollCourse, isEnrolled, attemptCount,
} from '../institute/progress.js';

export function renderCampus(App, el) {
  const view = App._campusView || { level: 'schools' };
  const en = App.lang === 'en';
  const done = completedCourseCodes();

  if (view.level === 'course' && view.code) {
    return renderCourseDetail(App, el, view.code, done, en);
  }
  if (view.level === 'school' && view.schoolId) {
    return renderSchool(App, el, view.schoolId, done, en);
  }

  el.innerHTML = `<div class="screen inst-screen workbench-campus">
    <div class="wb-bench" aria-hidden="true"></div>
    <div class="lt-head">
      <div class="kicker">${en ? 'MasteryCap' : 'MasteryCap'}</div>
      <h1>${en ? 'Campus branches' : 'Campus branches'}</h1>
      <p class="inst-muted">${en
        ? 'One school · three branches. Open courses you can start. Locked need prereqs. Announced are titles only.'
        : 'Ek school · teen branches. Open = shuru. Locked = pehle prereq. Announced = titles only.'}</p>
    </div>
    <div class="inst-list branch-grid">
      ${CATALOG.schools.map((s) => `
        <button class="inst-card school-card branch-card" data-school="${s.id}">
          <div class="kicker">${s.status === 'live' ? (en ? 'Branch open' : 'Branch open') : (en ? 'Coming' : 'Coming')}</div>
          <div class="inst-h3">${s.name[App.lang] || s.name.en}</div>
          <p class="inst-muted">${s.tagline[App.lang] || s.tagline.en}</p>
          ${s.honesty ? `<p class="inst-honesty">${en ? 'Education only. Not financial advice.' : 'Sirf education. Financial advice nahi.'}</p>` : ''}
          <span class="mono branch-enter">${en ? 'Enter →' : 'Enter →'}</span>
        </button>`).join('')}
    </div>
  </div>`;

  el.querySelectorAll('[data-school]').forEach((b) => b.addEventListener('click', () => {
    const school = CATALOG.schools.find((s) => s.id === b.dataset.school);
    if (school?.status === 'announced') {
      App.toast?.(en ? 'This branch opens later.' : 'Ye branch baad mein.');
      return;
    }
    App._campusView = { level: 'school', schoolId: b.dataset.school };
    App.render();
  }));
}

function renderSchool(App, el, schoolId, done, en) {
  const school = CATALOG.schools.find((s) => s.id === schoolId);
  if (!school) {
    App._campusView = { level: 'schools' };
    return renderCampus(App, el);
  }

  if (schoolId === 'markets') {
    const CORE = ['foundations', 'crypto', 'stocks', 'forex'];
    const trading = TRACKS.filter((t) => TRADING_TRACK_IDS.includes(t.id));
    const core = CORE.map((id) => trading.find((t) => t.id === id)).filter(Boolean);
    const more = trading.filter((t) => !CORE.includes(t.id));

    const cardHtml = (t) => {
      const lock = trackLockReason(t.id, App);
      const badge = lock ? (en ? 'Locked' : 'Locked') : (en ? 'Open' : 'Open');
      const lockHint = lock
        ? (en ? ' · Complete Foundations (or pass exam) first' : ' · Pehle Foundations / exam')
        : '';
      return `<button class="inst-card ${lock ? 'dim' : ''}" data-mkt="${t.id}" data-lock="${lock || ''}">
        <div class="kicker mono">${badge}</div>
        <div class="inst-h3">${t.name[App.lang] || t.name.en}</div>
        <p class="inst-muted">${t.blurb?.[App.lang] || t.blurb?.en || ''}${lockHint}</p>
      </button>`;
    };

    el.innerHTML = `<div class="screen inst-screen">
      <button class="text-back" id="camBack">${icon('back', { size: 16 })} ${en ? 'Branches' : 'Branches'}</button>
      <div class="lt-head">
        <div class="kicker">${en ? 'Branch' : 'Branch'}</div>
        <h1>${school.name.en}</h1>
        <p class="inst-foot-note">${en
          ? 'Education only. Not financial advice or an income path.'
          : 'Sirf education. Financial advice ya income path nahi.'}</p>
      </div>
      <div class="slabel">${en ? 'Core ladder' : 'Core ladder'}</div>
      <p class="inst-muted" style="margin-bottom:10px">${en
        ? 'Foundations first. Crypto, Stocks, and Forex unlock together when Foundations is complete or the exam is passed.'
        : 'Pehle Foundations. Crypto / Stocks / Forex ek saath unlock.'}</p>
      <div class="inst-list ladder-core">${core.map(cardHtml).join('')}</div>
      <div class="slabel mt16">${en ? 'More tracks' : 'More tracks'}</div>
      <div class="inst-list">${more.map(cardHtml).join('')}</div>
    </div>`;
    document.getElementById('camBack')?.addEventListener('click', () => {
      App._campusView = { level: 'schools' };
      App.render();
    });
    el.querySelectorAll('[data-mkt]').forEach((b) => b.addEventListener('click', () => {
      if (b.dataset.lock) {
        App.toast?.(en
          ? 'Locked — complete Markets Foundations (all weeks) or pass the Foundations exam.'
          : 'Locked — pehle Foundations ya exam.');
        return;
      }
      enrollCourse('MKT-LEGACY', 'markets');
      App._courseFocus = { trackId: b.dataset.mkt, kind: 'home' };
      App._marketsMode = true;
      App.navigate('learn');
    }));
    return;
  }

  const cards = [];
  for (const prog of school.programs || []) {
    cards.push(`<div class="slabel">${prog.name[App.lang] || prog.name.en}</div>`);
    for (const code of prog.courses) {
      const c = getCourse(code);
      if (!c) continue;
      const locked = c.status === 'session' && !prereqsMet(code, done);
      const authored = loadCourse(code);
      const pct = authored ? courseProgressPct(authored) : 0;
      const enrolled = isEnrolled(code);
      let badge = en ? 'Announced' : 'Announced';
      if (c.status === 'session') {
        badge = locked ? (en ? 'Locked' : 'Locked') : (enrolled ? (en ? 'Enrolled' : 'Enrolled') : (en ? 'Open' : 'Open'));
      }
      const dim = c.status !== 'session' || locked;
      cards.push(`<button class="inst-card ${dim ? 'dim' : ''}" data-code="${code}" data-locked="${locked ? '1' : '0'}" data-announced="${c.status !== 'session' ? '1' : '0'}">
        <div class="kicker mono">${c.code} · ${badge}${pct ? ` · ${pct}%` : ''}</div>
        <div class="inst-h3">${c.title[App.lang] || c.title.en}</div>
        <p class="inst-muted">${c.hours || '—'}h${locked && c.prereqs?.length ? ` · ${en ? 'Needs' : 'Chahiye'} ${c.prereqs.join(', ')}` : ''}${c.status !== 'session' ? (en ? ' · Coming soon' : ' · Jald') : ''}</p>
      </button>`);
    }
  }

  el.innerHTML = `<div class="screen inst-screen">
    <button class="text-back" id="camBack">${icon('back', { size: 16 })} ${en ? 'Branches' : 'Branches'}</button>
    <div class="lt-head">
      <div class="kicker">${en ? 'Branch' : 'Branch'}</div>
      <h1>${school.name[App.lang] || school.name.en}</h1>
      <p class="inst-muted">${school.tagline[App.lang] || school.tagline.en}</p>
    </div>
    <div class="inst-list">${cards.join('')}</div>
  </div>`;

  document.getElementById('camBack')?.addEventListener('click', () => {
    App._campusView = { level: 'schools' };
    App.render();
  });
  el.querySelectorAll('[data-code]').forEach((b) => {
    b.addEventListener('click', () => {
      const code = b.dataset.code;
      if (b.dataset.announced === '1') {
        App.toast?.(en ? 'Announced only — not enrollable yet.' : 'Announced — abhi enroll nahi.');
        return;
      }
      if (b.dataset.locked === '1') {
        const c = getCourse(code);
        App.toast?.(en
          ? `Locked — complete ${(c.prereqs || []).join(', ')} first.`
          : `Locked — pehle ${(c.prereqs || []).join(', ')}.`);
        return;
      }
      App._campusView = { level: 'course', code, schoolId };
      App.render();
    });
  });
}

function renderCourseDetail(App, el, code, done, en) {
  const meta = getCourse(code);
  const course = loadCourse(code);
  if (!meta || !course) {
    App._campusView = { level: 'schools' };
    return renderCampus(App, el);
  }
  const inst = getInstitute();
  const completed = new Set(inst.completedLessons[code] || []);
  const passed = inst.finals[code]?.passed;
  const projOk = projectComplete(code, course.project?.items || []);
  const enrolled = isEnrolled(code);
  const tries = attemptCount(code);

  el.innerHTML = `<div class="screen inst-screen">
    <button class="text-back" id="camBack">${icon('back', { size: 16 })} ${en ? 'Back' : 'Wapas'}</button>
    <div class="lt-head">
      <div class="kicker mono">${meta.code}</div>
      <h1>${meta.title[App.lang] || meta.title.en}</h1>
      <p class="inst-muted">${meta.hours}h · ${en ? 'Pass final ≥' : 'Final ≥'}${course.passScore}%${tries ? ` · ${en ? 'Attempts' : 'Attempts'} ${tries}` : ''}</p>
    </div>
    ${meta.outcomes ? `<div class="inst-card"><div class="kicker">${en ? 'You will be able to' : 'Aap kar sakenge'}</div>
      <ul class="inst-ul">${(meta.outcomes[App.lang] || meta.outcomes.en).map((o) => `<li>${o}</li>`).join('')}</ul></div>` : ''}
    <div class="slabel">${en ? 'Lessons' : 'Lessons'}</div>
    <div class="inst-list">
      ${course.lessons.map((l, i) => `
        <button class="inst-row-item" data-lesson="${l.id}" ${enrolled ? '' : 'disabled'}>
          <span class="mono">${String(i + 1).padStart(2, '0')}</span>
          <span class="grow">${l.title[App.lang] || l.title.en}</span>
          <span class="mono">${completed.has(l.id) ? 'done' : ''}</span>
        </button>`).join('')}
    </div>
    ${course.project ? `<div class="slabel mt16">${en ? 'Project' : 'Project'}</div>
      <div class="inst-card"><div class="inst-h3">${course.project.title[App.lang] || course.project.title.en}</div>
      <p class="inst-muted">${projOk ? (en ? 'Checklist complete' : 'Checklist mukammal') : (en ? 'Attest items in Records' : 'Records mein attest')}</p></div>` : ''}
    <div class="mt16">
      ${!enrolled
        ? `<button class="btn accent" id="camEnroll">${en ? `Admit to ${meta.code}` : `${meta.code} mein admit`}</button>`
        : `<button class="btn accent" id="camStart" ${passed ? 'disabled' : ''}>${en ? (completed.size ? 'Continue' : 'Begin course') : (completed.size ? 'Jari' : 'Shuru')}</button>
           <button class="btn secondary mt10" id="camFinal" ${completed.size < course.lessons.length ? 'disabled' : ''}>${en ? 'Final assessment' : 'Final assessment'}</button>`}
    </div>
  </div>`;

  document.getElementById('camBack')?.addEventListener('click', () => {
    App._campusView = { level: 'school', schoolId: meta.school };
    App.render();
  });
  document.getElementById('camEnroll')?.addEventListener('click', () => {
    enrollCourse(code, meta.school);
    App.toast?.(en ? `Admitted to ${meta.code}` : `${meta.code} mein admit`);
    App.haptic?.(8);
    App.render();
  });
  document.getElementById('camStart')?.addEventListener('click', () => {
    setActiveCourse(code);
    const next = course.lessons.find((l) => !completed.has(l.id)) || course.lessons[0];
    App.openLesson(code, next.id);
  });
  document.getElementById('camFinal')?.addEventListener('click', () => App.openFinal(code));
  el.querySelectorAll('[data-lesson]').forEach((b) => {
    if (b.disabled) return;
    b.addEventListener('click', () => {
      setActiveCourse(code);
      App.openLesson(code, b.dataset.lesson);
    });
  });
}
