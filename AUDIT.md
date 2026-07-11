# MasteryCap — AUDIT.md (Part 1)

**Date:** 2026-07-11  
**App under audit:** v15 (`masterycap-v15`) after Part-1 fixes  
**Method:** static scripts + pure-logic behavior suite + Playwright browser E2E @375×812  
**Rule:** verify behavior, not code presence.

---

## Summary

| Section | Result |
|---------|--------|
| 1.1 Data integrity | **PASS** |
| 1.2 Figure markers | **PASS** (0 orphans) |
| 1.3 i18n keys | **PASS** (unused keys = WARN only) |
| 1.4 Content lint | **PASS** |
| 1.5 Shuffle remap | **PASS** (unit + UI quiz 5/5) |
| 1.6 SW / offline | **PASS** (ASSETS fixed; offline reload PASS; update-toast = N-A automated) |
| 1.7 Storage round-trip / v3 boot | **PASS** |
| 1.8 Per-phase acceptance | **PASS** (see notes) |
| 1.9 End-to-end | **PASS** (26/26 browser checks) |

**Part-1 FAILs found & fixed before clean:**
1. `sw.js` missing manifest maskable icons (+ apple `icon-180.png`) → added; CACHE → **v15**
2. Behavior suite revenge fixture used `ts` instead of `date` → test fixed (code OK)
3. E2E initially assumed weeks unlocked without placement → seed `placementDone` + week 1 current
4. E2E journal save without `#btnLong` → fixed in harness
5. E2E settings used wrong attr `data-font` (real is `data-fs`) → harness fixed

---

## 1.1 Automated data integrity

Command: `node scripts/audit-data.mjs`

| Track | weeks | bodiesBilingual | quizzesValid | placementValid |
|-------|------:|:---------------:|:------------:|:--------------:|
| crypto | 10 | true | true | true |
| stocks | 8 | true | true | true |
| invest | 8 | true | true | true |
| futures | 6 | true | true | true |
| forex | 6 | true | true | true |
| spot | 4 | true | true | true |
| bots | 6 | true | true | true |
| binary | 5 | true | true | true |

**PASS.** Crypto W8 2-quiz exception accepted (verbatim).

---

## 1.2 Figure-marker audit

Command: `node scripts/audit-figs.mjs`  
Implemented: **27** · Referenced: **27** · Unresolved: **0** · Orphans: **0**  
**PASS.**

---

## 1.3 i18n orphan finder

Command: `node scripts/audit-i18n.mjs`  
Referenced keys present in `T.en` + `T.ur`: **PASS**  
WARN unused (not referenced by static/dynamic collectors): `courseWeeks`, `exp_*`, `nav_dashboard` (used via tab array + `App.t`), `onb_welcome`, `onb_start`, `pl_ph`, `pretrade_sub`, `startLesson`, `stat_revenge`, `stat_trades`, `yourScore`, `onb_exp_sub` — several are dynamic/`App.t(tabKey)` false-negatives; none missing.

---

## 1.4 Content lint

Command: `node scripts/audit-content.mjs`  
Banned phrases in lesson **bodies** only: **0 hits**  
**PASS.** (Quiz distractors intentionally unscanned.)

---

## 1.5 Shuffle correctness

Unit (`scripts/audit-behavior.mjs`): all-correct via original-index → 100%; reshuffle differs; placement all-correct masters topics.  
Browser: crypto W1 quiz — click `data-o="{correct}"` (original index) after shuffle → score **5/5**.  
Evidence: answers stored as original index in `js/views/course.js` (`data-o="${oi}"`, score vs `q.correct`).  
**PASS.**

---

## 1.6 Service worker & offline

Command: `node scripts/audit-sw.mjs`  
- Every ASSETS path exists on disk: **PASS**  
- Runtime JS + fonts + manifest icons in ASSETS: **PASS** (after adding maskable + 180)  
- CACHE: `masterycap-v15` (bumped for asset fix)  
Browser: go offline → reload → shell boots (`#app-root`/`#splash`/`#tabbar`): **PASS**  
Update toast (throwaway CACHE bump ×2): **N-A** automated this run — code path exists (`SW_UPDATED` message → `#sw-toast`); not re-bumped mid-audit to avoid dirtying v15.

---

## 1.7 Storage round-trip & backward compat

Browser: export wipe import key-equality (`n=8` keys): **PASS**  
v3-era minimal keys only (strip `drillStats`/`streak`/`review`) → reload → tabbar visible, no `pageerror`: **PASS**  
Old trades without `stopPlaced`/`movedStop`: excluded from grade (`isScoredTrade`) — unit **PASS**.

---

## 1.8 Feature acceptance

| Phase | Check | Result | Evidence |
|-------|-------|--------|----------|
| P1 | injectFigures all weeks/langs, no raw `{{fig:` | PASS | audit-behavior; browser W1 has `<svg>` |
| P1 | no h-overflow @375 lesson | PASS | browser evaluate scrollWidth |
| P1 | every week opened in browser | **PARTIAL** | Unit covers all inject; browser sampled crypto W1 only (time). No raw markers anywhere via inject. |
| P2 | 5× each drill family correct | PASS | audit-behavior |
| P2 | hand recompute samples | PASS | sizing_crypto 200, 5000; sizing_forex 0.07, 0.04 |
| P2 | XP daily cap 50 | PASS | awardDrillXp loop → 50 |
| P2 | drills UI | PASS | 5 feedback cycles |
| P3 | n&lt;3 → no expectancy / worstCost | PASS | unit |
| P3 | seeded 9 trades → expectancy/flagged/worstCost | PASS | expectancy≈−9.44; flagged n=6 pl=−110 |
| P4 | Leitner box math | PASS | unit (wrong→box1; correct advances) |
| P4 | streak 2 consecutive days | **N-A** browser | Not Date-mocked this run; logic in `touchStreak` reviewed |
| P5 | 20 seeded chart rounds coherent | PASS | audit-behavior |
| P5 | charts UI opens | PASS | `#chBack` |
| P6 | revenge &lt;30m | PASS | unit with `date` ISO |
| P6 | grade A/B on clean 20 | PASS | unit |
| P6 | unscored excluded | PASS | unit n=5 |
| P7 | glossary 5 terms | PASS | leverage/margin/stop/funding/option |
| P7 | in-lesson term links | **N-A deep** | `linkGlossaryTerms` present; not click-tested this run |
| P8 | font L persists | PASS | settings `fontSize:"L"` |
| Design | zero emoji in UI text | PASS | browser |
| Design | mono / no gradient / safe-area screenshots all screens | **PARTIAL** | CSS system reviewed earlier; full screenshot sweep not archived |

---

## 1.9 End-to-end (Definition of Done)

Harness: `node scripts/audit-e2e.cjs` → **26/26 PASS**

Flow covered: onboard → lesson+figure → shuffled quiz 100% → 5 drills UI → 3 trades (revenge/calm/greed) → progress panels → glossary → settings font → charts → backup round-trip → v3 boot → emoji check → offline reload.

Skipped / honest gaps:
- Full placement UI all-mastered (unit covered; UI not run — 22 Q)
- Daily review UI + streak day-roll
- SW update toast behavioral
- Every track every week visual open
- Certificate / P9+ features (Part 2)

Console: no fatal pageerrors in final checks.

---

## Audit scripts (rerunnable)

```
node scripts/audit-all.mjs          # data+figs+i18n+content+sw+behavior
node scripts/audit-e2e.cjs          # browser E2E (Playwright)
```

---

## Part 1 gate

**CLEAN.** All automated FAILs fixed. Remaining items are N-A/PARTIAL documented above — not silent.  
---

## Part 2 progress (v17) — DONE
P9–P15 shipped. See ROADMAP + CHANGELOG v17.
Honest curriculum stance: CONTENT-GAPS.md (literacy ≠ mastery).

| Phase | Status |
|-------|--------|
| P9 Ops | **DONE** |
| P10 Data | **DONE** |
| P11 Learn | **DONE** — exam/cert, binary gate, gloss mini, search, markers, mistake bank |
| P12 Journal | **DONE** — debrief, cooldown, checklist gate, tag filters |
| P13 Retention | **DONE** — radar/heatmap/habit/freeze/brief/whats-new/notify/iOS/due badge |
| P14 Drills | **DONE** — +swap/carry/roll/multi-step, timed, challenge, ramp |
| P15 a11y | **DONE** — mid-quiz tab confirm, tour, search, reduced-motion/44px/contrast |

`node scripts/audit-all.mjs` + `node tests/smoke.cjs` PASS @ v17.
