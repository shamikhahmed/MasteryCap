/* WEB-102 — In Session */
export const COURSE = {
  "code": "WEB-102",
  "title": {
    "en": "Reading & Writing HTML",
    "ur": "HTML Parho aur Likho"
  },
  "lessons": [
    {
      "id": "w102-1",
      "title": {
        "en": "HTML as Structure",
        "ur": "HTML Structure"
      },
      "objective": {
        "en": "Explain HTML as the document skeleton.",
        "ur": "HTML document skeleton samjhao."
      },
      "warmUp": {
        "en": "If CSS vanished, what would remain?",
        "ur": "CSS gayab ho to kya bache?"
      },
      "teach": {
        "en": "<p>HTML describes meaning and structure: headings, paragraphs, lists, links, forms. Browsers and assistive tech rely on that meaning. Divs everywhere with no semantics make pages hard to navigate.</p><p>Tags nest like boxes in boxes. Invalid nesting confuses the DOM.</p>",
        "ur": "<p>HTML meaning/structure: headings, paragraphs, lists, links, forms. Assistive tech isi pe depend. Sirf divs = mushkil navigation.</p><p>Tags nest. Galat nesting DOM confuse.</p>"
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "HTML’s job is:",
            "ur": "HTML ka kaam:"
          },
          "opts": {
            "en": [
              "Structure and meaning",
              "Pretty animations only",
              "Database queries"
            ],
            "ur": [
              "Structure/meaning",
              "Sirf animations",
              "DB queries"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Structure before paint.",
            "ur": "Pehle structure."
          }
        },
        {
          "q": {
            "en": "Semantic tags help:",
            "ur": "Semantic tags:"
          },
          "opts": {
            "en": [
              "Accessibility and clarity",
              "Only SEO spam",
              "Battery life"
            ],
            "ur": [
              "A11y + clarity",
              "SEO spam",
              "Battery"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Meaning travels with markup.",
            "ur": "Meaning markup ke sath."
          }
        },
        {
          "q": {
            "en": "Nesting means:",
            "ur": "Nesting:"
          },
          "opts": {
            "en": [
              "Elements inside elements",
              "Deleting tags",
              "Hiding CSS"
            ],
            "ur": [
              "Andar elements",
              "Tags delete",
              "CSS hide"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Tree shape.",
            "ur": "Tree shape."
          }
        }
      ],
      "practice": {
        "en": "List 5 semantic tags you already know (or look up once).",
        "ur": "5 semantic tags likho."
      },
      "exitTicket": {
        "en": "Changed: HTML is meaning, not decoration.",
        "ur": "Badla: HTML meaning hai."
      },
      "cards": [
        {
          "front": {
            "en": "HTML provides",
            "ur": "HTML deti"
          },
          "back": {
            "en": "Structure/meaning",
            "ur": "Structure/meaning"
          }
        },
        {
          "front": {
            "en": "Avoid",
            "ur": "Avoid"
          },
          "back": {
            "en": "Div soup without meaning",
            "ur": "Bina meaning div soup"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>HTML describes meaning and structure: headings, paragraphs, lists, links, forms. Browsers and assistive tech rely on that meaning. Divs everywhere with no semantics make pages hard to navigate.Tags nest like boxes in boxes. Invalid nesting confuses the DOM.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>HTML meaning/structure: headings, paragraphs, lists, links, forms. Assistive tech isi pe depend. Sirf divs = mushkil navigation.Tags nest. Galat nesting DOM confuse.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>HTML describes meaning and structure: headings, paragraphs, lists, links, forms. Browsers and assistive tech rely on that meaning. Divs everywhere with no semantics make pages hard to navigate.</p><p>Tags nest like boxes in boxes. Invalid nesting confuses the DOM.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>HTML meaning/structure: headings, paragraphs, lists, links, forms. Assistive tech isi pe depend. Sirf divs = mushkil navigation.</p><p>Tags nest. Galat nesting DOM confuse.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>HTML describes meaning and structure: headings, paragraphs, lists, links, forms. Browsers and assistive tech rely on that meaning. Divs everywhere with no semantics make pages hard to navigate.</p><p>Tags nest like boxes in boxes. Invalid nesting confuses the DOM.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>HTML meaning/structure: headings, paragraphs, lists, links, forms. Assistive tech isi pe depend. Sirf divs = mushkil navigation.</p><p>Tags nest. Galat nesting DOM confuse.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>HTML describes meaning and structure: headings, paragraphs, lists, links, forms. Browsers and assistive tech rely on that meaning. Divs everywhere with no semantics make pages hard to navigate.</p><p>Tags nest like boxes in boxes. Invalid nesting confuses the DOM.</p>",
          "ur": "<p>HTML meaning/structure: headings, paragraphs, lists, links, forms. Assistive tech isi pe depend. Sirf divs = mushkil navigation.</p><p>Tags nest. Galat nesting DOM confuse.</p>"
        }
      }
    },
    {
      "id": "w102-2",
      "title": {
        "en": "Document Skeleton",
        "ur": "Document Skeleton"
      },
      "objective": {
        "en": "Write a valid minimal HTML document.",
        "ur": "Minimal valid HTML likho."
      },
      "warmUp": {
        "en": "What must every HTML page include?",
        "ur": "Har HTML page mein kya zaroori?"
      },
      "teach": {
        "en": "<p>Minimal document: <code>&lt;!DOCTYPE html&gt;</code>, <code>html</code>, <code>head</code> (title, meta charset), <code>body</code>. Charset prevents mojibake. Title shows in the tab.</p><p>Lang attribute helps browsers and screen readers.</p>",
        "ur": "<p>Minimal: doctype, html, head (title, charset), body. Charset mojibake rokta. Title tab pe.</p><p>lang attribute help karta.</p>"
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "DOCTYPE tells the browser:",
            "ur": "DOCTYPE:"
          },
          "opts": {
            "en": [
              "Parse as modern HTML",
              "Ignore the page",
              "Use Word"
            ],
            "ur": [
              "Modern HTML parse",
              "Ignore",
              "Word"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Standards mode.",
            "ur": "Standards mode."
          }
        },
        {
          "q": {
            "en": "charset meta prevents:",
            "ur": "charset:"
          },
          "opts": {
            "en": [
              "Mojibake / wrong characters",
              "Rain",
              "CSS bugs"
            ],
            "ur": [
              "Mojibake",
              "Barish",
              "CSS bugs"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Declare encoding early.",
            "ur": "Encoding jaldi declare."
          }
        },
        {
          "q": {
            "en": "title appears in:",
            "ur": "title:"
          },
          "opts": {
            "en": [
              "The browser tab",
              "The GPU",
              "DNS"
            ],
            "ur": [
              "Browser tab",
              "GPU",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "User-facing label.",
            "ur": "User label."
          }
        }
      ],
      "practice": {
        "en": "Type a minimal HTML page on paper or Notes with your name as title.",
        "ur": "Minimal HTML — title = apna naam."
      },
      "exitTicket": {
        "en": "Changed: pages need a legal skeleton.",
        "ur": "Badla: legal skeleton zaroori."
      },
      "cards": [
        {
          "front": {
            "en": "Minimal pieces",
            "ur": "Minimal"
          },
          "back": {
            "en": "doctype html head body",
            "ur": "doctype html head body"
          }
        },
        {
          "front": {
            "en": "Why charset?",
            "ur": "charset kyun?"
          },
          "back": {
            "en": "Correct text decoding",
            "ur": "Sahi text decode"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>Minimal document: <code>&lt;!DOCTYPE html&gt;</code>, <code>html</code>, <code>head</code> (title, meta charset), <code>body</code>. Charset prevents mojibake. Title shows in the tab.Lang attribute helps browsers and screen readers.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>Minimal: doctype, html, head (title, charset), body. Charset mojibake rokta. Title tab pe.lang attribute help karta.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>Minimal document: <code>&lt;!DOCTYPE html&gt;</code>, <code>html</code>, <code>head</code> (title, meta charset), <code>body</code>. Charset prevents mojibake. Title shows in the tab.</p><p>Lang attribute helps browsers and screen readers.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>Minimal: doctype, html, head (title, charset), body. Charset mojibake rokta. Title tab pe.</p><p>lang attribute help karta.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>Minimal document: <code>&lt;!DOCTYPE html&gt;</code>, <code>html</code>, <code>head</code> (title, meta charset), <code>body</code>. Charset prevents mojibake. Title shows in the tab.</p><p>Lang attribute helps browsers and screen readers.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>Minimal: doctype, html, head (title, charset), body. Charset mojibake rokta. Title tab pe.</p><p>lang attribute help karta.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>Minimal document: <code>&lt;!DOCTYPE html&gt;</code>, <code>html</code>, <code>head</code> (title, meta charset), <code>body</code>. Charset prevents mojibake. Title shows in the tab.</p><p>Lang attribute helps browsers and screen readers.</p>",
          "ur": "<p>Minimal: doctype, html, head (title, charset), body. Charset mojibake rokta. Title tab pe.</p><p>lang attribute help karta.</p>"
        }
      }
    },
    {
      "id": "w102-3",
      "title": {
        "en": "Text and Lists",
        "ur": "Text aur Lists"
      },
      "objective": {
        "en": "Use headings, paragraphs, and lists correctly.",
        "ur": "Headings, p, lists sahi use."
      },
      "warmUp": {
        "en": "Should you skip from h1 to h4 for style?",
        "ur": "Style ke liye h1 se h4 skip?"
      },
      "teach": {
        "en": "<p>One h1 per page (usually). Heading levels form an outline — do not skip for looks (use CSS). Lists: ul for unordered, ol for ordered. Paragraphs for prose.</p>",
        "ur": "<p>Aksar ek h1. Headings outline — looks ke liye skip mat (CSS use). ul/ol. Prose ke liye p.</p>"
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Heading levels should:",
            "ur": "Heading levels:"
          },
          "opts": {
            "en": [
              "Follow outline order",
              "Skip randomly for size",
              "Only use h1 forever"
            ],
            "ur": [
              "Outline order",
              "Random skip",
              "Sirf h1"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Outline = accessibility map.",
            "ur": "Outline = a11y map."
          }
        },
        {
          "q": {
            "en": "ul is for:",
            "ur": "ul:"
          },
          "opts": {
            "en": [
              "Unordered lists",
              "Videos",
              "Passwords"
            ],
            "ur": [
              "Unordered lists",
              "Videos",
              "Passwords"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Bullets when order free.",
            "ur": "Order free → bullets."
          }
        },
        {
          "q": {
            "en": "Style size with:",
            "ur": "Size style:"
          },
          "opts": {
            "en": [
              "CSS, not fake heading levels",
              "Bigger h-tags only",
              "DNS"
            ],
            "ur": [
              "CSS",
              "Bade h-tags",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Separate meaning and look.",
            "ur": "Meaning aur look alag."
          }
        }
      ],
      "practice": {
        "en": "Outline a prospectus: h1 name, h2 About, h2 Skills (ul of 3).",
        "ur": "Prospectus outline: h1, h2 About, h2 Skills ul."
      },
      "exitTicket": {
        "en": "Changed: outline beats fake visual headings.",
        "ur": "Badla: outline > fake headings."
      },
      "cards": [
        {
          "front": {
            "en": "h1 role",
            "ur": "h1"
          },
          "back": {
            "en": "Primary page title",
            "ur": "Primary title"
          }
        },
        {
          "front": {
            "en": "Style vs meaning",
            "ur": "Style vs meaning"
          },
          "back": {
            "en": "CSS vs heading level",
            "ur": "CSS vs heading"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>One h1 per page (usually). Heading levels form an outline — do not skip for looks (use CSS). Lists: ul for unordered, ol for ordered. Paragraphs for prose.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>Aksar ek h1. Headings outline — looks ke liye skip mat (CSS use). ul/ol. Prose ke liye p.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>One h1 per page (usually). Heading levels form an outline — do not skip for looks (use CSS). Lists: ul for unordered, ol for ordered. Paragraphs for prose.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>Aksar ek h1. Headings outline — looks ke liye skip mat (CSS use). ul/ol. Prose ke liye p.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>One h1 per page (usually). Heading levels form an outline — do not skip for looks (use CSS). Lists: ul for unordered, ol for ordered. Paragraphs for prose.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>Aksar ek h1. Headings outline — looks ke liye skip mat (CSS use). ul/ol. Prose ke liye p.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>One h1 per page (usually). Heading levels form an outline — do not skip for looks (use CSS). Lists: ul for unordered, ol for ordered. Paragraphs for prose.</p>",
          "ur": "<p>Aksar ek h1. Headings outline — looks ke liye skip mat (CSS use). ul/ol. Prose ke liye p.</p>"
        }
      }
    },
    {
      "id": "w102-4",
      "title": {
        "en": "Links and Media",
        "ur": "Links aur Media"
      },
      "objective": {
        "en": "Create links and responsible images.",
        "ur": "Links + zimmedar images."
      },
      "warmUp": {
        "en": "What happens if an image has no alt text?",
        "ur": "Image bina alt?"
      },
      "teach": {
        "en": "<p><code>a href</code> creates navigation. Prefer descriptive link text over “click here.” Images need <code>alt</code> for accessibility and when images fail. Decorative images can use empty alt.</p>",
        "ur": "<p>a href navigation. “Click here” se behtar descriptive text. Images ko alt. Decorative = empty alt.</p>"
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Good link text is:",
            "ur": "Achha link text:"
          },
          "opts": {
            "en": [
              "Descriptive of destination",
              "“Click here” always",
              "Random numbers"
            ],
            "ur": [
              "Destination describe",
              "Hamesha click here",
              "Random"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Screen readers announce link text.",
            "ur": "SR link text sunati."
          }
        },
        {
          "q": {
            "en": "alt attribute:",
            "ur": "alt:"
          },
          "opts": {
            "en": [
              "Describes image purpose",
              "Sets border radius",
              "Changes DNS"
            ],
            "ur": [
              "Image purpose",
              "Border radius",
              "DNS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Alt is content for non-visual users.",
            "ur": "Alt non-visual content."
          }
        },
        {
          "q": {
            "en": "href holds:",
            "ur": "href:"
          },
          "opts": {
            "en": [
              "The destination URL",
              "The alt text",
              "The CSS file only"
            ],
            "ur": [
              "Destination URL",
              "Alt",
              "Sirf CSS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Hyperlink reference.",
            "ur": "Hyperlink reference."
          }
        }
      ],
      "practice": {
        "en": "Write one link tag to wikipedia.org with descriptive text.",
        "ur": "wikipedia.org ka descriptive link likho."
      },
      "exitTicket": {
        "en": "Changed: links and alts are content too.",
        "ur": "Badla: links/alts bhi content."
      },
      "cards": [
        {
          "front": {
            "en": "href",
            "ur": "href"
          },
          "back": {
            "en": "Destination URL",
            "ur": "Destination URL"
          }
        },
        {
          "front": {
            "en": "alt",
            "ur": "alt"
          },
          "back": {
            "en": "Image text alternative",
            "ur": "Image alternative"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p><code>a href</code> creates navigation. Prefer descriptive link text over “click here.” Images need <code>alt</code> for accessibility and when images fail. Decorative images can use empty alt.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>a href navigation. “Click here” se behtar descriptive text. Images ko alt. Decorative = empty alt.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p><code>a href</code> creates navigation. Prefer descriptive link text over “click here.” Images need <code>alt</code> for accessibility and when images fail. Decorative images can use empty alt.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>a href navigation. “Click here” se behtar descriptive text. Images ko alt. Decorative = empty alt.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p><code>a href</code> creates navigation. Prefer descriptive link text over “click here.” Images need <code>alt</code> for accessibility and when images fail. Decorative images can use empty alt.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>a href navigation. “Click here” se behtar descriptive text. Images ko alt. Decorative = empty alt.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p><code>a href</code> creates navigation. Prefer descriptive link text over “click here.” Images need <code>alt</code> for accessibility and when images fail. Decorative images can use empty alt.</p>",
          "ur": "<p>a href navigation. “Click here” se behtar descriptive text. Images ko alt. Decorative = empty alt.</p>"
        }
      }
    },
    {
      "id": "w102-5",
      "title": {
        "en": "Forms Basics",
        "ur": "Forms Basics"
      },
      "objective": {
        "en": "Build a simple form with labels.",
        "ur": "Label ke sath simple form."
      },
      "warmUp": {
        "en": "Why must inputs have labels?",
        "ur": "Inputs ko labels kyun?"
      },
      "teach": {
        "en": "<p>Forms collect input: text, email, checkbox, submit. Labels must associate with inputs (for/id). Without labels, forms fail accessibility and tap targets suffer on mobile.</p>",
        "ur": "<p>Forms input leti. Labels for/id se associate. Bina labels a11y fail + mobile pe mushkil.</p>"
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "Labels connect via:",
            "ur": "Labels connect:"
          },
          "opts": {
            "en": [
              "for + id",
              "Dreams",
              "Only CSS"
            ],
            "ur": [
              "for + id",
              "Dreams",
              "Sirf CSS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Explicit association.",
            "ur": "Explicit association."
          }
        },
        {
          "q": {
            "en": "type=email helps:",
            "ur": "type=email:"
          },
          "opts": {
            "en": [
              "Mobile keyboards + basic validation",
              "Hacking banks",
              "Faster Wi‑Fi"
            ],
            "ur": [
              "Mobile keyboard + validation",
              "Banks hack",
              "Wi‑Fi"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Right input type = better UX.",
            "ur": "Sahi type = better UX."
          }
        },
        {
          "q": {
            "en": "Submit sends:",
            "ur": "Submit:"
          },
          "opts": {
            "en": [
              "Form data to a target",
              "Nothing ever",
              "Only CSS"
            ],
            "ur": [
              "Form data target ko",
              "Kabhi nahi",
              "Sirf CSS"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Action/method matter later.",
            "ur": "Action/method baad mein."
          }
        }
      ],
      "practice": {
        "en": "Sketch a contact form: name, email, message, submit — with labels.",
        "ur": "Contact form sketch + labels."
      },
      "exitTicket": {
        "en": "Changed: forms are contracts with humans.",
        "ur": "Badla: forms insan se contract."
      },
      "cards": [
        {
          "front": {
            "en": "Label association",
            "ur": "Label"
          },
          "back": {
            "en": "for/id",
            "ur": "for/id"
          }
        },
        {
          "front": {
            "en": "Why input types?",
            "ur": "Input types kyun?"
          },
          "back": {
            "en": "UX + hints",
            "ur": "UX + hints"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>Forms collect input: text, email, checkbox, submit. Labels must associate with inputs (for/id). Without labels, forms fail accessibility and tap targets suffer on mobile.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>Forms input leti. Labels for/id se associate. Bina labels a11y fail + mobile pe mushkil.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>Forms collect input: text, email, checkbox, submit. Labels must associate with inputs (for/id). Without labels, forms fail accessibility and tap targets suffer on mobile.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>Forms input leti. Labels for/id se associate. Bina labels a11y fail + mobile pe mushkil.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>Forms collect input: text, email, checkbox, submit. Labels must associate with inputs (for/id). Without labels, forms fail accessibility and tap targets suffer on mobile.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>Forms input leti. Labels for/id se associate. Bina labels a11y fail + mobile pe mushkil.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>Forms collect input: text, email, checkbox, submit. Labels must associate with inputs (for/id). Without labels, forms fail accessibility and tap targets suffer on mobile.</p>",
          "ur": "<p>Forms input leti. Labels for/id se associate. Bina labels a11y fail + mobile pe mushkil.</p>"
        }
      }
    },
    {
      "id": "w102-6",
      "title": {
        "en": "Prospectus Project",
        "ur": "Prospectus Project"
      },
      "objective": {
        "en": "Assemble a personal prospectus page checklist.",
        "ur": "Personal prospectus checklist."
      },
      "warmUp": {
        "en": "What makes a page “done” enough to share?",
        "ur": "Page share-worthy kab?"
      },
      "teach": {
        "en": "<p>Capstone for WEB-102: a single HTML prospectus — your name, about, skills list, one link, one image with alt. Validate structure: one h1, semantic sections, no div-for-everything.</p><p>Self-attest the checklist honestly. Certificates later depend on honesty.</p>",
        "ur": "<p>WEB-102 capstone: HTML prospectus — naam, about, skills, link, image+alt. ek h1, semantic, div-soup nahi.</p><p>Checklist imandari se. Certs honesty pe.</p>"
      },
      "visual": null,
      "check": [
        {
          "q": {
            "en": "A prospectus should include:",
            "ur": "Prospectus:"
          },
          "opts": {
            "en": [
              "Identity + skills + link",
              "Only stock photos",
              "Trading signals"
            ],
            "ur": [
              "Identity + skills + link",
              "Stock photos",
              "Signals"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Proof of structure skills.",
            "ur": "Structure skills ka proof."
          }
        },
        {
          "q": {
            "en": "Self-attestation means:",
            "ur": "Self-attest:"
          },
          "opts": {
            "en": [
              "You confirm checklist items honestly",
              "Auto-magic pass",
              "Pay a fee"
            ],
            "ur": [
              "Checklist imandari",
              "Magic pass",
              "Fee"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "MasteryCap is honest by design.",
            "ur": "MasteryCap honesty by design."
          }
        },
        {
          "q": {
            "en": "Prefer semantic tags over:",
            "ur": "Semantic >"
          },
          "opts": {
            "en": [
              "Meaningless wrapper divs",
              "Valid HTML",
              "Labels"
            ],
            "ur": [
              "Meaningless divs",
              "Valid HTML",
              "Labels"
            ]
          },
          "correct": 0,
          "explain": {
            "en": "Meaning first.",
            "ur": "Pehle meaning."
          }
        }
      ],
      "practice": {
        "en": "Complete the project checklist in Records after building.",
        "ur": "Build ke baad Records mein checklist."
      },
      "exitTicket": {
        "en": "Changed: projects turn lessons into proof.",
        "ur": "Badla: projects = proof."
      },
      "cards": [
        {
          "front": {
            "en": "WEB-102 project",
            "ur": "Project"
          },
          "back": {
            "en": "HTML prospectus",
            "ur": "HTML prospectus"
          }
        },
        {
          "front": {
            "en": "Done means",
            "ur": "Done"
          },
          "back": {
            "en": "Checklist attested",
            "ur": "Checklist attested"
          }
        }
      ],
      "teachRegister": {
        "teen": {
          "en": "<p><strong>Teen:</strong> Short version — think concrete examples (phone, school, cricket).</p><p>Capstone for WEB-102: a single HTML prospectus — your name, about, skills list, one link, one image with alt. Validate structure: one h1, semantic sections, no div-for-everything.Self-attest the checklist honestly. Certificates later depend on honesty.</p><p>Remember: same final quiz as everyone. Scaffolding only changes.</p>",
          "ur": "<p><strong>Teen:</strong> Short version — concrete examples (phone, school, cricket).</p><p>WEB-102 capstone: HTML prospectus — naam, about, skills, link, image+alt. ek h1, semantic, div-soup nahi.Checklist imandari se. Certs honesty pe.</p><p>Final quiz sab ka same. Sirf scaffolding alag.</p>"
        },
        "career": {
          "en": "<p><strong>Career bridge:</strong> Map this to work you already know (forms, handoffs, checklists, clients).</p><p>Capstone for WEB-102: a single HTML prospectus — your name, about, skills list, one link, one image with alt. Validate structure: one h1, semantic sections, no div-for-everything.</p><p>Self-attest the checklist honestly. Certificates later depend on honesty.</p><p>Ask: where would this show up in a job ticket or PR description?</p>",
          "ur": "<p><strong>Career bridge:</strong> Pehle se kaam se jodo (forms, handoffs, checklists, clients).</p><p>WEB-102 capstone: HTML prospectus — naam, about, skills, link, image+alt. ek h1, semantic, div-soup nahi.</p><p>Checklist imandari se. Certs honesty pe.</p><p>Soch: job ticket ya PR mein ye kahan aata?</p>"
        },
        "adult": {
          "en": "<p><strong>Glossary-first:</strong> Read slow. New terms appear in context below — no assumed slang.</p><p>Capstone for WEB-102: a single HTML prospectus — your name, about, skills list, one link, one image with alt. Validate structure: one h1, semantic sections, no div-for-everything.</p><p>Self-attest the checklist honestly. Certificates later depend on honesty.</p><p>Same mastery bar; extra definitions only.</p>",
          "ur": "<p><strong>Glossary-first:</strong> Ahista parho. Naye terms neeche context mein — assumed slang nahi.</p><p>WEB-102 capstone: HTML prospectus — naam, about, skills, link, image+alt. ek h1, semantic, div-soup nahi.</p><p>Checklist imandari se. Certs honesty pe.</p><p>Same mastery bar; sirf extra definitions.</p>"
        },
        "young": {
          "en": "<p>Capstone for WEB-102: a single HTML prospectus — your name, about, skills list, one link, one image with alt. Validate structure: one h1, semantic sections, no div-for-everything.</p><p>Self-attest the checklist honestly. Certificates later depend on honesty.</p>",
          "ur": "<p>WEB-102 capstone: HTML prospectus — naam, about, skills, link, image+alt. ek h1, semantic, div-soup nahi.</p><p>Checklist imandari se. Certs honesty pe.</p>"
        }
      }
    }
  ],
  "finalQuiz": [
    {
      "q": {
        "en": "HTML primarily expresses:",
        "ur": "HTML:"
      },
      "opts": {
        "en": [
          "Structure/meaning",
          "Interest rates",
          "GPU clocks"
        ],
        "ur": [
          "Structure/meaning",
          "Interest",
          "GPU"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Meaning first.",
        "ur": "Pehle meaning."
      }
    },
    {
      "q": {
        "en": "Skip heading levels for looks?",
        "ur": "Looks ke liye heading skip?"
      },
      "opts": {
        "en": [
          "No — use CSS",
          "Yes always",
          "Only on Mondays"
        ],
        "ur": [
          "Nahi — CSS",
          "Hamesha haan",
          "Sirf Monday"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Outline matters.",
        "ur": "Outline matter."
      }
    },
    {
      "q": {
        "en": "Images need:",
        "ur": "Images:"
      },
      "opts": {
        "en": [
          "alt text",
          "No attributes",
          "DNS entries"
        ],
        "ur": [
          "alt",
          "No attrs",
          "DNS"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Accessibility.",
        "ur": "A11y."
      }
    },
    {
      "q": {
        "en": "Labels associate with:",
        "ur": "Labels:"
      },
      "opts": {
        "en": [
          "for/id",
          "Random hope",
          "Only placeholders"
        ],
        "ur": [
          "for/id",
          "Hope",
          "Sirf placeholder"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Explicit link.",
        "ur": "Explicit link."
      }
    },
    {
      "q": {
        "en": "Prospectus project proves:",
        "ur": "Prospectus prove:"
      },
      "opts": {
        "en": [
          "You can structure a page",
          "You are hired",
          "Market tips"
        ],
        "ur": [
          "Page structure",
          "Hired",
          "Tips"
        ]
      },
      "correct": 0,
      "explain": {
        "en": "Evidence of skill.",
        "ur": "Skill evidence."
      }
    }
  ],
  "passScore": 85,
  "project": {
    "id": "prospectus",
    "title": {
      "en": "Personal prospectus page",
      "ur": "Personal prospectus"
    },
    "items": [
      {
        "id": "h1",
        "en": "One clear h1 with your name",
        "ur": "Ek clear h1 naam"
      },
      {
        "id": "about",
        "en": "About section with paragraphs",
        "ur": "About section paragraphs"
      },
      {
        "id": "skills",
        "en": "Skills as a semantic list",
        "ur": "Skills semantic list"
      },
      {
        "id": "link",
        "en": "One descriptive outbound link",
        "ur": "Ek descriptive link"
      },
      {
        "id": "img",
        "en": "One image with meaningful alt",
        "ur": "Ek image meaningful alt"
      }
    ]
  }
};
export default COURSE;
