/* Course content loader — full Software Craft spine In Session (v50). */
import WEB101 from './web-101.js';
import WEB102 from './web-102.js';
import WEB103 from './web-103.js';
import FE201 from './fe-201.js';
import FE202 from './fe-202.js';
import FE203 from './fe-203.js';
import FE204 from './fe-204.js';
import BE301 from './be-301.js';
import BE302 from './be-302.js';
import BE303 from './be-303.js';
import BE304 from './be-304.js';
import APP401 from './app-401.js';
import APP402 from './app-402.js';
import APP403 from './app-403.js';
import FIN101 from './fin-101.js';
import FIN201 from './fin-201.js';
import FIN301 from './fin-301.js';

const RAW = {
  'WEB-101': WEB101,
  'WEB-102': WEB102,
  'WEB-103': WEB103,
  'FE-201': FE201,
  'FE-202': FE202,
  'FE-203': FE203,
  'FE-204': FE204,
  'BE-301': BE301,
  'BE-302': BE302,
  'BE-303': BE303,
  'BE-304': BE304,
  'APP-401': APP401,
  'APP-402': APP402,
  'APP-403': APP403,
  'FIN-101': FIN101,
  'FIN-201': FIN201,
  'FIN-301': FIN301,
};

function normalizeFinalQuestion(question, index) {
  const opts = question?.opts || {};
  const reference = opts.en || Object.values(opts).find(Array.isArray) || [];
  const count = reference.length;
  if (count < 2 || !Number.isInteger(question.correct) || question.correct < 0 || question.correct >= count) {
    return question;
  }
  const target = index % count;
  const order = reference.map((_, optionIndex) => optionIndex).filter((optionIndex) => optionIndex !== question.correct);
  order.splice(target, 0, question.correct);
  const normalizedOpts = Object.fromEntries(Object.entries(opts).map(([lang, values]) => [
    lang,
    Array.isArray(values) && values.length === count ? order.map((optionIndex) => values[optionIndex]) : values,
  ]));
  return { ...question, opts: normalizedOpts, correct: target };
}

const MAP = Object.fromEntries(Object.entries(RAW).map(([code, course]) => [
  code,
  {
    ...course,
    finalQuiz: (course.finalQuiz || []).map(normalizeFinalQuestion),
  },
]));

export function loadCourse(code) {
  return MAP[code] || null;
}

export function listAuthoredCodes() {
  return Object.keys(MAP);
}
