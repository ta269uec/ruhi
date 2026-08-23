import { Link } from "react-router-dom";
import type { WatchEntry } from "../lib/watchlist";
import type { Slice } from "../lib/types";
import { ink, textInk } from "../lib/theme";
import styles from "./WatchRow.module.css";

interface WatchRowProps {
  entry: WatchEntry;
  by: Record<string, Slice>;
  onRemove: (key: string) => void;
}

export function WatchRow({ entry, by, onRemove }: WatchRowProps) {
  const slice = by[entry.key];
  if (!slice) return null;
  const pct = slice.pct;
  const status = entry.triggered ? "Triggered" : `${pct - entry.trigger} pts away`;

  return (
    <div className={styles.row}>
      <Link to={`/slice/${entry.key}`} className={styles.headRow}>
        <div className={styles.name}>{slice.name}</div>
        <div className={styles.pct} style={{ color: textInk(pct) }}>
          {pct}
        </div>
      </Link>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${pct}%`, background: ink(pct) }} />
        <div className={styles.marker} style={{ left: `${entry.trigger}%` }} />
      </div>
      <div className={styles.statusRow}>
        <span>Alert at {entry.trigger}th</span>
        <span>{status}</span>
      </div>
      {entry.note && <div className={styles.note}>{entry.note}</div>}
      <div className={styles.footRow}>
        <button type="button" className={styles.remove} onClick={() => onRemove(entry.key)}>
          Remove
        </button>
      </div>
    </div>
  );
}
