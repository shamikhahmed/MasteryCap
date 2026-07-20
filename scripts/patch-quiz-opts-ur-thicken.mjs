#!/usr/bin/env node
/** Thicken thin quiz opts.ur to ≥55% of EN length (opts.en >30). */
import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXP = JSON.parse(
  fs.readFileSync(path.join(root, 'scripts/quiz-opts-ur-expansions.json'), 'utf8')
);

const FILES = [
  ['foundations.js', 'FOUNDATIONS_WEEKS'],
  ['crypto-deep.js', 'CRYPTO_WEEKS'],
  ['forex-deep.js', 'FOREX_DEEP_WEEKS'],
  ['stocks-deep.js', 'STOCKS_DEEP_WEEKS'],
  ['tax-deep.js', 'TAX_DEEP_WEEKS'],
  ['invest-deep.js', 'INVEST_DEEP_WEEKS'],
  ['macro-deep.js', 'MACRO_DEEP_WEEKS'],
  ['spot-deep.js', 'SPOT_DEEP_WEEKS'],
  ['options-deep.js', 'OPTIONS_DEEP_WEEKS'],
  ['futures-deep.js', 'FUTURES_DEEP_WEEKS'],
  ['greeks-deep.js', 'GREEKS_DEEP_WEEKS'],
  ['bots-deep.js', 'BOTS_DEEP_WEEKS'],
  ['binary-deep.js', 'BINARY_DEEP_WEEKS'],
];

function parseQuotedArray(part) {
  const items = [];
  let i = 0;
  while (i < part.length) {
    while (i < part.length && /[\s,]/.test(part[i])) i++;
    if (i >= part.length) break;
    if (part[i] !== "'") throw new Error(`Expected quote at ${i}: ${part.slice(i, i + 20)}`);
    i++;
    let s = '';
    while (i < part.length) {
      if (part[i] === '\\') {
        i++;
        s += part[i++];
      } else if (part[i] === "'") {
        i++;
        break;
      } else {
        s += part[i++];
      }
    }
    items.push(s);
  }
  return items;
}

function quote(s) {
  return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function formatArray(arr) {
  return arr.map(quote).join(', ');
}

function auditOpts(weeks) {
  let thin = 0;
  let total = 0;
  for (const w of weeks) {
    for (const item of w.quiz || []) {
      const enArr = item.opts?.en || [];
      const urArr = item.opts?.ur || [];
      for (let i = 0; i < enArr.length; i++) {
        const en = enArr[i] || '';
        const u = urArr[i] || '';
        if (en.length > 30) {
          total++;
          if (u.length / en.length < 0.55) thin++;
        }
      }
    }
  }
  return { thin, total };
}

function patchOptsBlock(match, enPart, urPart) {
  const enArr = parseQuotedArray(enPart);
  const urArr = parseQuotedArray(urPart);
  if (urArr.length !== enArr.length) return match;
  let changed = false;
  for (let i = 0; i < enArr.length; i++) {
    const en = enArr[i];
    const u = urArr[i] || '';
    if (en.length <= 30) continue;
    if (u.length / en.length >= 0.55) continue;
    const next = EXP[en];
    if (!next) continue;
    if (next.length / en.length < 0.55) {
      throw new Error(`Expansion still thin for "${en}": ${next.length}/${en.length}`);
    }
    urArr[i] = next;
    changed = true;
  }
  if (!changed) return match;
  return `opts: { en: [${formatArray(enArr)}], ur: [${formatArray(urArr)}] }`;
}

function patchFile(filePath) {
  const src0 = fs.readFileSync(filePath, 'utf8');
  const optsRe = /opts:\s*\{\s*en:\s*\[([^\]]+)\],\s*ur:\s*\[([^\]]+)\]\s*\}/g;
  const src = src0.replace(optsRe, patchOptsBlock);
  if (src !== src0) fs.writeFileSync(filePath, src);
  return src !== src0;
}

async function main() {
  let bThin = 0;
  let bTotal = 0;
  console.log('BEFORE');
  for (const [file, exp] of FILES) {
    const m = await import(pathToFileURL(path.join(root, `js/data/${file}`)).href);
    const s = auditOpts(m[exp]);
    bThin += s.thin;
    bTotal += s.total;
    console.log(`  ${file}: thin=${s.thin}/${s.total}`);
  }
  console.log(`  TOTAL thin long-opts: ${bThin}/${bTotal}`);

  for (const [file] of FILES) {
    const changed = patchFile(path.join(root, `js/data/${file}`));
    console.log(`patched ${file}: ${changed ? 'yes' : 'no'}`);
  }

  let aThin = 0;
  let aTotal = 0;
  console.log('\nAFTER');
  for (const [file, exp] of FILES) {
    const m = await import(
      pathToFileURL(path.join(root, `js/data/${file}`)).href + `?v=${Date.now()}`
    );
    const s = auditOpts(m[exp]);
    aThin += s.thin;
    aTotal += s.total;
    console.log(`  ${file}: thin=${s.thin}/${s.total}`);
  }
  console.log(`  TOTAL thin long-opts: ${aThin}/${aTotal}`);
  console.log(`\nBefore → After: ${bThin} → ${aThin}`);

  if (aThin) process.exit(1);
}

main();
