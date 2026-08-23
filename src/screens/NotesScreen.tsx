import { useEffect } from "react";
import { ScreenHeader } from "../components/ScreenHeader";
import { NoteCard } from "../components/NoteCard";
import { DataStateGate } from "../components/DataStateGate";
import { FEED } from "../lib/notes";
import { setStoredTab } from "../lib/storage";
import styles from "./NotesScreen.module.css";

export function NotesScreen() {
  useEffect(() => setStoredTab("notes"), []);

  return (
    <div>
      <ScreenHeader
        title="WHAT CHANGED"
        explainer="Written when a percentile moves enough to matter — not daily noise."
      />
      <DataStateGate>
        {({ by }) => (
          <div className={styles.cardsGrid}>
            {FEED.map((note) => (
              <NoteCard key={note.key} note={note} by={by} />
            ))}
          </div>
        )}
      </DataStateGate>
    </div>
  );
}
