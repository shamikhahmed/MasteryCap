/* Bots & copy — elective warn-first 6-part bar (v48).
   Scam defense + realistic automation. Never buy a profit bot. */

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

export const BOTS_DEEP_WEEKS = [
  week({
    id: 1,
    title: { en: 'What Bots Actually Are', ur: 'Bots Asal Mein Kya Hain' },
    objective: {
      en: 'See bots as rule executors — not magic income machines.',
      ur: 'Bots = rule executors — magic income nahi.',
    },
    teach: {
      en: `<p>A trading bot runs <strong>pre-written rules</strong> on a venue API or UI. It does not invent edge. Bad rules + leverage = faster ruin. Good automation removes click delay — it does not remove risk.</p>
<p>{{redflag:“Guaranteed monthly bot profit — API key please” = theft/scam pattern.}}</p>`,
      ur: `<p>Bot = likhi rules. Edge invent nahi. Bad rules = tez ruin.</p>
<p>{{redflag:Guaranteed bot profit + API key = scam.}}</p>`,
    },
    workedExample: {
      en: `<p>API key with withdraw permission given to “signal bot” → funds leave. Read-only keys still leak strategy; withdraw keys = nuclear.</p>`,
      ur: `<p>Withdraw API key share = funds gone risk.</p>`,
    },
    commonMistake: {
      en: `<p>Buying a “profit bot” instead of writing risk rules you understand.</p>`,
      ur: `<p>Profit bot kharidna — risk rules nahi.</p>`,
    },
    exitTicket: { en: 'You can say what a bot cannot invent.', ur: 'Bot kya invent nahi.' },
    notebookPrompt: { en: 'Write: I will never share withdraw-capable keys.', ur: 'Withdraw keys kabhi share nahi.' },
    flashcardSeeds: [
      { front: { en: 'A bot is', ur: 'Bot' }, back: { en: 'A rule executor — not a brain with edge.', ur: 'Rule executor.' } },
      { front: { en: 'Withdraw API key share', ur: 'API' }, back: { en: 'Theft/scam risk — refuse.', ur: 'Theft risk — refuse.' } },
      { front: { en: 'Guaranteed bot profit', ur: 'Guarantee' }, back: { en: 'Fantasy / scam pitch.', ur: 'Fantasy / scam.' } },
      { front: { en: 'Automation removes', ur: 'Auto' }, back: { en: 'Click delay — not risk.', ur: 'Delay — risk nahi.' } },
      { front: { en: 'Elective warning', ur: 'Elective' }, back: { en: 'Eyes open — not on credit path.', ur: 'Eyes open.' } },
    ],
    quiz: [
      { q: { en: 'Trading bots mainly:', ur: 'Bots:' },
        opts: { en: ['Execute rules you (or a vendor) defined', 'Guarantee alpha', 'Delete liquidation'], ur: ['Execute rules', 'Guarantee alpha', 'Delete liq'] },
        correct: 0, explain: { en: 'Rules in, risk remains.', ur: 'Rules.' } },
      { q: { en: 'Sharing withdraw API keys is:', ur: 'API:' },
        opts: { en: ['Extremely dangerous', 'Required for learning', 'Risk-free'], ur: ['Dangerous', 'Required', 'Risk-free'] },
        correct: 0, explain: { en: 'Refuse.', ur: 'Refuse.' } },
      { q: { en: '“Guaranteed bot income” is:', ur: 'Guarantee:' },
        opts: { en: ['A red-flag pitch', 'Normal SECP product', 'Risk-free'], ur: ['Red flag', 'SECP', 'Risk-free'] },
        correct: 0, explain: { en: 'Scam pattern.', ur: 'Scam.' } },
      { q: { en: 'This elective teaches:', ur: 'Elective:' },
        opts: { en: ['Defense literacy — not endorsement', 'How to get rich weekly', 'Broker license'], ur: ['Defense literacy', 'Get rich', 'License'] },
        correct: 0, explain: { en: 'Warn-first.', ur: 'Warn-first.' } },
    ],
  }),
  week({
    id: 2,
    title: { en: 'Grid, DCA & Copy Traps', ur: 'Grid, DCA, Copy Traps' },
    objective: {
      en: 'Name failure modes of grid/DCA/copy before depositing.',
      ur: 'Grid/DCA/copy failure modes pehle.',
    },
    teach: {
      en: `<p><strong>Grid</strong> loves ranges, dies in trends. <strong>DCA bots</strong> average into falling knives if unbounded. <strong>Copy trading</strong> imports someone else’s sizing, latency, and undisclosed conflicts — past screenshots ≠ your future.</p>`,
      ur: `<p>Grid = range OK, trend kill. DCA unbounded = knife. Copy = unka size + conflict.</p>`,
    },
    workedExample: {
      en: `<p>Copy leader uses 20×; you copy “same signals” on smaller account → different ruin math.</p>`,
      ur: `<p>Leader 20× copy → tumhari ruin math alag.</p>`,
    },
    commonMistake: {
      en: `<p>Assuming copy P/L screenshots are live, complete, and unlevered.</p>`,
      ur: `<p>Screenshot P/L = complete truth.</p>`,
    },
    exitTicket: { en: 'You can name one kill condition for grid and for copy.', ur: 'Grid + copy kill.' },
    notebookPrompt: { en: 'Write max drawdown kill switch before any bot deposit.', ur: 'Max DD kill switch.' },
    flashcardSeeds: [
      { front: { en: 'Grid fails in', ur: 'Grid' }, back: { en: 'Strong trends / one-way markets.', ur: 'Strong trends.' } },
      { front: { en: 'Unbounded DCA', ur: 'DCA' }, back: { en: 'Can average into ruin.', ur: 'Ruin average.' } },
      { front: { en: 'Copy trading imports', ur: 'Copy' }, back: { en: 'Their size, latency, conflicts.', ur: 'Size + latency + conflict.' } },
      { front: { en: 'Screenshot P/L', ur: 'Screenshot' }, back: { en: 'Not proof of your future.', ur: 'Future proof nahi.' } },
      { front: { en: 'Kill switch', ur: 'Kill' }, back: { en: 'Hard stop on DD / errors.', ur: 'DD / errors stop.' } },
    ],
    quiz: [
      { q: { en: 'Grid bots struggle most in:', ur: 'Grid:' },
        opts: { en: ['Strong one-way trends', 'Perfect ranges forever', 'Zero volatility utopias'], ur: ['Strong trends', 'Perfect ranges', 'Zero vol'] },
        correct: 0, explain: { en: 'Inventory wrong-way.', ur: 'Wrong-way.' } },
      { q: { en: 'Copy trading risk includes:', ur: 'Copy:' },
        opts: { en: ['Mismatched sizing and hidden conflicts', 'Guaranteed matching fills', 'No latency'], ur: ['Size + conflicts', 'Guaranteed fills', 'No latency'] },
        correct: 0, explain: { en: 'Not your book.', ur: 'Not your book.' } },
      { q: { en: 'Unbounded DCA into a crash:', ur: 'DCA:' },
        opts: { en: ['Can accelerate losses', 'Always wins', 'Deletes risk'], ur: ['Accelerate loss', 'Always wins', 'Deletes risk'] },
        correct: 0, explain: { en: 'Bounds required.', ur: 'Bounds.' } },
      { q: { en: 'Before any bot deposit set:', ur: 'Before:' },
        opts: { en: ['Kill switch / max DD', 'Max leverage only', 'Disable 2FA'], ur: ['Kill switch', 'Max lev', '2FA off'] },
        correct: 0, explain: { en: 'Survival rail.', ur: 'Rail.' } },
    ],
  }),
  week({
    id: 3,
    title: { en: 'Backtests, Signals & Gurus', ur: 'Backtests, Signals, Gurus' },
    objective: {
      en: 'Treat perfect backtests and paid signal groups as marketing until proven otherwise.',
      ur: 'Perfect backtest + paid signals = marketing until proven.',
    },
    teach: {
      en: `<p><strong>Overfitting</strong> makes curves beautiful and live ugly. Paid gurus sell certainty; markets sell variance. Signal groups hide losers, delay fills, and push affiliates.</p>
<p>{{redflag:Pay to unlock “VIP bot settings” after a loss = second trap.}}</p>`,
      ur: `<p>Overfit curve ≠ live. Signal groups losers chhupate. Unlock VIP after loss = trap.</p>
<p>{{redflag:VIP unlock after loss = second trap.}}</p>`,
    },
    workedExample: {
      en: `<p>Backtest 90% win rate, no fees/slippage, one market regime → live fails week one.</p>`,
      ur: `<p>90% backtest bina fees → live fail.</p>`,
    },
    commonMistake: {
      en: `<p>Paying more after a loss to “upgrade the bot.”</p>`,
      ur: `<p>Loss ke baad bot upgrade fee.</p>`,
    },
    exitTicket: { en: 'You can name two backtest lies.', ur: 'Do backtest lies.' },
    notebookPrompt: { en: 'Never-pay list: unlock fees, VIP bots, recovery agents.', ur: 'Never-pay list.' },
    flashcardSeeds: [
      { front: { en: 'Overfitting', ur: 'Overfit' }, back: { en: 'Curve fit past — fails live.', ur: 'Past fit — live fail.' } },
      { front: { en: 'Backtest without fees/slip', ur: 'Backtest' }, back: { en: 'Fantasy P/L.', ur: 'Fantasy.' } },
      { front: { en: 'Signal group', ur: 'Signals' }, back: { en: 'Selection bias + latency.', ur: 'Bias + latency.' } },
      { front: { en: 'VIP unlock after loss', ur: 'VIP' }, back: { en: 'Second trap — refuse.', ur: 'Second trap.' } },
      { front: { en: 'Guru certainty', ur: 'Guru' }, back: { en: 'Sales — not your risk system.', ur: 'Sales.' } },
    ],
    quiz: [
      { q: { en: 'Beautiful backtests often hide:', ur: 'Backtest:' },
        opts: { en: ['Overfit + missing costs', 'Guaranteed live edge', 'Zero risk'], ur: ['Overfit + costs', 'Live edge', 'Zero risk'] },
        correct: 0, explain: { en: 'Skepticism.', ur: 'Skepticism.' } },
      { q: { en: 'Paying unlock fees after a bot loss is:', ur: 'Unlock:' },
        opts: { en: ['A common second scam', 'Required recovery', 'SECP process'], ur: ['Second scam', 'Recovery', 'SECP'] },
        correct: 0, explain: { en: 'Refuse.', ur: 'Refuse.' } },
      { q: { en: 'Signal groups often omit:', ur: 'Signals:' },
        opts: { en: ['Losers and realistic fills', 'All marketing', 'Nothing'], ur: ['Losers + fills', 'All marketing', 'Nothing'] },
        correct: 0, explain: { en: 'Bias.', ur: 'Bias.' } },
      { q: { en: 'Best stance on paid gurus:', ur: 'Gurus:' },
        opts: { en: ['Skeptical — verify process yourself', 'Blind trust', 'Share all keys'], ur: ['Skeptical', 'Blind trust', 'Share keys'] },
        correct: 0, explain: { en: 'Your risk system.', ur: 'Your system.' } },
    ],
  }),
  week({
    id: 4,
    title: { en: 'Realistic Retail Automation', ur: 'Realistic Retail Automation' },
    objective: {
      en: 'Automate alerts/journaling first; never outsource risk rules you cannot state.',
      ur: 'Alerts/journal pehle; risk rules bina samajh outsource nahi.',
    },
    teach: {
      en: `<p>Realistic stack: alerts, position size calculators, journal exports, maybe simple bounded DCA with hard caps. Live discretionary still needs a human kill switch.</p>
<p>Elective complete ≠ endorsement. Certificate = study record. Do not buy profit bots.</p>`,
      ur: `<p>Alerts + size calc + journal + bounded DCA. Kill switch human. Profit bot mat kharido.</p>`,
    },
    workedExample: {
      en: `<p>Card: “Alert only · no API trade · max DD 2% paper first · no copy.”</p>`,
      ur: `<p>Alert only · no API trade · 2% DD paper · no copy.</p>`,
    },
    commonMistake: {
      en: `<p>Full API autopilot on day one with life savings.</p>`,
      ur: `<p>Din 1 pe life savings API autopilot.</p>`,
    },
    exitTicket: { en: 'You can recite a safe automation ladder.', ur: 'Safe automation ladder.' },
    notebookPrompt: { en: 'Six-bullet bots defense loop on Study desk.', ur: '6-bullet bots loop.' },
    flashcardSeeds: [
      { front: { en: 'Automation ladder', ur: 'Ladder' }, back: { en: 'Alerts → paper → tiny bounded → never unlock fees.', ur: 'Alerts → paper → tiny → no unlock.' } },
      { front: { en: 'Profit bot purchase', ur: 'Profit bot' }, back: { en: 'Refuse — not literacy.', ur: 'Refuse.' } },
      { front: { en: 'Kill switch owner', ur: 'Kill' }, back: { en: 'You — not the vendor chat.', ur: 'Tum — vendor nahi.' } },
      { front: { en: 'Certificate', ur: 'Cert' }, back: { en: 'Study record — not endorsement.', ur: 'Study — endorsement nahi.' } },
      { front: { en: 'Elective path', ur: 'Elective' }, back: { en: 'Warn-only — not credit path.', ur: 'Warn-only.' } },
    ],
    quiz: [
      { q: { en: 'Safest first automation is usually:', ur: 'First:' },
        opts: { en: ['Alerts / journaling aids', 'Life-savings API bot', 'Withdraw-key copy'], ur: ['Alerts/journal', 'Life API', 'Withdraw copy'] },
        correct: 0, explain: { en: 'Ladder up slowly.', ur: 'Ladder.' } },
      { q: { en: 'Buying a profit bot is:', ur: 'Buy bot:' },
        opts: { en: ['Against this elective’s honesty', 'Required mastery', 'Risk-free'], ur: ['Against honesty', 'Required', 'Risk-free'] },
        correct: 0, explain: { en: 'Refuse.', ur: 'Refuse.' } },
      { q: { en: 'This certificate means:', ur: 'Cert:' },
        opts: { en: ['Study progress — not endorsement', 'Vendor license', 'Income'], ur: ['Study', 'Vendor license', 'Income'] },
        correct: 0, explain: { en: 'Honesty.', ur: 'Honesty.' } },
      { q: { en: 'Kill switch should be controlled by:', ur: 'Kill:' },
        opts: { en: ['You', 'Random Telegram admin', 'Recovery agent'], ur: ['You', 'Telegram admin', 'Recovery'] },
        correct: 0, explain: { en: 'Ownership of risk.', ur: 'Ownership.' } },
    ],
  }),
];

export const BOTS_DEEP_PLACEMENT = [
  { topic: 1, q: { en: 'Bots are:', ur: 'Bots:' }, opts: { en: ['Rule executors', 'Guaranteed alpha', 'Risk delete'], ur: ['Executors', 'Alpha', 'Delete risk'] }, correct: 0 },
  { topic: 1, q: { en: 'Withdraw API share:', ur: 'API:' }, opts: { en: ['Dangerous', 'Required', 'Safe'], ur: ['Dangerous', 'Required', 'Safe'] }, correct: 0 },
  { topic: 2, q: { en: 'Grid fails in:', ur: 'Grid:' }, opts: { en: ['Strong trends', 'Perfect ranges only', 'Zero vol'], ur: ['Trends', 'Ranges', 'Zero vol'] }, correct: 0 },
  { topic: 2, q: { en: 'Copy imports:', ur: 'Copy:' }, opts: { en: ['Size/latency/conflicts', 'Guaranteed fills', 'No risk'], ur: ['Size/latency', 'Fills', 'No risk'] }, correct: 0 },
  { topic: 3, q: { en: 'Pretty backtests often:', ur: 'Backtest:' }, opts: { en: ['Overfit', 'Guarantee live', 'Ignore'], ur: ['Overfit', 'Live guarantee', 'Ignore'] }, correct: 0 },
  { topic: 3, q: { en: 'VIP unlock after loss:', ur: 'VIP:' }, opts: { en: ['Second trap', 'Required', 'Official'], ur: ['Trap', 'Required', 'Official'] }, correct: 0 },
  { topic: 4, q: { en: 'First automation:', ur: 'First:' }, opts: { en: ['Alerts/journal', 'Life API', 'Share keys'], ur: ['Alerts', 'Life API', 'Keys'] }, correct: 0 },
  { topic: 4, q: { en: 'Certificate:', ur: 'Cert:' }, opts: { en: ['Study not endorsement', 'Vendor license', 'Income'], ur: ['Study', 'License', 'Income'] }, correct: 0 },
];
