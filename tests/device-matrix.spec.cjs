// @ts-check
/**
 * Device matrix visual QA — set DEVICE_MATRIX=1 to capture.
 * Out: qa/device-matrix/{family}/{device-id}/{screen}.png + meta.json
 */
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const http = require('http');
const {
  fastGalleryUnlock, prepareGalleryShot, dismissOverlays,
  gotoTab, openSettingsSheet, showAdmission, BASE,
} = require('./demo-unlock.cjs');
const {
  ALL_DEVICES, MAJOR_SCREENS, applyDeviceChrome, probeLayout, expectedLayout, DESKTOP_BP,
} = require('./device-matrix.cjs');

const OUT = path.join(__dirname, '..', 'qa', 'device-matrix');
const RUN = process.env.DEVICE_MATRIX === '1';
const ROOT = path.join(__dirname, '..');

function startStaticServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let url = decodeURIComponent((req.url || '/').split('?')[0]);
      if (url === '/') url = '/index.html';
      const file = path.join(ROOT, url.replace(/^\//, ''));
      if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404); res.end('missing'); return;
      }
      const ext = path.extname(file);
      const types = {
        '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
        '.woff2': 'font/woff2', '.png': 'image/png', '.svg': 'image/svg+xml',
        '.webmanifest': 'application/manifest+json',
      };
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

test.describe('Device matrix visual QA', () => {
  test.skip(!RUN, 'Set DEVICE_MATRIX=1 to capture');

  test('capture major screens across iPhone / iPad / browser', async ({ page }) => {
    test.setTimeout(45 * 60 * 1000);
    fs.mkdirSync(OUT, { recursive: true });
    /** @type {object[]} */
    const meta = [];

    let server = null;
    let base = BASE;
    if (!process.env.MASTERYCAP_BASE) {
      server = await startStaticServer();
      base = `http://127.0.0.1:${server.address().port}`;
      process.env.MASTERYCAP_BASE = base;
    }

    try {
      // Re-bind BASE used by unlock via goto absolute
      await page.goto(base + '/?qa=matrix', { waitUntil: 'domcontentloaded' });
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
      await page.waitForTimeout(1000);
      await page.evaluate(() => {
        const splash = document.getElementById('splash');
        if (splash) { splash.classList.add('hide'); splash.remove(); }
      });
      await page.waitForSelector('#tabbar .tab, .tabbar .tab', { timeout: 20000 });

      for (const device of ALL_DEVICES) {
        const dir = path.join(OUT, device.family, device.id);
        fs.mkdirSync(dir, { recursive: true });
        await applyDeviceChrome(page, device);

        for (const screen of MAJOR_SCREENS) {
          await dismissOverlays(page);
          await applyDeviceChrome(page, device);

          if (screen.kind === 'admission') {
            await page.evaluate(async () => {
              const tabbar = document.getElementById('tabbar');
              if (tabbar) tabbar.classList.add('hidden');
              const mod = await import('/js/views/admission.js');
              const fakeApp = {
                lang: 'en',
                profile: null,
                haptic() {},
                setLang() {},
                render() {},
                renderNav() {},
                t(k) {
                  const map = {
                    begin: 'Begin application', skip: 'Skip', back: 'Back', next: 'Next',
                    continue: 'Continue',
                  };
                  return map[k] || k;
                },
              };
              if (mod.renderAdmission) {
                await mod.renderAdmission(fakeApp, () => document.getElementById('app-root'));
              }
            });
            await page.waitForTimeout(350);
            await prepareGalleryShot(page, { preserveOverlays: true });
          } else if (screen.kind === 'overlay') {
            await page.evaluate(() => {
              const tabbar = document.getElementById('tabbar');
              if (tabbar) tabbar.classList.remove('hidden');
            });
            await gotoTab(page, 'today');
            await applyDeviceChrome(page, device);
            await page.evaluate(async () => {
              const { openSettings } = await import('/js/settings.js');
              // App is module-scoped — rebuild minimal via Today gear click
              const btn = document.getElementById('tdSettings');
              if (btn) btn.click();
            });
            await page.waitForTimeout(400);
            const hasSheet = await page.locator('#settings-sheet').count();
            if (!hasSheet) {
              // Fallback: import openSettings needs App — use click path after ensuring Today rendered
              await gotoTab(page, 'today');
              await page.click('#tdSettings', { timeout: 5000 }).catch(() => {});
              await page.waitForTimeout(400);
            }
            await prepareGalleryShot(page, { preserveOverlays: true });
          } else {
            await page.evaluate(() => {
              const tabbar = document.getElementById('tabbar');
              if (tabbar) tabbar.classList.remove('hidden');
            });
            await gotoTab(page, screen.tab);
            await applyDeviceChrome(page, device);
            await prepareGalleryShot(page);
          }

          const probe = await probeLayout(page);
          const expectLayout = expectedLayout(device.width);
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
            expectedLayout: expectLayout,
            layoutOk: probe.layout === expectLayout || (screen.kind === 'admission' && !probe.tabsVisible),
            ...probe,
            file: path.relative(ROOT, file),
          });

          if (screen.kind === 'admission' || screen.kind === 'overlay') {
            await dismissOverlays(page);
            await page.evaluate(() => {
              const tabbar = document.getElementById('tabbar');
              if (tabbar) tabbar.classList.remove('hidden');
            });
            await gotoTab(page, 'today');
          }
        }
      }

      fs.writeFileSync(path.join(OUT, 'meta.json'), JSON.stringify(meta, null, 2));
      fs.writeFileSync(path.join(OUT, 'summary.json'), JSON.stringify({
        desktopBp: DESKTOP_BP,
        devices: ALL_DEVICES.length,
        screens: MAJOR_SCREENS.length,
        shots: meta.length,
        overflowCount: meta.filter((m) => m.overflow).length,
        layoutFail: meta.filter((m) => m.layoutOk === false).length,
      }, null, 2));

      for (const d of ALL_DEVICES) {
        expect(fs.existsSync(path.join(OUT, d.family, d.id, 'today.png'))).toBe(true);
      }
    } finally {
      if (server) await new Promise((r) => server.close(r));
    }
  });
});
