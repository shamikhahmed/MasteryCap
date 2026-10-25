#!/usr/bin/env node
/**
 * iPhone/WebKit behaviour check (Cap fleet mobile bugs), adapted from ScentCap scripts/ios-behaviour-check.mjs.
 * Usage: python3 -m http.server 8774  →  node scripts/ios-behaviour-check.mjs [baseUrl]   (default http://127.0.0.1:8774/)
 * Checks: tab bar tappable, no sideways overflow, the document scrolls, tab taps don't reload and open at top,
 * settings sheet locks + restores the page, appearance change applies without a reload, inputs ≥16px, SW.
 */
import { webkit, devices } from '@playwright/test';
import fs from 'node:fs';

const BASE = process.argv[2] || 'http://127.0.0.1:8774/';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });
const step = async (name, fn) => {
  try {
    await fn();
  } catch (e) {
    check(name, false, String(e.message || e).split('\n')[0]);
  }
};

const browser = await webkit.launch();
const ctx = await browser.newContext({ ...devices['iPhone 15 Pro'], serviceWorkers: 'block' });
const page = await ctx.newPage();
page.setDefaultTimeout(8000);

await page.goto(BASE);
await page.waitForSelector('#onbNext, #tabbar', { timeout: 30000 });
for (let i = 0; i < 40; i++) {
  if (await page.locator('#tabbar:not(.hidden)').count()) break;
  if (await page.locator('#onbName').isVisible().catch(() => false)) await page.locator('#onbName').fill('Sara');
  const opt = page.locator('#app-root .onb-main button').first();
  if (await opt.isVisible().catch(() => false)) await opt.tap();
  const next = page.locator('#onbNext');
  if (await next.isVisible().catch(() => false) && await next.isEnabled().catch(() => false)) await next.tap();
  else await page.getByRole('button', { name: /^Skip$/ }).first().tap({ timeout: 1500 }).catch(() => {});
  await page.waitForTimeout(250);
}
check('admission completes by tapping', await page.locator('#tabbar:not(.hidden)').count() > 0);
await page.locator('#first-backup-sheet [data-close]').first().tap({ timeout: 1500 }).catch(() => {});
await page.waitForTimeout(800);
await page.evaluate(() => { window.__noReload = 1; });

// 1. Tabs are topmost at their centre and ≥44pt
const covered = await page.evaluate(() =>
  [...document.querySelectorAll('#tabbar .tab')].filter((t) => {
    const r = t.getBoundingClientRect();
    return !t.contains(document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2));
  }).map((t) => t.textContent.trim()),
);
check('tab bar tappable', covered.length === 0, covered.join(','));
const small = await page.evaluate(() =>
  [...document.querySelectorAll('#tabbar .tab')].filter((t) => t.getBoundingClientRect().height < 44).length,
);
check('tab hit areas ≥44pt', small === 0, `${small} small`);

// 2. No sideways overflow; the document is the scroller
for (const tab of ['today', 'campus', 'practice', 'records']) {
  await page.locator(`#tabbar [data-tab="${tab}"]`).tap();
  await page.waitForTimeout(700);
  const m = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    iw: innerWidth,
    inner: getComputedStyle(document.getElementById('app-root')).overflowY,
    body: getComputedStyle(document.body).overscrollBehaviorY,
  }));
  check(`no sideways overflow · ${tab}`, m.sw <= m.iw + 1, `${m.sw} > ${m.iw}`);
  check(`document scrolls, native bounce · ${tab}`, m.inner === 'visible' && m.body !== 'none', JSON.stringify(m));
}

// 3. Tab tap: new screen at top, no reload
await step('navigation by tapping', async () => {
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(200);
  await page.locator('#tabbar [data-tab="campus"]').tap();
  await page.waitForTimeout(700);
  const nav = await page.evaluate(() => ({ y: scrollY, marker: window.__noReload }));
  check('tab tap navigates (no reload)', nav.marker === 1, JSON.stringify(nav));
  check('new screen opens at top', nav.y === 0, `scrollY ${nav.y}`);
});

// 4. Settings sheet: page pinned + restored; appearance change applies without reloading
let smallInputs = 0;
await step('settings sheet', async () => {
  await page.locator('#tabbar [data-tab="records"]').tap();
  await page.waitForTimeout(700);
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(200);
  const before = await page.evaluate(() => scrollY);
  await page.evaluate(() => document.getElementById('recSet').click());
  await page.locator('#settings-sheet .sheet').waitFor();
  await page.waitForTimeout(400);
  const locked = await page.evaluate(() => document.body.style.position);
  smallInputs = await page.evaluate(() =>
    [...document.querySelectorAll('#settings-sheet input, #settings-sheet select, #settings-sheet textarea')]
      .filter((el) => el.offsetParent !== null && parseFloat(getComputedStyle(el).fontSize) < 16).length,
  );
  await page.locator('#settings-sheet [data-mode="dark"]').tap();
  await page.waitForTimeout(600);
  const theme = await page.evaluate(() => ({ t: document.documentElement.dataset.theme, marker: window.__noReload }));
  check('appearance change applies without reload', theme.t === 'dark' && theme.marker === 1, JSON.stringify(theme));
  await page.locator('#settings-sheet .sheet-x').first().tap();
  await page.waitForTimeout(500);
  const after = await page.evaluate(() => scrollY);
  check('page locked behind sheet', locked === 'fixed', `body position "${locked}"`);
  check('sheet keeps scroll position', Math.abs(after - before) < 4, `before ${before} after ${after}`);
});
check('inputs ≥16px (no zoom-on-focus)', smallInputs === 0, `${smallInputs} small`);
check('no reload during session', (await page.evaluate(() => window.__noReload)) === 1);

// 5. Service worker never self-activates over a running app
const sw = fs.readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
check('SW: no skipWaiting/clients.claim', !/skipWaiting\(\)|clients\.claim\(\)/.test(sw));

await browser.close();
let fail = 0;
for (const r of results) {
  if (!r.ok) fail++;
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok || !r.detail ? '' : `  (${r.detail})`}`);
}
process.exit(fail ? 1 : 0);
