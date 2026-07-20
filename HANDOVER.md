# MasteryCap — Handover

> Read this + `ROADMAP.md` + `~/Capricorn-Brain/01 Projects/MasteryCap.md` before working here.
> Last updated: 2026-07-20 · Fleet-wide standard: `capricorn-tooling/shared/CAP-STANDARD.md`

## What this is
Offline personal institute PWA. Flagship **School of Software Craft** (WEB-101→FE-201 In Session). **School of Markets** wraps existing bilingual trading literacy. Honest self-issued certificates. No accounts, no fake AI, no income promises.

## Facts
**Version:** v50.1.0 (sw: masterycap-v5010)
**Live:** https://shamikhahmed.github.io/MasteryCap/
**Repo:** https://github.com/shamikhahmed/MasteryCap
**Stack:** Vanilla JS PWA. Fraunces + IBM Plex (Google) with Geist Mono self-hosted. localStorage (`masterycap:`).
**Data:** `js/store.js` + `KEYS.institute` for campus progress/SRS/certs/enrollments/attempts.

## Run & verify
```bash
python3 -m http.server 8000
node --check js/app.js
npm run smoke
node tests/final-acceptance.cjs
```

## Architecture
- Feature flags: `js/institute/features.js` — HTTP Lab + typed editor **ON** (v50)
- Themes: Dark / Light / Sepia / Auto — `js/theme.js`
- Age-band tip layer: `js/institute/register.js`
- Campus branches: `js/views/campus.js`
- Tabs: **Today · Campus · Practice · Records**
- `sw.js` — bump CACHE every release

## Gotchas
- Design: paper institute default; accent from theme. No Inter, no purple gradients, no emoji chrome.
- Certificates must keep locked disclaimer (`CERT_DISCLAIMER`).
- Announced courses stay non-enrollable — FE-202→APP-403 titles only.
- No Welcome Update sheet (47.0.0) — version stamped silent via `lastSeenVersion`.

## Where decisions live
- Capricorn-Brain project note + `AI/Cursor/MasteryCap-Institute-MVP.md`
- `CHANGELOG.md`
