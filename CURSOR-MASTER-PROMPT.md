# MasteryCap — Master Prompt for Cursor

> **Status (2026-07-11):** Roadmap P0→P5 **COMPLETE**. App **v14** (`masterycap-v14`).
> Do not re-run the phase plan unless owner asks for new work. Read `GUIDE.md`,
> `README.md`, `CHANGELOG.md`, `ROADMAP.md` (marked done) first.
> Remaining non-code: Urdu human QA (`URDU-REVIEW.md`), GitHub Pages deploy.

---

Historical execution prompt (kept for context). Original job was: execute
`ROADMAP.md` on shipped v3 without regressions.

---

You are working on **MasteryCap**, a personal offline-first PWA (now **v14**).
If continuing maintenance, preserve architecture and content policy below. For new
features, prefer additive storage keys only.

## 1. What this app is

A bilingual (English / Roman Urdu) trading & investing education PWA combining:
- **Learn** — 8 fully-live curriculum tracks (Crypto & Perps 10 weeks, Stocks & Options 8,
  Investing: PSX & Beyond 8, Futures 6, Forex 6, Spot vs Derivatives 4, Bots & Copy
  Trading 6, Binary Options 5 with a permanent risk-warning banner). Each track has
  bilingual lessons (SVG figs + glossary auto-links), quizzes (70% unlock, shuffled
  options), placement (≥60%/topic mastered), and XP.
- **Journal** — risk calculator + trade log (emotions; stop toggles; discipline inputs).
- **Home** — equity hero, checklist, streak, discipline grade, drill/chart/review CTAs.
- **Progress** — equity, win-rate, emotions, insights, discipline, weeks, drill accuracy.
- **Extras** — practice drills, chart replay, daily Leitner review, glossary, settings.

It is for the owner and 1–2 friends. **No backend, no accounts, no billing, no live
market data — fully offline-first.** Data: `localStorage` `masterycap:` via `js/store.js`.
Hosting: GitHub Pages (static, no build).

## 2. Architecture (do not restructure)

```
index.html · sw.js · manifest.webmanifest · VERSION
css/app.css · fonts/ · icons/
js/app.js · store.js · i18n.js · icons.js · settings.js
js/figures.js · drills.js · insights.js · retention.js · discipline.js
js/candles.js · chartgen.js · glossary.js
js/views/{dashboard,course,journal,progress,drills,review,charts}.js
js/data/{tracks,course,stocks,invest,futures,forex,spot,bots,binary,glossary}.js
```

ES modules, no framework, no bundler, no npm. Keep it that way.

Data shapes stay backward-compatible. New features only ADD keys/fields.
KEYS include: profile, onboarded, settings, balance, trades, course, checklist,
drillStats, streak, review.

## 3–5. Design / content / verbatim rules
Unchanged from original: terminal design system, no emoji, Roman Urdu + English
technical terms, no tips/signals/win promises, `course.js` crypto verbatim except
`{{fig:}}` markers.

## Working process (maintenance)
Bump `CACHE` in `sw.js`, CHANGELOG, sync `VERSION` + `APP_VERSION` in settings.
Verify @375px. Commit when asked. Do not push unless asked.

## Explicit non-goals
Live prices · backend/accounts · new tracks before owner asks · monetization ·
React/Vite/Tailwind · emoji · gradient buttons.

---

<details><summary>Original full phase contract (archived)</summary>

The detailed P0–P8–P5 phase specs lived in `ROADMAP.md` and were executed in order.
Do not re-implement completed phases. See CHANGELOG v4–v14 for what landed.

</details>
