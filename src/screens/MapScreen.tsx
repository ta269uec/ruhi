import { useEffect } from "react";
import { ScreenHeader } from "../components/ScreenHeader";
import { StyleBox } from "../components/StyleBox";
import { NamedMapGrid } from "../components/NamedMapGrid";
import { CheapRichLegend } from "../components/CheapRichLegend";
import { DataStateGate } from "../components/DataStateGate";
import { setStoredTab } from "../lib/storage";
import styles from "./MapScreen.module.css";

export function MapScreen() {
  useEffect(() => setStoredTab("map"), []);

  return (
    <div>
      <ScreenHeader title="VALUATION MAP" explainer="Darker steel = cheaper versus its own history. Tap any cell." />

      <DataStateGate>
        {({ slices, by }) => {
          const income = slices.filter((s) => s.group === "Income & dividend");
          const intl = slices.filter((s) => s.group === "International");
          const real = slices.filter((s) => s.group === "Real assets");
          return (
            <>
              <div className={styles.blockFirst}>
                <div className={`kicker ${styles.heading}`}>US size &amp; style</div>
                <StyleBox by={by} />
              </div>

              <div className={styles.block}>
                <div className={`kicker ${styles.heading}`}>Income &amp; dividend</div>
                <NamedMapGrid slices={income} />
              </div>

              <div className={styles.block}>
                <div className={`kicker ${styles.heading}`}>International</div>
                <NamedMapGrid slices={intl} />
              </div>

              <div className={styles.blockLast}>
                <div className={`kicker ${styles.heading}`}>Real assets</div>
                <NamedMapGrid slices={real} />
                <CheapRichLegend />
              </div>
            </>
          );
        }}
      </DataStateGate>
    </div>
  );
}
