# MasteryCap — Guide

Personal bilingual (EN / Roman Urdu) trading-education PWA. Offline-first, no accounts.
Current app version: **v22** (see `VERSION`, `CHANGELOG.md`, `sw.js` → `masterycap-v22`).

## First run
1. Open via static server or GitHub Pages.
2. Splash → onboarding (name, experience, markets).
3. Home shows school campus (next lesson + beginner path). Practice desk is Journal.

## Tabs
| Tab | What |
|-----|------|
| Home | School campus: next lesson, beginner path, XP/streak/weeks, drills CTAs |
| Learn | 9 tracks (Foundations first) · lessons · quizzes · placement · XP |
| Journal | Practice desk: balance, equity, win rate, checklist, sizing, trade log |
| Progress | Equity · win-rate · emotions · insights · discipline · weeks · drills |

## Learning loop
- **Placement** (≥60%/topic → mastered) unlocks path.
- **Quiz** (≥70% → next week; unlimited retakes; options shuffled each attempt).
- **Drills** — sizing / options / binary / R / pip-tick; ±1%; +5 XP (50/day cap).
- **Chart replay** — classify / tap resistance / engulfing MCQ.
- **Daily review** — 3 Q from completed/mastered weeks (Leitner-lite); +15 XP.
- **Streak** — any qualifying action that local day.

## Journal & insights
- Log trades with emotion; revenge/greed flagged.
- Optional: stop placed / moved stop (old trades without fields excluded from grade).
- Insights need n ≥ 3 in a slice. Discipline grade = rolling 20 scored trades A–F.

## Settings (avatar)
Name · language · font S/M/L · haptics · export/import backup · double-confirm reset · version.

Backup file: `masterycap-backup-YYYY-MM-DD.json`.

## Offline / updates
- First load caches shell via service worker.
- After deploy: hard-reload once if toast says “Updated to vN — reload”.
- Dev: unregister SW or bump `CACHE` in `sw.js` when assets change.

## Content policy
Risk control, sizing math, incentive literacy. No tips, signals, or win promises.
Binary track keeps warning banner. Bots track keeps incentive skepticism.

## Urdu QA
Human checklist: [URDU-REVIEW.md](URDU-REVIEW.md).

## Roadmap status
All phases P0→P5 complete. Spec history: [ROADMAP.md](ROADMAP.md).
