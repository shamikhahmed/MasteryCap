/* ============================================================
   mistakes.js — P11 mistake bank (feeds review)
   ============================================================ */

import { store, KEYS } from './store.js';

/** Process-fail cards for sim:* mistake keys → daily review MCQs. */
const SIM_FAIL_CARDS = {
  over_risk: {
    q: { en: 'You sized above the scenario risk cap. Next time you will:', ur: 'Risk cap se upar size kiya. Agli baar:' },
    opts: {
      en: ['Respect the stated max risk %', 'Ignore caps when confident', 'Double size to recover'],
      ur: ['Max risk % respect karo', 'Confidence pe ignore', 'Recover ke liye double'],
    },
    correct: 0,
    explain: {
      en: 'Process pass requires staying inside the stated risk cap.',
      ur: 'Process pass = stated risk cap ke andar rehna.',
    },
  },
  widened_stop: {
    q: { en: 'Widening a stop after entry usually means:', ur: 'Entry ke baad stop wide karna:' },
    opts: {
      en: ['You increased planned risk (process fail)', 'Always smart flexibility', 'No effect on risk'],
      ur: ['Planned risk barha (process fail)', 'Hamesha smart', 'Risk pe asar nahi'],
    },
    correct: 0,
    explain: {
      en: 'Moving the stop against you changes the risk plan after the fact.',
      ur: 'Stop move karna risk plan badal deta — baad mein.',
    },
  },
  liquidated: {
    q: { en: 'Liquidation on paper means your stop was:', ur: 'Paper pe liquidation matlab stop:' },
    opts: {
      en: ['Beyond the wipe line or size was too large', 'Proof the idea was right', 'Required for learning'],
      ur: ['Wipe line ke paar ya size bari', 'Idea sahi ka proof', 'Learning ke liye zaroori'],
    },
    correct: 0,
    explain: {
      en: 'Liquidation is a process failure on size/stop placement — not a badge.',
      ur: 'Liquidation = size/stop process fail — badge nahi.',
    },
  },
  stop_beyond_liq: {
    q: { en: 'A stop outside the liquidation line is:', ur: 'Liq line ke bahar stop:' },
    opts: {
      en: ['Invalid — stop must sit inside wipe', 'Fine if P/L is green', 'Only for shorts'],
      ur: ['Invalid — stop wipe ke andar', 'Green P/L pe theek', 'Sirf shorts'],
    },
    correct: 0,
    explain: {
      en: 'Stops past liquidation never protect the planned risk.',
      ur: 'Liq ke baad stop planned risk protect nahi karta.',
    },
  },
  direction: {
    q: { en: 'This scenario restricted direction. Breaking it is:', ur: 'Scenario direction restrict. Todna:' },
    opts: {
      en: ['A process violation regardless of P/L', 'OK if you made money', 'Required creativity'],
      ur: ['Process violation — P/L se farq nahi', 'Profit pe OK', 'Creativity'],
    },
    correct: 0,
    explain: {
      en: 'Scenario rules are the checklist. P/L does not rewrite them.',
      ur: 'Scenario rules = checklist. P/L unhe rewrite nahi karta.',
    },
  },
  process: {
    q: { en: 'What decides process pass here?', ur: 'Yahan process pass kya decide karta?' },
    opts: {
      en: ['Checklist / risk / stop rules — not dollar P/L', 'Only green P/L', 'How confident you felt'],
      ur: ['Checklist / risk / stop — dollar P/L nahi', 'Sirf green P/L', 'Confidence'],
    },
    correct: 0,
    explain: {
      en: 'Paper process competence is checklist-first, not green candles.',
      ur: 'Paper process = checklist pehle — green candles nahi.',
    },
  },
};

export function recordMistake(qKey, meta = {}) {
  const bank = store.get(KEYS.mistakeBank, {}) || {};
  bank[qKey] = { ...(bank[qKey] || {}), ...meta, box: 1, due: new Date().toISOString().slice(0, 10), wrong: (bank[qKey]?.wrong || 0) + 1 };
  store.set(KEYS.mistakeBank, bank);
  /* also seed review box 1 */
  const review = store.get(KEYS.review, {}) || {};
  review[qKey] = { box: 1, due: new Date().toISOString().slice(0, 10) };
  store.set(KEYS.review, review);
}

export function mistakeCountDue() {
  const bank = store.get(KEYS.mistakeBank, {}) || {};
  const today = new Date().toISOString().slice(0, 10);
  return Object.values(bank).filter((x) => !x.due || x.due <= today).length;
}

export function clearMistake(qKey) {
  const bank = store.get(KEYS.mistakeBank, {}) || {};
  delete bank[qKey];
  store.set(KEYS.mistakeBank, bank);
}

/** Due sim process fails as review-shaped items (feeds pickDailyReview). */
export function pickDueSimMistakes(n = 2) {
  const bank = store.get(KEYS.mistakeBank, {}) || {};
  const today = new Date().toISOString().slice(0, 10);
  const out = [];
  Object.entries(bank).forEach(([qKey, meta]) => {
    if (!String(qKey).startsWith('sim:')) return;
    if (meta.due && meta.due > today) return;
    const fail = String(qKey).split(':')[2] || 'process';
    const card = SIM_FAIL_CARDS[fail] || SIM_FAIL_CARDS.process;
    out.push({
      qKey,
      trackId: meta.track || 'sim',
      weekId: 0,
      qi: 0,
      kind: 'sim',
      q: {
        q: card.q,
        opts: card.opts,
        correct: card.correct,
        explain: card.explain,
      },
    });
  });
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = out[i]; out[i] = out[j]; out[j] = t;
  }
  return out.slice(0, Math.min(n, out.length));
}
