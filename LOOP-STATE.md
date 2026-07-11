# LOOP-STATE — MasteryCap agent ledger
# Single source of truth. Re-read every iteration.

status: RUNNING
iteration: 1
phase: S2
next_task: S2.2
version_on_disk: v25

## done
- S1: Paper sim engine + crypto scenarios + sim view (on disk as v25; committed as loop i0 baseline)
- S2.1 Limit orders: placeLimit/cancelLimit + Market/Limit UI + pending strip

## blocked
(none)

## decisions
- LOOP-STATE.md created at loop start (was missing).
- Uncommitted S1/v25 work committed as i0 before S2.1.
- Do not push (owner rule).
- Limit fill price = exact limit (no slip on fill); stop validated vs limit price at placement.

## evidence
- i0: `node scripts/audit-all.mjs` PASS before any S2 work.
- i1: node seed2 long limit fill entry===limit; cancel clears pending; stop-vs-limit reject; UI 375px place→pending→step fill→position; cancel strip works; no-stop no pending; audit-all PASS; console clean (favicon 404 only).
