import { Link } from "react-router-dom";
import type { NoteEntry } from "../lib/notes";
import type { Slice } from "../lib/types";
import { verdict } from "../lib/theme";
import { VerdictBadge } from "./VerdictBadge";
import styles from "./NoteCard.module.css";

interface NoteCardProps {
  note: NoteEntry;
  by: Record<string, Slice>;
}

export function NoteCard({ note, by }: NoteCardProps) {
  const slice = by[note.key];
  if (!slice) return null;

  return (
    <Link to={`/slice/${note.key}`} className={styles.card}>
      <div className={styles.topRow}>
        <VerdictBadge verdict={verdict(slice.pct)} label={slice.name} />
        <span className={styles.date}>{note.date}</span>
      </div>
      <div className={styles.head}>{note.head}</div>
      <div className={styles.body}>{note.body}</div>
      <div className={styles.readMore}>Read the slice →</div>
    </Link>
  );
}
