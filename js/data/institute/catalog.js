/* Institute catalog — School → Program → Course. status: session | announced */
export const CATALOG = {
  "schools": [
    {
      "id": "software",
      "name": {
        "en": "School of Software Craft",
        "ur": "School of Software Craft"
      },
      "tagline": {
        "en": "Frontend → Backend literacy → Ship",
        "ur": "Frontend → Backend literacy → Ship"
      },
      "status": "live",
      "programs": [
        {
          "id": "web-foundations",
          "name": {
            "en": "Web Foundations",
            "ur": "Web Foundations"
          },
          "courses": [
            "WEB-101",
            "WEB-102",
            "WEB-103"
          ]
        },
        {
          "id": "frontend",
          "name": {
            "en": "Frontend Craft",
            "ur": "Frontend Craft"
          },
          "courses": [
            "FE-201",
            "FE-202",
            "FE-203",
            "FE-204"
          ]
        },
        {
          "id": "backend",
          "name": {
            "en": "Backend Literacy",
            "ur": "Backend Literacy"
          },
          "courses": [
            "BE-301",
            "BE-302",
            "BE-303",
            "BE-304"
          ]
        },
        {
          "id": "app-builder",
          "name": {
            "en": "App Builder",
            "ur": "App Builder"
          },
          "courses": [
            "APP-401",
            "APP-402",
            "APP-403"
          ]
        }
      ]
    },
    {
      "id": "markets",
      "name": {
        "en": "School of Markets",
        "ur": "School of Markets"
      },
      "tagline": {
        "en": "Education only — not financial advice",
        "ur": "Sirf education — financial advice nahi"
      },
      "status": "live",
      "honesty": true,
      "programs": [
        {
          "id": "market-literacy",
          "name": {
            "en": "Market Literacy",
            "ur": "Market Literacy"
          },
          "courses": [
            "MKT-LEGACY"
          ]
        }
      ]
    },
    {
      "id": "money",
      "name": {
        "en": "School of Money",
        "ur": "School of Money"
      },
      "tagline": {
        "en": "Budgeting and long-term thinking — literacy, not advice",
        "ur": "Budget aur long-term soch — literacy, advice nahi"
      },
      "status": "live",
      "honesty": true,
      "programs": [
        {
          "id": "personal-money",
          "name": {
            "en": "Personal Money Systems",
            "ur": "Personal Money Systems"
          },
          "courses": [
            "FIN-101",
            "FIN-201",
            "FIN-301"
          ]
        }
      ]
    }
  ],
  "courses": {
    "WEB-101": {
      "code": "WEB-101",
      "title": {
        "en": "How the Web Works",
        "ur": "Web Kaise Kaam Karti Hai"
      },
      "hours": 8,
      "status": "session",
      "prereqs": [],
      "program": "web-foundations",
      "school": "software",
      "outcomes": {
        "en": [
          "Explain client/server",
          "Trace URL→DNS→response",
          "Name browser vs server roles"
        ],
        "ur": [
          "Client/server samjhao",
          "URL→DNS→response trace",
          "Browser vs server roles"
        ]
      }
    },
    "WEB-102": {
      "code": "WEB-102",
      "title": {
        "en": "Reading & Writing HTML",
        "ur": "HTML Parho aur Likho"
      },
      "hours": 10,
      "status": "session",
      "prereqs": [
        "WEB-101"
      ],
      "program": "web-foundations",
      "school": "software",
      "outcomes": {
        "en": [
          "Write semantic HTML",
          "Explain accessibility basics",
          "Build a prospectus page"
        ],
        "ur": [
          "Semantic HTML",
          "Accessibility basics",
          "Prospectus page"
        ]
      }
    },
    "WEB-103": {
      "code": "WEB-103",
      "title": {
        "en": "CSS: Layout, Type, and Space",
        "ur": "CSS: Layout, Type, Space"
      },
      "hours": 12,
      "status": "session",
      "prereqs": [
        "WEB-102"
      ],
      "program": "web-foundations",
      "school": "software",
      "outcomes": {
        "en": [
          "Use box model, flex, grid",
          "Set a type scale",
          "Build responsive layouts"
        ],
        "ur": [
          "Box model, flex, grid",
          "Type scale",
          "Responsive layouts"
        ]
      }
    },
    "FE-201": {
      "code": "FE-201",
      "title": {
        "en": "JavaScript from Zero",
        "ur": "JavaScript Zero Se"
      },
      "hours": 18,
      "status": "session",
      "prereqs": [
        "WEB-103"
      ],
      "program": "frontend",
      "school": "software",
      "outcomes": {
        "en": [
          "Use variables, functions, arrays",
          "Read error messages",
          "Pass graded drills"
        ],
        "ur": [
          "Variables, functions, arrays",
          "Errors parho",
          "Drills pass"
        ]
      }
    },
    "FE-202": {
      "code": "FE-202",
      "title": {
        "en": "The DOM and Events",
        "ur": "DOM aur Events"
      },
      "hours": 10,
      "status": "announced",
      "prereqs": [
        "FE-201"
      ],
      "program": "frontend",
      "school": "software"
    },
    "FE-203": {
      "code": "FE-203",
      "title": {
        "en": "UI Craft: Components Without Frameworks",
        "ur": "UI Craft: Bina Framework"
      },
      "hours": 12,
      "status": "announced",
      "prereqs": [
        "FE-202"
      ],
      "program": "frontend",
      "school": "software"
    },
    "FE-204": {
      "code": "FE-204",
      "title": {
        "en": "State, Storage, and Offline",
        "ur": "State, Storage, Offline"
      },
      "hours": 10,
      "status": "announced",
      "prereqs": [
        "FE-203"
      ],
      "program": "frontend",
      "school": "software"
    },
    "BE-301": {
      "code": "BE-301",
      "title": {
        "en": "APIs and HTTP, Explained",
        "ur": "APIs aur HTTP"
      },
      "hours": 10,
      "status": "announced",
      "prereqs": [
        "FE-201"
      ],
      "program": "backend",
      "school": "software"
    },
    "BE-302": {
      "code": "BE-302",
      "title": {
        "en": "Data: Modeling and Databases on Paper",
        "ur": "Data Modeling"
      },
      "hours": 12,
      "status": "announced",
      "prereqs": [
        "BE-301"
      ],
      "program": "backend",
      "school": "software"
    },
    "BE-303": {
      "code": "BE-303",
      "title": {
        "en": "Auth and Security Concepts",
        "ur": "Auth aur Security"
      },
      "hours": 10,
      "status": "announced",
      "prereqs": [
        "BE-302"
      ],
      "program": "backend",
      "school": "software"
    },
    "BE-304": {
      "code": "BE-304",
      "title": {
        "en": "Deployment Literacy",
        "ur": "Deployment Literacy"
      },
      "hours": 6,
      "status": "announced",
      "prereqs": [
        "BE-301"
      ],
      "program": "backend",
      "school": "software"
    },
    "APP-401": {
      "code": "APP-401",
      "title": {
        "en": "Anatomy of a PWA",
        "ur": "PWA Anatomy"
      },
      "hours": 8,
      "status": "announced",
      "prereqs": [
        "FE-204",
        "BE-301"
      ],
      "program": "app-builder",
      "school": "software"
    },
    "APP-402": {
      "code": "APP-402",
      "title": {
        "en": "Build & Ship Your First App",
        "ur": "Pehli App Ship"
      },
      "hours": 20,
      "status": "announced",
      "prereqs": [
        "APP-401"
      ],
      "program": "app-builder",
      "school": "software"
    },
    "APP-403": {
      "code": "APP-403",
      "title": {
        "en": "The Shipping Mindset",
        "ur": "Shipping Mindset"
      },
      "hours": 6,
      "status": "announced",
      "prereqs": [
        "APP-402"
      ],
      "program": "app-builder",
      "school": "software"
    },
    "MKT-LEGACY": {
      "code": "MKT",
      "title": {
        "en": "Market Literacy Tracks",
        "ur": "Market Literacy Tracks"
      },
      "hours": 40,
      "status": "session",
      "prereqs": [],
      "program": "market-literacy",
      "school": "markets",
      "legacy": true
    },
    "FIN-101": {
      "code": "FIN-101",
      "title": {
        "en": "Budgeting Systems",
        "ur": "Budgeting Systems"
      },
      "hours": 8,
      "status": "session",
      "prereqs": [],
      "program": "personal-money",
      "school": "money",
      "outcomes": {
        "en": [
          "Map income, needs, wants, savings",
          "Sketch a zero-based month",
          "Run a weekly review ritual"
        ],
        "ur": [
          "Income, needs, wants, savings map",
          "Zero-based month sketch",
          "Weekly review ritual"
        ]
      }
    },
    "FIN-201": {
      "code": "FIN-201",
      "title": {
        "en": "Saving & Debt in Context",
        "ur": "Saving & Debt"
      },
      "hours": 10,
      "status": "session",
      "prereqs": [
        "FIN-101"
      ],
      "program": "personal-money",
      "school": "money",
      "outcomes": {
        "en": [
          "Size a small emergency buffer",
          "Distinguish high-cost vs tool debt",
          "Adapt plans to local context"
        ],
        "ur": [
          "Chhota emergency buffer",
          "High-cost vs tool debt",
          "Local context adapt"
        ]
      }
    },
    "FIN-301": {
      "code": "FIN-301",
      "title": {
        "en": "Long-Term Thinking",
        "ur": "Long-Term Thinking"
      },
      "hours": 8,
      "status": "session",
      "prereqs": [
        "FIN-201"
      ],
      "program": "personal-money",
      "school": "money",
      "outcomes": {
        "en": [
          "Match goals to time horizons",
          "Name risk types without hype",
          "Write values → tradeoffs → action"
        ],
        "ur": [
          "Goals → horizons",
          "Risk types bina hype",
          "Values → tradeoffs → action"
        ]
      }
    }
  }
};

export function getCourse(code){ return CATALOG.courses[code] || null; }
export function getSchool(id){ return CATALOG.schools.find(s => s.id === id) || null; }
export function sessionCourses(){ return Object.values(CATALOG.courses).filter(c => c.status === 'session' && !c.legacy); }
export function prereqsMet(code, completed){
  const c = getCourse(code); if(!c) return false;
  return (c.prereqs||[]).every(p => completed.includes(p));
}
