import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Logo not found</h1>
        <p className="mt-2 text-muted-foreground">We don&apos;t have that one yet.</p>
        <Link href="/" className="mt-6 inline-block text-primary hover:underline">
          Browse all icons
        </Link>
      </div>
    </PageShell>
  );
}
