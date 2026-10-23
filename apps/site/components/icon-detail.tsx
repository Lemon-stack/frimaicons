import { HugeiconsIcon } from "@hugeicons/react";
import { Download04Icon } from "@hugeicons/core-free-icons";
import { BrandIcon } from "@frimaicons/react";
import type { FrimaIcon } from "frimaicons";
import { getContrastColor } from "@/lib/color";
import { getSnippets } from "@/lib/snippets";
import { IconMeta } from "./icon-meta";
import { SnippetList } from "./snippet-list";

export function IconDetail({ icon }: { icon: FrimaIcon }) {
  const snippets = getSnippets(icon);

  return (
    <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex aspect-square items-center justify-center rounded-2xl border border-border bg-surface">
          <BrandIcon icon={icon} size={96} title={icon.title} />
        </div>
        <div
          className="flex aspect-square items-center justify-center rounded-2xl"
          style={{ backgroundColor: `#${icon.hex}` }}
        >
          <BrandIcon icon={icon} size={96} color={getContrastColor(icon.hex)} />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{icon.title}</h1>
          <IconMeta icon={icon} />
        </div>
        <SnippetList snippets={snippets} />
        <a
          href={`/icons/${icon.slug}.svg`}
          download
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-accent-fg hover:opacity-90"
        >
          <HugeiconsIcon icon={Download04Icon} size={18} />
          Download SVG
        </a>
      </div>
    </div>
  );
}
