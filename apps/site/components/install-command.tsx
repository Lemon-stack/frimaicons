"use client";

import { useCopy } from "@/hooks/use-copy";
import { INSTALL_COMMAND } from "@/lib/snippets";
import { CopyButton } from "./copy-button";

export function InstallCommand() {
  const { copy, copiedKey } = useCopy();

  return (
    <div className="flex items-center gap-2 rounded-xl bg-tile py-1 pr-1 pl-3 font-mono text-xs text-foreground">
      <span className="text-muted-foreground">$</span>
      <span className="min-w-0 flex-1 truncate">{INSTALL_COMMAND}</span>
      <CopyButton
        label="Copy install command"
        copied={copiedKey === "install"}
        onCopy={() => copy("install", INSTALL_COMMAND)}
      />
    </div>
  );
}
