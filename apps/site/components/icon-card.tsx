import type { MouseEvent } from "react";
import Link from "next/link";
import { BrandIcon } from "@frimaicons/react";
import type { FrimaIcon } from "@frimaicons/core";
import { cn } from "@/lib/utils";
import { needsLightBackdrop, toHex } from "@/lib/color";

interface IconCardProps {
  icon: FrimaIcon;
  color: string;
  onSelect: (icon: FrimaIcon) => void;
}

function isPlainClick(e: MouseEvent) {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}

export function IconCard({ icon, color, onSelect }: IconCardProps) {
  const light = needsLightBackdrop(toHex(color, icon.hex));

  return (
    <Link
      href={`/icons/${icon.slug}`}
      title={icon.title}
      // Plain clicks open the dialog; modified clicks still open the page in a new tab.
      onClick={(e) => {
        if (!isPlainClick(e)) return;
        e.preventDefault();
        onSelect(icon);
      }}
      aria-label={icon.title}
      className={cn(
        "flex h-32 flex-col items-center justify-center gap-3 rounded-xl px-3 transition-[box-shadow,transform] outline-none hover:ring-2 hover:ring-primary focus-visible:ring-2 focus-visible:ring-primary active:scale-95 sm:h-36",
        light ? "bg-neutral-100 text-neutral-900" : "bg-tile",
      )}
    >
      <BrandIcon icon={icon} size={40} color={color} />
      <span className="w-full truncate text-center text-sm">{icon.title}</span>
    </Link>
  );
}
