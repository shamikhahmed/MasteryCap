/* ============================================================
   theme.js — Dark / Light / Sepia / Auto (paper institute).
   ============================================================ */

import { store, KEYS } from './store.js';

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
    acc: '#C44E0A', acc2: '#E8590C', accDim: 'rgba(196,78,10,0.12)',
  },
  sepia: {
    bg: '#E8DCC8', bg1: '#F0E6D4', surface: '#F3E9D6', surface2: '#DDD0B8', surface3: '#D0C2A8',
    t0: '#3B2F1E', t1: '#5A4A32', t2: '#7A6848', t3: '#8A7858', t4: '#9A8868',
    line: 'rgba(60,40,10,0.14)', line2: 'rgba(60,40,10,0.2)',
    acc: '#A84A12', acc2: '#C44E0A', accDim: 'rgba(168,74,18,0.14)',
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
  root.style.setProperty('--bg', p.bg);
  root.style.setProperty('--bg-1', p.bg1);
  root.style.setProperty('--surface', p.surface);
  root.style.setProperty('--surface-2', p.surface2);
  root.style.setProperty('--surface-3', p.surface3);
  root.style.setProperty('--t0', p.t0);
  root.style.setProperty('--t1', p.t1);
  root.style.setProperty('--t2', p.t2);
  root.style.setProperty('--t3', p.t3);
  root.style.setProperty('--t4', p.t4 || p.t3);
  root.style.setProperty('--line', p.line);
  root.style.setProperty('--line-2', p.line2);
  root.style.setProperty('--acc', p.acc);
  root.style.setProperty('--acc-2', p.acc2);
  root.style.setProperty('--acc-dim', p.accDim);
  root.style.setProperty('--acc-line', p.accDim.replace('0.1', '0.35').replace('0.12', '0.35').replace('0.14', '0.35').replace('0.16', '0.35'));
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', p.bg);
  if (document.body) {
    document.body.style.background = p.bg;
    document.body.style.color = p.t0;
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
