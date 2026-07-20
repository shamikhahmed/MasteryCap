/* Forex literacy stub — 3 weeks, same 6-part bar.
   Process + risk framing. Not signal service. */

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

export const FOREX_DEEP_WEEKS = [
  week({
    id: 1,
    title: { en: 'Pairs, Pips & Quotes', ur: 'Pairs, Pips, Quotes' },
    objective: {
      en: 'Read a FX pair (base/quote), know what a pip is, and treat spread as cost.',
      ur: 'Base/quote, pip, spread = cost.',
    },
    teach: {
      en: `<p>FX trades <strong>pairs</strong>: EUR/USD means price of one euro in dollars. <strong>Base</strong> is first; <strong>quote</strong> is second. A <strong>pip</strong> is the usual smallest quoted increment (often 0.0001 on majors).</p>
<p>You are always long one currency and short the other. Spread + commission is the cost of being wrong quickly. Leverage is not a skill metric — it is borrowed exposure that can liquidate you.</p>
<p>{{redflag:“1:1000 leverage = smarter trader” is marketing, not literacy.}}</p>`,
      ur: `<p>Pair = base/quote. Pip = chhoti increment. Hamesha ek long, ek short. Spread = cost. Leverage = borrow — skill nahi.</p>
<p>{{redflag:1:1000 = smart — marketing.}}</p>`,
    },
    workedExample: {
      en: `<p>EUR/USD 1.1000 → 1.1010 is ~10 pips. If spread is 1.2 pips, a 5-pip “scalp” target can be fee-negative before edge.</p>`,
      ur: `<p>10 pip move, 1.2 spread — 5-pip scalp thin.</p>`,
    },
    commonMistake: {
      en: `<p>Counting wins in pips while ignoring spread and swap.</p>`,
      ur: `<p>Pips count, spread/swap ignore.</p>`,
    },
    exitTicket: { en: 'You can name base vs quote on one major pair.', ur: 'Base vs quote ek pair.' },
    notebookPrompt: { en: 'Write your venue’s typical EUR/USD spread and lot size meaning.', ur: 'Spread + lot meaning.' },
    flashcardSeeds: [
      { front: { en: 'In EUR/USD, base is', ur: 'EUR/USD base' }, back: { en: 'EUR.', ur: 'EUR.' } },
      { front: { en: 'A pip is', ur: 'Pip' }, back: { en: 'Usual small price increment on the pair.', ur: 'Chhoti increment.' } },
      { front: { en: 'Long EUR/USD means', ur: 'Long EURUSD' }, back: { en: 'Long EUR, short USD.', ur: 'Long EUR, short USD.' } },
      { front: { en: 'Spread is', ur: 'Spread' }, back: { en: 'A cost paid to trade.', ur: 'Cost.' } },
      { front: { en: 'Max leverage marketing', ur: 'Max lev' }, back: { en: 'Not a competence signal.', ur: 'Competence nahi.' } },
    ],
    quiz: [
      { q: { en: 'In USD/JPY the quote currency is:', ur: 'USD/JPY quote:' },
        opts: { en: ['JPY', 'USD', 'EUR'], ur: ['JPY', 'USD', 'EUR'] },
        correct: 0, explain: { en: 'Second currency is quote.', ur: 'Doosri = quote.' } },
      { q: { en: 'Spread should be treated as:', ur: 'Spread:' },
        opts: { en: ['A cost', 'Free edge', 'Only for stocks'], ur: ['Cost', 'Free edge', 'Stocks only'] },
        correct: 0, explain: { en: 'You cross it to trade.', ur: 'Cross = pay.' } },
      { q: { en: 'High leverage mainly increases:', ur: 'High lev:' },
        opts: { en: ['Liquidation and ruin speed', 'Guaranteed accuracy', 'Free pips'], ur: ['Ruin speed', 'Accuracy', 'Free pips'] },
        correct: 0, explain: { en: 'Borrowed exposure cuts both ways.', ur: 'Borrow dono taraf.' } },
      { q: { en: 'This track is:', ur: 'Track:' },
        opts: { en: ['Literacy / process school', 'A signal service', 'A broker rebate farm'], ur: ['Literacy school', 'Signals', 'Rebates'] },
        correct: 0, explain: { en: 'School framing.', ur: 'School.' } },
    ],
  }),
  week({
    id: 2,
    title: { en: 'Sessions, Size & Correlation', ur: 'Sessions, Size, Correlation' },
    objective: {
      en: 'Respect sessions, size by risk, and count correlated USD bets as one theme.',
      ur: 'Sessions + risk size + correlation theme.',
    },
    teach: {
      en: `<p>Liquidity and behavior change across Asia / London / New York. Quiet sessions and news hours are different animals. Size from <strong>risk $ and stop distance</strong> — not from “feels like 1 lot.”</p>
<p><strong>Correlation:</strong> long EUR/USD + long GBP/USD + short USD/JPY is often one short-dollar theme. If USD rips, all lose together. Count risk per theme.</p>
<p>Weekend gaps can jump through stops — market closed means stops do not protect like you wish.</p>`,
      ur: `<p>Sessions alag. Size = risk$ + stop. Correlation = ek theme. Weekend gap stops tod sakta.</p>`,
    },
    workedExample: {
      en: `<p>1% account risk, stop 20 pips → size so 20-pip loss ≈ 1%. Doubling lot “because London is trending” doubles ruin speed.</p>`,
      ur: `<p>1% risk / 20 pip stop → size math. Lot double = ruin double.</p>`,
    },
    commonMistake: {
      en: `<p>Three tickets, one dollar bet — thinking diversification happened.</p>`,
      ur: `<p>Teen ticket, ek USD bet = diversify nahi.</p>`,
    },
    exitTicket: { en: 'You can name one correlated pair combo that is really one theme.', ur: 'Ek correlated theme.' },
    notebookPrompt: { en: 'Write max theme risk % and your no-trade hours.', ur: 'Theme risk% + no-trade hours.' },
    flashcardSeeds: [
      { front: { en: 'Position size comes from', ur: 'Size' }, back: { en: 'Risk $ ÷ stop distance.', ur: 'Risk$ ÷ stop.' } },
      { front: { en: 'EURUSD + GBPUSD long together', ur: 'EU+GB' }, back: { en: 'Often one short-USD theme.', ur: 'Short-USD theme.' } },
      { front: { en: 'Weekend hold risk', ur: 'Weekend' }, back: { en: 'Gap through stop while closed.', ur: 'Gap through stop.' } },
      { front: { en: 'Session choice matters because', ur: 'Session' }, back: { en: 'Liquidity and noise differ.', ur: 'Liquidity/noise.' } },
      { front: { en: '“Feels like one lot”', ur: 'Feel size' }, back: { en: 'Not a risk system.', ur: 'Risk system nahi.' } },
    ],
    quiz: [
      { q: { en: 'Position size should start from:', ur: 'Size:' },
        opts: { en: ['Risk money and stop distance', 'Maximum leverage allowed', 'Tip channel lot size'], ur: ['Risk + stop', 'Max lev', 'Tip lot'] },
        correct: 0, explain: { en: 'Risk math first.', ur: 'Risk math.' } },
      { q: { en: 'Long EUR/USD and long GBP/USD is often:', ur: 'EU+GB:' },
        opts: { en: ['One short-dollar theme', 'Perfect hedges', 'Uncorrelated always'], ur: ['Short-dollar theme', 'Hedge', 'Uncorrelated'] },
        correct: 0, explain: { en: 'USD common factor.', ur: 'USD factor.' } },
      { q: { en: 'Stops over the weekend:', ur: 'Weekend stops:' },
        opts: { en: ['May not fill at your level after a gap', 'Always fill exactly', 'Earn swap as protection'], ur: ['Gap miss', 'Exact fill', 'Swap protect'] },
        correct: 0, explain: { en: 'Closed market ≠ continuous protection.', ur: 'Band = no continuous.' } },
      { q: { en: 'Best session habit:', ur: 'Session:' },
        opts: { en: ['Know which session you trade and why', 'Trade all 24 hours equally', 'Only trade Sundays'], ur: ['Know session', 'All 24h', 'Sunday only'] },
        correct: 0, explain: { en: 'Intentional hours.', ur: 'Intentional.' } },
    ],
  }),
  week({
    id: 3,
    title: { en: 'Calendar, Swap & Broker Risk', ur: 'Calendar, Swap, Broker' },
    objective: {
      en: 'Check the calendar, know swap sign, and refuse unregulated high-leverage traps.',
      ur: 'Calendar + swap + regulated broker only.',
    },
    teach: {
      en: `<p>NFP, CPI, central bank days are known in advance. Spreads explode; first spikes reverse. Flatten or reduce before red events on your pair. Trading the first spike is usually gambling with worse fills.</p>
<p><strong>Swap</strong> is overnight interest — real P/L. <strong>Carry</strong> grinds slowly and can crash when risk flips.</p>
<p>Offshore “1:1000 + easy withdraw” brokers with mystery spikes to your stop are a venue risk. Prefer regulated venues; failed withdrawals = walk away.</p>
<p>{{redflag:Recovery agents after a loss are often a second scam.}}</p>`,
      ur: `<p>Calendar pehle. Red event → reduce. Swap = P/L. Unregulated 1:1000 = trap. Withdraw fail = exit.</p>
<p>{{redflag:Recovery agent = second scam.}}</p>`,
    },
    workedExample: {
      en: `<p>Before NFP: cut size to flat or micro. After spike settles, if you trade at all — second move with a real stop, not market-in on the first tick.</p>`,
      ur: `<p>NFP pehle flat/micro. Pehle spike pe market-in mat.</p>`,
    },
    commonMistake: {
      en: `<p>Ignoring swap for a week then wondering why P/L bled.</p>`,
      ur: `<p>Swap ignore → silent bleed.</p>`,
    },
    exitTicket: { en: 'You can list today’s red events for your pair (or “none”).', ur: 'Aaj red events list.' },
    notebookPrompt: { en: 'Write broker regulation note + swap sign on your practice pair + calendar rule.', ur: 'Broker + swap + calendar rule.' },
    flashcardSeeds: [
      { front: { en: 'Red news spreads', ur: 'Red news' }, back: { en: 'Widen; stops slip.', ur: 'Wide + slip.' } },
      { front: { en: 'Markets react to data via', ur: 'Data' }, back: { en: 'Actual vs forecast.', ur: 'Actual vs forecast.' } },
      { front: { en: 'Swap is', ur: 'Swap' }, back: { en: 'Overnight interest on the position.', ur: 'Overnight interest.' } },
      { front: { en: 'Withdrawal refusal', ur: 'Withdraw fail' }, back: { en: 'Treat as confirmed venue failure — leave.', ur: 'Leave.' } },
      { front: { en: 'First spike into news', ur: 'First spike' }, back: { en: 'Usually poor-execution gambling.', ur: 'Poor execution gamble.' } },
    ],
    quiz: [
      { q: { en: 'During major releases, spreads typically:', ur: 'News spreads:' },
        opts: { en: ['Widen and stops can slip', 'Go to zero', 'Become fixed forever'], ur: ['Widen + slip', 'Zero', 'Fixed'] },
        correct: 0, explain: { en: 'Liquidity steps back.', ur: 'Liquidity peeche.' } },
      { q: { en: 'Data surprises are relative to:', ur: 'Surprise:' },
        opts: { en: ['Forecast / expectations', 'Whether the number “sounds big”', 'Broker bonus color'], ur: ['Forecast', 'Sounds big', 'Bonus'] },
        correct: 0, explain: { en: 'Baseline is expected.', ur: 'Expected baseline.' } },
      { q: { en: 'Overnight swap depends on:', ur: 'Swap:' },
        opts: { en: ['Interest differential of the two currencies', 'Chart timeframe', 'Your win rate'], ur: ['Rate differential', 'Timeframe', 'Win rate'] },
        correct: 0, explain: { en: 'Long earn / short pay (net).', ur: 'Long earn, short pay.' } },
      { q: { en: 'Best response to an unregulated broker that blocks withdrawals:', ur: 'Blocked withdraw:' },
        opts: { en: ['Stop sending funds; treat as failed venue', 'Send more to “unlock”', 'Share more KYC selfies on Telegram'], ur: ['Stop funds', 'Send more', 'Telegram KYC'] },
        correct: 0, explain: { en: 'Do not feed the trap.', ur: 'Trap feed mat.' } },
    ],
  }),
];

export const FOREX_DEEP_PLACEMENT = [
  { topic: 1, q: { en: 'Base currency is:', ur: 'Base:' }, opts: { en: ['First in the pair', 'Always USD', 'The pip only'], ur: ['Pehli', 'Always USD', 'Pip'] }, correct: 0 },
  { topic: 1, q: { en: 'Spread is:', ur: 'Spread:' }, opts: { en: ['A cost', 'Free edge', 'Tax refund'], ur: ['Cost', 'Edge', 'Refund'] }, correct: 0 },
  { topic: 2, q: { en: 'Size should use:', ur: 'Size:' }, opts: { en: ['Risk $ and stop', 'Max leverage', 'Tip lot'], ur: ['Risk+stop', 'Max lev', 'Tip'] }, correct: 0 },
  { topic: 2, q: { en: 'Correlated USD shorts are:', ur: 'Corr:' }, opts: { en: ['Often one theme', 'Always hedges', 'Illegal'], ur: ['One theme', 'Hedges', 'Illegal'] }, correct: 0 },
  { topic: 3, q: { en: 'Before red news:', ur: 'Red news:' }, opts: { en: ['Flatten or reduce', 'Max size', 'Disable stops forever'], ur: ['Reduce', 'Max size', 'No stops'] }, correct: 0 },
  { topic: 3, q: { en: 'Blocked withdrawals mean:', ur: 'Withdraw:' }, opts: { en: ['Leave the venue', 'Send more unlock fees', 'Post seed in chat'], ur: ['Leave', 'Unlock fee', 'Seed chat'] }, correct: 0 },
];
