# LOOP-STATE — MasteryCap agent ledger
# Single source of truth. Re-read every iteration.

status: RUNNING
iteration: 11
phase: S4
next_task: S4.3
version_on_disk: v27

## done
- S1 → v25 (i0)
- S2 → **v26** (i1–i5)
- S3 → **v27** (i6–i9)
- S4.1 Instrument modes
- S4.2 Scenario packs (6 futures + 6 forex + 6 stocks) + picker sections

## blocked
(none)

## decisions
- Do not push.
- `gen.slipBoost` for news/thin-liquidity double slip windows.
- Futures ES-style spec tick 0.25 / $12.50 / margin 500; FX pip 0.0001 / $10.

## evidence
- i11: 26 scenarios (8+6+6+6); picker groups by track; f1/x2/s1 session create OK; audit PASS.
