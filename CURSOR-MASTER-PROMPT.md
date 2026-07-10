# MasteryCap — Master Prompt for Cursor (Roadmap v4 → v6 execution)

Copy everything below this line into Cursor as the opening message of a new session in
this repo. It contains full project context, hard rules, the complete phase plan, and
the working process. Follow it exactly.

---

You are working on **MasteryCap**, a finished-and-shipped v3 personal PWA in this repo.
Your job is to execute the improvement roadmap in `ROADMAP.md`, phase by phase, without
breaking or regressing anything that already works. Read this entire prompt, then read
`ROADMAP.md`, `CHANGELOG.md`, and `README.md` before writing any code.

## 1. What this app is

A bilingual (English / Roman Urdu) trading & investing education PWA combining:
- **Learn** — 8 fully-live curriculum tracks (Crypto & Perps 10 weeks, Stocks & Options 8,
  Investing: PSX & Beyond 8, Futures 6, Forex 6, Spot vs Derivatives 4, Bots & Copy
  Trading 6, Binary Options 5 with a permanent risk-warning banner). Each track has
  bilingual lessons, quizzes (70% to unlock the next week, unlimited retakes), a
  placement test (≥60% per topic marks that week "mastered"), and XP (+50 quiz pass,
  +10 fail, +100 placement).
- **Journal** — position-sizing risk calculator (risk $ = balance × risk%; position
  size = risk $ ÷ stop-distance%; leverage = size ÷ balance) + trade log with 5
  emotional-state tags (calm / fomo / revenge / greed / bored; revenge+greed are
  "flagged").
- **Home** — equity-curve hero computed from journal P/L, stat strip, daily pre-trade
  checklist.
- **Progress** — equity curve, cumulative win-rate, emotion frequency, weeks completed.

It is for the owner and 1–2 friends. **No backend, no accounts, no billing, no live
market data — fully offline-first.** All data is localStorage under the `masterycap:`
namespace via `js/store.js`. Hosting is GitHub Pages (static, no build step).

## 2. Architecture (do not restructure)

```
index.html                 shell: splash, #app-root, #tabbar, #grain overlay
css/app.css                the entire design system (see §3)
sw.js                      service worker — offline cache; CACHE version string gates updates
manifest.webmanifest       PWA manifest
fonts/                     self-hosted Geist 400/500/600/700 + Geist Mono 500/600 (woff2)
icons/                     PWA icons; generate_icons.py regenerates them (pure python, no deps)
js/store.js                localStorage wrapper: store.get/set/remove, exportAll/importAll, KEYS
js/i18n.js                 T{en,ur} UI strings + tr(lang,key)
js/icons.js                icon(name,{size,cls,sw}) → inline SVG line icons; TRACK_ICON map
js/app.js                  App object: state, router, nav, onboarding, splash boot,
                           helpers (money, countUp, sparkline, haptic)
js/views/dashboard.js      Home tab
js/views/course.js         Learn tab: track rail, week list, lesson, quiz, placement
js/views/journal.js        Journal tab
js/views/progress.js       Progress tab
js/data/tracks.js          TRACKS registry (8 entries) + getTrack(id)
js/data/course.js          CRYPTO_WEEKS + CRYPTO_PLACEMENT  ← PORTED VERBATIM, see §5
js/data/{stocks,invest,futures,forex,spot,bots,binary}.js   other tracks, same shape
```

ES modules, no framework, no bundler, no npm dependencies. Keep it that way — any
"let's add React/Vite/Tailwind" impulse is wrong for this project.

### Data shapes (must stay backward-compatible)

```js
// week: { id:Number, title:{en,ur}, body:{en:HTMLString, ur:HTMLString},
//         quiz:[{ q:{en,ur}, opts:{en:[...], ur:[...]}, correct:Number, explain:{en,ur} }] }
// placement item: { topic:weekId, q:{en,ur}, opts:{en,ur}, correct:Number }
// trade: { id, date:ISO, pair, direction:'long'|'short', leverage, size,
//          entry, stop, exit, pl:Number, emotion, notes }
// course progress (per track, stored under KEYS.course as {trackId:{...}}):
//   { placementDone:Bool, weekStatus:{[weekId]:'locked'|'current'|'completed'|'mastered'}, xp:Number }
// KEYS: profile, onboarded, settings{lang}, balance, trades, course, checklist
```

New features must only ADD keys/fields (e.g. `mc drillStats`, `review`, `streak`,
optional trade fields). **Never migrate or rewrite existing stored data.** Old data must
keep working untouched.

## 3. Design system — hard rules

The look is deliberate: **Bloomberg-terminal precision × Geist/Linear software polish**.
It was rebuilt specifically so the app does NOT look like a generic AI-generated app.
Preserve it.

- True-black `#08090A` background; surfaces `#101215/#15181C/#1B1F24`; hairline borders
  `rgba(255,255,255,0.06–0.16)`; text ramp `--t0…--t4`.
- **One accent**: `#FF6B2C` flat orange. No gradients on buttons. Up `#16C784`,
  down `#EA3943`, warn `#F5A623`.
- Typography: self-hosted Geist; **every number (money, %, leverage, counts) uses
  Geist Mono with tabular-nums** (`.mono` class). Uppercase 11px letter-spaced
  micro-labels for section headers (`.slabel`, `.ph-t`).
- **Zero emoji anywhere in the UI.** All glyphs come from `js/icons.js` (24×24 line
  icons, stroke 1.75, currentColor). Add new icons there in the same style.
- Components already exist: `.panel`, `.row-item`, `.btn/.btn.accent/.secondary/.ghost`,
  `.pill`, `.seg`, `.note-box.warn/.err`, `.opt` with `.opt-key` A/B/C letter chips,
  `.week-row`, `.stat-strip`, `.check-row`, `.tabbar`. Reuse them before inventing new CSS.
- Motion: restrained. `--spring` and `--out` easings exist; screen-in animation exists;
  press-scale on buttons. No bouncing carnival.
- All UI strings bilingual via `js/i18n.js` — every new user-facing string gets an
  `en` and `ur` entry. Roman Urdu (Latin script), direct voice, technical terms stay
  English (see existing strings for tone).

## 4. Content policy — non-negotiable

The curriculum teaches **risk control, sizing math, incentive literacy, and evaluation
frameworks**. It must never contain: stock/coin tips or picks, buy/sell signals, win-rate
promises, "this strategy prints money" claims, or personalized financial advice. The
Binary Options track keeps its warning banner and harm-reduction framing. The Bots track
keeps its incentive-skepticism framing. If a task seems to require breaking this, stop
and ask the owner instead.

## 5. Verbatim-content rule

`js/data/course.js` (Crypto track) was ported verbatim from the owner's original
prototype. **Do not edit its lesson text, quiz questions, answers, or explanations**
except to insert `{{fig:...}}` diagram markers (Phase 1). Other tracks' content may be
lightly patched for errors, but never regenerated wholesale.

## 6. Working process — every phase, every time

1. Work **one phase at a time**, in roadmap order (P0 → P1 → P2 → P3 → P4 → P6 → P7 →
   P8 → P5). Do not start the next phase until the current one passes its checks.
2. Before coding: re-read the phase spec in `ROADMAP.md` and the files you'll touch.
3. Build incrementally; keep the app runnable at every commit.
4. **Verify in a real browser** (`npx serve .` or `python3 -m http.server`) at 375px
   mobile width: exercise the feature, check the console for errors, check the affected
   tabs still work, verify offline still works after a reload (service worker).
5. **Bump the `CACHE` version string in `sw.js`** (v3 → v4 → …) in ANY commit that
   changes cached assets, and add new files to its `ASSETS` list. Forgetting this ships
   stale builds to installed clients — it has already caused bugs twice.
6. Add a `CHANGELOG.md` entry per phase.
7. Never delete or rename existing storage keys, exported functions, or CSS classes
   without checking every usage.
8. Commit per phase with message `feat(pN): <summary>`. Do not push unless asked.

### Known pitfalls (learned the hard way)
- The service worker aggressively caches; during development unregister it or hard-reload,
  and always test the update path (old SW → new SW) before finishing a phase.
- `course.js` view keeps transient state in a module-level `S` object; returning to the
  Learn tab resets terminal sub-views (`placementResult` → `home`). Preserve that behavior.
- Quiz/placement scoring compares against `q.correct` as an index into the ORIGINAL
  opts array. Phase 0's shuffle must remap displayed order → original index (store the
  permutation, never mutate the data module).
- The equity curve derives its baseline as `balance − ΣP/L`; editing the balance
  retroactively shifts the curve. Known/accepted; don't "fix" without asking.
- iOS Safari: `viewport-fit=cover` + safe-area insets are already handled in CSS vars
  `--st/--sb`; keep new fixed-position UI inside them.

## 7. The phases (full specs live in ROADMAP.md — this is the contract)

- **P0 Hygiene:** per-render Fisher–Yates option shuffle for quizzes AND placement
  (remap to original indices for scoring; reshuffle each attempt). Backup/restore UI in
  a settings sheet opened from the dashboard avatar: export = JSON file download named
  `masterycap-backup-YYYY-MM-DD.json`; import = file input + key validation + explicit
  overwrite confirm. SW "updated — reload" toast. Acceptance: retakes show shuffled
  options with correct scoring; export→wipe→import round-trips identical state; update
  toast fires when CACHE bumps.
- **P1 Diagrams:** `js/figures.js` with ~24 parametric SVG figures (list in ROADMAP);
  `{{fig:name}}` markers in lesson bodies replaced at render in `drawWeek()`; bilingual
  captions; `.fig` panel styling; add file to SW assets. Acceptance: every lesson
  renders its figures at 375px with no overflow, colors from CSS vars only.
- **P2 Drills:** `js/drills.js` generators + checkers (sizing crypto/forex/futures,
  options max-loss/breakeven, binary breakeven win-rate, R-multiples, pip/tick value),
  numeric answers with ±1% tolerance, worked solution after each answer, +5 XP per
  correct with a 50 XP/day cap, `drillStats` storage, drill-accuracy bars on Progress.
- **P3 Insights:** pure functions in `js/insights.js` (win-rate & net P/L per emotion,
  flagged-trade cost, per-pair stats, expectancy, streaks, day-of-week); render on
  Progress; one worst-cost line on Home; every insight requires n ≥ 3 trades in its slice.
- **P4 Retention:** daily streak (any qualifying action; `streak{lastDay,current,best}`)
  + daily review of 3 questions sampled from completed/mastered weeks with Leitner-lite
  boxes (`review{qKey:{box,due}}`, wrong→box1/next day, right→box+1/3d/7d), +15 XP.
- **P6 Discipline score:** two optional journal toggles (stop placed / moved stop),
  auto-detected revenge candidate (entry <30 min after a loss) and oversizing (planned
  risk from entry/stop/size vs balance), rolling 20-trade A–F grade on Home. Old trades
  (null fields) are excluded, never migrated.
- **P7 Glossary:** `js/data/glossary.js` (~120 bilingual terms tagged by track) +
  search sheet from the Learn header.
- **P8 Settings & a11y:** settings sheet consolidating name/language/font-size (S/M/L
  CSS multiplier)/haptics toggle/backup-restore/reset (double-confirm)/version; WCAG AA
  contrast check on `--t3/--t4` text, adjust if failing.
- **P5 Chart replay (last, biggest):** `js/candles.js` SVG candlestick renderer; seeded
  synthetic OHLC generator with injected labeled structures (trends, ranges, S/R touches,
  engulfing-at-level, stop-hunt wicks); drill modes "trend/range/reversal?",
  "tap the resistance zone", pattern MCQs; scored like P2.

Explicit non-goals — reject even if they seem like improvements: live price feeds,
backend/cloud sync/accounts, new curriculum tracks, monetization, frameworks/bundlers,
emoji, gradient buttons.

## 8. Definition of done (whole job)

All phases merged; `CHANGELOG.md` documents each; SW cache at final version; a clean
first-run (fresh profile) can: onboard → see diagrams in lessons → take a shuffled
placement → pass a quiz → do 5 drills → log 3 trades → see insights + discipline grade →
complete a daily review → export a backup → wipe → import it back — all offline after
first load, zero console errors at 375px mobile width. When you believe the job is done,
run that exact end-to-end script yourself and report the results honestly, including
anything that failed or was skipped.
