#!/usr/bin/env node
// Regenerates public/data/slices.json — the file the app fetches at runtime
// (see src/lib/dataClient.ts). Run manually with `npm run generate-feed`,
// or on a schedule (e.g. a daily GitHub Action) once that's wired up.
//
// TODAY: there is no licensed data source connected yet, so this only
// re-stamps the existing illustrative numbers with today's date, to prove
// the daily-update mechanism end to end.
//
// TO GO LIVE: replace the body of fetchSourceData() below with a real call
// to whatever feed you license (a vendor API, ETF-issuer data, or your own
// percentile computation from raw index history) and return real Slice[]
// data in the same shape. Nothing else in the app needs to change.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const DATA_PATH = fileURLToPath(new URL("../public/data/slices.json", import.meta.url));

function formatAsOfDate(date) {
  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Placeholder source: reads back the slices already on disk. Swap this out
 * for a real fetch once you have a licensed feed — return the same
 * Slice[] shape documented in src/lib/types.ts.
 */
async function fetchSourceData() {
  const current = JSON.parse(await readFile(DATA_PATH, "utf8"));
  return current.slices;
}

async function main() {
  const slices = await fetchSourceData();
  const asOf = formatAsOfDate(new Date());
  const payload = { asOf, slices };

  await writeFile(DATA_PATH, JSON.stringify(payload, null, 2) + "\n", "utf8");
  console.log(`Wrote ${slices.length} slices to ${DATA_PATH}, asOf=${asOf}`);
}

main().catch((err) => {
  console.error("generate-feed failed:", err);
  process.exitCode = 1;
});
