const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
let mode = 1;

function workerSource() {
  const cache = `masterycap-test-v${mode}`;
  const assets = mode === 2
    ? "const ASSETS = ['./blank.html', './required-missing.js'];"
    : "const ASSETS = ['./blank.html'];";
  return source
    .replace(/const CACHE = '[^']+';/, `const CACHE = '${cache}';`)
    .replace(/const ASSETS = \[[\s\S]*?\];/, assets);
}

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url || '/', 'http://localhost');
      if (url.pathname === '/blank.html') {
        res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' });
        res.end('<!doctype html><title>SW test</title><main>ready</main>');
        return;
      }
      if (url.pathname === '/sw-test.js') {
        res.writeHead(200, {
          'Content-Type': 'text/javascript',
          'Cache-Control': 'no-store',
          'Service-Worker-Allowed': '/',
        });
        res.end(workerSource());
        return;
      }
      if (url.pathname === '/fail.js' || url.pathname === '/required-missing.js') {
        res.writeHead(500, { 'Content-Type': 'text/javascript', 'Cache-Control': 'no-store' });
        res.end('throw new Error("intentional test failure")');
        return;
      }
      res.writeHead(404);
      res.end('missing');
    });
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, base: `http://127.0.0.1:${server.address().port}` });
    });
  });
}

async function cacheNames(page) {
  return page.evaluate(() => caches.keys());
}

async function waitForActive(page, cacheName) {
  await page.waitForFunction(async (name) => {
    const keys = await caches.keys();
    const reg = await navigator.serviceWorker.getRegistration('/sw-test.js');
    return keys.includes(name) && reg?.active?.state === 'activated';
  }, cacheName, { timeout: 15000 });
}

(async () => {
  const { server, base } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    await page.goto(`${base}/blank.html`);
    await page.evaluate(async () => {
      const foreign = await caches.open('ideacap-v999');
      await foreign.put('/foreign', new Response('keep'));
      await navigator.serviceWorker.register('/sw-test.js', { scope: '/' });
    });
    await waitForActive(page, 'masterycap-test-v1');

    mode = 2;
    await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.getRegistration('/sw-test.js');
      await reg.update();
    });
    await page.waitForTimeout(1200);
    let names = await cacheNames(page);
    if (!names.includes('masterycap-test-v1')) throw new Error('failed install removed last good cache');
    if (names.includes('masterycap-test-v2')) throw new Error('failed install left incomplete cache');
    if (!names.includes('ideacap-v999')) throw new Error('foreign app cache was deleted');

    mode = 3;
    await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.getRegistration('/sw-test.js');
      await reg.update();
    });
    await waitForActive(page, 'masterycap-test-v3');
    names = await cacheNames(page);
    if (!names.includes('masterycap-test-v1')) throw new Error('previous verified cache was not preserved');
    if (!names.includes('ideacap-v999')) throw new Error('foreign app cache was deleted after upgrade');

    await page.reload();
    await page.evaluate(() => fetch('/fail.js').catch(() => null));
    const cachedFailure = await page.evaluate(async () => {
      const cache = await caches.open('masterycap-test-v3');
      return Boolean(await cache.match('/fail.js'));
    });
    if (cachedFailure) throw new Error('non-success response was cached');

    await context.setOffline(true);
    await page.reload({ waitUntil: 'domcontentloaded' });
    if (!(await page.locator('main').count())) throw new Error('offline navigation fallback failed');

    console.log('PASS: SW lifecycle safety');
  } finally {
    await context.setOffline(false).catch(() => {});
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => {
  console.error(`FAIL: ${error.message}`);
  process.exit(1);
});
