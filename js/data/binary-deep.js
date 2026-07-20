/* Binary options — elective harm-reduction 6-part bar (v48).
   Self-defense, not how-to-chase. Banned for retail in many places. */

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

export const BINARY_DEEP_WEEKS = [
  week({
    id: 1,
    title: { en: 'Why Binary Is High-Risk', ur: 'Binary High-Risk Kyun' },
    objective: {
      en: 'Frame binary as near-gambling structure — literacy to refuse, not to chase.',
      ur: 'Binary ≈ gambling structure — refuse literacy, chase nahi.',
    },
    teach: {
      en: `<p>Binary options often pay a fixed win/lose on a yes/no price bet over a short timer. Many jurisdictions ban or restrict retail binaries because of abuse and negative EV.</p>
<p>This elective is <strong>harm reduction</strong>. Completing it is not permission or endorsement.</p>
<p>{{redflag:“90% win binary signals” = classic scam bait.}}</p>`,
      ur: `<p>Binary = short timer yes/no bet. Bohat jagah retail ban/restrict. Ye elective = harm reduction.</p>
<p>{{redflag:90% win binary signals = scam bait.}}</p>`,
    },
    workedExample: {
      en: `<p>Ad: “$100 → $1000 today binary.” Reality: house edge + deposit traps.</p>`,
      ur: `<p>$100→$1000 ad = trap bait.</p>`,
    },
    commonMistake: {
      en: `<p>Treating binary ads as a normal brokerage product.</p>`,
      ur: `<p>Binary ads = normal broker.</p>`,
    },
    exitTicket: { en: 'You can say this track is refuse-literacy.', ur: 'Refuse-literacy ek line.' },
    notebookPrompt: { en: 'Write: I will not deposit into binary venues.', ur: 'Binary venues pe deposit nahi.' },
    flashcardSeeds: [
      { front: { en: 'Binary structure', ur: 'Binary' }, back: { en: 'Fixed win/lose short-timer bet.', ur: 'Fixed win/lose short bet.' } },
      { front: { en: 'This elective is', ur: 'Elective' }, back: { en: 'Harm reduction — not endorsement.', ur: 'Harm reduction.' } },
      { front: { en: '90% win signals', ur: '90%' }, back: { en: 'Scam bait.', ur: 'Scam bait.' } },
      { front: { en: 'Many jurisdictions', ur: 'Law' }, back: { en: 'Ban/restrict retail binaries.', ur: 'Ban/restrict.' } },
      { front: { en: 'Certificate here', ur: 'Cert' }, back: { en: 'Study — not a license to trade binaries.', ur: 'Study — license nahi.' } },
    ],
    quiz: [
      { q: { en: 'This elective’s goal is:', ur: 'Goal:' },
        opts: { en: ['Harm-reduction literacy', 'Teach profitable binaries', 'Broker license'], ur: ['Harm reduction', 'Profitable binaries', 'License'] },
        correct: 0, explain: { en: 'Refuse-first.', ur: 'Refuse.' } },
      { q: { en: '“90% win binary signals” is:', ur: '90%:' },
        opts: { en: ['Scam bait', 'Normal research', 'Risk-free'], ur: ['Scam bait', 'Research', 'Risk-free'] },
        correct: 0, explain: { en: 'Refuse.', ur: 'Refuse.' } },
      { q: { en: 'Binary short-timer bets resemble:', ur: 'Resemble:' },
        opts: { en: ['Gambling structures', 'Long-term investing', 'Bond ladders'], ur: ['Gambling', 'Investing', 'Bonds'] },
        correct: 0, explain: { en: 'Honest frame.', ur: 'Honest.' } },
      { q: { en: 'Completing this track means:', ur: 'Complete:' },
        opts: { en: ['You studied risks — not endorsed trading', 'You may market binaries', 'Income unlocked'], ur: ['Studied risks', 'Market binaries', 'Income'] },
        correct: 0, explain: { en: 'No endorsement.', ur: 'No endorse.' } },
    ],
  }),
  week({
    id: 2,
    title: { en: 'Payout Math & House Edge', ur: 'Payout Math aur House Edge' },
    objective: {
      en: 'See why fixed payouts usually imply negative expected value.',
      ur: 'Fixed payout → aksar negative EV.',
    },
    teach: {
      en: `<p>If win pays less than fair odds relative to true probability, long-run EV is negative. Short timers + spreads/payouts tilt toward the house. Winning streaks do not rewrite math.</p>`,
      ur: `<p>Unfair payout = negative EV. Streaks math nahi badalte.</p>`,
    },
    workedExample: {
      en: `<p>Risk 100 to win 80 on ~50/50-ish short bet → EV negative even before venue tricks.</p>`,
      ur: `<p>100 risk, 80 win on coin-flip-ish → EV negative.</p>`,
    },
    commonMistake: {
      en: `<p>Martingale after losses on binaries — accelerates ruin.</p>`,
      ur: `<p>Binary pe martingale = tez ruin.</p>`,
    },
    exitTicket: { en: 'You can explain negative EV in one sentence.', ur: 'Negative EV ek jumla.' },
    notebookPrompt: { en: 'Write: I will not martingale binary losses.', ur: 'Martingale nahi.' },
    flashcardSeeds: [
      { front: { en: 'Unfair fixed payout', ur: 'Payout' }, back: { en: 'Negative EV over time.', ur: 'Negative EV.' } },
      { front: { en: 'Winning streak means', ur: 'Streak' }, back: { en: 'Variance — not rewritten odds.', ur: 'Variance — odds same.' } },
      { front: { en: 'Martingale on binary', ur: 'Martingale' }, back: { en: 'Ruin accelerator.', ur: 'Ruin tez.' } },
      { front: { en: 'House edge', ur: 'House' }, back: { en: 'Structural tilt against player.', ur: 'Player ke khilaf tilt.' } },
      { front: { en: 'Short timer', ur: 'Timer' }, back: { en: 'Noise + costs dominate.', ur: 'Noise + costs.' } },
    ],
    quiz: [
      { q: { en: 'Paying 100 to win 80 on fair coin-ish odds is:', ur: '100→80:' },
        opts: { en: ['Negative EV', 'Positive EV always', 'Risk-free'], ur: ['Negative EV', 'Positive EV', 'Risk-free'] },
        correct: 0, explain: { en: 'Math.', ur: 'Math.' } },
      { q: { en: 'Martingale after binary losses:', ur: 'Martingale:' },
        opts: { en: ['Accelerates ruin', 'Guarantees recovery', 'Required'], ur: ['Tez ruin', 'Guaranteed recover', 'Required'] },
        correct: 0, explain: { en: 'Refuse.', ur: 'Refuse.' } },
      { q: { en: 'Streaks prove:', ur: 'Streaks:' },
        opts: { en: ['Variance happened', 'Odds flipped forever', 'Venue loves you'], ur: ['Variance', 'Odds flipped', 'Love'] },
        correct: 0, explain: { en: 'Variance.', ur: 'Variance.' } },
      { q: { en: 'Best use of this math is:', ur: 'Use:' },
        opts: { en: ['Walk away', 'Double size', 'Buy VIP signals'], ur: ['Walk away', 'Double', 'VIP'] },
        correct: 0, explain: { en: 'Harm reduction.', ur: 'Harm reduction.' } },
    ],
  }),
  week({
    id: 3,
    title: { en: 'Regulation & Scam Flags', ur: 'Regulation aur Scam Flags' },
    objective: {
      en: 'Spot offshore binary scams: deposit pressure, withdrawal blocks, fake regulators.',
      ur: 'Offshore scams: deposit pressure, withdraw block, fake regulator.',
    },
    teach: {
      en: `<p>Red flags: cold calls, “account manager” deposit ladders, blocked withdrawals, cloned regulator logos, recovery agents after loss.</p>
<p>If withdrawals fail — stop funding immediately.</p>`,
      ur: `<p>Cold call, deposit ladder, withdraw block, fake regulator, recovery agent = red flags. Stop funding.</p>`,
    },
    workedExample: {
      en: `<p>DM: “Pay tax to unlock withdrawal.” Refuse — classic trap.</p>`,
      ur: `<p>Unlock tax for withdraw = trap. Refuse.</p>`,
    },
    commonMistake: {
      en: `<p>Sending more money to unlock a blocked withdrawal.</p>`,
      ur: `<p>Blocked withdraw pe aur deposit.</p>`,
    },
    exitTicket: { en: 'You can list four binary scam tells.', ur: 'Char scam tells.' },
    notebookPrompt: { en: 'Never-pay list for binary unlock/recovery.', ur: 'Never-pay binary list.' },
    flashcardSeeds: [
      { front: { en: 'Unlock withdrawal fee', ur: 'Unlock' }, back: { en: 'Trap — stop funding.', ur: 'Trap.' } },
      { front: { en: 'Fake regulator logo', ur: 'Fake reg' }, back: { en: 'Verify on official sites — not screenshots.', ur: 'Official verify.' } },
      { front: { en: 'Recovery agent', ur: 'Recovery' }, back: { en: 'Often second scam.', ur: 'Second scam.' } },
      { front: { en: 'Deposit ladder pressure', ur: 'Ladder' }, back: { en: 'Walk away.', ur: 'Walk away.' } },
      { front: { en: 'Blocked withdraw', ur: 'Blocked' }, back: { en: 'Do not send more.', ur: 'Aur mat bhejo.' } },
    ],
    quiz: [
      { q: { en: 'Pay tax/fee to unlock withdrawal is:', ur: 'Unlock:' },
        opts: { en: ['A scam pattern', 'Normal banking always', 'Required by all regulators'], ur: ['Scam', 'Normal', 'Required'] },
        correct: 0, explain: { en: 'Refuse.', ur: 'Refuse.' } },
      { q: { en: 'After blocked withdrawals you should:', ur: 'Blocked:' },
        opts: { en: ['Stop funding', 'Send more to unlock', 'Share more OTPs'], ur: ['Stop funding', 'Send more', 'OTP share'] },
        correct: 0, explain: { en: 'Starve the trap.', ur: 'Starve.' } },
      { q: { en: 'Recovery DMs after binary loss are often:', ur: 'Recovery:' },
        opts: { en: ['Second scams', 'Police process', 'Insurance'], ur: ['Second scam', 'Police', 'Insurance'] },
        correct: 0, explain: { en: 'Refuse.', ur: 'Refuse.' } },
      { q: { en: 'Cold-call deposit ladders are:', ur: 'Cold call:' },
        opts: { en: ['Red flags', 'Best onboarding', 'Risk-free'], ur: ['Red flags', 'Best', 'Risk-free'] },
        correct: 0, explain: { en: 'Walk away.', ur: 'Walk.' } },
    ],
  }),
  week({
    id: 4,
    title: { en: 'Strict Limits · Prefer Exit', ur: 'Strict Limits · Prefer Exit' },
    objective: {
      en: 'Default exit: do not trade binaries. If somehow exposed — tiny, timed, then stop.',
      ur: 'Default: binary trade mat. Exposed ho to tiny → stop.',
    },
    teach: {
      en: `<p>Preferred action: <strong>do not deposit</strong>. If already stuck: document, stop funding, seek legitimate complaint channels — never recovery agents.</p>
<p>No martingale. No “revenge one more.” Certificate = study of harm — not a playbook.</p>`,
      ur: `<p>Deposit mat. Stuck: document, stop funding, legitimate complaint — recovery agent nahi. Cert = harm study.</p>`,
    },
    workedExample: {
      en: `<p>Card: “Zero binary deposits · block ads · report scam domains · no VIP.”</p>`,
      ur: `<p>Zero deposit · ads block · scam report · no VIP.</p>`,
    },
    commonMistake: {
      en: `<p>One more trade to get even.</p>`,
      ur: `<p>Ek aur trade — even hone.</p>`,
    },
    exitTicket: { en: 'You can recite the exit-first rule.', ur: 'Exit-first rule.' },
    notebookPrompt: { en: 'Six-bullet binary refuse loop on Study desk.', ur: '6-bullet binary refuse.' },
    flashcardSeeds: [
      { front: { en: 'Default action', ur: 'Default' }, back: { en: 'Do not deposit / do not trade binaries.', ur: 'Deposit/trade nahi.' } },
      { front: { en: 'Revenge trade', ur: 'Revenge' }, back: { en: 'Forbidden — accelerates loss.', ur: 'Mana — tez loss.' } },
      { front: { en: 'Stuck funds playbook', ur: 'Stuck' }, back: { en: 'Stop funding + document + legit channels.', ur: 'Stop + document + legit.' } },
      { front: { en: 'Certificate', ur: 'Cert' }, back: { en: 'Harm-reduction study — not playbook.', ur: 'Harm study — playbook nahi.' } },
      { front: { en: 'Elective credit path', ur: 'Credit' }, back: { en: 'Never — eyes-open only.', ur: 'Kabhi nahi — eyes open.' } },
    ],
    quiz: [
      { q: { en: 'Preferred stance on binaries:', ur: 'Stance:' },
        opts: { en: ['Do not trade / do not deposit', 'Martingale daily', 'Max VIP'], ur: ['Do not trade', 'Martingale', 'Max VIP'] },
        correct: 0, explain: { en: 'Exit-first.', ur: 'Exit-first.' } },
      { q: { en: 'Revenge “one more” is:', ur: 'Revenge:' },
        opts: { en: ['A ruin pattern', 'Required recovery', 'Edge'], ur: ['Ruin', 'Recovery', 'Edge'] },
        correct: 0, explain: { en: 'Stop.', ur: 'Stop.' } },
      { q: { en: 'This certificate means:', ur: 'Cert:' },
        opts: { en: ['Harm-reduction study — not endorsement', 'Binary license', 'Income'], ur: ['Harm study', 'License', 'Income'] },
        correct: 0, explain: { en: 'Honesty.', ur: 'Honesty.' } },
      { q: { en: 'If already deposited and blocked:', ur: 'Blocked:' },
        opts: { en: ['Stop funding; document; legit channels', 'Pay unlock fees', 'Hire recovery DM'], ur: ['Stop + document', 'Unlock fee', 'Recovery DM'] },
        correct: 0, explain: { en: 'Starve trap.', ur: 'Starve.' } },
    ],
  }),
];

export const BINARY_DEEP_PLACEMENT = [
  { topic: 1, q: { en: 'Elective goal:', ur: 'Goal:' }, opts: { en: ['Harm reduction', 'Profitable binaries', 'License'], ur: ['Harm reduction', 'Profit', 'License'] }, correct: 0 },
  { topic: 1, q: { en: '90% signals:', ur: '90%:' }, opts: { en: ['Scam bait', 'Research', 'Safe'], ur: ['Scam bait', 'Research', 'Safe'] }, correct: 0 },
  { topic: 2, q: { en: 'Unfair payout EV:', ur: 'EV:' }, opts: { en: ['Negative', 'Always positive', 'Zero forever'], ur: ['Negative', 'Positive', 'Zero'] }, correct: 0 },
  { topic: 2, q: { en: 'Martingale:', ur: 'Martingale:' }, opts: { en: ['Ruin accelerator', 'Guaranteed fix', 'Required'], ur: ['Ruin', 'Fix', 'Required'] }, correct: 0 },
  { topic: 3, q: { en: 'Unlock withdraw fee:', ur: 'Unlock:' }, opts: { en: ['Scam', 'Normal', 'Required'], ur: ['Scam', 'Normal', 'Required'] }, correct: 0 },
  { topic: 3, q: { en: 'Blocked withdraw:', ur: 'Blocked:' }, opts: { en: ['Stop funding', 'Send more', 'Share OTP'], ur: ['Stop', 'Send more', 'OTP'] }, correct: 0 },
  { topic: 4, q: { en: 'Default action:', ur: 'Default:' }, opts: { en: ['Do not trade binaries', 'Daily binary', 'VIP max'], ur: ['Do not trade', 'Daily', 'VIP'] }, correct: 0 },
  { topic: 4, q: { en: 'Certificate:', ur: 'Cert:' }, opts: { en: ['Harm study not endorsement', 'Binary license', 'Income'], ur: ['Harm study', 'License', 'Income'] }, correct: 0 },
];
