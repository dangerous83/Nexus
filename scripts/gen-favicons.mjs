// Generate favicons + OG image from the brand mark using sharp.
// Run: npm run favicons
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pub = resolve(root, 'public');

const svg = await readFile(resolve(pub, 'favicon.svg'));

// PNG icons
await sharp(svg, { density: 384 }).resize(32, 32).png().toFile(resolve(pub, 'favicon-32.png'));
await sharp(svg, { density: 384 }).resize(180, 180).png().toFile(resolve(pub, 'apple-touch-icon.png'));
console.log('✓ favicon-32.png, apple-touch-icon.png');

// favicon.ico (ICO container wrapping a 32x32 PNG)
const png32 = await sharp(svg, { density: 384 }).resize(32, 32).png().toBuffer();
const ico = Buffer.alloc(6 + 16 + png32.length);
ico.writeUInt16LE(0, 0);            // reserved
ico.writeUInt16LE(1, 2);            // type: icon
ico.writeUInt16LE(1, 4);            // count
ico.writeUInt8(32, 6);              // width
ico.writeUInt8(32, 7);              // height
ico.writeUInt8(0, 8);               // palette
ico.writeUInt8(0, 9);               // reserved
ico.writeUInt16LE(1, 10);           // color planes
ico.writeUInt16LE(32, 12);          // bpp
ico.writeUInt32LE(png32.length, 14);// size
ico.writeUInt32LE(6 + 16, 18);      // offset
png32.copy(ico, 6 + 16);
await writeFile(resolve(pub, 'favicon.ico'), ico);
console.log('✓ favicon.ico');

// OG image 1200x630
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#BF953F"/><stop offset="0.28" stop-color="#FCF6BA"/>
      <stop offset="0.5" stop-color="#B38728"/><stop offset="0.72" stop-color="#FBF5B7"/>
      <stop offset="1" stop-color="#AA771C"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="32%" r="60%">
      <stop offset="0" stop-color="#D4AF37" stop-opacity="0.30"/>
      <stop offset="1" stop-color="#0A0A0B" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#0A0A0B"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(90,250)">
    <path d="M0 120 V0 L120 120 V0" fill="none" stroke="url(#g)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="0" cy="0" r="11" fill="url(#g)"/><circle cx="120" cy="120" r="11" fill="url(#g)"/><circle cx="60" cy="60" r="8" fill="#FCF6BA"/>
  </g>
  <text x="250" y="320" font-family="'Space Grotesk','DejaVu Sans',sans-serif" font-size="92" font-weight="600" fill="#F4F1EA">Nexus</text>
  <text x="252" y="375" font-family="'JetBrains Mono','DejaVu Sans Mono',monospace" font-size="24" letter-spacing="3" fill="#9A8244">WHITE-LABEL CRYPTO EXCHANGE PLATFORM</text>
  <text x="90" y="560" font-family="'Space Grotesk','DejaVu Sans',sans-serif" font-size="40" font-weight="500" fill="#D4AF37">Your exchange. Live this quarter — not in two years.</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(resolve(pub, 'og.png'));
console.log('✓ og.png');
