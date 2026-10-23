"use client";

import { useCopy } from "@/hooks/use-copy";
import { INSTALL_COMMAND } from "@/lib/snippets";
import { CopyButton } from "./copy-button";

export function InstallCommand() {
  const { copy, copiedKey } = useCopy();

  return (
    <div className="inline-flex items-center gap-3 rounded-lg border border-border bg-surface py-1 pr-1 pl-4 font-mono text-sm">
      <span className="text-muted">$</span>
      <span>{INSTALL_COMMAND}</span>
      <CopyButton
        label="Copy install command"
        copied={copiedKey === "install"}
        onCopy={() => copy("install", INSTALL_COMMAND)}
      />
    </div>
  );
}
