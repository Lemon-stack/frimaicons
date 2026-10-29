"use client";

import { useCallback, useState } from "react";

/** Tracks an element's rendered height so a wrapper can transition between content sizes. */
export function useAutoHeight<T extends HTMLElement>() {
  const [height, setHeight] = useState<number>();

  const ref = useCallback((node: T | null) => {
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setHeight(entry.borderBoxSize[0].blockSize));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, height };
}
