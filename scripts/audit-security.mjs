import fs from 'node:fs';

const index = fs.readFileSync('index.html', 'utf8');
const editor = fs.readFileSync('js/institute/code-editor.js', 'utf8');
const runner = fs.readFileSync('sandbox-runner.html', 'utf8');
const failures = [];

const csp = index.match(/http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i)?.[1] || '';
for (const directive of ["default-src 'self'", "object-src 'none'", "script-src 'self'", "worker-src 'self' blob:"]) {
  if (!csp.includes(directive)) failures.push(`main CSP missing ${directive}`);
}
if (csp.includes("'unsafe-eval'")) failures.push('main application CSP allows unsafe-eval');
if (/<script(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/i.test(index)) failures.push('index.html contains an inline script');
if (!/setAttribute\('sandbox', 'allow-scripts'\)/.test(editor) || /allow-same-origin/.test(editor)) {
  failures.push('code runner iframe is not opaque-origin sandboxed');
}
if (!/default-src 'none'/.test(runner) || !/script-src 'self' 'unsafe-eval'/.test(runner)) {
  failures.push('sandbox runner CSP is not isolated from the main application');
}

if (failures.length) {
  failures.forEach((failure) => console.error(`FAIL: ${failure}`));
  process.exit(1);
}
console.log('PASS: strict app CSP and isolated executable-code policy');
