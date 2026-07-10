# MasteryCap — Roadmap v4 → v6

Goal: close the learning-loop gap. Shell, design, and curriculum breadth exist (v3);
what's missing is **visuals, practice, feedback, and retention**. Eight phases, ordered
so data safety and exploit fixes land first, heaviest build last.

Ground rules for every phase:
- Bump `CACHE` in `sw.js`, add a `CHANGELOG.md` entry, verify in preview (zero console
  errors + screenshots) before calling it done.
- No live data, no backend, no accounts — offline-first stays.
- Content policy unchanged: frameworks and risk control; no tips, signals, or win promises.

---

## Phase 0 — Hygiene & data safety (do first)

**0.1 Shuffle quiz + placement options at render.**
Problem: correct answers cluster on option A; retakes repeat order — pattern-passing.
- Implementation: Fisher–Yates shuffle of option indices per question at render time in
  `js/views/course.js` (`drawQuiz`, `drawPlacement`). Store an order array in view state
  `S.quizOrder[qi] = [2,0,1]`; map clicks back to original indices so scoring and
  `correct` stay untouched. Reshuffle on every quiz start/retake.
- Test: retake same quiz twice → different option order; scoring still correct;
  explanations still attach to the right options.

**0.2 Backup / restore UI.**
Problem: `store.js` has `exportAll()/importAll()` but no UI; browser-data clear wipes months.
- Implementation: settings sheet opened from the dashboard avatar. Export = JSON blob
  download `masterycap-backup-YYYY-MM-DD.json` (works from iOS share sheet). Import =
  `<input type="file">`, validate namespace keys before writing, confirm overwrite.
- Test: export → wipe localStorage → import → identical state (trades, course, profile).

**0.3 Update toast.** SW `activate` posts a message; app shows "Updated to v4 — reload"
pill. Prevents stale-build confusion that already bit us twice.

**0.4 Urdu QA doc.** `URDU-REVIEW.md` checklist; have a native-speaker friend review 2–3
weeks per track; fix list lands as content patch. (Human task, app-independent.)

---

## Phase 1 — Lesson diagrams (worst gap)

Inline SVG figures, design-system native (currentColor, CSS vars, `.fig` panel).

- New `js/figures.js`: parametric SVG builders, each 30–60 lines. Initial set (~24):
  - Crypto/charting: candle anatomy (OHLC labeled), engulfing pattern, pin bar at level,
    HH/HL vs LH/LL trend structure, range box, S/R zone flip (role reversal), EMA lag,
    RSI divergence, ATR-based stop distance, liquidity sweep / equal-highs stop hunt,
    funding-rate crowding.
  - Options: long call / long put payoff, covered call, vertical spread payoff,
    intrinsic vs extrinsic premium split, theta decay curve, IV crush before/after.
  - Futures/forex: contango vs backwardation term structure, margin waterfall
    (initial→maintenance→liquidation), session clock (Asia/London/NY overlap),
    correlated-pairs = one theme.
  - Bots/binary/invest: grid-bot payoff (many small wins, one trend loss),
    martingale ruin curve, binary breakeven vs payout curve, expense-ratio
    compounding drag, IPO lockup timeline.
- Wiring: lesson bodies get `{{fig:candle-anatomy}}` markers; `drawWeek()` replaces
  markers via `figures.render(name, lang)`. Captions bilingual.
- Test: every lesson renders, no horizontal overflow at 375px, dark-theme consistent.

## Phase 2 — Practice drills (turn reading into skill)

- New `js/drills.js` (generators + checkers) + `js/views/drills.js` (UI). Entry points:
  dashboard quick-action + card on Learn home.
- Drill types (seeded random parameters, worked solution shown after answer):
  1. Position sizing — crypto % variant, forex lots variant, futures contracts variant.
  2. Options: max loss / breakeven / spread risk from strike+premium.
  3. Binary breakeven win-rate from payout % (reinforces the track's core math).
  4. R-multiple: entry/stop/target → R; win-rate needed at that R to break even.
  5. Pip/tick value conversions.
- Scoring: ±1% tolerance numeric input; +5 XP per correct, daily XP cap 50;
  `mc.drillStats = {attempts, correct, byType}`.
- Progress tab gains drill-accuracy bar per type.
- Test: 20-drill session each type; solutions arithmetically verified.

## Phase 3 — Journal insights (make the journal pay rent)

- New `js/insights.js`, pure functions over `trades[]`:
  win rate + net P/L per emotion; cost of flagged (revenge/greed) trades; per-pair
  stats; avg win vs avg loss + expectancy; longest win/loss streaks; day-of-week table.
- Guard: an insight renders only when its slice has n ≥ 3 trades (no noise claims).
- Render: "Insights" panel on Progress (bullet rows, mono numbers, up/down colors);
  single worst-cost insight surfaces as one line on the dashboard.
- Test: seeded datasets with known answers; verify each computed line.

## Phase 4 — Streaks + daily review (retention loop)

- Streak: any qualifying action per local day (lesson opened, quiz submitted, drill
  answered, trade logged, review completed) → `mc.streak = {lastDay, current, best}`.
  Displayed on dashboard with flame icon (line-icon, no emoji).
- Daily review: 3 questions/day sampled from completed/mastered weeks across all tracks.
  Leitner-lite spaced repetition: `mc.review[qKey] = {box:1-3, due}`; wrong → box 1
  (resurfaces next day), right → box+1 (due in 3/7 days). qKey = `track:week:index`.
  +15 XP on completion.
- Dashboard card: "Daily review · 3 questions · streak N".
- Test: complete review two consecutive days → streak 2; wrong answer resurfaces sooner.

## Phase 5 — Chart-replay drills (heaviest build, biggest payoff)

- 5a `js/candles.js`: SVG candlestick renderer (OHLC array → chart, up/down colors,
  wicks, volume optional). Reused later anywhere.
- 5b Synthetic data generator: seeded RNG price paths (GBM base) with injected,
  labeled structures — trend legs, ranges, S/R touches, engulfing at level, stop-hunt
  wick. Infinite drills, zero bundled data files, still offline.
- 5c Drill modes:
  - "Trend, range, or reversal?" (classify last 30 candles)
  - "Tap the resistance zone" (tap/click a price band; generator knows truth band)
  - "Engulfing at support — higher-probability next move?" (MCQ)
- Scoring + XP same as Phase 2; accuracy tracked per mode.
- Test: label correctness spot-checked against generator ground truth across 50 seeds.

## Phase 6 — Discipline score

- Journal form adds two toggles (max, keep friction low): "stop placed before entry",
  "moved my stop". Auto-detected: revenge candidate = entry within 30 min of a losing
  trade (timestamps); oversized = planned risk (|entry−stop|/entry × size) > user max %.
- Rolling 20-trade discipline grade A–F on dashboard; grade breakdown on Progress.
- Trade model additions: `stopPlaced:bool, movedStop:bool` (optional, default null —
  old trades excluded from the score, no migration needed).
- Test: seeded trade sets produce expected grades.

## Phase 7 — Glossary

- `js/data/glossary.js`: ~120 terms, EN + Roman Urdu definitions, tagged by track.
- Search sheet from Learn header icon (fuzzy substring, mono list rows).
- 7b (optional): lesson render auto-links known terms → tap opens definition popover.

## Phase 8 — Settings & polish

- Settings sheet (avatar): edit name, language, export/import (P0.2 lives here),
  font-size S/M/L (CSS var multiplier), haptics toggle, danger-zone reset
  (double-confirm), version + changelog link.
- Accessibility pass: verify t3/t4 contrast against WCAG AA at small sizes; bump values
  if failing.

---

## Order & rationale

P0 → P1 → P2 → P3 → P4 → P6 → P7 → P8 → P5.
Safety/exploits first; diagrams fix the worst learning gap; drills+insights build the
practice/feedback loop; streak+review builds retention; discipline score ties the app's
thesis together; glossary+settings are quality; chart replay last because it's the
largest isolated build and everything else compounds while it waits.
(P5 can jump the queue if chart practice becomes the priority.)

## Estimates (working sessions)

P0: 1 · P1: 1–2 · P2: 1 · P3: 1 · P4: 1 · P5: 2–3 · P6: 1 · P7: 1 · P8: 1 → ~10–12 total.

## Data-model additions (all localStorage, namespaced)

`mc.drillStats` · `mc.review` · `mc.streak` · trade fields `stopPlaced/movedStop` ·
settings `fontSize/haptics`. All additive — no migrations, old data keeps working.

## Explicit non-goals

Live prices (breaks offline-first) · cloud sync/accounts (breaks no-backend) ·
new curriculum tracks before the loop exists (depth > breadth) · monetization.
