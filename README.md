# MasteryCap

A single, installable PWA: bilingual (English / Roman Urdu) trading & investing
curriculum, discipline journal, practice drills, chart replay, and progress
analytics. True-black terminal-grade design (self-hosted Geist/Geist Mono, single
#FF6B2C accent). Fully offline after first load. Personal use — no accounts, no
backend, no billing. Data stays on-device under `masterycap:`.

**Version:** v27 · see [VERSION](VERSION) · [CHANGELOG.md](CHANGELOG.md) · [GUIDE.md](GUIDE.md)

## Tabs
- **Home** — equity-curve hero, stat strip, pre-trade checklist, streak, discipline
  grade, worst-cost insight line, CTAs (drills / chart replay / daily review)
- **Learn** — 8 live bilingual tracks (lessons with SVG diagrams + glossary
  auto-links, quizzes 70% unlock, placement 60%/topic mastered, XP):
  Crypto & Perps (10) · Stocks & Options (8) · Investing: PSX & Beyond (8) ·
  Futures (6) · Forex (6) · Spot vs Derivatives (4) · Bots & Copy Trading (6) ·
  Binary Options (5, permanent risk-warning framing).
  Every week: memo/skim/redflag (+ formula/xref/compare where useful).
- **Journal** — position-sizing calculator + trade log (emotions, stop toggles,
  debrief, cooldown, tags)
- **Progress** — equity, win-rate, emotions, insights, discipline, radar/heatmap,
  habit, weeks done, drill accuracy

## Extras (v4–v19)
- Shuffled quiz/placement · backup/restore/CSV · SW update toast · IDB dual-write
- Practice drills v2 (+ chart replay) · journal insights · streak + Leitner review
- Discipline grade A–F · glossary + lesson search · exam/cert · binary gate
- Settings: name, language, font S/M/L, haptics, strict/checklist gate, demo mode
- Stance: literacy + risk frameworks — not tips, not earn guarantee ([CONTENT-GAPS.md](CONTENT-GAPS.md))

## Run locally
```
npx serve .
# or
python3 -m http.server 8080
```
Open on phone (same Wi-Fi) or desktop. Hard-reload after SW cache bumps.

## Deploy to GitHub Pages
1. Push this folder to a GitHub repo.
2. **Settings → Pages → Deploy from a branch** → `main` / root.
3. Open `https://<user>.github.io/<repo>/`.
4. Phone: **Share → Add to Home Screen**.

`.nojekyll` included so Pages serves files as-is.

## Data & privacy
- `localStorage` namespace `masterycap:` only. Nothing leaves the device.
- Backup: Home avatar → Settings → Export / Import JSON.
- Additive keys only (`drillStats`, `streak`, `review`, optional trade fields).
  Old data keeps working; no migrations.

## Structure
```
index.html · manifest.webmanifest · sw.js · .nojekyll
VERSION · CHANGELOG · GUIDE · PRESENTATION · README · ROADMAP · URDU-REVIEW · CURSOR-MASTER-PROMPT
css/app.css                 design system (terminal/editorial)
fonts/                      Geist + Geist Mono (woff2)
js/store.js                 localStorage (masterycap:)
js/i18n.js                  EN / Roman Urdu UI strings
js/icons.js                 line icons (no emoji)
js/settings.js              settings sheet
js/app.js                   shell: splash, onboarding, nav, router
js/figures.js               lesson SVG diagrams
js/drills.js · insights.js · retention.js · discipline.js
js/candles.js · chartgen.js chart-replay engine
js/glossary.js              glossary sheet
js/views/                   dashboard · course · journal · progress
                            drills · review · charts
js/data/tracks.js           8-track registry
js/data/course.js           Crypto (verbatim original)
js/data/{stocks,invest,futures,forex,spot,bots,binary}.js
js/data/glossary.js         ~122 bilingual terms
icons/                      PWA icons (+ generate_icons.py)
```

## Maintenance
- Bump `CACHE` in `sw.js` on any cached-asset change; add new files to `ASSETS`.
- Keep `VERSION`, settings `APP_VERSION`, and CHANGELOG in sync.
- Content policy: frameworks + risk control only — no tips, signals, or win promises.
- Urdu copy QA: [URDU-REVIEW.md](URDU-REVIEW.md) (human).
