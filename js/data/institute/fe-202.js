/* FE-202 — In Session */
export const COURSE = {
  "code": "FE-202",
  "title": {
    "en": "The DOM and Events",
    "ur": "DOM aur Events"
  },
  "hours": 10,
  "lessons": [
    {
      "id": "fe202-1",
      "title": {
        "en": "DOM Tree",
        "ur": "DOM Tree"
      },
      "objective": {
        "en": "Explain the DOM as a tree of nodes.",
        "ur": "DOM ko node tree samjhao."
      },
      "warmUp": {
        "en": "What is the difference between HTML source and the live page?",
        "ur": "HTML source aur live page mein farq?"
      },
      "teach": {
        "en": "<p>The browser parses HTML into a <strong>Document Object Model</strong> — a tree of nodes (elements, text, comments). JavaScript reads and changes this tree; the page updates.</p><p>Inspect with DevTools Elements panel. Parent/child/sibling relationships matter for queries.</p>",
        "ur": "<p>Browser HTML ko <strong>DOM</strong> tree banata — nodes (elements, text). JS tree parhti/badalti; page update.</p><p>DevTools Elements. Parent/child/sibling queries ke liye zaroori.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Think of the page like nested boxes. Outer box = <code>body</code>. Inside: headings, paragraphs. JS can open a box and change what is inside — that is the DOM.</p><p>Open DevTools → Elements and click around. You are looking at the live tree.</p>",
          "ur": "<p>Page nested boxes jaisi. Bahar <code>body</code>. Andar headings, paragraphs. JS box khol ke andar badal sakti — yeh DOM.</p><p>DevTools → Elements. Live tree dekho.</p>"
        },
        "career": {
          "en": "<p>Treat the DOM like a live org chart of the UI. Selectors are addresses; mutations are change requests. Prefer small, targeted updates over rewriting large subtrees (performance + clarity).</p>",
          "ur": "<p>DOM = UI ka live org chart. Selectors addresses; mutations change requests. Bade subtree rewrite se behtar chhote targeted updates.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> DOM = the browser’s structured map of the page. Node = one piece of that map. Element = a tag node like <code>p</code> or <code>button</code>.</p><p>You do not edit the .html file while the page runs — you edit the live map with JavaScript.</p>",
          "ur": "<p><strong>Glossary:</strong> DOM = page ka structured map. Node = map ka tukra. Element = tag jaise <code>p</code>/<code>button</code>.</p><p>Page chalte waqt .html file nahi — JS se live map.</p>"
        }
      },
      "visual": "dom-tree",
      "check": [
        {
          "q": {
            "en": "The DOM is:",
            "ur": "DOM:"
          },
          "opts": {
            "en": [
              "A live tree of page nodes",
              "A CSS file",
              "A server rack"
            ],
            "ur": [
              "Live page node tree",
              "CSS file",
              "Server rack"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Built by the browser from HTML.",
            "ur": "Browser HTML se banata."
          }
        },
        {
          "q": {
            "en": "JS usually updates the page by:",
            "ur": "JS page update:"
          },
          "opts": {
            "en": [
              "Changing DOM nodes",
              "Editing DNS",
              "Rewriting SSL"
            ],
            "ur": [
              "DOM nodes badal",
              "DNS",
              "SSL"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "DOM is the programmable page.",
            "ur": "DOM programmable page."
          }
        },
        {
          "q": {
            "en": "Parent/child describes:",
            "ur": "Parent/child:"
          },
          "opts": {
            "en": [
              "Tree relationships",
              "Font weights only",
              "HTTP verbs"
            ],
            "ur": [
              "Tree relations",
              "Fonts",
              "HTTP"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Hierarchy.",
            "ur": "Hierarchy."
          }
        }
      ],
      "practice": {
        "en": "In DevTools, find body → first child element name. Write it down.",
        "ur": "DevTools: body ka pehla child naam likho."
      },
      "exitTicket": {
        "en": "What clicked about DOM vs HTML file?",
        "ur": "DOM vs HTML file — kya samajh aaya?"
      },
      "cards": [
        {
          "front": {
            "en": "DOM",
            "ur": "DOM"
          },
          "back": {
            "en": "Live node tree",
            "ur": "Live node tree"
          }
        },
        {
          "front": {
            "en": "How JS updates UI",
            "ur": "JS UI"
          },
          "back": {
            "en": "Mutate DOM",
            "ur": "DOM mutate"
          }
        }
      ]
    },
    {
      "id": "fe202-2",
      "title": {
        "en": "Selecting Elements",
        "ur": "Elements Select"
      },
      "objective": {
        "en": "Select nodes with querySelector / querySelectorAll.",
        "ur": "querySelector se nodes."
      },
      "warmUp": {
        "en": "How would you find the first button on a page?",
        "ur": "Pehla button kaise dhoondoge?"
      },
      "teach": {
        "en": "<p><code>document.querySelector(css)</code> returns the first match. <code>querySelectorAll</code> returns a list. Prefer semantic hooks (ids sparingly, classes, data-attributes) over brittle deep paths.</p>",
        "ur": "<p><code>querySelector</code> pehla match. <code>querySelectorAll</code> list. Semantic hooks (classes, data-*) brittle deep paths se behtar.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>CSS selectors are search terms. <code>#save</code> finds id save. <code>.card</code> finds class card. <code>querySelector</code> = “find first”; <code>All</code> = “find every”.</p>",
          "ur": "<p>CSS selectors search terms. <code>#save</code> = id. <code>.card</code> = class. querySelector = pehla; All = saare.</p>"
        },
        "career": {
          "en": "<p>Stable selectors are part of your public UI contract. Prefer <code>data-testid</code> / role-friendly structure for tests. Avoid coupling to layout-only wrappers that redesigns will smash.</p>",
          "ur": "<p>Stable selectors = UI contract. Tests ke liye data-testid / roles. Layout-only wrappers avoid — redesign tod dete.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Selector = a pattern that points at elements. <code>#id</code> = unique id. <code>.class</code> = reusable label.</p><p>Start with one <code>querySelector</code> call and log the result in the Console.</p>",
          "ur": "<p><strong>Glossary:</strong> Selector = pattern jo elements dhoondhe. <code>#id</code> unique. <code>.class</code> reusable.</p><p>Ek querySelector + Console log se shuru.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "querySelector returns:",
            "ur": "querySelector:"
          },
          "opts": {
            "en": [
              "First match or null",
              "Always an array",
              "A CSS file"
            ],
            "ur": [
              "Pehla match ya null",
              "Hamesha array",
              "CSS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Single node API.",
            "ur": "Single node."
          }
        },
        {
          "q": {
            "en": "querySelectorAll returns:",
            "ur": "querySelectorAll:"
          },
          "opts": {
            "en": [
              "A list of matches",
              "Only null",
              "DNS records"
            ],
            "ur": [
              "Matches list",
              "Sirf null",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "NodeList-like.",
            "ur": "NodeList-like."
          }
        },
        {
          "q": {
            "en": "Brittle selectors often:",
            "ur": "Brittle selectors:"
          },
          "opts": {
            "en": [
              "Break when layout changes",
              "Improve security",
              "Fix SSL"
            ],
            "ur": [
              "Layout change pe toot",
              "Security",
              "SSL"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Prefer stable hooks.",
            "ur": "Stable hooks."
          }
        }
      ],
      "practice": {
        "en": "Write a selector for a button with class primary.",
        "ur": "class primary button ka selector likho."
      },
      "exitTicket": {
        "en": "Which selector style will you prefer and why?",
        "ur": "Kaunsa selector style — kyun?"
      },
      "cards": [
        {
          "front": {
            "en": "querySelector",
            "ur": "querySelector"
          },
          "back": {
            "en": "First match",
            "ur": "Pehla match"
          }
        },
        {
          "front": {
            "en": "Stable hook",
            "ur": "Stable hook"
          },
          "back": {
            "en": "class / data-*",
            "ur": "class / data-*"
          }
        }
      ],
      "practiceCode": {
        "prompt": {
          "en": "Write a function that returns the first .primary button.",
          "ur": ".primary button return karo."
        },
        "starter": "function findPrimary() {\n  // TODO\n}\n",
        "tests": [
          {
            "name": "returns element or null",
            "run": "typeof findPrimary === \"function\""
          }
        ]
      }
    },
    {
      "id": "fe202-3",
      "title": {
        "en": "Events",
        "ur": "Events"
      },
      "objective": {
        "en": "Handle clicks and inputs with addEventListener.",
        "ur": "addEventListener se clicks/inputs."
      },
      "warmUp": {
        "en": "What happens between a finger tap and your code running?",
        "ur": "Tap aur code ke beech kya?"
      },
      "teach": {
        "en": "<p>Events are signals: click, input, submit, keydown. <code>addEventListener(type, handler)</code> registers interest. The handler receives an event object (target, preventDefault, etc.).</p>",
        "ur": "<p>Events signals: click, input, submit. <code>addEventListener</code> register. Handler ko event object milta.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>An event is “something happened.” You say: when click on this button, run this function. That function can change text, show a message, or save data.</p>",
          "ur": "<p>Event = kuch hua. Kehte: button click pe ye function chalao. Function text badal / message / save.</p>"
        },
        "career": {
          "en": "<p>Prefer delegated listeners on stable parents for dynamic lists. Always know whether you need <code>preventDefault</code> (forms/links) vs letting the browser proceed.</p>",
          "ur": "<p>Dynamic lists pe parent pe delegated listeners. Form/link pe preventDefault kab chahiye — clear rakho.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Listener = function that runs when an event fires. Target = the element that was interacted with.</p><p>Practice one click listener that changes a paragraph’s text.</p>",
          "ur": "<p><strong>Glossary:</strong> Listener = event pe chalne wali function. Target = jis element pe action hua.</p><p>Ek click listener se paragraph text badlo.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "addEventListener registers:",
            "ur": "addEventListener:"
          },
          "opts": {
            "en": [
              "A handler for an event type",
              "A new domain",
              "A font"
            ],
            "ur": [
              "Event handler",
              "Domain",
              "Font"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Subscribe to signals.",
            "ur": "Signals."
          }
        },
        {
          "q": {
            "en": "preventDefault is used to:",
            "ur": "preventDefault:"
          },
          "opts": {
            "en": [
              "Stop the browser’s default action",
              "Delete the DOM",
              "Speed Wi‑Fi"
            ],
            "ur": [
              "Default action rokna",
              "DOM delete",
              "Wi‑Fi"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Forms/links often need it.",
            "ur": "Forms/links."
          }
        },
        {
          "q": {
            "en": "event.target is usually:",
            "ur": "event.target:"
          },
          "opts": {
            "en": [
              "The element that received the event",
              "The CSS file",
              "The server"
            ],
            "ur": [
              "Event wala element",
              "CSS",
              "Server"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Useful in delegation.",
            "ur": "Delegation."
          }
        }
      ],
      "practice": {
        "en": "Add a click listener that toggles a class on a box.",
        "ur": "Click pe box class toggle."
      },
      "exitTicket": {
        "en": "Describe your handler in one sentence.",
        "ur": "Handler ek jumle mein."
      },
      "cards": [
        {
          "front": {
            "en": "Listener",
            "ur": "Listener"
          },
          "back": {
            "en": "Handler on event",
            "ur": "Event pe handler"
          }
        },
        {
          "front": {
            "en": "preventDefault",
            "ur": "preventDefault"
          },
          "back": {
            "en": "Block default browser action",
            "ur": "Default rokna"
          }
        }
      ],
      "practiceCode": {
        "prompt": {
          "en": "Complete onClick so it sets text of #out to \"ok\".",
          "ur": "#out text \"ok\" set karo."
        },
        "starter": "function onClick() {\n  // TODO: document.querySelector(\"#out\")...\n}\n",
        "tests": [
          {
            "name": "onClick is a function",
            "run": "typeof onClick === \"function\""
          }
        ]
      }
    },
    {
      "id": "fe202-4",
      "title": {
        "en": "Event Loop Literacy",
        "ur": "Event Loop"
      },
      "objective": {
        "en": "Explain call stack vs task queue at literacy level.",
        "ur": "Call stack vs task queue literacy."
      },
      "warmUp": {
        "en": "Why can a long loop freeze clicks?",
        "ur": "Lambi loop clicks kyun freeze?"
      },
      "teach": {
        "en": "<p>JS on the main thread runs one stack at a time. Long sync work blocks rendering and events. Async APIs schedule work later (timeouts, promises). Literacy goal: never block the UI thread with heavy loops.</p>",
        "ur": "<p>Main thread pe JS ek stack. Lambi sync work UI block. Async baad mein schedule. Goal: UI thread heavy loop se mat bharao.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Imagine one cook in a kitchen. If they chop for 10 minutes without stopping, nobody gets served. Events wait in line. Keep work small so the page stays responsive.</p>",
          "ur": "<p>Ek cook kitchen mein. 10 min continuous chop — kisi ko serve nahi. Events line mein. Kaam chhota rakho taake page responsive.</p>"
        },
        "career": {
          "en": "<p>Profile before optimizing. Split work (<code>requestAnimationFrame</code>, chunking) when you must process large lists. Know that <code>await</code> yields — but CPU-heavy sync between awaits still janks.</p>",
          "ur": "<p>Optimize se pehle profile. Badi lists pe chunking. await yield karta — lekin awaits ke beech heavy sync ab bhi jank.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Blocking = code that runs so long the page cannot paint or react. Async = “do this later.”</p><p>If the page freezes, look for long loops first.</p>",
          "ur": "<p><strong>Glossary:</strong> Blocking = itna lamba code ke page paint/react na kare. Async = baad mein.</p><p>Freeze pe pehle lambi loops dekho.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "A long sync loop can:",
            "ur": "Lambi sync loop:"
          },
          "opts": {
            "en": [
              "Freeze UI interactions",
              "Improve DNS",
              "Fix SSL"
            ],
            "ur": [
              "UI freeze",
              "DNS",
              "SSL"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "One main thread.",
            "ur": "Main thread."
          }
        },
        {
          "q": {
            "en": "Async scheduling helps:",
            "ur": "Async:"
          },
          "opts": {
            "en": [
              "Keep the UI responsive",
              "Delete the DOM",
              "Replace HTML"
            ],
            "ur": [
              "UI responsive",
              "DOM delete",
              "HTML"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Yield to the browser.",
            "ur": "Browser ko yield."
          }
        },
        {
          "q": {
            "en": "Literacy goal is to:",
            "ur": "Goal:"
          },
          "opts": {
            "en": [
              "Avoid blocking the UI thread",
              "Memorize every API",
              "Ignore events"
            ],
            "ur": [
              "UI thread block mat",
              "Har API yaad",
              "Events ignore"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Users feel jank.",
            "ur": "Users jank feel."
          }
        }
      ],
      "practice": {
        "en": "Find a loop in an old script and estimate if it could block.",
        "ur": "Purane script mein loop — block ho sakta?"
      },
      "exitTicket": {
        "en": "One habit to keep UI smooth?",
        "ur": "UI smooth rakhne ki ek adat?"
      },
      "cards": [
        {
          "front": {
            "en": "Blocking",
            "ur": "Blocking"
          },
          "back": {
            "en": "Long sync work on main thread",
            "ur": "Main thread pe lambi sync"
          }
        },
        {
          "front": {
            "en": "Fix",
            "ur": "Fix"
          },
          "back": {
            "en": "Chunk / async / less work",
            "ur": "Chunk / async"
          }
        }
      ]
    },
    {
      "id": "fe202-5",
      "title": {
        "en": "Forms and Input",
        "ur": "Forms aur Input"
      },
      "objective": {
        "en": "Read input values and handle submit.",
        "ur": "Input values + submit."
      },
      "warmUp": {
        "en": "Where should validation live first?",
        "ur": "Validation pehle kahan?"
      },
      "teach": {
        "en": "<p>Read <code>input.value</code>. On submit, preventDefault, validate, then act. Prefer native types (email, number) + clear error text. Accessibility: associate labels.</p>",
        "ur": "<p><code>input.value</code> paro. Submit pe preventDefault, validate, phir act. Native types + clear errors. Labels associate.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>A form is questions + a send button. Your code reads answers when someone taps Send. If an answer is empty, show a friendly message instead of failing silently.</p>",
          "ur": "<p>Form = sawal + send. Send pe answers parho. Khali ho to dostana message — silent fail nahi.</p>"
        },
        "career": {
          "en": "<p>Client validation is UX; server validation is security. Even offline apps should treat user input as untrusted when it later syncs or exports.</p>",
          "ur": "<p>Client validation = UX; server = security. Offline apps mein bhi input untrusted jab sync/export ho.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Value = what the user typed. Submit = send the form. Validation = check before accepting.</p>",
          "ur": "<p><strong>Glossary:</strong> Value = user ne kya likha. Submit = form bhejna. Validation = accept se pehle check.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "input.value holds:",
            "ur": "input.value:"
          },
          "opts": {
            "en": [
              "Current field text",
              "The SSL cert",
              "DNS TTL"
            ],
            "ur": [
              "Field text",
              "SSL",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Live field contents.",
            "ur": "Live contents."
          }
        },
        {
          "q": {
            "en": "On submit you often:",
            "ur": "Submit pe:"
          },
          "opts": {
            "en": [
              "preventDefault then validate",
              "Ignore the event",
              "Delete the form"
            ],
            "ur": [
              "preventDefault + validate",
              "Ignore",
              "Delete"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "You control the flow.",
            "ur": "Flow control."
          }
        },
        {
          "q": {
            "en": "Labels help:",
            "ur": "Labels:"
          },
          "opts": {
            "en": [
              "Accessibility and tap targets",
              "Only SEO spam",
              "GPU clocks"
            ],
            "ur": [
              "A11y + taps",
              "SEO spam",
              "GPU"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Always label inputs.",
            "ur": "Hamesha label."
          }
        }
      ],
      "practice": {
        "en": "Build a name field + submit that shows a greeting.",
        "ur": "Name + submit → greeting."
      },
      "exitTicket": {
        "en": "What validation rule did you choose?",
        "ur": "Kaunsa validation rule?"
      },
      "cards": [
        {
          "front": {
            "en": "value",
            "ur": "value"
          },
          "back": {
            "en": "Typed contents",
            "ur": "Typed contents"
          }
        },
        {
          "front": {
            "en": "validate",
            "ur": "validate"
          },
          "back": {
            "en": "Check before accept",
            "ur": "Accept se pehle check"
          }
        }
      ]
    },
    {
      "id": "fe202-6",
      "title": {
        "en": "Interactive Widget Project",
        "ur": "Widget Project"
      },
      "objective": {
        "en": "Build a tiny interactive quiz widget.",
        "ur": "Chhota interactive quiz widget."
      },
      "warmUp": {
        "en": "What makes a widget feel finished?",
        "ur": "Widget finished kab?"
      },
      "teach": {
        "en": "<p>Capstone: a question, two answers, feedback text. Requirements: semantic HTML, one listener, clear success/fail state, works offline.</p>",
        "ur": "<p>Capstone: sawal, do jawab, feedback. Semantic HTML, ek listener, clear success/fail, offline.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Make a mini quiz for a friend: one question, two buttons. When they pick, show “correct” or “try again.” Keep it tiny on purpose.</p>",
          "ur": "<p>Dost ke liye mini quiz: ek sawal, do buttons. Correct / try again. Chhota hi rakho.</p>"
        },
        "career": {
          "en": "<p>Ship a vertical slice: structure → behavior → feedback. Document one limitation honestly (no score persistence yet is fine).</p>",
          "ur": "<p>Vertical slice: structure → behavior → feedback. Ek limitation imandari se likho.</p>"
        },
        "adult": {
          "en": "<p>Follow the checklist slowly. Finished means each box is honestly checked — not rushed.</p>",
          "ur": "<p>Checklist ahista. Finished = har box imandari se — jaldi nahi.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "A finished widget includes:",
            "ur": "Finished widget:"
          },
          "opts": {
            "en": [
              "Feedback after action",
              "Only silent fails",
              "Live trading"
            ],
            "ur": [
              "Action ke baad feedback",
              "Silent fail",
              "Trading"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Users need signal.",
            "ur": "Users ko signal."
          }
        },
        {
          "q": {
            "en": "Capstone should stay:",
            "ur": "Capstone:"
          },
          "opts": {
            "en": [
              "Small and complete",
              "Infinite features",
              "Dependent on cloud AI"
            ],
            "ur": [
              "Chhota + complete",
              "Infinite",
              "Cloud AI"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Proof over spectacle.",
            "ur": "Proof > spectacle."
          }
        },
        {
          "q": {
            "en": "Offline means:",
            "ur": "Offline:"
          },
          "opts": {
            "en": [
              "Works without network",
              "Needs 5G always",
              "Needs a server farm"
            ],
            "ur": [
              "Bina network",
              "Hamesha 5G",
              "Server farm"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "MasteryCap ethos.",
            "ur": "MasteryCap ethos."
          }
        }
      ],
      "practice": {
        "en": "Complete the project checklist in Records.",
        "ur": "Records mein checklist complete."
      },
      "exitTicket": {
        "en": "What would v2 add without breaking honesty?",
        "ur": "v2 kya add kare — honesty ke sath?"
      },
      "cards": [
        {
          "front": {
            "en": "Capstone",
            "ur": "Capstone"
          },
          "back": {
            "en": "Quiz widget",
            "ur": "Quiz widget"
          }
        },
        {
          "front": {
            "en": "Done",
            "ur": "Done"
          },
          "back": {
            "en": "Checklist attested",
            "ur": "Checklist attested"
          }
        }
      ]
    }
  ],
  "finalQuiz": [
    {
      "q": {
        "en": "DOM is",
        "ur": "DOM"
      },
      "opts": {
        "en": [
          "Live node tree",
          "A bank",
          "A packet only"
        ],
        "ur": [
          "Live node tree",
          "Bank",
          "Packet"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Tree map.",
        "ur": "Tree."
      }
    },
    {
      "q": {
        "en": "querySelector returns",
        "ur": "querySelector"
      },
      "opts": {
        "en": [
          "First match",
          "Always 10 nodes",
          "Fonts"
        ],
        "ur": [
          "Pehla match",
          "Hamesha 10",
          "Fonts"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Single.",
        "ur": "Single."
      }
    },
    {
      "q": {
        "en": "Events are handled with",
        "ur": "Events"
      },
      "opts": {
        "en": [
          "addEventListener",
          "DOCTYPE",
          "DNS"
        ],
        "ur": [
          "addEventListener",
          "DOCTYPE",
          "DNS"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Listeners.",
        "ur": "Listeners."
      }
    },
    {
      "q": {
        "en": "Long sync loops",
        "ur": "Loops"
      },
      "opts": {
        "en": [
          "Can freeze UI",
          "Fix SSL",
          "Boost Wi‑Fi"
        ],
        "ur": [
          "UI freeze",
          "SSL",
          "Wi‑Fi"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Main thread.",
        "ur": "Main thread."
      }
    },
    {
      "q": {
        "en": "On submit often",
        "ur": "Submit"
      },
      "opts": {
        "en": [
          "preventDefault + validate",
          "Ignore input",
          "Delete DOM"
        ],
        "ur": [
          "preventDefault + validate",
          "Ignore",
          "Delete"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Control flow.",
        "ur": "Flow."
      }
    }
  ],
  "passScore": 85,
  "project": {
    "id": "quiz-widget",
    "title": {
      "en": "Interactive quiz widget",
      "ur": "Interactive quiz widget"
    },
    "items": [
      {
        "id": "sem",
        "en": "Semantic structure for question + answers",
        "ur": "Semantic question + answers"
      },
      {
        "id": "listen",
        "en": "Click handling with addEventListener",
        "ur": "addEventListener clicks"
      },
      {
        "id": "fb",
        "en": "Visible correct/incorrect feedback",
        "ur": "Visible feedback"
      }
    ]
  }
};
export default COURSE;
