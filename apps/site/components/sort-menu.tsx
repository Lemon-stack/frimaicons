"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Sorting05Icon } from "@hugeicons/core-free-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SORT_KEYS, SORT_LABELS, type SortKey } from "@/lib/sort";

interface SortMenuProps {
  value: SortKey;
  onChange: (sort: SortKey) => void;
}

export function SortMenu({ value, onChange }: SortMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border border-border px-3.5 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 data-popup-open:border-primary data-popup-open:text-primary">
        <HugeiconsIcon icon={Sorting05Icon} size={18} />
        <span className="hidden sm:inline">By {SORT_LABELS[value]}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-44 rounded-xl p-1.5">
        <DropdownMenuRadioGroup value={value} onValueChange={(next) => onChange(next as SortKey)}>
          {SORT_KEYS.map((key) => (
            <DropdownMenuRadioItem
              key={key}
              value={key}
              className="h-9 rounded-lg text-sm data-checked:bg-tile data-checked:text-primary"
            >
              {SORT_LABELS[key]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
