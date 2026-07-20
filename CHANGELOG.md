## [49.2.0] — 2026-07-20

### Post-trade debrief + competence
- One interrogation after each sim trade close (skip allowed); probe saved on trade
- Progress: can / can't-yet competence panel from weeks + sim process
- University build queue closed (Lab/FE/UR still locked out)
- SW `masterycap-v4920`


## [49.1.0] — 2026-07-20

### Scenario ladder
- L1 Funding squeeze (crypto perp, crowded-long pays)
- L2 Theta burn (option premium proxy)
- L3 Margin call distance (thin futures margin)
- Sim picker ladder strip; funding/theta drain on position panel
- SW `masterycap-v4910`


## [49.0.0] — 2026-07-20

### Worked chart examples
- `js/worked-charts.js`: hh-hl, range-sr, engulf-support, pin-reject (fixed seeds + labels)
- Lesson marker `{{chart:id}}` injected in Foundations W5; Charts hub → examples then drill
- Candle renderer supports bar marks; SW `masterycap-v4900`


## [48.3.0] — 2026-07-20

### Session Continuity
- Home CTA: Resume · n/m / Session done (same-day)
- Quiz step opens week quiz; cards honor session count
- Auto-advance on cards done / quiz exit / sim debrief
- Skip only on optional steps; done plan kept until rebuild
- SW `masterycap-v4830`


## [48.2.0] — 2026-07-20

### Elective warn-first bars
- Bots & Copy Defense + Binary Harm Reduction: 4-week 6-part (refuse / scam defense)
- Trading more-tracks depth wave complete for Markets ladder electives
- SW `masterycap-v4820`


## [48.1.0] — 2026-07-20

### Options / Greeks / Futures literacy bars
- Options, Greeks, Futures: 4-week 6-part defined-risk / contract literacy
- SW `masterycap-v4810`


## [48.0.0] — 2026-07-20

### Markets more-tracks depth (v48 start)
- Macro Literacy + Spot vs Derivatives: 4-week 6-part bars
- SW `masterycap-v4800`


## [47.5.0] — 2026-07-20

### Paper University close-out
- Investing Literacy + Tax Literacy: 4-week 6-part honesty bars
- Software Craft / Money campus honesty feet; kill dead beginner-path panel
- Sim i18n → Practice ledger; SW `masterycap-v4750`
- **v47 Paper University marked complete** (non-goals unchanged)

## [47.4.0] — 2026-07-20

### Stocks/Forex depth to 6 weeks
- Stocks W5–6: dilution/risk % + equity scams honesty
- Forex W5–6: carry/theme risk + FX scams closing process
- SW `masterycap-v4740`

## [47.3.0] — 2026-07-20

### Committee + ladder polish
- Committee Approval sheet (quiz + exam paths) — Open Markets ladder CTA
- Stocks/Forex week 4 practice-loop stubs; Markets spine card styling
- SW `masterycap-v4730`

## [47.2.0] — 2026-07-20

### Markets core stubs + honesty
- Stocks Literacy + Forex Literacy: 3-week 6-part stubs (seeds + quizzes)
- Soften XP theater labels → Study pts; exam pass copy drops +XP flex
- SW `masterycap-v4720`

## [47.1.0] — 2026-07-20

### Content depth (Phase B/C)
- Foundations rewritten to 6-part bar (objective/teach/example/mistake/check + flashcardSeeds + notebook)
- Crypto Literacy track: custody, fees, spot vs leverage, scams, process (5 weeks)
- Quiz pass seeds Study flashcards + notebook prompt; Committee Approval toast on Foundations gate
- SW `masterycap-v4710`


## [47.0.0] — 2026-07-20

### Paper University (Phase A)
- Admission flow + Student ID card (`MCI-YY-BRANCH-RAND-C`), optional photo
- Today school homeboard (Continue / Standing / mini ID / Study due)
- Markets core ladder: Foundations → Crypto/Stocks/Forex unlock together (weeks complete OR exam)
- Practice promotes Study Hub; sim labeled Practice Ledger
- SW `masterycap-v4700` + `css/institute.css`


## [46.0.4] — 2026-07-20

### Fix
- Smoke + final-acceptance: Markets path uses track cards (`[data-mkt]`) not dead `#camOpenMkt`
- SW `masterycap-v4604` + `?v=4604` cache bust (Pages still serving old COURSES UI until hard refresh)


## [46.0.3] — 2026-07-20

### UX honesty
- **Practice “4”** was due-review count glued to label — now badge on icon only
- **Records:** Profile / Transcript / Certs panes; projects only for enrolled courses (no raw prospectus dump)
- Student profile pane: name edit, theme, enrollments
- SW network-first for JS/CSS + cache bust `?v=4603` so Pages stops serving stale COURSES supermarket

## [46.0.2] — 2026-07-20

### Markets UX
- Killed COURSES supermarket home (chip rail / how-to hub / beginner path pills)
- School of Markets = Open/Locked track cards on Campus; track opens clean syllabus + weeks only

## [46.0.1] — 2026-07-20

### Boot
- Removed Welcome Update / “Premium School” changelog sheet on start — silent version stamp only

## [46.0.0] — 2026-07-20

### Premium School
- Campus branches: Software Craft · Markets · Money — Open / Locked / Announced; enroll; attempts
- Student profile strip; Light / Sepia / Dark themes; splash + desktop fix; teach page reader
- Scope lock kept: FE-202→APP-403 Announced; Lab/editor = v2 off
- SW `masterycap-v4600`

## [45.1.0] — 2026-07-20

### Scope lock (owner)
- **FE-202→APP-403 → Announced** (titles only; bodies unloaded from `courses.js` MAP, files kept on disk for v2)
- **Age-band = tip layer** — `resolveTeach` ignores `teachRegister` full bodies; short register notes only
- **HTTP Lab + desktop typed editor = v2** — gated off via `js/institute/features.js` (`httpLab`, `typedCodeEditor`)
- Records projects: WEB + FIN only; Practice no Lab row / playground
- SW `masterycap-v4510`

## [45.0.0] — 2026-07-20

### Institute depth
- Full `teachRegister` on WEB-101→FE-201 (teen / career / adult)
- HTTP Lab: more routes, request headers, auto-grade exercises, BE-301 sync
- Code practice: assert harness + Parsons tap-order on phone
- School of Money **In Session**: FIN-101, FIN-201, FIN-301 (literacy, not advice)
- Records: Print / Save PDF for certificates (`@media print`)
- Screen gallery: 12 institute shots (`npm run gallery`)
- Markets FA: reading `#startQuiz` hardened — no soft-skip Foundations/crypto quiz
- SW `masterycap-v4500`

## [44.0.0] — 2026-07-20

### Software Craft complete path + labs
- **All Software Craft courses In Session:** FE-202→FE-204, BE-301→BE-304, APP-401→APP-403 (bilingual lessons + finals + projects where listed)
- **Age-band teach bodies:** `teachRegister` for teen/career/adult on new courses; adaptive wrap for older lessons via `js/institute/register.js`
- **HTTP Lab:** on-device simulated server (Practice → HTTP Lab); honesty banner; BE-301 project hooks
- **Desktop typed code editor:** ≥900px textarea runner with light checks; phone keeps Notes path
- SW `masterycap-v4400`

## [43.0.0] — 2026-07-20

### Institute campus MVP
- **Product shift:** offline personal institute — Software Craft flagship; Markets as one school
- **Tabs:** Today · Campus · Practice · Records (legacy Learn/Journal/Progress still reachable from Campus/Records/Practice)
- **Onboarding:** honesty screen + name + age / language / build experience / goal / time → starter path letter (no course supermarket)
- **Catalog:** School → Program → Course with In Session vs Announced; prereq locks
- **Authored spine:** WEB-101, WEB-102, WEB-103, FE-201 (EN + Roman Urdu) with lesson template (objective → warm-up → teach → visual → check → practice → exit) + SVG diagrams
- **Practice:** cross-course SRS; links to drills / study desk / paper lab
- **Records:** transcript, project checklists, honest certificates (self-issued + hash + locked disclaimer), JSON export
- **Visual:** Institute Terminal — ink/paper/orange, Fraunces + IBM Plex (Geist Mono fallback)
- SW `masterycap-v4300`

## [42.4.0] — 2026-07-20

### Reading mode + campus family syllabus
- **Apple Books–like reading mode** for lessons: paginated pages, progress bar, tap edges, skippable first-run guide; quiz stays separate (`js/reading.js`)
- **Four extension families** now live with bilingual starter tracks (3–4 weeks each): Personal Finance, Career Systems, Product Builders, Focus & Wellness
- `js/data/personal-finance.js`, `career-systems.js`, `product-builders.js`, `wellness-focus.js`; wired in `tracks.js` + `families.js`
- SW `masterycap-v4240`

## [42.3.0] — 2026-07-20

### Campus families shell
- Five course families on Home: Trading Literacy live (all tracks); Personal Finance / Career / Product Builders / Focus & Wellness scaffold
- `js/data/families.js` registry; SW `masterycap-v4230`

## [42.2.4] — 2026-07-20

### Campus workbench MOBILE≠DESKTOP
- Mobile: stacked campus continue / today / map
- ≥900px: workbench main + sticky tools rail (path / shortcuts). SW `masterycap-v4223`.

## [42.2.2] — 2026-07-20

### Identity — trade-school workbench / competency stamp
- Splash: workbench assemble + READY stamp punch (not exam booklet)
- Tokens: safety yellow `#F4C430`, oak/graphite surfaces, green secondary
- Fonts: Oswald display + Noto Sans body (Urdu-capable)
- SW `masterycap-v4222`

## [42.2.1] — 2026-07-20

### Polish
- Home booklet-cover spine + serif section titles; softer tab indicator; SW `masterycap-v4221`

## [42.2.0] — 2026-07-20

### Beauty — exam booklet / school stamp
- Splash: booklet + PASS stamp (Libre Baskerville display)
- Light+dark only — paper/quiet/focus presets removed from Settings
- Softer seal orange; tokenized tabbar; Home booklet-cover titles
- SW `masterycap-v4220`

## [42.1.1] — 2026-07-19

- Capricorn QR asset in SW allowlist (`assets/qr-masterycap.png`)
- SW `masterycap-v4211`

# Changelog

## v42.1.0 (2026-07-19) — brand + session runner stub
- **Brand icons:** Capricorn OS mark pack wired — favicon.svg, apple-touch-icon-180, maskable + any PNGs, mark.svg / icon-1024 in SW cache.
- **Guided session runner (stub):** Campus Continue opens today's plan from `syllabus.buildDailySession` (lesson → cards → quiz → optional sim); floating bar advances steps. Additive key `sessionRun`.
- VERSION / APP_VERSION → 42.1.0 · SW `masterycap-v42.1`.


## v42 (2026-07-12) — share card
- **Share progress card**: 1080x1080 PNG (streak + weeks completed) from Progress tab — WhatsApp-ready, honest tagline, no income claims.
- Confirmed: mistake museum already live since earlier version (wrong quiz answers seed SRS box 1 via mistakes.js) — removed from build queue.
- SW masterycap-v42.


## v41 (2026-07-12) — motivation + access
- **Weekly report card** on Home: XP gained, weeks completed, reviews due, streak + one focus suggestion. Local snapshot per ISO week, dismissible.
- **Certificate progress preview** in Progress: grayed/dashed cert placeholder + met/missing requirement checklist (exam, sim trades, process rate, liquidations, portfolio adherence) — shows exactly what stands between you and issue.
- **Listen button** on every lesson: browser text-to-speech reads the lesson body (works for EN and Roman Urdu).
- SW masterycap-v41.


## v40 (2026-07-12) — University core + appearance fixes
- **Theme bugs fixed:** legacy default pinned preset 'dark' so the Light/Auto toggle looked dead — repaired (preset 'original' = follow mode, stored legacy values migrated on read). Auto now follows device live (matchMedia listener). --t4 was never themed (faint text unreadable in light) — now per-preset.
- **Text size fixed:** S/M/L setting only reached one CSS rule; now scales the whole layout (body zoom), new XL step added.
- **University structure (syllabus.js):** semesters (Ground School → Market Core → Specialisation → Electives), STRICT prerequisites (track opens only when prereq tracks fully credited; placement accelerates credits, never skips), dated personal plan with pace from session length.
- **Settings:** daily session length 15/30/45 min.
- **Home:** plan position strip — Week N/M, semester, on-track/behind pill; Continue button shows session length.
- SW masterycap-v40.


## v39 (2026-07-12) — clarity pass
- **Home decluttered:** "Up next" continue card now FIRST (accent border), three stacked honesty note-boxes collapsed to one compact footer line (copy unchanged), seven loose buttons merged into one Shortcuts grid panel.
- **Quiz content honesty:** removed/reframed 8 app-meta questions ("what is the Home tab", "MasteryCap is primarily a...") — replaced with real market-content questions (counterparty, expectancy vs win rate, paper-trade-first). Course now teaches markets, not the app UI.
- **Certificate redesign:** 2400x1440, serif display name, double keyline + corner ticks, verify seal with evidence hash. All locked honesty lines kept verbatim (self-issued, NOT SECP/broker/CFA, competence decays).
- SW masterycap-v39.


## v38 — 2026-07-11 · Full confidence pass
- Flashcards: real Leitner SRS (`flashSrs`, due-first, 1/3/7/14/30 day boxes)
- Backup: first-export sheet, 7-day re-nag, reset requires export confirm + type `RESET`
- SW: blocking update sheet + `reg.update()` on focus/visibility
- Cert PNG: COURSE LITERACY vs TRADE-READY · NOT A LICENSE banners
- Progress: TRADE-READY badges; limits honesty copy
- Greeks bodies Invest-depth EN+UR; Foundations thin UR; Futures W3 UR
- Onboard: new users only literacy markets; soft-start for `some`; lab gate on Learn
- How-to: tax accountant prep checklist (no rate tables)
- Glossary: TRADE-READY / process graduation / mark price / risk of ruin + thicker thin defs
- `audit-ur-length.mjs` in audit-all (8 audits)
- SW **v38**

## v37 — 2026-07-11 · Study desk (flashcards + notes)
- Flip flashcards from glossary / week quizzes / mix rounds (Got it / Again)
- Local study notes (device-only); lesson → note + flash this week
- Campus Study entry; card streak stats
- SW **v37**

## v36 — 2026-07-11 · Complete school glossary
- Glossary **122 → 215** bilingual terms (foundations/macro/tax/options/greeks + core market vocab)
- MUST-know coverage check green; weak EN=UR defs fixed
- Campus → Glossary entry point
- SW **v36**

## v35 — 2026-07-11 · Honest mastery + thick Macro/Tax + UR bodies
- Macro + Tax rewritten to Investing depth (bilingual essays)
- Foundations/Greeks short-UR bodies expanded; short-UR sweep clean
- TRADE-READY honesty: competence decays; not lifetime mastery / income
- Cert honesty: NOT SECP/broker/CFA/gov license; local verify fingerprint only
- Path: Tax after Invest, Macro after Spot (full tracks again)
- SW **v35**

## v34 — 2026-07-11 · Zero-beginner ready path
- Soft-start Foundations (Skip / new → Week 1, no placement wall)
- Skip no longer routes to Crypto; markets copy = learn not trade
- Beginner path: Foundations → Invest → Spot → Stocks → **Options** → Greeks…
- Macro/Tax demoted later on path (side literacy)
- Advanced track soft-locks until Foundations W1–3; Greeks needs Options
- Trading lab gated until Foundations W4 (Today Lab → drills instead)
- Greeks xrefs fixed (stocks:4/6 → options); missing-week guard
- SW **v34**

## v33 — 2026-07-11 · Campus Today + Urdu shell + smoke harden
- **Campus Today:** lesson · lab · review checklist on Campus (`KEYS.todayHabit`)
- **Roman Urdu:** nav Seekho/Hasil, shell labels, track names/blurbs, remaining week-title bleed
- **Smoke / FINAL:** tab nav via `data-tab` (label-rename safe); tourSkip dismiss
- Cert honesty unchanged: self-issued local PNG, not a license
- SW **v33**

## v32 — 2026-07-11 · School shell + UX spoilers fixed
- Tabs: **Campus · Courses · Desk · Transcript**; Journal **Manual** (was Live)
- Certs split: **COURSE COMPLETE** vs **TRADE-READY** (evidence hash); exam no longer says TRADE-READY
- Themes (Dark/Light/Auto + Paper/Quiet/Focus) · Teacher voice · active learning time on Transcript
- Grad soft landing (exam done → Practice CTA) · tour Skip · SW toast uses APP_VERSION
- Limit unfilled message · checklist copy Desk · onboarding markets include Foundations/Invest/Spot
- **Stocks / Options split** · Binary/Bots electives · skill challenge tests
- SW **v32**

## v31 — 2026-07-11 · S7: Sim audits + smoke + school complete
- **`scripts/audit-sim.mjs`** — determinism, stop rejects, liq formula, limit fill, partial≈full, process fails, futures `size_zero`, forex pip lots, portfolio panic/stick
- Registered in `audit-all` (7 audits)
- Smoke: scripted sim session (enter+stop, 10 steps, close) → `simTrades` + Journal Paper tab
- **`tests/final-acceptance.cjs`** — FINAL ACCEPTANCE harness @375 (campus path, portfolio stick, backup wipe/import)
- SW **v31** · FINAL ACCEPTANCE in `LOOP-STATE.md`

## v30 — 2026-07-11 · S6: School copy + income-promise lint
- Onboarding / graduation / how-to copy: **zero to trade-ready**; ready → micro-size how-to
- `audit-content.mjs` scans i18n + lesson bodies + sim missions + howto; expanded ban list; quiz distractors exempt
- README/GUIDE: Learn → Practice → Graduate school framing; honest claim
- SW **v30**

## v29 — 2026-07-11 · S5: Portfolio simulator (Invest + Spot)
- **`js/sim/portfolio.js`** — seeded 24-month plan practice (broad / single / cash); crash months 8–10; decision events; stick / planned-add / panic-sell
- **Adherence = process:** panic-sell or unplanned add → fail even if final value up; stick-through-crash → pass
- Sim picker Invest/Spot portfolio rows · plan → run → debrief vs plan-followed baseline
- Graduation invest/spot: `portfolio_adherence` from `simStats` (no soft “coming”)
- SW **v29**

## v28 — 2026-07-11 · S4: Futures / Forex / Stocks sim packs
- Engine instrument modes: **perp · futures (tick) · forex (pip) · stock (shares)**; `size_zero` reject; optional `gen.start` + `slipBoost`
- **18 new scenarios** (6 futures, 6 forex, 6 stocks) — process missions, bilingual
- Sim picker grouped by track section labels
- Graduation sim counts now real for futures/forex/stocks (no more `sim_requires_s4`)
- SW **v28**

## v27 — 2026-07-11 · S3: Graduation gates + TRADE-READY cert
- **`js/graduation.js`** — `gradStatus(trackId)` process gates (exam + sim process for trading tracks; invest/spot exam-only until S5; S4-missing graceful)
- KEYS.graduation additive · Learn Graduation panel with live counts + Graduate CTA (+200 XP)
- Certificate PNG: **TRADE-READY — process-measured** + honesty line ("Markets decide outcomes")
- Home campus ladder chips: Learn → Practice → Graduate per track
- SW **v27**

## v26 — 2026-07-11 · S2: Simulator completeness
- **Limit orders** — `placeLimit` / `cancelLimit`; fills when bar range touches limit; stop validated vs limit price; Market/Limit UI + pending strip
- **Partial close** — `closePartial(0.25|0.5)`; remainder keeps stop; `partials[]` on final trade; R vs original riskD
- **Play speeds** — 1x/2x/4x (600/300/150ms), memory-only; leave sim clears interval
- **Journal Paper|Live** — Paper = `simTrades` read-only with process tag; Live = existing trades; insights stay live-only
- **Debrief** — R timeline, `{n}/{m} process pass`, same-seed practice rerun
- SW **v26**

## v25 — 2026-07-11 · S1: Trade Simulator core (THE SCHOOL begins)
- **`js/sim/engine.js`** — seeded deterministic paper-trading sessions: candle stream,
  market entries with **mandatory stop (no naked-entry path exists)**, optional TP,
  fees/slippage, funding ticks, leverage from risk math, liquidation price (only >1x,
  drawn on chart), conservative liq→stop→TP fill order, move-stop (widening = logged violation)
- **`js/sim/scenarios.js`** — 8 crypto process-mission scenarios (pullback, rally short,
  range patience, stop-hunt wick, liq-line lesson, reversal, hold-the-winner, violent vol)
- **`js/views/sim.js`** — picker → live session (chart w/ ENTRY/STOP/TP/LIQ lines,
  step/play, position panel w/ uP/L + R) → debrief. **Grading is process, not P/L:**
  disciplined stop-out passes; over-risk/widened-stop/against-mission/liquidated fail
- `candles.js`: additive `lines` overlay param · KEYS: `simTrades`, `simStats` (additive)
- Entries: Home + Learn CTAs · honest paper≠real note in every debrief
- audit-i18n: dynamic-prefix key support · SW **v25**

## v24 — 2026-07-11 · Greeks + Tax + Macro depth tracks
- New tracks: **Options Greeks Deep** (6), **Tax Literacy** (5), **Macro Backdrop** (6)
- Beginner path: Foundations → Macro → Invest → Tax → Spot → Stocks → Greeks → …
- Still zero-to-ready / compound honesty — no get-rich marketing
- SW **v24**

## v23 — 2026-07-11 · How-to hub + refuse get-rich goal
- **Product lock:** zero-to-ready, not zero-to-rich. Honest wealth = Investing→Spot compound
- How-to hub: PSX account, crypto venue, orders, first invest buy, self-custody, honest wealth path
- Home: school map + How-to CTA; Foundations Learn links hub
- `KEYS.howtoChecks` additive; SW **v23**

## v22 — 2026-07-11 · School campus + Foundations (zero-to-ready)
- **Home** = school campus (next lesson, beginner path, study stats) — no balance/win rate/equity
- **Journal** = practice desk (balance, equity, win rate, checklist, sizing, log)
- **Foundations** track (6 weeks): school stance, scams, open regulated account, orders, paper workflow, risk %
- Beginner path starts with Foundations → Investing → Spot → …
- Tour/onboarding copy updated; SW **v22**
- Stance unchanged: literacy ≠ income; no backend (static PWA)

## v21 — 2026-07-11 · All courses thickened (practice + 4th quiz)
- `thicken.js` — beginner practice append on **all 53** weeks
- `quiz-extra.js` — 4th literacy Q where weeks had only 3 (~50 weeks)
- `enrich.js` + `getTrack()` — merge extras + quiz at read time (exam/review/course)
- Retention pool uses enriched weeks
- SW ASSETS: `quiz-extra.js`, `enrich.js` · CACHE **v21**
- Stance unchanged: literacy ≠ income

## v20 — 2026-07-11 · Beginner path + graduation (honest earn framing)
- Keep name **MasteryCap**
- `js/data/paths.js` — recommended beginner order; per-track graduation steps + size rules
- Learn UI: path chips + graduation panel (Invest/Spot = compound path; binary = $0 earn)
- `js/data/thicken.js` — beginner practice appends on key weeks
- Crypto W8 quiz +1 (funding as cost)
- Honest copy: no salary-from-course claim
- SW **v20**

## v19 — 2026-07-11 · All 53 weeks: memo/skim/formula + markers
- `js/week-extras.js` — every track/week: must-memorize, skim, formula (math weeks), redflag, xref, compare seeds
- Course render merges extras + prefixes markers (xref back-stack already wired)
- Honest stance unchanged: literacy + risk frameworks, not earn guarantee
- SW **v19**

## v18 — 2026-07-11 · Home Edit fix + sheet dismiss
- **Fix:** Home portfolio Edit used `window.prompt` (blocked in many PWA/webviews) → inline input + Save/Cancel
- Equity countUp snaps (dur 0) so balance not mid-animation after save
- Corrupt recovery sheet: backdrop + X dismiss (was trapping clicks with no close)
- Smoke/QA: tour dismiss already in place

## v17 — 2026-07-11 · P11–P15 complete
- **P11:** track final exam + local cert PNG, binary gate, gloss mini-quiz, search, mistake bank, memo/skim fallback all weeks, more xref/redflag/compare seeds, xref back-stack
- **P12:** debrief card, cool-down (Home+Journal), checklist gate / strict mode, history tag filters, `.grid-3`
- **P13:** radar/heatmap/habit+freeze, streak recovery sheet, morning brief, what's-new, Learn due badge, notify opt-in, iOS install sheet, discipline trend sparkline, offline pill
- **P14:** swap/carry/roll + multi-step drills, timed stats, weekly challenge (attempt-count), auto-ramp tier
- **P15:** mid-quiz confirm on tab leave, tour (`KEYS.tourDone`), onboarding skip
- SW **v17** — ASSETS include `exam.js`, `search.js`
- Docs: ROADMAP P9–P15 DONE; CONTENT-GAPS honesty note

## v16 — 2026-07-11 · P9 ops + P10 data + P11/P12/P15 start
- **P9:** `scripts/audit-*.mjs`, `audit-all`, Playwright `tests/smoke.cjs`, GH Action CI, `CONTRIBUTING.md`, lighthouse script
- **P10:** IDB dual-write + `hydrate()`, schemaVersion, quota/backup remind pills, checksum backups, corrupt quarantine sheet, demo mode (`masterycap-demo:`), CSV export
- **P11 start:** lesson extras (xref/redflag/compare/memo/skim/formula), mistake bank on quiz miss, lesson progress bar
- **P12 start:** auto R-multiple + setup/market/TF tags on trades; CSV in settings
- **P14 start:** funding / liq-distance / binary EV / expense-drag drill families
- **P13 start:** offline pill; calm-vs-flagged on Progress
- SW **v16**; new modules in ASSETS

## v15 — 2026-07-11 · Part 1 audit fixes + audit scripts
- SW ASSETS: add maskable icons + `icon-180.png`; CACHE **v15**
- Add `scripts/audit-{data,figs,i18n,content,sw,behavior,all}.mjs` + `scripts/audit-e2e.cjs`
- `AUDIT.md` Part-1 report (all automated FAILs fixed)
- Sync `VERSION` / `APP_VERSION` → v15

## v14 — 2026-07-11 · Fix glossary import + P7b + docs
- Fix `js/glossary.js` icons import (`./icons.js`); lesson term auto-link popovers (P7b)
- Docs sync: `VERSION`, `GUIDE.md`, `PRESENTATION.md`, README/ROADMAP/CURSOR prompt; manifest theme `#08090A`
- SW cache **v14**

## v13 — 2026-07-11 · Glossary auto-link (P7b)
- Lesson bodies auto-link glossary terms → tap popover definition; SW cache **v13**

## v12 — 2026-07-11 · Phase 5 chart-replay drills
- `js/candles.js` SVG candlestick renderer; `js/chartgen.js` seeded OHLC with labeled structures
- Drill modes: classify trend/range/reversal, tap resistance zone, engulfing-at-support MCQ
- XP via drillStats; entry from Home + Learn; SW cache **v12**

## v11 — 2026-07-11 · Phase 8 settings & a11y
- Settings sheet: name, language, font size S/M/L, haptics, backup/restore, double-confirm reset, version + changelog link
- `--t3`/`--t4` bumped for WCAG AA vs `#08090A`; SW cache **v11**

## v10 — 2026-07-11 · Phase 7 glossary
- `js/data/glossary.js` ~120 bilingual terms tagged by track; search sheet from Learn header
- SW cache **v10**

## v9 — 2026-07-11 · Phase 6 discipline score
- Journal toggles: stop placed / moved stop; auto revenge (<30m after loss) + oversizing checks
- Rolling 20-trade A–F grade on Home; breakdown on Progress; old null-field trades excluded
- SW cache **v9**

## v8 — 2026-07-11 · Phase 4 streak + daily review
- Daily streak on qualifying actions (lesson/quiz/drill/trade/review); flame pill on Home
- Leitner-lite daily review (3 Q from completed/mastered weeks); +15 XP; `mc.streak` / `mc.review`
- SW cache **v8**

## v7 — 2026-07-11 · Phase 3 journal insights
- `js/insights.js`: win-rate/P/L by emotion, flagged cost, per-pair, expectancy, streaks, day-of-week (n ≥ 3 guard)
- Insights panel on Progress; worst-cost line on Home; SW cache **v7**

## v6 — 2026-07-11 · Phase 2 practice drills
- `js/drills.js` generators + checkers: crypto/forex/futures sizing, options max-loss/breakeven/spread, binary breakeven WR, R-multiples, pip/tick value
- Numeric answers ±1% tolerance; worked solution after each; +5 XP/correct, 50 XP/day cap; `mc.drillStats`
- Drills UI from Home + Learn; Progress tab accuracy bars; SW cache **v6**

## v5 — 2026-07-11 · Phase 1 lesson diagrams
- `js/figures.js`: 27 parametric SVG figures (candle anatomy, engulfing, pin bar, HH/HL, range, S/R flip, EMA lag, RSI divergence, ATR stop, liquidity sweep, funding crowding, options payoffs/spreads/theta/IV, contango, margin waterfall, session clock, correlated pairs, grid bot, martingale ruin, binary breakeven, expense-ratio drag, IPO lockup)
- `{{fig:name}}` markers in lesson bodies (crypto + other tracks); `drawWeek()` injects via `injectFigures`
- Bilingual captions; `.fig` panel styling; SW cache **v5**

## v4 — 2026-07-11 · Phase 0 hygiene
- Quiz + placement options Fisher–Yates shuffled per attempt; clicks remap to original indices (scoring untouched); reshuffle on every start/retake
- Settings sheet from Home avatar: export `masterycap-backup-YYYY-MM-DD.json`, import with key validation + overwrite confirm (clears namespace then restores)
- Service worker cache **v4**; activate posts `SW_UPDATED` → "Updated to v4 — reload" toast
- `URDU-REVIEW.md` checklist for native-speaker content QA (human task)
- `store.clearAll()` / `store.validateBackup()`; icons: download, upload, x, refresh

## v3 — 2026-07-11 · Full curriculum + v2 icon set
- **8 tracks, all live** with full bilingual (EN / Roman Urdu) lessons, quizzes, placement tests:
  - Crypto & Perps — 10 weeks, 22-Q placement (original, ported verbatim)
  - Stocks & Options — 8 weeks, 16-Q placement (markets, charts, earnings/IV crush, calls/puts, intrinsic/extrinsic, greeks, strategies, options sizing)
  - Investing: PSX & Beyond — 8 weeks, 16-Q placement (investing vs trading, financial statements, ratios/valuation, PSX mechanics/CDC, company-picking framework, US stocks from Pakistan, IPOs, mutual funds/ETFs)
  - Futures — 6 weeks, 12-Q placement (contracts, tick value, margin, contango, rollover, tick-based sizing)
  - Forex — 6 weeks, 12-Q placement (pairs, pips/lots, sessions, carry, news, correlation risk)
  - Spot vs Derivatives — 4 weeks, 8-Q placement
  - Bots & Copy Trading — 6 weeks, 12-Q placement (bots, grid/DCA, copy trading, backtesting/overfitting, signal-group scams, safe automation)
  - Binary Options — 5 weeks, 10-Q placement, permanent high-risk warning banner (house-edge math, scam red flags, harm-reduction limits)
- PWA icons regenerated to v2 spark-line mark (matches splash logo), flat #FF6B2C on #08090A
- Track rail: active chip auto-scrolls into view; placement intro question-count now per-track
- Service worker cache v3, all data modules precached for offline

## v2 — 2026-07-09 · Design system rebuild ("not another Claude app")
- Full visual redesign: Bloomberg-terminal precision × Geist/Linear polish
- Self-hosted Geist + Geist Mono (offline woff2); mono tabular numerics for all money/%
- Zero emoji — crafted line-icon set (js/icons.js)
- Flat single-accent #FF6B2C buttons (no gradient pills), true-black #08090A, hairline rows, uppercase micro-labels, film-grain overlay
- Editorial onboarding (left-aligned type, thin progress bar, mono step counter)
- Flush bottom nav with accent top indicator
- Service worker cache v2

## v1 — 2026-07-09 · Initial build
- Unified PWA merging trade-journal.html + trade-course.html prototypes
- 4 tabs: Home (equity-curve hero, stat strip, pre-trade checklist), Learn, Journal (risk calculator + trade log, 5 emotion tags), Progress (equity curve, win-rate trend, emotion frequency, weeks completed)
- Replaced Claude-sandbox window.storage with localStorage wrapper (js/store.js, namespace masterycap:)
- Course engine: 70% quiz pass → next week unlocks; placement 60%/topic → mastered; XP +50 pass / +10 fail / +100 placement
- Splash, onboarding (name/experience/markets), EN / Roman Urdu toggle (persists)
- PWA: manifest, offline service worker, generated icons; GitHub Pages-ready (.nojekyll)
