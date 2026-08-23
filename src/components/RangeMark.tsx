interface RangeMarkProps {
  size?: number;
  strokeWidth?: number;
}

export function RangeMark({ size = 26, strokeWidth = 3 }: RangeMarkProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} style={{ flex: "none" }} aria-hidden="true">
      <line x1="32" y1="6" x2="32" y2="58" stroke="var(--color-accent)" strokeWidth={strokeWidth} />
      <line x1="21" y1="6" x2="43" y2="6" stroke="var(--color-accent)" strokeWidth={strokeWidth} />
      <line x1="21" y1="58" x2="43" y2="58" stroke="var(--color-accent)" strokeWidth={strokeWidth} />
      <rect x="22" y="41" width="20" height="9" fill="var(--color-accent-800)" />
    </svg>
  );
}
