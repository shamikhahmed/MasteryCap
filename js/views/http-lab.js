/* HTTP Lab screen */

import { icon } from '../icons.js';
import { handleLabRequest, LAB_HONESTY, LAB_PRESETS } from '../institute/http-lab.js';
import { store, KEYS } from '../store.js';
import { getInstitute, setInstitute, attestProject } from '../institute/progress.js';

export function renderHttpLab(App, el) {
  const en = App.lang === 'en';
  const lang = en ? 'en' : 'ur';
  const S = App._lab || { method: 'GET', path: '/notes', body: '', last: null };
  App._lab = S;

  el.innerHTML = `<div class="screen inst-screen">
    <button class="text-back" id="labBack">${icon('back', { size: 16 })} ${en ? 'Practice' : 'Practice'}</button>
    <div class="lt-head">
      <div class="kicker mono">BE-301 · HTTP Lab</div>
      <h1>${en ? 'HTTP Lab' : 'HTTP Lab'}</h1>
      <p class="inst-honesty">${LAB_HONESTY[lang]}</p>
    </div>
    <div class="lab-presets">
      ${LAB_PRESETS.map((p, i) => `<button class="pill" data-pre="${i}">${p.label}</button>`).join('')}
    </div>
    <div class="inst-card">
      <label class="slabel">${en ? 'Method' : 'Method'}</label>
      <select id="labMethod" class="onb-input">
        ${['GET', 'POST', 'DELETE'].map((m) => `<option ${S.method === m ? 'selected' : ''}>${m}</option>`).join('')}
      </select>
      <label class="slabel mt10">${en ? 'Path' : 'Path'}</label>
      <input id="labPath" class="onb-input" value="${esc(S.path)}" />
      <label class="slabel mt10">${en ? 'Body (JSON)' : 'Body (JSON)'}</label>
      <textarea id="labBody" class="code-editor" rows="6">${esc(S.body)}</textarea>
      <button class="btn accent mt10" id="labSend">${en ? 'Send' : 'Send'}</button>
    </div>
    <div class="slabel mt16">${en ? 'Response' : 'Response'}</div>
    <pre class="code-out" id="labOut">${S.last ? formatRes(S.last) : (en ? 'Send a request.' : 'Request bhejo.')}</pre>
    <button class="btn secondary mt16" id="labAttest">${en ? 'Mark lab exercises done (BE-301 project)' : 'Lab exercises done mark (BE-301)'}</button>
  </div>`;

  document.getElementById('labBack')?.addEventListener('click', () => App.navigate('practice'));
  document.querySelectorAll('[data-pre]').forEach((b) => b.addEventListener('click', () => {
    const p = LAB_PRESETS[+b.dataset.pre];
    S.method = p.method; S.path = p.path; S.body = p.body;
    App.render();
  }));
  document.getElementById('labSend')?.addEventListener('click', () => {
    S.method = document.getElementById('labMethod').value;
    S.path = document.getElementById('labPath').value.trim();
    S.body = document.getElementById('labBody').value;
    S.last = handleLabRequest(S);
    // track lab usage for project
    const inst = getInstitute();
    inst.labHits = (inst.labHits || 0) + 1;
    if (S.last.status === 200 || S.last.status === 201) inst.labGet = true;
    if (S.method === 'POST' && S.last.status === 201) inst.labPost = true;
    if (S.last.status === 404) inst.lab404 = true;
    setInstitute(inst);
    App.render();
  });
  document.getElementById('labAttest')?.addEventListener('click', () => {
    const inst = getInstitute();
    if (inst.labGet) attestProject('BE-301', 'get', true);
    if (inst.labPost) attestProject('BE-301', 'post', true);
    if (inst.lab404) attestProject('BE-301', 'err', true);
    alert(en ? 'Checklist updated from lab activity where possible.' : 'Lab activity se checklist update.');
  });
}

function formatRes(r) {
  return `HTTP ${r.status}\n${Object.entries(r.headers || {}).map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${r.body || ''}`;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
