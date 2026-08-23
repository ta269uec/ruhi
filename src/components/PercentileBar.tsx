import { ink } from "../lib/theme";
import styles from "./PercentileBar.module.css";

export function PercentileBar({ pct }: { pct: number }) {
  return (
    <div className={styles.track}>
      <div className={styles.fill} style={{ width: `${pct}%`, background: ink(pct) }} />
      <div className={styles.medianTick} />
    </div>
  );
}
