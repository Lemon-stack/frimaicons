import Link from "next/link";
import { BrandIcon } from "@frimaicons/react";
import type { FrimaIcon } from "@frimaicons/core";
import { needsLightBackdrop } from "@/lib/color";
import { iconPath } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Plain crawlable links to icon pages, for server-rendered listings. */
export function LogoLinkGrid({ icons }: { icons: readonly FrimaIcon[] }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
      {icons.map((icon) => (
        <li key={icon.slug}>
          <Link
            href={iconPath(icon)}
            className={cn(
              "flex h-28 flex-col items-center justify-center gap-3 rounded-xl px-3 outline-none hover:ring-2 hover:ring-primary focus-visible:ring-2 focus-visible:ring-primary",
              needsLightBackdrop(icon.hex) ? "bg-neutral-100 text-neutral-900" : "bg-tile",
            )}
          >
            <BrandIcon icon={icon} size={36} color="brand" />
            <span className="w-full truncate text-center text-sm">{icon.title} logo</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
