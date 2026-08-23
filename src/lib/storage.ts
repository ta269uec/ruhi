import { FILTERS, type FilterId } from "./filters";

export type TabId = "ranks" | "map" | "watch" | "notes";

const TAB_KEY = "ruhi:tab";
const FILTER_KEY = "ruhi:filter";

const TAB_IDS: TabId[] = ["ranks", "map", "watch", "notes"];
const FILTER_IDS: FilterId[] = FILTERS.map((f) => f.id);

export function getStoredTab(): TabId | null {
  const v = localStorage.getItem(TAB_KEY);
  return v && (TAB_IDS as string[]).includes(v) ? (v as TabId) : null;
}

export function setStoredTab(tab: TabId) {
  localStorage.setItem(TAB_KEY, tab);
}

export function getStoredFilter(): FilterId | null {
  const v = localStorage.getItem(FILTER_KEY);
  return v && (FILTER_IDS as string[]).includes(v) ? (v as FilterId) : null;
}

export function setStoredFilter(filter: FilterId) {
  localStorage.setItem(FILTER_KEY, filter);
}

const INSTALL_HINT_DISMISSED_KEY = "ruhi:install-hint-dismissed";

export function isInstallHintDismissed(): boolean {
  return localStorage.getItem(INSTALL_HINT_DISMISSED_KEY) === "1";
}

export function dismissInstallHint() {
  localStorage.setItem(INSTALL_HINT_DISMISSED_KEY, "1");
}
