#!/usr/bin/env node
/**
 * audit-content.mjs — income-promise lint (S6).
 * Scans: lesson bodies, i18n user strings, sim mission copy, howto.
 * Quiz / placement / opts distractors are exempt.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const banned =
  /guaranteed profit|can't lose|risk-free profit|100% win|sure shot|pakka profit|kamai pakki|earn guaranteed|become rich|get rich/gi;

const hits = [];

function scanText(label, text) {
  let m;
  banned.lastIndex = 0;
  while ((m = banned.exec(text))) {
    hits.push(`${label}: "${m[0]}"`);
  }
}

function extractBodies(text) {
  const out = [];
  // body:{en:`...`, ur:`...`} or body:{en:"...", ur:"..."}
  // also JSON "body":{"en":"...","ur":"..."}
  const patterns = [
    /"?body"?\s*:\s*\{\s*"?en"?\s*:\s*`([\s\S]*?)`\s*,\s*"?ur"?\s*:\s*`([\s\S]*?)`/g,
    /"?body"?\s*:\s*\{\s*"?en"?\s*:\s*"((?:\\.|[^"\\])*)"\s*,\s*"?ur"?\s*:\s*"((?:\\.|[^"\\])*)"/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text))) {
      out.push({ lang: 'en', body: m[1] });
      out.push({ lang: 'ur', body: m[2] });
    }
  }
  return out;
}

/* ---- lesson bodies in js/data (skip quiz-only modules) ---- */
const dataDir = path.join(root, 'js', 'data');
const skipData = new Set(['quiz-extra.js']);
for (const file of fs.readdirSync(dataDir).filter((f) => f.endsWith('.js'))) {
  if (skipData.has(file)) continue;
  const text = fs.readFileSync(path.join(dataDir, file), 'utf8');
  const bodies = extractBodies(text);
  if (!bodies.length) {
    // No lesson bodies — do not fallback-scan whole file (quiz noise)
    continue;
  }
  for (const b of bodies) {
    scanText(`${file} body.${b.lang}`, b.body);
  }
}

/* ---- i18n user-facing string literals ---- */
{
  const i18n = fs.readFileSync(path.join(root, 'js', 'i18n.js'), 'utf8');
  let m;
  const re = /:\s*'((?:\\'|[^'])*)'/g;
  while ((m = re.exec(i18n))) {
    scanText('i18n', m[1].replace(/\\'/g, "'"));
  }
  const re2 = /:\s*"((?:\\"|[^"])*)"/g;
  while ((m = re2.exec(i18n))) {
    scanText('i18n', m[1].replace(/\\"/g, '"'));
  }
}

/* ---- sim mission copy ---- */
{
  const sc = fs.readFileSync(path.join(root, 'js', 'sim', 'scenarios.js'), 'utf8');
  const bodies = [];
  const re = /mission\s*:\s*\{\s*en\s*:\s*'((?:\\'|[^'])*)'\s*,\s*ur\s*:\s*'((?:\\'|[^'])*)'/g;
  let m;
  while ((m = re.exec(sc))) {
    bodies.push(['en', m[1]], ['ur', m[2]]);
  }
  const re2 = /mission\s*:\s*\{\s*en\s*:\s*`([\s\S]*?)`\s*,\s*ur\s*:\s*`([\s\S]*?)`/g;
  while ((m = re2.exec(sc))) {
    bodies.push(['en', m[1]], ['ur', m[2]]);
  }
  for (const [lang, body] of bodies) {
    scanText(`scenarios mission.${lang}`, body);
  }
}

/* ---- howto hub ---- */
{
  const howto = path.join(root, 'js', 'howto.js');
  if (fs.existsSync(howto)) {
    // howto is checklist strings — scan but ignore comment lines
    const text = fs.readFileSync(howto, 'utf8')
      .split('\n')
      .filter((l) => !l.trim().startsWith('//') && !l.trim().startsWith('*'))
      .join('\n');
    scanText('howto.js', text);
  }
}

if (hits.length) {
  console.error('FAIL content lint:');
  hits.forEach((h) => console.error('  ' + h));
  process.exit(1);
}
console.log('PASS: no banned income-promise phrases in user-facing copy');
