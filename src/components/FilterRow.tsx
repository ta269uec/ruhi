import { FILTERS, type FilterId } from "../lib/filters";
import styles from "./FilterRow.module.css";

interface FilterRowProps {
  active: FilterId;
  onChange: (id: FilterId) => void;
}

export function FilterRow({ active, onChange }: FilterRowProps) {
  return (
    <div className={styles.row}>
      {FILTERS.map((f) => (
        <button
          key={f.id}
          type="button"
          className={`${styles.option} ${active === f.id ? styles.optionActive : ""}`}
          onClick={() => onChange(f.id)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
