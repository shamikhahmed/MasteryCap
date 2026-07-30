#!/usr/bin/env node
/**
 * MasteryCap device-matrix capture (standalone — no Playwright test runner).
 * Usage: node scripts/device-matrix-capture.cjs
 * Out: qa/device-matrix/{family}/{id}/{screen}.png + meta.json + summary.json
 */
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const {
  ALL_DEVICES, MAJOR_SCREENS, applyDeviceChrome, probeLayout, expectedLayout, DESKTOP_BP,
} = require('../tests/device-matrix.cjs');

const root = path.join(__dirname, '..');
const OUT = path.join(root, 'qa', 'device-matrix');

function contentType(p) {
  if (p.endsWith('.html')) return 'text/html';
  if (p.endsWith('.js')) return 'text/javascript';
  if (p.endsWith('.css')) return 'text/css';
  if (p.endsWith('.webmanifest')) return 'application/manifest+json';
  if (p.endsWith('.woff2')) return 'font/woff2';
  if (p.endsWith('.png')) return 'image/png';
  if (p.endsWith('.svg')) return 'image/svg+xml';
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

async function seed(page) {
  await page.evaluate(() => {
    const ns = 'masterycap:';
    const set = (k, v) => localStorage.setItem(ns + k, JSON.stringify(v));
    set('onboarded', true);
    set('profile', {
      name: 'QA Learner', campus: true, register: 'young', ageBand: '18-24',
      goal: 'apps', timeBand: '2-5', primaryBranch: 'software', starterCourse: 'WEB-101',
    });
    set('settings', { lang: 'en', fontSize: 'M', haptics: false });
    set('appearance', { mode: 'dark' });
    set('institute', {
      activeCourse: 'WEB-101',
      enrollments: { 'WEB-101': { at: Date.now() } },
      completedLessons: {}, finals: {}, certificates: {}, srs: [], attempts: {}, projectEvidence: {},
    });
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    document.getElementById('splash')?.remove();
    document.querySelectorAll('.sheet-root.on').forEach((el) => el.remove());
  });
  await page.waitForSelector('#tabbar .tab, .tabbar .tab', { timeout: 20000 });
}

async function dismiss(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.sheet-root.on, #tour-sheet, #corrupt-sheet').forEach((el) => el.remove());
    document.querySelectorAll('.sw-toast.on').forEach((el) => el.classList.remove('on'));
  });
}

async function gotoTab(page, tab) {
  await dismiss(page);
  await page.evaluate((id) => {
    const btn = document.querySelector(`.tab[data-tab="${id}"]`);
    if (!btn) throw new Error('missing tab ' + id);
    btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  }, tab);
  await page.waitForTimeout(400);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const { server, base } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  /** @type {object[]} */
  const meta = [];

  try {
    await page.goto(base + '/?matrix=1', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await seed(page);
    console.log('Unlocked Today shell @', base);

    for (const device of ALL_DEVICES) {
      const dir = path.join(OUT, device.family, device.id);
      fs.mkdirSync(dir, { recursive: true });
      process.stdout.write(`\n${device.id} (${device.width}×${device.height}) `);

      for (const screen of MAJOR_SCREENS) {
        await dismiss(page);
        await applyDeviceChrome(page, device);

        if (screen.kind === 'admission') {
          await page.evaluate(async () => {
            document.getElementById('tabbar')?.classList.add('hidden');
            const mod = await import('/js/views/admission.js');
            const fakeApp = {
              lang: 'en', profile: null,
              haptic() {}, setLang() {}, render() {}, renderNav() {},
              t(k) {
                return ({ begin: 'Begin application', skip: 'Skip', back: 'Back', next: 'Next' }[k] || k);
              },
            };
            await mod.renderAdmission(fakeApp, () => document.getElementById('app-root'));
          });
          await page.waitForTimeout(300);
        } else if (screen.kind === 'overlay') {
          await page.evaluate(() => document.getElementById('tabbar')?.classList.remove('hidden'));
          await gotoTab(page, 'today');
          await applyDeviceChrome(page, device);
          await page.click('#tdSettings', { timeout: 5000 });
          await page.waitForSelector('#settings-sheet', { timeout: 8000 });
          await page.waitForTimeout(250);
        } else {
          await page.evaluate(() => document.getElementById('tabbar')?.classList.remove('hidden'));
          await gotoTab(page, screen.tab);
          await applyDeviceChrome(page, device);
          await page.waitForTimeout(200);
        }

        const probe = await probeLayout(page);
        const expectL = expectedLayout(device.width);
        const layoutOk = screen.kind === 'admission'
          ? !probe.tabsVisible || probe.layout === expectL
          : probe.layout === expectL;
        const file = path.join(dir, `${screen.id}.png`);
        await page.screenshot({ path: file, fullPage: false });
        meta.push({
          family: device.family,
          deviceId: device.id,
          label: device.label,
          width: device.width,
          height: device.height,
          chrome: device.chrome,
          safeTop: device.safeTop,
          safeBottom: device.safeBottom,
          screen: screen.id,
          screenLabel: screen.label,
          expectedLayout: expectL,
          layoutOk,
          ...probe,
          file: path.relative(root, file),
        });
        process.stdout.write(probe.overflow ? 'X' : (layoutOk ? '.' : '?'));

        if (screen.kind === 'admission' || screen.kind === 'overlay') {
          await dismiss(page);
          await page.evaluate(() => document.getElementById('tabbar')?.classList.remove('hidden'));
          await gotoTab(page, 'today');
        }
      }
    }

    const summary = {
      desktopBp: DESKTOP_BP,
      devices: ALL_DEVICES.length,
      screens: MAJOR_SCREENS.length,
      shots: meta.length,
      overflowCount: meta.filter((m) => m.overflow).length,
      layoutFail: meta.filter((m) => m.layoutOk === false).length,
      overflowDevices: [...new Set(meta.filter((m) => m.overflow).map((m) => `${m.deviceId}/${m.screen}`))],
      layoutFailDevices: [...new Set(meta.filter((m) => !m.layoutOk).map((m) => `${m.deviceId}/${m.screen} got=${m.layout}`))],
      h1ClipRisk: meta.filter((m) => m.h1Top != null && m.h1Top < m.safeTop - 2).map((m) => `${m.deviceId}/${m.screen} h1Top=${m.h1Top} safe=${m.safeTop}`),
      shortTabs: meta.filter((m) => (m.tabHeight || 0) > 0 && m.tabHeight < 44 + (m.safeBottom || 0) - 2 && m.tabsVisible)
        .map((m) => `${m.deviceId} h=${m.tabHeight}`),
      versionSamples: meta.filter((m) => m.versionText).slice(0, 3).map((m) => m.versionText),
    };
    fs.writeFileSync(path.join(OUT, 'meta.json'), JSON.stringify(meta, null, 2));
    fs.writeFileSync(path.join(OUT, 'summary.json'), JSON.stringify(summary, null, 2));
    console.log('\n\nSUMMARY', JSON.stringify(summary, null, 2));
    if (summary.overflowCount || summary.layoutFail) process.exitCode = 2;
  } finally {
    await browser.close();
    await new Promise((r) => server.close(r));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
