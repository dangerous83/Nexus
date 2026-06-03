# Nexus — White-label Crypto Exchange Platform

Production-grade, multi-page marketing site for **Nexus**, the white-label crypto
exchange platform powered by ITSEC. Dark, cinematic, black & gold. Every word of copy
is drawn verbatim from the brand brief; every visual asset is generated via Higgsfield.

## Stack

- **[Vite 6](https://vitejs.dev)** — multi-page dev/build (one HTML entry per nav item)
- **[Lenis](https://github.com/darkroomengineering/lenis)** — smooth scroll
- **[GSAP](https://gsap.com) + ScrollTrigger** — layered parallax, scroll reveals, counters
- **Self-hosted fonts** via `@fontsource-variable` — Space Grotesk (display/body) + JetBrains Mono (labels)
- No UI framework. Vanilla ES modules, plain CSS with design tokens.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/
npm run preview    # serve the production build

npm run favicons   # (re)generate favicon.ico / PNGs / og.png from the brand mark
npm run assets     # download the Higgsfield imagery into public/assets (run locally)
```

## Pages (each nav item = its own HTML page)

| Page | File | Brief sections |
|------|------|----------------|
| Home | `index.html` | 00 hero · 01 what nexus is · stats · live status · customers · 05 teaser · 10 CTA |
| Modules | `modules.html` | 02 — 12 modules across Trading surfaces / Core engines / Trust layer |
| White-label | `white-label.html` | 03 platform surfaces · 04 platform (Stack / Deployment / Resilience) |
| Security | `security.html` | 05 — one-vendor before/after, ComplianceX + VerifiX, certs, licensed venues, defense in depth |
| Integrations | `integrations.html` | 06 integrations · 07 partners |
| Pricing | `pricing.html` | 08 editions (Regulated / Non-regulated toggle) · 09 packaging |
| Book a demo | `contact.html` | 10 ready — demo request form |

Nav and footer are built once in `src/partials/` and **injected** on every page (with an
active-state on the current nav item), so they're identical everywhere.

## Structure

```
.
├── index.html  modules.html  white-label.html  security.html
├── integrations.html  pricing.html  contact.html
├── src/
│   ├── styles/   tokens.css · main.css
│   ├── scripts/  main.js · parallax.js · animations.js · icons.js · mount-icons.js
│   └── partials/ nav.js · footer.js
├── public/
│   ├── favicon.svg · favicon.ico · favicon-32.png · apple-touch-icon.png · og.png
│   └── assets/   (Higgsfield imagery — see assets/README.md)
├── scripts/      gen-favicons.mjs · fetch-assets.mjs
└── vite.config.js
```

## Design system

Tokens in `src/styles/tokens.css`: canvas `#0A0A0B`, surfaces `#141416`, gold hairlines
`rgba(212,175,55,.22)`, primary gold `#D4AF37`, and the signature metallic gradient used
for hero highlights and the logo (`background-clip:text`). Warm off-white text `#F4F1EA`.

Signature interactions: rotating conic-gradient **gold "saber" border** on feature-card
hover (lift + glow + icon animation), **text-swap** primary buttons with optional magnetic
pull, animated link underlines, a live status ticker, and stat counters.

## Motion & accessibility

- Hero has 3+ parallax depth layers (background image / atmosphere / grid → foreground)
  driven by a GSAP ScrollTrigger scrub; section reveals fire ~85% into the viewport.
- All motion animates **transform/opacity only**.
- `prefers-reduced-motion` kills parallax, reveals, and the marquee while keeping every bit
  of content visible.
- Semantic HTML, keyboard-navigable nav/tabs, visible focus states, real `alt` text,
  per-page `<title>` / meta description / Open Graph tags.

## Imagery

All visuals were generated with the **Higgsfield MCP** (`nano_banana_pro`), art-directed
black & metallic gold. Below-the-fold images lazy-load; every slot has an on-brand coded
fallback (gold-on-black gradients + a faint constellation) so the site looks finished even
before the renders are fetched. See `public/assets/README.md` for the file/job-id map.
