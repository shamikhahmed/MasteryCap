/* Greeks literacy — condensed 6-part bar (v48).
   Sensitivities for defined-risk thinking. Not a get-rich system. */

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

export const GREEKS_DEEP_WEEKS = [
  week({
    id: 1,
    title: { en: 'Delta & Direction', ur: 'Delta aur Direction' },
    objective: {
      en: 'Use delta as sensitivity to underlying move — not a crystal ball.',
      ur: 'Delta = sensitivity — crystal ball nahi.',
    },
    teach: {
      en: `<p><strong>Delta</strong> ≈ how much option price moves when underlying moves $1 (model-dependent). Calls positive delta; puts negative. Higher |delta| ≈ more stock-like.</p>
<p>Delta is not “probability of profit” as sold in tip culture — treat it as a sensitivity dial.</p>`,
      ur: `<p><strong>Delta</strong> ≈ underlying $1 move pe option price kitna move (model-dependent). Calls positive delta; puts negative. Higher |delta| ≈ zyada stock-like.</p>
<p>Delta “profit probability” nahi jaisa tip culture bechti — sensitivity dial samjho.</p>`,
    },
    workedExample: {
      en: `<p>Delta 0.40 call: underlying +1 → option ~+0.40 before other Greeks bite.</p>`,
      ur: `<p>Delta 0.40 → spot +1 ≈ option +0.40 (rough).</p>`,
    },
    commonMistake: {
      en: `<p>Equating delta to guaranteed win odds.</p>`,
      ur: `<p>Delta = win odds samajhna.</p>`,
    },
    exitTicket: { en: 'You can say what delta measures in one line.', ur: 'Delta kya measure karta hai — ek line mein bata sakte ho.' },
    notebookPrompt: { en: 'Note delta of one sample long call/put.', ur: 'Sample delta note.' },
    flashcardSeeds: [
      { front: { en: 'Delta measures', ur: 'Delta' }, back: { en: 'Sensitivity to underlying move.', ur: 'Underlying sensitivity.' } },
      { front: { en: 'Call delta sign', ur: 'Call Δ' }, back: { en: 'Usually positive.', ur: 'Positive.' } },
      { front: { en: 'Put delta sign', ur: 'Put Δ' }, back: { en: 'Usually negative.', ur: 'Negative.' } },
      { front: { en: 'Delta ≠', ur: 'Delta ≠' }, back: { en: 'Guaranteed win probability.', ur: 'Win guarantee nahi.' } },
      { front: { en: 'High |delta|', ur: '|Δ|' }, back: { en: 'More stock-like behavior.', ur: 'Stock-like.' } },
    ],
    quiz: [
      { q: { en: 'Delta mainly measures:', ur: 'Delta mainly kya measure karta hai:' },
        opts: { en: ['Sensitivity to underlying price', 'Guaranteed profit odds', 'Funding rate'], ur: ['Underlying sensitivity', 'Guaranteed odds', 'Funding'] },
        correct: 0, explain: { en: 'Sensitivity dial.', ur: 'Sensitivity.' } },
      { q: { en: 'Treating delta as win probability is:', ur: 'Delta ko win probability samajhna kya hai:' },
        opts: { en: ['Marketing misuse', 'Exact science always', 'Required by law'], ur: ['Misuse', 'Exact', 'Law'] },
        correct: 0, explain: { en: 'Honesty.', ur: 'Honesty.' } },
      { q: { en: 'Long call delta is typically:', ur: 'Long call delta typically kya hota hai:' },
        opts: { en: ['Positive', 'Always −1', 'Zero forever'], ur: ['Positive', '−1', 'Zero'] },
        correct: 0, explain: { en: 'Benefits from rises.', ur: 'Rises.' } },
      { q: { en: 'This track is:', ur: 'Track:' },
        opts: { en: ['Sensitivity literacy', 'Get-rich weekly system', 'Broker license'], ur: ['Literacy', 'Get-rich', 'License'] },
        correct: 0, explain: { en: 'School framing.', ur: 'School.' } },
    ],
  }),
  week({
    id: 2,
    title: { en: 'Theta & Time Decay', ur: 'Theta aur Time Decay' },
    objective: {
      en: 'See theta as daily time tax for long premium; income story for shorts hides tails.',
      ur: 'Theta = long premium tax; short “income” hides tails.',
    },
    teach: {
      en: `<p><strong>Theta</strong> ≈ value change per day from time passing. Long options usually pay theta; short options often collect it — with obligation risk.</p>
<p>“Theta income” without max-loss plan is how accounts blow up on the one day vol spikes.</p>`,
      ur: `<p><strong>Theta</strong> ≈ time guzarne se rozana value change. Long options usually theta pay; short options collect — obligation risk ke saath.</p>
<p>“Theta income” bina max-loss plan = jis din vol spike ho account udd jata hai.</p>`,
    },
    workedExample: {
      en: `<p>Long weeklies into quiet tape → death by theta even if “almost right.”</p>`,
      ur: `<p>Quiet tape mein long weeklies → theta se maut chahe “almost right” ho.</p>`,
    },
    commonMistake: {
      en: `<p>Ignoring DTE when buying lottery weeklies.</p>`,
      ur: `<p>DTE ignore — lottery weeklies.</p>`,
    },
    exitTicket: { en: 'You can say who usually pays theta.', ur: 'Theta kaun pay.' },
    notebookPrompt: { en: 'Write min DTE rule for long premium (or none).', ur: 'Long premium ke liye min DTE rule likho (ya none).' },
    flashcardSeeds: [
      { front: { en: 'Theta', ur: 'Theta' }, back: { en: 'Time decay per day (approx).', ur: 'Rozana time decay.' } },
      { front: { en: 'Long premium usually', ur: 'Long' }, back: { en: 'Pays theta.', ur: 'Theta pay.' } },
      { front: { en: 'Short premium usually', ur: 'Short' }, back: { en: 'Collects theta + takes risk.', ur: 'Collect + risk.' } },
      { front: { en: 'Theta income pitch', ur: 'Income' }, back: { en: 'Hides tail days.', ur: 'Tail chhupa.' } },
      { front: { en: 'DTE', ur: 'DTE' }, back: { en: 'Days to expiry — clock you bought.', ur: 'Expiry clock.' } },
    ],
    quiz: [
      { q: { en: 'Long options typically:', ur: 'Long options typically kya karte hain:' },
        opts: { en: ['Pay theta', 'Never decay', 'Earn funding'], ur: ['Pay theta', 'No decay', 'Funding'] },
        correct: 0, explain: { en: 'Time tax.', ur: 'Time tax.' } },
      { q: { en: 'Short premium “income” without max loss is:', ur: 'Short premium “income” bina max loss kya hai:' },
        opts: { en: ['Dangerous framing', 'Risk-free', 'Required'], ur: ['Dangerous', 'Risk-free', 'Required'] },
        correct: 0, explain: { en: 'Tails exist.', ur: 'Tails.' } },
      { q: { en: 'Quiet tape hurts long weeklies via:', ur: 'Quiet tape long weeklies ko kis via se nuksan deti hai:' },
        opts: { en: ['Theta', 'Infinite intrinsic forever', 'Zero fees'], ur: ['Theta', 'Infinite intrinsic', 'Zero fees'] },
        correct: 0, explain: { en: 'Decay.', ur: 'Decay.' } },
      { q: { en: 'Before short premium state:', ur: 'Short premium se pehle kya kehna chahiye:' },
        opts: { en: ['Max loss / defined risk plan', 'Only emoji', 'Tip OK'], ur: ['Max loss', 'Emoji', 'Tip'] },
        correct: 0, explain: { en: 'Process.', ur: 'Process.' } },
    ],
  }),
  week({
    id: 3,
    title: { en: 'Vega, Gamma & Crush', ur: 'Vega, Gamma, Crush' },
    objective: {
      en: 'Link vega to IV; gamma to delta change; respect IV crush.',
      ur: 'Vega↔IV; gamma↔delta change; IV crush.',
    },
    teach: {
      en: `<p><strong>Vega</strong> ≈ sensitivity to implied volatility. <strong>Gamma</strong> ≈ how fast delta changes — highest near ATM/expiry.</p>
<p>Buying premium into events pays IV; after the print, IV crush can erase value even with correct direction.</p>`,
      ur: `<p><strong>Vega</strong> ≈ implied volatility sensitivity. <strong>Gamma</strong> ≈ delta kitni tez badalta — ATM/expiry ke qareeb highest.</p>
<p>Events mein premium khareedna IV pay karta; print ke baad IV crush direction sahi hone ke bawajood value mita sakta.</p>`,
    },
    workedExample: {
      en: `<p>Long straddle into earnings: huge IV → post-print IV crush → need a bigger move than priced.</p>`,
      ur: `<p>Earnings straddle → crush → move > priced chahiye.</p>`,
    },
    commonMistake: {
      en: `<p>All-in long premium solely “for the event.”</p>`,
      ur: `<p>Event pe all-in long premium.</p>`,
    },
    exitTicket: { en: 'You can explain IV crush in one sentence.', ur: 'IV crush ek jumle mein samjha sakte ho.' },
    notebookPrompt: { en: 'Event rule: flat / defined debit / no hold.', ur: 'Event rule likho: flat / defined debit / no hold.' },
    flashcardSeeds: [
      { front: { en: 'Vega', ur: 'Vega' }, back: { en: 'Sensitivity to IV.', ur: 'IV sensitivity.' } },
      { front: { en: 'Gamma', ur: 'Gamma' }, back: { en: 'How fast delta changes.', ur: 'Delta speed.' } },
      { front: { en: 'IV crush', ur: 'Crush' }, back: { en: 'IV drop after event.', ur: 'Event baad IV drop.' } },
      { front: { en: 'ATM near expiry gamma', ur: 'ATM γ' }, back: { en: 'Often highest — whippy deltas.', ur: 'High — whippy.' } },
      { front: { en: 'Event long premium', ur: 'Event' }, back: { en: 'Pays crush risk.', ur: 'Crush risk.' } },
    ],
    quiz: [
      { q: { en: 'Vega measures sensitivity to:', ur: 'Vega kis cheez ki sensitivity measure karta hai:' },
        opts: { en: ['Implied volatility', 'Only dividends', 'Swap'], ur: ['IV', 'Dividends', 'Swap'] },
        correct: 0, explain: { en: 'IV dial.', ur: 'IV.' } },
      { q: { en: 'IV crush can:', ur: 'Crush:' },
        opts: { en: ['Hurt long premium after events', 'Only help longs', 'Delete theta'], ur: ['Hurt longs', 'Help longs', 'Delete theta'] },
        correct: 0, explain: { en: 'Vol premium gone.', ur: 'Vol gone.' } },
      { q: { en: 'Gamma is about:', ur: 'Gamma:' },
        opts: { en: ['Delta changing as spot moves', 'Free income', 'Broker rebates'], ur: ['Delta change', 'Income', 'Rebates'] },
        correct: 0, explain: { en: 'Curvature.', ur: 'Curvature.' } },
      { q: { en: 'Blind event all-in longs are:', ur: 'Blind event all-in longs kya hain:' },
        opts: { en: ['Gambling with crush risk', 'Required', 'Risk-free'], ur: ['Gambling', 'Required', 'Risk-free'] },
        correct: 0, explain: { en: 'Honesty.', ur: 'Honesty.' } },
    ],
  }),
  week({
    id: 4,
    title: { en: 'Greeks Process Loop', ur: 'Greeks Process Loop' },
    objective: {
      en: 'Read Greeks as risk dials on defined structures — not a weekly salary system.',
      ur: 'Greeks = dials on defined structures — salary system nahi.',
    },
    teach: {
      en: `<p>Loop: pick defined-risk structure → read delta/theta/vega in words → check event/IV → size by max loss → log. If someone sells “Greeks system = weekly rich,” walk away.</p>
<p>Certificate = study record.</p>`,
      ur: `<p>Loop: defined-risk structure chuno → delta/theta/vega words mein parho → event/IV check → max loss se size → log. “Greeks system = weekly rich” bechne wale se door chalo.</p>
<p>Certificate = study record.</p>`,
    },
    workedExample: {
      en: `<p>Card: “Debit put spread · delta note · no earnings · max = debit.”</p>`,
      ur: `<p>Debit put spread · delta note · no earnings · max = debit.</p>`,
    },
    commonMistake: {
      en: `<p>Optimizing Greek screenshots instead of max loss.</p>`,
      ur: `<p>Greek screenshot — max loss nahi.</p>`,
    },
    exitTicket: { en: 'You can recite Greeks practice loop.', ur: 'Greeks loop.' },
    notebookPrompt: { en: 'Six-bullet Greeks loop on Study desk.', ur: '6-bullet Greeks loop.' },
    flashcardSeeds: [
      { front: { en: 'Greeks loop', ur: 'Loop' }, back: { en: 'Structure → read dials → event → max loss → log.', ur: 'Structure → dials → event → max → log.' } },
      { front: { en: 'Greeks get-rich system', ur: 'Get-rich' }, back: { en: 'Fantasy marketing.', ur: 'Fantasy.' } },
      { front: { en: 'Primary risk number', ur: 'Primary' }, back: { en: 'Max loss in money.', ur: 'Max loss $.' } },
      { front: { en: 'Certificate', ur: 'Cert' }, back: { en: 'Study progress — not income.', ur: 'Study — income nahi.' } },
      { front: { en: 'Screenshot Greeks without size', ur: 'Screenshot' }, back: { en: 'Cosplay.', ur: 'Cosplay.' } },
    ],
    quiz: [
      { q: { en: 'Greeks practice prioritizes:', ur: 'Greeks practice kis ko prioritize karti hai:' },
        opts: { en: ['Defined structure + max loss', 'Weekly rich system', 'Ignore events'], ur: ['Structure + max loss', 'Weekly rich', 'Ignore'] },
        correct: 0, explain: { en: 'Risk first.', ur: 'Risk.' } },
      { q: { en: '“Greeks = weekly income” is:', ur: '“Greeks = weekly income” kya hai:' },
        opts: { en: ['Fantasy pitch', 'Guaranteed', 'SECP product'], ur: ['Fantasy', 'Guaranteed', 'SECP'] },
        correct: 0, explain: { en: 'Refuse.', ur: 'Refuse.' } },
      { q: { en: 'This certificate means:', ur: 'Is certificate ka matlab kya hai:' },
        opts: { en: ['Study progress', 'Market-maker license', 'Income right'], ur: ['Study', 'MM license', 'Income'] },
        correct: 0, explain: { en: 'Honesty.', ur: 'Honesty.' } },
      { q: { en: 'Before entry you should state:', ur: 'Entry se pehle tumhein kya kehna chahiye:' },
        opts: { en: ['Max loss in money', 'Only delta screenshot', 'Tip emoji'], ur: ['Max loss $', 'Delta only', 'Emoji'] },
        correct: 0, explain: { en: 'Money risk.', ur: 'Money.' } },
    ],
  }),
];

export const GREEKS_DEEP_PLACEMENT = [
  { topic: 1, q: { en: 'Delta is:', ur: 'Delta:' }, opts: { en: ['Underlying sensitivity', 'Guaranteed odds', 'Funding'], ur: ['Sensitivity', 'Odds', 'Funding'] }, correct: 0 },
  { topic: 1, q: { en: 'Delta as win%:', ur: 'Win%:' }, opts: { en: ['Misuse', 'Exact law', 'Required'], ur: ['Misuse', 'Law', 'Required'] }, correct: 0 },
  { topic: 2, q: { en: 'Long premium theta:', ur: 'Theta:' }, opts: { en: ['Usually pays', 'Never', 'Earns funding'], ur: ['Pays', 'Never', 'Funding'] }, correct: 0 },
  { topic: 2, q: { en: 'Theta income sans max loss:', ur: 'Income:' }, opts: { en: ['Dangerous', 'Safe', 'Required'], ur: ['Dangerous', 'Safe', 'Required'] }, correct: 0 },
  { topic: 3, q: { en: 'Vega tracks:', ur: 'Vega:' }, opts: { en: ['IV', 'Dividends only', 'Swap'], ur: ['IV', 'Div', 'Swap'] }, correct: 0 },
  { topic: 3, q: { en: 'IV crush:', ur: 'Crush:' }, opts: { en: ['Hurts long premium', 'Only helps', 'Deletes spot'], ur: ['Hurts long', 'Helps', 'Deletes spot'] }, correct: 0 },
  { topic: 4, q: { en: 'Loop priority:', ur: 'Loop:' }, opts: { en: ['Max loss + structure', 'Get-rich system', 'Skip log'], ur: ['Max loss', 'Get-rich', 'Skip'] }, correct: 0 },
  { topic: 4, q: { en: 'Certificate:', ur: 'Cert:' }, opts: { en: ['Study record', 'MM license', 'Income'], ur: ['Study', 'MM', 'Income'] }, correct: 0 },
];
