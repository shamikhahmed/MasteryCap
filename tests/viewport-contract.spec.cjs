// @ts-check
/** Viewport contract: shell BP 900 — tabs always; desktop-tabs ≥900 */
const { test, expect } = require('@playwright/test');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { DESKTOP_BP, applyDeviceChrome, probeLayout, expectedLayout } = require('./device-matrix.cjs');

const ROOT = path.join(__dirname, '..');

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let url = decodeURIComponent((req.url || '/').split('?')[0]);
      if (url === '/') url = '/index.html';
      const file = path.join(ROOT, url.replace(/^\//, ''));
      if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404); res.end('missing'); return;
      }
      const ext = path.extname(file);
      const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json' };
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
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
  await page.waitForTimeout(800);
  await page.evaluate(() => document.getElementById('splash')?.remove());
  await page.waitForSelector('.tabbar .tab', { timeout: 15000 });
}

test.describe('Viewport shell contract', () => {
  /** @type {import('http').Server} */
  let server;
  let base;

  test.beforeAll(async () => {
    server = await startServer();
    base = `http://127.0.0.1:${server.address().port}`;
  });
  test.afterAll(async () => {
    await new Promise((r) => server.close(r));
  });

  const cases = [
    { w: 375, h: 812, id: 'phone' },
    { w: 699, h: 800, id: 'just-under-old-768' },
    { w: 744, h: 1133, id: 'ipad-mini-width' },
    { w: DESKTOP_BP - 1, h: 900, id: 'just-under-900' },
    { w: DESKTOP_BP, h: 900, id: 'desktop-bp' },
    { w: 1280, h: 800, id: 'laptop' },
  ];

  for (const c of cases) {
    test(`${c.id} ${c.w}px → ${expectedLayout(c.w)}`, async ({ page }) => {
      await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
      await seed(page);
      await applyDeviceChrome(page, {
        id: c.id, label: c.id, width: c.w, height: c.h,
        chrome: 'browser', safeTop: 20, safeBottom: 20, family: 'browser',
      });
      await page.waitForTimeout(200);
      const probe = await probeLayout(page);
      expect(probe.overflow).toBe(false);
      expect(probe.tabsVisible).toBe(true);
      expect(probe.sideVisible).toBe(false);
      expect(probe.layout).toBe(expectedLayout(c.w));
      if (probe.tabHeight != null) expect(probe.tabHeight).toBeGreaterThanOrEqual(44);
    });
  }
});
