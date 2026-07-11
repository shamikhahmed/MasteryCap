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
      "en": "<p><strong>Delta</strong> estimates how much an option's premium moves when the underlying moves about $1. Calls carry positive delta; puts carry negative. Deep in-the-money options behave more like stock (delta near ±1); far out-of-the-money options sit near zero because finishing ITM is unlikely. Treat delta as a local, approximate sensitivity — not a promise of tomorrow's P&amp;L.</p>\n<p>Position delta for US equity options is roughly the sum of (contracts × 100 × delta). Positive portfolio delta means you are net long the underlying's direction; negative means net short. Hedgers often buy or sell underlying (or other options) to push net delta toward a target. Retail traders who \"feel\" direction without reading net delta are flying blind.</p>\n<p>{{xref:options:1:Options rights vs obligations}}</p>\n<p>Homework: open any options chain screenshot and label one call and one put with rough delta buckets (near 0, ~0.5, near 1). Then ask: if the stock gaps $2 overnight, which position hurts more — and why?</p>\n<p>{{redflag:Buying far-OTM options because “delta is cheap” is usually buying lottery tickets, not a hedge.}}</p>",
      "ur": "<p><strong>Delta</strong> estimate karta hai ke underlying roughly $1 move kare to option premium kitna hilta. Calls ka delta positive; puts ka negative. Deep ITM options stock jaisi behave karti (±1 ke qareeb); far OTM near zero — ITM finish hone ka chance kam. Delta local, approximate sensitivity hai — kal ke P&amp;L ki guarantee nahi.</p>\n<p>US equity options pe position delta roughly: contracts × 100 × delta ka sum. Positive portfolio delta = net long direction; negative = net short. Hedgers aksar underlying (ya doosri options) se net delta target pe late. Jo trader direction “feel” karta bina net delta padhe — andha udan.</p>\n<p>{{xref:options:1:Options rights vs obligations}}</p>\n<p>Homework: kisi options chain screenshot pe ek call aur ek put pe rough delta buckets likho (near 0, ~0.5, near 1). Phir poocho: stock overnight $2 gap kare to kaun si position zyada dard — aur kyun?</p>\n<p>{{redflag:Far-OTM is liye kharidna ke “delta sasta” — aksar lottery ticket, hedge nahi.}}</p>"
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
      "en": "<p><strong>Gamma</strong> measures how fast delta itself changes when the underlying moves. High gamma means your delta (and directional exposure) can swing quickly — useful if you are long options near the money into a move you want, painful if you are short options into a violent tape. Gamma is largest near ATM and near expiry; that is why short-dated ATM short options feel “calm” until they are not.</p>\n<p>Long options → long gamma (delta moves in your favor as the underlying trends). Short options → short gamma (delta moves against you as price runs). Dealers and market makers manage gamma risk professionally; retail shorts often discover it after the move.</p>\n<p>{{xref:options:2:Premium, intrinsic, time}}</p>\n<p>Practice: sketch a short ATM weekly call. Stock rips +3%. Your short call delta goes from roughly −0.5 toward −0.8 — you are suddenly shorter stock exposure without clicking sell. That is gamma, not magic.</p>\n<p>{{redflag:Selling “cheap” premium into an event without a defined max loss is how accounts learn gamma the expensive way.}}</p>",
      "ur": "<p><strong>Gamma</strong> batata hai ke underlying move pe delta khud kitni tezi se badalta. High gamma = directional exposure jaldi hil sakta — long options ATM pe useful agar move tumhari taraf; short options pe dard jab tape violent. Gamma ATM aur expiry ke qareeb sab se bari — is liye short-dated ATM short options “sukoon” dikhti jab tak nahi dikhti.</p>\n<p>Long options → long gamma (trend mein delta tumhari taraf hilta). Short options → short gamma (price run pe delta khilaf). Dealers/market makers gamma professionally manage; retail shorts aksar move ke baad seekhte.</p>\n<p>{{xref:options:2:Premium, intrinsic, time}}</p>\n<p>Practice: short ATM weekly call socho. Stock +3% rip. Short call delta ~−0.5 se ~−0.8 — bina sell click kiye tum short stock exposure ban gaye. Ye gamma hai, magic nahi.</p>\n<p>{{redflag:Event pe “sasti” premium bechna bina defined max loss — gamma mehengi tareeqe se seekhne ka rasta.}}</p>"
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
      "ur": "Theta: time decay (waqt)"
    },
    "body": {
      "en": "<p><strong>Theta</strong> is the clock on option premium — roughly how much value time alone may bleed if nothing else changes. Long options usually pay theta (time works against you). Short options usually collect theta (time works for you) — until gamma or a gap erases the “easy” income story. Theta is not a salary; it is a statistical rent that can reverse violently.</p>\n<p>Theta accelerates into expiry for ATM options. Weekends and holidays still burn calendar time even when markets are closed — short premium sellers love that; long lottery tickets hate it. Always pair theta talk with a stop on total risk: defined-risk structures beat naked short premium for most learners.</p>\n<p>{{xref:options:3:Why most retail options lose}}</p>\n<p>Drill: write two sentences before any long option buy — (1) what move must happen, (2) how many days of theta you can afford if the move is late. If you cannot answer, you are gambling on calendar luck.</p>\n<p>{{redflag:“I will just hold until it works” ignores theta. Time is a fee you already agreed to pay.}}</p>",
      "ur": "<p><strong>Theta</strong> option premium pe clock hai — roughly agar baqi sab same rahe to waqt akela kitni value kha sakta. Long options aksar theta deti (waqt khilaf). Short options aksar theta leti (waqt sath) — jab tak gamma ya gap “asani” ki kahani mita de. Theta salary nahi; statistical rent hai jo zor se reverse ho sakti.</p>\n<p>ATM options pe expiry ke qareeb theta tez. Weekends/holidays pe bhi calendar time jalta jab market band — short premium sellers ko pasand; long lottery tickets ko nahi. Theta baat ke sath total risk ka stop: learners ke liye defined-risk structures naked short premium se behtar.</p>\n<p>{{xref:options:3:Why most retail options lose}}</p>\n<p>Drill: long option buy se pehle do jumle likho — (1) kaunsa move zaroori, (2) agar move late ho to kitne din ka theta afford. Jawab na ho to calendar luck pe gamble.</p>\n<p>{{redflag:“Hold karunga jab tak kaam kare” theta ignore karta. Waqt woh fee hai jo tum pehle se man chuke.}}</p>"
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
      "en": "<p><strong>Vega</strong> measures sensitivity to implied volatility (IV) — the market's priced uncertainty, not the same thing as realized volatility after the fact. When IV rises, long option positions (all else equal) tend to gain from vega; when IV collapses after an event, long premium often loses even if the underlying barely moved. That is the classic “right direction, still lost” trap.</p>\n<p>IV is usually higher into known events (earnings, FOMC, elections) and often crushes afterward. Buying rich IV into an event without a plan for crush is paying for drama. Selling rich IV without defined risk is collecting drama that can blow up. Compare IV rank/percentile when your broker shows it — relative richness beats absolute “IV looks high.”</p>\n<p>{{xref:options:4:IV crush and event risk}}</p>\n<p>Practice: pick one past earnings name. Note IV the day before vs the day after. Ask whether a long straddle needed a huge move just to break even after crush.</p>\n<p>{{redflag:Treating high IV as “must sell” or low IV as “must buy” without a risk frame is a slogan, not a process.}}</p>",
      "ur": "<p><strong>Vega</strong> implied volatility (IV) pe sensitivity — market ki priced uncertainty; baad ki realized volatility se alag. IV uthe to long options (baqi same) vega se faida uthati; event ke baad IV crush pe long premium aksar nuksan — even agar underlying kam hila. Classic “direction sahi, phir bhi loss.”</p>\n<p>IV known events (earnings, FOMC, elections) pe aksar unchi; baad mein crush. Event pe rich IV bina crush plan ke drama ki fee. Rich IV bechna bina defined risk — drama collect jo blow up kar sakta. Broker IV rank/percentile dikhaye to relative richness dekho — sirf “IV unchi dikhti” kaafi nahi.</p>\n<p>{{xref:options:4:IV crush aur event risk}}</p>\n<p>Practice: ek past earnings name. IV din pehle vs din baad. Long straddle ko crush ke baad breakeven ke liye kitna bada move chahiye tha?</p>\n<p>{{redflag:High IV = “becho” ya low IV = “kharido” bina risk frame — slogan, process nahi. Portfolio rule: event se pehle IV rank dekho; crush ke baad surprise mat lo. Vega sirf number nahi — drama ki fee hai.}}</p>"
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
      "ur": "Defined-risk structures"
    },
    "body": {
      "en": "<p><strong>Defined-risk structures</strong> put a hard ceiling on how much you can lose if you are wrong — spreads, iron condors with wings, long options with premium paid as max loss. Undefined risk (naked short calls, under-hedged short puts) can demand more capital than your plan imagined when the tape gaps. Literacy first: know your max loss in currency units before you click.</p>\n<p>Vertical debit spreads: you buy one option and sell another farther OTM same expiry — net debit is typically max loss; max gain is width minus debit. Credit spreads flip the story: max gain is credit received; max loss is width minus credit. Draw both on paper until muscle memory exists.</p>\n<p>{{xref:options:5:Spreads as risk control}}</p>\n<p>Portfolio rule for this school: no undefined short premium while learning. Paper first. If a structure's max loss is unclear in one sentence, do not enter — even on paper — until you can say the sentence.</p>\n<p>{{redflag:“I’ll manage it if it goes against me” is not a defined risk. Defined means the exchange math already caps the loss.}}</p>",
      "ur": "<p><strong>Defined-risk structures</strong> galat hone pe max loss pe hard ceiling — spreads, wings wale iron condors, long options jahan paid premium hi max loss. Undefined risk (naked short calls, under-hedged short puts) gap pe plan se zyada capital maang sakti. Pehle literacy: click se pehle currency units mein max loss jano.</p>\n<p>Vertical debit spreads: ek option kharido, same expiry pe doosri farther OTM becho — net debit aksar max loss; max gain = width − debit. Credit spreads ulta: max gain = mila credit; max loss = width − credit. Dono paper pe draw karo jab tak muscle memory.</p>\n<p>{{xref:options:5:Spreads as risk control}}</p>\n<p>Is school ka portfolio rule: seekhte waqt undefined short premium nahi. Pehle paper. Agar structure ka max loss ek jumle mein clear na ho — paper pe bhi entry mat jab tak jumla na aa sake.</p>\n<p>{{redflag:“Khilaaf gaya to manage karunga” defined risk nahi. Defined = exchange math pehle se loss cap karti.}}</p>"
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
      "en": "<p><strong>Portfolio greeks</strong> ask: what is my net delta, net gamma, net theta, net vega across all open options (and stock)? One “small” short put can dominate risk if size is large. Aggregation beats vibes. Recompute after every fill — greeks are not a morning-only ritual.</p>\n<p>Stress in words before tools: “If the index gaps −3% and IV spikes, what happens to my book?” Long premium may gain on vol while losing on direction; short premium may do the opposite. Correlation matters — five tech calls are not five independent bets.</p>\n<p>{{xref:greeks:1:Delta as directional inventory}}</p>\n<p>Graduation mindset: greeks are a dashboard for process, not a crystal ball. Use them to refuse undefined risk, size smaller, and journal why a structure matched your thesis. Markets still decide outcomes; competence decays without practice — re-read this week before live size.</p>\n<p>{{redflag:Ignoring portfolio greeks because “each trade is tiny” is how tiny trades become one large accident.}}</p>",
      "ur": "<p><strong>Portfolio greeks</strong> poochte: saari open options (aur stock) pe net delta, gamma, theta, vega kya? Ek “chhoti” short put size bari ho to risk dominate kar sakti. Aggregation vibes se jeet'ti. Har fill ke baad dubara hisaab — greeks sirf subah ki ritual nahi.</p>\n<p>Tools se pehle words mein stress: “Index −3% gap + IV spike to meri book?” Long premium vol pe jeet, direction pe haar sakti; short premium ulta. Correlation matter — paanch tech calls paanch independent bets nahi.</p>\n<p>{{xref:greeks:1:Delta as directional inventory}}</p>\n<p>Graduation mindset: greeks process ka dashboard hain, crystal ball nahi. Undefined risk refuse, size chhota, journal mein likho structure thesis se match kyun. Markets outcomes decide karti; bina practice competence kamzor — live size se pehle ye week dobara.</p>\n<p>{{redflag:“Har trade chhoti” keh kar portfolio greeks ignore — chhoti trades ek bade accident banane ka tareeqa.}}</p>"
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
