/**
 * Institute gallery — 12 shots (6 mobile + 6 desktop) into docs/screenshots/gallery/.
 * Run: npm run gallery
 */
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'docs', 'screenshots', 'gallery');
const VIEWPORTS = { mobile: { width: 393, height: 852 }, desktop: { width: 1280, height: 800 } };

function contentType(p) {
  if (p.endsWith('.html')) return 'text/html';
  if (p.endsWith('.js')) return 'text/javascript';
  if (p.endsWith('.css')) return 'text/css';
  if (p.endsWith('.webmanifest')) return 'application/manifest+json';
  if (p.endsWith('.woff2')) return 'font/woff2';
  if (p.endsWith('.png')) return 'image/png';
  return 'application/octet-stream';
}

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let url = decodeURIComponent((req.url || '/').split('?')[0]);
      if (url === '/') url = '/index.html';
      const file = path.join(root, url.replace(/^\//, ''));
      if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404); res.end('missing'); return;
      }
      res.writeHead(200, { 'Content-Type': contentType(file), 'Cache-Control': 'no-store' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, base: `http://127.0.0.1:${server.address().port}` }));
  });
}

async function dismissSheets(page) {
  await page.evaluate(() => {
    try { localStorage.setItem('masterycap:readingGuideSeen', 'true'); } catch (e) { /* ignore */ }
    try { localStorage.setItem('masterycap:tourDone', 'true'); } catch (e) { /* ignore */ }
  }).catch(() => {});
  await page.locator('#tourSkip').click({ timeout: 800 }).catch(() => {});
  for (let i = 0; i < 6; i++) {
    const closed = await page.locator('.sheet-root.on [data-close], .sheet-root.on .sheet-x, #mbDismiss, #backupDismiss, #corruptKeep, #first-backup-sheet [data-close]')
      .first().click({ timeout: 400 }).then(() => true).catch(() => false);
    if (!closed) break;
    await page.waitForTimeout(80);
  }
}

async function onboard(page) {
  await page.waitForSelector('#onbNext, #tabbar', { timeout: 15000 });
  if (await page.locator('#tabbar:not(.hidden)').count()) { await dismissSheets(page); return; }
  await page.locator('#onbNext').click();
  await page.locator('#onbNext').click();
  await page.locator('#onbName').fill('Gallery');
  await page.locator('#onbNext').click();
  await page.locator('[data-field="ageBand"][data-val="18-24"]').click();
  await page.locator('#onbNext').click();
  await page.locator('[data-field="language"][data-val="en"]').click();
  await page.locator('#onbNext').click();
  await page.locator('[data-field="buildExp"][data-val="never"]').click();
  await page.locator('#onbNext').click();
  await page.locator('[data-field="goal"][data-val="apps"]').click();
  await page.locator('#onbNext').click();
  await page.locator('[data-field="timeBand"][data-val="2-5"]').click();
  await page.locator('#onbNext').click();
  await page.locator('#onbNext').click();
  await page.waitForSelector('#tabbar:not(.hidden)');
  await dismissSheets(page);
  await page.locator('#first-backup-sheet [data-close]').first().click({ timeout: 800 }).catch(() => {});
}

async function shot(page, shots, vpName, idx, label, route, fileSlug) {
  await dismissSheets(page);
  await page.waitForTimeout(400);
  const file = `${vpName}-${String(idx).padStart(2, '0')}-${fileSlug}.png`;
  await page.screenshot({ path: path.join(outDir, file) });
  shots.push({ file, label, route, viewport: vpName });
  console.log('shot', file);
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const { server, base } = await startServer();
  const browser = await chromium.launch();
  const shots = [];

  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    await onboard(page);

    let n = 1;
    await page.locator('#tabbar button[data-tab="today"]').click();
    await shot(page, shots, vpName, n++, 'Today', '[data-tab=today]', 'today');

    await page.locator('#tabbar button[data-tab="campus"]').click();
    await shot(page, shots, vpName, n++, 'Campus schools', '[data-tab=campus]', 'campus');

    await page.locator('[data-school="money"]').click();
    await page.waitForTimeout(200);
    await shot(page, shots, vpName, n++, 'School of Money', '[data-school=money]', 'money');

    await page.locator('#tabbar button[data-tab="practice"]').click();
    await page.waitForTimeout(200);
    await shot(page, shots, vpName, n++, 'Practice', '[data-tab=practice]', 'practice');

    await page.locator('#prLab').click();
    await page.waitForTimeout(300);
    await shot(page, shots, vpName, n++, 'HTTP Lab', 'http-lab', 'httplab');

    await page.locator('#labBack').click().catch(() => {});
    await page.locator('#tabbar button[data-tab="records"]').click();
    await page.waitForTimeout(200);
    await shot(page, shots, vpName, n++, 'Records', '[data-tab=records]', 'records');

    await ctx.close();
  }

  const version = JSON.parse(fs.readFileSync(path.join(root, 'VERSION.json'), 'utf8')).version;
  shots.sort((a, b) => a.file.localeCompare(b.file));
  fs.writeFileSync(path.join(outDir, 'gallery-manifest.json'),
    JSON.stringify({ app: 'MasteryCap', version, generated: new Date().toISOString(), shots }, null, 2));
  await browser.close();
  server.close();
  console.log(`done: ${shots.length} shots`);
  if (shots.length !== 12) {
    console.warn(`expected 12 shots, got ${shots.length}`);
    process.exitCode = 1;
  }
})().catch((e) => { console.error(e); process.exit(1); });
