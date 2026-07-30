# MasteryCap — Documented screen gallery (v52.3.0)

Indexed by tab. Captions: what · how selected · how state kept · why organised.

State store: `localStorage` namespace `masterycap:` via `js/store.js` (`KEYS.*`).
Ephemeral UI: `App._*` (e.g. `_recordsPane`, `_srsSession`, `_campusView`).
Theme: `KEYS.appearance` + `html[data-theme]` via `js/theme.js`.

Regenerate PNGs: `npm run gallery` then open `screen-gallery.html`.

---

## Admission / splash

| State | Caption |
|-------|---------|
| Splash | Brand mark + “Personal learning campus”. No selection. Transient DOM `#splash`. Why: calm brand first, no dashboard chrome. |
| Admission empty | Application form. Fields write profile draft in memory until submit. Persist: `KEYS.profile`, `KEYS.onboarded`, Student ID. Why: gate before campus. |
| Admission filled / error | Inline field errors; focus first bad field. No submit until required. |

## Today

| State | Caption |
|-------|---------|
| Continue lesson | Primary CTA for active enrolled course (`KEYS.institute.activeCourse`). One accent button. |
| Guided session secondary | Course plan overview = secondary (`btn secondary`) so it doesn’t compete with Continue. |
| Empty enroll | Explore Campus CTA when no active course. |
| Study due 0 / N | Reviews + flashcards from SRS + retention + mistakes. Tap → Practice/Study. |
| Light / dark / sepia | Via Settings Appearance; `html[data-theme]`. |
| Reduced motion | `prefers-reduced-motion` zeros animation durations in CSS. |

## Campus

| State | Caption |
|-------|---------|
| Branches | Three schools. Selection: `_campusView`. Why: one job = enroll/explore. |
| School ladder | Markets Foundations gate; Craft Open/Locked/Announced. |
| Course detail | Enroll → `KEYS.institute.enrollments`. |

## Practice

| State | Caption |
|-------|---------|
| Hub | Study desk + SRS primary; Markets loop; ledger/drills. |
| More tools | `<details class="pr-more">` holds howto checklists (rare). Why: progressive disclosure. |
| SRS card | `_srsSession` queue; grades → institute SRS store. |
| Empty due | Start SRS disabled when queue empty. |
| HTTP Lab / editor | Feature flags `features.js`; code in sandbox Worker. |

## Records

| State | Caption |
|-------|---------|
| Profile | Identity home: name, ID, enrollments. Theme **not** here — Settings only. |
| Transcript | Progress % + project evidence notes. Hasil link secondary. |
| Study records | Self-issued certs pane (renamed from “Records”). Print/PDF. |
| Settings sheet | Groups: Account → … → About. Persist `KEYS.settings` + profile name. |

## Deep tools (from Practice)

Charts · Daily review · Hasil · Drills · Paper sim · Journal legacy — each restores focus via `App._focusSel` / `_labReturn` when returning.

## Themes & a11y checklist for shots

- Light, sepia, dark (and Auto system)
- Font S / XL
- High contrast on
- Keyboard focus ring visible on tab / settings seg
- Reduced motion OS preference
