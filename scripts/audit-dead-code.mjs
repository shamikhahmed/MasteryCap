import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const jsRoot = path.join(root, 'js');

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : entry.name.endsWith('.js') ? [target] : [];
  });
}

const files = walk(jsRoot).map(path.normalize);
const known = new Set(files);
const visited = new Set();
const missing = [];

function visit(file) {
  const normalized = path.normalize(file);
  if (visited.has(normalized)) return;
  if (!known.has(normalized)) {
    missing.push(path.relative(root, normalized));
    return;
  }
  visited.add(normalized);
  const source = fs.readFileSync(normalized, 'utf8');
  for (const match of source.matchAll(/(?:from\s*|import\s*\(\s*)['"]([^'"]+)['"]/g)) {
    if (!match[1].startsWith('.')) continue;
    let dependency = path.resolve(path.dirname(normalized), match[1]);
    if (!path.extname(dependency)) dependency += '.js';
    visit(dependency);
  }
}

const entry = path.join(jsRoot, 'app.js');
visit(entry);
visit(path.join(jsRoot, 'register-sw.js'));
visit(path.join(jsRoot, 'institute', 'sandbox-frame.js'));

// Route modules are declared as data and imported through import(path).
const appSource = fs.readFileSync(entry, 'utf8');
for (const match of appSource.matchAll(/['"](\.\/views\/[^'"]+\.js)['"]/g)) {
  visit(path.resolve(jsRoot, match[1]));
}

const orphans = files.filter((file) => !visited.has(file)).map((file) => path.relative(root, file));
if (missing.length || orphans.length) {
  if (missing.length) console.error(`FAIL missing modules:\n${missing.map((file) => `  ${file}`).join('\n')}`);
  if (orphans.length) console.error(`FAIL unreachable browser modules:\n${orphans.map((file) => `  ${file}`).join('\n')}`);
  process.exit(1);
}

console.log(`PASS: ${visited.size} browser modules reachable; no orphan modules`);
