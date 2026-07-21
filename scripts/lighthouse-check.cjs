/** Deterministic Lighthouse + static PWA release gate. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const chromeLauncher = require('chrome-launcher');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'test-results', 'lighthouse');
const thresholds = {
  performance: Number(process.env.LH_PERFORMANCE || 0.9),
  accessibility: Number(process.env.LH_ACCESSIBILITY || 0.9),
  'best-practices': Number(process.env.LH_BEST_PRACTICES || 0.9),
};

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
  const { default: lighthouse } = await import('lighthouse');
  const server = http.createServer((req, res) => {
    let url = decodeURIComponent((req.url || '/').split('?')[0]);
    if (url === '/') url = '/index.html';
    const file = path.join(root, url.replace(/^\//, ''));
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404); res.end('missing'); return;
    }
    const type = contentType(file);
    const compress = /^(text\/|application\/(?:manifest\+json|javascript|json))/.test(type)
      && /\bgzip\b/.test(req.headers['accept-encoding'] || '');
    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': 'no-store',
      ...(compress ? { 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' } : {}),
    });
    const stream = fs.createReadStream(file);
    if (compress) stream.pipe(zlib.createGzip()).pipe(res);
    else stream.pipe(res);
  });
  let chrome;
  try {
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const url = `http://127.0.0.1:${server.address().port}/`;
    chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });
    const result = await lighthouse(url, {
      port: chrome.port,
      output: 'json',
      onlyCategories: Object.keys(thresholds),
      formFactor: 'mobile',
      screenEmulation: { mobile: true, width: 375, height: 812, deviceScaleFactor: 2 },
      throttlingMethod: 'simulate',
    });

    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(result.lhr, null, 2));

    let failed = false;
    for (const [category, threshold] of Object.entries(thresholds)) {
      const score = result.lhr.categories[category]?.score;
      const ok = typeof score === 'number' && score >= threshold;
      console.log(`${ok ? 'PASS' : 'FAIL'} ${category}: ${score ?? 'missing'} (minimum ${threshold})`);
      if (!ok) failed = true;
    }
    const failingAudits = Object.values(result.lhr.audits)
      .filter((audit) => typeof audit.score === 'number' && audit.score < 0.9 && audit.scoreDisplayMode !== 'notApplicable')
      .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
      .slice(0, 8);
    failingAudits.forEach((audit) => console.log(`  ${audit.id}: ${audit.score} ${audit.title}`));

    const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
    const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    const swRegistration = fs.readFileSync(path.join(root, 'js', 'register-sw.js'), 'utf8');
    const icons = manifest.icons || [];
    const pwaChecks = [
      ['standalone display', ['standalone', 'fullscreen', 'minimal-ui'].includes(manifest.display)],
      ['start URL', typeof manifest.start_url === 'string' && manifest.start_url.length > 0],
      ['192px icon', icons.some((icon) => String(icon.sizes).split(/\s+/).includes('192x192'))],
      ['512px icon', icons.some((icon) => String(icon.sizes).split(/\s+/).includes('512x512'))],
      ['maskable icon', icons.some((icon) => String(icon.purpose || '').includes('maskable'))],
      ['service worker registration', /register-sw\.js/.test(index) && /serviceWorker\.register\(/.test(swRegistration)],
    ];
    pwaChecks.forEach(([name, ok]) => console.log(`${ok ? 'PASS' : 'FAIL'} PWA ${name}`));
    if (pwaChecks.some(([, ok]) => !ok)) failed = true;

    if (failed) process.exitCode = 1;
    else console.log('PASS: Lighthouse and PWA release gate');
  } finally {
    if (chrome) await chrome.kill();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((e) => { console.error(e); process.exit(1); });
