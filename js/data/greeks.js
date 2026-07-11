/* ============================================================
   greeks.js — Options greeks depth. Literacy, not income.
   ============================================================ */

export const GREEKS_WEEKS = [
  {
    "id": 1,
    "title": {
      "en": "Delta & Direction",
      "ur": "Delta aur Direction"
    },
    "body": {
      "en": "<p><strong>Delta</strong> estimates how much an option's price moves when the underlying moves $1. Calls have positive delta; puts have negative. Deep ITM options behave more like stock (delta near ±1); far OTM near 0.</p>\n<p>Position delta = sum of (contracts × 100 × delta) for US equity options. Positive delta = net long the underlying's direction.</p>\n<p>{{xref:stocks:4:Options basics in Stocks}}</p>\n<p>{{redflag:Buying OTM options because “delta is cheap” is often just buying lottery tickets.}}</p>",
      "ur": "<p><strong>Delta</strong> estimate: underlying $1 move pe option price kitna. Calls positive; puts negative. Deep ITM ≈ stock (±1); far OTM ≈ 0.</p>\n<p>Position delta = contracts × 100 × delta (US equity). Positive = net long direction.</p>\n<p>{{redflag:OTM is liye kharidna ke “delta sasta” — aksar lottery.}}</p>"
    },
    "quiz": [
      {
        "q": {
          "en": "A call with delta 0.40 roughly gains how much if the stock rises $1?",
          "ur": "Call delta 0.40, stock +$1 pe approx gain:"
        },
        "opts": {
          "en": [
            "$0.40 per share of the option (×100 per contract)",
            "$40 guaranteed",
            "Nothing — delta only for puts"
          ],
          "ur": [
            "Option pe ~$0.40/share (contract ×100)",
            "$40 guaranteed",
            "Kuch nahi — delta sirf puts"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Delta ≈ dollar sensitivity to a $1 underlying move (before other greeks).",
          "ur": "Delta ≈ $1 move pe sensitivity."
        }
      },
      {
        "q": {
          "en": "Far OTM options typically have delta:",
          "ur": "Far OTM options ka delta:"
        },
        "opts": {
          "en": [
            "Near zero",
            "Near 1",
            "Always 0.5"
          ],
          "ur": [
            "Zero ke qareeb",
            "1 ke qareeb",
            "Hamesha 0.5"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Little chance of finishing ITM → low delta.",
          "ur": "ITM chance kam → delta kam."
        }
      },
      {
        "q": {
          "en": "Net positive portfolio delta means you are:",
          "ur": "Net positive delta matlab:"
        },
        "opts": {
          "en": [
            "Net long the underlying's direction",
            "Delta-neutral by definition",
            "Only short puts"
          ],
          "ur": [
            "Net long direction",
            "Delta-neutral",
            "Sirf short puts"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Positive delta profits if the underlying rises (all else equal).",
          "ur": "Positive delta = underlying up pe faida (ceteris paribus)."
        }
      },
      {
        "q": {
          "en": "This track's goal is:",
          "ur": "Is track ka goal:"
        },
        "opts": {
          "en": [
            "Literacy on option risk — not guaranteed income",
            "A system to get rich weekly",
            "Tips for 0DTE lottery wins"
          ],
          "ur": [
            "Option risk literacy — income guarantee nahi",
            "Weekly rich system",
            "0DTE lottery tips"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Greeks explain risk. They do not print salary.",
          "ur": "Greeks = risk. Salary nahi."
        }
      }
    ]
  },
  {
    "id": 2,
    "title": {
      "en": "Gamma & Convexity",
      "ur": "Gamma aur Convexity"
    },
    "body": {
      "en": "<p><strong>Gamma</strong> is how fast delta changes as the underlying moves. High gamma near ATM and near expiry means your delta (and P&L) can swing violently — especially 0DTE.</p>\n<p>Long options = long gamma. Short options = short gamma. Short gamma + no hedge = classic blowup pattern.</p>\n<p>{{redflag:Selling naked short-dated ATM options for “easy premium” is short gamma with a fuse.}}</p>",
      "ur": "<p><strong>Gamma</strong> = delta kitni tez badle. ATM + near expiry = high gamma — 0DTE pe P&L wild.</p>\n<p>Long options = long gamma. Short options = short gamma. Short gamma + no hedge = blowup pattern.</p>\n<p>{{redflag:Naked short-dated ATM sell “easy premium” = short gamma + fuse.}}</p>"
    },
    "quiz": [
      {
        "q": {
          "en": "Gamma is highest typically:",
          "ur": "Gamma aksar sab se zyada:"
        },
        "opts": {
          "en": [
            "Near ATM and near expiry",
            "Deep ITM LEAPs only",
            "On the stock itself"
          ],
          "ur": [
            "ATM + near expiry",
            "Sirf deep ITM LEAPs",
            "Stock pe"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "ATM short-dated options have the most delta sensitivity to small moves.",
          "ur": "ATM short-dated = sab se zyada sensitivity."
        }
      },
      {
        "q": {
          "en": "Being short gamma means:",
          "ur": "Short gamma matlab:"
        },
        "opts": {
          "en": [
            "Delta moves against you when the underlying trends",
            "You cannot lose",
            "You are always hedged"
          ],
          "ur": [
            "Trend mein delta aapke khilaf",
            "Haar nahi sakte",
            "Hamesha hedged"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Short gamma: the more it moves, the worse your delta gets.",
          "ur": "Short gamma: move zyada → delta worse."
        }
      },
      {
        "q": {
          "en": "0DTE options are dangerous mainly because of:",
          "ur": "0DTE khatarnak mainly:"
        },
        "opts": {
          "en": [
            "Extreme gamma / theta dynamics",
            "Zero commissions forever",
            "Guaranteed assignment profit"
          ],
          "ur": [
            "Extreme gamma/theta",
            "Hamesha zero commission",
            "Guaranteed assignment profit"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Tiny time left → huge greek swings.",
          "ur": "Kam time → greek swings."
        }
      },
      {
        "q": {
          "en": "Long call gamma helps when:",
          "ur": "Long call gamma madad:"
        },
        "opts": {
          "en": [
            "The stock trends in your favor and delta increases",
            "The stock never moves",
            "IV collapses only"
          ],
          "ur": [
            "Stock favor mein trend + delta barhe",
            "Stock kabhi move na kare",
            "Sirf IV crush"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Long gamma: delta becomes more helpful as you are right.",
          "ur": "Long gamma: sahi hone pe delta madadgar."
        }
      }
    ]
  },
  {
    "id": 3,
    "title": {
      "en": "Theta: Time Decay",
      "ur": "Theta: Time Decay"
    },
    "body": {
      "en": "<p><strong>Theta</strong> is the estimated daily decay of extrinsic value if nothing else changes. Long options pay theta; short options collect it — and take gamma, jump, and IV risk.</p>\n<p>Theta accelerates into expiry for ATM options. Longer-dated options decay slower per day than short-dated lottery tickets.</p>\n<p>{{compare:call-vs-put}}</p>",
      "ur": "<p><strong>Theta</strong> = daily extrinsic decay (ceteris paribus). Long options theta dete; short collect — aur doosre risks.</p>\n<p>ATM near expiry → theta tez. LEAPs daily decay kam vs short lottery.</p>\n<p>{{compare:call-vs-put}}</p>"
    },
    "quiz": [
      {
        "q": {
          "en": "If you are long a call, theta usually:",
          "ur": "Long call pe theta aksar:"
        },
        "opts": {
          "en": [
            "Works against you each day",
            "Pays you daily",
            "Is always zero"
          ],
          "ur": [
            "Har din khilaf",
            "Roz pay",
            "Hamesha zero"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Long premium = you pay time decay.",
          "ur": "Long premium = time decay do."
        }
      },
      {
        "q": {
          "en": "Theta is generally largest for:",
          "ur": "Theta aksar bari:"
        },
        "opts": {
          "en": [
            "ATM options near expiry",
            "Deep ITM LEAPs with no extrinsic",
            "The underlying stock"
          ],
          "ur": [
            "ATM near expiry",
            "Deep ITM LEAP bina extrinsic",
            "Stock"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Most extrinsic sits ATM short-dated.",
          "ur": "Extrinsic ATM short-dated mein."
        }
      },
      {
        "q": {
          "en": "Collecting theta by selling options also means:",
          "ur": "Theta collect = options sell bhi matlab:"
        },
        "opts": {
          "en": [
            "You accept gamma / jump / IV risk",
            "Risk-free income",
            "The broker guarantees profit"
          ],
          "ur": [
            "Gamma/jump/IV risk accept",
            "Risk-free income",
            "Broker profit guarantee"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Premium is payment for risk, not free money.",
          "ur": "Premium = risk ki qeemat, free money nahi."
        }
      },
      {
        "q": {
          "en": "A slower-decay long premium choice is often:",
          "ur": "Slow decay long premium aksar:"
        },
        "opts": {
          "en": [
            "Longer-dated options (e.g. LEAPs) sized small",
            "Same-day 0DTE calls max size",
            "Naked short puts"
          ],
          "ur": [
            "Longer-dated (LEAPs) chhoti size",
            "0DTE max size",
            "Naked short puts"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "More time → slower daily theta, still not free.",
          "ur": "Zyada time → slow theta, free nahi."
        }
      }
    ]
  },
  {
    "id": 4,
    "title": {
      "en": "Vega & Implied Volatility",
      "ur": "Vega aur Implied Volatility"
    },
    "body": {
      "en": "<p><strong>Vega</strong> measures sensitivity to implied volatility (IV). Long options are long vega; short options are short vega.</p>\n<p><strong>IV crush</strong> after known events (earnings) can destroy long premium even if direction was right. Compare IV to recent realized vol.</p>\n<p>{{fig:iv-crush}}</p>\n<p>{{xref:stocks:6:Greeks intro in Stocks}}</p>",
      "ur": "<p><strong>Vega</strong> = IV sensitivity. Long = long vega; short = short vega.</p>\n<p><strong>IV crush</strong> event ke baad long premium kha sakta — direction sahi ho tab bhi.</p>\n<p>{{fig:iv-crush}}</p>"
    },
    "quiz": [
      {
        "q": {
          "en": "Long vega means you generally benefit when:",
          "ur": "Long vega faida jab:"
        },
        "opts": {
          "en": [
            "Implied volatility rises",
            "Implied volatility falls",
            "Theta is maximized"
          ],
          "ur": [
            "IV barhe",
            "IV gire",
            "Theta max"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Higher IV → higher option premiums (ceteris paribus).",
          "ur": "IV up → premium up."
        }
      },
      {
        "q": {
          "en": "IV crush after earnings often hurts:",
          "ur": "Earnings ke baad IV crush aksar nuksan:"
        },
        "opts": {
          "en": [
            "Long premium bought into the event",
            "Cash stock holders only",
            "Bond ETFs only"
          ],
          "ur": [
            "Event se pehle kharida long premium",
            "Sirf cash stock",
            "Sirf bond ETF"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "IV drops when uncertainty resolves — premium shrinks.",
          "ur": "Uncertainty resolve → premium shrink."
        }
      },
      {
        "q": {
          "en": "If IV is very high vs recent realized vol, long options are:",
          "ur": "IV >> realized vol to long options:"
        },
        "opts": {
          "en": [
            "Expensive — need a larger move to win",
            "Always a bargain",
            "Risk-free"
          ],
          "ur": [
            "Mehngi — bari move chahiye",
            "Hamesha sasti",
            "Risk-free"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "You pay for expected big moves; if they do not arrive, you lose.",
          "ur": "Bari move ki qeemat; na aaye to haar."
        }
      },
      {
        "q": {
          "en": "Short vega positions profit when:",
          "ur": "Short vega faida jab:"
        },
        "opts": {
          "en": [
            "IV falls (and other risks do not blow you up)",
            "IV explodes overnight",
            "Gamma is ignored forever"
          ],
          "ur": [
            "IV gire (aur blowup na ho)",
            "IV explode",
            "Gamma forever ignore"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Short vega collects IV — until a vol spike.",
          "ur": "Short vega IV collect — jab tak spike na aaye."
        }
      }
    ]
  },
  {
    "id": 5,
    "title": {
      "en": "Defined-Risk Structures",
      "ur": "Defined-Risk Structures"
    },
    "body": {
      "en": "<p>Prefer <strong>defined-risk</strong> structures. Vertical spreads cap max loss and max gain. Multi-leg complexity only after you can explain each leg's greek in one sentence.</p>\n<p>American options can be exercised early (dividends matter for calls). Know your broker's exercise cutoff.</p>\n<p>{{fig:vertical-spread}}</p>\n<p>{{redflag:Naked short calls = theoretically unlimited risk. Not a beginner structure.}}</p>",
      "ur": "<p><strong>Defined-risk</strong> prefer. Vertical = max loss/gain cap. Multi-leg baad mein.</p>\n<p>American early exercise possible. Broker cutoff jaano.</p>\n<p>{{fig:vertical-spread}}</p>\n<p>{{redflag:Naked short calls = unlimited risk. Beginner structure nahi.}}</p>"
    },
    "quiz": [
      {
        "q": {
          "en": "A bull call vertical's max loss is typically:",
          "ur": "Bull call vertical max loss aksar:"
        },
        "opts": {
          "en": [
            "The net debit paid",
            "Unlimited",
            "Only the commission"
          ],
          "ur": [
            "Net debit",
            "Unlimited",
            "Sirf commission"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Defined-risk long vertical: you cannot lose more than the debit (plus fees).",
          "ur": "Debit se zyada nahi (fees alag)."
        }
      },
      {
        "q": {
          "en": "Naked short calls are unsuitable for beginners because:",
          "ur": "Naked short calls beginners ke liye nahi:"
        },
        "opts": {
          "en": [
            "Loss can be theoretically unlimited",
            "They never pay premium",
            "Delta is always zero"
          ],
          "ur": [
            "Loss theoretically unlimited",
            "Premium kabhi nahi",
            "Delta hamesha zero"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Stock can rise without a cap; short call loss scales with it.",
          "ur": "Stock unlimited up; short call loss scale."
        }
      },
      {
        "q": {
          "en": "Before multi-leg complexity you should:",
          "ur": "Multi-leg se pehle:"
        },
        "opts": {
          "en": [
            "Explain each leg's main greek in one sentence",
            "Max size every idea",
            "Skip the underlying chart"
          ],
          "ur": [
            "Har leg ka main greek ek jumla",
            "Har idea max size",
            "Chart skip"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "If you cannot explain the legs, you cannot manage the risk.",
          "ur": "Legs na samjho to risk manage nahi."
        }
      },
      {
        "q": {
          "en": "Early exercise risk is most relevant for:",
          "ur": "Early exercise risk sab se relevant:"
        },
        "opts": {
          "en": [
            "American-style options (e.g. many equity options)",
            "All European index options only",
            "Spot bitcoin"
          ],
          "ur": [
            "American-style (bohot equity options)",
            "Sirf European index",
            "Spot bitcoin"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "American = exercise any time before expiry.",
          "ur": "American = expiry se pehle kabhi bhi."
        }
      }
    ]
  },
  {
    "id": 6,
    "title": {
      "en": "Greeks in a Portfolio",
      "ur": "Portfolio mein Greeks"
    },
    "body": {
      "en": "<p>Think in <strong>portfolio greeks</strong>, not one ticket. Net delta, net vega, and short-gamma pockets matter more than a single winner.</p>\n<p>Graduation: paper trade defined-risk only for 20 logged sessions; never sell naked; max-loss event ≤1% of account. Options are tools — Investing/Spot remain the compound path.</p>\n<p>{{redflag:Turning every paycheck into 0DTE is gambling with greeks vocabulary.}}</p>",
      "ur": "<p><strong>Portfolio greeks</strong> socho. Net delta, vega, short-gamma pockets.</p>\n<p>Graduation: 20 paper sessions defined-risk; naked nahi; max-loss ≤1%. Options tool — compound path Investing/Spot.</p>\n<p>{{redflag:Har paycheck 0DTE = gambling + greeks vocabulary.}}</p>"
    },
    "quiz": [
      {
        "q": {
          "en": "Portfolio risk is better measured by:",
          "ur": "Portfolio risk behtar measure:"
        },
        "opts": {
          "en": [
            "Net greeks and max loss scenarios",
            "Only the last trade's P&L",
            "Follower count"
          ],
          "ur": [
            "Net greeks + max loss scenarios",
            "Sirf last P&L",
            "Followers"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "One win can hide a short-gamma bomb elsewhere.",
          "ur": "Ek win short-gamma bomb chhupa sakta."
        }
      },
      {
        "q": {
          "en": "A sane options size rule for learners:",
          "ur": "Learners ke liye sane size:"
        },
        "opts": {
          "en": [
            "Max loss on the structure ≤ ~1% of account",
            "Risk 20% per 0DTE",
            "All-in on earnings"
          ],
          "ur": [
            "Structure max loss ≤ ~1% account",
            "0DTE pe 20%",
            "Earnings pe all-in"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Survive the wrong IV/direction day.",
          "ur": "Galat IV/direction din survive."
        }
      },
      {
        "q": {
          "en": "After this track, the honest wealth path is still:",
          "ur": "Is track ke baad imandar wealth path:"
        },
        "opts": {
          "en": [
            "Investing / spot compounding; options optional and defined-risk",
            "Only naked short premium forever",
            "Binary options"
          ],
          "ur": [
            "Investing/spot compounding; options optional defined-risk",
            "Sirf naked short forever",
            "Binary"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Greeks literacy ≠ income machine.",
          "ur": "Greeks literacy ≠ income machine."
        }
      },
      {
        "q": {
          "en": "Selling naked short premium as a beginner is:",
          "ur": "Beginner naked short premium:"
        },
        "opts": {
          "en": [
            "Refused — undefined or extreme risk",
            "Required for mastery",
            "Risk-free theta"
          ],
          "ur": [
            "Refuse — extreme risk",
            "Mastery ke liye zaroori",
            "Risk-free theta"
          ]
        },
        "correct": 0,
        "explain": {
          "en": "Collecting theta is not free when gamma can ruin you.",
          "ur": "Theta free nahi jab gamma tabah kare."
        }
      }
    ]
  }
];

export const GREEKS_PLACEMENT = [
  {
    "topic": 1,
    "q": {
      "en": "A call with delta 0.40 roughly gains how much if the stock rises $1?",
      "ur": "Call delta 0.40, stock +$1 pe approx gain:"
    },
    "opts": {
      "en": [
        "$0.40 per share of the option (×100 per contract)",
        "$40 guaranteed",
        "Nothing — delta only for puts"
      ],
      "ur": [
        "Option pe ~$0.40/share (contract ×100)",
        "$40 guaranteed",
        "Kuch nahi — delta sirf puts"
      ]
    },
    "correct": 0
  },
  {
    "topic": 1,
    "q": {
      "en": "Far OTM options typically have delta:",
      "ur": "Far OTM options ka delta:"
    },
    "opts": {
      "en": [
        "Near zero",
        "Near 1",
        "Always 0.5"
      ],
      "ur": [
        "Zero ke qareeb",
        "1 ke qareeb",
        "Hamesha 0.5"
      ]
    },
    "correct": 0
  },
  {
    "topic": 2,
    "q": {
      "en": "Gamma is highest typically:",
      "ur": "Gamma aksar sab se zyada:"
    },
    "opts": {
      "en": [
        "Near ATM and near expiry",
        "Deep ITM LEAPs only",
        "On the stock itself"
      ],
      "ur": [
        "ATM + near expiry",
        "Sirf deep ITM LEAPs",
        "Stock pe"
      ]
    },
    "correct": 0
  },
  {
    "topic": 2,
    "q": {
      "en": "Being short gamma means:",
      "ur": "Short gamma matlab:"
    },
    "opts": {
      "en": [
        "Delta moves against you when the underlying trends",
        "You cannot lose",
        "You are always hedged"
      ],
      "ur": [
        "Trend mein delta aapke khilaf",
        "Haar nahi sakte",
        "Hamesha hedged"
      ]
    },
    "correct": 0
  },
  {
    "topic": 3,
    "q": {
      "en": "If you are long a call, theta usually:",
      "ur": "Long call pe theta aksar:"
    },
    "opts": {
      "en": [
        "Works against you each day",
        "Pays you daily",
        "Is always zero"
      ],
      "ur": [
        "Har din khilaf",
        "Roz pay",
        "Hamesha zero"
      ]
    },
    "correct": 0
  },
  {
    "topic": 3,
    "q": {
      "en": "Theta is generally largest for:",
      "ur": "Theta aksar bari:"
    },
    "opts": {
      "en": [
        "ATM options near expiry",
        "Deep ITM LEAPs with no extrinsic",
        "The underlying stock"
      ],
      "ur": [
        "ATM near expiry",
        "Deep ITM LEAP bina extrinsic",
        "Stock"
      ]
    },
    "correct": 0
  },
  {
    "topic": 4,
    "q": {
      "en": "Long vega means you generally benefit when:",
      "ur": "Long vega faida jab:"
    },
    "opts": {
      "en": [
        "Implied volatility rises",
        "Implied volatility falls",
        "Theta is maximized"
      ],
      "ur": [
        "IV barhe",
        "IV gire",
        "Theta max"
      ]
    },
    "correct": 0
  },
  {
    "topic": 4,
    "q": {
      "en": "IV crush after earnings often hurts:",
      "ur": "Earnings ke baad IV crush aksar nuksan:"
    },
    "opts": {
      "en": [
        "Long premium bought into the event",
        "Cash stock holders only",
        "Bond ETFs only"
      ],
      "ur": [
        "Event se pehle kharida long premium",
        "Sirf cash stock",
        "Sirf bond ETF"
      ]
    },
    "correct": 0
  },
  {
    "topic": 5,
    "q": {
      "en": "A bull call vertical's max loss is typically:",
      "ur": "Bull call vertical max loss aksar:"
    },
    "opts": {
      "en": [
        "The net debit paid",
        "Unlimited",
        "Only the commission"
      ],
      "ur": [
        "Net debit",
        "Unlimited",
        "Sirf commission"
      ]
    },
    "correct": 0
  },
  {
    "topic": 5,
    "q": {
      "en": "Naked short calls are unsuitable for beginners because:",
      "ur": "Naked short calls beginners ke liye nahi:"
    },
    "opts": {
      "en": [
        "Loss can be theoretically unlimited",
        "They never pay premium",
        "Delta is always zero"
      ],
      "ur": [
        "Loss theoretically unlimited",
        "Premium kabhi nahi",
        "Delta hamesha zero"
      ]
    },
    "correct": 0
  },
  {
    "topic": 6,
    "q": {
      "en": "Portfolio risk is better measured by:",
      "ur": "Portfolio risk behtar measure:"
    },
    "opts": {
      "en": [
        "Net greeks and max loss scenarios",
        "Only the last trade's P&L",
        "Follower count"
      ],
      "ur": [
        "Net greeks + max loss scenarios",
        "Sirf last P&L",
        "Followers"
      ]
    },
    "correct": 0
  },
  {
    "topic": 6,
    "q": {
      "en": "A sane options size rule for learners:",
      "ur": "Learners ke liye sane size:"
    },
    "opts": {
      "en": [
        "Max loss on the structure ≤ ~1% of account",
        "Risk 20% per 0DTE",
        "All-in on earnings"
      ],
      "ur": [
        "Structure max loss ≤ ~1% account",
        "0DTE pe 20%",
        "Earnings pe all-in"
      ]
    },
    "correct": 0
  }
];
