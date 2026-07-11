# LOOP-STATE — MasteryCap agent ledger
# Single source of truth. Re-read every iteration.

status: RUNNING
iteration: 0
phase: S2
next_task: S2.1
version_on_disk: v25

## done
- S1: Paper sim engine + crypto scenarios + sim view (on disk as v25; committed as loop i0 baseline)

## blocked
(none)

## decisions
- LOOP-STATE.md created at loop start (was missing).
- Uncommitted S1/v25 work committed as i0 before S2.1.
- Do not push (owner rule).

## evidence
- i0: `node scripts/audit-all.mjs` PASS before any S2 work.
