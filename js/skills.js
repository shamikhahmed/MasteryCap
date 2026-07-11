/* ============================================================
   skills.js — shared skill IDs + challenge tests (transfer credit).
   ============================================================ */

import { store, KEYS } from './store.js';

/** Skill catalog — overlapping literacy across courses. */
export const SKILLS = {
  risk_sizing: {
    name: { en: 'Risk & position sizing', ur: 'Risk aur position sizing' },
    courses: ['foundations', 'crypto', 'stocks', 'options', 'futures', 'forex'],
  },
  stop_discipline: {
    name: { en: 'Stop placement discipline', ur: 'Stop placement discipline' },
    courses: ['foundations', 'crypto', 'futures', 'forex'],
  },
  chart_structure: {
    name: { en: 'Chart structure (S/R)', ur: 'Chart structure (S/R)' },
    courses: ['foundations', 'crypto', 'stocks'],
  },
  options_basics: {
    name: { en: 'Calls, puts, premium', ur: 'Calls, puts, premium' },
    courses: ['stocks', 'options', 'greeks'],
  },
  greeks_delta: {
    name: { en: 'Delta awareness', ur: 'Delta awareness' },
    courses: ['options', 'greeks'],
  },
  expectancy: {
    name: { en: 'Expectancy & process', ur: 'Expectancy aur process' },
    courses: ['foundations', 'crypto', 'bots'],
  },
  binary_math: {
    name: { en: 'Binary breakeven math', ur: 'Binary breakeven math' },
    courses: ['binary', 'foundations'],
  },
};

/** Minimal challenge banks (3Q). Expand later. */
export const CHALLENGE = {
  risk_sizing: [
    {
      q: { en: 'Fixed fractional risk means:', ur: 'Fixed fractional risk:' },
      opts: {
        en: ['Risk a set % of equity per idea', 'Always use max leverage', 'Risk grows with confidence'],
        ur: ['Har idea pe equity ka set %', 'Hamesha max leverage', 'Confidence se risk barhao'],
      },
      correct: 0,
    },
    {
      q: { en: 'Position size falls out of:', ur: 'Position size kis se nikalti:' },
      opts: {
        en: ['Risk $ ÷ stop distance', 'How much you want to make', 'Tip channel size'],
        ur: ['Risk $ ÷ stop distance', 'Kitna kamana hai', 'Tip channel size'],
      },
      correct: 0,
    },
    {
      q: { en: 'Widening a stop after entry usually:', ur: 'Entry ke baad stop wide karna:' },
      opts: {
        en: ['Increases planned risk (violation)', 'Is always smart', 'Has no effect'],
        ur: ['Planned risk barhata (violation)', 'Hamesha smart', 'Koi asar nahi'],
      },
      correct: 0,
    },
  ],
  stop_discipline: [
    {
      q: { en: 'A valid long stop sits:', ur: 'Valid long stop:' },
      opts: {
        en: ['Below invalidation', 'Above entry', 'At take-profit'],
        ur: ['Invalidation ke neeche', 'Entry ke upar', 'Take-profit pe'],
      },
      correct: 0,
    },
    {
      q: { en: 'No-stop entry is:', ur: 'No-stop entry:' },
      opts: {
        en: ['Rejected by design here', 'Fine for pros', 'Required for scalps'],
        ur: ['Yahan design se reject', 'Pros ke liye theek', 'Scalps ke liye zaroori'],
      },
      correct: 0,
    },
    {
      q: { en: 'Stop hit means:', ur: 'Stop hit matlab:' },
      opts: {
        en: ['System working — not personal failure', 'You failed forever', 'Disable stops next time'],
        ur: ['System kaam kar raha — personal fail nahi', 'Hamesha fail', 'Agli baar stops band'],
      },
      correct: 0,
    },
  ],
  chart_structure: [
    {
      q: { en: 'Support is a zone where:', ur: 'Support zone jahan:' },
      opts: {
        en: ['Buying interest may appear', 'Price can never go', 'Guaranteed bounce'],
        ur: ['Buying interest aa sakti', 'Price kabhi na jaye', 'Guaranteed bounce'],
      },
      correct: 0,
    },
    {
      q: { en: 'Higher highs + higher lows imply:', ur: 'HH + HL imply:' },
      opts: {
        en: ['Uptrend structure', 'Guaranteed continuation', 'Range only'],
        ur: ['Uptrend structure', 'Guaranteed continuation', 'Sirf range'],
      },
      correct: 0,
    },
    {
      q: { en: 'Break of structure often means:', ur: 'Break of structure aksar:' },
      opts: {
        en: ['Prior trend thesis is in doubt', 'Always buy', 'Ignore volume'],
        ur: ['Purani trend thesis doubt mein', 'Hamesha buy', 'Volume ignore'],
      },
      correct: 0,
    },
  ],
  options_basics: [
    {
      q: { en: 'A call buyer has:', ur: 'Call buyer ke paas:' },
      opts: {
        en: ['Right to buy, not obligation', 'Obligation to buy', 'Unlimited risk as buyer'],
        ur: ['Buy ka haq, obligation nahi', 'Buy ki majboori', 'Buyer pe unlimited risk'],
      },
      correct: 0,
    },
    {
      q: { en: 'For bought options, max loss is:', ur: 'Bought options pe max loss:' },
      opts: {
        en: ['Premium paid (+ fees)', 'Undefined', 'Strike price'],
        ur: ['Premium (+ fees)', 'Undefined', 'Strike price'],
      },
      correct: 0,
    },
    {
      q: { en: 'Most far-OTM short-dated calls:', ur: 'Door-OTM short-dated calls:' },
      opts: {
        en: ['Expire worthless often', 'Are free money', 'Have no theta'],
        ur: ['Aksar worthless expire', 'Free money', 'Theta nahi'],
      },
      correct: 0,
    },
  ],
  greeks_delta: [
    {
      q: { en: 'Delta ~0.40 call roughly moves:', ur: 'Delta 0.40 call approx:' },
      opts: {
        en: ['$0.40 per $1 stock move (per share)', '$40 guaranteed', 'Nothing'],
        ur: ['Stock $1 pe ~$0.40/share', '$40 guaranteed', 'Kuch nahi'],
      },
      correct: 0,
    },
    {
      q: { en: 'Long options theta is typically:', ur: 'Long options theta aksar:' },
      opts: {
        en: ['Negative (you pay rent)', 'Positive', 'Zero'],
        ur: ['Negative (kiraya)', 'Positive', 'Zero'],
      },
      correct: 0,
    },
    {
      q: { en: 'IV crush hurts:', ur: 'IV crush nuksan:' },
      opts: {
        en: ['Long options after events', 'Short options only', 'Spot shares only'],
        ur: ['Event ke baad long options', 'Sirf short options', 'Sirf spot'],
      },
      correct: 0,
    },
  ],
  expectancy: [
    {
      q: { en: 'Process grade should ignore:', ur: 'Process grade ignore kare:' },
      opts: {
        en: ['Single-trade P/L luck', 'Stop placement', 'Risk size'],
        ur: ['Single-trade P/L luck', 'Stop placement', 'Risk size'],
      },
      correct: 0,
    },
    {
      q: { en: 'Positive expectancy needs:', ur: 'Positive expectancy ko:' },
      opts: {
        en: ['Edge + risk control over many trades', 'One big win', 'Tips'],
        ur: ['Edge + risk control bahut trades', 'Ek bari jeet', 'Tips'],
      },
      correct: 0,
    },
    {
      q: { en: 'Revenge trading usually:', ur: 'Revenge trading aksar:' },
      opts: {
        en: ['Destroys expectancy', 'Fixes losses fast', 'Is required'],
        ur: ['Expectancy kharab', 'Jaldi fix', 'Zaroori'],
      },
      correct: 0,
    },
  ],
  binary_math: [
    {
      q: { en: 'Breakeven win rate at 80% payout ≈', ur: '80% payout pe breakeven ≈' },
      opts: { en: ['55.6%', '50%', '80%'], ur: ['55.6%', '50%', '80%'] },
      correct: 0,
    },
    {
      q: { en: 'Binary platforms often are:', ur: 'Binary platforms aksar:' },
      opts: {
        en: ['Counterparty to your loss', 'Your fiduciary advisor', 'Risk-free'],
        ur: ['Aapke loss ki counterparty', 'Fiduciary advisor', 'Risk-free'],
      },
      correct: 0,
    },
    {
      q: { en: 'Earn size taught here for binary:', ur: 'Yahan binary earn size:' },
      opts: { en: ['$0 — avoid', '$100/day', 'Unlimited'], ur: ['$0 — avoid', '$100/day', 'Unlimited'] },
      correct: 0,
    },
  ],
};

/** Map course week → skill (for challenge offer). */
export const WEEK_SKILLS = {
  'foundations:1': ['expectancy', 'risk_sizing'],
  'foundations:2': ['stop_discipline'],
  'crypto:3': ['risk_sizing', 'stop_discipline'],
  'crypto:1': ['chart_structure'],
  'stocks:1': ['chart_structure'],
  'options:1': ['options_basics'],
  'greeks:1': ['greeks_delta'],
  'binary:1': ['binary_math'],
};

export function getSkillState() {
  return store.get(KEYS.skills, { mastered: {}, challenged: {} });
}

export function isSkillMastered(skillId) {
  return !!getSkillState().mastered?.[skillId];
}

export function markSkillMastered(skillId, fromCourse) {
  const st = getSkillState();
  st.mastered[skillId] = { at: new Date().toISOString(), fromCourse: fromCourse || null };
  store.set(KEYS.skills, st);
}

export function scoreChallenge(skillId, answers) {
  const bank = CHALLENGE[skillId] || [];
  let correct = 0;
  bank.forEach((q, i) => { if (answers[i] === q.correct) correct++; });
  const pct = bank.length ? correct / bank.length : 0;
  return { correct, total: bank.length, pct, passed: pct >= 0.7 };
}

export function skillsForWeek(courseId, weekId) {
  return WEEK_SKILLS[`${courseId}:${weekId}`] || [];
}

/** Offer challenge if any skill already mastered from another course. */
export function challengeOffer(courseId, weekId) {
  const ids = skillsForWeek(courseId, weekId);
  return ids.filter((id) => {
    const m = getSkillState().mastered?.[id];
    return m && m.fromCourse && m.fromCourse !== courseId;
  });
}
