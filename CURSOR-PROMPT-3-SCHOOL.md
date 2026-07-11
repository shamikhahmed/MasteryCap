# MasteryCap — Cursor Prompt #3: The School Build (v25+)

Paste below the divider into Cursor. Prerequisites: read `CURSOR-MASTER-PROMPT.md`
(all rules bind), `ROADMAP.md`, `CHANGELOG.md`, vault note. App is at v24, all audits
green (`node scripts/audit-all.mjs`), deployed to GitHub Pages.

---

## The pivot (owner-approved 2026-07-11)

MasteryCap becomes a **complete school: zero → trade-ready**, for anyone who installs
it. Owner decisions, locked:

1. **Claim = "trade-ready, process-measured."** The app certifies process: sizing,
   stops, discipline, venue know-how, N clean simulated trades. Copy NEVER promises
   income or profits — markets decide those. Any copy implying "finish course → you
   will earn" is a bug. "Capable" always means demonstrated process.
2. **Full in-app paper-trading simulator** — the rep machine that makes "capable" true.
3. **Hard graduation gates** on every track. Certificates must mean something.
4. **All tracks** get the treatment (trading tracks → sim; investing tracks →
   portfolio sim; reading tracks → exam-gated).
5. **Still no backend, no accounts, GitHub Pages PWA.** Everything below is offline.
   All prior locks hold (no live prices, no LLM, additive storage, design system,
   bilingual EN/Roman-Urdu, zero emoji, crypto lesson text verbatim).

## Architecture additions (all additive)

```
js/sim/engine.js      market session core (see spec)
js/sim/scenarios.js   per-track scenario packs
js/sim/portfolio.js   investing-variant simulator
js/views/sim.js       simulator UI
js/graduation.js      gate logic + trade-ready certificates
KEYS additions: simTrades, simSessions, simStats, graduation   (never touch old keys)
```

## Simulator spec (S1/S2)

**Engine (`js/sim/engine.js`)** — deterministic, seeded, offline:
- Market feed: reuse `js/chartgen.js` seeded OHLC with labeled structures; stream
  candle-by-candle (step button + play speeds 1x/2x/4x). No live data ever.
- Account: per-session paper balance (default from a per-track config), fees + spread
  + slippage model (simple bps config per instrument class).
- Orders: market + limit. **A stop-loss is mandatory to submit any entry** — the UI
  literally has no naked-entry path (this is the pedagogy). Optional take-profit.
- Position management: move stop (allowed, logged as `movedStop`), partial close,
  close-all. For the perps/futures scenario class: leverage from size (journal math),
  liquidation price computed and DRAWN on the chart; hitting it ends the trade with
  the standard lesson-linked debrief.
- Instrument modes: crypto-perp (leverage/liq/funding tick per N candles), futures
  (tick value), forex (pips/lots), stock (shares, no leverage).
- Every closed sim trade auto-writes to `simTrades` with the full journal shape +
  `scenarioId`, `processFlags` — NEVER into real `trades`.

**Scenarios (`js/sim/scenarios.js`)** — each = `{id, track, mission:{en,ur},
generatorCfg, constraints, passCriteria}`:
- Missions are process briefs: "Uptrend pullback: long only, risk ≤ 1%, stop beyond
  structure, hold to target or stop — no mid-trade improvisation."
- Pass criteria are **process-based, not P/L-based**: stop placed pre-entry, size
  within risk cap, direction matched mission, no override of cool-down, held plan.
  A losing trade that followed process PASSES; a winning YOLO trade FAILS — surface
  this explicitly in the debrief copy (it is the single most important lesson).
- Packs: crypto 12 scenarios, futures 8, forex 8, stocks 8 (spot mode). Reuse chartgen
  structures (trend legs, ranges, S/R flips, stop-hunt wicks, news-gap variant).

**UI (`js/views/sim.js`)**: chart top (candles.js), order panel bottom (design-system
fields, mono numerics), position strip with live P/L + R, liquidation line when
levered, session-end debrief sheet (process checklist result + journal-style summary),
entry points from Home campus + Learn track page + Journal "Paper desk" tab.
Journal view gains a Paper/Live segmented toggle (paper reads `simTrades`).

## Portfolio simulator (S5, `js/sim/portfolio.js`)
For Invest + Spot tracks: build a plan (allocation %, DCA amount/frequency, rebalance
rule) → simulate 12–36 seeded months (monthly bars incl. a crash year variant) →
decisions at events (crash: stick/add/panic-sell prompts) → debrief on plan adherence
+ compounding math. Pass = adherence, not returns.

## Graduation gates (S3, `js/graduation.js`)
Per-track config, hard-locked "Graduate" status:
- Trading tracks (crypto, futures, forex, stocks, bots-n/a): exam pass (existing) +
  ≥20 sim trades in that track's scenarios + process grade ≥ B over last 10 +
  zero hard violations (naked entry impossible by design; overrides/oversize count).
- Invest/Spot: exam + portfolio sim completed with adherence pass.
- Foundations/Macro/Tax/Binary/Bots: exam pass (+ binary keeps its gate quiz).
- Certificate rewrite: "Trade-Ready — process-measured" + one honest line: "This
  certifies process competence. Markets decide outcomes." Optional stat line (owner
  approved framing): shown at graduation, cite that most new retail traders lose
  money in year one — ready ≠ guaranteed.
- Home campus ladder shows per-track: Learn → Practice → Graduate with live status.
- `graduation` key stores per-track status + evidence counts.

## Phases (ship each with SW CACHE + VERSION + APP_VERSION + CHANGELOG + vault note)

- **S1 (v25):** sim engine core + crypto scenario pack + minimal UI (step, market
  orders, mandatory stop, close). Behavioral audit: seeded session replays
  deterministically; naked entry impossible; liq price math verified by hand for 2 cases.
- **S2 (v26):** full UI polish, limit orders, partials, play speeds, auto-journal +
  Paper/Live journal toggle, debrief sheet.
- **S3 (v27):** process grading + graduation gates + certificate rewrite + campus
  ladder integration.
- **S4 (v28):** futures/forex/stocks scenario packs (instrument modes).
- **S5 (v29):** portfolio simulator for Invest/Spot.
- **S6 (v30):** copy sweep — every screen reflects school framing ("zero to
  trade-ready"); how-to hub linked from graduation ("ready → open real account,
  start micro"); bilingual throughout; content lint extended to catch income-promise
  phrasing (`earn guaranteed|profit pakka|kamai pakki`...).
- **S7 (v31):** audits: `scripts/audit-sim.mjs` (determinism, mandatory-stop, liq
  math, process-pass logic), smoke test extended (one full sim session + one
  graduation), AUDIT refresh, Lighthouse re-run.

## Definition of done
Fresh install: onboard → Foundations → reach crypto → complete weeks → pass exam →
run 20 sim trades (mix of process-pass losses and fails) → graduate → certificate
downloads with honest copy → journal Paper tab shows sim history → all offline,
zero console errors, audits + smoke green. Report honestly, failures included.
