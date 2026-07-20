/* BE-302 — In Session */
export const COURSE = {
  "code": "BE-302",
  "title": {
    "en": "Data: Modeling and Databases on Paper",
    "ur": "Data Modeling"
  },
  "hours": 12,
  "lessons": [
    {
      "id": "be302-1",
      "title": {
        "en": "Entities and Relations",
        "ur": "Entities"
      },
      "objective": {
        "en": "Identify entities and relationships.",
        "ur": "Entities + relations."
      },
      "warmUp": {
        "en": "What “things” exist in a notes app?",
        "ur": "Notes app mein kaunsi cheezen?"
      },
      "teach": {
        "en": "<p>Entities are nouns you store. Relations connect them (user has many notes). Draw boxes and lines before SQL.</p>",
        "ur": "<p>Entities = nouns. Relations connect (user has many notes). Pehle boxes/lines.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>List the cast of characters in your app story: User, Note, Tag.</p>",
          "ur": "<p>App story cast: User, Note, Tag.</p>"
        },
        "career": {
          "en": "<p>Cardinality (1:1, 1:n, n:n) drives schema and query cost. Wrong early guesses are expensive later.</p>",
          "ur": "<p>Cardinality schema + cost. Galat early guess mehnga.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Entity = a thing. Relation = how things connect.</p>",
          "ur": "<p><strong>Glossary:</strong> Entity = cheez. Relation = connection.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Entities are usually:",
            "ur": "Entities:"
          },
          "opts": {
            "en": [
              "Nouns you store",
              "CSS animations",
              "HTTP verbs only"
            ],
            "ur": [
              "Store nouns",
              "CSS",
              "HTTP verbs"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Data nouns.",
            "ur": "Nouns."
          }
        },
        {
          "q": {
            "en": "“Has many” is a:",
            "ur": "Has many:"
          },
          "opts": {
            "en": [
              "Relationship",
              "Font",
              "Certificate"
            ],
            "ur": [
              "Relationship",
              "Font",
              "Cert"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Cardinality.",
            "ur": "Cardinality."
          }
        },
        {
          "q": {
            "en": "Draw before:",
            "ur": "Pehle draw:"
          },
          "opts": {
            "en": [
              "Coding tables blindly",
              "Buying GPUs",
              "Mining"
            ],
            "ur": [
              "Blind tables",
              "GPU",
              "Mining"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Model first.",
            "ur": "Model first."
          }
        }
      ],
      "practice": {
        "en": "ER sketch: user–notes–tags.",
        "ur": "ER: user–notes–tags."
      },
      "exitTicket": {
        "en": "Any n:n you found?",
        "ur": "Koi n:n?"
      },
      "cards": [
        {
          "front": {
            "en": "Entity",
            "ur": "Entity"
          },
          "back": {
            "en": "Stored noun",
            "ur": "Stored noun"
          }
        },
        {
          "front": {
            "en": "Relation",
            "ur": "Relation"
          },
          "back": {
            "en": "Connection",
            "ur": "Connection"
          }
        }
      ]
    },
    {
      "id": "be302-2",
      "title": {
        "en": "Keys and Identity",
        "ur": "Keys"
      },
      "objective": {
        "en": "Explain primary keys.",
        "ur": "Primary keys."
      },
      "warmUp": {
        "en": "How do you find one specific note?",
        "ur": "Specific note kaise?"
      },
      "teach": {
        "en": "<p>Primary keys uniquely identify rows. Prefer stable ids. Foreign keys point to other entities.</p>",
        "ur": "<p>Primary key unique id. Stable ids. Foreign key doosri entity.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Every library book has a unique code. That code is its key.</p>",
          "ur": "<p>Har book unique code — key.</p>"
        },
        "career": {
          "en": "<p>Surrogate vs natural keys; avoid mutable emails as PKs.</p>",
          "ur": "<p>Surrogate vs natural; mutable email PK mat.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Primary key = unique id. Foreign key = reference to another row.</p>",
          "ur": "<p><strong>Glossary:</strong> PK unique. FK reference.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Primary keys must be:",
            "ur": "PK:"
          },
          "opts": {
            "en": [
              "Unique",
              "Always changing daily",
              "Optional always"
            ],
            "ur": [
              "Unique",
              "Daily change",
              "Optional"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Identity.",
            "ur": "Identity."
          }
        },
        {
          "q": {
            "en": "Foreign keys:",
            "ur": "FK:"
          },
          "opts": {
            "en": [
              "Reference other rows",
              "Replace CSS",
              "Set DNS"
            ],
            "ur": [
              "Reference rows",
              "CSS",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Links.",
            "ur": "Links."
          }
        },
        {
          "q": {
            "en": "Avoid as PK:",
            "ur": "PK avoid:"
          },
          "opts": {
            "en": [
              "Mutable emails",
              "Stable numeric ids",
              "UUIDs"
            ],
            "ur": [
              "Mutable emails",
              "Stable ids",
              "UUIDs"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Stability.",
            "ur": "Stability."
          }
        }
      ],
      "practice": {
        "en": "Assign keys on your ER sketch.",
        "ur": "ER pe keys."
      },
      "exitTicket": {
        "en": "Why not email as PK?",
        "ur": "Email PK kyun nahi?"
      },
      "cards": [
        {
          "front": {
            "en": "PK",
            "ur": "PK"
          },
          "back": {
            "en": "Unique id",
            "ur": "Unique id"
          }
        },
        {
          "front": {
            "en": "FK",
            "ur": "FK"
          },
          "back": {
            "en": "Points elsewhere",
            "ur": "Reference"
          }
        }
      ]
    },
    {
      "id": "be302-3",
      "title": {
        "en": "Normalization Idea",
        "ur": "Normalization"
      },
      "objective": {
        "en": "Spot duplicated data smells.",
        "ur": "Duplicate data smells."
      },
      "warmUp": {
        "en": "What goes wrong if address repeats on every order?",
        "ur": "Har order pe address repeat?"
      },
      "teach": {
        "en": "<p>Normalization reduces repeated facts. Tradeoff: more joins. On paper, separate repeating groups.</p>",
        "ur": "<p>Normalization repeated facts kam. Tradeoff joins. Paper pe repeating groups alag.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>If the same phone number is copied 50 times, one change becomes 50 edits. Store it once.</p>",
          "ur": "<p>Same number 50 copies — 50 edits. Ek dafa store.</p>"
        },
        "career": {
          "en": "<p>Know when to denormalize for read performance — consciously, with update rules.</p>",
          "ur": "<p>Denormalize consciously — update rules ke sath.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Duplicate data = same fact in many places. Normalize = store once, reference.</p>",
          "ur": "<p><strong>Glossary:</strong> Duplicate = kai jagah same fact. Normalize = ek dafa.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Duplication risks:",
            "ur": "Duplication:"
          },
          "opts": {
            "en": [
              "Update anomalies",
              "Faster honesty",
              "Better SSL"
            ],
            "ur": [
              "Update anomalies",
              "Honesty",
              "SSL"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Inconsistency.",
            "ur": "Inconsistency."
          }
        },
        {
          "q": {
            "en": "Normalization aims to:",
            "ur": "Normalize:"
          },
          "opts": {
            "en": [
              "Reduce repeated facts",
              "Delete all keys",
              "Ban JSON"
            ],
            "ur": [
              "Repeated facts kam",
              "Keys delete",
              "JSON ban"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Clean models.",
            "ur": "Clean."
          }
        },
        {
          "q": {
            "en": "Tradeoff can be:",
            "ur": "Tradeoff:"
          },
          "opts": {
            "en": [
              "More joins",
              "No queries ever",
              "No relations"
            ],
            "ur": [
              "Zyada joins",
              "No queries",
              "No relations"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Balance.",
            "ur": "Balance."
          }
        }
      ],
      "practice": {
        "en": "Rewrite a messy flat table into 2 entities.",
        "ur": "Flat table → 2 entities."
      },
      "exitTicket": {
        "en": "What fact did you store once?",
        "ur": "Kaunsa fact ek dafa?"
      },
      "cards": [
        {
          "front": {
            "en": "Normalize",
            "ur": "Normalize"
          },
          "back": {
            "en": "Store facts once",
            "ur": "Facts once"
          }
        },
        {
          "front": {
            "en": "Anomaly",
            "ur": "Anomaly"
          },
          "back": {
            "en": "Bad update side effect",
            "ur": "Bad update"
          }
        }
      ]
    },
    {
      "id": "be302-4",
      "title": {
        "en": "SQL Literacy Select",
        "ur": "SQL Select"
      },
      "objective": {
        "en": "Read a simple SELECT mentally.",
        "ur": "Simple SELECT."
      },
      "warmUp": {
        "en": "What does SELECT name FROM users mean?",
        "ur": "SELECT name FROM users?"
      },
      "teach": {
        "en": "<p>SQL asks tables questions. SELECT columns FROM table WHERE filter. Literacy only — no live DB required offline.</p>",
        "ur": "<p>SQL tables se sawal. SELECT columns FROM WHERE. Literacy — live DB zaroori nahi.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>SELECT is “show me these columns from this table.”</p>",
          "ur": "<p>SELECT = in columns is table se dikhao.</p>"
        },
        "career": {
          "en": "<p>Indexes and EXPLAIN come later; first write readable queries and know row estimates.</p>",
          "ur": "<p>Indexes baad; pehle readable queries.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Table = grid of rows. SELECT = choose columns to see.</p>",
          "ur": "<p><strong>Glossary:</strong> Table = rows grid. SELECT = columns choose.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "SELECT chooses:",
            "ur": "SELECT:"
          },
          "opts": {
            "en": [
              "Columns",
              "Only fonts",
              "Only certificates"
            ],
            "ur": [
              "Columns",
              "Fonts",
              "Certs"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Projection.",
            "ur": "Projection."
          }
        },
        {
          "q": {
            "en": "FROM names:",
            "ur": "FROM:"
          },
          "opts": {
            "en": [
              "The table",
              "The GPU",
              "The theme"
            ],
            "ur": [
              "Table",
              "GPU",
              "Theme"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Source.",
            "ur": "Source."
          }
        },
        {
          "q": {
            "en": "WHERE:",
            "ur": "WHERE:"
          },
          "opts": {
            "en": [
              "Filters rows",
              "Deletes CSS",
              "Sets accent"
            ],
            "ur": [
              "Filter rows",
              "CSS delete",
              "Accent"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Predicate.",
            "ur": "Predicate."
          }
        }
      ],
      "practice": {
        "en": "Write SELECT for notes titled like %budget%.",
        "ur": "SELECT notes %budget%."
      },
      "exitTicket": {
        "en": "Translate your SELECT to plain language.",
        "ur": "SELECT plain language."
      },
      "cards": [
        {
          "front": {
            "en": "SELECT",
            "ur": "SELECT"
          },
          "back": {
            "en": "Pick columns",
            "ur": "Columns"
          }
        },
        {
          "front": {
            "en": "WHERE",
            "ur": "WHERE"
          },
          "back": {
            "en": "Filter",
            "ur": "Filter"
          }
        }
      ]
    },
    {
      "id": "be302-5",
      "title": {
        "en": "Model Three Apps",
        "ur": "Teen Apps Model"
      },
      "objective": {
        "en": "Model three tiny apps on paper.",
        "ur": "Teen apps paper pe."
      },
      "warmUp": {
        "en": "Can one model fit every product?",
        "ur": "Ek model har product?"
      },
      "teach": {
        "en": "<p>Project: model a habits tracker, a recipe box, and a simple shop cart. Each: entities, keys, one relation.</p>",
        "ur": "<p>Project: habits, recipes, cart. Har: entities, keys, ek relation.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Three mini worlds. Draw boxes. Keep them small.</p>",
          "ur": "<p>Teen chhote worlds. Boxes. Chhota rakho.</p>"
        },
        "career": {
          "en": "<p>Write assumptions (“one cart per user”) explicitly — they become product decisions.</p>",
          "ur": "<p>Assumptions likho — product decisions.</p>"
        },
        "adult": {
          "en": "<p>Use checklist. Honest models beat pretty diagrams with lies.</p>",
          "ur": "<p>Checklist. Imandar models.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Good models state:",
            "ur": "Models:"
          },
          "opts": {
            "en": [
              "Assumptions",
              "Only vibes",
              "Only gradients"
            ],
            "ur": [
              "Assumptions",
              "Vibes",
              "Gradients"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Clarity.",
            "ur": "Clarity."
          }
        },
        {
          "q": {
            "en": "Each model needs:",
            "ur": "Har model:"
          },
          "opts": {
            "en": [
              "Entities + keys",
              "Only colors",
              "Only slogans"
            ],
            "ur": [
              "Entities + keys",
              "Colors",
              "Slogans"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Minimum.",
            "ur": "Minimum."
          }
        },
        {
          "q": {
            "en": "Relations capture:",
            "ur": "Relations:"
          },
          "opts": {
            "en": [
              "How entities connect",
              "Font kerning",
              "Film grain"
            ],
            "ur": [
              "Connections",
              "Kerning",
              "Grain"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Structure.",
            "ur": "Structure."
          }
        }
      ],
      "practice": {
        "en": "Attest BE-302 project checklist.",
        "ur": "BE-302 checklist."
      },
      "exitTicket": {
        "en": "Which app model was hardest?",
        "ur": "Kaunsa model mushkil?"
      },
      "cards": [
        {
          "front": {
            "en": "Model",
            "ur": "Model"
          },
          "back": {
            "en": "Entities on paper",
            "ur": "Paper entities"
          }
        },
        {
          "front": {
            "en": "Assumption",
            "ur": "Assumption"
          },
          "back": {
            "en": "Stated product rule",
            "ur": "Product rule"
          }
        }
      ]
    }
  ],
  "finalQuiz": [
    {
      "q": {
        "en": "Entity is usually a",
        "ur": "Entity"
      },
      "opts": {
        "en": [
          "Noun",
          "Gradient",
          "Emoji"
        ],
        "ur": [
          "Noun",
          "Gradient",
          "Emoji"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Thing.",
        "ur": "Thing."
      }
    },
    {
      "q": {
        "en": "PK must be",
        "ur": "PK"
      },
      "opts": {
        "en": [
          "Unique",
          "Duplicate ok",
          "Missing ok"
        ],
        "ur": [
          "Unique",
          "Duplicate",
          "Missing"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Id.",
        "ur": "Id."
      }
    },
    {
      "q": {
        "en": "Normalization reduces",
        "ur": "Normalize"
      },
      "opts": {
        "en": [
          "Repeated facts",
          "HTTP verbs",
          "Fonts"
        ],
        "ur": [
          "Repeated facts",
          "HTTP",
          "Fonts"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Dupes.",
        "ur": "Dupes."
      }
    },
    {
      "q": {
        "en": "SELECT picks",
        "ur": "SELECT"
      },
      "opts": {
        "en": [
          "Columns",
          "GPUs",
          "Brokers"
        ],
        "ur": [
          "Columns",
          "GPU",
          "Broker"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Projection.",
        "ur": "Projection."
      }
    },
    {
      "q": {
        "en": "WHERE",
        "ur": "WHERE"
      },
      "opts": {
        "en": [
          "Filters",
          "Paints",
          "Mines"
        ],
        "ur": [
          "Filter",
          "Paint",
          "Mine"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Rows.",
        "ur": "Rows."
      }
    }
  ],
  "passScore": 85,
  "project": {
    "id": "three-models",
    "title": {
      "en": "Model three apps on paper",
      "ur": "Teen apps paper"
    },
    "items": [
      {
        "id": "habits",
        "en": "Habits tracker ER + keys",
        "ur": "Habits ER + keys"
      },
      {
        "id": "recipes",
        "en": "Recipe box ER + keys",
        "ur": "Recipes ER + keys"
      },
      {
        "id": "cart",
        "en": "Shop cart ER + keys",
        "ur": "Cart ER + keys"
      }
    ]
  }
};
export default COURSE;
