/* Crypto literacy track — custody, fees, spot vs leverage, scams, process.
   Replaces chart-TA-first crypto weeks for v47 depth bar. */

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

export const CRYPTO_WEEKS = [
  week({
    id: 1,
    title: { en: 'Custody & Wallets', ur: 'Custody aur Wallets' },
    objective: {
      en: 'Distinguish self-custody vs exchange custody and protect seed phrases.',
      ur: 'Self-custody vs exchange custody farq; seed phrases protect karo.',
    },
    teach: {
      en: `<p><strong>Custody</strong> means who can move the asset. On an exchange, you hold an IOU — the venue can freeze, hack, or fail. <strong>Self-custody</strong> (wallet you control) means you hold keys — lose the seed and funds are gone; share the seed and funds are stolen.</p>
<p>Hot wallets (phone/browser) are convenient and more exposed. Hardware wallets reduce remote theft risk if used correctly. Never type a seed into a website that “validates” it.</p>
<p>{{redflag:Anyone asking for your seed is attacking you.}}</p>`,
      ur: `<p><strong>Custody</strong> = asset kaun move kar sakta. Exchange pe tumhare paas IOU hai — venue freeze, hack, ya fail kar sakti. <strong>Self-custody</strong> (wallet tum control) = keys tumhare — seed khoo to funds gaye; seed share to chori.</p>
<p>Hot wallets (phone/browser) aasaan magar zyada exposed. Hardware wallets remote theft kam karte — sahi use pe. Seed kisi “validate” website pe kabhi mat type karo.</p>
<p>{{redflag:Seed mange = attack.}}</p>`,
    },
    workedExample: {
      en: `<p>You buy BTC on an exchange. Until you withdraw to an address you control, the exchange is the custodian. A successful small withdrawal test proves you can exit.</p>`,
      ur: `<p>Exchange pe BTC kharido. Jab tak apne control wale address pe withdraw na karo, custodian exchange hai. Chhota successful withdrawal = exit prove.</p>`,
    },
    commonMistake: {
      en: `<p>Keeping life savings on an exchange because “withdrawals are annoying.”</p>`,
      ur: `<p>Life savings exchange pe rakhna kyunke “withdraw mushkil” — annoyance ≠ safety.</p>`,
    },
    exitTicket: { en: 'You can explain IOU vs keys in one sentence.', ur: 'Ek jumla mein IOU vs keys farq batao.' },
    notebookPrompt: { en: 'Write where your practice size will live (exchange vs wallet) and why.', ur: 'Practice size kahan rahegi (exchange vs wallet) aur kyun — likho.' },
    flashcardSeeds: [
      { front: { en: 'Exchange balance is usually', ur: 'Exchange balance' }, back: { en: 'An IOU — counterparty risk.', ur: 'IOU — counterparty risk.' } },
      { front: { en: 'Seed phrase equals', ur: 'Seed' }, back: { en: 'Ownership of the wallet.', ur: 'Ownership.' } },
      { front: { en: 'Support asks for seed', ur: 'Support seed' }, back: { en: 'Refuse — real support never needs it.', ur: 'Refuse.' } },
      { front: { en: 'Before trusting a venue with size', ur: 'Size se pehle' }, back: { en: 'Test a small withdrawal.', ur: 'Chhota withdrawal.' } },
      { front: { en: 'Hot wallet risk', ur: 'Hot wallet' }, back: { en: 'More convenience, more remote attack surface.', ur: 'Zyada attack surface.' } },
    ],
    quiz: [
      { q: { en: 'An exchange balance is best thought of as:', ur: 'Exchange balance:' },
        opts: { en: ['An IOU with counterparty risk', 'Guaranteed self-custody', 'A government bond'], ur: ['IOU', 'Self-custody', 'Bond'] },
        correct: 0, explain: { en: 'Venue controls the keys until you withdraw.', ur: 'Venue keys control.' } },
      { q: { en: 'If you share your seed phrase:', ur: 'Seed share:' },
        opts: { en: ['The other party can take the funds', 'Nothing happens', 'Only viewing rights'], ur: ['Funds le sakte', 'Kuch nahi', 'Sirf view'] },
        correct: 0, explain: { en: 'Seed = full control.', ur: 'Seed = control.' } },
      { q: { en: 'Best first custody habit:', ur: 'Habit:' },
        opts: { en: ['Test small withdrawal before large balances', 'Disable 2FA for speed', 'Email seed to yourself in plain text'], ur: ['Withdrawal test', '2FA off', 'Email seed'] },
        correct: 0, explain: { en: 'Withdrawals prove exit.', ur: 'Exit proof.' } },
      { q: { en: 'Hardware wallets mainly help against:', ur: 'Hardware:' },
        opts: { en: ['Remote malware stealing hot keys — if used correctly', 'All market risk', 'Guaranteed profits'], ur: ['Remote key theft', 'Market risk', 'Profits'] },
        correct: 0, explain: { en: 'They reduce some theft paths — not market risk.', ur: 'Theft paths — market risk nahi.' } },
    ],
  }),
  week({
    id: 2,
    title: { en: 'Fees, Spreads & Slippage', ur: 'Fees, Spreads, Slippage' },
    objective: {
      en: 'Account for fees, spread, and slippage before calling a trade “small.”',
      ur: 'Trade ko “chhota” kehne se pehle fees, spread, aur slippage hisaab karo.',
    },
    teach: {
      en: `<p>Every venue charges something: maker/taker fees, withdrawal fees, funding on perps. The <strong>spread</strong> is also a cost when you cross it. <strong>Slippage</strong> is getting a worse fill than expected in thin books.</p>
<p>A “tiny” scalp can be fee-negative. Compare round-trip cost to your edge hypothesis before size.</p>`,
      ur: `<p>Har venue charge leti: maker/taker fees, withdrawal fees, perps pe funding. <strong>Spread</strong> bhi cost jab cross karo. <strong>Slippage</strong> = thin book mein expected se worse fill.</p>
<p>“Chhota” scalp fee-negative ho sakta. Size se pehle round-trip cost vs edge compare karo.</p>`,
    },
    workedExample: {
      en: `<p>0.1% fee each way = 0.2% round trip before spread. If your target is 0.3%, most of the move is costs — not edge.</p>`,
      ur: `<p>Har taraf 0.1% fee = spread se pehle 0.2% round-trip. Agar target 0.3% hai, zyada move cost hai — edge nahi.</p>`,
    },
    commonMistake: {
      en: `<p>Ignoring funding rates on perps overnight — they can dominate short-horizon P&L.</p>`,
      ur: `<p>Raat bhar perps funding ignore — short-horizon P&L pe dominate kar sakti.</p>`,
    },
    exitTicket: { en: 'You can list three cost lines on your venue.', ur: 'Apni venue ki teen cost lines list kar sakte ho.' },
    notebookPrompt: { en: 'Open your venue fee schedule. Write maker, taker, withdrawal.', ur: 'Venue fee schedule kholo. Maker, taker, withdrawal likho.' },
    flashcardSeeds: [
      { front: { en: 'Spread is a cost when you', ur: 'Spread' }, back: { en: 'Cross it with a marketable order.', ur: 'Cross karo.' } },
      { front: { en: 'Slippage', ur: 'Slip' }, back: { en: 'Worse fill than expected, often in thin liquidity.', ur: 'Expected se worse fill.' } },
      { front: { en: 'Round-trip fee example', ur: 'Round-trip' }, back: { en: 'Fee in + fee out (+ spread/slip).', ur: 'In + out + spread.' } },
      { front: { en: 'Perps funding', ur: 'Funding' }, back: { en: 'Periodic payment between longs/shorts — can dominate short holds.', ur: 'Long/short payment.' } },
      { front: { en: 'Tiny scalp risk', ur: 'Scalp' }, back: { en: 'Costs can exceed the intended edge.', ur: 'Cost > edge.' } },
    ],
    quiz: [
      { q: { en: 'Crossing the spread means you typically:', ur: 'Spread cross:' },
        opts: { en: ['Pay a transaction cost baked into the quote', 'Earn the spread as rebate always', 'Avoid all fees'], ur: ['Quote mein cost', 'Hamesha rebate', 'No fees'] },
        correct: 0, explain: { en: 'Urgency pays the spread.', ur: 'Jaldi = spread.' } },
      { q: { en: 'Slippage is more likely when:', ur: 'Slip:' },
        opts: { en: ['Liquidity is thin or size is large vs the book', 'You use a limit that rests', 'Fees are zero'], ur: ['Thin book / bari size', 'Resting limit', 'Zero fees'] },
        correct: 0, explain: { en: 'Thin books move against marketable size.', ur: 'Thin book.' } },
      { q: { en: 'Before calling a scalp profitable you should:', ur: 'Scalp se pehle:' },
        opts: { en: ['Compare target move to round-trip costs', 'Ignore fees if confident', 'Only check Twitter'], ur: ['Cost vs target', 'Fees ignore', 'Twitter'] },
        correct: 0, explain: { en: 'Costs first.', ur: 'Costs pehle.' } },
      { q: { en: 'Funding rates matter most for:', ur: 'Funding:' },
        opts: { en: ['Holding perpetual futures across funding times', 'Spot HODL only', 'Bank savings accounts'], ur: ['Perps hold', 'Spot HODL', 'Bank'] },
        correct: 0, explain: { en: 'Funding is a perp mechanic.', ur: 'Perp mechanic.' } },
    ],
  }),
  week({
    id: 3,
    title: { en: 'Spot vs Leverage', ur: 'Spot vs Leverage' },
    objective: {
      en: 'Explain why leverage can liquidate and when spot ownership is the calmer path.',
      ur: 'Leverage liquidate kyun karti aur spot ownership kab calmer path hai — batao.',
    },
    teach: {
      en: `<p><strong>Spot</strong>: you own the asset (or an IOU for it). Downside is toward zero of that holding — not a forced liquidation from a lender in the same way.</p>
<p><strong>Leverage / perps / margin</strong>: borrowed exposure. A move against you can <strong>liquidate</strong> the position — you lose the margin. Leverage is an output of risk $ and stop distance, not a goal.</p>
<p>Beginners who skip Foundations for high leverage usually learn liquidation the expensive way.</p>
<p>{{redflag:“10× because I’m sure” — surety is not a risk system.}}</p>`,
      ur: `<p><strong>Spot</strong>: asset (ya uska IOU) own. Downside holding ke zero ki taraf — lender wala forced liquidation isi tarah nahi.</p>
<p><strong>Leverage / perps / margin</strong>: borrowed exposure. Khilaf move <strong>liquidate</strong> kar sakti — margin kho jati. Leverage risk $ aur stop distance ka output hai, goal nahi.</p>
<p>Jo beginners Foundations skip karke high leverage lete, aksar liquidation mehengi tareeke se seekhte.</p>
<p>{{redflag:“Sure hun is liye 10×” — surety risk system nahi.}}</p>`,
    },
    workedExample: {
      en: `<p>Same $100 risk: wide stop → small leveraged size; tight stop → larger size. Choosing “20×” first skips the risk math.</p>`,
      ur: `<p>Wahi $100 risk: wide stop → chhota leveraged size; tight stop → bara size. Pehle “20×” choose karna risk math skip hai.</p>`,
    },
    commonMistake: {
      en: `<p>Confusing paper wins on high leverage with skill that survives fees and stress live.</p>`,
      ur: `<p>High leverage pe paper wins ko live skill samajhna — fees aur stress alag hote.</p>`,
    },
    exitTicket: { en: 'You can define liquidation in plain words.', ur: 'Liquidation seedhe simple words mein define karo.' },
    notebookPrompt: { en: 'Write: “I will not use leverage until ___.” Fill the blank with a process condition.', ur: 'Likho: “Leverage tab tak nahi jab tak ___.” Blank mein process condition.' },
    flashcardSeeds: [
      { front: { en: 'Liquidation', ur: 'Liquidation' }, back: { en: 'Forced close when margin cannot cover the move against you.', ur: 'Margin khatam → forced close.' } },
      { front: { en: 'Leverage should be', ur: 'Leverage' }, back: { en: 'An output of risk $ and stop — not a starting goal.', ur: 'Output — goal nahi.' } },
      { front: { en: 'Spot ownership downside', ur: 'Spot' }, back: { en: 'Toward the value of the holding — not the same mechanic as margin liquidation.', ur: 'Holding value — margin liquidation alag.' } },
      { front: { en: 'Skip Foundations for 50×', ur: '50× skip' }, back: { en: 'Common wipe path.', ur: 'Common wipe.' } },
      { front: { en: '“I’m sure” sizing', ur: 'Sure sizing' }, back: { en: 'Emotion — not a risk formula.', ur: 'Emotion ≠ formula.' } },
    ],
    quiz: [
      { q: { en: 'Liquidation means:', ur: 'Liquidation:' },
        opts: { en: ['Forced close when margin is exhausted', 'A free bonus from the exchange', 'Guaranteed profit taking'], ur: ['Forced close', 'Bonus', 'Guaranteed profit'] },
        correct: 0, explain: { en: 'Margin gone → position closed.', ur: 'Margin gone.' } },
      { q: { en: 'Leverage is best treated as:', ur: 'Leverage:' },
        opts: { en: ['Output of risk math', 'A personality flex', 'Always 100×'], ur: ['Risk math output', 'Flex', '100×'] },
        correct: 0, explain: { en: 'Stop + risk $ decide size.', ur: 'Stop + risk$.' } },
      { q: { en: 'Calmer beginner path is usually:', ur: 'Beginner:' },
        opts: { en: ['Spot / low complexity first', 'Max leverage day one', 'Blind copy-trading'], ur: ['Spot pehle', 'Max lev', 'Copy'] },
        correct: 0, explain: { en: 'Complexity kills beginners.', ur: 'Complexity kills.' } },
      { q: { en: '“10× because sure” is:', ur: '10× sure:' },
        opts: { en: ['A process failure', 'Sound risk management', 'Required by venues'], ur: ['Process fail', 'Sound risk', 'Required'] },
        correct: 0, explain: { en: 'Surety ≠ risk system.', ur: 'Surety ≠ risk.' } },
    ],
  }),
  week({
    id: 4,
    title: { en: 'Crypto Scams & Social Pressure', ur: 'Crypto Scams' },
    objective: {
      en: 'Refuse rug pulls, fake support, airdrop drains, and urgency DMs.',
      ur: 'Rug, fake support, airdrop drain, urgency DM refuse.',
    },
    teach: {
      en: `<p>Crypto adds scam surface: fake apps, phishing sites, “support” in DMs, approval-draining airdrops, rug-pull tokens, and recovery scams after you already lost.</p>
<p>Rules: verify URLs, never rush, never approve unknown spenders, never share seeds, treat DMs as hostile until proven.</p>`,
      ur: `<p>Crypto mein scam surface bari: fake apps, phishing sites, DM “support,” approval-drain airdrops, rug-pull tokens, aur loss ke baad recovery scams.</p>
<p>Rules: URL verify, jaldi mat karo, unknown spender approve mat karo, seed share mat karo, DM ko proved hone tak hostile samjho.</p>`,
    },
    workedExample: {
      en: `<p>Airdrop site asks you to “verify wallet” and prompts a blind signature. That signature may grant token spend. Close the tab; verify contracts only from trusted docs.</p>`,
      ur: `<p>Airdrop site “wallet verify” ke liye blind signature mangti. Woh signature token spend de sakti. Tab band; contracts sirf trusted docs se verify.</p>`,
    },
    commonMistake: {
      en: `<p>Clicking the first Google/ad result for “exchange login” — phishing clone.</p>`,
      ur: `<p>“Exchange login” pe pehla Google/ad result click — phishing clone.</p>`,
    },
    exitTicket: { en: 'You have a personal “never do” list of five items.', ur: 'Apni personal “never do” list — paanch items — taiyar hai.' },
    notebookPrompt: { en: 'Write five never-do rules for crypto (seed, DM, approve, URL, recovery).', ur: 'Crypto ke paanch never-do rules likho (seed, DM, approve, URL, recovery).' },
    flashcardSeeds: [
      { front: { en: 'Default stance on crypto DMs', ur: 'DMs' }, back: { en: 'Hostile until proven — especially “support.”', ur: 'Hostile — especially support.' } },
      { front: { en: 'Blind wallet signature risk', ur: 'Blind sign' }, back: { en: 'May grant spend approvals that drain assets.', ur: 'Drain approvals.' } },
      { front: { en: 'Recovery agent after a hack', ur: 'Recovery' }, back: { en: 'Usually a second scam — never send more funds/seeds.', ur: 'Second scam.' } },
      { front: { en: 'Rug pull', ur: 'Rug' }, back: { en: 'Insiders drain liquidity / abandon the token.', ur: 'Liquidity drain.' } },
      { front: { en: 'Phishing login', ur: 'Phish' }, back: { en: 'Clone site steals credentials or prompts malicious signatures.', ur: 'Clone site.' } },
    ],
    quiz: [
      { q: { en: 'A DM claiming “exchange support” asks for seed. You:', ur: 'DM seed:' },
        opts: { en: ['Refuse and report', 'Send to be helpful', 'Send a partial seed'], ur: ['Refuse', 'Send', 'Partial'] },
        correct: 0, explain: { en: 'Support never needs seeds.', ur: 'No seeds.' } },
      { q: { en: 'Unknown airdrop “verify” prompts are dangerous because:', ur: 'Airdrop verify:' },
        opts: { en: ['They may request draining approvals', 'They always pay guaranteed yield', 'They are required by law'], ur: ['Drain approvals', 'Guaranteed yield', 'Law'] },
        correct: 0, explain: { en: 'Blind approvals drain.', ur: 'Drain.' } },
      { q: { en: 'After a loss, a recovery agent asks for more crypto. Likely:', ur: 'Recovery agent:' },
        opts: { en: ['A second scam', 'Official police process', 'Required insurance'], ur: ['Second scam', 'Police', 'Insurance'] },
        correct: 0, explain: { en: 'Recovery scams target victims twice.', ur: 'Do baar.' } },
      { q: { en: 'Best URL habit:', ur: 'URL:' },
        opts: { en: ['Type/bookmark official domains; distrust ads', 'Always click first ad', 'Trust any https lock'], ur: ['Official bookmark', 'First ad', 'Any https'] },
        correct: 0, explain: { en: 'Ads clone brands.', ur: 'Ads clone.' } },
    ],
  }),
  week({
    id: 5,
    title: { en: 'End-to-End Process', ur: 'End-to-End Process' },
    objective: {
      en: 'Run a sober crypto practice loop: venue → custody plan → size → log → review.',
      ur: 'Sober crypto practice loop chalao: venue → custody plan → size → log → review.',
    },
    teach: {
      en: `<p>Put it together: pick a venue you verified, define custody (what stays on exchange vs wallet), set risk %, prefer spot until process is boring, log every practice action, review weekly.</p>
<p>Chart toys come later. Without custody + risk + logs, charts are decoration.</p>`,
      ur: `<p>Milao: verified venue choose karo, custody define karo (exchange vs wallet kya rehta), risk % set, process boring hone tak spot prefer, har practice action log, haftawar review.</p>
<p>Chart toys baad mein. Bina custody + risk + logs, charts decoration hain.</p>`,
    },
    workedExample: {
      en: `<p>Practice card: “Buy $20 spot on verified venue → withdraw $5 test → log fees → no leverage.”</p>`,
      ur: `<p>Practice card: “Verified venue pe $20 spot → $5 withdraw test → fees log → no leverage.”</p>`,
    },
    commonMistake: {
      en: `<p>Jumping to perps because spot “isn’t exciting.” Excitement is not a syllabus.</p>`,
      ur: `<p>Spot “boring” laga to perps pe kudna. Excitement syllabus nahi.</p>`,
    },
    exitTicket: { en: 'You can recite your personal crypto practice loop.', ur: 'Apna personal crypto practice loop yaad se suna sakte ho.' },
    notebookPrompt: { en: 'Write your crypto practice loop in six bullets. Stick it on the Study desk.', ur: 'Crypto practice loop chhe bullets mein likho. Study desk pe chipkao.' },
    flashcardSeeds: [
      { front: { en: 'Charts without custody/risk/logs', ur: 'Charts only' }, back: { en: 'Decoration — not a process.', ur: 'Decoration.' } },
      { front: { en: 'Practice loop order', ur: 'Loop' }, back: { en: 'Verify → custody → risk → (spot) → log → review.', ur: 'Verify → custody → risk → log → review.' } },
      { front: { en: 'When leverage enters', ur: 'Leverage kab' }, back: { en: 'After process is boring on spot — if ever.', ur: 'Spot boring ke baad — if ever.' } },
      { front: { en: 'Weekly review asks', ur: 'Review' }, back: { en: 'What process broke? What fee surprised you?', ur: 'Process break? Fee surprise?' } },
      { front: { en: 'Excitement as a reason to trade', ur: 'Excitement' }, back: { en: 'Not a valid syllabus criterion.', ur: 'Syllabus nahi.' } },
    ],
    quiz: [
      { q: { en: 'Sober crypto practice starts with:', ur: 'Start:' },
        opts: { en: ['Verified venue + custody plan', 'Max leverage', 'Random token calls'], ur: ['Venue + custody', 'Max lev', 'Calls'] },
        correct: 0, explain: { en: 'Safety rails first.', ur: 'Rails pehle.' } },
      { q: { en: 'Logs matter because:', ur: 'Logs:' },
        opts: { en: ['They expose fee and process failures', 'They guarantee profits', 'Exchanges require public logs'], ur: ['Fee/process fail dikhate', 'Profit guarantee', 'Public required'] },
        correct: 0, explain: { en: 'Review needs data.', ur: 'Data.' } },
      { q: { en: 'Charts alone are insufficient because:', ur: 'Charts:' },
        opts: { en: ['Custody, risk, and costs still decide survival', 'Charts are illegal', 'Indicators always fail'], ur: ['Custody/risk/cost', 'Illegal', 'Always fail'] },
        correct: 0, explain: { en: 'Survival stack > shapes.', ur: 'Survival > shapes.' } },
      { q: { en: 'After this track you should unlock practice that is:', ur: 'Practice:' },
        opts: { en: ['Small, logged, rule-bound', 'All-in overnight', 'Signal-copy only'], ur: ['Small + logged', 'All-in', 'Signals'] },
        correct: 0, explain: { en: 'Process competence.', ur: 'Process.' } },
    ],
  }),
];

export const CRYPTO_PLACEMENT = [
  { topic: 1, q: { en: 'Exchange balances are primarily:', ur: 'Exchange:' }, opts: { en: ['IOUs with counterparty risk', 'Guaranteed self-custody', 'Insured forever always'], ur: ['IOU', 'Self-custody', 'Insured'] }, correct: 0 },
  { topic: 1, q: { en: 'Seed phrases should be:', ur: 'Seed:' }, opts: { en: ['Never shared', 'Sent to support freely', 'Posted for backup help'], ur: ['Kabhi share nahi', 'Support', 'Post'] }, correct: 0 },
  { topic: 2, q: { en: 'Round-trip trading cost includes:', ur: 'Cost:' }, opts: { en: ['Fees plus spread/slippage effects', 'Only the chart pattern', 'Only Twitter fees'], ur: ['Fees + spread/slip', 'Chart', 'Twitter'] }, correct: 0 },
  { topic: 2, q: { en: 'Funding rates mainly affect:', ur: 'Funding:' }, opts: { en: ['Perpetual futures holders', 'Spot HODLers only', 'Bank CDs'], ur: ['Perps', 'Spot only', 'CDs'] }, correct: 0 },
  { topic: 3, q: { en: 'Liquidation is:', ur: 'Liquidation:' }, opts: { en: ['Forced close when margin fails', 'A bonus', 'Optional decoration'], ur: ['Forced close', 'Bonus', 'Decoration'] }, correct: 0 },
  { topic: 3, q: { en: 'Leverage should be:', ur: 'Leverage:' }, opts: { en: ['Derived from risk math', 'Chosen for vibes', 'Always maximum'], ur: ['Risk math', 'Vibes', 'Max'] }, correct: 0 },
  { topic: 4, q: { en: 'Fake support DMs asking for seeds are:', ur: 'Fake support:' }, opts: { en: ['Attacks — refuse', 'Normal KYC', 'Required'], ur: ['Attack — refuse', 'KYC', 'Required'] }, correct: 0 },
  { topic: 4, q: { en: 'Blind airdrop signatures can:', ur: 'Airdrop sign:' }, opts: { en: ['Drain approvals', 'Mint free riskless yield', 'Replace 2FA'], ur: ['Drain', 'Free yield', 'Replace 2FA'] }, correct: 0 },
  { topic: 5, q: { en: 'Practice loop starts with:', ur: 'Loop:' }, opts: { en: ['Verify venue and custody plan', 'Max leverage entry', 'Copy the first signal'], ur: ['Verify + custody', 'Max lev', 'Signal'] }, correct: 0 },
  { topic: 5, q: { en: 'Charts without logs/risk/custody are:', ur: 'Charts only:' }, opts: { en: ['Decoration', 'Sufficient mastery', 'A license'], ur: ['Decoration', 'Mastery', 'License'] }, correct: 0 },
];
