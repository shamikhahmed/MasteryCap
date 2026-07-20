/* ============================================================
   worked-charts.js — Annotated chartgen examples for lessons (v49).
   Fixed seeds. Literacy labels — not trade signals.
   Marker: {{chart:id}} in lesson HTML.
   ============================================================ */

import { renderCandles } from './candles.js';

function mulberry32(a) {
  return function () {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function candle(o, h, l, c) {
  return { o, h: Math.max(h, o, c), l: Math.min(l, o, c), c };
}

function walk(rng, start, n, drift, vol) {
  const out = [];
  let p = start;
  for (let i = 0; i < n; i++) {
    const shock = (rng() - 0.5) * 2 * vol;
    const close = p * (1 + drift + shock);
    const hi = Math.max(p, close) * (1 + rng() * vol * 0.4);
    const lo = Math.min(p, close) * (1 - rng() * vol * 0.4);
    out.push(candle(p, hi, lo, close));
    p = close;
  }
  return out;
}

function injectEngulfing(bars, at, bullish) {
  const prev = bars[at - 1];
  if (!prev) return;
  if (bullish) {
    const o = prev.l * 0.998;
    const c = prev.h * 1.002;
    bars[at] = candle(o, c * 1.002, o * 0.998, c);
  } else {
    const o = prev.h * 1.002;
    const c = prev.l * 0.998;
    bars[at] = candle(o, o * 1.002, c * 0.998, c);
  }
}

function injectPin(bars, at, atSupport) {
  const b = bars[at];
  if (atSupport) {
    const lo = b.l * 0.985;
    bars[at] = candle(b.o, b.h, lo, Math.max(b.o, b.c));
  } else {
    const hi = b.h * 1.015;
    bars[at] = candle(b.o, hi, b.l, Math.min(b.o, b.c));
  }
}

/** Catalog: key structure concepts → fixed annotated charts. */
export const WORKED_CHART_IDS = ['hh-hl', 'range-sr', 'engulf-support', 'pin-reject'];

const CATALOG = {
  'hh-hl': {
    title: { en: 'Higher highs & higher lows', ur: 'Higher highs & higher lows' },
    teach: {
      en: 'Uptrend structure = swing highs rising and swing lows rising. Labels mark successive HH/HL — literacy, not an entry order.',
      ur: 'Uptrend = HH + HL. Labels structure dikhati hain — entry signal nahi.',
    },
    build() {
      const rng = mulberry32(490101);
      const ohlc = walk(rng, 110, 28, 0.0045, 0.007);
      const marks = [
        { i: 6, edge: 'high', label: 'HH1', color: 'var(--up)' },
        { i: 10, edge: 'low', label: 'HL1', color: 'var(--acc-2)' },
        { i: 16, edge: 'high', label: 'HH2', color: 'var(--up)' },
        { i: 21, edge: 'low', label: 'HL2', color: 'var(--acc-2)' },
        { i: 26, edge: 'high', label: 'HH3', color: 'var(--up)' },
      ];
      return { ohlc, marks, highlight: null, lines: null };
    },
  },
  'range-sr': {
    title: { en: 'Range: support & resistance', ur: 'Range: support & resistance' },
    teach: {
      en: 'A range oscillates between a floor (support) and a ceiling (resistance). Taps are context for process — not a guarantee of bounce.',
      ur: 'Range = floor (support) aur ceiling (resistance). Tap = context, bounce guarantee nahi.',
    },
    build() {
      const rng = mulberry32(490102);
      const mid = 120;
      const floor = mid * 0.97;
      const ceil = mid * 1.03;
      const ohlc = [];
      let p = mid;
      for (let i = 0; i < 28; i++) {
        const target = i % 7 < 3 ? ceil * 0.998 : floor * 1.002;
        const close = p + (target - p) * (0.3 + rng() * 0.4);
        ohlc.push(candle(p, Math.max(p, close, ceil * 0.995), Math.min(p, close, floor * 1.005), close));
        p = close;
      }
      return {
        ohlc,
        marks: null,
        highlight: { lo: floor * 0.998, hi: ceil * 1.002 },
        lines: [
          { price: ceil, color: 'var(--down)', dash: '4 3', label: 'R' },
          { price: floor, color: 'var(--up)', dash: '4 3', label: 'S' },
        ],
      };
    },
  },
  'engulf-support': {
    title: { en: 'Bullish engulfing at support', ur: 'Support pe bullish engulfing' },
    teach: {
      en: 'Context first: prior lows form a support band; a bullish engulfing there is a higher-probability bounce read — never a promise.',
      ur: 'Pehle context: support band; engulfing = higher-probability bounce read — promise nahi.',
    },
    build() {
      const rng = mulberry32(490103);
      const ohlc = walk(rng, 105, 24, -0.003, 0.007);
      const at = 20;
      const support = Math.min(...ohlc.slice(10, 20).map((c) => c.l));
      ohlc[at - 1] = candle(support * 1.01, support * 1.015, support * 0.998, support * 1.002);
      injectEngulfing(ohlc, at, true);
      return {
        ohlc,
        marks: [
          { i: at - 1, edge: 'mid', label: 'prev', color: 'var(--t3)' },
          { i: at, edge: 'high', label: 'engulf', color: 'var(--up)' },
        ],
        highlight: { lo: support * 0.997, hi: support * 1.008 },
        lines: [{ price: support, color: 'var(--acc-2)', dash: '3 2', label: 'S' }],
      };
    },
  },
  'pin-reject': {
    title: { en: 'Pin bar rejection at support', ur: 'Support pe pin bar rejection' },
    teach: {
      en: 'Long lower wick + small body at a level = rejected lows. Still need stop, size, and a plan — pattern alone is not a trade.',
      ur: 'Lambi lower wick + choti body = rejected lows. Stop/size/plan ab bhi zaroori — pattern alone trade nahi.',
    },
    build() {
      const rng = mulberry32(490104);
      const ohlc = walk(rng, 100, 22, -0.002, 0.008);
      const at = 18;
      const support = Math.min(...ohlc.slice(8, 18).map((c) => c.l)) * 0.998;
      injectPin(ohlc, at, true);
      ohlc[at] = candle(support * 1.008, support * 1.012, support * 0.985, support * 1.01);
      return {
        ohlc,
        marks: [{ i: at, edge: 'low', label: 'pin', color: 'var(--warn)' }],
        highlight: { lo: support * 0.984, hi: support * 1.01 },
        lines: [{ price: support, color: 'var(--acc-2)', dash: '3 2', label: 'S' }],
      };
    },
  },
};

export function getWorkedChart(id) {
  return CATALOG[id] || null;
}

export function listWorkedCharts() {
  return WORKED_CHART_IDS.map((id) => ({ id, ...CATALOG[id] }));
}

/** Render one annotated example as lesson HTML. */
export function renderWorkedChart(id, lang = 'en') {
  const def = CATALOG[id];
  if (!def) {
    return `<div class="fig fig-missing"><div class="fig-cap mono">Missing chart: ${id}</div></div>`;
  }
  const L = lang === 'ur' ? 'ur' : 'en';
  const built = def.build();
  const svg = renderCandles(built.ohlc, {
    w: 320, h: 200,
    highlight: built.highlight,
    lines: built.lines,
    marks: built.marks,
  });
  return `<figure class="fig worked-chart" data-chart="${id}">
    <div class="fig-cap" style="margin-bottom:6px;font-weight:600;color:var(--t1)">${def.title[L] || def.title.en}</div>
    ${svg}
    <figcaption class="fig-cap">${def.teach[L] || def.teach.en}</figcaption>
  </figure>`;
}

/** Replace {{chart:id}} markers in lesson HTML. */
export function injectWorkedCharts(html, lang = 'en') {
  if (!html || html.indexOf('{{chart:') === -1) return html;
  return html.replace(/\{\{chart:([a-z0-9-]+)\}\}/g, (_, id) => renderWorkedChart(id, lang));
}
