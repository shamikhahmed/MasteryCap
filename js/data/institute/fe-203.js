/* FE-203 — In Session */
export const COURSE = {
  "code": "FE-203",
  "title": {
    "en": "UI Craft: Components Without Frameworks",
    "ur": "UI Craft: Bina Framework"
  },
  "hours": 12,
  "lessons": [
    {
      "id": "fe203-1",
      "title": {
        "en": "Component Thinking",
        "ur": "Component Thinking"
      },
      "objective": {
        "en": "Define a UI component as structure + style + behavior.",
        "ur": "UI component = structure+style+behavior."
      },
      "warmUp": {
        "en": "What repeats across screens in apps you use?",
        "ur": "Apps mein kya repeat hota?"
      },
      "teach": {
        "en": "<p>A component is a reusable chunk: markup structure, styles, and behavior. Vanilla JS can build tabs, modals, lists without a framework — you own the seams.</p>",
        "ur": "<p>Component reusable chunk: markup, styles, behavior. Vanilla JS se tabs/modals — frameworks ke baghair.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Lego brick for UI: same brick, many builds. A “card” brick can show a lesson or a score.</p>",
          "ur": "<p>UI Lego brick. Same brick, kai builds. Card brick lesson ya score dikha sakti.</p>"
        },
        "career": {
          "en": "<p>Frameworks are optional amplifiers. First master component boundaries and props-as-data; then libraries become choices, not crutches.</p>",
          "ur": "<p>Frameworks optional. Pehle boundaries + data-as-props; phir library choice.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Component = reusable UI piece. Vanilla = plain JS without a big UI library.</p>",
          "ur": "<p><strong>Glossary:</strong> Component = reusable UI. Vanilla = bina badi library.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "A component bundles:",
            "ur": "Component kya bundle karta:"
          },
          "opts": {
            "en": [
              "Structure, style, behavior",
              "Only DNS",
              "Only certificates"
            ],
            "ur": [
              "Structure, style, behavior",
              "DNS",
              "Certs"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Three layers.",
            "ur": "Teen layers."
          }
        },
        {
          "q": {
            "en": "Vanilla means:",
            "ur": "Vanilla:"
          },
          "opts": {
            "en": [
              "No framework required",
              "No CSS allowed",
              "No HTML"
            ],
            "ur": [
              "Framework zaroori nahi",
              "CSS mana",
              "HTML mana"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Own the platform.",
            "ur": "Platform."
          }
        },
        {
          "q": {
            "en": "Reuse helps:",
            "ur": "Reuse:"
          },
          "opts": {
            "en": [
              "Consistency and speed",
              "Random chaos",
              "Packet loss"
            ],
            "ur": [
              "Consistency + speed",
              "Chaos",
              "Packet loss"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Design systems start small.",
            "ur": "Design systems."
          }
        }
      ],
      "practice": {
        "en": "List 3 components you will need for a study app.",
        "ur": "Study app ke 3 components likho."
      },
      "exitTicket": {
        "en": "Which component is hardest and why?",
        "ur": "Kaunsa component mushkil — kyun?"
      },
      "cards": [
        {
          "front": {
            "en": "Component",
            "ur": "Component"
          },
          "back": {
            "en": "Reusable UI chunk",
            "ur": "Reusable UI"
          }
        },
        {
          "front": {
            "en": "Vanilla",
            "ur": "Vanilla"
          },
          "back": {
            "en": "No framework required",
            "ur": "Bina framework"
          }
        }
      ]
    },
    {
      "id": "fe203-2",
      "title": {
        "en": "Tabs Component",
        "ur": "Tabs Component"
      },
      "objective": {
        "en": "Build tabs with ARIA-friendly state.",
        "ur": "Tabs ARIA-friendly state."
      },
      "warmUp": {
        "en": "How do users know which tab is active?",
        "ur": "Active tab kaise pata?"
      },
      "teach": {
        "en": "<p>Tabs: one active panel, others hidden. Sync selected styles + <code>aria-selected</code>. Keyboard left/right is a stretch goal.</p>",
        "ur": "<p>Tabs: ek active panel. Styles + aria-selected sync. Keyboard stretch goal.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Tabs are folders. Only one folder open. Clicking a label opens that folder and closes others.</p>",
          "ur": "<p>Tabs folders. Ek open. Label click → woh folder, baaki band.</p>"
        },
        "career": {
          "en": "<p>Prefer progressive enhancement: content readable without JS where possible; JS upgrades interaction.</p>",
          "ur": "<p>Progressive enhancement: bina JS content readable; JS interaction upgrade.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> ARIA attributes explain UI state to assistive tech. <code>aria-selected</code> marks the active tab.</p>",
          "ur": "<p><strong>Glossary:</strong> ARIA assistive tech ko state batati. aria-selected = active tab.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Only one tab panel should be:",
            "ur": "Sirf ek tab panel kya hona chahiye:"
          },
          "opts": {
            "en": [
              "Visible/active at a time",
              "Deleted forever",
              "Stored in DNS"
            ],
            "ur": [
              "Visible/active",
              "Delete forever",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Mutual exclusion.",
            "ur": "Mutual exclusion."
          }
        },
        {
          "q": {
            "en": "aria-selected communicates:",
            "ur": "aria-selected kya communicate karta:"
          },
          "opts": {
            "en": [
              "Which tab is active",
              "Font size",
              "Wi‑Fi band"
            ],
            "ur": [
              "Kaunsi tab active",
              "Font",
              "Wi‑Fi"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Accessibility state.",
            "ur": "A11y state."
          }
        },
        {
          "q": {
            "en": "Tabs need:",
            "ur": "Tabs:"
          },
          "opts": {
            "en": [
              "Labels + panels wired together",
              "Only images",
              "Only servers"
            ],
            "ur": [
              "Labels + panels",
              "Sirf images",
              "Servers"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Structure + state.",
            "ur": "Structure + state."
          }
        }
      ],
      "practice": {
        "en": "Implement 2-tab switcher on paper then in code.",
        "ur": "2-tab switcher paper → code."
      },
      "exitTicket": {
        "en": "How did you store active index?",
        "ur": "Active index kaise store?"
      },
      "cards": [
        {
          "front": {
            "en": "Tabs rule",
            "ur": "Tabs"
          },
          "back": {
            "en": "One active panel",
            "ur": "Ek active panel"
          }
        },
        {
          "front": {
            "en": "ARIA",
            "ur": "ARIA"
          },
          "back": {
            "en": "Expose state",
            "ur": "State expose"
          }
        }
      ],
      "practiceCode": {
        "prompt": {
          "en": "toggle(i) sets active = i (0 or 1).",
          "ur": "toggle(i) → active = i."
        },
        "starter": "let active = 0;\nfunction toggle(i) {\n  // TODO: active = i\n}\n",
        "tests": [
          {
            "name": "toggle exists",
            "run": "typeof toggle === \"function\""
          },
          {
            "name": "toggle(1) sets active",
            "assert": "eq",
            "expr": "(toggle(1), active)",
            "expect": 1
          },
          {
            "name": "toggle(0) sets active",
            "assert": "eq",
            "expr": "(toggle(0), active)",
            "expect": 0
          }
        ]
      }
    },
    {
      "id": "fe203-3",
      "title": {
        "en": "Modal Component",
        "ur": "Modal Component"
      },
      "objective": {
        "en": "Open/close a modal with focus basics.",
        "ur": "Modal open/close + focus."
      },
      "warmUp": {
        "en": "What must happen when a dialog opens?",
        "ur": "Dialog open pe kya?"
      },
      "teach": {
        "en": "<p>Modals need open/close, backdrop click, Escape, and focus return. Trap focus is advanced; start with visible close + Escape.</p>",
        "ur": "<p>Modal: open/close, backdrop, Escape, focus return. Focus trap advanced; pehle close + Escape.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>A modal is a pop-up card. Dim the background. Always give a clear Close.</p>",
          "ur": "<p>Modal pop-up card. Background dim. Clear Close do.</p>"
        },
        "career": {
          "en": "<p>Never remove background content from the accessibility tree carelessly; label the dialog; restore focus to the opener.</p>",
          "ur": "<p>Background a11y tree carefully; dialog label; focus opener pe wapas.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Modal = dialog that demands attention before returning. Focus = where keyboard input goes.</p>",
          "ur": "<p><strong>Glossary:</strong> Modal = pehle dhyan, phir wapas. Focus = keyboard kahan.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Escape should usually:",
            "ur": "Escape usually kya karna chahiye:"
          },
          "opts": {
            "en": [
              "Close the modal",
              "Wipe storage",
              "Change DNS"
            ],
            "ur": [
              "Modal band",
              "Storage wipe",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Expected pattern.",
            "ur": "Expected."
          }
        },
        {
          "q": {
            "en": "Focus should return to:",
            "ur": "Focus return:"
          },
          "opts": {
            "en": [
              "The control that opened it",
              "A random ad",
              "The GPU"
            ],
            "ur": [
              "Opener control",
              "Ad",
              "GPU"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Orientation.",
            "ur": "Orientation."
          }
        },
        {
          "q": {
            "en": "Backdrop click often:",
            "ur": "Backdrop click aksar kya karta:"
          },
          "opts": {
            "en": [
              "Dismisses the dialog",
              "Buys crypto",
              "Compiles C"
            ],
            "ur": [
              "Dialog dismiss",
              "Crypto",
              "C"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Optional but common.",
            "ur": "Common."
          }
        }
      ],
      "practice": {
        "en": "Add Escape-to-close on a modal stub.",
        "ur": "Modal stub pe Escape-close."
      },
      "exitTicket": {
        "en": "What a11y gap remains in your modal?",
        "ur": "Modal mein kaunsa a11y gap?"
      },
      "cards": [
        {
          "front": {
            "en": "Modal",
            "ur": "Modal"
          },
          "back": {
            "en": "Attention dialog",
            "ur": "Attention dialog"
          }
        },
        {
          "front": {
            "en": "Escape",
            "ur": "Escape"
          },
          "back": {
            "en": "Close",
            "ur": "Close"
          }
        }
      ]
    },
    {
      "id": "fe203-4",
      "title": {
        "en": "List Component",
        "ur": "List Component"
      },
      "objective": {
        "en": "Render lists from data arrays.",
        "ur": "Arrays se lists."
      },
      "warmUp": {
        "en": "Why is hard-coded HTML bad for changing data?",
        "ur": "Badalti data pe hard-coded HTML kyun kharab?"
      },
      "teach": {
        "en": "<p>Map data → DOM nodes. Prefer document fragments for batches. Empty states matter. Keys/ids stabilize updates.</p>",
        "ur": "<p>Data → DOM map. Fragments batches ke liye. Empty states. Ids updates stabilize.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>You have a list of names in a box (array). Your code builds one row per name. Add a name → rebuild or append a row.</p>",
          "ur": "<p>Names ki list (array). Har name pe row. Naya name → row add.</p>"
        },
        "career": {
          "en": "<p>Separate model (array) from view (DOM). Diffing libraries optimize later; correctness first.</p>",
          "ur": "<p>Model (array) aur view (DOM) alag. Diffing baad; pehle correctness.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Render = turn data into visible elements. Empty state = what you show when the list has zero items.</p>",
          "ur": "<p><strong>Glossary:</strong> Render = data → visible. Empty state = zero items pe kya.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Lists should be driven by:",
            "ur": "Lists kis se driven honi chahiye:"
          },
          "opts": {
            "en": [
              "Data arrays",
              "Hand-copied HTML only",
              "DNS zone files"
            ],
            "ur": [
              "Data arrays",
              "Sirf HTML copy",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Data owns truth.",
            "ur": "Data truth."
          }
        },
        {
          "q": {
            "en": "Empty states:",
            "ur": "Empty:"
          },
          "opts": {
            "en": [
              "Guide the next action",
              "Must crash",
              "Hide forever"
            ],
            "ur": [
              "Next action guide",
              "Crash",
              "Hide"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "UX honesty.",
            "ur": "UX."
          }
        },
        {
          "q": {
            "en": "Fragment helps:",
            "ur": "Fragment:"
          },
          "opts": {
            "en": [
              "Batch DOM inserts",
              "Encrypt disks",
              "Mint NFTs"
            ],
            "ur": [
              "Batch DOM",
              "Encrypt",
              "NFT"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Fewer reflows.",
            "ur": "Fewer reflows."
          }
        }
      ],
      "practice": {
        "en": "Render 5 lesson titles from an array.",
        "ur": "Array se 5 lesson titles."
      },
      "exitTicket": {
        "en": "Model vs view — one sentence.",
        "ur": "Model vs view — ek jumla."
      },
      "cards": [
        {
          "front": {
            "en": "Render",
            "ur": "Render"
          },
          "back": {
            "en": "Data → DOM",
            "ur": "Data → DOM"
          }
        },
        {
          "front": {
            "en": "Empty state",
            "ur": "Empty"
          },
          "back": {
            "en": "Zero-item UI",
            "ur": "Zero-item UI"
          }
        }
      ]
    },
    {
      "id": "fe203-5",
      "title": {
        "en": "Spacing and Type Systems",
        "ur": "Spacing aur Type"
      },
      "objective": {
        "en": "Apply spacing/type tokens in components.",
        "ur": "Components mein spacing/type tokens."
      },
      "warmUp": {
        "en": "Why do random paddings look cheap?",
        "ur": "Random padding sasta kyun?"
      },
      "teach": {
        "en": "<p>Reuse a small spacing scale and type scale inside components. Restraint beats decoration. Match MasteryCap institute rhythm where possible.</p>",
        "ur": "<p>Chhota spacing + type scale. Restraint > decoration. MasteryCap rhythm follow.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Pick four spacing sizes and stick to them. Apps look pro when gaps match.</p>",
          "ur": "<p>Char spacing sizes — unhi pe raho. Gaps match = pro look.</p>"
        },
        "career": {
          "en": "<p>Tokens beat magic numbers. Name them (--space-2) so redesigns are find/replace, not archaeology.</p>",
          "ur": "<p>Tokens > magic numbers. Name do — redesign easy.</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary:</strong> Token = named value for spacing/color/type reused everywhere.</p>",
          "ur": "<p><strong>Glossary:</strong> Token = named spacing/color/type value.</p>"
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "A type scale is:",
            "ur": "Type scale:"
          },
          "opts": {
            "en": [
              "Limited planned sizes",
              "Infinite random sizes",
              "A database"
            ],
            "ur": [
              "Planned sizes",
              "Random",
              "DB"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Constraint = craft.",
            "ur": "Constraint."
          }
        },
        {
          "q": {
            "en": "Tokens help:",
            "ur": "Tokens:"
          },
          "opts": {
            "en": [
              "Consistent redesigns",
              "Packet routing",
              "SSL handshake"
            ],
            "ur": [
              "Consistent redesign",
              "Packets",
              "SSL"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Central values.",
            "ur": "Central."
          }
        },
        {
          "q": {
            "en": "Restraint means:",
            "ur": "Restraint:"
          },
          "opts": {
            "en": [
              "Fewer sizes, clearer hierarchy",
              "More gradients always",
              "More emoji"
            ],
            "ur": [
              "Kam sizes, clear hierarchy",
              "Zyada gradients",
              "Emoji"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Institute feel.",
            "ur": "Institute."
          }
        }
      ],
      "practice": {
        "en": "Define 4 spacing tokens and apply to your tabs.",
        "ur": "4 spacing tokens → tabs."
      },
      "exitTicket": {
        "en": "Which token will you refuse to break?",
        "ur": "Kaunsa token nahi todoge?"
      },
      "cards": [
        {
          "front": {
            "en": "Token",
            "ur": "Token"
          },
          "back": {
            "en": "Named design value",
            "ur": "Named value"
          }
        },
        {
          "front": {
            "en": "Scale",
            "ur": "Scale"
          },
          "back": {
            "en": "Planned steps",
            "ur": "Planned steps"
          }
        }
      ]
    },
    {
      "id": "fe203-6",
      "title": {
        "en": "Critique Bad UI",
        "ur": "Bad UI Critique"
      },
      "objective": {
        "en": "Critique UI with a short rubric.",
        "ur": "Rubric se UI critique."
      },
      "warmUp": {
        "en": "Name one confusing app screen you used this week.",
        "ur": "Is hafte ka confusing screen?"
      },
      "teach": {
        "en": "<p>Rubric: hierarchy, tap targets, feedback, honesty, consistency. Write 5 bullets — no vibes-only feedback.</p>",
        "ur": "<p>Rubric: hierarchy, taps, feedback, honesty, consistency. 5 bullets — sirf vibes nahi.</p>"
      },
      "teachRegister": {
        "teen": {
          "en": "<p>Be kind but clear: “I did not know what to tap next” is useful feedback.</p>",
          "ur": "<p>Meherbani + clear: “Agla tap kya?” useful feedback.</p>"
        },
        "career": {
          "en": "<p>Separate usability issues from taste. Ship critiques that an engineer can act on.</p>",
          "ur": "<p>Usability vs taste alag. Engineer action le sake.</p>"
        },
        "adult": {
          "en": "<p>Use the rubric slowly. Specific beats “it looks weird.”</p>",
          "ur": "<p>Rubric ahista. Specific > “weird”."
        }
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Good critique is:",
            "ur": "Achhi critique kaisi hoti:"
          },
          "opts": {
            "en": [
              "Specific and actionable",
              "Only insults",
              "Only colors"
            ],
            "ur": [
              "Specific + actionable",
              "Insults",
              "Colors"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Help the builder.",
            "ur": "Builder help."
          }
        },
        {
          "q": {
            "en": "Tap targets relate to:",
            "ur": "Tap targets kis se relate:"
          },
          "opts": {
            "en": [
              "Finger size / hit area",
              "DNS only",
              "GPU only"
            ],
            "ur": [
              "Finger hit area",
              "DNS",
              "GPU"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Mobile truth.",
            "ur": "Mobile."
          }
        },
        {
          "q": {
            "en": "Honesty in UI means:",
            "ur": "UI mein honesty ka matlab:"
          },
          "opts": {
            "en": [
              "No fake progress or claims",
              "Hidden fees vibes",
              "Fake AI badges"
            ],
            "ur": [
              "Fake progress nahi",
              "Hidden fees",
              "Fake AI"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Capricorn rule.",
            "ur": "Capricorn."
          }
        }
      ],
      "practice": {
        "en": "Critique MasteryCap Campus with 5 rubric bullets.",
        "ur": "Campus pe 5 rubric bullets."
      },
      "exitTicket": {
        "en": "Strongest issue you found?",
        "ur": "Sab se bari issue?"
      },
      "cards": [
        {
          "front": {
            "en": "Rubric",
            "ur": "Rubric"
          },
          "back": {
            "en": "Checklist for critique",
            "ur": "Critique checklist"
          }
        },
        {
          "front": {
            "en": "Actionable",
            "ur": "Actionable"
          },
          "back": {
            "en": "Engineer can fix",
            "ur": "Engineer fix"
          }
        }
      ]
    }
  ],
  "finalQuiz": [
    {
      "q": {
        "en": "Components combine",
        "ur": "Components"
      },
      "opts": {
        "en": [
          "Structure style behavior",
          "Only DNS",
          "Only banks"
        ],
        "ur": [
          "Structure style behavior",
          "DNS",
          "Banks"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Three.",
        "ur": "Teen."
      }
    },
    {
      "q": {
        "en": "Tabs show",
        "ur": "Tabs"
      },
      "opts": {
        "en": [
          "One panel at a time",
          "All panels always",
          "No panels"
        ],
        "ur": [
          "Ek panel",
          "Sab panels",
          "No panels"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Mutex.",
        "ur": "Mutex."
      }
    },
    {
      "q": {
        "en": "Modals should support",
        "ur": "Modals"
      },
      "opts": {
        "en": [
          "Close / Escape",
          "Only mining",
          "Only SEO"
        ],
        "ur": [
          "Close/Escape",
          "Mining",
          "SEO"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Patterns.",
        "ur": "Patterns."
      }
    },
    {
      "q": {
        "en": "Lists should be",
        "ur": "Lists"
      },
      "opts": {
        "en": [
          "Data-driven",
          "Hand-only forever",
          "DNS-zoned"
        ],
        "ur": [
          "Data-driven",
          "Hand-only",
          "DNS"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Arrays.",
        "ur": "Arrays."
      }
    },
    {
      "q": {
        "en": "Critique should be",
        "ur": "Critique"
      },
      "opts": {
        "en": [
          "Specific",
          "Vague vibes only",
          "Emoji only"
        ],
        "ur": [
          "Specific",
          "Vibes",
          "Emoji"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Actionable.",
        "ur": "Actionable."
      }
    }
  ],
  "passScore": 85,
  "project": {
    "id": "ui-trio",
    "title": {
      "en": "Tabs + modal + list",
      "ur": "Tabs + modal + list"
    },
    "items": [
      {
        "id": "tabs",
        "en": "Working tabs with clear active state",
        "ur": "Tabs + active state"
      },
      {
        "id": "modal",
        "en": "Modal open/close + Escape",
        "ur": "Modal + Escape"
      },
      {
        "id": "list",
        "en": "List rendered from an array",
        "ur": "Array se list"
      }
    ]
  }
};
export default COURSE;
