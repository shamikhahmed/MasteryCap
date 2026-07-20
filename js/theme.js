/* ============================================================
   theme.js — Light / Dark / Auto only (trade-school workbench).
   ============================================================ */

import { store, KEYS } from './store.js';

const PRESETS = {
  dark: {
    bg: '#141310', bg1: '#1A1814', surface: '#211E19', surface2: '#2A2620', surface3: '#332E27',
    t0: '#F4F0E6', t1: '#C8C0B4', t2: '#8A8278', t3: '#7A7268', t4: '#6E665C',
    line: 'rgba(255,248,235,0.08)', line2: 'rgba(255,248,235,0.12)',
  },
  light: {
    bg: '#F4F0E6', bg1: '#FFFBF3', surface: '#FFFBF3', surface2: '#EDE6D8', surface3: '#E4DCCB',
    t0: '#1C1810', t1: '#3D3528', t2: '#5C5344', t3: '#6E6454', t4: '#7A7060',
    line: 'rgba(80,60,20,0.12)', line2: 'rgba(80,60,20,0.18)',
  },
};

function resolveMode(mode) {
  if (mode === 'auto') {
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  return mode === 'light' ? 'light' : 'dark';
}

export function getAppearance() {
  const a = store.get(KEYS.appearance, { mode: 'dark', preset: 'original' });
  // Collapse legacy presets (paper/quiet/focus) → original (follow mode)
  if (a.preset && a.preset !== 'original') a.preset = 'original';
  if (a.preset === 'dark' || a.preset === 'light') a.preset = 'original';
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
  const p = PRESETS[mode] || PRESETS.dark;
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
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', mode === 'light' ? '#F4F0E6' : '#141310');
  if (document.body) {
    document.body.style.background = p.bg;
    document.body.style.color = p.t0;
  }
}

try {
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
    if (getAppearance().mode === 'auto') applyTheme();
  });
} catch { /* older engines */ }

export { PRESETS };
