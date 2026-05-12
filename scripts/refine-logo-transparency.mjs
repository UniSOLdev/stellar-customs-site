/**
 * Re-process existing `public/stellar-logo.png`: remove baked interior floor matte,
 * trim empty margins, re-export optimized PNG (no JPEG source required).
 *
 *   node scripts/refine-logo-transparency.mjs
 */
import { unlinkSync } from "fs";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { removeInteriorMatteFloor } from "./logo-floor-removal.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const input = join(root, "public", "stellar-logo.png");
const output = join(root, "public", "stellar-logo.png");

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const buf = new Uint8ClampedArray(data);
const cleared = removeInteriorMatteFloor(buf, w, h);
console.log("Floor removal cleared pixels:", cleared);

const tmp = output + ".tmp.png";
await sharp(buf, { raw: { width: w, height: h, channels: 4 } })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(tmp);

const trimmedBuf = await sharp(tmp).trim().png().toBuffer();
unlinkSync(tmp);

const meta = await sharp(trimmedBuf).metadata();
const targetW = Math.min(meta.width ?? w, 1152);
await sharp(trimmedBuf)
  .resize({ width: targetW, kernel: sharp.kernel.lanczos3, withoutEnlargement: true })
  .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
  .toFile(output);

console.log("Wrote", output, `${meta.width}×${meta.height} → ${targetW}px wide (trimmed)`);
