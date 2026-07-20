/* Age-band = tip layer only (same teach body + short register note). Full teachRegister bodies parked for v2. */

export function resolveTeach(lesson, register, lang) {
  const L = (obj) => (obj?.[lang] || obj?.en || '');
  const reg = register || 'young';
  const base = L(lesson.teach);
  if (!base) return '';
  if (reg === 'young') return base;

  if (reg === 'teen') {
    return `<p class="inst-reg-note">${lang === 'ur' ? 'Teen pace — chhote tukre, zyada misaalen.' : 'Teen pace — shorter chunks, more concrete examples.'}</p>${base}`;
  }
  if (reg === 'career') {
    return `<p class="inst-reg-note">${lang === 'ur' ? 'Career bridge — pehle se kaam se jodo.' : 'Career bridge — connect to work you already know.'}</p>${base}`;
  }
  if (reg === 'adult') {
    return `<p class="inst-reg-note">${lang === 'ur' ? 'Adult pace — pehle glossary words, phir depth (final bar same).' : 'Adult pace — glossary-first, then depth (same final bar).'}</p>${base}`;
  }
  return base;
}

export function registerLabel(register, lang) {
  const map = {
    teen: { en: 'Teen register', ur: 'Teen register' },
    young: { en: 'Young adult register', ur: 'Young adult register' },
    career: { en: 'Career switcher register', ur: 'Career switcher register' },
    adult: { en: 'Adult beginner register', ur: 'Adult beginner register' },
  };
  const row = map[register] || map.young;
  return row[lang] || row.en;
}
