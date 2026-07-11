/* ============================================================
   options.js — Options course (split from stocks W4–W8).
   ============================================================ */

import { STOCKS_WEEKS, STOCKS_PLACEMENT } from './stocks.js';

/** Remap original stocks weeks 4–8 → options weeks 1–5 */
export const OPTIONS_WEEKS = STOCKS_WEEKS
  .filter((w) => w.id >= 4)
  .map((w, i) => ({ ...w, id: i + 1 }));

export const OPTIONS_PLACEMENT = (STOCKS_PLACEMENT || [])
  .filter((q) => (q.topic || 0) >= 4)
  .map((q) => ({ ...q, topic: Math.max(1, (q.topic || 4) - 3) }));

/** Equities-only weeks for Stocks course */
export const EQUITY_WEEKS = STOCKS_WEEKS.filter((w) => w.id <= 3);

export const EQUITY_PLACEMENT = (STOCKS_PLACEMENT || [])
  .filter((q) => (q.topic || 0) <= 3);
