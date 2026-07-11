# MasteryCap — Cursor Prompt #2: Full Audit + Backlog v5 Execution

Paste everything below the divider into Cursor as the opening message of a new session
in this repo. Prerequisite reading order for the agent: `CURSOR-MASTER-PROMPT.md`
(all rules there still bind), `ROADMAP.md`, `CHANGELOG.md`, then this file.

---

You are continuing work on **MasteryCap**. A previous agent executed roadmap phases
P0–P8 (option shuffle, lesson figures, drills, insights, streaks/review, discipline
score, glossary, settings) and possibly P5 (chart replay). Your job has two parts, in
strict order:

**PART 1 — audit and repair everything that exists. PART 2 — execute the v5 backlog.**
Do not start Part 2 until Part 1's report is written and every FAIL is fixed.

All rules from `CURSOR-MASTER-PROMPT.md` remain binding: design system (true-black,
single flat `#FF6B2C` accent, Geist/Geist Mono, mono tabular numerics, zero emoji,
reuse existing components), bilingual EN/Roman-Urdu for every user-facing string,
offline-first (no backend, no live data, no accounts), additive-only storage changes,
crypto track content verbatim, content policy (no tips/signals/win promises), SW
`CACHE` bump + `ASSETS` update + `CHANGELOG.md` entry on every phase, verify in a real
browser at 375px before calling anything done.

════════════════════════════════════════════════════════════════
## PART 1 — FULL AUDIT

Produce `AUDIT.md` at repo root: one line per check, `PASS / FAIL / N-A`, with file:line
evidence for every FAIL, then fix all FAILs and re-run until clean. Do not trust the
previous agent's claims — verify behavior, not code presence.

### 1.1 Automated data integrity (run in browser console or node)
```js
// From the app origin, in console:
const { TRACKS } = await import('./js/data/tracks.js');
TRACKS.map(t => ({
  id: t.id,
  weeks: t.weeks.length,
  bodiesBilingual: t.weeks.every(w => w.body?.en && w.body?.ur),
  quizzesValid: t.weeks.every(w => (w.quiz||[]).every(q =>
    Number.isInteger(q.correct) && q.correct < q.opts.en.length &&
    q.opts.en.length === q.opts.ur.length && q.explain?.en && q.explain?.ur)),
  placementValid: t.placement.every(q =>
    q.correct < q.opts.en.length && t.weeks.some(w => w.id === q.topic)),
}));
```
Every field true (crypto W8 having only 2 quiz questions is accepted/verbatim).

### 1.2 Figure-marker audit
Every `{{fig:name}}` in every lesson body (all 8 data files, both languages) must
resolve to a figure implemented in `js/figures.js`; every implemented figure should be
used at least once (orphans = warning, not fail). Write a 20-line script that regexes
the data modules and diffs against the figure registry; commit it as
`scripts/audit-figs.mjs` so it's rerunnable.

### 1.3 i18n orphan finder
Script `scripts/audit-i18n.mjs`: every key referenced via `t('key')` /
`App.t('key')` in `js/**` exists in BOTH `T.en` and `T.ur`; report unused keys as
warnings. No missing key may ship.

### 1.4 Content lint
Script `scripts/audit-content.mjs`: scan lesson bodies (NOT quiz options — distractors
legitimately contain phrases like "Guaranteed price rise") for app-voiced promises:
`guaranteed profit|can't lose|risk-free profit|100% win|sure shot|pakka profit`.
Any hit in body text = FAIL for manual rewrite.

### 1.5 Shuffle correctness (the remap trap)
Automated behavioral test in console: start a quiz, read `S.quizOrder`, click the
displayed position that maps back to the original `correct` index for every question,
submit — score must be 100%. Repeat for a placement (all-correct answers must produce
all-mastered). Then retake the same quiz and confirm the order array differs
(shuffled per attempt). If answers are stored by display index anywhere, that's the
bug — fix to original-index mapping.

### 1.6 Service worker & offline
- Every file in `sw.js ASSETS` exists on disk; every runtime-imported JS module and
  font is in the list (diff `ls -R` against the array — script it:
  `scripts/audit-sw.mjs`).
- `CACHE` version differs from the last shipped one if any asset changed.
- Behavioral: load app, go offline (DevTools), reload → app boots, lessons + figures +
  glossary + drills all work offline.
- Update path: bump CACHE to a throwaway value, reload twice → update toast appears.

### 1.7 Storage round-trip & backward compatibility
- Export backup → wipe all `masterycap:*` keys → import → deep-equal state (trades,
  course progress incl. all 8 tracks, streak, review boxes, drill stats, settings).
- Seed a **v3-era minimal state** (only profile/onboarded/balance/trades/course keys,
  no new keys) → app must boot with zero console errors and all new features degrade
  gracefully (no crashes on missing `streak`/`review`/`drillStats`).
- Old trades without new discipline fields are excluded from the grade, not treated
  as violations.

### 1.8 Feature acceptance re-verification (behavioral, per phase)
- P1 figures: open EVERY week of EVERY track at 375px — no horizontal overflow, no
  raw `{{fig:` text visible, colors from CSS vars.
- P2 drills: 5 correct answers of each family — arithmetic spot-checked by recomputing
  two of each by hand in the report; XP daily cap enforced.
- P3 insights: seed the documented test dataset; verify each rendered number; confirm
  nothing renders for slices with n<3.
- P4 review/streak: complete review on two simulated consecutive days (mock Date or
  manipulate stored `lastDay`) → streak 2; a wrongly-answered question reappears next
  session; a correct one is deferred.
- P6 discipline: seeded trade sets produce the documented grades; revenge auto-detect
  fires for an entry <30min after a loss.
- P7 glossary: search finds 5 sampled terms in both languages; term-links in lessons
  (if implemented) open the right definition.
- P8 settings: every control works; reset double-confirms; font-size persists.
- P5 chart replay (if present): 20 seeded rounds — ground-truth labels match what the
  generator injected; zone-tap tolerance sane on 375px touch targets.
- Design conformance sweep: screenshot every screen; zero emoji anywhere, all numerics
  `.mono`, no gradient buttons, tab bar intact, safe-area insets respected.

### 1.9 End-to-end (Definition of Done from the master prompt)
Fresh profile: onboard → lesson with figure → shuffled placement → pass a quiz →
5 drills → log 3 trades (one revenge-flagged) → insights + grade visible → daily
review → export backup → wipe → import → everything back. Offline after first load.
Zero console errors throughout. Record the run's results verbatim in `AUDIT.md`,
including anything that failed or was skipped — no optimistic summaries.

════════════════════════════════════════════════════════════════
## PART 2 — BACKLOG v5 (triaged idea dump)

The owner triaged ~138 ideas. Execute the SHIP-SOON set as phases P9–P15 below, in
order. LATER items go into `ROADMAP.md` under a "v6 candidates" section (list only,
no build). REJECTED items are listed at the end — do not build them even if they seem
easy; if one appears necessary, stop and ask the owner.

Append the phase plan below to `ROADMAP.md` as "v5", keep `CHANGELOG.md` per phase,
same working process as always.

### P9 — Ops & quality gates (do first — they police everything after)
- Commit the four audit scripts from Part 1 (`scripts/audit-{figs,i18n,content,sw}.mjs`)
  plus `scripts/audit-data.mjs` (§1.1) with a single runner `npm-free`:
  `node scripts/audit-all.mjs` exits nonzero on any FAIL.
- Playwright smoke test (`tests/smoke.spec.ts` + GitHub Action serving the folder
  statically): boots app, completes onboarding, opens one lesson per track, takes one
  quiz, logs one trade, checks zero console errors, screenshots @375/390/430 widths.
- Lighthouse PWA checklist: run and fix to green (installability, offline, icons,
  theme-color, maskable).
- `CONTRIBUTING.md` snippet: release checklist (audit-all → SW bump → changelog →
  smoke → commit).

### P10 — Data reliability core
- **IndexedDB dual-write**: extend `js/store.js` — writes go to localStorage AND an
  IndexedDB object store (`masterycap/kv`); reads prefer localStorage, fall back to
  IDB (auto-heal restores the missing side). Keeps the synchronous API surface by
  making IDB the async mirror; no callers change. This unlocks larger data later.
- **Quota warning**: settings + a dashboard notice when serialized size > 4MB
  (localStorage ~5MB limit).
- **Schema version**: `masterycap:schemaVersion` (int, starts at 1) + a `migrate()`
  hook table in store.js — empty now, exists so future changes are soft.
- **Corrupt-recovery UI**: JSON.parse failures on boot quarantine the bad key to
  `masterycap:corrupt:<key>` and show a recovery sheet (keep quarantined / restore
  from backup) instead of a white-screen crash.
- **Verify-backup checksum**: export embeds `{checksum: <djb2 of payload>}`; import
  verifies before writing; mismatch = clear error, no partial import.
- **Auto-backup reminder**: if last export >7 days ago (tracked key), one dismissible
  pill on Home — never a modal.
- **Demo mode**: settings toggle seeds a realistic dataset (trades across emotions,
  partial course progress) under a `masterycap-demo:` prefix, fully isolated, with a
  persistent "DEMO" pill in the header and one-tap exit that restores the real
  namespace untouched.

### P11 — Learning loop deepening
- **Mistake bank**: every wrongly-answered quiz/placement/review/drill question gets a
  `review[qKey]` entry at box 1 (drills store their generator seed so the same
  numbers reappear). "Mistakes" filter inside daily review; badge count on the
  review card.
- **Per-week must-memorize list**: 3–5 bullet "memorize this" items appended to each
  lesson (new `memo:{en:[],ur:[]}` field per week — additive, crypto track gets
  markers only if content is drawn verbatim from its existing text). Collapsible
  `.panel` under the lesson body.
- **Formula strip**: sticky compact bar under lesson header on math-heavy weeks
  (`formula:{en,ur}` optional week field): e.g. `risk $ = balance × risk% ·
  size = risk ÷ stop%`. Mono, one line, horizontally scrollable.
- **Skim mode**: toggle on lesson view rendering `skim:{en:[],ur:[]}` (3–6 bullets per
  week, additive field). Persisted preference.
- **Cross-track links**: inline `{{xref:trackId:weekId:label}}` marker → tappable pill
  navigating to that week (back returns correctly). Add ~15 genuinely useful xrefs
  (margin↔futures W3, funding↔crypto W8, sizing↔journal, martingale↔binary W5, etc.).
- **Red-flag callouts**: `.note-box.flag` component + `{{redflag:...}}` marker;
  seed ~12 across tracks (withdrawal blocks, guaranteed-return pitches, pledged
  sponsors, IV crush before earnings…).
- **Compare cards**: static two-column compare component; author 6: spot vs perp,
  call vs put, SMA vs EMA, grid vs DCA, investing vs trading, limit vs market.
  Rendered via `{{compare:name}}`.
- **Track exam + local certificate**: after all weeks completed/mastered, "Final exam"
  unlocks — 15 questions sampled across the track's quiz pool (shuffled, no repeats),
  80% pass. Pass renders a local certificate card (canvas → PNG download, design-system
  styled, name + track + date, "self-assessed — MasteryCap" honesty line) + `+200 XP`.
  Stored in course progress as `examPassed: ISO date`.
- **Binary harm-reduction gate**: binary track requires answering 3 fixed questions
  correctly (breakeven formula, counterparty, martingale) before week list unlocks —
  the one place friction is the feature.
- **Mini glossary quiz**: after quiz pass, optional 3-term glossary check drawn from
  that week's linked terms; feeds the weakest-terms data (P13).

### P12 — Journal & discipline v2
- **R-multiple auto**: when entry/stop/exit present, compute and store `r` on save;
  show in history rows and insights (expectancy in R).
- **Tags**: optional `setup` (free text, autocomplete from history), `market`
  (crypto/stocks/forex/futures/other), `timeframe` (scalp/intraday/swing/position).
  Filter chips on history.
- **Post-trade debrief**: after save, inline 3-question card (skippable): followed
  plan? (y/n → stored `followedPlan`), what worked, what to fix (short text fields).
- **Cool-down timer**: saving a revenge/greed-flagged trade starts a visible 30-min
  countdown pill on Journal + Home ("Cooling down — no entries until HH:MM"). Soft
  by default (dismiss with a long-press "override" that logs `overrode:true`);
  a strict-mode setting disables the override.
- **Checklist gate (optional strict mode)**: setting OFF by default. When on, "Save
  trade" is disabled until today's pre-trade checklist is 4/4 (state already exists).
- **Calm vs flagged compare**: Progress panel — side-by-side win rate, avg P/L, total
  P/L for calm vs flagged trades. This is the app's thesis in one panel.
- **CSV export**: trades → RFC-4180 CSV download next to JSON export (same sheet).
  Columns = all trade fields; UTF-8 BOM so Excel opens Urdu notes correctly.

### P13 — Insights & retention v2
- **New insight rules**: time-of-day buckets (morning/afternoon/night win rate),
  day-of-week, size buckets (vs median), streak-after-loss behavior (avg P/L of trade
  taken <30min after a loss vs >2h — the revenge quantifier). All keep the n≥3 guard.
- **Sample-size badges**: every insight row shows `n=X` pill; n<10 renders it in
  `--t3` with "early data" hint. Empty state (n<3 overall) gets coaching copy, not
  blank space.
- **Skill radar**: SVG radar chart (new figure-style component) — one axis per track,
  value = weeks completed + exam bonus. On Progress.
- **Mastery heatmap**: track × week grid, cells colored by locked/current/completed/
  mastered. On Progress.
- **Discipline grade trend**: grade recomputed per rolling window, sparkline of last
  10 windows.
- **Win-rate vs expectancy dual metric**: header pair on Progress with one-line
  explainer ("55% win rate with 0.4R expectancy loses money").
- **Weakest-5 glossary terms** panel (from P11 mini-quiz data).
- **Due-review badge**: count bubble on the Learn tab icon when reviews/mistakes due.
- **Habit calendar**: GitHub-style dot grid (last 12 weeks) of qualifying-action days.
- **Streak freeze**: 1 automatic freeze/week (skipped day consumes it silently,
  labeled in calendar); **recovery quest**: broken streak offers "3 reviews today
  restores it" once.
- **Notifications (opt-in, honest)**: Notification API permission flow in settings
  with iOS 16.4+ PWA caveats explained in the sheet. No server: schedule while app is
  open; on app open, if reviews due and permission granted, fire one local
  notification. Never nag; setting default OFF.
- **Morning brief card**: first open of the day, Home top card = streak + 1-tap review
  + 1-tap drill. Dismiss collapses it for the day.
- **What's-new modal**: once per SW version (stored `lastSeenVersion`), render the
  matching CHANGELOG section in a sheet.
- **Offline pill**: `navigator.onLine` listener → tiny "Offline" pill in header
  (informational only — everything works anyway).
- **iOS install sheet**: if not standalone (`display-mode`), settings row "Install on
  iPhone" → sheet with Share→Add-to-Home-Screen steps + inline SVG illustrations.

### P14 — Drills v2
- **New families**: funding-rate cost over N days; liquidation-distance from leverage
  (approx, isolated); binary EV per 100 trades; expense-ratio drag over Y years;
  swap/carry cost; futures roll cost. Each with worked solutions, both languages.
- **Multi-step drills**: chained 3-parters (size → stop-distance sanity → R at target)
  sharing one scenario; partial credit per step.
- **Always-show explanations** (audit: correct answers get the worked solution too).
- **Difficulty auto-ramp**: per family, rolling accuracy >80% over last 10 → harder
  parameter ranges (tighter tolerances, uglier numbers); <50% → easier. Show current
  tier (I/II/III) as a pill.
- **Weekly challenge pack**: deterministic seed from ISO week number → same 7 drills
  for everyone that week; completion = local badge on habit calendar + 30 XP. (This
  also enables friends comparing scores verbally — no backend.)
- **Timed mode**: optional per-session toggle, 60s/drill, timer pauses on answer;
  stats tracked separately. Never default.

### P15 — UX & a11y pass
- `prefers-reduced-motion`: disable draw-in/count-up/spring animations (CSS media +
  countUp guard).
- Tap-target audit: every interactive element ≥44px hit area (quiz options, del
  buttons, chips) — fix with padding/pseudo-elements, not visual size changes.
- `inputmode="decimal"` + `pattern` on all numeric journal/drill fields (numeric
  keypad on iOS).
- Confirm-before-leaving mid-quiz/placement/exam (tab switch or back) — small sheet,
  "resume" default.
- Lesson progress %: thin bar in lesson header (scroll progress of the body).
- Client-side lesson search: build a lazy index (track/week/title/body-text, both
  languages) on first search open; results deep-link to weeks. Lives next to glossary
  search in one search sheet with two sections.
- Onboarding: "Skip" affordance (defaults applied); first-run 3-step dismissible tour
  (Home → Learn → Journal), never shown again.
- High-contrast toggle in settings: bumps `--t2/--t3` values and border opacities
  via a `data-contrast="high"` root attribute.

### Deferred to v6 (list in ROADMAP, do not build now)
Cheat-sheet one-pagers · flashcard deck expansion · ELI5 toggle · scenario branching
lessons · TTS read-aloud · EN↔UR diff view · owner voice notes · 30-day placement
re-test reminders · case-study weeks · order-book static viz · "would you take this"
MCQs · drill→journal one-tap log · options payoff interactive playground · standalone
calculator tab · screenshot attachments (needs IDB maturity) · daily-loss soft lock ·
weekly auto-summary text · equity annotations · CSV broker import · paper/live dual
balance · DD/R goals · shareable progress PNG · XP levels/titles · forgetting-curve
estimates · Sunday wrap sheet · pin today's job · landscape/tablet layout · keyboard
shortcuts · focus-trap audit · swipe between weeks · icon-only tab option · encrypted
ZIP export · multi-profile switcher · crash-log ring buffer · share-target/shortcuts ·
file handler for .json · new tracks (commodities, macro, PK tax, psychology, Greeks
playground, fee literacy, news literacy) · challenge codes / QR compare / teach-a-friend
mode · rules-based "Smart Coach" phrasing (must never be called AI) · invite/FAQ/typo
mailto/what's-new polish beyond P13.

### Rejected — do not build (non-goals hold)
Live prices or TradingView embeds · cloud sync/accounts · server push · monetization /
App Store · React or any framework rewrite · community feed · copy-trading hooks ·
broker OAuth · any local/remote LLM features · fake-AI chat of any kind.

════════════════════════════════════════════════════════════════
## Definition of done (this prompt)

1. `AUDIT.md` complete, all FAILs fixed, audit scripts committed and passing via
   `node scripts/audit-all.mjs`.
2. Phases P9–P15 implemented, each with changelog entry + SW bump + browser
   verification at 375px; smoke tests green.
3. `ROADMAP.md` updated: v5 marked done per phase, v6 candidates + rejected list
   recorded.
4. Final end-to-end run (§1.9 extended with: one exam pass + certificate download,
   one weekly challenge, mistake-bank resurfacing, CSV export opens in a spreadsheet,
   demo mode in/out, notification permission flow) — results reported honestly,
   failures included.
