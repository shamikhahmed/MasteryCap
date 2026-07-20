/* Stocks literacy stub — 3 weeks, same 6-part bar as Foundations/Crypto.
   Not full equity depth yet. Options stay on legacy stocks.js weeks. */

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

export const STOCKS_DEEP_WEEKS = [
  week({
    id: 1,
    title: { en: 'What a Share Is', ur: 'Share Kya Hai' },
    objective: {
      en: 'Explain share ownership, broker access, and why literacy ≠ income.',
      ur: 'Share ownership + broker; literacy ≠ income.',
    },
    teach: {
      en: `<p>A <strong>share</strong> is a slice of ownership in a company. You buy and sell through a <strong>broker</strong> on an exchange — you do not trade “with the exchange” as a person. Price is the last agreed trade; the <strong>bid/ask</strong> spread is a real cost on every round trip.</p>
<p>Unlike many crypto venues, equity sessions have open/close. Overnight news often shows up as a <strong>gap</strong> at the next open.</p>
<p>{{redflag:Anyone selling “learn stocks → weekly salary” is selling fantasy.}}</p>`,
      ur: `<p><strong>Share</strong> = company ownership ka hissa. Broker ke zariye exchange pe. Bid/ask = cost. Sessions open/close. Overnight → gap.</p>
<p>{{redflag:“Stocks course = tankhwah” = fantasy.}}</p>`,
    },
    workedExample: {
      en: `<p>You want exposure to Company X. You open a regulated brokerage, fund it legally, place a limit buy. Until fill, you own cash — not shares. After fill, you own shares minus fees.</p>`,
      ur: `<p>Broker → legal fund → limit buy → fill ke baad shares (fees ke baad).</p>`,
    },
    commonMistake: {
      en: `<p>Treating a tip channel as ownership research.</p>`,
      ur: `<p>Tip channel = research samajhna.</p>`,
    },
    exitTicket: { en: 'You can say what you own after a fill vs before.', ur: 'Fill se pehle/baad ownership.' },
    notebookPrompt: { en: 'Write: broker name (practice), market hours, one fee line you found.', ur: 'Broker + hours + ek fee line.' },
    flashcardSeeds: [
      { front: { en: 'A share is', ur: 'Share' }, back: { en: 'Ownership slice of a company.', ur: 'Ownership slice.' } },
      { front: { en: 'Bid/ask spread', ur: 'Spread' }, back: { en: 'Hidden round-trip cost.', ur: 'Round-trip cost.' } },
      { front: { en: 'Overnight equity news often appears as', ur: 'Overnight' }, back: { en: 'A gap at the open.', ur: 'Open pe gap.' } },
      { front: { en: 'You access exchanges via', ur: 'Access' }, back: { en: 'A broker (usually).', ur: 'Broker.' } },
      { front: { en: 'Course completion means', ur: 'Course' }, back: { en: 'Study progress — not income.', ur: 'Study — income nahi.' } },
    ],
    quiz: [
      { q: { en: 'After a stock fill you primarily own:', ur: 'Fill ke baad:' },
        opts: { en: ['Shares of the company (minus fees/taxes as applicable)', 'A guaranteed income stream', 'An exchange IOU token only'], ur: ['Shares', 'Guaranteed income', 'IOU only'] },
        correct: 0, explain: { en: 'Ownership of equity, not a salary.', ur: 'Equity — tankhwah nahi.' } },
      { q: { en: 'Bid/ask spread is best treated as:', ur: 'Spread:' },
        opts: { en: ['A trading cost', 'Free bonus', 'Always zero'], ur: ['Cost', 'Bonus', 'Zero'] },
        correct: 0, explain: { en: 'You buy ask, sell bid.', ur: 'Ask buy, bid sell.' } },
      { q: { en: 'Equity markets vs 24/7 crypto venues:', ur: 'Sessions:' },
        opts: { en: ['Often have defined open/close sessions', 'Never gap', 'Ban brokers'], ur: ['Open/close', 'No gaps', 'No brokers'] },
        correct: 0, explain: { en: 'Sessions create gap risk.', ur: 'Sessions → gaps.' } },
      { q: { en: 'Finishing this week proves:', ur: 'Week complete:' },
        opts: { en: ['Literacy progress on device', 'Licensed advisor status', 'Weekly profit entitlement'], ur: ['Literacy progress', 'License', 'Profit right'] },
        correct: 0, explain: { en: 'School record only.', ur: 'School only.' } },
    ],
  }),
  week({
    id: 2,
    title: { en: 'Orders, Sessions & Gaps', ur: 'Orders, Sessions, Gaps' },
    objective: {
      en: 'Choose limit vs market with eyes open; respect open volatility and gap risk.',
      ur: 'Limit vs market; open volatility; gap risk.',
    },
    teach: {
      en: `<p><strong>Market orders</strong> chase a fill, not a price — slippage can be ugly in fast tape. <strong>Limit orders</strong> control price but may not fill. Many professionals let the open settle before full size.</p>
<p>Gaps are information, not magic signals. Huge volume that holds can mean demand; a fade can trap late buyers. Always check whether charts are <strong>adjusted</strong> for splits/dividends.</p>`,
      ur: `<p>Market = fill chase. Limit = price control, fill miss ho sakti. Open settle. Gaps = info, magic nahi. Chart adjusted check.</p>`,
    },
    workedExample: {
      en: `<p>Thin name, wide spread: market buy fills through several levels. Same intent with a limit near mid avoids paying the whole book.</p>`,
      ur: `<p>Thin name + market = slip. Limit near mid = control.</p>`,
    },
    commonMistake: {
      en: `<p>Sizing full risk in the first minute of the open “so you don’t miss it.”</p>`,
      ur: `<p>Open ke pehle minute pe full size.</p>`,
    },
    exitTicket: { en: 'You can state when you prefer limit over market.', ur: 'Limit kab prefer.' },
    notebookPrompt: { en: 'Write your personal open rule (e.g. wait 15–30 min / reduced size).', ur: 'Open rule likho.' },
    flashcardSeeds: [
      { front: { en: 'Market order guarantees', ur: 'Market' }, back: { en: 'A fill attempt — not a price.', ur: 'Fill — price nahi.' } },
      { front: { en: 'Limit order risk', ur: 'Limit' }, back: { en: 'May not fill.', ur: 'Fill miss.' } },
      { front: { en: 'Ex-dividend price typically', ur: 'Ex-div' }, back: { en: 'Drops ~dividend amount.', ur: '~Dividend drop.' } },
      { front: { en: 'Open risk', ur: 'Open' }, back: { en: 'Wide spreads, erratic prints while overnight flow clears.', ur: 'Wide + erratic.' } },
      { front: { en: 'Unadjusted chart danger', ur: 'Unadjusted' }, back: { en: 'Old levels look false after splits/divs.', ur: 'Levels galat.' } },
    ],
    quiz: [
      { q: { en: 'In a fast market, a market order:', ur: 'Fast market:' },
        opts: { en: ['Can fill far from the last print you saw', 'Always matches last print', 'Is illegal'], ur: ['Door fill', 'Always last', 'Illegal'] },
        correct: 0, explain: { en: 'Fill ≠ price guarantee.', ur: 'Fill ≠ price.' } },
      { q: { en: 'Why wait out the open?', ur: 'Open wait:' },
        opts: { en: ['Overnight orders clear; early tape is noisy', 'Trading is banned then', 'Spreads are always zero'], ur: ['Overnight clear', 'Banned', 'Zero spread'] },
        correct: 0, explain: { en: 'Noise first, then size.', ur: 'Noise pehle.' } },
      { q: { en: 'On ex-dividend date price often:', ur: 'Ex-div:' },
        opts: { en: ['Drops roughly by the dividend', 'Doubles', 'Ignores dividends'], ur: ['~Dividend drop', 'Double', 'Ignore'] },
        correct: 0, explain: { en: 'Cash leaves the firm.', ur: 'Cash nikalta.' } },
      { q: { en: 'Best first habit for order type:', ur: 'Habit:' },
        opts: { en: ['Default to limits unless urgency is justified', 'Always market for speed', 'Never use stops'], ur: ['Default limits', 'Always market', 'No stops'] },
        correct: 0, explain: { en: 'Price control first.', ur: 'Price control.' } },
    ],
  }),
  week({
    id: 3,
    title: { en: 'Earnings vs Expectations', ur: 'Earnings vs Expectations' },
    objective: {
      en: 'Frame catalysts as actual-vs-expected gaps — not “good news = up.”',
      ur: 'Actual vs expected — “good = up” nahi.',
    },
    teach: {
      en: `<p>Earnings and other catalysts move stocks on <em>surprise vs expectations</em>. Strong growth can still sell off if the market priced more. Blind full-size through a binary event is gambling dressed as conviction.</p>
<p>Options traders also face <strong>IV crush</strong> after events — direction can be right and option buyers still lose. This stub stays equity-literacy focused; options have their own track.</p>
<p>{{redflag:Holding max size through unknowns is not bravery.}}</p>`,
      ur: `<p>Catalyst = actual vs expected. Binary event pe full size = gambling. IV crush options pe — alag track.</p>
<p>{{redflag:Max size through unknown = bravery nahi.}}</p>`,
    },
    workedExample: {
      en: `<p>Consensus EPS 1.00. Print 1.05 but guidance cut. Price can gap down — the “beat” was not enough vs the new path.</p>`,
      ur: `<p>Beat + weak guidance → gap down mumkin.</p>`,
    },
    commonMistake: {
      en: `<p>Buying the headline (“record revenue!”) without reading the expectation baseline.</p>`,
      ur: `<p>Headline buy — baseline nahi.</p>`,
    },
    exitTicket: { en: 'You can explain actual vs expected in one sentence.', ur: 'Actual vs expected ek jumla.' },
    notebookPrompt: { en: 'Pick one name you follow. Write next catalyst date + how you will size (or flat).', ur: 'Catalyst date + size/flat rule.' },
    flashcardSeeds: [
      { front: { en: 'Earnings move mainly on', ur: 'Earnings' }, back: { en: 'Actual vs expectations.', ur: 'Actual vs expected.' } },
      { front: { en: 'IV crush', ur: 'IV crush' }, back: { en: 'Implied vol drops after the event.', ur: 'Event baad IV drop.' } },
      { front: { en: 'Binary event + full size', ur: 'Binary+size' }, back: { en: 'Gambling posture unless risk is defined.', ur: 'Gambling posture.' } },
      { front: { en: '“Good news” alone', ur: 'Good news' }, back: { en: 'Insufficient — priced vs expected.', ur: 'Expected vs.' } },
      { front: { en: 'This Stocks stub unlocks', ur: 'Stub' }, back: { en: 'Literacy rails — not stock-picking tips.', ur: 'Literacy — tips nahi.' } },
    ],
    quiz: [
      { q: { en: 'A company grows 30% and still crashes after earnings. Likely:', ur: '30% + crash:' },
        opts: { en: ['Market expected more / worse path ahead', 'Growth is always bad', 'Exchanges cancel winners'], ur: ['Expected more', 'Growth bad', 'Cancel'] },
        correct: 0, explain: { en: 'Expectations baseline.', ur: 'Baseline.' } },
      { q: { en: 'Blind full size through a binary catalyst is:', ur: 'Full size:' },
        opts: { en: ['Gambling with a story', 'Required for mastery', 'Risk-free'], ur: ['Gambling', 'Required', 'Risk-free'] },
        correct: 0, explain: { en: 'Undefined event risk.', ur: 'Undefined risk.' } },
      { q: { en: 'IV crush mainly hurts:', ur: 'IV crush:' },
        opts: { en: ['Long option premium buyers after vol collapses', 'Cash-only savers', 'Bond ladders'], ur: ['Long options', 'Savers', 'Bonds'] },
        correct: 0, explain: { en: 'Vol premium evaporates.', ur: 'Vol premium.' } },
      { q: { en: 'Honest catalyst prep includes:', ur: 'Prep:' },
        opts: { en: ['Know the date; decide size/flat before the print', 'Max leverage at the bell', 'Ignore the calendar'], ur: ['Date + size/flat', 'Max lev', 'Ignore'] },
        correct: 0, explain: { en: 'Plan exposure first.', ur: 'Exposure pehle.' } },
    ],
  }),
  week({
    id: 4,
    title: { en: 'Equity Practice Loop', ur: 'Equity Practice Loop' },
    objective: {
      en: 'Run a sober stocks loop: broker → hours → size → log → review.',
      ur: 'Broker → hours → size → log → review.',
    },
    teach: {
      en: `<p>Put rails together: regulated broker, know session hours, prefer limits, size from risk %, skip blind binary events, log fills and fees, weekly review.</p>
<p>Tips and “hot names” are not a syllabus. Process first; picking later — if ever.</p>`,
      ur: `<p>Broker → hours → limits → risk% → skip blind events → log → review. Tips syllabus nahi.</p>`,
    },
    workedExample: {
      en: `<p>Practice card: “Paper or micro size · limit only · no earnings hold · fee line in journal.”</p>`,
      ur: `<p>Micro · limit · no earnings hold · fee log.</p>`,
    },
    commonMistake: {
      en: `<p>Skipping the journal because “it was obvious.”</p>`,
      ur: `<p>Journal skip — “obvious tha.”</p>`,
    },
    exitTicket: { en: 'You can recite your equity practice loop.', ur: 'Equity loop yad.' },
    notebookPrompt: { en: 'Six-bullet stocks loop on Study desk.', ur: '6-bullet stocks loop.' },
    flashcardSeeds: [
      { front: { en: 'Equity loop order', ur: 'Loop' }, back: { en: 'Broker → hours → size → (limit) → log → review.', ur: 'Broker → hours → size → log → review.' } },
      { front: { en: 'Tip channel as research', ur: 'Tips' }, back: { en: 'Not a substitute for process.', ur: 'Process nahi.' } },
      { front: { en: 'Blind earnings hold', ur: 'Earnings hold' }, back: { en: 'Gambling unless size is defined flat/micro.', ur: 'Gambling unless defined.' } },
      { front: { en: 'Weekly review asks', ur: 'Review' }, back: { en: 'What fee/slippage surprised you?', ur: 'Fee/slip surprise?' } },
      { front: { en: 'This week unlocks', ur: 'Week' }, back: { en: 'A practice habit — not stock tips.', ur: 'Habit — tips nahi.' } },
    ],
    quiz: [
      { q: { en: 'Sober equity practice starts with:', ur: 'Start:' },
        opts: { en: ['Broker + session hours + risk size', 'Max day-trade leverage', 'Telegram calls'], ur: ['Broker + hours + size', 'Max lev', 'Telegram'] },
        correct: 0, explain: { en: 'Rails first.', ur: 'Rails pehle.' } },
      { q: { en: 'Logs matter because:', ur: 'Logs:' },
        opts: { en: ['They expose fee and process failures', 'They guarantee alpha', 'Exchanges require public posts'], ur: ['Fee/process', 'Alpha', 'Public'] },
        correct: 0, explain: { en: 'Review needs data.', ur: 'Data.' } },
      { q: { en: 'Hot-name tips replace:', ur: 'Tips:' },
        opts: { en: ['Nothing — still need your process', 'All research forever', 'Risk math'], ur: ['Nothing', 'All research', 'Risk math'] },
        correct: 0, explain: { en: 'Tips ≠ syllabus.', ur: 'Tips ≠ syllabus.' } },
      { q: { en: 'After this stub you should practice:', ur: 'Practice:' },
        opts: { en: ['Small, logged, rule-bound', 'All-in overnight', 'Copy-only'], ur: ['Small + logged', 'All-in', 'Copy'] },
        correct: 0, explain: { en: 'Process competence.', ur: 'Process.' } },
    ],
  }),
  week({
    id: 5,
    title: { en: 'Statements, Dilution & Risk %', ur: 'Statements, Dilution, Risk %' },
    objective: {
      en: 'Read ownership risk: dilution, concentration, and risk % before size fantasies.',
      ur: 'Dilution, concentration, risk% — size pehle.',
    },
    teach: {
      en: `<p>Owning shares means sharing upside <em>and</em> corporate actions: new issuance can <strong>dilute</strong> you; one name can dominate your P/L if you concentrate. Risk % per idea caps how much one story can hurt.</p>
<p>You do not need CFA depth here — you need the habit: what can go wrong for the shareholder, and how big is this ticket vs account?</p>
<p>{{redflag:“Can’t lose on blue chips” is folklore, not risk.}}</p>`,
      ur: `<p>Dilution + concentration + risk% per idea. Blue-chip = can’t lose — folklore.</p>
<p>{{redflag:Blue chip = no risk — jhoot.}}</p>`,
    },
    workedExample: {
      en: `<p>Account 100. Risk 1% = 1. Stop implies size. Doubling size “because it feels safe” doubles ruin speed.</p>`,
      ur: `<p>1% risk → size from stop. “Safe feel” double = ruin double.</p>`,
    },
    commonMistake: {
      en: `<p>Sizing from conviction narrative instead of stop distance.</p>`,
      ur: `<p>Conviction se size — stop math nahi.</p>`,
    },
    exitTicket: { en: 'You can state max risk % per equity idea.', ur: 'Max risk% per idea.' },
    notebookPrompt: { en: 'Write max risk % + max names in core book.', ur: 'Max risk% + max names.' },
    flashcardSeeds: [
      { front: { en: 'Dilution', ur: 'Dilution' }, back: { en: 'More shares → your slice shrinks.', ur: 'Zyada shares → slice shrink.' } },
      { front: { en: 'Concentration risk', ur: 'Concentration' }, back: { en: 'One name dominates outcomes.', ur: 'Ek name dominate.' } },
      { front: { en: 'Risk % sets', ur: 'Risk%' }, back: { en: 'How much one idea can hurt.', ur: 'Ek idea ka dard.' } },
      { front: { en: 'Size from', ur: 'Size' }, back: { en: 'Risk $ ÷ stop distance.', ur: 'Risk$ ÷ stop.' } },
      { front: { en: 'Blue-chip = riskless', ur: 'Blue chip' }, back: { en: 'False — prices and businesses still fail.', ur: 'Jhoot.' } },
    ],
    quiz: [
      { q: { en: 'Dilution mainly means:', ur: 'Dilution:' },
        opts: { en: ['Your ownership % can shrink when new shares issue', 'Price always rises', 'Broker fees vanish'], ur: ['Ownership shrink', 'Price up always', 'Fees vanish'] },
        correct: 0, explain: { en: 'More shares outstanding.', ur: 'Zyada shares.' } },
      { q: { en: 'Position size should come from:', ur: 'Size:' },
        opts: { en: ['Risk money and stop distance', 'How exciting the story is', 'Tip channel lot size'], ur: ['Risk + stop', 'Story', 'Tip lot'] },
        correct: 0, explain: { en: 'Math over vibes.', ur: 'Math > vibes.' } },
      { q: { en: 'Concentrated book risk:', ur: 'Concentration:' },
        opts: { en: ['One name can dominate P/L', 'Always safer', 'Illegal'], ur: ['One name dominate', 'Safer', 'Illegal'] },
        correct: 0, explain: { en: 'Diversify or size smaller.', ur: 'Diversify / chhota size.' } },
      { q: { en: '“Can’t lose on famous names” is:', ur: 'Famous names:' },
        opts: { en: ['Folklore — risk remains', 'A market law', 'SECP guarantee'], ur: ['Folklore', 'Law', 'SECP'] },
        correct: 0, explain: { en: 'No riskless equity.', ur: 'Riskless nahi.' } },
    ],
  }),
  week({
    id: 6,
    title: { en: 'Equity Scams & Honesty', ur: 'Equity Scams aur Honesty' },
    objective: {
      en: 'Spot pump/dump, fake advisors, and income-promise marketing around stocks.',
      ur: 'Pump/dump, fake advisor, income promise.',
    },
    teach: {
      en: `<p>Scams love equity theater: paid “mentors,” screenshot P/L, urgency to buy a thin name, recovery agents after a loss. Real brokerage support never needs your full password/OTP theater on chat apps.</p>
<p>MasteryCap certificates are self-issued study records. Completing Stocks Literacy does not license you, guarantee returns, or make you an advisor.</p>
<p>{{redflag:“Guaranteed weekly stock income” = fantasy product.}}</p>`,
      ur: `<p>Pump, fake mentor, screenshot P/L, recovery scam. Certificate = study record — license/income nahi.</p>
<p>{{redflag:Guaranteed weekly income = fantasy.}}</p>`,
    },
    workedExample: {
      en: `<p>DM: “Join VIP, 2% daily, deposit now.” Refuse. Check regulation. No deposit to unlock.</p>`,
      ur: `<p>VIP 2% daily DM → refuse. Regulation check. No unlock deposit.</p>`,
    },
    commonMistake: {
      en: `<p>Sending more money to a “recovery specialist” after a loss.</p>`,
      ur: `<p>Loss ke baad recovery agent ko aur paisa.</p>`,
    },
    exitTicket: { en: 'You can name three equity scam tells.', ur: 'Teen scam tells.' },
    notebookPrompt: { en: 'List venues/people you will never fund. Pin it.', ur: 'Never-fund list.' },
    flashcardSeeds: [
      { front: { en: 'Guaranteed stock income', ur: 'Guaranteed' }, back: { en: 'Fantasy marketing.', ur: 'Fantasy.' } },
      { front: { en: 'Recovery agent after loss', ur: 'Recovery' }, back: { en: 'Often a second scam.', ur: 'Second scam.' } },
      { front: { en: 'MasteryCap certificate', ur: 'Cert' }, back: { en: 'Self-issued study record — not a license.', ur: 'Study record — license nahi.' } },
      { front: { en: 'Chat OTP / full password asks', ur: 'OTP ask' }, back: { en: 'Refuse — attack pattern.', ur: 'Refuse.' } },
      { front: { en: 'Thin-name urgency pump', ur: 'Pump' }, back: { en: 'Classic dump setup.', ur: 'Dump setup.' } },
    ],
    quiz: [
      { q: { en: '“2% daily guaranteed stocks” is:', ur: '2% daily:' },
        opts: { en: ['A red flag / fantasy pitch', 'Normal SECP product', 'Risk-free compounding'], ur: ['Red flag', 'SECP normal', 'Risk-free'] },
        correct: 0, explain: { en: 'Income promises sell fantasy.', ur: 'Fantasy.' } },
      { q: { en: 'After a loss, a stranger offers recovery for a fee:', ur: 'Recovery:' },
        opts: { en: ['Treat as likely second scam', 'Send more immediately', 'Share seed/password'], ur: ['Second scam', 'Send more', 'Share pass'] },
        correct: 0, explain: { en: 'Common double-dip.', ur: 'Double-dip.' } },
      { q: { en: 'This track’s certificate means:', ur: 'Cert:' },
        opts: { en: ['Local study progress — not a credential', 'Advisor license', 'Income entitlement'], ur: ['Study progress', 'License', 'Income'] },
        correct: 0, explain: { en: 'Honesty framing.', ur: 'Honesty.' } },
      { q: { en: 'Best response to password/OTP requests in chat:', ur: 'OTP chat:' },
        opts: { en: ['Refuse and verify on official channels', 'Send to unlock account', 'Post in group for help'], ur: ['Refuse + official', 'Send unlock', 'Post group'] },
        correct: 0, explain: { en: 'Attack pattern.', ur: 'Attack.' } },
    ],
  }),
];

export const STOCKS_DEEP_PLACEMENT = [
  { topic: 1, q: { en: 'A share represents:', ur: 'Share:' }, opts: { en: ['Ownership slice', 'Guaranteed wage', 'Broker loan only'], ur: ['Ownership', 'Wage', 'Loan'] }, correct: 0 },
  { topic: 1, q: { en: 'Bid/ask is mainly:', ur: 'Spread:' }, opts: { en: ['A cost', 'A gift', 'Illegal'], ur: ['Cost', 'Gift', 'Illegal'] }, correct: 0 },
  { topic: 2, q: { en: 'Market orders prioritize:', ur: 'Market:' }, opts: { en: ['Fill over exact price', 'Exact price always', 'Free fills'], ur: ['Fill', 'Exact price', 'Free'] }, correct: 0 },
  { topic: 2, q: { en: 'Open tape is often:', ur: 'Open:' }, opts: { en: ['Noisy while overnight flow clears', 'The calmest hour', 'Closed to retail'], ur: ['Noisy', 'Calmest', 'Closed'] }, correct: 0 },
  { topic: 3, q: { en: 'Catalysts move on:', ur: 'Catalyst:' }, opts: { en: ['Actual vs expected', 'Headline adjectives', 'Logo color'], ur: ['Actual vs expected', 'Adjectives', 'Logo'] }, correct: 0 },
  { topic: 3, q: { en: 'Full size through unknowns is:', ur: 'Full size:' }, opts: { en: ['Gambling posture', 'Professional requirement', 'Risk-free'], ur: ['Gambling', 'Required', 'Risk-free'] }, correct: 0 },
  { topic: 4, q: { en: 'Equity practice loop starts with:', ur: 'Loop:' }, opts: { en: ['Broker, hours, risk size', 'Max leverage', 'Tip first'], ur: ['Broker+hours+size', 'Max lev', 'Tip'] }, correct: 0 },
  { topic: 4, q: { en: 'Skipping the journal because it felt obvious:', ur: 'Skip journal:' }, opts: { en: ['Breaks the review loop', 'Is professional', 'Removes fees'], ur: ['Breaks review', 'Pro', 'Removes fees'] }, correct: 0 },
  { topic: 5, q: { en: 'Position size should use:', ur: 'Size:' }, opts: { en: ['Risk $ and stop', 'Story heat', 'Tip lot'], ur: ['Risk+stop', 'Story', 'Tip'] }, correct: 0 },
  { topic: 5, q: { en: 'Dilution can:', ur: 'Dilution:' }, opts: { en: ['Shrink ownership %', 'Delete all risk', 'Guarantee dividends'], ur: ['Shrink %', 'Delete risk', 'Guarantee div'] }, correct: 0 },
  { topic: 6, q: { en: 'Guaranteed weekly stock income is:', ur: 'Guaranteed:' }, opts: { en: ['Fantasy marketing', 'SECP default', 'Risk-free'], ur: ['Fantasy', 'SECP', 'Risk-free'] }, correct: 0 },
  { topic: 6, q: { en: 'Recovery DMs after a loss are often:', ur: 'Recovery:' }, opts: { en: ['Second scams', 'Official police', 'Required insurance'], ur: ['Second scam', 'Police', 'Insurance'] }, correct: 0 },
];
