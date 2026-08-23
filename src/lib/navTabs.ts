export interface NavTab {
  id: string;
  path: string;
  label: string;
  icon: string;
}

export const NAV_TABS: NavTab[] = [
  { id: "ranks", path: "/ranks", label: "Ranks", icon: "M3 3v16a2 2 0 0 0 2 2h16M18 17V9M13 17V5M8 17v-3" },
  { id: "map", path: "/map", label: "Map", icon: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" },
  {
    id: "watch",
    path: "/watch",
    label: "Watch",
    icon: "M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0M15 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0",
  },
  {
    id: "notes",
    path: "/notes",
    label: "Notes",
    icon: "M2 6h4M2 10h4M2 14h4M2 18h4M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2M9.5 8h8M9.5 12h6",
  },
];
