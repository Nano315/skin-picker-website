import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "public/icon-previews");

const defs = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="55%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
      <stop offset="45%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
`;

const bg = `
  <rect x="8" y="8" width="240" height="240" rx="56" fill="url(#bg)"/>
  <rect x="8" y="8" width="240" height="240" rx="56" fill="url(#shine)"/>
  <rect x="9.5" y="9.5" width="237" height="237" rx="54.5"
        fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="1.2"/>
`;

const wrap = (inner) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  ${defs}${bg}${inner}
</svg>`.trim();

/*
 * Original zigzag:  M 72 176 L 112 96 L 144 152 L 184 96
 * Rotated 90° CCW around center (128,128):
 *   (x,y) → (y, 256-x)
 *   (72,176)→(176,184)   (112,96)→(96,144)
 *   (144,152)→(152,112)  (184,96)→(96,72)
 */

/* G1 — pure rotation, rounded joins (same style as original logo, just rotated) */
const G1 = wrap(`
  <path d="M 176 184 L 96 144 L 152 112 L 96 72"
        fill="none" stroke="white" stroke-width="18"
        stroke-linecap="round" stroke-linejoin="round"/>
`);

/* G2 — pure rotation, SHARP miter joins, a touch thinner for elongated feel */
const G2 = wrap(`
  <path d="M 176 184 L 96 144 L 152 112 L 96 72"
        fill="none" stroke="white" stroke-width="16"
        stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="6"/>
`);

/* G3 — rotation + liaison: small vertical extension at the TOP (up from 96,72) */
const G3 = wrap(`
  <path d="M 176 184 L 96 144 L 152 112 L 96 72 L 96 54"
        fill="none" stroke="white" stroke-width="16"
        stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="6"/>
`);

/* G4 — rotation + liaison: separate short vertical tick above top vertex */
const G4 = wrap(`
  <g fill="none" stroke="white" stroke-width="16"
     stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="6">
    <path d="M 176 184 L 96 144 L 152 112 L 96 72"/>
    <path d="M 96 56 L 96 48"/>
  </g>
`);

/* G5 — rotation + extension at BOTTOM (down-right from last point 176,184) */
const G5 = wrap(`
  <path d="M 176 200 L 176 184 L 96 144 L 152 112 L 96 72"
        fill="none" stroke="white" stroke-width="16"
        stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="6"/>
`);

/* G6 — same as G3 but stroke thinner + more elongated (stretched vertically) */
const G6 = wrap(`
  <g transform="translate(0 -6) scale(1 1.08)" style="transform-origin:128px 128px">
    <path d="M 176 184 L 96 144 L 152 112 L 96 72 L 96 52"
          fill="none" stroke="white" stroke-width="15"
          stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="6"/>
  </g>
`);

async function render(name, svg) {
  const buf = await sharp(Buffer.from(svg), { density: 512 })
    .resize(256, 256)
    .png()
    .toBuffer();
  const p = resolve(OUT_DIR, `${name}.png`);
  await sharp(buf).toFile(p);
  console.log("→", p);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await render("zig-g1-rotated-round", G1);
  await render("zig-g2-rotated-miter", G2);
  await render("zig-g3-liaison-top", G3);
  await render("zig-g4-liaison-detached", G4);
  await render("zig-g5-liaison-bottom", G5);
  await render("zig-g6-elongated", G6);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
