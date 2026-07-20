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
import { competenceStatements } from '../competence.js';

const EMO = {
  calm: { label: 'Calm', color: 'var(--up)' },
  fomo: { label: 'FOMO', color: 'var(--warn)' },
  revenge: { label: 'Revenge', color: 'var(--down)' },
  greed: { label: 'Greed', color: 'var(--down)' },
  bored: { label: 'Bored', color: 'var(--t2)' },
};

import { getTimeStats, formatDuration } from '../time.js';
import { getStreak as getStreakImported } from '../retention.js';
import { getSkillState, SKILLS } from '../skills.js';
import { isGraduated, gradStatus } from '../graduation.js';
import { getTrack } from '../data/tracks.js';

export function renderProgress(App, c) {
  const lang = App.lang;
  const trades = App.getTrades().slice().reverse();
  const balance = App.getBalance();
  const ts = getTimeStats();
  const skills = getSkillState();

  // Certificate progress preview — grayed cert + missing checklist pulls forward.
  const certPanel = (() => {
    const tid = (App.profile?.markets || [])[0] || 'foundations';
    const track = getTrack(tid) || getTrack('foundations');
    const gs = gradStatus(track.id, App);
    const REQ_LABEL = {
      exam: { en: 'Final exam passed', ur: 'Final exam pass' },
      binary_gate: { en: 'Binary reality gate', ur: 'Binary reality gate' },
      sim_requires_s4: { en: 'Practice scenarios (Journal desk)', ur: 'Practice scenarios (Journal desk)' },
      sim_trades_20: { en: '20 sim trades logged', ur: '20 sim trades' },
      sim_pass_rate_80: { en: 'Process pass ≥80% (latest 10)', ur: 'Process pass ≥80% (latest 10)' },
      sim_no_liq: { en: 'Zero liquidations (latest 10)', ur: 'Zero liquidation (latest 10)' },
      portfolio_adherence: { en: 'Portfolio plan adherence pass', ur: 'Portfolio adherence pass' },
    };
    const row = (id, ok) => `<div class="check-row" style="opacity:${ok ? 1 : 0.55}">
      <span class="check-box" style="${ok ? 'background:var(--acc);border-color:var(--acc);color:#000' : ''}">${ok ? '✓' : ''}</span>
      <span class="check-t">${(REQ_LABEL[id] || { en: id, ur: id })[lang]}</span>
    </div>`;
    return `<div class="panel pad" style="margin-bottom:14px">
      <div class="hstack" style="justify-content:space-between;align-items:baseline">
        <div class="slabel">${lang === 'en' ? 'Certificate progress' : 'Certificate progress'} · ${track.name[lang]}</div>
        <span class="pill mono ${gs.ready ? 'acc' : ''}">${gs.met.length}/${gs.met.length + gs.missing.length}</span>
      </div>
      <div style="margin-top:10px;border:2px ${gs.ready ? 'solid var(--acc)' : 'dashed var(--line-2)'};border-radius:10px;padding:14px;text-align:center;${gs.ready ? '' : 'opacity:0.6'}">
        <div class="mono" style="font-size:11px;letter-spacing:0.2em;color:var(--acc)">M A S T E R Y C A P</div>
        <div style="font-family:Georgia,serif;font-size:20px;font-weight:650;margin-top:6px">${gs.ready ? (lang === 'en' ? 'Ready to issue' : 'Issue ke liye tayyar') : (lang === 'en' ? 'Certificate locked' : 'Certificate locked')}</div>
        <div style="font-size:11px;color:var(--t3);margin-top:4px">${lang === 'en' ? 'Self-issued study record — not a license' : 'Self-issued study record — license nahi'}</div>
      </div>
      <div style="margin-top:10px">${gs.met.map((m) => row(m, true)).join('')}${gs.missing.map((m) => row(m, false)).join('')}</div>
      <button class="btn secondary mt10" id="shareCard" style="width:100%">${lang === 'en' ? 'Share progress card' : 'Progress card share karo'}</button>
    </div>`;
  })();

  const timePanel = `<div class="panel pad" style="margin-bottom:14px">
    <div class="slabel">${App.t('time_total')}</div>
    <div class="mono" style="font-size:22px;margin-top:8px">${formatDuration(ts.totalMs, lang)}</div>
    <div style="font-size:12.5px;color:var(--t3);margin-top:10px;line-height:1.5">
      ${Object.entries(ts.byCourse || {}).slice(0, 8).map(([id, ms]) =>
        `<div>${id}: ${formatDuration(ms, lang)}</div>`).join('') || (lang === 'en' ? 'Open a lesson to start the clock.' : 'Lesson kholo — clock start.')}
    </div>
  </div>`;

  const skillPanel = `<div class="panel pad" style="margin-bottom:14px">
    <div class="slabel">${lang === 'en' ? 'Skills mastered' : 'Skills mastered'}</div>
    <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:6px">
      ${Object.keys(skills.mastered || {}).length
        ? Object.keys(skills.mastered).map((id) => {
          const n = SKILLS[id]?.name?.[lang] || id;
          return `<span class="pill">${n}</span>`;
        }).join('')
        : `<span style="font-size:13px;color:var(--t3)">${lang === 'en' ? 'Pass quizzes / challenges to unlock.' : 'Quiz / challenge pass se unlock.'}</span>`}
    </div>
  </div>`;

  const masteryPanel = `<div class="note-box warn" style="margin-bottom:14px"><strong>${App.t('mastery_title')}</strong><br/>${App.t('mastery_honest')}<br/><span style="opacity:0.85">${App.t('cert_not_license')}</span></div>
    <div class="note-box" style="margin-bottom:14px;font-size:13px">${App.t('limits_honest')}</div>
    ${tradeReadyBadges(App)}`;

  const back = `<button class="backlink" id="hasilBack">${icon('back', { size: 16 })} ${App.t('back')}</button>`;
  const header = `${back}<div class="lt-head"><div class="kicker">${App.t('nav_progress')}</div><h1>${lang === 'en' ? 'Hasil' : 'Hasil'}</h1></div>${masteryPanel}${competencePanel(App)}${certPanel}${timePanel}${skillPanel}`;

  if (!trades.length) {
    c.innerHTML = `<div class="screen">${header}${weeksPanel(App)}${drillsPanel(App)}
      <div class="panel mt14"><div class="empty">${icon('progress', { size: 40, cls: 'e-ic', sw: 1.3 })}${App.t('no_data')}</div></div></div>`;
    attachShareCard(App);
    document.getElementById('hasilBack')?.addEventListener('click', () => {
      App.tab = App._progressReturn || 'practice';
      App.render(); App.renderNav();
      App.restoreFocus();
    });
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
  attachShareCard(App);
  document.getElementById('hasilBack')?.addEventListener('click', () => {
    App.tab = App._progressReturn || 'practice';
    App.render(); App.renderNav();
    App.restoreFocus();
  });
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

function competencePanel(App) {
  const lang = App.lang;
  const rows = competenceStatements(App).slice(0, 8);
  if (!rows.length) return '';
  const body = rows.map((r) => {
    const can = (r.can || []).slice(0, 2).map((x) =>
      `<div class="check-row" style="opacity:1;margin-top:4px"><span class="check-box" style="background:var(--acc);border-color:var(--acc);color:#000">✓</span><span class="check-t" style="font-size:13px">${x[lang] || x.en}</span></div>`).join('');
    const cant = (r.cant || []).slice(0, 2).map((x) =>
      `<div class="check-row" style="opacity:0.75;margin-top:4px"><span class="check-box"></span><span class="check-t" style="font-size:13px">${x[lang] || x.en}</span></div>`).join('');
    return `<div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--line)">
      <div class="hstack" style="justify-content:space-between;align-items:baseline">
        <strong style="font-size:14px">${r.name[lang]}</strong>
        <span class="pill mono">${r.done}/${r.total}${r.ready ? ' · TR' : ''}</span>
      </div>
      <div class="slabel" style="margin:8px 0 0">${lang === 'en' ? 'Can' : 'Kar sakte'}</div>
      ${can || `<p style="font-size:12.5px;color:var(--t3);margin:6px 0 0">${lang === 'en' ? 'Still building.' : 'Abhi build.'}</p>`}
      <div class="slabel" style="margin:10px 0 0">${lang === 'en' ? "Can't yet" : 'Abhi nahi'}</div>
      ${cant || `<p style="font-size:12.5px;color:var(--t3);margin:6px 0 0">${lang === 'en' ? 'No blockers listed.' : 'Blocker list khali.'}</p>`}
    </div>`;
  }).join('');
  return `<div class="panel pad" style="margin-bottom:14px">
    <div class="slabel">${lang === 'en' ? 'Competence (can / can\'t yet)' : 'Competence (can / abhi nahi)'}</div>
    <p style="font-size:12px;color:var(--t3);margin:6px 0 0;line-height:1.45">${lang === 'en'
      ? 'Self-assessment from weeks + sim process — not a broker/SECP credential. Skills decay.'
      : 'Weeks + sim process se self-assessment — broker/SECP credential nahi. Skills kamzor hoti.'}</p>
    ${body}
  </div>`;
}

function weeksPanel(App) {
  const lang = App.lang;
  const rows = TRACKS.map((t) => {
    const prog = App.getCourse(t.id);
    const done = t.weeks.filter((w) => ['completed', 'mastered'].includes(prog.weekStatus[w.id])).length;
    const p = t.weeks.length ? (done / t.weeks.length) * 100 : 0;
    const tr = isGraduated(t.id);
    return `<div class="bar-line">
      <div class="bl-l hstack" style="gap:8px">${icon(TRACK_ICON[t.id], { size: 15 })}<span>${t.name[lang].split(' ')[0]}</span>${tr ? '<span class="pill" style="font-size:10px;margin-left:4px">TR</span>' : ''}</div>
      <div class="bl-track"><div class="bl-fill" style="width:${p}%;background:var(--acc)"></div></div>
      <div class="bl-v mono">${done}/${t.weeks.length}</div>
    </div>`;
  }).join('');
  return `<div class="panel"><div class="panel-h"><span class="ph-t">${App.t('weeks_done')}</span></div><div class="pad">${rows}</div></div>`;
}

function tradeReadyBadges(App) {
  const lang = App.lang;
  const ready = TRACKS.filter((t) => t.status === 'live' && isGraduated(t.id));
  if (!ready.length) {
    return `<div class="panel pad" style="margin-bottom:14px">
      <div class="slabel">${App.t('tr_badges_title')}</div>
      <p style="font-size:13px;color:var(--t3);margin:8px 0 0;line-height:1.5">${App.t('tr_badges_empty')}</p>
    </div>`;
  }
  return `<div class="panel pad" style="margin-bottom:14px">
    <div class="slabel">${App.t('tr_badges_title')}</div>
    <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:6px">
      ${ready.map((t) => `<span class="pill" style="border-color:var(--acc)">${t.name[lang]} · TRADE-READY</span>`).join('')}
    </div>
    <p style="font-size:12px;color:var(--t3);margin:10px 0 0;line-height:1.45">${App.t('tr_badges_hint')}</p>
  </div>`;
}

function attachShareCard(App) {
  document.getElementById('shareCard')?.addEventListener('click', () => {
    const lang = App.lang;
    const streak = getStreakLocal();
    let weeksDone = 0, weeksTotal = 0;
    TRACKS.forEach((t) => {
      if (t.status !== 'live') return;
      const prog = App.getCourse(t.id);
      weeksTotal += t.weeks.length;
      weeksDone += t.weeks.filter((w) => ['completed', 'mastered'].includes(prog.weekStatus[w.id])).length;
    });
    const cv = document.createElement('canvas');
    cv.width = 1080; cv.height = 1080;
    const x = cv.getContext('2d');
    x.fillStyle = '#08090A'; x.fillRect(0, 0, 1080, 1080);
    const g = x.createRadialGradient(540, 540, 60, 540, 540, 760);
    g.addColorStop(0, 'rgba(255,107,44,0.10)'); g.addColorStop(1, 'rgba(255,107,44,0)');
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1080);
    x.strokeStyle = '#FF6B2C'; x.lineWidth = 4; x.strokeRect(50, 50, 980, 980);
    const C = (t, y) => { x.fillText(t, (1080 - x.measureText(t).width) / 2, y); };
    x.fillStyle = '#FF6B2C'; x.font = '600 34px ui-monospace, monospace';
    C('M A S T E R Y C A P', 190);
    x.fillStyle = '#F2F4F7'; x.font = '650 120px Georgia, serif';
    C(String(streak), 460);
    x.fillStyle = '#A8B0BA'; x.font = '500 40px system-ui, sans-serif';
    C(lang === 'en' ? 'day study streak' : 'din ka streak', 530);
    x.fillStyle = '#F2F4F7'; x.font = '650 72px Georgia, serif';
    C(`${weeksDone}/${weeksTotal}`, 700);
    x.fillStyle = '#A8B0BA'; x.font = '500 40px system-ui, sans-serif';
    C(lang === 'en' ? 'course weeks completed' : 'course weeks mukammal', 762);
    x.fillStyle = '#8A939E'; x.font = '400 28px system-ui, sans-serif';
    C(lang === 'en' ? 'Studying markets. No promises — just process.' : 'Market parh raha hoon. Waade nahi — sirf process.', 900);
    const a = document.createElement('a');
    a.download = 'masterycap-progress.png';
    a.href = cv.toDataURL('image/png');
    a.click();
    App.haptic(12);
  });
}

function getStreakLocal() {
  try { return getStreakImported().current || 0; } catch (e) { return 0; }
}
