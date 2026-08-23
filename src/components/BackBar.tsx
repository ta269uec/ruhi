import { useLocation, useNavigate } from "react-router-dom";
import styles from "./BackBar.module.css";

interface BackBarProps {
  label: string;
  fallback: string;
}

export function BackBar({ label, fallback }: BackBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const canGoBack = location.key !== "default";

  return (
    <div className={styles.bar}>
      <button
        type="button"
        className={styles.back}
        onClick={() => (canGoBack ? navigate(-1) : navigate(fallback))}
      >
        ← Back
      </button>
      <div className={styles.label}>{label}</div>
    </div>
  );
}
