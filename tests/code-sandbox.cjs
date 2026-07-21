const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = decodeURIComponent((req.url || '/').split('?')[0]);
      if (url === '/' || url === '/blank.html') {
        res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' });
        res.end('<!doctype html><title>Sandbox test</title><body></body>');
        return;
      }
      const file = path.join(root, url.replace(/^\//, ''));
      if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404);
        res.end('missing');
        return;
      }
      res.writeHead(200, { 'Content-Type': file.endsWith('.js') ? 'text/javascript' : 'application/octet-stream', 'Cache-Control': 'no-store' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, base: `http://127.0.0.1:${server.address().port}` });
    });
  });
}

(async () => {
  const { server, base } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(`${base}/blank.html`);
    const result = await page.evaluate(async () => {
      const { runAsserts } = await import('/js/institute/code-editor.js');
      localStorage.setItem('masterycap:sentinel', 'safe');
      const normal = await runAsserts(
        'function add(a, b) { return a + b; }',
        [{ name: 'adds', assert: 'eq', expr: 'add(2, 3)', expect: 5 }]
      );
      const spoof = await runAsserts(
        'postMessage({ type: "RESULT", secret: "fake", result: { passed: 999 } }); localStorage.setItem("masterycap:sentinel", "pwned"); function value(){ return 7; }',
        [{ name: 'real result only', assert: 'eq', expr: 'value()', expect: 7 }]
      );
      const blocked = await runAsserts('fetch("https://example.com");', []);
      const started = performance.now();
      const timeout = await runAsserts('while (true) {}', [], { timeout: 250 });
      return {
        normal,
        spoof,
        blocked,
        timeout,
        elapsed: performance.now() - started,
        sentinel: localStorage.getItem('masterycap:sentinel'),
      };
    });

    if (result.normal.passed !== 1 || result.spoof.passed !== 1) {
      throw new Error(`valid asserts or spoof filtering failed: ${JSON.stringify({ normal: result.normal, spoof: result.spoof })}`);
    }
    if (result.sentinel !== 'safe') throw new Error('sandbox reached parent localStorage');
    if (!result.blocked.lines[0].includes('disabled')) throw new Error('sandbox allowed network API');
    if (!result.timeout.lines[0].includes('time') || result.elapsed > 1800) throw new Error('infinite loop was not terminated');
    await page.evaluate(() => { document.body.dataset.responsive = 'yes'; });
    if (await page.locator('body').getAttribute('data-responsive') !== 'yes') throw new Error('page unresponsive after timeout');
    console.log('PASS: code runner isolates storage/network/spoofs and terminates loops');
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => {
  console.error(`FAIL: ${error.message}`);
  process.exit(1);
});
