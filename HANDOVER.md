# MasteryCap — Handover

> Read this + `ROADMAP.md` + `~/Capricorn-Brain/01 Projects/MasteryCap.md` before working here.
> Last updated: 2026-07-30 · Fleet-wide standard: `capricorn-tooling/shared/CAP-STANDARD.md`

## What this is
Offline personal institute PWA. Flagship **School of Software Craft** (WEB-101→APP-403 In Session). **School of Markets** wraps existing bilingual trading literacy. Honest self-issued study records. No accounts, no fake AI, no income promises.

## Facts
**Version:** v52.3.1 (sw: masterycap-v5231)
**Live:** https://shamikhahmed.github.io/MasteryCap/
**Repo:** https://github.com/shamikhahmed/MasteryCap
**Stack:** Vanilla JS PWA. Geist + Geist Mono self-hosted. localStorage (`masterycap:`).
**Data:** `js/store.js` + `KEYS.institute` for campus progress/SRS/certs/enrollments/attempts.
**IA:** see `IA-RATIONALE.md` — Settings groups + tab jobs.

## Run & verify
```bash
python3 -m http.server 8000
node --check js/app.js
npm run smoke
node tests/final-acceptance.cjs
```

## Architecture
- Route registry: `js/app.js` dynamically imports views and rejects stale renders.
- Modal primitive: `js/dialog.js` owns focus trap, inert background, Escape, and opener restoration.
- SW install: 37-file atomic shell; optional curriculum caches best-effort with previous-cache fallback.
- Feature flags: `js/institute/features.js` — HTTP Lab + typed editor **ON** (v50)
- Themes: Dark / Light / Sepia / Auto — `js/theme.js`
- Age-band tip layer: `js/institute/register.js`
- Campus branches: `js/views/campus.js`
- Tabs: **Today · Campus · Practice · Records**
- `sw.js` — bump CACHE every release

## Gotchas
- Design: paper institute default; accent from theme. No Inter, no purple gradients, no emoji chrome.
- Study records must keep locked disclaimer (`CERT_DISCLAIMER`) and require assessment plus project evidence.
- Announced courses stay non-enrollable — titles without `session` status only. FE-202→APP-403 are **session** (v50).
- Today follows the active enrolled branch/course; Practice hosts study, labs, Markets loops, and safety checklists.
- No Welcome Update sheet (47.0.0) — version stamped silent via `lastSeenVersion`.

## Where decisions live
- Capricorn-Brain project note + `AI/Cursor/MasteryCap-Institute-MVP.md`
- `CHANGELOG.md`
