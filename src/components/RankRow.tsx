import { Link } from "react-router-dom";
import type { Slice } from "../lib/types";
import { textInk, verdict } from "../lib/theme";
import { VerdictBadge } from "./VerdictBadge";
import { PercentileBar } from "./PercentileBar";
import styles from "./RankRow.module.css";

interface RankRowProps {
  rank: number;
  slice: Slice;
}

export function RankRow({ rank, slice }: RankRowProps) {
  return (
    <Link to={`/slice/${slice.key}`} className={styles.row}>
      <div className={styles.rank}>{String(rank).padStart(2, "0")}</div>
      <div className={styles.main}>
        <div className={styles.nameRow}>
          <div className={styles.name}>{slice.name}</div>
          <VerdictBadge verdict={verdict(slice.pct)} />
        </div>
        <div className={styles.meta}>
          {slice.group} · fwd P/E {slice.fwdPE} · yld {slice.yld}
        </div>
        <PercentileBar pct={slice.pct} />
      </div>
      <div className={styles.rail}>
        <div className={styles.pct} style={{ color: textInk(slice.pct) }}>
          {slice.pct}
        </div>
        <div className={styles.pctLabel}>Pctile</div>
      </div>
    </Link>
  );
}
