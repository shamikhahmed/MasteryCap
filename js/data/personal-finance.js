/* personal-finance.js — Budget + debt literacy tracks (bilingual). */

export const PF_BUDGET_WEEKS = [
  {
    id: 1,
    title: { en: 'Cash Flow, Not Vibes', ur: 'Cash Flow, Vibes Nahi' },
    body: {
      en: `<p>Personal finance starts with one honest number: <strong>money in minus money out</strong> each month. Not what you wish you spent — what actually left your account. A budget is a mirror, not a punishment.</p>
<p>Three buckets work for most learners: <strong>needs</strong> (rent, food, transport, minimum debt), <strong>wants</strong> (dining, subscriptions, upgrades), and <strong>future you</strong> (emergency fund, investing, skills). Split after tax if salaried; if income swings, use a rolling 3-month average.</p>
<p>{{redflag:Apps that hide small daily spends ("it's only 500 PKR") are how budgets die. Track the boring stuff first.}}</p>`,
      ur: `<p>Personal finance ek imandar number se shuru: har mahine <strong>andar minus bahar</strong>. Jo kharcha chahte the nahi — jo account se nikla. Budget aaina hai, saza nahi.</p>
<p>Teen buckets zyada tar learners ke liye: <strong>zaroorat</strong> (rent, khana, transport, minimum debt), <strong>khushi</strong> (dining, subscriptions), aur <strong>future you</strong> (emergency fund, investing, skills). Salary pe tax ke baad baanto; agar income upar neeche ho to 3 mahine ka average lo.</p>
<p>{{redflag:Jo apps chhote kharch chhupa dein ("sirf 500 PKR") — budget wahi mar jata hai. Pehle boring cheezen track karo.}}</p>`,
    },
    quiz: [
      { q: { en: 'A budget mainly shows:', ur: 'Budget mainly dikhata hai:' },
        opts: { en: ['Actual in vs out — reality', 'Guaranteed wealth next year', 'Which stock to buy'], ur: ['Asli andar/bahar — haqeeqat', 'Agle saal guaranteed ameer', 'Kaun sa stock'] },
        correct: 0, explain: { en: 'Clarity beats optimism. You cannot fix what you cannot see.', ur: 'Wazehai optimism se behtar. Jo dikhe na use theek na kar sako.' } },
      { q: { en: '“Future you” bucket includes:', ur: '“Future you” bucket mein:' },
        opts: { en: ['Emergency fund and long-term savings', 'Only luxury purchases', 'Credit-card minimums only'], ur: ['Emergency fund aur long-term savings', 'Sirf luxury', 'Sirf card minimum'] },
        correct: 0, explain: { en: 'Pay yourself after needs, before wants spiral.', ur: 'Zaroorat ke baad khud ko pay karo, wants se pehle.' } },
      { q: { en: 'Variable income learners should use:', ur: 'Variable income wale:' },
        opts: { en: ['A rolling average, not one lucky month', 'The best month ever as baseline', 'No tracking at all'], ur: ['Rolling average, ek lucky mahina nahi', 'Sab se achha mahina baseline', 'Bilkul track nahi'] },
        correct: 0, explain: { en: 'One spike month creates a budget that breaks every normal month.', ur: 'Ek spike month aisa budget banata jo har normal mahine toot jaye.' } },
    ],
  },
  {
    id: 2,
    title: { en: 'Needs vs Wants Under Stress', ur: 'Stress Mein Needs vs Wants' },
    body: {
      en: `<p>When money is tight, the fight is not math — it is <strong>identity</strong>. “I deserve this” after a hard week is human; the skill is separating <em>relief</em> from <em>need</em>.</p>
<p>Try the 48-hour rule on non-essential buys over a threshold you set (e.g. 5% of monthly take-home). Sleep on it. If it still matters, budget it explicitly as a want — not a leak.</p>
<p>Subscriptions are silent drains: list every recurring charge quarterly. Cancel one before adding a new “productivity” tool. Same energy as cutting a losing trade — small, repeated losses compound.</p>`,
      ur: `<p>Jab paise tight hon, ladai math nahi — <strong>identity</strong> hai. Mushkil hafte ke baad “main deserve karta” insani hai; skill <em>relief</em> aur <em>need</em> alag karna hai.</p>
<p>Non-essential khareed pe 48-hour rule (maslan take-home ka 5%). Socho. Agar phir bhi zaroori lage to want bucket mein likho — leak nahi.</p>
<p>Subscriptions chupke drain: har quarter recurring list. Naya “productivity” tool se pehle ek cancel. Wahi energy jo losing trade kaat'te — chhota bar bar nuqsan compound.</p>`,
    },
    quiz: [
      { q: { en: 'The 48-hour rule helps with:', ur: '48-hour rule madad:' },
        opts: { en: ['Impulse wants, not rent', 'Paying rent on time', 'Tax filing'], ur: ['Impulse wants, rent nahi', 'Rent time pe', 'Tax filing'] },
        correct: 0, explain: { en: 'Delay kills dopamine purchases that budgets regret.', ur: 'Delay dopamine khareed ko maarti jo budget regret karta.' } },
      { q: { en: 'Subscriptions should be reviewed:', ur: 'Subscriptions review:' },
        opts: { en: ['Quarterly — they hide in autopay', 'Never — set and forget', 'Only when broke'], ur: ['Quarterly — autopay mein chhup jati', 'Kabhi nahi', 'Sirf broke hone pe'] },
        correct: 0, explain: { en: 'Autopay is designed to make you forget the cost.', ur: 'Autopay cost bhoolne ke liye design hai.' } },
      { q: { en: 'Under stress, “relief spending” is:', ur: 'Stress mein “relief spending”:' },
        opts: { en: ['A want to plan, not a need by default', 'Always justified', 'Same as groceries'], ur: ['Plan ki want, default need nahi', 'Hamesha justified', 'Groceries jaisa'] },
        correct: 0, explain: { en: 'Name it honestly; then you choose with eyes open.', ur: 'Imandar naam do; phir khuli aankh se chuno.' } },
    ],
  },
  {
    id: 3,
    title: { en: 'Simple Budget Systems', ur: 'Simple Budget Systems' },
    body: {
      en: `<p>You do not need a perfect app — you need a <strong>system you will open weekly</strong>. Paper, spreadsheet, or envelope method all work if used.</p>
<p><strong>50/30/20</strong> is a starting frame: ~50% needs, ~30% wants, ~20% future — adjust for your city and family obligations. In high-cost cities, needs may be 60% — that is data, not failure.</p>
<p>Weekly 15-minute review: compare plan vs actual, move one number next week, no shame spiral. Finance literacy is repetition, not one heroic spreadsheet day.</p>`,
      ur: `<p>Perfect app nahi — <strong>system jo haftay mein kholo</strong>. Paper, sheet, ya envelope — sab chale agar use karo.</p>
<p><strong>50/30/20</strong> shuruat: ~50% needs, ~30% wants, ~20% future — apne shehar aur family ke hisaab se adjust. Mehngay shehar mein needs 60% ho sakti — ye data hai, failure nahi.</p>
<p>Haftay mein 15 min review: plan vs actual, agle hafte ek number hilaao, shame spiral nahi. Literacy repetition hai, ek hero spreadsheet din nahi.</p>`,
    },
    quiz: [
      { q: { en: 'Best budget tool is:', ur: 'Best budget tool:' },
        opts: { en: ['One you actually review weekly', 'The most complex app', 'Whatever influencers use'], ur: ['Jo haftay review ho', 'Sab se complex app', 'Jo influencer use kare'] },
        correct: 0, explain: { en: 'Consistency beats features.', ur: 'Consistency features se behtar.' } },
      { q: { en: 'If needs are 60% in your city:', ur: 'Agar needs 60% hon:' },
        opts: { en: ['Adjust the frame — do not pretend 50%', 'You failed at budgeting', 'Stop tracking'], ur: ['Frame adjust — 50% ka dhoka mat', 'Budget fail', 'Track band'] },
        correct: 0, explain: { en: 'Templates serve you; you do not serve templates.', ur: 'Template aap ke liye; aap template ke liye nahi.' } },
      { q: { en: 'Weekly review should take about:', ur: 'Weekly review kitna:' },
        opts: { en: ['15 minutes — small habit', '3 hours — perfection', 'Zero — autopilot'], ur: ['15 min — chhoti habit', '3 ghante — perfection', 'Zero — autopilot'] },
        correct: 0, explain: { en: 'Small recurring beats rare marathons.', ur: 'Chhota bar bar badi rare marathon se behtar.' } },
    ],
  },
  {
    id: 4,
    title: { en: 'Budget → Investing Bridge', ur: 'Budget → Investing Bridge' },
    body: {
      en: `<p>Investing before a stable cash-flow picture is like trading without a stop — excitement first, damage later. Finish this track knowing: <strong>surplus is engineered</strong>, not discovered after spending.</p>
<p>Order: (1) track one month honestly, (2) build a tiny emergency buffer (even one month of needs), (3) automate a fixed transfer to “future you” on payday, (4) only then size market risk in MasteryCap’s Investing track.</p>
<p>This family does not promise returns — it promises fewer self-inflicted money leaks. That alone changes outcomes for most people.</p>`,
      ur: `<p>Stable cash-flow ke baghair invest karna stop ke baghair trade jaisa — pehle excitement, baad mein nuqsan. Is track ka matlab: <strong>surplus banaya jata hai</strong>, kharch ke baad nahi milta.</p>
<p>Tarteeb: (1) ek mahina imandar track, (2) chhota emergency buffer (ek mahine ki needs bhi), (3) payday pe “future you” ko fixed transfer automate, (4) phir MasteryCap Investing mein market risk size karo.</p>
<p>Ye family returns promise nahi — kam self-inflicted leaks promise karti hai. Sirf ye zyada logon ka outcome badal deta hai.</p>`,
    },
    quiz: [
      { q: { en: 'Investing should generally follow:', ur: 'Investing generally pehle:' },
        opts: { en: ['Honest cash-flow tracking + small buffer', 'Max leverage first', 'Random stock tips'], ur: ['Imandar cash-flow + chhota buffer', 'Pehle max leverage', 'Random tips'] },
        correct: 0, explain: { en: 'Surplus is designed, not hoped for.', ur: 'Surplus design hota, umeed se nahi.' } },
      { q: { en: 'Automating payday transfer helps because:', ur: 'Payday transfer automate kyun:' },
        opts: { en: ['Future-you gets paid before wants expand', 'Banks give bonus interest', 'It removes all risk'], ur: ['Future-you ko wants se pehle milta', 'Bank bonus deta', 'Sab risk khatam'] },
        correct: 0, explain: { en: 'Visibility without automation still loses to lifestyle creep.', ur: 'Automation ke baghair lifestyle creep jeet jati.' } },
      { q: { en: 'This track promises:', ur: 'Ye track promise:' },
        opts: { en: ['Fewer leaks — not market returns', 'Guaranteed 20% yearly', 'Debt disappears overnight'], ur: ['Kam leaks — returns nahi', 'Guaranteed 20%', 'Debt raat ko gayab'] },
        correct: 0, explain: { en: 'Process literacy, not lottery marketing.', ur: 'Process literacy, lottery marketing nahi.' } },
    ],
  },
];

export const PF_BUDGET_PLACEMENT = [
  { topic: 1, q: { en: 'Budget =', ur: 'Budget =' }, opts: { en: ['In vs out reality', 'Wish list', 'Stock picks'], ur: ['Andar/bahar haqeeqat', 'Wish list', 'Stock picks'] }, correct: 0 },
  { topic: 1, q: { en: 'Future-you bucket is for:', ur: 'Future-you bucket:' }, opts: { en: ['Savings & buffer', 'Only luxuries', 'Minimum card pay'], ur: ['Savings & buffer', 'Sirf luxury', 'Sirf card minimum'] }, correct: 0 },
  { topic: 2, q: { en: '48-hour rule targets:', ur: '48-hour rule:' }, opts: { en: ['Impulse wants', 'Rent', 'Tax'], ur: ['Impulse wants', 'Rent', 'Tax'] }, correct: 0 },
  { topic: 3, q: { en: '50/30/20 is:', ur: '50/30/20:' }, opts: { en: ['A starting frame', 'Law of Pakistan', 'Broker rule'], ur: ['Shuruati frame', 'Pakistan ka qanoon', 'Broker rule'] }, correct: 0 },
];

export const PF_DEBT_WEEKS = [
  {
    id: 1,
    title: { en: 'Good Debt vs Bad Debt', ur: 'Good Debt vs Bad Debt' },
    body: {
      en: `<p>Not all debt is evil — but most consumer debt is <strong>expensive patience tax</strong>. Good debt (sometimes): education that raises earning power, a modest home loan you can service in stress. Bad debt (usually): cards rolled at 30%+, lifestyle financed, “pay later” apps for wants.</p>
<p>Ask: does this debt buy an asset or a depreciating habit? Can you name the monthly payment without checking the app? If no, pause.</p>`,
      ur: `<p>Har debt bura nahi — magar zyada consumer debt <strong>mehnga sabr tax</strong> hai. Achha debt (kabhi kabhi): taleem jo earning badhaye, chhota home loan jo stress mein service ho. Bura debt (aksar): 30%+ cards, lifestyle finance, wants ke “pay later” apps.</p>
<p>Poochho: ye debt asset kharidta ya depreciating habit? Monthly payment bina app dekhe bata sakte? Agar nahi — ruko.</p>`,
    },
    quiz: [
      { q: { en: 'Credit-card rollover at high APR is usually:', ur: 'High APR card rollover aksar:' },
        opts: { en: ['Bad debt — habit tax', 'Free money', 'Same as a mortgage'], ur: ['Bura debt — habit tax', 'Free paisa', 'Mortgage jaisa'] },
        correct: 0, explain: { en: 'High APR on wants is reverse investing.', ur: 'Wants pe high APR ulta investing hai.' } },
      { q: { en: 'Before new debt, you should know:', ur: 'Naye debt se pehle:' },
        opts: { en: ['The payment in stress months', 'Only the EMI ad shows', 'Influencer opinion'], ur: ['Stress mahino ki payment', 'Sirf EMI ad', 'Influencer'] },
        correct: 0, explain: { en: 'If it breaks in a bad month, it is too big.', ur: 'Bure mahine toot jaye to bara hai.' } },
      { q: { en: 'Debt that buys depreciating wants is:', ur: 'Depreciating wants wala debt:' },
        opts: { en: ['Usually bad debt', 'Always good', 'Tax deductible'], ur: ['Aksar bura', 'Hamesha achha', 'Tax deductible'] },
        correct: 0, explain: { en: 'You pay interest on something worth less tomorrow.', ur: 'Kal kam qeemat cheez pe interest dete ho.' } },
    ],
  },
  {
    id: 2,
    title: { en: 'Emergency Fund Mechanics', ur: 'Emergency Fund Mechanics' },
    body: {
      en: `<p>An emergency fund is <strong>sleep insurance</strong> — not an investment. Target: one month of critical needs first, then three to six as income stabilizes. Keep it boring: savings account or short-term instrument you can reach in 48 hours.</p>
<p>Define “emergency” in writing: job loss, medical, essential repair — not sales, trips, or phone upgrades. When you raid it, refill before investing again.</p>`,
      ur: `<p>Emergency fund <strong>neend ka insurance</strong> hai — investment nahi. Pehle ek mahine ki critical needs, phir teen se chhe jab income stable ho. Boring rakho: savings account ya 48 ghante mein nikalne wala instrument.</p>
<p>“Emergency” likh ke define karo: job loss, medical, zaroori repair — sales, trips, phone upgrade nahi. Jab use karo, invest se pehle dubara bharo.</p>`,
    },
    quiz: [
      { q: { en: 'Emergency fund is for:', ur: 'Emergency fund:' },
        opts: { en: ['True shocks — not sales', 'Every gadget upgrade', 'Stock dips only'], ur: ['Asli shocks — sales nahi', 'Har gadget', 'Sirf stock dip'] },
        correct: 0, explain: { en: 'Blur the line and the fund disappears.', ur: 'Line blur ki to fund gayab.' } },
      { q: { en: 'First milestone is often:', ur: 'Pehla milestone aksar:' },
        opts: { en: ['One month critical needs', 'One year luxury spend', 'Zero cash ever'], ur: ['Ek mahina critical needs', 'Ek saal luxury', 'Kabhi cash zero'] },
        correct: 0, explain: { en: 'Small win beats perfect plan never started.', ur: 'Chhota jeet perfect plan se behtar jo shuru na hua.' } },
      { q: { en: 'After using the fund you should:', ur: 'Fund use ke baad:' },
        opts: { en: ['Refill before aggressive investing', 'Ignore it', 'Borrow more first'], ur: ['Aggressive invest se pehle dubara bharo', 'Ignore', 'Pehle aur borrow'] },
        correct: 0, explain: { en: 'Stack risk only when the floor is back.', ur: 'Floor wapas aaye tab hi risk stack.' } },
    ],
  },
  {
    id: 3,
    title: { en: 'Paydown Strategies', ur: 'Paydown Strategies' },
    body: {
      en: `<p>Two honest methods: <strong>avalanche</strong> (highest interest first — math-optimal) and <strong>snowball</strong> (smallest balance first — motivation). Pick the one you will stick to; quitting halfway costs more than either method.</p>
<p>While paying debt: minimums on everything, extra to target debt, no new consumer debt. Negotiate rates where possible; move only if fees and discipline allow — balance transfers are not magic if spending continues.</p>`,
      ur: `<p>Do imandar tareeqe: <strong>avalanche</strong> (sab se zyada interest pehle — math) aur <strong>snowball</strong> (chhota balance pehle — motivation). Jo stick ho wo chuno; beech chhorna dono se mehnga.</p>
<p>Debt pay karte: sab pe minimum, extra target pe, naya consumer debt nahi. Rate negotiate; balance transfer sirf jab fees aur discipline hon — kharch jari ho to koi jadu nahi.</p>`,
    },
    quiz: [
      { q: { en: 'Avalanche prioritizes:', ur: 'Avalanche prioritizes:' },
        opts: { en: ['Highest interest rate', 'Smallest balance always', 'Newest loan'], ur: ['Sab se zyada interest', 'Hamesha chhota balance', 'Naya loan'] },
        correct: 0, explain: { en: 'Math saves the most interest over time.', ur: 'Math zyada interest bachata.' } },
      { q: { en: 'Snowball prioritizes:', ur: 'Snowball:' },
        opts: { en: ['Quick wins on small balances', 'Lowest APR always', 'Random order'], ur: ['Chhoti balances pe quick wins', 'Hamesha lowest APR', 'Random'] },
        correct: 0, explain: { en: 'Momentum matters if it keeps you paying.', ur: 'Momentum matter karta agar pay karte raho.' } },
      { q: { en: 'During paydown you should avoid:', ur: 'Paydown mein avoid:' },
        opts: { en: ['New consumer debt', 'Paying minimums', 'Tracking balances'], ur: ['Naya consumer debt', 'Minimum pay', 'Balance track'] },
        correct: 0, explain: { en: 'Filling a bucket with the tap on is futile.', ur: 'Tap on reh bucket bharana bekar.' } },
    ],
  },
];

export const PF_DEBT_PLACEMENT = [
  { topic: 1, q: { en: 'High-APR card for wants is:', ur: 'Wants pe high-APR card:' }, opts: { en: ['Usually bad debt', 'Free leverage', 'Always smart'], ur: ['Aksar bura', 'Free leverage', 'Hamesha smart'] }, correct: 0 },
  { topic: 2, q: { en: 'Emergency fund is:', ur: 'Emergency fund:' }, opts: { en: ['Sleep insurance', 'Stock account', 'Vacation fund'], ur: ['Neend insurance', 'Stock account', 'Vacation'] }, correct: 0 },
  { topic: 3, q: { en: 'Avalanche pays first:', ur: 'Avalanche pehle:' }, opts: { en: ['Highest interest', 'Lowest balance', 'Oldest loan'], ur: ['Highest interest', 'Lowest balance', 'Oldest'] }, correct: 0 },
];
