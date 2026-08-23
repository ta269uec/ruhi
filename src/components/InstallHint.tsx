import { useState } from "react";
import { isIOS, isStandalone } from "../lib/platform";
import { dismissInstallHint, isInstallHintDismissed } from "../lib/storage";
import styles from "./InstallHint.module.css";

export function InstallHint() {
  const [visible, setVisible] = useState(() => isIOS() && !isStandalone() && !isInstallHintDismissed());

  if (!visible) return null;

  function handleDismiss() {
    dismissInstallHint();
    setVisible(false);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.text}>
        Add Ruhi to your Home Screen for one-tap access: tap the Share icon in Safari, then{" "}
        <strong>Add to Home Screen</strong>.
      </div>
      <button type="button" className={styles.dismiss} onClick={handleDismiss}>
        Got it
      </button>
    </div>
  );
}
