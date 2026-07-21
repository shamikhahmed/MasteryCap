const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function contentType(file) {
  if (file.endsWith('.html')) return 'text/html';
  if (file.endsWith('.js')) return 'text/javascript';
  if (file.endsWith('.css')) return 'text/css';
  if (file.endsWith('.woff2')) return 'font/woff2';
  return 'application/octet-stream';
}

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = decodeURIComponent((req.url || '/').split('?')[0]);
      if (url === '/' || url === '/blank.html') {
        res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' });
        res.end('<!doctype html><link rel="stylesheet" href="/css/app.css"><body><main id="root"></main></body>');
        return;
      }
      const file = path.join(root, url.replace(/^\//, ''));
      if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404);
        res.end('missing');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType(file), 'Cache-Control': 'no-store' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, base: `http://127.0.0.1:${server.address().port}` });
    });
  });
}

(async () => {
  const { server, base } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(`${base}/blank.html`);
    const result = await page.evaluate(async () => {
      const [{ renderJournal }, { renderHttpLab }, { openSettings }] = await Promise.all([
        import('/js/views/journal.js'),
        import('/js/views/http-lab.js'),
        import('/js/settings.js'),
      ]);
      let checklist = {};
      const trades = [];
      const App = {
        lang: 'en',
        profile: { name: 'Learner' },
        t: (key) => key,
        getBalance: () => 1000,
        setBalance: () => {},
        getTrades: () => trades,
        setTrades: () => {},
        getChecklist: () => checklist,
        setChecklist: (value) => { checklist = value; },
        money: (value) => `$${Number(value) || 0}`,
        sparkline: () => '',
        countUp: (node, value) => { if (node) node.textContent = String(value); },
        haptic: () => {},
        bumpStreak: () => {},
        render: () => {},
        renderNav: () => {},
        restoreFocus: () => {},
        navigate: () => {},
        setLang: () => {},
      };
      const rootNode = document.getElementById('root');
      const unlabelled = (scope) => [...scope.querySelectorAll('input:not([type="hidden"]):not([hidden]), select:not([hidden]), textarea:not([hidden])')]
        .filter((control) => !control.labels?.length && !control.hasAttribute('aria-label') && !control.hasAttribute('aria-labelledby'))
        .map((control) => control.id || control.tagName);

      renderJournal(App, rootNode);
      const journalUnlabelled = unlabelled(rootNode);
      renderHttpLab(App, rootNode);
      const labUnlabelled = unlabelled(rootNode);
      openSettings(App);
      const settings = document.getElementById('settings-sheet');
      const settingsUnlabelled = unlabelled(settings);
      const dialog = settings.querySelector('[role="dialog"]');
      const status = settings.querySelector('[role="status"][aria-live]');
      const viewport = new DOMParser()
        .parseFromString(await (await fetch('/index.html')).text(), 'text/html')
        .querySelector('meta[name="viewport"]')?.content || '';
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const settingsFocusables = [...settings.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"])')]
        .filter((element) => !element.hidden);
      settingsFocusables.at(-1)?.focus();
      return {
        journalUnlabelled,
        labUnlabelled,
        settingsUnlabelled,
        modal: dialog?.getAttribute('aria-modal'),
        labelledBy: dialog?.getAttribute('aria-labelledby'),
        liveStatus: Boolean(status),
        viewport,
        backgroundInert: rootNode.inert,
        firstFocusId: settingsFocusables[0]?.id,
      };
    });
    await page.keyboard.press('Tab');
    const wrappedFocus = await page.evaluate(() => document.activeElement.id);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(280);
    const closedState = await page.evaluate(() => ({
      removed: !document.getElementById('settings-sheet'),
      backgroundInert: document.getElementById('root').inert,
    }));
    await page.evaluate(() => {
      document.getElementById('root').innerHTML = '<button id="focusTarget">Focus target</button>';
    });
    await page.keyboard.press('Tab');
    const focus = await page.evaluate(() => {
      const style = getComputedStyle(document.activeElement);
      return { id: document.activeElement.id, width: parseFloat(style.outlineWidth), style: style.outlineStyle };
    });

    const missing = [...result.journalUnlabelled, ...result.labUnlabelled, ...result.settingsUnlabelled];
    if (missing.length) throw new Error(`unlabelled controls: ${missing.join(', ')}`);
    if (result.modal !== 'true' || !result.labelledBy || !result.liveStatus) throw new Error('settings modal/status semantics incomplete');
    if (!result.backgroundInert || wrappedFocus !== result.firstFocusId) throw new Error('modal focus trap or inert background missing');
    if (!closedState.removed || closedState.backgroundInert) throw new Error('Escape close did not restore background');
    if (/user-scalable\s*=\s*no|maximum-scale/i.test(result.viewport)) throw new Error('viewport disables zoom');
    if (focus.id !== 'focusTarget' || focus.style === 'none' || focus.width < 2) throw new Error('keyboard focus indicator missing');
    console.log('PASS: labels, zoom, modal focus/inert/Escape, live status, and focus indicator');
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => {
  console.error(`FAIL: ${error.message}`);
  process.exit(1);
});
