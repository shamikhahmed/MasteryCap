/* ============================================================
   glossary sheet — search from Learn header (P7).
   ============================================================ */

import { icon } from './icons.js';
import { searchGlossary } from './data/glossary.js';

export function openGlossary(App) {
  const existing = document.getElementById('glossary-sheet');
  if (existing) existing.remove();

  const sheet = document.createElement('div');
  sheet.id = 'glossary-sheet';
  sheet.className = 'sheet-root';
  sheet.innerHTML = `
    <div class="sheet-backdrop" data-close></div>
    <div class="sheet" role="dialog" aria-label="${App.t('glossary')}">
      <div class="sheet-handle"></div>
      <div class="sheet-head">
        <div class="slabel">${App.t('glossary')}</div>
        <button class="sheet-x" data-close aria-label="Close">${icon('x', { size: 18 })}</button>
      </div>
      <div class="sheet-body">
        <div class="field" style="margin-bottom:12px">
          <input id="glossQ" type="search" placeholder="${App.t('glossary_ph')}" autocomplete="off" />
        </div>
        <div id="glossList" class="panel" style="max-height:50vh;overflow:auto"></div>
      </div>
    </div>`;
  document.body.appendChild(sheet);
  requestAnimationFrame(() => sheet.classList.add('on'));

  const list = sheet.querySelector('#glossList');
  const inp = sheet.querySelector('#glossQ');

  function paint(q) {
    const lang = App.lang;
    const rows = searchGlossary(q);
    if (!rows.length) {
      list.innerHTML = `<div class="empty" style="padding:24px">${App.t('glossary_none')}</div>`;
      return;
    }
    list.innerHTML = rows.slice(0, 80).map((g) => `
      <div class="row-item" style="align-items:flex-start;flex-direction:column;gap:4px">
        <div class="spread" style="width:100%">
          <span class="ri-title mono" style="font-size:14px">${g.term}</span>
          <span class="tag">${g.tracks[0]}</span>
        </div>
        <div class="ri-sub" style="line-height:1.45">${lang === 'ur' ? g.ur : g.en}</div>
      </div>`).join('');
  }
  paint('');
  inp.addEventListener('input', () => paint(inp.value));
  inp.focus();

  const close = () => {
    sheet.classList.remove('on');
    setTimeout(() => sheet.remove(), 220);
  };
  sheet.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', close));
}
