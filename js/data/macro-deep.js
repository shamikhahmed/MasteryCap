/* Macro literacy — condensed 6-part bar (v48).
   Backdrop for risk appetite — not crystal ball / tip service. */

function partsHtml(p, lang) {
  const L = lang === 'ur' ? 'ur' : 'en';
  const obj = p.objective?.[L] || p.objective?.en || '';
  const teach = p.teach?.[L] || p.teach?.en || '';
  const ex = p.workedExample?.[L] || p.workedExample?.en || '';
  const miss = p.commonMistake?.[L] || p.commonMistake?.en || '';
  const ready = p.exitTicket?.[L] || p.exitTicket?.en || '';
  const note = p.notebookPrompt?.[L] || p.notebookPrompt?.en || '';
  return `
<div class="lesson-part"><div class="kicker">Objective</div><p>${obj}</p></div>
<div class="lesson-part"><div class="kicker">Teach</div>${teach}</div>
<div class="lesson-part"><div class="kicker">Worked example</div>${ex}</div>
<div class="lesson-part warn-part"><div class="kicker">Common mistake</div>${miss}</div>
${ready ? `<div class="lesson-part"><div class="kicker">Ready when</div><p>${ready}</p></div>` : ''}
${note ? `<div class="lesson-part note-part"><div class="kicker">Notebook</div><p>${note}</p></div>` : ''}`;
}

function week(def) {
  return {
    ...def,
    get body() {
      return { en: partsHtml(this, 'en'), ur: partsHtml(this, 'ur') };
    },
  };
}

export const MACRO_DEEP_WEEKS = [
  week({
    id: 1,
    title: { en: 'What Macro Is (and Is Not)', ur: 'Macro Kya Hai (aur Nahi)' },
    objective: {
      en: 'Use macro as weather for size/horizon — not as a scalp tip feed.',
      ur: 'Macro = weather for size — scalp tip nahi.',
    },
    teach: {
      en: `<p><strong>Macro</strong> = growth, inflation, rates, FX, liquidity. It answers weather — not tomorrow’s candle. Useful when it changes your risk budget; cosplay when it replaces asset homework or a written plan.</p>
<p>{{redflag:Exact tops/bottoms from one CPI thread = entertainment.}}</p>`,
      ur: `<p>Macro = backdrop. Risk-on/off sizing. CPI crystal ball = entertainment.</p>
<p>{{redflag:CPI = exact top — fantasy.}}</p>`,
    },
    workedExample: {
      en: `<p>Dollar liquidity tight → cut max gross risk 4%→2%, then do company/levels work. Not “all-in short from speech.”</p>`,
      ur: `<p>Liquidity tight → size cut → phir homework. Speech pe all-in nahi.</p>`,
    },
    commonMistake: {
      en: `<p>Treating every central-bank day as a video-game scalp.</p>`,
      ur: `<p>Har CB day = scalp game.</p>`,
    },
    exitTicket: { en: 'You can say one honest use of macro for your book.', ur: 'Ek honest macro use.' },
    notebookPrompt: { en: 'Write this month: risk-on or risk-off + why (2 lines).', ur: 'Risk-on/off + kyun (2 lines).' },
    flashcardSeeds: [
      { front: { en: 'Macro answers', ur: 'Macro' }, back: { en: 'Weather / context — not next candle.', ur: 'Weather — candle nahi.' } },
      { front: { en: 'Honest retail use', ur: 'Use' }, back: { en: 'Risk-on/off sizing and horizon.', ur: 'Sizing + horizon.' } },
      { front: { en: 'CPI top/bottom threads', ur: 'CPI threads' }, back: { en: 'Entertainment, not edge.', ur: 'Entertainment.' } },
      { front: { en: 'Macro replacing homework', ur: 'Replace' }, back: { en: 'Cosplay.', ur: 'Cosplay.' } },
      { front: { en: 'Macro signals = salary', ur: 'Salary' }, back: { en: 'Walk away.', ur: 'Chalo.' } },
    ],
    quiz: [
      { q: { en: 'Macro literacy mainly helps you:', ur: 'Macro:' },
        opts: { en: ['Set context and risk appetite', 'Guarantee weekly wins', 'Replace all analysis'], ur: ['Context + risk', 'Weekly wins', 'Replace all'] },
        correct: 0, explain: { en: 'Backdrop informs size.', ur: 'Size.' } },
      { q: { en: 'Scalping every CB meeting is:', ur: 'CB scalp:' },
        opts: { en: ['Usually a losing retail hobby', 'Risk-free career', 'Required'], ur: ['Losing hobby', 'Career', 'Required'] },
        correct: 0, explain: { en: 'Noise + costs.', ur: 'Noise.' } },
      { q: { en: 'Best beginner use:', ur: 'Beginner:' },
        opts: { en: ['Risk-on/off sizing and horizon', 'All-in on one CPI', 'Ignore cash buffer'], ur: ['Sizing/horizon', 'CPI all-in', 'Ignore cash'] },
        correct: 0, explain: { en: 'Size over prediction.', ur: 'Size.' } },
      { q: { en: 'This track promises:', ur: 'Promise:' },
        opts: { en: ['Frameworks — not income or mastery cert', 'Salary signals', 'Crystal ball'], ur: ['Frameworks', 'Salary', 'Crystal'] },
        correct: 0, explain: { en: 'Honesty.', ur: 'Honesty.' } },
    ],
  }),
  week({
    id: 2,
    title: { en: 'Inflation & Real Returns', ur: 'Inflation aur Real Returns' },
    objective: {
      en: 'Measure surplus in purchasing power; keep emergency cash first.',
      ur: 'Purchasing power; pehle emergency cash.',
    },
    teach: {
      en: `<p><strong>Real return ≈ nominal − inflation.</strong> High inflation makes pure cash a slow haircut. Mattress cash still has a job: emergencies. Surplus beyond buffer → productive assets for long horizon — after Foundations layering.</p>
<p>Inflation prints = backdrop, not same-day lottery with 20×.</p>`,
      ur: `<p>Real return = nominal − inflation. Cash buffer pehle. Surplus compound. CPI ≠ 20× lottery.</p>`,
    },
    workedExample: {
      en: `<p>Deposit 12%, inflation ~20% → negative real. Feel rich in digits, poorer in life.</p>`,
      ur: `<p>12% deposit, 20% inflation → negative real.</p>`,
    },
    commonMistake: {
      en: `<p>Rebuilding life plan off every inflation headline.</p>`,
      ur: `<p>Har inflation headline pe life plan.</p>`,
    },
    exitTicket: { en: 'You can define real return in one line.', ur: 'Real return ek line.' },
    notebookPrompt: { en: 'Note your cash buffer months + surplus rule.', ur: 'Buffer months + surplus rule.' },
    flashcardSeeds: [
      { front: { en: 'Real return', ur: 'Real' }, back: { en: 'Nominal minus inflation.', ur: 'Nominal − inflation.' } },
      { front: { en: 'Emergency cash job', ur: 'Cash' }, back: { en: 'Survive shocks — not whole wealth plan.', ur: 'Survive — whole plan nahi.' } },
      { front: { en: 'CPI + 20× leverage', ur: 'CPI lev' }, back: { en: 'Gambling in macro costume.', ur: 'Gambling.' } },
      { front: { en: 'Digits vs purchasing power', ur: 'Digits' }, back: { en: 'Balance ≠ life richer if prices sprint.', ur: 'Balance ≠ richer.' } },
      { front: { en: 'Surplus invests after', ur: 'Surplus' }, back: { en: 'Emergency buffer exists.', ur: 'Buffer pehle.' } },
    ],
    quiz: [
      { q: { en: 'Real return roughly equals:', ur: 'Real:' },
        opts: { en: ['Nominal minus inflation', 'Only dividend yield', 'Leverage × inflation'], ur: ['Nominal − inflation', 'Dividend', 'Lev × inflation'] },
        correct: 0, explain: { en: 'Purchasing power.', ur: 'Purchasing power.' } },
      { q: { en: 'High inflation makes long-term pure cash:', ur: 'Cash:' },
        opts: { en: ['Likely lose purchasing power', 'Always best', 'Immune'], ur: ['Lose power', 'Best', 'Immune'] },
        correct: 0, explain: { en: 'Silent tax.', ur: 'Silent tax.' } },
      { q: { en: 'Before investing surplus keep:', ur: 'Before:' },
        opts: { en: ['Emergency cash buffer', 'Max leverage', 'Zero records'], ur: ['Buffer', 'Max lev', 'Zero records'] },
        correct: 0, explain: { en: 'Survive first.', ur: 'Survive.' } },
      { q: { en: 'Inflation print as same-day 20× trade is:', ur: '20×:' },
        opts: { en: ['Gambling', 'Required literacy', 'Risk-free'], ur: ['Gambling', 'Required', 'Risk-free'] },
        correct: 0, explain: { en: 'Backdrop ≠ lottery.', ur: 'Backdrop.' } },
    ],
  }),
  week({
    id: 3,
    title: { en: 'Rates, FX & Liquidity', ur: 'Rates, FX, Liquidity' },
    objective: {
      en: 'Treat rates/FX/liquidity as dials — not 1:1 cheat codes.',
      ur: 'Rates/FX/liquidity = dials — cheat code nahi.',
    },
    teach: {
      en: `<p>Rising rates → higher discount rates → pressure on long-duration risk assets; dry powder hurts less. Path of rates over quarters > one-meeting GIF.</p>
<p>Local FX rewrites real economy (import costs, earnings mix). Strong USD often = tighter global conditions. Liquidity is the oxygen — when it thins, risk assets gasp.</p>`,
      ur: `<p>Rates = discount dial. FX = real economy. Liquidity = oxygen. 1:1 Fed candle = no.</p>`,
    },
    workedExample: {
      en: `<p>Rate hike + local rally possible if flows dominate — so don’t force a short from one headline.</p>`,
      ur: `<p>Hike + local rally mumkin — headline short force mat.</p>`,
    },
    commonMistake: {
      en: `<p>20× on one rate decision “because macro.”</p>`,
      ur: `<p>Ek rate pe 20× — “macro.”</p>`,
    },
    exitTicket: { en: 'You can name one rate dial + one FX channel for PK learner.', ur: 'Ek rate + ek FX channel.' },
    notebookPrompt: { en: 'This quarter: rate bias + USD bias in one line each.', ur: 'Rate bias + USD bias.' },
    flashcardSeeds: [
      { front: { en: 'Rising rates often pressure', ur: 'Rates up' }, back: { en: 'Long-duration risk assets.', ur: 'Long-duration risk.' } },
      { front: { en: 'Rates as', ur: 'Rates' }, back: { en: 'Headwind/tailwind dial — not cheat code.', ur: 'Dial — cheat nahi.' } },
      { front: { en: 'Weaker PKR often means', ur: 'PKR' }, back: { en: 'Higher import costs / inflation pressure.', ur: 'Import cost / inflation.' } },
      { front: { en: 'Liquidity thinning', ur: 'Liquidity' }, back: { en: 'Risk assets struggle for oxygen.', ur: 'Oxygen kam.' } },
      { front: { en: 'One meeting = one candle', ur: '1:1' }, back: { en: 'Rarely true.', ur: 'Shazz.' } },
    ],
    quiz: [
      { q: { en: 'Rising policy rates often pressure:', ur: 'Rates:' },
        opts: { en: ['Long-duration risk assets', 'Only mattress cash forever+', 'Nothing'], ur: ['Long-duration risk', 'Cash forever+', 'Nothing'] },
        correct: 0, explain: { en: 'Discount rate up.', ur: 'Discount up.' } },
      { q: { en: 'Treat rates as:', ur: 'Treat:' },
        opts: { en: ['Headwind/tailwind dial', 'Video-game cheat', 'Ignore always'], ur: ['Dial', 'Cheat', 'Ignore'] },
        correct: 0, explain: { en: 'Dial not cheat.', ur: 'Dial.' } },
      { q: { en: '20× on one rate decision is:', ur: '20×:' },
        opts: { en: ['Gambling dressed as macro', 'Professional requirement', 'Risk-free'], ur: ['Gambling', 'Required', 'Risk-free'] },
        correct: 0, explain: { en: 'Size for being wrong.', ur: 'Wrong pe size.' } },
      { q: { en: 'Strong USD often coincides with:', ur: 'USD:' },
        opts: { en: ['Tighter global financial conditions', 'Always PSX melt-up', 'Zero FX effect'], ur: ['Tighter conditions', 'PSX melt-up', 'Zero FX'] },
        correct: 0, explain: { en: 'Channel, not guarantee.', ur: 'Channel.' } },
    ],
  }),
  week({
    id: 4,
    title: { en: 'Macro Process Loop', ur: 'Macro Process Loop' },
    objective: {
      en: 'Close with monthly note → size dial → asset homework — no tip cosplay.',
      ur: 'Monthly note → size dial → homework.',
    },
    teach: {
      en: `<p>Loop: monthly backdrop note (inflation/rates/FX/liquidity) → adjust max risk % → do asset work (statements or levels) → journal. Macro never replaces the plan.</p>
<p>Certificate = study record. Not salary. Not crystal ball license.</p>`,
      ur: `<p>Monthly note → risk% → asset work → journal. Cert = study record.</p>`,
    },
    workedExample: {
      en: `<p>Card: “Risk-off month · max 1.5% · no CB scalp · filings/levels next.”</p>`,
      ur: `<p>Risk-off · max 1.5% · no CB scalp · homework.</p>`,
    },
    commonMistake: {
      en: `<p>Skipping asset homework because “macro is enough.”</p>`,
      ur: `<p>Homework skip — “macro kaafi.”</p>`,
    },
    exitTicket: { en: 'You can recite your macro practice loop.', ur: 'Macro loop yad.' },
    notebookPrompt: { en: 'Six-bullet macro loop on Study desk.', ur: '6-bullet macro loop.' },
    flashcardSeeds: [
      { front: { en: 'Macro loop', ur: 'Loop' }, back: { en: 'Note → size dial → homework → journal.', ur: 'Note → size → homework → journal.' } },
      { front: { en: 'Macro alone', ur: 'Alone' }, back: { en: 'Not a complete plan.', ur: 'Complete plan nahi.' } },
      { front: { en: 'Certificate', ur: 'Cert' }, back: { en: 'Study progress — not income.', ur: 'Study — income nahi.' } },
      { front: { en: 'CB scalp hobby', ur: 'CB' }, back: { en: 'Usually noise tax.', ur: 'Noise tax.' } },
      { front: { en: 'Monthly note asks', ur: 'Note' }, back: { en: 'What changed for my risk budget?', ur: 'Risk budget change?' } },
    ],
    quiz: [
      { q: { en: 'Macro process starts with:', ur: 'Start:' },
        opts: { en: ['Backdrop note then size dial', 'Max leverage tip', 'Ignore cash'], ur: ['Note → size', 'Max lev', 'Ignore cash'] },
        correct: 0, explain: { en: 'Context then size.', ur: 'Context.' } },
      { q: { en: 'Macro replacing filings/levels is:', ur: 'Replace:' },
        opts: { en: ['Incomplete / cosplay', 'Best practice', 'Required'], ur: ['Cosplay', 'Best', 'Required'] },
        correct: 0, explain: { en: 'Homework still needed.', ur: 'Homework.' } },
      { q: { en: 'This certificate means:', ur: 'Cert:' },
        opts: { en: ['Study progress — not a crystal ball', 'SECP license', 'Income right'], ur: ['Study', 'SECP', 'Income'] },
        correct: 0, explain: { en: 'Honesty.', ur: 'Honesty.' } },
      { q: { en: 'After this track you should:', ur: 'After:' },
        opts: { en: ['Log backdrop + adjust size calmly', 'All-in every print', 'Quit records'], ur: ['Log + size', 'All-in', 'Quit records'] },
        correct: 0, explain: { en: 'Process competence.', ur: 'Process.' } },
    ],
  }),
];

export const MACRO_DEEP_PLACEMENT = [
  { topic: 1, q: { en: 'Macro mainly sets:', ur: 'Macro:' }, opts: { en: ['Context/risk appetite', 'Guaranteed entries', 'Salary'], ur: ['Context', 'Entries', 'Salary'] }, correct: 0 },
  { topic: 1, q: { en: 'CPI exact top threads:', ur: 'CPI:' }, opts: { en: ['Entertainment', 'Edge', 'Law'], ur: ['Entertainment', 'Edge', 'Law'] }, correct: 0 },
  { topic: 2, q: { en: 'Real return:', ur: 'Real:' }, opts: { en: ['Nominal − inflation', 'Only leverage', 'Ignore prices'], ur: ['Nominal − inflation', 'Leverage', 'Ignore'] }, correct: 0 },
  { topic: 2, q: { en: 'Emergency cash:', ur: 'Cash:' }, opts: { en: ['Keep before surplus risk', 'Never', 'All-in assets'], ur: ['Keep first', 'Never', 'All-in'] }, correct: 0 },
  { topic: 3, q: { en: 'Rates are a:', ur: 'Rates:' }, opts: { en: ['Dial', 'Cheat code', 'Ignore'], ur: ['Dial', 'Cheat', 'Ignore'] }, correct: 0 },
  { topic: 3, q: { en: '20× on one meeting:', ur: '20×:' }, opts: { en: ['Gambling', 'Required', 'Safe'], ur: ['Gambling', 'Required', 'Safe'] }, correct: 0 },
  { topic: 4, q: { en: 'Macro loop:', ur: 'Loop:' }, opts: { en: ['Note → size → homework', 'Tip → all-in', 'Skip journal'], ur: ['Note→size→hw', 'Tip all-in', 'Skip'] }, correct: 0 },
  { topic: 4, q: { en: 'Certificate:', ur: 'Cert:' }, opts: { en: ['Study record', 'Crystal license', 'Income'], ur: ['Study', 'Crystal', 'Income'] }, correct: 0 },
];
