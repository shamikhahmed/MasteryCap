/* MasteryCap service worker — offline-first shell cache */
const CACHE_PREFIX = 'masterycap-';
const CACHE = 'masterycap-v5230';
const ASSETS = [
  './',
  './index.html',
  './sandbox-runner.html',
  './css/app.css',
  './css/institute.css',
  './js/app.js',
  './js/register-sw.js',
  './js/institute/student-id.js',
  './js/views/admission.js',
  './js/views/student-id-view.js',
  './js/institute/progress.js',
  './js/institute/onboarding-progress.js',
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
  './js/institute/sandbox-frame.js',
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
  './js/dialog.js',
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
  './js/skills.js',
  './js/teacher.js',
  './js/time.js',
  './js/today.js',
  './js/gates.js',
  './js/syllabus.js',
  './js/study.js',
  './js/views/study.js',
  './js/theme.js',
  './js/search.js',
  './js/candles.js',
  './js/chartgen.js',
  './js/worked-charts.js',
  './js/data/glossary.js',
  './js/data/tracks.js',
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
  './js/data/personal-finance.js',
  './js/data/career-systems.js',
  './js/data/product-builders.js',
  './js/data/wellness-focus.js',
  './js/data/paths.js',
  './js/data/thicken.js',
  './js/data/quiz-extra.js',
  './js/data/enrich.js',
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
const SHELL_ASSETS = [
  './',
  './index.html',
  './css/app.css',
  './css/institute.css',
  './js/app.js',
  './js/register-sw.js',
  './js/store.js',
  './js/i18n.js',
  './js/icons.js',
  './js/dialog.js',
  './js/settings.js',
  './js/theme.js',
  './js/teacher.js',
  './js/mistakes.js',
  './js/time.js',
  './js/views/admission.js',
  './js/views/student-id-view.js',
  './js/institute/placement.js',
  './js/institute/progress.js',
  './js/institute/onboarding-progress.js',
  './js/institute/student-id.js',
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
];
const OPTIONAL_ASSETS = ASSETS.filter((asset) => !SHELL_ASSETS.includes(asset));

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then(async (cache) => {
        // Shell only — do not block install on curriculum/optional assets.
        await cache.addAll(SHELL_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch(async (error) => {
        await caches.delete(CACHE);
        throw error;
      })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      const owned = keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE).sort();
      const previous = owned.at(-1);
      const stale = owned.filter((key) => key !== previous);
      return Promise.all(stale.map((key) => caches.delete(key))).then(() => owned.length > 0);
    }).then(async (hadPrevious) => {
      await self.clients.claim();
      // Opportunistic curriculum cache — must not gate activation or first paint.
      caches.open(CACHE).then((cache) => {
        Promise.allSettled(OPTIONAL_ASSETS.map((asset) => cache.add(asset)));
      }).catch(() => {});
      if (!hadPrevious) return;
      const ver = CACHE.replace('masterycap-', '');
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((c) => c.postMessage({ type: 'SW_UPDATED', version: ver }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const path = url.pathname;
  const sameOrigin = url.origin === self.location.origin;
  const cacheResponse = async (response) => {
    if (!sameOrigin || !response.ok) return response;
    try {
      const cache = await caches.open(CACHE);
      await cache.put(request, response.clone());
    } catch (_) {
      // A cache write failure must not discard a valid network response.
    }
    return response;
  };
  const ownedMatch = async () => {
    const cache = await caches.open(CACHE);
    const current = await cache.match(request, { ignoreSearch: true });
    if (current) return current;
    const previous = (await caches.keys())
      .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE)
      .sort()
      .reverse();
    for (const key of previous) {
      const fallback = await (await caches.open(key)).match(request, { ignoreSearch: true });
      if (fallback) return fallback;
    }
    return null;
  };
  // network-first for navigations + JS/CSS so deploys don't stick on stale SW cache
  if (request.mode === 'navigate' || path.endsWith('.js') || path.endsWith('.css') || path.endsWith('.html')) {
    e.respondWith(
      fetch(request)
        .then(cacheResponse)
        .catch(async () => {
          const cached = await ownedMatch();
          if (cached) return cached;
          if (request.mode !== 'navigate') throw new Error('Offline asset unavailable');
          const cache = await caches.open(CACHE);
          const shell = await cache.match('./index.html');
          if (!shell) throw new Error('Offline shell unavailable');
          return shell;
        })
    );
    return;
  }
  e.respondWith(
    ownedMatch().then((cached) =>
      cached ||
      fetch(request).then(cacheResponse)
    )
  );
});
