/* ============================================================
   candles.js — SVG candlestick renderer (P5).
   ============================================================ */

export function renderCandles(ohlc, {
  w = 320, h = 180, pad = 12,
  up = 'var(--up)', down = 'var(--down)',
  highlight = null, // { lo, hi } price band
  lines = null,     // [{ price, color, dash, label }] horizontal overlays (sim)
  marks = null,     // [{ i, edge:'high'|'low'|'mid', label, color }] bar callouts
  volume = false,
} = {}) {
  if (!ohlc?.length) return '';
  const n = ohlc.length;
  const highs = ohlc.map((c) => c.h);
  const lows = ohlc.map((c) => c.l);
  let min = Math.min(...lows);
  let max = Math.max(...highs);
  if (highlight) {
    min = Math.min(min, highlight.lo);
    max = Math.max(max, highlight.hi);
  }
  if (lines) for (const L of lines) { if (L && L.price > 0) { min = Math.min(min, L.price); max = Math.max(max, L.price); } }
  const range = max - min || 1;
  const chartH = volume ? h * 0.72 : h - pad * 2;
  const top = pad;
  const y = (p) => top + (1 - (p - min) / range) * chartH;
  const slot = (w - pad * 2) / n;
  const bw = Math.max(2, slot * 0.55);

  let body = '';
  if (highlight) {
    const y1 = y(highlight.hi), y2 = y(highlight.lo);
    body += `<rect x="${pad}" y="${Math.min(y1, y2)}" width="${w - pad * 2}" height="${Math.abs(y2 - y1)}" fill="var(--acc-dim)" stroke="var(--acc)" stroke-width="1" stroke-dasharray="3 2" opacity="0.85"/>`;
  }

  ohlc.forEach((c, i) => {
    const cx = pad + slot * i + slot / 2;
    const col = c.c >= c.o ? up : down;
    body += `<line x1="${cx}" y1="${y(c.h)}" x2="${cx}" y2="${y(c.l)}" stroke="${col}" stroke-width="1.25"/>`;
    const topB = y(Math.max(c.o, c.c));
    const botB = y(Math.min(c.o, c.c));
    body += `<rect x="${cx - bw / 2}" y="${topB}" width="${bw}" height="${Math.max(1.5, botB - topB)}" fill="${col}" stroke="${col}"/>`;
  });

  if (marks) for (const M of marks) {
    if (!M || M.i == null || !ohlc[M.i]) continue;
    const c = ohlc[M.i];
    const cx = pad + slot * M.i + slot / 2;
    const edge = M.edge || 'high';
    const py = edge === 'low' ? y(c.l) : edge === 'mid' ? y((c.h + c.l) / 2) : y(c.h);
    const col = M.color || 'var(--acc-2)';
    body += `<circle cx="${cx}" cy="${py}" r="3.5" fill="${col}" stroke="var(--bg2,#12141a)" stroke-width="1"/>`;
    if (M.label) {
      const ty = edge === 'low' ? py + 12 : py - 6;
      body += `<text x="${cx}" y="${ty}" text-anchor="middle" font-size="9" font-family="Geist Mono, monospace" fill="${col}">${M.label}</text>`;
    }
  }

  if (lines) for (const L of lines) {
    if (!L || !(L.price > 0)) continue;
    const ly = y(L.price);
    body += `<line x1="${pad}" y1="${ly}" x2="${w - pad}" y2="${ly}" stroke="${L.color || 'var(--t2)'}" stroke-width="1.25" ${L.dash ? `stroke-dasharray="${L.dash}"` : ''}/>`;
    if (L.label) body += `<text x="${w - pad - 2}" y="${ly - 3}" text-anchor="end" font-size="8.5" font-family="Geist Mono, monospace" fill="${L.color || 'var(--t2)'}">${L.label}</text>`;
  }

  return `<svg class="fig-svg candle-chart" viewBox="0 0 ${w} ${h}" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
}

/** Map client Y in SVG to price (for tap-zone drills). */
export function priceAtY(svgEl, clientY, ohlc, { pad = 12, h = 180 } = {}) {
  if (!svgEl || !ohlc?.length) return null;
  const rect = svgEl.getBoundingClientRect();
  const y = ((clientY - rect.top) / rect.height) * h;
  const min = Math.min(...ohlc.map((c) => c.l));
  const max = Math.max(...ohlc.map((c) => c.h));
  const chartH = h - pad * 2;
  const t = 1 - (y - pad) / chartH;
  return min + t * (max - min);
}
