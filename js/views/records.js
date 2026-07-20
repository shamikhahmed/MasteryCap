/* Records — transcript, certificates, export */

import { icon } from '../icons.js';
import { store, KEYS } from '../store.js';
import { getCourse } from '../data/institute/catalog.js';
import { loadCourse } from '../data/institute/courses.js';
import {
  getInstitute, CERT_DISCLAIMER, attestProject, projectComplete, courseProgressPct,
} from '../institute/progress.js';
import { openSettings } from '../settings.js';

export function renderRecords(App, el) {
  const en = App.lang === 'en';
  const inst = getInstitute();
  const certs = Object.values(inst.certificates || {});
  const codes = Object.keys(inst.completedLessons || {});

  el.innerHTML = `<div class="screen inst-screen">
    <div class="lt-head head-row">
      <div>
        <div class="kicker">${en ? 'Records' : 'Records'}</div>
        <h1>${en ? 'Transcript' : 'Transcript'}</h1>
      </div>
      <button class="icon-btn" id="recSet" aria-label="Settings">${icon('settings', { size: 18 })}</button>
    </div>

    <div class="inst-card">
      <div class="kicker">${en ? 'Student profile' : 'Student profile'}</div>
      <div class="inst-h3">${esc(App.profile?.name || 'Learner')}</div>
      <p class="inst-muted">${humanProfile(App.profile, en)}</p>
      <p class="inst-muted mono">${Object.keys(inst.enrollments || {}).length} ${en ? 'enrollments' : 'enrollments'}</p>
    </div>

    ${renderAttempts(inst, en)}

    <div class="slabel mt16">${en ? 'Course progress' : 'Course progress'}</div>
    <div class="inst-list">
      ${codes.length ? codes.map((code) => {
        const meta = getCourse(code);
        const course = loadCourse(code);
        const pct = course ? courseProgressPct(course) : 0;
        const passed = inst.finals[code]?.passed;
        return `<div class="inst-row-item static">
          <span class="mono">${code}</span>
          <span class="grow">${meta?.title?.[App.lang] || meta?.title?.en || code}</span>
          <span class="mono">${passed ? 'pass' : pct + '%'}</span>
        </div>`;
      }).join('') : `<p class="inst-muted">${en ? 'Complete your first lesson to begin your transcript.' : 'Pehli lesson se transcript shuru.'}</p>`}
    </div>

    ${renderProjects(App, inst, en)}

    <div class="slabel mt16">${en ? 'Certificates' : 'Certificates'}</div>
    ${certs.length ? certs.map((c) => `
      <div class="inst-cert" data-cert="${esc(c.courseId || c.hash)}">
        <div class="kicker">${en ? 'Certificate of Completion' : 'Certificate of Completion'}</div>
        <div class="cert-name">${esc(c.name)}</div>
        <div class="cert-course">${esc((c.title && (c.title[App.lang] || c.title.en)) || c.courseId)}</div>
        <p class="inst-muted mono">${c.score}% · ${c.hours}h · ${c.date}</p>
        <p class="cert-disc">${CERT_DISCLAIMER}</p>
        <p class="mono" style="font-size:10px;word-break:break-all">hash ${c.hash}</p>
        <div class="cert-actions cert-no-print">
          <button class="btn secondary" data-print-cert="${esc(c.courseId || c.hash)}">${en ? 'Print / Save PDF' : 'Print / PDF'}</button>
        </div>
      </div>`).join('') : `<p class="inst-muted">${en ? 'Certificates unlock after final ≥85% and project checklist (if any).' : 'Final ≥85% + project checklist ke baad.'}</p>`}

    <div class="mt16">
      <button class="btn secondary" id="recExport">${en ? 'Export backup JSON' : 'Backup JSON export'}</button>
      <button class="btn ghost mt10" id="recJournal">${en ? 'Discipline journal (markets)' : 'Discipline journal'}</button>
      <button class="btn ghost mt10" id="recProgress">${en ? 'Legacy progress charts' : 'Legacy progress'}</button>
    </div>
  </div>`;

  document.getElementById('recSet')?.addEventListener('click', () => openSettings(App));
  document.getElementById('recJournal')?.addEventListener('click', () => App.navigate('journal'));
  document.getElementById('recProgress')?.addEventListener('click', () => App.navigate('progress'));
  document.getElementById('recExport')?.addEventListener('click', () => exportBackup(App));
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

function renderProjects(App, inst, en) {
  const blocks = [];
  for (const code of ['WEB-102', 'WEB-103', 'FIN-101', 'FIN-201', 'FIN-301']) {
    const course = loadCourse(code);
    if (!course?.project) continue;
    const done = inst.projects[code] || {};
    blocks.push(`<div class="slabel mt16">${course.project.title[App.lang] || course.project.title.en}</div>
      <div class="inst-list">${course.project.items.map((it) => `
        <button class="inst-row-item" data-proj="${code}::${it.id}" aria-pressed="${done[it.id] ? 'true' : 'false'}">
          <span class="mono">${done[it.id] ? '[x]' : '[ ]'}</span>
          <span class="grow">${it[App.lang] || it.en}</span>
        </button>`).join('')}</div>
      <p class="inst-muted">${projectComplete(code, course.project.items) ? (en ? 'Project checklist complete' : 'Checklist mukammal') : ''}</p>`);
  }
  return blocks.join('') || '';
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
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
