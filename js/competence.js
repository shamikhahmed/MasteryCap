/* ============================================================
   competence.js — can / can't-yet statements per live track (v49.2).
   Derived from weeks + sim process evidence. Not a license.
   ============================================================ */

import { store, KEYS } from './store.js';
import { TRACKS } from './data/tracks.js';
import { SIM_SCENARIOS } from './sim/scenarios.js';
import { isGraduated } from './graduation.js';

function weekDone(prog, weekId) {
  return ['completed', 'mastered'].includes(prog?.weekStatus?.[weekId]);
}

function simForTrack(trackId) {
  const all = store.get(KEYS.simTrades, []);
  const graded = all.filter((t) => {
    if (!t?.process) return false;
    if (t.track === trackId) return true;
    const sc = SIM_SCENARIOS.find((s) => s.id === t.scenarioId);
    return sc?.track === trackId;
  });
  const latest = graded.slice(0, 10);
  const passN = latest.filter((t) => t.process.pass).length;
  return {
    n: graded.length,
    latest: latest.length,
    passRate: latest.length ? passN / latest.length : 0,
  };
}

/**
 * @returns {{ trackId: string, name: object, can: object[], cant: object[], ready: boolean }[]}
 */
export function competenceStatements(App) {
  const out = [];
  for (const t of TRACKS) {
    if (t.status !== 'live') continue;
    const prog = App.getCourse?.(t.id) || {};
    const done = t.weeks.filter((w) => weekDone(prog, w.id)).length;
    const total = t.weeks.length || 1;
    const pct = done / total;
    const sim = simForTrack(t.id);
    const ready = isGraduated(t.id);
    const can = [];
    const cant = [];

    if (pct >= 0.5) {
      can.push({
        en: `Complete ~${Math.round(pct * 100)}% of ${t.name.en} weeks on paper literacy`,
        ur: `${t.name.ur} weeks ~${Math.round(pct * 100)}% paper literacy`,
      });
    } else {
      cant.push({
        en: `Finish more ${t.name.en} weeks (now ${done}/${total})`,
        ur: `${t.name.ur} weeks zyada complete karo (${done}/${total})`,
      });
    }

    if (prog.examPassed) {
      can.push({ en: 'Pass the track exam gate', ur: 'Track exam gate pass' });
    } else if (pct < 1) {
      cant.push({ en: 'Pass the track exam when weeks are ready', ur: 'Weeks ready hon to exam pass' });
    }

    const trading = ['crypto', 'futures', 'forex', 'stocks', 'options'].includes(t.id);
    if (trading) {
      if (sim.latest >= 5 && sim.passRate >= 0.7) {
        can.push({
          en: `Show process pass ≥70% on recent sim (${sim.latest} trades)`,
          ur: `Recent sim pe process ≥70% (${sim.latest} trades)`,
        });
      } else {
        cant.push({
          en: 'Log ≥5 sim trades with process pass ≥70% (latest 10)',
          ur: '≥5 sim trades, process ≥70% (latest 10)',
        });
      }
    }

    if (ready) {
      can.push({
        en: 'Meet TRADE-READY gates for this track (self-issued)',
        ur: 'Is track pe TRADE-READY gates (self-issued)',
      });
    }

    out.push({
      trackId: t.id,
      name: t.name,
      can,
      cant,
      ready,
      done,
      total,
    });
  }
  return out;
}
