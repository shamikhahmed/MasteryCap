# Changelog

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
