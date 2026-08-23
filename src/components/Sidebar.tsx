import { NavLink } from "react-router-dom";
import { NAV_TABS } from "../lib/navTabs";
import { RangeMark } from "./RangeMark";
import { Wordmark } from "./Wordmark";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <RangeMark size={24} strokeWidth={3} />
        <Wordmark nameSize={17} descSize={6.5} descMarginTop={2} />
      </div>

      <nav className={styles.nav}>
        {NAV_TABS.map((t) => (
          <NavLink
            key={t.id}
            to={t.path}
            end
            className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ""}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={styles.icon} aria-hidden="true">
              <path d={t.icon} />
            </svg>
            <span className={styles.label}>{t.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.spacer} />

      <div className={styles.foot}>
        <NavLink to="/about" className={styles.about}>
          About
        </NavLink>
        <div className={styles.disclaimer}>Illustrative data. Not investment advice.</div>
      </div>
    </aside>
  );
}
