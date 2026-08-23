import type { Etf } from "../lib/types";
import styles from "./EtfTable.module.css";

export function EtfTable({ etfs }: { etfs: Etf[] }) {
  return (
    <div className={styles.section}>
      <div className={styles.heading}>How to own it</div>
      <div className={styles.table}>
        <div className={styles.headerRow}>
          <span>Ticker</span>
          <span>Fund</span>
          <span className={styles.headerExp}>Exp.</span>
        </div>
        {etfs.map((e) => (
          <div key={e.ticker} className={styles.row}>
            <span className={styles.ticker}>{e.ticker}</span>
            <span className={styles.fundName}>{e.name}</span>
            <span className={styles.expenseRatio}>{e.expenseRatio.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className={styles.footnote}>
        Expense ratios are annual, in percent. Listed for coverage of the slice, not as a recommendation of a fund
        provider.
      </div>
    </div>
  );
}
