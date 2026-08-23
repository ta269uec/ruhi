interface WordmarkProps {
  nameSize: number;
  descSize: number;
  descMarginTop: number;
  descLetterSpacing?: string;
  align?: "left" | "center";
}

/**
 * The wordmark never appears without the descriptor "PRICE IN PERSPECTIVE" —
 * a brand rule, not a layout preference. Keep the two lines paired in every use.
 */
export function Wordmark({ nameSize, descSize, descMarginTop, descLetterSpacing = ".2em", align = "left" }: WordmarkProps) {
  return (
    <div style={{ textAlign: align }}>
      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: nameSize,
          letterSpacing: ".16em",
          lineHeight: 1,
        }}
      >
        RUHI
      </div>
      <div
        style={{
          font: `600 ${descSize}px var(--font-body)`,
          letterSpacing: descLetterSpacing,
          textTransform: "uppercase",
          color: "var(--color-accent-700)",
          marginTop: descMarginTop,
        }}
      >
        Price in perspective
      </div>
    </div>
  );
}
