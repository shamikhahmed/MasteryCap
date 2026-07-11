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
