import { useMemo, useState } from "react";
import type { Slice } from "../lib/types";
import styles from "./AddSliceForm.module.css";

interface AddSliceFormProps {
  slices: Slice[];
  excludedKeys: string[];
  onAdd: (key: string, trigger: number) => void;
}

function defaultTrigger(pct: number): number {
  return Math.max(0, Math.min(100, pct - 10));
}

export function AddSliceForm({ slices, excludedKeys, onAdd }: AddSliceFormProps) {
  const [open, setOpen] = useState(false);
  const available = useMemo(
    () => [...slices].filter((s) => !excludedKeys.includes(s.key)).sort((a, b) => a.name.localeCompare(b.name)),
    [slices, excludedKeys],
  );
  const [selectedKey, setSelectedKey] = useState(available[0]?.key ?? "");
  const [trigger, setTrigger] = useState(() => defaultTrigger(available[0]?.pct ?? 50));

  function handleOpen() {
    const first = available[0];
    if (first) {
      setSelectedKey(first.key);
      setTrigger(defaultTrigger(first.pct));
    }
    setOpen(true);
  }

  function handleSelectChange(key: string) {
    setSelectedKey(key);
    const slice = available.find((s) => s.key === key);
    if (slice) setTrigger(defaultTrigger(slice.pct));
  }

  function handleSubmit() {
    if (!selectedKey) return;
    onAdd(selectedKey, trigger);
    setOpen(false);
  }

  if (!open) {
    return (
      <div className={styles.wrap}>
        <button type="button" className={styles.primaryButton} onClick={handleOpen} disabled={available.length === 0}>
          Add a slice
        </button>
      </div>
    );
  }

  if (available.length === 0) {
    return (
      <div className={styles.wrap}>
        <div className={styles.empty}>Every slice is already on your watchlist.</div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="watch-slice">Slice</label>
          <select
            id="watch-slice"
            className={styles.select}
            value={selectedKey}
            onChange={(e) => handleSelectChange(e.target.value)}
          >
            {available.map((s) => (
              <option key={s.key} value={s.key}>
                {s.name} — {s.pct}th pctile
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="watch-trigger">Alert at percentile</label>
          <input
            id="watch-trigger"
            type="number"
            min={0}
            max={100}
            className={styles.numberInput}
            value={trigger}
            onChange={(e) => setTrigger(Math.max(0, Math.min(100, Number(e.target.value))))}
          />
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.primaryButton} onClick={handleSubmit}>
            Add
          </button>
          <button type="button" className={styles.cancelButton} onClick={() => setOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
