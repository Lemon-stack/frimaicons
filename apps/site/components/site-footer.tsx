import Link from "next/link";
import { SECTOR_LABELS } from "@/lib/labels";
import { activeSectors, sectorPath } from "@/lib/seo";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-8 text-sm text-muted-foreground sm:px-6">
        <nav aria-label="Logos by sector" className="flex flex-wrap gap-x-4 gap-y-1">
          {activeSectors().map((sector) => (
            <Link key={sector} href={sectorPath(sector)} className="hover:text-foreground">
              {SECTOR_LABELS[sector]} logos
            </Link>
          ))}
        </nav>
        <div className="space-y-1">
          <p>All logos are trademarks of their respective owners. Use them according to each brand&apos;s guidelines.</p>
          <p>
            Some icon data comes from{" "}
            <a href="https://simpleicons.org" className="underline hover:text-foreground">
              Simple Icons
            </a>{" "}
            (CC0).
          </p>
        </div>
      </div>
    </footer>
  );
}
