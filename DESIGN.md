# MasteryCap — Design system

Sober, Apple HIG-aligned, ported from the ScentCap 3.0 system (`ScentCap/src/design/system.css`, `DESIGN.md`) via VaultCap.
Content first; chrome stays quiet. MasteryCap keeps its own accent: **institute rust**.

Source of truth:

| File | Role | Loading |
|---|---|---|
| `css/design/tokens.css` | Semantic tokens (light / dark / increased contrast) + legacy bridge | render-blocking, unlayered |
| `css/design/system.css` | `ui-*` primitives (ScentCap port) | `@layer components` via `css/app.css` |
| `css/design/mastery.css` | Reskin of 51.x shell + shared classes (`.tabbar`, `.tab`, `.seg`, `.btn`, `.sheet*`, labels) | `@layer components` |
| `css/cascade.css` | Cascade orchestrator: 51.x CSS (`app.css`, `ios-tokens.css`, `institute.css`) demoted to `@layer legacy` | async (`media=print` → `all`), tokens render-blocking |

## Principles

1. **Content first.** Numbers and names carry the screen; surfaces are grey/white (light) or black/graphite (dark).
2. **One accent.** Gold (`--tint`) marks the single primary action per screen, selection and links. Never decorative.
3. **System type.** SF (`--font-ui`) at 17pt body; SF Rounded (`--font-rounded`) only for hero amounts. Tabular figures for money.
4. **Native patterns.** Large titles on top-level screens, inset-grouped lists for settings and records, segmented controls,
   sheets with grabber + Cancel / Title / Done, floating glass tab bar (phone) / glass sidebar (≥700px).
5. **Accessible by default.** 44pt targets, AA contrast in light / dark / increased contrast, reduced motion + transparency honoured,
   colour never the only signal, every icon button has `aria-label`.

## Accent and appearances

| Appearance | `--tint` | Notes |
|---|---|---|
| Light (default) | `#9a3412` rust, `--on-tint: #fff` | 7.3:1 on white |
| Sepia | `#9a3412` on warm paper (`--bg #ece3d3`) | reading comfort; same system |
| Dark | `#f07a2e`, `--on-tint: #000` | 6.1:1 on `#1c1c1e`; black on tint 7.5:1 |
| Increased contrast | `#7c2a0e` light/sepia, `#ff9a55` dark | — |

Theme is `data-theme` on `<html>` (boot script in `index.html`, `js/theme.js`). `theme.js` no longer writes inline colour
custom properties; all colour comes from `css/design/tokens.css`.

## Tokens

Same names as ScentCap: `--bg`, `--surface(-2|-elevated)`, `--fill(-2)`, `--separator`, `--label(-2|-3|-4)`,
`--tint(-hover|-soft)`, `--on-tint`, `--success/--warning/--danger`, `--t-large … --t-caption2`, `--r-sm/md/lg/xl`,
`--shadow-1/2/3`, `--ease`, `--hit`, `--gutter`, `--tabbar-h`. The glass material is `--glass-material`
(`--glass` is a legacy name, bridged to `--surface`).

**Do not** use hex values or legacy tokens (`--t0…t4`, `--line*`, `--acc*`, `--bg-1`, `--surface-3`, `--r1…3`, `--mono` for numbers) in new code.
They are bridged in `tokens.css` so 51.x screens inherit the palette. Code (labs, editors) keeps `--font-mono-ui`.

## Primitives (`ui-*`)

Identical to ScentCap minus the bottle-specific classes (`ui-plinth`, `ui-bottle*`, `ui-grid`, `ui-tabbar`, `ui-sidebar`):
`ui-page`, `ui-header`, `ui-eyebrow`, `ui-largetitle`, `ui-section(-head|-title|-link)`, `ui-card(--lg)`, `ui-list`,
`ui-row(--media|--icon)`, `ui-row__main/__title/__sub/__value/__icon`, `ui-chevron`, `ui-list-header/-footer`,
`ui-btn` + `--primary/--secondary/--gray/--plain/--danger/--sm/--block`, `ui-icon-btn(--tint)`, `ui-chip`, `ui-tag(--tint)`,
`ui-segmented`, `ui-search`, `ui-field(--left)`, `ui-switch`, `ui-widgets`, `ui-widget(__label|__value|__unit)`, `ui-meter`,
`ui-scroller`, `ui-skeleton`, `ui-rise`, `ui-sheet*`, plus `.num` (tabular figures).

## Shell

- Owner decision (2026-07-30): **tabs on all widths, no sidebar**. The floating glass tab bar centres at max 520px on wide screens.
- The document scrolls; a new screen opens at the top (`App.navigate` → `ScrollLock.scrollTo(0)` when a sheet is open).
- Sheets (`.sheet-root.on`): grabber, title + close, page pinned underneath (`js/scroll-lock.js`) and restored exactly.
- Segmented controls (`.seg`) use the HIG thumb; the selected label is always readable.
- Check with `npm run ios:check` (serve the folder first).

## Copy

Plain, warm, short. Sentence case. No exclamation marks. Fictional data is always labelled ("Sample · Fictional data only").
