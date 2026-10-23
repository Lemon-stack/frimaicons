import type { FrimaIcon } from "frimaicons";
import { IconCard } from "./icon-card";

interface IconGridProps {
  icons: readonly FrimaIcon[];
  color: string;
}

export function IconGrid({ icons, color }: IconGridProps) {
  return (
    <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
      {icons.map((icon) => (
        <li key={icon.slug}>
          <IconCard icon={icon} color={color} />
        </li>
      ))}
    </ul>
  );
}
