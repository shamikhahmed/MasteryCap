# MasteryCap — AUDIT.md (Phase 1)

**Date:** 2026-07-30  
**App:** v52.2.0 · SW `masterycap-v5220` · branch `feat/v52-production-hardening` @ `ae9d9cd`  
**Method:** static tree + dead-code/version/security audits + prior Lighthouse + live map of routes/IA  
**Rule:** understand WHY before delete; verify live after each fix.

---

## 1. Product map

Offline personal institute PWA (Capricorn Systems). No accounts, no backend, no billing.
Local-only data under `localStorage` namespace `masterycap:`. Hosted on GitHub Pages.
Bilingual EN / Roman Urdu. Two learning worlds: **Software Craft** (authored courses) + **School of Markets** (tracks + paper sim).

Honest claim: literacy + process reps. Not credentials, not income.

---

## 2. Architecture

| Layer | Path | Role |
|-------|------|------|
| Shell | `index.html`, `js/app.js` | Splash, admission gate, lazy route registry, tabbar, toasts, SW messages |
| Design | `css/app.css`, `css/institute.css` | Tokens + shell + institute chrome |
| Persist | `js/store.js` | `masterycap:` keys; checksummed backup import/export |
| i18n | `js/i18n.js` | UI strings EN/UR |
| Theme | `js/theme.js` | light / sepia / dark / auto |
| Settings | `js/settings.js` | Sheet: prefs, backup, reset, version |
| Institute | `js/institute/*` | Progress, SRS, lab, editor, sandbox, features, placement |
| Markets | `js/sim/*`, `js/data/*-deep.js`, gates/exam/graduation | Paper sim + track content |
| Views | `js/views/*` | Tab + deep screens |
| Offline | `sw.js` | Precache shell; update preserves verified cache |
| Deploy | GitHub Pages + `.github/workflows/ci.yml` | `npm run verify` + final + lighthouse |
| Tests | `tests/*`, `scripts/audit-*.mjs` | Smoke, a11y, XSS, SW, backup, cross-browser |

**Routing:** in-memory `App.tab` + dynamic `import()`. Primary tabs: `today` · `campus` · `practice` · `records`. Secondary: lesson, final, learn (markets course), journal, progress (Hasil), drills, review, charts, sim, study, http-lab.

**State:** profile + institute progress in store; ephemeral UI on `App._*` (`_campusView`, `_recordsPane`, `_srsSession`, `_labReturn`, `_focusSel`).

**Security surface:** strict CSP (no inline/eval scripts); practice code in opaque Worker / sandbox-runner; escaped journal/profile HTML; transactional backup.

---

## 3. Folder inventory (keep)

```
index.html · sandbox-runner.html · manifest.webmanifest · sw.js · .nojekyll
css/ · fonts/ · icons/ · assets/ · docs/
js/app.js · store · i18n · dialog · settings · theme · session · …
js/views/ · js/institute/ · js/sim/ · js/data/ (+ institute/)
scripts/ · tests/ · VERSION · VERSION.json · docs suite
```

---

## 4. Design system (as-found)

- Tokens in `:root` (surfaces, text ramp, accent `#F4C430`, market up/down, radius, motion, safe areas).
- Geist + Geist Mono self-hosted; `--fs` + body zoom for text scale.
- Themes: light / sepia / dark (+ auto).
- Gaps: many inline `style=` in settings/records/practice (~64 hits on key views); README still cites old accent `#FF6B2C`; manifest name still “Trading Mastery”.

---

## 5. Information architecture (as-found)

| Tab | Job | Issue |
|-----|-----|-------|
| Today | Continue + session + standing + due | Clear |
| Campus | Enroll / explore branches | Clear |
| Practice | Study desk, SRS, labs, markets tools | Dense list — OK with progressive disclosure |
| Records | Profile / transcript / certs | Seg label “Records” duplicates tab name; theme + name also in Settings |

Settings sheet: flat wall (name → lang → font → theme → session → teacher → verify → toggles → backup → demo → danger → version). Needs mature groups.

Duplicates / dual homes:
- Appearance: Records profile + Settings
- Hasil: Practice + Records (transcript link OK if Practice is primary home)
- Name edit: Records + Settings

---

## 6. Top risks (prioritized)

| Sev | Risk | Impact | Fix complexity |
|-----|------|--------|----------------|
| High | Finder duplicates `* 2.*` (~35 files) pollute tree + fail dead-code audit | CI/maintainability | Low — delete |
| High | Settings IA flat; theme/name duplicated | Confusion, wrong home for prefs | Medium |
| Medium | Inline styles bypass tokens | Drift, hard theming | Medium |
| Medium | Doc/manifest drift (accent, “Trading Mastery”) | Investor/trust mismatch | Low |
| Medium | Practice hub lists many peers above fold | Cognitive load | Low–Med |
| Low | `js/report 2.js` only (no live `report.js`) | Noise | Low |
| Low | Prior AUDIT.md dated v15 | Misleading | Replace (this file) |

Security/offline/CSP already strong at v52.2 — re-verify, don’t rewrite.

---

## 7. Dead / duplicate / unused (confirmed)

**Delete (no imports, Finder copies):** all `* 2.js`, `* 2.cjs`, `* 2.mjs`, `* 2.html`, `* 2.json`, `* 2.md` at repo root and under js/scripts/tests.

**Keep:** deep track modules (`*-deep.js`), institute courses, live views — dead-code audit only flagged the ` 2` clones once those are gone.

**Commented legacy / console:** no app `console.log` noise in shell (only curriculum quiz copy mentioning `console.log`).

---

## 8. Unused deps / assets

- Runtime: zero npm runtime deps (correct for static PWA).
- DevDeps: playwright, lighthouse, chrome-launcher — used by verify.
- No unused package.json scripts found.

---

## 9. Prior evidence (baseline)

- Version audit: PASS 52.2.0 / `masterycap-v5220`
- Security audit: PASS CSP + sandbox policy
- Dead-code: FAIL only on `* 2` files
- Last Lighthouse artifact: P 0.98 · A 1.00 · BP 1.00

---

## 10. Prioritized plan (Phases 2–13)

1. **P2** Delete all `* 2` junk; re-run dead-code; fix any real orphans; naming consistency.
2. **P3** Regroup Settings; de-dupe theme/name homes; rename Records seg; write `IA-RATIONALE.md`.
3. **P4** Tokenize remaining chrome; kill critical inline hex/px; empty/loading/error parity.
4. **P5** Forms: labels, validation focus, hit targets, selection control semantics.
5. **P6** Live check phone/tablet/desktop + light/sepia/dark + safe areas.
6. **P7** Keyboard/SR/a11y suite green; strengthen if gaps.
7. **P8** Measure TTI/bundle/Lighthouse; lazy routes already present — prove numbers.
8. **P9** Re-run security/XSS/backup tests; confirm no secrets in client.
9. **P10** SW offline reload + update path; cache ASSETS sync after edits.
10. **P11** Persona walk + edge attacks; fix friction.
11. **P12** README/CHANGELOG/VERSION + documented gallery.
12. **P13** Final verify + phase report with live evidence.

**Version target for this loop:** bump to **52.3.0** / SW `masterycap-v5230` when polish ships.

---

## 11. Decisions locked (do not reverse without owner)

- No accounts / backend / live market API.
- Certs = self-issued study records only.
- No income promises.
- Tabs stay Today / Campus / Practice / Records.
- Design: workbench / stamp aesthetic (not purple-glass AI chic).
