#!/usr/bin/env node
/** Thicken thin quiz q.ur / explain.ur to ≥55% of EN length (stems >15, explains >20). */
import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXP = JSON.parse(
  fs.readFileSync(path.join(root, 'scripts/quiz-ur-expansions.json'), 'utf8')
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

function auditWeeks(weeks) {
  let qThin = 0,
    exThin = 0,
    qCount = 0,
    exCount = 0;
  for (const w of weeks) {
    for (const item of w.quiz || []) {
      const qEn = item.q?.en || '';
      const qUr = item.q?.ur || '';
      const eEn = item.explain?.en || '';
      const eUr = item.explain?.ur || '';
      if (qEn.length > 15) {
        qCount++;
        if (qUr.length / qEn.length < 0.55) qThin++;
      }
      if (eEn.length > 20) {
        exCount++;
        if (eUr.length / eEn.length < 0.55) exThin++;
      }
    }
  }
  return { qThin, exThin, qCount, exCount };
}

function pair(field, en, ur) {
  return `${field}: { en: '${en}', ur: '${ur}' }`;
}

function patchFile(filePath, weeks) {
  let src = fs.readFileSync(filePath, 'utf8');
  let patches = 0;
  const missing = [];

  for (const w of weeks) {
    for (const item of w.quiz || []) {
      for (const field of ['q', 'explain']) {
        const en = item[field]?.en;
        const ur = item[field]?.ur;
        if (!en || !ur) continue;
        const minLen = field === 'q' ? 15 : 20;
        if (en.length <= minLen) continue;
        if (ur.length / en.length >= 0.55) continue;

        const key = `${field}::${en}`;
        const next = EXP[key];
        if (!next) {
          missing.push(key);
          continue;
        }
        if (next.length / en.length < 0.55) {
          missing.push(`${key} (still thin ${next.length}/${en.length})`);
          continue;
        }

        const from = pair(field, en, ur);
        const to = pair(field, en, next);
        if (!src.includes(from)) {
          missing.push(`${key} (no match in ${path.basename(filePath)})`);
          continue;
        }
        src = src.replace(from, to);
        patches++;
      }
    }
  }

  if (missing.length) {
    console.error('MISSING', path.basename(filePath));
    missing.forEach((m) => console.error('  ', m));
    process.exit(1);
  }

  if (patches) fs.writeFileSync(filePath, src);
  return patches;
}

async function main() {
  const before = {};
  let bQ = 0,
    bEx = 0,
    bQC = 0,
    bExC = 0;

  for (const [file, exp] of FILES) {
    const m = await import(pathToFileURL(path.join(root, `js/data/${file}`)).href);
    const stats = auditWeeks(m[exp]);
    before[file] = stats;
    bQ += stats.qThin;
    bEx += stats.exThin;
    bQC += stats.qCount;
    bExC += stats.exCount;
  }

  console.log('BEFORE');
  for (const [file] of FILES) {
    const s = before[file];
    console.log(`  ${file}: qStems thin=${s.qThin}/${s.qCount}, explains thin=${s.exThin}/${s.exCount}`);
  }
  console.log(`  TOTAL: qStems thin=${bQ}/${bQC}, explains thin=${bEx}/${bExC}`);

  let totalPatches = 0;
  for (const [file, exp] of FILES) {
    const m = await import(pathToFileURL(path.join(root, `js/data/${file}`)).href + `?v=${Date.now()}`);
    const n = patchFile(path.join(root, `js/data/${file}`), m[exp]);
    totalPatches += n;
    console.log(`patched ${file}: ${n} fields`);
  }

  const after = {};
  let aQ = 0,
    aEx = 0,
    aQC = 0,
    aExC = 0;

  for (const [file, exp] of FILES) {
    const m = await import(pathToFileURL(path.join(root, `js/data/${file}`)).href + `?v=${Date.now()}`);
    const stats = auditWeeks(m[exp]);
    after[file] = stats;
    aQ += stats.qThin;
    aEx += stats.exThin;
    aQC += stats.qCount;
    aExC += stats.exCount;
  }

  console.log('\nAFTER');
  for (const [file] of FILES) {
    const s = after[file];
    console.log(`  ${file}: qStems thin=${s.qThin}/${s.qCount}, explains thin=${s.exThin}/${s.exCount}`);
  }
  console.log(`  TOTAL: qStems thin=${aQ}/${aQC}, explains thin=${aEx}/${aExC}`);
  console.log(`\nApplied ${totalPatches} patches.`);

  if (aQ || aEx) process.exit(1);
}

main();
