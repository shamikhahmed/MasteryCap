/* ============================================================
   tracks.js — instrument-track registry. All tracks LIVE with
   full bilingual lessons, quizzes and placement tests.
   ============================================================ */

import { CRYPTO_WEEKS, CRYPTO_PLACEMENT } from './course.js';
import { STOCKS_WEEKS, STOCKS_PLACEMENT } from './stocks.js';
import { OPTIONS_WEEKS, OPTIONS_PLACEMENT, EQUITY_WEEKS, EQUITY_PLACEMENT } from './options.js';
import { FUTURES_WEEKS, FUTURES_PLACEMENT } from './futures.js';
import { FOREX_WEEKS, FOREX_PLACEMENT } from './forex.js';
import { SPOT_WEEKS, SPOT_PLACEMENT } from './spot.js';
import { BINARY_WEEKS, BINARY_PLACEMENT } from './binary.js';
import { INVEST_WEEKS, INVEST_PLACEMENT } from './invest.js';
import { BOTS_WEEKS, BOTS_PLACEMENT } from './bots.js';
import { FOUNDATIONS_WEEKS, FOUNDATIONS_PLACEMENT } from './foundations.js';
import { GREEKS_WEEKS, GREEKS_PLACEMENT } from './greeks.js';
import { TAX_WEEKS, TAX_PLACEMENT } from './tax.js';
import { MACRO_WEEKS, MACRO_PLACEMENT } from './macro.js';
import { enrichTrack } from './enrich.js';

export const TRACKS = [
  {
    id: 'foundations',
    name: { en: 'Foundations', ur: 'Foundations' },
    blurb: { en: 'Zero to ready: school, scams, account, orders, paper', ur: 'Zero to ready: school, scams, account, orders, paper' },
    status: 'live',
    weeks: FOUNDATIONS_WEEKS,
    placement: FOUNDATIONS_PLACEMENT,
  },
  {
    id: 'macro',
    name: { en: 'Macro Backdrop', ur: 'Macro Backdrop' },
    blurb: { en: 'Inflation, rates, FX, liquidity — context not crystal ball', ur: 'Inflation, rates, FX, liquidity — context, crystal ball nahi' },
    status: 'live',
    weeks: MACRO_WEEKS,
    placement: MACRO_PLACEMENT,
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
    id: 'tax',
    name: { en: 'Tax Literacy', ur: 'Tax Literacy' },
    blurb: { en: 'PK framing + records — not legal advice', ur: 'PK framing + records — legal advice nahi' },
    status: 'live',
    weeks: TAX_WEEKS,
    placement: TAX_PLACEMENT,
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
    id: 'stocks',
    name: { en: 'Stocks', ur: 'Stocks' },
    blurb: { en: 'Equities: sessions, earnings, structure', ur: 'Equities: sessions, earnings, structure' },
    status: 'live',
    weeks: EQUITY_WEEKS.length ? EQUITY_WEEKS : STOCKS_WEEKS.filter((w) => w.id <= 3),
    placement: EQUITY_PLACEMENT.length ? EQUITY_PLACEMENT : STOCKS_PLACEMENT,
  },
  {
    id: 'options',
    name: { en: 'Options', ur: 'Options' },
    blurb: { en: 'Calls, puts, premium, basic strategies', ur: 'Calls, puts, premium, basic strategies' },
    status: 'live',
    weeks: OPTIONS_WEEKS,
    placement: OPTIONS_PLACEMENT,
  },
  {
    id: 'greeks',
    name: { en: 'Options Greeks Deep', ur: 'Options Greeks Deep' },
    blurb: { en: 'Delta gamma theta vega — defined risk', ur: 'Delta gamma theta vega — defined risk' },
    status: 'live',
    weeks: GREEKS_WEEKS,
    placement: GREEKS_PLACEMENT,
  },
  {
    id: 'crypto',
    name: { en: 'Crypto & Perps', ur: 'Crypto & Perps' },
    blurb: { en: 'Spot, leverage, on-chain, discipline', ur: 'Spot, leverage, on-chain, discipline' },
    status: 'live',
    weeks: CRYPTO_WEEKS,
    placement: CRYPTO_PLACEMENT,
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
    id: 'bots',
    name: { en: 'Bots & Copy Trading', ur: 'Bots & Copy Trading' },
    blurb: { en: 'Automation, signals, scam defense', ur: 'Automation, signals, scam defense' },
    status: 'live',
    elective: true,
    warning: true,
    weeks: BOTS_WEEKS,
    placement: BOTS_PLACEMENT,
  },
  {
    id: 'binary',
    name: { en: 'Binary Options', ur: 'Binary Options' },
    blurb: { en: 'High-risk — know the traps first', ur: 'High-risk — pehle traps samjho' },
    status: 'live',
    elective: true,
    warning: true,
    weeks: BINARY_WEEKS,
    placement: BINARY_PLACEMENT,
  },
];

export function getTrack(id) {
  return enrichTrack(TRACKS.find((t) => t.id === id) || TRACKS[0]);
}
