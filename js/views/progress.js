/* ============================================================
   progress.js — equity curve, cumulative win-rate, emotion
   frequency, weeks completed. Self-contained SVG.
   ============================================================ */

import { TRACKS } from '../data/tracks.js';
import { icon, TRACK_ICON } from '../icons.js';
import { store, KEYS } from '../store.js';
import { getDrillStats, drillTypes, typeLabel } from '../drills.js';
import { allInsights } from '../insights.js';
import { disciplineReport } from '../discipline.js';

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

    ${calmFlaggedPanel(App, trades)}
    ${dualMetricPanel(App, trades)}
    ${radarPanel(App)}
    ${heatmapPanel(App)}
    ${habitPanel(App)}
    ${weakGlossPanel(App)}
    ${disciplinePanel(App, trades, balance)}
    ${insightsPanel(App, trades)}
    ${weeksPanel(App)}
    ${drillsPanel(App)}
  </div>`;
}

function dualMetricPanel(App, trades) {
  const ins = allInsights(trades);
  const e = ins.expectancy;
  const er = ins.expectancyR;
  if (!e && !er) return '';
  const wr = e ? Math.round(e.winRate * 100) : '—';
  const exp = e ? App.money(e.expectancy, { sign: true }) : '—';
  const r = er ? `${er.avgR.toFixed(2)}R` : '—';
  return `<div class="panel" style="margin-bottom:14px">
    <div class="panel-h"><span class="ph-t">${App.t('dual_metric')}</span></div>
    <div class="pad" style="display:flex;gap:18px;font-size:14px">
      <div><div class="slabel">WR</div><div class="mono metric-big">${wr}%</div></div>
      <div><div class="slabel">E[$]</div><div class="mono metric-big">${exp}</div></div>
      <div><div class="slabel">E[R]</div><div class="mono metric-big">${r}</div></div>
    </div>
    <div class="pad" style="font-size:12.5px;color:var(--t3);padding-top:0">${App.t('dual_hint')}</div>
  </div>`;
}

function radarPanel(App) {
  const lang = App.lang;
  const vals = TRACKS.map((t) => {
    const prog = App.getCourse(t.id);
    const done = t.weeks.filter((w) => ['completed', 'mastered'].includes(prog.weekStatus[w.id])).length;
    const bonus = prog.examPassed ? 1 : 0;
    return Math.min(1, (done + bonus) / (t.weeks.length + 1));
  });
  const n = vals.length;
  const cx = 110, cy = 110, R = 80;
  const pts = vals.map((v, i) => {
    const a = (-Math.PI / 2) + (i / n) * Math.PI * 2;
    return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v];
  });
  const poly = pts.map((p) => p.join(',')).join(' ');
  const grid = [0.33, 0.66, 1].map((g) => {
    const ring = Array.from({ length: n }, (_, i) => {
      const a = (-Math.PI / 2) + (i / n) * Math.PI * 2;
      return `${cx + Math.cos(a) * R * g},${cy + Math.sin(a) * R * g}`;
    }).join(' ');
    return `<polygon points="${ring}" fill="none" stroke="var(--line)" stroke-width="1"/>`;
  }).join('');
  const labels = TRACKS.map((t, i) => {
    const a = (-Math.PI / 2) + (i / n) * Math.PI * 2;
    const x = cx + Math.cos(a) * (R + 16);
    const y = cy + Math.sin(a) * (R + 16);
    return `<text x="${x}" y="${y}" text-anchor="middle" font-size="9" fill="var(--t3)">${t.id.slice(0, 3)}</text>`;
  }).join('');
  return `<div class="panel" style="margin-bottom:14px">
    <div class="panel-h"><span class="ph-t">${App.t('radar_title')}</span></div>
    <div class="pad" style="display:flex;justify-content:center">
      <svg width="220" height="220" viewBox="0 0 220 220">${grid}
        <polygon points="${poly}" fill="rgba(255,107,44,0.25)" stroke="var(--acc)" stroke-width="2"/>
        ${labels}
      </svg>
    </div>
  </div>`;
}

function heatmapPanel(App) {
  const rows = TRACKS.map((t) => {
    const prog = App.getCourse(t.id);
    const cells = t.weeks.map((w) => {
      const st = prog.weekStatus[w.id] || 'locked';
      const col = st === 'mastered' ? 'var(--acc)' : st === 'completed' ? 'var(--up)' : st === 'current' ? 'var(--warn)' : 'var(--line)';
      return `<i title="W${w.id}" style="display:inline-block;width:12px;height:12px;margin:1px;background:${col};border-radius:2px"></i>`;
    }).join('');
    return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px"><span class="mono" style="width:52px;font-size:11px;color:var(--t3)">${t.id}</span><div>${cells}</div></div>`;
  }).join('');
  return `<div class="panel" style="margin-bottom:14px">
    <div class="panel-h"><span class="ph-t">${App.t('heat_title')}</span></div>
    <div class="pad">${rows}</div>
  </div>`;
}

function habitPanel(App) {
  const { getHabitDays } = requireHabit();
  const days = getHabitDays();
  const freeze = store.get(KEYS.streakFreeze, {});
  const out = [];
  const today = new Date();
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const on = !!days[key];
    out.push(`<i title="${key}" style="display:inline-block;width:10px;height:10px;margin:1px;background:${on ? 'var(--acc)' : 'var(--line)'};border-radius:2px"></i>`);
  }
  const freezeNote = freeze.used
    ? `<div class="pad" style="font-size:12px;color:var(--t3);padding-top:0">${App.t('freeze_used')}</div>`
    : `<div class="pad" style="font-size:12px;color:var(--t3);padding-top:0">${App.t('freeze_avail')}</div>`;
  return `<div class="panel" style="margin-bottom:14px">
    <div class="panel-h"><span class="ph-t">${App.t('habit_title')}</span></div>
    <div class="pad" style="line-height:0">${out.join('')}</div>
    ${freezeNote}
  </div>`;
}

function requireHabit() {
  // dynamic import avoided — use store directly
  return {
    getHabitDays: () => store.get(KEYS.habitDays, {}) || {},
  };
}

function weakGlossPanel(App) {
  const weak = store.get(KEYS.glossWeak, {}) || {};
  const top = Object.entries(weak).sort((a, b) => b[1] - a[1]).slice(0, 5);
  if (!top.length) return '';
  return `<div class="panel" style="margin-bottom:14px">
    <div class="panel-h"><span class="ph-t">${App.t('weak_gloss')}</span></div>
    <div class="pad">${top.map(([term, n]) => `<div class="row-item"><span class="mono">${term}</span><span class="pill">${n}</span></div>`).join('')}</div>
  </div>`;
}

function calmFlaggedPanel(App, trades) {
  const calm = trades.filter((t) => t.emotion === 'calm');
  const flagged = trades.filter((t) => t.emotion === 'revenge' || t.emotion === 'greed');
  if (calm.length + flagged.length < 2) return '';
  const stats = (arr) => {
    const n = arr.length;
    if (!n) return { n: 0, wr: 0, avg: 0, pl: 0 };
    const wins = arr.filter((t) => Number(t.pl) > 0).length;
    const pl = arr.reduce((s, t) => s + (Number(t.pl) || 0), 0);
    return { n, wr: Math.round((wins / n) * 100), avg: pl / n, pl };
  };
  const c = stats(calm), f = stats(flagged);
  const lang = App.lang;
  return `<div class="panel" style="margin-bottom:14px">
    <div class="panel-h"><span class="ph-t">${lang === 'en' ? 'Calm vs flagged' : 'Calm vs flagged'}</span></div>
    <div class="pad" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:13px">
      <div><div class="slabel">Calm · n=${c.n}</div>
        <div class="mono">${c.wr}% WR</div>
        <div class="mono ${c.pl >= 0 ? 'up' : 'down'}">${App.money(c.pl, { sign: true })}</div>
        <div style="color:var(--t3)">avg ${App.money(c.avg, { sign: true })}</div></div>
      <div><div class="slabel">Flagged · n=${f.n}</div>
        <div class="mono">${f.wr}% WR</div>
        <div class="mono ${f.pl >= 0 ? 'up' : 'down'}">${App.money(f.pl, { sign: true })}</div>
        <div style="color:var(--t3)">avg ${App.money(f.avg, { sign: true })}</div></div>
    </div>
  </div>`;
}

function disciplinePanel(App, trades, balance) {
  const rep = disciplineReport(trades, balance);
  if (!rep) {
    return `<div class="panel" style="margin-bottom:14px"><div class="panel-h"><span class="ph-t">${App.t('disc_title')}</span></div>
      <div class="pad" style="font-size:13.5px;color:var(--t3)">${App.t('disc_need')}</div></div>`;
  }
  const b = rep.breakdown;
  const pct = Math.round(rep.ratio * 100);
  // rolling grade trend: last up to 10 windows of 5 trades
  let trendSvg = '';
  if (trades.length >= 5) {
    const grades = [];
    for (let end = 5; end <= Math.min(trades.length, 50); end += 5) {
      const slice = trades.slice(0, end);
      const r = disciplineReport(slice, balance);
      if (r) grades.push(r.ratio);
    }
    if (grades.length >= 2) {
      const w = 120, h = 28;
      const pts = grades.map((g, i) => {
        const x = (i / (grades.length - 1)) * w;
        const y = h - g * (h - 4) - 2;
        return `${x},${y}`;
      }).join(' ');
      trendSvg = `<div class="pad" style="padding-top:0"><div class="slabel">${App.t('disc_trend')}</div>
        <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="margin-top:6px"><polyline points="${pts}" fill="none" stroke="var(--acc)" stroke-width="2"/></svg></div>`;
    }
  }
  return `<div class="panel" style="margin-bottom:14px">
    <div class="panel-h"><span class="ph-t">${App.t('disc_title')}</span><span class="metric-big" style="color:var(--acc-2)">${rep.grade}</span></div>
    <div class="pad">
      <div class="bar-line"><div class="bl-l">${App.t('disc_score')}</div><div class="bl-track"><div class="bl-fill" style="width:${pct}%;background:var(--acc)"></div></div><div class="bl-v mono">${pct}%</div></div>
      <div style="font-size:12.5px;color:var(--t3);margin-top:10px;line-height:1.55" class="mono">
        ${App.t('disc_stop_placed')}: ${b.stopPlaced}/${b.n}<br/>
        ${App.t('disc_held')}: ${b.heldStop}/${b.n}<br/>
        ${App.t('disc_no_revenge')}: ${b.notRevenge}/${b.n}<br/>
        ${App.t('disc_sized')}: ${b.sizedOk}/${b.n}
      </div>
    </div>
    ${trendSvg}
  </div>`;
}

function insightsPanel(App, trades) {
  const ins = allInsights(trades);
  const rows = [];
  const badge = (n) => ` <span class="pill mono" style="font-size:10px;${n < 10 ? 'color:var(--t3)' : ''}">n=${n}${n < 10 ? ' · ' + App.t('early_data') : ''}</span>`;
  if (ins.expectancy) {
    const e = ins.expectancy;
    rows.push(row(`${App.t('ins_expectancy')}${badge(e.n)}`, App.money(e.expectancy, { sign: true }), e.expectancy >= 0));
  }
  if (ins.expectancyR) {
    rows.push(row(`E[R]${badge(ins.expectancyR.n)}`, `${ins.expectancyR.avgR.toFixed(2)}R`, ins.expectancyR.avgR >= 0));
  }
  if (ins.flagged) {
    rows.push(row(`${App.t('ins_flagged')}${badge(ins.flagged.n)}`, App.money(ins.flagged.pl, { sign: true }), ins.flagged.pl >= 0));
  }
  if (ins.tod) {
    ins.tod.forEach((b) => rows.push(row(`${b.label}${badge(b.n)}`, `${Math.round(b.winRate * 100)}% · ${App.money(b.pl, { sign: true })}`, b.pl >= 0)));
  }
  if (ins.size) {
    ins.size.forEach((b) => rows.push(row(`${b.label}${badge(b.n)}`, `${Math.round(b.winRate * 100)}% · ${App.money(b.pl, { sign: true })}`, b.pl >= 0)));
  }
  if (ins.revengeQ) {
    if (ins.revengeQ.fast) rows.push(row(`After loss <30m${badge(ins.revengeQ.fast.n)}`, App.money(ins.revengeQ.fast.avgPl, { sign: true }), ins.revengeQ.fast.avgPl >= 0));
    if (ins.revengeQ.slow) rows.push(row(`After loss >2h${badge(ins.revengeQ.slow.n)}`, App.money(ins.revengeQ.slow.avgPl, { sign: true }), ins.revengeQ.slow.avgPl >= 0));
  }
  if (ins.streaks) {
    rows.push(row(App.t('ins_streak_w'), String(ins.streaks.winStreak), true));
    rows.push(row(App.t('ins_streak_l'), String(ins.streaks.lossStreak), false));
  }
  if (ins.days) {
    ins.days.forEach((d) => rows.push(row(`${d.day}${badge(d.n)}`, App.money(d.pl, { sign: true }), d.pl >= 0)));
  }
  if (!rows.length) {
    return `<div class="panel" style="margin-bottom:14px"><div class="panel-h"><span class="ph-t">${App.t('ins_title')}</span></div>
      <div class="pad" style="font-size:13.5px;color:var(--t3)">${App.t('ins_need')}</div></div>`;
  }
  return `<div class="panel" style="margin-bottom:14px"><div class="panel-h"><span class="ph-t">${App.t('ins_title')}</span></div>
    <div>${rows.join('')}</div></div>`;
}

function row(label, value, up) {
  return `<div class="row-item" style="justify-content:space-between;padding:12px 18px">
    <span style="font-size:13.5px;color:var(--t1)">${label}</span>
    <span class="mono" style="font-size:13.5px;color:${up ? 'var(--up)' : 'var(--down)'}">${value}</span>
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
