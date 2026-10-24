"use client";

import { useState } from "react";
import type { FrimaIcon } from "@frimaicons/core";

export function useIconDialog() {
  const [open, setOpen] = useState(false);
  // Kept after close so the dialog content stays mounted through its exit animation.
  const [icon, setIcon] = useState<FrimaIcon | null>(null);

  return {
    icon,
    open,
    show: (next: FrimaIcon) => {
      setIcon(next);
      setOpen(true);
    },
    onOpenChange: setOpen,
  };
}
