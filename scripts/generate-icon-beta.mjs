import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_ICO = resolve(ROOT, "public/icon-beta.ico");
const OUT_PNG_256 = resolve(ROOT, "public/icon-beta-256.png");
const OUT_PNG_512 = resolve(ROOT, "public/icon-beta-512.png");

/*
 * Same geometry as the main icon, but the purple gradient is replaced by a
 * neutral grayscale ramp so the beta build is instantly recognizable in
 * the taskbar / tray.
 *
 * Path (unchanged): M 80 184 L 160 144 L 104 112 L 160 72
 */

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#8a8a90"/>
      <stop offset="55%"  stop-color="#5c5c62"/>
      <stop offset="100%" stop-color="#35353a"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="#ffffff" stop-opacity="0.28"/>
      <stop offset="45%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <filter id="inner" x="-5%" y="-5%" width="110%" height="110%">
      <feGaussianBlur stdDeviation="1.2"/>
    </filter>
  </defs>

  <!-- Squircle background (grayscale) -->
  <rect x="8" y="8" width="240" height="240" rx="56" fill="url(#bg)"/>
  <!-- Top shine -->
  <rect x="8" y="8" width="240" height="240" rx="56" fill="url(#shine)"/>
  <!-- Subtle inner highlight border -->
  <rect x="9.5" y="9.5" width="237" height="237" rx="54.5"
        fill="none" stroke="#ffffff" stroke-opacity="0.20" stroke-width="1.2"/>

  <!-- S-trait: same geometry, same rounded style, same soft halo -->
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
