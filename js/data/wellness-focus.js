/* wellness-focus.js — Sleep, focus, burnout tracks (bilingual). */

export const WELLNESS_SLEEP_WEEKS = [
  {
    id: 1,
    title: { en: 'Sleep as Performance', ur: 'Sleep Performance Hai' },
    body: {
      en: `<p>Sleep is not laziness — it is <strong>memory consolidation and emotional regulation</strong>. Cutting sleep to “grind” trades or study usually borrows focus from tomorrow at high interest.</p>
<p>Baseline: consistent wake time (even weekends ±30m), dark cool room, screens dim 60 minutes before bed, caffeine cutoff ~8 hours before sleep.</p>`,
      ur: `<p>Neend sust nahi — <strong>memory consolidation aur emotional regulation</strong> hai. “Grind” ke liye neend kaatna kal se focus udhaar leta high interest pe.</p>
<p>Baseline: consistent wake time (weekend ±30m), andhera thanda kamra, sone se 60 min pe screen dim, caffeine ~8 ghante pehle band.</p>`,
    },
    quiz: [
      { q: { en: 'Sleep mainly supports:', ur: 'Sleep mainly:' },
        opts: { en: ['Memory and regulation', 'Only laziness', 'Guaranteed profits'], ur: ['Memory aur regulation', 'Sirf susti', 'Guaranteed profit'] },
        correct: 0, explain: { en: 'Tired brains confuse noise for signal.', ur: 'Thaki dimagh noise ko signal samajhti.' } },
      { q: { en: 'Most important sleep habit:', ur: 'Sab se important sleep habit:' },
        opts: { en: ['Consistent wake time', 'Random schedule', 'Midnight caffeine'], ur: ['Consistent wake time', 'Random schedule', 'Midnight caffeine'] },
        correct: 0, explain: { en: 'Anchor wake time stabilizes circadian rhythm.', ur: 'Wake time anchor rhythm stable karta.' } },
      { q: { en: 'Screens before bed should be:', ur: 'Sone se pehle screens:' },
        opts: { en: ['Reduced ~60 minutes prior', 'Max brightness', 'Required for sleep'], ur: ['~60 min pehle kam', 'Max brightness', 'Neend ke liye zaroori'] },
        correct: 0, explain: { en: 'Light delays melatonin.', ur: 'Light melatonin delay.' } },
    ],
  },
  {
    id: 2,
    title: { en: 'Wind-Down Ritual', ur: 'Wind-Down Ritual' },
    body: {
      en: `<p>Build a 20-minute wind-down: same order nightly (stretch, journal one line, read paper, lights down). Pair it with <strong>worry capture</strong> — write tomorrow’s top three on paper so your brain stops rehearsing them in bed.</p>
<p>Market stress: no chart checks in bed. If anxiety spikes, get up briefly, dim light, write the thought, return — do not scroll.</p>`,
      ur: `<p>20-minute wind-down: har raat same order (stretch, ek line journal, paper parhna, lights down). <strong>Worry capture</strong> — kal ke top teen paper pe likho taake dimagh bistar mein rehearse na kare.</p>
<p>Market stress: bistar mein chart nahi. Anxiety spike ho to utho, dim light, thought likho, wapas — scroll nahi.</p>`,
    },
    quiz: [
      { q: { en: 'Worry capture means:', ur: 'Worry capture:' },
        opts: { en: ['Write tasks to offload brain', 'Ignore all problems', 'Trade in bed'], ur: ['Tasks likh ke dimagh halka', 'Sab ignore', 'Bistar mein trade'] },
        correct: 0, explain: { en: 'Externalizing reduces rumination.', ur: 'Bahar likhna rumination kam.' } },
      { q: { en: 'In bed you should avoid:', ur: 'Bistar mein avoid:' },
        opts: { en: ['Chart scrolling', 'Consistent ritual', 'Dim lights'], ur: ['Chart scroll', 'Consistent ritual', 'Dim lights'] },
        correct: 0, explain: { en: 'Bed becomes alert cue if you trade there.', ur: 'Wahan trade karo to bistar alert cue ban jata.' } },
      { q: { en: 'Wind-down length starter:', ur: 'Wind-down starter:' },
        opts: { en: ['~20 minutes same order', '0 minutes — crash', '2 hours phone'], ur: ['~20 min same order', '0 — crash', '2 ghante phone'] },
        correct: 0, explain: { en: 'Ritual trains sleep onset.', ur: 'Ritual sleep onset sikhata.' } },
    ],
  },
  {
    id: 3,
    title: { en: 'Recovery & Naps', ur: 'Recovery aur Naps' },
    body: {
      en: `<p>Short naps (15–25 min) can restore alertness; long naps after 3pm steal night sleep. If you are chronically short, fix nights first — naps are patch, not strategy.</p>
<p>Recovery days after brutal weeks: walk, sunlight, protein, early bed. Discipline includes rest — especially if you journal emotional trades.</p>`,
      ur: `<p>Chhota nap (15–25 min) alertness de sakta; 3pm ke baad lamba nap raat chura leta. Chronic short ho to pehle raat theek — nap patch hai, strategy nahi.</p>
<p>Brutal hafte ke baad recovery: walk, sunlight, protein, jaldi bistar. Discipline mein rest bhi — khas tor emotional trades journal karte ho to.</p>`,
    },
    quiz: [
      { q: { en: 'Best nap length is often:', ur: 'Best nap:' },
        opts: { en: ['15–25 minutes', '2 hours daily', 'Never sleep'], ur: ['15–25 min', 'Roz 2 ghante', 'Kabhi na so'] },
        correct: 0, explain: { en: 'Short naps avoid sleep inertia.', ur: 'Chhota nap inertia avoid.' } },
      { q: { en: 'Chronic sleep debt fix:', ur: 'Chronic sleep debt:' },
        opts: { en: ['Prioritize night sleep', 'More caffeine forever', 'Ignore it'], ur: ['Raat pehle', 'Hamesha zyada caffeine', 'Ignore'] },
        correct: 0, explain: { en: 'You cannot nap out of debt long-term.', ur: 'Lambe arse nap se debt nahi utarta.' } },
      { q: { en: 'Recovery days include:', ur: 'Recovery days:' },
        opts: { en: ['Light, walk, early bed', 'All-nighter catch-up', 'Max leverage trading'], ur: ['Light, walk, jaldi bed', 'All-nighter', 'Max leverage'] },
        correct: 0, explain: { en: 'Rest is part of performance stack.', ur: 'Rest performance stack ka hissa.' } },
    ],
  },
];

export const WELLNESS_SLEEP_PLACEMENT = [
  { topic: 1, q: { en: 'Sleep supports:', ur: 'Sleep:' }, opts: { en: ['Memory + regulation', 'Laziness only', 'Tips'], ur: ['Memory + regulation', 'Susti', 'Tips'] }, correct: 0 },
  { topic: 2, q: { en: 'In bed avoid:', ur: 'Bistar mein avoid:' }, opts: { en: ['Chart scrolling', 'Ritual', 'Dim light'], ur: ['Chart scroll', 'Ritual', 'Dim light'] }, correct: 0 },
];

export const WELLNESS_ATTENTION_WEEKS = [
  {
    id: 1,
    title: { en: 'Attention Budget', ur: 'Attention Budget' },
    body: {
      en: `<p>Attention is finite — treat it like money. <strong>Deep work</strong> needs 45–90 minute blocks without context switches. Multitasking feels productive but increases errors (dangerous for trading and coding).</p>
<p>Batch shallow work (email, messages) into two windows daily. Keep one capture inbox for random thoughts so they do not hijack focus mid-lesson.</p>`,
      ur: `<p>Attention finite — paise jaisa treat. <strong>Deep work</strong> ko 45–90 min blocks chahiye bina context switch. Multitasking productive lagti magar errors badhati (trade aur code ke liye khatarnak).</p>
<p>Shallow work (email, messages) do windows mein batch. Random thoughts ke liye ek capture inbox taake lesson beech hijack na hon.</p>`,
    },
    quiz: [
      { q: { en: 'Deep work needs:', ur: 'Deep work:' },
        opts: { en: ['Long unbroken blocks', 'Constant notifications', 'Five apps at once'], ur: ['Lambe unbroken blocks', 'Constant notifications', 'Paanch apps'] },
        correct: 0, explain: { en: 'Context switches tax cognition.', ur: 'Context switch cognition pe tax.' } },
      { q: { en: 'Shallow work should be:', ur: 'Shallow work:' },
        opts: { en: ['Batched in windows', 'Always interrupting deep work', 'Ignored forever'], ur: ['Windows mein batch', 'Hamesha deep interrupt', 'Hamesha ignore'] },
        correct: 0, explain: { en: 'Batching reduces switch cost.', ur: 'Batching switch cost kam.' } },
      { q: { en: 'Capture inbox prevents:', ur: 'Capture inbox:' },
        opts: { en: ['Mid-task thought hijacks', 'All planning', 'Sleep'], ur: ['Mid-task hijack', 'Sab planning', 'Neend'] },
        correct: 0, explain: { en: 'Park it now, process later.', ur: 'Ab park, baad process.' } },
    ],
  },
  {
    id: 2,
    title: { en: 'Digital Hygiene', ur: 'Digital Hygiene' },
    body: {
      en: `<p>Notifications are other people’s priorities on your lock screen. Turn off non-human alerts; keep only calendar and true urgent channels.</p>
<p>Grayscale phone, app limits on social, home screen only tools not feeds. Same for trading: price alerts yes, constant ticker no.</p>`,
      ur: `<p>Notifications doosron ki priority tumhari lock screen pe. Non-human alerts band; sirf calendar aur sach urgent channels.</p>
<p>Grayscale phone, social limits, home screen pe sirf tools feeds nahi. Trading mein bhi: price alerts haan, constant ticker nahi.</p>`,
    },
    quiz: [
      { q: { en: 'Most notifications are:', ur: 'Zyada notifications:' },
        opts: { en: ['Others’ priorities', 'Always urgent', 'Required for focus'], ur: ['Doosron ki priority', 'Hamesha urgent', 'Focus ke liye zaroori'] },
        correct: 0, explain: { en: 'Default on benefits apps, not you.', ur: 'Default on apps ko faida, tumhe nahi.' } },
      { q: { en: 'Trading hygiene prefers:', ur: 'Trading hygiene:' },
        opts: { en: ['Alerts over constant ticker', 'Chart every minute', 'Tips group always on'], ur: ['Alerts over ticker', 'Har minute chart', 'Tips group on'] },
        correct: 0, explain: { en: 'Noise triggers emotional trades.', ur: 'Noise emotional trades trigger.' } },
      { q: { en: 'Home screen should emphasize:', ur: 'Home screen:' },
        opts: { en: ['Tools not feeds', 'Infinite scroll', 'Random games'], ur: ['Tools feeds nahi', 'Infinite scroll', 'Random games'] },
        correct: 0, explain: { en: 'Environment shapes defaults.', ur: 'Environment defaults banati.' } },
    ],
  },
  {
    id: 3,
    title: { en: 'Burnout Signals', ur: 'Burnout Signals' },
    body: {
      en: `<p>Burnout whispers before it shouts: cynicism, dread before work, smaller errors, irritability, needing stimulants to baseline. In trading: revenge clicks, skipping journal, widening stops “just this once.”</p>
<p>Response ladder: one rest day, cut session length setting, talk to one trusted person, reduce leverage/size — not “push harder.”</p>`,
      ur: `<p>Burnout chillane se pehle fusfusata: cynicism, kaam se pehle dread, chhoti errors, chidchida pan, baseline ke liye stimulants. Trading mein: revenge clicks, journal skip, stop widen “sirf ek dafa.”</p>
<p>Response ladder: ek rest day, session length kam, ek trusted insaan se baat, leverage/size kam — “aur zor” nahi.</p>`,
    },
    quiz: [
      { q: { en: 'Early burnout includes:', ur: 'Early burnout:' },
        opts: { en: ['Cynicism and dread', 'More energy forever', 'Perfect discipline'], ur: ['Cynicism aur dread', 'Hamesha zyada energy', 'Perfect discipline'] },
        correct: 0, explain: { en: 'Emotional signals precede collapse.', ur: 'Emotional signals collapse se pehle.' } },
      { q: { en: 'Trading burnout sign:', ur: 'Trading burnout sign:' },
        opts: { en: ['Revenge clicks / skipped journal', 'Following every rule', 'Paper only'], ur: ['Revenge clicks / journal skip', 'Har rule follow', 'Sirf paper'] },
        correct: 0, explain: { en: 'Process breaks before P/L does.', ur: 'P/L se pehle process toot ta.' } },
      { q: { en: 'Healthy response is:', ur: 'Healthy response:' },
        opts: { en: ['Rest and reduce load', 'Double leverage', 'Hide losses'], ur: ['Rest aur load kam', 'Leverage double', 'Losses chhupao'] },
        correct: 0, explain: { en: 'Recovery restores edge.', ur: 'Recovery edge wapas lati.' } },
    ],
  },
  {
    id: 4,
    title: { en: 'Focus Under Market Stress', ur: 'Market Stress Mein Focus' },
    body: {
      en: `<p>Volatile days hijack attention. Pre-commit rules: max sessions per day, mandatory break after loss, no trades outside written plan. Pair with wellness: sleep non-negotiable before big risk days.</p>
<p>This track complements Trading Literacy — it does not replace risk rules. A rested trader with a stop beats a tired genius without one.</p>`,
      ur: `<p>Volatile din attention hijack. Pre-commit rules: din mein max sessions, loss ke baad break, likhi plan ke bahar trade nahi. Wellness pair: bade risk din se pehle neend non-negotiable.</p>
<p>Ye track Trading Literacy complement — risk rules replace nahi. Stop wala rested trader bina stop thake genius se behtar.</p>`,
    },
    quiz: [
      { q: { en: 'Volatile days need:', ur: 'Volatile din:' },
        opts: { en: ['Pre-committed session limits', 'More screen time', 'Tip groups'], ur: ['Pre-committed limits', 'Zyada screen', 'Tip groups'] },
        correct: 0, explain: { en: 'Rules protect when emotion spikes.', ur: 'Rules jazbaat spike pe bachati.' } },
      { q: { en: 'Before big risk days prioritize:', ur: 'Bade risk se pehle:' },
        opts: { en: ['Sleep', 'Caffeine stacking', 'All-nighter research'], ur: ['Neend', 'Caffeine stack', 'All-nighter research'] },
        correct: 0, explain: { en: 'Fatigue magnifies tilt.', ur: 'Thakan tilt barhati.' } },
      { q: { en: 'This family vs trading tracks:', ur: 'Ye family vs trading:' },
        opts: { en: ['Complements — does not replace stops', 'Replaces all risk rules', 'Promises calm markets'], ur: ['Complement — stops replace nahi', 'Sab risk replace', 'Calm markets promise'] },
        correct: 0, explain: { en: 'Human performance layer on top of process.', ur: 'Process ke upar human performance layer.' } },
    ],
  },
];

export const WELLNESS_ATTENTION_PLACEMENT = [
  { topic: 1, q: { en: 'Deep work needs:', ur: 'Deep work:' }, opts: { en: ['Unbroken blocks', 'Constant pings', 'Multitask max'], ur: ['Unbroken blocks', 'Constant pings', 'Max multitask'] }, correct: 0 },
  { topic: 3, q: { en: 'Burnout response:', ur: 'Burnout response:' }, opts: { en: ['Rest + reduce load', 'Double leverage', 'Ignore'], ur: ['Rest + load kam', 'Leverage double', 'Ignore'] }, correct: 0 },
];
