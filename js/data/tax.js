/* ============================================================
   tax.js — Tax literacy (PK framing). Not legal advice.
   ============================================================ */

export const TAX_WEEKS = [
  {
    "id": 1,
    "title": {
      "en": "Tax Literacy Mindset",
      "ur": "Tax samajhne ka mindset"
    },
    "body": {
      "en": "<p>This track is <strong>literacy</strong>, not legal advice, not a filing service. Rules change. When money is real, use a qualified advisor in your jurisdiction.</p>\n<p>Goal: know what to record, what to ask, which myths to reject.</p>\n<p>{{redflag:Anyone selling “guaranteed tax-free profits” is a red flag.}}</p>",
      "ur": "<p>Ye track <strong>literacy</strong> hai — legal advice nahi. Rules badalte. Asli paisa pe qualified advisor.</p>\n<p>Goal: kya record, kya poochna, myths refuse.</p>\n<p>{{redflag:“Guaranteed tax-free profits” = red flag.}}</p>"
    },
    "quiz": [
      {
        "q": {
          "en": "This tax track provides:",
          "ur": "Ye tax track deta:"
        },
        "opts": {
          "en": [
            "General literacy — not personalized legal advice",
            "A guarantee you will owe zero tax",
            "Offshore secrecy that beats all law"
          ],
          "ur": [
            "General literacy — personal legal advice nahi",
            "Zero tax guarantee",
            "Offshore secrecy"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Education ≠ representation.",
          "ur": "Education ≠ representation."
        }
      },
      {
        "q": {
          "en": "“Crypto is always untaxable” is:",
          "ur": "“Crypto hamesha untaxable”:"
        },
        "opts": {
          "en": [
            "A myth in many jurisdictions",
            "Universal law",
            "True if you use VPN"
          ],
          "ur": [
            "Bohat jurisdictions mein myth",
            "Universal law",
            "VPN se true"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Many places treat disposals as taxable — check locally.",
          "ur": "Kai jagah disposal taxable — local check."
        }
      },
      {
        "q": {
          "en": "Best early habit:",
          "ur": "Behtareen early habit:"
        },
        "opts": {
          "en": [
            "Keep records of every buy/sell/date/cost",
            "Delete history after each trade",
            "Only screenshot P&L"
          ],
          "ur": [
            "Har buy/sell/date/cost record",
            "History delete",
            "Sirf P&L screenshot"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Records beat memory at filing time.",
          "ur": "Filing pe records > memory."
        }
      },
      {
        "q": {
          "en": "Paid “tax-free profit” schemes are:",
          "ur": "Paid “tax-free profit” schemes:"
        },
        "opts": {
          "en": [
            "Usually scams or illegal avoidance",
            "Endorsed by this app",
            "Required for investors"
          ],
          "ur": [
            "Aksar scam / illegal avoidance",
            "Is app se endorse",
            "Investors ke liye zaroori"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Walk away.",
          "ur": "Walk away."
        }
      }
    ]
  },
  {
    "id": 2,
    "title": {
      "en": "Pakistan: Framing Capital Gains",
      "ur": "Pakistan: Capital Gains Framing"
    },
    "body": {
      "en": "<p><strong>Pakistan framing (high level):</strong> Equity and other capital gains can be taxed under rules that change with Finance Acts, holding periods, and filer status. Broker statements and NCCPL/CDC records matter. This is not a rate table — verify on FBR / current law or with a practitioner.</p>\n<p>Homework: locate your broker's annual tax certificate; store CNIC-linked statements offline.</p>\n<p>{{xref:invest:4:PSX account mechanics}}</p>",
      "ur": "<p><strong>Pakistan framing:</strong> Capital gains rules Finance Acts / holding / filer se badal sakte. Broker + NCCPL/CDC. Rate table nahi — FBR/practitioner verify.</p>\n<p>Homework: broker tax certificate; statements offline.</p>"
    },
    "quiz": [
      {
        "q": {
          "en": "For PSX investors, useful documents include:",
          "ur": "PSX investors ke liye useful docs:"
        },
        "opts": {
          "en": [
            "Broker tax certificates and CDC/NCCPL records",
            "Only Telegram P&L screenshots",
            "Tip-seller invoices"
          ],
          "ur": [
            "Broker tax cert + CDC/NCCPL",
            "Sirf Telegram P&L",
            "Tip invoices"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Official statements beat chat screenshots.",
          "ur": "Official statements > chat."
        }
      },
      {
        "q": {
          "en": "Tax rates in this lesson are:",
          "ur": "Is lesson mein tax rates:"
        },
        "opts": {
          "en": [
            "Not fixed forever — verify current law",
            "Permanent and listed here as gospel",
            "Always zero for filers"
          ],
          "ur": [
            "Forever fixed nahi — current law verify",
            "Yahan permanent gospel",
            "Filers ke liye hamesha zero"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "We teach process, not a frozen rate card.",
          "ur": "Process — frozen rate card nahi."
        }
      },
      {
        "q": {
          "en": "Filer vs non-filer status can affect:",
          "ur": "Filer vs non-filer asar:"
        },
        "opts": {
          "en": [
            "Withholding and some rates — check current rules",
            "Nothing ever",
            "Only your Wi-Fi speed"
          ],
          "ur": [
            "Withholding / kuch rates — current rules",
            "Kabhi kuch nahi",
            "Sirf Wi-Fi"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Status matters in PK tax admin — confirm annually.",
          "ur": "Status matter — saalana confirm."
        }
      },
      {
        "q": {
          "en": "Best next step when unsure:",
          "ur": "Unsure ho to:"
        },
        "opts": {
          "en": [
            "Ask a qualified PK tax practitioner with your statements",
            "Trust a random Discord mod",
            "Ignore filings forever"
          ],
          "ur": [
            "Qualified PK practitioner + statements",
            "Random Discord",
            "Forever ignore"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Cheap advice online is expensive later.",
          "ur": "Sasti online salah baad mein mehngi."
        }
      }
    ]
  },
  {
    "id": 3,
    "title": {
      "en": "Cost Basis & Holding Period",
      "ur": "Cost Basis aur Holding Period"
    },
    "body": {
      "en": "<p><strong>Cost basis</strong> is what you paid (plus allowed costs). Gain/loss ≈ proceeds − basis. Splits and bonuses adjust basis — keep notes.</p>\n<p><strong>Holding period</strong> can change rates/exemptions in some systems. Use methods your broker can support.</p>",
      "ur": "<p><strong>Cost basis</strong> = jo diya (+ allowed costs). Gain ≈ proceeds − basis. Splits/bonus adjust.</p>\n<p><strong>Holding period</strong> rate/exemption badal sakti. Broker-supported methods use karo.</p>"
    },
    "quiz": [
      {
        "q": {
          "en": "Rough capital gain formula starts with:",
          "ur": "Capital gain formula roughly:"
        },
        "opts": {
          "en": [
            "Proceeds minus cost basis",
            "Only the last price",
            "Leverage times hope"
          ],
          "ur": [
            "Proceeds minus cost basis",
            "Sirf last price",
            "Leverage × hope"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "You need both exit proceeds and what you paid.",
          "ur": "Exit + cost dono chahiye."
        }
      },
      {
        "q": {
          "en": "Stock splits typically:",
          "ur": "Stock splits aksar:"
        },
        "opts": {
          "en": [
            "Adjust share count and per-share basis",
            "Create free taxable cash automatically",
            "Erase your tax history"
          ],
          "ur": [
            "Share count + per-share basis adjust",
            "Free taxable cash",
            "Tax history erase"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Economic value same; paperwork changes.",
          "ur": "Value same; paperwork change."
        }
      },
      {
        "q": {
          "en": "Inventing a cost-basis method your broker cannot report is:",
          "ur": "Broker report na kar sake aisa method invent:"
        },
        "opts": {
          "en": [
            "A filing risk — use supported methods",
            "Smart alpha",
            "Required by SECP always"
          ],
          "ur": [
            "Filing risk — supported methods",
            "Smart alpha",
            "SECP hamesha require"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Your return must match evidence.",
          "ur": "Return evidence se match."
        }
      },
      {
        "q": {
          "en": "Keep notes when:",
          "ur": "Notes rakho jab:"
        },
        "opts": {
          "en": [
            "You reinvest dividends or get bonus shares",
            "You only browse charts",
            "You use demo forever"
          ],
          "ur": [
            "Dividend reinvest / bonus shares",
            "Sirf charts",
            "Forever demo"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Corporate actions confuse basis later.",
          "ur": "Corporate actions baad mein confuse."
        }
      }
    ]
  },
  {
    "id": 4,
    "title": {
      "en": "Withholding, Dividends & Records",
      "ur": "Withholding, Dividends aur Records"
    },
    "body": {
      "en": "<p>Dividends and some transactions may face <strong>withholding</strong>. That is not always final tax — reconcile at return time.</p>\n<p>Folder: monthly broker PDF, MasteryCap Journal CSV export, corporate-action notes. Export from Settings regularly.</p>",
      "ur": "<p>Dividends pe <strong>withholding</strong> ho sakti — hamesha final tax nahi. Filing pe reconcile.</p>\n<p>Folder: broker PDF, Journal CSV, corporate notes. Settings se export regular.</p>"
    },
    "quiz": [
      {
        "q": {
          "en": "Withholding on a dividend usually means:",
          "ur": "Dividend pe withholding aksar matlab:"
        },
        "opts": {
          "en": [
            "Tax was deducted at source — still reconcile at filing",
            "You owe nothing ever again",
            "The trade was illegal"
          ],
          "ur": [
            "Source pe deduct — filing pe reconcile",
            "Kabhi kuch nahi dena",
            "Illegal trade"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Withholding ≠ full story.",
          "ur": "Withholding ≠ poori kahani."
        }
      },
      {
        "q": {
          "en": "MasteryCap Journal CSV helps tax prep by:",
          "ur": "Journal CSV tax prep:"
        },
        "opts": {
          "en": [
            "Providing your own dated trade log",
            "Filing your return automatically with FBR",
            "Deleting broker evidence"
          ],
          "ur": [
            "Dated trade log",
            "FBR auto file",
            "Broker evidence delete"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "App log supports memory; broker docs still primary.",
          "ur": "App log madad; broker docs primary."
        }
      },
      {
        "q": {
          "en": "You should export backups:",
          "ur": "Backup export:"
        },
        "opts": {
          "en": [
            "Regularly (Settings) — devices fail",
            "Never — cloud remembers",
            "Only after an audit letter"
          ],
          "ur": [
            "Regular (Settings)",
            "Kabhi nahi",
            "Sirf audit letter ke baad"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Local-first app: exports are safety.",
          "ur": "Local-first: export = safety."
        }
      },
      {
        "q": {
          "en": "Ignoring dividend paperwork is risky because:",
          "ur": "Dividend paperwork ignore risky:"
        },
        "opts": {
          "en": [
            "You may mis-report income",
            "Dividends are never taxable anywhere",
            "Brokers invent dividends for fun"
          ],
          "ur": [
            "Income mis-report",
            "Kabhi taxable nahi",
            "Brokers mazaak"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Track cash that hit your account.",
          "ur": "Account mein aaya cash track."
        }
      }
    ]
  },
  {
    "id": 5,
    "title": {
      "en": "Cross-Border & When to Hire Help",
      "ur": "Cross-Border aur Help Kab"
    },
    "body": {
      "en": "<p>US stocks, foreign brokers, and crypto can create <strong>cross-border</strong> reporting questions. Do not decide residency from YouTube.</p>\n<p>Hire help for first market year, large gains, or foreign accounts. Graduation: records habit + practitioner on call. Keep compounding via Investing/Spot.</p>",
      "ur": "<p>US stocks / foreign / crypto = <strong>cross-border</strong> sawalat. Residency YouTube pe mat.</p>\n<p>Help: pehla saal, bari gains, foreign accounts. Graduation: records + practitioner. Compound Investing/Spot.</p>"
    },
    "quiz": [
      {
        "q": {
          "en": "Cross-border investing tax is:",
          "ur": "Cross-border investing tax:"
        },
        "opts": {
          "en": [
            "Complex — get professional help for your residency",
            "Solved by a VPN",
            "Identical in every country"
          ],
          "ur": [
            "Complex — residency pe professional",
            "VPN se solve",
            "Har country same"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Residency and treaties matter.",
          "ur": "Residency + treaties."
        }
      },
      {
        "q": {
          "en": "A good time to hire a tax pro:",
          "ur": "Tax pro kab:"
        },
        "opts": {
          "en": [
            "First real market year or large unusual gains",
            "Never if you day-trade",
            "Only if you are a celebrity"
          ],
          "ur": [
            "Pehla asli market saal / bari unusual gains",
            "Day-trade pe kabhi nahi",
            "Sirf celebrity"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Early advice prevents expensive corrections.",
          "ur": "Jaldi salah = mehengi correction kam."
        }
      },
      {
        "q": {
          "en": "This app will:",
          "ur": "Ye app:"
        },
        "opts": {
          "en": [
            "Not file taxes for you",
            "Auto-pay FBR from Journal",
            "Issue legal opinions"
          ],
          "ur": [
            "Tumhari tax file nahi karegi",
            "FBR auto-pay",
            "Legal opinions"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "School + journal only.",
          "ur": "School + journal."
        }
      },
      {
        "q": {
          "en": "After tax literacy, wealth path remains:",
          "ur": "Tax literacy ke baad wealth path:"
        },
        "opts": {
          "en": [
            "Low-fee compounding with clean records",
            "Hide everything offshore via tips",
            "Binary options for “tax-free” gains"
          ],
          "ur": [
            "Low-fee compounding + clean records",
            "Offshore tip hide",
            "Binary tax-free"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Clean compounding beats evasion fantasies.",
          "ur": "Clean compound > evasion fantasy."
        }
      }
    ]
  }
];

export const TAX_PLACEMENT = [
  {
    "topic": 1,
    "q": {
      "en": "This tax track provides:",
      "ur": "Ye tax track deta:"
    },
    "opts": {
      "en": [
        "General literacy — not personalized legal advice",
        "A guarantee you will owe zero tax",
        "Offshore secrecy that beats all law"
      ],
      "ur": [
        "General literacy — personal legal advice nahi",
        "Zero tax guarantee",
        "Offshore secrecy"
      ]
    },
    "correct": 0
  },
  {
    "topic": 1,
    "q": {
      "en": "“Crypto is always untaxable” is:",
      "ur": "“Crypto hamesha untaxable”:"
    },
    "opts": {
      "en": [
        "A myth in many jurisdictions",
        "Universal law",
        "True if you use VPN"
      ],
      "ur": [
        "Bohat jurisdictions mein myth",
        "Universal law",
        "VPN se true"
      ]
    },
    "correct": 0
  },
  {
    "topic": 2,
    "q": {
      "en": "For PSX investors, useful documents include:",
      "ur": "PSX investors ke liye useful docs:"
    },
    "opts": {
      "en": [
        "Broker tax certificates and CDC/NCCPL records",
        "Only Telegram P&L screenshots",
        "Tip-seller invoices"
      ],
      "ur": [
        "Broker tax cert + CDC/NCCPL",
        "Sirf Telegram P&L",
        "Tip invoices"
      ]
    },
    "correct": 0
  },
  {
    "topic": 2,
    "q": {
      "en": "Tax rates in this lesson are:",
      "ur": "Is lesson mein tax rates:"
    },
    "opts": {
      "en": [
        "Not fixed forever — verify current law",
        "Permanent and listed here as gospel",
        "Always zero for filers"
      ],
      "ur": [
        "Forever fixed nahi — current law verify",
        "Yahan permanent gospel",
        "Filers ke liye hamesha zero"
      ]
    },
    "correct": 0
  },
  {
    "topic": 3,
    "q": {
      "en": "Rough capital gain formula starts with:",
      "ur": "Capital gain formula roughly:"
    },
    "opts": {
      "en": [
        "Proceeds minus cost basis",
        "Only the last price",
        "Leverage times hope"
      ],
      "ur": [
        "Proceeds minus cost basis",
        "Sirf last price",
        "Leverage × hope"
      ]
    },
    "correct": 0
  },
  {
    "topic": 3,
    "q": {
      "en": "Stock splits typically:",
      "ur": "Stock splits aksar:"
    },
    "opts": {
      "en": [
        "Adjust share count and per-share basis",
        "Create free taxable cash automatically",
        "Erase your tax history"
      ],
      "ur": [
        "Share count + per-share basis adjust",
        "Free taxable cash",
        "Tax history erase"
      ]
    },
    "correct": 0
  },
  {
    "topic": 4,
    "q": {
      "en": "Withholding on a dividend usually means:",
      "ur": "Dividend pe withholding aksar matlab:"
    },
    "opts": {
      "en": [
        "Tax was deducted at source — still reconcile at filing",
        "You owe nothing ever again",
        "The trade was illegal"
      ],
      "ur": [
        "Source pe deduct — filing pe reconcile",
        "Kabhi kuch nahi dena",
        "Illegal trade"
      ]
    },
    "correct": 0
  },
  {
    "topic": 4,
    "q": {
      "en": "MasteryCap Journal CSV helps tax prep by:",
      "ur": "Journal CSV tax prep:"
    },
    "opts": {
      "en": [
        "Providing your own dated trade log",
        "Filing your return automatically with FBR",
        "Deleting broker evidence"
      ],
      "ur": [
        "Dated trade log",
        "FBR auto file",
        "Broker evidence delete"
      ]
    },
    "correct": 0
  },
  {
    "topic": 5,
    "q": {
      "en": "Cross-border investing tax is:",
      "ur": "Cross-border investing tax:"
    },
    "opts": {
      "en": [
        "Complex — get professional help for your residency",
        "Solved by a VPN",
        "Identical in every country"
      ],
      "ur": [
        "Complex — residency pe professional",
        "VPN se solve",
        "Har country same"
      ]
    },
    "correct": 0
  },
  {
    "topic": 5,
    "q": {
      "en": "A good time to hire a tax pro:",
      "ur": "Tax pro kab:"
    },
    "opts": {
      "en": [
        "First real market year or large unusual gains",
        "Never if you day-trade",
        "Only if you are a celebrity"
      ],
      "ur": [
        "Pehla asli market saal / bari unusual gains",
        "Day-trade pe kabhi nahi",
        "Sirf celebrity"
      ]
    },
    "correct": 0
  }
];
