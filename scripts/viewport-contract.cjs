#!/usr/bin/env node
/** Viewport shell contract — MasteryCap tabs always; desktop-tabs ≥900 */
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { DESKTOP_BP, applyDeviceChrome, probeLayout, expectedLayout } = require('../tests/device-matrix.cjs');

const root = path.join(__dirname, '..');

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let url = decodeURIComponent((req.url || '/').split('?')[0]);
      if (url === '/') url = '/index.html';
      const file = path.join(root, url.replace(/^\//, ''));
      if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404); res.end('missing'); return;
      }
      const ext = path.extname(file);
      const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json' };
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, base: `http://127.0.0.1:${server.address().port}` }));
  });
}

async function seed(page) {
  await page.evaluate(() => {
    const ns = 'masterycap:';
    const set = (k, v) => localStorage.setItem(ns + k, JSON.stringify(v));
    set('onboarded', true);
    set('profile', { name: 'QA', campus: true, register: 'young', starterCourse: 'WEB-101', primaryBranch: 'software' });
    set('settings', { lang: 'en', fontSize: 'M', haptics: false });
    set('appearance', { mode: 'dark' });
    set('institute', { activeCourse: 'WEB-101', enrollments: { 'WEB-101': { at: 1 } }, completedLessons: {}, finals: {}, certificates: {}, srs: [], attempts: {}, projectEvidence: {} });
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(700);
  await page.evaluate(() => document.getElementById('splash')?.remove());
  await page.waitForSelector('.tabbar .tab', { timeout: 15000 });
}

async function main() {
  const { server, base } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let failed = 0;
  const cases = [
    { w: 375, h: 812, id: 'phone' },
    { w: 699, h: 800, id: 'just-under-old-768' },
    { w: 744, h: 1133, id: 'ipad-mini-width' },
    { w: DESKTOP_BP - 1, h: 900, id: 'just-under-900' },
    { w: DESKTOP_BP, h: 900, id: 'desktop-bp' },
    { w: 1280, h: 800, id: 'laptop' },
  ];
  try {
    await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
    await seed(page);
    for (const c of cases) {
      await applyDeviceChrome(page, {
        id: c.id, label: c.id, width: c.w, height: c.h,
        chrome: 'browser', safeTop: 20, safeBottom: 20, family: 'browser',
      });
      await page.waitForTimeout(150);
      const probe = await probeLayout(page);
      const expect = expectedLayout(c.w);
      const ok = !probe.overflow && probe.tabsVisible && !probe.sideVisible && probe.layout === expect
        && (probe.tabHeight == null || probe.tabHeight >= 44);
      console.log(`${ok ? 'PASS' : 'FAIL'} ${c.id} ${c.w}px layout=${probe.layout} expect=${expect} overflow=${probe.overflow} tabH=${probe.tabHeight}`);
      if (!ok) failed += 1;
    }
  } finally {
    await browser.close();
    await new Promise((r) => server.close(r));
  }
  if (failed) {
    console.error(`FAIL viewport contract (${failed})`);
    process.exit(1);
  }
  console.log('PASS viewport contract');
}

main().catch((e) => { console.error(e); process.exit(1); });
