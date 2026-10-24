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
        "flex aspect-square items-center justify-center rounded-xl transition-[box-shadow,transform] outline-none hover:ring-2 hover:ring-primary focus-visible:ring-2 focus-visible:ring-primary active:scale-95",
        light ? "bg-neutral-100" : "bg-tile",
      )}
    >
      <BrandIcon icon={icon} size={24} color={color} />
    </Link>
  );
}
