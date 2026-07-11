/* ============================================================
   exam.js — track final exam + certificate canvas (Course / TRADE-READY).
   ============================================================ */

import { store, KEYS, djb2 } from './store.js';
import { getTrack } from './data/tracks.js';

function shuffle(arr, rng = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Build 15 unique questions from track quiz pool. */
export function buildExam(trackId, seed = Date.now()) {
  const track = getTrack(trackId);
  const pool = [];
  track.weeks.forEach((w) => {
    (w.quiz || []).forEach((q, qi) => {
      pool.push({ trackId, weekId: w.id, qi, q });
    });
  });
  let s = seed >>> 0;
  const rng = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  const picked = shuffle(pool, rng).slice(0, Math.min(15, pool.length));
  return {
    trackId,
    seed,
    items: picked.map((p) => ({
      ...p,
      order: shuffle(p.q.opts.en.map((_, i) => i), rng),
    })),
  };
}

export function scoreExam(exam, answers) {
  let correct = 0;
  exam.items.forEach((it, i) => {
    if (answers[i] === it.q.correct) correct++;
  });
  const total = exam.items.length;
  const pct = total ? correct / total : 0;
  return { correct, total, pct, passed: pct >= 0.8 };
}

export function markExamPassed(trackId, App) {
  const prog = App.getCourse(trackId);
  prog.examPassed = new Date().toISOString();
  prog.xp = (prog.xp || 0) + 200;
  App.setCourse(trackId, prog);
}

export function trackComplete(trackId, App) {
  const track = getTrack(trackId);
  const prog = App.getCourse(trackId);
  return track.weeks.every((w) => ['completed', 'mastered'].includes(prog.weekStatus[w.id]));
}

export function evidenceHash(evidence) {
  try {
    return djb2(JSON.stringify(evidence || {})).slice(0, 10);
  } catch {
    return '--------';
  }
}

/**
 * @param {'course'|'trade_ready'} tier
 * course = weeks+exam complete (NOT trade-ready)
 * trade_ready = graduation gates + evidence
 */
export function downloadCertificate({
  name, trackName, dateIso, lang = 'en', evidence = null, tier = 'course',
}) {
  const isTR = tier === 'trade_ready';
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#08090A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = isTR ? '#FF6B2C' : '#5B8DEF';
  ctx.lineWidth = 3;
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

  ctx.fillStyle = isTR ? '#FF6B2C' : '#5B8DEF';
  ctx.font = '600 26px system-ui, sans-serif';
  ctx.fillText('MasteryCap', 80, 100);

  ctx.fillStyle = '#F2F4F7';
  ctx.font = '600 36px system-ui, sans-serif';
  const title = isTR
    ? 'TRADE-READY'
    : (lang === 'en' ? 'COURSE LITERACY' : 'COURSE LITERACY');
  ctx.fillText(title, 80, 165);

  ctx.fillStyle = isTR ? '#FF6B2C' : '#EA3943';
  ctx.font = '600 20px system-ui, sans-serif';
  ctx.fillText(
    isTR
      ? (lang === 'en' ? 'NOT A LICENSE · NOT SECP/BROKER/CFA' : 'LICENSE NAHI · SECP/BROKER/CFA NAHI')
      : (lang === 'en' ? 'NOT TRADE-READY · NOT A LICENSE' : 'TRADE-READY NAHI · LICENSE NAHI'),
    80, 200
  );

  ctx.fillStyle = '#A8B0BA';
  ctx.font = '500 17px system-ui, sans-serif';
  ctx.fillText(
    isTR
      ? (lang === 'en' ? 'process-measured · paper/tiny size · decays without practice' : 'process-measured · paper/tiny · practice ke baghair kamzor')
      : (lang === 'en' ? 'exam + weeks only — Practice labs still required for TRADE-READY' : 'exam + weeks — TRADE-READY ke liye Practice labs abhi'),
    80, 235
  );

  ctx.fillStyle = '#F2F4F7';
  ctx.font = '600 28px system-ui, sans-serif';
  ctx.fillText(name || 'Trader', 80, 290);

  ctx.fillStyle = '#A8B0BA';
  ctx.font = '400 20px system-ui, sans-serif';
  ctx.fillText(`${lang === 'en' ? 'Course' : 'Course'}: ${trackName}`, 80, 330);

  const d = new Date(dateIso || Date.now());
  ctx.fillStyle = '#8A939E';
  ctx.font = '500 18px ui-monospace, monospace';
  ctx.fillText(d.toISOString().slice(0, 10), 80, 370);

  const hash = evidenceHash(evidence);
  const lines = [];
  if (evidence?.examPassedAt || !isTR) {
    lines.push(lang === 'en' ? '✓ Final exam on record' : '✓ Final exam record');
  }
  if (isTR) {
    const sim = evidence?.sim;
    if (sim) {
      const rate = Math.round((sim.processPassRate || 0) * 100);
      lines.push(`✓ Sim trades ${sim.tradeCount || 0} · process ${rate}% (latest 10)`);
      lines.push(sim.liquidatedInLatest10 === 0
        ? (lang === 'en' ? '✓ Zero liquidations (latest 10)' : '✓ Zero liquidation (latest 10)')
        : (lang === 'en' ? '○ Liquidation check' : '○ Liquidation check'));
    }
    if (evidence?.portfolio) {
      lines.push(`✓ Portfolio adherence passes: ${evidence.portfolio.pass || 0}`);
    }
    lines.push(lang === 'en'
      ? '✓ Process competence — markets still decide outcomes'
      : '✓ Process competence — markets outcomes decide');
  } else {
    lines.push(lang === 'en'
      ? '✓ Course weeks completed / exam passed'
      : '✓ Course weeks / exam pass');
    lines.push(lang === 'en'
      ? '○ TRADE-READY requires Practice labs (separate)'
      : '○ TRADE-READY ke liye Practice labs alag');
  }

  ctx.fillStyle = '#C4C8CD';
  ctx.font = '400 17px system-ui, sans-serif';
  lines.forEach((ln, i) => ctx.fillText(ln.slice(0, 88), 80, 420 + i * 28));

  ctx.fillStyle = '#8A939E';
  ctx.font = '500 14px ui-monospace, monospace';
  ctx.fillText(`verify:${hash}`, 80, 600);

  ctx.fillStyle = '#8A939E';
  ctx.font = '400 13px system-ui, sans-serif';
  ctx.fillText(
    lang === 'en'
      ? 'Self-issued · device-local · NOT SECP/broker/CFA/gov license · not investment advice · competence decays'
      : 'Self-issued · device-local · SECP/broker/CFA/sarkari license NAHI · advice nahi · competence kamzor hoti',
    80, 640
  );

  const a = document.createElement('a');
  const slug = String(trackName).replace(/\s+/g, '-').toLowerCase();
  a.download = `masterycap-${isTR ? 'trade-ready' : 'course'}-${slug}.png`;
  a.href = canvas.toDataURL('image/png');
  a.click();
}

/** Binary harm-reduction gate — 3 fixed questions. */
export const BINARY_GATE = [
  {
    q: {
      en: 'Breakeven win rate at 80% payout is closest to…',
      ur: '80% payout pe breakeven win rate qareeb…',
    },
    opts: {
      en: ['50%', '55.6%', '80%', '100%'],
      ur: ['50%', '55.6%', '80%', '100%'],
    },
    correct: 1,
    explain: {
      en: '100 ÷ (100 + 80) ≈ 55.6%.',
      ur: '100 ÷ (100 + 80) ≈ 55.6%.',
    },
  },
  {
    q: {
      en: 'Most binary “mentors” primarily earn from…',
      ur: 'Zyada tar binary “mentors” asal mein kamate hain…',
    },
    opts: {
      en: ['Your trading profits', 'Affiliate commissions on deposits', 'SECP salaries'],
      ur: ['Aapki trading profits', 'Deposits pe affiliate commission', 'SECP salary'],
    },
    correct: 1,
    explain: {
      en: 'They get paid when you deposit — not when you win.',
      ur: 'Paisa deposit pe milta hai — jeet pe nahi.',
    },
  },
  {
    q: {
      en: 'Recommended binary “earn size” in this school:',
      ur: 'Is school mein binary “earn size”:',
    },
    opts: {
      en: ['$0 — walk away', '$50/day', 'Whatever fits'],
      ur: ['$0 — walk away', '$50/day', 'Jo fit ho'],
    },
    correct: 0,
    explain: {
      en: 'Literacy track only. No income path.',
      ur: 'Sirf literacy. Income path nahi.',
    },
  },
];
