import type { Slice } from "../lib/types";
import styles from "./MetricsGrid.module.css";

interface Metric {
  label: string;
  val: string;
  sub: string;
}

function metricsFor(slice: Slice): Metric[] {
  const yieldLabel = slice.group === "Fixed income" ? "Yield to maturity" : "Dividend yield";
  const yieldSub = slice.group === "Fixed income" ? "current" : "trailing";
  return [
    { label: "Forward P/E", val: slice.fwdPE, sub: "next 12m" },
    { label: "CAPE", val: slice.cape, sub: "10y real" },
    { label: "Price / book", val: slice.pb, sub: "aggregate" },
    { label: yieldLabel, val: slice.yld, sub: yieldSub },
    { label: "Earnings growth", val: slice.eps, sub: "est. 12m" },
    { label: "Volatility", val: slice.vol, sub: "% annual" },
    { label: "Corr. to S&P 500", val: slice.corr, sub: "5y weekly" },
    { label: "Fund flows", val: slice.flow, sub: "12 months" },
  ];
}

export function MetricsGrid({ slice }: { slice: Slice }) {
  return (
    <div className={styles.section}>
      <div className={styles.heading}>Valuation &amp; character</div>
      <div className={styles.grid}>
        {metricsFor(slice).map((m) => (
          <div key={m.label} className={styles.cell}>
            <div className={styles.label}>{m.label}</div>
            <div className={styles.valueRow}>
              <span className={styles.value}>{m.val}</span>
              <span className={styles.sub}>{m.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
