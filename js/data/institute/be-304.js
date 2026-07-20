/* BE-304 — In Session */
export const COURSE = {
  "code": "BE-304",
  "title": {
    "en": "Deployment Literacy",
    "ur": "Deployment Literacy"
  },
  "hours": 6,
  "lessons": [
    {
      "id": "be304-1",
      "title": {
        "en": "Static vs Server",
        "ur": "Static vs Server"
      },
      "objective": {
        "en": "Contrast static hosting vs server apps.",
        "ur": "Static vs server."
      },
      "warmUp": {
        "en": "Can GitHub Pages run a private database?",
        "ur": "GH Pages private DB?"
      },
      "teach": {
        "en": "<p>Static: files to CDN/host (HTML/CSS/JS). Server apps: run code that talks to DBs. PWAs often static + client storage.</p>",
        "ur": "<p>Static: files CDN. Server apps: code + DB. PWAs aksar static + client storage.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Static is like handing out printed pamphlets. Servers are like a shop that answers each customer differently.</p>",
          "ur": "<p>Static pamphlets. Server shop jo har customer alag jawab.</p>"
        },
        "career": {
          "en": "<p>Choose static when possible for cost/security surface. Add servers when you need shared authoritative state.</p>",
          "ur": "<p>Possible ho to static. Shared authoritative state pe servers.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Static host = serves files. Server app = runs logic per request.</p>",
          "ur": "<p><strong>Glossary:</strong> Static files. Server logic per request.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "GitHub Pages is great for:",
            "ur": "GH Pages:"
          },
          "opts": {
            "en": [
              "Static sites/PWAs",
              "Private multi-tenant DBs",
              "Payroll systems"
            ],
            "ur": [
              "Static/PWA",
              "Private DB",
              "Payroll"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Static surface.",
            "ur": "Static."
          }
        },
        {
          "q": {
            "en": "Server apps needed when:",
            "ur": "Servers jab:"
          },
          "opts": {
            "en": [
              "Shared authoritative backend state",
              "Only local themes",
              "Only fonts"
            ],
            "ur": [
              "Shared backend state",
              "Themes",
              "Fonts"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Central truth.",
            "ur": "Central."
          }
        },
        {
          "q": {
            "en": "MasteryCap progress lives:",
            "ur": "MasteryCap progress:"
          },
          "opts": {
            "en": [
              "On device (local)",
              "Only Capricorn HQ",
              "On a broker"
            ],
            "ur": [
              "Device pe",
              "HQ",
              "Broker"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Offline-first.",
            "ur": "Offline."
          }
        }
      ],
      "practice": {
        "en": "Decide: static or server for a shared classroom scoreboard?",
        "ur": "Classroom scoreboard: static ya server?"
      },
      "exitTicket": {
        "en": "Why?",
        "ur": "Kyun?"
      },
      "cards": [
        {
          "front": {
            "en": "Static",
            "ur": "Static"
          },
          "back": {
            "en": "Files to host/CDN",
            "ur": "Files"
          }
        },
        {
          "front": {
            "en": "Server",
            "ur": "Server"
          },
          "back": {
            "en": "Per-request logic",
            "ur": "Per-request"
          }
        }
      ]
    },
    {
      "id": "be304-2",
      "title": {
        "en": "DNS HTTPS CI",
        "ur": "DNS HTTPS CI"
      },
      "objective": {
        "en": "Explain DNS, HTTPS, CI at literacy level.",
        "ur": "DNS, HTTPS, CI literacy."
      },
      "warmUp": {
        "en": "What does the lock icon roughly mean?",
        "ur": "Lock icon roughly?"
      },
      "teach": {
        "en": "<p>DNS maps names→IPs. HTTPS encrypts in transit (certs). CI runs checks on each change. You need the map, not vendor trivia.</p>",
        "ur": "<p>DNS naam→IP. HTTPS transit encrypt. CI har change pe checks. Map chahiye — vendor trivia nahi.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>DNS is the phonebook. HTTPS is the sealed envelope. CI is the robot that tests before publish.</p>",
          "ur": "<p>DNS phonebook. HTTPS sealed envelope. CI test robot.</p>"
        },
        "career": {
          "en": "<p>Broken HTTPS is a ship blocker. Pin deploys to green CI.</p>",
          "ur": "<p>Broken HTTPS blocker. Green CI pe deploy.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> DNS = name lookup. HTTPS = encrypted web. CI = automatic checks.</p>",
          "ur": "<p><strong>Glossary:</strong> DNS lookup. HTTPS encrypted. CI auto checks.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "DNS maps:",
            "ur": "DNS:"
          },
          "opts": {
            "en": [
              "Names to addresses",
              "Passwords to hashes only",
              "CSS to GPU"
            ],
            "ur": [
              "Names→addresses",
              "Passwords",
              "CSS→GPU"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Lookup.",
            "ur": "Lookup."
          }
        },
        {
          "q": {
            "en": "HTTPS protects:",
            "ur": "HTTPS:"
          },
          "opts": {
            "en": [
              "Data in transit",
              "Your localStorage forever",
              "Disk formatting"
            ],
            "ur": [
              "In transit",
              "localStorage forever",
              "Disk"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Transit.",
            "ur": "Transit."
          }
        },
        {
          "q": {
            "en": "CI helps:",
            "ur": "CI:"
          },
          "opts": {
            "en": [
              "Catch breaks before users",
              "Replace designers",
              "Mine coins"
            ],
            "ur": [
              "Breaks catch",
              "Designers",
              "Mine"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Quality gate.",
            "ur": "Gate."
          }
        }
      ],
      "practice": {
        "en": "Write a 4-step GitHub Pages deploy checklist.",
        "ur": "GH Pages 4-step checklist."
      },
      "exitTicket": {
        "en": "Which step do people skip most?",
        "ur": "Kaunsa step skip?"
      },
      "cards": [
        {
          "front": {
            "en": "DNS",
            "ur": "DNS"
          },
          "back": {
            "en": "Name→IP",
            "ur": "Name→IP"
          }
        },
        {
          "front": {
            "en": "CI",
            "ur": "CI"
          },
          "back": {
            "en": "Auto checks",
            "ur": "Auto checks"
          }
        }
      ]
    },
    {
      "id": "be304-3",
      "title": {
        "en": "Ship Checklist",
        "ur": "Ship Checklist"
      },
      "objective": {
        "en": "Complete a deploy literacy checklist.",
        "ur": "Deploy checklist."
      },
      "warmUp": {
        "en": "What is “done” for a static PWA ship?",
        "ur": "Static PWA ship done?"
      },
      "teach": {
        "en": "<p>Checklist: build works offline sample, CACHE bumped, version docs, honesty limits stated, smoke on phone width.</p>",
        "ur": "<p>Checklist: offline sample, CACHE bump, version docs, honesty, phone width smoke.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Before share link: open on phone, turn airplane mode, confirm it still opens.</p>",
          "ur": "<p>Share se pehle: phone + airplane — ab bhi open?</p>"
        },
        "career": {
          "en": "<p>Release notes + rollback plan. Tag versions. Never silent breaking cache.</p>",
          "ur": "<p>Release notes + rollback. Version tags. Silent cache break nahi.</p>"
        },
        "adult": {
          "en": "<p>Go line by line. Done means attested.</p>",
          "ur": "<p>Line by line. Done = attested.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "CACHE bump prevents:",
            "ur": "CACHE bump:"
          },
          "opts": {
            "en": [
              "Stale SW shells",
              "Rain",
              "Tax"
            ],
            "ur": [
              "Stale SW",
              "Rain",
              "Tax"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Fresh assets.",
            "ur": "Fresh."
          }
        },
        {
          "q": {
            "en": "Phone-width check catches:",
            "ur": "Phone check:"
          },
          "opts": {
            "en": [
              "Layout breaks",
              "Broker fees",
              "GPU brands"
            ],
            "ur": [
              "Layout breaks",
              "Fees",
              "GPU"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Real devices.",
            "ur": "Devices."
          }
        },
        {
          "q": {
            "en": "Honesty limits belong:",
            "ur": "Honesty:"
          },
          "opts": {
            "en": [
              "In-product",
              "Only secret slides",
              "Never"
            ],
            "ur": [
              "In-product",
              "Secret slides",
              "Never"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Trust.",
            "ur": "Trust."
          }
        }
      ],
      "practice": {
        "en": "Attest BE-304 checklist items.",
        "ur": "BE-304 checklist."
      },
      "exitTicket": {
        "en": "Your next step beyond this app?",
        "ur": "Is app ke baad next?"
      },
      "cards": [
        {
          "front": {
            "en": "Ship",
            "ur": "Ship"
          },
          "back": {
            "en": "Checklist complete",
            "ur": "Checklist"
          }
        },
        {
          "front": {
            "en": "Rollback",
            "ur": "Rollback"
          },
          "back": {
            "en": "Plan undo",
            "ur": "Undo plan"
          }
        }
      ]
    }
  ],
  "finalQuiz": [
    {
      "q": {
        "en": "Static hosting serves",
        "ur": "Static"
      },
      "opts": {
        "en": [
          "Files",
          "Private DB engines",
          "Payroll ledgers"
        ],
        "ur": [
          "Files",
          "Private DB",
          "Payroll"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Files.",
        "ur": "Files."
      }
    },
    {
      "q": {
        "en": "DNS maps",
        "ur": "DNS"
      },
      "opts": {
        "en": [
          "Names to IPs",
          "Fonts to GPUs",
          "Trades to profits"
        ],
        "ur": [
          "Names→IPs",
          "Fonts",
          "Trades"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Lookup.",
        "ur": "Lookup."
      }
    },
    {
      "q": {
        "en": "HTTPS is about",
        "ur": "HTTPS"
      },
      "opts": {
        "en": [
          "Transit encryption",
          "Guaranteed income",
          "Emoji"
        ],
        "ur": [
          "Transit encrypt",
          "Income",
          "Emoji"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "TLS.",
        "ur": "TLS."
      }
    },
    {
      "q": {
        "en": "CI runs",
        "ur": "CI"
      },
      "opts": {
        "en": [
          "Automated checks",
          "Manual only vibes",
          "Broker APIs"
        ],
        "ur": [
          "Auto checks",
          "Vibes",
          "Broker"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Gates.",
        "ur": "Gates."
      }
    },
    {
      "q": {
        "en": "PWA CACHE must",
        "ur": "CACHE"
      },
      "opts": {
        "en": [
          "Bump on release",
          "Never change",
          "Equal version 0"
        ],
        "ur": [
          "Release pe bump",
          "Kabhi nahi",
          "v0"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Fresh.",
        "ur": "Fresh."
      }
    }
  ],
  "passScore": 85,
  "project": {
    "id": "deploy-checklist",
    "title": {
      "en": "Deploy literacy checklist",
      "ur": "Deploy checklist"
    },
    "items": [
      {
        "id": "offline",
        "en": "Verified offline open sample",
        "ur": "Offline open verify"
      },
      {
        "id": "cache",
        "en": "Understood CACHE bump rule",
        "ur": "CACHE bump rule"
      },
      {
        "id": "phone",
        "en": "Checked ~375px layout mentally/on device",
        "ur": "~375px check"
      }
    ]
  }
};
export default COURSE;
