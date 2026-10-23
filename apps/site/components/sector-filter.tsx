import type { ReactNode } from "react";
import type { Sector } from "frimaicons";
import { SECTOR_LABELS } from "@/lib/labels";

interface SectorFilterProps {
  value: Sector | undefined;
  onChange: (sector: Sector | undefined) => void;
  options: { sector: Sector; count: number }[];
  total: number;
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-8 rounded-full border px-3 text-sm whitespace-nowrap transition-colors ${
        active ? "border-fg bg-fg text-bg" : "border-border text-muted hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}

export function SectorFilter({ value, onChange, options, total }: SectorFilterProps) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      <Chip active={!value} onClick={() => onChange(undefined)}>
        All <span className="opacity-60">{total}</span>
      </Chip>
      {options.map(({ sector, count }) => (
        <Chip key={sector} active={value === sector} onClick={() => onChange(value === sector ? undefined : sector)}>
          {SECTOR_LABELS[sector]} <span className="opacity-60">{count}</span>
        </Chip>
      ))}
    </div>
  );
}
