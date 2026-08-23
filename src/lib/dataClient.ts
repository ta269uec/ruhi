import type { Slice } from "./types";

export interface DataPayload {
  asOf: string;
  slices: Slice[];
}

// Placeholder location: today this is the same illustrative sample data,
// served as a runtime-fetchable file instead of bundled into the JS. Point
// VITE_DATA_URL at a real feed later — no app code changes required.
const DATA_URL = import.meta.env.VITE_DATA_URL ?? "/data/slices.json";
const CACHE_KEY = "ruhi:data-cache";

function isValidSlice(value: unknown): value is Slice {
  if (!value || typeof value !== "object") return false;
  const s = value as Record<string, unknown>;
  return (
    typeof s.key === "string" &&
    s.key.length > 0 &&
    typeof s.name === "string" &&
    typeof s.group === "string" &&
    typeof s.pct === "number" &&
    s.pct >= 0 &&
    s.pct <= 100 &&
    Array.isArray(s.etfs) &&
    Array.isArray(s.risks)
  );
}

/**
 * A malformed feed must never silently corrupt the UI (a wrong "CHEAP" is
 * the worst failure mode for this product — see README "Error / stale
 * data"), so every payload is shape-checked before it's trusted.
 */
export function isValidPayload(value: unknown): value is DataPayload {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v.asOf === "string" && v.asOf.length > 0 && Array.isArray(v.slices) && v.slices.every(isValidSlice);
}

export async function fetchLiveData(signal?: AbortSignal): Promise<DataPayload> {
  const res = await fetch(DATA_URL, { signal, cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Data feed responded ${res.status}`);
  }
  const json: unknown = await res.json();
  if (!isValidPayload(json)) {
    throw new Error("Data feed payload failed validation");
  }
  return json;
}

export function loadCachedData(): DataPayload | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isValidPayload(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveCachedData(payload: DataPayload) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
}
