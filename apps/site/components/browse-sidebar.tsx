import { HugeiconsIcon } from "@hugeicons/react";
import { DashboardSquare01Icon } from "@hugeicons/core-free-icons";
import type { Sector } from "@frimaicons/core";
import { SECTOR_ICONS, SECTOR_LABELS } from "@/lib/labels";
import { FilterItem } from "./filter-item";
import { InstallCommand } from "./install-command";
import { MadeBy } from "./made-by";

interface BrowseSidebarProps {
  total: number;
  sector: Sector | undefined;
  onSectorChange: (sector: Sector | undefined) => void;
  sectorCounts: { key: Sector; count: number }[];
}

export function BrowseSidebar({ total, sector, onSectorChange, sectorCounts }: BrowseSidebarProps) {
  return (
    <aside className="order-last flex min-h-0 flex-col gap-3 lg:order-none">
      <nav aria-label="Categories" className="hidden min-h-0 flex-1 flex-col rounded-2xl bg-panel p-3 lg:flex">
        <h2 className="px-1.5 pt-1 pb-3 text-[15px] font-medium">Categories</h2>
        <div className="-mx-1 min-h-0 flex-1 space-y-0.5 overflow-y-auto px-1">
          <FilterItem
            icon={<HugeiconsIcon icon={DashboardSquare01Icon} size={18} />}
            label="All"
            count={total}
            active={!sector}
            onClick={() => onSectorChange(undefined)}
          />
          {sectorCounts.map(({ key, count }) => (
            <FilterItem
              key={key}
              icon={<HugeiconsIcon icon={SECTOR_ICONS[key]} size={18} />}
              label={SECTOR_LABELS[key]}
              count={count}
              active={sector === key}
              onClick={() => onSectorChange(sector === key ? undefined : key)}
            />
          ))}
        </div>
      </nav>

      <section className="space-y-3 rounded-2xl bg-panel p-4 text-xs text-muted-foreground">
        <h2 className="text-[15px] font-medium text-foreground">Install</h2>
        <InstallCommand />
        <p>All logos are trademarks of their respective owners. Use them according to each brand&apos;s guidelines.</p>
        <p>
          Some icon data comes from{" "}
          <a href="https://simpleicons.org" className="underline hover:text-foreground">
            Simple Icons
          </a>{" "}
          (CC0).
        </p>
        <MadeBy />
      </section>
    </aside>
  );
}
