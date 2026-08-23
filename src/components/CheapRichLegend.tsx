import styles from "./CheapRichLegend.module.css";

export function CheapRichLegend() {
  return (
    <div className={styles.legend}>
      <span className={styles.label}>Cheap</span>
      <div className={styles.bar} />
      <span className={styles.label}>Rich</span>
    </div>
  );
}
