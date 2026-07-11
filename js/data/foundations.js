/* ============================================================
   foundations.js — Zero-to-hero school start. 6 bilingual weeks.
   How markets work, scams, open regulated account, orders,
   paper trade, risk % — then hand off to Investing track.
   Literacy + process. Not income promise.
   ============================================================ */

export const FOUNDATIONS_WEEKS = [
{
  id: 1,
  title: { en: 'What This School Is', ur: 'Ye School Kya Hai' },
  body: {
    en: `<p>MasteryCap is a <strong>school</strong>, not a broker and not a tip service. You learn frameworks: how markets work, how to open a regulated account, how to size risk, and how to journal. Completing lessons does <em>not</em> mean you will earn a salary from charts.</p>
<p><strong>Honest earn path in this app:</strong> long-horizon investing and spot ownership with low fees — time + discipline. Trading (perps, forex, futures) is optional later, after paper practice. Binary options are harm-reduction only — earn size <strong>$0</strong>.</p>
<p>Tabs: <strong>Home</strong> = campus (next lesson). <strong>Learn</strong> = courses. <strong>Journal</strong> = practice desk (balance, checklist, trade log) when <em>you</em> choose. <strong>Progress</strong> = study + journal analytics.</p>
<p>{{redflag:Anyone promising “complete this course → weekly income” is selling fantasy. Literacy ≠ paycheck.}}</p>`,
    ur: `<p>MasteryCap ek <strong>school</strong> hai — broker nahi, tip service nahi. Frameworks seekhte ho: markets kaise chalte, regulated account kaise kholo, risk size, journal. Lessons complete = charts se salary <em>nahi</em>.</p>
<p><strong>Imandar earn path:</strong> long-horizon investing + spot, low fees — time + discipline. Trading (perps, forex, futures) baad mein, paper ke baad. Binary = harm-reduction — earn size <strong>$0</strong>.</p>
<p>Tabs: <strong>Home</strong> = campus. <strong>Learn</strong> = courses. <strong>Journal</strong> = practice desk jab <em>tum</em> chaho. <strong>Progress</strong> = study + journal analytics.</p>
<p>{{redflag:Jo “course complete → weekly income” promise kare — fantasy bech raha. Literacy ≠ paycheck.}}</p>`,
  },
  quiz: [
    { q: { en: 'MasteryCap is primarily a:', ur: 'MasteryCap pehle:' },
      opts: { en: ['School for literacy and risk frameworks', 'Live broker that places trades for you', 'Tip channel with guaranteed picks'], ur: ['Literacy + risk school', 'Live broker jo trade lagaye', 'Guaranteed tips channel'] },
      correct: 0, explain: { en: 'No live orders, no tips. You study and practice locally.', ur: 'Na live orders, na tips. Local study + practice.' } },
    { q: { en: 'Completing a track guarantees:', ur: 'Track complete guarantee:' },
      opts: { en: ['Nothing about income — only literacy progress', 'Weekly cash from markets', 'A licensed broker certificate'], ur: ['Income nahi — sirf literacy', 'Weekly cash', 'Licensed broker certificate'] },
      correct: 0, explain: { en: 'XP and unlocks measure study, not profit.', ur: 'XP = study, profit nahi.' } },
    { q: { en: 'Where do balance and win rate belong in this app?', ur: 'Balance aur win rate kahan?' },
      opts: { en: ['Journal practice desk — not the school Home', 'Always on Home as the main hero', 'Only in Settings'], ur: ['Journal desk — Home pe nahi', 'Hamesha Home hero', 'Sirf Settings'] },
      correct: 0, explain: { en: 'Home is campus. Desk tools live in Journal when you want practice.', ur: 'Home = campus. Desk = Journal.' } },
    { q: { en: 'Closest honest “earn” framing here is:', ur: 'Yahan imandar “earn”:' },
      opts: { en: ['Investing / spot compounding over years', 'Daily scalping with max leverage', 'Binary options every hour'], ur: ['Investing / spot compounding', 'Max leverage scalp', 'Har ghanta binary'] },
      correct: 0, explain: { en: 'Time + low fees + survival. Not day-trading salary.', ur: 'Time + low fees. Day-trading salary nahi.' } },
  ],
},
{
  id: 2,
  title: { en: 'Scams, Tips & Leverage Bait', ur: 'Scams, Tips aur Leverage Bait' },
  body: {
    en: `<p>Before you open any account, learn the traps. <strong>Signal groups</strong> that demand fees for “VIP entries,” <strong>recovery scammers</strong> after a loss, <strong>fake brokers</strong> with pretty apps and no license, and <strong>leverage ads</strong> that show only winners.</p>
<p>Rules: never send money to a “manager” wallet. Never share seed phrases or OTP. Verify the firm on the official regulator site (SECP / PSX for Pakistan equities; your country’s securities regulator for brokers). If returns are “guaranteed,” walk away.</p>
<p>{{compare:invest-vs-trade}}</p>
<p>Leverage is not free money — it is a loan that can liquidate you. Beginners who skip Foundations and jump to 50x usually fund someone else’s bonus.</p>`,
    ur: `<p>Account se pehle traps. <strong>Signal groups</strong> jo VIP fees mangte, <strong>recovery scammers</strong>, <strong>fake brokers</strong>, <strong>leverage ads</strong> jo sirf winners dikhate.</p>
<p>Rules: “manager” wallet pe paisa mat bhejo. Seed/OTP share mat karo. Firm regulator site pe verify (SECP/PSX; apna country regulator). “Guaranteed returns” = walk away.</p>
<p>Leverage free money nahi — loan hai jo liquidate kar sakta. Foundations skip karke 50x = aksar doosre ka bonus.</p>`,
  },
  quiz: [
    { q: { en: 'A stranger asks for your seed phrase to “help recover funds.” You:', ur: 'Stranger seed mangta “recover” ke liye. Tum:' },
      opts: { en: ['Refuse — never share seed or OTP', 'Send it if they sound official', 'Post it in the group for advice'], ur: ['Refuse — seed/OTP kabhi nahi', 'Official lage to bhej do', 'Group mein post'] },
      correct: 0, explain: { en: 'Anyone with the seed owns the wallet. No support needs it.', ur: 'Seed = ownership. Support ko nahi chahiye.' } },
    { q: { en: '“Guaranteed 5% daily” from a tip seller is:', ur: '“Guaranteed 5% daily” tip seller:' },
      opts: { en: ['A red flag — walk away', 'Normal for professionals', 'Proof the strategy works'], ur: ['Red flag — walk away', 'Professionals ke liye normal', 'Strategy proof'] },
      correct: 0, explain: { en: 'Guarantees in markets are marketing, not math.', ur: 'Guarantee = marketing, math nahi.' } },
    { q: { en: 'Before funding a broker you should:', ur: 'Broker fund se pehle:' },
      opts: { en: ['Verify license on the official regulator site', 'Trust Instagram ads', 'Only check Telegram reviews'], ur: ['Regulator site pe license verify', 'Instagram ads pe bharosa', 'Sirf Telegram reviews'] },
      correct: 0, explain: { en: 'Regulator lists beat influencer screenshots.', ur: 'Regulator list > influencer screenshot.' } },
    { q: { en: 'High leverage ads that show only wins omit:', ur: 'High leverage ads jo sirf wins dikhate chhupate:' },
      opts: { en: ['Liquidation and loss frequency', 'That fees exist', 'That charts exist'], ur: ['Liquidation aur loss frequency', 'Fees', 'Charts'] },
      correct: 0, explain: { en: 'Selection bias sells the product. Survivors speak; blown accounts stay quiet.', ur: 'Selection bias. Survivors bolte; blown silent.' } },
  ],
},
{
  id: 3,
  title: { en: 'Open a Regulated Account', ur: 'Regulated Account Kholo' },
  body: {
    en: `<p>This is the practical “how to make an account” week — process, not a broker endorsement.</p>
<p><strong>Pakistan equities (PSX path):</strong> (1) Pick a PSX-licensed broker (TREC) listed on PSX/SECP sites. (2) Complete KYC (CNIC, selfie, proof of address as required). (3) Open a <strong>CDC sub-account</strong> so shares sit in <em>your</em> name — not only on a broker house screen. (4) Fund via official bank channels. (5) Test a small deposit and a small withdrawal before size.</p>
<p><strong>Crypto / global brokers:</strong> Prefer regulated venues where you live. Complete KYC. Enable 2FA (app, not SMS if possible). Start with a tiny deposit. Never keep life savings on an exchange IOU.</p>
<p><strong>Homework checklist:</strong> screenshot the license page, write the firm’s legal name, confirm withdrawal method works, set a monthly funding cap.</p>
<p>{{xref:invest:4:PSX & CDC mechanics deepen in Investing}}</p>`,
    ur: `<p>Ye “account kaise kholo” week — process, broker endorsement nahi.</p>
<p><strong>PSX:</strong> (1) PSX/SECP pe listed TREC broker. (2) KYC (CNIC, selfie, address). (3) <strong>CDC sub-account</strong> — shares <em>tumhare</em> naam. (4) Official bank se fund. (5) Chhota deposit + withdrawal test.</p>
<p><strong>Crypto / global:</strong> Regulated venue. KYC. 2FA. Tiny deposit. Life savings exchange pe mat rakho.</p>
<p><strong>Homework:</strong> license page screenshot, legal name likho, withdrawal test, monthly funding cap.</p>`,
  },
  quiz: [
    { q: { en: 'On PSX, shares should ultimately sit in:', ur: 'PSX pe shares akhir mein:' },
      opts: { en: ['Your CDC / investor account in your name', 'Only the broker’s house account forever', 'A tip-seller’s wallet'], ur: ['Tumhare naam CDC / investor account', 'Sirf broker house forever', 'Tip-seller wallet'] },
      correct: 0, explain: { en: 'Custody in your name survives broker drama better than house accounts.', ur: 'Apne naam custody > house account.' } },
    { q: { en: 'KYC exists mainly to:', ur: 'KYC mainly:' },
      opts: { en: ['Identify you for regulated compliance', 'Guarantee you will profit', 'Let the broker tip you privately'], ur: ['Regulated identity', 'Profit guarantee', 'Private tips'] },
      correct: 0, explain: { en: 'Know-your-customer is compliance, not a performance promise.', ur: 'Compliance — performance promise nahi.' } },
    { q: { en: 'Before sending large size to a new venue you should:', ur: 'Badi size se pehle:' },
      opts: { en: ['Test a small withdrawal successfully', 'Skip tests to save time', 'Give remote desktop access to “support”'], ur: ['Chhota withdrawal test', 'Test skip', 'Support ko remote desktop'] },
      correct: 0, explain: { en: 'Deposits are easy; withdrawals prove the venue.', ur: 'Deposit asaan; withdrawal proof.' } },
    { q: { en: 'This lesson endorses:', ur: 'Ye lesson endorse:' },
      opts: { en: ['A process checklist — not a specific affiliate broker', 'One secret broker that always wins', 'Skipping regulation if fees are low'], ur: ['Process checklist — affiliate broker nahi', 'Secret winning broker', 'Regulation skip agar fees kam'] },
      correct: 0, explain: { en: 'We teach how to verify. We do not sell a broker.', ur: 'Verify seekhao. Broker nahi bechte.' } },
  ],
},
{
  id: 4,
  title: { en: 'Orders: Market, Limit, Stop', ur: 'Orders: Market, Limit, Stop — farq' },
  body: {
    en: `<p>Every quote has a <strong>bid</strong> (buyers) and <strong>ask</strong> (sellers). The spread is a cost you pay when you cross it.</p>
<p><strong>Market order:</strong> fill now at whatever is available — fast, can slip. <strong>Limit order:</strong> fill only at your price or better — patient, may not fill. <strong>Stop / stop-limit:</strong> becomes active after a trigger — used for exits and breakout entries; understand your venue’s exact rules.</p>
<p>Beginner drill (2 weeks): place only limits on paper or tiny size. Notice how often emotion wants a market chase.</p>
<p>{{compare:limit-vs-market}}</p>
<p>Paper trading: use the broker’s demo if available, or log hypothetical fills in Journal with emotion tags — same discipline, zero capital risk.</p>`,
    ur: `<p>Har quote: <strong>bid</strong> / <strong>ask</strong>. Spread = cost.</p>
<p><strong>Market:</strong> abhi fill — slip ho sakta. <strong>Limit:</strong> sirf tumhari price ya behtar — fill na ho. <strong>Stop:</strong> trigger ke baad — venue rules padho.</p>
<p>Beginner: 2 hafte sirf limits (paper/tiny). Dekho emotion kitni baar market chase mangti.</p>
<p>Paper: demo ya Journal mein hypothetical fills + emotion — discipline, zero capital risk.</p>`,
  },
  quiz: [
    { q: { en: 'A limit buy fills:', ur: 'Limit buy fill:' },
      opts: { en: ['At your limit price or better — or not at all', 'Always instantly at any price', 'Only after liquidation'], ur: ['Limit ya behtar — ya bilkul nahi', 'Hamesha kisi bhi price', 'Sirf liquidation ke baad'] },
      correct: 0, explain: { en: 'Limits protect price; they do not guarantee a fill.', ur: 'Price protect; fill guarantee nahi.' } },
    { q: { en: 'Crossing the spread with a market order means you:', ur: 'Market order se spread cross:' },
      opts: { en: ['Pay the ask (to buy) or hit the bid (to sell)', 'Always get mid-price', 'Avoid all fees'], ur: ['Buy pe ask / sell pe bid', 'Hamesha mid', 'Sab fees avoid'] },
      correct: 0, explain: { en: 'Urgency costs the spread.', ur: 'Jaldi = spread cost.' } },
    { q: { en: 'Best early habit for order type is:', ur: 'Shuru mein order habit:' },
      opts: { en: ['Prefer limits; notice chase urges', 'Always market for “certainty”', 'Never use stops'], ur: ['Limits prefer; chase urge dekho', 'Hamesha market', 'Kabhi stop nahi'] },
      correct: 0, explain: { en: 'Limits teach patience; markets teach FOMO fills.', ur: 'Limits = sabar; market = FOMO fills.' } },
    { q: { en: 'Paper trading’s main job is:', ur: 'Paper trading ka kaam:' },
      opts: { en: ['Practice process without risking rent money', 'Prove you will be rich', 'Skip journaling forever'], ur: ['Process practice bina rent risk', 'Rich proof', 'Journal forever skip'] },
      correct: 0, explain: { en: 'Process reps beat fantasy P&L screenshots.', ur: 'Process reps > fantasy P&L.' } },
  ],
},
{
  id: 5,
  title: { en: 'First Paper Trade Workflow', ur: 'Pehla Paper Trade Workflow' },
  body: {
    en: `<p>When you are ready for practice — not before — open the <strong>Journal</strong> tab (practice desk).</p>
<p><strong>Workflow:</strong> (1) Write the setup in one sentence. (2) Complete the pre-trade checklist (stop, risk %, calm, plan). (3) Compute size with the calculator. (4) Place the paper/demo order. (5) Log entry, stop, exit, emotion. (6) Debrief: process followed? Yes/no — not “was I right about the market.”</p>
<p>Home stays school. Desk stays optional until this week clicks. If checklist fails, no trade — that is the lesson.</p>
<p>{{redflag:Skipping the checklist “just this once” is how revenge trades start.}}</p>`,
    ur: `<p>Practice ke liye tayar ho — pehle nahi — <strong>Journal</strong> (practice desk) kholo.</p>
<p><strong>Workflow:</strong> (1) Setup ek jumla. (2) Checklist (stop, risk %, calm, plan). (3) Calculator se size. (4) Paper/demo order. (5) Log entry/stop/exit/emotion. (6) Debrief: process? Haan/nahi — “market sahi thi?” nahi.</p>
<p>Home = school. Desk optional jab tak ye week click na ho. Checklist fail = no trade.</p>`,
  },
  quiz: [
    { q: { en: 'Practice desk (balance, checklist, log) lives in:', ur: 'Practice desk kahan:' },
      opts: { en: ['Journal', 'Home hero forever', 'Only Progress'], ur: ['Journal', 'Hamesha Home hero', 'Sirf Progress'] },
      correct: 0, explain: { en: 'School Home; desk Journal.', ur: 'Home school; desk Journal.' } },
    { q: { en: 'If the pre-trade checklist is incomplete you should:', ur: 'Checklist incomplete ho to:' },
      opts: { en: ['Skip the trade', 'Increase leverage to finish faster', 'Ask a signal group'], ur: ['Trade skip', 'Leverage barhao', 'Signal group'] },
      correct: 0, explain: { en: 'No checklist = no trade. That is the rule.', ur: 'Checklist nahi = trade nahi.' } },
    { q: { en: 'A good debrief focuses on:', ur: 'Achhi debrief:' },
      opts: { en: ['Whether process was followed', 'Only the dollar P&L', 'Blaming the broker for every loss'], ur: ['Process follow hua?', 'Sirf dollar P&L', 'Har loss pe broker blame'] },
      correct: 0, explain: { en: 'Process quality compounds; one P&L number does not.', ur: 'Process compound; ek P&L nahi.' } },
    { q: { en: 'Logging emotion tags helps you spot:', ur: 'Emotion tags madad:' },
      opts: { en: ['Revenge / FOMO clusters that destroy expectancy', 'The next guaranteed winner', 'Tax rates automatically'], ur: ['Revenge/FOMO clusters', 'Next guaranteed winner', 'Auto tax'] },
      correct: 0, explain: { en: 'Flagged emotions often cluster before blowups.', ur: 'Flagged emotions blowup se pehle cluster.' } },
  ],
},
{
  id: 6,
  title: { en: 'Risk % & Next Track', ur: 'Risk % aur Agla Track' },
  body: {
    en: `<p><strong>Risk $</strong> = account balance × risk %. <strong>Position size</strong> ≈ risk $ ÷ distance to stop (in price terms your venue uses). If the stop is wider, size shrinks. That is the whole beginner formula.</p>
<p>Start at ≤0.5–1% risk per idea on paper. Never risk rent, tuition, or emergency cash.</p>
<p><strong>Graduation:</strong> Finish Foundations exam when ready → open <strong>Investing: PSX & Beyond</strong> on the beginner path (compounding). Then Spot. Trading tracks only after sizing is boring.</p>
<p>You now know: what the school is, how scams look, how to open a regulated account, how orders work, how to paper-trade with Journal, and how to size. That is zero-to-ready — not zero-to-rich.</p>`,
    ur: `<p><strong>Risk $</strong> = balance × risk %. <strong>Size</strong> ≈ risk $ ÷ stop distance. Stop wide = size chhoti.</p>
<p>Paper pe ≤0.5–1%/idea. Rent/emergency risk mat karo.</p>
<p><strong>Graduation:</strong> Foundations exam → beginner path pe <strong>Investing</strong> → Spot. Trading baad mein jab sizing boring ho.</p>
<p>Ab: school kya hai, scams, regulated account, orders, Journal paper trade, sizing. Zero-to-ready — zero-to-rich nahi.</p>`,
  },
  formula: {
    en: 'risk $ = balance × risk% · size ≈ risk $ ÷ stop distance',
    ur: 'risk $ = balance × risk% · size ≈ risk $ ÷ stop distance',
  },
  quiz: [
    { q: { en: 'If balance is $10,000 and risk is 1%, risk $ is:', ur: '$10,000 pe 1% risk $:' },
      opts: { en: ['$100', '$1,000', '$10'], ur: ['$100', '$1,000', '$10'] },
      correct: 0, explain: { en: '10,000 × 0.01 = 100.', ur: '10,000 × 0.01 = 100.' } },
    { q: { en: 'Wider stop with fixed risk % means:', ur: 'Wide stop + fixed risk %:' },
      opts: { en: ['Smaller position size', 'Larger position size', 'No change'], ur: ['Chhoti size', 'Bari size', 'Koi change nahi'] },
      correct: 0, explain: { en: 'Same risk $ spread over more price distance → less size.', ur: 'Same risk $ / zyada distance = kam size.' } },
    { q: { en: 'After Foundations, beginner path recommends next:', ur: 'Foundations ke baad beginner path:' },
      opts: { en: ['Investing (compounding) then Spot', 'Binary options for income', 'Max-leverage perps day one'], ur: ['Investing phir Spot', 'Binary for income', 'Day-one max perps'] },
      correct: 0, explain: { en: 'Compound path first. Trading later.', ur: 'Pehle compound. Trading baad.' } },
    { q: { en: '“Zero-to-hero” in this school means:', ur: 'Yahan “zero-to-hero”:' },
      opts: { en: ['Ready to open an account and practice with rules', 'Guaranteed rich in 30 days', 'Skipping risk forever'], ur: ['Account + rules se practice ready', '30 din rich guarantee', 'Risk forever skip'] },
      correct: 0, explain: { en: 'Hero = process-ready adult, not lottery winner.', ur: 'Hero = process-ready — lottery nahi.' } },
  ],
},
];

export const FOUNDATIONS_PLACEMENT = [
  { topic: 1, q: { en: 'This app’s Home tab is meant as a:', ur: 'Home tab matlab:' }, opts: { en: ['School campus', 'Live trading terminal', 'Broker deposit page'], ur: ['School campus', 'Live trading terminal', 'Broker deposit'] }, correct: 0 },
  { topic: 1, q: { en: 'Course completion guarantees income:', ur: 'Course complete income guarantee:' }, opts: { en: ['False', 'True', 'Only on weekends'], ur: ['False', 'True', 'Sirf weekend'] }, correct: 0 },
  { topic: 2, q: { en: 'Sharing a seed phrase with “support” is:', ur: 'Support ko seed dena:' }, opts: { en: ['Never acceptable', 'OK if they have a logo', 'Required by all exchanges'], ur: ['Kabhi nahi', 'Logo ho to OK', 'Har exchange require'] }, correct: 0 },
  { topic: 2, q: { en: 'Guaranteed daily returns are:', ur: 'Guaranteed daily returns:' }, opts: { en: ['A scam red flag', 'Normal investing', 'Required by SECP'], ur: ['Scam red flag', 'Normal investing', 'SECP require'] }, correct: 0 },
  { topic: 3, q: { en: 'PSX shares should be in:', ur: 'PSX shares:' }, opts: { en: ['Your CDC / name custody', 'A tip channel wallet', 'Cash under mattress only'], ur: ['CDC / apne naam', 'Tip wallet', 'Sirf mattress'] }, correct: 0 },
  { topic: 3, q: { en: 'Before large deposits, test:', ur: 'Badi deposit se pehle test:' }, opts: { en: ['A small withdrawal', 'Max leverage', 'VPN only'], ur: ['Chhota withdrawal', 'Max leverage', 'Sirf VPN'] }, correct: 0 },
  { topic: 4, q: { en: 'Limit orders prioritize:', ur: 'Limit orders:' }, opts: { en: ['Price control over instant fill', 'Instant fill over price', 'Ignoring the book'], ur: ['Price control > instant fill', 'Instant fill > price', 'Book ignore'] }, correct: 0 },
  { topic: 4, q: { en: 'Bid/ask spread is:', ur: 'Bid/ask spread:' }, opts: { en: ['A trading cost when you cross it', 'Always zero', 'Only for options'], ur: ['Cross pe cost', 'Hamesha zero', 'Sirf options'] }, correct: 0 },
  { topic: 5, q: { en: 'Incomplete checklist means:', ur: 'Incomplete checklist:' }, opts: { en: ['No trade', 'Double size', 'Ask Telegram'], ur: ['No trade', 'Double size', 'Telegram'] }, correct: 0 },
  { topic: 5, q: { en: 'Practice desk is in:', ur: 'Practice desk:' }, opts: { en: ['Journal', 'Home equity hero', 'Splash screen'], ur: ['Journal', 'Home equity', 'Splash'] }, correct: 0 },
  { topic: 6, q: { en: 'Risk $ formula starts with:', ur: 'Risk $ formula:' }, opts: { en: ['Balance × risk %', 'Leverage × hope', 'Win rate × 100'], ur: ['Balance × risk %', 'Leverage × hope', 'Win rate × 100'] }, correct: 0 },
  { topic: 6, q: { en: 'Next beginner track after Foundations:', ur: 'Foundations ke baad:' }, opts: { en: ['Investing', 'Binary income', 'Bots for guaranteed profit'], ur: ['Investing', 'Binary income', 'Guaranteed bots'] }, correct: 0 },
];
