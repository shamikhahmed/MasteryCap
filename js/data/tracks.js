/* ============================================================
   tracks.js — instrument-track registry. All tracks LIVE with
   full bilingual lessons, quizzes and placement tests.
   ============================================================ */

import { CRYPTO_WEEKS, CRYPTO_PLACEMENT } from './course.js';
import { STOCKS_WEEKS, STOCKS_PLACEMENT } from './stocks.js';
import { FUTURES_WEEKS, FUTURES_PLACEMENT } from './futures.js';
import { FOREX_WEEKS, FOREX_PLACEMENT } from './forex.js';
import { SPOT_WEEKS, SPOT_PLACEMENT } from './spot.js';
import { BINARY_WEEKS, BINARY_PLACEMENT } from './binary.js';
import { INVEST_WEEKS, INVEST_PLACEMENT } from './invest.js';
import { BOTS_WEEKS, BOTS_PLACEMENT } from './bots.js';

export const TRACKS = [
  {
    id: 'crypto',
    name: { en: 'Crypto & Perps', ur: 'Crypto & Perps' },
    blurb: { en: 'Spot, leverage, on-chain, discipline', ur: 'Spot, leverage, on-chain, discipline' },
    status: 'live',
    weeks: CRYPTO_WEEKS,
    placement: CRYPTO_PLACEMENT,
  },
  {
    id: 'stocks',
    name: { en: 'Stocks & Options', ur: 'Stocks & Options' },
    blurb: { en: 'Equities, options, the greeks', ur: 'Equities, options, greeks' },
    status: 'live',
    weeks: STOCKS_WEEKS,
    placement: STOCKS_PLACEMENT,
  },
  {
    id: 'invest',
    name: { en: 'Investing: PSX & Beyond', ur: 'Investing: PSX & Beyond' },
    blurb: { en: 'PSX, US stocks, IPOs, funds', ur: 'PSX, US stocks, IPOs, funds' },
    status: 'live',
    weeks: INVEST_WEEKS,
    placement: INVEST_PLACEMENT,
  },
  {
    id: 'futures',
    name: { en: 'Futures', ur: 'Futures' },
    blurb: { en: 'Contracts, margin, leverage', ur: 'Contracts, margin, leverage' },
    status: 'live',
    weeks: FUTURES_WEEKS,
    placement: FUTURES_PLACEMENT,
  },
  {
    id: 'forex',
    name: { en: 'Forex', ur: 'Forex' },
    blurb: { en: 'Pairs, pips, sessions', ur: 'Pairs, pips, sessions' },
    status: 'live',
    weeks: FOREX_WEEKS,
    placement: FOREX_PLACEMENT,
  },
  {
    id: 'spot',
    name: { en: 'Spot vs Derivatives', ur: 'Spot vs Derivatives' },
    blurb: { en: 'Ownership vs contracts', ur: 'Ownership vs contracts' },
    status: 'live',
    weeks: SPOT_WEEKS,
    placement: SPOT_PLACEMENT,
  },
  {
    id: 'bots',
    name: { en: 'Bots & Copy Trading', ur: 'Bots & Copy Trading' },
    blurb: { en: 'Automation, signals, scam defense', ur: 'Automation, signals, scam defense' },
    status: 'live',
    weeks: BOTS_WEEKS,
    placement: BOTS_PLACEMENT,
  },
  {
    id: 'binary',
    name: { en: 'Binary Options', ur: 'Binary Options' },
    blurb: { en: 'High-risk — know the traps first', ur: 'High-risk — pehle traps samjho' },
    status: 'live',
    warning: true,
    weeks: BINARY_WEEKS,
    placement: BINARY_PLACEMENT,
  },
];

export function getTrack(id) {
  return TRACKS.find((t) => t.id === id) || TRACKS[0];
}
