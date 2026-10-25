/**
 * HIG design gate — Today, Campus, Practice, Records, Settings sheet (light, sepia, dark).
 * Captures before/after evidence when HIG_SHOTS=<label> (writes build/qa/hig/<label>/).
 * Run with a static server, e.g. `npx playwright test -c build/qa/hig/pw.config.mjs tests/hig-design.spec.mjs`.
 */
import { test, expect } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const LABEL = process.env.HIG_SHOTS || '';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'build', 'qa', 'hig', LABEL || 'tmp');

async function shot(page, name) {
  if (!LABEL) return;
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, name + '.png') });
}

async function onboard(page) {
  await page.waitForSelector('#onbNext, #tabbar', { timeout: 15000 });
  // Step through admission generically: fill name, pick the first option in a group, else Skip/Next
  for (let i = 0; i < 40; i++) {
    if (await page.locator('#tabbar:not(.hidden)').count()) break;
    if (await page.locator('#onbName').isVisible().catch(() => false)) await page.locator('#onbName').fill('Sara');
    const opt = page.locator('#app-root .onb-main button').first();
    if (await opt.isVisible().catch(() => false)) await opt.click();
    const next = page.locator('#onbNext');
    if (await next.isVisible().catch(() => false) && await next.isEnabled().catch(() => false)) await next.click();
    else await page.getByRole('button', { name: /^Skip$/ }).first().click({ timeout: 1500 }).catch(() => {});
    await page.waitForTimeout(250);
  }
  await page.waitForSelector('#tabbar:not(.hidden)', { timeout: 8000 });
  await page.locator('#first-backup-sheet [data-close]').first().click({ timeout: 800 }).catch(() => {});
}

async function go(page, name) {
  await page.locator(`#tabbar [data-tab="${name}"]`).click();
  await page.waitForTimeout(700);
}

for (const mode of ['light', 'dark', 'sepia']) {
  test.describe(`HIG phone · ${mode}`, () => {
    test.use({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });

    test(`today, campus, practice, records, settings (${mode})`, async ({ page }) => {
      await page.addInitScript((m) => localStorage.setItem('masterycap:appearance', JSON.stringify({ mode: m, preset: 'original' })), mode);
      await page.goto('/');
      await shot(page, `phone-${mode}-00-welcome`);
      await onboard(page);
      await go(page, 'today');
      await shot(page, `phone-${mode}-01-today`);

      const tabs = page.locator('#tabbar [role="tab"]');
      await expect(tabs).toHaveCount(4);
      for (const h of await tabs.evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height))) {
        expect.soft(h).toBeGreaterThanOrEqual(44);
      }

      await go(page, 'campus');
      await shot(page, `phone-${mode}-02-campus`);
      await go(page, 'practice');
      await shot(page, `phone-${mode}-03-practice`);
      await go(page, 'records');
      await shot(page, `phone-${mode}-04-records`);
      await go(page, 'today');
      await page.locator('#tdSettings').click();
      await page.locator('#settings-sheet .sheet').waitFor();
      await shot(page, `phone-${mode}-05-settings`);
    });
  });
}

test.describe('HIG iPad', () => {
  test.use({ viewport: { width: 1180, height: 820 } });

  test('today + campus wide', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('masterycap:appearance', JSON.stringify({ mode: 'dark', preset: 'original' })));
    await page.goto('/');
    await onboard(page);
    await go(page, 'today');
    await shot(page, 'ipad-dark-01-today');
    await go(page, 'campus');
    await shot(page, 'ipad-dark-02-campus');
  });
});
