// Nav partial — built once, injected on every page. Active state via body[data-page].

export const NAV_LINKS = [
  { href: 'modules.html', label: 'Modules', key: 'modules' },
  { href: 'white-label.html', label: 'White-label', key: 'whitelabel' },
  { href: 'security.html', label: 'Security', key: 'security' },
  { href: 'integrations.html', label: 'Integrations', key: 'integrations' },
  { href: 'pricing.html', label: 'Pricing', key: 'pricing' },
];

const MARK = `
<svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#BF953F"/><stop offset="0.28" stop-color="#FCF6BA"/>
      <stop offset="0.5" stop-color="#B38728"/><stop offset="0.72" stop-color="#FBF5B7"/>
      <stop offset="1" stop-color="#AA771C"/>
    </linearGradient>
  </defs>
  <path d="M9 23 V9 L23 23 V9" fill="none" stroke="url(#brandGrad)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="9" cy="9" r="1.9" fill="url(#brandGrad)"/>
  <circle cx="23" cy="23" r="1.9" fill="url(#brandGrad)"/>
  <circle cx="16" cy="16" r="1.5" fill="#FCF6BA"/>
</svg>`;

export function renderNav(active = '') {
  const links = NAV_LINKS.map(
    (l) =>
      `<a class="nav__link" href="${l.href}"${l.key === active ? ' aria-current="page"' : ''}>${l.label}</a>`
  ).join('');

  return `
  <div class="nav__inner">
    <a class="brand" href="index.html" aria-label="Nexus — home">
      ${MARK}
      <span class="brand__name">Nexus</span>
      <span class="brand__sub">/ infrastructure</span>
    </a>
    <nav class="nav__links" aria-label="Primary">${links}</nav>
    <div class="nav__actions">
      <a class="nav__signin" href="#">Sign in</a>
      <a class="btn btn-primary" href="contact.html">
        <span class="btn__swap"><span>Book a demo →</span><span>Let’s talk →</span></span>
      </a>
    </div>
    <button class="nav__toggle" aria-label="Menu" aria-expanded="false"><span></span></button>
  </div>`;
}
