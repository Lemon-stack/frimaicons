import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          frima<span className="text-primary">icons</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Icons
          </Link>
        </nav>
      </div>
    </header>
  );
}
