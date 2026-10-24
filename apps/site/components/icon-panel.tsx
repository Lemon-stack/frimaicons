"use client";

import { BrandIcon } from "@frimaicons/react";
import type { FrimaIcon } from "@frimaicons/core";
import { Badge } from "@/components/ui/badge";
import type { ColorMode } from "@/hooks/use-color-mode";
import { useCopy } from "@/hooks/use-copy";
import { useIconCustomizer } from "@/hooks/use-icon-customizer";
import { needsLightBackdrop, toHex } from "@/lib/color";
import { SECTOR_LABELS } from "@/lib/labels";
import { cn } from "@/lib/utils";
import { CodeTabs } from "./code-tabs";
import { CopyButton } from "./copy-button";
import { IconActions } from "./icon-actions";
import { IconControls } from "./icon-controls";
import { IconMeta } from "./icon-meta";

interface IconPanelProps {
  icon: FrimaIcon;
  initialMode?: ColorMode;
  titleAs?: "h1" | "h2";
}

export function IconPanel({ icon, initialMode, titleAs: Title = "h2" }: IconPanelProps) {
  const customizer = useIconCustomizer(icon, initialMode);
  const { copy, copiedKey } = useCopy();
  const { snippets } = customizer;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
        <div
          className={cn(
            "flex aspect-square items-center justify-center rounded-xl transition-colors",
            needsLightBackdrop(toHex(customizer.previewColor, icon.hex)) ? "bg-neutral-100" : "bg-muted/50",
          )}
        >
          <BrandIcon icon={icon} size={customizer.size} color={customizer.previewColor} title={icon.title} />
        </div>

        <div className="min-w-0 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Title className="truncate text-2xl font-semibold tracking-tight">{snippets.name}</Title>
              <CopyButton
                label="Copy component name"
                copied={copiedKey === "name"}
                onCopy={() => copy("name", snippets.name)}
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Badge className="h-6 px-2.5 text-xs">{SECTOR_LABELS[icon.sector]}</Badge>
              <Badge variant="outline" className="h-6 gap-1.5 px-2.5 font-mono text-xs">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: `#${icon.hex}` }} />#{icon.hex}
              </Badge>
            </div>
          </div>

          <IconControls
            size={customizer.size}
            onSizeChange={customizer.setSize}
            colorMode={customizer.colorMode}
            onColorModeChange={customizer.setColorMode}
            customColor={customizer.customColor}
            onCustomColorChange={customizer.setCustomColor}
            onReset={customizer.reset}
          />
          <IconActions slug={icon.slug} snippets={snippets} />
        </div>
      </div>

      <CodeTabs snippets={snippets} />
      <IconMeta icon={icon} />
    </div>
  );
}
