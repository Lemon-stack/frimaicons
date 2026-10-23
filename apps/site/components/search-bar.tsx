import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <label className="flex h-11 flex-1 items-center gap-2 rounded-lg border border-border bg-surface px-3 focus-within:border-accent">
      <HugeiconsIcon icon={Search01Icon} size={18} className="shrink-0 text-muted" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search icons"
        className="h-full flex-1 bg-transparent outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button type="button" onClick={() => onChange("")} aria-label="Clear search" className="text-muted hover:text-fg">
          <HugeiconsIcon icon={Cancel01Icon} size={16} />
        </button>
      )}
    </label>
  );
}
