import { Outlet } from "react-router-dom";
import { BrandBar } from "./BrandBar";
import { TabBar } from "./TabBar";
import styles from "./AppShell.module.css";

export function AppShell() {
  return (
    <div className={styles.ground}>
      <div className={styles.column}>
        <BrandBar />
        <main className={styles.scrollArea}>
          <Outlet />
        </main>
        <TabBar />
      </div>
    </div>
  );
}
