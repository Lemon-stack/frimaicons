"use client";

import { useCallback } from "react";

export function useDownload() {
  return useCallback((filename: string, content: string, type = "image/svg+xml") => {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const link = Object.assign(document.createElement("a"), { href: url, download: filename });
    link.click();
    URL.revokeObjectURL(url);
  }, []);
}
