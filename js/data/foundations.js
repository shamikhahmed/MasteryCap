/* ============================================================
   foundations.js — Markets Foundations (v47 deep bar).
   Six weeks: objective → teach → worked example → mistake →
   check (quiz) + flashcardSeeds + notebookPrompt.
   Literacy + process. Not income promise.
   ============================================================ */

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

export const FOUNDATIONS_WEEKS = [
{
  id: 1,
  title: { en: 'What a Market Is', ur: 'Market Kya Hai' },
  objective: {
    en: 'Explain what a market is, why prices move, and why literacy ≠ income.',
    ur: 'Market kya hai, price kyun hilti, literacy ≠ income.',
  },
  teach: {
    en: `<p>A <strong>market</strong> is a place (physical or electronic) where buyers and sellers agree on a price for something scarce: a share, a currency, a barrel of oil, a token. Every fill needs a <strong>counterparty</strong> who disagrees with you about value — if everyone agreed, there would be no trade.</p>
<p>Price moves when orders arrive unevenly: more willing buyers lift the ask; more willing sellers hit the bid. News, positioning, liquidity, and fear all change who is willing. That is not magic and not a salary machine.</p>
<p><strong>MasteryCap</strong> is a school on your device: frameworks, process, and practice. Completing lessons does <em>not</em> mean markets owe you money. Certificates here are self-issued study records — not licenses.</p>
<p>{{redflag:Anyone selling “finish this course → weekly income” is selling fantasy.}}</p>`,
    ur: `<p><strong>Market</strong> = jagah jahan buyer aur seller kisi cheez ki price pe agree karte. Har fill ke liye <strong>counterparty</strong> chahiye. Literacy process behtar karti — tankhwah nahi.</p>
<p>MasteryCap school hai, broker ya tip service nahi. Certificate device-local self-issue — bahar credential nahi.</p>
<p>{{redflag:“Course complete = income” = fantasy.}}</p>`,
  },
  workedExample: {
    en: `<p>Two people look at the same stock. A thinks “cheap at 100”; B thinks “still expensive.” A buys from B at 100. Both can be rational with different horizons. The print is agreement on <em>this</em> price now — not proof either will be right tomorrow.</p>`,
    ur: `<p>A 100 pe kharidta, B bechta — dono rational ho sakte. Print = abhi ki agreement, kal ki guarantee nahi.</p>`,
  },
  commonMistake: {
    en: `<p>Treating charts or courses as a paycheck. Education improves decisions; markets still decide outcomes.</p>`,
    ur: `<p>Course ko paycheck samajhna. Taleem faisla behtar; market outcome decide karti.</p>`,
  },
  exitTicket: {
    en: 'You can say in one sentence what a market is and why completion ≠ income.',
    ur: 'Ek jumla: market kya + completion ≠ income.',
  },
  notebookPrompt: {
    en: 'Write one rule you will follow before risking money (example: “no entry without a stop”).',
    ur: 'Paise risk se pehle ek rule likho.',
  },
  flashcardSeeds: [
    { front: { en: 'What is a market?', ur: 'Market kya?' }, back: { en: 'A place where buyers and sellers agree on a price for something scarce.', ur: 'Buyer/seller price pe agree.' } },
    { front: { en: 'Why does every trade need a counterparty?', ur: 'Counterparty kyun?' }, back: { en: 'Someone must take the other side — disagreement about value creates the fill.', ur: 'Doosri side chahiye.' } },
    { front: { en: 'Does finishing a course guarantee income?', ur: 'Course = income?' }, back: { en: 'No. Literacy improves process; markets pay no salary for knowledge.', ur: 'Nahi. Process ≠ tankhwah.' } },
    { front: { en: 'What is MasteryCap?', ur: 'MasteryCap?' }, back: { en: 'An offline study campus — not a broker, tip service, or accredited license.', ur: 'Offline school — broker/license nahi.' } },
    { front: { en: 'What moves price?', ur: 'Price kyun hilti?' }, back: { en: 'Uneven willingness to buy vs sell (orders, liquidity, positioning, fear).', ur: 'Buy vs sell imbalance.' } },
  ],
  get body() {
    return { en: partsHtml(this, 'en'), ur: partsHtml(this, 'ur') };
  },
  quiz: [
    { q: { en: 'A market is best described as:', ur: 'Market:' },
      opts: { en: ['A place where buyers and sellers agree on a price', 'A machine that guarantees profit', 'A lottery run by brokers'], ur: ['Buyer/seller price agree', 'Profit machine', 'Broker lottery'] },
      correct: 0, explain: { en: 'Fills need counterparties who disagree about value.', ur: 'Counterparty chahiye.' } },
    { q: { en: 'Studying markets guarantees:', ur: 'Study guarantee:' },
      opts: { en: ['Nothing about income — only better decisions', 'Weekly cash', 'Beating the index'], ur: ['Income nahi — behtar faislay', 'Weekly cash', 'Index beat'] },
      correct: 0, explain: { en: 'Education improves process, not a paycheck.', ur: 'Process ≠ paycheck.' } },
    { q: { en: 'Win rate alone tells you:', ur: 'Sirf win rate:' },
      opts: { en: ['Little — high win rate can still lose overall', 'Everything about a strategy', 'Expected yearly income'], ur: ['Kam — overall loss mumkin', 'Sab kuch', 'Income'] },
      correct: 0, explain: { en: 'Expectancy needs average win and loss sizes too.', ur: 'Avg win/loss bhi chahiye.' } },
    { q: { en: 'Honest long-horizon framing here is closest to:', ur: 'Imandar framing:' },
      opts: { en: ['Investing / spot ownership with low fees over years', 'Daily scalping with max leverage', 'Binary options every hour'], ur: ['Investing / spot compounding', 'Max leverage scalp', 'Binary har ghanta'] },
      correct: 0, explain: { en: 'Time + fees + survival beat day-trading salary fantasies.', ur: 'Time + fees.' } },
  ],
},
{
  id: 2,
  title: { en: 'Scams, Tips & Leverage Bait', ur: 'Scams, Tips, Leverage Bait' },
  objective: {
    en: 'Name common retail traps and refuse seed/OTP/remote-access attacks.',
    ur: 'Scam patterns pehchano; seed/OTP mat do.',
  },
  teach: {
    en: `<p>Before any account, learn the traps: <strong>signal groups</strong> selling “VIP entries,” <strong>recovery agents</strong> after a loss, <strong>fake brokers</strong>, and <strong>leverage ads</strong> that show only winners.</p>
<p>Rules: never send money to a “manager” wallet. Never share seed phrases or OTP. Verify firms on the official regulator site (e.g. SECP/PSX lists for Pakistan equities). “Guaranteed returns” = walk away.</p>
<p>Leverage is a loan that can liquidate you — not free money. Skipping Foundations for 50× usually funds someone else’s bonus.</p>
<p>{{compare:invest-vs-trade}}</p>
<p>{{redflag:Remote desktop + “I’ll trade your account” = classic theft.}}</p>`,
    ur: `<p>Signal VIP, recovery agents, fake brokers, leverage-only-wins ads — pehchano. Seed/OTP kabhi nahi. Regulator site pe verify. Guarantee = walk away.</p>
<p>{{redflag:Remote desktop + trade karunga = theft.}}</p>`,
  },
  workedExample: {
    en: `<p>You lose money. A stranger DMs: “I can recover funds — send seed to verify wallet.” That person with the seed owns the wallet. Real support never needs your seed.</p>`,
    ur: `<p>Loss ke baad seed mangna = theft. Support ko seed nahi chahiye.</p>`,
  },
  commonMistake: {
    en: `<p>Trusting urgency (“only today”) or logos in a chat over regulator lists.</p>`,
    ur: `<p>Urgency / chat logo pe bharosa — regulator list pe nahi.</p>`,
  },
  exitTicket: {
    en: 'You can list three scam patterns and what you will refuse.',
    ur: 'Teen scam patterns + refuse list.',
  },
  notebookPrompt: {
    en: 'List three scam patterns in your own words. Note one you almost believed.',
    ur: 'Teen scam patterns apne alfaaz mein.',
  },
  flashcardSeeds: [
    { front: { en: 'Someone asks for your seed phrase', ur: 'Seed mange' }, back: { en: 'Refuse. Seed = ownership. No support needs it.', ur: 'Refuse. Seed = ownership.' } },
    { front: { en: '“Guaranteed 5% daily” tip seller', ur: 'Guaranteed daily' }, back: { en: 'Red flag — walk away.', ur: 'Red flag.' } },
    { front: { en: 'Before funding a broker', ur: 'Fund se pehle' }, back: { en: 'Verify license on the official regulator site.', ur: 'Regulator site verify.' } },
    { front: { en: 'What do high-leverage win ads omit?', ur: 'Leverage ads chhupate' }, back: { en: 'Liquidation and loss frequency (selection bias).', ur: 'Liquidation / loss frequency.' } },
    { front: { en: 'Remote desktop “I’ll trade for you”', ur: 'Remote desktop' }, back: { en: 'Account theft pattern — never allow.', ur: 'Theft — kabhi nahi.' } },
  ],
  get body() {
    return { en: partsHtml(this, 'en'), ur: partsHtml(this, 'ur') };
  },
  quiz: [
    { q: { en: 'A stranger asks for your seed to “recover funds.” You:', ur: 'Seed recover:' },
      opts: { en: ['Refuse — never share seed or OTP', 'Send if they sound official', 'Post it in a group'], ur: ['Refuse', 'Official lage to bhejo', 'Group post'] },
      correct: 0, explain: { en: 'Seed = ownership.', ur: 'Seed = ownership.' } },
    { q: { en: '“Guaranteed 5% daily” is:', ur: 'Guaranteed 5%:' },
      opts: { en: ['A red flag — walk away', 'Normal for professionals', 'Proof the strategy works'], ur: ['Red flag', 'Normal', 'Proof'] },
      correct: 0, explain: { en: 'Guarantees in markets are marketing.', ur: 'Marketing.' } },
    { q: { en: 'Before funding a broker you should:', ur: 'Fund se pehle:' },
      opts: { en: ['Verify license on the official regulator site', 'Trust Instagram ads', 'Only check Telegram'], ur: ['Regulator verify', 'Instagram', 'Telegram'] },
      correct: 0, explain: { en: 'Regulator lists beat influencer screenshots.', ur: 'Regulator > influencer.' } },
    { q: { en: 'High leverage ads that show only wins omit:', ur: 'Ads omit:' },
      opts: { en: ['Liquidation and loss frequency', 'That fees exist', 'That charts exist'], ur: ['Liquidation / losses', 'Fees', 'Charts'] },
      correct: 0, explain: { en: 'Selection bias sells the product.', ur: 'Selection bias.' } },
  ],
},
{
  id: 3,
  title: { en: 'Open a Regulated Account', ur: 'Regulated Account' },
  objective: {
    en: 'Follow a custody-first checklist to open and test a regulated account — no broker endorsement.',
    ur: 'Custody-first checklist — broker endorse nahi.',
  },
  teach: {
    en: `<p>Process week — not an affiliate pitch.</p>
<p><strong>Pakistan equities (PSX path):</strong> (1) Pick a PSX-licensed broker (TREC) from PSX/SECP lists. (2) Complete KYC. (3) Open a <strong>CDC sub-account</strong> so shares sit in <em>your</em> name. (4) Fund via official bank channels. (5) Test small deposit <em>and</em> small withdrawal before size.</p>
<p><strong>Crypto / global:</strong> Prefer regulated venues where you live. KYC. 2FA (app > SMS if possible). Tiny first deposit. Do not park life savings on an exchange IOU.</p>
<p>{{xref:invest:4:PSX & CDC deepen in Investing}}</p>`,
    ur: `<p>PSX: licensed TREC → KYC → CDC sub-account → bank fund → chhota deposit+withdrawal test. Crypto: regulated venue, 2FA, tiny first deposit.</p>`,
  },
  workedExample: {
    en: `<p>Homework: screenshot the regulator license page, write the firm’s legal name, confirm withdrawal method, set a monthly funding cap.</p>`,
    ur: `<p>License screenshot, legal name, withdrawal test, monthly cap.</p>`,
  },
  commonMistake: {
    en: `<p>Funding large before a successful withdrawal test — deposits are easy; withdrawals prove the venue.</p>`,
    ur: `<p>Badi fund bina withdrawal test.</p>`,
  },
  exitTicket: {
    en: 'You can recite the five-step PSX path and why CDC custody matters.',
    ur: 'PSX 5 steps + CDC kyun.',
  },
  notebookPrompt: {
    en: 'Write your funding cap and the exact withdrawal test you will run before size.',
    ur: 'Funding cap + withdrawal test likho.',
  },
  flashcardSeeds: [
    { front: { en: 'PSX shares should sit in', ur: 'PSX shares' }, back: { en: 'Your CDC / investor account in your name.', ur: 'CDC apne naam.' } },
    { front: { en: 'KYC exists mainly to', ur: 'KYC' }, back: { en: 'Identify you for regulated compliance — not to guarantee profit.', ur: 'Compliance — profit nahi.' } },
    { front: { en: 'Before large size on a new venue', ur: 'Badi size se pehle' }, back: { en: 'Test a small withdrawal successfully.', ur: 'Chhota withdrawal test.' } },
    { front: { en: 'This lesson endorses', ur: 'Endorse' }, back: { en: 'A process checklist — not a specific affiliate broker.', ur: 'Checklist — affiliate nahi.' } },
    { front: { en: 'Exchange IOU risk', ur: 'Exchange IOU' }, back: { en: 'Large balances on an exchange are counterparty risk — not the same as self-custody.', ur: 'Counterparty risk.' } },
  ],
  get body() {
    return { en: partsHtml(this, 'en'), ur: partsHtml(this, 'ur') };
  },
  quiz: [
    { q: { en: 'On PSX, shares should ultimately sit in:', ur: 'PSX shares:' },
      opts: { en: ['Your CDC / investor account in your name', 'Only the broker house forever', 'A tip-seller wallet'], ur: ['CDC apne naam', 'House forever', 'Tip wallet'] },
      correct: 0, explain: { en: 'Custody in your name survives broker drama better.', ur: 'Apna naam custody.' } },
    { q: { en: 'KYC exists mainly to:', ur: 'KYC:' },
      opts: { en: ['Identify you for regulated compliance', 'Guarantee profit', 'Let the broker tip you'], ur: ['Compliance', 'Profit guarantee', 'Tips'] },
      correct: 0, explain: { en: 'Compliance, not performance.', ur: 'Compliance.' } },
    { q: { en: 'Before large size you should:', ur: 'Badi size:' },
      opts: { en: ['Test a small withdrawal successfully', 'Skip tests', 'Give remote desktop to support'], ur: ['Withdrawal test', 'Skip', 'Remote desktop'] },
      correct: 0, explain: { en: 'Withdrawals prove the venue.', ur: 'Withdrawal = proof.' } },
    { q: { en: 'This lesson endorses:', ur: 'Endorse:' },
      opts: { en: ['A process checklist — not an affiliate broker', 'One secret winning broker', 'Skipping regulation if fees are low'], ur: ['Checklist', 'Secret broker', 'Skip regulation'] },
      correct: 0, explain: { en: 'We teach verify — we do not sell a broker.', ur: 'Verify — broker nahi bechte.' } },
  ],
},
{
  id: 4,
  title: { en: 'Orders: Market, Limit, Stop', ur: 'Orders: Market, Limit, Stop' },
  objective: {
    en: 'Choose market vs limit vs stop with eyes open about spread and fill risk.',
    ur: 'Market vs limit vs stop + spread.',
  },
  teach: {
    en: `<p>Every quote has a <strong>bid</strong> (buyers) and <strong>ask</strong> (sellers). The <strong>spread</strong> is a cost when you cross it.</p>
<p><strong>Market:</strong> fill now — fast, can slip. <strong>Limit:</strong> only at your price or better — may not fill. <strong>Stop / stop-limit:</strong> arms after a trigger — know your venue’s rules.</p>
<p>Beginner drill (2 weeks): prefer limits on paper/tiny size. Notice how often emotion wants a market chase.</p>
<p>{{compare:limit-vs-market}}</p>`,
    ur: `<p>Bid/ask + spread cost. Market = tez/slip. Limit = price control, fill na ho. Stop = trigger ke baad.</p>
<p>{{compare:limit-vs-market}}</p>`,
  },
  workedExample: {
    en: `<p>Stock bid 99.90 / ask 100.10. A market buy pays ~100.10. A limit buy at 100.00 waits — may never fill if price runs.</p>`,
    ur: `<p>Ask pe market buy; limit 100 wait — fill na ho.</p>`,
  },
  commonMistake: {
    en: `<p>Using market orders for every entry “for certainty” — you pay spread and teach FOMO fills.</p>`,
    ur: `<p>Har entry pe market = FOMO + spread.</p>`,
  },
  exitTicket: {
    en: 'You can explain when you would use each order type.',
    ur: 'Teen order types kab.',
  },
  notebookPrompt: {
    en: 'For one imagined trade, write entry type, stop type, and why.',
    ur: 'Ek trade: entry type, stop type, kyun.',
  },
  flashcardSeeds: [
    { front: { en: 'Limit buy fills', ur: 'Limit buy' }, back: { en: 'At your limit or better — or not at all.', ur: 'Limit/better — ya nahi.' } },
    { front: { en: 'Crossing the spread with a market order', ur: 'Spread cross' }, back: { en: 'You pay the ask to buy or hit the bid to sell.', ur: 'Buy ask / sell bid.' } },
    { front: { en: 'Early order habit', ur: 'Order habit' }, back: { en: 'Prefer limits; notice chase urges.', ur: 'Limits; chase dekho.' } },
    { front: { en: 'Paper trading’s job', ur: 'Paper' }, back: { en: 'Practice process without risking rent money.', ur: 'Process bina rent risk.' } },
    { front: { en: 'Bid vs ask', ur: 'Bid/ask' }, back: { en: 'Bid = buyers; ask = sellers; spread is between them.', ur: 'Bid buyers; ask sellers.' } },
  ],
  get body() {
    return { en: partsHtml(this, 'en'), ur: partsHtml(this, 'ur') };
  },
  quiz: [
    { q: { en: 'A limit buy fills:', ur: 'Limit buy:' },
      opts: { en: ['At your limit or better — or not at all', 'Always instantly at any price', 'Only after liquidation'], ur: ['Limit/better ya nahi', 'Hamesha instant', 'Liquidation baad'] },
      correct: 0, explain: { en: 'Limits protect price, not fill.', ur: 'Price protect.' } },
    { q: { en: 'Crossing the spread with a market order means you:', ur: 'Market spread:' },
      opts: { en: ['Pay the ask (buy) or hit the bid (sell)', 'Always get mid', 'Avoid all fees'], ur: ['Ask/bid', 'Mid', 'No fees'] },
      correct: 0, explain: { en: 'Urgency costs the spread.', ur: 'Jaldi = spread.' } },
    { q: { en: 'Best early habit:', ur: 'Habit:' },
      opts: { en: ['Prefer limits; notice chase urges', 'Always market', 'Never use stops'], ur: ['Limits', 'Hamesha market', 'No stops'] },
      correct: 0, explain: { en: 'Limits teach patience.', ur: 'Sabar.' } },
    { q: { en: 'Paper trading’s main job:', ur: 'Paper:' },
      opts: { en: ['Practice process without risking rent', 'Prove you will be rich', 'Skip journaling'], ur: ['Process practice', 'Rich proof', 'Skip journal'] },
      correct: 0, explain: { en: 'Process reps beat fantasy P&L.', ur: 'Process > fantasy.' } },
  ],
},
{
  id: 5,
  title: { en: 'Paper Trade Workflow', ur: 'Paper Trade Workflow' },
  objective: {
    en: 'Run a full paper loop: setup → checklist → size → log → debrief on process.',
    ur: 'Paper loop: setup → checklist → size → log → debrief.',
  },
  teach: {
    en: `<p>When ready — not before — use Practice / Practice Ledger (and Journal desk).</p>
<p><strong>Workflow:</strong> (1) One-sentence setup. (2) Pre-trade checklist (stop, risk %, calm, plan). (3) Size from calculator. (4) Paper/demo order. (5) Log entry, stop, exit, emotion. (6) Debrief: process followed? — not “was I right.”</p>
<p>If checklist fails → no trade. That is the lesson.</p>
<p>{{redflag:Skipping checklist “just once” starts revenge trades.}}</p>`,
    ur: `<p>Checklist incomplete = no trade. Debrief = process, sirf P&L nahi.</p>
<p>{{redflag:Checklist skip = revenge start.}}</p>`,
  },
  workedExample: {
    en: `<p>Five paper trades this week. If revenge urge appears, log “urge — skipped” — that counts as discipline win.</p>`,
    ur: `<p>5 paper trades. Urge aaye to skip + note.</p>`,
  },
  commonMistake: {
    en: `<p>Calling green P&L a pass when the checklist was skipped.</p>`,
    ur: `<p>Green P&L + skipped checklist = fail.</p>`,
  },
  exitTicket: {
    en: 'You can recite the six workflow steps without looking.',
    ur: '6 steps yad.',
  },
  notebookPrompt: {
    en: 'Paste your pre-trade checklist. Mark any step you tend to skip.',
    ur: 'Checklist likho; skip habit mark karo.',
  },
  flashcardSeeds: [
    { front: { en: 'Incomplete checklist means', ur: 'Incomplete checklist' }, back: { en: 'No trade.', ur: 'No trade.' } },
    { front: { en: 'Good debrief focuses on', ur: 'Debrief' }, back: { en: 'Whether process was followed — not only dollar P&L.', ur: 'Process — sirf P&L nahi.' } },
    { front: { en: 'Emotion tags help spot', ur: 'Emotion tags' }, back: { en: 'Revenge / FOMO clusters that destroy expectancy.', ur: 'Revenge/FOMO clusters.' } },
    { front: { en: 'Practice desk lives in', ur: 'Desk' }, back: { en: 'Practice / Journal — not the school homeboard alone.', ur: 'Practice / Journal.' } },
    { front: { en: 'Paper win then full live size', ur: 'Paper → live' }, back: { en: 'Common wipe story — size up slowly with rules.', ur: 'Common wipe — dheere size.' } },
  ],
  get body() {
    return { en: partsHtml(this, 'en'), ur: partsHtml(this, 'ur') };
  },
  quiz: [
    { q: { en: 'If the pre-trade checklist is incomplete:', ur: 'Checklist incomplete:' },
      opts: { en: ['Skip the trade', 'Increase leverage', 'Ask a signal group'], ur: ['Skip', 'Leverage', 'Signal'] },
      correct: 0, explain: { en: 'No checklist = no trade.', ur: 'No checklist = no trade.' } },
    { q: { en: 'A good debrief focuses on:', ur: 'Debrief:' },
      opts: { en: ['Whether process was followed', 'Only dollar P&L', 'Blaming the broker every time'], ur: ['Process', 'Sirf P&L', 'Broker blame'] },
      correct: 0, explain: { en: 'Process quality compounds.', ur: 'Process compound.' } },
    { q: { en: 'Emotion tags help you spot:', ur: 'Tags:' },
      opts: { en: ['Revenge / FOMO clusters', 'Next guaranteed winner', 'Tax rates automatically'], ur: ['Revenge/FOMO', 'Guaranteed winner', 'Tax'] },
      correct: 0, explain: { en: 'Emotions often cluster before blowups.', ur: 'Blowup se pehle cluster.' } },
    { q: { en: 'Practice ledger / desk is for:', ur: 'Ledger:' },
      opts: { en: ['Process practice with logs', 'Proving you are rich', 'Skipping stops'], ur: ['Process + logs', 'Rich proof', 'Skip stops'] },
      correct: 0, explain: { en: 'Logs + process grade — not profit worship.', ur: 'Process grade.' } },
  ],
},
{
  id: 6,
  title: { en: 'Risk % & Unlock Gate', ur: 'Risk % aur Unlock' },
  objective: {
    en: 'Compute risk $ and size from stop distance; know how Foundations unlocks specialties.',
    ur: 'Risk $ + size; Foundations unlock samjho.',
  },
  teach: {
    en: `<p><strong>Risk $</strong> = balance × risk %. <strong>Size</strong> ≈ risk $ ÷ stop distance (in your venue’s units). Wider stop → smaller size.</p>
<p>Paper start ≤0.5–1% risk per idea. Never risk rent, tuition, or emergency cash.</p>
<p><strong>Unlock:</strong> Finish all Foundations weeks <em>or</em> pass the Foundations exam → Crypto, Stocks, and Forex open together. That is literacy readiness — not “trade-ready forever.”</p>
<p>{{redflag:“Double size because I’m sure” fights risk %.}}</p>`,
    ur: `<p>Risk $ = balance × risk %. Size ≈ risk $ / stop distance. Unlock = saari weeks ya exam → Crypto/Stocks/Forex.</p>
<p>{{redflag:Surety pe double size = enemy.}}</p>`,
  },
  workedExample: {
    en: `<p>Balance $10,000, risk 1% → risk $100. If stop is $2 away per unit, size ≈ 50 units (venue rules apply).</p>`,
    ur: `<p>$10,000 × 1% = $100 risk. Stop door → size chhoti.</p>`,
  },
  commonMistake: {
    en: `<p>Picking leverage first, then inventing a stop to match — reverse the order: stop first, size second.</p>`,
    ur: `<p>Pehle leverage sochna — galat. Stop pehle.</p>`,
  },
  exitTicket: {
    en: 'You can compute risk $ and explain the Foundations unlock gate.',
    ur: 'Risk $ + unlock gate.',
  },
  notebookPrompt: {
    en: 'Write your max risk % and max daily loss rule. Sign it.',
    ur: 'Max risk % + daily loss rule likho.',
  },
  flashcardSeeds: [
    { front: { en: '$10,000 at 1% risk $', ur: '10k @ 1%' }, back: { en: '$100', ur: '$100' } },
    { front: { en: 'Wider stop, fixed risk %', ur: 'Wide stop' }, back: { en: 'Smaller position size.', ur: 'Chhoti size.' } },
    { front: { en: 'Risk $ formula starts with', ur: 'Formula' }, back: { en: 'Balance × risk %.', ur: 'Balance × risk %.' } },
    { front: { en: 'Foundations unlock opens', ur: 'Unlock' }, back: { en: 'Crypto, Stocks, and Forex together (after weeks or exam).', ur: 'Crypto/Stocks/Forex.' } },
    { front: { en: '“Zero-to-hero” here means', ur: 'Zero-to-hero' }, back: { en: 'Ready to practice with rules — not guaranteed rich.', ur: 'Rules se practice — rich guarantee nahi.' } },
  ],
  formula: {
    en: 'risk $ = balance × risk% · size ≈ risk $ ÷ stop distance',
    ur: 'risk $ = balance × risk% · size ≈ risk $ ÷ stop distance',
  },
  get body() {
    return { en: partsHtml(this, 'en'), ur: partsHtml(this, 'ur') };
  },
  quiz: [
    { q: { en: 'If balance is $10,000 and risk is 1%, risk $ is:', ur: '10k @ 1%:' },
      opts: { en: ['$100', '$1,000', '$10'], ur: ['$100', '$1,000', '$10'] },
      correct: 0, explain: { en: '10,000 × 0.01 = 100.', ur: '100.' } },
    { q: { en: 'Wider stop with fixed risk % means:', ur: 'Wide stop:' },
      opts: { en: ['Smaller position size', 'Larger position size', 'No change'], ur: ['Chhoti size', 'Bari', 'Same'] },
      correct: 0, explain: { en: 'Same risk $ over more distance → less size.', ur: 'Kam size.' } },
    { q: { en: 'After Foundations gate, specialties that unlock together:', ur: 'Unlock:' },
      opts: { en: ['Crypto, Stocks, Forex', 'Only binary options', 'Max-leverage perps day one'], ur: ['Crypto/Stocks/Forex', 'Binary', 'Max perps'] },
      correct: 0, explain: { en: 'Core markets after Foundations literacy.', ur: 'Core after Foundations.' } },
    { q: { en: '“Zero-to-hero” in this school means:', ur: 'Hero:' },
      opts: { en: ['Ready to practice with rules', 'Guaranteed rich in 30 days', 'Skipping risk forever'], ur: ['Rules se ready', '30 din rich', 'Risk skip'] },
      correct: 0, explain: { en: 'Process-ready adult — not lottery winner.', ur: 'Process-ready.' } },
  ],
},
];

export const FOUNDATIONS_PLACEMENT = [
  { topic: 1, q: { en: 'Before risking money, a beginner should first have:', ur: 'Risk se pehle:' }, opts: { en: ['A written plan and paper-trade record', 'A hot tip', 'A loan for margin'], ur: ['Plan + paper record', 'Hot tip', 'Margin loan'] }, correct: 0 },
  { topic: 1, q: { en: 'Course completion guarantees income:', ur: 'Course = income:' }, opts: { en: ['False', 'True', 'Only weekends'], ur: ['False', 'True', 'Weekend'] }, correct: 0 },
  { topic: 2, q: { en: 'Sharing a seed with “support” is:', ur: 'Seed support:' }, opts: { en: ['Never acceptable', 'OK with a logo', 'Required by exchanges'], ur: ['Kabhi nahi', 'Logo OK', 'Required'] }, correct: 0 },
  { topic: 2, q: { en: 'Guaranteed daily returns are:', ur: 'Guaranteed daily:' }, opts: { en: ['A scam red flag', 'Normal investing', 'Required by SECP'], ur: ['Red flag', 'Normal', 'SECP'] }, correct: 0 },
  { topic: 3, q: { en: 'PSX shares should be in:', ur: 'PSX:' }, opts: { en: ['Your CDC / name custody', 'A tip channel wallet', 'Cash under mattress only'], ur: ['CDC', 'Tip wallet', 'Mattress'] }, correct: 0 },
  { topic: 3, q: { en: 'Before large deposits, test:', ur: 'Test:' }, opts: { en: ['A small withdrawal', 'Max leverage', 'VPN only'], ur: ['Chhota withdrawal', 'Max lev', 'VPN'] }, correct: 0 },
  { topic: 4, q: { en: 'Limit orders prioritize:', ur: 'Limits:' }, opts: { en: ['Price control over instant fill', 'Instant fill over price', 'Ignoring the book'], ur: ['Price > instant', 'Instant > price', 'Ignore book'] }, correct: 0 },
  { topic: 4, q: { en: 'Bid/ask spread is:', ur: 'Spread:' }, opts: { en: ['A trading cost when you cross it', 'Always zero', 'Only for options'], ur: ['Cross pe cost', 'Zero', 'Sirf options'] }, correct: 0 },
  { topic: 5, q: { en: 'Incomplete checklist means:', ur: 'Checklist:' }, opts: { en: ['No trade', 'Double size', 'Ask Telegram'], ur: ['No trade', 'Double', 'Telegram'] }, correct: 0 },
  { topic: 5, q: { en: 'Debrief should focus on:', ur: 'Debrief:' }, opts: { en: ['Process followed', 'Only P&L', 'Broker blame'], ur: ['Process', 'P&L', 'Blame'] }, correct: 0 },
  { topic: 6, q: { en: 'Risk $ formula starts with:', ur: 'Risk $:' }, opts: { en: ['Balance × risk %', 'Leverage × hope', 'Win rate × 100'], ur: ['Balance × risk %', 'Leverage', 'Win rate'] }, correct: 0 },
  { topic: 6, q: { en: 'Foundations gate unlocks:', ur: 'Gate:' }, opts: { en: ['Crypto, Stocks, Forex', 'Binary income', 'Guaranteed bots'], ur: ['Crypto/Stocks/Forex', 'Binary', 'Bots'] }, correct: 0 },
];
