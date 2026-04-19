import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "public/icon-previews");

/* --------------------------------- Shared --------------------------------- */

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
    <filter id="soft" x="-5%" y="-5%" width="110%" height="110%">
      <feGaussianBlur stdDeviation="1.2"/>
    </filter>
  </defs>
`;

const squircle = `
  <rect x="8" y="8" width="240" height="240" rx="56" fill="url(#bg)"/>
  <rect x="8" y="8" width="240" height="240" rx="56" fill="url(#shine)"/>
  <rect x="9.5" y="9.5" width="237" height="237" rx="54.5"
        fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="1.2"/>
`;

const wrap = (inner) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  ${defs}
  ${squircle}
  ${inner}
</svg>`.trim();

/* ----------------------------- Variant A ---------------------------------- *
 * Stroke-based SP. S and P meet at a shared top-right junction (corner fuse).
 * ------------------------------------------------------------------------- */

const variantA = wrap(`
  <g fill="none" stroke="white"
     stroke-width="22" stroke-linecap="round" stroke-linejoin="round">
    <!-- S: top-right → top hump → middle diagonal → bottom hump -->
    <path d="M 124 78
             C 124 66, 52 66, 52 94
             C 52 120, 124 126, 124 154
             C 124 184, 52 188, 52 174"/>
    <!-- P stem rooted at S top-right corner -->
    <path d="M 124 78 L 124 198"/>
    <!-- P bowl -->
    <path d="M 124 78 L 162 78
             C 204 78, 204 138, 162 138
             L 124 138"/>
  </g>
`);

/* ----------------------------- Variant B ---------------------------------- *
 * Shared-waist SP. S's middle diagonal flows into P's bowl-bottom.
 * P stem drops from there; bowl wraps back to meet it.
 * ------------------------------------------------------------------------- */

const variantB = wrap(`
  <g fill="none" stroke="white"
     stroke-width="22" stroke-linecap="round" stroke-linejoin="round">
    <!-- S (upper + waist ending at shared junction) -->
    <path d="M 122 72
             C 122 60, 54 60, 54 90
             C 54 118, 148 126, 148 138"/>
    <!-- P bowl (returns from shared junction up and over to close back to stem top) -->
    <path d="M 148 138
             L 102 138
             C 66 138, 66 72, 102 72"/>
    <!-- P stem -->
    <path d="M 148 138 L 148 202"/>
    <!-- S bottom hump -->
    <path d="M 148 138
             C 148 176, 60 186, 60 168"/>
  </g>
`);

/* ----------------------------- Variant C ---------------------------------- *
 * Filled SP with tight-kerned overlap — heavier, brand-monogram feel.
 * S and P are filled outlines that visually merge at the middle.
 * ------------------------------------------------------------------------- */

const variantC = wrap(`
  <g fill="white">
    <!-- S: bold outlined glyph -->
    <path d="
      M 132 70
      C 98 70, 58 74, 54 104
      C 50 132, 92 140, 112 144
      C 132 148, 146 152, 146 164
      C 146 178, 128 182, 108 182
      C 88 182, 68 176, 58 166
      L 52 188
      C 64 198, 88 204, 110 204
      C 148 204, 172 188, 172 162
      C 172 134, 132 126, 112 122
      C 92 118, 80 114, 80 104
      C 80 92, 96 88, 114 88
      C 134 88, 150 94, 158 102
      L 164 82
      C 154 74, 142 70, 132 70
      Z"/>
    <!-- P: bold outlined glyph, slightly overlapping S -->
    <path d="
      M 140 72
      L 140 202
      L 162 202
      L 162 154
      L 182 154
      C 212 154, 226 138, 226 114
      C 226 90, 212 72, 180 72
      Z
      M 162 92
      L 180 92
      C 196 92, 204 100, 204 114
      C 204 128, 196 136, 180 136
      L 162 136
      Z"/>
  </g>
`);

/* ----------------------------- Variant D ---------------------------------- *
 * Text-based SP (Arial Black), bold, tight kerning.
 * Relies on system font, but dead simple and very readable.
 * ------------------------------------------------------------------------- */

const variantD = wrap(`
  <text x="128" y="142"
        font-family="'Arial Black', 'Segoe UI Black', Impact, sans-serif"
        font-weight="900"
        font-size="150"
        letter-spacing="-6"
        text-anchor="middle"
        dominant-baseline="central"
        fill="white">SP</text>
`);

/* ------------------------------- Render ---------------------------------- */

async function render(name, svg) {
  const buf = await sharp(Buffer.from(svg), { density: 512 })
    .resize(256, 256)
    .png()
    .toBuffer();
  const path = resolve(OUT_DIR, `${name}.png`);
  await sharp(buf).toFile(path);
  console.log("→", path);
}

/* ----------------------------- Variant E ---------------------------------- *
 * Text-based SP with aggressive overlap (letter-spacing deeply negative)
 * so the two glyphs literally merge at the seam.
 * ------------------------------------------------------------------------- */

const variantE = wrap(`
  <text x="128" y="142"
        font-family="'Arial Black', 'Segoe UI Black', Impact, sans-serif"
        font-weight="900"
        font-size="160"
        letter-spacing="-36"
        text-anchor="middle"
        dominant-baseline="central"
        fill="white">SP</text>
`);

/* ----------------------------- Variant F ---------------------------------- *
 * Polished stroke SP: proper classical S on the left, P on the right,
 * with the top-right terminal of S and the top of P stem merging cleanly.
 * ------------------------------------------------------------------------- */

const variantF = wrap(`
  <g fill="none" stroke="white"
     stroke-width="24" stroke-linecap="round" stroke-linejoin="round">
    <!-- S: classical shape, ending at lower-left terminal -->
    <path d="M 140 82
             C 140 68, 64 66, 60 98
             C 56 124, 128 128, 132 150
             C 136 176, 68 184, 56 168"/>
    <!-- P stem: rises from the S's upper waist point, full height -->
    <path d="M 140 82 L 140 196"/>
    <!-- P bowl -->
    <path d="M 140 82 L 172 82
             C 208 82, 208 138, 172 138
             L 140 138"/>
  </g>
`);

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await render("variant-a-corner-fuse", variantA);
  await render("variant-b-waist-share", variantB);
  await render("variant-c-filled-overlap", variantC);
  await render("variant-d-text-bold", variantD);
  await render("variant-e-text-overlap", variantE);
  await render("variant-f-polished-stroke", variantF);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
