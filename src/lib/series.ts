/**
 * Deterministic synthetic 20-year percentile history, seeded from the slice
 * key so it's stable across renders. Illustrative — replace with real
 * monthly percentile history once a licensed feed exists.
 */
function seededRng(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function hashKey(key: string): number {
  let h = 7;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % 100000;
  return h;
}

export function percentileSeries(key: string, pct: number, n: number): number[] {
  const r = seededRng(hashKey(key) + 13);
  const out: number[] = [];
  let v = 50 + (r() - 0.5) * 40;
  for (let i = 0; i < n; i++) {
    v += (r() - 0.5) * 22 + (50 - v) * 0.06;
    out.push(v);
  }
  // Anchor the series so it ends exactly on the slice's current percentile.
  const shift = pct - out[n - 1];
  return out.map((x, i) => Math.max(3, Math.min(97, x + shift * (i / (n - 1)) ** 0.6)));
}

export function toPolyline(vals: number[], w: number, h: number): string {
  const n = vals.length;
  return vals.map((v, i) => `${((i / (n - 1)) * w).toFixed(1)},${(h - (v / 100) * h).toFixed(1)}`).join(" ");
}
