import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FilterItemProps {
  icon: ReactNode;
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

export function FilterItem({ icon, label, count, active, onClick }: FilterItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="group flex h-12 w-full items-center gap-3 rounded-xl px-1.5 text-left text-sm transition-colors outline-none hover:bg-tile/60 focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors",
          active ? "bg-primary text-primary-foreground" : "bg-tile text-muted-foreground group-hover:text-foreground",
        )}
      >
        {icon}
      </span>
      <span className={cn("flex-1 truncate", active ? "font-medium text-primary" : "text-foreground")}>{label}</span>
      <span className="rounded-md bg-tile px-2 py-0.5 text-xs text-muted-foreground tabular-nums">{count}</span>
    </button>
  );
}
