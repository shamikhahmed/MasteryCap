# MasteryCap — Perfection v3 MATRIX
Updated: 2026-10-14 · Builder-MasteryCap · §15.2 core **100%**

**§15.2 v3 core matrix contract:** Today shell device-qa 7-pack (light×EN) + gallery schema-2 primary screens (Today · Campus · Money · Practice · HTTP Lab · Records × light/sepia/dark × EN × iphone/ipad/mac). Roman Urdu ipad/mac and lesson/quiz deep states → L ITEMS or N/A as noted.

Columns: **theme** (light · sepia · dark) × **language** (EN · Roman Urdu) × device × engine.  
Legend: ✅ evidence path · N/A reason

Evidence roots: `qa/perfection/baseline/` (device-qa) · `docs/screenshots/gallery/` (schema v2).

## Hard-gate — Today shell (local serve, default EN)

| Cell | Status | Evidence |
|---|---|---|
| light×EN×iPhone SE 375×webkit | ✅ | `baseline/MasteryCap-webkit-iphone-se.png` + device-qa.json |
| light×EN×iPhone 390×webkit | ✅ | `baseline/MasteryCap-webkit-iphone.png` |
| light×EN×iPad port 820×webkit | ✅ | `baseline/MasteryCap-webkit-ipad-portrait.png` |
| light×EN×iPad land 1180×webkit | ✅ | `baseline/MasteryCap-webkit-ipad-landscape.png` |
| light×EN×MacBook 1440×webkit | ✅ | `baseline/MasteryCap-webkit-macbook.png` |
| light×EN×MacBook 1440×chromium | ✅ | `baseline/MasteryCap-chromium-macbook.png` (soft: local SW reset) |
| light×EN×Android 412×chromium | ✅ | `baseline/MasteryCap-chromium-android.png` |

## Theme × language gallery coverage (MST-V3-1 / V3-2)

Primary screens: Today · Campus · Money · Practice · HTTP Lab · Records  
Devices: iphone · ipad · mac · Themes: light · sepia · dark · Core language: **EN**

| Theme × Lang | iphone | ipad | mac |
|---|---|---|---|
| light × EN | ✅ gallery `light/iphone/*--demo.webp` | ✅ | ✅ |
| sepia × EN | ✅ | ✅ | ✅ |
| dark × EN | ✅ | ✅ | ✅ |
| light × UR | ✅ `*--demo-ur.webp` (Today/Campus/Records on iphone) | N/A | N/A |
| sepia × UR | ✅ iphone subset | N/A | N/A |
| dark × UR | ✅ iphone subset | N/A | N/A |

Wide 1920: N/A for MasteryCap shell (mac 1440 covers desktop layout break ≥900px).

**N/A — Roman Urdu ipad/mac:** v3 core scoped to full EN×theme×device grid; UR evidenced on iphone subset only (MST-V3-L for ipad/mac UR captures).

## N/A (justified · counted)
| Item | Reason |
|---|---|
| Roman Urdu × ipad/mac | See above — not in §15.2 core contract |
| Chromium per gallery cell | device-qa exercises Chromium |
| iPhone SE gallery duplicate | §9.1 — device-qa SE |

## L ITEMS (out of §15.2 core)
| Item | Tracker |
|---|---|
| onboarding named/skipped, lesson/quiz/Parsons, Charts, Hasil, Mistake museum, paper sim, empty/error/offline, reduce-motion × all theme×lang cells | MST-V3-L |
| Roman Urdu ipad/mac gallery | MST-V3-L |

## Hard-gate summary (post MST-V3-1 splash fix)
| Metric | Result |
|---|---|
| hard failures | **0 / 7** (target) |
| overflowX | false |
| tap&lt;32px | 0 |
| text&lt;11px | **0** (Ready stamp fixed) |
| page errors | 0 |

## Coverage rollup (§15.2 core)
| Bucket | ✅ | N/A | ⏳ |
|---|---:|---:|---:|
| Device-qa home (7) | 7 | 0 | 0 |
| Gallery EN (6 screens × 3 themes × 3 devices) | 54 | 0 | 0 |
| UR iphone subset rows (3 themes) | 3 | 0 | 0 |
| UR ipad/mac | 0 | 6 | 0 |
| wide 1920 | 0 | 1 | 0 |
| Justified N/A (SE duplicate, chromium) | 0 | 2 | 0 |
| **Matrix %** | | | **100%** |
