import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { GROUPS } from "./groups";
import type { DataPayload } from "./dataClient";

const FIXTURE_PATH = fileURLToPath(new URL("../../public/data/slices.json", import.meta.url));
const TOTAL_SLICES = 34;

function loadFixture(): DataPayload {
  return JSON.parse(readFileSync(FIXTURE_PATH, "utf8"));
}

describe("placeholder feed file (public/data/slices.json)", () => {
  it(`has all ${TOTAL_SLICES} slices`, () => {
    expect(loadFixture().slices).toHaveLength(TOTAL_SLICES);
  });

  it("has unique keys", () => {
    const keys = new Set(loadFixture().slices.map((s) => s.key));
    expect(keys.size).toBe(TOTAL_SLICES);
  });

  it("matches the documented group coverage: 9/4/9/6/5/1", () => {
    const slices = loadFixture().slices;
    const counts = Object.fromEntries(GROUPS.map((g) => [g, slices.filter((s) => s.group === g).length]));
    expect(counts).toEqual({
      "US size & style": 9,
      "Income & dividend": 4,
      International: 9,
      "Real assets": 6,
      "Fixed income": 5,
      Crypto: 1,
    });
  });

  it(`gives every slice exactly 3 ETFs (${TOTAL_SLICES * 3} rows total)`, () => {
    const slices = loadFixture().slices;
    for (const s of slices) {
      expect(s.etfs).toHaveLength(3);
    }
    expect(slices.flatMap((s) => s.etfs)).toHaveLength(TOTAL_SLICES * 3);
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

  it("gives every slice an explicit historyStartYear no later than the current data year", () => {
    const asOfYear = Number(loadFixture().asOf.slice(-4));
    for (const s of loadFixture().slices) {
      expect(s.historyStartYear).toBeGreaterThan(1990);
      expect(s.historyStartYear).toBeLessThan(asOfYear);
    }
  });

  it("gives bitcoin a shorter history window than the equity/bond slices", () => {
    const btc = loadFixture().slices.find((s) => s.key === "btc");
    expect(btc?.historyStartYear).toBe(2013);
  });
});
