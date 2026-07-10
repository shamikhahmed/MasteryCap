/* MasteryCap service worker — offline-first shell cache */
const CACHE = 'masterycap-v11';
const ASSETS = [
  './',
  './index.html',
  './css/app.css',
  './js/app.js',
  './js/store.js',
  './js/i18n.js',
  './js/icons.js',
  './js/settings.js',
  './js/figures.js',
  './js/drills.js',
  './js/insights.js',
  './js/retention.js',
  './js/discipline.js',
  './js/glossary.js',
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
  './js/views/dashboard.js',
  './js/views/course.js',
  './js/views/journal.js',
  './js/views/progress.js',
  './js/views/drills.js',
  './js/views/review.js',
  './fonts/geist-400.woff2',
  './fonts/geist-500.woff2',
  './fonts/geist-600.woff2',
  './fonts/geist-700.woff2',
  './fonts/geistmono-500.woff2',
  './fonts/geistmono-600.woff2',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
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
  // network-first for navigations, cache-first for assets
  if (request.mode === 'navigate') {
    e.respondWith(fetch(request).catch(() => caches.match('./index.html')));
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
