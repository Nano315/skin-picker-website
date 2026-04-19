import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_ICO = resolve(ROOT, "public/icon.ico");
const OUT_PNG_256 = resolve(ROOT, "public/icon-256.png");
const OUT_PNG_512 = resolve(ROOT, "public/icon-512.png");

/*
 * Original zigzag trait (unchanged shape, same stroke style):
 *   M 72 176 L 112 96 L 144 152 L 184 96
 * Rotated 90° CCW then flipped horizontally so the zigzag now reads
 * top-to-bottom as an angular S. Background stays upright.
 *
 *   M 80 184 L 160 144 L 104 112 L 160 72
 */

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
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
    <filter id="inner" x="-5%" y="-5%" width="110%" height="110%">
      <feGaussianBlur stdDeviation="1.2"/>
    </filter>
  </defs>

  <!-- Squircle background -->
  <rect x="8" y="8" width="240" height="240" rx="56" fill="url(#bg)"/>
  <!-- Top shine -->
  <rect x="8" y="8" width="240" height="240" rx="56" fill="url(#shine)"/>
  <!-- Subtle inner highlight border -->
  <rect x="9.5" y="9.5" width="237" height="237" rx="54.5"
        fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="1.2"/>

  <!-- Original trait, rotated 90° + flipped to form an S -->
  <path d="M 80 184 L 160 144 L 104 112 L 160 72"
        fill="none"
        stroke="#ffffff"
        stroke-width="22"
        stroke-linecap="round"
        stroke-linejoin="round"
        filter="url(#inner)"
        opacity="0.18"/>
  <path d="M 80 184 L 160 144 L 104 112 L 160 72"
        fill="none"
        stroke="#ffffff"
        stroke-width="18"
        stroke-linecap="round"
        stroke-linejoin="round"/>
</svg>
`.trim();

const ICON_SIZES = [16, 24, 32, 48, 64, 128, 256];

async function main() {
  await mkdir(dirname(OUT_ICO), { recursive: true });

  const pngBuffers = await Promise.all(
    ICON_SIZES.map((size) =>
      sharp(Buffer.from(svg), { density: 512 })
        .resize(size, size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toBuffer()
    )
  );

  const icoBuffer = await pngToIco(pngBuffers);
  await writeFile(OUT_ICO, icoBuffer);

  await sharp(Buffer.from(svg), { density: 512 })
    .resize(256, 256)
    .png()
    .toFile(OUT_PNG_256);

  await sharp(Buffer.from(svg), { density: 1024 })
    .resize(512, 512)
    .png()
    .toFile(OUT_PNG_512);

  console.log("✔ Wrote", OUT_ICO, `(${ICON_SIZES.join(", ")} px)`);
  console.log("✔ Wrote", OUT_PNG_256);
  console.log("✔ Wrote", OUT_PNG_512);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
