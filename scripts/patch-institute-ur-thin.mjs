#!/usr/bin/env node
/** Expand thin Roman Urdu in institute lesson fields (ur/en >= 0.55). */
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'js/data/institute');

/** @type {Array<{file:string, en:string, ur:string, newUr:string}>} */
const PATCHES = [
  // app-401
  { file: 'app-401.js', en: 'Icons should include:', ur: 'Icons:', newUr: 'Icons mein kya hona chahiye:' },
  { file: 'app-401.js', en: 'Airplane test proves:', ur: 'Airplane:', newUr: 'Airplane test kya prove karta:' },
  { file: 'app-401.js', en: 'MasteryCap avoids:', ur: 'Avoid:', newUr: 'MasteryCap kya avoid karta:' },
  { file: 'app-401.js', en: 'Progress is stored:', ur: 'Progress:', newUr: 'Progress kahan store hoti:' },
  { file: 'app-401.js', en: 'Honesty copy should be:', ur: 'Honesty:', newUr: 'Honesty copy kaisi honi chahiye:' },
  // app-402
  { file: 'app-402.js', en: 'Scope must include:', ur: 'Scope:', newUr: 'Scope mein kya include hona chahiye:' },
  { file: 'app-402.js', en: 'Success metric should be:', ur: 'Metric:', newUr: 'Success metric kya hona chahiye:' },
  { file: 'app-402.js', en: 'Skeleton prioritizes:', ur: 'Skeleton:', newUr: 'Skeleton kya prioritize karta:' },
  { file: 'app-402.js', en: 'Persistence proves:', ur: 'Persist:', newUr: 'Persistence kya prove karti:' },
  { file: 'app-402.js', en: 'Release notes tell:', ur: 'Notes:', newUr: 'Release notes kya batate:' },
  // app-403
  { file: 'app-403.js', en: 'Capture without scope creep.', ur: 'Capture.', newUr: 'Capture bina scope creep ke.' },
  { file: 'app-403.js', en: 'Notes should avoid:', ur: 'Avoid:', newUr: 'Notes mein kya avoid karna:' },
  { file: 'app-403.js', en: 'Breaking changes need:', ur: 'Breaking:', newUr: 'Breaking changes ko kya chahiye:' },
  { file: 'app-403.js', en: 'Kill criteria say:', ur: 'Kill:', newUr: 'Kill criteria kya kehte:' },
  { file: 'app-403.js', en: 'Time box prevents:', ur: 'Time box:', newUr: 'Time box kya prevent karta:' },
  // be-301
  { file: 'be-301.js', en: 'Parse turns JSON into:', ur: 'Parse:', newUr: 'Parse JSON ko kya banata:' },
  { file: 'be-301.js', en: 'How will UI treat 5xx differently from 4xx?', ur: '5xx vs 4xx UI?', newUr: 'UI 5xx ko 4xx se kaise alag treat karegi?' },
  { file: 'be-301.js', en: '500 usually means:', ur: '500:', newUr: '500 usually kya mean karta:' },
  { file: 'be-301.js', en: 'Filters often use:', ur: 'Filters:', newUr: 'Filters aksar kya use karte:' },
  { file: 'be-301.js', en: 'Methods express:', ur: 'Methods:', newUr: 'Methods kya express karte:' },
  { file: 'be-301.js', en: 'Next steps beyond app.', ur: 'App ke baad.', newUr: 'App ke baad aglay steps.' },
  // be-302
  { file: 'be-302.js', en: 'Entities are usually:', ur: 'Entities:', newUr: 'Entities usually kya hote:' },
  { file: 'be-302.js', en: 'Primary keys must be:', ur: 'PK:', newUr: 'Primary keys must kya hon:' },
  { file: 'be-302.js', en: 'Normalization aims to:', ur: 'Normalize:', newUr: 'Normalization ka aim kya:' },
  { file: 'be-302.js', en: 'Good models state:', ur: 'Models:', newUr: 'Achhe models kya state karte:' },
  // be-303
  { file: 'be-303.js', en: 'Password storage should use:', ur: 'Passwords:', newUr: 'Password storage mein kya use karna:' },
  { file: 'be-303.js', en: 'Hashing is best for:', ur: 'Hashing:', newUr: 'Hashing best kis liye:' },
  { file: 'be-303.js', en: 'Explain session cookies vs bearer tokens at literacy level.', ur: 'Sessions vs tokens literacy.', newUr: 'Session cookies vs bearer tokens literacy level pe samjhao.' },
  { file: 'be-303.js', en: 'Session ids often live in:', ur: 'Session ids:', newUr: 'Session ids aksar kahan rehte:' },
  { file: 'be-303.js', en: 'Tokens are often:', ur: 'Tokens:', newUr: 'Tokens aksar kaise hote:' },
  { file: 'be-303.js', en: 'Authorization header common.', ur: 'Auth header.', newUr: 'Authorization header common hai.' },
  { file: 'be-303.js', en: 'Output encoding matters.', ur: 'Encoding.', newUr: 'Output encoding matter karti.' },
  { file: 'be-303.js', en: 'Validate/parameterize.', ur: 'Validate.', newUr: 'Validate/parameterize karo.' },
  { file: 'be-303.js', en: 'Broken access control means:', ur: 'Access control:', newUr: 'Broken access control ka matlab:' },
  { file: 'be-303.js', en: 'Authorize every action.', ur: 'Authorize.', newUr: 'Har action authorize karo.' },
  { file: 'be-303.js', en: 'Security by obscurity is:', ur: 'Obscurity:', newUr: 'Security by obscurity kya hai:' },
  { file: 'be-303.js', en: 'Client-only checks are:', ur: 'Client-only:', newUr: 'Client-only checks kya hain:' },
  { file: 'be-303.js', en: 'Enforce server-side when you have one.', ur: 'Server enforce.', newUr: 'Server-side enforce jab server ho.' },
  { file: 'be-303.js', en: 'Tokens in JS storage + XSS:', ur: 'Tokens+XSS:', newUr: 'Tokens JS storage + XSS:' },
  // be-304
  { file: 'be-304.js', en: 'GitHub Pages is great for:', ur: 'GH Pages:', newUr: 'GitHub Pages great kis liye:' },
  { file: 'be-304.js', en: 'Server apps needed when:', ur: 'Servers jab:', newUr: 'Server apps jab chahiye:' },
  { file: 'be-304.js', en: 'Phone-width check catches:', ur: 'Phone check:', newUr: 'Phone-width check kya pakarta:' },
  { file: 'be-304.js', en: 'Honesty limits belong:', ur: 'Honesty:', newUr: 'Honesty limits kahan belong karte:' },
  // fe-201
  { file: 'fe-201.js', en: 'undefined often means:', ur: 'undefined:', newUr: 'undefined aksar kya mean karta:' },
  { file: 'fe-201.js', en: 'Compute with operators and understand truthiness.', ur: 'Operators + truthiness.', newUr: 'Operators se compute karo aur truthiness samjho.' },
  { file: 'fe-201.js', en: 'Prefer equality with:', ur: 'Equality:', newUr: 'Equality ke liye prefer karo:' },
  { file: 'fe-201.js', en: 'Infinite loops happen when:', ur: 'Infinite loop:', newUr: 'Infinite loops kab hote:' },
  { file: 'fe-201.js', en: 'for...of iterates:', ur: 'for...of:', newUr: 'for...of kya iterate karta:' },
  { file: 'fe-201.js', en: 'Values not indices (by default story).', ur: 'Values.', newUr: 'Values, indices nahi (default story).' },
  { file: 'fe-201.js', en: 'A return statement:', ur: 'return:', newUr: 'return statement kya karta:' },
  { file: 'fe-201.js', en: 'One job per function aids:', ur: 'Ek kaam:', newUr: 'Ek kaam per function help karta:' },
  { file: 'fe-201.js', en: 'Bracket access helps when:', ur: 'Bracket:', newUr: 'Bracket access kab help karta:' },
  { file: 'fe-201.js', en: 'Objects are good for:', ur: 'Objects:', newUr: 'Objects achhe kis liye:' },
  { file: 'fe-201.js', en: 'Records of properties.', ur: 'Properties.', newUr: 'Properties ke records.' },
  // fe-202
  { file: 'fe-202.js', en: 'JS usually updates the page by:', ur: 'JS page update:', newUr: 'JS page usually kaise update karta:' },
  { file: 'fe-202.js', en: 'Select nodes with querySelector / querySelectorAll.', ur: 'querySelector se nodes.', newUr: 'querySelector / querySelectorAll se nodes select karo.' },
  { file: 'fe-202.js', en: 'Subscribe to signals.', ur: 'Signals.', newUr: 'Signals ko subscribe karo.' },
  { file: 'fe-202.js', en: 'Forms/links often need it.', ur: 'Forms/links.', newUr: 'Forms/links ko aksar chahiye.' },
  { file: 'fe-202.js', en: 'event.target is usually:', ur: 'event.target:', newUr: 'event.target usually kya hota:' },
  { file: 'fe-202.js', en: 'Useful in delegation.', ur: 'Delegation.', newUr: 'Delegation mein useful.' },
  { file: 'fe-202.js', en: 'Async scheduling helps:', ur: 'Async:', newUr: 'Async scheduling kya help karti:' },
  { file: 'fe-202.js', en: 'Literacy goal is to:', ur: 'Goal:', newUr: 'Literacy goal kya hai:' },
  { file: 'fe-202.js', en: 'On submit you often:', ur: 'Submit pe:', newUr: 'Submit pe aksar kya karte:' },
  { file: 'fe-202.js', en: 'Capstone should stay:', ur: 'Capstone:', newUr: 'Capstone kaisa rehna chahiye:' },
  // fe-203
  { file: 'fe-203.js', en: 'A component bundles:', ur: 'Component:', newUr: 'Component kya bundle karta:' },
  { file: 'fe-203.js', en: 'Only one tab panel should be:', ur: 'Tab panel:', newUr: 'Sirf ek tab panel kya hona chahiye:' },
  { file: 'fe-203.js', en: 'aria-selected communicates:', ur: 'aria-selected:', newUr: 'aria-selected kya communicate karta:' },
  { file: 'fe-203.js', en: 'Escape should usually:', ur: 'Escape:', newUr: 'Escape usually kya karna chahiye:' },
  { file: 'fe-203.js', en: 'Backdrop click often:', ur: 'Backdrop:', newUr: 'Backdrop click aksar kya karta:' },
  { file: 'fe-203.js', en: 'Lists should be driven by:', ur: 'Lists:', newUr: 'Lists kis se driven honi chahiye:' },
  { file: 'fe-203.js', en: 'Good critique is:', ur: 'Critique:', newUr: 'Achhi critique kaisi hoti:' },
  { file: 'fe-203.js', en: 'Tap targets relate to:', ur: 'Tap targets:', newUr: 'Tap targets kis se relate:' },
  { file: 'fe-203.js', en: 'Honesty in UI means:', ur: 'Honesty:', newUr: 'UI mein honesty ka matlab:' },
  // fe-204
  { file: 'fe-204.js', en: 'State should live primarily in:', ur: 'State:', newUr: 'State primarily kahan rehni chahiye:' },
  { file: 'fe-204.js', en: 'Always wrap parse in:', ur: 'Parse:', newUr: 'Parse hamesha wrap karo:' },
  { file: 'fe-204.js', en: 'Service workers can:', ur: 'SW:', newUr: 'Service workers kya kar sakte:' },
  { file: 'fe-204.js', en: 'Stale caches happen when:', ur: 'Stale:', newUr: 'Stale caches kab hote:' },
  { file: 'fe-204.js', en: 'Empty state should:', ur: 'Empty:', newUr: 'Empty state kya karna chahiye:' },
  // web-101
  { file: 'web-101.js', en: 'Data on the internet travels as:', ur: 'Internet pe data:', newUr: 'Internet pe data kis tarah travel karta:' },
  { file: 'web-101.js', en: 'Structure before style and behavior.', ur: 'Pehle structure.', newUr: 'Style/behavior se pehle structure.' },
  { file: 'web-101.js', en: 'What changed: code is structured thinking, not mystery symbols.', ur: 'Badla: code structured soch hai.', newUr: 'Badla: code structured soch hai, mystery symbols nahi.' },
  { file: 'web-101.js', en: 'An if/else is a:', ur: 'if/else:', newUr: 'if/else kya hai:' },
  { file: 'web-101.js', en: 'localStorage typically holds:', ur: 'localStorage:', newUr: 'localStorage usually kya hold karta:' },
  { file: 'web-101.js', en: 'DevTools help you:', ur: 'DevTools:', newUr: 'DevTools kya help karte:' },
  { file: 'web-101.js', en: 'The Console shows:', ur: 'Console:', newUr: 'Console kya dikhata:' },
  // web-102
  {
    file: 'web-102.js',
    en: '<p>Minimal document: <code>&lt;!DOCTYPE html&gt;</code>, <code>html</code>, <code>head</code> (title, meta charset), <code>body</code>. Charset prevents mojibake. Title shows in the tab.</p><p>Lang attribute helps browsers and screen readers.</p>',
    ur: '<p>Minimal: doctype, html, head (title, charset), body. Charset mojibake rokta. Title tab pe.</p><p>lang attribute help karta.</p>',
    newUr: '<p>Minimal document: doctype, html, head (title, meta charset), body. Charset mojibake rokta. Title browser tab pe dikhta.</p><p>lang attribute browsers aur screen readers ko help karta.</p>',
  },
  { file: 'web-102.js', en: 'DOCTYPE tells the browser:', ur: 'DOCTYPE:', newUr: 'DOCTYPE browser ko kya batata:' },
  { file: 'web-102.js', en: 'charset meta prevents:', ur: 'charset:', newUr: 'charset meta kya prevent karta:' },
  { file: 'web-102.js', en: 'title appears in:', ur: 'title:', newUr: 'title kahan appear hota:' },
  {
    file: 'web-102.js',
    en: '<p><code>a href</code> creates navigation. Prefer descriptive link text over “click here.” Images need <code>alt</code> for accessibility and when images fail. Decorative images can use empty alt.</p>',
    ur: '<p>a href navigation. “Click here” se behtar descriptive text. Images ko alt. Decorative = empty alt.</p>',
    newUr: '<p>a href se navigation banta. “Click here” se behtar descriptive link text. Images ko alt chahiye a11y aur fail pe. Decorative images empty alt use kar sakti.</p>',
  },
  {
    file: 'web-102.js',
    en: '<p>Forms collect input: text, email, checkbox, submit. Labels must associate with inputs (for/id). Without labels, forms fail accessibility and tap targets suffer on mobile.</p>',
    ur: '<p>Forms input leti. Labels for/id se associate. Bina labels a11y fail + mobile pe mushkil.</p>',
    newUr: '<p>Forms input leti: text, email, checkbox, submit. Labels for/id se inputs associate. Bina labels a11y fail + mobile tap targets mushkil.</p>',
  },
  { file: 'web-102.js', en: 'A prospectus should include:', ur: 'Prospectus:', newUr: 'Prospectus mein kya hona chahiye:' },
  { file: 'web-102.js', en: 'Self-attestation means:', ur: 'Self-attest:', newUr: 'Self-attestation ka matlab kya:' },
  { file: 'web-102.js', en: 'Prefer semantic tags over:', ur: 'Semantic >', newUr: 'Semantic tags prefer karo over:' },
  // web-103
  { file: 'web-103.js', en: 'Separation of concerns means:', ur: 'Separation:', newUr: 'Separation of concerns ka matlab:' },
  { file: 'web-103.js', en: 'Changed: layout is boxes all the way down.', ur: 'Badla: layout = boxes.', newUr: 'Badla: layout end tak boxes hi boxes.' },
  { file: 'web-103.js', en: 'box-sizing: border-box makes width include:', ur: 'border-box width:', newUr: 'border-box width mein kya include hota:' },
  {
    file: 'web-103.js',
    en: '<p>Flexbox: container with display:flex; main axis vs cross axis; justify-content and align-items. Great for toolbars and simple responsive rows.</p>',
    ur: '<p>Flex: display:flex; main vs cross; justify/align. Toolbars + simple rows.</p>',
    newUr: '<p>Flexbox: display:flex container; main axis vs cross axis; justify-content aur align-items. Toolbars aur simple responsive rows ke liye great.</p>',
  },
  { file: 'web-103.js', en: 'Changed: flex = one-dimensional layout power.', ur: 'Badla: flex = 1D power.', newUr: 'Badla: flex = one-dimensional layout power.' },
  { file: 'web-103.js', en: 'Cross-axis alignment.', ur: 'Cross-axis.', newUr: 'Cross-axis alignment matter karti.' },
];

function escRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function patchFile(file, patches) {
  let text = readFileSync(path.join(dir, file), 'utf8');
  let n = 0;
  for (const p of patches) {
    const needle = `"en": ${JSON.stringify(p.en)},\n            "ur": ${JSON.stringify(p.ur)}`;
    const repl = `"en": ${JSON.stringify(p.en)},\n            "ur": ${JSON.stringify(p.newUr)}`;
    if (!text.includes(needle)) {
      const needle2 = `"en": ${JSON.stringify(p.en)},\n        "ur": ${JSON.stringify(p.ur)}`;
      const repl2 = `"en": ${JSON.stringify(p.en)},\n        "ur": ${JSON.stringify(p.newUr)}`;
      if (text.includes(needle2)) {
        text = text.replace(needle2, repl2);
        n++;
        continue;
      }
      console.error('MISS', file, p.en.slice(0, 60));
      continue;
    }
    text = text.replace(needle, repl);
    n++;
  }
  writeFileSync(path.join(dir, file), text);
  return n;
}

const byFile = Map.groupBy ? Map.groupBy(PATCHES, (p) => p.file) : null;
let total = 0;
if (byFile) {
  for (const [file, patches] of byFile) total += patchFile(file, patches);
} else {
  const groups = {};
  for (const p of PATCHES) (groups[p.file] ||= []).push(p);
  for (const [file, patches] of Object.entries(groups)) total += patchFile(file, patches);
}
console.log('Applied', total, 'patches');
