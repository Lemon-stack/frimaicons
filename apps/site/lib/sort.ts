import { SECTORS, type FrimaIcon } from "@frimaicons/core";

export const SORT_KEYS = ["name", "category"] as const;

export type SortKey = (typeof SORT_KEYS)[number];

export const SORT_LABELS: Record<SortKey, string> = {
  name: "Name",
  category: "Category",
};

/** Search results arrive ranked by relevance, then name; "category" regroups them by sector, keeping that order within each group. */
export function sortIcons(icons: readonly FrimaIcon[], sort: SortKey) {
  if (sort === "name") return icons;
  return [...icons].sort((a, b) => SECTORS.indexOf(a.sector) - SECTORS.indexOf(b.sector));
}
