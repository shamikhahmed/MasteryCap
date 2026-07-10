# Changelog

## v5 — 2026-07-11 · Phase 1 lesson diagrams
- `js/figures.js`: 27 parametric SVG figures (candle anatomy, engulfing, pin bar, HH/HL, range, S/R flip, EMA lag, RSI divergence, ATR stop, liquidity sweep, funding crowding, options payoffs/spreads/theta/IV, contango, margin waterfall, session clock, correlated pairs, grid bot, martingale ruin, binary breakeven, expense-ratio drag, IPO lockup)
- `{{fig:name}}` markers in lesson bodies (crypto + other tracks); `drawWeek()` injects via `injectFigures`
- Bilingual captions; `.fig` panel styling; SW cache **v5**

## v4 — 2026-07-11 · Phase 0 hygiene
- Quiz + placement options Fisher–Yates shuffled per attempt; clicks remap to original indices (scoring untouched); reshuffle on every start/retake
- Settings sheet from Home avatar: export `masterycap-backup-YYYY-MM-DD.json`, import with key validation + overwrite confirm (clears namespace then restores)
- Service worker cache **v4**; activate posts `SW_UPDATED` → "Updated to v4 — reload" toast
- `URDU-REVIEW.md` checklist for native-speaker content QA (human task)
- `store.clearAll()` / `store.validateBackup()`; icons: download, upload, x, refresh

## v3 — 2026-07-11 · Full curriculum + v2 icon set
- **8 tracks, all live** with full bilingual (EN / Roman Urdu) lessons, quizzes, placement tests:
  - Crypto & Perps — 10 weeks, 22-Q placement (original, ported verbatim)
  - Stocks & Options — 8 weeks, 16-Q placement (markets, charts, earnings/IV crush, calls/puts, intrinsic/extrinsic, greeks, strategies, options sizing)
  - Investing: PSX & Beyond — 8 weeks, 16-Q placement (investing vs trading, financial statements, ratios/valuation, PSX mechanics/CDC, company-picking framework, US stocks from Pakistan, IPOs, mutual funds/ETFs)
  - Futures — 6 weeks, 12-Q placement (contracts, tick value, margin, contango, rollover, tick-based sizing)
  - Forex — 6 weeks, 12-Q placement (pairs, pips/lots, sessions, carry, news, correlation risk)
  - Spot vs Derivatives — 4 weeks, 8-Q placement
  - Bots & Copy Trading — 6 weeks, 12-Q placement (bots, grid/DCA, copy trading, backtesting/overfitting, signal-group scams, safe automation)
  - Binary Options — 5 weeks, 10-Q placement, permanent high-risk warning banner (house-edge math, scam red flags, harm-reduction limits)
- PWA icons regenerated to v2 spark-line mark (matches splash logo), flat #FF6B2C on #08090A
- Track rail: active chip auto-scrolls into view; placement intro question-count now per-track
- Service worker cache v3, all data modules precached for offline

## v2 — 2026-07-09 · Design system rebuild ("not another Claude app")
- Full visual redesign: Bloomberg-terminal precision × Geist/Linear polish
- Self-hosted Geist + Geist Mono (offline woff2); mono tabular numerics for all money/%
- Zero emoji — crafted line-icon set (js/icons.js)
- Flat single-accent #FF6B2C buttons (no gradient pills), true-black #08090A, hairline rows, uppercase micro-labels, film-grain overlay
- Editorial onboarding (left-aligned type, thin progress bar, mono step counter)
- Flush bottom nav with accent top indicator
- Service worker cache v2

## v1 — 2026-07-09 · Initial build
- Unified PWA merging trade-journal.html + trade-course.html prototypes
- 4 tabs: Home (equity-curve hero, stat strip, pre-trade checklist), Learn, Journal (risk calculator + trade log, 5 emotion tags), Progress (equity curve, win-rate trend, emotion frequency, weeks completed)
- Replaced Claude-sandbox window.storage with localStorage wrapper (js/store.js, namespace masterycap:)
- Course engine: 70% quiz pass → next week unlocks; placement 60%/topic → mastered; XP +50 pass / +10 fail / +100 placement
- Splash, onboarding (name/experience/markets), EN / Roman Urdu toggle (persists)
- PWA: manifest, offline service worker, generated icons; GitHub Pages-ready (.nojekyll)
