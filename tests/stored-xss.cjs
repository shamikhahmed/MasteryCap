const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = decodeURIComponent((req.url || '/').split('?')[0]);
      if (url === '/' || url === '/blank.html') {
        res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' });
        res.end('<!doctype html><body><main id="root"></main></body>');
        return;
      }
      const file = path.join(root, url.replace(/^\//, ''));
      if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404);
        res.end('missing');
        return;
      }
      const type = file.endsWith('.js') ? 'text/javascript' : 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
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
      const { renderJournal } = await import('/js/views/journal.js');
      window.__storedXss = 0;
      const payload = '<img src=x onerror="window.__storedXss=1">';
      const trades = [{
        id: 1,
        date: new Date().toISOString(),
        pair: payload,
        setup: payload,
        notes: payload,
        direction: '" onmouseover="window.__storedXss=2',
        emotion: payload,
        leverage: 2,
        pl: 5,
      }];
      let checklist = {};
      const App = {
        lang: 'en',
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
      };
      renderJournal(App, document.getElementById('root'));
      await new Promise((resolve) => setTimeout(resolve, 50));
      return {
        executed: window.__storedXss,
        injectedImages: document.querySelectorAll('#log img').length,
        visiblePayload: document.getElementById('log').textContent.includes('<img src=x'),
        optionValue: document.querySelector('#setupList option')?.value,
      };
    });
    if (result.executed !== 0 || result.injectedImages !== 0) throw new Error('stored payload executed or created markup');
    if (!result.visiblePayload || !result.optionValue.startsWith('<img')) throw new Error('stored text was not preserved safely');
    console.log('PASS: stored journal content is escaped');
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => {
  console.error(`FAIL: ${error.message}`);
  process.exit(1);
});
