import { HugeiconsIcon } from "@hugeicons/react";
import { PaintBoardIcon } from "@hugeicons/core-free-icons";
import type { ColorMode } from "@/hooks/use-color-mode";

interface ColorToggleProps {
  mode: ColorMode;
  onToggle: () => void;
}

export function ColorToggle({ mode, onToggle }: ColorToggleProps) {
  const brand = mode === "brand";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={brand}
      className={`inline-flex h-11 items-center gap-2 rounded-lg border px-3 text-sm transition-colors ${
        brand ? "border-accent text-fg" : "border-border text-muted hover:text-fg"
      } bg-surface`}
    >
      <HugeiconsIcon icon={PaintBoardIcon} size={18} />
      <span className="hidden sm:inline">Brand colors</span>
    </button>
  );
}
