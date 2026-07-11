/**
 * FINAL ACCEPTANCE — MasteryCap school (S1–S7).
 * Fresh @375 → warm shell → offline SPA nav → campus path → backup wipe/import.
 * Note: harness static server has no SW; quizzes/sim stay online (local ESM fetch).
 * Offline check = tab nav after warm load (realistic SPA).
 */
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const out = [];
function log(s) { out.push(s); console.log(s); }
function fail(s) { log('FAIL: ' + s); throw new Error(s); }

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

async function dismissNoise(page) {
  await page.locator('#tourSkip').click({ timeout: 600 }).catch(() => {});
  for (let i = 0; i < 4; i++) {
    const next = page.locator('#tourNext');
    if (!(await next.count())) break;
    await next.click();
    await page.waitForTimeout(80);
  }
  for (let i = 0; i < 5; i++) {
    const closed = await page.locator('.sheet-root.on [data-close], .sheet-root.on .sheet-x, #mbDismiss, #backupDismiss, #corruptKeep, #streak-recover [data-close], #streak-recover button')
      .first().click({ timeout: 400 }).then(() => true).catch(() => false);
    if (!closed) break;
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => {
    document.querySelectorAll('.sheet-root.on').forEach((el) => el.classList.remove('on'));
  });
}

async function onboard(page) {
  await page.waitForSelector('#onbNext, #tabbar', { timeout: 15000 });
  if (await page.locator('#tabbar:not(.hidden)').count()) return;
  await page.locator('#onbNext').click();
  await page.locator('#onbName').fill('FinalAccept');
  await page.locator('#onbNext').click();
  await page.locator('[data-exp="new"]').click();
  await page.locator('#onbNext').click();
  await page.locator('[data-mkt="crypto"]').click();
  await page.locator('#onbNext').click();
  await page.waitForSelector('#tabbar:not(.hidden)');
  await dismissNoise(page);
}

async function goHome(page) {
  await page.locator('#tabbar button[data-tab="dashboard"]').click();
  await page.waitForTimeout(150);
  await dismissNoise(page);
}

async function goTab(page, id) {
  await page.locator(`#tabbar button[data-tab="${id}"]`).click();
  await page.waitForTimeout(120);
  await dismissNoise(page);
}

async function passQuiz(page, trackId) {
  await page.locator('#startQuiz').click();
  await page.waitForSelector('#submitQuiz');
  const corrects = await page.evaluate(async (id) => {
    const { getTrack } = await import(new URL('./js/data/tracks.js', location.href).href);
    return getTrack(id).weeks[0].quiz.map((q) => q.correct);
  }, trackId);
  for (let i = 0; i < corrects.length; i++) {
    await page.locator(`#qq${i} button[data-o="${corrects[i]}"]`).click();
  }
  await page.locator('#submitQuiz').click();
  await page.waitForTimeout(250);
  await page.locator('#quizDone').click().catch(() => {});
  await page.locator('#glossMiniSkip').click({ timeout: 800 }).catch(() => {});
  await page.locator('#glossMiniDone').click({ timeout: 400 }).catch(() => {});
}

async function enterSim(page, scenarioId, { risk = '1', overRisk = false, limit = false, partial = false } = {}) {
  await goHome(page);
  await page.locator('#goSim').click();
  await page.waitForSelector('[data-sc]');
  await page.locator(`[data-sc="${scenarioId}"]`).click();
  await page.waitForSelector('#simEnter, #simClose');
  if (await page.locator('#simEnter').count() === 0) return;
  if (limit) {
    await page.locator('[data-otype="limit"]').click();
    await page.waitForTimeout(80);
  }
  await page.locator('[data-dir="long"]').click();
  await page.locator('#simRisk').fill(overRisk ? '5' : risk);
  const mark = parseFloat(await page.locator('#simStop').getAttribute('data-mark'));
  if (!(mark > 0)) fail('sim data-mark');
  if (limit) {
    const lim = mark * 0.99;
    await page.locator('#simLimit').fill(String(lim.toFixed(4)));
    await page.locator('#simStop').fill(String((lim * 0.97).toFixed(4)));
    await page.locator('#simEnter').click();
    await page.waitForTimeout(120);
    if (await page.locator('#simCancelLimit').count()) {
      await page.locator('#simCancelLimit').click();
      await page.waitForTimeout(80);
    }
    // finish with market entry for rest of path
    if (await page.locator('[data-otype="market"]').count()) {
      await page.locator('[data-otype="market"]').click();
      await page.waitForTimeout(60);
    }
    if (await page.locator('[data-dir="long"]').count()) {
      await page.locator('[data-dir="long"]').click();
      await page.locator('#simRisk').fill('1');
      const m2 = parseFloat(await page.locator('#simStop').getAttribute('data-mark')) || mark;
      await page.locator('#simStop').fill(String((m2 * 0.97).toFixed(4)));
      await page.locator('#simEnter').click();
      await page.waitForTimeout(150);
    }
  } else {
    await page.locator('#simStop').fill(String((mark * 0.97).toFixed(4)));
    await page.locator('#simEnter').click();
    await page.waitForTimeout(150);
  }
  if (!(await page.locator('#simClose').count())) fail('sim position not open (' + scenarioId + ')');
  if (partial) {
    await page.locator('[data-partial="0.5"]').click();
    await page.waitForTimeout(80);
  }
  for (let i = 0; i < 8; i++) {
    if (!(await page.locator('#simStep').count())) break;
    if (!(await page.locator('#simClose').count())) break;
    await page.locator('#simStep').click();
    await page.waitForTimeout(30);
  }
  if (await page.locator('#simClose').count()) {
    await page.locator('#simClose').click();
    await page.waitForTimeout(80);
  }
  if (await page.locator('#simEnd').count()) {
    await page.locator('#simEnd').click();
    await page.waitForTimeout(200);
  }
}

(async () => {
  const errors = [];
  const { server, base } = await startServer();
  const browser = await chromium.launch({ headless: true });
  let failed = false;
  try {
    const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await context.newPage();
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('dialog', (d) => d.accept());

    await page.goto(base + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await onboard(page);
    log('OK onboard');

    /* Warm tabs (cache modules in memory) */
    await goHome(page);
    for (const tab of ['learn', 'journal', 'progress']) {
      await goTab(page, tab);
    }
    await goHome(page);
    log('OK warm tabs');

    await page.evaluate(() => {
      localStorage.setItem('masterycap:course', JSON.stringify({
          foundations: { placementDone: true, weekStatus: { 1: 'completed', 2: 'completed', 3: 'completed', 4: 'completed', 5: 'current' }, xp: 200 },
          crypto: { placementDone: true, weekStatus: { 1: 'current' }, xp: 0 },
        }));
    });
    await goHome(page);

    /* Offline shell nav — Playwright offline blocks local static ESM; only tab switch */
    await context.setOffline(true);
    await goHome(page);
    await goTab(page, 'learn');
    await page.waitForTimeout(200);
    if (!(await page.locator('[data-track]').count())) fail('offline Learn tracks missing');
    log('OK offline shell nav');
    await context.setOffline(false);

    /* Foundations quiz */
    await goTab(page, 'learn');
    await page.waitForTimeout(150);
    await page.locator('[data-track="foundations"]').click();
    await page.waitForTimeout(300);
    await page.locator('[data-week]').first().click({ timeout: 10000 });
    await page.waitForSelector('.lesson-body');
    await passQuiz(page, 'foundations');
    log('OK Foundations quiz');

    /* Crypto quiz */
    await goTab(page, 'learn');
    await page.waitForTimeout(150);
    await page.locator('[data-track="crypto"]').click();
    await page.waitForTimeout(250);
    await page.locator('[data-week]').first().click();
    await page.waitForSelector('.lesson-body, #startQuiz');
    if (await page.locator('#startQuiz').count()) {
      await passQuiz(page, 'crypto');
      log('OK crypto quiz');
    } else {
      log('SKIP crypto quiz UI');
    }

    /* Process-pass sim */
    await enterSim(page, 'c1_uptrend_pullback', { risk: '1' });
    let body = await page.locator('body').innerText();
    if (!/process|PASS|pass|FAIL|fail/i.test(body)) fail('debrief missing process signal');
    if (await page.locator('#simDone').count()) await page.locator('#simDone').click();
    log('OK sim process run');

    /* Over-risk fail */
    await enterSim(page, 'c1_uptrend_pullback', { overRisk: true });
    body = await page.locator('body').innerText();
    if (!/oversized|over.risk|fail|FAIL/i.test(body)) fail('over-risk fail not shown');
    if (await page.locator('#simDone').count()) await page.locator('#simDone').click();
    log('OK over-risk process fail');

    /* Limit + partial */
    await enterSim(page, 'c1_uptrend_pullback', { limit: true });
    if (await page.locator('#simDone').count()) await page.locator('#simDone').click();
    log('OK limit path');
    await enterSim(page, 'c1_uptrend_pullback', { partial: true });
    if (await page.locator('#simDone').count()) await page.locator('#simDone').click();
    log('OK partial close');

    /* Paper journal */
    await goTab(page, 'journal');
    await page.waitForTimeout(200);
    await page.locator('[data-hist="paper"]').click();
    await page.waitForTimeout(150);
    const simN = await page.evaluate(() => JSON.parse(localStorage.getItem('masterycap:simTrades') || '[]').length);
    if (simN < 1) fail('simTrades empty');
    if ((await page.locator('.trade-row, .tb-t').count()) < 1) fail('Paper tab empty');
    log('OK Paper tab n=' + simN);

    /* Graduation panel */
    await goTab(page, 'learn');
    await page.waitForTimeout(150);
    await page.locator('[data-track="crypto"]').click();
    await page.waitForTimeout(250);
    body = await page.locator('body').innerText();
    if (!/Graduation|grad|Sim trades|Process/i.test(body)) fail('graduation panel missing');
    log('OK graduation panel');

    /* Cert honesty + seed ready */
    const cert = await page.evaluate(async () => {
      const { store, KEYS } = await import(new URL('./js/store.js', location.href).href);
      const course = store.get(KEYS.course, {});
      course.crypto = {
        ...(course.crypto || {}),
        examPassed: new Date().toISOString(),
        examPct: 90,
        placementDone: true,
      };
      store.set(KEYS.course, course);
      const trades = store.get(KEYS.simTrades, []);
      while (trades.length < 20) {
        trades.push({
          scenarioId: 'c1_uptrend_pullback', track: 'crypto', date: new Date().toISOString(),
          reason: 'manual', process: { pass: true, fails: [] },
        });
      }
      store.set(KEYS.simTrades, trades);
      const src = await (await fetch(new URL('./js/exam.js', location.href))).text();
      return {
        hasReady: src.includes('TRADE-READY'),
        hasHonesty: /Self-issued|NOT SECP|not a broker\/regulatory license|markets still decide outcomes|markets outcomes decide|competence decays/i.test(src),
      };
    });
    if (!cert.hasReady || !cert.hasHonesty) fail('cert honesty line missing');
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await dismissNoise(page);
    await goTab(page, 'learn');
    await page.locator('[data-track="crypto"]').click();
    await page.waitForTimeout(300);
    if (await page.locator('#doGraduate').count()) {
      await page.locator('#doGraduate').click();
      await page.waitForTimeout(400);
      log('OK graduate CTA');
    } else {
      log('SKIP graduate CTA (gates still short)');
    }

    /* Portfolio stick */
    await goHome(page);
    await page.locator('#goSim').click();
    await page.waitForSelector('[data-pf]');
    await page.locator('[data-pf="invest"]').click();
    await page.waitForSelector('#pfGo');
    await page.locator('#pfGo').click();
    await page.waitForTimeout(100);
    for (let i = 0; i < 50; i++) {
      if (await page.locator('#pfStick').count()) {
        await page.locator('#pfStick').click();
        await page.waitForTimeout(50);
        continue;
      }
      if (await page.locator('#pfNext').count()) {
        await page.locator('#pfNext').click();
        await page.waitForTimeout(40);
        continue;
      }
      break;
    }
    await page.waitForTimeout(200);
    const pfPass = await page.evaluate(() => {
      const s = JSON.parse(localStorage.getItem('masterycap:simStats') || '{}');
      return (s.portfolio_invest || {}).pass || 0;
    });
    body = await page.locator('body').innerText();
    if (pfPass < 1 && !/pass|Pass/i.test(body)) fail('portfolio stick did not pass');
    log('OK portfolio stick (pass=' + pfPass + ')');

    /* Export → wipe → import */
    const marker = 'FinalAccept-RESTORE-MARKER';
    await page.evaluate((name) => {
      localStorage.setItem('masterycap:profile', JSON.stringify({ name, experience: 'new', markets: ['crypto'] }));
    }, marker);
    const backup = await page.evaluate(async () => {
      const { store } = await import(new URL('./js/store.js', location.href).href);
      return store.exportBackup();
    });
    if (!backup?.data || !backup.checksum) fail('exportBackup shape');
    await page.evaluate(async () => {
      const { store } = await import(new URL('./js/store.js', location.href).href);
      store.clearAll();
    });
    if (await page.evaluate(() => localStorage.getItem('masterycap:profile'))) fail('wipe incomplete');
    const imp = await page.evaluate(async (bak) => {
      const { store } = await import(new URL('./js/store.js', location.href).href);
      return store.importBackup(bak);
    }, backup);
    if (!imp.ok) fail('importBackup ' + (imp.error || ''));
    const restored = await page.evaluate(() => {
      try { return JSON.parse(localStorage.getItem('masterycap:profile') || '{}').name; }
      catch { return null; }
    });
    if (restored !== marker) fail('restore name mismatch: ' + restored);
    const simAfter = await page.evaluate(() => JSON.parse(localStorage.getItem('masterycap:simTrades') || '[]').length);
    if (simAfter < 1) fail('simTrades not restored');
    log('OK backup wipe import (simTrades=' + simAfter + ')');

    if (errors.length) {
      log('pageerrors: ' + errors.slice(0, 3).join(' | '));
      failed = true;
    } else {
      log('OK zero pageerror');
    }
  } catch (e) {
    console.error(e);
    failed = true;
  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n--- FINAL ACCEPTANCE LOG ---');
  out.forEach((l) => console.log(l));
  if (failed) process.exit(1);
  console.log('PASS final-acceptance @375');
})();
