import { useEffect, useState } from "react";
import { ScreenHeader } from "../components/ScreenHeader";
import { StatStrip } from "../components/StatStrip";
import { FilterRow } from "../components/FilterRow";
import { RankRow } from "../components/RankRow";
import { DataStateGate } from "../components/DataStateGate";
import { useSliceData } from "../lib/DataContext";
import type { FilterId } from "../lib/filters";
import { getStoredFilter, setStoredFilter, setStoredTab } from "../lib/storage";
import styles from "./RanksScreen.module.css";

export function RanksScreen() {
  const { asOf } = useSliceData();
  const [filter, setFilter] = useState<FilterId>(() => getStoredFilter() ?? "all");

  useEffect(() => setStoredTab("ranks"), []);

  function handleFilterChange(id: FilterId) {
    setFilter(id);
    setStoredFilter(id);
  }

  return (
    <div>
      <ScreenHeader
        title="CHEAPEST FIRST"
        meta={asOf ?? undefined}
        explainer="Valuation percentile vs. each slice's own history. Low = cheap, high = rich."
      />
      <DataStateGate>
        {({ slices }) => {
          const sorted = [...slices].sort((a, b) => a.pct - b.pct);
          const cheapest = sorted[0];
          const richest = sorted[sorted.length - 1];
          const belowThirtyCount = slices.filter((s) => s.pct < 30).length;
          const rows = sorted.filter((s) => filter === "all" || s.group === filter);
          return (
            <>
              <StatStrip
                cheapestName={cheapest.name}
                richestName={richest.name}
                belowThirtyCount={belowThirtyCount}
                total={slices.length}
              />
              <FilterRow active={filter} onChange={handleFilterChange} />
              <div className={styles.rowsGrid}>
                {rows.map((s, i) => (
                  <RankRow key={s.key} rank={i + 1} slice={s} />
                ))}
              </div>
              <div className={styles.footnote}>
                Percentiles computed on forward P/E, CAPE and price/book blended equally, against each slice's own
                history since 2006 (2013 for bitcoin). Real-asset and crypto slices use price percentiles instead
                of earnings multiples; fixed-income slices rank on yield, inverted, since a higher yield means a
                lower price. Illustrative data.
              </div>
            </>
          );
        }}
      </DataStateGate>
    </div>
  );
}
