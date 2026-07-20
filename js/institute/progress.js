/* Institute progress — lessons, finals, projects, SRS cards, certificates */

import { store, KEYS } from '../store.js';

const KEY = 'institute';

function blank() {
  return {
    completedLessons: {}, // courseCode -> [lessonId]
    lessonChecks: {}, // lessonId -> { score, at }
    finals: {}, // courseCode -> { score, at, passed }
    projects: {}, // courseCode -> { [itemId]: true }
    certificates: {}, // courseCode -> cert object
    srs: [], // { id, front, back, due, interval, ease, course, lesson }
    enrollments: {}, // code -> { at, school }
    attempts: {}, // code -> [{ at, score, passed }]
    notes: {}, // lessonId -> string
    activeCourse: null,
    activeLesson: null,
  };
}

export function getInstitute() {
  return { ...blank(), ...store.get(KEYS.institute, {}) };
}

export function setInstitute(data) {
  store.set(KEYS.institute, data);
}

export function completedCourseCodes() {
  const inst = getInstitute();
  return Object.keys(inst.finals || {}).filter((c) => inst.finals[c]?.passed);
}

export function lessonDone(courseCode, lessonId) {
  const inst = getInstitute();
  return (inst.completedLessons[courseCode] || []).includes(lessonId);
}

export function markLessonComplete(courseCode, lessonId, cards = []) {
  const inst = getInstitute();
  const list = new Set(inst.completedLessons[courseCode] || []);
  list.add(lessonId);
  inst.completedLessons[courseCode] = [...list];
  const now = Date.now();
  for (const card of cards) {
    const id = `${courseCode}:${lessonId}:${(card.front?.en || '').slice(0, 24)}`;
    if (inst.srs.some((s) => s.id === id)) continue;
    inst.srs.push({
      id,
      front: card.front,
      back: card.back,
      due: now,
      interval: 0,
      ease: 2.5,
      course: courseCode,
      lesson: lessonId,
    });
  }
  setInstitute(inst);
  return inst;
}

export function saveLessonCheck(lessonId, score) {
  const inst = getInstitute();
  inst.lessonChecks[lessonId] = { score, at: Date.now() };
  setInstitute(inst);
}

export function attestProject(courseCode, itemId, on) {
  const inst = getInstitute();
  if (!inst.projects[courseCode]) inst.projects[courseCode] = {};
  inst.projects[courseCode][itemId] = !!on;
  setInstitute(inst);
}

export function projectComplete(courseCode, items) {
  if (!items || !items.length) return true;
  const inst = getInstitute();
  const done = inst.projects[courseCode] || {};
  return items.every((it) => done[it.id]);
}

export function allLessonsComplete(courseCode, lessons) {
  const inst = getInstitute();
  const done = new Set(inst.completedLessons[courseCode] || []);
  return lessons.every((l) => done.has(l.id));
}

/** Simple SHA-256 via Web Crypto; sync fallback hash for older contexts */
export async function certHash(payload) {
  const str = typeof payload === 'string' ? payload : JSON.stringify(payload);
  if (globalThis.crypto?.subtle) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ('00000000' + (h >>> 0).toString(16)).slice(-8) + '-fallback';
}

export const CERT_DISCLAIMER =
  'This certificate is self-issued locally on the learner\'s device by MasteryCap, an independent study application. It is not an accredited qualification and confers no license or degree. It records completed work, honestly.';

export async function tryIssueCertificate(courseCode, meta, score) {
  const inst = getInstitute();
  const name = store.get(KEYS.profile, {})?.name || 'Learner';
  const date = new Date().toISOString().slice(0, 10);
  const hours = meta.hours || 0;
  const base = { courseId: courseCode, name, score, date, hours };
  const hash = await certHash(base);
  const cert = {
    ...base,
    title: meta.title,
    hash,
    disclaimer: CERT_DISCLAIMER,
  };
  inst.finals[courseCode] = { score, at: Date.now(), passed: score >= (meta.passScore || 85) };
  if (!inst.attempts) inst.attempts = {};
  if (!inst.attempts[courseCode]) inst.attempts[courseCode] = [];
  inst.attempts[courseCode].push({
    at: Date.now(),
    score,
    passed: inst.finals[courseCode].passed,
  });
  inst.finals[courseCode].attemptCount = inst.attempts[courseCode].length;
  if (inst.finals[courseCode].passed) {
    inst.certificates[courseCode] = cert;
  }
  setInstitute(inst);
  return cert;
}

export function setActiveCourse(code) {
  const inst = getInstitute();
  inst.activeCourse = code;
  setInstitute(inst);
}

export function enrollCourse(code, schoolId) {
  const inst = getInstitute();
  if (!inst.enrollments) inst.enrollments = {};
  if (!inst.enrollments[code]) {
    inst.enrollments[code] = { at: Date.now(), school: schoolId || null };
  }
  inst.activeCourse = code;
  setInstitute(inst);
  return inst.enrollments[code];
}

export function isEnrolled(code) {
  return !!getInstitute().enrollments?.[code];
}

export function recordFinalAttempt(courseCode, score, passed) {
  const inst = getInstitute();
  if (!inst.attempts) inst.attempts = {};
  if (!inst.attempts[courseCode]) inst.attempts[courseCode] = [];
  inst.attempts[courseCode].push({ at: Date.now(), score, passed: !!passed });
  const prev = inst.finals[courseCode];
  const best = Math.max(score, prev?.score || 0);
  inst.finals[courseCode] = {
    score: best,
    at: Date.now(),
    passed: !!(passed || prev?.passed),
    lastScore: score,
    attemptCount: inst.attempts[courseCode].length,
  };
  setInstitute(inst);
  return inst.attempts[courseCode].length;
}

export function attemptCount(courseCode) {
  return (getInstitute().attempts?.[courseCode] || []).length;
}

export function dueSrs(cap = 25) {
  const inst = getInstitute();
  const now = Date.now();
  return (inst.srs || [])
    .filter((c) => c.due <= now)
    .sort((a, b) => a.due - b.due)
    .slice(0, cap);
}

export function gradeSrs(id, grade) {
  // grade: again | hard | good | easy
  const inst = getInstitute();
  const card = inst.srs.find((c) => c.id === id);
  if (!card) return;
  const now = Date.now();
  const day = 86400000;
  if (grade === 'again') {
    card.interval = 0;
    card.due = now;
    card.ease = Math.max(1.3, card.ease - 0.2);
  } else {
    const mult = grade === 'hard' ? 1.2 : grade === 'easy' ? 2.5 : 2.0;
    card.interval = card.interval <= 0 ? 1 : Math.round(card.interval * card.ease * (mult / 2));
    card.due = now + card.interval * day;
    if (grade === 'easy') card.ease += 0.05;
    if (grade === 'hard') card.ease = Math.max(1.3, card.ease - 0.05);
  }
  setInstitute(inst);
}

export function srsCapForProfile(profile) {
  const t = profile?.timeBand || '2-5';
  if (t === 'lt2') return 10;
  if (t === '5-10') return 50;
  return 25;
}

export function nextLesson(course) {
  if (!course) return null;
  const inst = getInstitute();
  const done = new Set(inst.completedLessons[course.code] || []);
  return course.lessons.find((l) => !done.has(l.id)) || null;
}

export function courseProgressPct(course) {
  if (!course?.lessons?.length) return 0;
  const inst = getInstitute();
  const done = (inst.completedLessons[course.code] || []).length;
  const finalBonus = inst.finals[course.code]?.passed ? 1 : 0;
  return Math.round((100 * (done + finalBonus)) / (course.lessons.length + 1));
}
