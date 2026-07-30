# MasteryCap device-matrix QA report

**Date:** 2026-07-30  
**App:** MasteryCap **v52.3.1** · SW `masterycap-v5231`  
**Harness:** `npm run matrix` → `scripts/device-matrix-capture.cjs`  
**Viewport:** `npm run test:viewport` → `scripts/viewport-contract.cjs`  
**Shots:** 96 under `qa/device-matrix/{iphone|ipad|browser}/` · `meta.json` (PNGs gitignored)

## App hooks

| Hook | Value |
|------|--------|
| Path | `/Users/shamikhahmed/Desktop/Cap-Apps/MasteryCap` |
| Live | https://shamikhahmed.github.io/MasteryCap/ |
| Shell BP | **900px** — `mobile-tabs` &lt;900 · `desktop-tabs` ≥900 (tabs always; **no sidebar**) |
| Tabs | `#tabbar` / `.tabbar` / `.tab[data-tab]` |
| Unlock | seed `masterycap:` onboarded campus profile (capture script) |
| Dense list | Campus |
| Secondary | Practice · Records |
| Overlay | Settings sheet (`#settings-sheet`) |
| Gate | Admission |

Unlike VaultCap (sidebar ≥700), MasteryCap keeps bottom tabs on tablet/desktop by product lock. Exit criterion adapted: correct **tabs** layout mode, not sidebar.

---

## 1. Matrix summary (post-fix)

| device-id | layout | overflow | maxw | verdict |
|-----------|--------|----------|------|---------|
| iphone-se … iphone-16-pro-max | mobile-tabs | no | 620 | **OK** |
| browser-phone-360 | mobile-tabs | no | 620 | **OK** |
| ipad-mini … ipad-pro-11 | mobile-tabs | no | **720** | **OK** (was phone-narrow 620) |
| ipad-pro-13 (+ land) | desktop-tabs | no | 1100 | **OK** |
| browser-sm-laptop … fhd | desktop-tabs | no | 1100 | **OK** |
| browser-ultrawide | desktop-tabs | no | **1280** | **OK** (was 1100 desert) |

`overflowCount: 0` · `layoutFail: 0` · Settings version samples: `MasteryCap v52.3.1`  
Tab hit sample SE: 58×94 · Island tab bar includes safe-bottom (h≈93).  
Viewport contract: **6/6 PASS** (375 / 699 / 744 / 899 / 900 / 1280).

---

## 2. Fixed this loop

| Issue | Sev | Fix |
|-------|-----|-----|
| iPad mini/Air content stuck at phone `--maxw: 620` | Medium | `--maxw: 720` from **700px** |
| Ultrawide empty side desert | Medium | `--maxw: 1280` from **1600px** |
| Duplicate/conflicting 900px `--maxw` after 1600 rule | Medium | Later `@media 1600` after institute block |
| Probe false “short tabs” (measured label 12px) | Low | Probe `.tab` hit box |
| No matrix harness | High (process) | `device-matrix.cjs` + capture + viewport scripts |

---

## 3. What looks RIGHT

- Safe-area inject: h1 tops clear notch/island (`h1ClipRisk: []`)
- SE home-button: `safeBottom: 0`, tabH 59 — no fake home-indicator gap
- Island/notch: tabbar `padding-bottom: --sb`, toast uses `nav + sb`
- Settings sheet version matches VERSION; groups Account → About visible
- Zero horizontal overflow on all 96 majors
- Admission / Today / Campus / Practice / Records / Settings captured dark

---

## 4. Residual (Low only)

| Item | Note |
|------|------|
| Ultrawide still single column | Intentional max-width pillar; 1280 less desert than 1100. Multi-col Today optional later |
| No Cap sidebar | Product: 4-tab institute shell. Do not copy VaultCap 700 sidebar BP |
| Institute `:root` accent orange | Overrides earlier yellow stamp tokens — content design debt, not chrome clip |

---

## 5. Plans (brief)

- **Architecture:** Capture uses Playwright Chromium + injected `--st/--sb` (no WebKit project required for loop).  
- **Refactor:** Shared `tests/device-matrix.cjs` device list matches Cap fleet IDs.  
- **Migration:** none.  
- **Test:** `npm run test:viewport` + `npm run matrix` after shell CSS changes.  
- **Rollback:** revert `--maxw` media queries; keep harness.

---

## 6. Exit criteria

| Criterion | Status |
|-----------|--------|
| Correct layout mode per MasteryCap BP | **PASS** |
| Zero horizontal overflow | **PASS** |
| Lock/admission not clipped; SE no fake indicator | **PASS** |
| Tabs labels / ≥44px hits / safe once | **PASS** |
| Toast/FAB clear of tabs (toast formula + sb) | **PASS** |
| Version string matches VERSION | **PASS** (v52.3.1) |
| Viewport contract incl. 744 & 899/900 | **PASS** |
| REPORT residual Low or empty | **PASS** |
| No Critical/High open | **PASS** |
