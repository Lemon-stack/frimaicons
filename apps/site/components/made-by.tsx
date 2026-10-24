import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  GithubIcon,
  Globe02Icon,
  Linkedin01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { MAKER, type MakerLinkKind } from "@/lib/site";

const LINK_ICONS: Record<MakerLinkKind, typeof GithubIcon> = {
  github: GithubIcon,
  website: Globe02Icon,
  x: NewTwitterIcon,
  linkedin: Linkedin01Icon,
};

export function MadeBy() {
  return (
    <div className="space-y-2.5 border-t border-border pt-3">
      <div>
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase">Made by</p>
        <p className="truncate text-sm font-medium text-foreground">{MAKER.name}</p>
      </div>
      <ul className="flex gap-1.5">
        {MAKER.links.map(({ kind, label, href }) => (
          <li key={kind}>
            <a
              href={href}
              aria-label={label}
              title={label}
              className="group relative flex size-8 items-center justify-center overflow-hidden rounded-full bg-tile text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <HugeiconsIcon
                icon={LINK_ICONS[kind]}
                size={16}
                className="transition-[transform,opacity] duration-200 ease-in group-hover:-translate-y-2 group-hover:opacity-0 group-focus-visible:-translate-y-2 group-focus-visible:opacity-0 motion-reduce:transition-none"
              />
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={16}
                className="absolute translate-y-2 opacity-0 transition-[transform,opacity] duration-200 ease-in group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
