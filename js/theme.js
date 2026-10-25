/* ============================================================
   theme.js — Dark / Light / Sepia / Auto (paper institute).
   ============================================================ */

import { store, KEYS } from './store.js';

/** WCAG AA eyebrow on each paper/ink (11px uppercase). */
const ONB_EYEBROW = {
  dark: '#C4A574',
  light: '#9A3412',
  sepia: '#9A3412',
};

/** Status-bar colour = HIG grouped background per mode (css/design/tokens.css). */
const THEME_COLOR = { light: '#F2F2F7', sepia: '#ECE3D3', dark: '#000000' };

const PRESETS = {
  dark: {
    bg: '#0A0A0A', bg1: '#121212', surface: '#161614', surface2: '#1C1C18', surface3: '#242420',
    t0: '#E8E4DC', t1: '#C8C4BC', t2: '#8A867E', t3: '#6E6A64', t4: '#5A564E',
    line: 'rgba(255,248,235,0.08)', line2: 'rgba(255,248,235,0.12)',
    acc: '#E8590C', acc2: '#F06A22', accDim: 'rgba(232,89,12,0.16)',
  },
  light: {
    bg: '#F5F1E8', bg1: '#FFFBF3', surface: '#FFFBF3', surface2: '#EDE6D8', surface3: '#E4DCCB',
    t0: '#1C1810', t1: '#3D3528', t2: '#5C5344', t3: '#6E6454', t4: '#7A7060',
    line: 'rgba(80,60,20,0.12)', line2: 'rgba(80,60,20,0.18)',
    acc: '#9A3412', acc2: '#9A3412', accDim: 'rgba(154,52,18,0.12)',
  },
  sepia: {
    bg: '#E8DCC8', bg1: '#F0E6D4', surface: '#F3E9D6', surface2: '#DDD0B8', surface3: '#D0C2A8',
    t0: '#3B2F1E', t1: '#5A4A32', t2: '#7A6848', t3: '#8A7858', t4: '#9A8868',
    line: 'rgba(60,40,10,0.14)', line2: 'rgba(60,40,10,0.2)',
    acc: '#9A3412', acc2: '#9A3412', accDim: 'rgba(154,52,18,0.14)',
  },
};

function resolveMode(mode) {
  if (mode === 'auto') {
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  if (mode === 'sepia' || mode === 'light' || mode === 'dark') return mode;
  return 'light';
}

export function getAppearance() {
  const a = store.get(KEYS.appearance, null);
  if (!a) return { mode: 'light', preset: 'original' };
  // Collapse legacy presets
  if (a.preset && a.preset !== 'original') a.preset = 'original';
  if (!a.mode) a.mode = 'light';
  return a;
}

export function setAppearance(patch) {
  const next = { ...getAppearance(), ...patch, preset: 'original' };
  store.set(KEYS.appearance, next);
  applyTheme();
  return next;
}

export function applyTheme() {
  const a = getAppearance();
  const mode = resolveMode(a.mode);
  const p = PRESETS[mode] || PRESETS.light;
  const root = document.documentElement;
  root.dataset.theme = mode;
  root.dataset.mode = mode;
  // HIG tokens live in css/design/tokens.css keyed on data-theme; clear 51.x inline colour overrides
  ['--bg', '--bg-1', '--surface', '--surface-2', '--surface-3', '--t0', '--t1', '--t2', '--t3', '--t4', '--line', '--line-2',
    '--acc', '--acc-2', '--onb-eyebrow', '--acc-dim', '--acc-line'].forEach((k) => root.style.removeProperty(k));
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_COLOR[mode] || THEME_COLOR.light);
  if (document.body) {
    document.body.style.background = '';
    document.body.style.color = '';
    document.body.classList.toggle('inst-desktop', window.innerWidth >= 900);
  }
}

try {
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
    if (getAppearance().mode === 'auto') applyTheme();
  });
  window.addEventListener('resize', () => {
    if (document.body) document.body.classList.toggle('inst-desktop', window.innerWidth >= 900);
  });
} catch { /* older engines */ }

export { PRESETS };
