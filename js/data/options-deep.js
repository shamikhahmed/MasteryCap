/* Options literacy — condensed 6-part bar (v48).
   Defined-risk language. Not lottery tips. */

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

export const OPTIONS_DEEP_WEEKS = [
  week({
    id: 1,
    title: { en: 'Calls, Puts & Premium', ur: 'Calls, Puts, Premium' },
    objective: {
      en: 'Define call/put rights and premium as the price of that right.',
      ur: 'Call/put rights + premium = price of right.',
    },
    teach: {
      en: `<p>A <strong>call</strong> is the right to buy at strike before expiry; a <strong>put</strong> is the right to sell. Buyer pays <strong>premium</strong>; seller collects premium and takes obligation.</p>
<p>Rights ≠ guarantees. Premium can go to zero. Options are contracts with expiry — time is a cost for buyers.</p>
<p>{{redflag:“Options = free leverage lottery” ignores premium decay and ruin paths.}}</p>`,
      ur: `<p>Call = buy right. Put = sell right. Premium = qeemat. Expiry pe time cost. Lottery nahi.</p>
<p>{{redflag:Free leverage lottery = jhoot.}}</p>`,
    },
    workedExample: {
      en: `<p>Buy call for 2. Stock never reaches strike usefully → premium → 0. Max loss = premium paid.</p>`,
      ur: `<p>Call 2 buy → worthless → max loss = premium.</p>`,
    },
    commonMistake: {
      en: `<p>Sizing like stock shares and ignoring premium as full risk for long options.</p>`,
      ur: `<p>Stock size sochna — premium = full risk ignore.</p>`,
    },
    exitTicket: { en: 'You can state max loss for a long call/put.', ur: 'Long call/put max loss.' },
    notebookPrompt: { en: 'Write call vs put in one sentence each.', ur: 'Call vs put ek jumla.' },
    flashcardSeeds: [
      { front: { en: 'Call', ur: 'Call' }, back: { en: 'Right to buy at strike.', ur: 'Strike pe buy right.' } },
      { front: { en: 'Put', ur: 'Put' }, back: { en: 'Right to sell at strike.', ur: 'Strike pe sell right.' } },
      { front: { en: 'Long option max loss', ur: 'Long max' }, back: { en: 'Premium paid (defined).', ur: 'Premium paid.' } },
      { front: { en: 'Premium', ur: 'Premium' }, back: { en: 'Price of the right.', ur: 'Right ki qeemat.' } },
      { front: { en: 'Expiry', ur: 'Expiry' }, back: { en: 'Clock that can zero buyers.', ur: 'Buyer zero clock.' } },
    ],
    quiz: [
      { q: { en: 'A call gives the buyer:', ur: 'Call:' },
        opts: { en: ['Right to buy at strike', 'Obligation to buy always', 'Free shares'], ur: ['Buy right', 'Must buy', 'Free shares'] },
        correct: 0, explain: { en: 'Right, not obligation.', ur: 'Right.' } },
      { q: { en: 'Long put max loss is typically:', ur: 'Long put:' },
        opts: { en: ['Premium paid', 'Unlimited', 'Zero always'], ur: ['Premium', 'Unlimited', 'Zero'] },
        correct: 0, explain: { en: 'Defined for long options.', ur: 'Defined.' } },
      { q: { en: 'Premium is:', ur: 'Premium:' },
        opts: { en: ['Price of the contractual right', 'Guaranteed profit', 'Interest-free loan'], ur: ['Right price', 'Guaranteed', 'Loan'] },
        correct: 0, explain: { en: 'You pay for optionality.', ur: 'Pay for right.' } },
      { q: { en: 'Options as free lottery ignore:', ur: 'Lottery:' },
        opts: { en: ['Premium decay and defined/undefined risks', 'Nothing', 'Only logos'], ur: ['Decay + risk', 'Nothing', 'Logos'] },
        correct: 0, explain: { en: 'Honesty.', ur: 'Honesty.' } },
    ],
  }),
  week({
    id: 2,
    title: { en: 'Intrinsic, Extrinsic & Expiry', ur: 'Intrinsic, Extrinsic, Expiry' },
    objective: {
      en: 'Split premium into intrinsic vs time/vol value; respect expiry.',
      ur: 'Intrinsic vs time/vol; expiry respect.',
    },
    teach: {
      en: `<p><strong>Intrinsic</strong> = in-the-money amount. <strong>Extrinsic</strong> = time + implied vol premium. At expiry, extrinsic → 0; only intrinsic remains.</p>
<p>Buying options into events pays for IV; after events <strong>IV crush</strong> can hurt even if direction is right.</p>`,
      ur: `<p>Intrinsic = ITM. Extrinsic = time/IV. Expiry pe extrinsic 0. IV crush event baad.</p>`,
    },
    workedExample: {
      en: `<p>Stock 100, call 95 premium 7 → intrinsic 5, extrinsic 2. At expiry if stock 100, call worth 5 — extrinsic gone.</p>`,
      ur: `<p>Intrinsic 5 + extrinsic 2. Expiry pe extrinsic gayab.</p>`,
    },
    commonMistake: {
      en: `<p>Holding long premium through expiry week “for fun.”</p>`,
      ur: `<p>Expiry week pe long premium “mazay.”</p>`,
    },
    exitTicket: { en: 'You can split one premium into intrinsic/extrinsic.', ur: 'Premium split.' },
    notebookPrompt: { en: 'Pick a sample quote; estimate intrinsic vs rest.', ur: 'Sample quote split.' },
    flashcardSeeds: [
      { front: { en: 'Intrinsic', ur: 'Intrinsic' }, back: { en: 'ITM amount.', ur: 'ITM amount.' } },
      { front: { en: 'Extrinsic', ur: 'Extrinsic' }, back: { en: 'Time + IV value.', ur: 'Time + IV.' } },
      { front: { en: 'At expiry extrinsic', ur: 'Expiry' }, back: { en: 'Goes to zero.', ur: 'Zero.' } },
      { front: { en: 'IV crush', ur: 'IV crush' }, back: { en: 'IV drops after event — hurts long premium.', ur: 'Event baad IV drop.' } },
      { front: { en: 'Direction right + IV crush', ur: 'Right+crush' }, back: { en: 'Can still lose on long options.', ur: 'Phir bhi haar.' } },
    ],
    quiz: [
      { q: { en: 'At expiry, extrinsic value:', ur: 'Expiry:' },
        opts: { en: ['Goes to zero', 'Doubles', 'Becomes intrinsic always higher'], ur: ['Zero', 'Double', 'Always higher'] },
        correct: 0, explain: { en: 'Clock ends.', ur: 'Clock ends.' } },
      { q: { en: 'IV crush mainly hurts:', ur: 'Crush:' },
        opts: { en: ['Long premium after vol collapses', 'Cash savers', 'Bond ladders'], ur: ['Long premium', 'Savers', 'Bonds'] },
        correct: 0, explain: { en: 'Vol premium evaporates.', ur: 'Vol gone.' } },
      { q: { en: 'Intrinsic for a call is:', ur: 'Call intrinsic:' },
        opts: { en: ['Max(0, spot − strike)', 'Always premium', 'Funding rate'], ur: ['max(0,spot−strike)', 'Premium', 'Funding'] },
        correct: 0, explain: { en: 'ITM amount.', ur: 'ITM.' } },
      { q: { en: 'Holding long options into expiry for vibes is:', ur: 'Vibes:' },
        opts: { en: ['Often a decay donation', 'Risk-free', 'Required'], ur: ['Decay donation', 'Risk-free', 'Required'] },
        correct: 0, explain: { en: 'Time costs.', ur: 'Time cost.' } },
    ],
  }),
  week({
    id: 3,
    title: { en: 'Defined Risk vs Naked Short', ur: 'Defined Risk vs Naked Short' },
    objective: {
      en: 'Prefer defined-risk structures; treat naked short as advanced obligation.',
      ur: 'Defined-risk prefer; naked short = advanced obligation.',
    },
    teach: {
      en: `<p><strong>Long options / debit spreads:</strong> risk capped near debit. <strong>Naked short calls</strong> can have large/undefined upside risk. Credit collected ≠ “free money.”</p>
<p>If you cannot state max loss before entry, you are not ready to click.</p>`,
      ur: `<p>Long / debit spread = capped. Naked short call = bada upside risk. Max loss likho pehle.</p>`,
    },
    workedExample: {
      en: `<p>Long call debit 2 → max loss 2. Short naked call premium 2 → loss can vastly exceed 2 if stock rips.</p>`,
      ur: `<p>Long debit 2 = max 2. Naked short 2 ≠ max 2.</p>`,
    },
    commonMistake: {
      en: `<p>Selling naked premium because “theta is income.”</p>`,
      ur: `<p>Naked sell — “theta income.”</p>`,
    },
    exitTicket: { en: 'You can name one defined-risk vs one undefined structure.', ur: 'Defined vs undefined.' },
    notebookPrompt: { en: 'Write: I will not sell naked until ___ (or never).', ur: 'Naked sell rule.' },
    flashcardSeeds: [
      { front: { en: 'Defined risk example', ur: 'Defined' }, back: { en: 'Long option or debit spread.', ur: 'Long / debit spread.' } },
      { front: { en: 'Naked short call risk', ur: 'Naked call' }, back: { en: 'Large/undefined to the upside.', ur: 'Upside undefined.' } },
      { front: { en: 'Credit collected means', ur: 'Credit' }, back: { en: 'Obligation taken — not free yield.', ur: 'Obligation — free nahi.' } },
      { front: { en: 'Before click', ur: 'Click' }, back: { en: 'State max loss.', ur: 'Max loss.' } },
      { front: { en: 'Theta as income story', ur: 'Theta' }, back: { en: 'Hides tail risk if naked.', ur: 'Tail risk chhupa.' } },
    ],
    quiz: [
      { q: { en: 'Long call risk is typically:', ur: 'Long call:' },
        opts: { en: ['Defined ≈ premium', 'Unlimited', 'Zero'], ur: ['≈ Premium', 'Unlimited', 'Zero'] },
        correct: 0, explain: { en: 'Debit paid.', ur: 'Debit.' } },
      { q: { en: 'Naked short call risk is:', ur: 'Naked:' },
        opts: { en: ['Large/undefined upside', 'Capped at premium', 'None'], ur: ['Undefined upside', 'Capped premium', 'None'] },
        correct: 0, explain: { en: 'Obligation.', ur: 'Obligation.' } },
      { q: { en: 'Credit premium means you:', ur: 'Credit:' },
        opts: { en: ['Took an obligation', 'Got free riskless yield', 'Own the stock free'], ur: ['Obligation', 'Riskless', 'Free stock'] },
        correct: 0, explain: { en: 'Seller side.', ur: 'Seller.' } },
      { q: { en: 'Enter only when you can state:', ur: 'Enter:' },
        opts: { en: ['Max loss', 'Only emoji conviction', 'Tip channel OK'], ur: ['Max loss', 'Emoji', 'Tips'] },
        correct: 0, explain: { en: 'Process gate.', ur: 'Process.' } },
    ],
  }),
  week({
    id: 4,
    title: { en: 'Options Process Loop', ur: 'Options Process Loop' },
    objective: {
      en: 'Run: thesis → structure → max loss → expiry plan → log.',
      ur: 'Thesis → structure → max loss → expiry → log.',
    },
    teach: {
      en: `<p>Loop: underlying thesis → choose defined-risk structure when learning → write max loss + expiry plan → avoid blind event longs → journal. Greeks deep track comes after basics.</p>
<p>Certificate = study record — not a market-maker license.</p>`,
      ur: `<p>Thesis → defined-risk → max loss + expiry → log. Cert = study record.</p>`,
    },
    workedExample: {
      en: `<p>Card: “Debit call spread · max loss = debit · exit 7 DTE · no earnings hold.”</p>`,
      ur: `<p>Debit spread · max = debit · 7 DTE exit · no earnings.</p>`,
    },
    commonMistake: {
      en: `<p>Jumping to exotic multi-leg before stating max loss on a simple long.</p>`,
      ur: `<p>Exotic pehle — simple max loss nahi.</p>`,
    },
    exitTicket: { en: 'You can recite options practice loop.', ur: 'Options loop.' },
    notebookPrompt: { en: 'Six-bullet options loop on Study desk.', ur: '6-bullet options loop.' },
    flashcardSeeds: [
      { front: { en: 'Options loop', ur: 'Loop' }, back: { en: 'Thesis → structure → max loss → expiry → log.', ur: 'Thesis → structure → max → expiry → log.' } },
      { front: { en: 'Learning default', ur: 'Default' }, back: { en: 'Defined-risk structures.', ur: 'Defined-risk.' } },
      { front: { en: 'Blind earnings long premium', ur: 'Earnings' }, back: { en: 'IV crush risk.', ur: 'IV crush.' } },
      { front: { en: 'Certificate', ur: 'Cert' }, back: { en: 'Study progress — not MM license.', ur: 'Study — MM nahi.' } },
      { front: { en: 'Greeks track', ur: 'Greeks' }, back: { en: 'After basics — deeper sensitivity.', ur: 'Basics baad.' } },
    ],
    quiz: [
      { q: { en: 'Options practice starts with:', ur: 'Start:' },
        opts: { en: ['Thesis + structure + max loss', 'Max naked short', 'Tip lottery'], ur: ['Thesis + max loss', 'Naked max', 'Lottery'] },
        correct: 0, explain: { en: 'Process first.', ur: 'Process.' } },
      { q: { en: 'Learning default structure:', ur: 'Default:' },
        opts: { en: ['Defined-risk', 'Always naked short', 'Ignore expiry'], ur: ['Defined-risk', 'Naked', 'Ignore expiry'] },
        correct: 0, explain: { en: 'Cap risk while learning.', ur: 'Cap risk.' } },
      { q: { en: 'This certificate means:', ur: 'Cert:' },
        opts: { en: ['Study progress — not a license', 'Broker license', 'Income'], ur: ['Study', 'Broker', 'Income'] },
        correct: 0, explain: { en: 'Honesty.', ur: 'Honesty.' } },
      { q: { en: 'After this track next depth is:', ur: 'Next:' },
        opts: { en: ['Greeks / defined-risk practice', 'All-in weeklies', 'Ignore logs'], ur: ['Greeks practice', 'All-in', 'Ignore logs'] },
        correct: 0, explain: { en: 'Sensitivity next.', ur: 'Sensitivity.' } },
    ],
  }),
];

export const OPTIONS_DEEP_PLACEMENT = [
  { topic: 1, q: { en: 'Call is:', ur: 'Call:' }, opts: { en: ['Right to buy', 'Must buy', 'Free stock'], ur: ['Buy right', 'Must buy', 'Free'] }, correct: 0 },
  { topic: 1, q: { en: 'Long option max loss:', ur: 'Max:' }, opts: { en: ['Premium', 'Unlimited', 'Zero'], ur: ['Premium', 'Unlimited', 'Zero'] }, correct: 0 },
  { topic: 2, q: { en: 'At expiry extrinsic:', ur: 'Expiry:' }, opts: { en: ['→ 0', 'Doubles', 'Ignores spot'], ur: ['→ 0', 'Double', 'Ignore'] }, correct: 0 },
  { topic: 2, q: { en: 'IV crush hurts:', ur: 'Crush:' }, opts: { en: ['Long premium', 'Cash only', 'Bonds'], ur: ['Long premium', 'Cash', 'Bonds'] }, correct: 0 },
  { topic: 3, q: { en: 'Naked short call:', ur: 'Naked:' }, opts: { en: ['Large upside risk', 'Capped at credit', 'Riskless'], ur: ['Upside risk', 'Capped', 'Riskless'] }, correct: 0 },
  { topic: 3, q: { en: 'Before click state:', ur: 'Click:' }, opts: { en: ['Max loss', 'Only vibes', 'Tip OK'], ur: ['Max loss', 'Vibes', 'Tip'] }, correct: 0 },
  { topic: 4, q: { en: 'Loop starts:', ur: 'Loop:' }, opts: { en: ['Thesis + structure + max loss', 'Naked first', 'Skip expiry'], ur: ['Thesis+max', 'Naked', 'Skip'] }, correct: 0 },
  { topic: 4, q: { en: 'Certificate:', ur: 'Cert:' }, opts: { en: ['Study record', 'MM license', 'Income'], ur: ['Study', 'MM', 'Income'] }, correct: 0 },
];
