/* ============================================================
   icons.js — crafted line-icon set. 24x24 grid, 1.75 stroke.
   No emoji anywhere in the app; everything is a real glyph.
   ============================================================ */

const P = {
  /* nav */
  home: '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9"/>',
  learn: '<path d="M12 6.5C10.5 5 8 4.5 5 5v13c3-.5 5.5 0 7 1.5 1.5-1.5 4-2 7-1.5V5c-3-.5-5.5 0-7 1.5Z"/><path d="M12 6.5v13"/>',
  journal: '<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  progress: '<path d="M4 19V5"/><path d="M4 19h16"/><path d="M7.5 15l3.5-4 3 2.5L20 7.5"/>',

  /* tracks */
  crypto: '<circle cx="12" cy="12" r="8.5"/><path d="M10 8v8M10 8h3.2a2 2 0 0 1 0 4H10m0 0h3.6a2 2 0 0 1 0 4H10M11.2 6.5v1.5M11.2 16v1.5"/>',
  stocks: '<path d="M4 19V5"/><path d="M4 19h16"/><path d="M7 14l3-3 2.5 2L18 8"/><path d="M18 8h-3M18 8v3"/>',
  futures: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
  forex: '<path d="M4 8h11M4 8l3-3M4 8l3 3"/><path d="M20 16H9M20 16l-3-3M20 16l-3 3"/>',
  spot: '<circle cx="9" cy="9" r="5"/><path d="M13.5 6.2A5 5 0 1 1 15 15.5"/>',
  binary: '<path d="M12 3.5 21 19H3L12 3.5Z"/><path d="M12 10v4M12 16.8v.2"/>',
  invest: '<path d="M12 3v18M12 3l-4 4M12 3l4 4"/><path d="M5 21h14"/><path d="M7 21v-6M12 21v-9M17 21v-4"/>',
  bots: '<rect x="5" y="8" width="14" height="11" rx="2.5"/><path d="M12 8V4.5M12 4.5h.01"/><circle cx="9.5" cy="13" r="1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="13" r="1" fill="currentColor" stroke="none"/><path d="M9.5 16.5h5"/>',
  foundations: '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h4v-5h4v5h4v-9"/><path d="M10 14h4"/>',
  greeks: '<path d="M4 18V6M4 18h16"/><path d="M7 14l3-4 3 2 4-6"/><circle cx="17" cy="6" r="1.5"/>',
  tax: '<rect x="6" y="3" width="12" height="18" rx="1.5"/><path d="M9 8h6M9 12h6M9 16h4"/>',
  macro: '<circle cx="12" cy="12" r="8"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2"/><path d="M8 12c0-2 2-4 4-4s4 2 4 4-2 4-4 4"/>',

  /* misc */
  check: '<path d="M5 12.5 10 17.5 19 6.5"/>',
  checkThin: '<path d="M5 12l4.5 4.5L19 7"/>',
  chevron: '<path d="M9 5l7 7-7 7"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrowUp: '<path d="M12 19V6M6 12l6-6 6 6"/>',
  arrowDown: '<path d="M12 5v13M6 12l6 6 6-6"/>',
  triUp: '<path d="M12 7l6 9H6l6-9Z" fill="currentColor" stroke="none"/>',
  triDown: '<path d="M12 17l-6-9h12l-6 9Z" fill="currentColor" stroke="none"/>',
  bolt: '<path d="M13 3 5 13h5l-1 8 8-11h-5l1-7Z"/>',
  edit: '<path d="M4 20h4L18.5 9.5a2 2 0 0 0-3-3L5 17v3Z"/><path d="M14 7l3 3"/>',
  trash: '<path d="M5 7h14M10 7V5h4v2M6 7l1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  circleCheck: '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  alert: '<path d="M12 3.5 21 19H3L12 3.5Z"/><path d="M12 10v4M12 16.6v.2"/>',
  shield: '<path d="M12 3.5 19 6v6c0 4.5-3 7-7 8.5C8 19 5 16.5 5 12V6l7-2.5Z"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/>',
  spark: '<path d="M12 4v4M12 16v4M4 12h4M16 12h4"/><circle cx="12" cy="12" r="2.5"/>',
  seed: '<path d="M6 20c0-6 4-10 10-11-1 7-5 11-11 11Z"/><path d="M6 20c0-3 1-5 3-7"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5"/><path d="M5 19h14"/>',
  upload: '<path d="M12 20V9M7 14l5-5 5 5"/><path d="M5 5h14"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  refresh: '<path d="M19 12a7 7 0 1 1-2-4.9"/><path d="M19 5v5h-5"/>',
  flame: '<path d="M12 21c4 0 6-2.8 6-6.2 0-3.2-2-5.3-4.2-7.3-.4 2.2-1.5 3.4-2.8 3.4-1.2 0-1.8-1.4-1.5-3.5C7.2 9.4 6 11.6 6 14.5 6 18 8 21 12 21Z"/><path d="M12 21c1.8 0 3-1.2 3-2.8 0-1.5-1-2.4-2-3.2"/>',
  book: '<path d="M5 5.5C7 4.5 9.5 4.5 12 6c2.5-1.5 5-1.5 7-.5v13c-2-1-4.5-1-7 .5-2.5-1.5-5-1.5-7-.5v-13Z"/><path d="M12 6v13"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
};

export function icon(name, { size = 24, cls = '', sw = 1.75 } = {}) {
  const body = P[name] || '';
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

export const TRACK_ICON = { foundations: 'foundations', macro: 'macro', tax: 'tax', greeks: 'greeks', crypto: 'crypto', stocks: 'stocks', options: 'stocks', invest: 'invest', futures: 'futures', forex: 'forex', spot: 'spot', bots: 'bots', binary: 'binary' };
