export interface NoteEntry {
  key: string; // Slice key
  date: string;
  head: string;
  body: string;
}

// Reverse-chronological, newest first. Illustrative — a real feed would emit
// these on a ±5 percentile move or a Cheap/Fair/Rich boundary crossing (see
// README "Notes — editorial rule"), not on a schedule.
export const FEED: NoteEntry[] = [
  {
    key: "china",
    date: "22 Aug",
    head: "China slips to the 8th percentile",
    body: "Platform earnings rose again while the index did not. The valuation gap versus its own history is now the widest of any slice we track, which reflects policy risk rather than any change in reported profitability.",
  },
  {
    key: "gold",
    date: "21 Aug",
    head: "Gold's real price enters the top decile",
    body: "Continued official-sector buying has pushed the inflation-adjusted price to the 88th percentile of twenty years. Nothing about the metal has changed; what you pay for it has.",
  },
  {
    key: "ussv",
    date: "19 Aug",
    head: "Small value holds below the 25th percentile",
    body: "A fourth consecutive quarter under the 25th percentile. Aggregate price-to-book is 1.3 against a twenty-year median near 1.9, with leverage — not earnings — the main reason the discount persists.",
  },
  {
    key: "japan",
    date: "15 Aug",
    head: "Japan crosses above its median",
    body: "Three years of buyback-led re-rating have taken Japan past the 50th percentile for the first time since 2007. The governance story is now partly priced.",
  },
  {
    key: "uslg",
    date: "12 Aug",
    head: "Large growth sets a new valuation high",
    body: "Forward earnings rose, and the price rose faster. At the 96th percentile the slice has spent less than one year of the last twenty at a higher multiple.",
  },
];
