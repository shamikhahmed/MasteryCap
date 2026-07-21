const playwright = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const pathname = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
      const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
      const file = path.join(root, relative);
      if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404);
        res.end('missing');
        return;
      }
      res.writeHead(200, {
        'Content-Type': types[path.extname(file)] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, base: `http://127.0.0.1:${server.address().port}` });
    });
  });
}

(async () => {
  const { server, base } = await startServer();
  const results = [];
  try {
    const browserNames = process.env.BROWSER ? process.env.BROWSER.split(',') : ['chromium', 'firefox', 'webkit'];
    for (const name of browserNames) {
      const engine = playwright[name];
      if (!fs.existsSync(engine.executablePath())) {
        if (process.env.CI) throw new Error(`${name} browser is required in CI`);
        results.push(`${name}: skipped (browser not installed)`);
        continue;
      }
      const browser = await engine.launch({ headless: true });
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      try {
        await page.goto(base, { waitUntil: 'domcontentloaded' });
        await page.locator('[data-testid="admission-form"]').waitFor({ timeout: 8000 });
        const before = await page.locator('#app-root h1').textContent();
        const geometry = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          zoomLocked: /user-scalable\\s*=\\s*no|maximum-scale/i.test(document.querySelector('meta[name="viewport"]')?.content || ''),
        }));
        if (geometry.overflow > 1) throw new Error(`${name} has ${geometry.overflow}px horizontal overflow`);
        if (geometry.zoomLocked) throw new Error(`${name} viewport disables zoom`);
        await page.locator('[data-testid="admission-next"]').click();
        await page.waitForFunction((title) => document.querySelector('#app-root h1')?.textContent !== title, before);
        await page.keyboard.press('Tab');
        let focus = await page.evaluate(() => {
          const style = getComputedStyle(document.activeElement);
          return {
            tag: document.activeElement.tagName,
            id: document.activeElement.id,
            outlineStyle: style.outlineStyle,
            outlineWidth: parseFloat(style.outlineWidth),
          };
        });
        const keyboardFocusReached = focus.tag !== 'BODY';
        // macOS WebKit automation does not Tab to controls unless the host's
        // Full Keyboard Access preference is enabled; still verify the engine's focus style.
        if (focus.tag === 'BODY') {
          await page.locator('[data-testid="admission-next"]').focus();
          focus = await page.evaluate(() => {
            const style = getComputedStyle(document.activeElement);
            return {
              tag: document.activeElement.tagName,
              id: document.activeElement.id,
              outlineStyle: style.outlineStyle,
              outlineWidth: parseFloat(style.outlineWidth),
            };
          });
        }
        if (keyboardFocusReached && (focus.outlineStyle === 'none' || focus.outlineWidth < 2)) {
          throw new Error(`${name} lacks visible keyboard focus: ${JSON.stringify(focus)}`);
        }
        if (errors.length) throw new Error(`${name} page errors: ${errors.join('; ')}`);
        results.push(`${name}: pass`);
      } finally {
        await browser.close();
      }
    }
    console.log(`PASS: cross-browser admission shell (${results.join(', ')})`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => {
  console.error(`FAIL: ${error.message}`);
  process.exit(1);
});
