// Footer partial — built once, injected on every page.

const COLUMNS = [
  {
    title: 'Platform',
    links: [
      { label: 'Modules', href: 'modules.html' },
      { label: 'White-label', href: 'white-label.html' },
      { label: 'Architecture', href: 'white-label.html#architecture' },
      { label: 'Security', href: 'security.html' },
      { label: 'Integrations', href: 'integrations.html' },
      { label: 'Partners', href: 'integrations.html#partners' },
    ],
  },
  {
    title: 'Pricing',
    links: [
      { label: 'Launch tier', href: 'pricing.html#editions' },
      { label: 'Growth tier', href: 'pricing.html#editions' },
      { label: 'Enterprise', href: 'pricing.html#packaging' },
      { label: 'Book a demo', href: 'contact.html' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Customers', href: 'index.html#customers' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of service', href: '#' },
      { label: 'Privacy policy', href: '#' },
      { label: 'DPA', href: '#' },
      { label: 'Sub-processors', href: '#' },
      { label: 'Disclosures', href: '#' },
    ],
  },
];

export function renderFooter() {
  const cols = COLUMNS.map(
    (c) => `
    <div class="footer__col">
      <h5>${c.title}</h5>
      <ul>${c.links.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}</ul>
    </div>`
  ).join('');

  return `
  <div class="container wide">
    <div class="footer__top">
      <div class="footer__brand">
        <span class="brand"><span class="brand__name gold-text">Nexus</span></span>
        <p class="footer__desc">Institutional-grade infrastructure for crypto venues. Built by ex-engineers from exchanges, custodians, and clearing houses — now working for yours.</p>
        <span class="footer__status"><span class="dot"></span> all systems nominal · 99.997% · 30-day</span>
      </div>
      ${cols}
    </div>
    <div class="footer__bottom">
      <p class="footer__legal">© 2026 Nexus Infrastructure Ltd · Registered in Ireland · No. 712-449-08</p>
      <div class="footer__social">
        <a href="#">x.com / nexus</a>
        <a href="#">github / nexus</a>
        <a href="#">status</a>
      </div>
    </div>
  </div>`;
}
