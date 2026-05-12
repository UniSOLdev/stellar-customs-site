/**
 * Regenerate transparent logo PNG from a flat JPEG source.
 * Place source at `public/brand-logo-source.jpg` (or legacy `public/STELLAR CUSTUMS LOGO.jpg`), then:
 *   node scripts/process-logo.mjs
 */
import { existsSync, unlinkSync } from "fs";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { removeInteriorMatteFloor } from "./logo-floor-removal.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const legacy = join(root, "public", "STELLAR CUSTUMS LOGO.jpg");
const preferred = join(root, "public", "brand-logo-source.jpg");
const input = existsSync(preferred) ? preferred : legacy;
const output = join(root, "public", "stellar-logo.png");

if (!existsSync(input)) {
  console.error("Missing source image. Add public/brand-logo-source.jpg (or restore STELLAR CUSTUMS LOGO.jpg).");
  process.exit(1);
}

function isMatte(r, g, b) {
  // Outer black / near-black JPEG matte (tune if fringe remains)
  return r <= 42 && g <= 42 && b <= 42;
}

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const buf = new Uint8ClampedArray(data);
const seen = new Uint8Array(w * h);
const q = [];

function push(x, y) {
  if (x < 0 || x >= w || y < 0 || y >= h) return;
  const i = y * w + x;
  if (seen[i]) return;
  const o = i * 4;
  if (!isMatte(buf[o], buf[o + 1], buf[o + 2])) return;
  seen[i] = 1;
  buf[o + 3] = 0;
  q.push(i);
}

// Seeds: corners + a few edge pixels (JPEG may shift matte slightly inward)
for (let x = 0; x < w; x += Math.max(1, Math.floor(w / 64))) {
  push(x, 0);
  push(x, h - 1);
}
for (let y = 0; y < h; y += Math.max(1, Math.floor(h / 64))) {
  push(0, y);
  push(w - 1, y);
}

while (q.length) {
  const i = q.pop();
  const x = i % w;
  const y = (i / w) | 0;
  const nbs = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
  for (const [nx, ny] of nbs) push(nx, ny);
}

const cleared = removeInteriorMatteFloor(buf, w, h);
if (cleared > 0) {
  console.log("Removed interior matte floor pixels:", cleared);
}

await sharp(buf, { raw: { width: w, height: h, channels: 4 } })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(output + ".tmp.png");

const trimmedBuf = await sharp(output + ".tmp.png").trim().png().toBuffer();
const meta = await sharp(trimmedBuf).metadata();
const targetW = Math.min(meta.width ?? w, 1152);
await sharp(trimmedBuf)
  .resize({ width: targetW, kernel: sharp.kernel.lanczos3, withoutEnlargement: true })
  .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
  .toFile(output);

unlinkSync(output + ".tmp.png");

console.log("Wrote", output, `${targetW}px wide`);
