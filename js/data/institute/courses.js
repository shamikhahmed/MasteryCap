/* Course content loader */
import WEB101 from './web-101.js';
import WEB102 from './web-102.js';
import WEB103 from './web-103.js';
import FE201 from './fe-201.js';

const MAP = {
  'WEB-101': WEB101,
  'WEB-102': WEB102,
  'WEB-103': WEB103,
  'FE-201': FE201,
};

export function loadCourse(code) {
  return MAP[code] || null;
}

export function listAuthoredCodes() {
  return Object.keys(MAP);
}
