/* Campus — schools → programs → courses */

import { icon } from '../icons.js';
import { CATALOG, getCourse, prereqsMet } from '../data/institute/catalog.js';
import { loadCourse } from '../data/institute/courses.js';
import {
  completedCourseCodes, setActiveCourse, courseProgressPct, getInstitute, projectComplete,
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

  el.innerHTML = `<div class="screen inst-screen">
    <div class="lt-head">
      <div class="kicker">${en ? 'Campus' : 'Campus'}</div>
      <h1>${en ? 'Schools' : 'Schools'}</h1>
      <p class="inst-muted">${en ? 'In Session courses are complete end-to-end. Announced means syllabus only — not enrollable yet.' : 'In Session = mukammal. Announced = syllabus only — abhi enroll nahi.'}</p>
    </div>
    <div class="inst-list">
      ${CATALOG.schools.map((s) => `
        <button class="inst-card school-card" data-school="${s.id}">
          <div class="kicker">${s.status === 'live' ? (en ? 'Open' : 'Open') : (en ? 'Announced' : 'Announced')}</div>
          <div class="inst-h3">${s.name[App.lang] || s.name.en}</div>
          <p class="inst-muted">${s.tagline[App.lang] || s.tagline.en}</p>
          ${s.honesty ? `<p class="inst-honesty">${en ? 'Education only. Not financial advice.' : 'Sirf education. Financial advice nahi.'}</p>` : ''}
        </button>`).join('')}
    </div>
  </div>`;

  el.querySelectorAll('[data-school]').forEach((b) => b.addEventListener('click', () => {
    const school = CATALOG.schools.find((s) => s.id === b.dataset.school);
    if (school?.status === 'announced') {
      App.toast?.(en ? 'This school opens later.' : 'Ye school baad mein khulega.');
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
    el.innerHTML = `<div class="screen inst-screen">
      <button class="text-back" id="camBack">${icon('back', { size: 16 })} ${en ? 'Schools' : 'Schools'}</button>
      <div class="lt-head">
        <div class="kicker">${en ? 'School' : 'School'}</div>
        <h1>${school.name.en}</h1>
        <p class="inst-honesty">${en ? 'Education only. Nothing here is financial advice or a path to income.' : 'Sirf education. Financial advice ya income path nahi.'}</p>
      </div>
      <div class="inst-card">
        <div class="inst-h3">${en ? 'Market Literacy Tracks' : 'Market Literacy Tracks'}</div>
        <p class="inst-muted">${en ? 'Existing bilingual trading curriculum — Foundations through advanced electives.' : 'Maujuda bilingual trading curriculum.'}</p>
        <button class="btn accent" id="camOpenMkt">${en ? 'Enter tracks' : 'Tracks mein jao'}</button>
      </div>
    </div>`;
    document.getElementById('camBack')?.addEventListener('click', () => {
      App._campusView = { level: 'schools' };
      App.render();
    });
    document.getElementById('camOpenMkt')?.addEventListener('click', () => {
      setActiveCourse('MKT-LEGACY');
      App._marketsMode = true;
      App.navigate('learn');
    });
    return;
  }

  const cards = [];
  for (const prog of school.programs || []) {
    cards.push(`<div class="slabel">${prog.name[App.lang] || prog.name.en}</div>`);
    for (const code of prog.courses) {
      const c = getCourse(code);
      if (!c) continue;
      const locked = !prereqsMet(code, done) && c.status === 'session';
      const authored = loadCourse(code);
      const pct = authored ? courseProgressPct(authored) : 0;
      const badge = c.status === 'session'
        ? (locked ? (en ? 'Locked' : 'Locked') : (en ? 'In Session' : 'In Session'))
        : (en ? 'Announced' : 'Announced');
      cards.push(`<button class="inst-card ${c.status !== 'session' || locked ? 'dim' : ''}" data-code="${code}" ${c.status !== 'session' ? 'disabled' : ''}>
        <div class="kicker mono">${c.code} · ${badge}${pct ? ` · ${pct}%` : ''}</div>
        <div class="inst-h3">${c.title[App.lang] || c.title.en}</div>
        <p class="inst-muted">${c.hours || '—'}h${locked && c.prereqs?.length ? ` · ${en ? 'Needs' : 'Chahiye'} ${c.prereqs.join(', ')}` : ''}</p>
      </button>`);
    }
  }

  el.innerHTML = `<div class="screen inst-screen">
    <button class="text-back" id="camBack">${icon('back', { size: 16 })} ${en ? 'Schools' : 'Schools'}</button>
    <div class="lt-head">
      <div class="kicker">${en ? 'School' : 'School'}</div>
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
    if (b.disabled) return;
    b.addEventListener('click', () => {
      const code = b.dataset.code;
      if (!prereqsMet(code, done)) {
        const c = getCourse(code);
        alert(en
          ? `Complete ${(c.prereqs || []).join(', ')} first.`
          : `Pehle ${(c.prereqs || []).join(', ')} mukammal karo.`);
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

  el.innerHTML = `<div class="screen inst-screen">
    <button class="text-back" id="camBack">${icon('back', { size: 16 })} ${en ? 'Back' : 'Wapas'}</button>
    <div class="lt-head">
      <div class="kicker mono">${meta.code}</div>
      <h1>${meta.title[App.lang] || meta.title.en}</h1>
      <p class="inst-muted">${meta.hours}h · ${en ? 'Pass final ≥' : 'Final ≥'}${course.passScore}%</p>
    </div>
    ${meta.outcomes ? `<div class="inst-card"><div class="kicker">${en ? 'You will be able to' : 'Aap kar sakenge'}</div>
      <ul class="inst-ul">${(meta.outcomes[App.lang] || meta.outcomes.en).map((o) => `<li>${o}</li>`).join('')}</ul></div>` : ''}
    <div class="slabel">${en ? 'Lessons' : 'Lessons'}</div>
    <div class="inst-list">
      ${course.lessons.map((l, i) => `
        <button class="inst-row-item" data-lesson="${l.id}">
          <span class="mono">${String(i + 1).padStart(2, '0')}</span>
          <span class="grow">${l.title[App.lang] || l.title.en}</span>
          <span class="mono">${completed.has(l.id) ? 'done' : ''}</span>
        </button>`).join('')}
    </div>
    ${course.project ? `<div class="slabel mt16">${en ? 'Project' : 'Project'}</div>
      <div class="inst-card"><div class="inst-h3">${course.project.title[App.lang] || course.project.title.en}</div>
      <p class="inst-muted">${projOk ? (en ? 'Checklist complete' : 'Checklist mukammal') : (en ? 'Attest items in lesson flow / Records' : 'Items attest karo')}</p></div>` : ''}
    <div class="mt16">
      <button class="btn accent" id="camStart" ${passed ? 'disabled' : ''}>${en ? (completed.size ? 'Continue' : 'Begin course') : (completed.size ? 'Jari' : 'Shuru')}</button>
      <button class="btn secondary mt10" id="camFinal" ${completed.size < course.lessons.length ? 'disabled' : ''}>${en ? 'Final assessment' : 'Final assessment'}</button>
    </div>
  </div>`;

  document.getElementById('camBack')?.addEventListener('click', () => {
    App._campusView = { level: 'school', schoolId: meta.school };
    App.render();
  });
  document.getElementById('camStart')?.addEventListener('click', () => {
    setActiveCourse(code);
    const next = course.lessons.find((l) => !completed.has(l.id)) || course.lessons[0];
    App.openLesson(code, next.id);
  });
  document.getElementById('camFinal')?.addEventListener('click', () => App.openFinal(code));
  el.querySelectorAll('[data-lesson]').forEach((b) => b.addEventListener('click', () => {
    setActiveCourse(code);
    App.openLesson(code, b.dataset.lesson);
  }));
}
