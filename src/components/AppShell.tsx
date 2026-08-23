import { Outlet } from "react-router-dom";
import { BrandBar } from "./BrandBar";
import { TabBar } from "./TabBar";
import { Sidebar } from "./Sidebar";
import styles from "./AppShell.module.css";

export function AppShell() {
  return (
    <div className={styles.ground}>
      <Sidebar />
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
