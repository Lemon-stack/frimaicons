import type { ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon } from "@hugeicons/core-free-icons";
import { REPO_URL } from "@/lib/site";

/** Toolbar panel: search and view controls on the left, outbound links on the right. */
export function TopBar({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[68px] items-center gap-2 rounded-2xl bg-panel p-3 sm:gap-3">
      {children}
      <a
        href={REPO_URL}
        aria-label="frimaicons on GitHub"
        className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
      >
        <HugeiconsIcon icon={GithubIcon} size={20} />
      </a>
    </div>
  );
}
