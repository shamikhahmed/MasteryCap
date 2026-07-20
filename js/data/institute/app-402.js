/* APP-402 — In Session */
export const COURSE = {
  "code": "APP-402",
  "title": {
    "en": "Build & Ship Your First App",
    "ur": "Pehli App Ship"
  },
  "hours": 20,
  "lessons": [
    {
      "id": "app402-1",
      "title": {
        "en": "Scope Doc",
        "ur": "Scope Doc"
      },
      "objective": {
        "en": "Write a one-page scope.",
        "ur": "One-page scope."
      },
      "warmUp": {
        "en": "What is explicitly out?",
        "ur": "Explicitly out kya?"
      },
      "teach": {
        "en": "<p>Scope: problem, user, in/out list, success metric, honest limits. Cut until one loop remains.</p>",
        "ur": "<p>Scope: problem, user, in/out, metric, limits. Ek loop tak kaato.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Write what your app does in one sentence a friend gets.</p>",
          "ur": "<p>Ek jumla — dost samjhe.</p>"
        },
        "career": {
          "en": "<p>Out-of-scope list prevents executive feature creep.</p>",
          "ur": "<p>Out-of-scope list creep rokta.</p>"
        },
        "adult": {
          "en": "<p>Slow is fine. Clear scope saves weeks.</p>",
          "ur": "<p>Ahista OK. Clear scope weeks bachata.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Scope must include:",
            "ur": "Scope mein kya include hona chahiye:"
          },
          "opts": {
            "en": [
              "In and out lists",
              "Only logo dreams",
              "Only ads"
            ],
            "ur": [
              "In/out",
              "Logo",
              "Ads"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Boundaries.",
            "ur": "Boundaries."
          }
        },
        {
          "q": {
            "en": "Success metric should be:",
            "ur": "Success metric kya hona chahiye:"
          },
          "opts": {
            "en": [
              "Observable",
              "Vague vibes",
              "Hidden"
            ],
            "ur": [
              "Observable",
              "Vibes",
              "Hidden"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Measurable.",
            "ur": "Measurable."
          }
        },
        {
          "q": {
            "en": "Cut until:",
            "ur": "Cut:"
          },
          "opts": {
            "en": [
              "One core loop",
              "Infinite backlog",
              "Zero users needed"
            ],
            "ur": [
              "Ek core loop",
              "Infinite",
              "Zero users"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "MVP.",
            "ur": "MVP."
          }
        }
      ],
      "practice": {
        "en": "Draft scope in Notes.",
        "ur": "Notes mein scope."
      },
      "exitTicket": {
        "en": "What did you cut?",
        "ur": "Kya kata?"
      },
      "cards": [
        {
          "front": {
            "en": "Scope",
            "ur": "Scope"
          },
          "back": {
            "en": "In/out + metric",
            "ur": "In/out + metric"
          }
        },
        {
          "front": {
            "en": "Loop",
            "ur": "Loop"
          },
          "back": {
            "en": "Core repeatable action",
            "ur": "Core action"
          }
        }
      ]
    },
    {
      "id": "app402-2",
      "title": {
        "en": "Skeleton",
        "ur": "Skeleton"
      },
      "objective": {
        "en": "Build HTML/CSS/JS skeleton.",
        "ur": "HTML/CSS/JS skeleton."
      },
      "warmUp": {
        "en": "What is the first screen?",
        "ur": "Pehli screen?"
      },
      "teach": {
        "en": "<p>Skeleton: index, css, js, manifest stub, empty states. Run locally. No features yet beyond navigation chrome.</p>",
        "ur": "<p>Skeleton: index, css, js, manifest, empty states. Local run. Pehle sirf chrome.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Empty house with walls and doors before furniture.</p>",
          "ur": "<p>Pehle deewar/darwaze — furniture baad.</p>"
        },
        "career": {
          "en": "<p>Establish tokens and nav early; feature branches stay coherent.</p>",
          "ur": "<p>Tokens + nav jaldi; features coherent.</p>"
        },
        "adult": {
          "en": "<p>One screen that loads is a win.</p>",
          "ur": "<p>Ek screen load = win.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Skeleton prioritizes:",
            "ur": "Skeleton kya prioritize karta:"
          },
          "opts": {
            "en": [
              "Structure over features",
              "Every feature day one",
              "Ads first"
            ],
            "ur": [
              "Structure",
              "Har feature",
              "Ads"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Foundation.",
            "ur": "Foundation."
          }
        },
        {
          "q": {
            "en": "Empty states:",
            "ur": "Empty:"
          },
          "opts": {
            "en": [
              "Belong early",
              "Are optional forever",
              "Are shameful"
            ],
            "ur": [
              "Early",
              "Optional forever",
              "Shame"
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
            "en": "Local run proves:",
            "ur": "Local run:"
          },
          "opts": {
            "en": [
              "Tooling works",
              "Marketing works",
              "Tax works"
            ],
            "ur": [
              "Tooling",
              "Marketing",
              "Tax"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Dev loop.",
            "ur": "Dev loop."
          }
        }
      ],
      "practice": {
        "en": "Create skeleton folder offline.",
        "ur": "Skeleton folder."
      },
      "exitTicket": {
        "en": "Blocker you hit?",
        "ur": "Kaunsa blocker?"
      },
      "cards": [
        {
          "front": {
            "en": "Skeleton",
            "ur": "Skeleton"
          },
          "back": {
            "en": "Shell first",
            "ur": "Shell first"
          }
        },
        {
          "front": {
            "en": "Empty",
            "ur": "Empty"
          },
          "back": {
            "en": "Early honesty",
            "ur": "Early honesty"
          }
        }
      ]
    },
    {
      "id": "app402-3",
      "title": {
        "en": "Features Offline",
        "ur": "Features Offline"
      },
      "objective": {
        "en": "Ship core loop offline.",
        "ur": "Core loop offline."
      },
      "warmUp": {
        "en": "Does it work on airplane mode?",
        "ur": "Airplane pe chalega?"
      },
      "teach": {
        "en": "<p>Implement the one loop with local persistence. Airplane test required. Document limits.</p>",
        "ur": "<p>Ek loop + local persist. Airplane test. Limits document.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Make the main thing work without internet. That is the flex.</p>",
          "ur": "<p>Main cheez bina internet. Yahi flex.</p>"
        },
        "career": {
          "en": "<p>Feature flags optional; vertical slice mandatory.</p>",
          "ur": "<p>Flags optional; vertical slice mandatory.</p>"
        },
        "adult": {
          "en": "<p>Test airplane twice.</p>",
          "ur": "<p>Airplane do dafa.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Core loop must:",
            "ur": "Core loop:"
          },
          "opts": {
            "en": [
              "Work offline",
              "Need 5 APIs",
              "Need accounts"
            ],
            "ur": [
              "Offline",
              "5 APIs",
              "Accounts"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "PWA bar.",
            "ur": "PWA."
          }
        },
        {
          "q": {
            "en": "Persistence proves:",
            "ur": "Persistence kya prove karti:"
          },
          "opts": {
            "en": [
              "Reload survival",
              "Hype",
              "AI"
            ],
            "ur": [
              "Reload",
              "Hype",
              "AI"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Real.",
            "ur": "Real."
          }
        },
        {
          "q": {
            "en": "Limits belong:",
            "ur": "Limits:"
          },
          "opts": {
            "en": [
              "In README/UI",
              "Only in your head",
              "In ads"
            ],
            "ur": [
              "README/UI",
              "Head",
              "Ads"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Honesty.",
            "ur": "Honesty."
          }
        }
      ],
      "practice": {
        "en": "Airplane-test your loop.",
        "ur": "Loop airplane-test."
      },
      "exitTicket": {
        "en": "What broke first?",
        "ur": "Pehle kya toota?"
      },
      "cards": [
        {
          "front": {
            "en": "Offline",
            "ur": "Offline"
          },
          "back": {
            "en": "No network needed",
            "ur": "No network"
          }
        },
        {
          "front": {
            "en": "Persist",
            "ur": "Persist"
          },
          "back": {
            "en": "Survive reload",
            "ur": "Reload"
          }
        }
      ]
    },
    {
      "id": "app402-4",
      "title": {
        "en": "Ship Notes",
        "ur": "Ship Notes"
      },
      "objective": {
        "en": "Write README + release notes.",
        "ur": "README + release notes."
      },
      "warmUp": {
        "en": "What should strangers know in 30s?",
        "ur": "30s mein strangers?"
      },
      "teach": {
        "en": "<p>README: what/why/limits/how to run. Release notes: what changed. Version bump. Optional GH Pages.</p>",
        "ur": "<p>README: what/why/limits/run. Release notes. Version. Optional Pages.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Explain like teaching a classmate.</p>",
          "ur": "<p>Classmate ko sikhana.</p>"
        },
        "career": {
          "en": "<p>Limits section is a trust feature for Cap-family apps.</p>",
          "ur": "<p>Limits section trust feature.</p>"
        },
        "adult": {
          "en": "<p>Short paragraphs. No hype.</p>",
          "ur": "<p>Chhote paragraphs. No hype.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "README needs:",
            "ur": "README:"
          },
          "opts": {
            "en": [
              "Limits + run steps",
              "Only buzzwords",
              "Only screenshots"
            ],
            "ur": [
              "Limits + run",
              "Buzzwords",
              "Screenshots"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Usable.",
            "ur": "Usable."
          }
        },
        {
          "q": {
            "en": "Version bump:",
            "ur": "Version:"
          },
          "opts": {
            "en": [
              "Marks the ship",
              "Is optional chaos",
              "Replaces testing"
            ],
            "ur": [
              "Ship mark",
              "Chaos",
              "Testing replace"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Discipline.",
            "ur": "Discipline."
          }
        },
        {
          "q": {
            "en": "Release notes tell:",
            "ur": "Release notes kya batate:"
          },
          "opts": {
            "en": [
              "What changed",
              "Secret passwords",
              "Broker tips"
            ],
            "ur": [
              "What changed",
              "Passwords",
              "Broker"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "History.",
            "ur": "History."
          }
        }
      ],
      "practice": {
        "en": "Attest APP-402 checklist.",
        "ur": "APP-402 checklist."
      },
      "exitTicket": {
        "en": "Live URL or export path?",
        "ur": "URL ya export path?"
      },
      "cards": [
        {
          "front": {
            "en": "README",
            "ur": "README"
          },
          "back": {
            "en": "How + limits",
            "ur": "How + limits"
          }
        },
        {
          "front": {
            "en": "Version",
            "ur": "Version"
          },
          "back": {
            "en": "Ship marker",
            "ur": "Ship marker"
          }
        }
      ]
    }
  ],
  "finalQuiz": [
    {
      "q": {
        "en": "Scope includes",
        "ur": "Scope"
      },
      "opts": {
        "en": [
          "In/out lists",
          "Only hype",
          "Only ads"
        ],
        "ur": [
          "In/out",
          "Hype",
          "Ads"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Boundaries.",
        "ur": "Boundaries."
      }
    },
    {
      "q": {
        "en": "Skeleton first means",
        "ur": "Skeleton"
      },
      "opts": {
        "en": [
          "Structure before features",
          "All features day one",
          "Skip HTML"
        ],
        "ur": [
          "Structure pehle",
          "All features",
          "Skip HTML"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Foundation.",
        "ur": "Foundation."
      }
    },
    {
      "q": {
        "en": "Core loop must",
        "ur": "Loop"
      },
      "opts": {
        "en": [
          "Work offline",
          "Need cloud AI",
          "Need payroll"
        ],
        "ur": [
          "Offline",
          "Cloud AI",
          "Payroll"
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
        "en": "README should state",
        "ur": "README"
      },
      "opts": {
        "en": [
          "Limits",
          "Secrets",
          "Fake degrees"
        ],
        "ur": [
          "Limits",
          "Secrets",
          "Degrees"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Honesty.",
        "ur": "Honesty."
      }
    },
    {
      "q": {
        "en": "Ship includes",
        "ur": "Ship"
      },
      "opts": {
        "en": [
          "Version notes",
          "Hidden breakage",
          "No testing"
        ],
        "ur": [
          "Version notes",
          "Hidden break",
          "No test"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Discipline.",
        "ur": "Discipline."
      }
    }
  ],
  "passScore": 85,
  "project": {
    "id": "first-pwa",
    "title": {
      "en": "Ship one offline PWA",
      "ur": "Ek offline PWA ship"
    },
    "items": [
      {
        "id": "scope",
        "en": "Scope doc with in/out",
        "ur": "Scope in/out"
      },
      {
        "id": "offline",
        "en": "Core loop works offline",
        "ur": "Core loop offline"
      },
      {
        "id": "readme",
        "en": "README with limits",
        "ur": "README + limits"
      }
    ]
  }
};
export default COURSE;
