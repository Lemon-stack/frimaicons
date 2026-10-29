import { BrandIcon } from "@frimaicons/react";
import type { FrimaIcon } from "@frimaicons/core";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { needsLightBackdrop } from "@/lib/color";
import { cn } from "@/lib/utils";

export function AgentLogo({ icon, className }: { icon: FrimaIcon; className?: string }) {
  const light = needsLightBackdrop(icon.hex);

  return (
    <Avatar className={className}>
      <AvatarFallback className={cn(light ? "bg-neutral-100 text-neutral-900" : "bg-tile")}>
        <BrandIcon icon={icon} size="55%" color="brand" />
      </AvatarFallback>
    </Avatar>
  );
}
