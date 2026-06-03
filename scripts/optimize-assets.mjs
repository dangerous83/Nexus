// Downscale + compress the Higgsfield renders for the web.
// Run: node scripts/optimize-assets.mjs
import sharp from 'sharp';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const dir = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public/assets');

// file -> { width, fmt, quality }
const PLAN = {
  'hero.png':            { width: 2880, fmt: 'jpeg', q: 82 },
  'cta-ambient.jpg':     { width: 2880, fmt: 'jpeg', q: 82 },
  'platform-layers.jpg': { width: 2200, fmt: 'jpeg', q: 82 },
  'network-mesh.jpg':    { width: 2200, fmt: 'jpeg', q: 82 },
  'security-core.jpg':   { width: 2200, fmt: 'jpeg', q: 82 },
  'matching-engine.jpg': { width: 2200, fmt: 'jpeg', q: 82 },
  'logo.png':            { width: 1024, fmt: 'png',  q: 90 },
};

for (const [file, p] of Object.entries(PLAN)) {
  const path = resolve(dir, file);
  const before = (await stat(path)).size;
  const buf = await readFile(path); // read fully before overwriting
  let pipe = sharp(buf).resize({ width: p.width, withoutEnlargement: true });
  pipe = p.fmt === 'png'
    ? pipe.png({ quality: p.q, compressionLevel: 9, palette: true })
    : pipe.jpeg({ quality: p.q, mozjpeg: true });
  const out = await pipe.toBuffer();
  await writeFile(path, out);
  console.log(`✓ ${file.padEnd(22)} ${(before / 1e6).toFixed(1)}MB → ${(out.length / 1024).toFixed(0)}KB`);
}
console.log('done');
