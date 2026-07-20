/* Placement — map onboarding answers → starter path */

export function recommendPath(data) {
  const goal = data.goal || 'apps';
  const exp = data.buildExp || 'never';
  const age = data.ageBand || '18-24';

  let school = 'software';
  let course = 'WEB-101';
  let pathName = { en: 'App Builder Foundation', ur: 'App Builder Foundation' };
  let firstLesson = { en: 'How Computers Think', ur: 'Computers Kaise Sochte' };
  let weeks = 3;

  if (goal === 'markets') {
    school = 'markets';
    course = 'MKT-LEGACY';
    pathName = { en: 'Market Literacy', ur: 'Market Literacy' };
    firstLesson = { en: 'Open School of Markets tracks', ur: 'School of Markets tracks kholo' };
    weeks = 8;
  } else if (goal === 'money') {
    school = 'money';
    course = null;
    pathName = { en: 'School of Money (announced)', ur: 'School of Money (announced)' };
    firstLesson = { en: 'Browse Campus — Money opens later', ur: 'Campus dekho — Money baad mein' };
    weeks = 0;
  } else {
    // software path
    if (exp === 'shipped') {
      course = 'FE-201';
      pathName = { en: 'Frontend Craft (placed ahead)', ur: 'Frontend Craft (aage placement)' };
      firstLesson = { en: 'Values and Variables', ur: 'Values aur Variables' };
      weeks = 6;
    } else if (exp === 'dabbled') {
      course = 'WEB-102';
      pathName = { en: 'Web Foundations (HTML onward)', ur: 'Web Foundations (HTML se)' };
      firstLesson = { en: 'HTML as Structure', ur: 'HTML Structure' };
      weeks = 4;
    } else {
      course = 'WEB-101';
      weeks = age === '13-17' ? 4 : 3;
    }
  }

  const register =
    age === '13-17' ? 'teen' :
    age === '18-24' ? 'young' :
    age === '25-34' ? 'career' : 'adult';

  return { school, course, pathName, firstLesson, weeks, register };
}

export const AGE_OPTS = [
  ['13-17', { en: '13–17', ur: '13–17' }],
  ['18-24', { en: '18–24', ur: '18–24' }],
  ['25-34', { en: '25–34', ur: '25–34' }],
  ['35+', { en: '35+', ur: '35+' }],
];

export const LANG_OPTS = [
  ['en', { en: 'English', ur: 'English' }],
  ['ur', { en: 'Roman Urdu', ur: 'Roman Urdu' }],
  ['both', { en: 'Both (toggle per lesson)', ur: 'Dono (per lesson toggle)' }],
];

export const BUILD_OPTS = [
  ['never', { en: 'Never built anything', ur: 'Kabhi kuch nahi banaya' }],
  ['dabbled', { en: 'Tried tutorials', ur: 'Tutorials try kiye' }],
  ['shipped', { en: 'Shipped something', ur: 'Kuch ship kiya' }],
];

export const GOAL_OPTS = [
  ['apps', { en: 'Build software / apps', ur: 'Software / apps banao' }],
  ['markets', { en: 'Understand markets & trading', ur: 'Markets & trading samjho' }],
  ['money', { en: 'Manage money skills', ur: 'Money skills' }],
  ['explore', { en: 'Explore everything', ur: 'Sab explore' }],
];

export const TIME_OPTS = [
  ['lt2', { en: 'Under 2h / week', ur: 'Haftay mein 2h se kam' }],
  ['2-5', { en: '2–5h / week', ur: '2–5h / hafta' }],
  ['5-10', { en: '5–10h+ / week', ur: '5–10h+ / hafta' }],
];
