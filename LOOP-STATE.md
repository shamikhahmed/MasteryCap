# LOOP-STATE — MasteryCap agent ledger
# Single source of truth. Re-read every iteration.

status: RUNNING
iteration: 8
phase: S3
next_task: S3.4
version_on_disk: v26

## done
- S1 → v25 (i0)
- S2.1–S2.5 → **v26** (i1–i5)
- S3.1 graduation.js
- S3.2 Learn UI Graduation panel
- S3.3 Certificate TRADE-READY rewrite

## blocked
(none)

## decisions
- Do not push.
- Cert honesty line: "Certifies process competence. Markets decide outcomes."
- downloadCertificate accepts optional `evidence` for sim/exam line.

## evidence
- i8: cert PNG path draws TRADE-READY + honesty line; evidence line when sim present; audit PASS.
