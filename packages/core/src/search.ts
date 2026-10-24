import type { FrimaIcon, Sector } from "./types";

export interface SearchOptions {
  query?: string;
  sector?: Sector;
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function matchScore(icon: FrimaIcon, query: string) {
  const title = normalize(icon.title);
  if (title === query || icon.slug === query) return 0;
  if (title.startsWith(query)) return 1;
  if (title.includes(query)) return 2;
  return -1;
}

export function searchIcons(icons: readonly FrimaIcon[], { query = "", sector }: SearchOptions = {}) {
  const q = normalize(query);
  return icons
    .filter((icon) => !sector || icon.sector === sector)
    .map((icon) => ({ icon, score: q ? matchScore(icon, q) : 0 }))
    .filter(({ score }) => score >= 0)
    .sort((a, b) => a.score - b.score || a.icon.title.localeCompare(b.icon.title))
    .map(({ icon }) => icon);
}

export function getIcon(icons: readonly FrimaIcon[], slug: string) {
  return icons.find((icon) => icon.slug === slug);
}
