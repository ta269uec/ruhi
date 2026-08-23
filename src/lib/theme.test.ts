import { describe, expect, it } from "vitest";
import { ink, pctLine, textInk, verdict } from "./theme";

describe("pctLine", () => {
  it.each([
    [0, "Cheaper than today in only 0% of the last 20 years."],
    [29, "Cheaper than today in only 29% of the last 20 years."],
    [30, "Cheaper than today in only 30% of the last 20 years."],
    [49, "Cheaper than today in only 49% of the last 20 years."],
    [50, "Only 50% of the last 20 years was more expensive than today."],
    [70, "Only 30% of the last 20 years was more expensive than today."],
    [71, "Only 29% of the last 20 years was more expensive than today."],
    [100, "Only 0% of the last 20 years was more expensive than today."],
  ])("flips correctly at pct=%i", (pct, expected) => {
    expect(pctLine(pct)).toBe(expected);
  });

  it("uses the cheap framing for every value below 50", () => {
    for (let p = 0; p < 50; p++) {
      expect(pctLine(p)).toContain("Cheaper than today in only");
    }
  });

  it("uses the rich framing for every value at or above 50", () => {
    for (let p = 50; p <= 100; p++) {
      expect(pctLine(p)).toContain("was more expensive than today");
    }
  });
});

describe("verdict", () => {
  it.each([
    [0, "CHEAP"],
    [29, "CHEAP"],
    [30, "FAIR"],
    [50, "FAIR"],
    [70, "FAIR"],
    [71, "RICH"],
    [100, "RICH"],
  ])("verdict(%i) = %s", (pct, expected) => {
    expect(verdict(pct)).toBe(expected);
  });
});

describe("ink", () => {
  it.each([
    [0, "#2c455d"],
    [29, "#2c455d"],
    [30, "#416180"],
    [49, "#416180"],
    [50, "#749dc4"],
    [69, "#749dc4"],
    [70, "#b7b7ba"],
    [84, "#b7b7ba"],
    [85, "#d4d4d7"],
    [100, "#d4d4d7"],
  ])("ink(%i) = %s", (pct, expected) => {
    expect(ink(pct)).toBe(expected);
  });
});

describe("textInk", () => {
  it.each([
    [0, "#2c455d"],
    [29, "#2c455d"],
    [30, "#416180"],
    [49, "#416180"],
    [50, "#597ea3"],
    [69, "#597ea3"],
    [70, "#7a7a7d"],
    [100, "#7a7a7d"],
  ])("textInk(%i) = %s", (pct, expected) => {
    expect(textInk(pct)).toBe(expected);
  });

  it("never returns a red or green hex (no traffic-light color)", () => {
    for (let p = 0; p <= 100; p++) {
      expect(ink(p)).toMatch(/^#[0-9a-f]{6}$/);
      expect(textInk(p)).toMatch(/^#[0-9a-f]{6}$/);
    }
  });
});
