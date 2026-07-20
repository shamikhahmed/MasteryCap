/* Desktop typed code editor — practiceCode lessons + Practice tab playground */

export function isDesktopEditor() {
  return window.matchMedia('(min-width: 900px)').matches;
}

export function renderCodeEditor({ prompt, starter, lang = 'en' }) {
  const en = lang !== 'ur';
  return `<div class="code-lab">
    <div class="kicker">${en ? 'Code practice' : 'Code practice'}</div>
    <p class="inst-muted">${prompt?.[lang] || prompt?.en || ''}</p>
    ${isDesktopEditor()
      ? `<label class="slabel" for="codeEditor">${en ? 'Editor' : 'Editor'}</label>
         <textarea id="codeEditor" class="code-editor" spellcheck="false" rows="12">${esc(starter || '')}</textarea>
         <div class="code-actions">
           <button class="btn accent" id="codeRun">${en ? 'Run checks' : 'Checks chalao'}</button>
           <button class="btn ghost" id="codeReset">${en ? 'Reset' : 'Reset'}</button>
         </div>
         <pre class="code-out" id="codeOut">${en ? 'Output appears here.' : 'Output yahan.'}</pre>`
      : `<div class="inst-card">
           <p class="inst-muted">${en
             ? 'On phone: write in Notes / a code app, then continue. Full typed editor unlocks on wider screens (≥900px).'
             : 'Phone pe: Notes/code app mein likho, phir aage. Typed editor ≥900px pe.'}</p>
           <pre class="code-starter">${esc(starter || '')}</pre>
         </div>`}
  </div>`;
}

export function wireCodeEditor(starter, tests = []) {
  const area = document.getElementById('codeEditor');
  const out = document.getElementById('codeOut');
  if (!area || !out) return;

  document.getElementById('codeReset')?.addEventListener('click', () => {
    area.value = starter || '';
    out.textContent = 'Reset.';
  });
  document.getElementById('codeRun')?.addEventListener('click', () => {
    const src = area.value;
    const lines = [];
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(`${src}\n; return { ok: true };`);
      fn();
      lines.push('Parsed OK.');
      for (const t of tests) {
        try {
          // eslint-disable-next-line no-new-func
          const check = new Function(`${src}\n; return !!(${t.run});`);
          const pass = check();
          lines.push(`${pass ? 'PASS' : 'FAIL'}: ${t.name}`);
        } catch (e) {
          lines.push(`FAIL: ${t.name} — ${e.message}`);
        }
      }
      if (!tests.length) lines.push('No automated tests — self-check the prompt.');
    } catch (e) {
      lines.push('Syntax error: ' + e.message);
    }
    out.textContent = lines.join('\n');
  });
}

function esc(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}
