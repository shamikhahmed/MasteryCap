// @ts-check
/** Demo / gallery unlock for MasteryCap device-matrix + screenshots */

const BASE = process.env.MASTERYCAP_BASE || 'http://127.0.0.1:8777';

/**
 * Seed onboarded campus student and land on Today.
 * @param {import('@playwright/test').Page} page
 */
async function fastGalleryUnlock(page) {
  await page.goto(BASE + '/?qa=matrix', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.evaluate(() => {
    const ns = 'masterycap:';
    const set = (k, v) => localStorage.setItem(ns + k, JSON.stringify(v));
    set('onboarded', true);
    set('profile', {
      name: 'QA Learner',
      campus: true,
      register: 'young',
      ageBand: '18-24',
      goal: 'apps',
      timeBand: '2-5',
      primaryBranch: 'software',
      starterCourse: 'WEB-101',
      starterSchool: 'software',
    });
    set('settings', {
      lang: 'en', fontSize: 'M', haptics: false,
      strictMode: false, checklistGate: false, highContrast: false,
    });
    set('appearance', { mode: 'dark' });
    set('institute', {
      activeCourse: 'WEB-101',
      enrollments: { 'WEB-101': { at: Date.now() } },
      completedLessons: {},
      finals: {},
      certificates: {},
      srs: [],
      attempts: {},
      projectEvidence: {},
    });
    // Kill splash ASAP if present after reload
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    const splash = document.getElementById('splash');
    if (splash) { splash.classList.add('hide'); splash.remove(); }
  });
  await page.waitForSelector('#tabbar .tab, .tabbar .tab', { timeout: 15000 });
}

/**
 * @param {import('@playwright/test').Page} page
 */
async function dismissOverlays(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.sheet-root.on, #tour-sheet, #corrupt-sheet, .sw-toast.on').forEach((el) => {
      el.classList.remove('on');
      if (el.id === 'tour-sheet' || el.id === 'corrupt-sheet' || el.classList.contains('sheet-root')) {
        try { el.remove(); } catch (e) {}
      }
    });
    document.querySelectorAll('.reading-guide').forEach((el) => el.remove());
  });
  await page.waitForTimeout(60);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {{ preserveOverlays?: boolean }} [opts]
 */
async function prepareGalleryShot(page, opts = {}) {
  if (!opts.preserveOverlays) await dismissOverlays(page);
  await page.evaluate(() => {
    document.fonts?.ready?.catch?.(() => {});
  });
  await page.waitForTimeout(120);
}

/**
 * Navigate primary tabs via App shell.
 * @param {import('@playwright/test').Page} page
 * @param {string} tab
 */
async function gotoTab(page, tab) {
  await dismissOverlays(page);
  const clicked = await page.evaluate((id) => {
    const btn = document.querySelector(`.tab[data-tab="${id}"]`);
    if (btn) {
      btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      return true;
    }
    return false;
  }, tab);
  if (!clicked) throw new Error(`tab not found: ${tab}`);
  await page.waitForTimeout(450);
}

/**
 * Open settings sheet from Today gear when possible.
 * @param {import('@playwright/test').Page} page
 */
async function openSettingsSheet(page) {
  await gotoTab(page, 'today');
  await page.evaluate(() => {
    const btn = document.getElementById('tdSettings');
    if (btn) btn.click();
  });
  await page.waitForSelector('#settings-sheet.on, #settings-sheet.sheet-root', { timeout: 8000 });
  await page.waitForTimeout(200);
}

/**
 * Show admission gate without wiping other localStorage permanently.
 * @param {import('@playwright/test').Page} page
 */
async function showAdmission(page) {
  await dismissOverlays(page);
  await page.evaluate(async () => {
    const root = document.getElementById('app-root');
    const tabbar = document.getElementById('tabbar');
    if (tabbar) tabbar.classList.add('hidden');
    // Dynamic import admission renderer
    const mod = await import('./js/views/admission.js');
    const fakeApp = {
      lang: 'en',
      t: (k) => k,
      profile: null,
      haptic: () => {},
      setLang: () => {},
      render: () => {},
      renderNav: () => {},
    };
    if (root && mod.renderAdmission) {
      await mod.renderAdmission(fakeApp, root);
    }
  });
  await page.waitForTimeout(300);
}

module.exports = {
  BASE,
  fastGalleryUnlock,
  dismissOverlays,
  prepareGalleryShot,
  gotoTab,
  openSettingsSheet,
  showAdmission,
};
