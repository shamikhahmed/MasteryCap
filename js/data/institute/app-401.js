/* APP-401 — In Session */
export const COURSE = {
  "code": "APP-401",
  "title": {
    "en": "Anatomy of a PWA",
    "ur": "PWA Anatomy"
  },
  "hours": 8,
  "lessons": [
    {
      "id": "app401-1",
      "title": {
        "en": "Manifest",
        "ur": "Manifest"
      },
      "objective": {
        "en": "Explain web app manifest role.",
        "ur": "Manifest role."
      },
      "warmUp": {
        "en": "What makes “Add to Home Screen” possible?",
        "ur": "A2HS kaise?"
      },
      "teach": {
        "en": "<p>manifest.webmanifest: name, icons, display, theme. Tells the OS how to install the app shell.</p>",
        "ur": "<p>manifest: name, icons, display, theme. OS ko install batata.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Manifest is the app’s ID card for the phone home screen.</p>",
          "ur": "<p>Manifest = home screen ID card.</p>"
        },
        "career": {
          "en": "<p>Maskable icons + correct sizes prevent ugly installs. display standalone matters.</p>",
          "ur": "<p>Maskable icons + sizes. display standalone.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Manifest = install metadata file.</p>",
          "ur": "<p><strong>Glossary:</strong> Manifest = install metadata.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Manifest helps:",
            "ur": "Manifest:"
          },
          "opts": {
            "en": [
              "Install metadata",
              "SQL joins",
              "Tax rates"
            ],
            "ur": [
              "Install metadata",
              "SQL",
              "Tax"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "PWA install.",
            "ur": "Install."
          }
        },
        {
          "q": {
            "en": "Icons should include:",
            "ur": "Icons mein kya hona chahiye:"
          },
          "opts": {
            "en": [
              "Proper sizes / maskable",
              "Only 16px forever",
              "None"
            ],
            "ur": [
              "Sizes/maskable",
              "Sirf 16px",
              "None"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "OS polish.",
            "ur": "OS."
          }
        },
        {
          "q": {
            "en": "display standalone:",
            "ur": "standalone:"
          },
          "opts": {
            "en": [
              "App-like chrome",
              "Forces ads",
              "Disables JS"
            ],
            "ur": [
              "App-like",
              "Ads",
              "No JS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Shell feel.",
            "ur": "Shell."
          }
        }
      ],
      "practice": {
        "en": "Open manifest.webmanifest in this repo.",
        "ur": "Repo mein manifest kholo."
      },
      "exitTicket": {
        "en": "Which field surprised you?",
        "ur": "Kaunsa field?"
      },
      "cards": [
        {
          "front": {
            "en": "Manifest",
            "ur": "Manifest"
          },
          "back": {
            "en": "Install metadata",
            "ur": "Install meta"
          }
        },
        {
          "front": {
            "en": "standalone",
            "ur": "standalone"
          },
          "back": {
            "en": "App-like UI",
            "ur": "App-like"
          }
        }
      ]
    },
    {
      "id": "app401-2",
      "title": {
        "en": "Service Worker Cache",
        "ur": "SW Cache"
      },
      "objective": {
        "en": "Describe cache allowlist pattern.",
        "ur": "Cache allowlist."
      },
      "warmUp": {
        "en": "Why list files explicitly?",
        "ur": "Files explicit list kyun?"
      },
      "teach": {
        "en": "<p>MasteryCap SW precaches an allowlist. Updates bump CACHE. Precache too much → quota pain; too little → broken offline.</p>",
        "ur": "<p>SW allowlist precache. CACHE bump. Zyada = quota; kam = broken offline.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Pack a school bag with only needed books — that is the allowlist.</p>",
          "ur": "<p>School bag sirf zaroori books — allowlist.</p>"
        },
        "career": {
          "en": "<p>Precache shell; runtime cache carefully. Test airplane mode every release.</p>",
          "ur": "<p>Shell precache; runtime careful. Har release airplane test.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Precache = save at install. Allowlist = only these files.</p>",
          "ur": "<p><strong>Glossary:</strong> Precache install pe save. Allowlist = ye files.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Allowlist means:",
            "ur": "Allowlist:"
          },
          "opts": {
            "en": [
              "Only listed assets cached",
              "Cache the whole internet",
              "Cache nothing ever"
            ],
            "ur": [
              "Listed assets",
              "Whole internet",
              "Nothing"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Intentional.",
            "ur": "Intentional."
          }
        },
        {
          "q": {
            "en": "Bump CACHE to:",
            "ur": "CACHE bump:"
          },
          "opts": {
            "en": [
              "Invalidate old shell",
              "Change domain",
              "Mint tokens"
            ],
            "ur": [
              "Old shell invalidate",
              "Domain",
              "Mint"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Fresh.",
            "ur": "Fresh."
          }
        },
        {
          "q": {
            "en": "Airplane test proves:",
            "ur": "Airplane test kya prove karta:"
          },
          "opts": {
            "en": [
              "Offline shell works",
              "Tax compliance",
              "Broker latency"
            ],
            "ur": [
              "Offline works",
              "Tax",
              "Broker"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Reality check.",
            "ur": "Reality."
          }
        }
      ],
      "practice": {
        "en": "Find CACHE string in sw.js.",
        "ur": "sw.js mein CACHE."
      },
      "exitTicket": {
        "en": "What would you add to ASSETS next?",
        "ur": "ASSETS mein next kya?"
      },
      "cards": [
        {
          "front": {
            "en": "Allowlist",
            "ur": "Allowlist"
          },
          "back": {
            "en": "Explicit assets",
            "ur": "Explicit"
          }
        },
        {
          "front": {
            "en": "Airplane",
            "ur": "Airplane"
          },
          "back": {
            "en": "Offline proof",
            "ur": "Offline proof"
          }
        }
      ]
    },
    {
      "id": "app401-3",
      "title": {
        "en": "MasteryCap as Worked Example",
        "ur": "MasteryCap Example"
      },
      "objective": {
        "en": "Dissect MasteryCap as a PWA specimen.",
        "ur": "MasteryCap PWA dissect."
      },
      "warmUp": {
        "en": "Which storage does progress use?",
        "ur": "Progress kaunsa storage?"
      },
      "teach": {
        "en": "<p>Worked example: localStorage namespace, institute progress, SW, no accounts. Limits stated in-product. Study the seams.</p>",
        "ur": "<p>Example: localStorage namespace, institute progress, SW, no accounts. Limits in-product.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>This app is a frog dissection for PWAs — look inside kindly.</p>",
          "ur": "<p>PWA frog dissection — andar dekho.</p>"
        },
        "career": {
          "en": "<p>Copy patterns, not complexity. Cap family conventions: version discipline, honesty copy.</p>",
          "ur": "<p>Patterns copy — complexity nahi. Version + honesty.</p>"
        },
        "adult": {
          "en": "<p>Read HANDOVER.md after this lesson.</p>",
          "ur": "<p>Is lesson ke baad HANDOVER.md.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "MasteryCap avoids:",
            "ur": "MasteryCap kya avoid karta:"
          },
          "opts": {
            "en": [
              "Accounts / cloud brain",
              "Offline use",
              "Local progress"
            ],
            "ur": [
              "Accounts/cloud brain",
              "Offline",
              "Local progress"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "By design.",
            "ur": "Design."
          }
        },
        {
          "q": {
            "en": "Progress is stored:",
            "ur": "Progress kahan store hoti:"
          },
          "opts": {
            "en": [
              "On device",
              "Only in Capricorn HQ",
              "On Instagram"
            ],
            "ur": [
              "Device",
              "HQ",
              "IG"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Local.",
            "ur": "Local."
          }
        },
        {
          "q": {
            "en": "Honesty copy should be:",
            "ur": "Honesty copy kaisi honi chahiye:"
          },
          "opts": {
            "en": [
              "Visible in product",
              "Hidden forever",
              "Replaced by hype"
            ],
            "ur": [
              "In product",
              "Hidden",
              "Hype"
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
        "en": "List 3 MasteryCap files that make it a PWA.",
        "ur": "3 PWA files list."
      },
      "exitTicket": {
        "en": "What will you steal for your app?",
        "ur": "Apni app ke liye kya churaoge?"
      },
      "cards": [
        {
          "front": {
            "en": "Worked example",
            "ur": "Example"
          },
          "back": {
            "en": "MasteryCap itself",
            "ur": "MasteryCap"
          }
        },
        {
          "front": {
            "en": "No accounts",
            "ur": "No accounts"
          },
          "back": {
            "en": "Local-first",
            "ur": "Local-first"
          }
        }
      ]
    }
  ],
  "finalQuiz": [
    {
      "q": {
        "en": "Manifest provides",
        "ur": "Manifest"
      },
      "opts": {
        "en": [
          "Install metadata",
          "SQL schemas",
          "Tax tables"
        ],
        "ur": [
          "Install meta",
          "SQL",
          "Tax"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Install.",
        "ur": "Install."
      }
    },
    {
      "q": {
        "en": "SW allowlist",
        "ur": "Allowlist"
      },
      "opts": {
        "en": [
          "Caches listed assets",
          "Caches all URLs",
          "Caches none by force"
        ],
        "ur": [
          "Listed",
          "All URLs",
          "None"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Explicit.",
        "ur": "Explicit."
      }
    },
    {
      "q": {
        "en": "CACHE bump",
        "ur": "Bump"
      },
      "opts": {
        "en": [
          "Refreshes shell",
          "Deletes domains",
          "Creates brokers"
        ],
        "ur": [
          "Shell refresh",
          "Domains",
          "Brokers"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Updates.",
        "ur": "Updates."
      }
    },
    {
      "q": {
        "en": "MasteryCap data",
        "ur": "Data"
      },
      "opts": {
        "en": [
          "Local device",
          "HQ only",
          "Broker cloud"
        ],
        "ur": [
          "Local",
          "HQ",
          "Broker"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Offline.",
        "ur": "Offline."
      }
    },
    {
      "q": {
        "en": "Honesty belongs",
        "ur": "Honesty"
      },
      "opts": {
        "en": [
          "In UI",
          "In secret only",
          "Nowhere"
        ],
        "ur": [
          "UI",
          "Secret",
          "Nowhere"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Visible.",
        "ur": "Visible."
      }
    }
  ],
  "passScore": 85,
  "project": {
    "id": "pwa-literacy-attest",
    "title": {
      "en": "PWA literacy attestations",
      "ur": "PWA literacy attest"
    },
    "items": [
      {
        "id": "sw",
        "en": "Explain CACHE bump in one sentence",
        "ur": "CACHE bump ek jumla"
      },
      {
        "id": "offline",
        "en": "Name what works offline in this app shell",
        "ur": "Offline kya chalta"
      },
      {
        "id": "install",
        "en": "Describe Add to Home Screen vs App Store",
        "ur": "A2HS vs App Store"
      }
    ]
  }
};
export default COURSE;
