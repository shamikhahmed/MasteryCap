# LOOP-STATE — MasteryCap agent ledger
# Single source of truth. Re-read every iteration.

status: RUNNING
iteration: 3
phase: S2
next_task: S2.4
version_on_disk: v25

## done
- S1: Paper sim engine + crypto scenarios + sim view (on disk as v25; committed as loop i0 baseline)
- S2.1 Limit orders: placeLimit/cancelLimit + Market/Limit UI + pending strip
- S2.2 Partial close: closePartial(0.25/0.5) + UI buttons + partials on trade record
- S2.3 Play speeds: 1x/2x/4x (600/300/150ms) memory-only; stopSimPlayback on leave

## blocked
(none)

## decisions
- LOOP-STATE.md created at loop start (was missing).
- Uncommitted S1/v25 work committed as i0 before S2.1.
- Do not push (owner rule).
- Limit fill price = exact limit (no slip on fill); stop validated vs limit price at placement.
- Partial close: R uses original riskD; partials[] on final trade; remaining keeps same stop.
- Play speed lives in module S.playSpeed only (not storage). stopSimPlayback hooked in closeSim, navigate(leave sim), and render when tab≠sim.

## evidence
- i0: `node scripts/audit-all.mjs` PASS before any S2 work.
- i1: node seed2 long limit fill entry===limit; cancel clears pending; stop-vs-limit reject; UI 375px place→pending→step fill→position; cancel strip works; no-stop no pending; audit-all PASS; console clean (favicon 404 only).
- i2: node 50% close → size half, uPL≈0.5×, balance += partial pl, final trade.partials[0].fraction===0.5; UI shows Close 25%/50%; audit-all PASS.
- i3: UI 1x/2x/4x seg; 4x on + Play advances bars (~40→38 in 400ms); Home leave via tabbar; audit-all PASS.
