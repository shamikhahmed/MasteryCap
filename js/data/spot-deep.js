/* Spot vs derivatives — 6-part bar (v48).
   Ownership vs contracts. Not leverage cheerleading. */

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

export const SPOT_DEEP_WEEKS = [
  week({
    id: 1,
    title: { en: 'What Spot Means', ur: 'Spot Ka Matlab' },
    objective: {
      en: 'Define spot ownership: no expiry, funding, or liquidation price.',
      ur: 'Spot = ownership — no expiry/funding/liq price.',
    },
    teach: {
      en: `<p><strong>Spot</strong> = buy the asset, own it, settle now. No funding clock, no margin call, no liquidation price. Spot goes to zero only if the asset does.</p>
<p>Cost: capital inefficiency — $1 exposure needs ~$1. Feature for long-horizon conviction: overexposure harder; leverage mistake-class removed.</p>`,
      ur: `<p>Spot = malik. Waqt side pe. Cost = full cash. Feature = kam leverage ghaltiyan.</p>`,
    },
    workedExample: {
      en: `<p>Wrong for a year in spot can recover; wrong an hour in leverage can cease to exist.</p>`,
      ur: `<p>Spot galat saal → recover mumkin. Lev galat ghanta → khatam.</p>`,
    },
    commonMistake: {
      en: `<p>Calling leveraged IOUs “spot” because the chart looks the same.</p>`,
      ur: `<p>Lev IOU ko spot kehna.</p>`,
    },
    exitTicket: { en: 'You can name three things spot does not have.', ur: 'Teen cheezen spot mein nahi.' },
    notebookPrompt: { en: 'Write: my core book is spot / mix — and why.', ur: 'Core spot/mix + kyun.' },
    flashcardSeeds: [
      { front: { en: 'Spot liquidation price', ur: 'Spot liq' }, back: { en: 'None — no borrowed margin.', ur: 'Nahi — no margin.' } },
      { front: { en: 'Spot main cost', ur: 'Cost' }, back: { en: 'Capital tied up 1:1.', ur: 'Capital 1:1.' } },
      { front: { en: 'Time pressure on spot', ur: 'Time' }, back: { en: 'Essentially none from expiry/funding.', ur: 'Expiry/funding nahi.' } },
      { front: { en: 'Spot zeroes when', ur: 'Zero' }, back: { en: 'Asset itself → zero (or you sell).', ur: 'Asset zero / sell.' } },
      { front: { en: 'Same chart ≠', ur: 'Chart' }, back: { en: 'Same product — check ownership.', ur: 'Ownership check.' } },
    ],
    quiz: [
      { q: { en: 'Spot liquidates when:', ur: 'Spot liq:' },
        opts: { en: ['Never via liq price — no borrow', 'Price −10%', 'Funding negative'], ur: ['No liq price', '−10%', 'Funding'] },
        correct: 0, explain: { en: 'No forced margin exit.', ur: 'No forced exit.' } },
      { q: { en: 'Spot vs derivatives cost:', ur: 'Cost:' },
        opts: { en: ['Capital inefficiency', 'Funding fees only', 'Only liq risk'], ur: ['Capital inefficiency', 'Funding only', 'Liq only'] },
        correct: 0, explain: { en: 'Full cash upfront.', ur: 'Full cash.' } },
      { q: { en: 'Time pressure on spot is:', ur: 'Time:' },
        opts: { en: ['Essentially zero from expiry/funding', 'Extreme', 'Same as perps'], ur: ['~Zero', 'Extreme', 'Same perps'] },
        correct: 0, explain: { en: 'No decay clock.', ur: 'No clock.' } },
      { q: { en: 'Chart twin of a perp means:', ur: 'Chart:' },
        opts: { en: ['Still check if you own the asset', 'Always identical risk', 'No fees ever'], ur: ['Check ownership', 'Same risk', 'No fees'] },
        correct: 0, explain: { en: 'Product ≠ picture.', ur: 'Product.' } },
    ],
  }),
  week({
    id: 2,
    title: { en: 'Spot vs Margin vs Perps', ur: 'Spot vs Margin vs Perps' },
    objective: {
      en: 'Compare failure modes — efficiency rises with ways to die.',
      ur: 'Failure modes — efficiency ↑ death ways ↑.',
    },
    teach: {
      en: `<p><strong>Spot:</strong> own it. <strong>Margin:</strong> borrow to buy more — interest + liquidation. <strong>Perps:</strong> synthetic via funding — never own, max efficiency, max death paths.</p>
<p>Pro pattern: core conviction spot; tactical derivatives sized by risk math. Amateur invert: life savings in 20×, dust in spot.</p>`,
      ur: `<p>Spot own. Margin borrow. Perps synthetic. Core spot, tactical lev — not ulta.</p>`,
    },
    workedExample: {
      en: `<p>Right direction, perp still dies on funding + wick liquidation — “right and ruined.”</p>`,
      ur: `<p>Direction sahi, funding + wick liq → ruined.</p>`,
    },
    commonMistake: {
      en: `<p>Choosing max leverage because capital feels small.</p>`,
      ur: `<p>Chhota capital → max lev.</p>`,
    },
    exitTicket: { en: 'You can list failure modes for spot vs perps.', ur: 'Spot vs perps failure modes.' },
    notebookPrompt: { en: 'Write your core vs tactical split rule.', ur: 'Core vs tactical split.' },
    flashcardSeeds: [
      { front: { en: 'Perp can lose while direction right via', ur: 'Perp lose' }, back: { en: 'Funding + liquidation wicks.', ur: 'Funding + wick.' } },
      { front: { en: 'Pro allocation', ur: 'Pro' }, back: { en: 'Core spot, tactical derivatives.', ur: 'Core spot, tactical deriv.' } },
      { front: { en: 'Margin adds', ur: 'Margin' }, back: { en: 'Interest + liquidation risk.', ur: 'Interest + liq.' } },
      { front: { en: 'Efficiency step up means', ur: 'Efficiency' }, back: { en: 'More ways to lose without wrong direction.', ur: 'Zyada death paths.' } },
      { front: { en: '20× life savings', ur: '20×' }, back: { en: 'Amateur invert pattern.', ur: 'Amateur invert.' } },
    ],
    quiz: [
      { q: { en: 'Perp can lose without wrong direction via:', ur: 'Perp:' },
        opts: { en: ['Funding and liquidation wicks', 'It can’t', 'Only hacks'], ur: ['Funding + wicks', 'Can’t', 'Hacks'] },
        correct: 0, explain: { en: 'Right and ruined possible.', ur: 'Right+ruined.' } },
      { q: { en: 'Professional pattern:', ur: 'Pro:' },
        opts: { en: ['Core spot, tactical derivatives', 'Everything 20×', 'All margin'], ur: ['Core spot', 'All 20×', 'All margin'] },
        correct: 0, explain: { en: 'Conviction ≠ leverage.', ur: 'Conviction.' } },
      { q: { en: 'Margin adds over spot:', ur: 'Margin:' },
        opts: { en: ['Interest + liquidation risk', 'No extras', 'Only maker rebates'], ur: ['Interest + liq', 'No extras', 'Rebates'] },
        correct: 0, explain: { en: 'Borrow not free.', ur: 'Borrow.' } },
      { q: { en: 'Max lev because account small is:', ur: 'Max lev:' },
        opts: { en: ['A common ruin path', 'Required', 'Risk-free'], ur: ['Ruin path', 'Required', 'Risk-free'] },
        correct: 0, explain: { en: 'Size down instead.', ur: 'Size down.' } },
    ],
  }),
  week({
    id: 3,
    title: { en: 'When Each Makes Sense', ur: 'Kab Kaun Sa' },
    objective: {
      en: 'Choose instrument by horizon and kill-conditions — not dogma.',
      ur: 'Horizon + kill-conditions — dogma nahi.',
    },
    teach: {
      en: `<p><strong>Spot</strong> when months+, survive vol, thesis = asset appreciates. <strong>Perps/futures</strong> when hours–weeks, need short, or hedge spot (short perps vs spot = insurance without selling).</p>
<p><strong>Margin</strong> rarely beats owning less spot or defined-risk derivatives. Test: “What kills this?” If answer ≠ only “thesis wrong,” you pay those risks.</p>`,
      ur: `<p>Spot = months+. Perps = short horizon / short / hedge. Margin rarely wins. “Kya maarta?” test.</p>`,
    },
    workedExample: {
      en: `<p>Hold spot, fear drawdown month → small short perp hedge, size defined — not flip to 20× long.</p>`,
      ur: `<p>Spot hold + chhota short hedge — 20× long flip nahi.</p>`,
    },
    commonMistake: {
      en: `<p>Using margin because “I need more size” without beating alternatives.</p>`,
      ur: `<p>Margin — “zyada size” bina alternative beat.</p>`,
    },
    exitTicket: { en: 'You can run the “what kills this?” test.', ur: '“Kya maarta?” test.' },
    notebookPrompt: { en: 'For next idea: instrument + kill list.', ur: 'Instrument + kill list.' },
    flashcardSeeds: [
      { front: { en: 'Short perps vs spot hold', ur: 'Hedge' }, back: { en: 'Temporary insurance without selling.', ur: 'Insurance bina sell.' } },
      { front: { en: 'Kill test', ur: 'Kill' }, back: { en: 'If not only thesis — you pay those risks.', ur: 'Thesis ke ilawa = pay risks.' } },
      { front: { en: 'Spot when', ur: 'Spot kab' }, back: { en: 'Months+ horizon, survive vol.', ur: 'Months+, survive vol.' } },
      { front: { en: 'Margin usually', ur: 'Margin' }, back: { en: 'Loses to less spot or defined-risk.', ur: 'Kam spot / defined-risk behtar.' } },
      { front: { en: 'Need more size', ur: 'Size' }, back: { en: 'Often means cut risk $ — not borrow.', ur: 'Risk$ cut — borrow nahi.' } },
    ],
    quiz: [
      { q: { en: 'Short perps against spot is:', ur: 'Hedge:' },
        opts: { en: ['A hedge without selling spot', 'Doubling risk always', 'Pointless'], ur: ['Hedge', 'Double always', 'Pointless'] },
        correct: 0, explain: { en: 'Insurance.', ur: 'Insurance.' } },
      { q: { en: '“What kills this?” catches:', ur: 'Kill:' },
        opts: { en: ['Hidden funding/expiry/wick risks', 'Only logos', 'Nothing'], ur: ['Hidden risks', 'Logos', 'Nothing'] },
        correct: 0, explain: { en: 'Pay for non-thesis risks.', ur: 'Non-thesis pay.' } },
      { q: { en: 'Spot fits best when:', ur: 'Spot:' },
        opts: { en: ['Horizon months+ and you want to survive vol', 'You need 50× tonight', 'You hate ownership'], ur: ['Months+ survive', '50× tonight', 'Hate own'] },
        correct: 0, explain: { en: 'Time on your side.', ur: 'Time side.' } },
      { q: { en: 'Margin “for more size” without beating alternatives:', ur: 'Margin:' },
        opts: { en: ['Usually a weak choice', 'Always optimal', 'Required by law'], ur: ['Weak', 'Optimal', 'Law'] },
        correct: 0, explain: { en: 'Own less or defined-risk.', ur: 'Own less.' } },
    ],
  }),
  week({
    id: 4,
    title: { en: 'Spot Process & Honesty', ur: 'Spot Process aur Honesty' },
    objective: {
      en: 'Default spot for core; derivatives only with written kill list + size.',
      ur: 'Core spot; deriv only with kill list + size.',
    },
    teach: {
      en: `<p>Loop: default spot for core → if derivatives, write kill list + risk % → log funding/interest → weekly review. Excitement is not a reason to leave spot.</p>
<p>Certificate = study record. Not a license to max leverage.</p>`,
      ur: `<p>Core spot → deriv = kill list + risk% → log → review. Cert = study record.</p>`,
    },
    workedExample: {
      en: `<p>Card: “Core spot only · no perps until kill list written · 1% tactical max.”</p>`,
      ur: `<p>Core spot · perps pehle kill list · 1% tactical max.</p>`,
    },
    commonMistake: {
      en: `<p>Leaving spot because “it isn’t exciting.”</p>`,
      ur: `<p>Bored → leave spot.</p>`,
    },
    exitTicket: { en: 'You can recite spot-first loop.', ur: 'Spot-first loop.' },
    notebookPrompt: { en: 'Six-bullet spot/deriv loop on Study desk.', ur: '6-bullet spot loop.' },
    flashcardSeeds: [
      { front: { en: 'Default for core', ur: 'Core' }, back: { en: 'Spot.', ur: 'Spot.' } },
      { front: { en: 'Before first perp', ur: 'Perp' }, back: { en: 'Write kill list + risk %.', ur: 'Kill list + risk%.' } },
      { front: { en: 'Excitement as reason', ur: 'Excitement' }, back: { en: 'Not a syllabus criterion.', ur: 'Syllabus nahi.' } },
      { front: { en: 'Certificate', ur: 'Cert' }, back: { en: 'Study progress — not max-lev license.', ur: 'Study — max-lev license nahi.' } },
      { front: { en: 'Weekly review asks', ur: 'Review' }, back: { en: 'Did funding/interest surprise me?', ur: 'Funding/interest surprise?' } },
    ],
    quiz: [
      { q: { en: 'Core book default:', ur: 'Core:' },
        opts: { en: ['Spot', 'Max perps', 'Ignore ownership'], ur: ['Spot', 'Max perps', 'Ignore'] },
        correct: 0, explain: { en: 'Ownership first.', ur: 'Ownership.' } },
      { q: { en: 'Before derivatives enter:', ur: 'Before:' },
        opts: { en: ['Kill list + risk size written', 'Vibes only', 'Tip channel OK'], ur: ['Kill list + size', 'Vibes', 'Tips'] },
        correct: 0, explain: { en: 'Process gate.', ur: 'Process.' } },
      { q: { en: 'Leaving spot for excitement is:', ur: 'Excitement:' },
        opts: { en: ['Not a valid syllabus reason', 'Required mastery', 'Risk-free'], ur: ['Invalid reason', 'Required', 'Risk-free'] },
        correct: 0, explain: { en: 'Boring survives.', ur: 'Boring.' } },
      { q: { en: 'This certificate means:', ur: 'Cert:' },
        opts: { en: ['Study progress — not leverage license', 'Broker license', 'Income'], ur: ['Study', 'Broker', 'Income'] },
        correct: 0, explain: { en: 'Honesty.', ur: 'Honesty.' } },
    ],
  }),
];

export const SPOT_DEEP_PLACEMENT = [
  { topic: 1, q: { en: 'Spot liq price:', ur: 'Liq:' }, opts: { en: ['None', 'Always −10%', 'Funding'], ur: ['None', '−10%', 'Funding'] }, correct: 0 },
  { topic: 1, q: { en: 'Spot cost:', ur: 'Cost:' }, opts: { en: ['Capital 1:1', 'Only funding', 'Only liq'], ur: ['1:1 capital', 'Funding', 'Liq'] }, correct: 0 },
  { topic: 2, q: { en: 'Pro pattern:', ur: 'Pro:' }, opts: { en: ['Core spot, tactical deriv', 'All 20×', 'All margin'], ur: ['Core spot', '20×', 'Margin'] }, correct: 0 },
  { topic: 2, q: { en: 'Perp right-direction loss:', ur: 'Perp:' }, opts: { en: ['Funding/wicks', 'Impossible', 'Only hacks'], ur: ['Funding/wicks', 'Impossible', 'Hacks'] }, correct: 0 },
  { topic: 3, q: { en: 'Kill test:', ur: 'Kill:' }, opts: { en: ['List non-thesis death paths', 'Skip', 'Only logo'], ur: ['Death paths', 'Skip', 'Logo'] }, correct: 0 },
  { topic: 3, q: { en: 'Short perps vs spot:', ur: 'Hedge:' }, opts: { en: ['Insurance without selling', 'Always double risk', 'Banned'], ur: ['Insurance', 'Double', 'Banned'] }, correct: 0 },
  { topic: 4, q: { en: 'Core default:', ur: 'Core:' }, opts: { en: ['Spot', 'Max lev', 'Ignore'], ur: ['Spot', 'Max lev', 'Ignore'] }, correct: 0 },
  { topic: 4, q: { en: 'Certificate:', ur: 'Cert:' }, opts: { en: ['Study record', 'Lev license', 'Income'], ur: ['Study', 'Lev license', 'Income'] }, correct: 0 },
];
