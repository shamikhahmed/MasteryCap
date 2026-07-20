/* WEB-103 — In Session */
export const COURSE = {
  "code": "WEB-103",
  "title": {
    "en": "CSS: Layout, Type, and Space",
    "ur": "CSS: Layout, Type, Space"
  },
  "lessons": [
    {
      "id": "w103-1",
      "title": {
        "en": "CSS Purpose",
        "ur": "CSS Ka Maqsad"
      },
      "objective": {
        "en": "Separate style from structure.",
        "ur": "Style structure se alag."
      },
      "warmUp": {
        "en": "Why not put all colors in HTML attributes forever?",
        "ur": "HTML attrs mein colors kyun nahi?"
      },
      "teach": {
        "en": "<p>CSS paints and lays out HTML. Separation keeps meaning stable while look changes. Selectors target elements; properties assign values.</p>",
        "ur": "<p>CSS HTML ko paint/layout. Meaning stable; look change. Selectors + properties.</p>"
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "CSS controls:",
            "ur": "CSS:"
          },
          "opts": {
            "en": [
              "Presentation and layout",
              "DNS",
              "Battery chemistry"
            ],
            "ur": [
              "Presentation/layout",
              "DNS",
              "Battery"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Look and layout.",
            "ur": "Look + layout."
          }
        },
        {
          "q": {
            "en": "Separation of concerns means:",
            "ur": "Separation:"
          },
          "opts": {
            "en": [
              "HTML meaning, CSS look",
              "Mix everything always",
              "No CSS ever"
            ],
            "ur": [
              "HTML meaning, CSS look",
              "Mix",
              "No CSS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Maintainability.",
            "ur": "Maintainability."
          }
        },
        {
          "q": {
            "en": "A declaration is:",
            "ur": "Declaration:"
          },
          "opts": {
            "en": [
              "property: value",
              "A loan",
              "A packet"
            ],
            "ur": [
              "property: value",
              "Loan",
              "Packet"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "CSS syntax unit.",
            "ur": "CSS unit."
          }
        }
      ],
      "practice": {
        "en": "Write three declarations you would apply to body text.",
        "ur": "Body text ke 3 declarations."
      },
      "exitTicket": {
        "en": "Changed: style is a layer.",
        "ur": "Badla: style ek layer."
      },
      "cards": [
        {
          "front": {
            "en": "CSS role",
            "ur": "CSS"
          },
          "back": {
            "en": "Presentation/layout",
            "ur": "Presentation/layout"
          }
        },
        {
          "front": {
            "en": "Selector",
            "ur": "Selector"
          },
          "back": {
            "en": "What to style",
            "ur": "Kya style"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>CSS paints and lays out HTML. Separation keeps meaning stable while look changes. Selectors target elements; properties assign values.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>CSS HTML ko paint/layout. Meaning stable; look change. Selectors + properties.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>CSS paints and lays out HTML. Separation keeps meaning stable while look changes. Selectors target elements; properties assign values.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>CSS HTML ko paint/layout. Meaning stable; look change. Selectors + properties.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>CSS paints and lays out HTML. Separation keeps meaning stable while look changes. Selectors target elements; properties assign values.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>CSS HTML ko paint/layout. Meaning stable; look change. Selectors + properties.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>CSS paints and lays out HTML. Separation keeps meaning stable while look changes. Selectors target elements; properties assign values.</p>",
          "ur": "<p>CSS HTML ko paint/layout. Meaning stable; look change. Selectors + properties.</p>"
        }
      }
    },
    {
      "id": "w103-2",
      "title": {
        "en": "Box Model",
        "ur": "Box Model"
      },
      "objective": {
        "en": "Explain content, padding, border, margin.",
        "ur": "Content, padding, border, margin."
      },
      "warmUp": {
        "en": "Does margin sit inside or outside the border?",
        "ur": "Margin border ke andar ya bahar?"
      },
      "teach": {
        "en": "<p>Every element is a box: content → padding → border → margin. Width/height usually refer to content unless box-sizing changes. Margin collapses between vertical siblings.</p>",
        "ur": "<p>Har element box: content→padding→border→margin. box-sizing rules. Vertical margin collapse.</p>"
      },
      "visual": "box-model",
      "check": [
        {
          "q": {
            "en": "Outside the border sits:",
            "ur": "Border ke bahar:"
          },
          "opts": {
            "en": [
              "Margin",
              "Padding",
              "Only content"
            ],
            "ur": [
              "Margin",
              "Padding",
              "Sirf content"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Margin is outside.",
            "ur": "Margin bahar."
          }
        },
        {
          "q": {
            "en": "Padding is:",
            "ur": "Padding:"
          },
          "opts": {
            "en": [
              "Space inside the border",
              "Space outside everything",
              "A JS loop"
            ],
            "ur": [
              "Border ke andar space",
              "Bahar space",
              "JS loop"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Inner cushion.",
            "ur": "Andar cushion."
          }
        },
        {
          "q": {
            "en": "box-sizing: border-box makes width include:",
            "ur": "border-box width:"
          },
          "opts": {
            "en": [
              "Padding and border",
              "Only margin",
              "DNS TTL"
            ],
            "ur": [
              "Padding+border",
              "Sirf margin",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Predictable sizing.",
            "ur": "Predictable sizing."
          }
        }
      ],
      "practice": {
        "en": "Draw the box model and label all four layers.",
        "ur": "Box model draw + 4 labels."
      },
      "exitTicket": {
        "en": "Changed: layout is boxes all the way down.",
        "ur": "Badla: layout = boxes."
      },
      "cards": [
        {
          "front": {
            "en": "Four layers",
            "ur": "Char layers"
          },
          "back": {
            "en": "content padding border margin",
            "ur": "content padding border margin"
          }
        },
        {
          "front": {
            "en": "border-box",
            "ur": "border-box"
          },
          "back": {
            "en": "Width includes pad+border",
            "ur": "Width mein pad+border"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>Every element is a box: content → padding → border → margin. Width/height usually refer to content unless box-sizing changes. Margin collapses between vertical siblings.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>Har element box: content→padding→border→margin. box-sizing rules. Vertical margin collapse.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>Every element is a box: content → padding → border → margin. Width/height usually refer to content unless box-sizing changes. Margin collapses between vertical siblings.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>Har element box: content→padding→border→margin. box-sizing rules. Vertical margin collapse.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>Every element is a box: content → padding → border → margin. Width/height usually refer to content unless box-sizing changes. Margin collapses between vertical siblings.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>Har element box: content→padding→border→margin. box-sizing rules. Vertical margin collapse.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>Every element is a box: content → padding → border → margin. Width/height usually refer to content unless box-sizing changes. Margin collapses between vertical siblings.</p>",
          "ur": "<p>Har element box: content→padding→border→margin. box-sizing rules. Vertical margin collapse.</p>"
        }
      }
    },
    {
      "id": "w103-3",
      "title": {
        "en": "Flexbox",
        "ur": "Flexbox"
      },
      "objective": {
        "en": "Align items in one dimension with flex.",
        "ur": "Flex se ek dimension align."
      },
      "warmUp": {
        "en": "How do you center a row of buttons easily?",
        "ur": "Buttons row center kaise?"
      },
      "teach": {
        "en": "<p>Flexbox: container with display:flex; main axis vs cross axis; justify-content and align-items. Great for toolbars and simple responsive rows.</p>",
        "ur": "<p>Flex: display:flex; main vs cross; justify/align. Toolbars + simple rows.</p>"
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Flex direction default is:",
            "ur": "Default flex-direction:"
          },
          "opts": {
            "en": [
              "Row",
              "Column-reverse only",
              "Diagonal"
            ],
            "ur": [
              "Row",
              "Sirf column-reverse",
              "Diagonal"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Main axis horizontal by default.",
            "ur": "Default horizontal."
          }
        },
        {
          "q": {
            "en": "justify-content affects:",
            "ur": "justify-content:"
          },
          "opts": {
            "en": [
              "Main axis distribution",
              "Font files",
              "DNS"
            ],
            "ur": [
              "Main axis",
              "Fonts",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Space along main axis.",
            "ur": "Main axis space."
          }
        },
        {
          "q": {
            "en": "align-items affects:",
            "ur": "align-items:"
          },
          "opts": {
            "en": [
              "Cross axis",
              "HTTP status",
              "Certificates"
            ],
            "ur": [
              "Cross axis",
              "HTTP",
              "Certs"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Cross-axis alignment.",
            "ur": "Cross-axis."
          }
        }
      ],
      "practice": {
        "en": "Describe flex settings to space three equal cards in a row.",
        "ur": "Teen equal cards row — flex settings."
      },
      "exitTicket": {
        "en": "Changed: flex = one-dimensional layout power.",
        "ur": "Badla: flex = 1D power."
      },
      "cards": [
        {
          "front": {
            "en": "display:flex",
            "ur": "display:flex"
          },
          "back": {
            "en": "Flex container",
            "ur": "Flex container"
          }
        },
        {
          "front": {
            "en": "Main vs cross",
            "ur": "Main vs cross"
          },
          "back": {
            "en": "Primary vs perpendicular axis",
            "ur": "Primary vs perpendicular"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>Flexbox: container with display:flex; main axis vs cross axis; justify-content and align-items. Great for toolbars and simple responsive rows.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>Flex: display:flex; main vs cross; justify/align. Toolbars + simple rows.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>Flexbox: container with display:flex; main axis vs cross axis; justify-content and align-items. Great for toolbars and simple responsive rows.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>Flex: display:flex; main vs cross; justify/align. Toolbars + simple rows.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>Flexbox: container with display:flex; main axis vs cross axis; justify-content and align-items. Great for toolbars and simple responsive rows.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>Flex: display:flex; main vs cross; justify/align. Toolbars + simple rows.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>Flexbox: container with display:flex; main axis vs cross axis; justify-content and align-items. Great for toolbars and simple responsive rows.</p>",
          "ur": "<p>Flex: display:flex; main vs cross; justify/align. Toolbars + simple rows.</p>"
        }
      }
    },
    {
      "id": "w103-4",
      "title": {
        "en": "Grid Basics",
        "ur": "Grid Basics"
      },
      "objective": {
        "en": "Place items in two dimensions with grid.",
        "ur": "Grid se 2D place."
      },
      "warmUp": {
        "en": "When is grid better than flex?",
        "ur": "Grid flex se kab better?"
      },
      "teach": {
        "en": "<p>CSS Grid defines rows and columns. Good for page frames and card matrices. grid-template-columns with fr units shares space.</p>",
        "ur": "<p>Grid rows/columns. Page frames + card matrices. fr units space share.</p>"
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Grid is strong at:",
            "ur": "Grid strong:"
          },
          "opts": {
            "en": [
              "Two-dimensional layouts",
              "Only animations",
              "Packet routing"
            ],
            "ur": [
              "2D layouts",
              "Sirf animations",
              "Packets"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Rows + columns.",
            "ur": "Rows + columns."
          }
        },
        {
          "q": {
            "en": "fr unit means:",
            "ur": "fr:"
          },
          "opts": {
            "en": [
              "Fraction of free space",
              "French language",
              "Fail rate"
            ],
            "ur": [
              "Free space fraction",
              "French",
              "Fail rate"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Flexible tracks.",
            "ur": "Flexible tracks."
          }
        },
        {
          "q": {
            "en": "Use flex when:",
            "ur": "Flex kab:"
          },
          "opts": {
            "en": [
              "One-dimensional alignment mainly",
              "You need DNS",
              "Never"
            ],
            "ur": [
              "1D alignment",
              "DNS",
              "Kabhi nahi"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Right tool per job.",
            "ur": "Sahi tool."
          }
        }
      ],
      "practice": {
        "en": "Sketch a 2-column layout: sidebar + main.",
        "ur": "2-column: sidebar + main sketch."
      },
      "exitTicket": {
        "en": "Changed: grid frames pages; flex lines up rows.",
        "ur": "Badla: grid page; flex row."
      },
      "cards": [
        {
          "front": {
            "en": "Grid dim",
            "ur": "Grid"
          },
          "back": {
            "en": "2D",
            "ur": "2D"
          }
        },
        {
          "front": {
            "en": "fr",
            "ur": "fr"
          },
          "back": {
            "en": "Fraction of free space",
            "ur": "Free space fraction"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>CSS Grid defines rows and columns. Good for page frames and card matrices. grid-template-columns with fr units shares space.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>Grid rows/columns. Page frames + card matrices. fr units space share.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>CSS Grid defines rows and columns. Good for page frames and card matrices. grid-template-columns with fr units shares space.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>Grid rows/columns. Page frames + card matrices. fr units space share.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>CSS Grid defines rows and columns. Good for page frames and card matrices. grid-template-columns with fr units shares space.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>Grid rows/columns. Page frames + card matrices. fr units space share.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>CSS Grid defines rows and columns. Good for page frames and card matrices. grid-template-columns with fr units shares space.</p>",
          "ur": "<p>Grid rows/columns. Page frames + card matrices. fr units space share.</p>"
        }
      }
    },
    {
      "id": "w103-5",
      "title": {
        "en": "Type and Space",
        "ur": "Type aur Space"
      },
      "objective": {
        "en": "Set a type scale and consistent spacing.",
        "ur": "Type scale + consistent space."
      },
      "warmUp": {
        "en": "Why does random font size feel cheap?",
        "ur": "Random font size sasta kyun?"
      },
      "teach": {
        "en": "<p>Pick a small type scale (e.g. 14/16/20/28). Use a spacing rhythm (8px grid). Line-length ~45–75 characters for reading. Avoid Inter-as-default sameness — intentional pairs matter.</p>",
        "ur": "<p>Type scale chhota set. 8px spacing rhythm. Line length ~45–75. Random Inter sameness avoid — intentional fonts.</p>"
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
              "Only one size ever"
            ],
            "ur": [
              "Planned sizes",
              "Infinite random",
              "Sirf ek"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Constraint = craft.",
            "ur": "Constraint = craft."
          }
        },
        {
          "q": {
            "en": "Spacing rhythm often uses:",
            "ur": "Spacing rhythm:"
          },
          "opts": {
            "en": [
              "An 8px grid",
              "Pi to 100 decimals",
              "Mood swings"
            ],
            "ur": [
              "8px grid",
              "Pi",
              "Mood"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Predictable gaps.",
            "ur": "Predictable gaps."
          }
        },
        {
          "q": {
            "en": "Long line lengths:",
            "ur": "Lambi lines:"
          },
          "opts": {
            "en": [
              "Hurt reading",
              "Always improve UX",
              "Fix DNS"
            ],
            "ur": [
              "Reading hurt",
              "Hamesha better",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Measure matters.",
            "ur": "Measure matter."
          }
        }
      ],
      "practice": {
        "en": "Define 4 font sizes and 4 spacing steps for a prospectus.",
        "ur": "Prospectus: 4 sizes + 4 spacing steps."
      },
      "exitTicket": {
        "en": "Changed: systems beat one-off tweaks.",
        "ur": "Badla: systems > one-off."
      },
      "cards": [
        {
          "front": {
            "en": "Type scale",
            "ur": "Type scale"
          },
          "back": {
            "en": "Planned size set",
            "ur": "Planned sizes"
          }
        },
        {
          "front": {
            "en": "8px grid",
            "ur": "8px"
          },
          "back": {
            "en": "Spacing rhythm",
            "ur": "Spacing rhythm"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>Pick a small type scale (e.g. 14/16/20/28). Use a spacing rhythm (8px grid). Line-length ~45–75 characters for reading. Avoid Inter-as-default sameness — intentional pairs matter.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>Type scale chhota set. 8px spacing rhythm. Line length ~45–75. Random Inter sameness avoid — intentional fonts.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>Pick a small type scale (e.g. 14/16/20/28). Use a spacing rhythm (8px grid). Line-length ~45–75 characters for reading. Avoid Inter-as-default sameness — intentional pairs matter.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>Type scale chhota set. 8px spacing rhythm. Line length ~45–75. Random Inter sameness avoid — intentional fonts.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>Pick a small type scale (e.g. 14/16/20/28). Use a spacing rhythm (8px grid). Line-length ~45–75 characters for reading. Avoid Inter-as-default sameness — intentional pairs matter.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>Type scale chhota set. 8px spacing rhythm. Line length ~45–75. Random Inter sameness avoid — intentional fonts.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>Pick a small type scale (e.g. 14/16/20/28). Use a spacing rhythm (8px grid). Line-length ~45–75 characters for reading. Avoid Inter-as-default sameness — intentional pairs matter.</p>",
          "ur": "<p>Type scale chhota set. 8px spacing rhythm. Line length ~45–75. Random Inter sameness avoid — intentional fonts.</p>"
        }
      }
    },
    {
      "id": "w103-6",
      "title": {
        "en": "Responsive Prospectus",
        "ur": "Responsive Prospectus"
      },
      "objective": {
        "en": "Make layouts work on narrow phones.",
        "ur": "Narrow phone pe layout."
      },
      "warmUp": {
        "en": "What breaks first on iPhone SE?",
        "ur": "iPhone SE pe pehle kya toot?"
      },
      "teach": {
        "en": "<p>Mobile-first: base styles for small screens; min-width media queries enhance. Test 375px width. Avoid horizontal scroll. Touch targets ≥44px.</p>",
        "ur": "<p>Mobile-first; min-width enhance. 375px test. Horizontal scroll mat. Touch ≥44px.</p>"
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Mobile-first means:",
            "ur": "Mobile-first:"
          },
          "opts": {
            "en": [
              "Base = small screen, enhance up",
              "Desktop only then shrink",
              "Ignore phones"
            ],
            "ur": [
              "Base chhota, up enhance",
              "Desktop pehle",
              "Ignore phones"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Most users on phones.",
            "ur": "Zyada users phone."
          }
        },
        {
          "q": {
            "en": "Horizontal scroll on mobile is:",
            "ur": "Horizontal scroll:"
          },
          "opts": {
            "en": [
              "Usually a bug",
              "A premium feature",
              "Required by DNS"
            ],
            "ur": [
              "Aksar bug",
              "Premium",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Fit the viewport.",
            "ur": "Viewport fit."
          }
        },
        {
          "q": {
            "en": "Touch targets should be:",
            "ur": "Touch targets:"
          },
          "opts": {
            "en": [
              "Large enough to tap",
              "1px links",
              "Hidden"
            ],
            "ur": [
              "Tap-able size",
              "1px",
              "Hidden"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Thumbs are thick.",
            "ur": "Thumbs moti."
          }
        }
      ],
      "practice": {
        "en": "Restyle prospectus checklist: no horizontal scroll at 375px.",
        "ur": "375px pe no horizontal scroll."
      },
      "exitTicket": {
        "en": "Changed: phone is the default campus.",
        "ur": "Badla: phone default campus."
      },
      "cards": [
        {
          "front": {
            "en": "Mobile-first",
            "ur": "Mobile-first"
          },
          "back": {
            "en": "Small base, enhance",
            "ur": "Small base, enhance"
          }
        },
        {
          "front": {
            "en": "SE width",
            "ur": "SE"
          },
          "back": {
            "en": "~375px",
            "ur": "~375px"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>Mobile-first: base styles for small screens; min-width media queries enhance. Test 375px width. Avoid horizontal scroll. Touch targets ≥44px.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>Mobile-first; min-width enhance. 375px test. Horizontal scroll mat. Touch ≥44px.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>Mobile-first: base styles for small screens; min-width media queries enhance. Test 375px width. Avoid horizontal scroll. Touch targets ≥44px.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>Mobile-first; min-width enhance. 375px test. Horizontal scroll mat. Touch ≥44px.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>Mobile-first: base styles for small screens; min-width media queries enhance. Test 375px width. Avoid horizontal scroll. Touch targets ≥44px.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>Mobile-first; min-width enhance. 375px test. Horizontal scroll mat. Touch ≥44px.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>Mobile-first: base styles for small screens; min-width media queries enhance. Test 375px width. Avoid horizontal scroll. Touch targets ≥44px.</p>",
          "ur": "<p>Mobile-first; min-width enhance. 375px test. Horizontal scroll mat. Touch ≥44px.</p>"
        }
      }
    }
  ],
  "finalQuiz": [
    {
      "q": {
        "en": "Box model outer layer:",
        "ur": "Box model bahar:"
      },
      "opts": {
        "en": [
          "Margin",
          "Content",
          "Charset"
        ],
        "ur": [
          "Margin",
          "Content",
          "Charset"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Margin outside.",
        "ur": "Margin bahar."
      }
    },
    {
      "q": {
        "en": "Flex main-axis control:",
        "ur": "Flex main-axis:"
      },
      "opts": {
        "en": [
          "justify-content",
          "alt",
          "DOCTYPE"
        ],
        "ur": [
          "justify-content",
          "alt",
          "DOCTYPE"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Main axis.",
        "ur": "Main axis."
      }
    },
    {
      "q": {
        "en": "Grid is best for:",
        "ur": "Grid best:"
      },
      "opts": {
        "en": [
          "2D layouts",
          "DNS only",
          "Packets"
        ],
        "ur": [
          "2D layouts",
          "DNS",
          "Packets"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Rows+cols.",
        "ur": "Rows+cols."
      }
    },
    {
      "q": {
        "en": "Type scale means:",
        "ur": "Type scale:"
      },
      "opts": {
        "en": [
          "Planned sizes",
          "Random chaos",
          "No text"
        ],
        "ur": [
          "Planned sizes",
          "Chaos",
          "No text"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "System.",
        "ur": "System."
      }
    },
    {
      "q": {
        "en": "Mobile-first base is:",
        "ur": "Mobile-first base:"
      },
      "opts": {
        "en": [
          "Small screen styles",
          "4K only",
          "Print only"
        ],
        "ur": [
          "Small screen",
          "Sirf 4K",
          "Print"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Enhance upward.",
        "ur": "Upar enhance."
      }
    }
  ],
  "passScore": 85,
  "project": {
    "id": "prospectus-css",
    "title": {
      "en": "Style the prospectus three ways",
      "ur": "Prospectus teen styles"
    },
    "items": [
      {
        "id": "box",
        "en": "Clear spacing via box model (no overlap)",
        "ur": "Box model spacing clear"
      },
      {
        "id": "flex",
        "en": "Header or skills row uses flex",
        "ur": "Header/skills flex"
      },
      {
        "id": "resp",
        "en": "Readable at 375px width",
        "ur": "375px pe readable"
      }
    ]
  }
};
export default COURSE;
