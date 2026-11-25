/**
 * MasteryCap gallery v3 — Light / Sepia / Dark × iphone / ipad / mac × key screens.
 * Gate: CAPTURE_GALLERY=1 (or npm run gallery).
 * Output: docs/screenshots/gallery/<theme>/<device>/…webp + schema-v2 manifest.
 */
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'docs', 'screenshots', 'gallery');

const THEMES = ['light', 'sepia', 'dark'];
const DEVICES = {
  iphone: { width: 390, height: 844, deviceScaleFactor: 3 },
  ipad: { width: 1180, height: 820, deviceScaleFactor: 2 },
  mac: { width: 1440, height: 900, deviceScaleFactor: 2 },
};

const SCREENS = [
  { group: 'Today', screen: 'Today', state: 'demo', slug: 'today', caption: 'Guided daily session and continuity.', nav: async (page) => { await page.locator('#tabbar button[data-tab="today"]').click(); } },
  { group: 'Campus', screen: 'Campus', state: 'demo', slug: 'campus', caption: 'Three institute branches.', nav: async (page) => { await page.locator('#tabbar button[data-tab="campus"]').click(); } },
  { group: 'Campus', screen: 'School of Money', state: 'demo', slug: 'money', caption: 'Markets and money literacy track.', nav: async (page) => { await page.locator('#tabbar button[data-tab="campus"]').click(); await page.locator('[data-school="money"]').click(); } },
  { group: 'Practice', screen: 'Practice', state: 'demo', slug: 'practice', caption: 'Charts, review, Hasil, HTTP Lab.', nav: async (page) => { await page.locator('#tabbar button[data-tab="practice"]').click(); } },
  { group: 'Practice', screen: 'HTTP Lab', state: 'demo', slug: 'httplab', caption: 'Simulated HTTP request lab.', nav: async (page) => {
    await page.locator('#labBack').click({ timeout: 800 }).catch(() => {});
    await page.locator('#tabbar button[data-tab="practice"]').click();
    if (await page.locator('#prLab').count()) {
      await page.locator('#prLab').click();
      await page.waitForTimeout(250);
    }
  } },
  { group: 'Records', screen: 'Records', state: 'demo', slug: 'records', caption: 'Self-issued certificates and export.', nav: async (page) => {
    await page.locator('#labBack').click({ timeout: 800 }).catch(() => {});
    await page.waitForTimeout(150);
    await page.locator('#tabbar button[data-tab="records"]').click();
  } },
];

/** Extra Roman-Urdu language shots (iphone only) for MST-V3-1 matrix completeness. */
const UR_SCREENS = [
  { group: 'Today', screen: 'Today', state: 'demo-ur', slug: 'today-ur', caption: 'Today in Roman Urdu.', nav: SCREENS[0].nav },
  { group: 'Campus', screen: 'Campus', state: 'demo-ur', slug: 'campus-ur', caption: 'Campus in Roman Urdu.', nav: SCREENS[1].nav },
  { group: 'Records', screen: 'Records', state: 'demo-ur', slug: 'records-ur', caption: 'Records in Roman Urdu.', nav: SCREENS[5].nav },
];

function contentType(p) {
  if (p.endsWith('.html')) return 'text/html';
  if (p.endsWith('.js')) return 'text/javascript';
  if (p.endsWith('.css')) return 'text/css';
  if (p.endsWith('.webmanifest')) return 'application/manifest+json';
  if (p.endsWith('.woff2')) return 'font/woff2';
  if (p.endsWith('.png') || p.endsWith('.webp')) return 'image/' + path.extname(p).slice(1);
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

function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function shotRel({ theme, device, group, screen, state }) {
  return `${theme}/${device}/${slug(group)}--${slug(screen)}--${slug(state)}.webp`;
}

function pngToWebp(pngPath, webpPath) {
  fs.mkdirSync(path.dirname(webpPath), { recursive: true });
  const cwebp = spawnSync('cwebp', ['-q', '82', pngPath, '-o', webpPath], { encoding: 'utf8' });
  if (cwebp.status === 0 && fs.existsSync(webpPath)) {
    try { fs.unlinkSync(pngPath); } catch (_) { /* keep */ }
    return;
  }
  spawnSync('cp', [pngPath, webpPath]);
}

async function dismissSheets(page) {
  await page.evaluate(() => {
    try { localStorage.setItem('masterycap:readingGuideSeen', 'true'); } catch (e) { /* ignore */ }
    try { localStorage.setItem('masterycap:tourDone', 'true'); } catch (e) { /* ignore */ }
  }).catch(() => {});
  await page.locator('#tourSkip').click({ timeout: 800 }).catch(() => {});
  for (let i = 0; i < 6; i++) {
    const closed = await page.locator('.sheet-root.on [data-close], .sheet-root.on .sheet-x, #mbDismiss, #backupDismiss, #corruptKeep, #first-backup-sheet [data-close]')
      .first().click({ timeout: 400 }).then(() => true).catch(() => false);
    if (!closed) break;
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => {
    document.querySelectorAll('.sheet-root.on').forEach((el) => el.classList.remove('on'));
  }).catch(() => {});
}

async function seedProfile(page, { theme, lang }) {
  // Wipe IDB mirror too — hydrate() would otherwise resurrect EN admission state
  // after a localStorage-only clear and leave UR on "Begin application".
  await page.evaluate(() => new Promise((resolve) => {
    try {
      const req = indexedDB.deleteDatabase('masterycap');
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
      req.onblocked = () => resolve();
    } catch (_) { resolve(); }
  }));

  await page.evaluate(({ theme: mode, lang: language }) => {
    const doomed = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('masterycap:') || k === 'masterycap_active_ns')) doomed.push(k);
    }
    doomed.forEach((k) => localStorage.removeItem(k));

    const set = (k, v) => localStorage.setItem('masterycap:' + k, JSON.stringify(v));
    set('appearance', { mode, preset: 'original' });
    set('settings', { lang: language });
    set('tourDone', true);
    set('readingGuideSeen', true);
    set('firstBackupDone', true);
    // onboarded + campus required or boot skips renderNav (hidden empty tabbar)
    // / falls through to admission when onboarded is missing.
    set('onboarded', true);
    set('profile', {
      name: 'Gallery',
      language,
      ageBand: '18-24',
      buildExp: 'never',
      goal: 'apps',
      timeBand: '2-5',
      register: 'young',
      campus: true,
      admissionComplete: true,
      primaryBranch: 'software',
      starterSchool: 'software',
      starterCourse: 'SOFT-LEGACY',
      experience: 'new',
      markets: ['foundations'],
      studentIdNumber: 'MC-0001',
    });
    set('studentId', { name: 'Gallery', number: 'MC-0001', issued: '2026-10-14' });
  }, { theme, lang });
}

async function waitShell(page) {
  await page.waitForFunction(() => window.__APP_READY__ === true, null, { timeout: 15000 }).catch(() => {});
  await page.waitForSelector('#tabbar:not(.hidden) button[data-tab="today"]', { timeout: 15000 });
  await dismissSheets(page);
}

async function onboard(page) {
  await page.waitForSelector('#onbNext, #onbSkip, #tabbar', { timeout: 15000 });
  if (await page.locator('#tabbar:not(.hidden) button[data-tab]').count()) {
    await dismissSheets(page);
    return;
  }
  if (await page.locator('#onbSkip').count()) {
    await page.locator('#onbSkip').click();
  } else {
    await page.locator('#onbSkip').click({ timeout: 2000 }).catch(() => {});
  }
  await waitShell(page);
  await page.waitForTimeout(350);
}

async function applyTheme(page, theme) {
  await page.evaluate((mode) => {
    localStorage.setItem('masterycap:appearance', JSON.stringify({ mode, preset: 'original' }));
    document.documentElement.dataset.theme = mode;
    document.documentElement.dataset.mode = mode;
    if (typeof window.applyTheme === 'function') window.applyTheme();
  }, theme);
  // Click Records theme buttons if present after navigation later; also force CSS vars via reload seed.
}

(async () => {
  if (process.env.CAPTURE_GALLERY !== '1' && process.env.npm_lifecycle_event !== 'gallery') {
    console.error('Set CAPTURE_GALLERY=1 or run via npm run gallery');
    process.exit(2);
  }

  fs.mkdirSync(outDir, { recursive: true });
  const { server, base } = await startServer();
  const browser = await chromium.launch();
  const shots = [];
  const clockMs = Date.parse('2026-10-14T09:41:00.000Z');

  for (const theme of THEMES) {
    for (const [device, vp] of Object.entries(DEVICES)) {
      const colorScheme = theme === 'dark' ? 'dark' : 'light';
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: vp.deviceScaleFactor,
        colorScheme,
      });
      await ctx.addInitScript((fixed) => {
        const RealDate = Date;
        class FakeDate extends RealDate {
          constructor(...args) {
            if (args.length === 0) super(fixed);
            else super(...args);
          }
          static now() { return fixed; }
          static parse = RealDate.parse;
          static UTC = RealDate.UTC;
        }
        FakeDate.prototype = RealDate.prototype;
        window.Date = FakeDate;
      }, clockMs);

      const page = await ctx.newPage();
      await page.addInitScript(() => {
        const style = document.createElement('style');
        style.textContent = '*,*::before,*::after{animation:none!important;transition:none!important}';
        document.documentElement.appendChild(style);
      });

      await page.goto(base, { waitUntil: 'domcontentloaded' });
      await seedProfile(page, { theme, lang: 'en' });
      await page.reload({ waitUntil: 'domcontentloaded' });
      await waitShell(page);
      await page.evaluate(() => document.fonts?.ready).catch(() => {});
      await applyTheme(page, theme);
      // Re-apply via Records theme toggle for token paint
      await page.locator('#tabbar button[data-tab="records"]').click().catch(() => {});
      await page.waitForTimeout(200);
      const themeBtn = page.locator(`[data-theme="${theme}"]`);
      if (await themeBtn.count()) await themeBtn.click().catch(() => {});
      await page.waitForTimeout(150);

      for (const screen of SCREENS) {
        await dismissSheets(page);
        await page.locator('#labBack').click({ timeout: 400 }).catch(() => {});
        await screen.nav(page);
        await page.waitForTimeout(350);
        await dismissSheets(page);
        await page.evaluate(() => document.fonts?.ready).catch(() => {});

        const rel = shotRel({ theme, device, group: screen.group, screen: screen.screen, state: screen.state });
        const webpPath = path.join(outDir, rel);
        const pngPath = webpPath.replace(/\.webp$/, '.png');
        fs.mkdirSync(path.dirname(pngPath), { recursive: true });
        await page.screenshot({ path: pngPath, fullPage: false, animations: 'disabled' });
        pngToWebp(pngPath, webpPath);

        shots.push({
          id: `${slug(screen.group)}--${slug(screen.screen)}--${slug(screen.state)}`,
          group: screen.group,
          screen: screen.screen,
          state: screen.state,
          theme,
          device,
          file: rel,
          route: `[data-tab] ${screen.slug}`,
          caption: screen.caption,
          w: vp.width * vp.deviceScaleFactor,
          h: vp.height * vp.deviceScaleFactor,
          lang: 'en',
        });
        console.log('shot', rel);
      }

      await ctx.close();

      // Roman Urdu subset on iphone — fresh context so EN IDB/admission cannot leak.
      if (device === 'iphone') {
        const urCtx = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          deviceScaleFactor: vp.deviceScaleFactor,
          colorScheme,
        });
        await urCtx.addInitScript((fixed) => {
          const RealDate = Date;
          class FakeDate extends RealDate {
            constructor(...args) {
              if (args.length === 0) super(fixed);
              else super(...args);
            }
            static now() { return fixed; }
            static parse = RealDate.parse;
            static UTC = RealDate.UTC;
          }
          FakeDate.prototype = RealDate.prototype;
          window.Date = FakeDate;
        }, clockMs);
        const urPage = await urCtx.newPage();
        await urPage.addInitScript(() => {
          const style = document.createElement('style');
          style.textContent = '*,*::before,*::after{animation:none!important;transition:none!important}';
          document.documentElement.appendChild(style);
        });

        await urPage.goto(base, { waitUntil: 'domcontentloaded' });
        await seedProfile(urPage, { theme, lang: 'ur' });
        await urPage.reload({ waitUntil: 'domcontentloaded' });
        await waitShell(urPage);
        await applyTheme(urPage, theme);
        await urPage.locator('#tabbar button[data-tab="records"]').click();
        const themeBtn2 = urPage.locator(`[data-theme="${theme}"]`);
        if (await themeBtn2.count()) await themeBtn2.click().catch(() => {});

        for (const screen of UR_SCREENS) {
          await dismissSheets(urPage);
          await urPage.locator('#labBack').click({ timeout: 400 }).catch(() => {});
          await screen.nav(urPage);
          await urPage.waitForTimeout(350);
          await dismissSheets(urPage);

          const rel = shotRel({ theme, device, group: screen.group, screen: screen.screen, state: screen.state });
          const webpPath = path.join(outDir, rel);
          const pngPath = webpPath.replace(/\.webp$/, '.png');
          fs.mkdirSync(path.dirname(pngPath), { recursive: true });
          await urPage.screenshot({ path: pngPath, fullPage: false, animations: 'disabled' });
          pngToWebp(pngPath, webpPath);

          shots.push({
            id: `${slug(screen.group)}--${slug(screen.screen)}--${slug(screen.state)}`,
            group: screen.group,
            screen: screen.screen,
            state: screen.state,
            theme,
            device,
            file: rel,
            route: `[data-tab] ${screen.slug}`,
            caption: screen.caption,
            w: vp.width * vp.deviceScaleFactor,
            h: vp.height * vp.deviceScaleFactor,
            lang: 'ur',
          });
          console.log('shot', rel);
        }

        await urCtx.close();
      }
    }
  }

  const version = JSON.parse(fs.readFileSync(path.join(root, 'VERSION.json'), 'utf8')).version;
  shots.sort((a, b) => a.file.localeCompare(b.file));
  fs.writeFileSync(
    path.join(outDir, 'gallery-manifest.json'),
    JSON.stringify({
      app: 'MasteryCap',
      version,
      capturedAt: new Date().toISOString(),
      accent: '#E8590C',
      schema: 2,
      themes: THEMES,
      languages: ['en', 'ur'],
      shots,
    }, null, 2),
  );

  await browser.close();
  server.close();
  console.log(`done: ${shots.length} shots (schema v2, themes=${THEMES.join(',')})`);
  const expectedMin = THEMES.length * Object.keys(DEVICES).length * SCREENS.length;
  if (shots.length < expectedMin) {
    console.warn(`expected ≥ ${expectedMin} EN shots, got ${shots.length}`);
    process.exitCode = 1;
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
