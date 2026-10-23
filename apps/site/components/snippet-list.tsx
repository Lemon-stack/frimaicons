"use client";

import { useCopy } from "@/hooks/use-copy";
import type { getSnippets } from "@/lib/snippets";
import { CopyButton } from "./copy-button";

const ROWS = [
  { key: "import", label: "Import" },
  { key: "jsx", label: "JSX" },
  { key: "svg", label: "SVG" },
  { key: "hex", label: "Hex" },
] as const;

export function SnippetList({ snippets }: { snippets: ReturnType<typeof getSnippets> }) {
  const { copy, copiedKey } = useCopy();

  return (
    <dl className="divide-y divide-border rounded-xl border border-border bg-surface">
      {ROWS.map(({ key, label }) => (
        <div key={key} className="flex items-center gap-3 py-1.5 pr-1.5 pl-4">
          <dt className="w-14 shrink-0 text-xs font-medium tracking-wide text-muted uppercase">{label}</dt>
          <dd className="min-w-0 flex-1 truncate font-mono text-sm">{snippets[key]}</dd>
          <CopyButton label={`Copy ${label}`} copied={copiedKey === key} onCopy={() => copy(key, snippets[key])} />
        </div>
      ))}
    </dl>
  );
}
