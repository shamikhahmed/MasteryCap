/* Committee Approval — Foundations gate unlock ceremony (sheet, not XP toast). */

import { icon } from '../icons.js';

/**
 * Show once when Foundations gate opens (weeks complete OR exam).
 * @param {object} App
 * @param {{ title?: string, body?: string }} [msg]
 */
export function showCommitteeApproval(App, msg = {}) {
  if (document.getElementById('committee-sheet')) return;
  const en = App.lang !== 'ur';
  const title = msg.title || (en ? 'Committee Approval' : 'Committee Approval');
  const body = msg.body || (en
    ? 'Foundations literacy demonstrated. Crypto, Stocks, and Forex are now open on the Markets ladder.'
    : 'Foundations gate open. Crypto, Stocks, Forex unlock.');
  const el = document.createElement('div');
  el.id = 'committee-sheet';
  el.className = 'sheet-root on';
  el.innerHTML = `<div class="sheet-backdrop" data-close></div>
    <div class="sheet" role="dialog" aria-labelledby="committeeTitle">
      <div class="sheet-handle"></div>
      <div class="sheet-head">
        <div class="slabel" id="committeeTitle">${title}</div>
        <button class="sheet-x" data-close aria-label="Close">${icon('x', { size: 18 })}</button>
      </div>
      <div class="sheet-body">
        <p class="committee-lead">${en ? 'School of Markets' : 'School of Markets'}</p>
        <p style="font-size:14.5px;color:var(--t1);line-height:1.55;margin:0 0 12px">${body}</p>
        <p class="inst-foot-note" style="margin:0 0 16px">${en
          ? 'Education only. Unlock means study access — not income, license, or advice.'
          : 'Sirf education. Unlock = study access — income/license/advice nahi.'}</p>
        <button class="btn accent" id="committeeCampus" style="width:100%">${en ? 'Open Markets ladder' : 'Markets ladder kholo'}</button>
        <button class="btn ghost mt10" data-close style="width:100%">${en ? 'Stay on Foundations' : 'Foundations pe raho'}</button>
      </div>
    </div>`;
  document.body.appendChild(el);
  const close = () => el.remove();
  el.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', close));
  document.getElementById('committeeCampus')?.addEventListener('click', () => {
    close();
    App._campusView = { level: 'school', schoolId: 'markets' };
    App.navigate('campus');
  });
  App.haptic?.(14);
}
