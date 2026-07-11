/* ============================================================
   howto.js — Zero-to-ready How-to hub (checklists).
   Practical steps: account, KYC, orders, first buy, custody.
   Not get-rich playbooks. Not broker affiliate.
   ============================================================ */

import { icon } from './icons.js';
import { store, KEYS } from './store.js';

export const HOWTO_GUIDES = [
  {
    id: 'wealth-honest',
    title: { en: 'Honest wealth path (not get-rich)', ur: 'Imandar wealth path (get-rich nahi)' },
    blurb: {
      en: 'Closest thing to “rich later”: survive, keep fees low, compound for years. No course prints weekly cash.',
      ur: '“Baad mein ameer” ke qareeb: survive, low fees, saalon compound. Course weekly cash nahi chapta.',
    },
    steps: {
      en: [
        'Emergency cash 3–6 months before risk assets',
        'Finish Foundations → Investing → Spot on beginner path',
        'Only money you will not need for 5+ years into risk assets',
        'Automate monthly buys (DCA) — ignore daily noise',
        'Journal every contribution; skip if FOMO',
        'Trading (perps/forex) optional later — paper first, ≤1% risk',
        'Binary / tip groups / “guaranteed %” = walk away ($0 earn size)',
      ],
      ur: [
        'Risk se pehle 3–6 mahine emergency cash',
        'Foundations → Investing → Spot complete',
        'Sirf wo paisa jo 5+ saal nahi chahiye',
        'Monthly DCA — daily noise ignore',
        'Har contribution journal; FOMO = skip',
        'Trading baad — pehle paper, ≤1% risk',
        'Binary / tips / guaranteed % = walk away ($0)',
      ],
    },
  },
  {
    id: 'psx-account',
    title: { en: 'Open a PSX investing account', ur: 'PSX investing account kholo' },
    blurb: {
      en: 'Process checklist. Verify on PSX/SECP yourself — we do not endorse a broker.',
      ur: 'Process checklist. Khud PSX/SECP pe verify — broker endorse nahi.',
    },
    steps: {
      en: [
        'Open PSX / SECP official site — list licensed TREC brokers',
        'Pick one; screenshot legal name + license page',
        'Start online account / KYC (CNIC, selfie, address as required)',
        'Open CDC / investor account so shares sit in YOUR name',
        'Link bank; fund a tiny test amount via official channel only',
        'Place a tiny buy (or paper) then test a small withdrawal',
        'Set monthly funding cap; never send to tip-seller wallets',
      ],
      ur: [
        'PSX/SECP pe licensed TREC list',
        'Ek choose; legal name + license screenshot',
        'Online account / KYC (CNIC, selfie, address)',
        'CDC / investor — shares TUMHARE naam',
        'Bank link; chhota test fund — sirf official channel',
        'Chhoti buy (ya paper) + chhota withdrawal test',
        'Monthly funding cap; tip wallet pe kabhi nahi',
      ],
    },
  },
  {
    id: 'crypto-account',
    title: { en: 'Open a crypto venue (careful)', ur: 'Crypto venue kholo (careful)' },
    blurb: {
      en: 'Prefer regulated where you live. Exchange balance = IOU. Life savings ≠ exchange.',
      ur: 'Jahan possible regulated. Exchange = IOU. Life savings exchange pe nahi.',
    },
    steps: {
      en: [
        'Check your country’s rules; prefer licensed venues',
        'Create account; complete KYC',
        'Enable app 2FA (not SMS if you can avoid it)',
        'Deposit a tiny amount only',
        'Test withdrawal to your bank/wallet before size',
        'Trading stack on exchange; long-term stack → tested self-custody',
        'Never share seed / OTP with “support”',
      ],
      ur: [
        'Apne country rules; licensed prefer',
        'Account + KYC',
        'App 2FA (SMS avoid if possible)',
        'Sirf tiny deposit',
        'Size se pehle withdrawal test',
        'Trading stack exchange; long-term → tested self-custody',
        'Seed/OTP “support” ko kabhi nahi',
      ],
    },
  },
  {
    id: 'orders',
    title: { en: 'Place your first order (paper OK)', ur: 'Pehla order (paper OK)' },
    blurb: {
      en: 'Learn bid/ask, limit vs market, stop. Prefer limits for 2 weeks.',
      ur: 'Bid/ask, limit vs market, stop. 2 hafte limits prefer.',
    },
    steps: {
      en: [
        'Write setup in one sentence before touching the ticket',
        'Complete Journal checklist 4/4',
        'Compute size: risk $ = balance × risk %',
        'Choose limit (patient) unless you accept spread cost',
        'Set stop before entry',
        'Fill → log in Journal with emotion tag',
        'Debrief: process followed? (not “was market right?”)',
      ],
      ur: [
        'Ticket se pehle setup ek jumla',
        'Journal checklist 4/4',
        'Size: risk $ = balance × risk %',
        'Limit prefer — warna spread cost accept',
        'Entry se pehle stop',
        'Fill → Journal + emotion',
        'Debrief: process? (market sahi? nahi)',
      ],
    },
  },
  {
    id: 'first-invest',
    title: { en: 'First real invest buy (boring)', ur: 'Pehli asli invest buy (boring)' },
    blurb: {
      en: 'After Foundations + Investing basics. Broad / low-cost / long horizon.',
      ur: 'Foundations + Investing basics ke baad. Broad / low-cost / lambi soch.',
    },
    steps: {
      en: [
        'Confirm emergency cash exists',
        'Confirm CDC/custody in your name (equities)',
        'Write 1-page thesis (why this fund/stock for 5+ years)',
        'Buy size you can ignore for a year of drawdown',
        'Turn on monthly auto-buy if available',
        'Log buy in Journal (emotion = calm)',
        'No leverage, no options Year 1',
      ],
      ur: [
        'Emergency cash confirm',
        'CDC/custody apne naam',
        '1-page thesis (5+ saal kyun)',
        'Size jo 1 saal drawdown ignore ho',
        'Monthly auto-buy on',
        'Journal log (calm)',
        'Year 1: no leverage, no options',
      ],
    },
  },
  {
    id: 'self-custody',
    title: { en: 'Self-custody test (crypto)', ur: 'Self-custody test (crypto)' },
    blurb: {
      en: 'Untested seed backup = hope, not backup.',
      ur: 'Bina test seed = umeed, backup nahi.',
    },
    steps: {
      en: [
        'Write seed offline; never photo/cloud',
        'Send tiny amount to new wallet',
        'Wipe / reinstall; recover from seed once',
        'Only then move meaningful size',
        'Keep trading dust on exchange if needed',
      ],
      ur: [
        'Seed offline; photo/cloud nahi',
        'Naye wallet pe tiny send',
        'Wipe/reinstall; seed se recover ek dafa',
        'Phir meaningful size',
        'Trading dust exchange pe OK',
      ],
    },
  },
];

function getHowtoState() {
  return store.get(KEYS.howtoChecks, {}) || {};
}

function setHowtoState(obj) {
  store.set(KEYS.howtoChecks, obj);
}

export function openHowto(App, { guideId } = {}) {
  document.getElementById('howto-sheet')?.remove();
  const lang = App.lang;
  let active = guideId || HOWTO_GUIDES[0].id;
  const state = getHowtoState();

  const sheet = document.createElement('div');
  sheet.id = 'howto-sheet';
  sheet.className = 'sheet-root';

  function paint() {
    const g = HOWTO_GUIDES.find((x) => x.id === active) || HOWTO_GUIDES[0];
    const steps = g.steps[lang] || g.steps.en;
    const checks = state[g.id] || {};
    sheet.innerHTML = `
      <div class="sheet-backdrop" data-close></div>
      <div class="sheet" role="dialog" aria-label="${App.t('howto_title')}">
        <div class="sheet-handle"></div>
        <div class="sheet-head">
          <div class="slabel">${App.t('howto_title')}</div>
          <button class="sheet-x" data-close aria-label="Close">${icon('x', { size: 18 })}</button>
        </div>
        <div class="sheet-body">
          <div class="note-box" style="margin-bottom:12px">${App.t('howto_honest')}</div>
          <div class="hstack" style="gap:6px;flex-wrap:wrap;margin-bottom:12px">
            ${HOWTO_GUIDES.map((x) => `
              <button type="button" class="pill ${x.id === active ? 'acc' : ''}" data-guide="${x.id}">${x.title[lang]}</button>
            `).join('')}
          </div>
          <div class="panel pad">
            <div style="font-size:16px;font-weight:600;letter-spacing:-0.02em">${g.title[lang]}</div>
            <p style="font-size:13.5px;color:var(--t3);margin:8px 0 14px;line-height:1.5">${g.blurb[lang]}</p>
            ${steps.map((s, i) => `
              <div class="check-row ${checks[i] ? 'on' : ''}" data-step="${i}">
                <span class="check-box">${icon('checkThin', { size: 13, sw: 2.6 })}</span>
                <span class="check-t">${s}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>`;
    requestAnimationFrame(() => sheet.classList.add('on'));
    sheet.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', () => sheet.remove()));
    sheet.querySelectorAll('[data-guide]').forEach((b) => b.addEventListener('click', () => {
      active = b.dataset.guide; App.haptic(); paint();
    }));
    sheet.querySelectorAll('[data-step]').forEach((el) => el.addEventListener('click', () => {
      const i = el.dataset.step;
      if (!state[g.id]) state[g.id] = {};
      state[g.id][i] = !state[g.id][i];
      setHowtoState(state);
      el.classList.toggle('on', !!state[g.id][i]);
      App.haptic();
    }));
  }

  document.body.appendChild(sheet);
  paint();
}
