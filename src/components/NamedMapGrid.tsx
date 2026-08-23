import { Link } from "react-router-dom";
import type { Slice } from "../lib/types";
import { ink } from "../lib/theme";
import { abbreviateSliceName } from "../lib/mapLabels";
import styles from "./NamedMapGrid.module.css";

export function NamedMapGrid({ slices }: { slices: Slice[] }) {
  return (
    <div className={styles.grid}>
      {slices.map((s) => (
        <Link
          key={s.key}
          to={`/slice/${s.key}`}
          className={styles.cell}
          style={{ background: ink(s.pct), color: s.pct < 50 ? "#fff" : "var(--color-neutral-900)" }}
        >
          <span>{abbreviateSliceName(s.name)}</span>
          <span>{s.pct}</span>
        </Link>
      ))}
    </div>
  );
}
