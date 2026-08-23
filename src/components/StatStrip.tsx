import styles from "./StatStrip.module.css";

interface StatStripProps {
  cheapestName: string;
  richestName: string;
  belowThirtyCount: number;
  total: number;
}

export function StatStrip({ cheapestName, richestName, belowThirtyCount, total }: StatStripProps) {
  return (
    <div className={styles.strip}>
      <div className={styles.cell}>
        <div className={styles.label}>Cheapest</div>
        <div className={styles.value}>{cheapestName}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.label}>Richest</div>
        <div className={styles.value}>{richestName}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.label}>Below 30th pct</div>
        <div className={styles.value}>
          {belowThirtyCount} of {total}
        </div>
      </div>
    </div>
  );
}
