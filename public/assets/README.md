# Brand assets (Higgsfield-generated)

All imagery for this site was generated with the **Higgsfield MCP** (`nano_banana_pro`),
art-directed dark / cinematic / metallic-gold to match the Nexus brand.

Drop the files here (the pages reference these exact names). Until they exist, every
image slot degrades to an on-brand coded gold-on-black gradient/constellation fallback,
so the site is never broken.

| File | Slot | Higgsfield job id | Aspect |
|------|------|-------------------|--------|
| `hero.png` | Homepage hero background | `78e2dfdd-a954-4d30-ab49-eb8e23a7b8b9` | 21:9 (4K) |
| `matching-engine.jpg` | Home — core engine | `0db34f0e-d582-4990-bbfa-12f19b16f85f` | 3:2 |
| `platform-layers.jpg` | Home + White-label | `9f1d3415-e10e-414d-a2fb-e3e00c6cc298` | 16:9 |
| `security-core.jpg` | Security + operator console | `80b484a8-7c51-48ad-8bed-5f73bdbc5678` | 16:9 |
| `network-mesh.jpg` | Integrations | `563825f4-2945-4972-a594-df64da5a05d4` | 16:9 |
| `cta-ambient.jpg` | All CTA bands + contact | `84bcc77e-e861-46b1-8026-7295b632f69f` | 21:9 |
| `logo.png` | Higgsfield logo mark (reference) | `b158dab4-aa89-4941-95cd-1e8d8f30e215` | 1:1 |

## Getting the files

```bash
npm run assets   # downloads each render from the Higgsfield CDN into this folder
```

If the CDN returns 403 (the asset URLs are account-scoped), open each job id in your
Higgsfield library, click **Download**, and save it here under the filename above.

> The favicon set and OG image are generated separately from the coded brand mark
> (`npm run favicons`) and live in `public/` — they don't need fetching.
