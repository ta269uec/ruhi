import { useMemo } from "react";
import { percentileSeries, toPolyline } from "../lib/series";
import styles from "./PercentileChart.module.css";

const W = 330;
const H = 120;

interface PercentileChartProps {
  sliceKey: string;
  pct: number;
  historyStartYear: number;
  years: number;
}

export function PercentileChart({ sliceKey, pct, historyStartYear, years }: PercentileChartProps) {
  const points = useMemo(() => {
    const series = percentileSeries(sliceKey, pct, 80);
    return { poly: toPolyline(series, W, H), endY: H - (series[series.length - 1] / 100) * H };
  }, [sliceKey, pct]);

  return (
    <div className={styles.section}>
      <div className={styles.headRow}>
        <div className={styles.kicker}>Valuation percentile · {years} years</div>
        <div className={styles.range}>{historyStartYear} — now</div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg}>
        <rect x="0" y="30" width={W} height="60" fill="var(--color-accent-100)" />
        <line x1="0" y1="60" x2={W} y2="60" stroke="var(--color-neutral-400)" strokeWidth="1" strokeDasharray="3 3" />
        <polyline points={points.poly} fill="none" stroke="var(--color-accent-700)" strokeWidth="1.6" />
        <circle cx={W} cy={points.endY} r="3.5" fill="var(--color-accent-700)" />
        <text x="2" y="12" fontFamily="Barlow" fontSize="9" fill="var(--color-neutral-600)">
          100 · richest
        </text>
        <text x="2" y="117" fontFamily="Barlow" fontSize="9" fill="var(--color-neutral-600)">
          0 · cheapest
        </text>
      </svg>
    </div>
  );
}
