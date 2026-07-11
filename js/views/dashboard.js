/* ============================================================
   dashboard.js — school campus Home (v22).
   Next lesson, beginner path, study stats. No trading desk.
   ============================================================ */

import { TRACKS, getTrack } from '../data/tracks.js';
import { BEGINNER_PATH } from '../data/paths.js';
import { icon, TRACK_ICON } from '../icons.js';
import { openSettings } from '../settings.js';
import { getStreak, reviewAvailable, dueReviewCount } from '../retention.js';
import { store, KEYS } from '../store.js';
import { openHowto } from '../howto.js';

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
  <div class="screen">
    <div class="lt-head">
      <div class="head-row">
        <div>
          <div class="kicker">${greeting(App)}${store.getNs().startsWith('masterycap-demo') ? ` · <span class="pill acc">${App.t('demo_pill')}</span>` : ''}</div>
          <h1>${App.profile?.name || (lang === 'en' ? 'Student' : 'Student')}</h1>
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
      if (overdue && !store.get(KEYS.backupRemindDismissed) && store.get(KEYS.onboarded)) {
        notices.push(`<div class="note-box" id="backupPill" style="margin-bottom:12px">${App.t('backup_remind')} <button class="pill" id="backupDismiss" style="margin-left:8px">${App.t('backup_remind_dismiss')}</button></div>`);
      }
      return notices.join('');
    })()}

    <div class="note-box" style="margin-bottom:14px">${App.t('campus_blurb')}</div>
    <div class="note-box warn" style="margin-bottom:14px">${App.t('campus_no_rich')}</div>

    <div class="panel pad" style="margin-bottom:14px">
      <div class="slabel">${App.t('campus_next')}</div>
      <div style="font-size:16px;font-weight:600;letter-spacing:-0.02em;margin-top:8px;line-height:1.35">${nextLabel}</div>
      <button class="btn accent mt14" id="goContinue" style="width:100%">${icon('learn', { size: 17 })} ${App.t('continueLearning')}</button>
      <button class="btn secondary mt10" id="goHowto" style="width:100%">${icon('check', { size: 17 })} ${App.t('howto_cta')}</button>
    </div>

    <div class="stat-strip">
      <div class="stat-cell">
        <div class="sc-l">${App.t('stat_xp')}</div>
        <div class="sc-v" style="color:var(--warn)">${xp}</div>
        <div class="sc-s">${lang === 'en' ? 'study' : 'study'}</div>
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
        <div class="sc-s">${lang === 'en' ? 'due' : 'due'}</div>
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
            <span class="check-t"><strong>${t.name[lang]}</strong><br/><span style="color:var(--t3);font-size:12px">${wdone}/${t.weeks.length} · ${pct}%</span></span>
          </button>`;
        }).join('')}
      </div>
    </div>

    <div class="panel" style="margin-bottom:14px">
      <div class="panel-h"><span class="ph-t">${App.t('campus_path')}</span></div>
      <div class="pad" style="padding-top:4px">
        ${BEGINNER_PATH.map((p, i) => {
          const t = getTrack(p.id);
          const prog = App.getCourse(p.id);
          const wdone = t.weeks.filter((w) => ['completed', 'mastered'].includes(prog.weekStatus[w.id])).length;
          return `<button type="button" class="check-row" data-path="${p.id}" style="width:100%;text-align:left;background:none;border:0;color:inherit;cursor:pointer">
            <span class="check-box" style="opacity:0.85">${icon(TRACK_ICON[p.id] || 'learn', { size: 14 })}</span>
            <span class="check-t"><strong>${i + 1}. ${t.name[lang]}</strong><br/><span style="color:var(--t3);font-size:12px">${wdone}/${t.weeks.length} · ${p.why[lang]}</span></span>
          </button>`;
        }).join('')}
      </div>
    </div>

    <div class="btn-row">
      <button class="btn secondary" id="goLearn">${icon('learn', { size: 17 })} ${App.t('nav_learn')}</button>
      <button class="btn secondary" id="goDrills">${icon('target', { size: 17 })} ${App.t('drill_cta')}</button>
    </div>
    <button class="btn secondary mt10" id="goSim" style="width:100%">${icon('journal', { size: 17 })} ${App.t('sim_cta')}</button>
    <button class="btn ghost mt10" id="goCharts" style="width:100%">${icon('progress', { size: 17 })} ${App.t('chart_cta')}</button>
    ${reviewAvailable() ? `<button class="btn secondary mt10" id="goReview" style="width:100%">${icon('book', { size: 17 })} ${App.t('review_cta').replace('{n}', String(due || streak.current || 0))}</button>` : ''}
    <button class="btn ghost mt14" id="goDesk" style="width:100%">${icon('journal', { size: 17 })} ${App.t('campus_desk')}</button>
  </div>`;

  c.querySelectorAll('[data-lang]').forEach((b) => b.addEventListener('click', () => App.setLang(b.dataset.lang)));

  const openNext = () => {
    App.haptic();
    if (!next) { App.navigate('learn'); return; }
    App.navigate('learn');
    // course view picks up via custom event / setCourseFocus
    window.dispatchEvent(new CustomEvent('masterycap:focus-track', {
      detail: { trackId: next.trackId, weekId: next.weekId, kind: next.kind },
    }));
  };
  document.getElementById('goContinue')?.addEventListener('click', openNext);
  document.getElementById('goHowto')?.addEventListener('click', () => { App.haptic(); openHowto(App); });
  document.getElementById('goLearn')?.addEventListener('click', () => App.navigate('learn'));
  document.getElementById('goDrills')?.addEventListener('click', () => App.openDrills());
  document.getElementById('goCharts')?.addEventListener('click', () => App.openCharts());
  document.getElementById('goSim')?.addEventListener('click', () => App.openSim());
  document.getElementById('goReview')?.addEventListener('click', () => App.openReview());
  document.getElementById('goDesk')?.addEventListener('click', () => App.navigate('journal'));
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
    store.set(KEYS.backupRemindDismissed, true); App.render();
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
