import type { FrimaIcon } from "@frimaicons/core";
import { IconCard } from "./icon-card";

interface IconGridProps {
  icons: readonly FrimaIcon[];
  color: string;
  onSelect: (icon: FrimaIcon) => void;
}

export function IconGrid({ icons, color, onSelect }: IconGridProps) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3 sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
      {icons.map((icon) => (
        <li key={icon.slug}>
          <IconCard icon={icon} color={color} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}
