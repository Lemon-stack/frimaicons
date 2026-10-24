import type { Ref } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  shortcut: string;
  ref?: Ref<HTMLInputElement>;
}

export function SearchBar({ value, onChange, placeholder, shortcut, ref }: SearchBarProps) {
  return (
    <label className="flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-xl bg-tile px-3.5 transition-shadow focus-within:ring-2 focus-within:ring-ring/40">
      <HugeiconsIcon icon={Search01Icon} size={18} className="shrink-0 text-muted-foreground" />
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && onChange("")}
        placeholder={placeholder}
        aria-label="Search logos"
        className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button type="button" onClick={() => onChange("")} aria-label="Clear search" className="text-muted-foreground hover:text-foreground">
          <HugeiconsIcon icon={Cancel01Icon} size={16} />
        </button>
      ) : (
        <kbd className="hidden h-6 items-center rounded-md border border-border px-1.5 font-mono text-[11px] text-muted-foreground sm:inline-flex">
          {shortcut}
        </kbd>
      )}
    </label>
  );
}
