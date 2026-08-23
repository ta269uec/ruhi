import { useParams } from "react-router-dom";
import { BackBar } from "../components/BackBar";
import { VerdictBadge } from "../components/VerdictBadge";
import { PercentileChart } from "../components/PercentileChart";
import { MetricsGrid } from "../components/MetricsGrid";
import { EtfTable } from "../components/EtfTable";
import { RowSkeleton } from "../components/RowSkeleton";
import { DataErrorState } from "../components/DataErrorState";
import { useSliceData } from "../lib/DataContext";
import { pctLine, textInk, verdict } from "../lib/theme";
import styles from "./SliceDetailScreen.module.css";

const NARRATIVE_MODE = false; // "verdict-first" default — see README §Slice detail

export function SliceDetailScreen() {
  const { key } = useParams<{ key: string }>();
  const { by, status } = useSliceData();
  const slice = key ? by[key] : undefined;

  if (status === "loading") {
    return (
      <div>
        <BackBar label="Slice" fallback="/ranks" />
        <RowSkeleton count={3} />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div>
        <BackBar label="Slice" fallback="/ranks" />
        <DataErrorState />
      </div>
    );
  }

  if (!slice) {
    return (
      <div>
        <BackBar label="Not found" fallback="/ranks" />
        <div className={styles.notFound}>This slice isn't in our coverage.</div>
      </div>
    );
  }

  const v = verdict(slice.pct);
  const returns = [
    { label: "1 yr", val: slice.r1 },
    { label: "3 yr", val: slice.r3 },
    { label: "5 yr", val: slice.r5 },
    { label: "10 yr", val: slice.r10 },
  ];

  return (
    <div>
      <BackBar label={slice.group} fallback="/ranks" />

      <div className={styles.page}>
        <div className={styles.hero}>
          <div className={styles.name}>{slice.name}</div>
          <div className={styles.pctRow}>
            <div className={styles.bigPct} style={{ color: textInk(slice.pct) }}>
              {slice.pct}
            </div>
            <div className={styles.verdictCol}>
              <VerdictBadge verdict={v} size="lg" />
              <div className={styles.line}>{pctLine(slice.pct)}</div>
            </div>
          </div>
        </div>

        <PercentileChart sliceKey={slice.key} pct={slice.pct} />

        <div className={styles.pair}>
          <div className={styles.pairCell}>
            <div className={styles.pairLabel}>From all-time high</div>
            <div className={styles.pairValue}>{slice.ath}</div>
            <div className={styles.pairSub}>ATH {slice.athDate}</div>
          </div>
          <div className={styles.pairCell}>
            <div className={styles.pairLabel}>Worst drawdown, 20y</div>
            <div className={styles.pairValue}>{slice.dd}</div>
            <div className={styles.pairSub}>Peak to trough</div>
          </div>
        </div>

        <MetricsGrid slice={slice} />

        <div className={styles.returnsSection}>
          <div className={styles.heading}>Annualised total return</div>
          <div className={styles.returnsRow}>
            {returns.map((t) => (
              <div key={t.label} className={styles.returnCell}>
                <div className={styles.returnLabel}>{t.label}</div>
                <div className={styles.returnValue}>{t.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.commentary}>
          <div className={styles.heading}>Why it is priced here</div>
          <div className={styles.commentaryText}>{slice.take}</div>
          {NARRATIVE_MODE && <div className={styles.commentaryText}>{slice.take2}</div>}
        </div>

        <div className={styles.risks}>
          <div className={styles.heading}>Risk factors</div>
          {slice.risks.map((text, i) => (
            <div key={i} className={styles.riskRow}>
              <span className={styles.riskNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.riskText}>{text}</span>
            </div>
          ))}
        </div>

        <EtfTable etfs={slice.etfs} />
      </div>
    </div>
  );
}
