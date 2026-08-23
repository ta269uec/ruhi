import { evaluateAlert, type AlertState } from "./alerts";
import type { Slice } from "./types";

export interface WatchEntry extends AlertState {
  key: string;
  trigger: number;
  note: string;
}

interface StoredEntry {
  key: string;
  trigger: number;
  note: string;
  armed?: boolean;
  triggered?: boolean;
}

const STORAGE_KEY = "ruhi:watchlist";

const SEED: StoredEntry[] = [
  {
    key: "ussv",
    trigger: 20,
    note: "Two points from your alert. Aggregate price-to-book has not been lower since 2020.",
  },
  {
    key: "intdev",
    trigger: 35,
    note: "Median-priced. Waiting for a discount before adding to the core international position.",
  },
  { key: "energy", trigger: 25, note: "Alert fired 6 Aug. Free cash flow yield near 9% with buybacks running." },
  { key: "gold", trigger: 60, note: "Watching for a pullback, not an entry. Currently 28 points above your threshold." },
];

function loadRaw(): StoredEntry[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return SEED;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED;
  } catch {
    return SEED;
  }
}

function save(entries: WatchEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/** Loads the watchlist, re-evaluating each entry's alert state against the live slice percentile, and persists the result. */
export function getWatchlist(by: Record<string, Slice>): WatchEntry[] {
  const entries = loadRaw()
    .filter((e) => by[e.key])
    .map((e): WatchEntry => {
      const prev: AlertState | undefined =
        e.armed === undefined || e.triggered === undefined ? undefined : { armed: e.armed, triggered: e.triggered };
      const state = evaluateAlert(by[e.key].pct, e.trigger, prev);
      return { key: e.key, trigger: e.trigger, note: e.note, ...state };
    });
  save(entries);
  return entries;
}

export function addWatchEntry(by: Record<string, Slice>, key: string, trigger: number): WatchEntry[] {
  const current = getWatchlist(by);
  if (current.some((e) => e.key === key) || !by[key]) return current;
  const state = evaluateAlert(by[key].pct, trigger);
  const next = [...current, { key, trigger, note: "", ...state }];
  save(next);
  return next;
}

export function removeWatchEntry(by: Record<string, Slice>, key: string): WatchEntry[] {
  const next = getWatchlist(by).filter((e) => e.key !== key);
  save(next);
  return next;
}
