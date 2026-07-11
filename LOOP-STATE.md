# LOOP-STATE — MasteryCap agent ledger
# Single source of truth. Re-read every iteration.

status: RUNNING
iteration: 5
phase: S3
next_task: S3.1
version_on_disk: v26

## done
- S1: Paper sim engine + crypto scenarios + sim view (v25; loop i0)
- S2.1 Limit orders
- S2.2 Partial close
- S2.3 Play speeds
- S2.4 Journal Paper|Live
- S2.5 Debrief upgrade + **v26 ship gate**

## blocked
(none)

## decisions
- Do not push (owner rule).
- Limit fill = exact limit; stop vs limit price at placement.
- Partial: R vs original riskD; partials[] on final trade.
- Play speed memory-only; stopSimPlayback on leave sim.
- Journal histSource memory-only; insights stay live (Progress).
- startSession(id, seed) — same-seed practice from debrief.

## evidence
- i0–i4: see prior entries (limit/partial/speeds/journal).
- i5: same-seed bars identical (seed 4242); debrief has R timeline + process summary + same-seed btn; CACHE/VERSION/APP_VERSION → v26; CHANGELOG prepended; audit-all PASS.
- SW toast: activate posts `SW_UPDATED`; fresh install got `masterycap-v26` only (no prior stale → no toast — expected). Update toast requires prior controller.
