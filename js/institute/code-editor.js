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
      <div class="kicker">${en ? 'Code practice' : 'Code mashq'}</div>
      <p class="inst-muted">${prompt?.[lang] || prompt?.en || ''}</p>
      <label class="slabel" for="codeEditor">${en ? 'Editor' : 'Editor'}</label>
      <textarea id="codeEditor" class="code-editor" spellcheck="false" rows="12">${esc(starter || '')}</textarea>
      <div class="code-actions">
        <button class="btn accent" id="codeRun">${en ? 'Run asserts' : 'Asserts chalao'}</button>
        <button class="btn ghost" id="codeReset">${en ? 'Reset' : 'Reset'}</button>
      </div>
      <pre class="code-out" id="codeOut" role="status" aria-live="polite">${en ? 'Assert results appear here.' : 'Assert results yahan.'}</pre>
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
      <button class="btn ghost" id="codeReset">${en ? 'Shuffle reset' : 'Shuffle dubara'}</button>
    </div>
    <pre class="code-out" id="codeOut" role="status" aria-live="polite"></pre>
    <textarea id="codeEditor" class="hidden" hidden>${esc(starter || '')}</textarea>
  </div>`;
}

/**
 * Assert harness: tests are {name, run} where run is expression OR
 * {name, assert: 'eq'|'truthy'|'throws', expr, expect?}
 */
function sandboxWorkerMain() {
  const send = globalThis.postMessage.bind(globalThis);
  const secret = crypto.getRandomValues(new Uint32Array(4)).join('-');
  const deny = () => { throw new Error('Network and persistent storage are disabled in code practice.'); };
  ['fetch', 'indexedDB', 'caches', 'WebSocket', 'XMLHttpRequest', 'importScripts'].forEach((name) => {
    try { Object.defineProperty(globalThis, name, { value: deny, configurable: false, writable: false }); } catch (_) {}
  });
  send({ type: 'READY', secret });

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
  const execute = (src, suffix) => {
    // User code runs only in this opaque-origin, disposable worker.
    // eslint-disable-next-line no-new-func
    return new Function(`"use strict";\n${harness}\n${src}\n${suffix}`)();
  };

  globalThis.onmessage = (event) => {
    if (event.data?.type !== 'RUN') return;
    const src = String(event.data.src || '').slice(0, 50000);
    const tests = Array.isArray(event.data.tests) ? event.data.tests.slice(0, 50) : [];
    const lines = [];
    let passed = 0;
    try {
      execute(src, 'return 1;');
      lines.push('Parse: OK');
    } catch (error) {
      send({ type: 'RESULT', secret, result: { lines: [`Parse FAIL: ${error.message}`], passed: 0, total: tests.length } });
      return;
    }
    for (const test of tests) {
      try {
        let ok = false;
        if (test.assert === 'eq') {
          const got = execute(src, `return (${test.expr});`);
          ok = Object.is(got, test.expect) || got === test.expect
            || (typeof test.expect === 'object' && JSON.stringify(got) === JSON.stringify(test.expect));
          lines.push(`${ok ? 'PASS' : 'FAIL'}: ${test.name} (got ${JSON.stringify(got)})`);
        } else if (test.assert === 'throws') {
          let threw = false;
          try { execute(src, `(${test.expr});`); } catch (_) { threw = true; }
          ok = threw;
          lines.push(`${ok ? 'PASS' : 'FAIL'}: ${test.name}`);
        } else {
          ok = Boolean(execute(src, `return !!(${test.run || test.expr});`));
          lines.push(`${ok ? 'PASS' : 'FAIL'}: ${test.name}`);
        }
        if (ok) passed += 1;
      } catch (error) {
        lines.push(`FAIL: ${test.name} — ${error.message}`);
      }
    }
    if (!tests.length) lines.push('No asserts — self-check the prompt.');
    send({ type: 'RESULT', secret, result: { lines, passed, total: tests.length } });
  };
}

export function runAsserts(src, tests = [], { timeout = 1200 } = {}) {
  if (typeof document === 'undefined') {
    return Promise.resolve({ lines: ['Sandbox unavailable.'], passed: 0, total: tests.length });
  }
  return new Promise((resolve) => {
    const runId = crypto.getRandomValues(new Uint32Array(4)).join('-');
    const frame = document.createElement('iframe');
    frame.hidden = true;
    frame.setAttribute('sandbox', 'allow-scripts');
    frame.setAttribute('title', 'Isolated code practice runner');
    frame.src = new URL('sandbox-runner.html', document.baseURI).href;
    const finish = (result) => {
      clearTimeout(parentTimer);
      window.removeEventListener('message', onMessage);
      frame.remove();
      resolve(result);
    };
    const onMessage = (event) => {
      if (event.source !== frame.contentWindow || event.data?.runId !== runId) return;
      if (event.data.type === 'SANDBOX_RESULT') finish(event.data.result);
      if (event.data.type === 'SANDBOX_TIMEOUT') {
        finish({ lines: ['Run stopped: code exceeded time limit.'], passed: 0, total: tests.length });
      }
    };
    const parentTimer = setTimeout(() => {
      finish({ lines: ['Run stopped: sandbox did not respond.'], passed: 0, total: tests.length });
    }, timeout + 500);
    window.addEventListener('message', onMessage);
    frame.addEventListener('load', () => {
      frame.contentWindow.postMessage({
        type: 'INIT',
        runId,
        timeout,
        src: String(src || ''),
        tests,
        workerSource: `(${sandboxWorkerMain.toString()})();`,
      }, '*');
    }, { once: true });
    document.body.appendChild(frame);
  });
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

  document.getElementById('codeRun')?.addEventListener('click', async () => {
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
    const prefix = pool ? 'Order PASS.\n' : '';
    out.textContent = `${prefix}Running in isolated sandbox…`;
    const result = await runAsserts(src, tests);
    out.textContent = prefix + result.lines.join('\n')
      + (result.total ? `\n${result.passed}/${result.total} asserts` : '');
  });
}
