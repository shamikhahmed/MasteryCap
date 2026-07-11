/**
 * Screen gallery capture — 4 tabs x mobile/desktop into docs/screenshots/gallery/.
 * Reuses smoke.cjs server + onboard pattern. Run: npm run gallery
 */
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'docs', 'screenshots', 'gallery');
const TABS = ['dashboard', 'learn', 'journal', 'progress'];
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
  await page.locator('#onbName').fill('Gallery');
  await page.locator('#onbNext').click();
  await page.locator('[data-exp="new"]').click();
  await page.locator('#onbNext').click();
  await page.locator('[data-mkt="foundations"]').click();
  await page.locator('#onbNext').click();
  await page.waitForSelector('#tabbar:not(.hidden)');
  await dismissSheets(page);
  await page.locator('#first-backup-sheet [data-close]').first().click({ timeout: 800 }).catch(() => {});
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const { server, base } = await startServer();
  const browser = await chromium.launch();
  const shots = [];

  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto(base);
    await onboard(page);

    for (const [i, tab] of TABS.entries()) {
      await page.locator(`[data-tab="${tab}"]`).first().click();
      await page.waitForTimeout(600);
      await dismissSheets(page);
      const file = `${vpName}-${String(i + 1).padStart(2, '0')}-${tab}.png`;
      await page.screenshot({ path: path.join(outDir, file) });
      shots.push({ file, label: tab[0].toUpperCase() + tab.slice(1), route: `[data-tab="${tab}"]`, viewport: vpName });
      console.log('shot', file);
    }
    await ctx.close();
  }

  const version = JSON.parse(fs.readFileSync(path.join(root, 'VERSION.json'), 'utf8')).version;
  shots.sort((a, b) => a.file.localeCompare(b.file));
  fs.writeFileSync(path.join(outDir, 'gallery-manifest.json'),
    JSON.stringify({ app: 'MasteryCap', version, generated: new Date().toISOString(), shots }, null, 2));
  await browser.close();
  server.close();
  console.log(`done: ${shots.length} shots`);
})().catch((e) => { console.error(e); process.exit(1); });
