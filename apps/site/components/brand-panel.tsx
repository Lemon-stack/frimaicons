import Image from "next/image";
import Link from "next/link";
import { VERSION } from "@/lib/site";

export function BrandPanel() {
  return (
    <div className="flex h-[68px] items-center gap-3 rounded-2xl bg-panel px-3.5">
      <Link href="/" className="flex min-w-0 flex-1 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
        <Image src="/icon.svg" alt="" width={40} height={40} priority className="size-10 shrink-0 rounded-xl ring-1 ring-white/10" />
        <span className="leading-none">
          <span className="block text-lg font-semibold tracking-tight">frimaicons</span>
          <span className="mt-1 block text-[10px] tracking-[0.2em] text-muted-foreground uppercase">logos</span>
        </span>
      </Link>
      <span className="rounded-lg bg-tile px-2 py-1 font-mono text-xs text-muted-foreground">v{VERSION}</span>
    </div>
  );
}
