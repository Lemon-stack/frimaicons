"use client";

import { useMemo, useState } from "react";
import type { FrimaIcon } from "@frimaicons/core";
import { DEFAULT_SIZE, getSnippets } from "@/lib/snippets";
import type { ColorMode } from "./use-color-mode";

export const SIZES = [16, 20, 24, 32, 48, 64] as const;

export type CustomizerColorMode = ColorMode | "custom";

export function useIconCustomizer(icon: FrimaIcon, initialMode: ColorMode = "mono") {
  const [size, setSize] = useState<number>(DEFAULT_SIZE);
  const [colorMode, setColorMode] = useState<CustomizerColorMode>(initialMode);
  const [customColor, setCustomColorValue] = useState("#ffffff");

  const color = colorMode === "brand" ? "brand" : colorMode === "custom" ? customColor : undefined;
  const snippets = useMemo(() => getSnippets(icon, { size, color }), [icon, size, color]);

  const setCustomColor = (value: string) => {
    setCustomColorValue(value);
    setColorMode("custom");
  };

  const reset = () => {
    setSize(DEFAULT_SIZE);
    setColorMode(initialMode);
  };

  return {
    size,
    setSize,
    colorMode,
    setColorMode,
    customColor,
    setCustomColor,
    /** Value for `<BrandIcon color>`. */
    previewColor: color ?? "currentColor",
    snippets,
    reset,
  };
}
