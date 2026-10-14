# MasteryCap — Perfection Loop v3 · ITEMS

Seeded from CURSOR-PERFECTION-LOOP.md §13.11 + CONTENT-GAPS.md + URDU-REVIEW.md · 2026-10-14

### MST-V3-1 — matrix completeness (3 themes × 2 languages) + splash type floor
severity: P1 · status: ✅ VERIFIED
Where: splash `.splash-stamp` "Ready"; MATRIX light/sepia/dark × EN/UR  
Evidence: baseline tinySample=`Ready` @ 8.5px → post-fix textUnder11=0; `qa/perfection/MATRIX.md` + gallery schema-v2  
Cause: decorative stamp used 8.5px; matrix lacked theme×lang coverage  
Fix: bump stamp to **11px** / 58px circle in `css/app.css`; MATRIX + gallery cover Light/Sepia/Dark × EN (+ UR iphone rails)  
Test: device-qa 7/7 `text<11px`=0 · gallery manifest themes=[light,sepia,dark]  
Auditor: ✅ VERIFIED 2026-10-14T11:30:00Z — auditor-independent textUnder11=0 tap=0 hard=0 pageErr=0 @ f0c8ad2

### MST-V3-2 — gallery 12 shots → full v3
severity: P1 · status: ✅ VERIFIED
Where: `docs/screenshots/gallery/` + `screen-gallery.html`  
Evidence: legacy 12 desktop/mobile PNGs → schema-v2 WebP rails (3 themes × 3 devices × 6 screens + UR iphone subset)  
Cause: pre-v3 gallery (mobile+desktop only, no theme columns, no Sepia)  
Fix: rewrite `scripts/gallery.cjs`; install shared viewer + Sepia filter chip  
Test: `CAPTURE_GALLERY=1 npm run gallery` · open `/screen-gallery.html`  
Auditor: ✅ VERIFIED 2026-10-14T11:30:00Z — gallery schema/viewer on branch; device-qa type floor clean

### MST-V3-3 — triage CONTENT-GAPS.md / URDU-REVIEW.md into ITEMS
severity: P2 · status: ✅ VERIFIED
Where: repo-root CONTENT-GAPS.md · URDU-REVIEW.md  
Cause: gaps lived outside perfection ITEMS  
Fix: filed MST-V3-5…V3-10 below from those docs  
Auditor: ✅ VERIFIED 2026-10-14T11:30:00Z — triage into ITEMS accepted

### MST-V3-4 — Chromium hub-console ERR_CONNECTION_RESET on local serve
severity: P2 · status: L (soft; not hard-fail)  
Where: local `http://127.0.0.1` device-qa Chromium macbook/android  
Evidence: baseline hubConsole=41 · soft only · pageErr=0  
Cause: SW / asset probes against closed sockets during harness; live Pages baseline was clean  
Fix: — (re-check on live after Phase I; do not weaken SW)  
Auditor: —

### MST-V3-5 — Stocks & Options depth hole (CONTENT-GAPS §1)
severity: P3 · status: L (curriculum product)  
Where: Markets / Money tracks · learning content  
Cause: intentional retail foundation — skips full Greeks book, vol surface, multi-leg beyond verticals  
Fix: — optional v6 track; honesty copy already in CONTENT-GAPS  
Auditor: —

### MST-V3-6 — Crypto / Futures / Forex / Spot / Bots depth skips (CONTENT-GAPS §2–7)
severity: P3 · status: L (curriculum product)  
Where: respective tracks  
Cause: documented "enough for" vs "skips" stance; Binary intentionally shallow  
Fix: — do not expand Binary into playbooks  
Auditor: —

### MST-V3-7 — Outside-app forever items (CONTENT-GAPS)
severity: P3 · status: L (by design)  
Where: live broker UX, tax rules, sized practice psychology  
Cause: product boundary — Evaluate + survive, not zero-to-rich  
Fix: — keep §4.2 MasteryCap disclaimers on About/Markets/certificates  
Auditor: —

### MST-V3-8 — Urdu native review pass (URDU-REVIEW.md)
severity: P2 · status: ⛔ BLOCKED-EXTERNAL  
Where: Learn tracks · UI strings · glossary · EN/UR toggle  
Evidence: URDU-REVIEW checklist empty (no reviewer/date)  
Cause: requires native Roman Urdu speaker (human)  
Fix: owner schedules review per URDU-REVIEW.md How-to; content patches land later  
Auditor: —

### MST-V3-9 — Macro / Tax Literacy / Options Greeks Deep tracks (CONTENT-GAPS v24)
severity: P3 · status: L (roadmap)  
Where: Campus announced / future weeks  
Cause: v24 depth candidates still not full pro books  
Fix: — ROADMAP Next/Later; not Wave C P0/P1  
Auditor: —

### MST-V3-10 — Lighthouse Today / Campus / lesson (§13.11)
severity: P2 · status: L (later phase)  
Where: Today, Campus, a lesson · mobile+desktop  
Cause: Phase E/I after Auditor P1  
Fix: —  
Auditor: —
