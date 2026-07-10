/* ============================================================
   chartgen.js — seeded synthetic OHLC + labeled structures (P5).
   ============================================================ */

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

/**
 * Generate a labeled chart scenario.
 * Returns { ohlc, label, mode, meta }
 * label: 'trend_up'|'trend_down'|'range'|'reversal'
 */
export function generateChart(seed = Date.now() % 1e9, mode = null) {
  const rng = mulberry32(seed >>> 0);
  const modes = ['classify', 'tap_resistance', 'engulfing_mcq'];
  const m = mode || modes[Math.floor(rng() * modes.length)];
  const start = 100 + rng() * 50;

  if (m === 'classify') {
    const kind = ['trend_up', 'trend_down', 'range', 'reversal'][Math.floor(rng() * 4)];
    let ohlc;
    if (kind === 'trend_up') ohlc = walk(rng, start, 30, 0.004, 0.008);
    else if (kind === 'trend_down') ohlc = walk(rng, start, 30, -0.004, 0.008);
    else if (kind === 'range') {
      ohlc = walk(rng, start, 30, 0, 0.006);
      const mid = start;
      ohlc = ohlc.map((c, i) => {
        const t = Math.sin(i / 3) * mid * 0.02;
        const o = mid + t;
        const cl = mid + Math.sin((i + 1) / 3) * mid * 0.02;
        return candle(o, Math.max(o, cl) * 1.004, Math.min(o, cl) * 0.996, cl);
      });
    } else {
      const up = walk(rng, start, 18, 0.005, 0.007);
      const last = up[up.length - 1].c;
      const down = walk(rng, last, 12, -0.006, 0.008);
      ohlc = up.concat(down);
    }
    return {
      mode: m, seed, ohlc, label: kind,
      prompt: {
        en: 'Last ~30 candles: trend up, trend down, range, or reversal?',
        ur: 'Akhri ~30 candles: trend up, trend down, range, ya reversal?',
      },
      options: {
        en: ['Trend up', 'Trend down', 'Range', 'Reversal'],
        ur: ['Trend up', 'Trend down', 'Range', 'Reversal'],
      },
      correct: { trend_up: 0, trend_down: 1, range: 2, reversal: 3 }[kind],
      explain: {
        en: `Structure labeled as ${kind.replace('_', ' ')}.`,
        ur: `Structure: ${kind.replace('_', ' ')}.`,
      },
    };
  }

  if (m === 'tap_resistance') {
    const floor = start * 0.97;
    const ceil = start * 1.03;
    const ohlc = [];
    let p = (floor + ceil) / 2;
    for (let i = 0; i < 28; i++) {
      const target = i % 7 < 3 ? ceil * 0.998 : floor * 1.002;
      const close = p + (target - p) * (0.3 + rng() * 0.4);
      ohlc.push(candle(p, Math.max(p, close, ceil * (0.99 + rng() * 0.008)), Math.min(p, close, floor * (1.01 - rng() * 0.008)), close));
      p = close;
    }
    // touch resistance near end
    const last = ohlc.length - 2;
    ohlc[last] = candle(ceil * 0.995, ceil * 1.001, ceil * 0.99, ceil * 0.992);
    return {
      mode: m, seed, ohlc,
      band: { lo: ceil * 0.995, hi: ceil * 1.005 },
      prompt: {
        en: 'Tap the resistance zone (ceiling of the range).',
        ur: 'Resistance zone pe tap karo (range ki ceiling).',
      },
      explain: {
        en: 'Resistance is the upper bound of the range where price repeatedly rejected.',
        ur: 'Resistance range ki upper bound hai jahan price baar baar reject hui.',
      },
    };
  }

  // engulfing_mcq
  const ohlc = walk(rng, start, 24, -0.003, 0.007);
  const at = 20;
  // support near lows
  const support = Math.min(...ohlc.slice(10, 20).map((c) => c.l));
  ohlc[at - 1] = candle(support * 1.01, support * 1.015, support * 0.998, support * 1.002);
  injectEngulfing(ohlc, at, true);
  injectPin(ohlc, at - 3, true);
  const nextUp = true; // engulfing at support → higher-probability bounce framing (educational, not a promise)
  return {
    mode: m, seed, ohlc,
    highlight: { lo: support * 0.997, hi: support * 1.008 },
    prompt: {
      en: 'Bullish engulfing at support — which next-move framing is more consistent with the structure?',
      ur: 'Support pe bullish engulfing — structure ke sath konsa next-move framing zyada consistent?',
    },
    options: {
      en: ['Continuation lower is more likely', 'Bounce / reclaim of the level is the higher-probability read', 'Pattern guarantees a +10% move'],
      ur: ['Neeche continuation zyada likely', 'Level ka bounce/reclaim higher-probability read', 'Pattern +10% move guarantee karta hai'],
    },
    correct: 1,
    explain: {
      en: 'Context + engulfing at support is a higher-probability bounce read — never a guarantee. Option C violates content policy.',
      ur: 'Support pe engulfing higher-probability bounce read hai — guarantee nahi. Option C content policy torta hai.',
    },
  };
}

export function checkTap(price, band, tolPct = 0.015) {
  if (price == null || !band) return false;
  const mid = (band.lo + band.hi) / 2;
  const pad = Math.abs(mid) * tolPct;
  return price >= band.lo - pad && price <= band.hi + pad;
}
