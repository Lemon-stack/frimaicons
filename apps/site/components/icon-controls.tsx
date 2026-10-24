"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { RefreshIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SIZES, type CustomizerColorMode } from "@/hooks/use-icon-customizer";

interface IconControlsProps {
  size: number;
  onSizeChange: (size: number) => void;
  colorMode: CustomizerColorMode;
  onColorModeChange: (mode: CustomizerColorMode) => void;
  customColor: string;
  onCustomColorChange: (color: string) => void;
  onReset: () => void;
}

const sizeItems = SIZES.map((s) => ({ value: String(s), label: `${s}px` }));

export function IconControls(props: IconControlsProps) {
  const { size, onSizeChange, colorMode, onColorModeChange, customColor, onCustomColorChange, onReset } = props;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select items={sizeItems} value={String(size)} onValueChange={(value) => value && onSizeChange(Number(value))}>
        <SelectTrigger aria-label="Size" className="h-9 min-w-24 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sizeItems.map((item) => (
            <SelectItem key={item.value} value={item.value} className="text-sm">
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ToggleGroup
        variant="outline"
        spacing={0}
        value={colorMode === "custom" ? [] : [colorMode]}
        onValueChange={([mode]) => mode && onColorModeChange(mode as CustomizerColorMode)}
      >
        <ToggleGroupItem value="mono" className="h-9 px-3 text-sm text-muted-foreground aria-pressed:text-primary">
          Mono
        </ToggleGroupItem>
        <ToggleGroupItem value="brand" className="h-9 px-3 text-sm text-muted-foreground aria-pressed:text-primary">
          Brand
        </ToggleGroupItem>
      </ToggleGroup>

      <label
        data-active={colorMode === "custom"}
        className="flex h-9 cursor-pointer items-center gap-2 rounded-md border border-input px-2.5 font-mono text-sm data-[active=true]:border-primary dark:bg-input/30"
      >
        <span className="size-4 rounded-sm ring-1 ring-foreground/20" style={{ backgroundColor: customColor }} />
        {customColor}
        <input
          type="color"
          value={customColor}
          onChange={(e) => onCustomColorChange(e.target.value)}
          aria-label="Custom color"
          className="sr-only"
        />
      </label>

      <Button variant="outline" size="icon" className="size-9" onClick={onReset} aria-label="Reset">
        <HugeiconsIcon icon={RefreshIcon} className="size-4" />
      </Button>
    </div>
  );
}
