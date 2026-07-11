#!/usr/bin/env node
/** audit-sw.mjs — ASSETS exist; runtime JS/fonts/manifest icons covered (§1.6) */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const swText = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const m = swText.match(/const ASSETS = \[([\s\S]*?)\];/);
if (!m) {
  console.error('FAIL: could not parse ASSETS from sw.js');
  process.exit(1);
}
const assets = [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);

const fails = [];
const warns = [];

for (const a of assets) {
  if (a === './') continue;
  const rel = a.replace(/^\.\//, '');
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) fails.push(`ASSETS missing on disk: ${a}`);
}

// Required runtime modules: every js file under js/ + fonts + css + index + manifest + icons in manifest
function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const must = [];
must.push('index.html', 'css/app.css', 'manifest.webmanifest');
for (const f of walk(path.join(root, 'js'))) {
  if (f.endsWith('.js')) must.push(path.relative(root, f));
}
for (const f of fs.readdirSync(path.join(root, 'fonts'))) {
  if (f.endsWith('.woff2')) must.push(path.join('fonts', f));
}

const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
for (const ic of manifest.icons || []) {
  must.push(ic.src.replace(/^\.\//, ''));
}

const assetSet = new Set(assets.map((a) => a.replace(/^\.\//, '')));
for (const rel of must) {
  const norm = rel.replace(/\\/g, '/');
  if (!assetSet.has(norm) && !assetSet.has('./' + norm)) {
    fails.push(`runtime asset not in ASSETS: ${norm}`);
  }
}

// Optional apple touch icon
const apple = 'icons/icon-180.png';
if (fs.existsSync(path.join(root, apple)) && !assetSet.has(apple)) {
  warns.push(`optional icon not in ASSETS: ${apple}`);
}

const cacheM = swText.match(/const CACHE = ['"]([^'"]+)['"]/);
console.log(`CACHE: ${cacheM ? cacheM[1] : '?'}`);
console.log(`ASSETS count: ${assets.length}`);
if (warns.length) {
  console.log('WARN:');
  warns.forEach((w) => console.log('  ' + w));
}
if (fails.length) {
  console.error('FAIL:');
  fails.forEach((f) => console.error('  ' + f));
  process.exit(1);
}
console.log('PASS: SW ASSETS complete');
