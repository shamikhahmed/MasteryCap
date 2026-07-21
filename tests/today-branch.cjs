const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const pathname = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
      if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<!doctype html><main id="root"></main>');
        return;
      }
      const file = path.join(root, pathname.replace(/^\/+/, ''));
      if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404);
        res.end('missing');
        return;
      }
      const type = file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, base: `http://127.0.0.1:${server.address().port}` }));
  });
}

(async () => {
  const { server, base } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(base);
    const result = await page.evaluate(async () => {
      const [{ renderToday }, { store, KEYS }] = await Promise.all([
        import('/js/views/today-tab.js'),
        import('/js/store.js'),
      ]);
      store.set(KEYS.institute, {
        activeCourse: 'WEB-101',
        enrollments: { 'WEB-101': { at: Date.now(), school: 'software' } },
        completedLessons: {},
        lessonChecks: {},
        finals: {},
        projects: {},
        projectEvidence: {},
        certificates: {},
        srs: [],
        attempts: {},
        notes: {},
      });
      const App = {
        lang: 'en',
        profile: { name: 'Learner', primaryBranch: 'markets', starterSchool: 'markets' },
        t: (key) => key,
        getCourse: () => ({ weekStatus: {} }),
        navigate: () => {},
        openLesson: () => {},
        openFinal: () => {},
        openReview: () => {},
        openStudy: () => {},
        haptic: () => {},
      };
      const rootNode = document.getElementById('root');
      renderToday(App, rootNode);
      return {
        courseContinue: Boolean(document.getElementById('tdContinue')),
        marketsFallback: Boolean(document.getElementById('tdMarkets')),
        coursePlan: Boolean(document.getElementById('tdCoursePlan')),
        text: rootNode.textContent,
      };
    });
    if (!result.courseContinue || result.marketsFallback || !result.coursePlan || !result.text.includes('WEB-101')) {
      throw new Error('Today did not prioritize active course over admission branch');
    }
    console.log('PASS: Today follows active enrolled course across branches');
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => {
  console.error(`FAIL: ${error.message}`);
  process.exit(1);
});
