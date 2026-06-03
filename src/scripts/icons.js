// Custom SVG line icons (gold/off-white via currentColor). No emoji.
const S = (paths) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

export const ICONS = {
  engine: S('<rect x="6" y="6" width="12" height="12" rx="1.5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/><rect x="10" y="10" width="4" height="4" rx="0.5"/>'),
  bolt: S('<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>'),
  shield: S('<path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z"/><path d="m9.5 12 2 2 3.5-4"/>'),
  key: S('<circle cx="8" cy="8" r="4"/><path d="m11 11 8 8M16 16l2-2M18.5 18.5 20 17"/>'),
  ledger: S('<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M8 3v18M12 8h5M12 12h5M12 16h5"/>'),
  comply: S('<path d="M9 3h6l1 2h3v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5h3l1-2Z"/><path d="m9 13 2 2 4-4"/>'),
  chart: S('<path d="M4 4v16h16"/><rect x="7" y="11" width="2.5" height="6" rx="0.5"/><rect x="12" y="7" width="2.5" height="10" rx="0.5"/><rect x="17" y="13" width="2.5" height="4" rx="0.5"/>'),
  exchange: S('<path d="M4 8h13l-3-3M20 16H7l3 3"/>'),
  coins: S('<ellipse cx="9" cy="7" rx="5" ry="2.5"/><path d="M4 7v5c0 1.4 2.2 2.5 5 2.5"/><ellipse cx="15" cy="14" rx="5" ry="2.5"/><path d="M10 14v3c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-3"/>'),
  growth: S('<path d="M4 18 10 12l3 3 7-8"/><path d="M15 7h5v5"/>'),
  pulse: S('<path d="M3 12h4l2-6 4 12 2-6h6"/>'),
  globe: S('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/>'),
  bank: S('<path d="M3 9 12 4l9 5M5 9v8M9 9v8M15 9v8M19 9v8M3 20h18"/>'),
  fiat: S('<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v6M18 9v6"/>'),
  id: S('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M5 16c.6-1.6 2-2.4 3.5-2.4S11.4 14.4 12 16M14 9h4M14 12h4M14 15h2.5"/>'),
  scan: S('<path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2"/><circle cx="11" cy="11" r="3"/><path d="m14 14 2.5 2.5"/>'),
  gauge: S('<path d="M4 18a8 8 0 1 1 16 0"/><path d="m12 14 4-4"/><circle cx="12" cy="18" r="1"/>'),
  layers: S('<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5M3 17l9 5 9-5" opacity="0.6"/>'),
  plug: S('<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v4"/>'),
  partners: S('<path d="M8 13 4 9a2.5 2.5 0 0 1 3.5-3.5L9 7l1.5-1.5A2.5 2.5 0 0 1 14 9M16 11l4 4a2.5 2.5 0 0 1-3.5 3.5L15 17l-1.5 1.5A2.5 2.5 0 0 1 10 15"/>'),
  lock: S('<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>'),
  doc: S('<path d="M7 3h7l5 5v13a0 0 0 0 1 0 0H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>'),
  cloud: S('<path d="M7 18a4 4 0 0 1-.5-7.97A5 5 0 0 1 16 9.5a3.5 3.5 0 0 1 1 6.86"/><path d="M7 18h10"/>'),
};

export function icon(name) {
  return ICONS[name] || ICONS.bolt;
}
