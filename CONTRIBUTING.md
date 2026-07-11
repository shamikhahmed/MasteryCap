# Contributing / release checklist (MasteryCap)

Personal PWA — no npm runtime deps. DevDeps only for Playwright/Lighthouse.

## Before every feature commit

1. `node scripts/audit-all.mjs` — must exit 0
2. Bump `CACHE` in `sw.js` if any cached asset changed; add new files to `ASSETS`
3. Sync `VERSION`, `js/settings.js` → `APP_VERSION`, `CHANGELOG.md`
4. Bilingual: every new user-facing string in `T.en` **and** `T.ur`
5. Storage: additive keys/fields only
6. Verify @375px width (browser or `node scripts/audit-e2e.cjs`)
7. Content policy: no tips/signals/win promises in app voice

## Smoke

```bash
npm run audit
npm run smoke          # Playwright smoke @375/390/430
npm run e2e            # fuller Part-1 browser harness
```

## Design invariants

True-black `#08090A` · accent `#FF6B2C` flat · Geist/Geist Mono · `.mono` numerics · zero emoji · no gradient buttons · safe-area tabbar.

## Do not

Live prices · backend/accounts · React rewrite · fake AI · force-push main.
