#!/usr/bin/env node
/** Thicken thin flashcardSeeds front.ur / back.ur to ≥55% of EN length (en > 20). */
import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXP = JSON.parse(
  fs.readFileSync(path.join(root, 'scripts/flashcard-ur-expansions.json'), 'utf8')
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

function auditFlashcards(weeks) {
  let thin = 0;
  let checked = 0;
  for (const w of weeks) {
    for (const card of w.flashcardSeeds || []) {
      for (const side of ['front', 'back']) {
        const en = card[side]?.en || '';
        const ur = card[side]?.ur || '';
        if (en.length > 20) {
          checked++;
          if (ur.length / en.length < 0.55) thin++;
        }
      }
    }
  }
  return { thin, checked };
}

function sidePair(side, en, ur) {
  return `${side}: { en: '${en}', ur: '${ur}' }`;
}

function patchFile(filePath, weeks) {
  let src = fs.readFileSync(filePath, 'utf8');
  let patches = 0;
  const missing = [];

  for (const w of weeks) {
    for (const card of w.flashcardSeeds || []) {
      for (const side of ['front', 'back']) {
        const en = card[side]?.en;
        const ur = card[side]?.ur;
        if (!en || !ur) continue;
        if (en.length <= 20) continue;
        if (ur.length / en.length >= 0.55) continue;

        const key = `${side}::${en}`;
        const next = EXP[key];
        if (!next) {
          missing.push(key);
          continue;
        }
        if (next.length / en.length < 0.55) {
          missing.push(`${key} (still thin ${next.length}/${en.length})`);
          continue;
        }

        const from = sidePair(side, en, ur);
        const to = sidePair(side, en, next);
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
  let bThin = 0;
  let bChecked = 0;

  for (const [file, exp] of FILES) {
    const m = await import(pathToFileURL(path.join(root, `js/data/${file}`)).href);
    const stats = auditFlashcards(m[exp]);
    before[file] = stats;
    bThin += stats.thin;
    bChecked += stats.checked;
  }

  console.log('BEFORE');
  for (const [file] of FILES) {
    const s = before[file];
    console.log(`  ${file}: thin=${s.thin}/${s.checked}`);
  }
  console.log(`  TOTAL: thin=${bThin}/${bChecked}`);

  let totalPatches = 0;
  for (const [file, exp] of FILES) {
    const m = await import(pathToFileURL(path.join(root, `js/data/${file}`)).href + `?v=${Date.now()}`);
    const n = patchFile(path.join(root, `js/data/${file}`), m[exp]);
    totalPatches += n;
    console.log(`patched ${file}: ${n} sides`);
  }

  const after = {};
  let aThin = 0;
  let aChecked = 0;

  for (const [file, exp] of FILES) {
    const m = await import(pathToFileURL(path.join(root, `js/data/${file}`)).href + `?v=${Date.now()}`);
    const stats = auditFlashcards(m[exp]);
    after[file] = stats;
    aThin += stats.thin;
    aChecked += stats.checked;
  }

  console.log('\nAFTER');
  for (const [file] of FILES) {
    const s = after[file];
    console.log(`  ${file}: thin=${s.thin}/${s.checked}`);
  }
  console.log(`  TOTAL: thin=${aThin}/${aChecked}`);
  console.log(`\nApplied ${totalPatches} patches.`);

  if (aThin) process.exit(1);
}

main();
