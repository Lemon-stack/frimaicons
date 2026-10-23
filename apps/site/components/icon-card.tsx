import Link from "next/link";
import { BrandIcon } from "@frimaicons/react";
import type { FrimaIcon } from "frimaicons";

interface IconCardProps {
  icon: FrimaIcon;
  color: string;
}

export function IconCard({ icon, color }: IconCardProps) {
  return (
    <Link
      href={`/icons/${icon.slug}`}
      className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-fg/30 hover:bg-surface-hover"
    >
      <BrandIcon icon={icon} size={32} color={color} className="transition-transform group-hover:scale-110" />
      <span className="w-full truncate text-center text-xs text-muted group-hover:text-fg">{icon.title}</span>
    </Link>
  );
}
