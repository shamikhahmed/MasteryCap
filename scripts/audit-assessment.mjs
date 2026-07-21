#!/usr/bin/env node
import { listAuthoredCodes, loadCourse } from '../js/data/institute/courses.js';
import { projectEvidenceComplete } from '../js/institute/progress.js';
import { evaluateLessonCheck, LESSON_CHECK_PASS, shuffledOptionOrder } from '../js/views/lesson.js';

const failures = [];
let questions = 0;
const overallPositions = new Map();

for (const code of listAuthoredCodes()) {
  const course = loadCourse(code);
  const quiz = course?.finalQuiz || [];
  if (quiz.length < 5) failures.push(`${code}: final has only ${quiz.length} questions`);
  if (Number(course?.passScore) < 80) failures.push(`${code}: pass score below 80`);
  const positions = new Map();
  quiz.forEach((question, index) => {
    questions += 1;
    const en = question.opts?.en;
    const ur = question.opts?.ur;
    if (!Array.isArray(en) || en.length < 3) failures.push(`${code} Q${index + 1}: needs at least 3 EN options`);
    if (!Array.isArray(ur) || ur.length !== en?.length) failures.push(`${code} Q${index + 1}: EN/UR option count mismatch`);
    if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct >= (en?.length || 0)) {
      failures.push(`${code} Q${index + 1}: invalid correct index`);
      return;
    }
    for (const [lang, options] of Object.entries(question.opts || {})) {
      if (!Array.isArray(options)) continue;
      const normalized = options.map((value) => String(value).trim().toLocaleLowerCase());
      if (new Set(normalized).size !== normalized.length) failures.push(`${code} Q${index + 1}: duplicate ${lang} distractor`);
    }
    positions.set(question.correct, (positions.get(question.correct) || 0) + 1);
    overallPositions.set(question.correct, (overallPositions.get(question.correct) || 0) + 1);
  });
  const counts = [...positions.values()];
  if (counts.length < 3 || Math.max(...counts) - Math.min(...counts) > 1) {
    failures.push(`${code}: answer positions are not balanced (${JSON.stringify(Object.fromEntries(positions))})`);
  }
}

const deterministicShuffle = shuffledOptionOrder(4, () => 0);
if (new Set(deterministicShuffle).size !== 4 || deterministicShuffle.some((value) => value < 0 || value > 3)) {
  failures.push('runtime option shuffle does not preserve a valid permutation');
}
if (deterministicShuffle.every((value, index) => value === index)) {
  failures.push('runtime option shuffle can remain predictably ordered under deterministic test input');
}
const checkQuestions = Array.from({ length: 4 }, (_, index) => ({ id: `q${index}`, correct: 0 }));
const failedCheck = evaluateLessonCheck(checkQuestions, [0, 0, 0, 1]);
const passedCheck = evaluateLessonCheck(checkQuestions, [0, 0, 0, 0]);
if (LESSON_CHECK_PASS !== 80 || failedCheck.passed || !passedCheck.passed || failedCheck.missed.length !== 1) {
  failures.push('lesson check threshold/remediation evidence is not enforced');
}
const projectItems = [{ id: 'artifact' }];
if (projectEvidenceComplete({ artifact: true }, {}, projectItems)
  || projectEvidenceComplete({ artifact: true }, { artifact: { note: 'too short' } }, projectItems)
  || !projectEvidenceComplete({ artifact: true }, { artifact: { note: 'Built and tested offline artifact' } }, projectItems)) {
  failures.push('project completion does not require a specific evidence note');
}

if (failures.length) {
  console.error('FAIL: assessment integrity');
  failures.forEach((failure) => console.error(`  ${failure}`));
  process.exit(1);
}
console.log(`PASS: ${questions} final questions balanced; runtime options shuffled`);
console.log(`Answer positions: ${JSON.stringify(Object.fromEntries(overallPositions))}`);
