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

const MAP = {
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

export function loadCourse(code) {
  return MAP[code] || null;
}

export function listAuthoredCodes() {
  return Object.keys(MAP);
}
