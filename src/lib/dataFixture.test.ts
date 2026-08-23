import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { GROUPS } from "./groups";
import type { DataPayload } from "./dataClient";

const FIXTURE_PATH = fileURLToPath(new URL("../../public/data/slices.json", import.meta.url));

function loadFixture(): DataPayload {
  return JSON.parse(readFileSync(FIXTURE_PATH, "utf8"));
}

describe("placeholder feed file (public/data/slices.json)", () => {
  it("has all 28 slices", () => {
    expect(loadFixture().slices).toHaveLength(28);
  });

  it("has unique keys", () => {
    const keys = new Set(loadFixture().slices.map((s) => s.key));
    expect(keys.size).toBe(28);
  });

  it("matches the documented group coverage: 9/4/9/6", () => {
    const slices = loadFixture().slices;
    const counts = Object.fromEntries(GROUPS.map((g) => [g, slices.filter((s) => s.group === g).length]));
    expect(counts).toEqual({
      "US size & style": 9,
      "Income & dividend": 4,
      International: 9,
      "Real assets": 6,
    });
  });

  it("gives every slice exactly 3 ETFs (84 rows total)", () => {
    const slices = loadFixture().slices;
    for (const s of slices) {
      expect(s.etfs).toHaveLength(3);
    }
    expect(slices.flatMap((s) => s.etfs)).toHaveLength(84);
  });

  it("keeps every percentile within 0-100", () => {
    for (const s of loadFixture().slices) {
      expect(s.pct).toBeGreaterThanOrEqual(0);
      expect(s.pct).toBeLessThanOrEqual(100);
    }
  });

  it("has a non-empty asOf date", () => {
    expect(loadFixture().asOf.length).toBeGreaterThan(0);
  });
});
