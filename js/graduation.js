/* ============================================================
   graduation.js — S3 process graduation gates (trade-ready).
   ready = requirements met; P/L never decides graduation.
   ============================================================ */

import { store, KEYS } from './store.js';
import { SIM_SCENARIOS } from './sim/scenarios.js';

const TRADING = new Set(['crypto', 'futures', 'forex', 'stocks']);
const PORTFOLIO = new Set(['invest', 'spot']);
/** Exam-only school tracks (plus greeks depth). Binary also needs gate quiz. */
const EXAM_PLUS = new Set(['foundations', 'macro', 'tax', 'bots', 'binary', 'greeks']);

function simEvidence(trackId) {
  const scenarios = SIM_SCENARIOS.filter((s) => s.track === trackId);
  const all = store.get(KEYS.simTrades, []);
  const graded = all.filter((t) => {
    if (!t?.process) return false;
    if (t.track === trackId) return true;
    const sc = SIM_SCENARIOS.find((s) => s.id === t.scenarioId);
    return sc?.track === trackId;
  });
  const latest10 = graded.slice(0, 10);
  const passN = latest10.filter((t) => t.process.pass).length;
  const liqN = latest10.filter((t) =>
    t.reason === 'liquidated' || (t.process.fails || []).includes('liquidated')).length;
  return {
    scenarioCount: scenarios.length,
    tradeCount: graded.length,
    latest10Count: latest10.length,
    processPassRate: latest10.length ? passN / latest10.length : 0,
    processPassN: passN,
    liquidatedInLatest10: liqN,
  };
}

/**
 * @returns {{ ready: boolean, met: string[], missing: string[], evidence: object }}
 */
export function gradStatus(trackId, App) {
  const met = [];
  const missing = [];
  const evidence = {};
  const prog = App?.getCourse?.(trackId) || store.get(KEYS.course, {})[trackId] || {};
  const examOk = !!prog.examPassed;
  evidence.examPassedAt = prog.examPassed || null;
  evidence.examPct = prog.examPct ?? null;

  if (examOk) met.push('exam');
  else missing.push('exam');

  if (trackId === 'binary') {
    const gate = !!store.get(KEYS.binaryGate);
    evidence.binaryGate = gate;
    if (gate) met.push('binary_gate');
    else missing.push('binary_gate');
  }

  if (TRADING.has(trackId)) {
    const sim = simEvidence(trackId);
    evidence.sim = sim;
    if (sim.scenarioCount === 0) {
      // Futures/forex/stocks until S4 — graceful, never crash
      missing.push('sim_requires_s4');
    } else {
      if (sim.tradeCount >= 20) met.push('sim_trades_20');
      else missing.push('sim_trades_20');

      if (sim.latest10Count >= 10 && sim.processPassRate >= 0.8) met.push('sim_pass_rate_80');
      else missing.push('sim_pass_rate_80');

      if (sim.latest10Count >= 10 && sim.liquidatedInLatest10 === 0) met.push('sim_no_liq');
      else missing.push('sim_no_liq');
    }
  } else if (PORTFOLIO.has(trackId)) {
    const stats = store.get(KEYS.simStats, {});
    const pid = trackId === 'spot' ? 'portfolio_spot' : 'portfolio_invest';
    const st = stats[pid] || { runs: 0, pass: 0 };
    evidence.portfolio = { id: pid, runs: st.runs || 0, pass: st.pass || 0 };
    if ((st.pass || 0) >= 1) met.push('portfolio_adherence');
    else missing.push('portfolio_adherence');
  } else if (!EXAM_PLUS.has(trackId) && !TRADING.has(trackId) && !PORTFOLIO.has(trackId)) {
    // Unknown track id — exam only, no crash
    evidence.unknownTrack = true;
  }

  const gradStore = store.get(KEYS.graduation, {});
  evidence.gradAt = gradStore[trackId]?.gradAt || null;

  // no non-blocking soft misses after S5
  const ready = missing.length === 0;

  return { ready, met, missing, evidence };
}

/** Persist graduation (additive KEYS.graduation). Caller awards XP / opens cert. */
export function markGraduated(trackId, evidence) {
  const all = store.get(KEYS.graduation, {});
  all[trackId] = { gradAt: new Date().toISOString(), evidence: evidence || {} };
  store.set(KEYS.graduation, all);
  return all[trackId];
}

export function isGraduated(trackId) {
  const all = store.get(KEYS.graduation, {});
  return !!all[trackId]?.gradAt;
}

export { TRADING as GRAD_TRADING_TRACKS, PORTFOLIO as GRAD_PORTFOLIO_TRACKS };
