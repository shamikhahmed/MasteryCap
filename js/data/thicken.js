/* ============================================================
   thicken.js — extra bilingual paragraphs for thinner weeks.
   Appended at render; does not mutate source week modules.
   ============================================================ */

export const BODY_APPEND = {
  'crypto:2': {
    en: `<p><strong>Beginner practice:</strong> On any chart, mark the last swing high and low. Ask only: HH/HL, LL/LH, or range? No indicator until that answer is automatic. Journal three charts a week with that label only.</p>`,
    ur: `<p><strong>Beginner practice:</strong> Kisi bhi chart pe last swing high/low mark karo. Sirf poocho: HH/HL, LL/LH, ya range? Indicator tab tak nahi jab ye automatic ho. Hafte mein teen charts sirf is label ke sath journal.</p>`,
  },
  'crypto:3': {
    en: `<p><strong>Beginner practice:</strong> Draw zones as rectangles, not lines. Place a hypothetical stop beyond the zone plus a small ATR buffer — never on the round number inside the zone.</p>`,
    ur: `<p><strong>Beginner practice:</strong> Zones rectangles se draw karo, lines nahi. Hypothetical stop zone ke bahar + chhota ATR buffer — zone ke andar round number pe kabhi nahi.</p>`,
  },
  'crypto:4': {
    en: `<p><strong>Beginner practice:</strong> Use one EMA (e.g. 50) as context only: price above rising EMA = long bias allowed; below falling = short bias allowed; chop = no trade. No crossover entries for 30 days.</p>`,
    ur: `<p><strong>Beginner practice:</strong> Ek EMA (jaise 50) sirf context: rising EMA ke upar = long bias; falling ke neeche = short bias; chop = no trade. 30 din crossover entries band.</p>`,
  },
  'crypto:5': {
    en: `<p><strong>Beginner practice:</strong> When RSI is “overbought” in a clear HH/HL uptrend, do nothing new — wait for structure break. Divergence is a warning to tighten risk, not a market-order short.</p>`,
    ur: `<p><strong>Beginner practice:</strong> Clear HH/HL uptrend mein RSI “overbought” ho to naya trade mat lo — structure break ka wait. Divergence = risk tight karo, market-order short nahi.</p>`,
  },
  'crypto:6': {
    en: `<p><strong>Beginner earn-path link:</strong> Until sizing is boring, do not seek income from perps. Practice: fixed 1% risk, stop from structure/ATR, size = output. Log 20 paper trades that follow this before live margin.</p>`,
    ur: `<p><strong>Beginner earn-path:</strong> Jab tak sizing boring na ho, perps se income mat dhoondo. Practice: fixed 1% risk, stop structure/ATR se, size = output. Live margin se pehle 20 paper trades is rule pe.</p>`,
  },
  'crypto:8': {
    en: `<p><strong>Beginner practice:</strong> Before any multi-day perp hold, compute funding cost for 7 days at current rate. If cost &gt; half your planned R, flatten or switch to spot.</p>`,
    ur: `<p><strong>Beginner practice:</strong> Multi-day perp se pehle 7 din ka funding cost current rate pe. Agar cost planned R ke aadhe se zyada ho to flat ya spot.</p>`,
  },
  'stocks:1': {
    en: `<p><strong>Beginner practice:</strong> Place only limit orders for two weeks. Measure how often you chase with market orders emotionally — that urge is the real lesson.</p>`,
    ur: `<p><strong>Beginner practice:</strong> Do hafte sirf limit orders. Dekho kitni baar emotionally market order chase hota — yehi asl lesson.</p>`,
  },
  'invest:1': {
    en: `<p><strong>Earn path (honest):</strong> Completing this track does not print weekly cash. It prepares you to put long-horizon money into low-cost compounding and to refuse gambling dressed as investing.</p>`,
    ur: `<p><strong>Earn path (imandar):</strong> Ye track weekly cash nahi chapta. Long-horizon paisa low-cost compounding mein dalne aur investing ke libaas mein gambling refuse karne ke liye tayar karta hai.</p>`,
  },
  'invest:8': {
    en: `<p><strong>First capital checklist:</strong> emergency cash → regulated account → automatic monthly buy of a broad low-cost fund → no leverage → journal each contribution. That is the beginner “earn” path this app endorses.</p>`,
    ur: `<p><strong>Pehla capital checklist:</strong> emergency cash → regulated account → broad low-cost fund pe automatic monthly buy → no leverage → har contribution journal. Ye beginner “earn” path hai jo app endorse karti hai.</p>`,
  },
  'binary:5': {
    en: `<p><strong>Earn path size = $0.</strong> If this track “completed” means anything, it means you redirect effort to Investing and Spot. Binary is consumption, not a career.</p>`,
    ur: `<p><strong>Earn path size = $0.</strong> Agar ye track “complete” ka matlab kuch hai to ye: effort Investing aur Spot pe shift. Binary consumption hai, career nahi.</p>`,
  },
};

export function appendBody(html, trackId, weekId, lang) {
  const a = BODY_APPEND[`${trackId}:${weekId}`];
  if (!a) return html;
  return html + (a[lang] || a.en || '');
}
