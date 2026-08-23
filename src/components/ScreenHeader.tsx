import type { ReactNode } from "react";
import styles from "./ScreenHeader.module.css";

interface ScreenHeaderProps {
  title: string;
  meta?: ReactNode;
  explainer: ReactNode;
}

export function ScreenHeader({ title, meta, explainer }: ScreenHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.titleRow}>
        <div className={styles.title}>{title}</div>
        {meta ? <div className={styles.meta}>{meta}</div> : null}
      </div>
      <div className={styles.explainer}>{explainer}</div>
    </div>
  );
}
