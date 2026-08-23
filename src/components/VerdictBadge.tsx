import type { Verdict } from "../lib/types";
import styles from "./VerdictBadge.module.css";

const CLASS: Record<Verdict, string> = {
  CHEAP: styles.cheap,
  FAIR: styles.fair,
  RICH: styles.rich,
};

interface VerdictBadgeProps {
  verdict: Verdict;
  size?: "sm" | "lg";
  label?: string;
}

export function VerdictBadge({ verdict, size = "sm", label }: VerdictBadgeProps) {
  const sizeClass = size === "lg" ? styles.lg : "";
  return <span className={`${styles.badge} ${CLASS[verdict]} ${sizeClass}`}>{label ?? verdict}</span>;
}
