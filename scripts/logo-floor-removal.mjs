/**
 * Remove interior “stage floor” matte connected to the bottom of the artwork
 * without climbing into the wheel band (y constrained to a bottom slice of the opaque bbox).
 *
 * Mutates RGBA buffer in place (premultiplied-friendly: sets A to 0).
 */
export function removeInteriorMatteFloor(buf, w, h, options = {}) {
  const matteR = options.matteR ?? 50;
  const matteG = options.matteG ?? 50;
  const matteB = options.matteB ?? 50;
  const bottomSliceRatio = options.bottomSliceRatio ?? 0.22;
  const minBottomPx = options.minBottomPx ?? 96;
  const seedBandPx = options.seedBandPx ?? 70;

  const isMatte = (o) =>
    buf[o] <= matteR && buf[o + 1] <= matteG && buf[o + 2] <= matteB;
  const alpha = (o) => buf[o + 3];

  let minx = w,
    miny = h,
    maxx = 0,
    maxy = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const o = (y * w + x) * 4;
      if (alpha(o) < 128) continue;
      minx = Math.min(minx, x);
      maxx = Math.max(maxx, x);
      miny = Math.min(miny, y);
      maxy = Math.max(maxy, y);
    }
  }
  if (maxy <= miny) return 0;

  const contentH = maxy - miny + 1;
  const yMin = Math.max(
    miny,
    maxy - Math.max(minBottomPx, Math.floor(contentH * bottomSliceRatio)),
  );

  const seeds = [];
  const ySeed0 = Math.max(yMin, maxy - seedBandPx);
  for (let y = ySeed0; y <= maxy; y++) {
    for (let x = 0; x < w; x++) {
      const o = (y * w + x) * 4;
      if (alpha(o) < 128) continue;
      if (!isMatte(o)) continue;
      seeds.push(y * w + x);
    }
  }

  const seen = new Uint8Array(w * h);
  const q = [...seeds];
  for (const i of q) seen[i] = 1;
  let qi = 0;
  while (qi < q.length) {
    const idx = q[qi++];
    const x = idx % w;
    const y = (idx / w) | 0;
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = x + dx;
      const ny = y + dy;
      if (ny < yMin) continue;
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      const ni = ny * w + nx;
      if (seen[ni]) continue;
      const o = ni * 4;
      if (alpha(o) < 128) continue;
      if (!isMatte(o)) continue;
      seen[ni] = 1;
      q.push(ni);
    }
  }

  let cleared = 0;
  for (let i = 0; i < w * h; i++) {
    if (!seen[i]) continue;
    const o = i * 4;
    buf[o + 3] = 0;
    cleared++;
  }
  return cleared;
}
