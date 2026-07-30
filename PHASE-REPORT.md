# MasteryCap — Phase report (v52.3.0 loop · 2026-07-30)

Live origin used for UI proof: `http://127.0.0.1:8777/` (clean SW). Stale SW on `:8770` (`sw.js?v=5220`) taught: always verify controller scriptURL.

## Phase 1 — Discover
- **Done.** Fresh `AUDIT.md` (architecture, IA risks, duplicate `* 2` files, plan).
- Evidence: tree + dead-code/version/security audits; prior LH P0.98/A1/BP1.

## Phase 2 — Architecture & code health
- **Done.** Deleted untracked Finder `* 2` junk; dead-code audit → **PASS** (108 modules).
- No business-logic deletes.

## Phase 3 — IA
- **Done.** Settings groups; Records theme removed; pane → Study records; Practice `More tools`; Today secondary course-plan CTA.
- `IA-RATIONALE.md` written.
- Live: Settings regions Account→About; Practice `details.pr-more`; Records panes Profile/Transcript/Study records; `tdCoursePlan` = `btn secondary` + “Course plan overview”.

## Phase 4 — Design system
- Settings chrome tokenized (`.set-group*`); sheet taller; seg ≥44px; muted text ramp raised (`--t2/3/4`).
- Accent docs → `#F4C430`; gallery accent aligned.

## Phase 5 — Forms & selection
- Settings labels + `autocomplete`; toggles as `button` + `aria-pressed`; Records name `autocomplete=nickname`.

## Phase 6 — Platforms / themes
- Safe-area tokens unchanged; themes light/sepia/dark/auto live in Settings.
- Smoke **PASS** @375/390/430.

## Phase 7 — A11y
- `npm run test:a11y` **PASS** (labels, zoom, modal focus/inert/Escape, live status, focus indicator).
- Tablist/tabs already present; settings groups labelled.

## Phase 8 — Performance
- Lazy routes retained. Live Lighthouse mobile after idle SW register: **P 0.97 · A 1.00 · BP 1.00**.
- SW install = shell only; optional curriculum on activate; register deferred to `requestIdleCallback`.
- Splash hide 120ms / remove 280ms.

## Phase 9 — Security
- `test:security` **PASS** (stored XSS escape + sandbox). `audit-security` **PASS** CSP.

## Phase 10 — Offline / SW
- `test:sw` **PASS**; `test:backup` **PASS**. Cache `masterycap-v5230`.
- Note: old SW query string can stick on an origin — hard unregister + new port or reload after claim.

## Phase 11 — QA personas
- Seeded first-timer campus profile; walked Today→Settings→Practice→Records.
- Dual primary CTA on Today fixed (secondary plan).
- Edge: SW stale-build trap documented; version audit **PASS**.

## Phase 12 — Docs & gallery
- VERSION 52.3.0 · CHANGELOG · README · GUIDE · HANDOVER · PRESENTATION · FEATURES · `docs/GALLERY.md` · screen-gallery title/accent.

## Phase 13 — Final polish
- Smoke + product + a11y + security + SW + backup + version + dead-code **PASS**.
- Cross-browser / lighthouse: retry if CI needs green LH; smoke multi-width covers layout.

### Decisions made (smallest safe)
- Keep Hasil dual-link (Practice primary, Records secondary).
- Name editable in both Profile + Settings Account.
- Howto under More tools only.
