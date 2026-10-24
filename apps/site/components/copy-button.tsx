"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  copied: boolean;
  onCopy: () => void;
  label: string;
}

export function CopyButton({ copied, onCopy, label }: CopyButtonProps) {
  return (
    <Button variant="ghost" size="icon-lg" onClick={onCopy} aria-label={copied ? "Copied" : label}>
      <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} className={copied ? "text-primary" : "text-muted-foreground"} />
    </Button>
  );
}
