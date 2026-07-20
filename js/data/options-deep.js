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
      ur: `<p><strong>Call</strong> strike pe expiry se pehle khareedne ka right; <strong>put</strong> bechne ka right. Buyer <strong>premium</strong> pay karta; seller premium collect karke obligation leta.</p>
<p>Rights ≠ guarantees. Premium zero ho sakta. Options contracts hain expiry ke saath — buyers ke liye time cost hai.</p>
<p>{{redflag:“Options = free leverage lottery” ignores premium decay and ruin paths.}}</p>`,
    },
    workedExample: {
      en: `<p>Buy call for 2. Stock never reaches strike usefully → premium → 0. Max loss = premium paid.</p>`,
      ur: `<p>Call 2 pe buy karo. Stock strike tak usefully na pahunche → premium → 0. Max loss = premium paid.</p>`,
    },
    commonMistake: {
      en: `<p>Sizing like stock shares and ignoring premium as full risk for long options.</p>`,
      ur: `<p>Stock size sochna — premium = full risk ignore.</p>`,
    },
    exitTicket: { en: 'You can state max loss for a long call/put.', ur: 'Long call/put ka max loss bata sakte ho.' },
    notebookPrompt: { en: 'Write call vs put in one sentence each.', ur: 'Call vs put ek jumla.' },
    flashcardSeeds: [
      { front: { en: 'Call', ur: 'Call' }, back: { en: 'Right to buy at strike.', ur: 'Strike pe buy right.' } },
      { front: { en: 'Put', ur: 'Put' }, back: { en: 'Right to sell at strike.', ur: 'Strike pe sell right.' } },
      { front: { en: 'Long option max loss', ur: 'Long max' }, back: { en: 'Premium paid (defined).', ur: 'Premium paid.' } },
      { front: { en: 'Premium', ur: 'Premium' }, back: { en: 'Price of the right.', ur: 'Right ki qeemat.' } },
      { front: { en: 'Expiry', ur: 'Expiry' }, back: { en: 'Clock that can zero buyers.', ur: 'Buyer zero clock.' } },
    ],
    quiz: [
      { q: { en: 'A call gives the buyer:', ur: 'Call buyer ko kya deta hai:' },
        opts: { en: ['Right to buy at strike', 'Obligation to buy always', 'Free shares'], ur: ['Buy right', 'Must buy', 'Free shares'] },
        correct: 0, explain: { en: 'Right, not obligation.', ur: 'Right hai — obligation nahi.' } },
      { q: { en: 'Long put max loss is typically:', ur: 'Long put ka max loss typically kya hota hai:' },
        opts: { en: ['Premium paid', 'Unlimited', 'Zero always'], ur: ['Premium', 'Unlimited', 'Zero'] },
        correct: 0, explain: { en: 'Defined for long options.', ur: 'Long options ke liye defined hota hai.' } },
      { q: { en: 'Premium is:', ur: 'Premium:' },
        opts: { en: ['Price of the contractual right', 'Guaranteed profit', 'Interest-free loan'], ur: ['Right price', 'Guaranteed', 'Loan'] },
        correct: 0, explain: { en: 'You pay for optionality.', ur: 'Pay for right.' } },
      { q: { en: 'Options as free lottery ignore:', ur: 'Options ko free lottery samajhna kya ignore karta hai:' },
        opts: { en: ['Premium decay and defined/undefined risks', 'Nothing', 'Only logos'], ur: ['Premium decay aur defined/undefined risks samjho pehle', 'Nothing', 'Logos'] },
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
      ur: `<p><strong>Intrinsic</strong> = in-the-money amount. <strong>Extrinsic</strong> = time + implied vol premium. Expiry pe extrinsic → 0; sirf intrinsic rehta.</p>
<p>Events mein options khareedna IV ke liye pay karta; events ke baad <strong>IV crush</strong> direction sahi hone ke bawajood hurt kar sakta.</p>`,
    },
    workedExample: {
      en: `<p>Stock 100, call 95 premium 7 → intrinsic 5, extrinsic 2. At expiry if stock 100, call worth 5 — extrinsic gone.</p>`,
      ur: `<p>Stock 100, call 95 premium 7 → intrinsic 5, extrinsic 2. Expiry pe agar stock 100, call worth 5 — extrinsic gayab.</p>`,
    },
    commonMistake: {
      en: `<p>Holding long premium through expiry week “for fun.”</p>`,
      ur: `<p>Expiry week pe long premium “mazay.”</p>`,
    },
    exitTicket: { en: 'You can split one premium into intrinsic/extrinsic.', ur: 'Ek premium ko intrinsic/extrinsic mein split kar sakte ho.' },
    notebookPrompt: { en: 'Pick a sample quote; estimate intrinsic vs rest.', ur: 'Sample quote chuno; intrinsic vs baqi estimate karo.' },
    flashcardSeeds: [
      { front: { en: 'Intrinsic', ur: 'Intrinsic' }, back: { en: 'ITM amount.', ur: 'ITM amount.' } },
      { front: { en: 'Extrinsic', ur: 'Extrinsic' }, back: { en: 'Time + IV value.', ur: 'Time + IV.' } },
      { front: { en: 'At expiry extrinsic', ur: 'Expiry' }, back: { en: 'Goes to zero.', ur: 'Zero.' } },
      { front: { en: 'IV crush', ur: 'IV crush' }, back: { en: 'IV drops after event — hurts long premium.', ur: 'Event baad IV drop.' } },
      { front: { en: 'Direction right + IV crush', ur: 'Right+crush' }, back: { en: 'Can still lose on long options.', ur: 'Phir bhi haar.' } },
    ],
    quiz: [
      { q: { en: 'At expiry, extrinsic value:', ur: 'Expiry pe extrinsic value kya hoti hai:' },
        opts: { en: ['Goes to zero', 'Doubles', 'Becomes intrinsic always higher'], ur: ['Zero', 'Double', 'Hamesha intrinsic zyada ban jata hai kehte hain — galat'] },
        correct: 0, explain: { en: 'Clock ends.', ur: 'Clock ends.' } },
      { q: { en: 'IV crush mainly hurts:', ur: 'IV crush mainly kis ko nuksan deta hai:' },
        opts: { en: ['Long premium after vol collapses', 'Cash savers', 'Bond ladders'], ur: ['Vol collapse ke baad long premium nuqsan deta hai', 'Savers', 'Bonds'] },
        correct: 0, explain: { en: 'Vol premium evaporates.', ur: 'Vol premium evaporate ho jati hai.' } },
      { q: { en: 'Intrinsic for a call is:', ur: 'Call intrinsic:' },
        opts: { en: ['Max(0, spot − strike)', 'Always premium', 'Funding rate'], ur: ['max(0,spot−strike)', 'Premium', 'Funding'] },
        correct: 0, explain: { en: 'ITM amount.', ur: 'ITM.' } },
      { q: { en: 'Holding long options into expiry for vibes is:', ur: 'Long options expiry tak vibes ke liye hold karna kya hai:' },
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
      ur: `<p><strong>Long options / debit spreads:</strong> risk debit ke qareeb capped. <strong>Naked short calls</strong> bada/undefined upside risk. Credit collected ≠ “free money.”</p>
<p>Entry se pehle max loss na bata sako to click ke liye ready nahi.</p>`,
    },
    workedExample: {
      en: `<p>Long call debit 2 → max loss 2. Short naked call premium 2 → loss can vastly exceed 2 if stock rips.</p>`,
      ur: `<p>Long call debit 2 → max loss 2. Short naked call premium 2 → stock rip pe loss 2 se bohat zyada ho sakta.</p>`,
    },
    commonMistake: {
      en: `<p>Selling naked premium because “theta is income.”</p>`,
      ur: `<p>Naked sell — “theta income.”</p>`,
    },
    exitTicket: { en: 'You can name one defined-risk vs one undefined structure.', ur: 'Ek defined-risk aur ek undefined structure naam kar sakte ho.' },
    notebookPrompt: { en: 'Write: I will not sell naked until ___ (or never).', ur: 'Likho: naked sell tab tak nahi jab tak ___ (ya kabhi nahi).' },
    flashcardSeeds: [
      { front: { en: 'Defined risk example', ur: 'Defined' }, back: { en: 'Long option or debit spread.', ur: 'Long / debit spread.' } },
      { front: { en: 'Naked short call risk', ur: 'Naked call' }, back: { en: 'Large/undefined to the upside.', ur: 'Upside undefined.' } },
      { front: { en: 'Credit collected means', ur: 'Credit' }, back: { en: 'Obligation taken — not free yield.', ur: 'Obligation — free nahi.' } },
      { front: { en: 'Before click', ur: 'Click' }, back: { en: 'State max loss.', ur: 'Max loss.' } },
      { front: { en: 'Theta as income story', ur: 'Theta' }, back: { en: 'Hides tail risk if naked.', ur: 'Tail risk chhupa.' } },
    ],
    quiz: [
      { q: { en: 'Long call risk is typically:', ur: 'Long call ka risk typically kya hota hai:' },
        opts: { en: ['Defined ≈ premium', 'Unlimited', 'Zero'], ur: ['≈ Premium', 'Unlimited', 'Zero'] },
        correct: 0, explain: { en: 'Debit paid.', ur: 'Debit.' } },
      { q: { en: 'Naked short call risk is:', ur: 'Naked short call ka risk kya hai:' },
        opts: { en: ['Large/undefined upside', 'Capped at premium', 'None'], ur: ['Undefined upside', 'Capped premium', 'None'] },
        correct: 0, explain: { en: 'Obligation.', ur: 'Obligation.' } },
      { q: { en: 'Credit premium means you:', ur: 'Credit premium ka matlab tum:' },
        opts: { en: ['Took an obligation', 'Got free riskless yield', 'Own the stock free'], ur: ['Obligation', 'Riskless', 'Free stock'] },
        correct: 0, explain: { en: 'Seller side.', ur: 'Seller.' } },
      { q: { en: 'Enter only when you can state:', ur: 'Tabhi enter karo jab tum keh sako:' },
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
      ur: `<p>Loop: underlying thesis → seekhte waqt defined-risk structure → max loss + expiry plan likho → blind event longs avoid → journal. Greeks deep track basics ke baad.</p>
<p>Certificate = study record — market-maker license nahi.</p>`,
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
      { q: { en: 'Options practice starts with:', ur: 'Options practice kis se shuru hoti hai:' },
        opts: { en: ['Thesis + structure + max loss', 'Max naked short', 'Tip lottery'], ur: ['Thesis + max loss', 'Naked max', 'Lottery'] },
        correct: 0, explain: { en: 'Process first.', ur: 'Process.' } },
      { q: { en: 'Learning default structure:', ur: 'Learning default structure kya hai:' },
        opts: { en: ['Defined-risk', 'Always naked short', 'Ignore expiry'], ur: ['Defined-risk', 'Naked', 'Ignore expiry'] },
        correct: 0, explain: { en: 'Cap risk while learning.', ur: 'Seekhte waqt risk cap karo.' } },
      { q: { en: 'This certificate means:', ur: 'Is certificate ka matlab kya hai:' },
        opts: { en: ['Study progress — not a license', 'Broker license', 'Income'], ur: ['Study', 'Broker', 'Income'] },
        correct: 0, explain: { en: 'Honesty.', ur: 'Honesty.' } },
      { q: { en: 'After this track next depth is:', ur: 'Is track ke baad agla depth kya hai:' },
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
