/* ============================================================
   dashboard.js — school campus Home — workbench MOBILE≠DESKTOP.
   Next lesson, beginner path, study stats. No trading desk.
   ============================================================ */

import { TRACKS, getTrack } from '../data/tracks.js';
import { COURSE_FAMILIES } from '../data/families.js';
import { BEGINNER_PATH } from '../data/paths.js';
import { icon, TRACK_ICON } from '../icons.js';
import { openSettings } from '../settings.js';
import { getStreak, reviewAvailable, dueReviewCount } from '../retention.js';
import { store, KEYS } from '../store.js';
import { openHowto } from '../howto.js';
import { openGlossary } from '../glossary.js';
import { isGraduated } from '../graduation.js';
import { SIM_SCENARIOS } from '../sim/scenarios.js';
import { todayProgress } from '../today.js';
import { canOpenTradingLab } from '../gates.js';
import { planPosition, semesterOf } from '../syllabus.js';
import { weeklyReport, lastReport } from '../report.js';
import { openSessionRunner } from '../session.js';

function ladderStages(App, trackId) {
  const track = getTrack(trackId);
  const prog = App.getCourse(trackId);
  const learnDone = track.weeks.some((w) => ['completed', 'mastered'].includes(prog.weekStatus[w.id]))
    || !!prog.examPassed;
  const stats = store.get(KEYS.simStats, {});
  const scIds = SIM_SCENARIOS.filter((s) => s.track === trackId).map((s) => s.id);
  let practiceDone = scIds.some((id) => (stats[id]?.runs || 0) > 0);
  if (!scIds.length) {
    practiceDone = track.weeks.length > 0
      && track.weeks.every((w) => ['completed', 'mastered'].includes(prog.weekStatus[w.id]));
  }
  return [
    { id: 'learn', done: learnDone, ic: 'learn' },
    { id: 'practice', done: practiceDone, ic: 'target' },
    { id: 'graduate', done: isGraduated(trackId), ic: 'circleCheck' },
  ];
}

function ladderChips(App, trackId) {
  const stages = ladderStages(App, trackId);
  return `<span style="display:inline-flex;flex-wrap:wrap;align-items:center;gap:4px 6px;margin-top:6px;font-size:11px;text-transform:uppercase;letter-spacing:0.04em">
    ${stages.map((s, i) => `${i ? '<span style="color:var(--t3);opacity:0.5">→</span>' : ''}
      <span style="display:inline-flex;align-items:center;gap:3px;opacity:${s.done ? 1 : 0.35};color:${s.done ? 'var(--acc)' : 'var(--t3)'}">${icon(s.ic, { size: 12 })} ${App.t('ladder_' + s.id)}</span>`).join('')}
  </span>`;
}

function greeting(App) {
  const h = new Date().getHours();
  return App.t(h < 12 ? 'goodmorning' : h < 18 ? 'goodafternoon' : 'goodevening');
}

/** Next actionable week along beginner path (or any live track). */
export function nextLesson(App) {
  const order = [...BEGINNER_PATH.map((p) => p.id), ...TRACKS.map((t) => t.id)];
  const seen = new Set();
  for (const id of order) {
    if (seen.has(id)) continue;
    seen.add(id);
    const track = getTrack(id);
    if (!track || track.status !== 'live') continue;
    const prog = App.getCourse(id);
    if (!prog.placementDone) {
      return { trackId: id, weekId: null, kind: 'placement', title: track.name };
    }
    const current = track.weeks.find((w) => prog.weekStatus[w.id] === 'current');
    if (current) {
      return { trackId: id, weekId: current.id, kind: 'week', title: current.title, trackName: track.name };
    }
    const lockedFirst = track.weeks.find((w) => !prog.weekStatus[w.id] || prog.weekStatus[w.id] === 'locked');
    const anyOpen = track.weeks.find((w) => ['current', 'completed', 'mastered'].includes(prog.weekStatus[w.id]));
    if (!anyOpen && track.weeks[0]) {
      return { trackId: id, weekId: track.weeks[0].id, kind: 'start', title: track.weeks[0].title, trackName: track.name };
    }
    if (lockedFirst && anyOpen) continue;
  }
  return null;
}

function studyTotals(App) {
  let done = 0;
  let total = 0;
  TRACKS.forEach((t) => {
    if (t.status !== 'live') return;
    const prog = App.getCourse(t.id);
    total += t.weeks.length;
    done += t.weeks.filter((w) => ['completed', 'mastered'].includes(prog.weekStatus[w.id])).length;
  });
  return { done, total };
}

export function renderDashboard(App, c) {
  const lang = App.lang;
  const xp = App.totalXp();
  const streak = getStreak();
  const initials = (App.profile?.name || 'S').trim().slice(0, 2).toUpperCase();
  const next = nextLesson(App);
  const { done, total } = studyTotals(App);
  const due = dueReviewCount();

  const nextLabel = (() => {
    if (!next) {
      return lang === 'en'
        ? 'All beginner path weeks done — pick any track in Learn, or open Practice desk.'
        : 'Beginner path complete — Learn mein koi track, ya Practice desk.';
    }
    if (next.kind === 'placement') {
      return lang === 'en'
        ? `Start placement: ${next.title[lang]}`
        : `Placement shuru: ${next.title[lang]}`;
    }
    const tn = next.trackName ? next.trackName[lang] : getTrack(next.trackId).name[lang];
    const wt = next.title[lang];
    return `${tn} · ${lang === 'en' ? 'Week' : 'Week'} ${next.weekId} — ${wt}`;
  })();

  c.innerHTML = `
  <div class="screen workbench-campus">
    <div class="wb-bench" aria-hidden="true"></div>
    <div class="wb-layout">
      <div class="wb-main">
    <div class="lt-head">
      <div class="head-row">
        <div>
          <div class="kicker">${greeting(App)}${store.getNs().startsWith('masterycap-demo') ? ` · <span class="pill acc">${App.t('demo_pill')}</span>` : ''}</div>
          <h1 class="dash-greet-name">${App.profile?.name || (lang === 'en' ? 'Student' : 'Shagird')}</h1>
        </div>
        <div class="hstack">
          ${streak.current ? `<span class="pill mono acc">${icon('flame', { size: 13 })} ${streak.current}</span>` : ''}
          <div class="seg">
            <button class="${lang === 'en' ? 'on' : ''}" data-lang="en">EN</button>
            <button class="${lang === 'ur' ? 'on' : ''}" data-lang="ur">UR</button>
          </div>
          <div class="avatar" id="openSettings" role="button" tabindex="0" aria-label="Settings">${initials}</div>
        </div>
      </div>
    </div>

    ${(() => {
      const notices = [];
      if (store.get(KEYS.morningPending)) {
        notices.push(`<div class="panel pad" id="morningBrief" style="margin-bottom:12px">
          <div class="slabel">${App.t('morning_brief')}</div>
          <div class="hstack" style="gap:8px;margin-top:10px;flex-wrap:wrap">
            <button class="btn secondary" id="mbReview" style="flex:1">${App.t('morning_review')}</button>
            <button class="btn secondary" id="mbDrill" style="flex:1">${App.t('morning_drill')}</button>
          </div>
          <button class="pill mt10" id="mbDismiss">${App.t('morning_dismiss')}</button>
        </div>`);
      }
      const cdUntil = store.get(KEYS.coolDownUntil);
      if (cdUntil && Date.now() < Number(cdUntil)) {
        notices.push(`<div class="note-box warn" style="margin-bottom:12px">${App.t('cooldown_pill').replace('{t}', new Date(Number(cdUntil)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))}</div>`);
      }
      if (store.overQuota() && !store.get(KEYS.quotaDismissed)) {
        notices.push(`<div class="note-box warn" id="quotaPill" style="margin-bottom:12px">${App.t('quota_warn')} <button class="pill" id="quotaDismiss" style="margin-left:8px">${App.t('backup_remind_dismiss')}</button></div>`);
      }
      const last = store.get(KEYS.lastExportAt);
      const overdue = !last || (Date.now() - new Date(last).getTime() > 7 * 86400000);
      const dismissedAt = store.get(KEYS.backupRemindDismissedAt);
      const dismissFresh = dismissedAt && (Date.now() - Number(dismissedAt) < 7 * 86400000);
      if (overdue && !dismissFresh && store.get(KEYS.onboarded)) {
        notices.push(`<div class="note-box" id="backupPill" style="margin-bottom:12px">${App.t('backup_remind')} <button class="pill" id="backupDismiss" style="margin-left:8px">${App.t('backup_remind_dismiss')}</button></div>`);
      }
      return notices.join('');
    })()}


    ${(() => {
      const rep = weeklyReport(App) || lastReport();
      if (!rep || store.get(KEYS.reportSeen) === rep.week) return '';
      return `<div class="panel pad" style="margin-bottom:14px" id="reportCard">
        <div class="hstack" style="justify-content:space-between;align-items:baseline">
          <div class="slabel">${lang === 'en' ? 'Report card' : 'Report card'} · ${rep.week}</div>
          <button class="pill" id="reportDismiss">${lang === 'en' ? 'Done' : 'Theek'}</button>
        </div>
        <div class="stat-strip" style="margin-top:10px">
          <div class="stat-cell"><div class="sc-l">XP</div><div class="sc-v">+${rep.xpGained}</div><div class="sc-s">${lang === 'en' ? 'this week' : 'is hafte'}</div></div>
          <div class="stat-cell"><div class="sc-l">${lang === 'en' ? 'Weeks' : 'Weeks'}</div><div class="sc-v">${rep.weeksCompleted}</div><div class="sc-s">${lang === 'en' ? 'completed' : 'mukammal'}</div></div>
          <div class="stat-cell"><div class="sc-l">${lang === 'en' ? 'Reviews' : 'Reviews'}</div><div class="sc-v">${rep.reviewsDue}</div><div class="sc-s">${lang === 'en' ? 'due' : 'baqi'}</div></div>
          <div class="stat-cell"><div class="sc-l">${lang === 'en' ? 'Streak' : 'Streak'}</div><div class="sc-v">${rep.streak}</div><div class="sc-s">${lang === 'en' ? 'days' : 'din'}</div></div>
        </div>
        <div class="note-box" style="margin-top:10px">${rep.focus[lang]}</div>
      </div>`;
    })()}

    ${(() => {
      const pos = planPosition(App);
      const sessionMins = store.get(KEYS.settings, {}).sessionMins || 15;
      const sem = pos.nextItem ? semesterOf(pos.nextItem.trackId) : null;
      const planLine = pos.totalCalWeeks
        ? `<div class="hstack" style="gap:8px;margin-top:6px;flex-wrap:wrap">
            <span class="pill mono">${lang === 'en' ? 'Week' : 'Week'} ${pos.currentCalWeek}/${pos.totalCalWeeks}</span>
            ${sem ? `<span class="pill mono">${sem.name[lang]}</span>` : ''}
            <span class="pill mono ${pos.onTrack ? 'acc' : ''}">${pos.onTrack ? (lang === 'en' ? 'on track' : 'on track') : (lang === 'en' ? 'behind plan' : 'plan se peeche')}</span>
          </div>`
        : '';
      return `<div class="panel pad" style="margin-bottom:14px;border-color:var(--acc)">
      <div class="slabel">${App.t('campus_next')}</div>
      ${planLine}
      <div style="font-size:17px;font-weight:650;letter-spacing:-0.02em;margin-top:8px;line-height:1.35">${nextLabel}</div>
      <button class="btn accent mt14" id="goContinue" style="width:100%">${icon('learn', { size: 17 })} ${App.t('session_start')} · ${sessionMins} min</button>
    </div>`;
    })()}

    ${(() => {
      const th = todayProgress();
      const chk = (ok) => ok
        ? `<span class="check-box" style="background:var(--acc);border-color:var(--acc);color:#000">${icon('check', { size: 12 })}</span>`
        : `<span class="check-box"></span>`;
      const lessonSub = next
        ? (next.kind === 'placement'
          ? `${lang === 'en' ? 'Placement' : 'Placement'}: ${next.title[lang]}`
          : `${(next.trackName || getTrack(next.trackId).name)[lang]} · ${App.t('week')} ${next.weekId}`)
        : (lang === 'en' ? 'Pick any course' : 'Koi course chuno');
      return `<div class="panel pad" style="margin-bottom:14px" id="todayPath">
        <div class="hstack" style="justify-content:space-between;align-items:baseline">
          <div class="slabel">${App.t('campus_today')}</div>
          <span class="pill mono">${App.t('today_progress').replace('{n}', String(th.done)).replace('{m}', String(th.total))}</span>
        </div>
        ${th.complete ? `<div class="note-box" style="margin-top:10px">${App.t('today_done')}</div>` : ''}
        <button type="button" class="check-row" id="todayLesson" style="width:100%;text-align:left;background:none;border:0;color:inherit;cursor:pointer;margin-top:8px">
          ${chk(th.lesson)}
          <span class="check-t"><strong>${App.t('today_lesson')}</strong><br/><span style="color:var(--t3);font-size:12px">${lessonSub}</span></span>
        </button>
        <button type="button" class="check-row" id="todayLab" style="width:100%;text-align:left;background:none;border:0;color:inherit;cursor:pointer">
          ${chk(th.lab)}
          <span class="check-t"><strong>${App.t('today_lab')}</strong><br/><span style="color:var(--t3);font-size:12px">${canOpenTradingLab(App) ? App.t('sim_cta') : App.t('lab_gated')}</span></span>
        </button>
        <button type="button" class="check-row" id="todayReview" style="width:100%;text-align:left;background:none;border:0;color:inherit;cursor:pointer">
          ${chk(th.review)}
          <span class="check-t"><strong>${App.t('today_review')}</strong><br/><span style="color:var(--t3);font-size:12px">${due ? `${due} due` : (lang === 'en' ? 'Keep streak' : 'Streak rakho')}</span></span>
        </button>
      </div>`;
    })()}


    <div class="stat-strip">
      <div class="stat-cell">
        <div class="sc-l">${App.t('stat_xp')}</div>
        <div class="sc-v" style="color:var(--warn)">${xp}</div>
        <div class="sc-s">${lang === 'en' ? 'study' : 'parhai'}</div>
      </div>
      <div class="stat-cell">
        <div class="sc-l">${App.t('stat_streak')}</div>
        <div class="sc-v">${streak.current || 0}</div>
        <div class="sc-s mono">best ${streak.best || 0}</div>
      </div>
      <div class="stat-cell">
        <div class="sc-l">${App.t('stat_weeks')}</div>
        <div class="sc-v">${done}</div>
        <div class="sc-s mono">${done}/${total}</div>
      </div>
      <div class="stat-cell">
        <div class="sc-l">${App.t('stat_review')}</div>
        <div class="sc-v">${due}</div>
        <div class="sc-s">${lang === 'en' ? 'due' : 'baqi'}</div>
      </div>
    </div>

    <div class="panel" style="margin-bottom:14px">
      <div class="panel-h"><span class="ph-t">${App.t('campus_families')}</span></div>
      <div class="pad" style="padding-top:4px">
        ${COURSE_FAMILIES.map((fam) => {
          const tracks = (fam.trackIds || []).map((id) => getTrack(id)).filter(Boolean);
          const live = fam.status === 'live' && tracks.length > 0;
          const wdone = tracks.reduce((s, t) => {
            const prog = App.getCourse(t.id);
            return s + t.weeks.filter((w) => ['completed', 'mastered'].includes(prog.weekStatus[w.id])).length;
          }, 0);
          const wtot = tracks.reduce((s, t) => s + t.weeks.length, 0);
          const pct = wtot ? Math.round((wdone / wtot) * 100) : 0;
          const level = fam.level === 'advanced'
            ? (lang === 'en' ? 'Advanced' : 'Advanced')
            : (lang === 'en' ? 'Basic → Advanced' : 'Basic → Advanced');
          return `<div class="fam-block" style="margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--border,rgba(255,255,255,.06))">
            <div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline;margin-bottom:4px">
              <strong style="font-size:14px">${fam.name[lang]}</strong>
              <span class="mono" style="font-size:11px;color:var(--t3)">${live ? pct + '%' : (lang === 'en' ? 'Soon' : 'Jaldi')}</span>
            </div>
            <div style="font-size:12px;color:var(--t3);margin-bottom:6px">${fam.blurb[lang]} · ${level}</div>
            ${live ? tracks.slice(0, 6).map((t) => {
              const prog = App.getCourse(t.id);
              const td = t.weeks.filter((w) => ['completed', 'mastered'].includes(prog.weekStatus[w.id])).length;
              return `<button type="button" class="check-row" data-path="${t.id}" style="width:100%;text-align:left;background:none;border:0;color:inherit;cursor:pointer">
                <span class="check-box" style="opacity:0.85">${icon(TRACK_ICON[t.id] || 'learn', { size: 14 })}</span>
                <span class="check-t"><strong>${t.name[lang]}</strong><br/><span style="color:var(--t3);font-size:12px">${td}/${t.weeks.length}</span>${ladderChips(App, t.id)}</span>
              </button>`;
            }).join('') + (tracks.length > 6
              ? `<button type="button" class="btn ghost" id="goLearnMore" style="width:100%;margin-top:6px;font-size:12px">${lang === 'en' ? `All ${tracks.length} tracks →` : `Sab ${tracks.length} tracks →`}</button>`
              : '')
              : `<div class="note-box" style="font-size:12px;color:var(--t3);margin:0">${App.t('campus_family_scaffold')}</div>`}
          </div>`;
        }).join('')}
      </div>
    </div>

    <div class="panel" style="margin-bottom:14px">
      <div class="panel-h"><span class="ph-t">${App.t('campus_map')}</span></div>
      <div class="pad" style="padding-top:4px">
        ${TRACKS.filter((t) => t.status === 'live').map((t) => {
          const prog = App.getCourse(t.id);
          const wdone = t.weeks.filter((w) => ['completed', 'mastered'].includes(prog.weekStatus[w.id])).length;
          const pct = t.weeks.length ? Math.round((wdone / t.weeks.length) * 100) : 0;
          return `<button type="button" class="check-row" data-path="${t.id}" style="width:100%;text-align:left;background:none;border:0;color:inherit;cursor:pointer">
            <span class="check-box" style="opacity:0.85">${icon(TRACK_ICON[t.id] || 'learn', { size: 14 })}</span>
            <span class="check-t"><strong>${t.name[lang]}</strong><br/><span style="color:var(--t3);font-size:12px">${wdone}/${t.weeks.length} · ${pct}%</span>${ladderChips(App, t.id)}</span>
          </button>`;
        }).join('')}
      </div>
    </div>

      </div>
      <aside class="wb-rail" aria-label="Workbench tools">
        <div class="wb-rail__label">Tools</div>
    <div class="panel" style="margin-bottom:14px">
      <div class="panel-h"><span class="ph-t">${App.t('campus_path')}</span></div>
      <div class="pad" style="padding-top:4px">
        ${BEGINNER_PATH.map((p, i) => {
          const t = getTrack(p.id);
          const prog = App.getCourse(p.id);
          const wdone = t.weeks.filter((w) => ['completed', 'mastered'].includes(prog.weekStatus[w.id])).length;
          return `<button type="button" class="check-row" data-path="${p.id}" style="width:100%;text-align:left;background:none;border:0;color:inherit;cursor:pointer">
            <span class="check-box" style="opacity:0.85">${icon(TRACK_ICON[p.id] || 'learn', { size: 14 })}</span>
            <span class="check-t"><strong>${i + 1}. ${t.name[lang]}</strong><br/><span style="color:var(--t3);font-size:12px">${wdone}/${t.weeks.length} · ${p.why[lang]}</span>${ladderChips(App, p.id)}</span>
          </button>`;
        }).join('')}
      </div>
    </div>

    <div class="panel" style="margin-bottom:14px">
      <div class="panel-h"><span class="ph-t">${lang === 'en' ? 'Shortcuts' : 'Shortcuts'}</span></div>
      <div class="pad" style="padding-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <button class="btn secondary" id="goLearn">${icon('learn', { size: 16 })} ${App.t('nav_learn')}</button>
        <button class="btn secondary" id="goDrills">${icon('target', { size: 16 })} ${App.t('drill_cta')}</button>
        <button class="btn secondary" id="goSim">${icon('journal', { size: 16 })} ${App.t('sim_cta')}</button>
        <button class="btn secondary" id="goStudy">${icon('bolt', { size: 16 })} ${App.t('study_cta')}</button>
        <button class="btn ghost" id="goCharts">${icon('progress', { size: 16 })} ${App.t('chart_cta')}</button>
        <button class="btn ghost" id="goGlossCampus">${icon('book', { size: 16 })} ${App.t('glossary')}</button>
        ${reviewAvailable() ? `<button class="btn secondary" id="goReview" style="grid-column:1/-1">${icon('book', { size: 16 })} ${App.t('review_cta').replace('{n}', String(due || streak.current || 0))}</button>` : ''}
        <button class="btn ghost" id="goHowto" style="grid-column:1/-1">${icon('check', { size: 16 })} ${App.t('howto_cta')}</button>
      </div>
    </div>
    <div class="note-box" style="margin-bottom:14px;font-size:12px;color:var(--t3)">${App.t('campus_no_rich')}</div>
    <button class="btn ghost mt14" id="goDesk" style="width:100%">${icon('journal', { size: 17 })} ${App.t('campus_desk')}</button>
      </aside>
    </div>
  </div>`;

  c.querySelectorAll('[data-lang]').forEach((b) => b.addEventListener('click', () => App.setLang(b.dataset.lang)));

  const openNext = () => {
    App.haptic();
    openSessionRunner(App);
  };
  document.getElementById('goContinue')?.addEventListener('click', openNext);
  document.getElementById('goHowto')?.addEventListener('click', () => { App.haptic(); openHowto(App); });
  document.getElementById('todayLesson')?.addEventListener('click', openNext);
  document.getElementById('todayLab')?.addEventListener('click', () => {
    App.haptic();
    if (canOpenTradingLab(App)) App.openSim();
    else App.openDrills();
  });
  document.getElementById('todayReview')?.addEventListener('click', () => {
    App.haptic();
    if (reviewAvailable()) App.openReview();
    else App.openDrills();
  });
  document.getElementById('goLearn')?.addEventListener('click', () => App.navigate('learn'));
  document.getElementById('goLearnMore')?.addEventListener('click', () => App.navigate('learn'));
  document.getElementById('goDrills')?.addEventListener('click', () => App.openDrills());
  document.getElementById('goCharts')?.addEventListener('click', () => App.openCharts());
  document.getElementById('goSim')?.addEventListener('click', () => {
    if (canOpenTradingLab(App)) App.openSim();
    else {
      App.haptic();
      // show brief note via drills for zeros
      App.openDrills();
    }
  });
  document.getElementById('goReview')?.addEventListener('click', () => App.openReview());
  document.getElementById('goDesk')?.addEventListener('click', () => App.navigate('journal'));
  document.getElementById('goGlossCampus')?.addEventListener('click', () => { App.haptic(); openGlossary(App); });
  document.getElementById('goStudy')?.addEventListener('click', () => App.openStudy());
  document.getElementById('reportDismiss')?.addEventListener('click', () => {
    const rep = lastReport();
    if (rep) store.set(KEYS.reportSeen, rep.week);
    App.haptic();
    document.getElementById('reportCard')?.remove();
  });
  c.querySelectorAll('[data-path]').forEach((el) => el.addEventListener('click', () => {
    App.haptic();
    App.navigate('learn');
    window.dispatchEvent(new CustomEvent('masterycap:focus-track', {
      detail: { trackId: el.dataset.path, weekId: null, kind: 'home' },
    }));
  }));
  document.getElementById('quotaDismiss')?.addEventListener('click', () => {
    store.set(KEYS.quotaDismissed, true); App.render();
  });
  document.getElementById('backupDismiss')?.addEventListener('click', () => {
    store.set(KEYS.backupRemindDismissedAt, Date.now()); App.render();
  });
  document.getElementById('mbDismiss')?.addEventListener('click', () => {
    store.remove(KEYS.morningPending);
    store.set(KEYS.morningBriefDay, new Date().toISOString().slice(0, 10));
    App.render();
  });
  document.getElementById('mbReview')?.addEventListener('click', () => {
    store.remove(KEYS.morningPending);
    store.set(KEYS.morningBriefDay, new Date().toISOString().slice(0, 10));
    App.openReview();
  });
  document.getElementById('mbDrill')?.addEventListener('click', () => {
    store.remove(KEYS.morningPending);
    store.set(KEYS.morningBriefDay, new Date().toISOString().slice(0, 10));
    App.openDrills();
  });
  const av = document.getElementById('openSettings');
  if (av) {
    av.addEventListener('click', () => { App.haptic(); openSettings(App); });
    av.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSettings(App); } });
  }
}
