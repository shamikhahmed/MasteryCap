/* ============================================================
   settings.js — settings sheet (P0: backup/restore; P8 expands).
   ============================================================ */

import { store } from './store.js';
import { icon } from './icons.js';

function todayStamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function closeSheet() {
  const el = document.getElementById('settings-sheet');
  if (el) el.remove();
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
  const msg = document.getElementById('settings-msg');
  if (msg) { msg.textContent = App.t('backup_done'); msg.className = 'note-box warn mt14'; }
}

function doImport(App, file) {
  const reader = new FileReader();
  reader.onload = () => {
    let obj;
    try { obj = JSON.parse(reader.result); } catch (e) { obj = null; }
    if (!store.validateBackup(obj)) {
      const msg = document.getElementById('settings-msg');
      if (msg) { msg.textContent = App.t('backup_bad'); msg.className = 'note-box err mt14'; }
      return;
    }
    if (!confirm(App.t('backup_confirm'))) return;
    store.clearAll();
    store.importAll(obj);
    App.haptic(20);
    const msg = document.getElementById('settings-msg');
    if (msg) { msg.textContent = App.t('backup_ok'); msg.className = 'note-box warn mt14'; }
    setTimeout(() => location.reload(), 600);
  };
  reader.readAsText(file);
}

export function openSettings(App) {
  closeSheet();
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
        <div class="slabel" style="margin-bottom:10px">${App.t('backup_title')}</div>
        <p style="font-size:13.5px;color:var(--t3);line-height:1.55;margin:0 0 16px">${App.t('backup_export_hint')}</p>
        <button class="btn secondary" id="setExport">${icon('download', { size: 17 })} ${App.t('backup_export')}</button>
        <p style="font-size:13.5px;color:var(--t3);line-height:1.55;margin:18px 0 16px">${App.t('backup_import_hint')}</p>
        <button class="btn ghost" id="setImport">${icon('upload', { size: 17 })} ${App.t('backup_import')}</button>
        <input type="file" id="setFile" accept="application/json,.json" hidden />
        <div id="settings-msg" class="hidden"></div>
      </div>
    </div>`;
  document.body.appendChild(sheet);
  requestAnimationFrame(() => sheet.classList.add('on'));

  sheet.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', () => {
    sheet.classList.remove('on');
    setTimeout(closeSheet, 220);
  }));
  document.getElementById('setExport').addEventListener('click', () => doExport(App));
  document.getElementById('setImport').addEventListener('click', () => document.getElementById('setFile').click());
  document.getElementById('setFile').addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) doImport(App, f);
    e.target.value = '';
  });
}
