# MasteryCap — Roadmap

## v4 → v17 · COMPLETE (2026-07-11)
See phases P0–P8 / P5 below. App at **v17** (`masterycap-v17`).

Ground rules (still apply):
- Bump `CACHE` in `sw.js`, CHANGELOG entry, verify at 375px before done.
- No live data, no backend, no accounts — offline-first stays.
- Content policy unchanged: frameworks and risk control; no tips/signals/win promises.
- Additive-only storage.

---

## Phase 0 — Hygiene · DONE (v4)
## Phase 1 — Lesson diagrams · DONE (v5)
## Phase 2 — Practice drills · DONE (v6)
## Phase 3 — Journal insights · DONE (v7)
## Phase 4 — Streaks + daily review · DONE (v8)
## Phase 6 — Discipline score · DONE (v9)
## Phase 7 — Glossary · DONE (v10 + v13/v14 P7b)
## Phase 8 — Settings & a11y · DONE (v11)
## Phase 5 — Chart-replay · DONE (v12)

Order: P0→P1→P2→P3→P4→P6→P7→P8→P5 (+P7b).

---

## v5 backlog (P9–P15) · DONE (v16–v17)

### P9 — Ops & quality gates · DONE (v16)
Audit scripts + `audit-all` · Playwright smoke · GH Action · CONTRIBUTING · lighthouse script

### P10 — Data reliability core · DONE (v16)
IDB dual-write · quota warn · schemaVersion · corrupt recovery · checksum backup · 7-day reminder · demo mode · CSV export

### P11 — Learning loop deepening · DONE (v17)
Mistake bank · must-memorize/skim/formula (seeded + quiz-explain fallback all weeks) · xrefs/red-flags/compares · lesson progress % · track exam + cert PNG · binary gate · mini glossary quiz · lesson search · xref back-stack

### P12 — Journal & discipline v2 · DONE (v17)
Auto-R · tags (setup/market/TF) · history filters · CSV · calm-vs-flagged · debrief card · cool-down (Home + Journal) · checklist gate + strict mode

### P13 — Insights & retention v2 · DONE (v17)
Offline pill · insight rules + n-badges · radar · heatmap · habit + freeze label · streak recovery sheet · notify opt-in · morning brief · what's-new sheet · Learn-tab due badge · iOS install sheet · discipline trend sparkline

### P14 — Drills v2 · DONE (v17)
Families: funding/liq/binary EV/expense + swap/carry/roll + multi-step · timed mode + timed stats · weekly challenge · auto-ramp tier pill · always-show solution

### P15 — UX & a11y · DONE (v17)
reduced-motion · 44px · high-contrast · mid-quiz confirm (back + tab leave) · lesson search · onboarding skip · 3-step tour · `.grid-3`

Curriculum honesty: see [CONTENT-GAPS.md](CONTENT-GAPS.md) — literacy + risk frameworks, not “fully learned” trader.
**v19:** all 53 weeks have memo/skim/redflag (+ formula/xref/compare where useful) via `js/week-extras.js`.

---

## v6 candidates (list only — do not build now)
Cheat-sheet one-pagers · flashcard deck expansion · ELI5 toggle · scenario branching lessons · TTS read-aloud · EN↔UR diff view · owner voice notes · 30-day placement re-test · case-study weeks · order-book static viz · "would you take this" MCQs · drill→journal one-tap · options payoff playground · standalone calculator tab · screenshot attachments · daily-loss soft lock · weekly auto-summary · equity annotations · CSV broker import · paper/live dual balance · DD/R goals · shareable progress PNG · XP levels/titles · forgetting-curve estimates · Sunday wrap · pin today's job · landscape/tablet · keyboard shortcuts · focus-trap audit · swipe weeks · icon-only tabs · encrypted ZIP export · multi-profile · crash-log ring · share-target/shortcuts · file handler · new tracks (commodities, macro, PK tax, psychology, Greeks, fee literacy, news literacy) · challenge codes / QR compare / teach-a-friend · rules-based Smart Coach phrasing (never call AI) · invite/FAQ/typo mailto polish beyond P13.

## Rejected — do not build
Live prices / TradingView · cloud sync/accounts · server push · monetization / App Store · React/framework rewrite · community feed · copy-trading hooks · broker OAuth · any local/remote LLM · fake-AI chat.

## Remaining non-code
- Native Roman Urdu review: [URDU-REVIEW.md](URDU-REVIEW.md)
- Deploy / push GitHub Pages (owner)

---

## v25+ — THE SCHOOL (approved 2026-07-11)
Pivot: complete school, zero → **trade-ready** (process-measured; never income promise).
Still offline PWA, no backend/accounts. Full spec: `CURSOR-PROMPT-3-SCHOOL.md`.
- S1 (v25) sim engine core + crypto scenarios (mandatory stop, liq math)
- S2 (v26) sim UI + auto-journal + Paper/Live journal toggle
- S3 (v27) process grading + hard graduation gates + trade-ready certificates
- S4 (v28) futures/forex/stocks scenario packs
- S5 (v29) invest/spot portfolio simulator
- S6 (v30) school copy sweep + income-promise lint
- S7 (v31) sim audits + smoke extension
Keys added (additive): simTrades, simSessions, simStats, graduation.


## University build queue (2026-07-12, owner-approved)
Done: v40 strict prereqs + dated plan + theme/text-size fixes · v41 report card + cert preview + TTS.
Next (in order):
1. ~~v42 Mistake museum~~ — ALREADY EXISTS (mistakes.js seeds SRS). Optional later: failed sim trades feed too.
2. ~~v42.1 Guided session runner~~ — Continuity shipped v48.3 (`js/session.js`).
3. ~~v49 Worked chart examples~~ — annotated `{{chart:id}}` + Charts hub (v49.0).
4. ~~v49.1 Scenario ladder~~ — funding squeeze / theta burn / margin call (v49.1).
5. ~~v49.2 Post-trade debrief~~ — one interrogation after each sim close (v49.2).
6. ~~v44 Share card~~ — DONE v42.
7. ~~v44 Glossary popovers~~ — DONE (lesson term tap).
8. ~~v49.2 Competence statements~~ — Progress can / can't-yet (v49.2).

**University build queue: COMPLETE** at v49.2.

**Unlock wave v50.0** (owner “do all”):
- ~~HTTP Lab + typed editor flags ON~~
- ~~FE-202→APP-403 catalog session + courses.js wired~~
- ~~Sim fail → Mistake museum feed~~
- ~~Crypto deep UR thicken~~
- Tag `v49.2.0` / `v50.0.0`

**v50.1 UR parity:** all deep-track week parts ≥55% UR length (Foundations + 12 deep modules).

**v50.2:** quiz stems/explains + long opts + institute course UR thin → 0.

**v50.3:** flashcardSeeds + all placement exports UR thin → 0.

**v50.4:** Today session CTA + Practice Charts/Review/Hasil + sim→review MCQs.

**v50.5:** BE-301 project checklist = all 5 HTTP Lab exercises (auth/put sync).

**v50.6:** Records dynamic project checklists + Hasil bridge; gallery HTTP Lab shot.

**v50.7:** Gallery HTTP Lab PNGs + FE practiceCode behavioral asserts.

**v50.8:** Parsons one-use pool + 5 course project checklists for cert honesty.

**v51.2:** bilingual tab labels + Journal back to Records.

**v51.1:** tab focus restore + dashboard back leftovers + HTTP Lab lesson return.

**v51.0:** bottom nav tab a11y (tablist/selected/keyboard).

**v50.9:** PRESENTATION.md + README tabs synced to institute shell.
