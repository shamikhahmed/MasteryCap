/** Lighthouse PWA checks — serve static root, assert installability-ish categories. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const root = path.join(__dirname, '..');

function contentType(p) {
  if (p.endsWith('.html')) return 'text/html';
  if (p.endsWith('.js')) return 'text/javascript';
  if (p.endsWith('.css')) return 'text/css';
  if (p.endsWith('.webmanifest')) return 'application/manifest+json';
  if (p.endsWith('.woff2')) return 'font/woff2';
  if (p.endsWith('.png')) return 'image/png';
  return 'application/octet-stream';
}

(async () => {
  const server = http.createServer((req, res) => {
    let url = decodeURIComponent((req.url || '/').split('?')[0]);
    if (url === '/') url = '/index.html';
    const file = path.join(root, url.replace(/^\//, ''));
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404); res.end('missing'); return;
    }
    res.writeHead(200, { 'Content-Type': contentType(file) });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const url = `http://127.0.0.1:${port}/`;

  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--no-sandbox'] });
  const result = await lighthouse(url, {
    port: chrome.port,
    output: 'json',
    onlyCategories: ['pwa', 'best-practices'],
    formFactor: 'mobile',
    screenEmulation: { mobile: true, width: 375, height: 812, deviceScaleFactor: 2 },
  });
  await chrome.kill();
  server.close();

  const cats = result.lhr.categories;
  const pwa = cats.pwa?.score;
  const bp = cats['best-practices']?.score;
  console.log('PWA score:', pwa, 'Best-practices:', bp);

  const audits = result.lhr.audits;
  const need = [
    'installable-manifest',
    'service-worker',
    'viewport',
    'themed-omnibox',
    'maskable-icon',
  ];
  let fail = 0;
  for (const id of need) {
    const a = audits[id];
    if (!a) { console.log('SKIP', id); continue; }
    const ok = a.score === 1 || a.score === null;
    console.log(ok ? 'PASS' : 'FAIL', id, a.score, a.title);
    if (a.score !== null && a.score < 1) fail++;
  }

  // Soft: PWA category may be null in LH 12 (category removed) — rely on audits
  if (fail) process.exit(1);
  console.log('PASS lighthouse PWA audits');
})().catch((e) => { console.error(e); process.exit(1); });
