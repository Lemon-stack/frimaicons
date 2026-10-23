import { HugeiconsIcon } from "@hugeicons/react";
import { LinkSquare02Icon } from "@hugeicons/core-free-icons";
import type { FrimaIcon } from "frimaicons";
import { getCountryFlag, getCountryName, SECTOR_LABELS } from "@/lib/labels";

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-fg">
      {children}
      <HugeiconsIcon icon={LinkSquare02Icon} size={14} />
    </a>
  );
}

export function IconMeta({ icon }: { icon: FrimaIcon }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
      <span>
        {getCountryFlag(icon.country)} {getCountryName(icon.country)}
      </span>
      <span>{SECTOR_LABELS[icon.sector]}</span>
      <ExternalLink href={icon.source}>Source</ExternalLink>
      {icon.guidelines && <ExternalLink href={icon.guidelines}>Brand guidelines</ExternalLink>}
      {icon.license && (icon.license.url ? <ExternalLink href={icon.license.url}>{icon.license.type}</ExternalLink> : <span>{icon.license.type}</span>)}
    </div>
  );
}
