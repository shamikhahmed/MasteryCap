#!/usr/bin/env node
/** Thicken thin placement q.ur / opts.ur / explain.ur to ≥55% of EN length. */
import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXP = JSON.parse(
  fs.readFileSync(path.join(root, 'scripts/placement-ur-expansions.json'), 'utf8')
);

const dataDir = path.join(root, 'js/data');

function discoverPlacementExports() {
  const out = [];
  for (const file of fs.readdirSync(dataDir).filter((f) => f.endsWith('.js'))) {
    const src = fs.readFileSync(path.join(dataDir, file), 'utf8');
    const re = /export const (\w*PLACEMENT\w*)\s*=/g;
    let m;
    while ((m = re.exec(src))) out.push([file, m[1]]);
  }
  return out;
}

const FILES = discoverPlacementExports();

function isThin(en, ur, minEn) {
  if (!en || ur == null) return false;
  if (en.length <= minEn) return false;
  return ur.length / en.length < 0.55;
}

function auditPlacement(arr) {
  let qThin = 0,
    exThin = 0,
    optThin = 0,
    qCount = 0,
    exCount = 0,
    optCount = 0;
  for (const item of arr || []) {
    const qEn = item.q?.en || '';
    const qUr = item.q?.ur || '';
    if (qEn.length > 15) {
      qCount++;
      if (isThin(qEn, qUr, 15)) qThin++;
    }
    const eEn = item.explain?.en || '';
    const eUr = item.explain?.ur || '';
    if (eEn.length > 20) {
      exCount++;
      if (isThin(eEn, eUr, 20)) exThin++;
    }
    const enArr = item.opts?.en || [];
    const urArr = item.opts?.ur || [];
    for (let i = 0; i < enArr.length; i++) {
      const en = enArr[i] || '';
      const u = urArr[i] || '';
      if (en.length > 20) {
        optCount++;
        if (isThin(en, u, 20)) optThin++;
      }
    }
  }
  return { qThin, exThin, optThin, qCount, exCount, optCount };
}

function pair(field, en, ur, style = "'") {
  return `${field}: { en: ${quoteForMatch(en, style)}, ur: ${quoteForMatch(ur, style)} }`;
}

function parseQuotedArray(part) {
  const items = [];
  let i = 0;
  while (i < part.length) {
    while (i < part.length && /[\s,]/.test(part[i])) i++;
    if (i >= part.length) break;
    const q = part[i];
    if (q !== "'" && q !== '"') throw new Error(`Expected quote at ${i}: ${part.slice(i, i + 20)}`);
    i++;
    let s = '';
    while (i < part.length) {
      if (part[i] === '\\') {
        i++;
        s += part[i++];
      } else if (part[i] === q) {
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

function quoteForMatch(s, style = "'") {
  return `${style}${s.replace(/\\/g, '\\\\').replace(new RegExp(style, 'g'), `\\${style}`)}${style}`;
}

function quote(s) {
  return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function formatArray(arr, style = "'") {
  return arr.map((s) => quoteForMatch(s, style)).join(', ');
}

function extractPlacementBlock(src, exportName) {
  const startRe = new RegExp(`export const ${exportName}\\s*=\\s*\\[`);
  const startMatch = startRe.exec(src);
  if (!startMatch) return null;
  const start = startMatch.index;
  let i = startMatch.index + startMatch[0].length;
  let depth = 1;
  let quote = null;
  while (i < src.length && depth > 0) {
    const ch = src[i];
    const prev = src[i - 1];
    if (quote) {
      if (ch === quote && prev !== '\\') quote = null;
      i++;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      quote = ch;
      i++;
      continue;
    }
    if (ch === '[') depth++;
    else if (ch === ']') depth--;
    i++;
  }
  return { start, end: i, block: src.slice(start, i) };
}

function patchPlacementBlock(block, missing, fileLabel) {
  let patches = 0;
  let out = block;

  for (const field of ['q', 'explain']) {
    const minLen = field === 'q' ? 15 : 20;
    const fieldRe = new RegExp(
      `"?${field}"?:\\s*\\{\\s*"?en"?:\\s*(['"])((?:\\\\.|(?!\\1)[^\\\\])*)\\1,\\s*"?ur"?:\\s*(['"])((?:\\\\.|(?!\\3)[^\\\\])*)\\3\\s*\\}`,
      'g'
    );
    out = out.replace(fieldRe, (match, q1, enRaw, q2, urRaw) => {
      const style = q1;
      const en = enRaw.replace(/\\'/g, "'").replace(/\\"/g, '"');
      const ur = urRaw.replace(/\\'/g, "'").replace(/\\"/g, '"');
      if (en.length <= minLen) return match;
      if (ur.length / en.length >= 0.55) return match;
      const next = EXP.q?.[en];
      if (!next) {
        missing.push(`${field}::${en}`);
        return match;
      }
      if (next.length / en.length < 0.55) {
        missing.push(`${field}::${en} (still thin ${next.length}/${en.length})`);
        return match;
      }
      patches++;
      const keyPrefix = match.trimStart().startsWith('"') ? `"${field}"` : field;
      return `${keyPrefix}: { ${style === '"' ? '"en"' : 'en'}: ${quoteForMatch(en, style)}, ${style === '"' ? '"ur"' : 'ur'}: ${quoteForMatch(next, style)} }`;
    });
  }

  const optsRe =
    /"?opts"?:\s*\{\s*"?en"?:\s*\[([^\]]+)\],\s*"?ur"?:\s*\[([^\]]+)\]\s*\}/g;
  out = out.replace(optsRe, (match, enPart, urPart) => {
    const enArr = parseQuotedArray(enPart);
    const urArr = parseQuotedArray(urPart);
    if (urArr.length !== enArr.length) return match;
    const style = enPart.trimStart()[0] === '"' ? '"' : "'";
    let changed = false;
    for (let i = 0; i < enArr.length; i++) {
      const en = enArr[i];
      const u = urArr[i] || '';
      if (en.length <= 20) continue;
      if (u.length / en.length >= 0.55) continue;
      const next = EXP.opts?.[en];
      if (!next) {
        missing.push(`opts::${en}`);
        continue;
      }
      if (next.length / en.length < 0.55) {
        missing.push(`opts::${en} (still thin ${next.length}/${en.length})`);
        continue;
      }
      urArr[i] = next;
      changed = true;
      patches++;
    }
    if (!changed) return match;
    const optsKey = match.trimStart().startsWith('"') ? '"opts"' : 'opts';
    const enKey = style === '"' ? '"en"' : 'en';
    const urKey = style === '"' ? '"ur"' : 'ur';
    return `${optsKey}: { ${enKey}: [${formatArray(enArr, style)}], ${urKey}: [${formatArray(urArr, style)}] }`;
  });

  if (out === block && patches === 0) {
    // q/explain regex may have matched nothing while opts also unchanged — ok
  }
  void fileLabel;
  return { out, patches };
}

function patchFile(filePath, exportName, placement) {
  let src = fs.readFileSync(filePath, 'utf8');
  const missing = [];
  let totalPatches = 0;

  const slice = extractPlacementBlock(src, exportName);
  if (!slice) {
    return 0; // derived export (e.g. options.js OPTIONS_PLACEMENT)
  }

  const { out, patches } = patchPlacementBlock(slice.block, missing, path.basename(filePath));
  totalPatches += patches;

  if (missing.length) {
    console.error('MISSING', path.basename(filePath), exportName);
    [...new Set(missing)].forEach((m) => console.error('  ', m));
    process.exit(1);
  }

  if (out !== slice.block) {
    src = src.slice(0, slice.start) + out + src.slice(slice.end);
    fs.writeFileSync(filePath, src);
  }

  void placement;
  return totalPatches;
}

async function main() {
  let bQ = 0,
    bEx = 0,
    bOpt = 0,
    bQC = 0,
    bExC = 0,
    bOptC = 0;
  let filesWithThin = 0;

  console.log('BEFORE');
  for (const [file, exp] of FILES) {
    const m = await import(pathToFileURL(path.join(dataDir, file)).href);
    const s = auditPlacement(m[exp]);
    const thin = s.qThin + s.exThin + s.optThin;
    if (thin) {
      filesWithThin++;
      console.log(
        `  ${file} ${exp}: q=${s.qThin}/${s.qCount} opts=${s.optThin}/${s.optCount} explain=${s.exThin}/${s.exCount}`
      );
    }
    bQ += s.qThin;
    bEx += s.exThin;
    bOpt += s.optThin;
    bQC += s.qCount;
    bExC += s.exCount;
    bOptC += s.optCount;
  }
  console.log(
    `  TOTAL thin: q=${bQ}/${bQC} opts=${bOpt}/${bOptC} explain=${bEx}/${bExC} (all=${bQ + bOpt + bEx})`
  );
  console.log(`  Files with thin fields: ${filesWithThin}/${FILES.length}`);

  let totalPatches = 0;
  const touched = new Set();
  for (const [file, exp] of FILES) {
    const m = await import(pathToFileURL(path.join(dataDir, file)).href + `?v=${Date.now()}`);
    const n = patchFile(path.join(dataDir, file), exp, m[exp]);
    if (n) {
      totalPatches += n;
      touched.add(file);
      console.log(`patched ${file} ${exp}: ${n} fields`);
    }
  }
  const filesTouched = touched.size;

  let aQ = 0,
    aEx = 0,
    aOpt = 0;
  console.log('\nAFTER');
  for (const [file, exp] of FILES) {
    const m = await import(pathToFileURL(path.join(dataDir, file)).href + `?v=${Date.now()}`);
    const s = auditPlacement(m[exp]);
    const thin = s.qThin + s.exThin + s.optThin;
    if (thin) {
      console.log(
        `  ${file} ${exp}: q=${s.qThin}/${s.qCount} opts=${s.optThin}/${s.optCount} explain=${s.exThin}/${s.exCount}`
      );
    }
    aQ += s.qThin;
    aEx += s.exThin;
    aOpt += s.optThin;
  }
  const beforeAll = bQ + bOpt + bEx;
  const afterAll = aQ + aOpt + aEx;
  console.log(`  TOTAL thin: q=${aQ} opts=${aOpt} explain=${aEx} (all=${afterAll})`);
  console.log(`\nBefore → After: ${beforeAll} → ${afterAll}`);
  console.log(`Files touched: ${filesTouched}`);
  console.log(`Applied ${totalPatches} patches.`);

  if (afterAll) process.exit(1);
}

main();
