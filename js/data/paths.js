/* ============================================================
   paths.js — Beginner path + per-track graduation.
   Honest: ready for paper / tiny capital with rules — NOT income promise.
   ============================================================ */

/** Recommended order for a true beginner (earn-seeking → invest first). */
export const BEGINNER_PATH = [
  { id: 'invest', why: { en: 'Closest thing to “earn”: time + low fees + boring compounding. Not day-trading income.', ur: '“Earn” ke qareeb: time + low fees + boring compounding. Day-trading income nahi.' } },
  { id: 'spot', why: { en: 'Own assets without liquidation math. Survival first.', ur: 'Liquidation ke bina own. Pehle survival.' } },
  { id: 'crypto', why: { en: 'Only after sizing + stops click. Perps are optional, not required.', ur: 'Sizing + stops ke baad. Perps zaroori nahi.' } },
  { id: 'stocks', why: { en: 'Cash equities first; options only with defined risk.', ur: 'Pehle cash equities; options sirf defined risk.' } },
  { id: 'forex', why: { en: 'After you can size in sleep. Sessions + correlation matter.', ur: 'Sizing automatic ho. Sessions + correlation.' } },
  { id: 'futures', why: { en: 'Obligation + tick math. Micros only until boring.', ur: 'Obligation + tick math. Pehle micros.' } },
  { id: 'bots', why: { en: 'Automate discipline last — never buy a “profit bot.”', ur: 'Discipline automate last — profit bot mat kharido.' } },
  { id: 'binary', why: { en: 'Harm-reduction only. Not an earn path. Skip if you want compounding.', ur: 'Sirf harm-reduction. Earn path nahi. Compounding chahiye to skip.' } },
];

/**
 * Graduation checklist after track weeks (+ exam recommended).
 * tone: 'compound' | 'trade' | 'avoid'
 */
export const TRACK_GRADUATION = {
  invest: {
    tone: 'compound',
    title: { en: 'After Investing track — first capital', ur: 'Investing track ke baad — pehla capital' },
    promise: {
      en: 'This track aims at long-horizon compounding, not salary-from-charts. “Earn” here = keep fees low and stay invested.',
      ur: 'Ye track long-horizon compounding ke liye hai, charts se salary nahi. Yahan “earn” = low fees + invested rehna.',
    },
    steps: {
      en: [
        'Emergency cash (3–6 months) before risk assets',
        'Open regulated account (CDC / compliant broker) — your name custody',
        'Core: low-cost fund/ETF or diversified PSX blue-chips — write 1-page thesis',
        'Automate monthly contribution (DCA) for 90 days before any “picks”',
        'Log every buy in Journal with emotion = calm; skip if FOMO',
        'Rebalance yearly max; ignore daily noise',
      ],
      ur: [
        'Risk assets se pehle 3–6 mahine emergency cash',
        'Regulated account (CDC / compliant broker) — apne naam custody',
        'Core: low-cost fund/ETF ya diversified PSX — 1-page thesis',
        '90 din monthly DCA — “picks” baad mein',
        'Har buy Journal mein; FOMO ho to skip',
        'Saal mein max rebalance; daily noise ignore',
      ],
    },
    sizeRule: {
      en: 'Year 1: only money you will not need for 5+ years. No leverage. No options.',
      ur: 'Saal 1: wo paisa jo 5+ saal nahi chahiye. No leverage. No options.',
    },
  },
  spot: {
    tone: 'compound',
    title: { en: 'After Spot track — own without blowups', ur: 'Spot track ke baad — bina blowup own' },
    promise: {
      en: 'Spot can compound if you survive. Leverage is not required to “earn.”',
      ur: 'Spot compound kar sakta hai agar survive karo. Earn ke liye leverage zaroori nahi.',
    },
    steps: {
      en: [
        'Self-custody plan tested (recovery phrase offline) before large size',
        'Only assets you can explain in one sentence',
        'DCA schedule + hard monthly cap',
        'Never move spot stack into 10x “just this once”',
        'Journal every buy; review monthly, not hourly',
      ],
      ur: [
        'Badi size se pehle self-custody test (recovery offline)',
        'Sirf wo asset jo ek jumle mein explain ho',
        'DCA + hard monthly cap',
        'Spot stack ko 10x pe kabhi mat shift karo',
        'Har buy journal; monthly review, hourly nahi',
      ],
    },
    sizeRule: {
      en: 'Start with an amount whose 50% drawdown you can ignore for a year.',
      ur: 'Itni size jiska 50% drawdown ek saal ignore kar sako.',
    },
  },
  crypto: {
    tone: 'trade',
    title: { en: 'After Crypto track — paper then tiny perps', ur: 'Crypto track ke baad — pehle paper, phir tiny perps' },
    promise: {
      en: 'Graduation = you can size and stop without guessing. Income not promised. Most retail perps lose.',
      ur: 'Graduation = sizing + stop bina guess. Income promise nahi. Zyada tar retail perps haar te.',
    },
    steps: {
      en: [
        'Paper or tiny spot only for 20 journaled sessions',
        'Risk ≤0.5–1% per idea; stop placed before entry every time',
        'No trade if checklist <4/4',
        'Funding: flat if hold >24h without edge for the fee',
        'After 50 logged trades, review expectancy — if negative, stop live size',
        'Perps optional; spot DCA remains valid “earn” path',
      ],
      ur: [
        '20 journaled sessions — paper ya tiny spot',
        'Risk ≤0.5–1%/idea; entry se pehle stop',
        'Checklist <4/4 to no trade',
        'Funding: >24h hold bina edge = flat',
        '50 trades baad expectancy — negative ho to live size band',
        'Perps optional; spot DCA valid earn path',
      ],
    },
    sizeRule: {
      en: 'Live perps: max 1–2% of net worth total margin until 3 months green process (not P/L).',
      ur: 'Live perps: total margin ≤1–2% net worth jab tak 3 mahine process green (P/L nahi).',
    },
  },
  stocks: {
    tone: 'trade',
    title: { en: 'After Stocks track — shares first, options later', ur: 'Stocks track ke baad — pehle shares, options baad' },
    promise: {
      en: 'Cash shares can compound. Options are decay machines — defined risk only if you use them.',
      ur: 'Cash shares compound. Options decay — use karo to sirf defined risk.',
    },
    steps: {
      en: [
        '20 share trades (or invest buys) logged before any option',
        'No naked shorts; long options risk = premium budget only',
        'Earnings: size down or flat — gaps ignore stops',
        'If trading options: max loss per idea ≤1% account',
        'Weekly review: calm vs flagged P/L in Progress',
      ],
      ur: [
        'Options se pehle 20 share/invest logs',
        'No naked short; long options = premium budget',
        'Earnings: size down ya flat',
        'Options: max loss/idea ≤1% account',
        'Weekly: calm vs flagged Progress pe',
      ],
    },
    sizeRule: {
      en: 'Options year-1 budget ≤5% of account; rest shares/funds.',
      ur: 'Saal-1 options budget ≤5% account; baqi shares/funds.',
    },
  },
  forex: {
    tone: 'trade',
    title: { en: 'After Forex track — micro lots only', ur: 'Forex track ke baad — sirf micro lots' },
    promise: {
      en: 'FX is a cost + leverage sport. Graduation = pip math + session discipline, not “pip income.”',
      ur: 'FX = cost + leverage. Graduation = pip math + sessions — “pip income” nahi.',
    },
    steps: {
      en: [
        'Demo until 30 days of rule-following (not profit target)',
        'Micro lots; risk ≤0.5% ; one theme at a time (watch USD correlation)',
        'No news-second entries; flat or tiny into CPI/NFP',
        'Regulated broker you can withdraw from — test a small withdrawal',
        'Journal swap on multi-day holds',
      ],
      ur: [
        '30 din rules follow (profit target nahi) — demo',
        'Micro lots; risk ≤0.5%; ek theme (USD correlation)',
        'News-second entry nahi; CPI/NFP pe flat/tiny',
        'Regulated broker — chhota withdrawal test',
        'Multi-day pe swap journal',
      ],
    },
    sizeRule: {
      en: 'Used leverage from risk math only — ignore “1:500 available.”',
      ur: 'Used leverage sirf risk math se — “1:500 available” ignore.',
    },
  },
  futures: {
    tone: 'trade',
    title: { en: 'After Futures track — micros + tick math', ur: 'Futures track ke baad — micros + tick math' },
    promise: {
      en: 'Obligation products punish hope. Ready = you know $/tick and round contracts down.',
      ur: 'Obligation hope punish. Ready = $/tick pata + contracts floor.',
    },
    steps: {
      en: [
        'Paper micros until tick P/L is automatic',
        'Your stop before maintenance margin — always',
        'Roll calendar on the wall; never discover expiry live',
        '1 micro until 40 logged disciplined sessions',
        'Skip if math says zero contracts',
      ],
      ur: [
        'Tick P/L automatic hone tak paper micros',
        'Stop hamesha maintenance se pehle',
        'Roll calendar; expiry live discover mat',
        '40 disciplined sessions tak 1 micro',
        'Math zero contracts kahe to skip',
      ],
    },
    sizeRule: {
      en: 'contracts = floor(risk$ / (stopTicks × $/tick)) — never round up.',
      ur: 'contracts = floor(risk$ / (stopTicks × $/tick)) — round up kabhi nahi.',
    },
  },
  bots: {
    tone: 'avoid',
    title: { en: 'After Bots track — automate rules, not prophecy', ur: 'Bots track ke baad — rules automate, prophecy nahi' },
    promise: {
      en: 'Bots do not create edge. “Earn” path here = remove bad behavior, not buy alpha.',
      ur: 'Bot edge nahi banata. Yahan earn = buri aadat hatana, alpha kharidna nahi.',
    },
    steps: {
      en: [
        'Automate: exchange stops, scheduled DCA, alerts — only',
        'API keys: trade-only, never withdrawal',
        'Hard sub-account cap = money you accept as zero',
        'No copy-trading with rent money',
        'No paid signal groups without full audited history (almost none have it)',
      ],
      ur: [
        'Sirf: exchange stops, DCA schedule, alerts',
        'API: trade-only, withdrawal kabhi nahi',
        'Sub-account cap = jo zero accept ho',
        'Rent money pe copy-trading nahi',
        'Paid signals bina full audit history — almost none',
      ],
    },
    sizeRule: {
      en: 'Bot capital ≤ money whose total loss does not change your life.',
      ur: 'Bot capital ≤ jis ka total loss life na badle.',
    },
  },
  binary: {
    tone: 'avoid',
    title: { en: 'After Binary track — do not use this to earn', ur: 'Binary track ke baad — earn ke liye use mat karo' },
    promise: {
      en: 'Structural negative EV for most payouts. Completing this track means you know to walk away.',
      ur: 'Zyada tar payouts pe structural −EV. Track khatam = walk away samajh.',
    },
    steps: {
      en: [
        'Default action: do not fund a binary account',
        'If you still play: entertainment budget only, hard daily loss cap, no martingale',
        'Move “earn” energy to Investing + Spot tracks',
        'Report scams; never chase deposit bonuses',
      ],
      ur: [
        'Default: binary account fund mat karo',
        'Phir bhi khelo to: entertainment budget, daily loss cap, no martingale',
        'Earn energy → Investing + Spot',
        'Scam report; deposit bonus mat chase',
      ],
    },
    sizeRule: {
      en: 'Earn path size for binary = $0.',
      ur: 'Binary earn path size = $0.',
    },
  },
};

export function graduationFor(trackId) {
  return TRACK_GRADUATION[trackId] || null;
}
