export const SECTORS = ["ai", "tech", "fintech", "banking", "telecom", "mobility", "aviation", "commerce", "media", "health", "talent", "social", "other"] as const;

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
  sector: Sector;
  /** Listed ahead of other icons, e.g. the Nigerian startups the library launched with. */
  featured?: boolean;
}
