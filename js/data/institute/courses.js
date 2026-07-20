/* Course content loader — In Session bodies only. FE-202→APP-403 files stay on disk for v2. */
import WEB101 from './web-101.js';
import WEB102 from './web-102.js';
import WEB103 from './web-103.js';
import FE201 from './fe-201.js';
import FIN101 from './fin-101.js';
import FIN201 from './fin-201.js';
import FIN301 from './fin-301.js';

const MAP = {
  'WEB-101': WEB101,
  'WEB-102': WEB102,
  'WEB-103': WEB103,
  'FE-201': FE201,
  'FIN-101': FIN101,
  'FIN-201': FIN201,
  'FIN-301': FIN301,
};

export function loadCourse(code) {
  return MAP[code] || null;
}

export function listAuthoredCodes() {
  return Object.keys(MAP);
}
