# LOOP-STATE — MasteryCap agent ledger
# Single source of truth. Re-read every iteration.

status: RUNNING
iteration: 2
phase: S2
next_task: S2.3
version_on_disk: v25

## done
- S1: Paper sim engine + crypto scenarios + sim view (on disk as v25; committed as loop i0 baseline)
- S2.1 Limit orders: placeLimit/cancelLimit + Market/Limit UI + pending strip
- S2.2 Partial close: closePartial(0.25/0.5) + UI buttons + partials on trade record

## blocked
(none)

## decisions
- LOOP-STATE.md created at loop start (was missing).
- Uncommitted S1/v25 work committed as i0 before S2.1.
- Do not push (owner rule).
- Limit fill price = exact limit (no slip on fill); stop validated vs limit price at placement.
- Partial close: R uses original riskD; partials[] on final trade; remaining keeps same stop.

## evidence
- i0: `node scripts/audit-all.mjs` PASS before any S2 work.
- i1: node seed2 long limit fill entry===limit; cancel clears pending; stop-vs-limit reject; UI 375px place→pending→step fill→position; cancel strip works; no-stop no pending; audit-all PASS; console clean (favicon 404 only).
- i2: node 50% close → size half, uPL≈0.5×, balance += partial pl, final trade.partials[0].fraction===0.5; UI shows Close 25%/50%; audit-all PASS.
