#!/usr/bin/env node
/** audit-i18n.mjs — t('key') / App.t('key') must exist in T.en and T.ur (§1.3) */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { T } from '../js/i18n.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const jsRoot = path.join(root, 'js');

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name.endsWith('.js') && ent.name !== 'i18n.js') out.push(p);
  }
  return out;
}

/** Collect keys from App.t('x'), .t('x'), tr(lang,'x'), and quoted strings inside App.t(...) */
function collectKeys(text) {
  const used = new Set();
  const direct = /(?:App\.t|\.t|tr)\(\s*(?:[a-zA-Z_][\w.]*\s*,\s*)?['"]([a-zA-Z0-9_]+)['"]/g;
  let m;
  while ((m = direct.exec(text))) used.add(m[1]);

  // Ternaries / dynamic: App.t( ... ) — only string literals that look like i18n keys (contain _)
  const call = /App\.t\(([^)]{0,400})\)/g;
  while ((m = call.exec(text))) {
    const inner = m[1];
    const q = /['"]([a-z][a-z0-9_]+)['"]/g;
    let qm;
    while ((qm = q.exec(inner))) {
      if (qm[1].includes('_') || qm[1].length > 8) used.add(qm[1]);
    }
  }
  return used;
}

const used = new Set();
for (const file of walk(jsRoot)) {
  for (const k of collectKeys(fs.readFileSync(file, 'utf8'))) used.add(k);
}

// Known dynamic key sources (emotion keys, week status labels)
for (const k of ['emo_calm', 'emo_fomo', 'emo_revenge', 'emo_greed', 'emo_bored', 'completed', 'current', 'mastered', 'locked']) {
  used.add(k);
}

const enKeys = new Set(Object.keys(T.en));
const urKeys = new Set(Object.keys(T.ur));
const missing = [];

for (const k of used) {
  // keys ending in '_' are dynamic prefixes (e.g. t('sim_err_' + code)) —
  // verify at least one concrete key exists with that prefix instead
  if (k.endsWith('_')) {
    if (![...enKeys].some((x) => x.startsWith(k))) missing.push(`missing T.en prefix '${k}*' (dynamic)`);
    if (![...urKeys].some((x) => x.startsWith(k))) missing.push(`missing T.ur prefix '${k}*' (dynamic)`);
    continue;
  }
  if (!enKeys.has(k)) missing.push(`missing T.en['${k}'] (referenced)`);
  if (!urKeys.has(k)) missing.push(`missing T.ur['${k}'] (referenced)`);
}
for (const k of enKeys) {
  if (!urKeys.has(k)) missing.push(`en-only key: ${k}`);
}
for (const k of urKeys) {
  if (!enKeys.has(k)) missing.push(`ur-only key: ${k}`);
}

const unused = [...enKeys].filter((k) => !used.has(k)).sort();

console.log(`referenced keys: ${used.size}`);
console.log(`T.en keys: ${enKeys.size} · T.ur keys: ${urKeys.size}`);
if (unused.length) {
  console.log('WARN unused keys:');
  unused.forEach((k) => console.log('  ' + k));
}
if (missing.length) {
  console.error('FAIL:');
  missing.forEach((x) => console.error('  ' + x));
  process.exit(1);
}
console.log('PASS: all referenced i18n keys present in en+ur');
