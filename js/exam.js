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
  const W = 2400, H = 1440;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const ACC = isTR ? '#FF6B2C' : '#5B8DEF';

  // Background — true black with faint radial lift
  ctx.fillStyle = '#08090A';
  ctx.fillRect(0, 0, W, H);
  const grad = ctx.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, W * 0.7);
  grad.addColorStop(0, 'rgba(255,255,255,0.035)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Double keyline frame + corner ticks
  ctx.strokeStyle = ACC;
  ctx.lineWidth = 4;
  ctx.strokeRect(70, 70, W - 140, H - 140);
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(92, 92, W - 184, H - 184);
  ctx.strokeStyle = ACC;
  ctx.lineWidth = 5;
  const T = 46;
  [[70, 70, 1, 1], [W - 70, 70, -1, 1], [70, H - 70, 1, -1], [W - 70, H - 70, -1, -1]].forEach(([x, y, dx, dy]) => {
    ctx.beginPath(); ctx.moveTo(x, y + dy * T); ctx.lineTo(x, y); ctx.lineTo(x + dx * T, y); ctx.stroke();
  });

  const center = (txt, y) => { const w = ctx.measureText(txt).width; ctx.fillText(txt, (W - w) / 2, y); };

  // Masthead
  ctx.fillStyle = ACC;
  ctx.font = '600 34px ui-monospace, monospace';
  center('M A S T E R Y C A P', 210);
  ctx.fillStyle = '#8A939E';
  ctx.font = '500 24px ui-monospace, monospace';
  center(lang === 'en' ? 'SELF-ISSUED RECORD OF STUDY' : 'SELF-ISSUED STUDY RECORD', 262);

  // Title
  ctx.fillStyle = '#F2F4F7';
  ctx.font = '650 110px Georgia, "Times New Roman", serif';
  center(isTR ? 'TRADE-READY' : 'COURSE LITERACY', 420);

  // Honesty banner — locked copy, never soften
  ctx.fillStyle = isTR ? ACC : '#EA3943';
  ctx.font = '600 30px system-ui, sans-serif';
  center(isTR
    ? (lang === 'en' ? 'NOT A LICENSE · NOT SECP/BROKER/CFA' : 'LICENSE NAHI · SECP/BROKER/CFA NAHI')
    : (lang === 'en' ? 'NOT TRADE-READY · NOT A LICENSE' : 'TRADE-READY NAHI · LICENSE NAHI'), 480);
  ctx.fillStyle = '#A8B0BA';
  ctx.font = '500 26px system-ui, sans-serif';
  center(isTR
    ? (lang === 'en' ? 'process-measured · paper/tiny size · decays without practice' : 'process-measured · paper/tiny · practice ke baghair kamzor')
    : (lang === 'en' ? 'exam + weeks only — Practice labs still required for TRADE-READY' : 'exam + weeks — TRADE-READY ke liye Practice labs abhi'), 526);

  // Awarded name — the hero
  ctx.fillStyle = '#8A939E';
  ctx.font = '500 26px ui-monospace, monospace';
  center(lang === 'en' ? 'THIS RECORDS THE STUDY OF' : 'YEH STUDY RECORD HAI', 640);
  ctx.fillStyle = '#F2F4F7';
  ctx.font = 'italic 650 96px Georgia, "Times New Roman", serif';
  center(name || 'Trader', 750);
  const nw = Math.min(ctx.measureText(name || 'Trader').width, W - 600);
  ctx.strokeStyle = ACC;
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo((W - nw) / 2 - 40, 786); ctx.lineTo((W + nw) / 2 + 40, 786); ctx.stroke();

  // Course + date
  ctx.fillStyle = '#C4C8CD';
  ctx.font = '500 34px system-ui, sans-serif';
  center(`${lang === 'en' ? 'Course' : 'Course'}: ${trackName}`, 856);
  const d = new Date(dateIso || Date.now());
  ctx.fillStyle = '#8A939E';
  ctx.font = '500 28px ui-monospace, monospace';
  center(d.toISOString().slice(0, 10), 904);

  // Evidence lines
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
  ctx.font = '400 28px system-ui, sans-serif';
  lines.forEach((ln, i) => center(ln.slice(0, 88), 1000 + i * 46));

  // Verify seal — bottom right
  const sx = W - 320, sy = H - 300;
  ctx.strokeStyle = ACC;
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(sx, sy, 92, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.beginPath(); ctx.arc(sx, sy, 78, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = ACC;
  ctx.font = '600 24px ui-monospace, monospace';
  let t1 = 'VERIFY'; ctx.fillText(t1, sx - ctx.measureText(t1).width / 2, sy - 12);
  ctx.fillStyle = '#C4C8CD';
  ctx.font = '500 20px ui-monospace, monospace';
  t1 = String(hash).slice(0, 10); ctx.fillText(t1, sx - ctx.measureText(t1).width / 2, sy + 22);

  ctx.fillStyle = '#8A939E';
  ctx.font = '500 22px ui-monospace, monospace';
  ctx.fillText(`verify:${hash}`, 140, H - 190);

  // Footer honesty line — locked copy
  ctx.fillStyle = '#8A939E';
  ctx.font = '400 22px system-ui, sans-serif';
  center(lang === 'en'
    ? 'Self-issued · device-local · NOT SECP/broker/CFA/gov license · not investment advice · competence decays'
    : 'Self-issued · device-local · SECP/broker/CFA/sarkari license NAHI · advice nahi · competence kamzor hoti', H - 130);

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
