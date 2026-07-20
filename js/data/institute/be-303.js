/* BE-303 — In Session */
export const COURSE = {
  "code": "BE-303",
  "title": {
    "en": "Auth and Security Concepts",
    "ur": "Auth aur Security"
  },
  "hours": 10,
  "lessons": [
    {
      "id": "be303-1",
      "title": {
        "en": "Hashing vs Encryption",
        "ur": "Hash vs Encrypt"
      },
      "objective": {
        "en": "Distinguish hashing and encryption.",
        "ur": "Hashing vs encryption."
      },
      "warmUp": {
        "en": "Should passwords be reversible?",
        "ur": "Passwords reversible?"
      },
      "teach": {
        "en": "<p>Hashing is one-way (verify by compare). Encryption is two-way with keys. Passwords: hash+salt, never store plaintext.</p>",
        "ur": "<p>Hashing one-way. Encryption two-way keys. Passwords: hash+salt, plaintext nahi.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Hashing is like blending a smoothie — you cannot un-blend to the fruit. Encryption is a lockbox with a key.</p>",
          "ur": "<p>Hashing smoothie — wapas fruit nahi. Encryption lockbox + key.</p>"
        },
        "career": {
          "en": "<p>Know threat models: at-rest vs in-transit. TLS ≠ “we hash passwords.”</p>",
          "ur": "<p>Threat models: at-rest vs in-transit. TLS ≠ password hashing.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Hash = one-way fingerprint. Encrypt = scramble with key so you can unscramble.</p>",
          "ur": "<p><strong>Glossary:</strong> Hash one-way. Encrypt key se scramble/unscramble.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Password storage should use:",
            "ur": "Passwords:"
          },
          "opts": {
            "en": [
              "Hash + salt",
              "Plain text files",
              "Public chalkboards"
            ],
            "ur": [
              "Hash + salt",
              "Plain text",
              "Chalkboard"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Never plaintext.",
            "ur": "Plaintext nahi."
          }
        },
        {
          "q": {
            "en": "Encryption is:",
            "ur": "Encryption:"
          },
          "opts": {
            "en": [
              "Reversible with a key",
              "Always one-way",
              "A CSS property"
            ],
            "ur": [
              "Key se reversible",
              "Hamesha one-way",
              "CSS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Two-way.",
            "ur": "Two-way."
          }
        },
        {
          "q": {
            "en": "Hashing is best for:",
            "ur": "Hashing:"
          },
          "opts": {
            "en": [
              "Verifying secrets without revealing them",
              "Styling buttons",
              "Routing packets"
            ],
            "ur": [
              "Secrets verify",
              "Buttons",
              "Packets"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Compare digests.",
            "ur": "Digests."
          }
        }
      ],
      "practice": {
        "en": "Write one sentence: why not plaintext passwords.",
        "ur": "Plaintext passwords kyun nahi — ek jumla."
      },
      "exitTicket": {
        "en": "Where might encryption still be needed?",
        "ur": "Encryption kahan?"
      },
      "cards": [
        {
          "front": {
            "en": "Hash",
            "ur": "Hash"
          },
          "back": {
            "en": "One-way",
            "ur": "One-way"
          }
        },
        {
          "front": {
            "en": "Encrypt",
            "ur": "Encrypt"
          },
          "back": {
            "en": "Keyed reversible",
            "ur": "Keyed"
          }
        }
      ]
    },
    {
      "id": "be303-2",
      "title": {
        "en": "Sessions vs Tokens",
        "ur": "Sessions vs Tokens"
      },
      "objective": {
        "en": "Explain session cookies vs bearer tokens at literacy level.",
        "ur": "Sessions vs tokens literacy."
      },
      "warmUp": {
        "en": "How does a site remember you after login?",
        "ur": "Login ke baad site kaise yaad?"
      },
      "teach": {
        "en": "<p>Sessions: server stores login state, browser holds session id cookie. Tokens: client presents signed token. Both need careful storage and expiry.</p>",
        "ur": "<p>Sessions: server state + cookie id. Tokens: client signed token. Storage + expiry careful.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>A wristband at an event proves you paid. Session/token is that wristband for websites.</p>",
          "ur": "<p>Event wristband = proof. Session/token websites ke liye wristband.</p>"
        },
        "career": {
          "en": "<p>XSS steals tokens in JS-accessible storage; prefer httpOnly cookies when you control the server. Offline PWAs often avoid classical auth.</p>",
          "ur": "<p>XSS tokens chura sakta; httpOnly cookies. Offline PWAs aksar classical auth avoid.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Session = server remembers you. Token = you carry a signed pass.</p>",
          "ur": "<p><strong>Glossary:</strong> Session server yaad. Token signed pass.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Session ids often live in:",
            "ur": "Session ids:"
          },
          "opts": {
            "en": [
              "Cookies",
              "Film grain",
              "Geist files"
            ],
            "ur": [
              "Cookies",
              "Grain",
              "Geist"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Browser cookie jar.",
            "ur": "Cookies."
          }
        },
        {
          "q": {
            "en": "Tokens are often:",
            "ur": "Tokens:"
          },
          "opts": {
            "en": [
              "Presented by the client",
              "Printed on paper only",
              "CSS variables"
            ],
            "ur": [
              "Client present",
              "Paper",
              "CSS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Authorization header common.",
            "ur": "Auth header."
          }
        },
        {
          "q": {
            "en": "Both need:",
            "ur": "Dono:"
          },
          "opts": {
            "en": [
              "Expiry / revocation thinking",
              "Infinite forever login",
              "No HTTPS ever"
            ],
            "ur": [
              "Expiry thinking",
              "Forever",
              "No HTTPS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Security hygiene.",
            "ur": "Hygiene."
          }
        }
      ],
      "practice": {
        "en": "List 2 risks of forever tokens.",
        "ur": "Forever tokens ke 2 risks."
      },
      "exitTicket": {
        "en": "Which model fits a pure offline PWA?",
        "ur": "Offline PWA pe kaunsa?"
      },
      "cards": [
        {
          "front": {
            "en": "Session",
            "ur": "Session"
          },
          "back": {
            "en": "Server-side memory",
            "ur": "Server memory"
          }
        },
        {
          "front": {
            "en": "Token",
            "ur": "Token"
          },
          "back": {
            "en": "Client-presented pass",
            "ur": "Client pass"
          }
        }
      ]
    },
    {
      "id": "be303-3",
      "title": {
        "en": "OWASP Top Risks Literacy",
        "ur": "OWASP Literacy"
      },
      "objective": {
        "en": "Recognize common web risks by name.",
        "ur": "Common web risks."
      },
      "warmUp": {
        "en": "What is injection in plain language?",
        "ur": "Injection plain language?"
      },
      "teach": {
        "en": "<p>Literacy tour: injection, XSS, broken access control, misconfig, vulnerable components. Spot patterns in short case studies — not fear marketing.</p>",
        "ur": "<p>Literacy: injection, XSS, access control, misconfig, vulnerable components. Case studies — fear marketing nahi.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Bad guys try to trick apps: sneak commands into forms (injection) or steal scripts into pages (XSS).</p>",
          "ur": "<p>Attackers trick: forms mein commands (injection) ya pages mein scripts (XSS).</p>"
        },
        "career": {
          "en": "<p>Prioritize by exploitability × impact. Dependency scanning matters as much as your own code.</p>",
          "ur": "<p>Exploitability × impact. Dependencies bhi code jitna matter.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> XSS = sneaky script in a page. Injection = tricking the app with hostile input.</p>",
          "ur": "<p><strong>Glossary:</strong> XSS sneaky script. Injection hostile input.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "XSS is about:",
            "ur": "XSS:"
          },
          "opts": {
            "en": [
              "Hostile scripts in pages",
              "Faster Wi‑Fi",
              "Pretty fonts"
            ],
            "ur": [
              "Hostile scripts",
              "Wi‑Fi",
              "Fonts"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Output encoding matters.",
            "ur": "Encoding."
          }
        },
        {
          "q": {
            "en": "Injection tricks:",
            "ur": "Injection:"
          },
          "opts": {
            "en": [
              "Inputs treated as code/commands",
              "Only CSS colors",
              "Only wallpapers"
            ],
            "ur": [
              "Input as code",
              "CSS",
              "Wallpaper"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Validate/parameterize.",
            "ur": "Validate."
          }
        },
        {
          "q": {
            "en": "Broken access control means:",
            "ur": "Access control:"
          },
          "opts": {
            "en": [
              "Users reach data they should not",
              "SSL is perfect",
              "JSON is pretty"
            ],
            "ur": [
              "Unauthorized data",
              "SSL perfect",
              "Pretty JSON"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Authorize every action.",
            "ur": "Authorize."
          }
        }
      ],
      "practice": {
        "en": "Find one MasteryCap honesty limit that reduces risk.",
        "ur": "MasteryCap ek honesty limit — risk kam."
      },
      "exitTicket": {
        "en": "Which risk scares you most and why?",
        "ur": "Kaunsa risk — kyun?"
      },
      "cards": [
        {
          "front": {
            "en": "XSS",
            "ur": "XSS"
          },
          "back": {
            "en": "Script injection in page",
            "ur": "Page pe script"
          }
        },
        {
          "front": {
            "en": "Access control",
            "ur": "Access"
          },
          "back": {
            "en": "Who can do what",
            "ur": "Kaun kya kar sake"
          }
        }
      ]
    },
    {
      "id": "be303-4",
      "title": {
        "en": "Case Study Flaws",
        "ur": "Case Studies"
      },
      "objective": {
        "en": "Spot flaws in short scenarios.",
        "ur": "Scenarios mein flaws."
      },
      "warmUp": {
        "en": "Is “hidden button” security?",
        "ur": "Hidden button security?"
      },
      "teach": {
        "en": "<p>Case studies: plaintext password DB; admin URL secret; tokens in localStorage with XSS; trusting only client checks. Mark the flaw + fix direction.</p>",
        "ur": "<p>Cases: plaintext passwords; secret admin URL; tokens localStorage+XSS; sirf client checks. Flaw + fix.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>If security is only “nobody knows the link,” it is not security.</p>",
          "ur": "<p>Sirf “link kisi ko nahi” security nahi.</p>"
        },
        "career": {
          "en": "<p>Defense in depth: client UX checks + server enforcement. Assume clients are hostile.</p>",
          "ur": "<p>Defense in depth. Client hostile maan lo.</p>"
        },
        "adult": {
          "en": "<p>Read slowly. Name the flaw in one phrase.</p>",
          "ur": "<p>Ahista. Flaw ek phrase.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Security by obscurity is:",
            "ur": "Obscurity:"
          },
          "opts": {
            "en": [
              "Weak alone",
              "Enough forever",
              "A hash algorithm"
            ],
            "ur": [
              "Alone weak",
              "Forever enough",
              "Hash algo"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Need real controls.",
            "ur": "Real controls."
          }
        },
        {
          "q": {
            "en": "Client-only checks are:",
            "ur": "Client-only:"
          },
          "opts": {
            "en": [
              "Bypassable",
              "Unbreakable",
              "DNS-level"
            ],
            "ur": [
              "Bypassable",
              "Unbreakable",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Enforce server-side when you have one.",
            "ur": "Server enforce."
          }
        },
        {
          "q": {
            "en": "Tokens in JS storage + XSS:",
            "ur": "Tokens+XSS:"
          },
          "opts": {
            "en": [
              "Dangerous combo",
              "Perfectly safe",
              "Unrelated"
            ],
            "ur": [
              "Dangerous",
              "Safe",
              "Unrelated"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Stealable.",
            "ur": "Stealable."
          }
        }
      ],
      "practice": {
        "en": "Rewrite one flawed scenario with a fix.",
        "ur": "Ek scenario fix ke sath."
      },
      "exitTicket": {
        "en": "What will you never ship?",
        "ur": "Kya kabhi ship nahi?"
      },
      "cards": [
        {
          "front": {
            "en": "Obscurity",
            "ur": "Obscurity"
          },
          "back": {
            "en": "Weak alone",
            "ur": "Alone weak"
          }
        },
        {
          "front": {
            "en": "Enforce",
            "ur": "Enforce"
          },
          "back": {
            "en": "Server-side authz",
            "ur": "Server authz"
          }
        }
      ]
    }
  ],
  "finalQuiz": [
    {
      "q": {
        "en": "Passwords should be",
        "ur": "Passwords"
      },
      "opts": {
        "en": [
          "Hashed",
          "Plaintext",
          "Public"
        ],
        "ur": [
          "Hashed",
          "Plaintext",
          "Public"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Hash.",
        "ur": "Hash."
      }
    },
    {
      "q": {
        "en": "Encryption is",
        "ur": "Encryption"
      },
      "opts": {
        "en": [
          "Keyed reversible",
          "Always one-way",
          "A tab icon"
        ],
        "ur": [
          "Keyed reversible",
          "One-way",
          "Tab"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Keys.",
        "ur": "Keys."
      }
    },
    {
      "q": {
        "en": "XSS involves",
        "ur": "XSS"
      },
      "opts": {
        "en": [
          "Hostile scripts",
          "Flower pots",
          "Bench press"
        ],
        "ur": [
          "Hostile scripts",
          "Pots",
          "Bench"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Scripts.",
        "ur": "Scripts."
      }
    },
    {
      "q": {
        "en": "Obscurity alone",
        "ur": "Obscurity"
      },
      "opts": {
        "en": [
          "Is weak",
          "Is enough",
          "Replaces TLS"
        ],
        "ur": [
          "Weak",
          "Enough",
          "TLS"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Controls.",
        "ur": "Controls."
      }
    },
    {
      "q": {
        "en": "Client-only authz",
        "ur": "Client authz"
      },
      "opts": {
        "en": [
          "Can be bypassed",
          "Is perfect",
          "Fixes DNS"
        ],
        "ur": [
          "Bypass",
          "Perfect",
          "DNS"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Enforce properly.",
        "ur": "Enforce."
      }
    }
  ],
  "passScore": 85,
  "project": null
};
export default COURSE;
