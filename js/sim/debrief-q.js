/* ============================================================
   sim/debrief-q.js — one interrogation after each closed sim trade.
   Process literacy, not P/L coaching.
   ============================================================ */

/** Pick one question from trade process + exit reason. */
export function pickTradeProbe(trade, lang = 'en') {
  const L = lang === 'ur' ? 'ur' : 'en';
  const fails = trade?.process?.fails || [];
  const bank = [];

  if (fails.includes('over_risk')) {
    bank.push({
      id: 'over_risk',
      q: {
        en: 'You sized above the scenario risk cap. Next time you will:',
        ur: 'Risk cap se upar size kiya. Agli baar:',
      },
      opts: {
        en: ['Respect the stated max risk %', 'Ignore caps when confident', 'Double size to recover'],
        ur: ['Max risk % respect', 'Confidence pe ignore', 'Recover ke liye double'],
      },
      correct: 0,
    });
  }
  if (fails.includes('widened_stop')) {
    bank.push({
      id: 'widened_stop',
      q: {
        en: 'Widening a stop after entry usually means:',
        ur: 'Entry ke baad stop wide karna:',
      },
      opts: {
        en: ['You increased planned risk (process fail)', 'Always smart flexibility', 'No effect on risk'],
        ur: ['Planned risk barha (process fail)', 'Hamesha smart', 'Risk pe asar nahi'],
      },
      correct: 0,
    });
  }
  if (fails.includes('liquidated') || trade?.reason === 'liquidated') {
    bank.push({
      id: 'liquidated',
      q: {
        en: 'Liquidation on paper means your stop was:',
        ur: 'Paper pe liquidation matlab stop:',
      },
      opts: {
        en: ['Beyond the wipe line or size was too large', 'Proof the idea was right', 'Required for learning'],
        ur: ['Wipe line ke paar ya size bari', 'Idea sahi ka proof', 'Learning ke liye zaroori'],
      },
      correct: 0,
    });
  }
  if (fails.includes('stop_beyond_liq')) {
    bank.push({
      id: 'stop_beyond_liq',
      q: {
        en: 'A stop outside the liquidation line is:',
        ur: 'Liq line ke bahar stop:',
      },
      opts: {
        en: ['Invalid — stop must sit inside wipe', 'Fine if P/L is green', 'Only for shorts'],
        ur: ['Invalid — stop wipe ke andar', 'Green P/L pe theek', 'Sirf shorts'],
      },
      correct: 0,
    });
  }
  if (fails.includes('direction')) {
    bank.push({
      id: 'direction',
      q: {
        en: 'This scenario restricted direction. Breaking it is:',
        ur: 'Scenario direction restrict. Todna:',
      },
      opts: {
        en: ['A process violation regardless of P/L', 'OK if you made money', 'Required creativity'],
        ur: ['Process violation — P/L se farq nahi', 'Profit pe OK', 'Creativity'],
      },
      correct: 0,
    });
  }

  // Default process interrogation (pass or unmatched fail)
  bank.push({
    id: 'process_first',
    q: {
      en: 'What decides process pass here?',
      ur: 'Yahan process pass kya decide karta?',
    },
    opts: {
      en: ['Checklist / risk / stop rules — not dollar P/L', 'Only green P/L', 'How confident you felt'],
      ur: ['Checklist / risk / stop — dollar P/L nahi', 'Sirf green P/L', 'Confidence'],
    },
    correct: 0,
  });
  bank.push({
    id: 'next_fix',
    q: {
      en: 'One sentence: what will you change on the next attempt?',
      ur: 'Ek jumla: agli attempt pe kya badloge?',
    },
    opts: {
      en: ['Name one concrete process fix (size, stop, skip)', 'Chase the same loss harder', 'Turn off the stop'],
      ur: ['Ek concrete process fix (size/stop/skip)', 'Loss ko harder chase', 'Stop band'],
    },
    correct: 0,
  });

  // Prefer fail-specific first; else rotate by trade id
  const prefer = bank.find((b) => b.id !== 'process_first' && b.id !== 'next_fix') || bank[0];
  const alt = bank[(Math.abs(Number(trade?.id) || 0) % bank.length)];
  const pick = fails.length ? prefer : alt;
  return {
    id: pick.id,
    q: pick.q[L] || pick.q.en,
    opts: pick.opts[L] || pick.opts.en,
    correct: pick.correct,
  };
}
