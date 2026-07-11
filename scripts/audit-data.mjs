#!/usr/bin/env node
/** audit-data.mjs — track/week/quiz/placement shape integrity (§1.1) */
import { TRACKS } from '../js/data/tracks.js';

const fails = [];
const warns = [];
const rows = [];

for (const t of TRACKS) {
  const bodiesBilingual = t.weeks.every((w) => w.body?.en && w.body?.ur);
  const quizzesValid = t.weeks.every((w) =>
    (w.quiz || []).every(
      (q) =>
        Number.isInteger(q.correct) &&
        q.opts?.en &&
        q.opts?.ur &&
        q.correct < q.opts.en.length &&
        q.opts.en.length === q.opts.ur.length &&
        q.explain?.en &&
        q.explain?.ur &&
        q.q?.en &&
        q.q?.ur
    )
  );
  const placementValid = (t.placement || []).every(
    (q) =>
      Number.isInteger(q.correct) &&
      q.opts?.en &&
      q.correct < q.opts.en.length &&
      q.opts.en.length === q.opts.ur.length &&
      t.weeks.some((w) => w.id === q.topic)
  );
  const row = {
    id: t.id,
    weeks: t.weeks.length,
    bodiesBilingual,
    quizzesValid,
    placementValid,
    placementN: (t.placement || []).length,
  };
  rows.push(row);
  if (!bodiesBilingual) fails.push(`${t.id}: bodiesBilingual false`);
  if (!quizzesValid) fails.push(`${t.id}: quizzesValid false`);
  if (!placementValid) fails.push(`${t.id}: placementValid false`);

  // crypto W8 may have only 2 quiz Q — accepted
  for (const w of t.weeks) {
    const n = (w.quiz || []).length;
    if (n === 0) fails.push(`${t.id} W${w.id}: empty quiz`);
    if (t.id === 'crypto' && w.id === 8 && n === 2) {
      /* accepted verbatim */
    } else if (n > 0 && n < 2) {
      warns.push(`${t.id} W${w.id}: only ${n} quiz Q`);
    }
  }
}

console.log(JSON.stringify(rows, null, 2));
if (warns.length) {
  console.log('\nWARN:');
  warns.forEach((w) => console.log('  ' + w));
}
if (fails.length) {
  console.error('\nFAIL:');
  fails.forEach((f) => console.error('  ' + f));
  process.exit(1);
}
console.log('\nPASS: all tracks data integrity');
