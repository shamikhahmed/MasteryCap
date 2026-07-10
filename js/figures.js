/* ============================================================
   figures.js — parametric SVG lesson diagrams (P1).
   Colors from CSS vars only. Captions bilingual.
   ============================================================ */

const CAPTIONS = {
  'candle-anatomy': {
    en: 'OHLC candle: body = open→close; wicks = rejected high/low.',
    ur: 'OHLC candle: body = open→close; wicks = reject high/low.',
  },
  engulfing: {
    en: 'Bullish engulfing: second candle fully covers the prior body.',
    ur: 'Bullish engulfing: doosri candle pehli body ko fully cover karti hai.',
  },
  'pin-bar': {
    en: 'Pin bar / hammer at a level: long rejection wick, small body.',
    ur: 'Pin bar / hammer level pe: lambi rejection wick, choti body.',
  },
  'hh-hl': {
    en: 'Uptrend = higher highs + higher lows. Downtrend = LH + LL.',
    ur: 'Uptrend = higher highs + higher lows. Downtrend = LH + LL.',
  },
  'range-box': {
    en: 'Range: price oscillates between a ceiling and a floor.',
    ur: 'Range: price ceiling aur floor ke beech oscillate karti hai.',
  },
  'sr-flip': {
    en: 'Role reversal: broken resistance often becomes support on retest.',
    ur: 'Role reversal: broken resistance aksar retest pe support ban jata hai.',
  },
  'ema-lag': {
    en: 'EMA lags price — it smooths what already happened.',
    ur: 'EMA price se lag — jo ho chuka usay smooth karta hai.',
  },
  'rsi-divergence': {
    en: 'Bearish divergence: price higher high, RSI lower high.',
    ur: 'Bearish divergence: price higher high, RSI lower high.',
  },
  'atr-stop': {
    en: 'ATR-based stop: distance scales with recent volatility.',
    ur: 'ATR-based stop: distance recent volatility se scale hoti hai.',
  },
  'liquidity-sweep': {
    en: 'Equal highs = resting stops; a sweep grabs liquidity then reverses.',
    ur: 'Equal highs = resting stops; sweep liquidity le kar reverse karta hai.',
  },
  'funding-crowding': {
    en: 'Crowded long funding: longs pay shorts — often a squeeze risk.',
    ur: 'Crowded long funding: longs shorts ko pay — aksar squeeze risk.',
  },
  'long-call': {
    en: 'Long call payoff: limited loss (premium), unlimited upside.',
    ur: 'Long call payoff: limited loss (premium), unlimited upside.',
  },
  'long-put': {
    en: 'Long put payoff: limited loss (premium), profit as price falls.',
    ur: 'Long put payoff: limited loss (premium), price girne pe profit.',
  },
  'covered-call': {
    en: 'Covered call: long stock + short call — capped upside, premium income.',
    ur: 'Covered call: long stock + short call — capped upside, premium income.',
  },
  'vertical-spread': {
    en: 'Bull call spread: defined max loss and max gain between strikes.',
    ur: 'Bull call spread: strikes ke beech defined max loss aur max gain.',
  },
  'intrinsic-extrinsic': {
    en: 'Option premium = intrinsic value + extrinsic (time/IV) value.',
    ur: 'Option premium = intrinsic + extrinsic (time/IV) value.',
  },
  'theta-decay': {
    en: 'Theta: extrinsic value decays faster as expiry approaches.',
    ur: 'Theta: expiry qareeb aate extrinsic value tez decay hoti hai.',
  },
  'iv-crush': {
    en: 'IV crush: implied vol drops after the event; premium shrinks.',
    ur: 'IV crush: event ke baad IV girti hai; premium shrink.',
  },
  'contango-backwardation': {
    en: 'Contango: futures > spot. Backwardation: futures < spot.',
    ur: 'Contango: futures > spot. Backwardation: futures < spot.',
  },
  'margin-waterfall': {
    en: 'Margin waterfall: initial → maintenance → liquidation.',
    ur: 'Margin waterfall: initial → maintenance → liquidation.',
  },
  'session-clock': {
    en: 'FX sessions: Asia → London → New York; overlap = peak liquidity.',
    ur: 'FX sessions: Asia → London → New York; overlap = peak liquidity.',
  },
  'correlated-pairs': {
    en: 'Correlated pairs ≈ one theme — size as one risk, not two.',
    ur: 'Correlated pairs ≈ ek theme — do nahi, ek risk ki tarah size karo.',
  },
  'grid-bot': {
    en: 'Grid bot: many small range wins; one trend can wipe the stack.',
    ur: 'Grid bot: range mein chhote wins; ek trend stack wipe kar sakta hai.',
  },
  'martingale-ruin': {
    en: 'Martingale: double after loss — equity path ends in ruin.',
    ur: 'Martingale: loss ke baad double — equity path ruin pe khatam.',
  },
  'binary-breakeven': {
    en: 'Binary breakeven win-rate rises as payout % falls.',
    ur: 'Binary breakeven win-rate payout % girne pe upar jati hai.',
  },
  'expense-ratio-drag': {
    en: 'Expense ratio compounds as drag on long-term growth.',
    ur: "Expense ratio long-term growth pe compounding drag banta hai.",
  },
  'ipo-lockup': {
    en: 'IPO lockup: insiders restricted until unlock — supply overhang risk.',
    ur: 'IPO lockup: unlock tak insiders restricted — supply overhang risk.',
  },
};

function svg(inner, { w = 320, h = 160 } = {}) {
  return `<svg class="fig-svg" viewBox="0 0 ${w} ${h}" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;
}
function tx(x, y, t, { size = 10, fill = 'var(--t3)', anchor = 'start', weight = 500 } = {}) {
  return `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-family="var(--mono)" font-weight="${weight}" text-anchor="${anchor}">${t}</text>`;
}
function ln(x1, y1, x2, y2, { stroke = 'var(--t4)', sw = 1, dash } = {}) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}
function rect(x, y, w, h, { fill = 'none', stroke = 'var(--line-2)', sw = 1, rx = 0 } = {}) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" rx="${rx}"/>`;
}
function path(d, { fill = 'none', stroke = 'var(--t2)', sw = 1.5 } = {}) {
  return `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
function circ(cx, cy, r, { fill = 'var(--acc)', stroke = 'none' } = {}) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}"/>`;
}

function candle(cx, o, h, l, c, up) {
  const top = Math.min(o, c), bot = Math.max(o, c);
  const col = up ? 'var(--up)' : 'var(--down)';
  return ln(cx, h, cx, l, { stroke: col, sw: 1.5 })
    + rect(cx - 8, top, 16, Math.max(2, bot - top), { fill: col, stroke: col });
}

const FIGS = {
  'candle-anatomy'() {
    const cx = 120;
    // y grows down: close (70) above open (100) = bullish body
    return svg(
      ln(40, 20, 40, 140, { stroke: 'var(--line)' })
      + candle(cx, 100, 30, 130, 70, true)
      + ln(cx + 14, 30, 200, 30, { stroke: 'var(--t4)', sw: 1, dash: '3 3' })
      + ln(cx + 14, 70, 200, 70, { stroke: 'var(--t4)', sw: 1, dash: '3 3' })
      + ln(cx + 14, 100, 200, 100, { stroke: 'var(--t4)', sw: 1, dash: '3 3' })
      + ln(cx + 14, 130, 200, 130, { stroke: 'var(--t4)', sw: 1, dash: '3 3' })
      + tx(208, 34, 'High') + tx(208, 74, 'Close') + tx(208, 104, 'Open') + tx(208, 134, 'Low')
      + tx(cx, 150, 'Body', { anchor: 'middle', fill: 'var(--t2)' })
    );
  },

  engulfing() {
    return svg(
      candle(100, 55, 40, 120, 100, false)
      + candle(160, 105, 35, 125, 50, true)
      + tx(100, 145, 'Prior', { anchor: 'middle' })
      + tx(160, 145, 'Engulf', { anchor: 'middle', fill: 'var(--up)' })
    );
  },

  'pin-bar'() {
    return svg(
      ln(40, 110, 280, 110, { stroke: 'var(--acc)', sw: 1, dash: '4 3' })
      + tx(282, 114, 'Level', { fill: 'var(--acc-2)' })
      + ln(160, 40, 160, 110, { stroke: 'var(--up)', sw: 1.5 })
      + rect(152, 40, 16, 18, { fill: 'var(--up)', stroke: 'var(--up)' })
      + tx(160, 145, 'Long lower wick = rejection', { anchor: 'middle', fill: 'var(--t2)' })
    );
  },

  'hh-hl'() {
    const pts = '40,120 80,90 110,105 150,60 180,80 230,35';
    return svg(
      path(`M ${pts}`, { stroke: 'var(--up)', sw: 2 })
      + circ(80, 90, 3) + circ(150, 60, 3) + circ(230, 35, 3)
      + circ(110, 105, 3, { fill: 'var(--t2)' }) + circ(180, 80, 3, { fill: 'var(--t2)' })
      + tx(80, 82, 'HH', { size: 9, fill: 'var(--up)', anchor: 'middle' })
      + tx(150, 52, 'HH', { size: 9, fill: 'var(--up)', anchor: 'middle' })
      + tx(110, 120, 'HL', { size: 9, fill: 'var(--t2)', anchor: 'middle' })
      + tx(180, 95, 'HL', { size: 9, fill: 'var(--t2)', anchor: 'middle' })
      + path('M 40,40 80,70 110,55 150,95 180,75 230,120', { stroke: 'var(--down)', sw: 1.5 })
      + tx(250, 50, 'Up', { fill: 'var(--up)' }) + tx(250, 125, 'Down', { fill: 'var(--down)' })
    );
  },

  'range-box'() {
    return svg(
      rect(50, 40, 220, 80, { fill: 'var(--acc-dim)', stroke: 'var(--acc)', sw: 1.25, rx: 2 })
      + ln(50, 40, 270, 40, { stroke: 'var(--acc)', sw: 1.5 })
      + ln(50, 120, 270, 120, { stroke: 'var(--acc)', sw: 1.5 })
      + path('M 60,90 Q 90,50 120,85 T 180,70 T 240,95', { stroke: 'var(--t1)', sw: 1.75 })
      + tx(275, 44, 'Ceil', { fill: 'var(--acc-2)' }) + tx(275, 124, 'Floor', { fill: 'var(--acc-2)' })
    );
  },

  'sr-flip'() {
    return svg(
      ln(40, 80, 160, 80, { stroke: 'var(--down)', sw: 1.5, dash: '4 3' })
      + tx(42, 72, 'Resistance', { fill: 'var(--down)', size: 9 })
      + path('M 50,120 L 100,90 L 140,95 L 170,50 L 200,70 L 240,65 L 270,90', { stroke: 'var(--t1)', sw: 1.75 })
      + ln(170, 80, 280, 80, { stroke: 'var(--up)', sw: 1.5, dash: '4 3' })
      + tx(200, 72, '→ Support', { fill: 'var(--up)', size: 9 })
      + circ(170, 50, 3, { fill: 'var(--acc)' })
      + tx(170, 42, 'Break', { size: 9, fill: 'var(--acc-2)', anchor: 'middle' })
    );
  },

  'ema-lag'() {
    return svg(
      path('M 30,110 L 70,100 L 100,60 L 130,70 L 160,40 L 200,55 L 240,30 L 280,45', { stroke: 'var(--t1)', sw: 1.75 })
      + path('M 30,115 L 70,108 L 100,85 L 130,82 L 160,62 L 200,65 L 240,48 L 280,52', { stroke: 'var(--acc)', sw: 2 })
      + tx(250, 28, 'Price', { fill: 'var(--t1)' }) + tx(250, 58, 'EMA', { fill: 'var(--acc-2)' })
      + tx(160, 145, 'EMA trails the move', { anchor: 'middle', fill: 'var(--t2)' })
    );
  },

  'rsi-divergence'() {
    return svg(
      tx(20, 18, 'Price', { size: 9 }) + tx(20, 95, 'RSI', { size: 9 })
      + path('M 40,70 L 100,50 L 160,55 L 230,25', { stroke: 'var(--t1)', sw: 1.75 })
      + circ(100, 50, 2.5) + circ(230, 25, 2.5)
      + tx(100, 42, 'H', { size: 9, anchor: 'middle' }) + tx(230, 18, 'HH', { size: 9, fill: 'var(--down)', anchor: 'middle' })
      + path('M 40,145 L 100,115 L 160,125 L 230,135', { stroke: 'var(--acc)', sw: 1.75 })
      + circ(100, 115, 2.5, { fill: 'var(--acc)' }) + circ(230, 135, 2.5, { fill: 'var(--acc)' })
      + tx(100, 108, 'H', { size: 9, fill: 'var(--acc-2)', anchor: 'middle' })
      + tx(230, 150, 'LH', { size: 9, fill: 'var(--down)', anchor: 'middle' })
      + ln(30, 88, 290, 88, { stroke: 'var(--line)' })
    );
  },

  'atr-stop'() {
    return svg(
      candle(100, 70, 40, 110, 55, true)
      + ln(130, 55, 220, 55, { stroke: 'var(--t4)', dash: '3 3' })
      + ln(130, 100, 220, 100, { stroke: 'var(--down)', sw: 1.5 })
      + path('M 210,55 L 210,100', { stroke: 'var(--warn)', sw: 1.5 })
      + tx(218, 80, '1×ATR', { fill: 'var(--warn)' })
      + tx(220, 104, 'Stop', { fill: 'var(--down)' })
      + tx(100, 140, 'Entry', { anchor: 'middle', fill: 'var(--t2)' })
    );
  },

  'liquidity-sweep'() {
    return svg(
      ln(40, 50, 180, 50, { stroke: 'var(--t3)', dash: '4 3' })
      + tx(42, 42, 'Equal highs', { size: 9 })
      + path('M 50,100 L 90,70 L 120,75 L 150,55 L 170,60 L 195,30 L 210,70 L 250,65', { stroke: 'var(--t1)', sw: 1.75 })
      + circ(195, 30, 3, { fill: 'var(--down)' })
      + tx(195, 22, 'Sweep', { size: 9, fill: 'var(--down)', anchor: 'middle' })
      + tx(210, 85, 'Reversal', { size: 9, fill: 'var(--up)' })
    );
  },

  'funding-crowding'() {
    return svg(
      rect(40, 40, 50, 90, { fill: 'var(--up-dim)', stroke: 'var(--up)', rx: 2 })
      + rect(100, 70, 50, 60, { fill: 'var(--down-dim)', stroke: 'var(--down)', rx: 2 })
      + tx(65, 130, 'Longs', { anchor: 'middle', fill: 'var(--up)' })
      + tx(125, 145, 'Shorts', { anchor: 'middle', fill: 'var(--down)' })
      + path('M 95,70 L 145,70', { stroke: 'var(--warn)', sw: 1.5 })
      + tx(160, 74, 'Funding →', { fill: 'var(--warn)' })
      + tx(160, 100, 'Crowded side pays', { fill: 'var(--t2)', size: 10 })
    );
  },

  'long-call'() {
    return svg(
      ln(40, 80, 280, 80, { stroke: 'var(--line)' })
      + ln(120, 20, 120, 140, { stroke: 'var(--line)' })
      + path('M 40,100 L 120,100 L 260,30', { stroke: 'var(--up)', sw: 2 })
      + tx(50, 95, '−premium', { size: 9, fill: 'var(--down)' })
      + tx(125, 150, 'Strike', { size: 9, anchor: 'middle' })
      + tx(240, 40, 'P/L', { fill: 'var(--up)' })
    );
  },

  'long-put'() {
    return svg(
      ln(40, 80, 280, 80, { stroke: 'var(--line)' })
      + ln(200, 20, 200, 140, { stroke: 'var(--line)' })
      + path('M 60,30 L 200,100 L 280,100', { stroke: 'var(--up)', sw: 2 })
      + tx(210, 95, '−premium', { size: 9, fill: 'var(--down)' })
      + tx(200, 150, 'Strike', { size: 9, anchor: 'middle' })
    );
  },

  'covered-call'() {
    return svg(
      ln(40, 100, 280, 100, { stroke: 'var(--line)' })
      + path('M 40,130 L 160,50 L 260,50', { stroke: 'var(--acc)', sw: 2 })
      + path('M 40,140 L 160,60', { stroke: 'var(--t4)', sw: 1, dash: '3 3' })
      + tx(200, 45, 'Capped', { fill: 'var(--acc-2)', size: 9 })
      + tx(50, 150, 'Stock alone', { size: 9, fill: 'var(--t4)' })
      + tx(50, 40, 'Covered call', { size: 9, fill: 'var(--acc-2)' })
    );
  },

  'vertical-spread'() {
    return svg(
      ln(40, 90, 280, 90, { stroke: 'var(--line)' })
      + path('M 40,110 L 110,110 L 180,50 L 260,50', { stroke: 'var(--up)', sw: 2 })
      + ln(110, 20, 110, 140, { stroke: 'var(--t4)', dash: '3 3' })
      + ln(180, 20, 180, 140, { stroke: 'var(--t4)', dash: '3 3' })
      + tx(110, 150, 'K1', { size: 9, anchor: 'middle' })
      + tx(180, 150, 'K2', { size: 9, anchor: 'middle' })
      + tx(200, 45, 'Max gain', { size: 9, fill: 'var(--up)' })
      + tx(50, 105, 'Max loss', { size: 9, fill: 'var(--down)' })
    );
  },

  'intrinsic-extrinsic'() {
    return svg(
      rect(60, 50, 80, 70, { fill: 'var(--up-dim)', stroke: 'var(--up)', rx: 2 })
      + rect(140, 50, 120, 70, { fill: 'var(--acc-dim)', stroke: 'var(--acc)', rx: 2 })
      + tx(100, 90, 'Intrinsic', { anchor: 'middle', fill: 'var(--up)' })
      + tx(200, 90, 'Extrinsic', { anchor: 'middle', fill: 'var(--acc-2)' })
      + tx(160, 140, 'Premium', { anchor: 'middle', fill: 'var(--t2)' })
    );
  },

  'theta-decay'() {
    return svg(
      path('M 40,30 Q 120,40 200,70 T 280,140', { stroke: 'var(--warn)', sw: 2 })
      + ln(40, 140, 280, 140, { stroke: 'var(--line)' })
      + tx(40, 24, 'Extrinsic', { size: 9, fill: 'var(--warn)' })
      + tx(250, 150, 'Expiry →', { size: 9 })
      + tx(160, 100, 'Decay accelerates', { size: 9, fill: 'var(--t2)', anchor: 'middle' })
    );
  },

  'iv-crush'() {
    return svg(
      rect(50, 40, 70, 80, { fill: 'var(--warn-dim)', stroke: 'var(--warn)', rx: 2 })
      + rect(180, 70, 70, 50, { fill: 'var(--t4)', stroke: 'var(--t3)', rx: 2 })
      + path('M 125,70 L 175,90', { stroke: 'var(--down)', sw: 1.5 })
      + tx(85, 130, 'Before', { anchor: 'middle', fill: 'var(--warn)' })
      + tx(215, 140, 'After', { anchor: 'middle', fill: 'var(--t3)' })
      + tx(160, 30, 'IV', { anchor: 'middle', fill: 'var(--t2)' })
      + ln(155, 50, 155, 110, { stroke: 'var(--acc)', dash: '3 3' })
      + tx(158, 48, 'Event', { size: 9, fill: 'var(--acc-2)' })
    );
  },

  'contango-backwardation'() {
    return svg(
      path('M 40,100 L 100,85 L 160,70 L 230,50', { stroke: 'var(--up)', sw: 2 })
      + path('M 40,60 L 100,75 L 160,95 L 230,120', { stroke: 'var(--down)', sw: 2 })
      + circ(40, 100, 3, { fill: 'var(--t2)' }) + circ(40, 60, 3, { fill: 'var(--t2)' })
      + tx(40, 115, 'Spot', { size: 9, anchor: 'middle' })
      + tx(240, 48, 'Contango', { fill: 'var(--up)', size: 9 })
      + tx(240, 125, 'Backwardation', { fill: 'var(--down)', size: 9 })
      + tx(160, 150, 'Tenor →', { anchor: 'middle' })
    );
  },

  'margin-waterfall'() {
    return svg(
      rect(40, 30, 240, 28, { fill: 'var(--up-dim)', stroke: 'var(--up)', rx: 2 })
      + rect(40, 68, 240, 28, { fill: 'var(--warn-dim)', stroke: 'var(--warn)', rx: 2 })
      + rect(40, 106, 240, 28, { fill: 'var(--down-dim)', stroke: 'var(--down)', rx: 2 })
      + tx(160, 48, 'Initial margin', { anchor: 'middle', fill: 'var(--up)' })
      + tx(160, 86, 'Maintenance', { anchor: 'middle', fill: 'var(--warn)' })
      + tx(160, 124, 'Liquidation', { anchor: 'middle', fill: 'var(--down)' })
    );
  },

  'session-clock'() {
    return svg(
      rect(30, 50, 90, 36, { fill: 'var(--surface-3)', stroke: 'var(--line-2)', rx: 2 })
      + rect(100, 50, 100, 36, { fill: 'var(--acc-dim)', stroke: 'var(--acc)', rx: 2 })
      + rect(180, 50, 110, 36, { fill: 'var(--up-dim)', stroke: 'var(--up)', rx: 2 })
      + tx(75, 72, 'Asia', { anchor: 'middle', size: 10 })
      + tx(150, 72, 'London', { anchor: 'middle', size: 10, fill: 'var(--acc-2)' })
      + tx(235, 72, 'NY', { anchor: 'middle', size: 10, fill: 'var(--up)' })
      + tx(160, 110, 'Overlap = liquidity peak', { anchor: 'middle', fill: 'var(--t2)' })
      + path('M 100,90 L 100,100 L 180,100 L 180,90', { stroke: 'var(--warn)', sw: 1.25 })
    );
  },

  'correlated-pairs'() {
    return svg(
      path('M 40,100 L 80,70 L 120,85 L 160,50 L 200,60 L 250,35', { stroke: 'var(--up)', sw: 1.75 })
      + path('M 40,110 L 80,85 L 120,95 L 160,65 L 200,72 L 250,50', { stroke: 'var(--acc)', sw: 1.75 })
      + tx(255, 35, 'EURUSD', { size: 9, fill: 'var(--up)' })
      + tx(255, 55, 'GBPUSD', { size: 9, fill: 'var(--acc-2)' })
      + tx(160, 140, 'Same theme → one risk budget', { anchor: 'middle', fill: 'var(--t2)' })
    );
  },

  'grid-bot'() {
    return svg(
      ln(40, 40, 200, 40, { stroke: 'var(--t4)', dash: '3 3' })
      + ln(40, 70, 200, 70, { stroke: 'var(--t4)', dash: '3 3' })
      + ln(40, 100, 200, 100, { stroke: 'var(--t4)', dash: '3 3' })
      + ln(40, 130, 200, 130, { stroke: 'var(--t4)', dash: '3 3' })
      + path('M 50,85 L 80,95 L 110,75 L 140,90 L 160,80', { stroke: 'var(--up)', sw: 1.5 })
      + path('M 160,80 L 200,40 L 250,20', { stroke: 'var(--down)', sw: 2 })
      + tx(60, 30, 'Grid levels', { size: 9 })
      + tx(210, 30, 'Trend loss', { size: 9, fill: 'var(--down)' })
    );
  },

  'martingale-ruin'() {
    return svg(
      path('M 30,40 L 60,55 L 90,35 L 120,70 L 150,50 L 180,100 L 210,80 L 250,145', { stroke: 'var(--down)', sw: 2 })
      + ln(30, 145, 280, 145, { stroke: 'var(--line)' })
      + tx(250, 140, 'Ruin', { fill: 'var(--down)' })
      + tx(40, 30, 'Equity', { size: 9 })
    );
  },

  'binary-breakeven'() {
    return svg(
      path('M 40,120 L 100,90 L 160,65 L 220,48 L 280,38', { stroke: 'var(--warn)', sw: 2 })
      + ln(40, 130, 280, 130, { stroke: 'var(--line)' })
      + tx(40, 24, 'Breakeven WR%', { size: 9, fill: 'var(--warn)' })
      + tx(200, 145, 'Payout % →', { size: 9 })
      + tx(100, 100, 'Lower payout', { size: 9, fill: 'var(--t3)' })
      + tx(100, 112, '= higher WR needed', { size: 9, fill: 'var(--t3)' })
    );
  },

  'expense-ratio-drag'() {
    return svg(
      path('M 40,120 L 100,90 L 160,55 L 230,25', { stroke: 'var(--up)', sw: 2 })
      + path('M 40,120 L 100,95 L 160,70 L 230,48', { stroke: 'var(--t3)', sw: 1.75 })
      + tx(235, 28, '0% fee', { size: 9, fill: 'var(--up)' })
      + tx(235, 52, 'With ER', { size: 9, fill: 'var(--t3)' })
      + tx(160, 145, 'Years →', { anchor: 'middle' })
    );
  },

  'ipo-lockup'() {
    return svg(
      ln(40, 80, 280, 80, { stroke: 'var(--line)' })
      + rect(40, 60, 100, 40, { fill: 'var(--acc-dim)', stroke: 'var(--acc)', rx: 2 })
      + rect(140, 60, 80, 40, { fill: 'var(--warn-dim)', stroke: 'var(--warn)', rx: 2 })
      + rect(220, 60, 60, 40, { fill: 'var(--down-dim)', stroke: 'var(--down)', rx: 2 })
      + tx(90, 85, 'Lockup', { anchor: 'middle', fill: 'var(--acc-2)', size: 10 })
      + tx(180, 85, 'Unlock', { anchor: 'middle', fill: 'var(--warn)', size: 10 })
      + tx(250, 85, 'Supply', { anchor: 'middle', fill: 'var(--down)', size: 9 })
      + tx(160, 130, 'IPO → time', { anchor: 'middle', fill: 'var(--t2)' })
    );
  },
};

/** Replace {{fig:name}} markers in HTML lesson body. */
export function injectFigures(html, lang = 'en') {
  if (!html || html.indexOf('{{fig:') === -1) return html;
  return html.replace(/\{\{fig:([a-z0-9-]+)\}\}/g, (_, name) => render(name, lang));
}

export function render(name, lang = 'en') {
  const build = FIGS[name];
  const cap = CAPTIONS[name];
  if (!build || !cap) {
    return `<div class="fig fig-missing"><div class="fig-cap mono">Missing figure: ${name}</div></div>`;
  }
  return `<figure class="fig">${build()}<figcaption class="fig-cap">${cap[lang] || cap.en}</figcaption></figure>`;
}

export const FIGURE_NAMES = Object.keys(FIGS);
