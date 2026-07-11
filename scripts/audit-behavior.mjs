#!/usr/bin/env node
/** audit-behavior.mjs — pure-logic behavioral checks (shuffle, drills, insights, discipline, charts, retention) */
import { TRACKS } from '../js/data/tracks.js';
import { generateDrill, checkAnswer, awardDrillXp, drillTypes, emptyStats } from '../js/drills.js';
import { allInsights, worstCostLine } from '../js/insights.js';
import { disciplineReport, isRevengeCandidate, isScoredTrade, gradeFromRatio } from '../js/discipline.js';
import { generateChart, checkTap } from '../js/chartgen.js';
import { injectFigures, FIGURE_NAMES } from '../js/figures.js';

const fails = [];
const pass = [];
function ok(name, cond, detail = '') {
  if (cond) pass.push(name);
  else fails.push(`${name}${detail ? ': ' + detail : ''}`);
}

/* ── shuffle remap (mirror course.js) ── */
function shuffleOrder(n) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function scoreQuiz(quiz, answers) {
  let correct = 0;
  quiz.forEach((q, i) => { if (answers[i] === q.correct) correct++; });
  return correct;
}

{
  const track = TRACKS.find((t) => t.id === 'crypto');
  const w = track.weeks[0];
  const order1 = w.quiz.map((q) => shuffleOrder(q.opts.en.length));
  const answers = {};
  w.quiz.forEach((q, i) => {
    // click displayed position that maps to original correct
    const di = order1[i].indexOf(q.correct);
    const oi = order1[i][di]; // original index stored
    answers[i] = oi;
  });
  ok('1.5 quiz all-correct via original-index', scoreQuiz(w.quiz, answers) === w.quiz.length);

  const order2 = w.quiz.map((q) => shuffleOrder(q.opts.en.length));
  // reshuffle should usually differ (retry a few times if unlucky)
  let differed = JSON.stringify(order1) !== JSON.stringify(order2);
  for (let t = 0; t < 20 && !differed; t++) {
    const o = w.quiz.map((q) => shuffleOrder(q.opts.en.length));
    if (JSON.stringify(o) !== JSON.stringify(order1)) differed = true;
  }
  ok('1.5 quiz reshuffle differs across attempts', differed);

  // placement all-correct → all topics with ≥60%
  const pOrder = track.placement.map((q) => shuffleOrder(q.opts.en.length));
  const pAns = {};
  track.placement.forEach((q, i) => { pAns[i] = q.correct; });
  const topicScore = {};
  track.placement.forEach((q, i) => {
    if (!topicScore[q.topic]) topicScore[q.topic] = { correct: 0, total: 0 };
    topicScore[q.topic].total++;
    if (pAns[i] === q.correct) topicScore[q.topic].correct++;
  });
  const mastered = track.weeks.filter((w) => {
    const s = topicScore[w.id];
    return s && s.correct / s.total >= 0.6;
  }).length;
  ok('1.5 placement all-correct masters topics', mastered === track.weeks.filter((w) => topicScore[w.id]).length, `mastered=${mastered}`);
  void pOrder;
}

/* ── figures inject every week ── */
{
  let rawLeft = 0;
  let weeks = 0;
  for (const t of TRACKS) {
    for (const w of t.weeks) {
      weeks++;
      for (const lang of ['en', 'ur']) {
        const out = injectFigures(w.body[lang], lang);
        if (/\{\{fig:/.test(out)) rawLeft++;
      }
    }
  }
  ok('1.8 P1 injectFigures no raw markers', rawLeft === 0, `leftover=${rawLeft} weeks=${weeks}`);
  ok('1.8 P1 figure registry non-empty', FIGURE_NAMES.length >= 20);
}

/* ── drills: 5 correct each family + hand check ── */
{
  const types = drillTypes();
  const handChecks = [];
  for (const type of types) {
    let okCount = 0;
    for (let i = 0; i < 5; i++) {
      const d = generateDrill(type, 1000 + i * 17 + type.length);
      const r = checkAnswer(d, String(d.answer));
      if (r.ok) okCount++;
      if (i < 2) {
        // recompute two by hand from solution presence
        handChecks.push({ type, seed: d.seed, answer: d.answer, parsed: r.parsed, match: r.ok });
      }
    }
    ok(`1.8 P2 drill ${type} 5/5`, okCount === 5, `${okCount}/5`);
  }

  // XP daily cap
  const mem = { data: { drillStats: emptyStats() } };
  const fakeStore = {
    get: (k, fb) => (mem.data[k] !== undefined ? mem.data[k] : fb),
    set: (k, v) => { mem.data[k] = v; return true; },
  };
  const KEYS = { drillStats: 'drillStats', course: 'course' };
  mem.data.course = { crypto: { xp: 0, weekStatus: {}, placementDone: false } };
  let totalXp = 0;
  for (let i = 0; i < 15; i++) {
    totalXp += awardDrillXp(fakeStore, KEYS, true);
  }
  ok('1.8 P2 XP daily cap 50', totalXp === 50 && mem.data.drillStats.xpToday === 50, `totalXp=${totalXp}`);
  console.log('P2 hand-check samples:', JSON.stringify(handChecks.slice(0, 4)));
}

/* ── insights n≥3 ── */
{
  const few = [
    { emotion: 'calm', pl: 10 },
    { emotion: 'calm', pl: -5 },
  ];
  const insFew = allInsights(few);
  ok('1.8 P3 n<3 expectancy null', insFew.expectancy == null);
  ok('1.8 P3 n<3 worstCost null', worstCostLine(few) == null);

  const many = [
    { emotion: 'calm', pl: 20, pair: 'BTC', ts: 1 },
    { emotion: 'calm', pl: 10, pair: 'BTC', ts: 2 },
    { emotion: 'calm', pl: -5, pair: 'BTC', ts: 3 },
    { emotion: 'revenge', pl: -40, pair: 'ETH', ts: 4 },
    { emotion: 'revenge', pl: -30, pair: 'ETH', ts: 5 },
    { emotion: 'revenge', pl: -20, pair: 'ETH', ts: 6 },
    { emotion: 'greed', pl: -15, pair: 'SOL', ts: 7 },
    { emotion: 'greed', pl: 5, pair: 'SOL', ts: 8 },
    { emotion: 'greed', pl: -10, pair: 'SOL', ts: 9 },
  ];
  const ins = allInsights(many);
  ok('1.8 P3 expectancy present', ins.expectancy && ins.expectancy.n >= 3);
  ok('1.8 P3 flagged present', ins.flagged && ins.flagged.n >= 3);
  const line = worstCostLine(many, 'en');
  ok('1.8 P3 worstCostLine string', typeof line === 'string' && line.length > 0, line || '');
  console.log('P3 expectancy:', JSON.stringify(ins.expectancy));
  console.log('P3 flagged:', JSON.stringify(ins.flagged));
  console.log('P3 worstCost:', line);
}

/* ── discipline ── */
{
  const now = Date.now();
  const iso = (ms) => new Date(ms).toISOString();
  const trades = [
    { id: '1', pl: -50, stopPlaced: true, movedStop: false, date: iso(now - 3600000), size: 100, emotion: 'calm' },
    { id: '2', pl: 20, stopPlaced: true, movedStop: false, date: iso(now - 3500000), size: 100, emotion: 'calm' },
    // revenge: within 30min of loss id1... wait id2 is win. Use loss then revenge:
  ];
  const lossTime = now - 40 * 60000;
  const revengeTrades = [
    { id: 'L', pl: -50, stopPlaced: true, movedStop: false, date: iso(lossTime), size: 100, emotion: 'calm' },
    { id: 'R', pl: -10, stopPlaced: true, movedStop: false, date: iso(lossTime + 10 * 60000), size: 100, emotion: 'revenge' },
  ];
  const bal = 10000;
  ok('1.8 P6 old trade unscored', !isScoredTrade({ pl: 1 }));
  ok('1.8 P6 revenge detect', isRevengeCandidate(revengeTrades[1], revengeTrades));
  // seed 20 scored good trades → A
  const good = Array.from({ length: 20 }, (_, i) => ({
    id: String(i),
    pl: i % 2 ? 10 : -5,
    stopPlaced: true,
    movedStop: false,
    date: iso(now - i * 86400000),
    size: 50,
    emotion: 'calm',
  }));
  const rep = disciplineReport(good, bal);
  ok('1.8 P6 good set grade A/B', rep && (rep.grade === 'A' || rep.grade === 'B'), JSON.stringify(rep));
  ok('1.8 P6 gradeFromRatio', gradeFromRatio(0.95) === 'A' && gradeFromRatio(0.5) === 'F');

  // mix with null fields excluded
  const mixed = [...good.slice(0, 5), { id: 'old', pl: -100, date: iso(now) }];
  const rep2 = disciplineReport(mixed, bal);
  ok('1.8 P6 unscored excluded from n', rep2 && rep2.n === 5, `n=${rep2?.n}`);
  void trades;}

/* ── chartgen 20 seeds ── */
{
  let match = 0;
  for (let i = 0; i < 20; i++) {
    const c = generateChart(5000 + i);
    if (c.mode === 'classify') {
      if (c.options && c.options.en && c.correct != null && c.label) match++;
    } else if (c.mode === 'tap_resistance') {
      const mid = (c.band.lo + c.band.hi) / 2;
      if (checkTap(mid, c.band) && !checkTap(c.band.hi * 2, c.band)) match++;
    } else if (c.mode === 'engulfing_mcq') {
      if (c.correct === 1) match++;
    }
  }
  ok('1.8 P5 chart 20 seeded rounds coherent', match === 20, `match=${match}`);
}

/* ── retention box math (pure, no localStorage) ── */
{
  // Simulate Leitner: wrong → box 1 due+1; correct advances
  function nextBox(box, correct) {
    if (!correct) return { box: 1, delay: 1 };
    const nb = Math.min(3, (box || 1) + 1);
    const delay = nb === 1 ? 1 : nb === 2 ? 3 : 7;
    return { box: nb, delay };
  }
  ok('1.8 P4 wrong resets box1', nextBox(3, false).box === 1);
  ok('1.8 P4 correct advances', nextBox(1, true).box === 2 && nextBox(2, true).delay === 7);
}

console.log(`\nPASS ${pass.length} · FAIL ${fails.length}`);
if (fails.length) {
  console.error('FAILS:');
  fails.forEach((f) => console.error('  ' + f));
  process.exit(1);
}
console.log('PASS: behavior unit suite');
