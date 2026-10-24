"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, Copy01Icon, ArrowDown03Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCopy } from "@/hooks/use-copy";
import { useDownload } from "@/hooks/use-download";
import type { getSnippets } from "@/lib/snippets";

const COPY_OPTIONS = [
  { key: "svg", label: "SVG" },
  { key: "jsx", label: "JSX" },
  { key: "import", label: "Import" },
  { key: "hex", label: "Hex color" },
] as const;

interface IconActionsProps {
  slug: string;
  snippets: ReturnType<typeof getSnippets>;
}

export function IconActions({ slug, snippets }: IconActionsProps) {
  const download = useDownload();
  const { copy, copiedKey } = useCopy();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="lg" className="h-9 px-3 text-sm" onClick={() => download(`${slug}.svg`, snippets.svg)}>
        <HugeiconsIcon icon={ArrowDown03Icon} />
        Download SVG
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="secondary" size="lg" className="h-9 px-3 text-sm" />}>
          <HugeiconsIcon icon={Copy01Icon} />
          {copiedKey ? "Copied" : "Copy"}
          <HugeiconsIcon icon={ArrowDown01Icon} className="text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {COPY_OPTIONS.map(({ key, label }) => (
            <DropdownMenuItem key={key} className="text-sm" onClick={() => copy(key, snippets[key])}>
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
