// Lightweight inline SVG icon set (stroke based, inherits currentColor).
// Replaces the emoji previously used in the rule picker so icons render
// identically on every platform and stay crisp at any size.

const svg = (body, opts = {}) => {
  const w = opts.stroke || 1.8;
  return `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
};

export const ICONS = {
  // Rule categories
  'shield-x': svg('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m14.5 9.5-5 5"/><path d="m9.5 9.5 5 5"/>'),
  'sparkles': svg('<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.9 2.4L22 18l-2.1.6L19 21l-.9-2.4L16 18l2.1-.6z"/>'),
  'monitor-play': svg('<rect x="2" y="4" width="20" height="14" rx="2"/><path d="M10 8.5v5l4-2.5z"/><path d="M8 21h8"/>'),
  'youtube': svg('<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9.5v5l4.5-2.5z"/>'),
  'search': svg('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),
  'home': svg('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>'),
  'lock': svg('<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>'),
  'send': svg('<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>'),
  'code': svg('<path d="m8 6-6 6 6 6"/><path d="m16 6 6 6-6 6"/>'),
  'grid': svg('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'),
  'apple': svg('<path d="M12 8c-1-2.5-3-3.5-5-3-2 .5-3 2.6-3 5 0 4 3 9 5.5 9 .8 0 1.3-.4 2.5-.4s1.7.4 2.5.4c2.5 0 5.5-5 5.5-9 0-2.4-1-4.5-3-5-2-.5-4 .5-5 3z"/><path d="M12 8c0-2 .5-3.5 2-4.5"/>'),
  'users': svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
  'message': svg('<path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/>'),
  'film': svg('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4"/>'),
  'popcorn': svg('<path d="M4 9h16l-1.2 11.2a1 1 0 0 1-1 .8H6.2a1 1 0 0 1-1-.8z"/><path d="M4 9a2.5 2.5 0 0 1 4-2 2.5 2.5 0 0 1 4-1 2.5 2.5 0 0 1 4 1 2.5 2.5 0 0 1 4 2"/>'),
  'gamepad': svg('<rect x="2" y="7" width="20" height="10" rx="4"/><path d="M6 12h4M8 10v4"/><circle cx="16" cy="11" r="1"/><circle cx="18.5" cy="13.5" r="1"/>'),
  'shopping-bag': svg('<path d="M6 7h12l1 13H5z"/><path d="M9 7a3 3 0 0 1 6 0"/>'),
  'graduation-cap': svg('<path d="M22 9 12 4 2 9l10 5z"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"/>'),
  'credit-card': svg('<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>'),
  'cloud': svg('<path d="M17.5 19a4.5 4.5 0 0 0 .5-8.96A6 6 0 0 0 6.2 9.5 4 4 0 0 0 6.5 19z"/>'),
  'globe': svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/>'),
  'flag': svg('<path d="M5 21V4"/><path d="M5 5h14l-2 4 2 4H5"/>'),
  'scale': svg('<path d="M12 3v18"/><path d="M6 21h12"/><path d="M3 7h18"/><path d="m6 7-3 6h6z"/><path d="m18 7-3 6h6z"/>'),
  'feather': svg('<path d="M20 4c-2.5 0-8 1-10.5 3.5S5 14 5 16l-2 2 1 1 2-2c2 0 6-.5 8.5-3S20 6.5 20 4z"/><path d="M9 12h6"/>'),
  'layers': svg('<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>'),
  'wrench': svg('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'),
  'sliders': svg('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h10M18 18h2"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="16" cy="18" r="2"/>'),
  'link': svg('<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>'),
  'list': svg('<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/>')
};

export const iconSvg = (name) => ICONS[name] || ICONS.link;
