"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

interface CopyButtonProps {
  copied: boolean;
  onCopy: () => void;
  label: string;
}

export function CopyButton({ copied, onCopy, label }: CopyButtonProps) {
  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Copied" : label}
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-hover hover:text-fg"
    >
      <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} size={16} className={copied ? "text-accent" : undefined} />
    </button>
  );
}
