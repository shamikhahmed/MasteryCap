/* ============================================================
   search.js — client lesson + glossary search sheet (P15)
   ============================================================ */

import { icon } from './icons.js';
import { TRACKS } from './data/tracks.js';
import { searchGlossary } from './data/glossary.js';

let INDEX = null;

function buildIndex() {
  const rows = [];
  TRACKS.forEach((t) => {
    t.weeks.forEach((w) => {
      ['en', 'ur'].forEach((lang) => {
        const title = w.title?.[lang] || '';
        const body = (w.body?.[lang] || '').replace(/<[^>]+>/g, ' ').replace(/\{\{[^}]+\}\}/g, ' ');
        rows.push({
          trackId: t.id,
          weekId: w.id,
          lang,
          title,
          hay: `${t.name[lang]} ${title} ${body}`.toLowerCase(),
        });
      });
    });
  });
  return rows;
}

export function openSearch(App, { onOpenWeek } = {}) {
  document.getElementById('search-sheet')?.remove();
  if (!INDEX) INDEX = buildIndex();

  const sheet = document.createElement('div');
  sheet.id = 'search-sheet';
  sheet.className = 'sheet-root';
  sheet.innerHTML = `
    <div class="sheet-backdrop" data-close></div>
    <div class="sheet" role="dialog" aria-label="${App.t('search_title')}">
      <div class="sheet-handle"></div>
      <div class="sheet-head">
        <div class="slabel">${App.t('search_title')}</div>
        <button class="sheet-x" data-close aria-label="Close">${icon('x', { size: 18 })}</button>
      </div>
      <div class="sheet-body">
        <div class="field"><input id="searchQ" type="search" placeholder="${App.t('search_ph')}" autocomplete="off" /></div>
        <div class="slabel" style="margin:12px 0 8px">${App.t('nav_learn')}</div>
        <div id="searchLessons" class="panel"></div>
        <div class="slabel" style="margin:16px 0 8px">${App.t('glossary')}</div>
        <div id="searchGloss" class="panel"></div>
      </div>
    </div>`;
  document.body.appendChild(sheet);
  requestAnimationFrame(() => sheet.classList.add('on'));

  const paint = (q) => {
    const qq = (q || '').trim().toLowerCase();
    const lang = App.lang;
    const lessons = INDEX.filter((r) => r.lang === lang && (!qq || r.hay.includes(qq))).slice(0, 20);
    const gloss = searchGlossary(q || '').slice(0, 15);
    const L = sheet.querySelector('#searchLessons');
    const G = sheet.querySelector('#searchGloss');
    L.innerHTML = lessons.length
      ? lessons.map((r) => `<button class="row-item" data-t="${r.trackId}" data-w="${r.weekId}" style="width:100%;text-align:left;border:0;background:transparent;color:inherit">
          <div class="ri-title">${r.title}</div>
          <div class="ri-sub mono">${r.trackId} · W${r.weekId}</div>
        </button>`).join('')
      : `<div class="empty" style="padding:16px">${App.t('search_none')}</div>`;
    G.innerHTML = gloss.length
      ? gloss.map((g) => `<div class="row-item" style="flex-direction:column;align-items:flex-start;gap:4px">
          <span class="ri-title mono">${g.term}</span>
          <span class="ri-sub">${lang === 'ur' ? g.ur : g.en}</span>
        </div>`).join('')
      : `<div class="empty" style="padding:16px">${App.t('glossary_none')}</div>`;

    L.querySelectorAll('[data-t]').forEach((el) => el.addEventListener('click', () => {
      close();
      onOpenWeek?.(el.dataset.t, Number(el.dataset.w));
    }));
  };

  const close = () => {
    sheet.classList.remove('on');
    setTimeout(() => sheet.remove(), 220);
  };
  sheet.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', close));
  const inp = sheet.querySelector('#searchQ');
  inp.addEventListener('input', () => paint(inp.value));
  paint('');
  inp.focus();
}
