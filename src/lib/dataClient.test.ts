import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { isValidPayload } from "./dataClient";

const FIXTURE_PATH = fileURLToPath(new URL("../../public/data/slices.json", import.meta.url));

describe("isValidPayload", () => {
  it("accepts the real placeholder feed file", () => {
    const json = JSON.parse(readFileSync(FIXTURE_PATH, "utf8"));
    expect(isValidPayload(json)).toBe(true);
  });

  it("accepts a minimal well-formed payload", () => {
    expect(
      isValidPayload({
        asOf: "1 Jan 2026",
        slices: [{ key: "x", name: "X", group: "Real assets", pct: 50, etfs: [], risks: [] }],
      }),
    ).toBe(true);
  });

  it("accepts an empty slices array (still structurally valid)", () => {
    expect(isValidPayload({ asOf: "1 Jan 2026", slices: [] })).toBe(true);
  });

  it.each([
    ["null", null],
    ["a bare array", [1, 2, 3]],
    ["a string", "not an object"],
    ["missing asOf", { slices: [] }],
    ["empty asOf", { asOf: "", slices: [] }],
    ["missing slices", { asOf: "1 Jan 2026" }],
    ["slices not an array", { asOf: "1 Jan 2026", slices: "nope" }],
    [
      "a slice missing pct",
      { asOf: "1 Jan 2026", slices: [{ key: "x", name: "X", group: "Real assets", etfs: [], risks: [] }] },
    ],
    [
      "a slice with pct out of range",
      { asOf: "1 Jan 2026", slices: [{ key: "x", name: "X", group: "Real assets", pct: 150, etfs: [], risks: [] }] },
    ],
    [
      "a slice with etfs not an array",
      { asOf: "1 Jan 2026", slices: [{ key: "x", name: "X", group: "Real assets", pct: 50, etfs: {}, risks: [] }] },
    ],
  ])("rejects %s", (_label, value) => {
    expect(isValidPayload(value)).toBe(false);
  });
});
