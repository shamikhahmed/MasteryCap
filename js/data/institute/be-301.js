/* BE-301 — In Session */
export const COURSE = {
  "code": "BE-301",
  "title": {
    "en": "APIs and HTTP, Explained",
    "ur": "APIs aur HTTP"
  },
  "hours": 10,
  "lessons": [
    {
      "id": "be301-1",
      "title": {
        "en": "HTTP Request Shape",
        "ur": "HTTP Request"
      },
      "objective": {
        "en": "Name method, URL, headers, body.",
        "ur": "Method, URL, headers, body."
      },
      "warmUp": {
        "en": "What travels when an app “loads data”?",
        "ur": "Data load pe kya travel?"
      },
      "teach": {
        "en": "<p>HTTP request: method (GET/POST/…), URL, headers, optional body. Response: status, headers, body. REST shapes resources as URLs.</p>",
        "ur": "<p>HTTP request: method, URL, headers, body. Response: status, headers, body. REST resources as URLs.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>A request is a polite letter: “Please give me /notes.” The server replies with a status stamp (200 ok, 404 missing) and a message body.</p>",
          "ur": "<p>Request = letter: “/notes do.” Server stamp (200/404) + body.</p>"
        },
        "career": {
          "en": "<p>Design APIs around resources and nouns; keep verbs in methods. Versioning and idempotency matter in production.</p>",
          "ur": "<p>APIs resources/nouns; methods mein verbs. Versioning + idempotency.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> HTTP = web language for requests. Status code = short result number. API = agreed way to talk to a service.</p>",
          "ur": "<p><strong>Glossary:</strong> HTTP = request language. Status = result number. API = baat karne ka agreement.</p>"
        }
      },
      "visual": "http",
      "check": [
        {
          "q": {
            "en": "GET usually:",
            "ur": "GET:"
          },
          "opts": {
            "en": [
              "Reads a resource",
              "Deletes disks",
              "Mines crypto"
            ],
            "ur": [
              "Resource read",
              "Disk delete",
              "Crypto"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Safe read.",
            "ur": "Read."
          }
        },
        {
          "q": {
            "en": "404 means:",
            "ur": "404:"
          },
          "opts": {
            "en": [
              "Not found",
              "Password ok",
              "Payment done"
            ],
            "ur": [
              "Not found",
              "Password ok",
              "Payment"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Missing resource.",
            "ur": "Missing."
          }
        },
        {
          "q": {
            "en": "Headers carry:",
            "ur": "Headers:"
          },
          "opts": {
            "en": [
              "Metadata like content-type",
              "Only images",
              "Only GPU clocks"
            ],
            "ur": [
              "Metadata",
              "Images",
              "GPU"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Context.",
            "ur": "Context."
          }
        }
      ],
      "practice": {
        "en": "Open HTTP Lab and send a GET /notes.",
        "ur": "HTTP Lab: GET /notes."
      },
      "exitTicket": {
        "en": "Which status did you see?",
        "ur": "Kaunsa status?"
      },
      "cards": [
        {
          "front": {
            "en": "GET",
            "ur": "GET"
          },
          "back": {
            "en": "Read",
            "ur": "Read"
          }
        },
        {
          "front": {
            "en": "404",
            "ur": "404"
          },
          "back": {
            "en": "Not found",
            "ur": "Not found"
          }
        }
      ],
      "lab": true
    },
    {
      "id": "be301-2",
      "title": {
        "en": "JSON Bodies",
        "ur": "JSON Bodies"
      },
      "objective": {
        "en": "Read/write JSON payloads.",
        "ur": "JSON payloads."
      },
      "warmUp": {
        "en": "Why do APIs love JSON?",
        "ur": "APIs JSON kyun?"
      },
      "teach": {
        "en": "<p>JSON expresses objects/arrays as text. Clients parse JSON into JS values. Validate shape before trusting.</p>",
        "ur": "<p>JSON objects/arrays text. Parse → JS values. Shape validate.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>JSON looks like labeled boxes in text: name, age, list of notes.</p>",
          "ur": "<p>JSON text boxes: name, age, notes list.</p>"
        },
        "career": {
          "en": "<p>Schema drift breaks clients. Document required fields; prefer additive changes.</p>",
          "ur": "<p>Schema drift clients todta. Required fields document; additive changes.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Payload = data inside the request/response body.</p>",
          "ur": "<p><strong>Glossary:</strong> Payload = body ke andar data.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "JSON is:",
            "ur": "JSON:"
          },
          "opts": {
            "en": [
              "Text data format",
              "A CSS framework",
              "A bank"
            ],
            "ur": [
              "Text format",
              "CSS framework",
              "Bank"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Interchange.",
            "ur": "Interchange."
          }
        },
        {
          "q": {
            "en": "Parse turns JSON into:",
            "ur": "Parse JSON ko kya banata:"
          },
          "opts": {
            "en": [
              "JS values",
              "DNS zones",
              "Fonts"
            ],
            "ur": [
              "JS values",
              "DNS",
              "Fonts"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Objects/arrays.",
            "ur": "Objects."
          }
        },
        {
          "q": {
            "en": "Before trusting payload:",
            "ur": "Trust se pehle:"
          },
          "opts": {
            "en": [
              "Validate shape",
              "Blindly eval",
              "Delete storage"
            ],
            "ur": [
              "Shape validate",
              "Blind eval",
              "Delete"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Untrusted input.",
            "ur": "Untrusted."
          }
        }
      ],
      "practice": {
        "en": "In HTTP Lab POST a note JSON.",
        "ur": "HTTP Lab: POST note JSON."
      },
      "exitTicket": {
        "en": "What field did you send?",
        "ur": "Kaunsa field bheja?"
      },
      "cards": [
        {
          "front": {
            "en": "JSON",
            "ur": "JSON"
          },
          "back": {
            "en": "Text objects",
            "ur": "Text objects"
          }
        },
        {
          "front": {
            "en": "Validate",
            "ur": "Validate"
          },
          "back": {
            "en": "Check shape",
            "ur": "Shape check"
          }
        }
      ],
      "lab": true
    },
    {
      "id": "be301-3",
      "title": {
        "en": "Status Codes Map",
        "ur": "Status Codes"
      },
      "objective": {
        "en": "Map common 2xx/4xx/5xx meanings.",
        "ur": "2xx/4xx/5xx meanings."
      },
      "warmUp": {
        "en": "Is every error the client’s fault?",
        "ur": "Har error client ki galti?"
      },
      "teach": {
        "en": "<p>2xx success, 4xx client problem, 5xx server problem. 401 auth, 403 forbidden, 429 rate limit. Read codes before inventing stories.</p>",
        "ur": "<p>2xx ok, 4xx client, 5xx server. 401/403/429. Code pehle — kahani baad.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Green-ish 200 = ok. 400s = you asked wrong. 500s = server tripped.</p>",
          "ur": "<p>200 ok. 400s = galat request. 500s = server problem.</p>"
        },
        "career": {
          "en": "<p>Map errors to UX: retryable vs fatal. Never show raw stacks to end users.</p>",
          "ur": "<p>Errors UX map: retry vs fatal. Raw stacks users ko mat.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> 2xx = worked. 4xx = request issue. 5xx = server issue.</p>",
          "ur": "<p><strong>Glossary:</strong> 2xx ok. 4xx request. 5xx server.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "500 usually means:",
            "ur": "500 usually kya mean karta:"
          },
          "opts": {
            "en": [
              "Server error",
              "Perfect cache",
              "Valid CSS"
            ],
            "ur": [
              "Server error",
              "Cache",
              "CSS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Server-side fault.",
            "ur": "Server."
          }
        },
        {
          "q": {
            "en": "401 suggests:",
            "ur": "401:"
          },
          "opts": {
            "en": [
              "Auth required/failed",
              "Image too big only",
              "DNS down only"
            ],
            "ur": [
              "Auth",
              "Image",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Credentials.",
            "ur": "Credentials."
          }
        },
        {
          "q": {
            "en": "429 means:",
            "ur": "429:"
          },
          "opts": {
            "en": [
              "Too many requests",
              "HTML invalid",
              "Font missing"
            ],
            "ur": [
              "Too many",
              "HTML",
              "Font"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Rate limit.",
            "ur": "Rate limit."
          }
        }
      ],
      "practice": {
        "en": "Trigger 404 and 201 in HTTP Lab.",
        "ur": "HTTP Lab: 404 aur 201."
      },
      "exitTicket": {
        "en": "How will UI treat 5xx differently from 4xx?",
        "ur": "UI 5xx ko 4xx se kaise alag treat karegi?"
      },
      "cards": [
        {
          "front": {
            "en": "4xx",
            "ur": "4xx"
          },
          "back": {
            "en": "Client-side issue",
            "ur": "Client issue"
          }
        },
        {
          "front": {
            "en": "5xx",
            "ur": "5xx"
          },
          "back": {
            "en": "Server-side issue",
            "ur": "Server issue"
          }
        }
      ],
      "lab": true
    },
    {
      "id": "be301-4",
      "title": {
        "en": "REST Shape Literacy",
        "ur": "REST Literacy"
      },
      "objective": {
        "en": "Describe REST resource URLs.",
        "ur": "REST resource URLs."
      },
      "warmUp": {
        "en": "Should /deleteNote be a URL?",
        "ur": "URL /deleteNote?"
      },
      "teach": {
        "en": "<p>Prefer nouns: /notes/12. Use methods for actions. Query params filter. This is literacy — real APIs vary.</p>",
        "ur": "<p>Nouns: /notes/12. Actions methods se. Query filter. Literacy — real APIs vary.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Think library shelves: /books/3 is book number 3. You GET to read, POST to add.</p>",
          "ur": "<p>Library: /books/3. GET read, POST add.</p>"
        },
        "career": {
          "en": "<p>Idempotent PUT/DELETE semantics matter for retries. Document side effects.</p>",
          "ur": "<p>Idempotent PUT/DELETE retries ke liye. Side effects document.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Resource = the thing (note, user). Endpoint = URL for that thing.</p>",
          "ur": "<p><strong>Glossary:</strong> Resource = cheez. Endpoint = uska URL.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Prefer URLs as:",
            "ur": "URLs:"
          },
          "opts": {
            "en": [
              "Nouns/resources",
              "Random verbs only",
              "Emoji paths"
            ],
            "ur": [
              "Nouns",
              "Verbs only",
              "Emoji"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "REST literacy.",
            "ur": "REST."
          }
        },
        {
          "q": {
            "en": "Filters often use:",
            "ur": "Filters aksar kya use karte:"
          },
          "opts": {
            "en": [
              "Query parameters",
              "GPU registers",
              "Film grain"
            ],
            "ur": [
              "Query params",
              "GPU",
              "Grain"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "?q=",
            "ur": "?q="
          }
        },
        {
          "q": {
            "en": "Methods express:",
            "ur": "Methods kya express karte:"
          },
          "opts": {
            "en": [
              "Action intent",
              "Font family",
              "Wallpaper"
            ],
            "ur": [
              "Action intent",
              "Font",
              "Wallpaper"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "GET vs POST…",
            "ur": "GET vs POST"
          }
        }
      ],
      "practice": {
        "en": "Design 3 endpoints for a habits app.",
        "ur": "Habits app ke 3 endpoints."
      },
      "exitTicket": {
        "en": "Which method for create?",
        "ur": "Create ka method?"
      },
      "cards": [
        {
          "front": {
            "en": "Resource URL",
            "ur": "URL"
          },
          "back": {
            "en": "Noun path",
            "ur": "Noun path"
          }
        },
        {
          "front": {
            "en": "Method",
            "ur": "Method"
          },
          "back": {
            "en": "Action",
            "ur": "Action"
          }
        }
      ]
    },
    {
      "id": "be301-5",
      "title": {
        "en": "HTTP Lab Honesty",
        "ur": "HTTP Lab Honesty"
      },
      "objective": {
        "en": "State that the lab is simulated on-device.",
        "ur": "Lab on-device simulated."
      },
      "warmUp": {
        "en": "Is this the same as production servers?",
        "ur": "Kya ye production servers?"
      },
      "teach": {
        "en": "<p>MasteryCap HTTP Lab is a fake in-memory server on your device. It teaches shapes honestly. Real deployment is later literacy — not pretend production.</p>",
        "ur": "<p>HTTP Lab device pe fake in-memory server. Shapes seekhata. Real deploy baad — fake production nahi.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>We practice with a toy post office inside the phone. Real internet post offices come later.</p>",
          "ur": "<p>Phone ke andar toy post office. Asli internet baad.</p>"
        },
        "career": {
          "en": "<p>Simulators build intuition; staging/production teach operations. Do not claim backend mastery from a client mock alone.</p>",
          "ur": "<p>Simulator intuition; staging/prod operations. Sirf mock se backend mastery claim mat.</p>"
        },
        "adult": {
          "en": "<p><strong>Honesty line:</strong> This server is simulated on your device.</p>",
          "ur": "<p><strong>Honesty:</strong> Server device pe simulated.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "HTTP Lab runs:",
            "ur": "HTTP Lab:"
          },
          "opts": {
            "en": [
              "On your device (simulated)",
              "In a secret bank",
              "On the moon"
            ],
            "ur": [
              "Device pe simulated",
              "Bank",
              "Moon"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Offline-safe teaching.",
            "ur": "Offline teach."
          }
        },
        {
          "q": {
            "en": "It teaches:",
            "ur": "Seekhata:"
          },
          "opts": {
            "en": [
              "Request/response shape",
              "Guaranteed jobs",
              "Live trading"
            ],
            "ur": [
              "Request/response shape",
              "Jobs",
              "Trading"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Literacy.",
            "ur": "Literacy."
          }
        },
        {
          "q": {
            "en": "Production differs because:",
            "ur": "Production farq:"
          },
          "opts": {
            "en": [
              "Real networks, auth, scale",
              "Same toy forever",
              "No status codes"
            ],
            "ur": [
              "Real network/auth/scale",
              "Toy forever",
              "No status"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Next steps beyond app.",
            "ur": "App ke baad aglay steps."
          }
        }
      ],
      "practice": {
        "en": "Write the honesty sentence in your notes.",
        "ur": "Honesty sentence notes mein."
      },
      "exitTicket": {
        "en": "Why does MasteryCap refuse fake production?",
        "ur": "Fake production kyun nahi?"
      },
      "cards": [
        {
          "front": {
            "en": "Simulated",
            "ur": "Simulated"
          },
          "back": {
            "en": "On-device fake server",
            "ur": "On-device fake"
          }
        },
        {
          "front": {
            "en": "Honesty",
            "ur": "Honesty"
          },
          "back": {
            "en": "Say the limit",
            "ur": "Limit bolo"
          }
        }
      ],
      "lab": true
    }
  ],
  "finalQuiz": [
    {
      "q": {
        "en": "HTTP GET typically",
        "ur": "GET"
      },
      "opts": {
        "en": [
          "Reads",
          "Formats disks",
          "Sets wallpaper"
        ],
        "ur": [
          "Read",
          "Disk format",
          "Wallpaper"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Read.",
        "ur": "Read."
      }
    },
    {
      "q": {
        "en": "JSON is",
        "ur": "JSON"
      },
      "opts": {
        "en": [
          "Text format",
          "A router",
          "A broker"
        ],
        "ur": [
          "Text format",
          "Router",
          "Broker"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Data.",
        "ur": "Data."
      }
    },
    {
      "q": {
        "en": "404 means",
        "ur": "404"
      },
      "opts": {
        "en": [
          "Not found",
          "Success",
          "Payment ok"
        ],
        "ur": [
          "Not found",
          "Success",
          "Payment"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Missing.",
        "ur": "Missing."
      }
    },
    {
      "q": {
        "en": "HTTP Lab is",
        "ur": "Lab"
      },
      "opts": {
        "en": [
          "Simulated on device",
          "Accredited degree",
          "Live exchange"
        ],
        "ur": [
          "Device pe simulated",
          "Degree",
          "Exchange"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Honest.",
        "ur": "Honest."
      }
    },
    {
      "q": {
        "en": "REST URLs prefer",
        "ur": "REST"
      },
      "opts": {
        "en": [
          "Nouns",
          "Only emoji",
          "Only verbs as paths"
        ],
        "ur": [
          "Nouns",
          "Emoji",
          "Verb paths"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Resources.",
        "ur": "Resources."
      }
    }
  ],
  "passScore": 85,
  "project": {
    "id": "http-lab-path",
    "title": {
      "en": "Complete HTTP Lab exercises",
      "ur": "HTTP Lab exercises"
    },
    "items": [
      {
        "id": "get",
        "en": "GET list resource",
        "ur": "GET list resource"
      },
      {
        "id": "post",
        "en": "POST create resource",
        "ur": "POST create resource"
      },
      {
        "id": "err",
        "en": "Observe 404 response",
        "ur": "404 response dekho"
      },
      {
        "id": "auth",
        "en": "401 then authorized GET /users/me",
        "ur": "401 phir authorized GET /users/me"
      },
      {
        "id": "put",
        "en": "PUT update a note",
        "ur": "PUT se note update"
      }
    ]
  }
};
export default COURSE;
