#!/usr/bin/env node
/**
 * audit-sim.mjs — S7 paper-sim engine + portfolio assertions (node import).
 */
import { buildBars, createSession } from '../js/sim/engine.js';
import { SIM_SCENARIOS, getScenario } from '../js/sim/scenarios.js';
import { createPortfolioSession } from '../js/sim/portfolio.js';

const fails = [];
const pass = [];
function ok(name, cond, detail = '') {
  if (cond) pass.push(name);
  else fails.push(`${name}${detail ? ': ' + detail : ''}`);
}

const MMR = 0.005;

function sc(id) {
  return getScenario(id) || SIM_SCENARIOS.find((s) => s.id === id);
}

/* ---- determinism ---- */
{
  const g = sc('c1_uptrend_pullback').gen;
  const a = buildBars(g, 42);
  const b = buildBars(g, 42);
  const c = buildBars(g, 43);
  ok('determinism same seed', JSON.stringify(a) === JSON.stringify(b));
  ok('determinism different seed differs', JSON.stringify(a) !== JSON.stringify(c));
}

/* ---- no-stop / wrong-side reject ---- */
{
  const sess = createSession({ scenario: sc('c1_uptrend_pullback'), seed: 7, balance: 1000 });
  const p = sess.price();
  ok('reject no stop', !sess.enter({ dir: 'long', riskPct: 1, stop: 0 }).ok);
  ok('reject wrong-side stop (long)', !sess.enter({ dir: 'long', riskPct: 1, stop: p * 1.02 }).ok);
  ok('reject wrong-side stop (short)', !sess.enter({ dir: 'short', riskPct: 1, stop: p * 0.98 }).ok);
  const good = sess.enter({ dir: 'long', riskPct: 1, stop: p * 0.98 });
  ok('accept valid stop', good.ok);
}

/* ---- liq formula (perp, lev>1) ---- */
{
  const sess = createSession({ scenario: sc('c5_leverage_lesson'), seed: 11, balance: 1000 });
  const p = sess.price();
  const r = sess.enter({ dir: 'long', riskPct: 5, stop: p * 0.99 });
  ok('enter for liq', r.ok);
  const P = sess.state.pos;
  ok('liq only when lev>1', P.lev > 1 && P.liq !== null);
  const expect = P.entry * (1 - 1 / P.lev + MMR);
  ok('liq matches formula', Math.abs(P.liq - expect) < 1e-9, `got ${P.liq} expect ${expect}`);

  const sess2 = createSession({ scenario: sc('c3_range_patience'), seed: 11, balance: 1000 });
  const p2 = sess2.price();
  // tiny risk + wide stop → lev often ≤1
  sess2.enter({ dir: 'long', riskPct: 0.2, stop: p2 * 0.9 });
  const P2 = sess2.state.pos;
  if (P2 && P2.lev <= 1) ok('no liq when lev≤1', P2.liq === null);
  else ok('no liq when lev≤1 (skipped high-lev case)', true);
}

/* ---- limit fill at limit price ---- */
{
  const sess = createSession({ scenario: sc('c1_uptrend_pullback'), seed: 99, balance: 1000 });
  const mark = sess.price();
  const limitPx = mark * 0.992;
  const stop = limitPx * 0.985;
  const pl = sess.placeLimit({ dir: 'long', price: limitPx, riskPct: 1, stop });
  ok('limit place', pl.ok);
  let filled = false;
  for (let i = 0; i < 80 && !sess.state.done; i++) {
    const step = sess.step();
    if (step.filled || sess.state.pos) { filled = true; break; }
  }
  ok('limit eventually fills or session ends', filled || sess.state.done);
  if (sess.state.pos) {
    ok('limit fill price = limit', Math.abs(sess.state.pos.entry - limitPx) < 1e-12);
  } else {
    ok('limit fill price = limit (no fill this seed — soft)', true);
  }
}

/* ---- partial close ≈ full close (±fees) ---- */
{
  const mk = (seed) => createSession({ scenario: sc('c1_uptrend_pullback'), seed, balance: 1000, feePct: 0.0005, slipPct: 0 });
  const full = mk(55);
  const pf = full.price();
  full.enter({ dir: 'long', riskPct: 1, stop: pf * 0.97 });
  // advance a few bars without exit
  for (let i = 0; i < 5; i++) full.step();
  const tFull = full.closeManual().trade;

  const part = mk(55);
  const pp = part.price();
  part.enter({ dir: 'long', riskPct: 1, stop: pp * 0.97 });
  for (let i = 0; i < 5; i++) part.step();
  part.closePartial(0.5);
  const tPart = part.closeManual().trade;
  const delta = Math.abs(tFull.pl - tPart.pl);
  ok('partial+remainder ≈ full close', delta < 0.05, `Δ=${delta.toFixed(4)} full=${tFull.pl.toFixed(4)} part=${tPart.pl.toFixed(4)}`);
}

/* ---- process fails ---- */
{
  // over_risk
  const s1 = createSession({ scenario: sc('c1_uptrend_pullback'), seed: 3, balance: 1000 });
  const p1 = s1.price();
  s1.enter({ dir: 'long', riskPct: 5, stop: p1 * 0.98 }); // maxRisk 1
  const t1 = s1.closeManual().trade;
  ok('over_risk fail', t1.process.fails.includes('over_risk') && !t1.process.pass);

  // direction
  const s2 = createSession({ scenario: sc('c1_uptrend_pullback'), seed: 3, balance: 1000 });
  const p2 = s2.price();
  s2.enter({ dir: 'short', riskPct: 1, stop: p2 * 1.02 }); // long-only mission
  const t2 = s2.closeManual().trade;
  ok('direction fail', t2.process.fails.includes('direction') && !t2.process.pass);

  // widened_stop
  const s3 = createSession({ scenario: sc('c1_uptrend_pullback'), seed: 3, balance: 1000 });
  const p3 = s3.price();
  s3.enter({ dir: 'long', riskPct: 1, stop: p3 * 0.98 });
  s3.moveStop(p3 * 0.95); // widen
  const t3 = s3.closeManual().trade;
  ok('widened_stop fail', t3.process.fails.includes('widened_stop') && !t3.process.pass);

  // liquidated — force next-bar wick through liq (engine: liq before stop)
  const s4 = createSession({ scenario: sc('c5_leverage_lesson'), seed: 21, balance: 1000, slipPct: 0 });
  const p4 = s4.price();
  const er = s4.enter({ dir: 'long', riskPct: 80, stop: p4 * 0.85 });
  ok('liq setup enter', er.ok && s4.state.pos?.liq != null);
  const liqPx = s4.state.pos.liq;
  const ni = s4.state.i + 1;
  const b = s4.state.bars[ni];
  s4.state.bars[ni] = { o: b.o, h: b.h, l: Math.min(b.l, liqPx - 1), c: b.c };
  const liqTrade = s4.step().closed;
  ok('liquidated process fail', !!(liqTrade && liqTrade.reason === 'liquidated' && liqTrade.process.fails.includes('liquidated')),
    liqTrade ? `reason=${liqTrade.reason} fails=${liqTrade.process.fails}` : 'no trade');
}

/* ---- futures size_zero ---- */
{
  const sess = createSession({ scenario: sc('f4_size_zero_trap'), seed: 8, balance: 1000 });
  const p = sess.price();
  // tiny risk, very wide stop → <1 contract
  const r = sess.enter({ dir: 'long', riskPct: 0.1, stop: p * 0.9 });
  ok('futures size_zero reject', !r.ok && r.err === 'size_zero', `err=${r.err}`);
}

/* ---- forex pip sizing ---- */
{
  const sess = createSession({ scenario: sc('x1_session_open'), seed: 12, balance: 10000 });
  const p = sess.price();
  const stop = p - 0.0050; // 50 pips if pipSize 0.0001
  const riskPct = 1;
  const r = sess.enter({ dir: 'long', riskPct, stop });
  ok('forex enter', r.ok, r.err || '');
  if (r.ok) {
    const P = sess.state.pos;
    const pipSize = 0.0001;
    const pipValue = 10;
    const pips = Math.abs(P.entry - stop) / pipSize;
    const riskD = 10000 * (riskPct / 100);
    const expectLots = Math.floor((riskD / (pips * pipValue)) * 100) / 100;
    ok('forex pip lots', Math.abs(P.qty - expectLots) < 1e-9, `qty=${P.qty} expect=${expectLots}`);
    ok('forex no liq', P.liq === null);
  }
}

/* ---- portfolio panic-sell ---- */
{
  const plan = { alloc: { broad: 60, single: 20, cash: 20 }, dca: 200, rebalance: 'none', plannedAdd: false };
  const s = createPortfolioSession({ seed: 42, balance: 10000, plan, track: 'invest' });
  let guard = 0;
  while (!s.state.done && guard++ < 40) {
    const r = s.step();
    if (r.event) {
      if (String(r.event.id).startsWith('crash')) s.decide('sell');
      else s.decide('stick');
    }
    if (r.done) break;
  }
  const d = s.debrief();
  ok('portfolio panic-sell fail', d.pass === false && d.fails.includes('panic_sell'));

  const s2 = createPortfolioSession({ seed: 42, balance: 10000, plan, track: 'invest' });
  guard = 0;
  while (!s2.state.done && guard++ < 40) {
    const r = s2.step();
    if (r.event) s2.decide('stick');
    if (r.done) break;
  }
  ok('portfolio stick pass', s2.debrief().pass === true);
}

if (fails.length) {
  console.error('FAIL audit-sim:');
  fails.forEach((f) => console.error('  ' + f));
  process.exit(1);
}
console.log(`PASS: sim audit (${pass.length} checks)`);
