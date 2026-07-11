#!/usr/bin/env node
/** audit-figs.mjs — {{fig:name}} markers vs FIGURE_NAMES registry (§1.2) */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FIGURE_NAMES } from '../js/figures.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'js', 'data');
const files = fs
  .readdirSync(dataDir)
  .filter((f) => f.endsWith('.js') && f !== 'glossary.js' && f !== 'tracks.js');

const used = new Set();
const missing = [];
const re = /\{\{fig:([a-z0-9-]+)\}\}/g;

for (const f of files) {
  const text = fs.readFileSync(path.join(dataDir, f), 'utf8');
  let m;
  while ((m = re.exec(text))) {
    const name = m[1];
    used.add(name);
    if (!FIGURE_NAMES.includes(name)) {
      missing.push(`${f}: {{fig:${name}}}`);
    }
  }
}

const orphans = FIGURE_NAMES.filter((n) => !used.has(n));

console.log(`figures implemented: ${FIGURE_NAMES.length}`);
console.log(`figures referenced:  ${used.size}`);
if (orphans.length) {
  console.log('WARN orphans (implemented, unused):');
  orphans.forEach((o) => console.log('  ' + o));
}
if (missing.length) {
  console.error('FAIL unresolved markers:');
  missing.forEach((x) => console.error('  ' + x));
  process.exit(1);
}
console.log('PASS: all {{fig:}} markers resolve');
