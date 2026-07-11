# LOOP-STATE — MasteryCap agent ledger
# Single source of truth. Re-read every iteration.

status: RUNNING
iteration: 13
phase: S6
next_task: S6.1
version_on_disk: v29

## done
- S1 → v25 (i0)
- S2 → **v26** (i1–i5)
- S3 → **v27** (i6–i9)
- S4 → **v28** (i10–i12)
- S5 → **v29** (i13)

## blocked
(none)

## decisions
- Do not push.
- S5: panic-sell / unplanned_double = adherence fail; month index clamp 0..23 (fixes NaN final).

## evidence
- i13: stick seed42 pass final≈14984; panic fail fails=[panic_sell]; audit-all 6 PASS; CACHE/VERSION/APP_VERSION v29.
