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
        res.end('<!doctype html><title>Backup test</title>');
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
      const { store, KEYS, djb2 } = await import('/js/store.js');
      store.clearAll();
      store.set(KEYS.profile, { name: 'Original learner' });
      store.set(KEYS.settings, { lang: 'en' });
      const original = store.exportBackup();

      const corrupt = structuredClone(original);
      corrupt.data.profile = JSON.stringify({ name: 'Corrupt learner' });
      const checksumResult = await store.importBackup(corrupt);
      const afterChecksum = store.get(KEYS.profile)?.name;

      const partialResult = await store.importBackup({
        version: 'institute',
        profile: { name: 'Partial learner' },
      });
      const invalidResult = await store.importBackup({ profile: 'not-json' });

      const incomingData = {
        profile: JSON.stringify({ name: 'Imported learner' }),
        settings: JSON.stringify({ lang: 'ur' }),
      };
      const incoming = {
        format: 'masterycap-backup',
        v: 2,
        checksum: djb2(JSON.stringify(incomingData)),
        data: incomingData,
      };

      const nativeSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function patchedSetItem(key, value) {
        if (String(key).includes('__import__')) throw new DOMException('Quota test', 'QuotaExceededError');
        return nativeSetItem.call(this, key, value);
      };
      const failedWrite = await store.importBackup(incoming);
      Storage.prototype.setItem = nativeSetItem;
      const afterFailedWrite = store.get(KEYS.profile)?.name;

      const imported = await store.importBackup(incoming);
      const afterImport = store.get(KEYS.profile)?.name;
      const restored = await store.restorePreImport();
      const afterRestore = store.get(KEYS.profile)?.name;

      return {
        format: original.format,
        version: original.v,
        checksumResult,
        afterChecksum,
        partialResult,
        invalidResult,
        failedWrite,
        afterFailedWrite,
        imported,
        afterImport,
        restored,
        afterRestore,
      };
    });

    if (result.format !== 'masterycap-backup' || result.version !== 2) throw new Error('canonical backup metadata missing');
    if (result.checksumResult.error !== 'checksum_fail' || result.afterChecksum !== 'Original learner') throw new Error('checksum failure mutated data');
    if (result.partialResult.error !== 'partial_backup') throw new Error('partial backup was not rejected explicitly');
    if (result.invalidResult.error !== 'invalid') throw new Error('invalid raw JSON was accepted');
    if (result.failedWrite.error !== 'write_fail' || result.afterFailedWrite !== 'Original learner') throw new Error('failed transaction did not roll back');
    if (!result.imported.ok || result.afterImport !== 'Imported learner') throw new Error('valid import failed');
    if (!result.restored.ok || result.afterRestore !== 'Original learner') throw new Error('pre-import recovery failed');
    console.log('PASS: backup validation, rollback, and recovery');
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => {
  console.error(`FAIL: ${error.message}`);
  process.exit(1);
});
