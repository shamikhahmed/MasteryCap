/* ============================================================
   settings.js — full settings sheet (P0 backup + P8 polish).
   ============================================================ */

import { store, KEYS } from './store.js';
import { icon } from './icons.js';
import { applyTheme, getAppearance, setAppearance } from './theme.js';
import { getTeacher, setTeacher, TEACHERS } from './teacher.js';
import { mountDialog } from './dialog.js';

export const APP_VERSION = 'v52.3.0';

function todayStamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function closeSheet() {
  const el = document.getElementById('settings-sheet');
  if (el) el.remove();
}

function getSettings() {
  return store.get(KEYS.settings, { lang: 'en', fontSize: 'M', haptics: true, strictMode: false, checklistGate: false, highContrast: false });
}

export function applySettings(App) {
  const s = getSettings();
  const mult = { S: 0.92, M: 1, L: 1.08, XL: 1.2 }[s.fontSize] || 1;
  document.documentElement.style.setProperty('--fs', String(mult));
  // px-based layout: --fs only reaches the body base rule, so scale the whole
  // page uniformly — this is what makes the setting visibly work everywhere.
  if (document.body) document.body.style.zoom = String(mult);
  document.documentElement.dataset.font = s.fontSize || 'M';
  document.documentElement.dataset.contrast = s.highContrast ? 'high' : 'normal';
  if (App) App._haptics = s.haptics !== false;
  applyTheme();
}

export function downloadBackup(App) {
  const wrapped = store.exportBackup();
  const blob = new Blob([JSON.stringify(wrapped, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `masterycap-backup-${todayStamp()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  store.set(KEYS.lastExportAt, new Date().toISOString());
  store.set(KEYS.firstBackupDone, true);
  store.remove(KEYS.backupRemindDismissed);
  store.remove(KEYS.backupRemindDismissedAt);
  App.haptic(12);
  flash(App.t('backup_done'), 'warn');
}

function doImport(App, file) {
  const reader = new FileReader();
  reader.onload = async () => {
    let obj;
    try { obj = JSON.parse(reader.result); } catch (e) { obj = null; }
    if (!obj) { flash(App.t('backup_bad'), 'err'); return; }
    if (!confirm(App.t('backup_confirm'))) return;
    const res = await store.importBackup(obj);
    if (!res.ok) {
      if (res.error === 'checksum_fail') flash(App.t('backup_checksum'), 'err');
      else if (res.error === 'partial_backup') flash(App.t('backup_partial'), 'err');
      else if (res.error === 'unsupported_version') flash(App.t('backup_newer'), 'err');
      else if (res.error === 'write_fail') flash(App.t('backup_write_fail'), 'err');
      else flash(App.t('backup_bad'), 'err');
      return;
    }
    App.haptic(20);
    flash(App.t('backup_ok'), 'warn');
    setTimeout(() => location.reload(), 600);
  };
  reader.readAsText(file);
}

function flash(text, kind) {
  const msg = document.getElementById('settings-msg');
  if (!msg) return;
  msg.textContent = text;
  msg.className = `note-box ${kind === 'err' ? 'err' : 'warn'} mt14`;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[char]));
}

export function openSettings(App) {
  closeSheet();
  applySettings(App);
  const s = getSettings();
  const name = App.profile?.name || '';
  const sheet = document.createElement('div');
  sheet.id = 'settings-sheet';
  sheet.className = 'sheet-root';
  sheet.innerHTML = `
    <div class="sheet-backdrop" data-close></div>
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="settingsTitle">
      <div class="sheet-handle"></div>
      <div class="sheet-head">
        <div class="slabel" id="settingsTitle">${App.t('settings')}</div>
        <button class="sheet-x" data-close aria-label="${App.t('back')}">${icon('x', { size: 18 })}</button>
      </div>
      <div class="sheet-body settings-body">
        <section class="set-group" aria-labelledby="setGrpAccount">
          <h3 class="set-group-title" id="setGrpAccount">${App.t('set_grp_account')}</h3>
          <div class="field">
            <label for="setName">${App.t('set_name')}</label>
            <input id="setName" type="text" autocomplete="nickname" maxlength="32" value="${escapeHtml(name)}" />
          </div>
          <div class="slabel">${App.t('set_lang')}</div>
          <div class="seg set-seg" role="group" aria-label="${App.t('set_lang')}">
            <button type="button" class="${App.lang === 'en' ? 'on' : ''}" data-lang="en" aria-pressed="${App.lang === 'en'}">EN</button>
            <button type="button" class="${App.lang === 'ur' ? 'on' : ''}" data-lang="ur" aria-pressed="${App.lang === 'ur'}">UR</button>
          </div>
        </section>

        <section class="set-group" aria-labelledby="setGrpGeneral">
          <h3 class="set-group-title" id="setGrpGeneral">${App.t('set_grp_general')}</h3>
          <div class="slabel">${App.t('set_session')}</div>
          <div class="seg set-seg" role="group" aria-label="${App.t('set_session')}">
            ${[15, 30, 45].map((m) => `<button type="button" class="${(store.get(KEYS.settings, {}).sessionMins || 15) === m ? 'on' : ''}" data-sessionmins="${m}" aria-pressed="${(store.get(KEYS.settings, {}).sessionMins || 15) === m}">${m} min</button>`).join('')}
          </div>
          <div class="slabel">${App.t('set_teacher')}</div>
          <div class="seg set-seg" role="group" aria-label="${App.t('set_teacher')}">
            ${TEACHERS.map((tid) => `<button type="button" class="${getTeacher() === tid ? 'on' : ''}" data-teacher="${tid}" aria-pressed="${getTeacher() === tid}">${App.t('teacher_' + tid)}</button>`).join('')}
          </div>
          <div class="set-toggles">
            <button type="button" class="check-row ${(s.haptics !== false) ? 'on' : ''}" id="setHap" data-on="${s.haptics !== false ? '1' : '0'}" aria-pressed="${s.haptics !== false}">
              <span class="check-box" aria-hidden="true">${icon('checkThin', { size: 13, sw: 2.6 })}</span>
              <span class="check-t">${App.t('set_haptics')}</span>
            </button>
            <button type="button" class="check-row ${s.strictMode ? 'on' : ''}" id="setStrict" data-on="${s.strictMode ? '1' : '0'}" aria-pressed="${!!s.strictMode}">
              <span class="check-box" aria-hidden="true">${icon('checkThin', { size: 13, sw: 2.6 })}</span>
              <span class="check-t">${App.t('set_strict')}</span>
            </button>
            <button type="button" class="check-row ${s.checklistGate ? 'on' : ''}" id="setGate" data-on="${s.checklistGate ? '1' : '0'}" aria-pressed="${!!s.checklistGate}">
              <span class="check-box" aria-hidden="true">${icon('checkThin', { size: 13, sw: 2.6 })}</span>
              <span class="check-t">${App.t('set_checklist_gate')}</span>
            </button>
          </div>
          <button type="button" class="btn ghost" id="setIos">${App.t('set_ios_install')}</button>
        </section>

        <section class="set-group" aria-labelledby="setGrpAppear">
          <h3 class="set-group-title" id="setGrpAppear">${App.t('set_grp_appearance')}</h3>
          <div class="slabel">${App.t('set_appearance')}</div>
          <div class="seg set-seg set-seg-wrap" role="group" aria-label="${App.t('set_appearance')}">
            ${['light', 'sepia', 'dark', 'auto'].map((m) => `<button type="button" class="${(getAppearance().mode || 'light') === m ? 'on' : ''}" data-mode="${m}" aria-pressed="${(getAppearance().mode || 'light') === m}">${App.t('theme_' + m)}</button>`).join('')}
          </div>
          <div class="slabel">${App.t('set_font')}</div>
          <div class="seg set-seg" role="group" aria-label="${App.t('set_font')}">
            ${['S', 'M', 'L', 'XL'].map((f) => `<button type="button" class="${(s.fontSize || 'M') === f ? 'on' : ''}" data-fs="${f}" aria-pressed="${(s.fontSize || 'M') === f}">${f}</button>`).join('')}
          </div>
        </section>

        <section class="set-group" aria-labelledby="setGrpA11y">
          <h3 class="set-group-title" id="setGrpA11y">${App.t('set_grp_a11y')}</h3>
          <div class="set-toggles">
            <button type="button" class="check-row ${s.highContrast ? 'on' : ''}" id="setContrast" data-on="${s.highContrast ? '1' : '0'}" aria-pressed="${!!s.highContrast}">
              <span class="check-box" aria-hidden="true">${icon('checkThin', { size: 13, sw: 2.6 })}</span>
              <span class="check-t">${App.t('set_contrast')}</span>
            </button>
          </div>
        </section>

        <section class="set-group" aria-labelledby="setGrpNotify">
          <h3 class="set-group-title" id="setGrpNotify">${App.t('set_grp_notify')}</h3>
          <div class="set-toggles">
            <button type="button" class="check-row ${store.get(KEYS.notifyOptIn) ? 'on' : ''}" id="setNotify" data-on="${store.get(KEYS.notifyOptIn) ? '1' : '0'}" aria-pressed="${!!store.get(KEYS.notifyOptIn)}">
              <span class="check-box" aria-hidden="true">${icon('checkThin', { size: 13, sw: 2.6 })}</span>
              <span class="check-t">${App.t('set_notify')}</span>
            </button>
          </div>
        </section>

        <section class="set-group" aria-labelledby="setGrpPrivacy">
          <h3 class="set-group-title" id="setGrpPrivacy">${App.t('set_grp_privacy')}</h3>
          <p class="set-hint">${App.t('backup_export_hint')}</p>
          <button type="button" class="btn secondary" id="setExport">${icon('download', { size: 17 })} ${App.t('backup_export')}</button>
          <button type="button" class="btn ghost" id="setCsv">${icon('download', { size: 17 })} ${App.t('csv_export')}</button>
          <p class="set-hint">${App.t('backup_import_hint')}</p>
          <button type="button" class="btn ghost" id="setImport">${icon('upload', { size: 17 })} ${App.t('backup_import')}</button>
          ${store.get(KEYS.preImportAvailable) ? `<button type="button" class="btn ghost" id="setRestorePreImport">${icon('refresh', { size: 17 })} ${App.t('backup_restore_previous')}</button>` : ''}
          <input type="file" id="setFile" accept="application/json,.json" hidden />
          <div class="field set-verify">
            <label for="setVerifyHash">${App.t('verify_cert')}</label>
            <input id="setVerifyHash" type="text" inputmode="text" autocomplete="off" placeholder="verify:…" maxlength="24" />
            <p id="setVerifyOut" class="set-hint" role="status"></p>
            <p class="set-hint">${App.t('cert_verify_hint')}</p>
          </div>
          <p class="set-hint">${App.t('demo_hint')}</p>
          <button type="button" class="btn secondary" id="setDemo">${store.getNs().startsWith('masterycap-demo') ? App.t('demo_off') : App.t('demo_on')}</button>
          <div class="slabel set-danger-label">${App.t('set_danger')}</div>
          <button type="button" class="btn ghost set-reset" id="setReset">${App.t('set_reset')}</button>
        </section>

        <section class="set-group set-group-about" aria-labelledby="setGrpAbout">
          <h3 class="set-group-title" id="setGrpAbout">${App.t('set_grp_about')}</h3>
          <div class="note-box set-limits">${App.t('limits_honest')}</div>
          <p class="set-hint">${App.t('cert_not_license')}</p>
          <div id="settings-msg" class="hidden" role="status" aria-live="polite"></div>
          <p class="set-version mono">MasteryCap ${APP_VERSION} · <a class="set-changelog" href="CHANGELOG.md">${App.t('set_changelog')}</a></p>
        </section>
      </div>
    </div>`;
  document.body.appendChild(sheet);
  requestAnimationFrame(() => sheet.classList.add('on'));

  const saveProfileName = () => {
    const n = (document.getElementById('setName').value || '').trim() || 'Trader';
    App.profile = { ...(App.profile || {}), name: n };
    store.set(KEYS.profile, App.profile);
  };

  sheet.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', () => {
    saveProfileName();
    sheet.classList.remove('on');
    setTimeout(() => { closeSheet(); App.render(); }, 220);
  }));

  sheet.querySelectorAll('[data-lang]').forEach((b) => b.addEventListener('click', () => {
    saveProfileName();
    App.setLang(b.dataset.lang);
    closeSheet();
    openSettings(App);
  }));

  sheet.querySelectorAll('[data-fs]').forEach((b) => b.addEventListener('click', () => {
    const st = getSettings();
    st.fontSize = b.dataset.fs;
    store.set(KEYS.settings, st);
    applySettings(App);
    App.haptic();
    sheet.querySelectorAll('[data-fs]').forEach((x) => {
      const on = x.dataset.fs === st.fontSize;
      x.classList.toggle('on', on);
      x.setAttribute('aria-pressed', String(on));
    });
  }));

  sheet.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
    setAppearance({ mode: b.dataset.mode });
    App.haptic();
    sheet.querySelectorAll('[data-mode]').forEach((x) => {
      const on = x.dataset.mode === b.dataset.mode;
      x.classList.toggle('on', on);
      x.setAttribute('aria-pressed', String(on));
    });
  }));
  sheet.querySelectorAll('[data-sessionmins]').forEach((b) => b.addEventListener('click', () => {
    const cur = store.get(KEYS.settings, {});
    store.set(KEYS.settings, { ...cur, sessionMins: Number(b.dataset.sessionmins) });
    App.haptic();
    sheet.querySelectorAll('[data-sessionmins]').forEach((x) => {
      const on = x.dataset.sessionmins === b.dataset.sessionmins;
      x.classList.toggle('on', on);
      x.setAttribute('aria-pressed', String(on));
    });
  }));
  sheet.querySelectorAll('[data-teacher]').forEach((b) => b.addEventListener('click', () => {
    setTeacher(b.dataset.teacher);
    App.haptic();
    sheet.querySelectorAll('[data-teacher]').forEach((x) => {
      const on = x.dataset.teacher === b.dataset.teacher;
      x.classList.toggle('on', on);
      x.setAttribute('aria-pressed', String(on));
    });
  }));
  document.getElementById('setVerifyHash')?.addEventListener('input', (e) => {
    const raw = (e.target.value || '').replace(/^verify:/i, '').trim();
    const out = document.getElementById('setVerifyOut');
    if (!out) return;
    out.textContent = raw.length >= 6
      ? (App.lang === 'en' ? `Hash noted — match against PNG footer verify:${raw.slice(0, 10)}` : `Hash note — PNG footer se match: verify:${raw.slice(0, 10)}`)
      : '';
  });

  document.getElementById('setHap').addEventListener('click', () => {
    const el = document.getElementById('setHap');
    const on = el.dataset.on !== '1';
    el.dataset.on = on ? '1' : '0';
    el.classList.toggle('on', on);
    el.setAttribute('aria-pressed', String(on));
    const st = getSettings();
    st.haptics = on;
    store.set(KEYS.settings, st);
    applySettings(App);
    App.haptic();
  });

  function wireSettingToggle(id, field, extra) {
    document.getElementById(id)?.addEventListener('click', () => {
      const el = document.getElementById(id);
      const on = el.dataset.on !== '1';
      el.dataset.on = on ? '1' : '0';
      el.classList.toggle('on', on);
      el.setAttribute('aria-pressed', String(on));
      if (field) {
        const st = getSettings();
        st[field] = on;
        store.set(KEYS.settings, st);
        applySettings(App);
      }
      extra?.(on);
      App.haptic();
    });
  }
  wireSettingToggle('setStrict', 'strictMode');
  wireSettingToggle('setGate', 'checklistGate');
  wireSettingToggle('setContrast', 'highContrast');
  wireSettingToggle('setNotify', null, async (on) => {
    if (on && 'Notification' in window) {
      const perm = await Notification.requestPermission();
      store.set(KEYS.notifyOptIn, perm === 'granted');
      if (perm !== 'granted') {
        document.getElementById('setNotify').dataset.on = '0';
        document.getElementById('setNotify').classList.remove('on');
      }
    } else store.set(KEYS.notifyOptIn, false);
  });

  document.getElementById('setIos')?.addEventListener('click', () => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;
    if (standalone) {
      alert(App.t('ios_already'));
      return;
    }
    const el = document.createElement('div');
    el.className = 'sheet-root on';
    el.innerHTML = `<div class="sheet-backdrop" data-close></div>
      <div class="sheet" role="dialog">
        <div class="sheet-handle"></div>
        <div class="sheet-head"><div class="slabel">${App.t('set_ios_install')}</div>
          <button class="sheet-x" data-close>${icon('x', { size: 18 })}</button></div>
        <div class="sheet-body set-ios-body">
          <ol class="set-ios-steps">
            <li>${App.t('ios_step_1')}</li>
            <li>${App.t('ios_step_2')}</li>
            <li>${App.t('ios_step_3')}</li>
          </ol>
          <p class="set-hint">${App.t('ios_install_body')}</p>
        </div>
      </div>`;
    document.body.appendChild(el);
    el.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => el.remove()));
    mountDialog(el);
  });

  document.getElementById('setExport').addEventListener('click', () => downloadBackup(App));
  document.getElementById('setCsv')?.addEventListener('click', () => doCsvExport(App));
  document.getElementById('setImport').addEventListener('click', () => document.getElementById('setFile').click());
  document.getElementById('setFile').addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) doImport(App, f);
    e.target.value = '';
  });
  document.getElementById('setRestorePreImport')?.addEventListener('click', async () => {
    if (!confirm(App.t('backup_restore_previous_confirm'))) return;
    const result = await store.restorePreImport();
    if (!result.ok) {
      flash(App.t('backup_restore_previous_fail'), 'err');
      return;
    }
    flash(App.t('backup_ok'), 'warn');
    setTimeout(() => location.reload(), 600);
  });

  document.getElementById('setDemo')?.addEventListener('click', () => {
    toggleDemo(App);
  });

  document.getElementById('setReset').addEventListener('click', () => {
    if (!confirm(App.t('set_reset_1'))) return;
    if (!confirm(App.t('set_reset_export_first'))) {
      document.getElementById('setExport')?.click();
      return;
    }
    const typed = prompt(App.t('set_reset_type'));
    if (String(typed || '').trim().toUpperCase() !== 'RESET') {
      flash(App.t('set_reset_abort'), 'err');
      return;
    }
    if (!confirm(App.t('set_reset_2'))) return;
    store.clearAll();
    location.reload();
  });
  mountDialog(sheet, { initialFocus: '#setName' });
}

function doCsvExport(App) {
  const trades = store.get(KEYS.trades, []) || [];
  const cols = ['id', 'date', 'pair', 'direction', 'leverage', 'size', 'entry', 'stop', 'exit', 'pl', 'emotion', 'notes', 'stopPlaced', 'movedStop', 'r', 'setup', 'market', 'timeframe', 'followedPlan'];
  const esc = (v) => {
    const s = v == null ? '' : String(v);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const lines = ['\uFEFF' + cols.join(',')];
  trades.forEach((t) => lines.push(cols.map((c) => esc(t[c])).join(',')));
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `masterycap-trades-${todayStamp()}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  App.haptic(10);
  flash(App.t('backup_done'), 'warn');
}

function seedDemo() {
  const now = Date.now();
  const iso = (ms) => new Date(ms).toISOString();
  const trades = [
    { id: 1, date: iso(now - 5 * 86400000), pair: 'BTCUSDT', direction: 'long', size: 200, entry: 100, stop: 98, exit: 103, pl: 40, emotion: 'calm', stopPlaced: true, movedStop: false },
    { id: 2, date: iso(now - 4 * 86400000), pair: 'ETHUSDT', direction: 'short', size: 150, entry: 50, stop: 51, exit: 48, pl: 25, emotion: 'calm', stopPlaced: true, movedStop: false },
    { id: 3, date: iso(now - 3 * 86400000), pair: 'SOLUSDT', direction: 'long', size: 300, entry: 20, stop: 19, exit: 18, pl: -40, emotion: 'revenge', stopPlaced: true, movedStop: true },
    { id: 4, date: iso(now - 2 * 86400000), pair: 'BTCUSDT', direction: 'long', size: 500, entry: 100, stop: 99, exit: 97, pl: -60, emotion: 'greed', stopPlaced: false, movedStop: false },
    { id: 5, date: iso(now - 1 * 86400000), pair: 'EURUSD', direction: 'long', size: 100, entry: 1.1, stop: 1.09, exit: 1.12, pl: 15, emotion: 'calm', stopPlaced: true, movedStop: false },
    { id: 6, date: iso(now - 3600000), pair: 'BTCUSDT', direction: 'long', size: 200, entry: 100, stop: 98, exit: 101, pl: 12, emotion: 'fomo', stopPlaced: true, movedStop: false },
  ];
  store.set(KEYS.trades, trades);
  store.set(KEYS.balance, 10000);
  store.set(KEYS.course, {
    crypto: { placementDone: true, weekStatus: { 1: 'completed', 2: 'completed', 3: 'current' }, xp: 150 },
    stocks: { placementDone: false, weekStatus: {}, xp: 0 },
  });
  store.set(KEYS.profile, { name: 'Demo Trader', experience: 'some', markets: ['crypto', 'stocks'], campus: true, register: 'young', ageBand: '18-24', goal: 'apps', timeBand: '2-5' });
  store.set(KEYS.onboarded, true);
  store.set(KEYS.streak, { lastDay: new Date().toISOString().slice(0, 10), current: 3, best: 5 });
}

function toggleDemo(App) {
  const on = store.getNs().startsWith('masterycap-demo');
  if (on) {
    store.setNs('masterycap:');
    location.reload();
    return;
  }
  store.setNs('masterycap-demo:');
  store.clearAll();
  seedDemo();
  store.set(KEYS.demo, true);
  store.set(KEYS.settings, { lang: App.lang || 'en', fontSize: 'M', haptics: true });
  location.reload();
}
