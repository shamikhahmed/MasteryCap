# LOOP-STATE — MasteryCap agent ledger
# Single source of truth. Re-read every iteration.

status: RUNNING
iteration: 10
phase: S4
next_task: S4.2
version_on_disk: v27

## done
- S1 → v25 (i0)
- S2 → **v26** (i1–i5)
- S3 → **v27** (i6–i9)
- S4.1 Instrument modes in engine (perp/futures/forex/stock)

## blocked
(none)

## decisions
- Do not push.
- `gen.start` optional for FX/stock price levels.
- Futures: contracts = floor(riskD / (ticksToStop × tickValue)); 0 → `size_zero`.
- Forex: lots in 0.01 steps; no liq.
- Stock: shares = floor(riskD/|entry-stop|), capped by balance; lev=1; no funding/liq.

## evidence
- i10 sizing hand-check:
  - PERP seed1 bal1000 risk1% stop2%: sizeD≈488 lev≈0.49
  - FUTURES tick0.25/$12.5/margin500: risk1% on $1k + 10-tick stop → size_zero; bal10k risk2% → contracts≥1
  - FOREX start1.10 pip0.0001/$10: lots≈0.03 liq=null
  - STOCK start50: shares≥1 lev=1; wide stop → size_zero
- audit-all PASS
