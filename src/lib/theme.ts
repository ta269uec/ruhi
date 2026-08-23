import type { Verdict } from "./types";

export function verdict(pct: number): Verdict {
  return pct < 30 ? "CHEAP" : pct > 70 ? "RICH" : "FAIR";
}

// FILL — backgrounds of heatmap cells and bars. Lightens monotonically as a slice gets richer.
export function ink(pct: number): string {
  return pct < 30 ? "#2c455d" : pct < 50 ? "#416180" : pct < 70 ? "#749dc4" : pct < 85 ? "#b7b7ba" : "#d4d4d7";
}

// TEXT — the big percentile numerals and sparkline strokes. Stays legible on the light ground.
export function textInk(pct: number): string {
  return pct < 30 ? "#2c455d" : pct < 50 ? "#416180" : pct < 70 ? "#597ea3" : "#7a7a7d";
}

/**
 * The detail-page sentence, and the single most likely place to get this backwards:
 * below 50 it's framed from the cheap side, at/above 50 from the expensive side.
 * `years` defaults to 20 — most slices have a full 20-year history, but a
 * younger one (e.g. crypto) must say its real window, not imply one it
 * doesn't have.
 */
export function pctLine(pct: number, years = 20): string {
  return pct >= 50
    ? `Only ${100 - pct}% of the last ${years} years was more expensive than today.`
    : `Cheaper than today in only ${pct}% of the last ${years} years.`;
}
