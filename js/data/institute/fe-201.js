/* FE-201 — In Session */
export const COURSE = {
  "code": "FE-201",
  "title": {
    "en": "JavaScript from Zero",
    "ur": "JavaScript Zero Se"
  },
  "lessons": [
    {
      "id": "fe201-1",
      "title": {
        "en": "Values and Variables",
        "ur": "Values aur Variables"
      },
      "objective": {
        "en": "Hold and name values with let/const.",
        "ur": "let/const se values."
      },
      "warmUp": {
        "en": "What breaks if this concept is wrong?",
        "ur": "Agar ye concept galat ho to kya toot?"
      },
      "teach": {
        "en": "<p>JS values: numbers, strings, booleans, null, undefined, objects, arrays. let allows reassign; const binds a name (object contents may still mutate). Prefer const by default.</p>",
        "ur": "<p>JS values: number, string, boolean, null, undefined, object, array. let reassign; const name bind. Default const.</p>"
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "const is best when:",
            "ur": "const best:"
          },
          "opts": {
            "en": [
              "Name should not rebind",
              "You hate constants",
              "Only for CSS"
            ],
            "ur": [
              "Name rebind nahi",
              "Hate constants",
              "Sirf CSS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Clear intent.",
            "ur": "Clear intent."
          }
        },
        {
          "q": {
            "en": "A string is:",
            "ur": "String:"
          },
          "opts": {
            "en": [
              "Text data",
              "A server rack",
              "A flex property"
            ],
            "ur": [
              "Text data",
              "Server rack",
              "Flex"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Quoted text.",
            "ur": "Quoted text."
          }
        },
        {
          "q": {
            "en": "undefined often means:",
            "ur": "undefined aksar kya mean karta:"
          },
          "opts": {
            "en": [
              "Missing value / not set",
              "Perfect success",
              "DNS failure only"
            ],
            "ur": [
              "Missing/not set",
              "Perfect",
              "Sirf DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Absence signal.",
            "ur": "Absence."
          }
        }
      ],
      "practice": {
        "en": "Write 5 lines of JS in Notes exercising this lesson’s idea.",
        "ur": "Is lesson ka idea Notes mein 5 lines JS."
      },
      "exitTicket": {
        "en": "What clicked in this lesson?",
        "ur": "Is lesson mein kya click hua?"
      },
      "cards": [
        {
          "front": {
            "en": "Values and Variables key idea",
            "ur": "Values aur Variables key"
          },
          "back": {
            "en": "Hold and name values with let/const.",
            "ur": "let/const se values."
          }
        },
        {
          "front": {
            "en": "Values and Variables pitfall",
            "ur": "Values aur Variables pitfall"
          },
          "back": {
            "en": "Read errors; test edges",
            "ur": "Errors parho; edges test"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>JS values: numbers, strings, booleans, null, undefined, objects, arrays. let allows reassign; const binds a name (object contents may still mutate). Prefer const by default.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>JS values: number, string, boolean, null, undefined, object, array. let reassign; const name bind. Default const.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>JS values: numbers, strings, booleans, null, undefined, objects, arrays. let allows reassign; const binds a name (object contents may still mutate). Prefer const by default.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>JS values: number, string, boolean, null, undefined, object, array. let reassign; const name bind. Default const.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>JS values: numbers, strings, booleans, null, undefined, objects, arrays. let allows reassign; const binds a name (object contents may still mutate). Prefer const by default.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>JS values: number, string, boolean, null, undefined, object, array. let reassign; const name bind. Default const.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>JS values: numbers, strings, booleans, null, undefined, objects, arrays. let allows reassign; const binds a name (object contents may still mutate). Prefer const by default.</p>",
          "ur": "<p>JS values: number, string, boolean, null, undefined, object, array. let reassign; const name bind. Default const.</p>"
        }
      }
    },
    {
      "id": "fe201-2",
      "title": {
        "en": "Operators and Expressions",
        "ur": "Operators"
      },
      "objective": {
        "en": "Compute with operators and understand truthiness.",
        "ur": "Operators se compute karo aur truthiness samjho."
      },
      "warmUp": {
        "en": "What breaks if this concept is wrong?",
        "ur": "Agar ye concept galat ho to kya toot?"
      },
      "teach": {
        "en": "<p>Arithmetic, comparison, logical operators. === strict equality. Truthy/falsy rules matter in if conditions. Expressions produce values; statements do work.</p>",
        "ur": "<p>Arithmetic, comparison, logical. === strict. Truthy/falsy if mein. Expression value; statement kaam.</p>"
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Prefer equality with:",
            "ur": "Equality ke liye prefer karo:"
          },
          "opts": {
            "en": [
              "===",
              "Sometimes vibes",
              "DNS"
            ],
            "ur": [
              "===",
              "Vibes",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Type-safe compare.",
            "ur": "Type-safe."
          }
        },
        {
          "q": {
            "en": "0 is:",
            "ur": "0:"
          },
          "opts": {
            "en": [
              "Falsy",
              "Truthy",
              "A CSS grid"
            ],
            "ur": [
              "Falsy",
              "Truthy",
              "Grid"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Know falsy list.",
            "ur": "Falsy list."
          }
        },
        {
          "q": {
            "en": "&& returns:",
            "ur": "&&:"
          },
          "opts": {
            "en": [
              "First falsy or last value",
              "Always true",
              "HTML"
            ],
            "ur": [
              "First falsy or last",
              "Hamesha true",
              "HTML"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Short-circuit logic.",
            "ur": "Short-circuit."
          }
        }
      ],
      "practice": {
        "en": "Write 5 lines of JS in Notes exercising this lesson’s idea.",
        "ur": "Is lesson ka idea Notes mein 5 lines JS."
      },
      "exitTicket": {
        "en": "What clicked in this lesson?",
        "ur": "Is lesson mein kya click hua?"
      },
      "cards": [
        {
          "front": {
            "en": "Operators and Expressions key idea",
            "ur": "Operators key"
          },
          "back": {
            "en": "Compute with operators and understand truthiness.",
            "ur": "Operators se compute karo aur truthiness samjho."
          }
        },
        {
          "front": {
            "en": "Operators and Expressions pitfall",
            "ur": "Operators pitfall"
          },
          "back": {
            "en": "Read errors; test edges",
            "ur": "Errors parho; edges test"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>Arithmetic, comparison, logical operators. === strict equality. Truthy/falsy rules matter in if conditions. Expressions produce values; statements do work.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>Arithmetic, comparison, logical. === strict. Truthy/falsy if mein. Expression value; statement kaam.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>Arithmetic, comparison, logical operators. === strict equality. Truthy/falsy rules matter in if conditions. Expressions produce values; statements do work.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>Arithmetic, comparison, logical. === strict. Truthy/falsy if mein. Expression value; statement kaam.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>Arithmetic, comparison, logical operators. === strict equality. Truthy/falsy rules matter in if conditions. Expressions produce values; statements do work.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>Arithmetic, comparison, logical. === strict. Truthy/falsy if mein. Expression value; statement kaam.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>Arithmetic, comparison, logical operators. === strict equality. Truthy/falsy rules matter in if conditions. Expressions produce values; statements do work.</p>",
          "ur": "<p>Arithmetic, comparison, logical. === strict. Truthy/falsy if mein. Expression value; statement kaam.</p>"
        }
      }
    },
    {
      "id": "fe201-3",
      "title": {
        "en": "Branches",
        "ur": "Branches"
      },
      "objective": {
        "en": "Control flow with if/else and switches.",
        "ur": "if/else, switch."
      },
      "warmUp": {
        "en": "What breaks if this concept is wrong?",
        "ur": "Agar ye concept galat ho to kya toot?"
      },
      "teach": {
        "en": "<p>Branches choose paths. Keep conditions readable. Avoid deep nesting — early return helps. Switch fits discrete cases.</p>",
        "ur": "<p>Branches path choose. Conditions readable. Deep nesting avoid — early return. Switch discrete cases.</p>"
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Early return helps:",
            "ur": "Early return:"
          },
          "opts": {
            "en": [
              "Flatten nesting",
              "Delete JS",
              "Style CSS"
            ],
            "ur": [
              "Flatten nesting",
              "JS delete",
              "CSS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Readable control flow.",
            "ur": "Readable flow."
          }
        },
        {
          "q": {
            "en": "else is:",
            "ur": "else:"
          },
          "opts": {
            "en": [
              "Alternate path",
              "A packet",
              "A font"
            ],
            "ur": [
              "Alternate path",
              "Packet",
              "Font"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "When if fails.",
            "ur": "If fail pe."
          }
        },
        {
          "q": {
            "en": "Switch fits:",
            "ur": "Switch:"
          },
          "opts": {
            "en": [
              "Discrete cases",
              "Infinite CSS grids",
              "DNS zones only"
            ],
            "ur": [
              "Discrete cases",
              "Infinite grids",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Clear case lists.",
            "ur": "Clear cases."
          }
        }
      ],
      "practice": {
        "en": "Write 5 lines of JS in Notes exercising this lesson’s idea.",
        "ur": "Is lesson ka idea Notes mein 5 lines JS."
      },
      "exitTicket": {
        "en": "What clicked in this lesson?",
        "ur": "Is lesson mein kya click hua?"
      },
      "cards": [
        {
          "front": {
            "en": "Branches key idea",
            "ur": "Branches key"
          },
          "back": {
            "en": "Control flow with if/else and switches.",
            "ur": "if/else, switch."
          }
        },
        {
          "front": {
            "en": "Branches pitfall",
            "ur": "Branches pitfall"
          },
          "back": {
            "en": "Read errors; test edges",
            "ur": "Errors parho; edges test"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>Branches choose paths. Keep conditions readable. Avoid deep nesting — early return helps. Switch fits discrete cases.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>Branches path choose. Conditions readable. Deep nesting avoid — early return. Switch discrete cases.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>Branches choose paths. Keep conditions readable. Avoid deep nesting — early return helps. Switch fits discrete cases.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>Branches path choose. Conditions readable. Deep nesting avoid — early return. Switch discrete cases.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>Branches choose paths. Keep conditions readable. Avoid deep nesting — early return helps. Switch fits discrete cases.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>Branches path choose. Conditions readable. Deep nesting avoid — early return. Switch discrete cases.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>Branches choose paths. Keep conditions readable. Avoid deep nesting — early return helps. Switch fits discrete cases.</p>",
          "ur": "<p>Branches path choose. Conditions readable. Deep nesting avoid — early return. Switch discrete cases.</p>"
        }
      }
    },
    {
      "id": "fe201-4",
      "title": {
        "en": "Loops",
        "ur": "Loops"
      },
      "objective": {
        "en": "Repeat with for and while safely.",
        "ur": "for/while safe."
      },
      "warmUp": {
        "en": "What breaks if this concept is wrong?",
        "ur": "Agar ye concept galat ho to kya toot?"
      },
      "teach": {
        "en": "<p>for, while, for...of. Always ensure an exit. Off-by-one errors are common. Prefer clear loop variables.</p>",
        "ur": "<p>for, while, for...of. Exit pakka. Off-by-one common. Clear variables.</p>"
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Infinite loops happen when:",
            "ur": "Infinite loops kab hote:"
          },
          "opts": {
            "en": [
              "Exit condition never met",
              "CSS too pretty",
              "alt missing"
            ],
            "ur": [
              "Exit kabhi nahi",
              "CSS pretty",
              "alt"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Check the condition.",
            "ur": "Condition check."
          }
        },
        {
          "q": {
            "en": "for...of iterates:",
            "ur": "for...of kya iterate karta:"
          },
          "opts": {
            "en": [
              "Iterable values",
              "Only DNS records",
              "Only margins"
            ],
            "ur": [
              "Iterable values",
              "DNS",
              "Margins"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Values not indices (by default story).",
            "ur": "Values, indices nahi (default story)."
          }
        },
        {
          "q": {
            "en": "Off-by-one means:",
            "ur": "Off-by-one:"
          },
          "opts": {
            "en": [
              "Boundary mistake in counts",
              "A design trend",
              "A certificate"
            ],
            "ur": [
              "Count boundary galti",
              "Design trend",
              "Cert"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Test edges.",
            "ur": "Edges test."
          }
        }
      ],
      "practice": {
        "en": "Write 5 lines of JS in Notes exercising this lesson’s idea.",
        "ur": "Is lesson ka idea Notes mein 5 lines JS."
      },
      "exitTicket": {
        "en": "What clicked in this lesson?",
        "ur": "Is lesson mein kya click hua?"
      },
      "cards": [
        {
          "front": {
            "en": "Loops key idea",
            "ur": "Loops key"
          },
          "back": {
            "en": "Repeat with for and while safely.",
            "ur": "for/while safe."
          }
        },
        {
          "front": {
            "en": "Loops pitfall",
            "ur": "Loops pitfall"
          },
          "back": {
            "en": "Read errors; test edges",
            "ur": "Errors parho; edges test"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>for, while, for...of. Always ensure an exit. Off-by-one errors are common. Prefer clear loop variables.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>for, while, for...of. Exit pakka. Off-by-one common. Clear variables.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>for, while, for...of. Always ensure an exit. Off-by-one errors are common. Prefer clear loop variables.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>for, while, for...of. Exit pakka. Off-by-one common. Clear variables.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>for, while, for...of. Always ensure an exit. Off-by-one errors are common. Prefer clear loop variables.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>for, while, for...of. Exit pakka. Off-by-one common. Clear variables.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>for, while, for...of. Always ensure an exit. Off-by-one errors are common. Prefer clear loop variables.</p>",
          "ur": "<p>for, while, for...of. Exit pakka. Off-by-one common. Clear variables.</p>"
        }
      }
    },
    {
      "id": "fe201-5",
      "title": {
        "en": "Functions",
        "ur": "Functions"
      },
      "objective": {
        "en": "Write reusable functions with parameters.",
        "ur": "Parameters ke sath functions."
      },
      "warmUp": {
        "en": "What breaks if this concept is wrong?",
        "ur": "Agar ye concept galat ho to kya toot?"
      },
      "teach": {
        "en": "<p>Functions package behavior. Parameters in; return out. Pure functions easier to test. Avoid huge functions — one job each.</p>",
        "ur": "<p>Functions behavior pack. Params in; return out. Pure = test easy. Ek kaam per function.</p>"
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "A return statement:",
            "ur": "return statement kya karta:"
          },
          "opts": {
            "en": [
              "Sends a value back",
              "Deletes memory always",
              "Sets DNS"
            ],
            "ur": [
              "Value wapas",
              "Memory delete",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Output of function.",
            "ur": "Function output."
          }
        },
        {
          "q": {
            "en": "Parameters are:",
            "ur": "Parameters:"
          },
          "opts": {
            "en": [
              "Inputs",
              "CSS colors",
              "Servers"
            ],
            "ur": [
              "Inputs",
              "CSS",
              "Servers"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Caller provides args.",
            "ur": "Caller args."
          }
        },
        {
          "q": {
            "en": "One job per function aids:",
            "ur": "Ek kaam per function help karta:"
          },
          "opts": {
            "en": [
              "Clarity and reuse",
              "Confusion",
              "Packet loss"
            ],
            "ur": [
              "Clarity/reuse",
              "Confusion",
              "Packet loss"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Composition.",
            "ur": "Composition."
          }
        }
      ],
      "practice": {
        "en": "Write 5 lines of JS in Notes exercising this lesson’s idea.",
        "ur": "Is lesson ka idea Notes mein 5 lines JS."
      },
      "exitTicket": {
        "en": "What clicked in this lesson?",
        "ur": "Is lesson mein kya click hua?"
      },
      "cards": [
        {
          "front": {
            "en": "Functions key idea",
            "ur": "Functions key"
          },
          "back": {
            "en": "Write reusable functions with parameters.",
            "ur": "Parameters ke sath functions."
          }
        },
        {
          "front": {
            "en": "Functions pitfall",
            "ur": "Functions pitfall"
          },
          "back": {
            "en": "Read errors; test edges",
            "ur": "Errors parho; edges test"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>Functions package behavior. Parameters in; return out. Pure functions easier to test. Avoid huge functions — one job each.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>Functions behavior pack. Params in; return out. Pure = test easy. Ek kaam per function.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>Functions package behavior. Parameters in; return out. Pure functions easier to test. Avoid huge functions — one job each.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>Functions behavior pack. Params in; return out. Pure = test easy. Ek kaam per function.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>Functions package behavior. Parameters in; return out. Pure functions easier to test. Avoid huge functions — one job each.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>Functions behavior pack. Params in; return out. Pure = test easy. Ek kaam per function.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>Functions package behavior. Parameters in; return out. Pure functions easier to test. Avoid huge functions — one job each.</p>",
          "ur": "<p>Functions behavior pack. Params in; return out. Pure = test easy. Ek kaam per function.</p>"
        }
      }
    },
    {
      "id": "fe201-6",
      "title": {
        "en": "Arrays",
        "ur": "Arrays"
      },
      "objective": {
        "en": "Store ordered lists and transform them.",
        "ur": "Ordered lists + transform."
      },
      "warmUp": {
        "en": "What breaks if this concept is wrong?",
        "ur": "Agar ye concept galat ho to kya toot?"
      },
      "teach": {
        "en": "<p>Arrays are ordered lists. Index from 0. map/filter/reduce mindset even if you write loops first. Mutating vs copying matters.</p>",
        "ur": "<p>Arrays ordered. Index 0. map/filter soch — pehle loops OK. Mutate vs copy.</p>"
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "First index is:",
            "ur": "Pehla index:"
          },
          "opts": {
            "en": [
              "0",
              "1 always",
              "−1"
            ],
            "ur": [
              "0",
              "Hamesha 1",
              "−1"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Zero-based.",
            "ur": "Zero-based."
          }
        },
        {
          "q": {
            "en": "filter is for:",
            "ur": "filter:"
          },
          "opts": {
            "en": [
              "Keeping items that match",
              "Styling fonts",
              "HTTP only"
            ],
            "ur": [
              "Match items rakhna",
              "Fonts",
              "HTTP"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Select subset.",
            "ur": "Subset."
          }
        },
        {
          "q": {
            "en": "map returns:",
            "ur": "map:"
          },
          "opts": {
            "en": [
              "A new array of results",
              "Nothing",
              "A certificate"
            ],
            "ur": [
              "Naya result array",
              "Kuch nahi",
              "Cert"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Transform.",
            "ur": "Transform."
          }
        }
      ],
      "practice": {
        "en": "Write 5 lines of JS in Notes exercising this lesson’s idea.",
        "ur": "Is lesson ka idea Notes mein 5 lines JS."
      },
      "exitTicket": {
        "en": "What clicked in this lesson?",
        "ur": "Is lesson mein kya click hua?"
      },
      "cards": [
        {
          "front": {
            "en": "Arrays key idea",
            "ur": "Arrays key"
          },
          "back": {
            "en": "Store ordered lists and transform them.",
            "ur": "Ordered lists + transform."
          }
        },
        {
          "front": {
            "en": "Arrays pitfall",
            "ur": "Arrays pitfall"
          },
          "back": {
            "en": "Read errors; test edges",
            "ur": "Errors parho; edges test"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>Arrays are ordered lists. Index from 0. map/filter/reduce mindset even if you write loops first. Mutating vs copying matters.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>Arrays ordered. Index 0. map/filter soch — pehle loops OK. Mutate vs copy.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>Arrays are ordered lists. Index from 0. map/filter/reduce mindset even if you write loops first. Mutating vs copying matters.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>Arrays ordered. Index 0. map/filter soch — pehle loops OK. Mutate vs copy.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>Arrays are ordered lists. Index from 0. map/filter/reduce mindset even if you write loops first. Mutating vs copying matters.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>Arrays ordered. Index 0. map/filter soch — pehle loops OK. Mutate vs copy.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>Arrays are ordered lists. Index from 0. map/filter/reduce mindset even if you write loops first. Mutating vs copying matters.</p>",
          "ur": "<p>Arrays ordered. Index 0. map/filter soch — pehle loops OK. Mutate vs copy.</p>"
        }
      }
    },
    {
      "id": "fe201-7",
      "title": {
        "en": "Objects",
        "ur": "Objects"
      },
      "objective": {
        "en": "Model things with key/value objects.",
        "ur": "Key/value objects."
      },
      "warmUp": {
        "en": "What breaks if this concept is wrong?",
        "ur": "Agar ye concept galat ho to kya toot?"
      },
      "teach": {
        "en": "<p>Objects map keys to values. Dot vs bracket access. Nested objects model apps (user.progress.score). JSON is object notation for data exchange.</p>",
        "ur": "<p>Objects key→value. Dot vs bracket. Nested = app model. JSON = data exchange.</p>"
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
              "Data format inspired by object notation",
              "A CSS framework",
              "A bank"
            ],
            "ur": [
              "Object-notation data format",
              "CSS framework",
              "Bank"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Language of APIs.",
            "ur": "APIs ki language."
          }
        },
        {
          "q": {
            "en": "Bracket access helps when:",
            "ur": "Bracket access kab help karta:"
          },
          "opts": {
            "en": [
              "Key is dynamic",
              "Keys never exist",
              "Only for HTML"
            ],
            "ur": [
              "Dynamic key",
              "Keys nahi",
              "Sirf HTML"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Computed keys.",
            "ur": "Computed keys."
          }
        },
        {
          "q": {
            "en": "Objects are good for:",
            "ur": "Objects achhe kis liye:"
          },
          "opts": {
            "en": [
              "Named fields",
              "Only loops",
              "Only margins"
            ],
            "ur": [
              "Named fields",
              "Sirf loops",
              "Margins"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Records of properties.",
            "ur": "Properties ke records."
          }
        }
      ],
      "practice": {
        "en": "Write 5 lines of JS in Notes exercising this lesson’s idea.",
        "ur": "Is lesson ka idea Notes mein 5 lines JS."
      },
      "exitTicket": {
        "en": "What clicked in this lesson?",
        "ur": "Is lesson mein kya click hua?"
      },
      "cards": [
        {
          "front": {
            "en": "Objects key idea",
            "ur": "Objects key"
          },
          "back": {
            "en": "Model things with key/value objects.",
            "ur": "Key/value objects."
          }
        },
        {
          "front": {
            "en": "Objects pitfall",
            "ur": "Objects pitfall"
          },
          "back": {
            "en": "Read errors; test edges",
            "ur": "Errors parho; edges test"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>Objects map keys to values. Dot vs bracket access. Nested objects model apps (user.progress.score). JSON is object notation for data exchange.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>Objects key→value. Dot vs bracket. Nested = app model. JSON = data exchange.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>Objects map keys to values. Dot vs bracket access. Nested objects model apps (user.progress.score). JSON is object notation for data exchange.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>Objects key→value. Dot vs bracket. Nested = app model. JSON = data exchange.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>Objects map keys to values. Dot vs bracket access. Nested objects model apps (user.progress.score). JSON is object notation for data exchange.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>Objects key→value. Dot vs bracket. Nested = app model. JSON = data exchange.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>Objects map keys to values. Dot vs bracket access. Nested objects model apps (user.progress.score). JSON is object notation for data exchange.</p>",
          "ur": "<p>Objects key→value. Dot vs bracket. Nested = app model. JSON = data exchange.</p>"
        }
      }
    },
    {
      "id": "fe201-8",
      "title": {
        "en": "Errors and Debugging",
        "ur": "Errors aur Debugging"
      },
      "objective": {
        "en": "Read stack traces and fix mistakes.",
        "ur": "Stack traces parho."
      },
      "warmUp": {
        "en": "What breaks if this concept is wrong?",
        "ur": "Agar ye concept galat ho to kya toot?"
      },
      "teach": {
        "en": "<p>Errors are information. Read the message, file, line. Console.log strategically. Reproduce minimally. DevTools debugger breakpoints help.</p>",
        "ur": "<p>Errors information. Message, file, line. Strategic log. Minimal reproduce. Breakpoints.</p>"
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "First step with an error:",
            "ur": "Error pe pehla qadam:"
          },
          "opts": {
            "en": [
              "Read the message carefully",
              "Delete the project",
              "Buy a new phone"
            ],
            "ur": [
              "Message carefully parho",
              "Project delete",
              "Naya phone"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Text is the clue.",
            "ur": "Text clue."
          }
        },
        {
          "q": {
            "en": "Reproduce means:",
            "ur": "Reproduce:"
          },
          "opts": {
            "en": [
              "Make the bug happen reliably",
              "Ignore it",
              "Hide CSS"
            ],
            "ur": [
              "Bug reliably",
              "Ignore",
              "CSS hide"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Then bisect.",
            "ur": "Phir bisect."
          }
        },
        {
          "q": {
            "en": "console.log is:",
            "ur": "console.log:"
          },
          "opts": {
            "en": [
              "A temporary inspection tool",
              "Production architecture",
              "DNS config"
            ],
            "ur": [
              "Temporary inspect",
              "Prod architecture",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Remove noise later.",
            "ur": "Baad mein hatao."
          }
        }
      ],
      "practice": {
        "en": "Write 5 lines of JS in Notes exercising this lesson’s idea.",
        "ur": "Is lesson ka idea Notes mein 5 lines JS."
      },
      "exitTicket": {
        "en": "What clicked in this lesson?",
        "ur": "Is lesson mein kya click hua?"
      },
      "cards": [
        {
          "front": {
            "en": "Errors and Debugging key idea",
            "ur": "Errors aur Debugging key"
          },
          "back": {
            "en": "Read stack traces and fix mistakes.",
            "ur": "Stack traces parho."
          }
        },
        {
          "front": {
            "en": "Errors and Debugging pitfall",
            "ur": "Errors aur Debugging pitfall"
          },
          "back": {
            "en": "Read errors; test edges",
            "ur": "Errors parho; edges test"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>Errors are information. Read the message, file, line. Console.log strategically. Reproduce minimally. DevTools debugger breakpoints help.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>Errors information. Message, file, line. Strategic log. Minimal reproduce. Breakpoints.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>Errors are information. Read the message, file, line. Console.log strategically. Reproduce minimally. DevTools debugger breakpoints help.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>Errors information. Message, file, line. Strategic log. Minimal reproduce. Breakpoints.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>Errors are information. Read the message, file, line. Console.log strategically. Reproduce minimally. DevTools debugger breakpoints help.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>Errors information. Message, file, line. Strategic log. Minimal reproduce. Breakpoints.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>Errors are information. Read the message, file, line. Console.log strategically. Reproduce minimally. DevTools debugger breakpoints help.</p>",
          "ur": "<p>Errors information. Message, file, line. Strategic log. Minimal reproduce. Breakpoints.</p>"
        }
      }
    }
  ],
  "finalQuiz": [
    {
      "q": {
        "en": "Prefer by default:",
        "ur": "Default:"
      },
      "opts": {
        "en": [
          "const",
          "var always",
          "no names"
        ],
        "ur": [
          "const",
          "hamesha var",
          "no names"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Clear bindings.",
        "ur": "Clear bindings."
      }
    },
    {
      "q": {
        "en": "Strict equality:",
        "ur": "Strict equality:"
      },
      "opts": {
        "en": [
          "===",
          "≈",
          "=~"
        ],
        "ur": [
          "===",
          "≈",
          "=~"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "No coercion surprises.",
        "ur": "Coercion surprises nahi."
      }
    },
    {
      "q": {
        "en": "Array first index:",
        "ur": "Array pehla index:"
      },
      "opts": {
        "en": [
          "0",
          "1",
          "2"
        ],
        "ur": [
          "0",
          "1",
          "2"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Zero-based.",
        "ur": "Zero-based."
      }
    },
    {
      "q": {
        "en": "JSON used for:",
        "ur": "JSON:"
      },
      "opts": {
        "en": [
          "Data interchange",
          "Painting walls",
          "Growing plants"
        ],
        "ur": [
          "Data interchange",
          "Walls",
          "Plants"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "APIs + storage.",
        "ur": "APIs + storage."
      }
    },
    {
      "q": {
        "en": "On error, first:",
        "ur": "Error pe pehle:"
      },
      "opts": {
        "en": [
          "Read the message",
          "Delete node_modules always",
          "Ignore"
        ],
        "ur": [
          "Message parho",
          "hamesha node_modules delete",
          "Ignore"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Clues first.",
        "ur": "Pehle clues."
      }
    },
    {
      "q": {
        "en": "Functions should usually:",
        "ur": "Functions:"
      },
      "opts": {
        "en": [
          "Do one clear job",
          "Do everything",
          "Never return"
        ],
        "ur": [
          "Ek clear kaam",
          "Sab kuch",
          "Kabhi return nahi"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Composition.",
        "ur": "Composition."
      }
    }
  ],
  "passScore": 85,
  "project": {
    "id": "js-literacy-attest",
    "title": {
      "en": "JS literacy attestations",
      "ur": "JS literacy attest"
    },
    "items": [
      {
        "id": "types",
        "en": "List 3 JS primitive types you used",
        "ur": "3 JS primitive types"
      },
      {
        "id": "fn",
        "en": "Write a function with a return value",
        "ur": "Return wali function"
      },
      {
        "id": "loop",
        "en": "Write a for or for...of that visits an array",
        "ur": "Array pe for / for...of"
      }
    ]
  }
};
export default COURSE;
