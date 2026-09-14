/* MST-P0-02 — learner code runs in a Worker, not on the app origin. */

const ASSERT_TIMEOUT_MS = 2000;
const ASSERT_LINE_CAP = 80;

const HARNESS = `
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

const WORKER_BODY = `
self.onmessage = function (ev) {
  var src = ev.data.src || '';
  var tests = ev.data.tests || [];
  var harness = ev.data.harness || '';
  var lineCap = ev.data.lineCap || 80;
  var lines = [];
  var passed = 0;
  function runBody(body) {
    return (new Function(harness + '\\n' + body))();
  }
  try {
    runBody(src + '\\n; return 1;');
    lines.push('Parse: OK');
  } catch (e) {
    self.postMessage({ lines: ['Parse FAIL: ' + (e && e.message ? e.message : e)], passed: 0, total: tests.length });
    return;
  }
  for (var i = 0; i < tests.length; i++) {
    var t = tests[i] || {};
    try {
      var ok = false;
      if (t.assert === 'eq') {
        var got = runBody(src + '\\n; return (' + t.expr + ');');
        ok = Object.is(got, t.expect) || got === t.expect
          || (typeof t.expect === 'object' && JSON.stringify(got) === JSON.stringify(t.expect));
        lines.push((ok ? 'PASS' : 'FAIL') + ': ' + t.name + ' (got ' + JSON.stringify(got) + ')');
      } else if (t.assert === 'throws') {
        var threw = false;
        try { runBody(src + '\\n; (' + t.expr + ');'); } catch (e2) { threw = true; }
        ok = threw;
        lines.push((ok ? 'PASS' : 'FAIL') + ': ' + t.name);
      } else {
        ok = !!(runBody(src + '\\n; return !!(' + (t.run || t.expr) + ');'));
        lines.push((ok ? 'PASS' : 'FAIL') + ': ' + t.name);
      }
      if (ok) passed += 1;
    } catch (e3) {
      lines.push('FAIL: ' + t.name + ' — ' + (e3 && e3.message ? e3.message : e3));
    }
  }
  if (!tests.length) lines.push('No asserts — self-check the prompt.');
  if (lines.length > lineCap) {
    lines = lines.slice(0, lineCap);
    lines.push('…output capped');
  }
  self.postMessage({ lines: lines, passed: passed, total: tests.length });
};
`;

/** @returns {Promise<{lines:string[],passed:number,total:number}>} */
export function runAsserts(src, tests = []) {
  return new Promise((resolve) => {
    let settled = false;
    let worker;
    const finish = (payload) => {
      if (settled) return;
      settled = true;
      try { worker && worker.terminate(); } catch (e) { /* ignore */ }
      resolve(payload);
    };
    try {
      const blob = new Blob([WORKER_BODY], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      worker = new Worker(url);
      URL.revokeObjectURL(url);
    } catch (e) {
      finish({ lines: [`Sandbox unavailable: ${e.message}`], passed: 0, total: tests.length });
      return;
    }
    const timer = setTimeout(() => {
      finish({ lines: ['FAIL: timed out (2s)'], passed: 0, total: tests.length });
    }, ASSERT_TIMEOUT_MS);
    worker.onmessage = (ev) => {
      clearTimeout(timer);
      finish(ev.data || { lines: ['FAIL: empty result'], passed: 0, total: tests.length });
    };
    worker.onerror = (err) => {
      clearTimeout(timer);
      finish({ lines: [`FAIL: ${err.message || 'worker error'}`], passed: 0, total: tests.length });
    };
    worker.postMessage({
      src: String(src || ''),
      tests,
      harness: HARNESS,
      lineCap: ASSERT_LINE_CAP,
    });
  });
}
