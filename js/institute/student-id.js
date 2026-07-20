/* Student ID — MasteryCap Institute learning credential (device-local only). */

import { store, KEYS } from '../store.js';

const BRANCH_CODE = {
  markets: 'MKT',
  software: 'SWC',
  money: 'MON',
};

export function branchCode(branch) {
  return BRANCH_CODE[branch] || 'MKT';
}

export function monogramFromName(name) {
  const parts = String(name || 'Learner').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'MC';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function base36rand(len = 4) {
  let s = '';
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const buf = new Uint8Array(len);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) crypto.getRandomValues(buf);
  else for (let i = 0; i < len; i++) buf[i] = Math.floor(Math.random() * 36);
  for (let i = 0; i < len; i++) s += alphabet[buf[i] % 36];
  return s;
}

function checksumDigit(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) sum += str.charCodeAt(i);
  return String(sum % 10);
}

/** MCI-YY-BRANCH-RAND-C */
export function generateIdNumber(branch, enrollmentDate = new Date()) {
  const yy = String(enrollmentDate.getFullYear()).slice(-2);
  const br = branchCode(branch);
  const rand = base36rand(4);
  const core = `MCI-${yy}-${br}-${rand}`;
  return `${core}-${checksumDigit(core)}`;
}

export function getStudentId() {
  return store.get(KEYS.studentId, null);
}

export function setStudentId(card) {
  store.set(KEYS.studentId, card);
  return card;
}

export function issueStudentId({ name, ageBand, branch, photoDataUrl = null }) {
  const enrollmentDate = new Date();
  const issueDate = enrollmentDate.toISOString().slice(0, 10);
  const idNumber = generateIdNumber(branch, enrollmentDate);
  const monogram = monogramFromName(name);
  const card = {
    idNumber,
    name: (name || 'Learner').trim() || 'Learner',
    ageBand: ageBand || '18-24',
    branch: branch || 'markets',
    campus: 'MasteryCap Institute',
    issueDate,
    admissionYear: enrollmentDate.getFullYear(),
    monogram,
    hasPhoto: !!photoDataUrl,
    theme: 'institute',
  };
  if (photoDataUrl) {
    try {
      store.set(KEYS.studentPhoto, photoDataUrl);
      card.hasPhoto = true;
    } catch (e) {
      card.hasPhoto = false;
    }
  }
  return setStudentId(card);
}

export function getStudentPhoto() {
  return store.get(KEYS.studentPhoto, null);
}

export function clearStudentPhoto() {
  store.set(KEYS.studentPhoto, null);
  const card = getStudentId();
  if (card) setStudentId({ ...card, hasPhoto: false });
}

export function branchLabel(branch, lang = 'en') {
  const map = {
    markets: { en: 'School of Markets', ur: 'School of Markets' },
    software: { en: 'Software Craft', ur: 'Software Craft' },
    money: { en: 'Money Foundations', ur: 'Money Foundations' },
  };
  return map[branch]?.[lang] || map[branch]?.en || branch;
}

export function shortIdSuffix(idNumber) {
  if (!idNumber) return '————';
  const parts = String(idNumber).split('-');
  return parts[3] || parts[parts.length - 2] || idNumber.slice(-4);
}
