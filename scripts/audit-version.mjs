#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const version = read('VERSION').trim();
const compact = version.replace(/\./g, '');
const expectedCache = `masterycap-v${compact}`;
const failures = [];

function expectEqual(label, actual, expected) {
  if (actual !== expected) failures.push(`${label}: expected ${expected}, found ${actual ?? 'missing'}`);
}

function expectContains(file, ...values) {
  const text = read(file);
  values.forEach((value) => {
    if (!text.includes(value)) failures.push(`${file}: missing ${value}`);
  });
}

const versionJson = JSON.parse(read('VERSION.json'));
const pkg = JSON.parse(read('package.json'));
const lock = JSON.parse(read('package-lock.json'));
const manifest = JSON.parse(read('manifest.webmanifest'));

expectEqual('VERSION.json version', versionJson.version, version);
expectEqual('VERSION.json SW cache', versionJson.swCache, expectedCache);
expectEqual('package.json version', pkg.version, version);
expectEqual('package-lock.json version', lock.version, version);
expectEqual('package-lock root version', lock.packages?.['']?.version, version);
expectEqual('manifest version', manifest.version, version);
expectContains('js/settings.js', `APP_VERSION = 'v${version}'`);
expectContains('sw.js', `const CACHE = '${expectedCache}'`);
expectContains('index.html', `css/app.css?v=${compact}`, `css/institute.css?v=${compact}`, `js/app.js?v=${compact}`, `sw.js?v=${compact}`);
expectContains('README.md', `v${version}`, expectedCache);
expectContains('GUIDE.md', `v${version}`, expectedCache);
expectContains('HANDOVER.md', `v${version}`, expectedCache);
expectContains('PRESENTATION.md', `v${version}`, expectedCache);
expectContains('FEATURES.md', version);
expectContains('CHANGELOG.md', `## [${version}]`);

if (failures.length) {
  console.error('FAIL: version surfaces drifted');
  failures.forEach((failure) => console.error(`  ${failure}`));
  process.exit(1);
}
console.log(`PASS: version ${version} / ${expectedCache} consistent`);
