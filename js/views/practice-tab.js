/* Practice tab — SRS reviews + deep links to drills/sim for markets */

import { icon } from '../icons.js';
import {
  dueSrs, gradeSrs, srsCapForProfile, getInstitute,
} from '../institute/progress.js';
import { isOn } from '../institute/features.js';
import { renderCodeEditor, wireCodeEditor, isDesktopEditor } from '../institute/code-editor.js';

export function renderPracticeTab(App, el) {
  const en = App.lang === 'en';
  const cap = srsCapForProfile(App.profile || {});
  const due = dueSrs(cap);
  const session = App._srsSession;

  if (session && session.queue?.length) {
    return renderSrsCard(App, el, session, en);
  }

  const total = (getInstitute().srs || []).length;
  const labOn = isOn('httpLab');
  const editorOn = isOn('typedCodeEditor');
  const playground = editorOn
    ? renderCodeEditor({
      prompt: {
        en: 'Playground — try a function. Checks look for greet returning a string.',
        ur: 'Playground — function try karo. greet string return kare.',
      },
      starter: 'function greet(name) {\n  return "salam " + name;\n}\n',
      lang: App.lang,
    })
    : '';

  const labRow = labOn
    ? `<button class="inst-row-item" id="prLab">
        <span class="grow">${en ? 'HTTP Lab (simulated server)' : 'HTTP Lab (simulated)'}</span>
        <span class="mono">→</span>
      </button>`
    : '';

  el.innerHTML = `<div class="screen inst-screen">
    <div class="lt-head">
      <div class="kicker">${en ? 'Practice' : 'Practice'}</div>
      <h1>${en ? 'Reviews & labs' : 'Reviews & labs'}</h1>
      <p class="inst-muted">${en
        ? `Spaced repetition + market practice. Cap today: ${cap}`
        : `SRS + market practice. Cap: ${cap}`}</p>
    </div>
    <div class="inst-card accent-rule">
      <div class="mono" style="font-size:28px">${due.length}</div>
      <p class="inst-muted">${en ? 'Due now' : 'Ab due'} · ${total} ${en ? 'in deck' : 'deck mein'}</p>
      <button class="btn accent" id="prStart" ${due.length ? '' : 'disabled'}>${en ? 'Start review' : 'Review shuru'}</button>
    </div>
    <div class="slabel mt16">${en ? 'Labs' : 'Labs'}</div>
    <div class="inst-list">
      ${labRow}
      <button class="inst-row-item" id="prDrills">
        <span class="grow">${en ? 'Market drills' : 'Market drills'}</span>
        <span class="mono">→</span>
      </button>
      <button class="inst-row-item" id="prStudy">
        <span class="grow">${en ? 'Study desk' : 'Study desk'}</span>
        <span class="mono">→</span>
      </button>
      <button class="inst-row-item" id="prSim">
        <span class="grow">${en ? 'Paper trading lab' : 'Paper trading lab'}</span>
        <span class="mono">→</span>
      </button>
    </div>
    ${playground ? `<div class="mt16">${playground}</div>` : ''}
    ${editorOn ? `<p class="inst-foot-note">${isDesktopEditor()
      ? (en ? 'Desktop editor active (≥900px).' : 'Desktop editor active.')
      : (en ? 'Widen for typed editor; phone uses Parsons tap-order.' : 'Typed editor ke liye wide; phone pe Parsons.')}</p>` : ''}
    ${!labOn && !editorOn ? `<p class="inst-foot-note">${en ? 'HTTP Lab + typed code editor planned for v2.' : 'HTTP Lab + typed editor v2 mein.'}</p>` : ''}
  </div>`;

  document.getElementById('prStart')?.addEventListener('click', () => {
    App._srsSession = { queue: due.map((c) => c.id), i: 0, show: false };
    App.render();
  });
  document.getElementById('prLab')?.addEventListener('click', () => {
    App.tab = 'http-lab'; App.haptic(6); App.render(); App.renderNav();
  });
  document.getElementById('prDrills')?.addEventListener('click', () => App.openDrills());
  document.getElementById('prStudy')?.addEventListener('click', () => App.openStudy());
  document.getElementById('prSim')?.addEventListener('click', () => App.openSim());
  if (editorOn) {
    wireCodeEditor(
      'function greet(name) {\n  return "salam " + name;\n}\n',
      [{ name: 'greet returns string', run: 'typeof greet("a") === "string"' }],
    );
  }
}

function renderSrsCard(App, el, session, en) {
  const id = session.queue[session.i];
  const card = (getInstitute().srs || []).find((c) => c.id === id);
  if (!card) {
    App._srsSession = null;
    return renderPracticeTab(App, el);
  }
  const lang = App.lang === 'ur' ? 'ur' : 'en';
  const front = card.front?.[lang] || card.front?.en || '';
  const back = card.back?.[lang] || card.back?.en || '';

  el.innerHTML = `<div class="screen inst-screen">
    <div class="kicker mono">${session.i + 1}/${session.queue.length} · ${card.course}</div>
    <div class="inst-card srs-card">
      <div class="inst-h2">${esc(front)}</div>
      ${session.show ? `<hr class="inst-rule"/><p>${esc(back)}</p>` : ''}
    </div>
    ${!session.show
      ? `<button class="btn accent" id="srsShow">${en ? 'Show answer' : 'Jawab dikhao'}</button>`
      : `<div class="srs-grades">
          <button class="btn ghost" data-g="again">${en ? 'Again' : 'Again'}</button>
          <button class="btn secondary" data-g="hard">${en ? 'Hard' : 'Hard'}</button>
          <button class="btn secondary" data-g="good">${en ? 'Good' : 'Good'}</button>
          <button class="btn accent" data-g="easy">${en ? 'Easy' : 'Easy'}</button>
        </div>`}
    <button class="btn ghost mt16" id="srsExit">${en ? 'End session' : 'Session band'}</button>
  </div>`;

  document.getElementById('srsShow')?.addEventListener('click', () => {
    App._srsSession.show = true;
    App.render();
  });
  document.getElementById('srsExit')?.addEventListener('click', () => {
    App._srsSession = null;
    App.render();
  });
  el.querySelectorAll('[data-g]').forEach((b) => b.addEventListener('click', () => {
    gradeSrs(id, b.dataset.g);
    session.i += 1;
    session.show = false;
    if (session.i >= session.queue.length) {
      App._srsSession = null;
    }
    App.render();
  }));
}

function esc(s) {
  return String(s || '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
