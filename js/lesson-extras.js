/* ============================================================
   lesson-extras.js — P11 markers: xref, redflag, compare, formula strip helpers
   ============================================================ */

const COMPARES = {
  'spot-vs-perp': {
    en: { a: 'Spot', b: 'Perp', rows: [['Own the asset', 'Contract on price'], ['No funding', 'Funding payments'], ['No liquidation', 'Can liquidate'], ['Capital intensive', 'Capital efficient']] },
    ur: { a: 'Spot', b: 'Perp', rows: [['Asset own', 'Price pe contract'], ['Funding nahi', 'Funding payments'], ['Liquidation nahi', 'Liquidate ho sakta'], ['Zyada capital', 'Kam capital']] },
  },
  'call-vs-put': {
    en: { a: 'Call', b: 'Put', rows: [['Right to buy', 'Right to sell'], ['Bullish bias', 'Bearish / hedge'], ['Pays for upside', 'Pays for downside']] },
    ur: { a: 'Call', b: 'Put', rows: [['Kharidne ka haq', 'Bechne ka haq'], ['Bullish', 'Bearish / hedge'], ['Upside ke liye pay', 'Downside ke liye pay']] },
  },
  'sma-vs-ema': {
    en: { a: 'SMA', b: 'EMA', rows: [['Equal weight', 'Recent bars heavier'], ['Smoother', 'Faster to turn'], ['Lag more', 'Lag less']] },
    ur: { a: 'SMA', b: 'EMA', rows: [['Barabar weight', 'Recent bars zyada'], ['Smooth', 'Jaldi turn'], ['Zyada lag', 'Kam lag']] },
  },
  'grid-vs-dca': {
    en: { a: 'Grid', b: 'DCA', rows: [['Harvests range', 'Accumulates over time'], ['Dies in trend down', 'Survives trends better'], ['Short vol costume', 'Boring & honest']] },
    ur: { a: 'Grid', b: 'DCA', rows: [['Range kaat\'ta', 'Waqt pe jama'], ['Downtrend mein marta', 'Trend better survive'], ['Short vol', 'Boring & imandar']] },
  },
  'invest-vs-trade': {
    en: { a: 'Investing', b: 'Trading', rows: [['Years horizon', 'Days–weeks'], ['Process + cost', 'Edge + risk'], ['Fewer decisions', 'Many decisions']] },
    ur: { a: 'Investing', b: 'Trading', rows: [['Saalon ka horizon', 'Din–hafte'], ['Process + cost', 'Edge + risk'], ['Kam decisions', 'Bohat decisions']] },
  },
  'limit-vs-market': {
    en: { a: 'Limit', b: 'Market', rows: [['Price control', 'Fill certainty'], ['May not fill', 'Slippage risk'], ['Patient entry', 'Urgent entry']] },
    ur: { a: 'Limit', b: 'Market', rows: [['Price control', 'Fill pakka'], ['Fill na ho', 'Slippage'], ['Patient', 'Urgent']] },
  },
};

export function injectLessonExtras(html, lang = 'en', onXref) {
  if (!html) return html;
  let out = html;
  out = out.replace(/\{\{redflag:([^}]+)\}\}/g, (_, text) =>
    `<div class="note-box flag"><strong>${lang === 'en' ? 'Red flag' : 'Red flag'}</strong> — ${text.trim()}</div>`);
  out = out.replace(/\{\{compare:([a-z0-9-]+)\}\}/g, (_, name) => {
    const c = COMPARES[name];
    if (!c) return '';
    const d = c[lang] || c.en;
    const rows = d.rows.map(([l, r]) =>
      `<div class="compare-row"><span>${l}</span><span>${r}</span></div>`).join('');
    return `<div class="compare-card"><div class="compare-head"><span>${d.a}</span><span>${d.b}</span></div>${rows}</div>`;
  });
  out = out.replace(/\{\{xref:([a-z]+):(\d+):([^}]+)\}\}/g, (_, track, week, label) =>
    `<button type="button" class="pill xref" data-xref-track="${track}" data-xref-week="${week}">${label.trim()}</button>`);
  return out;
}

export function renderMemoPanel(week, lang) {
  let items = week.memo?.[lang] || week.memo?.en;
  if (!items?.length && week.quiz?.length) {
    items = week.quiz.slice(0, 3)
      .map((q) => q.explain?.[lang] || q.explain?.en)
      .filter(Boolean)
      .map((s) => (s.length > 120 ? s.slice(0, 117) + '…' : s));
  }
  if (!items?.length) return '';
  return `<details class="panel mt14"><summary class="pad" style="cursor:pointer;font-weight:600">${lang === 'en' ? 'Must memorize' : 'Yad rakho'}</summary>
    <ul class="pad" style="margin:0;padding:0 18px 14px;color:var(--t2);font-size:14px;line-height:1.55">${items.map((i) => `<li>${i}</li>`).join('')}</ul></details>`;
}

export function renderSkim(week, lang) {
  let items = week.skim?.[lang] || week.skim?.en;
  if (!items?.length) {
    const title = week.title?.[lang] || week.title?.en || '';
    items = [
      title,
      lang === 'en' ? 'Risk first — size is output' : 'Pehle risk — size output hai',
      lang === 'en' ? 'Quiz closes the loop' : 'Quiz loop band karta hai',
    ];
  }
  return `<div class="note-box mt10"><strong>${lang === 'en' ? 'Skim' : 'Skim'}</strong><ul style="margin:8px 0 0;padding-left:18px">${items.map((i) => `<li>${i}</li>`).join('')}</ul></div>`;
}

export function renderFormulaStrip(week, lang) {
  const f = week.formula?.[lang] || week.formula?.en;
  if (!f) return '';
  return `<div class="formula-strip mono">${f}</div>`;
}

export { COMPARES };
