/* ============================================================
   reading.js — Apple Books–style lesson reading surface.
   Paginated body, scroll progress, skippable first-run guide.
   ============================================================ */

import { store, KEYS } from './store.js';
import { icon } from './icons.js';

function splitPages(html) {
  const parts = html.split(/(?<=<\/p>)/i).map((s) => s.trim()).filter(Boolean);
  return parts.length ? parts : [html || '<p></p>'];
}

function guideHtml(lang) {
  const en = lang === 'en';
  return `<div class="reading-guide" id="readingGuide" role="dialog" aria-modal="true">
    <div class="reading-guide__card">
      <div class="reading-guide__kicker">${en ? 'Reading mode' : 'Reading mode'}</div>
      <h2 class="reading-guide__title">${en ? 'Read like a book' : 'Kitab ki tarah parho'}</h2>
      <ul class="reading-guide__list">
        <li>${en ? 'Tap edges or arrows to turn pages' : 'Pages ke liye kinare ya arrows dabao'}</li>
        <li>${en ? 'Progress bar tracks how far you are' : 'Progress bar batati hai kitna parha'}</li>
        <li>${en ? 'Quiz stays separate — finish reading first' : 'Quiz alag — pehle parhna khatam karo'}</li>
      </ul>
      <button type="button" class="btn accent" id="readingGuideOk">${en ? 'Start reading' : 'Parhna shuru'}</button>
      <button type="button" class="btn ghost mt10" id="readingGuideSkip">${en ? 'Skip guide' : 'Guide skip'}</button>
    </div>
  </div>`;
}

/**
 * @param {object} App
 * @param {HTMLElement} container
 * @param {object} opts
 * @param {object} opts.track
 * @param {object} opts.week
 * @param {string} opts.bodyHtml — processed lesson HTML
 * @param {() => void} opts.onBack
 * @param {() => void} opts.onQuiz
 * @param {() => void} [opts.onStudyTools]
 */
export function renderReading(App, container, opts) {
  const lang = App.lang;
  const pages = splitPages(opts.bodyHtml);
  let page = 0;

  const paint = () => {
    const pct = pages.length > 1 ? Math.round(((page + 1) / pages.length) * 100) : 100;
    const en = lang === 'en';
    container.innerHTML = `<div class="screen reading-screen">
      <header class="reading-bar">
        <button type="button" class="reading-bar__back" id="readBack" aria-label="${App.t('back')}">${icon('back', { size: 18 })}</button>
        <div class="reading-bar__meta">
          <span class="reading-bar__track">${opts.track.name[lang]}</span>
          <span class="reading-bar__page mono">${en ? 'Page' : 'Page'} ${page + 1} / ${pages.length}</span>
        </div>
        <button type="button" class="reading-bar__tools pill" id="readStudy">${en ? 'Study' : 'Study'}</button>
      </header>
      <div class="reading-progress" aria-hidden="true"><i style="width:${pct}%"></i></div>
      <article class="reading-page" id="readPage">${pages[page]}</article>
      <nav class="reading-nav" aria-label="${en ? 'Page navigation' : 'Page navigation'}">
        <button type="button" class="reading-nav__btn" id="readPrev" ${page === 0 ? 'disabled' : ''} aria-label="${en ? 'Previous page' : 'Pichla page'}">${icon('back', { size: 20 })}</button>
        <div class="reading-dots">${pages.map((_, i) => `<span class="reading-dot ${i === page ? 'on' : ''}"></span>`).join('')}</div>
        <button type="button" class="reading-nav__btn" id="readNext" aria-label="${page >= pages.length - 1 ? (en ? 'Take quiz' : 'Quiz lo') : (en ? 'Next page' : 'Agla page')}">${page >= pages.length - 1 ? icon('check', { size: 20 }) : icon('back', { size: 20, cls: 'flip-x' })}</button>
      </nav>
      ${page >= pages.length - 1
        ? `<button type="button" class="btn accent reading-quiz-cta" id="readQuiz">${App.t('takeQuiz')}</button>`
        : `<button type="button" class="btn ghost reading-quiz-cta" id="readQuizGhost">${en ? 'Skip to quiz' : 'Quiz pe jao'}</button>`}
      ${!store.get(KEYS.readingGuideSeen) ? guideHtml(lang) : ''}
    </div>`;

    const go = (delta) => {
      page = Math.max(0, Math.min(pages.length - 1, page + delta));
      App.haptic();
      paint();
    };

    document.getElementById('readBack')?.addEventListener('click', () => { App.haptic(); opts.onBack(); });
    document.getElementById('readStudy')?.addEventListener('click', () => { App.haptic(); opts.onStudyTools?.(); });
    document.getElementById('readPrev')?.addEventListener('click', () => go(-1));
    document.getElementById('readNext')?.addEventListener('click', () => {
      if (page >= pages.length - 1) opts.onQuiz();
      else go(1);
    });
    document.getElementById('readQuiz')?.addEventListener('click', () => { App.haptic(); opts.onQuiz(); });
    document.getElementById('readQuizGhost')?.addEventListener('click', () => { App.haptic(); opts.onQuiz(); });

    const dismissGuide = () => {
      store.set(KEYS.readingGuideSeen, true);
      document.getElementById('readingGuide')?.remove();
    };
    document.getElementById('readingGuideOk')?.addEventListener('click', () => { App.haptic(); dismissGuide(); });
    document.getElementById('readingGuideSkip')?.addEventListener('click', () => { App.haptic(); dismissGuide(); });

    container.querySelectorAll('.gloss-term').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        opts.onGlossClick?.(el);
      });
    });

    const tapZone = document.getElementById('readPage');
    tapZone?.addEventListener('click', (e) => {
      if (e.target.closest('a,button,.gloss-term')) return;
      const x = e.clientX;
      const w = window.innerWidth;
      if (x > w * 0.65) go(1);
      else if (x < w * 0.35 && page > 0) go(-1);
    });
  };

  paint();
}
