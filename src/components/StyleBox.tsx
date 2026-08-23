import { Fragment } from "react";
import { Link } from "react-router-dom";
import type { Slice } from "../lib/types";
import { ink } from "../lib/theme";
import styles from "./StyleBox.module.css";

const ROWS: [string, [string, string, string]][] = [
  ["Large", ["uslv", "uslb", "uslg"]],
  ["Mid", ["usmv", "usmb", "usmg"]],
  ["Small", ["ussv", "ussb", "ussg"]],
];

export function StyleBox({ by }: { by: Record<string, Slice> }) {
  return (
    <div className={styles.grid}>
      <div />
      <div className={styles.colHead}>Value</div>
      <div className={styles.colHead}>Blend</div>
      <div className={styles.colHead}>Growth</div>
      {ROWS.map(([label, keys]) => (
        <Fragment key={label}>
          <div className={styles.rowLabel}>{label}</div>
          {keys.map((key) => {
            const s = by[key];
            return (
              <Link
                key={key}
                to={`/slice/${key}`}
                className={styles.cell}
                style={{ background: ink(s.pct), color: s.pct < 50 ? "#fff" : "var(--color-neutral-900)" }}
              >
                {s.pct}
              </Link>
            );
          })}
        </Fragment>
      ))}
    </div>
  );
}
