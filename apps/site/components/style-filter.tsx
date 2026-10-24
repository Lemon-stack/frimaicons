import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { COLOR_MODES, type ColorMode } from "@/hooks/use-color-mode";

const OPTIONS: Record<ColorMode, { label: string; swatch: string }> = {
  mono: { label: "Mono", swatch: "bg-foreground" },
  brand: { label: "Brand", swatch: "bg-[conic-gradient(#635BFF,#22C55E,#FFD300,#E40000,#635BFF)]" },
};

interface StyleFilterProps {
  value: ColorMode;
  onChange: (mode: ColorMode) => void;
}

export function StyleFilter({ value, onChange }: StyleFilterProps) {
  return (
    <ToggleGroup
      aria-label="Logo style"
      spacing={0}
      value={[value]}
      onValueChange={([mode]) => mode && onChange(mode as ColorMode)}
      className="h-11 shrink-0 rounded-xl bg-tile p-1"
    >
      {COLOR_MODES.map((mode) => (
        <ToggleGroupItem
          key={mode}
          value={mode}
          aria-label={OPTIONS[mode].label}
          className="h-9 gap-2 rounded-lg px-2.5 text-sm text-muted-foreground aria-pressed:bg-panel aria-pressed:text-foreground"
        >
          <span className={`size-3 rounded-full ${OPTIONS[mode].swatch}`} />
          <span className="hidden sm:inline">{OPTIONS[mode].label}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
