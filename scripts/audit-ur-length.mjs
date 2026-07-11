#!/usr/bin/env node
/** Fail if lesson UR/EN body ratio < 0.85 or EN too thin (greeks/invest bar). */
import { pathToFileURL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const mods = [
  ['greeks', 'GREEKS_WEEKS', 900],
  ['foundations', 'FOUNDATIONS_WEEKS', 500],
  ['invest', 'INVEST_WEEKS', 800],
  ['forex', 'FOREX_WEEKS', 700],
  ['futures', 'FUTURES_WEEKS', 700],
  ['macro', 'MACRO_WEEKS', 800],
  ['tax', 'TAX_WEEKS', 700],
];

function strip(h) {
  return String(h || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().length;
}

let fail = 0;
for (const [file, exp, minEn] of mods) {
  const m = await import(pathToFileURL(path.join(root, `js/data/${file}.js`)).href);
  const weeks = m[exp];
  if (!weeks) {
    console.error('missing', exp);
    fail++;
    continue;
  }
  for (const w of weeks) {
    const e = strip(w.body?.en);
    const u = strip(w.body?.ur);
    const r = e ? u / e : 0;
    if (e < minEn || r < 0.85) {
      console.error(`FAIL ${file} W${w.id} EN=${e} UR=${u} ratio=${r.toFixed(2)}`);
      fail++;
    }
  }
}
if (fail) {
  console.error(`audit-ur-length: ${fail} failures`);
  process.exit(1);
}
console.log('PASS audit-ur-length');
