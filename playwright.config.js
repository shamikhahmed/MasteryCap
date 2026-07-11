import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  retries: 0,
  use: {
    headless: true,
    viewport: { width: 375, height: 812 },
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
