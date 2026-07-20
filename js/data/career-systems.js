/* career-systems.js — Interview + remote work tracks (bilingual). */

export const CAREER_INTERVIEW_WEEKS = [
  {
    id: 1,
    title: { en: 'Interview Is a System', ur: 'Interview Ek System Hai' },
    body: {
      en: `<p>Interviews are not lottery tickets — they are <strong>repeatable systems</strong>: research → stories → practice → debrief. Luck exists at the margin; preparation moves the median.</p>
<p>Before any call: read the role’s outcomes (not buzzwords), map 3 stories from your real work (problem, action, result), and prepare 5 sharp questions that show you think like an owner.</p>
<p>{{redflag:Memorizing generic “tell me about yourself” scripts without tailoring to the company reads as unprepared in the first 90 seconds.}}</p>`,
      ur: `<p>Interviews lottery nahi — <strong>repeatable systems</strong>: research → stories → practice → debrief. Qismat margin pe; tayyari median hilati hai.</p>
<p>Call se pehle: role ke outcomes parho (buzzwords nahi), 3 asli kaam ki stories map karo (problem, action, result), 5 tez sawal jo owner jaisa socho dikhayein.</p>
<p>{{redflag:Generic “tell me about yourself” ratta company ke baghair — pehle 90 sec mein unprepared lagta hai.}}</p>`,
    },
    quiz: [
      { q: { en: 'Best pre-interview prep focuses on:', ur: 'Best prep focus:' },
        opts: { en: ['Role outcomes + your proof stories', 'Only salary negotiation', 'Random brain-teasers only'], ur: ['Role outcomes + proof stories', 'Sirf salary', 'Sirf brain-teasers'] },
        correct: 0, explain: { en: 'They hire for impact, not trivia.', ur: 'Impact ke liye hire, trivia ke liye nahi.' } },
      { q: { en: 'STAR stories need:', ur: 'STAR stories:' },
        opts: { en: ['Situation, task, action, result', 'Only compliments', 'Buzzword soup'], ur: ['Situation, task, action, result', 'Sirf tareef', 'Buzzword soup'] },
        correct: 0, explain: { en: 'Structure keeps answers concise and credible.', ur: 'Structure jawab concise aur credible rakhti.' } },
      { q: { en: 'Your questions to them should:', ur: 'Tumhare sawal un se:' },
        opts: { en: ['Show you researched the role', 'Be “when do I get promoted?” only', 'Be empty to save time'], ur: ['Research dikhaye', 'Sirf “promotion kab?”', 'Khali time bachane'] },
        correct: 0, explain: { en: 'Good questions signal senior thinking.', ur: 'Achhe sawal senior thinking dikhate.' } },
    ],
  },
  {
    id: 2,
    title: { en: 'Behavioral & Technical Rounds', ur: 'Behavioral aur Technical Rounds' },
    body: {
      en: `<p>Behavioral rounds test <strong>judgment under ambiguity</strong>. Use one story per theme: conflict, failure, leadership, learning speed. Never trash a former employer — describe the constraint and your choice.</p>
<p>Technical rounds (even non-coding roles) test how you break problems: clarify inputs, state assumptions, propose a simple v1, mention trade-offs. Saying “I don’t know, but here is how I would find out” beats bluffing.</p>`,
      ur: `<p>Behavioral rounds <strong>ambiguity mein judgment</strong> test karte. Har theme pe ek story: conflict, failure, leadership, learning speed. Purane employer ko gaali mat — constraint aur apna choice batao.</p>
<p>Technical rounds (non-coding bhi) problem todne ka test: inputs clear karo, assumptions bolo, simple v1, trade-offs. “Nahi pata, lekin aise dhundhun ga” jhoot se behtar.</p>`,
    },
    quiz: [
      { q: { en: 'When you lack an answer you should:', ur: 'Jawab na ho to:' },
        opts: { en: ['Explain how you would learn', 'Bluff confidently', 'Stay silent'], ur: ['Seekhne ka tareeqa batao', 'Confident jhoot', 'Chup'] },
        correct: 0, explain: { en: 'Learning speed is a hire signal.', ur: 'Learning speed hire signal hai.' } },
      { q: { en: 'Trash-talking a past employer:', ur: 'Purane employer ki buraai:' },
        opts: { en: ['Hurts you — shows immaturity', 'Always impresses', 'Required honesty'], ur: ['Tumhe nuqsan — immaturity', 'Hamesha impress', 'Zaroori honesty'] },
        correct: 0, explain: { en: 'They assume you will talk about them the same way.', ur: 'Wo assume karenge tum un ki bhi aise baat karoge.' } },
      { q: { en: 'Technical answers should include:', ur: 'Technical jawab mein:' },
        opts: { en: ['Assumptions and trade-offs', 'Only the final magic number', 'Jargon without structure'], ur: ['Assumptions aur trade-offs', 'Sirf magic number', 'Structure ke baghair jargon'] },
        correct: 0, explain: { en: 'Process visibility beats lucky guesses.', ur: 'Process visibility lucky guess se behtar.' } },
    ],
  },
  {
    id: 3,
    title: { en: 'Take-Home & Live Exercises', ur: 'Take-Home aur Live Exercises' },
    body: {
      en: `<p>Take-homes filter for <strong>communication + scope control</strong>. Clarify time box (2–4 hours honest work), deliver a short README of decisions, and show one improvement you would make with more time — not a 40-hour unpaid product.</p>
<p>Live exercises: think aloud, write pseudocode or outline first, test edge cases verbally. They grade how you work with others under time, not perfection.</p>`,
      ur: `<p>Take-homes <strong>communication + scope control</strong> filter karte. Time box clear (2–4 ghante imandar kaam), chhota README decisions ka, ek improvement jo zyada time pe karoge — 40 ghante ka unpaid product nahi.</p>
<p>Live exercises: sochte hue bolo, pehle pseudocode/outline, edge cases zuban se. Wo grade karte kaise time mein team ke sath kaam — perfection nahi.</p>`,
    },
    quiz: [
      { q: { en: 'Unpaid take-homes should be:', ur: 'Unpaid take-home:' },
        opts: { en: ['Time-boxed with clear scope', 'Unlimited free labor', 'Skipped always without ask'], ur: ['Time-boxed clear scope', 'Unlimited free labor', 'Bina pooche hamesha skip'] },
        correct: 0, explain: { en: 'Boundaries signal professional maturity.', ur: 'Boundaries professional maturity dikhati.' } },
      { q: { en: 'Live coding tests mainly measure:', ur: 'Live coding mainly:' },
        opts: { en: ['Thinking process under time', 'Memorized syntax only', 'Typing speed alone'], ur: ['Time mein thinking process', 'Sirf syntax ratta', 'Sirf typing speed'] },
        correct: 0, explain: { en: 'Collaboration beats silent genius myth.', ur: 'Collaboration silent genius myth se behtar.' } },
      { q: { en: 'A good take-home README explains:', ur: 'Achha take-home README:' },
        opts: { en: ['Decisions and trade-offs', 'Only “please hire me”', 'Nothing — code speaks'], ur: ['Decisions aur trade-offs', 'Sirf “hire karo”', 'Kuch nahi'] },
        correct: 0, explain: { en: 'Judgment is visible in how you chose.', ur: 'Judgment choice mein dikhti hai.' } },
    ],
  },
  {
    id: 4,
    title: { en: 'Offers & Negotiation Basics', ur: 'Offers aur Negotiation Basics' },
    body: {
      en: `<p>An offer is a package: base, bonus, equity (if any), title, start date, remote policy, learning budget. Compare <strong>total comp over 12 months</strong>, not headline base alone.</p>
<p>Negotiate with data and gratitude: “Based on scope X and market Y, I was hoping for Z — is there flexibility?” Never ultimatum on day one unless you will walk. Get material terms in writing before resigning.</p>
<p>This track does not promise a job — it promises fewer unforced errors in a process everyone repeats.</p>`,
      ur: `<p>Offer package hai: base, bonus, equity (agar ho), title, start, remote policy, learning budget. <strong>12 mahine total comp</strong> compare karo, sirf headline base nahi.</p>
<p>Data aur shukriya se negotiate: “Scope X aur market Y ke hisaab se Z umeed thi — flexibility?” Pehle din ultimatum tab jab walk karoge. Resign se pehle material terms likhit lo.</p>
<p>Ye track job promise nahi — process mein kam unforced errors promise karta hai.</p>`,
    },
    quiz: [
      { q: { en: 'Compare offers using:', ur: 'Offers compare:' },
        opts: { en: ['12-month total package', 'Base salary line only', 'Office snack quality'], ur: ['12 mahine total package', 'Sirf base line', 'Office snacks'] },
        correct: 0, explain: { en: 'Bonus, equity, and benefits shift real value.', ur: 'Bonus, equity, benefits asli value badalte.' } },
      { q: { en: 'Professional negotiation sounds like:', ur: 'Professional negotiation:' },
        opts: { en: ['Data + flexibility ask', 'Threats on day one', 'Silence then ghost'], ur: ['Data + flexibility', 'Pehle din dhamki', 'Chup phir ghost'] },
        correct: 0, explain: { en: 'Relationships survive polite asks.', ur: 'Polite ask se rishta bachta.' } },
      { q: { en: 'Before resigning you need:', ur: 'Resign se pehle:' },
        opts: { en: ['Written offer terms', 'Verbal handshake only', 'Social media announcement'], ur: ['Likhit offer terms', 'Sirf verbal', 'Social media'] },
        correct: 0, explain: { en: 'Paper protects both sides.', ur: 'Paper dono ko bachata.' } },
    ],
  },
];

export const CAREER_INTERVIEW_PLACEMENT = [
  { topic: 1, q: { en: 'Interview prep is a:', ur: 'Interview prep:' }, opts: { en: ['Repeatable system', 'Pure lottery', 'One-night cram'], ur: ['Repeatable system', 'Pure lottery', 'One-night cram'] }, correct: 0 },
  { topic: 2, q: { en: 'Unknown answer →', ur: 'Unknown answer:' }, opts: { en: ['Explain learning path', 'Bluff', 'Silence'], ur: ['Learning path', 'Bluff', 'Chup'] }, correct: 0 },
  { topic: 3, q: { en: 'Take-homes need:', ur: 'Take-homes:' }, opts: { en: ['Time box + README', 'Unlimited hours', 'No documentation'], ur: ['Time box + README', 'Unlimited hours', 'No docs'] }, correct: 0 },
];

export const CAREER_REMOTE_WEEKS = [
  {
    id: 1,
    title: { en: 'Remote Work Contract', ur: 'Remote Work Contract' },
    body: {
      en: `<p>Remote work succeeds on an invisible contract: <strong>async clarity + predictable delivery</strong>. Your manager cannot see effort — they see artifacts, updates, and reliability.</p>
<p>Define: core overlap hours, response SLA (e.g. 4h on workdays), where decisions live (doc/thread), and what “done” looks like before you start.</p>`,
      ur: `<p>Remote invisible contract pe chalta: <strong>async clarity + predictable delivery</strong>. Manager effort nahi dekhta — artifacts, updates, reliability dekhta hai.</p>
<p>Define karo: core overlap hours, response SLA (maslan 4h workdays), decisions kahan (doc/thread), aur “done” kya hai shuru se pehle.</p>`,
    },
    quiz: [
      { q: { en: 'Remote managers mainly judge:', ur: 'Remote manager judge:' },
        opts: { en: ['Outputs and reliability', 'Hours at desk', 'Camera always on'], ur: ['Output aur reliability', 'Desk hours', 'Camera hamesha on'] },
        correct: 0, explain: { en: 'Visibility is earned through communication.', ur: 'Communication se visibility milti.' } },
      { q: { en: 'Overlap hours exist to:', ur: 'Overlap hours:' },
        opts: { en: ['Sync on blockers quickly', 'Replace all async work', 'Monitor keystrokes'], ur: ['Blockers jaldi sync', 'Sab async replace', 'Keystroke monitor'] },
        correct: 0, explain: { en: 'Real-time is expensive — use it surgically.', ur: 'Real-time mehnga — surgical use.' } },
      { q: { en: 'Before starting remote work define:', ur: 'Remote shuru se pehle:' },
        opts: { en: ['What “done” means', 'Only your wallpaper', 'Nothing — wing it'], ur: ['“Done” kya hai', 'Sirf wallpaper', 'Kuch nahi — wing it'] },
        correct: 0, explain: { en: 'Ambiguous done creates rework loops.', ur: 'Ambiguous done rework loop banata.' } },
    ],
  },
  {
    id: 2,
    title: { en: 'Async Communication', ur: 'Async Communication' },
    body: {
      en: `<p>Write messages that respect time zones: <strong>context → ask → deadline → default</strong>. “Thoughts?” is not a message. “Need approval on A vs B by Thursday; defaulting to A” is.</p>
<p>Record decisions in one canonical doc. Chat is for discovery; docs are for memory. Your future self is a teammate — leave breadcrumbs.</p>`,
      ur: `<p>Time zones ka khayal: <strong>context → ask → deadline → default</strong>. “Thoughts?” message nahi. “A vs B Thursday tak approval; default A” hai.</p>
<p>Decisions ek canonical doc mein. Chat discovery; docs memory. Future self teammate hai — breadcrumbs chhoro.</p>`,
    },
    quiz: [
      { q: { en: 'Good async message includes:', ur: 'Achha async message:' },
        opts: { en: ['Deadline and default', 'Only emoji', 'Vague “ping”'], ur: ['Deadline aur default', 'Sirf emoji', 'Vague ping'] },
        correct: 0, explain: { en: 'Defaults unblock teams when you sleep.', ur: 'Default sone pe team unblock.' } },
      { q: { en: 'Chat threads should not be:', ur: 'Chat threads na hon:' },
        opts: { en: ['The only system of record', 'Used at all', 'Searchable'], ur: ['Sirf system of record', 'Kabhi use', 'Searchable'] },
        correct: 0, explain: { en: 'Decisions die in scrollback.', ur: 'Decisions scrollback mein marti.' } },
      { q: { en: 'Canonical docs help because:', ur: 'Canonical docs:' },
        opts: { en: ['Future you and teammates find truth', 'They replace all talking', 'They hide accountability'], ur: ['Future you truth dhundhe', 'Sab baat replace', 'Accountability chhupaye'] },
        correct: 0, explain: { en: 'Memory is a team asset.', ur: 'Memory team asset hai.' } },
    ],
  },
  {
    id: 3,
    title: { en: 'Focus & Boundaries', ur: 'Focus aur Boundaries' },
    body: {
      en: `<p>Remote blur burns people: <strong>shutdown ritual</strong> (same time, same phrase, laptop closed), physical workspace if possible, and notification tiers (urgent vs batch).</p>
<p>Protect deep work blocks on calendar. Say no to “quick calls” that could be three-line updates. Career longevity beats always-on heroics.</p>`,
      ur: `<p>Remote blur logon ko jala deta: <strong>shutdown ritual</strong> (same time, same phrase, laptop band), physical workspace agar ho, notification tiers (urgent vs batch).</p>
<p>Calendar pe deep work blocks bachao. “Quick call” jo teen line update ho sakti — na. Career longevity always-on heroics se behtar.</p>`,
    },
    quiz: [
      { q: { en: 'Shutdown ritual helps:', ur: 'Shutdown ritual:' },
        opts: { en: ['Separate work from rest', 'Work 24/7', 'Hide from manager'], ur: ['Kaam aur rest alag', '24/7 kaam', 'Manager se chhupna'] },
        correct: 0, explain: { en: 'Boundaries increase sustainable output.', ur: 'Boundaries sustainable output badhati.' } },
      { q: { en: 'Deep work blocks should be:', ur: 'Deep work blocks:' },
        opts: { en: ['Calendar-protected', 'Always interrupted', 'Only at midnight'], ur: ['Calendar-protected', 'Hamesha interrupt', 'Sirf midnight'] },
        correct: 0, explain: { en: 'If it is not scheduled, it will not happen.', ur: 'Schedule na ho to hoga nahi.' } },
      { q: { en: 'Always-on availability leads to:', ur: 'Always-on:' },
        opts: { en: ['Burnout and worse output', 'Automatic promotion', 'Better health'], ur: ['Burnout aur kharab output', 'Auto promotion', 'Behtar health'] },
        correct: 0, explain: { en: 'Marathons need rest stops.', ur: 'Marathon ko rest chahiye.' } },
    ],
  },
];

export const CAREER_REMOTE_PLACEMENT = [
  { topic: 1, q: { en: 'Remote success needs:', ur: 'Remote success:' }, opts: { en: ['Async clarity', 'Keystroke monitoring', 'No documentation'], ur: ['Async clarity', 'Keystroke monitor', 'No docs'] }, correct: 0 },
  { topic: 2, q: { en: 'Async messages need:', ur: 'Async messages:' }, opts: { en: ['Deadline + default', 'Only “thoughts?”', 'Voice note only'], ur: ['Deadline + default', 'Sirf thoughts', 'Sirf voice'] }, correct: 0 },
];
