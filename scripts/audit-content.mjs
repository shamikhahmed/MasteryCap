#!/usr/bin/env node
/** audit-content.mjs — banned promise phrases in lesson BODY only (§1.4) */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'js', 'data');
const files = [
  'course.js',
  'stocks.js',
  'invest.js',
  'futures.js',
  'forex.js',
  'spot.js',
  'bots.js',
  'binary.js',
].map((f) => path.join(dataDir, f));

const banned =
  /guaranteed profit|can't lose|cannot lose|risk-free profit|100% win|sure shot|pakka profit/gi;

const hits = [];

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  // Extract body:{en:`...`, ur:`...`} blocks roughly — scan only body template strings
  const bodyBlocks = [];
  const re = /body\s*:\s*\{\s*en\s*:\s*`([\s\S]*?)`\s*,\s*ur\s*:\s*`([\s\S]*?)`/g;
  let m;
  while ((m = re.exec(text))) {
    bodyBlocks.push({ lang: 'en', body: m[1] });
    bodyBlocks.push({ lang: 'ur', body: m[2] });
  }
  // Also double-quoted / single-quoted bodies if any
  const re2 =
    /body\s*:\s*\{\s*en\s*:\s*"([\s\S]*?)"\s*,\s*ur\s*:\s*"([\s\S]*?)"/g;
  while ((m = re2.exec(text))) {
    bodyBlocks.push({ lang: 'en', body: m[1] });
    bodyBlocks.push({ lang: 'ur', body: m[2] });
  }

  const base = path.basename(file);
  if (!bodyBlocks.length) {
    // fallback: whole file but strip quiz/opts sections by crude cut
    const stripped = text.replace(/quiz\s*:\s*\[[\s\S]*?\]\s*,?/g, '');
    let bm;
    banned.lastIndex = 0;
    while ((bm = banned.exec(stripped))) {
      hits.push(`${base}: "${bm[0]}" @${bm.index} (fallback scan)`);
    }
    continue;
  }

  for (const b of bodyBlocks) {
    let bm;
    banned.lastIndex = 0;
    while ((bm = banned.exec(b.body))) {
      hits.push(`${base} body.${b.lang}: "${bm[0]}"`);
    }
  }
}

if (hits.length) {
  console.error('FAIL content lint:');
  hits.forEach((h) => console.error('  ' + h));
  process.exit(1);
}
console.log('PASS: no banned promise phrases in lesson bodies');
