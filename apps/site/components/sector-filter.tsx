import type { ReactNode } from "react";
import type { Sector } from "@frimaicons/core";
import { SECTOR_LABELS } from "@/lib/labels";

interface SectorFilterProps {
  value: Sector | undefined;
  onChange: (sector: Sector | undefined) => void;
  options: { key: Sector; count: number }[];
  total: number;
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-8 rounded-full border px-3 text-sm whitespace-nowrap transition-colors ${
        active ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

/** Horizontal category chips, shown in place of the sidebar on small screens. */
export function SectorFilter({ value, onChange, options, total }: SectorFilterProps) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:hidden">
      <Chip active={!value} onClick={() => onChange(undefined)}>
        All <span className="opacity-60">{total}</span>
      </Chip>
      {options.map(({ key, count }) => (
        <Chip key={key} active={value === key} onClick={() => onChange(value === key ? undefined : key)}>
          {SECTOR_LABELS[key]} <span className="opacity-60">{count}</span>
        </Chip>
      ))}
    </div>
  );
}
