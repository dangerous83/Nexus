// Download the Higgsfield-generated brand assets into public/assets.
//
// Run locally (NOT inside the restricted web sandbox):  npm run assets
//
// The image URLs below point at the Higgsfield CDN for the renders generated
// for this build. If a URL 403s (the CDN is account-scoped), open each job in
// your Higgsfield library and "Download", saving to the target filename shown.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'public/assets');

const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_34SGn9O1DyKx5raXvDSnlxgbueE';

// jobId is included so you can find each render in your Higgsfield library.
const ASSETS = [
  { file: 'hero.png',            jobId: '78e2dfdd-a954-4d30-ab49-eb8e23a7b8b9', url: `${CDN}/hf_20260603_080724_78e2dfdd-a954-4d30-ab49-eb8e23a7b8b9.jpeg` },
  { file: 'matching-engine.jpg', jobId: '0db34f0e-d582-4990-bbfa-12f19b16f85f', url: `${CDN}/hf_20260603_081214_0db34f0e-d582-4990-bbfa-12f19b16f85f.jpeg` },
  { file: 'platform-layers.jpg', jobId: '9f1d3415-e10e-414d-a2fb-e3e00c6cc298', url: `${CDN}/hf_20260603_081209_9f1d3415-e10e-414d-a2fb-e3e00c6cc298.png` },
  { file: 'security-core.jpg',   jobId: '80b484a8-7c51-48ad-8bed-5f73bdbc5678', url: `${CDN}/hf_20260603_081211_80b484a8-7c51-48ad-8bed-5f73bdbc5678.jpeg` },
  { file: 'network-mesh.jpg',    jobId: '563825f4-2945-4972-a594-df64da5a05d4', url: `${CDN}/hf_20260603_081212_563825f4-2945-4972-a594-df64da5a05d4.png` },
  { file: 'cta-ambient.jpg',     jobId: '84bcc77e-e861-46b1-8026-7295b632f69f', url: `${CDN}/hf_20260603_081216_84bcc77e-e861-46b1-8026-7295b632f69f.jpeg` },
  { file: 'logo.png',            jobId: 'b158dab4-aa89-4941-95cd-1e8d8f30e215', url: `${CDN}/hf_20260603_080721_b158dab4-aa89-4941-95cd-1e8d8f30e215.png` },
];

await mkdir(out, { recursive: true });

let ok = 0;
for (const a of ASSETS) {
  try {
    const res = await fetch(a.url, { headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'image/*' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(resolve(out, a.file), buf);
    console.log(`✓ ${a.file}  (${(buf.length / 1024).toFixed(0)} KB)`);
    ok++;
  } catch (e) {
    console.warn(`✗ ${a.file} — ${e.message}. Download job ${a.jobId} from your Higgsfield library and save as public/assets/${a.file}`);
  }
}
console.log(`\n${ok}/${ASSETS.length} assets fetched into public/assets/`);
