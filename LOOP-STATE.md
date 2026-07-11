# LOOP-STATE — MasteryCap agent ledger
# Single source of truth. Re-read every iteration.

status: RUNNING
iteration: 7
phase: S3
next_task: S3.3
version_on_disk: v26

## done
- S1 → v25 (i0)
- S2.1–S2.5 → **v26** (i1–i5)
- S3.1 graduation.js
- S3.2 Learn UI Graduation panel + Graduate CTA

## blocked
(none)

## decisions
- Do not push.
- Graduate awards +200 XP (separate from exam XP) + markGraduated + opens cert PNG.
- Paths how-to steps moved under `<details>`.

## evidence
- i6: gradStatus cases + audit PASS.
- i7: graduation panel met/missing i18n EN+UR; audit-all PASS.
