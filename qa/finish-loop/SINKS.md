# MasteryCap innerHTML sinks

Generated: 2026-09-15

## Policy
- Prefer textContent for user/remote strings
- Static template literals for chrome: OK

## Counts

| Class | Count |
|-------|------:|
| static-template | 73 |
| escaped-user-remote | 0 |

## Inventory

| File | Line | Class | Notes |
|------|-----:|-------|-------|
| js/session.js | 169 | static-template | caller-controlled markup |
| js/session.js | 207 | static-template | caller-controlled markup |
| js/session.js | 243 | static-template | caller-controlled markup |
| js/reading.js | 50 | static-template | caller-controlled markup |
| js/glossary.js | 15 | static-template | caller-controlled markup |
| js/glossary.js | 41 | static-template | caller-controlled markup |
| js/glossary.js | 44 | static-template | caller-controlled markup |
| js/howto.js | 231 | static-template | caller-controlled markup |
| js/search.js | 38 | static-template | caller-controlled markup |
| js/search.js | 64 | static-template | caller-controlled markup |
| js/search.js | 70 | static-template | caller-controlled markup |
| js/app.js | 310 | static-template | caller-controlled markup |
| js/app.js | 361 | static-template | caller-controlled markup |
| js/app.js | 454 | static-template | caller-controlled markup |
| js/app.js | 493 | static-template | caller-controlled markup |
| js/app.js | 528 | static-template | caller-controlled markup |
| js/settings.js | 102 | static-template | caller-controlled markup |
| js/settings.js | 306 | static-template | caller-controlled markup |
| js/institute/committee.js | 20 | static-template | caller-controlled markup |
| js/institute/code-editor.js | 104 | static-template | caller-controlled markup |
| js/views/today-tab.js | 163 | static-template | caller-controlled markup |
| js/views/records.js | 119 | static-template | caller-controlled markup |
| js/views/review.js | 39 | static-template | caller-controlled markup |
| js/views/review.js | 53 | static-template | caller-controlled markup |
| js/views/review.js | 87 | static-template | caller-controlled markup |
| js/views/lesson.js | 20 | static-template | caller-controlled markup |
| js/views/lesson.js | 88 | static-template | caller-controlled markup |
| js/views/lesson.js | 237 | static-template | caller-controlled markup |
| js/views/lesson.js | 266 | static-template | caller-controlled markup |
| js/views/sim.js | 95 | static-template | caller-controlled markup |
| js/views/sim.js | 157 | static-template | caller-controlled markup |
| js/views/sim.js | 393 | static-template | caller-controlled markup |
| js/views/sim.js | 526 | static-template | caller-controlled markup |
| js/views/sim.js | 568 | static-template | caller-controlled markup |
| js/views/sim.js | 635 | static-template | caller-controlled markup |
| js/views/sim.js | 703 | static-template | caller-controlled markup |
| js/views/course.js | 214 | static-template | caller-controlled markup |
| js/views/course.js | 487 | static-template | caller-controlled markup |
| js/views/course.js | 575 | static-template | caller-controlled markup |
| js/views/course.js | 638 | static-template | caller-controlled markup |
| js/views/course.js | 700 | static-template | caller-controlled markup |
| js/views/course.js | 840 | static-template | caller-controlled markup |
| js/views/course.js | 883 | static-template | caller-controlled markup |
| js/views/course.js | 907 | static-template | caller-controlled markup |
| js/views/course.js | 949 | static-template | caller-controlled markup |
| js/views/course.js | 1011 | static-template | caller-controlled markup |
| js/views/charts.js | 29 | static-template | caller-controlled markup |
| js/views/charts.js | 66 | static-template | caller-controlled markup |
| js/views/charts.js | 123 | static-template | caller-controlled markup |
| js/views/journal.js | 49 | static-template | caller-controlled markup |
| js/views/journal.js | 268 | static-template | caller-controlled markup |
| js/views/journal.js | 344 | static-template | caller-controlled markup |
| js/views/journal.js | 367 | static-template | caller-controlled markup |
| js/views/journal.js | 379 | static-template | caller-controlled markup |
| js/views/journal.js | 399 | static-template | caller-controlled markup |
| js/views/journal.js | 402 | static-template | caller-controlled markup |
| js/views/journal.js | 430 | static-template | caller-controlled markup |
| js/views/journal.js | 433 | static-template | caller-controlled markup |
| js/views/progress.js | 98 | static-template | caller-controlled markup |
| js/views/progress.js | 121 | static-template | caller-controlled markup |
| js/views/admission.js | 147 | static-template | caller-controlled markup |
| js/views/drills.js | 64 | static-template | caller-controlled markup |
| js/views/campus.js | 25 | static-template | caller-controlled markup |
| js/views/campus.js | 83 | static-template | caller-controlled markup |
| js/views/campus.js | 142 | static-template | caller-controlled markup |
| js/views/campus.js | 193 | static-template | caller-controlled markup |
| js/views/practice-tab.js | 46 | static-template | caller-controlled markup |
| js/views/practice-tab.js | 130 | static-template | caller-controlled markup |
| js/views/study.js | 37 | static-template | caller-controlled markup |
| js/views/study.js | 107 | static-template | caller-controlled markup |
| js/views/study.js | 121 | static-template | caller-controlled markup |
| js/views/study.js | 176 | static-template | caller-controlled markup |
| js/views/http-lab.js | 41 | static-template | caller-controlled markup |

## Verify
- Re-run `npm run tier1` after any new `.innerHTML =`
