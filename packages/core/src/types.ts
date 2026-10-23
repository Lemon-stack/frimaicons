export const SECTORS = ["fintech", "telecom", "mobility", "commerce", "talent", "social", "other"] as const;

export type Sector = (typeof SECTORS)[number];

export interface FrimaIcon {
  slug: string;
  title: string;
  /** Brand color, 6 uppercase hex digits without `#`. */
  hex: string;
  /** Single SVG path for a 24x24 viewBox. */
  path: string;
  svg: string;
  /** Where the logo was sourced from. */
  source: string;
  guidelines?: string;
  license?: { type: string; url?: string };
  /** ISO 3166-1 alpha-2 code of the company's HQ. */
  country: string;
  sector: Sector;
}
