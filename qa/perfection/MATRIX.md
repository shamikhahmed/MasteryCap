# MasteryCap — Perfection v3 MATRIX
Updated: 2026-10-14 · Builder-MasteryCap

Columns: **theme** (light · sepia · dark) × **language** (EN · Roman Urdu) × device × engine.  
Legend: ✅ evidence path · ⏳ pending · N/A reason

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
Devices: iphone · ipad · mac · Themes: light · sepia · dark

| Theme × Lang | iphone | ipad | mac |
|---|---|---|---|
| light × EN | ✅ gallery `light/iphone/*--demo.webp` | ✅ | ✅ |
| sepia × EN | ✅ | ✅ | ✅ |
| dark × EN | ✅ | ✅ | ✅ |
| light × UR | ✅ `*--demo-ur.webp` (Today/Campus/Records) | ⏳ expand Phase G | ⏳ |
| sepia × UR | ✅ iphone subset | ⏳ | ⏳ |
| dark × UR | ✅ iphone subset | ⏳ | ⏳ |

Wide 1920: N/A for MasteryCap shell (mac 1440 covers desktop layout break ≥900px).

## Inventory × states (remaining)
⏳ Phase C–G — onboarding named/skipped, lesson/quiz/Parsons, Charts, Hasil, Mistake museum, paper sim, empty/error/offline, reduce-motion × all theme×lang cells.

## Hard-gate summary (post MST-V3-1 splash fix)
| Metric | Result |
|---|---|
| hard failures | **0 / 7** (target) |
| overflowX | false |
| tap&lt;32px | 0 |
| text&lt;11px | **0** (Ready stamp fixed) |
| page errors | 0 |
