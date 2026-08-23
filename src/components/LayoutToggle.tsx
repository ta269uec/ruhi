import { useLayoutMode, type LayoutMode } from "../lib/LayoutModeContext";
import styles from "./LayoutToggle.module.css";

const OPTIONS: { id: LayoutMode; label: string }[] = [
  { id: "auto", label: "Auto" },
  { id: "desktop", label: "Desktop" },
  { id: "mobile", label: "Mobile" },
];

export function LayoutToggle() {
  const { mode, setMode } = useLayoutMode();

  return (
    <div className={styles.wrap}>
      <div className={styles.heading}>Layout</div>
      <div className={styles.hint}>
        Auto follows your window size. Desktop and Mobile force that layout regardless of window size — on a narrow
        window, forced Desktop scrolls sideways, the same way "Request Desktop Site" works in a phone browser.
      </div>
      <div className={styles.seg}>
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`${styles.option} ${mode === o.id ? styles.optionActive : ""}`}
            onClick={() => setMode(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
