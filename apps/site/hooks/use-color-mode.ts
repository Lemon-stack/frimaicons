"use client";

import { useState } from "react";

export type ColorMode = "mono" | "brand";

export function useColorMode(initial: ColorMode = "mono") {
  const [mode, setMode] = useState<ColorMode>(initial);
  const toggle = () => setMode((m) => (m === "mono" ? "brand" : "mono"));
  return { mode, toggle, iconColor: mode === "brand" ? "brand" : "currentColor" };
}
