/* HTTP Lab screen — headers + auto-grade exercises */

import { icon } from '../icons.js';
import {
  handleLabRequest, LAB_HONESTY, LAB_PRESETS, gradeLabExercises,
} from '../institute/http-lab.js';
import { getInstitute, setInstitute, attestProject } from '../institute/progress.js';

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function formatRes(r) {
  const hdr = Object.entries(r.headers || {}).map(([k, v]) => `${k}: ${v}`).join('\n');
  return `HTTP ${r.status}\n${hdr}\n\n${r.body || '(empty body)'}`;
}

function parseHeaderBox(text) {
  const headers = {};
  String(text || '').split('\n').forEach((line) => {
    const i = line.indexOf(':');
    if (i > 0) headers[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  });
  return headers;
}

export function renderHttpLab(App, el) {
  const en = App.lang === 'en';
  const lang = en ? 'en' : 'ur';
  const inst = getInstitute();
  const history = inst.labHistory || [];
  const S = App._lab || {
    method: 'GET', path: '/notes', body: '', headerText: '', last: null,
  };
  App._lab = S;
  const grades = gradeLabExercises(history);

  el.innerHTML = `<div class="screen inst-screen">
    <button class="text-back" id="labBack">${icon('back', { size: 16 })} ${App._labReturn === 'lesson'
      ? (en ? 'Lesson' : 'Lesson')
      : (en ? 'Practice' : 'Practice')}</button>
    <div class="lt-head">
      <div class="kicker mono">BE-301 · HTTP Lab</div>
      <h1>HTTP Lab</h1>
      <p class="inst-honesty">${LAB_HONESTY[lang]}</p>
    </div>
    <div class="lab-presets">
      ${LAB_PRESETS.map((p, i) => `<button class="pill" data-pre="${i}">${p.label}</button>`).join('')}
    </div>
    <div class="inst-card">
      <label class="slabel">${en ? 'Method' : 'Method'}</label>
      <select id="labMethod" class="onb-input">
        ${['GET', 'POST', 'PUT', 'DELETE'].map((m) => `<option ${S.method === m ? 'selected' : ''}>${m}</option>`).join('')}
      </select>
      <label class="slabel mt10">${en ? 'Path' : 'Path'}</label>
      <input id="labPath" class="onb-input" value="${esc(S.path)}" />
      <label class="slabel mt10">${en ? 'Request headers' : 'Request headers'}</label>
      <textarea id="labHeaders" class="code-editor" rows="3" placeholder="Authorization: Bearer lab-token">${esc(S.headerText)}</textarea>
      <label class="slabel mt10">${en ? 'Body (JSON)' : 'Body (JSON)'}</label>
      <textarea id="labBody" class="code-editor" rows="5">${esc(S.body)}</textarea>
      <button class="btn accent mt10" id="labSend">${en ? 'Send' : 'Send'}</button>
    </div>
    <div class="slabel mt16">${en ? 'Response (status + headers + body)' : 'Response'}</div>
    <pre class="code-out" id="labOut">${S.last ? formatRes(S.last) : (en ? 'Send a request.' : 'Request bhejo.')}</pre>

    <div class="slabel mt16">${en ? 'Exercises (auto-grade)' : 'Exercises (auto-grade)'}</div>
    <div class="inst-list">
      ${grades.map((g) => `
        <div class="inst-row-item static">
          <span class="mono">${g.pass ? 'PASS' : '····'}</span>
          <span class="grow">${g.name[lang] || g.name.en}<br><span class="inst-muted">${g.detail[lang] || g.detail.en}</span></span>
        </div>`).join('')}
    </div>
    <p class="inst-muted mt10">${grades.filter((g) => g.pass).length}/${grades.length} ${en ? 'complete' : 'mukammal'} · ${history.length} ${en ? 'requests logged' : 'requests'}</p>
    <button class="btn secondary mt10" id="labSync">${en ? 'Sync PASS → BE-301 checklist' : 'PASS → BE-301 checklist'}</button>
  </div>`;

  document.getElementById('labBack')?.addEventListener('click', () => {
    const back = App._labReturn || 'practice';
    App._labReturn = null;
    if (back === 'lesson' && App._lesson) {
      App.tab = 'lesson';
      App.render();
      App.renderNav();
      return;
    }
    App.navigate('practice');
  });
  document.querySelectorAll('[data-pre]').forEach((b) => b.addEventListener('click', () => {
    const p = LAB_PRESETS[+b.dataset.pre];
    S.method = p.method; S.path = p.path; S.body = p.body; S.headerText = p.headers || '';
    App.render();
  }));
  document.getElementById('labSend')?.addEventListener('click', () => {
    S.method = document.getElementById('labMethod').value;
    S.path = document.getElementById('labPath').value.trim();
    S.body = document.getElementById('labBody').value;
    S.headerText = document.getElementById('labHeaders').value;
    const headers = parseHeaderBox(S.headerText);
    S.last = handleLabRequest({ ...S, headers });
    const next = getInstitute();
    next.labHistory = [...(next.labHistory || []), {
      method: S.method, path: S.path, status: S.last.status, at: Date.now(),
    }].slice(-40);
    setInstitute(next);
    App.render();
  });
  document.getElementById('labSync')?.addEventListener('click', () => {
    const g = gradeLabExercises(getInstitute().labHistory || []);
    const ids = new Set(['get', 'post', 'err', 'auth', 'put']);
    let n = 0;
    g.forEach((row) => {
      if (row.pass && ids.has(row.id)) {
        attestProject('BE-301', row.id, true);
        n += 1;
      }
    });
    alert(en
      ? `Synced ${n} PASS checklist items to BE-301 (${g.filter((x) => x.pass).length}/${g.length} lab exercises passed).`
      : `${n} PASS → BE-301 checklist (${g.filter((x) => x.pass).length}/${g.length} lab PASS).`);
  });
}
