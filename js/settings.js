/* ============================================================
   settings.js — full settings sheet (P0 backup + P8 polish).
   ============================================================ */

import { store, KEYS } from './store.js';
import { icon } from './icons.js';
import { applyTheme, getAppearance, setAppearance } from './theme.js';
import { getTeacher, setTeacher, TEACHERS } from './teacher.js';
import { evidenceHash } from './exam.js';

export const APP_VERSION = 'v42.2.1';

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

function doExport(App) {
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
  reader.onload = () => {
    let obj;
    try { obj = JSON.parse(reader.result); } catch (e) { obj = null; }
    if (!obj) { flash(App.t('backup_bad'), 'err'); return; }
    if (!confirm(App.t('backup_confirm'))) return;
    const res = store.importBackup(obj);
    if (!res.ok) {
      if (res.error === 'checksum_fail') flash(App.t('backup_checksum'), 'err');
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
    <div class="sheet" role="dialog" aria-label="${App.t('settings')}">
      <div class="sheet-handle"></div>
      <div class="sheet-head">
        <div class="slabel">${App.t('settings')}</div>
        <button class="sheet-x" data-close aria-label="Close">${icon('x', { size: 18 })}</button>
      </div>
      <div class="sheet-body">
        <div class="field">
          <label>${App.t('set_name')}</label>
          <input id="setName" type="text" value="${name.replace(/"/g, '&quot;')}" maxlength="32" />
        </div>

        <div class="slabel" style="margin:8px 0 10px">${App.t('set_lang')}</div>
        <div class="seg" style="width:100%;margin-bottom:16px">
          <button style="flex:1" class="${App.lang === 'en' ? 'on' : ''}" data-lang="en">EN</button>
          <button style="flex:1" class="${App.lang === 'ur' ? 'on' : ''}" data-lang="ur">UR</button>
        </div>

        <div class="slabel" style="margin:0 0 10px">${App.t('set_font')}</div>
        <div class="seg" style="width:100%;margin-bottom:16px">
          ${['S', 'M', 'L', 'XL'].map((f) => `<button style="flex:1" class="${(s.fontSize || 'M') === f ? 'on' : ''}" data-fs="${f}">${f}</button>`).join('')}
        </div>

        <div class="slabel" style="margin:0 0 10px">${App.t('set_appearance')}</div>
        <div class="seg" style="width:100%;margin-bottom:16px">
          ${['dark', 'light', 'auto'].map((m) => `<button style="flex:1" class="${(getAppearance().mode || 'dark') === m ? 'on' : ''}" data-mode="${m}">${App.t('theme_' + m)}</button>`).join('')}
        </div>
        <div class="slabel" style="margin:0 0 8px;font-size:11px;opacity:0.8">${App.lang === 'en' ? 'Daily session length' : 'Rozana session'}</div>
        <div class="seg" style="width:100%;margin-bottom:16px">
          ${[15, 30, 45].map((m) => `<button style="flex:1" class="${(store.get(KEYS.settings, {}).sessionMins || 15) === m ? 'on' : ''}" data-sessionmins="${m}">${m} min</button>`).join('')}
        </div>

        <div class="slabel" style="margin:0 0 10px">${App.t('set_teacher')}</div>
        <div class="seg" style="width:100%;margin-bottom:16px">
          ${TEACHERS.map((tid) => `<button style="flex:1" class="${getTeacher() === tid ? 'on' : ''}" data-teacher="${tid}">${App.t('teacher_' + tid)}</button>`).join('')}
        </div>

        <div class="field" style="margin-bottom:16px">
          <label>${App.t('verify_cert')}</label>
          <input id="setVerifyHash" type="text" placeholder="verify:…" maxlength="24" />
          <p id="setVerifyOut" style="font-size:12px;color:var(--t3);margin:8px 0 0"></p>
          <p style="font-size:12px;color:var(--t3);margin:8px 0 0;line-height:1.45">${App.t('cert_not_license')}</p>
          <p style="font-size:12px;color:var(--t3);margin:6px 0 0;line-height:1.45">${App.t('cert_verify_hint')}</p>
        </div>

        <div class="check-row ${(s.haptics !== false) ? 'on' : ''}" id="setHap" data-on="${s.haptics !== false ? '1' : '0'}" style="border:1px solid var(--line);border-radius:var(--r2);margin-bottom:10px">
          <span class="check-box">${icon('checkThin', { size: 13, sw: 2.6 })}</span>
          <span class="check-t">${App.t('set_haptics')}</span>
        </div>
        <div class="check-row ${s.strictMode ? 'on' : ''}" id="setStrict" data-on="${s.strictMode ? '1' : '0'}" style="border:1px solid var(--line);border-radius:var(--r2);margin-bottom:10px">
          <span class="check-box">${icon('checkThin', { size: 13, sw: 2.6 })}</span>
          <span class="check-t">${App.t('set_strict')}</span>
        </div>
        <div class="check-row ${s.checklistGate ? 'on' : ''}" id="setGate" data-on="${s.checklistGate ? '1' : '0'}" style="border:1px solid var(--line);border-radius:var(--r2);margin-bottom:10px">
          <span class="check-box">${icon('checkThin', { size: 13, sw: 2.6 })}</span>
          <span class="check-t">${App.t('set_checklist_gate')}</span>
        </div>
        <div class="check-row ${s.highContrast ? 'on' : ''}" id="setContrast" data-on="${s.highContrast ? '1' : '0'}" style="border:1px solid var(--line);border-radius:var(--r2);margin-bottom:10px">
          <span class="check-box">${icon('checkThin', { size: 13, sw: 2.6 })}</span>
          <span class="check-t">${App.t('set_contrast')}</span>
        </div>
        <div class="check-row ${store.get(KEYS.notifyOptIn) ? 'on' : ''}" id="setNotify" data-on="${store.get(KEYS.notifyOptIn) ? '1' : '0'}" style="border:1px solid var(--line);border-radius:var(--r2);margin-bottom:18px">
          <span class="check-box">${icon('checkThin', { size: 13, sw: 2.6 })}</span>
          <span class="check-t">${App.t('set_notify')}</span>
        </div>
        <button class="btn ghost" id="setIos" style="width:100%;margin-bottom:14px">${App.t('set_ios_install')}</button>

        <div class="slabel" style="margin-bottom:10px">${App.t('backup_title')}</div>
        <p style="font-size:13.5px;color:var(--t3);line-height:1.55;margin:0 0 12px">${App.t('backup_export_hint')}</p>
        <button class="btn secondary" id="setExport">${icon('download', { size: 17 })} ${App.t('backup_export')}</button>
        <button class="btn ghost mt10" id="setCsv">${icon('download', { size: 17 })} ${App.t('csv_export')}</button>
        <p style="font-size:13.5px;color:var(--t3);line-height:1.55;margin:14px 0 12px">${App.t('backup_import_hint')}</p>
        <button class="btn ghost" id="setImport">${icon('upload', { size: 17 })} ${App.t('backup_import')}</button>
        <div class="note-box mt14" style="font-size:12.5px">${App.t('limits_honest')}</div>
        <input type="file" id="setFile" accept="application/json,.json" hidden />

        <div class="slabel" style="margin:22px 0 10px">${App.t('demo_pill')}</div>
        <p style="font-size:13.5px;color:var(--t3);line-height:1.55;margin:0 0 12px">${App.t('demo_hint')}</p>
        <button class="btn secondary" id="setDemo">${store.getNs().startsWith('masterycap-demo') ? App.t('demo_off') : App.t('demo_on')}</button>

        <div class="slabel" style="margin:22px 0 10px;color:var(--down)">${App.t('set_danger')}</div>
        <button class="btn ghost" id="setReset" style="border-color:rgba(234,57,67,0.35);color:var(--down)">${App.t('set_reset')}</button>

        <div id="settings-msg" class="hidden"></div>
        <div style="margin-top:18px;font-size:12px;color:var(--t3)" class="mono">
          MasteryCap ${APP_VERSION} · <a href="CHANGELOG.md" style="color:var(--acc-2)">${App.t('set_changelog')}</a>
        </div>
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
    sheet.querySelectorAll('[data-fs]').forEach((x) => x.classList.toggle('on', x.dataset.fs === st.fontSize));
  }));

  sheet.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
    setAppearance({ mode: b.dataset.mode });
    App.haptic();
    sheet.querySelectorAll('[data-mode]').forEach((x) => x.classList.toggle('on', x.dataset.mode === b.dataset.mode));
  }));
  sheet.querySelectorAll('[data-sessionmins]').forEach((b) => b.addEventListener('click', () => {
    const cur = store.get(KEYS.settings, {});
    store.set(KEYS.settings, { ...cur, sessionMins: Number(b.dataset.sessionmins) });
    App.haptic();
    sheet.querySelectorAll('[data-sessionmins]').forEach((x) => x.classList.toggle('on', x.dataset.sessionmins === b.dataset.sessionmins));
  }));
  sheet.querySelectorAll('[data-teacher]').forEach((b) => b.addEventListener('click', () => {
    setTeacher(b.dataset.teacher);
    App.haptic();
    sheet.querySelectorAll('[data-teacher]').forEach((x) => x.classList.toggle('on', x.dataset.teacher === b.dataset.teacher));
  }));
  document.getElementById('setVerifyHash')?.addEventListener('input', (e) => {
    const raw = (e.target.value || '').replace(/^verify:/i, '').trim();
    const out = document.getElementById('setVerifyOut');
    if (!out) return;
    out.textContent = raw.length >= 6
      ? (App.lang === 'en' ? `Hash noted — match against PNG footer verify:${raw.slice(0, 10)}` : `Hash note — PNG footer se match: verify:${raw.slice(0, 10)}`)
      : '';
    void evidenceHash;
  });

  document.getElementById('setHap').addEventListener('click', () => {
    const el = document.getElementById('setHap');
    const on = el.dataset.on !== '1';
    el.dataset.on = on ? '1' : '0';
    el.classList.toggle('on', on);
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
        <div class="sheet-body" style="font-size:14px;color:var(--t2);line-height:1.55">
          <ol style="padding-left:18px;margin:0">
            <li style="margin-bottom:10px">${App.t('ios_step_1')}</li>
            <li style="margin-bottom:10px">${App.t('ios_step_2')}</li>
            <li>${App.t('ios_step_3')}</li>
          </ol>
          <p style="margin-top:14px;color:var(--t3)">${App.t('ios_install_body')}</p>
        </div>
      </div>`;
    document.body.appendChild(el);
    el.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => el.remove()));
  });

  document.getElementById('setExport').addEventListener('click', () => doExport(App));
  document.getElementById('setCsv')?.addEventListener('click', () => doCsvExport(App));
  document.getElementById('setImport').addEventListener('click', () => document.getElementById('setFile').click());
  document.getElementById('setFile').addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) doImport(App, f);
    e.target.value = '';
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
  store.set(KEYS.profile, { name: 'Demo Trader', experience: 'some', markets: ['crypto', 'stocks'] });
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
