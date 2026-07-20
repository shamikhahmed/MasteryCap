/* Futures literacy — condensed 6-part bar (v48).
   Contracts, margin, roll — not signal service. */

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

export const FUTURES_DEEP_WEEKS = [
  week({
    id: 1,
    title: { en: 'What Futures Are', ur: 'Futures Kya Hain' },
    objective: {
      en: 'Define futures as standardized future-delivery contracts — not spot ownership.',
      ur: 'Futures = standardized future contract — spot ownership nahi.',
    },
    teach: {
      en: `<p><strong>Futures</strong> obligate buy/sell of an underlying at a future date at an agreed price (standardized). You usually mark-to-market daily; you do not “own the barrel/coin” like spot until delivery mechanics say so (most retail offsets before).</p>
<p>Leverage is embedded via margin — efficiency with liquidation risk.</p>`,
      ur: `<p><strong>Futures</strong> future date pe underlying buy/sell ka obligation (standardized). Usually daily mark-to-market; spot jaisa “barrel/coin own” nahi jab tak delivery mechanics na kahein (zyada tar retail pehle offset).</p>
<p>Leverage margin se embedded — efficiency liquidation risk ke saath.</p>`,
    },
    workedExample: {
      en: `<p>Long futures: price up → variation margin credit; price down → debit. Account can be closed if margin fails.</p>`,
      ur: `<p>Long futures: price up → variation margin credit; price down → debit. Margin fail pe account close ho sakta.</p>`,
    },
    commonMistake: {
      en: `<p>Treating futures P/L like a non-levered ETF share count.</p>`,
      ur: `<p>Futures = non-lev ETF samajhna.</p>`,
    },
    exitTicket: { en: 'You can say futures ≠ spot ownership in one line.', ur: 'Futures ≠ spot ownership — ek line mein bata sakte ho.' },
    notebookPrompt: { en: 'Write: why futures need margin.', ur: 'Futures ko margin kyun.' },
    flashcardSeeds: [
      { front: { en: 'Futures are', ur: 'Futures' }, back: { en: 'Standardized future contracts.', ur: 'Standard future contracts.' } },
      { front: { en: 'Daily mark-to-market', ur: 'MTM' }, back: { en: 'P/L settled continuously vs spot buy-hold feel.', ur: 'Rozana P/L.' } },
      { front: { en: 'Margin enables', ur: 'Margin' }, back: { en: 'Leverage — and liquidation.', ur: 'Leverage + liq.' } },
      { front: { en: 'Futures ≠', ur: '≠' }, back: { en: 'Automatic spot ownership.', ur: 'Auto spot own nahi.' } },
      { front: { en: 'Most retail', ur: 'Retail' }, back: { en: 'Offset before delivery.', ur: 'Delivery se pehle offset.' } },
    ],
    quiz: [
      { q: { en: 'Futures primarily are:', ur: 'Futures primarily kya hain:' },
        opts: { en: ['Standardized future contracts', 'Always spot coins in wallet', 'Tax-free gifts'], ur: ['Future contracts', 'Spot wallet', 'Gifts'] },
        correct: 0, explain: { en: 'Contract first.', ur: 'Contract.' } },
      { q: { en: 'Margin in futures mainly adds:', ur: 'Futures mein margin mainly kya add karta hai:' },
        opts: { en: ['Leverage and liquidation risk', 'Guaranteed yield', 'Zero risk'], ur: ['Lev + liq', 'Yield', 'Zero risk'] },
        correct: 0, explain: { en: 'Efficiency with teeth.', ur: 'Efficiency hai magar teeth bhi hain.' } },
      { q: { en: 'Mark-to-market means:', ur: 'Mark-to-market ka matlab kya hai:' },
        opts: { en: ['Daily P/L settlement vs the market', 'Never update price', 'Only yearly'], ur: ['Daily P/L market ke khilaf settle hota hai futures mein', 'Never update', 'Yearly'] },
        correct: 0, explain: { en: 'Continuous settlement.', ur: 'Continuous settlement hoti rehti hai.' } },
      { q: { en: 'This track promises:', ur: 'Is track ka kya wada hai:' },
        opts: { en: ['Contract literacy — not signal income', 'Weekly salary', 'Free fills'], ur: ['Contract literacy hai — signal income nahi hai ye', 'Salary', 'Free fills'] },
        correct: 0, explain: { en: 'Honesty.', ur: 'Honesty.' } },
    ],
  }),
  week({
    id: 2,
    title: { en: 'Specs, Ticks & Notional', ur: 'Specs, Ticks, Notional' },
    objective: {
      en: 'Read contract size/tick value before sizing — notional dwarfs margin.',
      ur: 'Contract size/tick pehle — notional > margin.',
    },
    teach: {
      en: `<p>Each contract has multiplier/tick. <strong>Notional</strong> exposure can be huge vs margin posted. One tick × multiplier = money P/L per tick.</p>
<p>Sizing from “I can afford the margin” alone is how people over-lever.</p>`,
      ur: `<p>Har contract ka multiplier/tick hai. <strong>Notional</strong> exposure margin se posted ke muqable bohat bari ho sakti. Ek tick × multiplier = tick pe money P/L.</p>
<p>Sirf “margin afford kar sakta hoon” se size karna log over-lever karte hain.</p>`,
    },
    workedExample: {
      en: `<p>If one tick = $12.50 and you risk $100, that’s 8 ticks stop distance budget — not “1 contract because margin is $2k.”</p>`,
      ur: `<p>Agar ek tick = $12.50 aur aap $100 risk karte ho, wo 8 ticks stop distance budget — “margin $2k hai is liye 1 contract” nahi.</p>`,
    },
    commonMistake: {
      en: `<p>Ignoring tick value until the first statement shock.</p>`,
      ur: `<p>Tick value ignore — statement shock.</p>`,
    },
    exitTicket: { en: 'You can explain notional vs margin in one line.', ur: 'Notional vs margin ek line mein samjha sakte ho.' },
    notebookPrompt: { en: 'For one sample contract: tick $ and notional guess.', ur: 'Ek sample contract: tick $ aur notional guess likho.' },
    flashcardSeeds: [
      { front: { en: 'Notional', ur: 'Notional' }, back: { en: 'Full contract exposure — often >> margin.', ur: 'Full exposure >> margin.' } },
      { front: { en: 'Tick value', ur: 'Tick' }, back: { en: 'Money per minimum price increment.', ur: '$ per min increment.' } },
      { front: { en: 'Size from', ur: 'Size' }, back: { en: 'Risk $ and stop ticks — not margin alone.', ur: 'Risk$ + ticks.' } },
      { front: { en: 'Afford margin ≠', ur: 'Margin' }, back: { en: 'Safe leverage.', ur: 'Safe lev nahi.' } },
      { front: { en: 'Multiplier', ur: 'Mult' }, back: { en: 'Scales price move into P/L.', ur: 'Price → P/L scale.' } },
    ],
    quiz: [
      { q: { en: 'Notional vs margin:', ur: 'Notional vs margin mein farq:' },
        opts: { en: ['Notional often much larger', 'Always equal', 'Margin larger always'], ur: ['Notional larger', 'Equal', 'Margin larger'] },
        correct: 0, explain: { en: 'Leverage math.', ur: 'Leverage.' } },
      { q: { en: 'Best size basis:', ur: 'Size ka behtar basis kya hai:' },
        opts: { en: ['Risk $ and tick math', 'Max contracts broker allows', 'Tip lot'], ur: ['Risk$ + ticks', 'Max contracts', 'Tip'] },
        correct: 0, explain: { en: 'Risk first.', ur: 'Risk.' } },
      { q: { en: 'Ignoring tick value leads to:', ur: 'Tick value ignore karne se kya hota hai:' },
        opts: { en: ['Surprise P/L swings', 'Safer fills', 'Free hedges'], ur: ['Surprise P/L', 'Safer', 'Free hedges'] },
        correct: 0, explain: { en: 'Know the unit.', ur: 'Unit.' } },
      { q: { en: '“I can post margin” alone means:', ur: 'Sirf “I can post margin” ka matlab:' },
        opts: { en: ['Not sufficient sizing logic', 'Always optimal size', 'Zero risk'], ur: ['Not enough', 'Optimal', 'Zero risk'] },
        correct: 0, explain: { en: 'Notional rules.', ur: 'Notional.' } },
    ],
  }),
  week({
    id: 3,
    title: { en: 'Margin, Roll & Curve', ur: 'Margin, Roll, Curve' },
    objective: {
      en: 'Separate initial/maintenance margin; respect roll/expiry and curve shape.',
      ur: 'Initial vs maintenance; roll/expiry; curve.',
    },
    teach: {
      en: `<p><strong>Initial</strong> margin to open; <strong>maintenance</strong> to keep. Breach → margin call / auto liquidate path.</p>
<p><strong>Roll</strong> before expiry if you want continuity. <strong>Contango/backwardation</strong> describe curve shape — costs/benefits for holders over time, not magic signals.</p>`,
      ur: `<p><strong>Initial</strong> margin open ke liye; <strong>maintenance</strong> rakhne ke liye. Breach → margin call / auto liquidate path.</p>
<p><strong>Roll</strong> expiry se pehle agar continuity chahiye. <strong>Contango/backwardation</strong> curve shape batate — holders ke liye costs/benefits over time, magic signals nahi.</p>`,
    },
    workedExample: {
      en: `<p>Hold into expiry without plan → forced exit or delivery complexity you didn’t want.</p>`,
      ur: `<p>Expiry bina plan → forced exit / delivery mess.</p>`,
    },
    commonMistake: {
      en: `<p>Treating contango as guaranteed profit tip.</p>`,
      ur: `<p>Contango = guaranteed tip.</p>`,
    },
    exitTicket: { en: 'You can define initial vs maintenance margin.', ur: 'Initial vs maintenance margin define kar sakte ho.' },
    notebookPrompt: { en: 'Write roll rule (DTE / never hold expiry).', ur: 'Roll rule likho (DTE / expiry pe kabhi hold nahi).' },
    flashcardSeeds: [
      { front: { en: 'Initial margin', ur: 'Initial' }, back: { en: 'To open the position.', ur: 'Open ke liye.' } },
      { front: { en: 'Maintenance margin', ur: 'Maint' }, back: { en: 'Minimum to keep — breach hurts.', ur: 'Keep minimum.' } },
      { front: { en: 'Roll', ur: 'Roll' }, back: { en: 'Move exposure to next contract.', ur: 'Next contract.' } },
      { front: { en: 'Contango', ur: 'Contango' }, back: { en: 'Later contracts richer — curve shape.', ur: 'Later richer — shape.' } },
      { front: { en: 'Curve as tip', ur: 'Curve tip' }, back: { en: 'Not a guaranteed income signal.', ur: 'Income signal nahi.' } },
    ],
    quiz: [
      { q: { en: 'Maintenance margin breach can lead to:', ur: 'Maintenance margin breach se kya ho sakta hai:' },
        opts: { en: ['Margin call / liquidation path', 'Free bonus', 'Guaranteed roll profit'], ur: ['Call / liq', 'Bonus', 'Roll profit'] },
        correct: 0, explain: { en: 'Venue protects itself.', ur: 'Venue apni protection karti hai.' } },
      { q: { en: 'Roll exists to:', ur: 'Roll:' },
        opts: { en: ['Continue exposure past near expiry', 'Delete all risk', 'Avoid all fees forever'], ur: ['Near expiry ke baad exposure continue karna roll se', 'Delete risk', 'No fees'] },
        correct: 0, explain: { en: 'Continuity.', ur: 'Continuity.' } },
      { q: { en: 'Contango/backwardation are:', ur: 'Contango/backwardation kya hain:' },
        opts: { en: ['Curve descriptions — not magic tips', 'Guaranteed salaries', 'Illegal'], ur: ['Curve descriptions hain — magic tips nahi hain ye', 'Salaries', 'Illegal'] },
        correct: 0, explain: { en: 'Shape literacy.', ur: 'Shape.' } },
      { q: { en: 'Hold to expiry without plan is:', ur: 'Bina plan expiry tak hold karna kya hai:' },
        opts: { en: ['Operational risk', 'Best practice', 'Required'], ur: ['Ops risk', 'Best', 'Required'] },
        correct: 0, explain: { en: 'Plan roll/exit.', ur: 'Plan.' } },
    ],
  }),
  week({
    id: 4,
    title: { en: 'Futures Process Loop', ur: 'Futures Process Loop' },
    objective: {
      en: 'Size by risk ticks; roll on purpose; no signal-cosplay leverage.',
      ur: 'Risk ticks size; intentional roll; no signal lev.',
    },
    teach: {
      en: `<p>Loop: know specs → risk $ → stop in ticks → margin cushion → roll/expiry plan → log. Signals that ignore notional are cosplay.</p>
<p>Certificate = study record — not prop-desk license.</p>`,
      ur: `<p>Loop: specs jano → risk $ → stop ticks mein → margin cushion → roll/expiry plan → log. Notional ignore karne wale signals cosplay hain.</p>
<p>Certificate = study record — prop-desk license nahi.</p>`,
    },
    workedExample: {
      en: `<p>Card: “1 micro · 1% risk · 10-tick stop · roll 5 DTE · no signal size.”</p>`,
      ur: `<p>1 micro · 1% · 10-tick · roll 5 DTE · no signal size.</p>`,
    },
    commonMistake: {
      en: `<p>Max contracts because “margin allows.”</p>`,
      ur: `<p>Margin allow → max contracts.</p>`,
    },
    exitTicket: { en: 'You can recite futures practice loop.', ur: 'Futures loop.' },
    notebookPrompt: { en: 'Six-bullet futures loop on Study desk.', ur: 'Study desk pe six-bullet futures loop likho.' },
    flashcardSeeds: [
      { front: { en: 'Futures loop', ur: 'Loop' }, back: { en: 'Specs → risk$ → ticks → cushion → roll → log.', ur: 'Specs → risk → ticks → roll → log.' } },
      { front: { en: 'Margin allows max', ur: 'Max' }, back: { en: 'Not a size rule.', ur: 'Size rule nahi.' } },
      { front: { en: 'Signal ignoring notional', ur: 'Signal' }, back: { en: 'Cosplay.', ur: 'Cosplay.' } },
      { front: { en: 'Certificate', ur: 'Cert' }, back: { en: 'Study progress — not prop license.', ur: 'Study — prop nahi.' } },
      { front: { en: 'Cushion', ur: 'Cushion' }, back: { en: 'Extra margin beyond maintenance.', ur: 'Maint ke upar.' } },
    ],
    quiz: [
      { q: { en: 'Futures size should use:', ur: 'Futures size kya use karni chahiye:' },
        opts: { en: ['Risk $ and tick math', 'Max margin allows', 'Tip lots'], ur: ['Risk$ + ticks', 'Max margin', 'Tips'] },
        correct: 0, explain: { en: 'Risk first.', ur: 'Risk.' } },
      { q: { en: '“Margin allows” max contracts is:', ur: '“Margin allows” max contracts kya hai:' },
        opts: { en: ['A common over-lever trap', 'Best practice', 'Required'], ur: ['Over-lever trap', 'Best', 'Required'] },
        correct: 0, explain: { en: 'Notional rules.', ur: 'Notional.' } },
      { q: { en: 'This certificate means:', ur: 'Is certificate ka matlab kya hai:' },
        opts: { en: ['Study progress', 'Prop license', 'Income'], ur: ['Study', 'Prop', 'Income'] },
        correct: 0, explain: { en: 'Honesty.', ur: 'Honesty.' } },
      { q: { en: 'Roll/expiry plan belongs:', ur: 'Roll/expiry plan kahan belong karta hai:' },
        opts: { en: ['Before you need it', 'Never', 'Only after liquidation'], ur: ['Before', 'Never', 'After liq'] },
        correct: 0, explain: { en: 'Operate ahead.', ur: 'Ahead.' } },
    ],
  }),
];

export const FUTURES_DEEP_PLACEMENT = [
  { topic: 1, q: { en: 'Futures are:', ur: 'Futures:' }, opts: { en: ['Future contracts', 'Always spot bags', 'Gifts'], ur: ['Contracts', 'Spot bags', 'Gifts'] }, correct: 0 },
  { topic: 1, q: { en: 'Margin adds:', ur: 'Margin:' }, opts: { en: ['Lev + liq risk', 'Guaranteed yield', 'Zero risk'], ur: ['Lev+liq', 'Yield', 'Zero'] }, correct: 0 },
  { topic: 2, q: { en: 'Notional vs margin:', ur: 'Notional:' }, opts: { en: ['Often >> margin', 'Always equal', 'Smaller always'], ur: ['>> margin', 'Equal', 'Smaller'] }, correct: 0 },
  { topic: 2, q: { en: 'Size from:', ur: 'Size:' }, opts: { en: ['Risk$ + ticks', 'Max margin', 'Tips'], ur: ['Risk$+ticks', 'Max margin', 'Tips'] }, correct: 0 },
  { topic: 3, q: { en: 'Maintenance breach:', ur: 'Maint:' }, opts: { en: ['Call/liq path', 'Bonus', 'Free roll'], ur: ['Call/liq', 'Bonus', 'Free roll'] }, correct: 0 },
  { topic: 3, q: { en: 'Contango is:', ur: 'Contango:' }, opts: { en: ['Curve shape', 'Guaranteed salary', 'Illegal'], ur: ['Curve', 'Salary', 'Illegal'] }, correct: 0 },
  { topic: 4, q: { en: 'Loop starts:', ur: 'Loop:' }, opts: { en: ['Specs + risk ticks', 'Max contracts', 'Signals first'], ur: ['Specs+risk', 'Max', 'Signals'] }, correct: 0 },
  { topic: 4, q: { en: 'Certificate:', ur: 'Cert:' }, opts: { en: ['Study record', 'Prop license', 'Income'], ur: ['Study', 'Prop', 'Income'] }, correct: 0 },
];
