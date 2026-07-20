/* Code practice — desktop editor + phone Parsons + assert harness */

export function isDesktopEditor() {
  return window.matchMedia('(min-width: 900px)').matches;
}

function esc(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

/** Split starter into Parsons lines (non-empty). */
export function parsonsLines(starter = '') {
  return String(starter).split('\n').map((l) => l.replace(/\s+$/, '')).filter((l) => l.length);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function renderCodeEditor({ prompt, starter, lang = 'en', parsons = null }) {
  const en = lang !== 'ur';
  const lines = parsons?.length ? parsons : parsonsLines(starter);
  const desktop = isDesktopEditor();

  if (desktop) {
    return `<div class="code-lab">
      <div class="kicker">${en ? 'Code practice' : 'Code practice'}</div>
      <p class="inst-muted">${prompt?.[lang] || prompt?.en || ''}</p>
      <label class="slabel" for="codeEditor">${en ? 'Editor' : 'Editor'}</label>
      <textarea id="codeEditor" class="code-editor" spellcheck="false" rows="12">${esc(starter || '')}</textarea>
      <div class="code-actions">
        <button class="btn accent" id="codeRun">${en ? 'Run asserts' : 'Asserts chalao'}</button>
        <button class="btn ghost" id="codeReset">${en ? 'Reset' : 'Reset'}</button>
      </div>
      <pre class="code-out" id="codeOut">${en ? 'Assert results appear here.' : 'Assert results yahan.'}</pre>
    </div>`;
  }

  // Phone: Parsons tap-order (pool → built; each pool line once)
  const shuffled = shuffle(lines.map((t, i) => ({ t, i })));
  return `<div class="code-lab parsons-lab">
    <div class="kicker">${en ? 'Parsons (phone)' : 'Parsons (phone)'}</div>
    <p class="inst-muted">${prompt?.[lang] || prompt?.en || ''}</p>
    <p class="inst-muted">${en
      ? 'Tap pool to add a line. Tap your order to remove. Each pool line once.'
      : 'Pool tap = add. Order tap = hatao. Har pool line ek dafa.'}</p>
    <div class="slabel">${en ? 'Your order' : 'Tumhara order'}</div>
    <div class="parsons-built" id="parsonsBuilt"></div>
    <div class="slabel mt10">${en ? 'Pool' : 'Pool'}</div>
    <div class="parsons-pool" id="parsonsPool">
      ${shuffled.map((row, idx) => `
        <button type="button" class="parsons-line" data-pi="${idx}" data-text="${esc(row.t)}"><code>${esc(row.t) || '⏎'}</code></button>
      `).join('')}
    </div>
    <div class="code-actions">
      <button class="btn accent" id="codeRun">${en ? 'Check order + asserts' : 'Order + asserts'}</button>
      <button class="btn ghost" id="codeReset">${en ? 'Shuffle reset' : 'Shuffle reset'}</button>
    </div>
    <pre class="code-out" id="codeOut"></pre>
    <textarea id="codeEditor" class="hidden" hidden>${esc(starter || '')}</textarea>
  </div>`;
}

/**
 * Assert harness: tests are {name, run} where run is expression OR
 * {name, assert: 'eq'|'truthy'|'throws', expr, expect?}
 */
export function runAsserts(src, tests = []) {
  const lines = [];
  let passed = 0;
  const harness = `
var __els = Object.create(null);
var document = {
  querySelector: function(sel) {
    if (!__els[sel]) __els[sel] = { textContent: '', className: String(sel).replace(/^\\./, ''), _sel: sel };
    return __els[sel];
  },
  querySelectorAll: function(sel) { return [document.querySelector(sel)]; },
  createElement: function(tag) { return { tagName: String(tag).toUpperCase(), textContent: '' }; },
};
var __ls = Object.create(null);
var localStorage = {
  setItem: function(k, v) { __ls[k] = String(v); },
  getItem: function(k) { return Object.prototype.hasOwnProperty.call(__ls, k) ? __ls[k] : null; },
  removeItem: function(k) { delete __ls[k]; },
};
`;
  try {
    // eslint-disable-next-line no-new-func
    new Function(`${harness}\n${src}\n; return 1;`)();
    lines.push('Parse: OK');
  } catch (e) {
    return { lines: [`Parse FAIL: ${e.message}`], passed: 0, total: tests.length };
  }

  for (const t of tests) {
    try {
      let ok = false;
      if (t.assert === 'eq') {
        // eslint-disable-next-line no-new-func
        const got = new Function(`${harness}\n${src}\n; return (${t.expr});`)();
        ok = Object.is(got, t.expect) || got === t.expect
          || (typeof t.expect === 'object' && JSON.stringify(got) === JSON.stringify(t.expect));
        lines.push(`${ok ? 'PASS' : 'FAIL'}: ${t.name} (got ${JSON.stringify(got)})`);
      } else if (t.assert === 'throws') {
        let threw = false;
        try {
          // eslint-disable-next-line no-new-func
          new Function(`${harness}\n${src}\n; (${t.expr});`)();
        } catch (e) { threw = true; }
        ok = threw;
        lines.push(`${ok ? 'PASS' : 'FAIL'}: ${t.name}`);
      } else {
        // eslint-disable-next-line no-new-func
        ok = !!(new Function(`${harness}\n${src}\n; return !!(${t.run || t.expr});`)());
        lines.push(`${ok ? 'PASS' : 'FAIL'}: ${t.name}`);
      }
      if (ok) passed += 1;
    } catch (e) {
      lines.push(`FAIL: ${t.name} — ${e.message}`);
    }
  }
  if (!tests.length) lines.push('No asserts — self-check the prompt.');
  return { lines, passed, total: tests.length };
}

export function wireCodeEditor(starter, tests = [], correctParsons = null) {
  const out = document.getElementById('codeOut');
  const area = document.getElementById('codeEditor');
  if (!out) return;

  const built = []; // { text, pi }
  const pool = document.getElementById('parsonsPool');
  const builtEl = document.getElementById('parsonsBuilt');
  const poolItems = pool
    ? [...pool.querySelectorAll('[data-pi]')].map((el) => ({
      el,
      text: el.dataset.text || '',
      pi: el.dataset.pi,
      used: false,
    }))
    : [];

  function syncPoolUI() {
    poolItems.forEach((item) => {
      item.el.disabled = item.used;
      item.el.classList.toggle('used', item.used);
      item.el.setAttribute('aria-disabled', item.used ? 'true' : 'false');
    });
  }

  function paintBuilt() {
    if (!builtEl) return;
    builtEl.innerHTML = built.length
      ? built.map((row, i) => `<button type="button" class="parsons-line on" data-bi="${i}"><code>${esc(row.text)}</code></button>`).join('')
      : '<span class="inst-muted">—</span>';
    builtEl.querySelectorAll('[data-bi]').forEach((b) => b.addEventListener('click', () => {
      const removed = built.splice(+b.dataset.bi, 1)[0];
      const item = poolItems.find((p) => p.pi === removed.pi);
      if (item) item.used = false;
      syncPoolUI();
      paintBuilt();
    }));
  }

  if (pool) {
    poolItems.forEach((item) => {
      item.el.addEventListener('click', () => {
        if (item.used) return;
        item.used = true;
        built.push({ text: item.text, pi: item.pi });
        syncPoolUI();
        paintBuilt();
      });
    });
    syncPoolUI();
    paintBuilt();
  }

  document.getElementById('codeReset')?.addEventListener('click', () => {
    if (pool) {
      built.length = 0;
      poolItems.forEach((item) => { item.used = false; });
      const kids = [...pool.children];
      shuffle(kids).forEach((k) => pool.appendChild(k));
      syncPoolUI();
      paintBuilt();
      out.textContent = 'Shuffled. Pool lines free again.';
      return;
    }
    if (area) {
      area.value = starter || '';
      out.textContent = 'Reset.';
    }
  });

  document.getElementById('codeRun')?.addEventListener('click', () => {
    let src = area ? area.value : '';
    if (pool) {
      src = built.map((r) => r.text).join('\n');
      const expect = correctParsons || parsonsLines(starter);
      const orderOk = built.length === expect.length && built.every((row, i) => row.text === expect[i]);
      if (!orderOk) {
        out.textContent = `Order FAIL.\nExpected ${expect.length} lines in starter order.`;
        return;
      }
      out.textContent = 'Order PASS.\n';
    }
    const result = runAsserts(src, tests);
    out.textContent = (pool ? out.textContent : '') + result.lines.join('\n')
      + (result.total ? `\n${result.passed}/${result.total} asserts` : '');
  });
}
