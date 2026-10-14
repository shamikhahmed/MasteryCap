# MasteryCap — Perfection v3 INVENTORY
Seeded from §13.11 + `js/app.js` tabbar + views · 2026-10-14

Live entry: `/MasteryCap/` (demo via Settings → Enter demo mode; gallery seeds profile)  
Stack: static JS PWA · own Pages · v51.9.2

## Shell / global
| ID | Surface | Notes |
|---|---|---|
| S-SPLASH | Splash bench + stamp | `#splash` · `.splash-stamp` Ready |
| S-ONB | Onboarding / admission | name (skippable), age band, language EN/UR, buildExp, goal, time |
| S-TAB | Tab bar | Today · Campus · Practice · Records (ARIA tabs) |
| S-SHEETS | Sheets / toasts | reading guide, backup remind, tour, SW update |
| S-THEME | Appearance | Light / Sepia / Dark / Auto — `js/theme.js` |
| S-LANG | Language | EN · Roman Urdu (`profile.language`) |

## Primary tabs
| ID | Tab | Sub-surfaces |
|---|---|---|
| S-TODAY | Today | guided session, continuity, Student ID card (P-MST-1) |
| S-CAMPUS | Campus | Software Craft · Markets · Money; Open / Locked / Announced courses |
| S-LEARN | Learn (course) | institute reader, lessons, quizzes, Parsons / typed editor ≥900px |
| S-PRACTICE | Practice | Charts hub, Daily review, Hasil, Mistake museum, paper sim, HTTP Lab |
| S-RECORDS | Records | certificates (self-issued), theme, export/import, About |

## Forms
first-run name · quiz (MCQ, Parsons, code) · paper-trade orders · settings (theme, language, age band) · records export/import

## States (§7.9)
first-run (named / skipped) · demo · empty · loading · error · offline · long content · reduce-motion · light / sepia / dark · EN / Roman Urdu

## Flows
first run → Today session → lesson → quiz → mistake → daily review → certificate → export

## Network (offline-first)
No third-party runtime. Self-hosted fonts. SW precache only. Privacy page lists destinations.
