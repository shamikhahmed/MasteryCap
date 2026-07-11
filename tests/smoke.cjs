/**
 * Playwright smoke — boots, onboard, one lesson/track sample, quiz, trade, no pageerror.
 * Screenshots @375/390/430.
 */
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'test-results', 'smoke');

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
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, base: `http://127.0.0.1:${server.address().port}` });
    });
  });
}

async function onboard(page) {
  await page.waitForSelector('#onbNext, #tabbar', { timeout: 15000 });
  if (await page.locator('#tabbar:not(.hidden)').count()) return;
  await page.locator('#onbNext').click();
  await page.locator('#onbName').fill('Smoke');
  await page.locator('#onbNext').click();
  await page.locator('[data-exp="new"]').click();
  await page.locator('#onbNext').click();
  await page.locator('[data-mkt="crypto"]').click();
  await page.locator('#onbNext').click();
  await page.waitForSelector('#tabbar:not(.hidden)');
  // dismiss 3-step tour if present
  for (let i = 0; i < 4; i++) {
    const next = page.locator('#tourNext');
    if (!(await next.count())) break;
    await next.click();
    await page.waitForTimeout(100);
  }
  // dismiss what's-new / streak sheets
  await page.locator('.sheet-root.on [data-close], .sheet-root.on .sheet-x').first().click({ timeout: 500 }).catch(() => {});
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const errors = [];
  const { server, base } = await startServer();
  const browser = await chromium.launch({ headless: true });
  let failed = false;

  try {
    for (const width of [375, 390, 430]) {
      const context = await browser.newContext({ viewport: { width, height: 812 } });
      const page = await context.newPage();
      page.on('pageerror', (e) => errors.push(`${width}:${e.message}`));

      await page.goto(base + '/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(800);
      await onboard(page);

      await page.evaluate(() => {
        localStorage.setItem('masterycap:course', JSON.stringify({
          crypto: { placementDone: true, weekStatus: { 1: 'current' }, xp: 0 },
        }));
      });
      await page.locator('#tabbar button').filter({ hasText: /Home/i }).click();
      await page.locator('#mbDismiss').click({ timeout: 800 }).catch(() => {});
      await page.locator('#backupDismiss').click({ timeout: 800 }).catch(() => {});
      await page.locator('#corruptKeep').click({ timeout: 800 }).catch(() => {});
      await page.locator('#editBal').click();
      await page.locator('#eqEditIn').fill('321.5');
      await page.locator('#eqSave').click();
      await page.waitForTimeout(100);
      const balTxt = await page.locator('#eqBal').textContent();
      if (!String(balTxt).includes('321.5')) throw new Error('edit bal failed: ' + balTxt);

      await page.locator('#tabbar button').filter({ hasText: /Learn|Seekho/i }).click();
      await page.waitForTimeout(300);
      await page.locator('[data-week]').first().click();
      await page.waitForSelector('.lesson-body');
      await page.screenshot({ path: path.join(outDir, `lesson-${width}.png`), fullPage: true });

      if (width === 375) {
        await page.locator('#startQuiz').click();
        await page.waitForSelector('#submitQuiz');
        const corrects = await page.evaluate(async () => {
          const { TRACKS } = await import(new URL('./js/data/tracks.js', location.href).href);
          return TRACKS[0].weeks[0].quiz.map((q) => q.correct);
        });
        for (let i = 0; i < corrects.length; i++) {
          await page.locator(`#qq${i} button[data-o="${corrects[i]}"]`).click();
        }
        await page.locator('#submitQuiz').click();
        await page.waitForTimeout(300);
        await page.locator('#quizDone').click().catch(() => {});
        await page.locator('#glossMiniSkip').click({ timeout: 1000 }).catch(() => {});
        await page.locator('#glossMiniDone').click({ timeout: 500 }).catch(() => {});

        page.on('dialog', (d) => d.accept());
        await page.locator('#tabbar button').filter({ hasText: /Journal/i }).click();
        await page.waitForSelector('#saveTrade');
        await page.locator('#btnLong').click();
        await page.locator('#pair').fill('BTC');
        await page.locator('#pl').fill('10');
        await page.locator('#saveTrade').click();
        await page.waitForTimeout(200);
        const n = await page.evaluate(() => JSON.parse(localStorage.getItem('masterycap:trades') || '[]').length);
        if (n < 1) { console.error('FAIL: trade not saved'); failed = true; }
      }

      await page.screenshot({ path: path.join(outDir, `home-${width}.png`) });
      await context.close();
    }

    if (errors.length) {
      console.error('pageerrors:', errors);
      failed = true;
    }
  } catch (e) {
    console.error(e);
    failed = true;
  } finally {
    await browser.close();
    server.close();
  }

  if (failed) process.exit(1);
  console.log('PASS smoke @375/390/430');
})();
