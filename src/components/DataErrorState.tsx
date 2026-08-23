import { useSliceData } from "../lib/DataContext";
import styles from "./DataErrorState.module.css";

export function DataErrorState() {
  const { retry } = useSliceData();
  return (
    <div className={styles.wrap}>
      <div className={styles.text}>Couldn't load valuation data. Check your connection and try again.</div>
      <button type="button" className={styles.retry} onClick={retry}>
        Retry
      </button>
    </div>
  );
}
