# MasteryCap

Offline personal institute — Software Craft + Market Literacy. Honest certificates. PWA.

# MasteryCap

**Version:** 49.2.0

Offline bilingual (EN / Roman Urdu) **trading school**: Learn → Practice → Graduate.
Curriculum + paper simulator (process-graded, not P/L) + discipline journal. True-black
terminal design (Geist, accent `#FF6B2C`). No accounts, no backend, no income promises.
Data stays on-device under `masterycap:`.

**Version:** v49.2.0 · SW `masterycap-v4920` · see [VERSION](VERSION) · [CHANGELOG.md](CHANGELOG.md) · [GUIDE.md](GUIDE.md)

## School path
1. **Learn** — tracks from Foundations through Binary; quizzes unlock weeks; exams local-only.
2. **Practice** — paper trade sim (crypto/futures/forex/stocks) + invest/spot portfolio adherence.
3. **Graduate** — process gates (exam + sim process / portfolio adherence). Cert = TRADE-READY, process-measured — markets still decide outcomes.
4. **How-to hub** — after ready: open a real account, start micro size (checklists, not tips).

## Tabs
- **Home** — school campus: next lesson, beginner path, Learn→Practice→Graduate ladder
- **Learn** — bilingual tracks (lessons, quizzes, placement, XP, graduation panel)
- **Journal** — practice desk: sizing, trade log, Paper|Live (sim vs real journal)
- **Progress** — equity, win-rate, emotions, insights, discipline, weeks, drills

## Honest claim
Literacy + risk frameworks + process reps. Completing the school ≠ salary from charts.
Closest long-horizon path = Investing → Spot compounding. See [CONTENT-GAPS.md](CONTENT-GAPS.md).

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
- Additive keys only. Old data keeps working; no migrations.

## Structure
```
index.html · manifest.webmanifest · sw.js · .nojekyll
VERSION · CHANGELOG · GUIDE · PRESENTATION · README · ROADMAP · URDU-REVIEW
css/app.css                 design system (terminal/editorial)
fonts/                      Geist + Geist Mono (woff2)
js/store.js                 localStorage (masterycap:)
js/i18n.js                  EN / Roman Urdu UI strings
js/sim/                     paper engine · scenarios · portfolio
js/views/                   home · course · journal · progress · sim · …
js/data/                    track lesson modules + glossary
scripts/                    audit-*.mjs (income-promise lint)
icons/                      PWA icons (+ generate_icons.py)
```

## Maintenance
- Bump `CACHE` in `sw.js` on any cached-asset change; add new files to `ASSETS`.
- Keep `VERSION`, settings `APP_VERSION`, and CHANGELOG in sync.
- Content policy: frameworks + risk control only — no tips, signals, or win promises.
- Urdu copy QA: [URDU-REVIEW.md](URDU-REVIEW.md) (human).