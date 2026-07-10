# MasteryCap

A single, installable PWA: a bilingual (English / Roman Urdu) trading & investing
curriculum, a discipline journal, and progress analytics. True-black terminal-grade
design (self-hosted Geist/Geist Mono, single #FF6B2C accent), works fully offline.
Personal use — no accounts, no backend, no billing. Data lives locally per device.

## Tabs
- **Home** — equity-curve hero (your journal P/L), stat strip, pre-trade checklist
- **Learn** — 8 fully-live bilingual tracks, each with lessons, quizzes (70% to
  unlock next week), a placement test (60%/topic marks weeks mastered), and XP:
  Crypto & Perps (10 wk) · Stocks & Options (8) · Investing: PSX & Beyond (8) ·
  Futures (6) · Forex (6) · Spot vs Derivatives (4) · Bots & Copy Trading (6) ·
  Binary Options (5, permanent risk-warning framing)
- **Journal** — position-sizing/risk calculator + trade log (emotion tags, stats)
- **Progress** — equity curve, cumulative win-rate, emotion frequency, weeks completed

See [CHANGELOG.md](CHANGELOG.md) for version history.

## Run locally
Any static server from the repo root, e.g.:
```
npx serve .
# or
python3 -m http.server 8080
```
Open the URL on your phone (same Wi-Fi) or desktop.

## Deploy to GitHub Pages
1. Create a repo and push this folder's contents to it.
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   pick `main` / root.
3. Wait for the green check, then open `https://<user>.github.io/<repo>/`.
4. On your phone browser: **Share → Add to Home Screen**. Launches full-screen,
   offline-capable, with the candlestick icon.

`.nojekyll` is included so GitHub Pages serves files as-is.

## Data & privacy
- All data is stored in the browser via `localStorage`, namespaced `masterycap:`.
- Nothing leaves the device. Share the link with a friend and their data is their own.
- Backup/restore: tap the avatar on Home → Export / Import JSON (`js/store.js` + settings sheet).

## Structure
```
index.html · manifest.webmanifest · sw.js · .nojekyll · CHANGELOG.md · ROADMAP.md · URDU-REVIEW.md
css/app.css              design system v2 (terminal/editorial)
fonts/                   self-hosted Geist + Geist Mono (woff2)
js/store.js              localStorage persistence (namespace masterycap:)
js/i18n.js               EN / Roman Urdu UI strings
js/icons.js              crafted line-icon set (no emoji)
js/settings.js           settings sheet (backup/restore; expands in P8)
js/app.js                shell: splash, onboarding, nav, router, helpers
js/views/*.js            dashboard · course · journal · progress
js/data/tracks.js        track registry (8 live tracks)
js/data/course.js        Crypto & Perps (original, ported verbatim)
js/data/stocks.js        Stocks & Options
js/data/invest.js        Investing: PSX & Beyond
js/data/futures.js       Futures
js/data/forex.js         Forex
js/data/spot.js          Spot vs Derivatives
js/data/bots.js          Bots & Copy Trading
js/data/binary.js        Binary Options (risk-warning framed)
icons/                   spark-line PWA icons (+ generate_icons.py)
```

## Maintenance notes
- Bump the `CACHE` version in `sw.js` whenever any asset changes, or installed
  clients keep serving the stale build.
- Content lives in `js/data/*.js` — one module per track, same shape everywhere:
  `{ id, title:{en,ur}, body:{en,ur}, quiz:[{q, opts, correct, explain}] }` plus a
  `PLACEMENT` array tagged by week `topic`.
- The app teaches risk control and evaluation frameworks. It deliberately contains
  no stock tips, no signals, and no win guarantees — keep it that way.
