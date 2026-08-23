import styles from "./RowSkeleton.module.css";

// Placeholder rows at real row height, so the layout never collapses then
// expands once live data arrives (see README "Loading").
export function RowSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div aria-busy="true" aria-label="Loading valuation data">
      {Array.from({ length: count }).map((_, i) => (
        <div className={styles.row} key={i}>
          <div className={`${styles.block} ${styles.rank}`} />
          <div className={styles.main}>
            <div className={`${styles.block} ${styles.name}`} />
            <div className={`${styles.block} ${styles.meta}`} />
            <div className={`${styles.block} ${styles.bar}`} />
          </div>
          <div className={`${styles.block} ${styles.rail}`} />
        </div>
      ))}
    </div>
  );
}
