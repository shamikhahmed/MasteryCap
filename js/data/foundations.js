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
    ur: `<p><strong>Market</strong> physical ya electronic jagah hai jahan buyer aur seller kisi scarce cheez — share, currency, oil barrel, token — ki price pe agree karte hain. Har fill ke liye <strong>counterparty</strong> chahiye jo value ke baare mein tumse disagree kare — sab agree hon to trade hi nahi hota.</p>
<p>Price tab hilti hai jab orders uneven aate: zyada buyers ask uthate, zyada sellers bid hit karte. News, positioning, liquidity, fear sab willingness badalte. Ye magic nahi aur na salary machine.</p>
<p><strong>MasteryCap</strong> device pe school hai: frameworks, process, practice. Lessons complete karna markets se paise ka claim nahi. Certificate yahan self-issued study record — license nahi.</p>
<p>{{redflag:“Course complete = income” = fantasy.}}</p>`,
  },
  workedExample: {
    en: `<p>Two people look at the same stock. A thinks “cheap at 100”; B thinks “still expensive.” A buys from B at 100. Both can be rational with different horizons. The print is agreement on <em>this</em> price now — not proof either will be right tomorrow.</p>`,
    ur: `<p>Do log same stock dekhte. A kehta "100 pe sasti"; B kehta "abhi bhi mehngi." A 100 pe B se kharidta. Dono alag horizon ke saath rational ho sakte. Print = abhi is price pe agreement — kal dono sahi hon iski guarantee nahi.</p>`,
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
    ur: 'Paise risk se pehle ek rule likho jo follow karoge (misal: "stop ke bina entry nahi").',
  },
  flashcardSeeds: [
    { front: { en: 'What is a market?', ur: 'Market kya?' }, back: { en: 'A place where buyers and sellers agree on a price for something scarce.', ur: 'Jahan buyer aur seller kisi scarce cheez ki price pe agree karte hain.' } },
    { front: { en: 'Why does every trade need a counterparty?', ur: 'Har trade mein counterparty kyun zaroori hota hai?' }, back: { en: 'Someone must take the other side — disagreement about value creates the fill.', ur: 'Koi doosri side lena zaroori — value pe disagreement fill banati hai.' } },
    { front: { en: 'Does finishing a course guarantee income?', ur: 'Kya course complete karne se income guarantee hoti hai?' }, back: { en: 'No. Literacy improves process; markets pay no salary for knowledge.', ur: 'Nahi. Literacy process behtar karti; markets knowledge ki tankhwah nahi deti.' } },
    { front: { en: 'What is MasteryCap?', ur: 'MasteryCap?' }, back: { en: 'An offline study campus — not a broker, tip service, or accredited license.', ur: 'Offline study campus — broker, tip service, ya accredited license nahi.' } },
    { front: { en: 'What moves price?', ur: 'Price kyun hilti?' }, back: { en: 'Uneven willingness to buy vs sell (orders, liquidity, positioning, fear).', ur: 'Buy vs sell ki uneven willingness (orders, liquidity, positioning, fear).' } },
  ],
  get body() {
    return { en: partsHtml(this, 'en'), ur: partsHtml(this, 'ur') };
  },
  quiz: [
    { q: { en: 'A market is best described as:', ur: 'Market ko behtar taur pe kya kehte hain:' },
      opts: { en: ['A place where buyers and sellers agree on a price', 'A machine that guarantees profit', 'A lottery run by brokers'], ur: ['Jahan kharidar aur farokht-kun qeemat pe muttafiq hon', 'Aisi machine jo munafa ki guarantee deti ho', 'Broker lottery'] },
      correct: 0, explain: { en: 'Fills need counterparties who disagree about value.', ur: 'Fills ke liye counterparty chahiye jo value pe disagree kare.' } },
    { q: { en: 'Studying markets guarantees:', ur: 'Study guarantee:' },
      opts: { en: ['Nothing about income — only better decisions', 'Weekly cash', 'Beating the index'], ur: ['Income nahi — behtar faislay', 'Weekly cash', 'Index beat'] },
      correct: 0, explain: { en: 'Education improves process, not a paycheck.', ur: 'Education process behtar karti hai — paycheck nahi deti.' } },
    { q: { en: 'Win rate alone tells you:', ur: 'Sirf win rate:' },
      opts: { en: ['Little — high win rate can still lose overall', 'Everything about a strategy', 'Expected yearly income'], ur: ['Kam — overall loss mumkin', 'Sab kuch', 'Income'] },
      correct: 0, explain: { en: 'Expectancy needs average win and loss sizes too.', ur: 'Expectancy ke liye avg win aur loss size bhi chahiye.' } },
    { q: { en: 'Honest long-horizon framing here is closest to:', ur: 'Imandar long-horizon framing yahan sab se qareeb kya hai:' },
      opts: { en: ['Investing / spot ownership with low fees over years', 'Daily scalping with max leverage', 'Binary options every hour'], ur: ['Investing / spot ownership kam fees ke sath saalon tak', 'Max leverage scalp', 'Binary har ghanta'] },
      correct: 0, explain: { en: 'Time + fees + survival beat day-trading salary fantasies.', ur: 'Time + fees + survival day-trading salary fantasies ko beat karte hain.' } },
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
    ur: `<p>Account se pehle traps seekho: <strong>signal groups</strong> "VIP entries" bechte, <strong>recovery agents</strong> loss ke baad, <strong>fake brokers</strong>, aur <strong>leverage ads</strong> jo sirf winners dikhate.</p>
<p>Rules: "manager" wallet ko paise kabhi nahi. Seed phrase ya OTP share kabhi nahi. Firm ko official regulator site pe verify karo (misal PSX/SECP lists Pakistan equities ke liye). "Guaranteed returns" = door chalo.</p>
<p>Leverage loan hai jo liquidate kar sakta — free money nahi. Foundations skip karke 50× usually kisi aur ka bonus fund karta.</p>
<p>{{compare:invest-vs-trade}}</p>
<p>{{redflag:Remote desktop + "main tumhara account trade karunga" = classic theft.}}</p>`,
  },
  workedExample: {
    en: `<p>You lose money. A stranger DMs: “I can recover funds — send seed to verify wallet.” That person with the seed owns the wallet. Real support never needs your seed.</p>`,
    ur: `<p>Paise loss ho. Stranger DM karta: "Funds recover kar sakta — wallet verify ke liye seed bhejo." Seed wala wallet ka malik. Asli support ko seed kabhi nahi chahiye.</p>`,
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
    ur: 'Teen scam patterns apne alfaaz mein likho. Ek note karo jis pe almost bharosa aa gaya tha.',
  },
  flashcardSeeds: [
    { front: { en: 'Someone asks for your seed phrase', ur: 'Koi tumhari seed phrase maangta hai' }, back: { en: 'Refuse. Seed = ownership. No support needs it.', ur: 'Refuse karo. Seed = ownership. Kisi support ko ye nahi chahiye.' } },
    { front: { en: '“Guaranteed 5% daily” tip seller', ur: '“Guaranteed 5% daily” wala tip seller' }, back: { en: 'Red flag — walk away.', ur: 'Red flag hai — wahan se door chalo.' } },
    { front: { en: 'Before funding a broker', ur: 'Fund se pehle' }, back: { en: 'Verify license on the official regulator site.', ur: 'License official regulator site pe verify karo.' } },
    { front: { en: 'What do high-leverage win ads omit?', ur: 'Leverage ads chhupate' }, back: { en: 'Liquidation and loss frequency (selection bias).', ur: 'Liquidation / loss frequency.' } },
    { front: { en: 'Remote desktop “I’ll trade for you”', ur: 'Remote desktop — “main tumhare liye trade karunga”' }, back: { en: 'Account theft pattern — never allow.', ur: 'Account theft ka pattern — kabhi allow mat karo.' } },
  ],
  get body() {
    return { en: partsHtml(this, 'en'), ur: partsHtml(this, 'ur') };
  },
  quiz: [
    { q: { en: 'A stranger asks for your seed to “recover funds.” You:', ur: 'Ajnabi seed maang kar “funds recover” kehta. Tum:' },
      opts: { en: ['Refuse — never share seed or OTP', 'Send if they sound official', 'Post it in a group'], ur: ['Inkaar karo — seed ya OTP kabhi share mat karo', 'Official lage to bhejo', 'Group post'] },
      correct: 0, explain: { en: 'Seed = ownership.', ur: 'Seed = ownership.' } },
    { q: { en: '“Guaranteed 5% daily” is:', ur: 'Guaranteed 5%:' },
      opts: { en: ['A red flag — walk away', 'Normal for professionals', 'Proof the strategy works'], ur: ['Red flag', 'Normal', 'Proof'] },
      correct: 0, explain: { en: 'Guarantees in markets are marketing.', ur: 'Markets mein guarantees marketing hoti hain.' } },
    { q: { en: 'Before funding a broker you should:', ur: 'Broker fund karne se pehle tumhein kya karna chahiye:' },
      opts: { en: ['Verify license on the official regulator site', 'Trust Instagram ads', 'Only check Telegram'], ur: ['Official regulator ki site pe license verify karo', 'Instagram', 'Telegram'] },
      correct: 0, explain: { en: 'Regulator lists beat influencer screenshots.', ur: 'Regulator lists influencer screenshots se behtar hain.' } },
    { q: { en: 'High leverage ads that show only wins omit:', ur: 'High leverage ads jo sirf jeet dikhate kya chhupate hain:' },
      opts: { en: ['Liquidation and loss frequency', 'That fees exist', 'That charts exist'], ur: ['Liquidation / losses', 'Fees', 'Charts'] },
      correct: 0, explain: { en: 'Selection bias sells the product.', ur: 'Selection bias product bechti hai.' } },
  ],
},
{
  id: 3,
  title: { en: 'Open a Regulated Account', ur: 'Regulated Account' },
  objective: {
    en: 'Follow a custody-first checklist to open and test a regulated account — no broker endorsement.',
    ur: 'Custody-first checklist follow karo regulated account kholne aur test karne ke liye — koi broker endorse nahi.',
  },
  teach: {
    en: `<p>Process week — not an affiliate pitch.</p>
<p><strong>Pakistan equities (PSX path):</strong> (1) Pick a PSX-licensed broker (TREC) from PSX/SECP lists. (2) Complete KYC. (3) Open a <strong>CDC sub-account</strong> so shares sit in <em>your</em> name. (4) Fund via official bank channels. (5) Test small deposit <em>and</em> small withdrawal before size.</p>
<p><strong>Crypto / global:</strong> Prefer regulated venues where you live. KYC. 2FA (app > SMS if possible). Tiny first deposit. Do not park life savings on an exchange IOU.</p>
<p>{{xref:invest:4:PSX & CDC deepen in Investing}}</p>`,
    ur: `<p>Process week — affiliate pitch nahi.</p>
<p><strong>Pakistan equities (PSX path):</strong> (1) PSX/SECP lists se PSX-licensed broker (TREC) chuno. (2) KYC complete karo. (3) <strong>CDC sub-account</strong> kholo taake shares <em>tumhare</em> naam pe hon. (4) Official bank channels se fund karo. (5) Size se pehle chhota deposit <em>aur</em> chhota withdrawal test karo.</p>
<p><strong>Crypto / global:</strong> Jahan rehte ho wahan regulated venues prefer karo. KYC. 2FA (app > SMS agar ho sake). Pehla deposit chhota. Life savings exchange IOU pe mat rakho.</p>
<p>{{xref:invest:4:PSX & CDC deepen in Investing}}</p>`,
  },
  workedExample: {
    en: `<p>Homework: screenshot the regulator license page, write the firm’s legal name, confirm withdrawal method, set a monthly funding cap.</p>`,
    ur: `<p>Homework: regulator license page ka screenshot, firm ka legal name likho, withdrawal method confirm karo, monthly funding cap set karo.</p>`,
  },
  commonMistake: {
    en: `<p>Funding large before a successful withdrawal test — deposits are easy; withdrawals prove the venue.</p>`,
    ur: `<p>Badi fund bina successful withdrawal test ke — deposit aasan; withdrawal venue prove karta hai.</p>`,
  },
  exitTicket: {
    en: 'You can recite the five-step PSX path and why CDC custody matters.',
    ur: 'PSX ke paanch steps bol sakte ho aur CDC custody kyun matter karti samjha sakte ho.',
  },
  notebookPrompt: {
    en: 'Write your funding cap and the exact withdrawal test you will run before size.',
    ur: 'Apna funding cap likho aur exact withdrawal test jo size se pehle karoge.',
  },
  flashcardSeeds: [
    { front: { en: 'PSX shares should sit in', ur: 'PSX shares kahan honi chahiye' }, back: { en: 'Your CDC / investor account in your name.', ur: 'Tumhara CDC / investor account tumhare apne naam pe.' } },
    { front: { en: 'KYC exists mainly to', ur: 'KYC' }, back: { en: 'Identify you for regulated compliance — not to guarantee profit.', ur: 'Regulated compliance ke liye pehchan — profit guarantee ke liye nahi.' } },
    { front: { en: 'Before large size on a new venue', ur: 'Badi size se pehle' }, back: { en: 'Test a small withdrawal successfully.', ur: 'Chhota withdrawal test.' } },
    { front: { en: 'This lesson endorses', ur: 'Endorse' }, back: { en: 'A process checklist — not a specific affiliate broker.', ur: 'Process checklist hai — kisi specific affiliate broker ka nahi.' } },
    { front: { en: 'Exchange IOU risk', ur: 'Exchange IOU' }, back: { en: 'Large balances on an exchange are counterparty risk — not the same as self-custody.', ur: 'Exchange pe bari balance counterparty risk hai — self-custody jaisi nahi.' } },
  ],
  get body() {
    return { en: partsHtml(this, 'en'), ur: partsHtml(this, 'ur') };
  },
  quiz: [
    { q: { en: 'On PSX, shares should ultimately sit in:', ur: 'PSX pe shares aakhir mein kahan honi chahiye:' },
      opts: { en: ['Your CDC / investor account in your name', 'Only the broker house forever', 'A tip-seller wallet'], ur: ['Tumhare naam pe CDC / investor account hona chahiye', 'House forever', 'Tip wallet'] },
      correct: 0, explain: { en: 'Custody in your name survives broker drama better.', ur: 'Apne naam ki custody broker drama se behtar bachti hai.' } },
    { q: { en: 'KYC exists mainly to:', ur: 'KYC mainly kis liye hota hai:' },
      opts: { en: ['Identify you for regulated compliance', 'Guarantee profit', 'Let the broker tip you'], ur: ['Regulated compliance ke liye tumhari pehchan ke liye', 'Profit guarantee', 'Tips'] },
      correct: 0, explain: { en: 'Compliance, not performance.', ur: 'Compliance ke liye hai — performance ke liye nahi.' } },
    { q: { en: 'Before large size you should:', ur: 'Bari size se pehle tumhein kya karna chahiye:' },
      opts: { en: ['Test a small withdrawal successfully', 'Skip tests', 'Give remote desktop to support'], ur: ['Chhota withdrawal test karke successful hona chahiye', 'Skip', 'Remote desktop'] },
      correct: 0, explain: { en: 'Withdrawals prove the venue.', ur: 'Withdrawal = proof.' } },
    { q: { en: 'This lesson endorses:', ur: 'Ye lesson kya endorse karta hai:' },
      opts: { en: ['A process checklist — not an affiliate broker', 'One secret winning broker', 'Skipping regulation if fees are low'], ur: ['Process checklist hai — affiliate broker nahi hai ye', 'Secret broker', 'Kam fees hon to regulation skip karna theek nahi'] },
      correct: 0, explain: { en: 'We teach verify — we do not sell a broker.', ur: 'Verify — broker nahi bechte.' } },
  ],
},
{
  id: 4,
  title: { en: 'Orders: Market, Limit, Stop', ur: 'Orders: Market, Limit, Stop' },
  objective: {
    en: 'Choose market vs limit vs stop with eyes open about spread and fill risk.',
    ur: 'Market vs limit vs stop chuno — spread aur fill risk khuli aankhon se samjho.',
  },
  teach: {
    en: `<p>Every quote has a <strong>bid</strong> (buyers) and <strong>ask</strong> (sellers). The <strong>spread</strong> is a cost when you cross it.</p>
<p><strong>Market:</strong> fill now — fast, can slip. <strong>Limit:</strong> only at your price or better — may not fill. <strong>Stop / stop-limit:</strong> arms after a trigger — know your venue’s rules.</p>
<p>Beginner drill (2 weeks): prefer limits on paper/tiny size. Notice how often emotion wants a market chase.</p>
<p>{{compare:limit-vs-market}}</p>`,
    ur: `<p>Har quote mein <strong>bid</strong> (buyers) aur <strong>ask</strong> (sellers). <strong>Spread</strong> cost hai jab tum cross karte ho.</p>
<p><strong>Market:</strong> abhi fill — tez, slip ho sakta. <strong>Limit:</strong> sirf tumhari price ya better — fill na ho sakta. <strong>Stop / stop-limit:</strong> trigger ke baad arm — venue ke rules samjho.</p>
<p>Beginner drill (2 hafte): paper/tiny size pe limits prefer karo. Dekho kitni baar emotion market chase chahta hai.</p>
<p>{{compare:limit-vs-market}}</p>`,
  },
  workedExample: {
    en: `<p>Stock bid 99.90 / ask 100.10. A market buy pays ~100.10. A limit buy at 100.00 waits — may never fill if price runs.</p>`,
    ur: `<p>Stock bid 99.90 / ask 100.10. Market buy ~100.10 deta. Limit buy 100.00 pe wait — price bhaage to kabhi fill na ho.</p>`,
  },
  commonMistake: {
    en: `<p>Using market orders for every entry “for certainty” — you pay spread and teach FOMO fills.</p>`,
    ur: `<p>Har entry pe market order "certainty" ke liye — spread pay karte ho aur FOMO fills seekhte ho.</p>`,
  },
  exitTicket: {
    en: 'You can explain when you would use each order type.',
    ur: 'Har order type kab use karoge explain kar sakte ho.',
  },
  notebookPrompt: {
    en: 'For one imagined trade, write entry type, stop type, and why.',
    ur: 'Ek trade: entry type, stop type, kyun.',
  },
  flashcardSeeds: [
    { front: { en: 'Limit buy fills', ur: 'Limit buy' }, back: { en: 'At your limit or better — or not at all.', ur: 'Limit/better — ya nahi.' } },
    { front: { en: 'Crossing the spread with a market order', ur: 'Market order se spread cross karna' }, back: { en: 'You pay the ask to buy or hit the bid to sell.', ur: 'Buy ke liye ask pay karte ho ya sell ke liye bid hit karte ho.' } },
    { front: { en: 'Early order habit', ur: 'Order habit' }, back: { en: 'Prefer limits; notice chase urges.', ur: 'Limits; chase dekho.' } },
    { front: { en: 'Paper trading’s job', ur: 'Paper' }, back: { en: 'Practice process without risking rent money.', ur: 'Process practice karo bina rent wale paise risk kiye.' } },
    { front: { en: 'Bid vs ask', ur: 'Bid/ask' }, back: { en: 'Bid = buyers; ask = sellers; spread is between them.', ur: 'Bid = buyers; ask = sellers; spread dono ke beech hota hai.' } },
  ],
  get body() {
    return { en: partsHtml(this, 'en'), ur: partsHtml(this, 'ur') };
  },
  quiz: [
    { q: { en: 'A limit buy fills:', ur: 'Limit buy:' },
      opts: { en: ['At your limit or better — or not at all', 'Always instantly at any price', 'Only after liquidation'], ur: ['Tumhari limit ya us se behtar — warna bilkul nahi', 'Hamesha instant', 'Liquidation baad'] },
      correct: 0, explain: { en: 'Limits protect price, not fill.', ur: 'Limits price protect karti hain — fill guarantee nahi.' } },
    { q: { en: 'Crossing the spread with a market order means you:', ur: 'Market order se spread cross karne ka matlab tum:' },
      opts: { en: ['Pay the ask (buy) or hit the bid (sell)', 'Always get mid', 'Avoid all fees'], ur: ['Ask pay karo (buy) ya bid hit karo (sell)', 'Mid', 'No fees'] },
      correct: 0, explain: { en: 'Urgency costs the spread.', ur: 'Jaldi = spread.' } },
    { q: { en: 'Best early habit:', ur: 'Shuru mein behtar habit kya hai:' },
      opts: { en: ['Prefer limits; notice chase urges', 'Always market', 'Never use stops'], ur: ['Limit orders prefer karo; chase urges notice karo', 'Hamesha market', 'No stops'] },
      correct: 0, explain: { en: 'Limits teach patience.', ur: 'Limits sabr sikhati hain.' } },
    { q: { en: 'Paper trading’s main job:', ur: 'Paper trading ka main kaam kya hai:' },
      opts: { en: ['Practice process without risking rent', 'Prove you will be rich', 'Skip journaling'], ur: ['Process practice karo bina rent risk ke', 'Rich proof', 'Skip journal'] },
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
<p>Before you size, name the <strong>structure</strong> you think you see. Worked charts below are literacy labels — not live signals.</p>
{{chart:hh-hl}}
{{chart:range-sr}}
<p>If checklist fails → no trade. That is the lesson.</p>
<p>{{redflag:Skipping checklist “just once” starts revenge trades.}}</p>`,
    ur: `<p>Jab ready ho — pehle nahi — Practice / Practice Ledger (aur Journal desk) use karo.</p>
<p><strong>Workflow:</strong> (1) One-sentence setup. (2) Pre-trade checklist (stop, risk %, calm, plan). (3) Calculator se size. (4) Paper/demo order. (5) Entry, stop, exit, emotion log karo. (6) Debrief: process follow hua? — sirf "sahi tha ya nahi" nahi.</p>
<p>Size se pehle jo <strong>structure</strong> lagta hai uska naam lo. Neeche charts literacy labels hain — live signal nahi.</p>
{{chart:hh-hl}}
{{chart:range-sr}}
<p>Checklist fail → no trade. Yehi lesson hai.</p>
<p>{{redflag:Checklist ek baar skip karna revenge trades shuru karta hai.}}</p>`,
  },
  workedExample: {
    en: `<p>Five paper trades this week. If revenge urge appears, log “urge — skipped” — that counts as discipline win.</p>
<p>Read these two context charts before your first paper entry this week:</p>
{{chart:engulf-support}}
{{chart:pin-reject}}`,
    ur: `<p>Is hafte paanch paper trades. Revenge urge aaye to "urge — skipped" log karo — ye discipline win hai.</p>
<p>Pehle paper entry se pehle ye do context charts padho:</p>
{{chart:engulf-support}}
{{chart:pin-reject}}`,
  },
  commonMistake: {
    en: `<p>Calling green P&L a pass when the checklist was skipped.</p>`,
    ur: `<p>Green P&L + skipped checklist = fail.</p>`,
  },
  exitTicket: {
    en: 'You can recite the six workflow steps without looking.',
    ur: 'Chhe workflow steps bina dekhe bol sakte ho.',
  },
  notebookPrompt: {
    en: 'Paste your pre-trade checklist. Mark any step you tend to skip.',
    ur: 'Checklist likho; skip habit mark karo.',
  },
  flashcardSeeds: [
    { front: { en: 'Incomplete checklist means', ur: 'Incomplete checklist' }, back: { en: 'No trade.', ur: 'No trade.' } },
    { front: { en: 'Good debrief focuses on', ur: 'Achi debrief kis cheez pe focus karti hai' }, back: { en: 'Whether process was followed — not only dollar P&L.', ur: 'Process follow hua ya nahi — sirf dollar P&L nahi.' } },
    { front: { en: 'Emotion tags help spot', ur: 'Emotion tags kya spot karne mein madad karte hain' }, back: { en: 'Revenge / FOMO clusters that destroy expectancy.', ur: 'Revenge / FOMO clusters jo expectancy tabah karte hain.' } },
    { front: { en: 'Practice desk lives in', ur: 'Practice desk kahan rehta hai' }, back: { en: 'Practice / Journal — not the school homeboard alone.', ur: 'Practice / Journal mein — sirf school homeboard nahi.' } },
    { front: { en: 'Paper win then full live size', ur: 'Paper jeet ke baad full live size' }, back: { en: 'Common wipe story — size up slowly with rules.', ur: 'Common wipe — dheere size.' } },
  ],
  get body() {
    return { en: partsHtml(this, 'en'), ur: partsHtml(this, 'ur') };
  },
  quiz: [
    { q: { en: 'If the pre-trade checklist is incomplete:', ur: 'Agar pre-trade checklist incomplete ho to:' },
      opts: { en: ['Skip the trade', 'Increase leverage', 'Ask a signal group'], ur: ['Skip', 'Leverage', 'Signal'] },
      correct: 0, explain: { en: 'No checklist = no trade.', ur: 'No checklist = no trade.' } },
    { q: { en: 'A good debrief focuses on:', ur: 'Achi debrief kis cheez pe focus karti hai:' },
      opts: { en: ['Whether process was followed', 'Only dollar P&L', 'Blaming the broker every time'], ur: ['Process', 'Sirf P&L', 'Broker blame'] },
      correct: 0, explain: { en: 'Process quality compounds.', ur: 'Process compound.' } },
    { q: { en: 'Emotion tags help you spot:', ur: 'Emotion tags se tum kya spot kar sakte ho:' },
      opts: { en: ['Revenge / FOMO clusters', 'Next guaranteed winner', 'Tax rates automatically'], ur: ['Revenge/FOMO', 'Guaranteed winner', 'Tax'] },
      correct: 0, explain: { en: 'Emotions often cluster before blowups.', ur: 'Blowup se pehle cluster.' } },
    { q: { en: 'Practice ledger / desk is for:', ur: 'Practice ledger / desk kis liye hai:' },
      opts: { en: ['Process practice with logs', 'Proving you are rich', 'Skipping stops'], ur: ['Process + logs', 'Rich proof', 'Skip stops'] },
      correct: 0, explain: { en: 'Logs + process grade — not profit worship.', ur: 'Logs + process grade — profit worship nahi.' } },
  ],
},
{
  id: 6,
  title: { en: 'Risk % & Unlock Gate', ur: 'Risk % aur Unlock' },
  objective: {
    en: 'Compute risk $ and size from stop distance; know how Foundations unlocks specialties.',
    ur: 'Stop distance se risk $ aur size compute karo; Foundations specialties kaise unlock karta samjho.',
  },
  teach: {
    en: `<p><strong>Risk $</strong> = balance × risk %. <strong>Size</strong> ≈ risk $ ÷ stop distance (in your venue’s units). Wider stop → smaller size.</p>
<p>Paper start ≤0.5–1% risk per idea. Never risk rent, tuition, or emergency cash.</p>
<p><strong>Unlock:</strong> Finish all Foundations weeks <em>or</em> pass the Foundations exam → Crypto, Stocks, and Forex open together. That is literacy readiness — not “trade-ready forever.”</p>
<p>{{redflag:“Double size because I’m sure” fights risk %.}}</p>`,
    ur: `<p><strong>Risk $</strong> = balance × risk %. <strong>Size</strong> ≈ risk $ ÷ stop distance (venue units mein). Wider stop → chhoti size.</p>
<p>Paper start ≤0.5–1% risk per idea. Rent, tuition, emergency cash kabhi risk mat karo.</p>
<p><strong>Unlock:</strong> Saari Foundations weeks complete karo <em>ya</em> Foundations exam pass karo → Crypto, Stocks, aur Forex ek saath khulte. Ye literacy readiness — "trade-ready forever" nahi.</p>
<p>{{redflag:"Sure hoon isliye double size" risk % se ladta hai.}}</p>`,
  },
  workedExample: {
    en: `<p>Balance $10,000, risk 1% → risk $100. If stop is $2 away per unit, size ≈ 50 units (venue rules apply).</p>`,
    ur: `<p>Balance $10,000, risk 1% → risk $100. Stop per unit $2 door ho to size ≈ 50 units (venue rules apply).</p>`,
  },
  commonMistake: {
    en: `<p>Picking leverage first, then inventing a stop to match — reverse the order: stop first, size second.</p>`,
    ur: `<p>Pehle leverage sochna phir stop match karna — ulta karo: pehle stop, phir size.</p>`,
  },
  exitTicket: {
    en: 'You can compute risk $ and explain the Foundations unlock gate.',
    ur: 'Risk $ compute kar sakte ho aur Foundations unlock gate explain kar sakte ho.',
  },
  notebookPrompt: {
    en: 'Write your max risk % and max daily loss rule. Sign it.',
    ur: 'Max risk % + daily loss rule likho.',
  },
  flashcardSeeds: [
    { front: { en: '$10,000 at 1% risk $', ur: '10k @ 1%' }, back: { en: '$100', ur: '$100' } },
    { front: { en: 'Wider stop, fixed risk %', ur: 'Wider stop, fixed risk % ke sath' }, back: { en: 'Smaller position size.', ur: 'Position size chhoti honi chahiye.' } },
    { front: { en: 'Risk $ formula starts with', ur: 'Risk $ formula kahan se shuru hota hai' }, back: { en: 'Balance × risk %.', ur: 'Balance × risk %.' } },
    { front: { en: 'Foundations unlock opens', ur: 'Foundations unlock kya kholta hai' }, back: { en: 'Crypto, Stocks, and Forex together (after weeks or exam).', ur: 'Crypto, Stocks, aur Forex saath (weeks ya exam ke baad).' } },
    { front: { en: '“Zero-to-hero” here means', ur: 'Yahan “zero-to-hero” ka matlab kya hai' }, back: { en: 'Ready to practice with rules — not guaranteed rich.', ur: 'Rules se practice — rich guarantee nahi.' } },
  ],
  formula: {
    en: 'risk $ = balance × risk% · size ≈ risk $ ÷ stop distance',
    ur: 'risk $ = balance × risk% · size ≈ risk $ ÷ stop distance',
  },
  get body() {
    return { en: partsHtml(this, 'en'), ur: partsHtml(this, 'ur') };
  },
  quiz: [
    { q: { en: 'If balance is $10,000 and risk is 1%, risk $ is:', ur: 'Balance $10,000 aur risk 1% ho to risk $ kitna:' },
      opts: { en: ['$100', '$1,000', '$10'], ur: ['$100', '$1,000', '$10'] },
      correct: 0, explain: { en: '10,000 × 0.01 = 100.', ur: '100.' } },
    { q: { en: 'Wider stop with fixed risk % means:', ur: 'Fixed risk % ke sath wider stop ka matlab:' },
      opts: { en: ['Smaller position size', 'Larger position size', 'No change'], ur: ['Chhoti size', 'Bari', 'Same'] },
      correct: 0, explain: { en: 'Same risk $ over more distance → less size.', ur: 'Same risk $ zyada distance pe → kam size.' } },
    { q: { en: 'After Foundations gate, specialties that unlock together:', ur: 'Foundations gate ke baad jo specialties saath unlock hoti hain:' },
      opts: { en: ['Crypto, Stocks, Forex', 'Only binary options', 'Max-leverage perps day one'], ur: ['Crypto/Stocks/Forex', 'Binary', 'Max perps'] },
      correct: 0, explain: { en: 'Core markets after Foundations literacy.', ur: 'Core after Foundations.' } },
    { q: { en: '“Zero-to-hero” in this school means:', ur: 'Is school mein “zero-to-hero” ka matlab:' },
      opts: { en: ['Ready to practice with rules', 'Guaranteed rich in 30 days', 'Skipping risk forever'], ur: ['Rules se ready', '30 din rich', 'Risk skip'] },
      correct: 0, explain: { en: 'Process-ready adult — not lottery winner.', ur: 'Process-ready adult — lottery winner nahi.' } },
  ],
},
];

export const FOUNDATIONS_PLACEMENT = [
  { topic: 1, q: { en: 'Before risking money, a beginner should first have:', ur: 'Paisa risk karne se pehle beginner ke paas pehle kya hona chahiye:' }, opts: { en: ['A written plan and paper-trade record', 'A hot tip', 'A loan for margin'], ur: ['Likha hua plan aur paper-trade record hona chahiye', 'Hot tip', 'Margin loan'] }, correct: 0 },
  { topic: 1, q: { en: 'Course completion guarantees income:', ur: 'Course complete karne se income ki guarantee hoti hai:' }, opts: { en: ['False', 'True', 'Only weekends'], ur: ['False', 'True', 'Weekend'] }, correct: 0 },
  { topic: 2, q: { en: 'Sharing a seed with “support” is:', ur: 'Seed “support” ke sath share karna kya hai:' }, opts: { en: ['Never acceptable', 'OK with a logo', 'Required by exchanges'], ur: ['Kabhi nahi', 'Logo OK', 'Exchanges ke liye required — seed share ke liye nahi'] }, correct: 0 },
  { topic: 2, q: { en: 'Guaranteed daily returns are:', ur: 'Guaranteed daily:' }, opts: { en: ['A scam red flag', 'Normal investing', 'Required by SECP'], ur: ['Red flag', 'Normal', 'SECP'] }, correct: 0 },
  { topic: 3, q: { en: 'PSX shares should be in:', ur: 'PSX shares kahan honi chahiye:' }, opts: { en: ['Your CDC / name custody', 'A tip channel wallet', 'Cash under mattress only'], ur: ['Tumhare naam pe CDC custody honi chahiye', 'Tip wallet', 'Sirf mattress ke neeche cash — galat custody frame'] }, correct: 0 },
  { topic: 3, q: { en: 'Before large deposits, test:', ur: 'Bari deposit se pehle kya test karna chahiye:' }, opts: { en: ['A small withdrawal', 'Max leverage', 'VPN only'], ur: ['Chhota withdrawal', 'Max lev', 'VPN'] }, correct: 0 },
  { topic: 4, q: { en: 'Limit orders prioritize:', ur: 'Limit orders kis ko priority dete hain:' }, opts: { en: ['Price control over instant fill', 'Instant fill over price', 'Ignoring the book'], ur: ['Instant fill se zyada price control priority deti hai', 'Instant > price', 'Ignore book'] }, correct: 0 },
  { topic: 4, q: { en: 'Bid/ask spread is:', ur: 'Bid/ask spread kya hota hai:' }, opts: { en: ['A trading cost when you cross it', 'Always zero', 'Only for options'], ur: ['Jab tum spread cross karo to trading cost hoti hai', 'Zero', 'Sirf options'] }, correct: 0 },
  { topic: 5, q: { en: 'Incomplete checklist means:', ur: 'Incomplete checklist ka matlab kya hai:' }, opts: { en: ['No trade', 'Double size', 'Ask Telegram'], ur: ['No trade', 'Double', 'Telegram'] }, correct: 0 },
  { topic: 5, q: { en: 'Debrief should focus on:', ur: 'Debrief ko kis pe focus karna chahiye:' }, opts: { en: ['Process followed', 'Only P&L', 'Broker blame'], ur: ['Process', 'P&L', 'Blame'] }, correct: 0 },
  { topic: 6, q: { en: 'Risk $ formula starts with:', ur: 'Risk $ formula kis se shuru hoti hai:' }, opts: { en: ['Balance × risk %', 'Leverage × hope', 'Win rate × 100'], ur: ['Balance × risk %', 'Leverage', 'Win rate'] }, correct: 0 },
  { topic: 6, q: { en: 'Foundations gate unlocks:', ur: 'Foundations gate kya unlock karta hai:' }, opts: { en: ['Crypto, Stocks, Forex', 'Binary income', 'Guaranteed bots'], ur: ['Crypto/Stocks/Forex', 'Binary', 'Bots'] }, correct: 0 },
];
