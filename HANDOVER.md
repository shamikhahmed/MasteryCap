# MasteryCap — Handover

> Read this + `ROADMAP.md` + `~/Capricorn-Brain/01 Projects/MasteryCap.md` before working here.
> Last updated: 2026-07-19 · Fleet-wide standard: `capricorn-tooling/shared/CAP-STANDARD.md`

## What this is
Bilingual (EN / Roman Urdu) trading school + discipline journal PWA. Personal, non-commercial.

## Facts
**Version:** v42.2.0 (sw: masterycap-v4220)
**Live:** https://shamikhahmed.github.io/MasteryCap/
**Repo:** https://github.com/shamikhahmed/MasteryCap
**Stack:** Vanilla JS PWA. Self-hosted Geist/Geist Mono. localStorage (`masterycap:` namespace). Node test harness.
**Data:** localStorage wrapper `js/store.js`. Local-per-device by design — no accounts, no cloud.

## Run & verify
```bash
# static app — serve root
python3 -m http.server 8000
node tests/final-acceptance.cjs   # acceptance harness
# see ci.yml for CI entrypoints
```

## Architecture
- Tabs: Home · Learn · Journal · Progress; Campus shell (v32+)
- `js/` — modules; `js/icons.js` — crafted line icons (zero emoji)
- `tests/final-acceptance.cjs` — automated FINAL ACCEPTANCE; audit-content, audit-sim
- `sw.js` — CACHE bump every release (masterycap-vNN)

## Cap Standard status (2026-07-11)
| Cap Standard item | Status |
|---|---|
| Docs pack | ✅ |
| Screen gallery | ❌ |
| Version discipline | ✅ |
| QA / e2e | ✅ |
| CI gate | ✅ |
| PWA polish | ✅ |
| Demo mode | ❌ |

Gaps are tracked as tasks in `ROADMAP.md`.

## Gotchas — read before coding
- Design v2 is terminal/editorial (Bloomberg x Geist) — 'Aurora Dark' gradient look was explicitly rejected; no emoji, no gradient pills.
- Honesty decisions locked: no get-rich framing, certs are self-issued local PNG only, binary earn = $0. Do not soften.
- Bump sw.js CACHE on every asset change or friends get stale builds.

## Where decisions live
- Dated decisions: Capricorn-Brain project note (path above)
- Release history: `CHANGELOG.md`
- Fleet-level events: `Cap-Apps/docs/CHANGELOG.md` (master)
