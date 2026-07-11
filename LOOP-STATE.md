# LOOP-STATE — MasteryCap agent ledger
# Single source of truth. Re-read every iteration.

status: RUNNING
iteration: 6
phase: S3
next_task: S3.2
version_on_disk: v26

## done
- S1 → v25 (i0)
- S2.1–S2.5 → **v26** (i1–i5)
- S3.1 `js/graduation.js` + KEYS.graduation

## blocked
(none)

## decisions
- Do not push.
- `portfolio_coming` listed in missing but non-blocking until S5.
- Trading tracks without scenarios → `sim_requires_s4` (not crash).
- Greeks treated exam-only (not in trading/portfolio lists).

## evidence
- i5: v26 shipped; same-seed bars OK; audit PASS.
- i6: gradStatus crypto cold/exam/full; futures→sim_requires_s4; invest ready w/ portfolio_coming; foundations ready; markGraduated; audit PASS.
