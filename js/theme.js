/* ============================================================
   theme.js — Books-like appearance (Light / Dark / Auto + presets).
   ============================================================ */

import { store, KEYS } from './store.js';

const PRESETS = {
  dark: {
    bg: '#08090A', bg1: '#0B0C0E', surface: '#101215', surface2: '#15181C', surface3: '#1B1F24',
    t0: '#F4F5F6', t1: '#C4C8CD', t2: '#878D95', t3: '#7A828C',
    line: 'rgba(255,255,255,0.06)', line2: 'rgba(255,255,255,0.10)',
  },
  light: {
    bg: '#F7F6F3', bg1: '#FFFFFF', surface: '#FFFFFF', surface2: '#F0EEEA', surface3: '#E8E6E1',
    t0: '#12141A', t1: '#3A3F4A', t2: '#5C6370', t3: '#6B7280',
    line: 'rgba(0,0,0,0.08)', line2: 'rgba(0,0,0,0.12)',
  },
  paper: {
    bg: '#F3EBD9', bg1: '#F7F0E0', surface: '#F7F0E0', surface2: '#EDE3CC', surface3: '#E5D9BE',
    t0: '#1C1810', t1: '#3D3528', t2: '#5C5344', t3: '#6E6454',
    line: 'rgba(80,60,20,0.12)', line2: 'rgba(80,60,20,0.18)',
  },
  quiet: {
    bg: '#0E1114', bg1: '#12161A', surface: '#161B21', surface2: '#1C2229', surface3: '#222930',
    t0: '#E8ECF0', t1: '#A8B0BA', t2: '#7A8490', t3: '#6A7480',
    line: 'rgba(255,255,255,0.05)', line2: 'rgba(255,255,255,0.09)',
  },
  focus: {
    bg: '#050608', bg1: '#080A0C', surface: '#0C0E12', surface2: '#10141A', surface3: '#161B22',
    t0: '#F0F2F5', t1: '#B0B6BE', t2: '#808890', t3: '#707880',
    line: 'rgba(255,255,255,0.05)', line2: 'rgba(255,255,255,0.08)',
  },
};

function resolveMode(mode) {
  if (mode === 'auto') {
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  return mode || 'dark';
}

export function getAppearance() {
  return store.get(KEYS.appearance, { mode: 'dark', preset: 'dark' });
}

export function setAppearance(patch) {
  const next = { ...getAppearance(), ...patch };
  store.set(KEYS.appearance, next);
  applyTheme();
  return next;
}

export function applyTheme() {
  const a = getAppearance();
  const mode = resolveMode(a.mode);
  const presetKey = a.preset === 'original' ? mode : (a.preset || mode);
  const p = PRESETS[presetKey] || PRESETS[mode] || PRESETS.dark;
  const root = document.documentElement;
  root.dataset.theme = presetKey;
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
  root.style.setProperty('--line', p.line);
  root.style.setProperty('--line-2', p.line2);
  if (document.body) {
    document.body.style.background = p.bg;
    document.body.style.color = p.t0;
  }
}

export { PRESETS };
