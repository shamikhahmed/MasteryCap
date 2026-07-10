/* ============================================================
   progress.js — equity curve, cumulative win-rate, emotion
   frequency, weeks completed. Self-contained SVG.
   ============================================================ */

import { TRACKS } from '../data/tracks.js';
import { icon, TRACK_ICON } from '../icons.js';
import { store, KEYS } from '../store.js';
import { getDrillStats, drillTypes, typeLabel } from '../drills.js';

const EMO = {
  calm: { label: 'Calm', color: 'var(--up)' },
  fomo: { label: 'FOMO', color: 'var(--warn)' },
  revenge: { label: 'Revenge', color: 'var(--down)' },
  greed: { label: 'Greed', color: 'var(--down)' },
  bored: { label: 'Bored', color: 'var(--t2)' },
};

export function renderProgress(App, c) {
  const lang = App.lang;
  const trades = App.getTrades().slice().reverse();
  const balance = App.getBalance();

  const header = `<div class="lt-head"><div class="kicker">${App.t('nav_progress')}</div><h1>${lang === 'en' ? 'Your progress' : 'Aapki progress'}</h1></div>`;

  if (!trades.length) {
    c.innerHTML = `<div class="screen">${header}${weeksPanel(App)}${drillsPanel(App)}
      <div class="panel mt14"><div class="empty">${icon('progress', { size: 40, cls: 'e-ic', sw: 1.3 })}${App.t('no_data')}</div></div></div>`;
    return;
  }

  const totalPl = trades.reduce((s, t) => s + (Number(t.pl) || 0), 0);
  const base = balance - totalPl;
  const equity = [base]; let run = base;
  trades.forEach((t) => { run += Number(t.pl) || 0; equity.push(run); });

  const winTrend = []; let w = 0;
  trades.forEach((t, i) => { if (Number(t.pl) > 0) w++; winTrend.push((w / (i + 1)) * 100); });

  const freq = {}; trades.forEach((t) => { freq[t.emotion] = (freq[t.emotion] || 0) + 1; });
  const maxFreq = Math.max(...Object.values(freq), 1);
  const up = totalPl >= 0;

  c.innerHTML = `<div class="screen">${header}

    <div class="panel" style="margin-bottom:14px">
      <div class="panel-h"><span class="ph-t">${App.t('pl_curve')}</span><span class="metric-big ${up ? 'up' : 'down'}">${App.money(totalPl, { sign: totalPl > 0 })}</span></div>
      <div class="pad chart-box" style="height:150px;padding-bottom:8px">${App.sparkline(equity, { id: 'pc', color: 'auto', animate: true })}</div>
    </div>

    <div class="panel" style="margin-bottom:14px">
      <div class="panel-h"><span class="ph-t">${App.t('winrate_trend')}</span><span class="metric-big">${Math.round(winTrend[winTrend.length - 1])}%</span></div>
      <div class="pad chart-box" style="height:110px;padding-bottom:8px">${App.sparkline(winTrend, { id: 'wr', color: 'acc', animate: true })}</div>
    </div>

    <div class="panel" style="margin-bottom:14px">
      <div class="panel-h"><span class="ph-t">${App.t('emo_freq')}</span></div>
      <div class="pad">${Object.entries(freq).sort((a, b) => b[1] - a[1]).map(([e, n]) => {
        const info = EMO[e] || { label: e, color: 'var(--t3)' };
        return `<div class="bar-line"><div class="bl-l">${info.label}</div><div class="bl-track"><div class="bl-fill" style="width:${(n / maxFreq) * 100}%;background:${info.color}"></div></div><div class="bl-v mono">${n}</div></div>`;
      }).join('')}</div>
    </div>

    ${weeksPanel(App)}
    ${drillsPanel(App)}
  </div>`;
}

function drillsPanel(App) {
  const lang = App.lang;
  const stats = getDrillStats(store, KEYS);
  const by = stats.byType || {};
  const types = drillTypes().filter((t) => by[t] && by[t].attempts > 0);
  if (!types.length && !(stats.attempts > 0)) {
    return `<div class="panel mt14"><div class="panel-h"><span class="ph-t">${App.t('drill_accuracy')}</span></div>
      <div class="pad" style="font-size:13.5px;color:var(--t3)">${App.t('drill_none')}</div></div>`;
  }
  const rows = (types.length ? types : drillTypes()).map((t) => {
    const s = by[t] || { attempts: 0, correct: 0 };
    const pct = s.attempts ? Math.round((s.correct / s.attempts) * 100) : 0;
    return `<div class="bar-line">
      <div class="bl-l" style="width:110px;font-size:12px">${typeLabel(t, lang).split('·')[0].trim()}</div>
      <div class="bl-track"><div class="bl-fill" style="width:${pct}%;background:var(--acc)"></div></div>
      <div class="bl-v mono">${pct}%</div>
    </div>`;
  }).join('');
  const overall = stats.attempts ? Math.round((stats.correct / stats.attempts) * 100) : 0;
  return `<div class="panel mt14"><div class="panel-h"><span class="ph-t">${App.t('drill_accuracy')}</span><span class="metric-big">${overall}%</span></div><div class="pad">${rows}</div></div>`;
}

function weeksPanel(App) {
  const lang = App.lang;
  const rows = TRACKS.map((t) => {
    const prog = App.getCourse(t.id);
    const done = t.weeks.filter((w) => ['completed', 'mastered'].includes(prog.weekStatus[w.id])).length;
    const p = t.weeks.length ? (done / t.weeks.length) * 100 : 0;
    return `<div class="bar-line">
      <div class="bl-l hstack" style="gap:8px">${icon(TRACK_ICON[t.id], { size: 15 })}<span>${t.name[lang].split(' ')[0]}</span></div>
      <div class="bl-track"><div class="bl-fill" style="width:${p}%;background:var(--acc)"></div></div>
      <div class="bl-v mono">${done}/${t.weeks.length}</div>
    </div>`;
  }).join('');
  return `<div class="panel"><div class="panel-h"><span class="ph-t">${App.t('weeks_done')}</span></div><div class="pad">${rows}</div></div>`;
}
