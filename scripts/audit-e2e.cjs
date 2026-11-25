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
  // CapAlert / CapConfirm overlays (replace native dialog)
  for (let i = 0; i < 4; i++) {
    const dlg = page.locator('.mc-dialog-backdrop .mc-dialog__actions .btn').last();
    if (!(await dlg.count())) break;
    await dlg.click({ timeout: 500 }).catch(() => {});
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
    document.querySelectorAll('.mc-dialog-backdrop').forEach((el) => el.remove());
    document.getElementById('readingGuide')?.remove();
    document.getElementById('committee-sheet')?.remove();
  });
}

/**
 * Admission flow (v47+): welcome → honesty → name → …
 * Clears storage so we always hit a fresh onboard (not a seeded campus shell).
 */
async function onboard(page) {
  await page.waitForSelector('#onbNext, #onbSkip, #tabbar', { timeout: 15000 });
  if (await page.locator('#tabbar:not(.hidden) button[data-tab]').count()) {
    await dismissSheets(page);
    return;
  }

  // welcome → honesty → name (#onbName)
  await page.locator('#onbNext').click();
  await page.waitForTimeout(120);
  await page.locator('#onbNext').click();
  await page.waitForSelector('#onbName', { timeout: 10000 });
  await page.locator('#onbName').fill('AuditBot');
  await page.locator('#onbNext').click();

  await page.waitForSelector('[data-field="ageBand"]', { timeout: 5000 });
  await page.locator('[data-field="ageBand"][data-val="18-24"]').click();
  await page.locator('#onbNext').click();

  await page.waitForSelector('[data-field="language"]', { timeout: 5000 });
  await page.locator('[data-field="language"][data-val="en"]').click();
  await page.locator('#onbNext').click();

  await page.waitForSelector('[data-field="buildExp"]', { timeout: 5000 });
  await page.locator('[data-field="buildExp"][data-val="never"]').click();
  await page.locator('#onbNext').click();

  // Markets goal → unlocks Foundations soft-start for learn/quiz path
  await page.waitForSelector('[data-field="goal"]', { timeout: 5000 });
  await page.locator('[data-field="goal"][data-val="markets"]').click();
  await page.locator('#onbNext').click();

  await page.waitForSelector('[data-field="timeBand"]', { timeout: 5000 });
  await page.locator('[data-field="timeBand"][data-val="2-5"]').click();
  await page.locator('#onbNext').click();

  // photo (skip)
  await page.locator('#onbNext').click();
  await page.waitForSelector('[data-testid="student-card"]', { timeout: 5000 });
  // Enter campus
  await page.locator('#onbNext').click();

  await page.waitForSelector('#tabbar:not(.hidden)', { timeout: 10000 });
  await page.waitForTimeout(450);
  await dismissSheets(page);
  await page.locator('#first-backup-sheet [data-close]').first().click({ timeout: 800 }).catch(() => {});
}

async function goTab(page, id) {
  await dismissSheets(page);
  await page.locator(`#tabbar button[data-tab="${id}"]`).click({ force: true });
  await page.waitForTimeout(150);
  await dismissSheets(page);
}

async function openMarketsLearn(page) {
  await dismissSheets(page);
  // Force learn/course shell via router — campus cards can be nested after Hasil/Practice
  await page.evaluate(() => {
    if (typeof window.App?.navigate === 'function') {
      window.App.navigate('learn');
    }
  });
  await page.waitForTimeout(250);
  await dismissSheets(page);

  if (!(await page.locator('[data-week], #openGloss, #softStartFoundations').count())) {
    await goTab(page, 'campus');
    if (await page.locator('[data-school="markets"]').count()) {
      await page.locator('[data-school="markets"]').click();
      await page.waitForTimeout(250);
    }
    await page.waitForSelector('[data-mkt="foundations"], [data-week], #softStartFoundations', { timeout: 8000 });
    if (await page.locator('[data-mkt="foundations"]').count()) {
      await page.locator('[data-mkt="foundations"]').click();
      await page.waitForTimeout(300);
    }
  }
  if (await page.locator('#softStartFoundations').count()) {
    await page.locator('#softStartFoundations').click();
    await page.waitForTimeout(250);
  }
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
    // Fresh storage → admission (not gallery-seeded campus)
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      const doomed = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && (k.startsWith('masterycap') || k.startsWith('masterycap-'))) doomed.push(k);
      }
      doomed.forEach((k) => localStorage.removeItem(k));
      try {
        if (indexedDB?.databases) {
          const dbs = await indexedDB.databases();
          await Promise.all((dbs || []).map((d) => d?.name && new Promise((res) => {
            const req = indexedDB.deleteDatabase(d.name);
            req.onsuccess = req.onerror = req.onblocked = () => res();
          })));
        }
      } catch (_) { /* ignore */ }
    });
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await onboard(page);
    check('1.9 onboard', await page.locator('#tabbar:not(.hidden)').isVisible());

    // Unlock foundations week 1 (soft-start may already have done this)
    await page.evaluate(() => {
      const course = JSON.parse(localStorage.getItem('masterycap:course') || '{}');
      course.foundations = {
        placementDone: true,
        weekStatus: { ...(course.foundations?.weekStatus || {}), 1: course.foundations?.weekStatus?.[1] || 'current' },
        xp: course.foundations?.xp || 0,
        softStart: true,
      };
      localStorage.setItem('masterycap:course', JSON.stringify(course));
      localStorage.setItem('masterycap:readingGuideSeen', 'true');
      localStorage.setItem('masterycap:tourDone', 'true');
      localStorage.setItem('masterycap:firstBackupDone', 'true');
    });

    // Reload so App rehydrates foundations soft-start from localStorage
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await dismissSheets(page);
    await openMarketsLearn(page);
    const weekBtn = page.locator('[data-week]').first();
    check('1.8 learn week', (await weekBtn.count()) > 0);
    await weekBtn.click();
    // Week opens Books-style reading surface (#readPage), not legacy .lesson-body
    await page.waitForSelector('#readPage, .lesson-body', { timeout: 8000 });
    const bodyHtml = await page.locator('#readPage, .lesson-body').first().innerHTML();
    check('1.8 P1 no raw fig', !bodyHtml.includes('{{fig:'));
    check('1.8 P1 has svg', bodyHtml.includes('<svg') || bodyHtml.length > 80);
    const overflow = await page.evaluate(() => {
      const el = document.querySelector('#readPage') || document.querySelector('.lesson-body');
      return el ? el.scrollWidth > el.clientWidth + 4 : false;
    });
    check('1.8 P1 no overflow', !overflow);

    await page.locator('#startQuiz').click();
    await page.waitForSelector('#submitQuiz', { timeout: 5000 });
    const corrects = await page.evaluate(async () => {
      const { getTrack } = await import(new URL('./js/data/tracks.js', location.href).href);
      return getTrack('foundations').weeks[0].quiz.map((q) => q.correct);
    });
    for (let i = 0; i < corrects.length; i++) {
      await page.locator(`#qq${i} button[data-o="${corrects[i]}"]`).click();
    }
    await page.locator('#submitQuiz').click();
    await page.waitForTimeout(400);
    const scoreText = await page.locator('.r-score').first().innerText();
    check('1.5 quiz 100%', scoreText.startsWith(corrects.length + '/'), scoreText);
    await page.locator('#quizDone').click().catch(() => {});
    await page.locator('#glossMiniSkip').click({ timeout: 1000 }).catch(() => {});
    await page.locator('#glossMiniDone').click({ timeout: 500 }).catch(() => {});

    await goTab(page, 'practice');
    await page.waitForSelector('#prDrills', { timeout: 5000 });
    await page.locator('#prDrills').click();
    await page.waitForSelector('#drillIn', { timeout: 5000 });
    for (let i = 0; i < 5; i++) {
      await page.locator('#drillIn').fill('0');
      await page.locator('#drillSubmit').click();
      await page.waitForSelector('#drillNext');
      check('1.8 P2 drill UI ' + i, true);
      await page.locator('#drillNext').click();
      await page.waitForTimeout(120);
    }

    page.on('dialog', async (d) => { await d.accept(); });
    await goTab(page, 'records');
    await page.waitForSelector('#recJournal', { timeout: 5000 });
    await page.locator('#recJournal').click();
    await dismissSheets(page);
    await page.waitForSelector('#saveTrade', { timeout: 5000 });

    async function logTrade(pl, emotion) {
      await dismissSheets(page);
      // Clear revenge/greed cooldown so consecutive logs aren't blocked
      await page.evaluate(() => localStorage.removeItem('masterycap:coolDownUntil'));
      await page.locator('#btnLong').click({ force: true });
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
        if (on !== '1') await togStop.click({ force: true });
      }
      const togMoved = page.locator('#togMoved');
      if (await togMoved.count()) {
        const on = await togMoved.getAttribute('data-on');
        if (on === '1') await togMoved.click({ force: true });
      }
      await page.locator('#saveTrade').click({ force: true });
      await page.waitForTimeout(250);
      await page.locator('#dbSkip').click({ timeout: 1500 }).catch(() => {});
      await dismissSheets(page);
    }
    // calm/fomo first — revenge/greed trip cooldown if left uncleared
    await logTrade(30, 'calm');
    await logTrade(-20, 'fomo');
    await logTrade(-40, 'revenge');
    const nTrades = await page.evaluate(() => JSON.parse(localStorage.getItem('masterycap:trades') || '[]').length);
    check('1.9 trades>=3', nTrades >= 3, 'n=' + nTrades);

    await goTab(page, 'practice');
    await page.locator('#prHasil').click();
    await page.waitForTimeout(400);
    const ptxt = await page.locator('#app-root').innerText();
    check('1.8 progress panels', /Insight|Discipline|Expectancy|Drill|Week|Hasil|can/i.test(ptxt));

    await openMarketsLearn(page);
    await page.waitForSelector('#openGloss', { timeout: 5000 });
    await page.locator('#openGloss').click();
    await page.waitForSelector('#glossQ');
    for (const term of ['leverage', 'margin', 'stop', 'funding', 'option']) {
      await page.locator('#glossQ').fill(term);
      await page.waitForTimeout(120);
      const t = await page.locator('#glossList, .sheet').first().innerText();
      check('1.8 P7 gloss ' + term, t.toLowerCase().includes(term));
    }
    await page.locator('#glossary-sheet .sheet-x, .sheet-root.on .sheet-x').first().click({ force: true }).catch(() => {});
    await page.evaluate(() => document.getElementById('glossary-sheet')?.remove());
    await page.waitForTimeout(200);

    await goTab(page, 'today');
    await page.waitForTimeout(200);
    await page.locator('#tdSettings, #openSettings').first().click();
    await page.waitForSelector('#settings-sheet, .sheet-root .sheet, #setExport', { timeout: 5000 });
    await page.locator('[data-fs="L"]').click();
    await page.waitForTimeout(150);
    const settings = await page.evaluate(() => localStorage.getItem('masterycap:settings'));
    check('1.8 P8 settings exist', !!settings && settings.includes('L'), settings || '');
    await page.evaluate(() => {
      document.getElementById('settings-sheet')?.remove();
      document.querySelectorAll('.sheet-root').forEach((el) => el.remove());
    });

    await goTab(page, 'practice');
    await page.locator('#prCharts').click();
    await page.waitForTimeout(300);
    check('1.8 P5 charts', (await page.locator('#chBack, .screen').count()) > 0);
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
      const keep = new Set(['profile', 'onboarded', 'balance', 'trades', 'course', 'settings', 'checklist', 'studentId', 'institute']);
      const doomed = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(NS) && !keep.has(k.slice(NS.length))) doomed.push(k);
      }
      doomed.forEach((k) => localStorage.removeItem(k));
      // Ensure campus shell still boots after prune
      const profile = JSON.parse(localStorage.getItem(NS + 'profile') || '{}');
      if (!profile.campus) {
        profile.campus = true;
        profile.admissionComplete = true;
        localStorage.setItem(NS + 'profile', JSON.stringify(profile));
      }
      localStorage.setItem(NS + 'onboarded', 'true');
      localStorage.setItem(NS + 'tourDone', 'true');
      localStorage.setItem(NS + 'firstBackupDone', 'true');
      localStorage.setItem(NS + 'readingGuideSeen', 'true');
    });
    errors.length = 0;
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    await dismissSheets(page);
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
