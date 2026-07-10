/* ============================================================
   settings.js — full settings sheet (P0 backup + P8 polish).
   ============================================================ */

import { store, KEYS } from './store.js';
import { icon } from './icons.js';

export const APP_VERSION = 'v14';

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
  return store.get(KEYS.settings, { lang: 'en', fontSize: 'M', haptics: true });
}

export function applySettings(App) {
  const s = getSettings();
  const mult = { S: 0.92, M: 1, L: 1.08 }[s.fontSize] || 1;
  document.documentElement.style.setProperty('--fs', String(mult));
  document.documentElement.dataset.font = s.fontSize || 'M';
  if (App) App._haptics = s.haptics !== false;
}

function doExport(App) {
  const data = store.exportAll();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `masterycap-backup-${todayStamp()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  App.haptic(12);
  flash(App.t('backup_done'), 'warn');
}

function doImport(App, file) {
  const reader = new FileReader();
  reader.onload = () => {
    let obj;
    try { obj = JSON.parse(reader.result); } catch (e) { obj = null; }
    if (!store.validateBackup(obj)) {
      flash(App.t('backup_bad'), 'err');
      return;
    }
    if (!confirm(App.t('backup_confirm'))) return;
    store.clearAll();
    store.importAll(obj);
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
          ${['S', 'M', 'L'].map((f) => `<button style="flex:1" class="${(s.fontSize || 'M') === f ? 'on' : ''}" data-fs="${f}">${f}</button>`).join('')}
        </div>

        <div class="check-row ${(s.haptics !== false) ? 'on' : ''}" id="setHap" data-on="${s.haptics !== false ? '1' : '0'}" style="border:1px solid var(--line);border-radius:var(--r2);margin-bottom:18px">
          <span class="check-box">${icon('checkThin', { size: 13, sw: 2.6 })}</span>
          <span class="check-t">${App.t('set_haptics')}</span>
        </div>

        <div class="slabel" style="margin-bottom:10px">${App.t('backup_title')}</div>
        <p style="font-size:13.5px;color:var(--t3);line-height:1.55;margin:0 0 12px">${App.t('backup_export_hint')}</p>
        <button class="btn secondary" id="setExport">${icon('download', { size: 17 })} ${App.t('backup_export')}</button>
        <p style="font-size:13.5px;color:var(--t3);line-height:1.55;margin:14px 0 12px">${App.t('backup_import_hint')}</p>
        <button class="btn ghost" id="setImport">${icon('upload', { size: 17 })} ${App.t('backup_import')}</button>
        <input type="file" id="setFile" accept="application/json,.json" hidden />

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

  document.getElementById('setExport').addEventListener('click', () => doExport(App));
  document.getElementById('setImport').addEventListener('click', () => document.getElementById('setFile').click());
  document.getElementById('setFile').addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) doImport(App, f);
    e.target.value = '';
  });

  document.getElementById('setReset').addEventListener('click', () => {
    if (!confirm(App.t('set_reset_1'))) return;
    if (!confirm(App.t('set_reset_2'))) return;
    store.clearAll();
    location.reload();
  });
}
