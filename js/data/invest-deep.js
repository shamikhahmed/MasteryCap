/* Investing literacy — condensed 6-part bar (v47 close).
   Evaluation frameworks. Never stock tips. Not income path. */

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

export const INVEST_DEEP_WEEKS = [
  week({
    id: 1,
    title: { en: 'Investing vs Trading', ur: 'Investing vs Trading' },
    objective: {
      en: 'Separate time-horizon games before capital mixes them.',
      ur: 'Horizon alag pehle — capital mix mat.',
    },
    teach: {
      en: `<p><strong>Trading</strong> profits from price moves over short horizons; <strong>investing</strong> from business performance over years. Charts answer trading questions; statements answer investing questions.</p>
<p>Retail’s rare edge is time — holding through what forces funds to sell — if behavior lets compounding run. Relabeling a failed trade as “long-term investment” is a refused stop in costume.</p>
<p>{{redflag:“This course → passive salary” is fantasy.}}</p>`,
      ur: `<p><strong>Trading</strong> short horizon pe price moves se profit; <strong>investing</strong> saalon mein business performance se. Charts trading sawal jawab dete; statements investing sawal.</p>
<p>Retail ka rare edge time hai — funds ko bechne wali pressure ke baghair hold karna — agar behavior compounding chalne de. Failed trade ko “long-term investment” relabel karna = refused stop loss costume mein.</p>
<p>{{redflag:“This course → passive salary” is fantasy.}}</p>`,
    },
    workedExample: {
      en: `<p>Before entry write: “This rupee plays investing / trading.” If red and you change label without new thesis — you broke the rule.</p>`,
      ur: `<p>Entry se pehle likho: “Ye rupee investing / trading khel raha hai.” Agar red ho aur bina nayi thesis label badlo — rule toot gaya.</p>`,
    },
    commonMistake: {
      en: `<p>Using one toolkit for both games.</p>`,
      ur: `<p>Ek toolkit dono games.</p>`,
    },
    exitTicket: { en: 'You can name which game a rupee is playing.', ur: 'Ek rupee kaun sa game khel raha hai — naam kar sakte ho.' },
    notebookPrompt: { en: 'Split paper capital: % investing vs % trading practice.', ur: 'Paper capital split: % investing vs % trading practice.' },
    flashcardSeeds: [
      { front: { en: 'Investing questions answered by', ur: 'Investing ke sawal kis se jawab milte hain' }, back: { en: 'Statements / business performance.', ur: 'Statements / business performance se jawab milta hai.' } },
      { front: { en: 'Trading questions answered by', ur: 'Trading ke sawal kis se jawab milte hain' }, back: { en: 'Price/structure over shorter horizons.', ur: 'Chhoti horizons pe price/structure se jawab milta hai.' } },
      { front: { en: 'Failed trade → “investment”', ur: 'Failed trade ko “investment” kehna' }, back: { en: 'Refused stop in costume.', ur: 'Refused stop ko naye label mein chhupana.' } },
      { front: { en: 'Retail structural edge', ur: 'Retail ka structural edge' }, back: { en: 'Time — if behavior holds.', ur: 'Time — behavior.' } },
      { front: { en: 'Course = income', ur: 'Course' }, back: { en: 'Fantasy marketing.', ur: 'Fantasy.' } },
    ],
    quiz: [
      { q: { en: 'Retail’s structural edge is mainly:', ur: 'Retail ka structural edge mainly kya hai:' },
        opts: { en: ['Time / patience asymmetry', 'Faster than institutions', 'Secret tips'], ur: ['Time', 'Faster', 'Tips'] },
        correct: 0, explain: { en: 'No redemption pressure if you hold.', ur: 'Hold karo to redemption pressure nahi hoti.' } },
      { q: { en: 'Relabeling a loser as long-term is:', ur: 'Loser ko long-term relabel karna kya hai:' },
        opts: { en: ['A refused stop loss in costume', 'Valid pivot always', 'Diversification'], ur: ['Costume stop', 'Valid', 'Diversify'] },
        correct: 0, explain: { en: 'Decide game before entry.', ur: 'Entry se pehle game decide karo.' } },
      { q: { en: 'Investing questions are answered by:', ur: 'Investing questions ka jawab kahan milta hai:' },
        opts: { en: ['Financial statements and business facts', 'Only candles', 'Only Telegram'], ur: ['Financial statements aur business facts dekho pehle', 'Candles', 'Telegram'] },
        correct: 0, explain: { en: 'Business over years.', ur: 'Business.' } },
      { q: { en: 'This track promises:', ur: 'Is track ka kya wada hai:' },
        opts: { en: ['Evaluation literacy — not tips or income', 'Hot stock list', 'Guaranteed 15%'], ur: ['Evaluation literacy hai — tips ya income nahi hai', 'Hot list', '15%'] },
        correct: 0, explain: { en: 'Honesty framing.', ur: 'Honesty.' } },
    ],
  }),
  week({
    id: 2,
    title: { en: 'Three Statements · Cash Is Fact', ur: 'Teen Statements · Cash Fact' },
    objective: {
      en: 'Use income, balance sheet, cash flow — profit opinion vs cash fact.',
      ur: 'Income, BS, CF — profit opinion, cash fact.',
    },
    teach: {
      en: `<p>Income statement: revenue, costs, profit. Balance sheet: owns vs owes. Cash flow: cash that moved — hardest to fake.</p>
<p><strong>Profit is an opinion; cash is a fact.</strong> Rising profits with shrinking operating cash for years is a red flag without a finance degree.</p>`,
      ur: `<p>Income statement: revenue, costs, profit. Balance sheet: owns vs owes. Cash flow: cash jo move hui — sab se mushkil fake karna.</p>
<p><strong>Profit raye hai; cash haqeeqat.</strong> Saalon tak rising profit + shrinking operating cash bina finance degree ke red flag hai.</p>`,
    },
    workedExample: {
      en: `<p>Before any practice buy of a name: open last annual + prior annual. Skim OCF vs net income trend.</p>`,
      ur: `<p>Kisi practice buy se pehle: last annual + prior annual kholo. OCF vs net income trend skim karo.</p>`,
    },
    commonMistake: {
      en: `<p>Buying on a tip without opening one filing.</p>`,
      ur: `<p>Tip pe buy — filing nahi.</p>`,
    },
    exitTicket: { en: 'You can recite profit vs cash one-liner.', ur: 'Profit vs cash ek line.' },
    notebookPrompt: { en: 'Pick one listed name. Note OCF vs profit for 2 years.', ur: 'Ek listed name chuno. 2 saal ke liye OCF vs profit note karo.' },
    flashcardSeeds: [
      { front: { en: 'Profit is an opinion; cash is', ur: 'Profit opinion hai; cash kya hai' }, back: { en: 'A fact.', ur: 'Fact.' } },
      { front: { en: 'Rising profit + falling OCF', ur: 'Profit badh rahi + OCF gir rahi' }, back: { en: 'Investigate — red flag pattern.', ur: 'Investigate karo — ye red flag pattern hai.' } },
      { front: { en: 'Balance sheet asks', ur: 'BS' }, back: { en: 'Can it survive a bad year?', ur: 'Bad year survive?' } },
      { front: { en: 'Where PSX filings live', ur: 'PSX filings kahan milti hain' }, back: { en: 'PSX / IR pages — read before buy.', ur: 'PSX / IR pages — khareedne se pehle parho.' } },
      { front: { en: 'Tip without filing', ur: 'Tip' }, back: { en: 'Not research.', ur: 'Research nahi.' } },
    ],
    quiz: [
      { q: { en: '“Profit is opinion, cash is fact” means:', ur: '“Profit is opinion, cash is fact” ka matlab:' },
        opts: { en: ['Earnings malleable; OCF harder to fake', 'Profits never lie', 'Cash irrelevant'], ur: ['Earnings malleable hain; OCF fake karna mushkil hai', 'Never lie', 'Cash irrelevant'] },
        correct: 0, explain: { en: 'Cash arrived or not.', ur: 'Cash aya ya nahi.' } },
      { q: { en: 'Years of rising profit + shrinking OCF:', ur: 'Saalon se rising profit + shrinking OCF ka matlab:' },
        opts: { en: ['Red flag to investigate', 'Always excellent', 'Ignore'], ur: ['Red flag', 'Excellent', 'Ignore'] },
        correct: 0, explain: { en: 'Integrity check.', ur: 'Integrity.' } },
      { q: { en: 'Before buying, a minimum habit is:', ur: 'Kharidne se pehle minimum habit kya hai:' },
        opts: { en: ['Read recent filings', 'Only watch YouTube', 'Max leverage'], ur: ['Filings', 'YouTube', 'Max lev'] },
        correct: 0, explain: { en: 'Statements first.', ur: 'Statements.' } },
      { q: { en: 'Cash flow statement mainly shows:', ur: 'Cash flow statement mainly kya dikhata hai:' },
        opts: { en: ['Actual cash movement', 'Only market rumors', 'Candles'], ur: ['Cash move', 'Rumors', 'Candles'] },
        correct: 0, explain: { en: 'Hardest to fake.', ur: 'Hard to fake.' } },
    ],
  }),
  week({
    id: 3,
    title: { en: 'PSX, Channels & Costs', ur: 'PSX, Channels, Costs' },
    objective: {
      en: 'Use legal channels; treat fees/taxes as first-class costs.',
      ur: 'Legal channels; fees/tax = cost.',
    },
    teach: {
      en: `<p>Access matters: regulated brokers, legal funding paths (esp. cross-border). Informal channels create legal risk that can dwarf returns.</p>
<p>Costs compound against you: brokerage, spreads, fund expense ratios, taxes. A “cheap” tip that ignores costs is not cheap.</p>
<p>{{redflag:Unlicensed tips + “guaranteed IPO allotment” = scam theater.}}</p>`,
      ur: `<p>Access matter karta: regulated brokers, legal funding paths (khaas taur pe cross-border). Informal channels legal risk add karte jo returns se bada ho sakta hai.</p>
<p>Costs aap ke khilaf compound: brokerage, spreads, fund expense ratios, taxes. “Cheap” tip jo costs ignore kare wo sach mein cheap nahi.</p>
<p>{{redflag:Unlicensed tips + “guaranteed IPO allotment” = scam theater.}}</p>`,
    },
    workedExample: {
      en: `<p>Compare two funds: identical story, 1.5% vs 0.3% expense — long horizon gap is huge before skill talk.</p>`,
      ur: `<p>Do funds compare: same story, 1.5% vs 0.3% expense — lambi horizon pe gap skill se pehle bada hota hai.</p>`,
    },
    commonMistake: {
      en: `<p>Chasing last year’s top fund as destiny.</p>`,
      ur: `<p>Last year top fund = destiny.</p>`,
    },
    exitTicket: { en: 'You can list three cost lines on your path.', ur: 'Apne path pe teen cost lines list kar sakte ho.' },
    notebookPrompt: { en: 'Write broker + fee line + legal funding note.', ur: 'Broker + fee + funding note.' },
    flashcardSeeds: [
      { front: { en: 'Informal FX funding for foreign brokers', ur: 'Foreign brokers ke liye informal FX funding' }, back: { en: 'Legal risk can dwarf returns.', ur: 'Legal risk returns se kahin zyada bari ho sakti hai.' } },
      { front: { en: 'Expense ratio', ur: 'ER' }, back: { en: 'Silent drag on compounding.', ur: 'Compounding pe chupka hua drag lagta hai.' } },
      { front: { en: 'Last year’s top fund', ur: 'Top fund' }, back: { en: 'Not destiny — costs + mean reversion.', ur: 'Destiny nahi — costs + mean reversion matter karte.' } },
      { front: { en: 'Guaranteed IPO allotment pitch', ur: 'Guaranteed IPO allotment wala pitch' }, back: { en: 'Scam theater.', ur: 'Scam.' } },
      { front: { en: 'Regulated broker habit', ur: 'Regulated broker ki habit' }, back: { en: 'Prefer licensed access.', ur: 'Licensed access prefer karo.' } },
    ],
    quiz: [
      { q: { en: 'Informal funding channels mainly add:', ur: 'Informal funding channels mainly kya add karte hain:' },
        opts: { en: ['Legal/compliance risk', 'Free alpha', 'Zero fees forever'], ur: ['Legal risk', 'Free alpha', 'Zero fees'] },
        correct: 0, explain: { en: 'Risk can dwarf return.', ur: 'Risk > return.' } },
      { q: { en: 'Fund expense ratios:', ur: 'Fund expense ratios kya hain:' },
        opts: { en: ['Drag compounding quietly', 'Only help returns', 'Are illegal'], ur: ['Drag', 'Help', 'Illegal'] },
        correct: 0, explain: { en: 'Cost is real.', ur: 'Cost real.' } },
      { q: { en: '“Guaranteed IPO allotment for a fee” is:', ur: '“Guaranteed IPO allotment for a fee” kya hai:' },
        opts: { en: ['A red-flag pitch', 'Normal SECP product', 'Risk-free'], ur: ['Red flag', 'SECP', 'Risk-free'] },
        correct: 0, explain: { en: 'Scam pattern.', ur: 'Scam.' } },
      { q: { en: 'Best first access habit:', ur: 'Pehli behtar access habit kya hai:' },
        opts: { en: ['Regulated broker + known fee schedule', 'Random tip group deposit', 'Max leverage day one'], ur: ['Regulated broker + known fee schedule hona chahiye', 'Tip group', 'Max lev'] },
        correct: 0, explain: { en: 'Rails first.', ur: 'Rails.' } },
    ],
  }),
  week({
    id: 4,
    title: { en: 'Investing Process & Honesty', ur: 'Investing Process aur Honesty' },
    objective: {
      en: 'Close with a boring loop: thesis → filings → size → hold rules → review.',
      ur: 'Thesis → filings → size → hold rules → review.',
    },
    teach: {
      en: `<p>Process: written thesis, filings check, position size from risk %, hold/exit rules before entry, journal, quarterly review. Tips are not a syllabus.</p>
<p>MasteryCap certificates are self-issued study records — not licenses, not advice, not income rights.</p>`,
      ur: `<p>Process: written thesis, filings check, position size risk % se, entry se pehle hold/exit rules, journal, quarterly review. Tips syllabus nahi hain.</p>
<p>MasteryCap certificates self-issued study records hain — licenses, advice, income rights nahi.</p>`,
    },
    workedExample: {
      en: `<p>Practice card: “One name · two filings · 1% risk · no tip entry · journal line.”</p>`,
      ur: `<p>Ek name · do filings · 1% · no tip · journal.</p>`,
    },
    commonMistake: {
      en: `<p>Skipping review because “I’m long-term.”</p>`,
      ur: `<p>Review skip — “long-term hoon.”</p>`,
    },
    exitTicket: { en: 'You can recite your investing practice loop.', ur: 'Apna investing practice loop yad kar ke bata sakte ho.' },
    notebookPrompt: { en: 'Six-bullet invest loop on Study desk.', ur: '6-bullet invest loop.' },
    flashcardSeeds: [
      { front: { en: 'Invest loop', ur: 'Loop' }, back: { en: 'Thesis → filings → size → rules → log → review.', ur: 'Thesis → filings → size → log → review.' } },
      { front: { en: 'Tips as syllabus', ur: 'Tips' }, back: { en: 'Not sufficient.', ur: 'Kaafi nahi.' } },
      { front: { en: 'Certificate here', ur: 'Cert' }, back: { en: 'Study progress — not a license.', ur: 'Study — license nahi.' } },
      { front: { en: 'Size from', ur: 'Size' }, back: { en: 'Risk % — not story heat.', ur: 'Risk % matter karta — story heat nahi.' } },
      { front: { en: 'Long-term skips review', ur: 'Long-term review skip karna' }, back: { en: 'Breaks the learning loop.', ur: 'Learning loop toot jata hai.' } },
    ],
    quiz: [
      { q: { en: 'Sober investing practice starts with:', ur: 'Sober investing practice kis se shuru hoti hai:' },
        opts: { en: ['Thesis + filings + risk size', 'Hot tip + max size', 'Ignore costs'], ur: ['Thesis + filings + size', 'Hot tip', 'Ignore costs'] },
        correct: 0, explain: { en: 'Process first.', ur: 'Process.' } },
      { q: { en: 'This certificate means:', ur: 'Is certificate ka matlab kya hai:' },
        opts: { en: ['Local study progress — not a credential', 'Advisor license', 'Income entitlement'], ur: ['Local study progress hai — credential nahi hai ye', 'License', 'Income'] },
        correct: 0, explain: { en: 'Honesty.', ur: 'Honesty.' } },
      { q: { en: 'Tips replace:', ur: 'Tips:' },
        opts: { en: ['Nothing — still need your process', 'All filings forever', 'Risk math'], ur: ['Kuch nahi — ab bhi tumhara process chahiye', 'All filings', 'Risk math'] },
        correct: 0, explain: { en: 'Tips ≠ syllabus.', ur: 'Tips ≠ syllabus.' } },
      { q: { en: 'After this track practice should be:', ur: 'Is track ke baad practice kya honi chahiye:' },
        opts: { en: ['Small, filed, rule-bound', 'All-in on tips', 'Signal-copy only'], ur: ['Small + filed', 'All-in tips', 'Signals'] },
        correct: 0, explain: { en: 'Process competence.', ur: 'Process.' } },
    ],
  }),
];

export const INVEST_DEEP_PLACEMENT = [
  { topic: 1, q: { en: 'Retail edge is mainly:', ur: 'Retail edge mainly kya hai:' }, opts: { en: ['Time/patience', 'Speed', 'Secrets'], ur: ['Time', 'Speed', 'Secrets'] }, correct: 0 },
  { topic: 1, q: { en: 'Failed trade → investment label:', ur: 'Failed trade ko investment label dena kya hai:' }, opts: { en: ['Costume stop', 'Always valid', 'Diversify'], ur: ['Costume stop', 'Valid', 'Diversify'] }, correct: 0 },
  { topic: 2, q: { en: 'Cash vs profit:', ur: 'Cash:' }, opts: { en: ['Cash is fact; profit malleable', 'Opposite', 'Same always'], ur: ['Cash fact hai profit manipulable ho sakti hai', 'Opposite', 'Same'] }, correct: 0 },
  { topic: 2, q: { en: 'Rising profit + falling OCF:', ur: 'Barhti profit aur girti OCF kya batati hai:' }, opts: { en: ['Red flag', 'Perfect', 'Ignore'], ur: ['Red flag', 'Perfect', 'Ignore'] }, correct: 0 },
  { topic: 3, q: { en: 'Informal funding adds:', ur: 'Informal funding kya add karti hai:' }, opts: { en: ['Legal risk', 'Free alpha', 'Zero cost'], ur: ['Legal risk', 'Alpha', 'Zero'] }, correct: 0 },
  { topic: 3, q: { en: 'Expense ratios:', ur: 'ER:' }, opts: { en: ['Drag compounding', 'Only help', 'Illegal'], ur: ['Drag', 'Help', 'Illegal'] }, correct: 0 },
  { topic: 4, q: { en: 'Invest loop starts with:', ur: 'Invest loop kis se shuru hoti hai:' }, opts: { en: ['Thesis + filings + size', 'Tips first', 'Max size'], ur: ['Thesis+filings', 'Tips', 'Max'] }, correct: 0 },
  { topic: 4, q: { en: 'Certificate means:', ur: 'Certificate ka matlab kya hai:' }, opts: { en: ['Study progress', 'License', 'Income'], ur: ['Study', 'License', 'Income'] }, correct: 0 },
];
