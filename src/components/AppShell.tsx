import { Outlet } from "react-router-dom";
import { BrandBar } from "./BrandBar";
import { TabBar } from "./TabBar";
import { Sidebar } from "./Sidebar";
import { useLayoutMode } from "../lib/LayoutModeContext";
import styles from "./AppShell.module.css";

export function AppShell() {
  const { mode } = useLayoutMode();

  return (
    <div className={styles.ground} data-force-layout={mode === "auto" ? undefined : mode}>
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
