# MasteryCap AGENT LOOP — autonomous execution protocol (S2 → S7)

This is not a one-shot prompt. It is a **loop**. Give Cursor this instruction:

> Read `AGENT-LOOP.md` and `LOOP-STATE.md` in the repo root. Execute THE LOOP
> exactly as written, one iteration at a time, until LOOP-STATE says `status: COMPLETE`
> or a HALT condition fires. Never skip the verify or ledger steps.

The agent must re-read `LOOP-STATE.md` at the start of EVERY iteration — it is the
single source of truth for what is done and what is next. Human context may be gone;
the ledger is the memory.

---

## THE LOOP (run this every iteration, in order, no exceptions)

1. **ORIENT** — read `LOOP-STATE.md`. Identify `next_task`. Read the matching phase
   spec below. Read only the files that task touches (listed per phase). Do NOT
   re-read the whole repo.
2. **PRECHECK** — run `node scripts/audit-all.mjs`. If it fails BEFORE you changed
   anything, fixing the audit IS the task for this iteration (record it in the ledger
   as an interrupt task, then continue the loop).
3. **IMPLEMENT** — smallest correct diff for exactly one ledger task. Match existing
   patterns (see INVARIANTS). No drive-by refactors. New user-facing strings go into
   BOTH `T.en` and `T.ur` in `js/i18n.js`.
4. **VERIFY (behavioral, not code-reading)** — serve statically
   (`python3 -m http.server 4178` or `npx serve`), open at 375px width, exercise the
   feature per the task's acceptance list. Check the console: zero errors. Run
   `node scripts/audit-all.mjs` again — all must pass.
5. **SHIP GATE** — if this iteration completes a phase: bump `CACHE` in `sw.js`
   (v25→v26→…), sync `VERSION` file and `APP_VERSION` in `js/settings.js`, add any
   new files to `sw.js ASSETS`, prepend a `CHANGELOG.md` entry, verify the SW update
   toast fires on double reload.
6. **LEDGER** — update `LOOP-STATE.md`: move the task to `done` with one evidence
   line (what was verified, not what was written), set the new `next_task`, bump
   `iteration`. If a decision was made that future iterations need, add it to
   `decisions`.
7. **COMMIT** — `git add -A && git commit -m "feat(sN): <task> [loop iN]"`. Commit
   every iteration (owner said loop may run unattended). Do NOT push.
8. **HALT CHECK** — halt (write reason into ledger `status`) if: (a) a task requires
   violating INVARIANTS, (b) the same task failed verification 3 iterations in a row
   (record the failure honestly, mark task `blocked`, move to next task; if 3 tasks
   are blocked, HALT), (c) all phases done → run FINAL ACCEPTANCE, set
   `status: COMPLETE`.
9. **LOOP** — go to 1.

## INVARIANTS (violating any = bug; halt rather than violate)

- Offline-first static PWA. **No backend, no accounts, no live prices, no LLM, no
  frameworks/bundlers/npm-deps.** GitHub Pages hosting.
- Storage: **additive only.** New keys via `KEYS` in `js/store.js`; never migrate,
  rename, or delete existing keys. v3-era data must still boot the app.
- Design: true-black `#08090A`, single flat accent `#FF6B2C`, Geist + Geist Mono
  (all numerics `.mono` tabular), hairline panels, uppercase micro-labels,
  **zero emoji** (icons come from `js/icons.js` only), reuse existing CSS components
  before writing new CSS.
- Bilingual: every user-facing string in EN + Roman Urdu (technical terms stay
  English — match existing voice).
- Content policy: literacy + risk frameworks. **No tips, signals, win promises, or
  income guarantees.** Sim/graduation copy says "trade-ready, process-measured" —
  markets decide profits. `js/data/course.js` crypto lesson text is verbatim: never
  edit except markers.
- Grading philosophy (the product's soul): **process, not P/L.** A disciplined loss
  passes. A rule-breaking win fails. Anything that inverts this is a critical bug.
- The sim has **no naked-entry path**. Every entry requires a valid stop. Keep it so.

## CURRENT ARCHITECTURE MAP (S1 shipped, v25)

```
js/sim/engine.js      createSession({scenario,seed,balance}) →
                      {state, visible(), price(), enter({dir,riskPct,stop,tp}),
                       moveStop(p), step(), closeManual(), unrealized()}
                      Process grading in processScore(): fails ∈ {over_risk,
                      widened_stop, direction, liquidated, stop_beyond_liq}
js/sim/scenarios.js   SIM_SCENARIOS (8 crypto) + getScenario(id)
                      shape: {id, track, instrument:'perp', name{en,ur}, mission{en,ur},
                              gen:{visible,segments:[{n,drift,vol}],stopHunt?},
                              constraints:{maxRiskPct, dirAllowed?}}
js/views/sim.js       picker → session → debrief; App.openSim()/closeSim();
                      persists KEYS.simTrades (trade records incl. process{pass,fails})
                      and KEYS.simStats ({[scenarioId]:{runs,pass,trades}})
js/candles.js         renderCandles(ohlc,{lines:[{price,color,dash,label}]}) overlays
Engine trade record:  {id,scenarioId,seed,dir,entry,stop,tp,exit,sizeD,lev,riskPct,
                       pl,r,reason,movedStop,overRisk,bars,process}
reasons:              'stop'|'tp'|'manual'|'liquidated'|'session_end'
Other systems:        graduation-relevant: exam in js/exam.js, discipline grade in
                      js/discipline.js, retention/streak in js/retention.js,
                      tracks registry js/data/tracks.js (12 tracks, getTrack enriches)
```

---

# PHASE SPECS (the work; execute in order)

## S2 (→ ship as v26) — Simulator completeness
Files: `js/sim/engine.js`, `js/views/sim.js`, `js/views/journal.js`, `js/i18n.js`, `css/app.css` (minimal).

Tasks (each = one loop iteration unless trivial):
- **S2.1 Limit orders.** Engine: `placeLimit({dir, price, riskPct, stop, tp})` —
  pending order object; on each step, fill when bar range touches limit price
  (long: bar.l ≤ price; short: bar.h ≥ price), converting to a position using the
  same mandatory-stop validation (validate stop side vs LIMIT price at placement).
  `cancelLimit()`. UI: order-type segmented control (Market/Limit), pending-order
  strip with cancel. Acceptance: place limit below price → step until fill →
  position opens at limit price; cancel works; stop still mandatory at placement.
- **S2.2 Partial close.** Engine: `closePartial(fraction)` (0.25/0.5 buttons in UI)
  — realizes that fraction of the position at current price (with slippage+fee),
  keeps remainder with same stop; realized part logged into the final trade record
  as `partials:[{price,fraction,pl}]`; R computed against original riskD.
  Acceptance: 50% close → uP/L halves, balance credited, final record contains partial.
- **S2.3 Play speeds.** 1x/2x/4x segmented (600/300/150ms). Persist last choice in
  memory only (not storage). Acceptance: visible speed change, no timer leaks
  (switching tabs stops the interval — hook into `closeSim`).
- **S2.4 Paper/Live journal toggle.** `js/views/journal.js`: `.seg` toggle
  Paper | Live above history. Live = existing `trades`; Paper = `simTrades`
  rendered with the same trade-row component + process pass/fail tag. Paper view
  is read-only (no delete). Insights stay live-only. Acceptance: toggle flips lists;
  paper rows show scenario reason + process tag; zero writes to `trades`.
- **S2.5 Debrief upgrade.** Per-trade R timeline (already have r per trade), session
  process summary line ("2/3 process pass"), and a "repeat with same seed" button
  (`startSession(sc.id, seed)`) for deliberate practice on the identical tape.
  Acceptance: same-seed rerun produces identical bars.

## S3 (→ v27) — Process grading + graduation gates + certificates
Files: new `js/graduation.js`, `js/views/course.js`, `js/views/dashboard.js`,
`js/exam.js` (read only its API), `js/discipline.js` (read), `js/i18n.js`.

- **S3.1 `js/graduation.js`.** Per-track requirement table:
  ```
  trading tracks (crypto, futures, forex, stocks):
    exam passed + ≥20 process-graded sim trades in that track's scenarios
    + ≥80% process-pass over the latest 10 + 0 'liquidated' in latest 10
  invest, spot: exam passed + portfolio sim adherence pass (S5 — until S5 ships,
    show requirement as "coming: portfolio practice" and gate on exam only)
  foundations, macro, tax, bots, binary: exam passed (binary also its gate quiz)
  ```
  API: `gradStatus(trackId)` → `{ready:boolean, met:[], missing:[], evidence:{...}}`.
  Storage: `KEYS.graduation` = `{[trackId]:{gradAt:ISO, evidence}}` (additive key).
  NOTE: only crypto has sim scenarios until S4 — for futures/forex/stocks the sim
  requirement counts scenarios of that track; show "requires S4 scenarios" state
  gracefully (missing item text), never a crash.
- **S3.2 Learn UI integration.** Track page: "Graduation" panel listing met/missing
  with live counts (e.g. "Sim trades 12/20"). When `ready`, "Graduate" button →
  writes graduation, awards +200 XP, opens certificate.
- **S3.3 Certificate rewrite.** Reuse the existing cert-PNG canvas path (`js/exam.js`
  has one) → new certificate: "TRADE-READY — process-measured", name, track, date,
  evidence line (exam %, sim trades, process rate), and the honesty line:
  "Certifies process competence. Markets decide outcomes." Bilingual by app lang.
- **S3.4 Campus ladder.** Home: per-track path chips show 3-stage state
  Learn → Practice → Graduate (icons: learn/target/circleCheck) based on
  weekStatus/simStats/graduation. Acceptance: seeded states render all three stages.

## S4 (→ v28) — Scenario packs: futures / forex / stocks
Files: `js/sim/scenarios.js`, `js/sim/engine.js` (instrument modes), `js/i18n.js`.

- **S4.1 Instrument modes in engine.** `scenario.instrument`:
  `'perp'` (existing) · `'futures'` (tick math: `spec:{tickSize,tickValue,margin}` on
  scenario; size in contracts = floor(riskD / (ticksToStop × tickValue)); reject
  entry if 0 contracts — that IS a lesson: err `size_zero` with i18n string) ·
  `'forex'` (pip math: lots from pip value; no liquidation, margin-stop only) ·
  `'stock'` (shares, no leverage, no funding).
  Acceptance: hand-verify one sizing per mode in console (documented in ledger).
- **S4.2 Packs.** 6 scenarios each: futures (tick discipline, margin distance,
  roll-week vol, size-zero trap, trend day, chop day), forex (session open vol,
  news-spike spread widening — simulate via 3 bars of 4x vol + double slippage,
  carry hold, correlation note mission, range fade, trend pullback), stocks
  (gap open, earnings-vol proxy, trend swing, support flip, thin-liquidity wide
  slip, no-leverage sizing). Missions bilingual, process-first, each with
  constraints. Wire picker to group scenarios by track (section labels).
- **S4.3 Graduation hookup.** S3's per-track sim counts now real for these tracks.

## S5 (→ v29) — Portfolio simulator (Invest + Spot)
Files: new `js/sim/portfolio.js`, `js/views/sim.js` (new mode) or new view,
`js/graduation.js`, `js/i18n.js`.

- Seeded monthly bars, 24 months, for 3 abstract assets (broad-index, single-stock,
  cash-yield) with one embedded crash window (−30% over 3 months) and recovery.
- Player sets plan first: allocation %, monthly DCA amount, rebalance rule
  (none/quarterly). Then months step; at 4 decision events (crash entry, crash
  bottom, euphoria spike, boring stretch) a choice sheet appears:
  stick-to-plan / add extra / sell down. **Adherence = sticking or pre-planned
  adds; panic-sell or unplanned doubling = violation.**
- Debrief: plan-adherence pass/fail (process), final value vs plan-followed
  baseline, compounding note. Feeds `graduation` for invest/spot.
- Storage: results into `simStats` under `portfolio_invest` / `portfolio_spot` ids.
- Acceptance: panic-sell at crash → adherence fail even if final value is up;
  stick-through-crash → pass.

## S6 (→ v30) — School copy sweep + income-promise lint
Files: `js/i18n.js`, `js/views/*`, `scripts/audit-content.mjs`, `README.md`, `GUIDE.md`.

- Sweep every screen's copy to school framing: onboarding ("zero to trade-ready"),
  campus, graduation panels, how-to hub link from graduation ("ready → open a real
  account, start micro size"), sim honesty notes verified present.
- Extend `scripts/audit-content.mjs` banned list to catch income promises in ANY
  user-facing string (i18n + lesson bodies + missions): `guaranteed profit|can't
  lose|risk-free profit|100% win|sure shot|pakka profit|kamai pakki|earn guaranteed|
  become rich|get rich`. Quiz distractor options remain exempt.
- README/GUIDE: describe the school (Learn → Practice → Graduate), the sim, the
  honest claim. Acceptance: audit-content passes; manual read of onboarding +
  graduation + cert copy confirms no earn promise.

## S7 (→ v31) — Sim audits + smoke + final hardening
Files: new `scripts/audit-sim.mjs`, `scripts/audit-all.mjs` (register it),
`tests/smoke.cjs`.

- `audit-sim.mjs` asserts (import engine directly in node):
  determinism (same seed twice → identical bars); no-stop and wrong-side rejection;
  liq only when lev>1 and matches formula `entry*(1∓1/lev±MMR)`; limit fill price
  correctness; partial-close accounting sums to full-close equivalent (±fees);
  process fails for over_risk/widened_stop/direction/liquidated; futures size_zero
  rejection; forex pip sizing example; portfolio panic-sell → adherence fail.
- Extend smoke: open sim, run one scripted session (enter with stop, 10 steps,
  close), assert simTrades grew and console clean; open journal Paper tab.
- Full-suite green. Ship v31.

# FINAL ACCEPTANCE (run when all phases done; results go in ledger verbatim)

Fresh profile at 375px, offline after first load, zero console errors throughout:
onboard → complete a Foundations week → crypto: pass one quiz → run sim scenario
(process pass) + one deliberate over-risk run (process fail shown) → limit order
fill → partial close → journal Paper tab shows records → graduation panel counts
correct → (if seeded to ready) graduate → certificate PNG downloads with honesty
line → portfolio sim: stick-through-crash passes → export backup → wipe → import →
all state back → `node scripts/audit-all.mjs` + `node tests/smoke.cjs` green.
Report honestly in `LOOP-STATE.md`, including anything failed/skipped/blocked.
