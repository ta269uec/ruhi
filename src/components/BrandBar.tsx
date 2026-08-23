import { Link } from "react-router-dom";
import { RangeMark } from "./RangeMark";
import { Wordmark } from "./Wordmark";
import styles from "./BrandBar.module.css";

export function BrandBar() {
  return (
    <header className={styles.bar}>
      <div className={styles.left}>
        <RangeMark size={26} strokeWidth={3} />
        <Wordmark nameSize={20} descSize={7.5} descMarginTop={2} />
      </div>
      <Link to="/about" className={styles.about}>
        About
      </Link>
    </header>
  );
}
