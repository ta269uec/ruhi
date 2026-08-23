import { useEffect, useState } from "react";
import { ScreenHeader } from "../components/ScreenHeader";
import { WatchRow } from "../components/WatchRow";
import { AddSliceForm } from "../components/AddSliceForm";
import { DataStateGate } from "../components/DataStateGate";
import { useSliceData } from "../lib/DataContext";
import { addWatchEntry, getWatchlist, removeWatchEntry, type WatchEntry } from "../lib/watchlist";
import { setStoredTab } from "../lib/storage";
import styles from "./WatchScreen.module.css";

export function WatchScreen() {
  const { by, status } = useSliceData();
  const [entries, setEntries] = useState<WatchEntry[]>([]);

  useEffect(() => setStoredTab("watch"), []);

  useEffect(() => {
    if (status === "ready" || status === "stale") {
      setEntries(getWatchlist(by));
    }
  }, [by, status]);

  function handleAdd(key: string, trigger: number) {
    setEntries(addWatchEntry(by, key, trigger));
  }

  function handleRemove(key: string) {
    setEntries(removeWatchEntry(by, key));
  }

  return (
    <div>
      <ScreenHeader title="WATCHLIST" explainer="Alerts fire when a slice crosses your percentile threshold." />
      <DataStateGate>
        {({ slices }) => (
          <>
            <div className={styles.rowsGrid}>
              {entries.map((entry) => (
                <WatchRow key={entry.key} entry={entry} by={by} onRemove={handleRemove} />
              ))}
            </div>
            <AddSliceForm slices={slices} excludedKeys={entries.map((e) => e.key)} onAdd={handleAdd} />
          </>
        )}
      </DataStateGate>
    </div>
  );
}
