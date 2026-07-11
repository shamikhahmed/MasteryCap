#!/usr/bin/env node
/** audit-all.mjs — run all Part-1 static audits; exit nonzero on any FAIL */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const scripts = [
  'audit-data.mjs',
  'audit-figs.mjs',
  'audit-i18n.mjs',
  'audit-content.mjs',
  'audit-sw.mjs',
  'audit-behavior.mjs',
];

let failed = 0;
for (const s of scripts) {
  console.log(`\n══ ${s} ══`);
  const r = spawnSync(process.execPath, [path.join(dir, s)], {
    stdio: 'inherit',
    cwd: path.join(dir, '..'),
  });
  if (r.status !== 0) failed++;
}

if (failed) {
  console.error(`\n${failed}/${scripts.length} audits FAILED`);
  process.exit(1);
}
console.log(`\nAll ${scripts.length} audits PASS`);
