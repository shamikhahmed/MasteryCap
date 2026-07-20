# MasteryCap — Handover

> Read this + `ROADMAP.md` + `~/Capricorn-Brain/01 Projects/MasteryCap.md` before working here.
> Last updated: 2026-07-20 · Fleet-wide standard: `capricorn-tooling/shared/CAP-STANDARD.md`

## What this is
Offline personal institute PWA. Flagship **School of Software Craft** (WEB-101→FE-201 In Session). **School of Markets** wraps existing bilingual trading literacy. Honest self-issued certificates. No accounts, no fake AI, no income promises.

## Facts
**Version:** v45.0.0 (sw: masterycap-v4500)
**Live:** https://shamikhahmed.github.io/MasteryCap/
**Repo:** https://github.com/shamikhahmed/MasteryCap
**Stack:** Vanilla JS PWA. Fraunces + IBM Plex (Google) with Geist Mono self-hosted. localStorage (`masterycap:`).
**Data:** `js/store.js` + `KEYS.institute` for campus progress/SRS/certs.

## Run & verify
```bash
python3 -m http.server 8000
node --check js/app.js
npx playwright test
node tests/final-acceptance.cjs
```

## Architecture
- HTTP Lab: `js/institute/http-lab.js` + `js/views/http-lab.js`
- Age-band: `js/institute/register.js`
- Code editor: `js/institute/code-editor.js`
- Tabs: **Today · Campus · Practice · Records**
- Institute: `js/data/institute/*`, `js/institute/*`, `js/views/{today-tab,campus,practice-tab,records,lesson}.js`
- Markets legacy: `js/views/course.js` + tracks — open from Campus → School of Markets
- `sw.js` — bump CACHE every release

## Gotchas
- Design: Institute Terminal (ink `#0A0A0A`, accent `#E8590C`). No Inter, no purple gradients, no emoji chrome.
- Certificates must keep locked disclaimer in `js/institute/progress.js` (`CERT_DISCLAIMER`).
- Existing installs without `profile.campus` re-run institute onboarding.
- Announced courses must stay non-enrollable until authored.

## Where decisions live
- Capricorn-Brain project note + `AI/Cursor/MasteryCap-Institute-MVP.md`
- `CHANGELOG.md`
