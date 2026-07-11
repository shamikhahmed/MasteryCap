/* ============================================================
   exam.js — track final exam + local certificate canvas (P11)
   ============================================================ */

import { store, KEYS } from './store.js';
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

/** Draw TRADE-READY certificate to canvas → PNG download. Process-measured honesty. */
export function downloadCertificate({ name, trackName, dateIso, lang = 'en', evidence = null }) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 675;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#08090A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#FF6B2C';
  ctx.lineWidth = 3;
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

  ctx.fillStyle = '#FF6B2C';
  ctx.font = '600 26px system-ui, sans-serif';
  ctx.fillText('MasteryCap', 80, 110);

  ctx.fillStyle = '#F2F4F7';
  ctx.font = '600 44px system-ui, sans-serif';
  ctx.fillText(lang === 'en' ? 'TRADE-READY' : 'TRADE-READY', 80, 190);

  ctx.fillStyle = '#A8B0BA';
  ctx.font = '500 20px system-ui, sans-serif';
  ctx.fillText(
    lang === 'en' ? 'process-measured' : 'process-measured',
    80, 230
  );

  ctx.fillStyle = '#F2F4F7';
  ctx.font = '600 28px system-ui, sans-serif';
  ctx.fillText(name || 'Trader', 80, 300);

  ctx.fillStyle = '#A8B0BA';
  ctx.font = '400 20px system-ui, sans-serif';
  ctx.fillText(
    lang === 'en' ? `Track: ${trackName}` : `Track: ${trackName}`,
    80, 340
  );

  const d = new Date(dateIso || Date.now());
  ctx.fillStyle = '#8A939E';
  ctx.font = '500 18px ui-monospace, monospace';
  ctx.fillText(d.toISOString().slice(0, 10), 80, 380);

  const sim = evidence?.sim;
  const examLine = evidence?.examPassedAt
    ? (lang === 'en' ? 'Exam passed' : 'Exam pass')
    : (lang === 'en' ? 'Exam on record' : 'Exam record');
  let evidenceLine = examLine;
  if (sim && sim.tradeCount != null) {
    const rate = Math.round((sim.processPassRate || 0) * 100);
    evidenceLine = lang === 'en'
      ? `${examLine} · Sim trades ${sim.tradeCount} · Process ${rate}% (latest 10)`
      : `${examLine} · Sim trades ${sim.tradeCount} · Process ${rate}% (latest 10)`;
  }
  ctx.fillStyle = '#A8B0BA';
  ctx.font = '400 17px system-ui, sans-serif';
  ctx.fillText(evidenceLine.slice(0, 90), 80, 440);

  ctx.fillStyle = '#FF6B2C';
  ctx.font = '500 18px system-ui, sans-serif';
  ctx.fillText(
    lang === 'en'
      ? 'Certifies process competence. Markets decide outcomes.'
      : 'Process competence certify. Outcomes markets decide.',
    80, 520
  );

  ctx.fillStyle = '#8A939E';
  ctx.font = '400 14px system-ui, sans-serif';
  ctx.fillText(
    lang === 'en'
      ? 'Self-assessed local certificate — not a professional credential. No tips or signals.'
      : 'Self-assessed local certificate — professional credential nahi. Tips/signals nahi.',
    80, 580
  );

  const a = document.createElement('a');
  a.download = `masterycap-cert-${String(trackName).replace(/\s+/g, '-').toLowerCase()}.png`;
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
      en: 'In retail binary, your counterparty is typically…',
      ur: 'Retail binary mein aapka counterparty aksar…',
    },
    opts: {
      en: ['Another retail trader matching your bet', 'The platform / market maker', 'A regulated exchange clearinghouse', 'Your bank'],
      ur: ['Koi aur retail trader', 'Platform / market maker', 'Regulated clearinghouse', 'Bank'],
    },
    correct: 1,
    explain: {
      en: 'You bet against the house structure — incentives matter.',
      ur: 'Aap house structure ke khilaf bet — incentives matter.',
    },
  },
  {
    q: {
      en: 'Martingale (double after loss) on binary…',
      ur: 'Binary pe martingale (loss ke baad double)…',
    },
    opts: {
      en: ['Guarantees recovery', 'Removes variance', 'Concentrates ruin risk into one streak', 'Is required by brokers'],
      ur: ['Recovery guarantee', 'Variance khatam', 'Ek streak mein ruin risk jama', 'Broker require'],
    },
    correct: 2,
    explain: {
      en: 'It works until one long losing streak empties the account.',
      ur: 'Chalta hai jab tak lambi losing streak account khali na kar de.',
    },
  },
];
