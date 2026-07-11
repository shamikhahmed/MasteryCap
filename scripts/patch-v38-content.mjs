#!/usr/bin/env node
/** v38 content thicken — Greeks EN+UR, Foundations UR, Futures W3 UR */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function strip(h) {
  return String(h || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().length;
}

/** Escape for JS double-quoted string (keeps \n as two chars). */
function asDq(s) {
  return JSON.stringify(s).slice(1, -1);
}

function swapWeekBodies(filePath, weeksMap) {
  let src = fs.readFileSync(filePath, 'utf8');
  for (const [id, bodies] of Object.entries(weeksMap)) {
    const re = new RegExp(
      `("id"\\s*:\\s*${id}[\\s\\S]*?"body"\\s*:\\s*\\{\\s*"en"\\s*:\\s*")([\\s\\S]*?)("\\s*,\\s*"ur"\\s*:\\s*")([\\s\\S]*?)("\\s*\\})`,
      'm'
    );
    if (!re.test(src)) {
      console.error('FAIL match week', id, path.basename(filePath));
      process.exit(1);
    }
    const en = asDq(bodies.en);
    const ur = asDq(bodies.ur);
    src = src.replace(re, (_, a, _e, mid, _u, end) => `${a}${en}${mid}${ur}${end}`);
  }
  fs.writeFileSync(filePath, src);
}

/** Foundations uses template literals: body: { en: `...`, ur: `...` } */
function swapFoundationsUr(filePath, weeksMap) {
  let src = fs.readFileSync(filePath, 'utf8');
  for (const [id, ur] of Object.entries(weeksMap)) {
    const re = new RegExp(
      `(id:\\s*${id}[\\s\\S]*?body:\\s*\\{[\\s\\S]*?ur:\\s*\`)([\\s\\S]*?)(\`,\\s*\\n\\s*\\})`,
      'm'
    );
    if (!re.test(src)) {
      console.error('FAIL foundations UR', id);
      process.exit(1);
    }
    src = src.replace(re, (_, a, _old, end) => `${a}${ur}${end}`);
  }
  fs.writeFileSync(filePath, src);
}

const GREEKS = {
  1: {
    en: `<p><strong>Delta</strong> estimates how much an option's premium moves when the underlying moves about $1. Calls carry positive delta; puts carry negative. Deep in-the-money options behave more like stock (delta near ±1); far out-of-the-money options sit near zero because finishing ITM is unlikely. Treat delta as a local, approximate sensitivity — not a promise of tomorrow's P&amp;L.</p>
<p>Position delta for US equity options is roughly the sum of (contracts × 100 × delta). Positive portfolio delta means you are net long the underlying's direction; negative means net short. Hedgers often buy or sell underlying (or other options) to push net delta toward a target. Retail traders who "feel" direction without reading net delta are flying blind.</p>
<p>{{xref:options:1:Options rights vs obligations}}</p>
<p>Homework: open any options chain screenshot and label one call and one put with rough delta buckets (near 0, ~0.5, near 1). Then ask: if the stock gaps $2 overnight, which position hurts more — and why?</p>
<p>{{redflag:Buying far-OTM options because “delta is cheap” is usually buying lottery tickets, not a hedge.}}</p>`,
    ur: `<p><strong>Delta</strong> estimate karta hai ke underlying roughly $1 move kare to option premium kitna hilta. Calls ka delta positive; puts ka negative. Deep ITM options stock jaisi behave karti (±1 ke qareeb); far OTM near zero — ITM finish hone ka chance kam. Delta local, approximate sensitivity hai — kal ke P&amp;L ki guarantee nahi.</p>
<p>US equity options pe position delta roughly: contracts × 100 × delta ka sum. Positive portfolio delta = net long direction; negative = net short. Hedgers aksar underlying (ya doosri options) se net delta target pe late. Jo trader direction “feel” karta bina net delta padhe — andha udan.</p>
<p>{{xref:options:1:Options rights vs obligations}}</p>
<p>Homework: kisi options chain screenshot pe ek call aur ek put pe rough delta buckets likho (near 0, ~0.5, near 1). Phir poocho: stock overnight $2 gap kare to kaun si position zyada dard — aur kyun?</p>
<p>{{redflag:Far-OTM is liye kharidna ke “delta sasta” — aksar lottery ticket, hedge nahi.}}</p>`,
  },
  2: {
    en: `<p><strong>Gamma</strong> measures how fast delta itself changes when the underlying moves. High gamma means your delta (and directional exposure) can swing quickly — useful if you are long options near the money into a move you want, painful if you are short options into a violent tape. Gamma is largest near ATM and near expiry; that is why short-dated ATM short options feel “calm” until they are not.</p>
<p>Long options → long gamma (delta moves in your favor as the underlying trends). Short options → short gamma (delta moves against you as price runs). Dealers and market makers manage gamma risk professionally; retail shorts often discover it after the move.</p>
<p>{{xref:options:2:Premium, intrinsic, time}}</p>
<p>Practice: sketch a short ATM weekly call. Stock rips +3%. Your short call delta goes from roughly −0.5 toward −0.8 — you are suddenly shorter stock exposure without clicking sell. That is gamma, not magic.</p>
<p>{{redflag:Selling “cheap” premium into an event without a defined max loss is how accounts learn gamma the expensive way.}}</p>`,
    ur: `<p><strong>Gamma</strong> batata hai ke underlying move pe delta khud kitni tezi se badalta. High gamma = directional exposure jaldi hil sakta — long options ATM pe useful agar move tumhari taraf; short options pe dard jab tape violent. Gamma ATM aur expiry ke qareeb sab se bari — is liye short-dated ATM short options “sukoon” dikhti jab tak nahi dikhti.</p>
<p>Long options → long gamma (trend mein delta tumhari taraf hilta). Short options → short gamma (price run pe delta khilaf). Dealers/market makers gamma professionally manage; retail shorts aksar move ke baad seekhte.</p>
<p>{{xref:options:2:Premium, intrinsic, time}}</p>
<p>Practice: short ATM weekly call socho. Stock +3% rip. Short call delta ~−0.5 se ~−0.8 — bina sell click kiye tum short stock exposure ban gaye. Ye gamma hai, magic nahi.</p>
<p>{{redflag:Event pe “sasti” premium bechna bina defined max loss — gamma mehengi tareeqe se seekhne ka rasta.}}</p>`,
  },
  3: {
    en: `<p><strong>Theta</strong> is the clock on option premium — roughly how much value time alone may bleed if nothing else changes. Long options usually pay theta (time works against you). Short options usually collect theta (time works for you) — until gamma or a gap erases the “easy” income story. Theta is not a salary; it is a statistical rent that can reverse violently.</p>
<p>Theta accelerates into expiry for ATM options. Weekends and holidays still burn calendar time even when markets are closed — short premium sellers love that; long lottery tickets hate it. Always pair theta talk with a stop on total risk: defined-risk structures beat naked short premium for most learners.</p>
<p>{{xref:options:3:Why most retail options lose}}</p>
<p>Drill: write two sentences before any long option buy — (1) what move must happen, (2) how many days of theta you can afford if the move is late. If you cannot answer, you are gambling on calendar luck.</p>
<p>{{redflag:“I will just hold until it works” ignores theta. Time is a fee you already agreed to pay.}}</p>`,
    ur: `<p><strong>Theta</strong> option premium pe clock hai — roughly agar baqi sab same rahe to waqt akela kitni value kha sakta. Long options aksar theta deti (waqt khilaf). Short options aksar theta leti (waqt sath) — jab tak gamma ya gap “asani” ki kahani mita de. Theta salary nahi; statistical rent hai jo zor se reverse ho sakti.</p>
<p>ATM options pe expiry ke qareeb theta tez. Weekends/holidays pe bhi calendar time jalta jab market band — short premium sellers ko pasand; long lottery tickets ko nahi. Theta baat ke sath total risk ka stop: learners ke liye defined-risk structures naked short premium se behtar.</p>
<p>{{xref:options:3:Why most retail options lose}}</p>
<p>Drill: long option buy se pehle do jumle likho — (1) kaunsa move zaroori, (2) agar move late ho to kitne din ka theta afford. Jawab na ho to calendar luck pe gamble.</p>
<p>{{redflag:“Hold karunga jab tak kaam kare” theta ignore karta. Waqt woh fee hai jo tum pehle se man chuke.}}</p>`,
  },
  4: {
    en: `<p><strong>Vega</strong> measures sensitivity to implied volatility (IV) — the market's priced uncertainty, not the same thing as realized volatility after the fact. When IV rises, long option positions (all else equal) tend to gain from vega; when IV collapses after an event, long premium often loses even if the underlying barely moved. That is the classic “right direction, still lost” trap.</p>
<p>IV is usually higher into known events (earnings, FOMC, elections) and often crushes afterward. Buying rich IV into an event without a plan for crush is paying for drama. Selling rich IV without defined risk is collecting drama that can blow up. Compare IV rank/percentile when your broker shows it — relative richness beats absolute “IV looks high.”</p>
<p>{{xref:options:4:IV crush and event risk}}</p>
<p>Practice: pick one past earnings name. Note IV the day before vs the day after. Ask whether a long straddle needed a huge move just to break even after crush.</p>
<p>{{redflag:Treating high IV as “must sell” or low IV as “must buy” without a risk frame is a slogan, not a process.}}</p>`,
    ur: `<p><strong>Vega</strong> implied volatility (IV) pe sensitivity — market ki priced uncertainty; baad ki realized volatility se alag. IV uthe to long options (baqi same) vega se faida uthati; event ke baad IV crush pe long premium aksar nuksan — even agar underlying kam hila. Classic “direction sahi, phir bhi loss.”</p>
<p>IV known events (earnings, FOMC, elections) pe aksar unchi; baad mein crush. Event pe rich IV bina crush plan ke drama ki fee. Rich IV bechna bina defined risk — drama collect jo blow up kar sakta. Broker IV rank/percentile dikhaye to relative richness dekho — sirf “IV unchi dikhti” kaafi nahi.</p>
<p>{{xref:options:4:IV crush aur event risk}}</p>
<p>Practice: ek past earnings name. IV din pehle vs din baad. Long straddle ko crush ke baad breakeven ke liye kitna bada move chahiye tha?</p>
<p>{{redflag:High IV = “becho” ya low IV = “kharido” bina risk frame — slogan, process nahi.}}</p>`,
  },
  5: {
    en: `<p><strong>Defined-risk structures</strong> put a hard ceiling on how much you can lose if you are wrong — spreads, iron condors with wings, long options with premium paid as max loss. Undefined risk (naked short calls, under-hedged short puts) can demand more capital than your plan imagined when the tape gaps. Literacy first: know your max loss in currency units before you click.</p>
<p>Vertical debit spreads: you buy one option and sell another farther OTM same expiry — net debit is typically max loss; max gain is width minus debit. Credit spreads flip the story: max gain is credit received; max loss is width minus credit. Draw both on paper until muscle memory exists.</p>
<p>{{xref:options:5:Spreads as risk control}}</p>
<p>Portfolio rule for this school: no undefined short premium while learning. Paper first. If a structure's max loss is unclear in one sentence, do not enter — even on paper — until you can say the sentence.</p>
<p>{{redflag:“I’ll manage it if it goes against me” is not a defined risk. Defined means the exchange math already caps the loss.}}</p>`,
    ur: `<p><strong>Defined-risk structures</strong> galat hone pe max loss pe hard ceiling — spreads, wings wale iron condors, long options jahan paid premium hi max loss. Undefined risk (naked short calls, under-hedged short puts) gap pe plan se zyada capital maang sakti. Pehle literacy: click se pehle currency units mein max loss jano.</p>
<p>Vertical debit spreads: ek option kharido, same expiry pe doosri farther OTM becho — net debit aksar max loss; max gain = width − debit. Credit spreads ulta: max gain = mila credit; max loss = width − credit. Dono paper pe draw karo jab tak muscle memory.</p>
<p>{{xref:options:5:Spreads as risk control}}</p>
<p>Is school ka portfolio rule: seekhte waqt undefined short premium nahi. Pehle paper. Agar structure ka max loss ek jumle mein clear na ho — paper pe bhi entry mat jab tak jumla na aa sake.</p>
<p>{{redflag:“Khilaaf gaya to manage karunga” defined risk nahi. Defined = exchange math pehle se loss cap karti.}}</p>`,
  },
  6: {
    en: `<p><strong>Portfolio greeks</strong> ask: what is my net delta, net gamma, net theta, net vega across all open options (and stock)? One “small” short put can dominate risk if size is large. Aggregation beats vibes. Recompute after every fill — greeks are not a morning-only ritual.</p>
<p>Stress in words before tools: “If the index gaps −3% and IV spikes, what happens to my book?” Long premium may gain on vol while losing on direction; short premium may do the opposite. Correlation matters — five tech calls are not five independent bets.</p>
<p>{{xref:greeks:1:Delta as directional inventory}}</p>
<p>Graduation mindset: greeks are a dashboard for process, not a crystal ball. Use them to refuse undefined risk, size smaller, and journal why a structure matched your thesis. Markets still decide outcomes; competence decays without practice — re-read this week before live size.</p>
<p>{{redflag:Ignoring portfolio greeks because “each trade is tiny” is how tiny trades become one large accident.}}</p>`,
    ur: `<p><strong>Portfolio greeks</strong> poochte: saari open options (aur stock) pe net delta, gamma, theta, vega kya? Ek “chhoti” short put size bari ho to risk dominate kar sakti. Aggregation vibes se jeet'ti. Har fill ke baad dubara hisaab — greeks sirf subah ki ritual nahi.</p>
<p>Tools se pehle words mein stress: “Index −3% gap + IV spike to meri book?” Long premium vol pe jeet, direction pe haar sakti; short premium ulta. Correlation matter — paanch tech calls paanch independent bets nahi.</p>
<p>{{xref:greeks:1:Delta as directional inventory}}</p>
<p>Graduation mindset: greeks process ka dashboard hain, crystal ball nahi. Undefined risk refuse, size chhota, journal mein likho structure thesis se match kyun. Markets outcomes decide karti; bina practice competence kamzor — live size se pehle ye week dobara.</p>
<p>{{redflag:“Har trade chhoti” keh kar portfolio greeks ignore — chhoti trades ek bade accident banane ka tareeqa.}}</p>`,
  },
};

const FOUND_UR = {
  1: `<p>Ye school <strong>process</strong> sikhata hai — salary-from-charts nahi. Markets outcomes decide karti; tum control karte ho rules: risk %, stop pehle, journal, aur “aj nahi” kehne ki himmat. MasteryCap offline PWA hai: koi broker license, SECP badge, ya income guarantee nahi. Jo bhi certificate PNG mile, woh device-local self-issue hai — bahar credential nahi.</p>
<p>Zero se start: pehle vocabulary (long/short, order types, account vs tip-seller), phir paper workflow, phir hi tiny live size. Skip karke crypto/perps day-1 = bilkul aag pe haath. Scam radar on rakho: guaranteed returns, “VIP signals,” recovery agents, seed-phrase mangna — walk away.</p>
<p>{{redflag:Jo guaranteed profit beche — course nahi, trap.}}</p>
<p>Is week ka kaam: ek jumla likho jo tum follow karoge — maslan “bina stop entry nahi.” Note Study desk pe save karo. Kal wapis aana = habit; ek viral reel pehle se behtar.</p>
<p>Foundations poora hone se pehle advanced tracks soft-lock rehte. Jaldi feel nahi — safety. TRADE-READY baad mein Practice labs se aata; sirf weeks padhna = literacy, trade-ready nahi.</p>`,
  2: `<p><strong>Scam aur social pressure</strong> beginners ko pehle maar'te hain charts se pehle. Red flags: guaranteed returns, pressure “abhi fund karo,” fake celebrity endorsements, recovery agents jo pehle scammer ke baad aate, seed phrase / remote-access mangna. Agar koi “sirf aaj” urgency beche — default jawab no.</p>
<p>Regulated path socho: jahan mumkin, licensed broker / exchange jo custody aur statements de. Tip Telegram group “guru” nahi hota risk manager. Apna process likho; kisi aur ka screenshot process nahi.</p>
<p>{{xref:foundations:1:School stance — process not salary}}</p>
<p>Homework: teen scam patterns apne alfaaz mein likho. Dost ko forward mat karo “easy money” — literacy share karo. Binary / signal rooms elective self-defense ke liye baad mein; pehle yahan solid.</p>
<p>{{redflag:Remote desktop + “main trade kar dunga tumhare account pe” = account theft ka classic.}}</p>`,
  5: `<p><strong>Paper workflow</strong> asli paise se pehle muscle memory banata. Rule: har paper trade pe pehle stop, size risk % se, emotion tag, aur ek line “kyun enter.” P/L green hona pass nahi — process follow hona pass. MasteryCap sim / journal isi liye: process grade, sirf profit worship nahi.</p>
<p>Workflow loop: setup checklist → size calc → entry → stop already live → exit rule → journal → review. Koi step skip = fail even if money up. Ye boring lagta; boring hi account bachata.</p>
<p>{{xref:foundations:4:Orders — market vs limit}}</p>
<p>Is week kam az kam 5 paper trades likho (sim ya journal). Revenge trade intentionally mat karo — agar urge aaye, note mein “urge aaya, skip kiya” likho. Woh bhi win hai.</p>
<p>{{redflag:Paper pe jeet kar seedha full size live = common wipe story.}}</p>`,
  6: `<p><strong>Risk %</strong> har trade pe account ka wo hissa jo tum haarne ko tayyar — size uska output, pehle input nahi. 0.25–1% beginners ke liye common range (tumhari neend pe depend); exact magic number nahi. Leverage result hai stop distance + risk money se — “10x chahiye” pehle sochna reverse hai.</p>
<p>Formula soch: risk money = account × risk %. Size ≈ risk money / (entry − stop) distance (instrument units ke hisaab). Stop pehle; size baad. Stop widen = risk plan todna — school mein violation.</p>
<p>{{xref:foundations:5:Paper workflow before live}}</p>
<p>Graduation is week se: risk calculator Journal mein use karo, ek written max daily loss, aur rule “limit hit = screen band.” Skills decay — mahine baad labs dobara. Competence license nahi.</p>
<p>{{redflag:“Is baar double size kyunki sure hoon” — surety risk % ka enemy.}}</p>`,
};

const FUT_W3_UR = `<p><strong>Margin aur liquidation</strong> futures ko stock se alag banate. Initial margin seat reserve karti; maintenance se neeche equity aaye to margin call / auto-liq. Notional exposure aksar posted margin se bohat bari — is liye “chhota margin” = bada bet feel nahi hona chahiye.</p>
<p>Liquidation price hisaab se pehle jaano, hope se nahi. Gap opens pe liq market orders fire ho sakti — slippage plan ka hissa. Cross vs isolated: cross doosri positions kha sakta; isolated dard ek jagah band karta (platform rules padho).</p>
<p>{{xref:futures:1:Contract specs — multiplier, tick}}</p>
<p>Homework: ek micro contract pe paper — entry, stop, liq line, max loss currency mein. Agar liq line stop se pehle aati, size chhota karo ya avoid. Process: stop pehle, size baad, leverage output.</p>
<p>{{redflag:Max leverage slider “kyunki available hai” — school fail. Available ≠ sensible.}}</p>`;

swapWeekBodies(path.join(root, 'js/data/greeks.js'), GREEKS);
console.log('patched greeks');
swapFoundationsUr(path.join(root, 'js/data/foundations.js'), FOUND_UR);
console.log('patched foundations UR');

{
  const fp = path.join(root, 'js/data/futures.js');
  let src = fs.readFileSync(fp, 'utf8');
  const re = /("id"\s*:\s*3[\s\S]*?"body"\s*:\s*\{[\s\S]*?"ur"\s*:\s*")([\s\S]*?)("\s*\})/m;
  if (!re.test(src)) {
    console.error('FAIL futures W3');
    process.exit(1);
  }
  src = src.replace(re, (_, a, _o, end) => `${a}${asDq(FUT_W3_UR)}${end}`);
  fs.writeFileSync(fp, src);
  console.log('patched futures W3 UR');
}

// verify
const { GREEKS_WEEKS } = await import(pathToFileURL(path.join(root, 'js/data/greeks.js')).href);
const { FOUNDATIONS_WEEKS } = await import(pathToFileURL(path.join(root, 'js/data/foundations.js')).href);
const { FUTURES_WEEKS } = await import(pathToFileURL(path.join(root, 'js/data/futures.js')).href);

let bad = 0;
for (const x of GREEKS_WEEKS) {
  const e = strip(x.body.en); const u = strip(x.body.ur); const r = u / e;
  console.log('gW' + x.id, e, u, r.toFixed(2));
  if (e < 900 || r < 0.85) bad++;
}
for (const x of FOUNDATIONS_WEEKS) {
  const e = strip(x.body.en); const u = strip(x.body.ur); const r = u / e;
  console.log('fW' + x.id, e, u, r.toFixed(2));
  if ([1, 2, 5, 6].includes(x.id) && r < 0.85) bad++;
}
{
  const x = FUTURES_WEEKS.find((w) => w.id === 3);
  const e = strip(x.body.en); const u = strip(x.body.ur);
  console.log('futW3', e, u, (u / e).toFixed(2));
  if (u / e < 0.85) bad++;
}
if (bad) {
  console.error('LENGTH FAIL', bad);
  process.exit(1);
}
console.log('CONTENT OK');
