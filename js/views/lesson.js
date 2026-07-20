/* Lesson player — Objective → Warm-up → Teach → Visual → Check → Practice → Exit */

import { icon } from '../icons.js';
import { diagram } from '../data/institute/diagrams.js';
import { loadCourse } from '../data/institute/courses.js';
import { getCourse } from '../data/institute/catalog.js';
import {
  markLessonComplete, saveLessonCheck, lessonDone,
} from '../institute/progress.js';

export function renderLesson(App, el) {
  const { courseCode, lessonId } = App._lesson || {};
  const course = loadCourse(courseCode);
  const lesson = course?.lessons?.find((l) => l.id === lessonId);
  const en = App.lang === 'en';
  if (!lesson) {
    el.innerHTML = `<div class="screen"><p>Lesson missing.</p><button class="btn" id="lsBack">Back</button></div>`;
    document.getElementById('lsBack')?.addEventListener('click', () => App.navigate('campus'));
    return;
  }

  const step = App._lessonStep || 0;
  const steps = ['objective', 'warmup', 'teach', 'visual', 'check', 'practice', 'exit'];
  const key = steps[Math.min(step, steps.length - 1)];
  const lang = App.profile?.language === 'both'
    ? (App._lessonLang || App.lang)
    : (App.profile?.language === 'ur' ? 'ur' : App.lang);
  const L = (obj) => (obj?.[lang] || obj?.en || '');

  let body = '';
  if (key === 'objective') {
    body = `<div class="kicker">${en ? 'Objective' : 'Objective'}</div>
      <h2 class="inst-h2">${L(lesson.title)}</h2>
      <p class="inst-lead">${L(lesson.objective)}</p>`;
  } else if (key === 'warmup') {
    body = `<div class="kicker">${en ? 'Warm-up' : 'Warm-up'}</div>
      <h2 class="inst-h2">${L(lesson.warmUp)}</h2>
      <p class="inst-muted">${en ? 'Think for 20 seconds before continuing.' : '20 sec socho, phir aage.'}</p>`;
  } else if (key === 'teach') {
    const reg = App.profile?.register;
    const tip = reg === 'teen'
      ? (en ? 'Teen pace: short chunks, more examples.' : 'Teen pace: chhote chunks.')
      : reg === 'adult'
        ? (en ? 'Adult pace: glossary-first; same final bar.' : 'Adult pace: pehle glossary; same final.')
        : reg === 'career'
          ? (en ? 'Career bridge: connect to work you already know.' : 'Career bridge: pehle se kaam se jodo.')
          : '';
    body = `<div class="kicker">${en ? 'Teach' : 'Teach'}</div>
      ${tip ? `<p class="inst-muted">${tip}</p>` : ''}
      <div class="inst-prose">${L(lesson.teach)}</div>`;
  } else if (key === 'visual') {
    const svg = lesson.visual ? diagram(lesson.visual) : '';
    body = `<div class="kicker">${en ? 'Visual' : 'Visual'}</div>
      ${svg ? `<div class="inst-visual">${svg}</div>` : `<p class="inst-muted">${en ? 'No diagram for this lesson — the practice is the visual.' : 'Is lesson ka diagram nahi — practice hi visual.'}</p>`}`;
  } else if (key === 'check') {
    body = renderCheck(App, lesson, lang, en);
  } else if (key === 'practice') {
    body = `<div class="kicker">${en ? 'Practice' : 'Practice'}</div>
      <h2 class="inst-h2">${L(lesson.practice)}</h2>
      <p class="inst-muted">${en ? 'Do this offline (Notes / editor). Then continue.' : 'Offline karo (Notes/editor). Phir aage.'}</p>`;
  } else {
    body = `<div class="kicker">${en ? 'Exit ticket' : 'Exit ticket'}</div>
      <h2 class="inst-h2">${L(lesson.exitTicket)}</h2>
      <textarea class="inst-textarea" id="lsReflect" rows="3" placeholder="${en ? 'One sentence…' : 'Ek jumla…'}"></textarea>`;
  }

  const last = step >= steps.length - 1;
  const both = App.profile?.language === 'both';

  el.innerHTML = `<div class="screen inst-screen lesson-screen">
    <div class="lesson-top">
      <button class="icon-btn" id="lsBack" aria-label="Back">${icon('back', { size: 18 })}</button>
      <div class="onb-progress"><i style="width:${((step + 1) / steps.length) * 100}%"></i></div>
      ${both ? `<button class="pill" id="lsLang">${lang === 'en' ? 'UR' : 'EN'}</button>` : '<span style="width:34px"></span>'}
    </div>
    <div class="mono kicker">${courseCode} · ${step + 1}/${steps.length}</div>
    ${body}
    <div class="lesson-foot">
      ${step > 0 ? `<button class="btn ghost" id="lsPrev">${en ? 'Back' : 'Wapas'}</button>` : '<span></span>'}
      <button class="btn accent" id="lsNext">${last ? (en ? 'Complete lesson' : 'Lesson mukammal') : (en ? 'Continue' : 'Aage')}</button>
    </div>
  </div>`;

  document.getElementById('lsBack')?.addEventListener('click', () => {
    App._lesson = null;
    App._lessonStep = 0;
    App.navigate('campus');
  });
  document.getElementById('lsLang')?.addEventListener('click', () => {
    App._lessonLang = lang === 'en' ? 'ur' : 'en';
    App.render();
  });
  document.getElementById('lsPrev')?.addEventListener('click', () => {
    App._lessonStep = Math.max(0, step - 1);
    App.render();
  });
  document.getElementById('lsNext')?.addEventListener('click', () => {
    if (key === 'check' && !App._checkOk) {
      // allow continue after attempting
      const answered = (App._checkAnswers || []).filter((x) => x != null).length;
      if (answered < (lesson.check || []).length) return;
      gradeCheck(App, lesson);
      App.render();
      return;
    }
    if (last) {
      markLessonComplete(courseCode, lessonId, lesson.cards || []);
      App._lesson = null;
      App._lessonStep = 0;
      App._checkOk = false;
      App._checkAnswers = null;
      App._campusView = { level: 'course', code: courseCode, schoolId: getCourse(courseCode)?.school };
      App.navigate('campus');
      return;
    }
    if (key === 'check' && App._checkOk) {
      App._lessonStep = step + 1;
      App._checkOk = false;
      App._checkGraded = false;
      App._checkAnswers = null;
      App.render();
      return;
    }
    App._lessonStep = step + 1;
    App.render();
  });

  if (key === 'check') wireCheck(App, lesson);
}

function renderCheck(App, lesson, lang, en) {
  const answers = App._checkAnswers || [];
  const graded = App._checkGraded;
  let html = `<div class="kicker">${en ? 'Check' : 'Check'}</div>`;
  (lesson.check || []).forEach((q, i) => {
    const opts = q.opts?.[lang] || q.opts?.en || [];
    html += `<div class="inst-card check-q"><p>${q.q?.[lang] || q.q?.en}</p>
      <div class="opt-list compact">${opts.map((o, j) => `
        <button class="opt-card ${answers[i] === j ? 'on' : ''} ${graded ? (j === q.correct ? 'pass' : answers[i] === j ? 'fail' : '') : ''}"
          data-qi="${i}" data-oj="${j}">${o}</button>`).join('')}</div>
      ${graded && answers[i] !== q.correct ? `<p class="inst-muted">${q.explain?.[lang] || q.explain?.en || ''}</p>` : ''}
    </div>`;
  });
  if (graded) {
    const score = App._checkScore;
    html += `<p class="mono">${en ? 'Score' : 'Score'}: ${score}%</p>`;
  }
  return html;
}

function wireCheck(App, lesson) {
  elClick(App, lesson);
}

function elClick(App, lesson) {
  document.querySelectorAll('[data-qi]').forEach((b) => {
    b.addEventListener('click', () => {
      if (App._checkGraded) return;
      if (!App._checkAnswers) App._checkAnswers = [];
      App._checkAnswers[+b.dataset.qi] = +b.dataset.oj;
      App.render();
    });
  });
}

function gradeCheck(App, lesson) {
  const qs = lesson.check || [];
  let right = 0;
  qs.forEach((q, i) => {
    if (App._checkAnswers?.[i] === q.correct) right += 1;
  });
  const score = qs.length ? Math.round((100 * right) / qs.length) : 100;
  App._checkScore = score;
  App._checkGraded = true;
  App._checkOk = true;
  saveLessonCheck(lesson.id, score);
}

export function renderFinal(App, el) {
  const code = App._finalCode;
  const course = loadCourse(code);
  const meta = getCourse(code);
  const en = App.lang === 'en';
  if (!course) {
    App.navigate('campus');
    return;
  }

  if (!App._finalAnswers) App._finalAnswers = [];
  const qs = course.finalQuiz || [];
  const lang = App.lang === 'ur' ? 'ur' : 'en';

  if (App._finalResult) {
    const r = App._finalResult;
    el.innerHTML = `<div class="screen inst-screen">
      <div class="kicker mono">${code}</div>
      <h1>${r.passed ? (en ? 'Passed' : 'Pass') : (en ? 'Not yet' : 'Abhi nahi')}</h1>
      <p class="mono" style="font-size:28px">${r.score}%</p>
      <p class="inst-muted">${en ? `Need ≥${course.passScore}%. Retake anytime — questions shuffle.` : `≥${course.passScore}% chahiye. Retake OK.`}</p>
      ${r.cert ? `<div class="inst-cert"><div class="cert-name">${esc(r.cert.name)}</div>
        <p class="cert-disc">${r.cert.disclaimer}</p>
        <p class="mono" style="font-size:10px">${r.cert.hash}</p></div>` : ''}
      <button class="btn accent" id="fnDone">${en ? 'Back to course' : 'Course pe wapas'}</button>
      ${!r.passed ? `<button class="btn secondary mt10" id="fnRetry">${en ? 'Retry' : 'Dubara'}</button>` : ''}
    </div>`;
    document.getElementById('fnDone')?.addEventListener('click', () => {
      App._finalCode = null;
      App._finalResult = null;
      App._finalAnswers = null;
      App._campusView = { level: 'course', code, schoolId: meta?.school };
      App.navigate('campus');
    });
    document.getElementById('fnRetry')?.addEventListener('click', () => {
      App._finalResult = null;
      App._finalAnswers = [];
      App._finalOrder = shuffle(qs.map((_, i) => i));
      App.render();
    });
    return;
  }

  if (!App._finalOrder) App._finalOrder = shuffle(qs.map((_, i) => i));

  el.innerHTML = `<div class="screen inst-screen">
    <button class="text-back" id="fnBack">${icon('back', { size: 16 })} ${en ? 'Cancel' : 'Cancel'}</button>
    <div class="lt-head">
      <div class="kicker mono">${code}</div>
      <h1>${en ? 'Final assessment' : 'Final assessment'}</h1>
      <p class="inst-muted">${en ? `Pass ≥${course.passScore}%` : `Pass ≥${course.passScore}%`}</p>
    </div>
    ${App._finalOrder.map((qi, display) => {
      const q = qs[qi];
      const opts = q.opts?.[lang] || q.opts?.en || [];
      return `<div class="inst-card check-q"><p>${display + 1}. ${q.q?.[lang] || q.q?.en}</p>
        <div class="opt-list compact">${opts.map((o, j) => `
          <button class="opt-card ${App._finalAnswers[qi] === j ? 'on' : ''}" data-fi="${qi}" data-fj="${j}">${o}</button>`).join('')}</div>
      </div>`;
    }).join('')}
    <button class="btn accent" id="fnSubmit">${en ? 'Submit' : 'Submit'}</button>
  </div>`;

  document.getElementById('fnBack')?.addEventListener('click', () => {
    App._finalCode = null;
    App._finalOrder = null;
    App.navigate('campus');
  });
  el.querySelectorAll('[data-fi]').forEach((b) => b.addEventListener('click', () => {
    App._finalAnswers[+b.dataset.fi] = +b.dataset.fj;
    App.render();
  }));
  document.getElementById('fnSubmit')?.addEventListener('click', async () => {
    if (App._finalAnswers.filter((x) => x != null).length < qs.length) return;
    let right = 0;
    qs.forEach((q, i) => {
      if (App._finalAnswers[i] === q.correct) right += 1;
    });
    const score = Math.round((100 * right) / qs.length);
    const { tryIssueCertificate, projectComplete } = await import('../institute/progress.js');
    let cert = null;
    const projOk = projectComplete(code, course.project?.items || []);
    const passed = score >= course.passScore && projOk;
    if (score >= course.passScore && !projOk) {
      alert(en ? 'Score OK but project checklist incomplete — attest in Records.' : 'Score OK — pehle Records mein project checklist.');
    }
    if (passed) {
      cert = await tryIssueCertificate(code, {
        title: course.title,
        hours: meta?.hours || 0,
        passScore: course.passScore,
      }, score);
    } else {
      // still record attempt
      const instMod = await import('../institute/progress.js');
      const inst = instMod.getInstitute();
      inst.finals[code] = { score, at: Date.now(), passed: false };
      instMod.setInstitute(inst);
    }
    App._finalResult = { score, passed, cert };
    App.render();
  });
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
