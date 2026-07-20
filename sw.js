/* MasteryCap service worker — offline-first shell cache */
const CACHE = 'masterycap-v5000';
const ASSETS = [
  './',
  './index.html',
  './css/app.css',
  './css/institute.css',
  './js/app.js',
  './js/institute/student-id.js',
  './js/views/admission.js',
  './js/views/student-id-view.js',
  './js/institute/progress.js',
  './js/institute/placement.js',
  './js/institute/features.js',
  './js/data/institute/catalog.js',
  './js/data/institute/diagrams.js',
  './js/data/institute/courses.js',
  './js/data/institute/web-101.js',
  './js/data/institute/web-102.js',
  './js/data/institute/web-103.js',
  './js/data/institute/fe-201.js',
  './js/data/institute/fe-202.js',
  './js/data/institute/fe-203.js',
  './js/data/institute/fe-204.js',
  './js/data/institute/be-301.js',
  './js/data/institute/be-302.js',
  './js/data/institute/be-303.js',
  './js/data/institute/be-304.js',
  './js/data/institute/app-401.js',
  './js/data/institute/app-402.js',
  './js/data/institute/app-403.js',
  './js/institute/register.js',
  './js/institute/http-lab.js',
  './js/institute/code-editor.js',
  './js/views/http-lab.js',
  './js/data/institute/fin-101.js',
  './js/data/institute/fin-201.js',
  './js/data/institute/fin-301.js',
  './js/views/today-tab.js',
  './js/views/campus.js',
  './js/views/practice-tab.js',
  './js/views/records.js',
  './js/views/lesson.js',
  './js/store.js',
  './js/i18n.js',
  './js/icons.js',
  './js/session.js',
  './js/reading.js',
  './js/settings.js',
  './js/figures.js',
  './js/drills.js',
  './js/insights.js',
  './js/retention.js',
  './js/discipline.js',
  './js/glossary.js',
  './js/mistakes.js',
  './js/lesson-extras.js',
  './js/week-extras.js',
  './js/exam.js',
  './js/data/options.js',
  './js/skills.js',
  './js/teacher.js',
  './js/time.js',
  './js/today.js',
  './js/gates.js',
  './js/syllabus.js',
  './js/report.js',
  './js/study.js',
  './js/views/study.js',
  './js/theme.js',
  './js/search.js',
  './js/candles.js',
  './js/chartgen.js',
  './js/worked-charts.js',
  './js/data/glossary.js',
  './js/data/course.js',
  './js/data/tracks.js',
  './js/data/stocks.js',
  './js/data/futures.js',
  './js/data/forex.js',
  './js/data/spot.js',
  './js/data/binary.js',
  './js/data/invest.js',
  './js/data/bots.js',
  './js/desk.js',
  './js/howto.js',
  './js/data/foundations.js',
  './js/data/crypto-deep.js',
  './js/data/stocks-deep.js',
  './js/data/forex-deep.js',
  './js/data/invest-deep.js',
  './js/data/tax-deep.js',
  './js/data/macro-deep.js',
  './js/data/spot-deep.js',
  './js/data/options-deep.js',
  './js/data/greeks-deep.js',
  './js/data/futures-deep.js',
  './js/data/bots-deep.js',
  './js/data/binary-deep.js',
  './js/institute/committee.js',
  './js/data/greeks.js',
  './js/data/tax.js',
  './js/data/macro.js',
  './js/data/families.js',
  './js/data/personal-finance.js',
  './js/data/career-systems.js',
  './js/data/product-builders.js',
  './js/data/wellness-focus.js',
  './js/data/paths.js',
  './js/data/thicken.js',
  './js/data/quiz-extra.js',
  './js/data/enrich.js',
  './js/views/dashboard.js',
  './js/views/course.js',
  './js/views/journal.js',
  './js/views/progress.js',
  './js/views/drills.js',
  './js/views/review.js',
  './js/views/charts.js',
  './js/views/sim.js',
  './js/sim/engine.js',
  './js/sim/scenarios.js',
  './js/sim/debrief-q.js',
  './js/competence.js',
  './js/sim/portfolio.js',
  './js/graduation.js',
  './fonts/geist-400.woff2',
  './fonts/geist-500.woff2',
  './fonts/geist-600.woff2',
  './fonts/geist-700.woff2',
  './fonts/geistmono-500.woff2',
  './fonts/geistmono-600.woff2',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/icon-180.png',
  './icons/apple-touch-icon-180.png',
  './icons/favicon.svg',
  './icons/mark.svg',
  './icons/icon-1024.png',
  './assets/qr-masterycap.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {})).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      const stale = keys.filter((k) => k !== CACHE);
      return Promise.all(stale.map((k) => caches.delete(k))).then(() => stale.length > 0);
    }).then((hadStale) =>
      self.clients.claim().then(() => {
        if (!hadStale) return;
        const ver = CACHE.replace('masterycap-', '');
        return self.clients.matchAll({ type: 'window' }).then((clients) => {
          clients.forEach((c) => c.postMessage({ type: 'SW_UPDATED', version: ver }));
        });
      })
    )
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const path = url.pathname;
  // network-first for navigations + JS/CSS so deploys don't stick on stale SW cache
  if (request.mode === 'navigate' || path.endsWith('.js') || path.endsWith('.css') || path.endsWith('.html')) {
    e.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(request).then((c) => c || caches.match('./index.html')))
    );
    return;
  }
  e.respondWith(
    caches.match(request).then((cached) =>
      cached ||
      fetch(request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {});
        return res;
      }).catch(() => cached)
    )
  );
});
