/* Records — profile, transcript, projects (enrolled only), certificates */

import { icon } from '../icons.js';
import { store, KEYS } from '../store.js';
import { getCourse } from '../data/institute/catalog.js';
import { loadCourse } from '../data/institute/courses.js';
import { registerLabel } from '../institute/register.js';
import {
  getInstitute, CERT_DISCLAIMER, attestProject, projectComplete, courseProgressPct,
} from '../institute/progress.js';
import { openSettings } from '../settings.js';
import { getAppearance, setAppearance } from '../theme.js';

export function renderRecords(App, el) {
  const en = App.lang === 'en';
  const pane = App._recordsPane || 'profile';
  const inst = getInstitute();
  const p = App.profile || {};
  const certs = Object.values(inst.certificates || {});
  const enrollCodes = Object.keys(inst.enrollments || {});
  const progressCodes = [...new Set([
    ...Object.keys(inst.completedLessons || {}),
    ...enrollCodes.filter((c) => c !== 'MKT-LEGACY'),
  ])];

  const tabs = `
    <div class="seg records-seg" style="width:100%;margin:0 0 16px">
      <button style="flex:1" class="${pane === 'profile' ? 'on' : ''}" data-rpane="profile">${en ? 'Profile' : 'Profile'}</button>
      <button style="flex:1" class="${pane === 'transcript' ? 'on' : ''}" data-rpane="transcript">${en ? 'Transcript' : 'Transcript'}</button>
      <button style="flex:1" class="${pane === 'certs' ? 'on' : ''}" data-rpane="certs">${en ? 'Certs' : 'Certs'}</button>
    </div>`;

  let body = '';
  if (pane === 'profile') {
    const mode = getAppearance().mode || 'light';
    const enrollList = enrollCodes.length
      ? enrollCodes.map((code) => {
        if (code === 'MKT-LEGACY') {
          return `<div class="inst-row-item static"><span class="grow">${en ? 'School of Markets' : 'School of Markets'}</span><span class="mono">${en ? 'enrolled' : 'enrolled'}</span></div>`;
        }
        const meta = getCourse(code);
        return `<div class="inst-row-item static"><span class="mono">${code}</span><span class="grow">${meta?.title?.[App.lang] || meta?.title?.en || code}</span></div>`;
      }).join('')
      : `<p class="inst-muted">${en ? 'No enrollments yet — open Campus and admit to a course.' : 'Abhi enroll nahi — Campus se admit.'}</p>`;

    body = `
      <div class="inst-card accent-rule">
        <div class="kicker">${en ? 'Student' : 'Student'}</div>
        <h2 class="inst-h2">${esc(p.name || 'Learner')}</h2>
        <p class="inst-muted">${esc(registerLabel(p.register || 'young', App.lang))}</p>
        <p class="inst-muted">${humanProfile(p, en)}</p>
        <p class="inst-muted mono">${enrollCodes.length} ${en ? 'enrollments' : 'enrollments'} · ${certs.length} ${en ? 'certs' : 'certs'}</p>
        <div class="field" style="margin-top:14px">
          <label>${en ? 'Display name' : 'Name'}</label>
          <input id="recName" type="text" maxlength="32" value="${esc(p.name || '')}" />
        </div>
        <button class="btn secondary mt10" id="recSaveName">${en ? 'Save name' : 'Name save'}</button>
      </div>
      <div class="slabel mt16">${en ? 'Reading theme' : 'Theme'}</div>
      <div class="seg" style="width:100%;margin-bottom:12px">
        ${['light', 'sepia', 'dark'].map((m) => `<button style="flex:1" class="${mode === m ? 'on' : ''}" data-theme="${m}">${m === 'light' ? 'Light' : m === 'sepia' ? 'Sepia' : 'Dark'}</button>`).join('')}
      </div>
      <div class="slabel mt16">${en ? 'Enrollments' : 'Enrollments'}</div>
      <div class="inst-list">${enrollList}</div>
      <button class="btn accent mt16" id="recCampus" style="width:100%">${en ? 'Go to Campus' : 'Campus'}</button>
      <button class="btn ghost mt10" id="recSet" style="width:100%">${en ? 'All settings' : 'Settings'}</button>`;
  } else if (pane === 'transcript') {
    body = `
      <div class="slabel">${en ? 'Course progress' : 'Course progress'}</div>
      <div class="inst-list">
        ${progressCodes.length ? progressCodes.map((code) => {
          const meta = getCourse(code);
          const course = loadCourse(code);
          const pct = course ? courseProgressPct(course) : 0;
          const passed = inst.finals[code]?.passed;
          return `<div class="inst-row-item static">
            <span class="mono">${code}</span>
            <span class="grow">${meta?.title?.[App.lang] || meta?.title?.en || code}</span>
            <span class="mono">${passed ? 'pass' : pct + '%'}</span>
          </div>`;
        }).join('') : `<p class="inst-muted">${en ? 'Admit to a course on Campus, then finish a lesson — progress shows here.' : 'Campus pe admit, lesson mukammal — yahan progress.'}</p>`}
      </div>
      ${renderAttempts(inst, en)}
      ${renderProjects(App, inst, en, enrollCodes)}
      <button class="btn secondary mt16" id="recExport">${en ? 'Export backup JSON' : 'Backup JSON'}</button>`;
  } else {
    body = `
      <div class="slabel">${en ? 'Certificates' : 'Certificates'}</div>
      ${certs.length ? certs.map((c) => `
        <div class="inst-cert" data-cert="${esc(c.courseId || c.hash)}">
          <div class="kicker">${en ? 'Certificate of Completion' : 'Certificate'}</div>
          <div class="cert-name">${esc(c.name)}</div>
          <div class="cert-course">${esc((c.title && (c.title[App.lang] || c.title.en)) || c.courseId)}</div>
          <p class="inst-muted mono">${c.score}% · ${c.hours}h · ${c.date}</p>
          <p class="cert-disc">${CERT_DISCLAIMER}</p>
          <p class="mono" style="font-size:10px;word-break:break-all">hash ${c.hash}</p>
          <div class="cert-actions cert-no-print">
            <button class="btn secondary" data-print-cert="${esc(c.courseId || c.hash)}">${en ? 'Print / Save PDF' : 'Print / PDF'}</button>
          </div>
        </div>`).join('') : `<p class="inst-muted">${en ? 'Pass a course final (≥85%) and finish any project checklist to unlock a self-issued certificate.' : 'Final ≥85% + project checklist → certificate.'}</p>`}`;
  }

  el.innerHTML = `<div class="screen inst-screen">
    <div class="lt-head">
      <div class="kicker">${en ? 'Records' : 'Records'}</div>
      <h1>${pane === 'profile' ? (en ? 'Your profile' : 'Profile') : pane === 'transcript' ? (en ? 'Transcript' : 'Transcript') : (en ? 'Certificates' : 'Certificates')}</h1>
    </div>
    ${tabs}
    ${body}
  </div>`;

  el.querySelectorAll('[data-rpane]').forEach((b) => b.addEventListener('click', () => {
    App._recordsPane = b.dataset.rpane;
    App.render();
  }));
  document.getElementById('recSet')?.addEventListener('click', () => openSettings(App));
  document.getElementById('recCampus')?.addEventListener('click', () => App.navigate('campus'));
  document.getElementById('recExport')?.addEventListener('click', () => exportBackup(App));
  document.getElementById('recSaveName')?.addEventListener('click', () => {
    const n = (document.getElementById('recName')?.value || '').trim() || 'Learner';
    App.profile = { ...(App.profile || {}), name: n };
    store.set(KEYS.profile, App.profile);
    App.toast?.(en ? 'Name saved' : 'Name save');
    App.render();
  });
  el.querySelectorAll('[data-theme]').forEach((b) => b.addEventListener('click', () => {
    setAppearance({ mode: b.dataset.theme });
    App.haptic?.(4);
    App.render();
  }));
  el.querySelectorAll('[data-print-cert]').forEach((b) => {
    b.addEventListener('click', () => {
      const id = b.getAttribute('data-print-cert');
      el.querySelectorAll('.inst-cert').forEach((card) => {
        card.classList.toggle('cert-print-hide', card.getAttribute('data-cert') !== id);
      });
      window.print();
      el.querySelectorAll('.inst-cert').forEach((card) => card.classList.remove('cert-print-hide'));
    });
  });
  el.querySelectorAll('[data-proj]').forEach((b) => {
    b.addEventListener('click', () => {
      const [code, id] = b.dataset.proj.split('::');
      const on = b.getAttribute('aria-pressed') !== 'true';
      attestProject(code, id, on);
      App.render();
    });
  });
}

function renderProjects(App, inst, en, enrollCodes) {
  const blocks = [];
  const allow = new Set(enrollCodes || []);
  // Also allow if learner already attested something
  for (const code of Object.keys(inst.projects || {})) allow.add(code);

  for (const code of ['WEB-102', 'WEB-103', 'FIN-101', 'FIN-201', 'FIN-301']) {
    if (!allow.has(code)) continue;
    const course = loadCourse(code);
    if (!course?.project) continue;
    const done = inst.projects[code] || {};
    const title = course.project.title[App.lang] || course.project.title.en;
    blocks.push(`<div class="slabel mt16">${code} · ${title}</div>
      <div class="inst-list">${course.project.items.map((it) => `
        <button class="inst-row-item" data-proj="${code}::${it.id}" aria-pressed="${done[it.id] ? 'true' : 'false'}">
          <span class="mono">${done[it.id] ? '[x]' : '[ ]'}</span>
          <span class="grow">${it[App.lang] || it.en}</span>
        </button>`).join('')}</div>
      <p class="inst-muted">${projectComplete(code, course.project.items) ? (en ? 'Checklist complete' : 'Mukammal') : (en ? 'Attest after you finish the work' : 'Kaam ke baad attest')}</p>`);
  }
  if (!blocks.length) return '';
  return `<div class="slabel mt16">${en ? 'Project checklists' : 'Project checklists'}</div>
    <p class="inst-muted" style="margin-bottom:8px">${en ? 'Only for courses you enrolled in.' : 'Sirf enrolled courses.'}</p>
    ${blocks.join('')}`;
}

function renderAttempts(inst, en) {
  const rows = Object.entries(inst.attempts || {});
  if (!rows.length) return '';
  return `<div class="slabel mt16">${en ? 'Final attempts' : 'Final attempts'}</div>
    <div class="inst-list">${rows.map(([code, list]) => {
      const last = list[list.length - 1];
      const best = Math.max(...list.map((a) => a.score || 0));
      return `<div class="inst-row-item static">
        <span class="mono">${code}</span>
        <span class="grow">${en ? `${list.length} tries · best ${best}%` : `${list.length} tries · best ${best}%`}</span>
        <span class="mono">${last?.passed ? 'pass' : '—'}</span>
      </div>`;
    }).join('')}</div>`;
}

function humanProfile(p, en) {
  if (!p) return '—';
  const age = ({
    teen: en ? 'Teen' : 'Teen',
    '18-24': en ? 'Young adult' : 'Young adult',
    '25-34': en ? 'Career years' : 'Career',
    '35+': en ? 'Adult beginner' : 'Adult',
  })[p.ageBand] || p.ageBand || '—';
  const goal = ({
    apps: en ? 'Build apps' : 'Apps',
    web: en ? 'Web craft' : 'Web',
    markets: en ? 'Market literacy' : 'Markets',
    money: en ? 'Money literacy' : 'Money',
  })[p.goal] || p.goal || '—';
  const time = ({
    lt2: en ? '<2h/week' : '<2h/hafta',
    '2-5': en ? '2–5h/week' : '2–5h',
    '5-10': en ? '5–10h/week' : '5–10h',
  })[p.timeBand] || p.timeBand || '—';
  return `${age} · ${goal} · ${time}`;
}

function exportBackup(App) {
  const payload = {
    exportedAt: new Date().toISOString(),
    version: 'institute',
    profile: store.get(KEYS.profile),
    institute: store.get(KEYS.institute),
    course: store.get(KEYS.course),
    settings: store.get(KEYS.settings),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `masterycap-backup-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function esc(s) {
  return String(s || '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
