import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Slice } from "./types";
import { fetchLiveData, loadCachedData, saveCachedData } from "./dataClient";

export type DataStatus = "loading" | "ready" | "stale" | "error";

interface DataState {
  status: DataStatus;
  slices: Slice[];
  by: Record<string, Slice>;
  asOf: string | null;
  retry: () => void;
}

const DataContext = createContext<DataState | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<DataStatus>("loading");
  const [slices, setSlices] = useState<Slice[]>([]);
  const [asOf, setAsOf] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const hasDataRef = useRef(false);

  // Show the last known-good cache immediately, before the network round-trip,
  // so a repeat visit never flashes empty.
  useEffect(() => {
    const cached = loadCachedData();
    if (cached) {
      setSlices(cached.slices);
      setAsOf(cached.asOf);
      setStatus("stale");
      hasDataRef.current = true;
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchLiveData(controller.signal)
      .then((fresh) => {
        saveCachedData(fresh);
        setSlices(fresh.slices);
        setAsOf(fresh.asOf);
        setStatus("ready");
        hasDataRef.current = true;
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        // Never fabricate a percentile on failure — fall back to whatever we
        // already have (marked stale) or an explicit error, never a silent 0.
        setStatus(hasDataRef.current ? "stale" : "error");
      });
    return () => controller.abort();
  }, [attempt]);

  const by = useMemo(() => Object.fromEntries(slices.map((s) => [s.key, s])), [slices]);

  const value = useMemo<DataState>(
    () => ({ status, slices, by, asOf, retry: () => setAttempt((n) => n + 1) }),
    [status, slices, by, asOf],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useSliceData(): DataState {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useSliceData must be used within a DataProvider");
  return ctx;
}
