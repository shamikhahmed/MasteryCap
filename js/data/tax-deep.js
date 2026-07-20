/* Tax literacy — condensed 6-part bar (v47 close).
   Records + framing. Not legal advice. Not tax-free schemes. */

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

export const TAX_DEEP_WEEKS = [
  week({
    id: 1,
    title: { en: 'Tax Literacy Framing', ur: 'Tax Literacy Framing' },
    objective: {
      en: 'Treat this track as school framing — never filing advice or loophole sales.',
      ur: 'School framing — filing advice / loophole nahi.',
    },
    teach: {
      en: `<p>Tax literacy here means: know which documents you need, which questions to ask a qualified practitioner, and which pitches are fantasy.</p>
<p>This app does not file for you, auto-pay FBR, or issue legal opinions. Rules change; residency and facts matter.</p>
<p>{{redflag:“Tax-free forever scheme — deposit now” = scam theater.}}</p>`,
      ur: `<p>Documents + practitioner questions + scam refuse. App file/FBR/legal opinion nahi.</p>
<p>{{redflag:Tax-free forever scheme = scam.}}</p>`,
    },
    workedExample: {
      en: `<p>Before any “tax hack” video: write three questions for a practitioner — then stop DIY on complex facts.</p>`,
      ur: `<p>Teen practitioner questions likho — complex pe DIY band.</p>`,
    },
    commonMistake: {
      en: `<p>Copying Discord tax advice into your return.</p>`,
      ur: `<p>Discord tax advice copy.</p>`,
    },
    exitTicket: { en: 'You can say what this app will never do for tax.', ur: 'App tax pe kya nahi.' },
    notebookPrompt: { en: 'List: not advice / not filing / not guarantee.', ur: 'Not advice / filing / guarantee.' },
    flashcardSeeds: [
      { front: { en: 'This track is', ur: 'Track' }, back: { en: 'Literacy framing — not legal advice.', ur: 'Literacy — advice nahi.' } },
      { front: { en: 'App will not', ur: 'App' }, back: { en: 'File, auto-pay, or legal-opinion.', ur: 'File / auto-pay / opinion nahi.' } },
      { front: { en: 'Tax-free forever pitch', ur: 'Tax-free' }, back: { en: 'Scam theater.', ur: 'Scam.' } },
      { front: { en: 'Complex facts need', ur: 'Complex' }, back: { en: 'Qualified practitioner.', ur: 'Practitioner.' } },
      { front: { en: 'Discord tax tips', ur: 'Discord' }, back: { en: 'Not your filing authority.', ur: 'Authority nahi.' } },
    ],
    quiz: [
      { q: { en: 'This app’s tax role is:', ur: 'Role:' },
        opts: { en: ['Education framing only', 'Your accountant', 'FBR autopay'], ur: ['Education', 'Accountant', 'FBR'] },
        correct: 0, explain: { en: 'School only.', ur: 'School.' } },
      { q: { en: '“Tax-free forever, deposit now” is:', ur: 'Pitch:' },
        opts: { en: ['A red-flag scam pattern', 'Official policy', 'Risk-free'], ur: ['Scam pattern', 'Official', 'Risk-free'] },
        correct: 0, explain: { en: 'Refuse.', ur: 'Refuse.' } },
      { q: { en: 'Complex cross-border facts should go to:', ur: 'Complex:' },
        opts: { en: ['A qualified practitioner', 'Random group chats', 'Screenshot tips'], ur: ['Practitioner', 'Group chat', 'Screenshots'] },
        correct: 0, explain: { en: 'Facts need pros.', ur: 'Pros.' } },
      { q: { en: 'Copying Discord into a return is:', ur: 'Discord:' },
        opts: { en: ['Dangerous DIY', 'Best practice', 'Required'], ur: ['Dangerous', 'Best', 'Required'] },
        correct: 0, explain: { en: 'Authority mismatch.', ur: 'Mismatch.' } },
    ],
  }),
  week({
    id: 2,
    title: { en: 'Records Habit', ur: 'Records Habit' },
    objective: {
      en: 'Build a boring records stack before year-end panic.',
      ur: 'Records stack — year-end panic se pehle.',
    },
    teach: {
      en: `<p>Keep: trade confirms, broker statements, deposit/withdraw proofs, corporate action notes, crypto venue CSVs if any. Name files by year.</p>
<p>Good records shrink practitioner cost and fight “I forgot” disasters. Bad records turn small gains into expensive reconstructions.</p>`,
      ur: `<p>Confirms, statements, funding proofs, corp notes, crypto CSV. Year folders.</p>`,
    },
    workedExample: {
      en: `<p>Monthly: export broker CSV → folder <code>2026/broker/</code> → one-line journal “exports done.”</p>`,
      ur: `<p>Mahana export → year folder → journal tick.</p>`,
    },
    commonMistake: {
      en: `<p>Waiting until filing week to hunt screenshots.</p>`,
      ur: `<p>Filing week pe screenshot hunt.</p>`,
    },
    exitTicket: { en: 'You can list five record types you will keep.', ur: 'Paanch record types.' },
    notebookPrompt: { en: 'Create folder plan for this year’s broker exports.', ur: 'Is saal folder plan.' },
    flashcardSeeds: [
      { front: { en: 'Records reduce', ur: 'Records' }, back: { en: 'Practitioner cost + panic.', ur: 'Cost + panic.' } },
      { front: { en: 'Minimum stack', ur: 'Stack' }, back: { en: 'Confirms, statements, funding proofs.', ur: 'Confirms + statements + funding.' } },
      { front: { en: 'Crypto venues', ur: 'Crypto' }, back: { en: 'Export CSVs while you still can.', ur: 'CSV export.' } },
      { front: { en: 'Year-end screenshot hunt', ur: 'Hunt' }, back: { en: 'Expensive reconstruction.', ur: 'Mehnga.' } },
      { front: { en: 'Monthly habit', ur: 'Monthly' }, back: { en: 'Export + folder + journal tick.', ur: 'Export + folder + tick.' } },
    ],
    quiz: [
      { q: { en: 'Best records timing is:', ur: 'Timing:' },
        opts: { en: ['Ongoing / monthly', 'Only filing week', 'Never'], ur: ['Monthly', 'Filing week', 'Never'] },
        correct: 0, explain: { en: 'Boring beats panic.', ur: 'Boring.' } },
      { q: { en: 'Broker statements help because:', ur: 'Statements:' },
        opts: { en: ['They reconstruct activity for reviews/filings', 'They guarantee refunds', 'They replace laws'], ur: ['Reconstruct', 'Refunds', 'Replace laws'] },
        correct: 0, explain: { en: 'Evidence trail.', ur: 'Evidence.' } },
      { q: { en: 'Crypto CSV exports should be:', ur: 'CSV:' },
        opts: { en: ['Saved while accessible', 'Ignored forever', 'Posted publicly'], ur: ['Save now', 'Ignore', 'Public'] },
        correct: 0, explain: { en: 'Venues change.', ur: 'Venues change.' } },
      { q: { en: 'Skipping records until year-end usually:', ur: 'Skip:' },
        opts: { en: ['Raises cost and error risk', 'Saves money always', 'Is required'], ur: ['Cost/error up', 'Saves', 'Required'] },
        correct: 0, explain: { en: 'Reconstruction tax.', ur: 'Reconstruction.' } },
    ],
  }),
  week({
    id: 3,
    title: { en: 'Cross-Border & Crypto Caution', ur: 'Cross-Border aur Crypto' },
    objective: {
      en: 'Flag foreign brokerage/crypto as questions for pros — not YouTube residency.',
      ur: 'Foreign/crypto = pro questions — YouTube residency nahi.',
    },
    teach: {
      en: `<p>US stocks, foreign brokers, and crypto create cross-border questions: withholding, reporting, residency. Do not decide “I am invisible” from social media.</p>
<p>Funding foreign accounts must stay inside legal banking channels per applicable rules. Informal channels add legal risk that dwarfs investment return.</p>`,
      ur: `<p>Foreign/crypto = reporting questions. Invisible YouTube = no. Legal banking channels.</p>`,
    },
    workedExample: {
      en: `<p>Practitioner questions: “I hold X broker + Y crypto venue — what records and forms apply to my residency?”</p>`,
      ur: `<p>Pro se: broker + crypto + residency pe kaun se forms?</p>`,
    },
    commonMistake: {
      en: `<p>Assuming crypto is untaxable because it is digital.</p>`,
      ur: `<p>Crypto digital = tax-free assume.</p>`,
    },
    exitTicket: { en: 'You can name two cross-border questions for a pro.', ur: 'Do cross-border Q.' },
    notebookPrompt: { en: 'List venues you use + one question each for a practitioner.', ur: 'Venues + ek Q each.' },
    flashcardSeeds: [
      { front: { en: 'Foreign broker / crypto', ur: 'Foreign' }, back: { en: 'Ask a practitioner — don’t DIY residency.', ur: 'Practitioner — DIY residency nahi.' } },
      { front: { en: 'Informal funding', ur: 'Informal' }, back: { en: 'Legal risk can dwarf returns.', ur: 'Legal risk.' } },
      { front: { en: 'Digital = tax-free', ur: 'Digital' }, back: { en: 'False assumption.', ur: 'Jhoot assume.' } },
      { front: { en: 'YouTube residency takes', ur: 'YouTube' }, back: { en: 'Not authoritative.', ur: 'Authority nahi.' } },
      { front: { en: 'Withholding abroad', ur: 'Withholding' }, back: { en: 'Possible — ask with facts.', ur: 'Mumkin — facts se poocho.' } },
    ],
    quiz: [
      { q: { en: 'Foreign brokerage/crypto should trigger:', ur: 'Trigger:' },
        opts: { en: ['Practitioner questions with your facts', 'Ignore forever', 'Only tip groups'], ur: ['Practitioner Q', 'Ignore', 'Tips'] },
        correct: 0, explain: { en: 'Facts + pro.', ur: 'Facts + pro.' } },
      { q: { en: '“Crypto is untaxable because digital” is:', ur: 'Digital:' },
        opts: { en: ['A dangerous assumption', 'Universal law', 'App guarantee'], ur: ['Dangerous', 'Law', 'App'] },
        correct: 0, explain: { en: 'Verify locally.', ur: 'Local verify.' } },
      { q: { en: 'Informal funding channels:', ur: 'Informal:' },
        opts: { en: ['Can create legal risk > return', 'Are always safest', 'Remove all tax'], ur: ['Legal risk', 'Safest', 'No tax'] },
        correct: 0, explain: { en: 'Risk dwarfs return.', ur: 'Risk > return.' } },
      { q: { en: 'Best residency source is:', ur: 'Residency:' },
        opts: { en: ['Qualified advice on your facts', 'Viral threads', 'Broker ads'], ur: ['Qualified advice', 'Viral', 'Ads'] },
        correct: 0, explain: { en: 'Facts matter.', ur: 'Facts.' } },
    ],
  }),
  week({
    id: 4,
    title: { en: 'When to Hire · Scam Schemes', ur: 'Hire Kab · Scam Schemes' },
    objective: {
      en: 'Know hire triggers; refuse tax-free / recovery / unlock schemes.',
      ur: 'Hire triggers; tax-free / recovery / unlock refuse.',
    },
    teach: {
      en: `<p>Hire when: first meaningful market year, large unusual gains/losses, foreign/crypto accounts, unclear residency, conflicting docs.</p>
<p>Refuse: tax-free guarantees, recovery agents after loss, pay-to-unlock filing portals, Discord “secret sections.”</p>
<p>Graduation: records habit + practitioner on call when facts get complex. Wealth path stays clean paperwork — not evasion fantasy.</p>`,
      ur: `<p>Hire triggers: pehla meaningful saal, bari P/L, foreign/crypto, residency unclear. Scam refuse. Clean paperwork.</p>`,
    },
    workedExample: {
      en: `<p>Checklist card: records folder OK? hire triggers? any scam DM this month? → journal.</p>`,
      ur: `<p>Records? hire triggers? scam DM? → journal.</p>`,
    },
    commonMistake: {
      en: `<p>Paying a recovery agent to “fix” a tax or broker loss.</p>`,
      ur: `<p>Recovery agent ko tax/broker loss fix fee.</p>`,
    },
    exitTicket: { en: 'You can list three hire triggers + two scam refuses.', ur: 'Teen hire + do refuse.' },
    notebookPrompt: { en: 'Write hire triggers + never-pay list.', ur: 'Hire triggers + never-pay.' },
    flashcardSeeds: [
      { front: { en: 'Hire when', ur: 'Hire' }, back: { en: 'Complex facts / foreign / big unusual year.', ur: 'Complex / foreign / unusual.' } },
      { front: { en: 'Tax-free guarantee', ur: 'Guarantee' }, back: { en: 'Refuse — scam pattern.', ur: 'Refuse.' } },
      { front: { en: 'Recovery agent', ur: 'Recovery' }, back: { en: 'Often second scam.', ur: 'Second scam.' } },
      { front: { en: 'Graduation habit', ur: 'Grad' }, back: { en: 'Records + practitioner when complex.', ur: 'Records + pro.' } },
      { front: { en: 'Evasion fantasy', ur: 'Evasion' }, back: { en: 'Not a wealth path.', ur: 'Wealth path nahi.' } },
    ],
    quiz: [
      { q: { en: 'A hire trigger includes:', ur: 'Hire:' },
        opts: { en: ['Foreign/crypto accounts or unclear residency', 'Having a phone', 'Watching one video'], ur: ['Foreign/crypto/residency', 'Phone', 'One video'] },
        correct: 0, explain: { en: 'Complexity threshold.', ur: 'Complexity.' } },
      { q: { en: 'Pay-to-unlock tax portal DMs are:', ur: 'Unlock:' },
        opts: { en: ['Scam patterns — refuse', 'Official always', 'Required'], ur: ['Scam — refuse', 'Official', 'Required'] },
        correct: 0, explain: { en: 'Do not pay unlock.', ur: 'Unlock mat.' } },
      { q: { en: 'Wealth path honesty here means:', ur: 'Wealth:' },
        opts: { en: ['Clean records + real advice when needed', 'Evasion tricks', 'Guaranteed refunds'], ur: ['Clean records', 'Evasion', 'Guaranteed'] },
        correct: 0, explain: { en: 'Paperwork > fantasy.', ur: 'Paperwork.' } },
      { q: { en: 'This certificate means:', ur: 'Cert:' },
        opts: { en: ['Study progress — not a tax license', 'You may practice as CPA', 'Income entitlement'], ur: ['Study', 'CPA', 'Income'] },
        correct: 0, explain: { en: 'Honesty.', ur: 'Honesty.' } },
    ],
  }),
];

export const TAX_DEEP_PLACEMENT = [
  { topic: 1, q: { en: 'App tax role:', ur: 'Role:' }, opts: { en: ['Education only', 'Accountant', 'Autopay'], ur: ['Education', 'Accountant', 'Autopay'] }, correct: 0 },
  { topic: 1, q: { en: 'Tax-free forever pitch:', ur: 'Pitch:' }, opts: { en: ['Scam pattern', 'Official', 'Safe'], ur: ['Scam', 'Official', 'Safe'] }, correct: 0 },
  { topic: 2, q: { en: 'Records timing:', ur: 'Timing:' }, opts: { en: ['Ongoing/monthly', 'Only filing week', 'Never'], ur: ['Monthly', 'Filing', 'Never'] }, correct: 0 },
  { topic: 2, q: { en: 'Crypto CSVs:', ur: 'CSV:' }, opts: { en: ['Export while you can', 'Ignore', 'Public post'], ur: ['Export', 'Ignore', 'Public'] }, correct: 0 },
  { topic: 3, q: { en: 'Foreign/crypto means:', ur: 'Foreign:' }, opts: { en: ['Ask a practitioner', 'Ignore', 'Always untaxed'], ur: ['Practitioner', 'Ignore', 'Untaxed'] }, correct: 0 },
  { topic: 3, q: { en: 'Informal funding:', ur: 'Informal:' }, opts: { en: ['Legal risk', 'Safest', 'No tax'], ur: ['Legal risk', 'Safest', 'No tax'] }, correct: 0 },
  { topic: 4, q: { en: 'Hire when:', ur: 'Hire:' }, opts: { en: ['Complex/foreign/unusual year', 'Always never', 'Only if bored'], ur: ['Complex year', 'Never', 'Bored'] }, correct: 0 },
  { topic: 4, q: { en: 'Recovery agent after loss:', ur: 'Recovery:' }, opts: { en: ['Often second scam', 'Official', 'Required'], ur: ['Second scam', 'Official', 'Required'] }, correct: 0 },
];
