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
      ur: `<p><strong>Spot</strong> = asset khareedo, malik bano, ab settle. Funding clock nahi, margin call nahi, liquidation price nahi. Spot tab zero jab asset khud zero ho.</p>
<p>Cost: capital inefficiency — $1 exposure ke liye ~$1 chahiye. Feature lambi horizon conviction ke liye: overexposure mushkil; leverage mistake-class hata di.</p>`,
    },
    workedExample: {
      en: `<p>Wrong for a year in spot can recover; wrong an hour in leverage can cease to exist.</p>`,
      ur: `<p>Spot galat saal → recover mumkin. Lev galat ghanta → khatam.</p>`,
    },
    commonMistake: {
      en: `<p>Calling leveraged IOUs “spot” because the chart looks the same.</p>`,
      ur: `<p>Leveraged IOU ko “spot” kehna kyunki chart same dikhe.</p>`,
    },
    exitTicket: { en: 'You can name three things spot does not have.', ur: 'Teen cheezen spot mein nahi.' },
    notebookPrompt: { en: 'Write: my core book is spot / mix — and why.', ur: 'Likho: mera core book spot / mix hai — aur kyun.' },
    flashcardSeeds: [
      { front: { en: 'Spot liquidation price', ur: 'Spot liquidation price' }, back: { en: 'None — no borrowed margin.', ur: 'Nahi — no margin.' } },
      { front: { en: 'Spot main cost', ur: 'Cost' }, back: { en: 'Capital tied up 1:1.', ur: 'Capital 1:1.' } },
      { front: { en: 'Time pressure on spot', ur: 'Spot pe time pressure' }, back: { en: 'Essentially none from expiry/funding.', ur: 'Expiry/funding se essentially koi pressure nahi.' } },
      { front: { en: 'Spot zeroes when', ur: 'Zero' }, back: { en: 'Asset itself → zero (or you sell).', ur: 'Asset khud zero ho sakti (ya tum bech do).' } },
      { front: { en: 'Same chart ≠', ur: 'Chart' }, back: { en: 'Same product — check ownership.', ur: 'Same product lag sakta — ownership check karo.' } },
    ],
    quiz: [
      { q: { en: 'Spot liquidates when:', ur: 'Spot kab liquidate hota hai:' },
        opts: { en: ['Never via liq price — no borrow', 'Price −10%', 'Funding negative'], ur: ['Kabhi liq price se nahi — borrow nahi hota spot mein', '−10%', 'Funding'] },
        correct: 0, explain: { en: 'No forced margin exit.', ur: 'No forced exit.' } },
      { q: { en: 'Spot vs derivatives cost:', ur: 'Spot vs derivatives cost mein farq:' },
        opts: { en: ['Capital inefficiency', 'Funding fees only', 'Only liq risk'], ur: ['Capital inefficiency', 'Funding only', 'Liq only'] },
        correct: 0, explain: { en: 'Full cash upfront.', ur: 'Full cash.' } },
      { q: { en: 'Time pressure on spot is:', ur: 'Spot pe time pressure kya hai:' },
        opts: { en: ['Essentially zero from expiry/funding', 'Extreme', 'Same as perps'], ur: ['Expiry/funding se essentially zero carry hota hai', 'Extreme', 'Same perps'] },
        correct: 0, explain: { en: 'No decay clock.', ur: 'No clock.' } },
      { q: { en: 'Chart twin of a perp means:', ur: 'Perp ka chart twin ka matlab:' },
        opts: { en: ['Still check if you own the asset', 'Always identical risk', 'No fees ever'], ur: ['Ab bhi check karo ke asset tumhari hai ya nahi', 'Same risk', 'No fees'] },
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
      ur: `<p><strong>Spot:</strong> own karo. <strong>Margin:</strong> zyada khareedne ke liye borrow — interest + liquidation. <strong>Perps:</strong> funding se synthetic — kabhi own nahi, max efficiency, max death paths.</p>
<p>Pro pattern: core conviction spot; tactical derivatives risk math se sized. Amateur invert: life savings 20× mein, spot mein dust.</p>`,
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
      { front: { en: 'Perp can lose while direction right via', ur: 'Perp direction sahi hone ke bawajood kaise haar sakta' }, back: { en: 'Funding + liquidation wicks.', ur: 'Funding + liquidation wicks se nuqsan ho sakta.' } },
      { front: { en: 'Pro allocation', ur: 'Pro' }, back: { en: 'Core spot, tactical derivatives.', ur: 'Core spot, tactical deriv.' } },
      { front: { en: 'Margin adds', ur: 'Margin' }, back: { en: 'Interest + liquidation risk.', ur: 'Interest + liquidation risk dono lagte hain.' } },
      { front: { en: 'Efficiency step up means', ur: 'Efficiency step up ka matlab kya hai' }, back: { en: 'More ways to lose without wrong direction.', ur: 'Galat direction ke bina haarnay ke zyada tareeqe.' } },
      { front: { en: '20× life savings', ur: '20×' }, back: { en: 'Amateur invert pattern.', ur: 'Amateur invert.' } },
    ],
    quiz: [
      { q: { en: 'Perp can lose without wrong direction via:', ur: 'Perp galat direction ke bina nuksan de sakta hai via:' },
        opts: { en: ['Funding and liquidation wicks', 'It can’t', 'Only hacks'], ur: ['Funding + wicks', 'Can’t', 'Hacks'] },
        correct: 0, explain: { en: 'Right and ruined possible.', ur: 'Direction sahi aur phir bhi ruin mumkin hai.' } },
      { q: { en: 'Professional pattern:', ur: 'Professional pattern kya hai:' },
        opts: { en: ['Core spot, tactical derivatives', 'Everything 20×', 'All margin'], ur: ['Core spot rakho, tactical derivatives alag rakho', 'All 20×', 'All margin'] },
        correct: 0, explain: { en: 'Conviction ≠ leverage.', ur: 'Conviction leverage ke barabar nahi hoti.' } },
      { q: { en: 'Margin adds over spot:', ur: 'Margin spot ke upar kya add karta hai:' },
        opts: { en: ['Interest + liquidation risk', 'No extras', 'Only maker rebates'], ur: ['Interest + liq', 'No extras', 'Rebates'] },
        correct: 0, explain: { en: 'Borrow not free.', ur: 'Borrow.' } },
      { q: { en: 'Max lev because account small is:', ur: 'Account chhota hai is liye max lev kya hai:' },
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
      ur: `<p><strong>Spot</strong> jab months+, vol survive, thesis = asset appreciate. <strong>Perps/futures</strong> jab hours–weeks, short chahiye, ya spot hedge (short perps vs spot = insurance bina bechne ke).</p>
<p><strong>Margin</strong> kam spot ya defined-risk derivatives beat karta hai. Test: “Kya maarta hai?” Agar jawab sirf “thesis wrong” nahi, wo risks pay karte ho.</p>`,
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
      { front: { en: 'Short perps vs spot hold', ur: 'Short perps vs spot hold' }, back: { en: 'Temporary insurance without selling.', ur: 'Insurance bina sell.' } },
      { front: { en: 'Kill test', ur: 'Kill' }, back: { en: 'If not only thesis — you pay those risks.', ur: 'Thesis ke ilawa = pay risks.' } },
      { front: { en: 'Spot when', ur: 'Spot kab' }, back: { en: 'Months+ horizon, survive vol.', ur: 'Months+, survive vol.' } },
      { front: { en: 'Margin usually', ur: 'Margin' }, back: { en: 'Loses to less spot or defined-risk.', ur: 'Kam spot / defined-risk behtar.' } },
      { front: { en: 'Need more size', ur: 'Size' }, back: { en: 'Often means cut risk $ — not borrow.', ur: 'Risk$ cut — borrow nahi.' } },
    ],
    quiz: [
      { q: { en: 'Short perps against spot is:', ur: 'Spot ke khilaf short perps kya hai:' },
        opts: { en: ['A hedge without selling spot', 'Doubling risk always', 'Pointless'], ur: ['Hedge', 'Double always', 'Pointless'] },
        correct: 0, explain: { en: 'Insurance.', ur: 'Insurance.' } },
      { q: { en: '“What kills this?” catches:', ur: '“What kills this?” kya pakadta hai:' },
        opts: { en: ['Hidden funding/expiry/wick risks', 'Only logos', 'Nothing'], ur: ['Chhupi funding/expiry/wick risks hain derivatives mein', 'Logos', 'Nothing'] },
        correct: 0, explain: { en: 'Pay for non-thesis risks.', ur: 'Non-thesis pay.' } },
      { q: { en: 'Spot fits best when:', ur: 'Spot sab se fit kab hota hai jab:' },
        opts: { en: ['Horizon months+ and you want to survive vol', 'You need 50× tonight', 'You hate ownership'], ur: ['Horizon months+ ho aur vol survive karna ho to spot', '50× tonight', 'Hate own'] },
        correct: 0, explain: { en: 'Time on your side.', ur: 'Time side.' } },
      { q: { en: 'Margin “for more size” without beating alternatives:', ur: 'Margin “for more size” bina alternatives beat kiye kya hai:' },
        opts: { en: ['Usually a weak choice', 'Always optimal', 'Required by law'], ur: ['Weak', 'Optimal', 'Law'] },
        correct: 0, explain: { en: 'Own less or defined-risk.', ur: 'Kam own karo ya defined-risk use karo.' } },
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
      ur: `<p>Loop: core ke liye default spot → agar derivatives, kill list + risk % likho → funding/interest log → weekly review. Excitement spot chhorne ka reason nahi.</p>
<p>Certificate = study record. Max leverage license nahi.</p>`,
    },
    workedExample: {
      en: `<p>Card: “Core spot only · no perps until kill list written · 1% tactical max.”</p>`,
      ur: `<p>Core spot · perps pehle kill list · 1% tactical max.</p>`,
    },
    commonMistake: {
      en: `<p>Leaving spot because “it isn’t exciting.”</p>`,
      ur: `<p>Spot chhorna kyunki “exciting nahi.”</p>`,
    },
    exitTicket: { en: 'You can recite spot-first loop.', ur: 'Spot-first loop.' },
    notebookPrompt: { en: 'Six-bullet spot/deriv loop on Study desk.', ur: 'Study desk pe six-bullet spot/deriv loop likho.' },
    flashcardSeeds: [
      { front: { en: 'Default for core', ur: 'Core' }, back: { en: 'Spot.', ur: 'Spot.' } },
      { front: { en: 'Before first perp', ur: 'Perp' }, back: { en: 'Write kill list + risk %.', ur: 'Kill list + risk%.' } },
      { front: { en: 'Excitement as reason', ur: 'Excitement' }, back: { en: 'Not a syllabus criterion.', ur: 'Syllabus nahi.' } },
      { front: { en: 'Certificate', ur: 'Cert' }, back: { en: 'Study progress — not max-lev license.', ur: 'Study — max-lev license nahi.' } },
      { front: { en: 'Weekly review asks', ur: 'Review' }, back: { en: 'Did funding/interest surprise me?', ur: 'Funding/interest surprise?' } },
    ],
    quiz: [
      { q: { en: 'Core book default:', ur: 'Core book default kya hai:' },
        opts: { en: ['Spot', 'Max perps', 'Ignore ownership'], ur: ['Spot', 'Max perps', 'Ignore'] },
        correct: 0, explain: { en: 'Ownership first.', ur: 'Ownership.' } },
      { q: { en: 'Before derivatives enter:', ur: 'Derivatives enter karne se pehle:' },
        opts: { en: ['Kill list + risk size written', 'Vibes only', 'Tip channel OK'], ur: ['Kill list + size', 'Vibes', 'Tips'] },
        correct: 0, explain: { en: 'Process gate.', ur: 'Process.' } },
      { q: { en: 'Leaving spot for excitement is:', ur: 'Excitement ke liye spot chhorna kya hai:' },
        opts: { en: ['Not a valid syllabus reason', 'Required mastery', 'Risk-free'], ur: ['Invalid reason', 'Required', 'Risk-free'] },
        correct: 0, explain: { en: 'Boring survives.', ur: 'Boring.' } },
      { q: { en: 'This certificate means:', ur: 'Is certificate ka matlab kya hai:' },
        opts: { en: ['Study progress — not leverage license', 'Broker license', 'Income'], ur: ['Study progress hai — leverage license nahi hai', 'Broker', 'Income'] },
        correct: 0, explain: { en: 'Honesty.', ur: 'Honesty.' } },
    ],
  }),
];

export const SPOT_DEEP_PLACEMENT = [
  { topic: 1, q: { en: 'Spot liq price:', ur: 'Liq:' }, opts: { en: ['None', 'Always −10%', 'Funding'], ur: ['None', '−10%', 'Funding'] }, correct: 0 },
  { topic: 1, q: { en: 'Spot cost:', ur: 'Cost:' }, opts: { en: ['Capital 1:1', 'Only funding', 'Only liq'], ur: ['1:1 capital', 'Funding', 'Liq'] }, correct: 0 },
  { topic: 2, q: { en: 'Pro pattern:', ur: 'Pro:' }, opts: { en: ['Core spot, tactical deriv', 'All 20×', 'All margin'], ur: ['Core spot rakho tactical derivatives sirf tactical ke liye', '20×', 'Margin'] }, correct: 0 },
  { topic: 2, q: { en: 'Perp right-direction loss:', ur: 'Perp sahi direction pe bhi loss kyun ho sakta hai:' }, opts: { en: ['Funding/wicks', 'Impossible', 'Only hacks'], ur: ['Funding/wicks', 'Impossible', 'Hacks'] }, correct: 0 },
  { topic: 3, q: { en: 'Kill test:', ur: 'Kill:' }, opts: { en: ['List non-thesis death paths', 'Skip', 'Only logo'], ur: ['Non-thesis death paths list karo pehle se soch kar', 'Skip', 'Logo'] }, correct: 0 },
  { topic: 3, q: { en: 'Short perps vs spot:', ur: 'Short perps vs spot mein farq kya hai:' }, opts: { en: ['Insurance without selling', 'Always double risk', 'Banned'], ur: ['Bina bechna insurance jaisa hedge hota hai ye', 'Double', 'Banned'] }, correct: 0 },
  { topic: 4, q: { en: 'Core default:', ur: 'Core:' }, opts: { en: ['Spot', 'Max lev', 'Ignore'], ur: ['Spot', 'Max lev', 'Ignore'] }, correct: 0 },
  { topic: 4, q: { en: 'Certificate:', ur: 'Cert:' }, opts: { en: ['Study record', 'Lev license', 'Income'], ur: ['Study', 'Lev license', 'Income'] }, correct: 0 },
];
