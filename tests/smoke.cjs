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
  if (await page.locator('#tabbar:not(.hidden)').count()) {
    await dismissSheets(page);
    return;
  }
  // Prefer skip for reliability — still issues Student ID + Markets soft-start
  if (await page.locator('#onbSkip').count()) {
    await page.locator('#onbSkip').click();
    await page.waitForSelector('#tabbar:not(.hidden)', { timeout: 10000 });
    await page.waitForTimeout(450);
    await dismissSheets(page);
    await page.locator('#first-backup-sheet [data-close]').first().click({ timeout: 800 }).catch(() => {});
    await page.evaluate(() => {
      document.querySelectorAll('.sheet-root.on').forEach((el) => el.classList.remove('on'));
    });
    return;
  }
  await page.locator('#onbNext').click();
  await page.locator('#onbNext').click();
  await page.locator('#onbName').fill('Smoke');
  await page.locator('#onbNext').click();
  await page.locator('[data-field="ageBand"][data-val="18-24"]').click();
  await page.locator('#onbNext').click();
  await page.locator('[data-field="language"][data-val="en"]').click();
  await page.locator('#onbNext').click();
  await page.locator('[data-field="buildExp"][data-val="never"]').click();
  await page.locator('#onbNext').click();
  await page.locator('[data-field="goal"][data-val="markets"]').click();
  await page.locator('#onbNext').click();
  await page.locator('[data-field="timeBand"][data-val="2-5"]').click();
  await page.locator('#onbNext').click();
  await page.locator('#onbNext').click();
  await page.waitForSelector('[data-testid="student-card"]', { timeout: 5000 });
  await page.locator('#onbNext').click();
  await page.waitForSelector('#tabbar:not(.hidden)');
  await dismissSheets(page);
  await page.locator('#first-backup-sheet [data-close]').first().click({ timeout: 800 }).catch(() => {});
}

async function dismissSheets(page) {
  await page.locator('#tourSkip').click({ timeout: 800 }).catch(() => {});
  await page.locator('#readingGuideSkip').click({ timeout: 800 }).catch(() => {});
  await page.locator('#readingGuideOk').click({ timeout: 500 }).catch(() => {});
  for (let i = 0; i < 4; i++) {
    const next = page.locator('#tourNext');
    if (!(await next.count())) break;
    await next.click();
    await page.waitForTimeout(80);
  }
  for (let i = 0; i < 6; i++) {
    const closed = await page.locator('.sheet-root.on [data-close], .sheet-root.on .sheet-x, #mbDismiss, #backupDismiss, #corruptKeep, #first-backup-sheet [data-close], #readingGuide button')
      .first().click({ timeout: 400 }).then(() => true).catch(() => false);
    if (!closed) break;
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => {
    document.querySelectorAll('.sheet-root.on').forEach((el) => el.classList.remove('on'));
    document.getElementById('readingGuide')?.remove();
  });
}

async function goTab(page, id) {
  await page.locator(`#tabbar button[data-tab="${id}"]`).click();
  await page.waitForTimeout(120);
  await dismissSheets(page);
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

      await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2200);
      await onboard(page);

      await page.evaluate(() => {
        localStorage.setItem('masterycap:course', JSON.stringify({
          foundations: { placementDone: true, weekStatus: { 1: 'completed', 2: 'completed', 3: 'completed', 4: 'completed', 5: 'current' }, xp: 200 },
          crypto: { placementDone: true, weekStatus: { 1: 'current' }, xp: 0 },
        }));
        localStorage.setItem('masterycap:readingGuideSeen', 'true');
      });
      await goTab(page, 'today');
      await page.locator('#mbDismiss').click({ timeout: 800 }).catch(() => {});
      await page.locator('#backupDismiss').click({ timeout: 800 }).catch(() => {});
      await page.locator('#corruptKeep').click({ timeout: 800 }).catch(() => {});
      await page.waitForSelector('#tdContinue, #tdCampus, #tdMarkets, .inst-screen', { timeout: 10000 });
      await goTab(page, 'records');
      await page.waitForTimeout(200);
      await goTab(page, 'campus');
      await page.waitForTimeout(200);
      // Markets journal via Records → Profile shortcut
      await goTab(page, 'records');
      await page.waitForSelector('#recJournal', { timeout: 5000 });
      await page.locator('#recJournal').click();
      await page.waitForTimeout(200);
      await page.locator('#editBal').click();
      await page.locator('#eqEditIn').fill('321.5');
      await page.locator('#eqSave').click();
      await page.waitForTimeout(100);
      const balTxt = await page.locator('#eqBal').textContent();
      if (!String(balTxt).includes('321.5')) throw new Error('edit bal failed: ' + balTxt);

      // Institute lesson (WEB-101) — or Markets Foundations if Markets admit
      await goTab(page, 'today');
      if (await page.locator('#tdContinue').count()) {
        await page.locator('#tdContinue').click();
      } else if (await page.locator('#tdMarkets').count()) {
        await page.locator('#tdMarkets').click();
        await page.waitForSelector('[data-mkt="foundations"]', { timeout: 5000 });
        await page.locator('[data-mkt="foundations"]').click();
        await page.waitForTimeout(300);
        const soft = page.locator('#softStartFoundations, #startPlacement, [data-week]').first();
        if (await soft.count()) await soft.click().catch(() => {});
      } else {
        await goTab(page, 'campus');
        await page.locator('[data-school="software"]').click();
        await page.locator('[data-code="WEB-101"]').click();
        if (await page.locator('#camEnroll').count()) await page.locator('#camEnroll').click();
        await page.waitForSelector('#camStart', { timeout: 5000 });
        await page.locator('#camStart').click();
      }
      await page.waitForSelector('.lesson-screen, .lesson-body, #startQuiz, [data-week]', { timeout: 10000 });
      await page.screenshot({ path: path.join(outDir, `lesson-${width}.png`), fullPage: true });
      await page.locator('#lsBack, #mktBackCampus').first().click().catch(() => {});
      await page.waitForSelector('#tabbar:not(.hidden)', { timeout: 5000 }).catch(() => {});
      // Markets track sample (Campus → track cards)
      await goTab(page, 'campus');
      if (await page.locator('[data-school="markets"]').count()) {
        await page.locator('[data-school="markets"]').click();
      }
      await page.waitForSelector('[data-mkt="foundations"]', { timeout: 5000 });
      await page.locator('[data-mkt="foundations"]').click();
      await page.waitForTimeout(400);
      const week = page.locator('[data-week]').first();
      if (await week.count()) {
        await week.click();
        await page.waitForSelector('.lesson-body', { timeout: 8000 }).catch(() => {});
      }

      if (width === 375) {
        if (await page.locator('#startQuiz').count()) {
          await page.locator('#startQuiz').click();
          await page.waitForSelector('#submitQuiz');
          const corrects = await page.evaluate(async () => {
            const { getTrack } = await import(new URL('./js/data/tracks.js', location.href).href);
            return getTrack('foundations').weeks[0].quiz.map((q) => q.correct);
          });
          for (let i = 0; i < corrects.length; i++) {
            await page.locator(`#qq${i} button[data-o="${corrects[i]}"]`).click();
          }
          await page.locator('#submitQuiz').click();
          await page.waitForTimeout(300);
          await page.locator('#quizDone').click().catch(() => {});
          await page.locator('#glossMiniSkip').click({ timeout: 1000 }).catch(() => {});
          await page.locator('#glossMiniDone').click({ timeout: 500 }).catch(() => {});
        }

        page.on('dialog', (d) => d.accept());
        await goTab(page, 'records');
        await page.locator('#recJournal').click();
        await page.waitForSelector('#saveTrade');
        await page.locator('#btnLong').click();
        await page.locator('#pair').fill('BTC');
        await page.locator('#pl').fill('10');
        await page.locator('#saveTrade').click();
        await page.waitForTimeout(200);
        const n = await page.evaluate(() => JSON.parse(localStorage.getItem('masterycap:trades') || '[]').length);
        if (n < 1) { console.error('FAIL: trade not saved'); failed = true; }

        // S7: paper sim via Practice
        await goTab(page, 'practice');
        await page.waitForTimeout(200);
        await page.locator('#prSim').click();
        await page.waitForSelector('[data-sc]');
        await page.locator('[data-sc="c1_uptrend_pullback"]').click();
        await page.waitForSelector('#simEnter');
        await page.locator('[data-dir="long"]').click();
        await page.locator('#simRisk').fill('1');
        const markAttr = await page.locator('#simStop').getAttribute('data-mark');
        const markPx = parseFloat(markAttr);
        if (!(markPx > 0)) throw new Error('simStop data-mark missing');
        await page.locator('#simStop').fill(String((markPx * 0.97).toFixed(4)));
        await page.locator('#simEnter').click();
        await page.waitForTimeout(200);
        if (!(await page.locator('#simClose').count())) {
          console.error('FAIL: sim position not opened');
          failed = true;
        } else {
          for (let i = 0; i < 10; i++) {
            if (!(await page.locator('#simStep').count())) break;
            await page.locator('#simStep').click();
            await page.waitForTimeout(40);
            if (await page.locator('#simClose').count() === 0) break;
          }
          if (await page.locator('#simClose').count()) {
            await page.locator('#simClose').click();
            await page.waitForTimeout(100);
          }
          if (await page.locator('#simEnd').count()) {
            await page.locator('#simEnd').click();
            await page.waitForTimeout(250);
          }
          if (await page.locator('#simDone').count()) {
            await page.locator('#simDone').click();
            await page.waitForTimeout(150);
          }
          const simN = await page.evaluate(() => JSON.parse(localStorage.getItem('masterycap:simTrades') || '[]').length);
          if (simN < 1) { console.error('FAIL: simTrades empty'); failed = true; }

          await page.locator('#simBack').click({ timeout: 2000 }).catch(() => {});
          await page.waitForSelector('#tabbar:not(.hidden)', { timeout: 5000 });
          await goTab(page, 'records');
          await page.locator('#recJournal').click();
          await page.waitForTimeout(200);
          await page.locator('[data-hist="paper"]').click();
          await page.waitForTimeout(150);
          const paperRows = await page.locator('.trade-row, .tb-t').count();
          if (simN >= 1 && paperRows < 1) {
            console.error('FAIL: Paper tab empty despite simTrades');
            failed = true;
          }
        }
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
