/* Student ID card markup — front credential */

import { branchLabel, shortIdSuffix } from '../institute/student-id.js';

export function renderStudentIdCard(card, { lang = 'en', photoUrl = null, compact = false } = {}) {
  if (!card) return '';
  const en = lang !== 'ur';
  const branch = branchLabel(card.branch, lang);
  const date = formatDate(card.issueDate, en);
  const photo = photoUrl && card.hasPhoto
    ? `<img class="sid-photo" src="${photoUrl}" alt="" />`
    : `<div class="sid-photo sid-mono" aria-hidden="true">${esc(card.monogram || 'MC')}</div>`;

  if (compact) {
    return `<div class="mini-id-strip" data-testid="mini-id">
      <div class="mini-id-photo">${photoUrl && card.hasPhoto
        ? `<img src="${photoUrl}" alt="" />`
        : `<span>${esc(card.monogram || 'MC')}</span>`}</div>
      <div class="mini-id-meta">
        <div class="mini-id-name">${esc(card.name)}</div>
        <div class="mini-id-sub">${esc(branch)} · ID ${esc(shortIdSuffix(card.idNumber))}</div>
      </div>
      <span class="mini-id-cta">${en ? 'View ID' : 'ID dekho'} →</span>
    </div>`;
  }

  return `<article class="student-card" data-testid="student-card">
    <header class="sid-header">
      <div class="sid-wordmark">MasteryCap Institute</div>
      <div class="sid-cred">${en ? 'Learning Credential' : 'Learning Credential'}</div>
    </header>
    <section class="sid-body">
      <div class="sid-photo-slot">${photo}</div>
      <div class="sid-meta">
        <h2 class="sid-name">${esc(card.name)}</h2>
        <div class="sid-id mono">${esc(card.idNumber)}</div>
        <div class="sid-row">${esc(branch)}</div>
        <div class="sid-row">${en ? 'Age' : 'Age'} ${esc(card.ageBand || '—')}</div>
        <div class="sid-row">${en ? 'Enrolled' : 'Enrolled'} ${esc(date)}</div>
      </div>
    </section>
    <footer class="sid-footer">${en
      ? 'Study credential — Not government identification'
      : 'Study credential — Government ID nahi'}</footer>
  </article>`;
}

export function renderStudentIdBack(card, { lang = 'en' } = {}) {
  const en = lang !== 'ur';
  return `<article class="student-card student-card-back">
    <div class="sid-wordmark">MasteryCap Institute</div>
    <hr class="sid-rule" />
    <p class="sid-disc">${en
      ? 'This credential identifies participation in MasteryCap Institute learning activities. It is not government identification, financial authorization, investment certification, a professional license, or an employment guarantee.'
      : 'Ye credential sirf MasteryCap learning participation batata hai. Government ID, financial authorization, ya professional license nahi.'}</p>
    <p class="sid-disc mono" style="font-size:11px">${esc(card?.idNumber || '')}</p>
    <p class="sid-disc" style="margin-top:12px">${en
      ? 'Generated and stored only on this device.'
      : 'Sirf is device pe generate aur store.'}</p>
  </article>`;
}

function formatDate(iso, en) {
  if (!iso) return '—';
  try {
    const d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString(en ? 'en-GB' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (e) {
    return iso;
  }
}

function esc(s) {
  return String(s || '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
