# MasteryCap — IA-RATIONALE.md

**Date:** 2026-07-30 · **App:** v52.3.0 target  
**Audience:** product + design + future agents

## Tab jobs (one job each)

| Tab | Job | Why |
|-----|-----|-----|
| **Today** | “What do I do next?” | Continue lesson / markets path, session CTA, standing, due counts. Identity glance (mini ID) lives here because morning open is the habit entry. |
| **Campus** | Enroll & explore | Branches → courses only. No practice tools, no transcript. |
| **Practice** | Reps & tools | Study desk, SRS, markets loop (review / charts / Hasil), drills, paper lab, HTTP Lab. Primary home for skill tools. |
| **Records** | Identity & evidence | Profile, transcript, self-issued study records, export. Not a tool drawer. |

Bottom order (L→R): identity-of-day (Today) → catalog (Campus) → do work (Practice) → archive (Records). Matches “most used → archive” convention.

## Dual links (intentional)

| Feature | Primary home | Secondary | Why keep secondary |
|---------|--------------|-----------|--------------------|
| **Hasil** | Practice | Records → Transcript | Practice = competence loop; Transcript = evidence review after grades. |
| **Display name** | Records → Profile | Settings → Account | Profile is identity surface; Settings Account is mature prefs convention. |
| **Backup export** | Settings → Privacy | Records → Transcript | Transcript “export” is convenience after viewing progress; full import/reset stay in Settings. |
| **Theme / language / font** | Settings only | — | Removed duplicate theme strip from Records (was two homes). |

## Settings order (mature groups)

Top → bottom:

1. **Account** — name, language (identity; language is not Appearance)
2. **General** — session length, teacher voice, haptics, strict/checklist, iOS install
3. **Appearance** — theme, font size
4. **Accessibility** — high contrast (separate from Appearance so Language/Font aren’t nested wrong)
5. **Notifications** — local review opt-in
6. **Privacy & data** — export/import/CSV, evidence fingerprint, demo, then **Danger / reset**
7. **About & legal** — honesty limits, cert disclaimer, version + changelog

Ordering law: identity/most-used first; destructive last; legal/version at floor.

## Practice progressive disclosure

Above the fold: Study hub (desk + SRS) → Markets loop (review, charts, Hasil) → Ledger & drills.  
**More tools** (`<details>`): Markets safety checklists (howto) — rare post-readiness path, not daily.

## Records panes

Renamed third seg from “Records” → **Study records** so it does not collide with the tab name.  
Seg order: Profile (identity) → Transcript (progress) → Study records (artifacts).

## Discoverability (≤2 taps)

| Need | Path |
|------|------|
| Continue lesson | Today → Continue |
| Enroll | Campus → branch → course |
| SRS / desk | Practice → Open study desk / Start SRS |
| Charts / review / Hasil | Practice → row |
| Theme / backup | Records → Settings, or Today gear → Settings |
| Cert print | Records → Study records |

## Non-goals

- No fifth tab (keeps thumb reach + mental model).
- No merging Markets into Campus list as a fifth peer tab — Markets stays a Campus branch.
- No accounts/cloud sync in IA (product lock).
