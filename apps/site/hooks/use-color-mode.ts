"use client";

import { useState } from "react";

export const COLOR_MODES = ["mono", "brand"] as const;

export type ColorMode = (typeof COLOR_MODES)[number];

export function useColorMode(initial: ColorMode = "mono") {
  const [mode, setMode] = useState<ColorMode>(initial);
  return { mode, setMode, iconColor: mode === "brand" ? "brand" : "currentColor" };
}
