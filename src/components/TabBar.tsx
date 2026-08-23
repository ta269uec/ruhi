import { NavLink } from "react-router-dom";
import { NAV_TABS } from "../lib/navTabs";
import styles from "./TabBar.module.css";

export function TabBar() {
  return (
    <nav className={styles.bar}>
      {NAV_TABS.map((t) => (
        <NavLink
          key={t.id}
          to={t.path}
          end
          className={({ isActive }) => `${styles.tab} ${isActive ? styles.tabActive : ""}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={styles.icon} aria-hidden="true">
            <path d={t.icon} />
          </svg>
          <span className={styles.label}>{t.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
