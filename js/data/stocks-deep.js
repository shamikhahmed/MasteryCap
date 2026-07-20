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
      ur: `<p><strong>Share</strong> = company ownership ka hissa. <strong>Broker</strong> ke zariye exchange pe khareed/bech — tum exchange ke saath person ki tarah trade nahi karte. Price = last agreed trade; <strong>bid/ask</strong> spread har round trip pe real cost.</p>
<p>Crypto venues se alag, equity sessions open/close hain. Overnight news aksar next open pe <strong>gap</strong> banati.</p>
<p>{{redflag:“Stocks course = tankhwah” bechna fantasy bechna hai.}}</p>`,
    },
    workedExample: {
      en: `<p>You want exposure to Company X. You open a regulated brokerage, fund it legally, place a limit buy. Until fill, you own cash — not shares. After fill, you own shares minus fees.</p>`,
      ur: `<p>Company X exposure chahiye. Regulated brokerage kholo, legal fund karo, limit buy lagao. Fill tak cash hai — shares nahi. Fill ke baad shares (fees ke baad).</p>`,
    },
    commonMistake: {
      en: `<p>Treating a tip channel as ownership research.</p>`,
      ur: `<p>Tip channel = research samajhna.</p>`,
    },
    exitTicket: { en: 'You can say what you own after a fill vs before.', ur: 'Fill se pehle/baad ownership.' },
    notebookPrompt: { en: 'Write: broker name (practice), market hours, one fee line you found.', ur: 'Broker naam (practice), market hours, ek fee line jo mili — likho.' },
    flashcardSeeds: [
      { front: { en: 'A share is', ur: 'Share' }, back: { en: 'Ownership slice of a company.', ur: 'Ownership slice.' } },
      { front: { en: 'Bid/ask spread', ur: 'Spread' }, back: { en: 'Hidden round-trip cost.', ur: 'Round-trip cost.' } },
      { front: { en: 'Overnight equity news often appears as', ur: 'Overnight equity news aksar kis tarah dikhti hai' }, back: { en: 'A gap at the open.', ur: 'Open pe gap.' } },
      { front: { en: 'You access exchanges via', ur: 'Exchanges tak tum kaise pahunchte ho' }, back: { en: 'A broker (usually).', ur: 'Broker.' } },
      { front: { en: 'Course completion means', ur: 'Course completion ka matlab kya hai' }, back: { en: 'Study progress — not income.', ur: 'Study — income nahi.' } },
    ],
    quiz: [
      { q: { en: 'After a stock fill you primarily own:', ur: 'Stock fill ke baad tum primarily kya own karte ho:' },
        opts: { en: ['Shares of the company (minus fees/taxes as applicable)', 'A guaranteed income stream', 'An exchange IOU token only'], ur: ['Company ke shares (fees/taxes jahan lagain minus karke)', 'Guaranteed income', 'IOU only'] },
        correct: 0, explain: { en: 'Ownership of equity, not a salary.', ur: 'Equity — tankhwah nahi.' } },
      { q: { en: 'Bid/ask spread is best treated as:', ur: 'Bid/ask spread ko behtar taur pe kya samjha jaye:' },
        opts: { en: ['A trading cost', 'Free bonus', 'Always zero'], ur: ['Cost', 'Bonus', 'Zero'] },
        correct: 0, explain: { en: 'You buy ask, sell bid.', ur: 'Ask buy, bid sell.' } },
      { q: { en: 'Equity markets vs 24/7 crypto venues:', ur: 'Equity markets vs 24/7 crypto venues mein farq:' },
        opts: { en: ['Often have defined open/close sessions', 'Never gap', 'Ban brokers'], ur: ['Aksar defined open/close sessions hote hain in ke', 'No gaps', 'No brokers'] },
        correct: 0, explain: { en: 'Sessions create gap risk.', ur: 'Sessions → gaps.' } },
      { q: { en: 'Finishing this week proves:', ur: 'Is week ko complete karna kya prove karta hai:' },
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
      ur: `<p><strong>Market orders</strong> fill chase karte, price nahi — fast tape mein slippage ugly ho sakti. <strong>Limit orders</strong> price control karte magar fill miss ho sakti. Bohat professionals open settle hone dete full size se pehle.</p>
<p>Gaps information hain, magic signals nahi. Volume jo hold kare demand ho sakti; fade late buyers trap kar sakta. Charts <strong>adjusted</strong> hain splits/dividends ke liye — check karo.</p>`,
    },
    workedExample: {
      en: `<p>Thin name, wide spread: market buy fills through several levels. Same intent with a limit near mid avoids paying the whole book.</p>`,
      ur: `<p>Thin name, wide spread: market buy kai levels se fill. Same intent limit near mid se poora book pay karne se bachta.</p>`,
    },
    commonMistake: {
      en: `<p>Sizing full risk in the first minute of the open “so you don’t miss it.”</p>`,
      ur: `<p>Open ke pehle minute pe full risk size “miss na ho” ke liye — galat aadat.</p>`,
    },
    exitTicket: { en: 'You can state when you prefer limit over market.', ur: 'Limit kab market se prefer karte ho bata sakte ho.' },
    notebookPrompt: { en: 'Write your personal open rule (e.g. wait 15–30 min / reduced size).', ur: 'Apna open rule likho (maslan 15–30 min wait / chhota size).' },
    flashcardSeeds: [
      { front: { en: 'Market order guarantees', ur: 'Market order kya guarantee karta hai' }, back: { en: 'A fill attempt — not a price.', ur: 'Fill — price nahi.' } },
      { front: { en: 'Limit order risk', ur: 'Limit' }, back: { en: 'May not fill.', ur: 'Fill miss.' } },
      { front: { en: 'Ex-dividend price typically', ur: 'Ex-dividend price typically kya hoti hai' }, back: { en: 'Drops ~dividend amount.', ur: '~Dividend drop.' } },
      { front: { en: 'Open risk', ur: 'Open' }, back: { en: 'Wide spreads, erratic prints while overnight flow clears.', ur: 'Wide spreads, erratic prints jab overnight flow clear ho raha ho.' } },
      { front: { en: 'Unadjusted chart danger', ur: 'Unadjusted chart ka khatra' }, back: { en: 'Old levels look false after splits/divs.', ur: 'Splits/divs ke baad purane levels galat lagte hain.' } },
    ],
    quiz: [
      { q: { en: 'In a fast market, a market order:', ur: 'Fast market mein market order kya karta hai:' },
        opts: { en: ['Can fill far from the last print you saw', 'Always matches last print', 'Is illegal'], ur: ['Last print se door fill ho sakta hai tum ne jo dekha tha', 'Always last', 'Illegal'] },
        correct: 0, explain: { en: 'Fill ≠ price guarantee.', ur: 'Fill ≠ price.' } },
      { q: { en: 'Why wait out the open?', ur: 'Open ka wait kyun karna chahiye?' },
        opts: { en: ['Overnight orders clear; early tape is noisy', 'Trading is banned then', 'Spreads are always zero'], ur: ['Overnight orders clear hoti hain; early tape noisy hoti hai', 'Banned', 'Zero spread'] },
        correct: 0, explain: { en: 'Noise first, then size.', ur: 'Pehle noise settle, phir size badhao.' } },
      { q: { en: 'On ex-dividend date price often:', ur: 'Ex-dividend date pe price aksar:' },
        opts: { en: ['Drops roughly by the dividend', 'Doubles', 'Ignores dividends'], ur: ['~Dividend drop', 'Double', 'Ignore'] },
        correct: 0, explain: { en: 'Cash leaves the firm.', ur: 'Cash nikalta.' } },
      { q: { en: 'Best first habit for order type:', ur: 'Order type ke liye pehli behtar habit:' },
        opts: { en: ['Default to limits unless urgency is justified', 'Always market for speed', 'Never use stops'], ur: ['Limits default karo jab tak urgency justified na ho', 'Always market', 'No stops'] },
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
      ur: `<p>Earnings aur catalysts stocks <em>surprise vs expectations</em> pe move karte. Strong growth bhi sell off ho sakti agar market ne zyada price kiya ho. Binary event pe blind full-size = conviction ke libaas mein gambling.</p>
<p>Options traders <strong>IV crush</strong> bhi face karte events ke baad — direction sahi ho aur option buyers phir bhi haar sakte. Ye stub equity-literacy pe; options ka alag track.</p>
<p>{{redflag:Unknowns ke through max size = bravery nahi.}}</p>`,
    },
    workedExample: {
      en: `<p>Consensus EPS 1.00. Print 1.05 but guidance cut. Price can gap down — the “beat” was not enough vs the new path.</p>`,
      ur: `<p>Consensus EPS 1.00. Print 1.05 magar guidance cut. Price gap down kar sakti — “beat” naye path ke muqable kaafi nahi thi.</p>`,
    },
    commonMistake: {
      en: `<p>Buying the headline (“record revenue!”) without reading the expectation baseline.</p>`,
      ur: `<p>Headline pe khareedna (“record revenue!”) bina expectation baseline padhe.</p>`,
    },
    exitTicket: { en: 'You can explain actual vs expected in one sentence.', ur: 'Actual vs expected ek jumle mein samjha sakte ho.' },
    notebookPrompt: { en: 'Pick one name you follow. Write next catalyst date + how you will size (or flat).', ur: 'Ek naam chuno jo follow karte ho. Next catalyst date + size/flat rule likho.' },
    flashcardSeeds: [
      { front: { en: 'Earnings move mainly on', ur: 'Earnings move mainly kis pe hota hai' }, back: { en: 'Actual vs expectations.', ur: 'Actual vs expected.' } },
      { front: { en: 'IV crush', ur: 'IV crush' }, back: { en: 'Implied vol drops after the event.', ur: 'Event baad IV drop.' } },
      { front: { en: 'Binary event + full size', ur: 'Binary event + full size lagana' }, back: { en: 'Gambling posture unless risk is defined.', ur: 'Gambling posture hai jab tak risk define na ho.' } },
      { front: { en: '“Good news” alone', ur: 'Good news' }, back: { en: 'Insufficient — priced vs expected.', ur: 'Insufficient hai — priced vs expected matter karta hai.' } },
      { front: { en: 'This Stocks stub unlocks', ur: 'Ye Stocks stub kya unlock karta hai' }, back: { en: 'Literacy rails — not stock-picking tips.', ur: 'Literacy rails hain — stock-picking tips nahi.' } },
    ],
    quiz: [
      { q: { en: 'A company grows 30% and still crashes after earnings. Likely:', ur: 'Company 30% grow kare aur earnings ke baad crash ho. Likely:' },
        opts: { en: ['Market expected more / worse path ahead', 'Growth is always bad', 'Exchanges cancel winners'], ur: ['Market ne zyada / bura path aage expect kiya tha', 'Growth bad', 'Cancel'] },
        correct: 0, explain: { en: 'Expectations baseline.', ur: 'Expectations baseline matter karti hain.' } },
      { q: { en: 'Blind full size through a binary catalyst is:', ur: 'Binary catalyst pe blind full size kya hai:' },
        opts: { en: ['Gambling with a story', 'Required for mastery', 'Risk-free'], ur: ['Gambling', 'Required', 'Risk-free'] },
        correct: 0, explain: { en: 'Undefined event risk.', ur: 'Undefined risk.' } },
      { q: { en: 'IV crush mainly hurts:', ur: 'IV crush mainly kis ko nuksan deta hai:' },
        opts: { en: ['Long option premium buyers after vol collapses', 'Cash-only savers', 'Bond ladders'], ur: ['Vol collapse ke baad long option premium buyers nuqsan mein', 'Savers', 'Bonds'] },
        correct: 0, explain: { en: 'Vol premium evaporates.', ur: 'Vol premium evaporate ho jati hai.' } },
      { q: { en: 'Honest catalyst prep includes:', ur: 'Imandar catalyst prep mein kya shamil hai:' },
        opts: { en: ['Know the date; decide size/flat before the print', 'Max leverage at the bell', 'Ignore the calendar'], ur: ['Date jano; print se pehle size/flat decide karo', 'Max lev', 'Ignore'] },
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
      ur: `<p>Rails jod do: regulated broker, session hours pata, limits prefer, risk % se size, blind binary events skip, fills aur fees log, weekly review.</p>
<p>Tips aur “hot names” syllabus nahi. Process pehle; picking baad mein — agar kabhi.</p>`,
    },
    workedExample: {
      en: `<p>Practice card: “Paper or micro size · limit only · no earnings hold · fee line in journal.”</p>`,
      ur: `<p>Practice card: “Paper ya micro size · sirf limit · no earnings hold · journal mein fee line.”</p>`,
    },
    commonMistake: {
      en: `<p>Skipping the journal because “it was obvious.”</p>`,
      ur: `<p>Journal skip — “obvious tha.”</p>`,
    },
    exitTicket: { en: 'You can recite your equity practice loop.', ur: 'Apna equity practice loop yad kar sakte ho.' },
    notebookPrompt: { en: 'Six-bullet stocks loop on Study desk.', ur: '6-bullet stocks loop.' },
    flashcardSeeds: [
      { front: { en: 'Equity loop order', ur: 'Loop' }, back: { en: 'Broker → hours → size → (limit) → log → review.', ur: 'Broker → hours → size → log → review.' } },
      { front: { en: 'Tip channel as research', ur: 'Tip channel ko research samajhna' }, back: { en: 'Not a substitute for process.', ur: 'Process ka substitute nahi hai.' } },
      { front: { en: 'Blind earnings hold', ur: 'Earnings hold' }, back: { en: 'Gambling unless size is defined flat/micro.', ur: 'Gambling unless defined.' } },
      { front: { en: 'Weekly review asks', ur: 'Review' }, back: { en: 'What fee/slippage surprised you?', ur: 'Fee/slip surprise?' } },
      { front: { en: 'This week unlocks', ur: 'Week' }, back: { en: 'A practice habit — not stock tips.', ur: 'Practice habit hai — stock tips nahi.' } },
    ],
    quiz: [
      { q: { en: 'Sober equity practice starts with:', ur: 'Sober equity practice kis se shuru hoti hai:' },
        opts: { en: ['Broker + session hours + risk size', 'Max day-trade leverage', 'Telegram calls'], ur: ['Broker + hours + size', 'Max lev', 'Telegram'] },
        correct: 0, explain: { en: 'Rails first.', ur: 'Rails pehle.' } },
      { q: { en: 'Logs matter because:', ur: 'Logs kyun matter karte hain:' },
        opts: { en: ['They expose fee and process failures', 'They guarantee alpha', 'Exchanges require public posts'], ur: ['Ye fee aur process failures expose karte hain', 'Alpha', 'Public'] },
        correct: 0, explain: { en: 'Review needs data.', ur: 'Data.' } },
      { q: { en: 'Hot-name tips replace:', ur: 'Hot-name tips kya replace karte hain:' },
        opts: { en: ['Nothing — still need your process', 'All research forever', 'Risk math'], ur: ['Kuch nahi — ab bhi tumhara process chahiye', 'All research', 'Risk math'] },
        correct: 0, explain: { en: 'Tips ≠ syllabus.', ur: 'Tips ≠ syllabus.' } },
      { q: { en: 'After this stub you should practice:', ur: 'Is stub ke baad practice kya honi chahiye:' },
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
      ur: `<p>Shares own karna upside <em>aur</em> corporate actions share karta: nayi issuance <strong>dilute</strong> kar sakti; ek name P/L dominate kar sakta agar concentrate karo. Risk % per idea cap karta ek story kitna dard de sakti.</p>
<p>Yahan CFA depth nahi chahiye — aadat chahiye: shareholder ke liye kya galat ho sakta, aur ye ticket account ke muqable kitni bari?</p>
<p>{{redflag:“Blue chips pe can’t lose” folklore hai — risk nahi.}}</p>`,
    },
    workedExample: {
      en: `<p>Account 100. Risk 1% = 1. Stop implies size. Doubling size “because it feels safe” doubles ruin speed.</p>`,
      ur: `<p>1% risk → size from stop. “Safe feel” double = ruin double.</p>`,
    },
    commonMistake: {
      en: `<p>Sizing from conviction narrative instead of stop distance.</p>`,
      ur: `<p>Conviction se size — stop math nahi.</p>`,
    },
    exitTicket: { en: 'You can state max risk % per equity idea.', ur: 'Per equity idea max risk % bata sakte ho.' },
    notebookPrompt: { en: 'Write max risk % + max names in core book.', ur: 'Max risk % + core book mein max names likho.' },
    flashcardSeeds: [
      { front: { en: 'Dilution', ur: 'Dilution' }, back: { en: 'More shares → your slice shrinks.', ur: 'Zyada shares → slice shrink.' } },
      { front: { en: 'Concentration risk', ur: 'Concentration' }, back: { en: 'One name dominates outcomes.', ur: 'Ek name dominate.' } },
      { front: { en: 'Risk % sets', ur: 'Risk%' }, back: { en: 'How much one idea can hurt.', ur: 'Ek idea ka dard.' } },
      { front: { en: 'Size from', ur: 'Size' }, back: { en: 'Risk $ ÷ stop distance.', ur: 'Risk$ ÷ stop.' } },
      { front: { en: 'Blue-chip = riskless', ur: 'Blue chip' }, back: { en: 'False — prices and businesses still fail.', ur: 'Jhoot hai — prices aur businesses phir bhi fail ho sakte.' } },
    ],
    quiz: [
      { q: { en: 'Dilution mainly means:', ur: 'Dilution mainly kya matlab hai:' },
        opts: { en: ['Your ownership % can shrink when new shares issue', 'Price always rises', 'Broker fees vanish'], ur: ['Naye shares issue hon to tumhara ownership % shrink ho sakta hai', 'Price up always', 'Fees vanish'] },
        correct: 0, explain: { en: 'More shares outstanding.', ur: 'Outstanding shares zyada ho jati hain.' } },
      { q: { en: 'Position size should come from:', ur: 'Position size kahan se aani chahiye:' },
        opts: { en: ['Risk money and stop distance', 'How exciting the story is', 'Tip channel lot size'], ur: ['Risk + stop', 'Story', 'Tip lot'] },
        correct: 0, explain: { en: 'Math over vibes.', ur: 'Math > vibes.' } },
      { q: { en: 'Concentrated book risk:', ur: 'Concentration:' },
        opts: { en: ['One name can dominate P/L', 'Always safer', 'Illegal'], ur: ['One name dominate', 'Safer', 'Illegal'] },
        correct: 0, explain: { en: 'Diversify or size smaller.', ur: 'Diversify / chhota size.' } },
      { q: { en: '“Can’t lose on famous names” is:', ur: '“Can’t lose on famous names” kya hai:' },
        opts: { en: ['Folklore — risk remains', 'A market law', 'SECP guarantee'], ur: ['Folklore', 'Law', 'SECP'] },
        correct: 0, explain: { en: 'No riskless equity.', ur: 'Riskless nahi.' } },
    ],
  }),
  week({
    id: 6,
    title: { en: 'Equity Scams & Honesty', ur: 'Equity Scams aur Honesty' },
    objective: {
      en: 'Spot pump/dump, fake advisors, and income-promise marketing around stocks.',
      ur: 'Pump/dump, fake advisor, aur income-promise marketing pehchano stocks ke around.',
    },
    teach: {
      en: `<p>Scams love equity theater: paid “mentors,” screenshot P/L, urgency to buy a thin name, recovery agents after a loss. Real brokerage support never needs your full password/OTP theater on chat apps.</p>
<p>MasteryCap certificates are self-issued study records. Completing Stocks Literacy does not license you, guarantee returns, or make you an advisor.</p>
<p>{{redflag:“Guaranteed weekly stock income” = fantasy product.}}</p>`,
      ur: `<p>Scams equity theater pasand karte: paid “mentors,” screenshot P/L, thin name khareedne ki urgency, loss ke baad recovery agents. Real brokerage support chat apps pe full password/OTP theater nahi mangti.</p>
<p>MasteryCap certificates self-issued study records hain. Stocks Literacy complete karna license, returns guarantee, ya advisor nahi banata.</p>
<p>{{redflag:“Guaranteed weekly stock income” = fantasy product.}}</p>`,
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
    notebookPrompt: { en: 'List venues/people you will never fund. Pin it.', ur: 'Venues/log jo kabhi fund nahi karoge — list karo aur pin karo.' },
    flashcardSeeds: [
      { front: { en: 'Guaranteed stock income', ur: 'Guaranteed stock income ka claim' }, back: { en: 'Fantasy marketing.', ur: 'Fantasy.' } },
      { front: { en: 'Recovery agent after loss', ur: 'Loss ke baad recovery agent' }, back: { en: 'Often a second scam.', ur: 'Second scam.' } },
      { front: { en: 'MasteryCap certificate', ur: 'MasteryCap certificate kya hai' }, back: { en: 'Self-issued study record — not a license.', ur: 'Study record — license nahi.' } },
      { front: { en: 'Chat OTP / full password asks', ur: 'Chat mein OTP / full password maangna' }, back: { en: 'Refuse — attack pattern.', ur: 'Refuse karo — ye attack pattern hai.' } },
      { front: { en: 'Thin-name urgency pump', ur: 'Thin-name urgency pump' }, back: { en: 'Classic dump setup.', ur: 'Dump setup.' } },
    ],
    quiz: [
      { q: { en: '“2% daily guaranteed stocks” is:', ur: '“2% daily guaranteed stocks” kya hai:' },
        opts: { en: ['A red flag / fantasy pitch', 'Normal SECP product', 'Risk-free compounding'], ur: ['Red flag', 'SECP normal', 'Risk-free'] },
        correct: 0, explain: { en: 'Income promises sell fantasy.', ur: 'Income promises fantasy bechti hain.' } },
      { q: { en: 'After a loss, a stranger offers recovery for a fee:', ur: 'Loss ke baad ajnabi fee ke badle recovery offer karta hai:' },
        opts: { en: ['Treat as likely second scam', 'Send more immediately', 'Share seed/password'], ur: ['Second scam', 'Send more', 'Share pass'] },
        correct: 0, explain: { en: 'Common double-dip.', ur: 'Double-dip.' } },
      { q: { en: 'This track’s certificate means:', ur: 'Is track ke certificate ka matlab kya hai:' },
        opts: { en: ['Local study progress — not a credential', 'Advisor license', 'Income entitlement'], ur: ['Local study progress hai — credential nahi hai ye', 'License', 'Income'] },
        correct: 0, explain: { en: 'Honesty framing.', ur: 'Honesty.' } },
      { q: { en: 'Best response to password/OTP requests in chat:', ur: 'Chat mein password/OTP request ka behtar response:' },
        opts: { en: ['Refuse and verify on official channels', 'Send to unlock account', 'Post in group for help'], ur: ['Inkaar karo aur official channels pe verify karo', 'Send unlock', 'Post group'] },
        correct: 0, explain: { en: 'Attack pattern.', ur: 'Attack.' } },
    ],
  }),
];

export const STOCKS_DEEP_PLACEMENT = [
  { topic: 1, q: { en: 'A share represents:', ur: 'Share kya represent karta hai:' }, opts: { en: ['Ownership slice', 'Guaranteed wage', 'Broker loan only'], ur: ['Ownership', 'Wage', 'Loan'] }, correct: 0 },
  { topic: 1, q: { en: 'Bid/ask is mainly:', ur: 'Bid/ask mainly kya hota hai:' }, opts: { en: ['A cost', 'A gift', 'Illegal'], ur: ['Cost', 'Gift', 'Illegal'] }, correct: 0 },
  { topic: 2, q: { en: 'Market orders prioritize:', ur: 'Market orders kis ko priority dete hain:' }, opts: { en: ['Fill over exact price', 'Exact price always', 'Free fills'], ur: ['Exact price se zyada fill priority market order ko deti hai', 'Exact price', 'Free'] }, correct: 0 },
  { topic: 2, q: { en: 'Open tape is often:', ur: 'Open tape aksar kaisi hoti hai:' }, opts: { en: ['Noisy while overnight flow clears', 'The calmest hour', 'Closed to retail'], ur: ['Overnight flow clear hone tak open tape noisy rehti hai', 'Calmest', 'Closed'] }, correct: 0 },
  { topic: 3, q: { en: 'Catalysts move on:', ur: 'Catalysts kis cheez pe move karte hain:' }, opts: { en: ['Actual vs expected', 'Headline adjectives', 'Logo color'], ur: ['Actual vs expected', 'Adjectives', 'Logo'] }, correct: 0 },
  { topic: 3, q: { en: 'Full size through unknowns is:', ur: 'Unknowns ke through full size kya hai:' }, opts: { en: ['Gambling posture', 'Professional requirement', 'Risk-free'], ur: ['Gambling', 'Professional requirement nahi — reckless full size hai', 'Risk-free'] }, correct: 0 },
  { topic: 4, q: { en: 'Equity practice loop starts with:', ur: 'Equity practice loop kis se shuru hoti hai:' }, opts: { en: ['Broker, hours, risk size', 'Max leverage', 'Tip first'], ur: ['Broker+hours+size', 'Max lev', 'Tip'] }, correct: 0 },
  { topic: 4, q: { en: 'Skipping the journal because it felt obvious:', ur: 'Journal skip karna kyunki obvious laga kya hai:' }, opts: { en: ['Breaks the review loop', 'Is professional', 'Removes fees'], ur: ['Breaks review', 'Pro', 'Removes fees'] }, correct: 0 },
  { topic: 5, q: { en: 'Position size should use:', ur: 'Position size ke liye kya use karna chahiye:' }, opts: { en: ['Risk $ and stop', 'Story heat', 'Tip lot'], ur: ['Risk+stop', 'Story', 'Tip'] }, correct: 0 },
  { topic: 5, q: { en: 'Dilution can:', ur: 'Dilution:' }, opts: { en: ['Shrink ownership %', 'Delete all risk', 'Guarantee dividends'], ur: ['Shrink %', 'Delete risk', 'Guarantee div'] }, correct: 0 },
  { topic: 6, q: { en: 'Guaranteed weekly stock income is:', ur: 'Guaranteed weekly stock income kya hai:' }, opts: { en: ['Fantasy marketing', 'SECP default', 'Risk-free'], ur: ['Fantasy', 'SECP', 'Risk-free'] }, correct: 0 },
  { topic: 6, q: { en: 'Recovery DMs after a loss are often:', ur: 'Loss ke baad recovery DMs aksar kya hote hain:' }, opts: { en: ['Second scams', 'Official police', 'Required insurance'], ur: ['Second scam', 'Police', 'Insurance'] }, correct: 0 },
];
