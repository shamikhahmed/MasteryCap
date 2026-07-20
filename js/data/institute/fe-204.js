/* FE-204 — In Session */
export const COURSE = {
  "code": "FE-204",
  "title": {
    "en": "State, Storage, and Offline",
    "ur": "State, Storage, Offline"
  },
  "hours": 10,
  "lessons": [
    {
      "id": "fe204-1",
      "title": {
        "en": "App State as Data",
        "ur": "App State"
      },
      "objective": {
        "en": "Model UI state as plain objects.",
        "ur": "UI state plain objects."
      },
      "warmUp": {
        "en": "Where does “which lesson is open” live?",
        "ur": "Kaunsi lesson open — kahan?"
      },
      "teach": {
        "en": "<p>State is data that changes over time: route, selections, form drafts. Keep it in objects/arrays; derive UI from state.</p>",
        "ur": "<p>State = time ke sath badalta data. Objects/arrays; UI state se derive.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>State is the app’s memory notebook: current page, score, open/closed.</p>",
          "ur": "<p>State = app ki notebook: page, score, open/closed.</p>"
        },
        "career": {
          "en": "<p>Single source of truth beats scattered DOM as storage. DOM is a view.</p>",
          "ur": "<p>Single source of truth. DOM view hai — storage nahi.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> State = values the app remembers while it runs.</p>",
          "ur": "<p><strong>Glossary:</strong> State = app jo values yaad rakhe.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "State should live primarily in:",
            "ur": "State primarily kahan rehni chahiye:"
          },
          "opts": {
            "en": [
              "Data objects",
              "Random CSS only",
              "DNS"
            ],
            "ur": [
              "Data objects",
              "CSS",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Data first.",
            "ur": "Data first."
          }
        },
        {
          "q": {
            "en": "UI should be:",
            "ur": "UI:"
          },
          "opts": {
            "en": [
              "Derived from state",
              "The only source of truth forever",
              "Unrelated"
            ],
            "ur": [
              "State se derive",
              "Only truth",
              "Unrelated"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Predictable updates.",
            "ur": "Predictable."
          }
        },
        {
          "q": {
            "en": "Examples of state:",
            "ur": "State examples:"
          },
          "opts": {
            "en": [
              "Selected tab, draft text",
              "Earth’s core temp",
              "GPU brand only"
            ],
            "ur": [
              "Tab, draft",
              "Earth core",
              "GPU"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "App memory.",
            "ur": "App memory."
          }
        }
      ],
      "practice": {
        "en": "Sketch a state object for a notes app.",
        "ur": "Notes app state object sketch."
      },
      "exitTicket": {
        "en": "What is your single source of truth?",
        "ur": "Single source of truth kya?"
      },
      "cards": [
        {
          "front": {
            "en": "State",
            "ur": "State"
          },
          "back": {
            "en": "Changing app data",
            "ur": "Badalta data"
          }
        },
        {
          "front": {
            "en": "Derive UI",
            "ur": "Derive"
          },
          "back": {
            "en": "Render from state",
            "ur": "State se render"
          }
        }
      ]
    },
    {
      "id": "fe204-2",
      "title": {
        "en": "localStorage",
        "ur": "localStorage"
      },
      "objective": {
        "en": "Persist JSON with localStorage safely.",
        "ur": "localStorage pe JSON persist."
      },
      "warmUp": {
        "en": "What happens if the user reloads?",
        "ur": "Reload pe kya?"
      },
      "teach": {
        "en": "<p>localStorage is sync key/value strings. JSON.stringify/parse. Guard try/catch. Quota exists. Never store secrets.</p>",
        "ur": "<p>localStorage sync key/value strings. JSON. try/catch. Quota. Secrets mat rakho.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>localStorage is a tiny locker in the browser. Put a labeled box (key) with a note (string) inside.</p>",
          "ur": "<p>localStorage browser locker. Key label + string note.</p>"
        },
        "career": {
          "en": "<p>Version your schema. Migrations beat silent corruption. MasteryCap already namespaces keys.</p>",
          "ur": "<p>Schema version. Migrations. MasteryCap keys namespace.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Persist = still there after reload. JSON = text format for objects.</p>",
          "ur": "<p><strong>Glossary:</strong> Persist = reload ke baad. JSON = objects ka text.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "localStorage stores:",
            "ur": "localStorage:"
          },
          "opts": {
            "en": [
              "Strings (often JSON)",
              "GPU drivers",
              "Live TCP sockets"
            ],
            "ur": [
              "Strings/JSON",
              "GPU",
              "TCP"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Serialize objects.",
            "ur": "Serialize."
          }
        },
        {
          "q": {
            "en": "Always wrap parse in:",
            "ur": "Parse hamesha wrap karo:"
          },
          "opts": {
            "en": [
              "try/catch",
              "Hope",
              "DNS"
            ],
            "ur": [
              "try/catch",
              "Hope",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Corrupt data happens.",
            "ur": "Corrupt hota."
          }
        },
        {
          "q": {
            "en": "Do not store:",
            "ur": "Mat store:"
          },
          "opts": {
            "en": [
              "Passwords / secrets",
              "Public UI theme prefs",
              "Lesson ids"
            ],
            "ur": [
              "Passwords/secrets",
              "Theme",
              "Lesson ids"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Device is not a vault for secrets.",
            "ur": "Secrets ke liye vault nahi."
          }
        }
      ],
      "practice": {
        "en": "Save and reload a notes array.",
        "ur": "Notes array save + reload."
      },
      "exitTicket": {
        "en": "How will you version the key?",
        "ur": "Key version kaise?"
      },
      "cards": [
        {
          "front": {
            "en": "localStorage",
            "ur": "localStorage"
          },
          "back": {
            "en": "Key/value strings",
            "ur": "Key/value"
          }
        },
        {
          "front": {
            "en": "JSON",
            "ur": "JSON"
          },
          "back": {
            "en": "Serialize objects",
            "ur": "Objects serialize"
          }
        }
      ],
      "practiceCode": {
        "prompt": {
          "en": "save(notes) writes JSON to key notes.v1",
          "ur": "save(notes) notes.v1 pe JSON"
        },
        "starter": "function save(notes) {\n  // TODO localStorage.setItem\n}\n",
        "tests": [
          {
            "name": "save fn",
            "run": "typeof save === \"function\""
          }
        ]
      }
    },
    {
      "id": "fe204-3",
      "title": {
        "en": "Service Worker Idea",
        "ur": "Service Worker"
      },
      "objective": {
        "en": "Explain SW caching at literacy level.",
        "ur": "SW caching literacy."
      },
      "warmUp": {
        "en": "How can an app open on a plane?",
        "ur": "Plane pe app kaise?"
      },
      "teach": {
        "en": "<p>A service worker is a script that can intercept network requests and cache files. MasteryCap uses one for offline shell. SW updates need careful versioning.</p>",
        "ur": "<p>Service worker network intercept + cache. MasteryCap offline shell. Updates careful versioning.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Think of a librarian who keeps copies of pages so you can read offline.</p>",
          "ur": "<p>Librarian copies rakhta — offline parho.</p>"
        },
        "career": {
          "en": "<p>Cache strategies: cache-first vs network-first. Bump cache names on release or users stick on stale builds.</p>",
          "ur": "<p>Cache-first vs network-first. Release pe cache name bump.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Cache = stored copy. Service worker = helper script between app and network.</p>",
          "ur": "<p><strong>Glossary:</strong> Cache = copy. Service worker = network ke beech helper.</p>"
        }
      },
      "visual": "http",
      "check": [
        {
          "q": {
            "en": "Service workers can:",
            "ur": "Service workers kya kar sakte:"
          },
          "opts": {
            "en": [
              "Cache and intercept requests",
              "Mint money",
              "Replace HTML semantics"
            ],
            "ur": [
              "Cache + intercept",
              "Money",
              "HTML semantics"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Offline enabler.",
            "ur": "Offline."
          }
        },
        {
          "q": {
            "en": "Stale caches happen when:",
            "ur": "Stale caches kab hote:"
          },
          "opts": {
            "en": [
              "Versions not bumped",
              "Fonts are serif",
              "JSON is pretty"
            ],
            "ur": [
              "Version bump nahi",
              "Serif",
              "Pretty JSON"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Discipline releases.",
            "ur": "Release discipline."
          }
        },
        {
          "q": {
            "en": "MasteryCap is:",
            "ur": "MasteryCap:"
          },
          "opts": {
            "en": [
              "Offline-first PWA",
              "Cloud-only SaaS",
              "Broker app"
            ],
            "ur": [
              "Offline-first PWA",
              "Cloud SaaS",
              "Broker"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Design ethos.",
            "ur": "Ethos."
          }
        }
      ],
      "practice": {
        "en": "Read sw.js CACHE name in this project.",
        "ur": "Is project sw.js CACHE parho."
      },
      "exitTicket": {
        "en": "Why bump CACHE on ship?",
        "ur": "Ship pe CACHE bump kyun?"
      },
      "cards": [
        {
          "front": {
            "en": "SW",
            "ur": "SW"
          },
          "back": {
            "en": "Offline helper script",
            "ur": "Offline helper"
          }
        },
        {
          "front": {
            "en": "CACHE bump",
            "ur": "CACHE"
          },
          "back": {
            "en": "Invalidate stale",
            "ur": "Stale invalidate"
          }
        }
      ]
    },
    {
      "id": "fe204-4",
      "title": {
        "en": "Offline Notes Capstone",
        "ur": "Offline Notes"
      },
      "objective": {
        "en": "Ship a tiny offline notes app checklist.",
        "ur": "Offline notes checklist."
      },
      "warmUp": {
        "en": "What must survive reload + airplane mode?",
        "ur": "Reload + airplane pe kya survive?"
      },
      "teach": {
        "en": "<p>Capstone: add/list notes, persist, survive reload offline. State object + localStorage + honest empty state.</p>",
        "ur": "<p>Capstone: add/list notes, persist, offline reload. State + localStorage + empty state.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Make a pocket notebook in the browser. Write notes, close tab, reopen — notes still there.</p>",
          "ur": "<p>Browser pocket notebook. Band/open — notes rahein.</p>"
        },
        "career": {
          "en": "<p>Write a one-line limitation: no sync across devices. Honesty is a feature.</p>",
          "ur": "<p>Limitation: devices across sync nahi. Honesty feature.</p>"
        },
        "adult": {
          "en": "<p>Use the checklist. Done means each item attested.</p>",
          "ur": "<p>Checklist. Done = attested.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Offline notes must:",
            "ur": "Offline notes:"
          },
          "opts": {
            "en": [
              "Persist locally",
              "Require always-on API",
              "Need a broker"
            ],
            "ur": [
              "Local persist",
              "Always API",
              "Broker"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Device-owned data.",
            "ur": "Device data."
          }
        },
        {
          "q": {
            "en": "Empty state should:",
            "ur": "Empty state kya karna chahiye:"
          },
          "opts": {
            "en": [
              "Invite first note",
              "Crash",
              "Show fake data"
            ],
            "ur": [
              "First note invite",
              "Crash",
              "Fake data"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Honest UX.",
            "ur": "Honest."
          }
        },
        {
          "q": {
            "en": "Survive reload proves:",
            "ur": "Reload prove:"
          },
          "opts": {
            "en": [
              "Persistence works",
              "Marketing hype",
              "AI brain"
            ],
            "ur": [
              "Persistence",
              "Hype",
              "AI"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Test it.",
            "ur": "Test."
          }
        }
      ],
      "practice": {
        "en": "Complete FE-204 project checklist.",
        "ur": "FE-204 checklist."
      },
      "exitTicket": {
        "en": "Limitation you will print in-app?",
        "ur": "In-app limitation?"
      },
      "cards": [
        {
          "front": {
            "en": "Capstone",
            "ur": "Capstone"
          },
          "back": {
            "en": "Offline notes",
            "ur": "Offline notes"
          }
        },
        {
          "front": {
            "en": "Honest limit",
            "ur": "Limit"
          },
          "back": {
            "en": "No cross-device sync",
            "ur": "No cross-device"
          }
        }
      ]
    }
  ],
  "finalQuiz": [
    {
      "q": {
        "en": "State is",
        "ur": "State"
      },
      "opts": {
        "en": [
          "Changing app data",
          "A font",
          "A router cable"
        ],
        "ur": [
          "Badalta data",
          "Font",
          "Cable"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Memory.",
        "ur": "Memory."
      }
    },
    {
      "q": {
        "en": "localStorage holds",
        "ur": "localStorage"
      },
      "opts": {
        "en": [
          "Strings",
          "TCP sockets",
          "GPUs"
        ],
        "ur": [
          "Strings",
          "TCP",
          "GPU"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Serialize.",
        "ur": "Serialize."
      }
    },
    {
      "q": {
        "en": "SW helps",
        "ur": "SW"
      },
      "opts": {
        "en": [
          "Offline caching",
          "Tax filing",
          "Forex signals"
        ],
        "ur": [
          "Offline cache",
          "Tax",
          "Forex"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "PWA.",
        "ur": "PWA."
      }
    },
    {
      "q": {
        "en": "Never store in localStorage",
        "ur": "Never"
      },
      "opts": {
        "en": [
          "Secrets",
          "Theme prefs",
          "Draft titles"
        ],
        "ur": [
          "Secrets",
          "Theme",
          "Drafts"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Safety.",
        "ur": "Safety."
      }
    },
    {
      "q": {
        "en": "Schema versions",
        "ur": "Versions"
      },
      "opts": {
        "en": [
          "Prevent silent breakage",
          "Guarantee income",
          "Replace HTML"
        ],
        "ur": [
          "Breakage rokna",
          "Income",
          "HTML"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Migrations.",
        "ur": "Migrations."
      }
    }
  ],
  "passScore": 85,
  "project": {
    "id": "offline-notes",
    "title": {
      "en": "Offline notes app",
      "ur": "Offline notes app"
    },
    "items": [
      {
        "id": "add",
        "en": "Add a note to state",
        "ur": "State mein note add"
      },
      {
        "id": "persist",
        "en": "Persist with localStorage JSON",
        "ur": "localStorage JSON"
      },
      {
        "id": "reload",
        "en": "Survives reload offline",
        "ur": "Offline reload survive"
      }
    ]
  }
};
export default COURSE;
