/* ============================================================
   tracks.js — instrument-track registry. All tracks LIVE with
   full bilingual lessons, quizzes and placement tests.
   ============================================================ */

import { CRYPTO_WEEKS, CRYPTO_PLACEMENT } from './crypto-deep.js';
import { STOCKS_DEEP_WEEKS, STOCKS_DEEP_PLACEMENT } from './stocks-deep.js';
import { OPTIONS_DEEP_WEEKS, OPTIONS_DEEP_PLACEMENT } from './options-deep.js';
import { FUTURES_DEEP_WEEKS, FUTURES_DEEP_PLACEMENT } from './futures-deep.js';
import { FOREX_DEEP_WEEKS, FOREX_DEEP_PLACEMENT } from './forex-deep.js';
import { SPOT_DEEP_WEEKS, SPOT_DEEP_PLACEMENT } from './spot-deep.js';
import { BINARY_WEEKS, BINARY_PLACEMENT } from './binary.js';
import { INVEST_DEEP_WEEKS, INVEST_DEEP_PLACEMENT } from './invest-deep.js';
import { BOTS_WEEKS, BOTS_PLACEMENT } from './bots.js';
import { FOUNDATIONS_WEEKS, FOUNDATIONS_PLACEMENT } from './foundations.js';
import { GREEKS_DEEP_WEEKS, GREEKS_DEEP_PLACEMENT } from './greeks-deep.js';
import { TAX_DEEP_WEEKS, TAX_DEEP_PLACEMENT } from './tax-deep.js';
import { MACRO_DEEP_WEEKS, MACRO_DEEP_PLACEMENT } from './macro-deep.js';
import {
  PF_BUDGET_WEEKS, PF_BUDGET_PLACEMENT, PF_DEBT_WEEKS, PF_DEBT_PLACEMENT,
} from './personal-finance.js';
import {
  CAREER_INTERVIEW_WEEKS, CAREER_INTERVIEW_PLACEMENT, CAREER_REMOTE_WEEKS, CAREER_REMOTE_PLACEMENT,
} from './career-systems.js';
import {
  PB_RESEARCH_WEEKS, PB_RESEARCH_PLACEMENT, PB_LAUNCH_WEEKS, PB_LAUNCH_PLACEMENT,
} from './product-builders.js';
import {
  WELLNESS_SLEEP_WEEKS, WELLNESS_SLEEP_PLACEMENT, WELLNESS_ATTENTION_WEEKS, WELLNESS_ATTENTION_PLACEMENT,
} from './wellness-focus.js';
import { enrichTrack } from './enrich.js';

/** Trading Literacy family only — excludes campus extension tracks. */
export const TRADING_TRACK_IDS = [
  'foundations', 'macro', 'invest', 'tax', 'spot', 'stocks',
  'options', 'greeks', 'crypto', 'futures', 'forex', 'bots', 'binary',
];

export const TRACKS = [
  {
    id: 'foundations',
    name: { en: 'Foundations', ur: 'Bunyad' },
    blurb: { en: 'Zero to ready: school, scams, account, orders, paper', ur: 'Zero se ready: school, scams, account, orders, paper' },
    status: 'live',
    weeks: FOUNDATIONS_WEEKS,
    placement: FOUNDATIONS_PLACEMENT,
  },
  {
    id: 'macro',
    name: { en: 'Macro Literacy', ur: 'Macro Literacy' },
    blurb: { en: 'Backdrop for size — not crystal ball (4 weeks)', ur: 'Backdrop for size — crystal ball nahi' },
    status: 'live',
    weeks: MACRO_DEEP_WEEKS,
    placement: MACRO_DEEP_PLACEMENT,
  },
  {
    id: 'invest',
    name: { en: 'Investing Literacy', ur: 'Investing Literacy' },
    blurb: { en: 'Invest vs trade, statements, costs, process (4 weeks)', ur: 'Invest vs trade, statements, costs, process' },
    status: 'live',
    weeks: INVEST_DEEP_WEEKS,
    placement: INVEST_DEEP_PLACEMENT,
  },
  {
    id: 'tax',
    name: { en: 'Tax Literacy', ur: 'Tax Literacy' },
    blurb: { en: 'Framing, records, cross-border caution — not advice', ur: 'Framing, records, cross-border — advice nahi' },
    status: 'live',
    weeks: TAX_DEEP_WEEKS,
    placement: TAX_DEEP_PLACEMENT,
  },
  {
    id: 'spot',
    name: { en: 'Spot vs Derivatives', ur: 'Spot vs Derivatives' },
    blurb: { en: 'Ownership vs contracts — failure modes (4 weeks)', ur: 'Ownership vs contracts — failure modes' },
    status: 'live',
    weeks: SPOT_DEEP_WEEKS,
    placement: SPOT_DEEP_PLACEMENT,
  },
  {
    id: 'stocks',
    name: { en: 'Stocks Literacy', ur: 'Stocks Literacy' },
    blurb: { en: 'Shares, risk %, scams, practice loop (6 weeks)', ur: 'Shares, risk %, scams, practice loop' },
    status: 'live',
    weeks: STOCKS_DEEP_WEEKS,
    placement: STOCKS_DEEP_PLACEMENT,
  },
  {
    id: 'options',
    name: { en: 'Options Literacy', ur: 'Options Literacy' },
    blurb: { en: 'Calls/puts, decay, defined risk (4 weeks)', ur: 'Calls/puts, decay, defined risk' },
    status: 'live',
    weeks: OPTIONS_DEEP_WEEKS,
    placement: OPTIONS_DEEP_PLACEMENT,
  },
  {
    id: 'greeks',
    name: { en: 'Greeks Literacy', ur: 'Greeks Literacy' },
    blurb: { en: 'Delta theta vega gamma — dials not salary', ur: 'Delta theta vega gamma — dials' },
    status: 'live',
    weeks: GREEKS_DEEP_WEEKS,
    placement: GREEKS_DEEP_PLACEMENT,
  },
  {
    id: 'crypto',
    name: { en: 'Crypto Literacy', ur: 'Crypto Literacy' },
    blurb: { en: 'Custody, fees, spot vs leverage, scams, process', ur: 'Custody, fees, spot vs leverage, scams, process' },
    status: 'live',
    weeks: CRYPTO_WEEKS,
    placement: CRYPTO_PLACEMENT,
  },
  {
    id: 'futures',
    name: { en: 'Futures Literacy', ur: 'Futures Literacy' },
    blurb: { en: 'Contracts, ticks, margin, roll (4 weeks)', ur: 'Contracts, ticks, margin, roll' },
    status: 'live',
    weeks: FUTURES_DEEP_WEEKS,
    placement: FUTURES_DEEP_PLACEMENT,
  },
  {
    id: 'forex',
    name: { en: 'Forex Literacy', ur: 'Forex Literacy' },
    blurb: { en: 'Pairs, carry honesty, scams, practice loop (6 weeks)', ur: 'Pairs, carry, scams, practice loop' },
    status: 'live',
    weeks: FOREX_DEEP_WEEKS,
    placement: FOREX_DEEP_PLACEMENT,
  },
  {
    id: 'bots',
    name: { en: 'Bots & Copy Trading', ur: 'Bots aur Copy Trading' },
    blurb: { en: 'Automation, signals, scam defense', ur: 'Automation, signals, scam se bachao' },
    status: 'live',
    elective: true,
    warning: true,
    weeks: BOTS_WEEKS,
    placement: BOTS_PLACEMENT,
  },
  {
    id: 'binary',
    name: { en: 'Binary Options', ur: 'Binary Options (elective)' },
    blurb: { en: 'High-risk — know the traps first', ur: 'High-risk — pehle traps samjho' },
    status: 'live',
    elective: true,
    warning: true,
    weeks: BINARY_WEEKS,
    placement: BINARY_PLACEMENT,
  },
  /* —— Campus extension families (v42.4) —— */
  {
    id: 'pf-budget',
    name: { en: 'Budget Basics', ur: 'Budget Bunyad' },
    blurb: { en: 'Cash flow, needs/wants, simple systems', ur: 'Cash flow, needs/wants, simple systems' },
    status: 'live',
    family: 'personal-finance',
    weeks: PF_BUDGET_WEEKS,
    placement: PF_BUDGET_PLACEMENT,
  },
  {
    id: 'pf-debt',
    name: { en: 'Debt & Emergency Fund', ur: 'Debt aur Emergency Fund' },
    blurb: { en: 'Good vs bad debt, buffer, paydown', ur: 'Achha/bura debt, buffer, paydown' },
    status: 'live',
    family: 'personal-finance',
    weeks: PF_DEBT_WEEKS,
    placement: PF_DEBT_PLACEMENT,
  },
  {
    id: 'career-interviews',
    name: { en: 'Interview Systems', ur: 'Interview Systems' },
    blurb: { en: 'STAR stories, rounds, offers', ur: 'STAR stories, rounds, offers' },
    status: 'live',
    family: 'career-systems',
    weeks: CAREER_INTERVIEW_WEEKS,
    placement: CAREER_INTERVIEW_PLACEMENT,
  },
  {
    id: 'career-remote',
    name: { en: 'Remote Work Craft', ur: 'Remote Work Craft' },
    blurb: { en: 'Async comms, overlap, boundaries', ur: 'Async comms, overlap, boundaries' },
    status: 'live',
    family: 'career-systems',
    weeks: CAREER_REMOTE_WEEKS,
    placement: CAREER_REMOTE_PLACEMENT,
  },
  {
    id: 'pb-research',
    name: { en: 'Research → MVP', ur: 'Research → MVP' },
    blurb: { en: 'Problem brief, scope, user loop', ur: 'Problem brief, scope, user loop' },
    status: 'live',
    family: 'product-builders',
    weeks: PB_RESEARCH_WEEKS,
    placement: PB_RESEARCH_PLACEMENT,
  },
  {
    id: 'pb-launch',
    name: { en: 'Launch Discipline', ur: 'Launch Discipline' },
    blurb: { en: 'Checklist, honest marketing, post-ship loop', ur: 'Checklist, imandar marketing, post-ship' },
    status: 'live',
    family: 'product-builders',
    weeks: PB_LAUNCH_WEEKS,
    placement: PB_LAUNCH_PLACEMENT,
  },
  {
    id: 'wellness-sleep',
    name: { en: 'Sleep & Recovery', ur: 'Sleep aur Recovery' },
    blurb: { en: 'Sleep hygiene, wind-down, naps', ur: 'Sleep hygiene, wind-down, naps' },
    status: 'live',
    family: 'wellness-focus',
    weeks: WELLNESS_SLEEP_WEEKS,
    placement: WELLNESS_SLEEP_PLACEMENT,
  },
  {
    id: 'wellness-attention',
    name: { en: 'Focus & Burnout', ur: 'Focus aur Burnout' },
    blurb: { en: 'Attention budget, digital hygiene, stress', ur: 'Attention budget, digital hygiene, stress' },
    status: 'live',
    family: 'wellness-focus',
    weeks: WELLNESS_ATTENTION_WEEKS,
    placement: WELLNESS_ATTENTION_PLACEMENT,
  },
];

export function getTrack(id) {
  return enrichTrack(TRACKS.find((t) => t.id === id) || TRACKS[0]);
}
