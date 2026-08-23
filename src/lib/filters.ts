import type { Group } from "./types";

export type FilterId = "all" | Group;

export interface FilterOption {
  id: FilterId;
  label: string;
}

export const FILTERS: FilterOption[] = [
  { id: "all", label: "All" },
  { id: "US size & style", label: "US" },
  { id: "International", label: "Intl" },
  { id: "Income & dividend", label: "Income" },
  { id: "Real assets", label: "Real assets" },
  { id: "Fixed income", label: "Bonds" },
  { id: "Crypto", label: "Crypto" },
];
