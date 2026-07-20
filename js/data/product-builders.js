/* product-builders.js — Cap-style product tracks (bilingual). */

export const PB_RESEARCH_WEEKS = [
  {
    id: 1,
    title: { en: 'Problem Before Product', ur: 'Product Se Pehle Problem' },
    body: {
      en: `<p>Cap-family products start with a <strong>painful, frequent problem</strong> — not a feature list. Interview five real users (or yourself daily for a week) before naming the app.</p>
<p>Write a one-page brief: who hurts, when, what they do today, why that fails, and what “better” looks like in one sentence. If you cannot explain it to a friend in 30 seconds, keep refining.</p>`,
      ur: `<p>Cap-family products <strong>dard wali, bar bar problem</strong> se shuru — feature list se nahi. App naam se pehle paanch asli users (ya khud ek hafta daily) suno.</p>
<p>Ek page brief: kaun dard mein, kab, aaj kya karte, kyun fail, “behtar” ek jumle mein. Agar dost ko 30 sec mein samjha na sako — refine karo.</p>`,
    },
    quiz: [
      { q: { en: 'First step is:', ur: 'Pehla qadam:' },
        opts: { en: ['Validate the problem', 'Pick a logo color', 'Buy ads'], ur: ['Problem validate', 'Logo color', 'Ads khareed'] },
        correct: 0, explain: { en: 'Solutions without pain are hobbies.', ur: 'Dard ke baghair solution hobby hai.' } },
      { q: { en: 'A one-page brief includes:', ur: 'One-page brief:' },
        opts: { en: ['Who, when, current workaround', 'Only competitor screenshots', 'Tech stack dreams'], ur: ['Kaun, kab, workaround', 'Sirf competitor shots', 'Tech stack dreams'] },
        correct: 0, explain: { en: 'Context beats imitation.', ur: 'Context copy se behtar.' } },
      { q: { en: 'If you cannot explain in 30 seconds:', ur: '30 sec mein na samjha sako:' },
        opts: { en: ['Problem still fuzzy — refine', 'Ship anyway', 'Add more features'], ur: ['Problem fuzzy — refine', 'Phir bhi ship', 'Aur features'] },
        correct: 0, explain: { en: 'Clarity is the first deliverable.', ur: 'Clarity pehla deliverable hai.' } },
    ],
  },
  {
    id: 2,
    title: { en: 'Scope the MVP', ur: 'MVP Scope Karo' },
    body: {
      en: `<p>MVP means <strong>minimum viable proof</strong> — one core loop a user can finish and want again. Cut everything that does not serve that loop (accounts, analytics dashboards, dark mode polish day one).</p>
<p>Cap offline PWAs often ship: one screen, one data path, one honest limitation stated in-app. Additive storage beats premature backend.</p>`,
      ur: `<p>MVP = <strong>minimum viable proof</strong> — ek core loop jo user khatam kare aur dubara chahay. Jo loop ko serve na kare kaat do (accounts, analytics dashboard, day-one dark polish).</p>
<p>Cap offline PWAs aksar: ek screen, ek data path, ek imandar limitation in-app. Additive storage premature backend se behtar.</p>`,
    },
    quiz: [
      { q: { en: 'MVP should prove:', ur: 'MVP prove kare:' },
        opts: { en: ['One core loop works', 'Every future feature', 'Enterprise SSO'], ur: ['Ek core loop', 'Har future feature', 'Enterprise SSO'] },
        correct: 0, explain: { en: 'Proof before portfolio.', ur: 'Portfolio se pehle proof.' } },
      { q: { en: 'Day-one cut candidates include:', ur: 'Day-one cut:' },
        opts: { en: ['Nice dashboards without users', 'The one loop', 'Honest limits copy'], ur: ['Bina users dashboard', 'Wahi ek loop', 'Imandar limits copy'] },
        correct: 0, explain: { en: 'Vanity features delay learning.', ur: 'Vanity features learning delay.' } },
      { q: { en: 'Offline-first Cap apps prefer:', ur: 'Cap offline apps:' },
        opts: { en: ['Local data + clear limits', 'Fake cloud promises', 'Hidden paywalls'], ur: ['Local data + clear limits', 'Fake cloud', 'Hidden paywall'] },
        correct: 0, explain: { en: 'Honesty builds trust on small teams.', ur: 'Chhoti team pe honesty trust banati.' } },
    ],
  },
  {
    id: 3,
    title: { en: 'Build Loop & Feedback', ur: 'Build Loop aur Feedback' },
    body: {
      en: `<p>Ship a <strong>weekly loop</strong>: build → show 3 users → watch them struggle → fix one friction → repeat. Notes beat opinions; screen recordings beat “I love it.”</p>
<p>Track one metric that matters for v1 (activation, return day-2, task completion) — not vanity downloads. Version bump + changelog every meaningful ship (Cap family habit).</p>`,
      ur: `<p><strong>Haftay ka loop</strong> ship karo: build → 3 users ko dikhao → struggle dekho → ek friction fix → repeat. Notes opinions se behtar; screen recording “I love it” se behtar.</p>
<p>v1 ke liye ek metric (activation, day-2 return, task complete) — vanity downloads nahi. Har meaningful ship pe version + changelog (Cap family habit).</p>`,
    },
    quiz: [
      { q: { en: 'Best feedback is:', ur: 'Best feedback:' },
        opts: { en: ['Watching users struggle live', 'Friends saying “cool”', 'Your own assumptions'], ur: ['Users struggle live', 'Dost “cool”', 'Apni assumptions'] },
        correct: 0, explain: { en: 'Behavior reveals truth.', ur: 'Behavior sach dikhati.' } },
      { q: { en: 'Weekly loop fixes:', ur: 'Weekly loop:' },
        opts: { en: ['One friction at a time', 'Everything at once', 'Nothing — ship once'], ur: ['Ek friction ek waqt', 'Sab ek saath', 'Kuch nahi — ek dafa ship'] },
        correct: 0, explain: { en: 'Small fixes compound.', ur: 'Chhote fix compound.' } },
      { q: { en: 'v1 metric should be:', ur: 'v1 metric:' },
        opts: { en: ['Task completion or return', 'Twitter likes only', 'Lines of code'], ur: ['Task complete ya return', 'Sirf Twitter likes', 'Lines of code'] },
        correct: 0, explain: { en: 'Outcomes over output.', ur: 'Outcomes output se upar.' } },
    ],
  },
  {
    id: 4,
    title: { en: 'Research → MVP Handoff', ur: 'Research → MVP Handoff' },
    body: {
      en: `<p>Close this track with artifacts: problem brief, MVP scope list (in/out), user test notes, and v1 metric definition. Next track covers launch discipline — shipping without lying in marketing.</p>
<p>No fake AI claims: if rules-based, call it a smart assistant. Capricorn brain rule — honesty is a moat for small teams.</p>`,
      ur: `<p>Track band artifacts se: problem brief, MVP in/out list, user test notes, v1 metric. Agla track launch discipline — marketing mein jhoot ke baghair ship.</p>
<p>Fake AI claims nahi: agar rules-based ho to smart assistant kaho. Capricorn rule — chhoti team ke liye honesty moat hai.</p>`,
    },
    quiz: [
      { q: { en: 'Handoff artifacts include:', ur: 'Handoff artifacts:' },
        opts: { en: ['Brief, scope, tests, metric', 'Only Figma', 'Only domain name'], ur: ['Brief, scope, tests, metric', 'Sirf Figma', 'Sirf domain'] },
        correct: 0, explain: { en: 'Decisions must be portable.', ur: 'Decisions portable honi chahiye.' } },
      { q: { en: 'Rules-based logic should be called:', ur: 'Rules-based logic:' },
        opts: { en: ['Smart assistant — not fake AI', 'Magic AI', 'Quantum engine'], ur: ['Smart assistant — fake AI nahi', 'Magic AI', 'Quantum engine'] },
        correct: 0, explain: { en: 'Marketing honesty protects reputation.', ur: 'Marketing honesty reputation bachati.' } },
      { q: { en: 'Next track focuses on:', ur: 'Agla track:' },
        opts: { en: ['Launch discipline', 'More research forever', 'Hiring 50 people'], ur: ['Launch discipline', 'Hamesha research', '50 log hire'] },
        correct: 0, explain: { en: 'Shipping is the other half.', ur: 'Shipping doosra half hai.' } },
    ],
  },
];

export const PB_RESEARCH_PLACEMENT = [
  { topic: 1, q: { en: 'Start with:', ur: 'Shuru:' }, opts: { en: ['Problem validation', 'Logo', 'Ads'], ur: ['Problem validate', 'Logo', 'Ads'] }, correct: 0 },
  { topic: 2, q: { en: 'MVP proves:', ur: 'MVP:' }, opts: { en: ['One core loop', 'All features', 'SSO'], ur: ['Ek loop', 'Sab features', 'SSO'] }, correct: 0 },
];

export const PB_LAUNCH_WEEKS = [
  {
    id: 1,
    title: { en: 'Launch Checklist', ur: 'Launch Checklist' },
    body: {
      en: `<p>Launch is a <strong>checklist, not a feeling</strong>: version sync (VERSION, APP_VERSION, SW cache), offline test, empty-state copy, error messages, changelog, and one screenshot path that matches reality.</p>
<p>Cap PWAs: bump service worker cache every asset change; stale SW is the #1 “it works on my machine” bug for friends installing from GitHub Pages.</p>`,
      ur: `<p>Launch <strong>checklist hai, feeling nahi</strong>: version sync (VERSION, APP_VERSION, SW cache), offline test, empty states, errors, changelog, ek screenshot jo haqeeqat se match kare.</p>
<p>Cap PWAs: har asset change pe SW cache bump; stale SW GitHub Pages friends ke liye #1 “meri machine pe chalta” bug hai.</p>`,
    },
    quiz: [
      { q: { en: 'Every meaningful ship needs:', ur: 'Har meaningful ship:' },
        opts: { en: ['VERSION + SW cache bump', 'Only git push', 'Silent deploy'], ur: ['VERSION + SW bump', 'Sirf git push', 'Silent deploy'] },
        correct: 0, explain: { en: 'Friends on old caches see ghosts.', ur: 'Purane cache pe dost ghost dekhte.' } },
      { q: { en: 'Screenshots should:', ur: 'Screenshots:' },
        opts: { en: ['Match current UI honestly', 'Show fake AI', 'Promise income'], ur: ['Current UI imandar', 'Fake AI', 'Income promise'] },
        correct: 0, explain: { en: 'Trust dies on first open mismatch.', ur: 'Pehli open mismatch pe trust mar jati.' } },
      { q: { en: 'Offline test catches:', ur: 'Offline test:' },
        opts: { en: ['SW and asset gaps', 'Server latency only', 'Nothing useful'], ur: ['SW aur asset gaps', 'Sirf latency', 'Kuch nahi'] },
        correct: 0, explain: { en: 'PWAs promise offline — prove it.', ur: 'PWA offline promise — prove karo.' } },
    ],
  },
  {
    id: 2,
    title: { en: 'Honest Marketing', ur: 'Imandar Marketing' },
    body: {
      en: `<p>Write what the product <strong>does today</strong>, not your roadmap fantasy. List limitations beside benefits (offline-only, no accounts, self-issued certs, etc.).</p>
<p>Cap family tone: school/workbench, not get-rich. One honest tagline beats ten superlatives.</p>`,
      ur: `<p>Likho product <strong>aaj kya karta</strong>, roadmap fantasy nahi. Faidon ke sath limitations (offline-only, no accounts, self certs, waghera).</p>
<p>Cap tone: school/workbench, get-rich nahi. Ek imandar tagline das superlative se behtar.</p>`,
    },
    quiz: [
      { q: { en: 'Marketing should describe:', ur: 'Marketing describe:' },
        opts: { en: ['Current behavior + limits', 'Future AI sentience', 'Guaranteed outcomes'], ur: ['Current + limits', 'Future AI', 'Guaranteed outcomes'] },
        correct: 0, explain: { en: 'Under-promise, over-deliver.', ur: 'Kam promise, zyada deliver.' } },
      { q: { en: 'Get-rich framing is:', ur: 'Get-rich framing:' },
        opts: { en: ['Rejected in Cap products', 'Required', 'Only for ads'], ur: ['Cap mein reject', 'Zaroori', 'Sirf ads'] },
        correct: 0, explain: { en: 'Process products age better.', ur: 'Process products behtar age karte.' } },
      { q: { en: 'Honest taglines are:', ur: 'Imandar taglines:' },
        opts: { en: ['Specific and verifiable', 'Vague hype', 'Secret sauce only'], ur: ['Specific verifiable', 'Vague hype', 'Secret sauce'] },
        correct: 0, explain: { en: 'Specificity signals craft.', ur: 'Specificity craft dikhati.' } },
    ],
  },
  {
    id: 3,
    title: { en: 'Post-Launch Loop', ur: 'Post-Launch Loop' },
    body: {
      en: `<p>After launch: watch three real sessions, file one bug, ship one fix, update CHANGELOG. Momentum beats perfection — but never ship broken core loops.</p>
<p>Rollback plan: git tag last good, SW cache name documents version, keep additive storage migrations only. You will need this at 2am.</p>`,
      ur: `<p>Launch ke baad: teen real sessions dekho, ek bug file, ek fix ship, CHANGELOG update. Momentum perfection se behtar — magar broken core loop mat ship karo.</p>
<p>Rollback: git tag last good, SW cache version batata, sirf additive storage migrations. 2am pe chahiye hoga.</p>`,
    },
    quiz: [
      { q: { en: 'Post-launch rhythm is:', ur: 'Post-launch rhythm:' },
        opts: { en: ['Observe → fix → document', 'Ignore users', 'Rewrite everything'], ur: ['Observe fix document', 'Users ignore', 'Sab rewrite'] },
        correct: 0, explain: { en: 'Tight loops beat big rewrites.', ur: 'Tight loops bade rewrite se behtar.' } },
      { q: { en: 'Rollback needs:', ur: 'Rollback:' },
        opts: { en: ['Tagged good release + SW id', 'Hope', 'Delete git history'], ur: ['Tagged release + SW id', 'Umeed', 'Git history delete'] },
        correct: 0, explain: { en: 'Named caches make recovery fast.', ur: 'Named cache recovery tez.' } },
      { q: { en: 'Never ship:', ur: 'Kabhi mat ship:' },
        opts: { en: ['Broken core loop', 'Small copy fix', 'Patch release'], ur: ['Broken core loop', 'Chhota copy fix', 'Patch'] },
        correct: 0, explain: { en: 'First impression is the product.', ur: 'Pehli impression product hai.' } },
    ],
  },
];

export const PB_LAUNCH_PLACEMENT = [
  { topic: 1, q: { en: 'Launch requires:', ur: 'Launch ke liye kya chahiye:' }, opts: { en: ['Version + SW sync', 'Hope only', 'No changelog'], ur: ['Version + SW sync', 'Sirf umeed', 'No changelog'] }, correct: 0 },
  { topic: 2, q: { en: 'Marketing shows:', ur: 'Marketing:' }, opts: { en: ['Today + limits', 'Roadmap fantasy', 'Income promise'], ur: ['Aaj + limits', 'Fantasy', 'Income promise'] }, correct: 0 },
];
