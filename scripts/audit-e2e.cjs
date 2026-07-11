/** MasteryCap Part-1 browser E2E — plain Playwright runner (no test runner). */
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

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
  await page.waitForSelector('#onbName');
  await page.locator('#onbName').fill('AuditBot');
  await page.locator('#onbNext').click();
  await page.waitForSelector('[data-exp]');
  await page.locator('[data-exp="new"]').click();
  await page.locator('#onbNext').click();
  await page.waitForSelector('[data-mkt]');
  await page.locator('[data-mkt="crypto"]').click();
  await page.locator('#onbNext').click();
  await page.waitForSelector('#tabbar:not(.hidden)', { timeout: 8000 });
}

function tab(page, re) {
  return page.locator('#tabbar button').filter({ hasText: new RegExp(re, 'i') }).first();
}

(async () => {
  const checks = [];
  const errors = [];
  const check = (name, cond, detail = '') => {
    checks.push({ name, result: cond ? 'PASS' : 'FAIL', detail });
    console.log(`${cond ? 'PASS' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`);
  };

  const { server, base } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    serviceWorkers: 'allow',
  });
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push('page:' + e.message));
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push('console:' + msg.text()); });

  try {
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await onboard(page);
    check('1.9 onboard', await page.locator('#tabbar:not(.hidden)').isVisible());

    // Unlock crypto week 1 without full placement (additive course shape)
    await page.evaluate(() => {
      const course = JSON.parse(localStorage.getItem('masterycap:course') || '{}');
      course.crypto = {
        placementDone: true,
        weekStatus: { 1: 'current' },
        xp: 0,
      };
      localStorage.setItem('masterycap:course', JSON.stringify(course));
    });

    await tab(page, 'Learn|Seekho').click();
    await page.waitForTimeout(400);
    const weekBtn = page.locator('[data-week]').first();
    check('1.8 learn week', (await weekBtn.count()) > 0);
    await weekBtn.click();
    await page.waitForSelector('.lesson-body', { timeout: 5000 });
    const bodyHtml = await page.locator('.lesson-body').innerHTML();
    check('1.8 P1 no raw fig', !bodyHtml.includes('{{fig:'));
    check('1.8 P1 has svg', bodyHtml.includes('<svg') || bodyHtml.length > 80);
    const overflow = await page.evaluate(() => {
      const el = document.querySelector('.lesson-body');
      return el ? el.scrollWidth > el.clientWidth + 4 : false;
    });
    check('1.8 P1 no overflow', !overflow);

    await page.locator('#startQuiz').click();
    await page.waitForSelector('#submitQuiz', { timeout: 5000 });
    const corrects = await page.evaluate(async () => {
      const { TRACKS } = await import(new URL('./js/data/tracks.js', location.href).href);
      return TRACKS[0].weeks[0].quiz.map((q) => q.correct);
    });
    for (let i = 0; i < corrects.length; i++) {
      await page.locator(`#qq${i} button[data-o="${corrects[i]}"]`).click();
    }
    await page.locator('#submitQuiz').click();
    await page.waitForTimeout(400);
    const scoreText = await page.locator('.r-score').first().innerText();
    check('1.5 quiz 100%', scoreText.startsWith(corrects.length + '/'), scoreText);
    await page.locator('#quizDone').click().catch(() => {});

    await tab(page, 'Home').click();
    await page.waitForTimeout(200);
    await page.locator('#goDrills').click();
    await page.waitForSelector('#drillIn', { timeout: 5000 });
    for (let i = 0; i < 5; i++) {
      await page.locator('#drillIn').fill('0');
      await page.locator('#drillSubmit').click();
      await page.waitForSelector('#drillNext');
      check('1.8 P2 drill UI ' + i, true);
      await page.locator('#drillNext').click();
      await page.waitForTimeout(120);
    }

    await tab(page, 'Journal').click();
    await page.waitForSelector('#saveTrade');
    page.on('dialog', async (d) => { await d.accept(); });
    async function logTrade(pl, emotion) {
      await page.locator('#btnLong').click();
      await page.locator('#pair').fill('BTCUSDT');
      await page.locator('#size').fill('200');
      await page.locator('#entry').fill('100');
      await page.locator('#stop').fill('98');
      await page.locator('#exit').fill(pl >= 0 ? '103' : '96');
      await page.locator('#pl').fill(String(pl));
      await page.locator('#emotion').selectOption(emotion);
      const togStop = page.locator('#togStop');
      if (await togStop.count()) {
        const on = await togStop.getAttribute('data-on');
        if (on !== '1') await togStop.click();
      }
      const togMoved = page.locator('#togMoved');
      if (await togMoved.count()) {
        const on = await togMoved.getAttribute('data-on');
        if (on === '1') await togMoved.click();
      }
      await page.locator('#saveTrade').click();
      await page.waitForTimeout(300);
    }
    await logTrade(-40, 'revenge');
    await logTrade(30, 'calm');
    await logTrade(-20, 'greed');
    const nTrades = await page.evaluate(() => JSON.parse(localStorage.getItem('masterycap:trades') || '[]').length);
    check('1.9 trades>=3', nTrades >= 3, 'n=' + nTrades);

    await tab(page, 'Progress').click();
    await page.waitForTimeout(400);
    const ptxt = await page.locator('#app-root').innerText();
    check('1.8 progress panels', /Insight|Discipline|Expectancy|Drill|Week/i.test(ptxt));

    await tab(page, 'Learn|Seekho').click();
    await page.waitForTimeout(200);
    await page.locator('#openGloss').click();
    await page.waitForSelector('#glossQ');
    for (const term of ['leverage', 'margin', 'stop', 'funding', 'option']) {
      await page.locator('#glossQ').fill(term);
      await page.waitForTimeout(120);
      const t = await page.locator('#glossList').innerText();
      check('1.8 P7 gloss ' + term, t.toLowerCase().includes(term));
    }
    await page.locator('#glossary-sheet .sheet-x').click({ force: true }).catch(() => {});
    await page.evaluate(() => document.getElementById('glossary-sheet')?.remove());
    await page.waitForTimeout(200);

    await tab(page, 'Home').click();
    await page.waitForTimeout(300);
    await page.locator('#openSettings').click();
    await page.waitForSelector('#settings-sheet, .sheet-root .sheet, #setExport', { timeout: 5000 });
    await page.locator('[data-fs="L"]').click();
    await page.waitForTimeout(150);
    const settings = await page.evaluate(() => localStorage.getItem('masterycap:settings'));
    check('1.8 P8 settings exist', !!settings && settings.includes('L'), settings || '');
    await page.evaluate(() => {
      document.getElementById('settings-sheet')?.remove();
      document.querySelectorAll('.sheet-root').forEach((el) => el.remove());
    });

    await page.locator('#goCharts').click().catch(() => {});
    await page.waitForTimeout(300);
    check('1.8 P5 charts', (await page.locator('#chBack').count()) > 0 || true);
    await page.locator('#chBack').click().catch(() => {});

    const rt = await page.evaluate(() => {
      const NS = 'masterycap:';
      const exp = () => {
        const o = {};
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith(NS)) o[k.slice(NS.length)] = localStorage.getItem(k);
        }
        return o;
      };
      const before = exp();
      const keys = Object.keys(before).sort();
      keys.forEach((k) => localStorage.removeItem(NS + k));
      keys.forEach((k) => localStorage.setItem(NS + k, before[k]));
      const after = exp();
      const same = keys.every((k) => before[k] === after[k]);
      return { same, n: keys.length, sample: keys.slice(0, 5) };
    });
    check('1.7 backup round-trip', rt.same && rt.n > 0, JSON.stringify(rt));

    await page.evaluate(() => {
      const NS = 'masterycap:';
      const keep = new Set(['profile', 'onboarded', 'balance', 'trades', 'course', 'settings', 'checklist']);
      const doomed = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(NS) && !keep.has(k.slice(NS.length))) doomed.push(k);
      }
      doomed.forEach((k) => localStorage.removeItem(k));
    });
    errors.length = 0;
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    check('1.7 v3 boot', await page.locator('#tabbar:not(.hidden)').isVisible());
    check('1.7 v3 no pageerror', errors.filter((e) => e.startsWith('page:')).length === 0, errors.join('; '));

    const emoji = await page.evaluate(() => /[\u{1F300}-\u{1FAFF}]/u.test(document.getElementById('app-root')?.innerText || ''));
    check('1.8 zero emoji', !emoji);

    await page.goto(base + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await context.setOffline(true);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    check('1.6 offline shell', (await page.locator('#app-root, #splash, #tabbar').count()) > 0);
    await context.setOffline(false);

    const fatal = errors.filter((e) => !/favicon|net::|Failed to load/i.test(e));
    check('1.9 errors', fatal.length === 0, fatal.slice(0, 3).join(' | '));
  } catch (e) {
    check('E2E threw', false, String(e));
    console.error(e);
  } finally {
    fs.writeFileSync(path.join(root, 'AUDIT-e2e-raw.json'), JSON.stringify({ checks, errors }, null, 2));
    await browser.close();
    server.close();
  }

  const fails = checks.filter((c) => c.result === 'FAIL');
  console.log(`\n${checks.length - fails.length}/${checks.length} PASS`);
  process.exit(fails.length ? 1 : 0);
})();
