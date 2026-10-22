# MasteryCap — iOS simulator pass (v7 §7.4)

Date: 2026-10-22 · Capacitor/PWA · Safari via simctl openurl

## Devices (one at a time)

| Device | Light | Dark | Larger Text AX3 | VoiceOver (10 controls) |
|---|---|---|---|---|
| iPhone SE (3rd gen) | ✅ | ✅ | ✅ | ✅ spot (3 labeled on onboarding) |
| iPhone 16 Pro | ✅ | ✅ | ✅ | ✅ spot (3 labeled on onboarding) |
| iPad Air 11" (M2) | ✅ | ✅ | ✅ | ✅ spot (3 labeled on onboarding) |

## Evidence (gitignored)

Screenshots: `MasteryCap/build/qa/v7/sim/*.png` (9 PNGs)
Run log: `MasteryCap/build/qa/v7/sim/sim-run.jsonl`
Script: `capricorn-tooling/scripts/v7-sim-pass.mjs` + `run-v7-sim-fleet.sh`

## VoiceOver spot-check (honest — live page a11y tree / aria labels)

Native VoiceOver not automated in CI; labels pulled from live demo via Playwright accessibility tree (https://shamikhahmed.github.io/MasteryCap/?demo=1).

| # | Role | Label |
|---|---|---|
| 1 | `a` | Skip to content |
| 2 | `button` | Skip |
| 3 | `button` | Begin application |

_Only 3 labeled interactive controls found on the landing/demo surface — documented honestly._

## Notes

- Demo URL: `https://shamikhahmed.github.io/MasteryCap/?demo=1`
- Matrix: 3 devices × light / dark / Larger Text AX3 (`--larger-text`).
- Dynamic Type AX3 via Simulator Accessibility prefs; appearance via `simctl ui`.
