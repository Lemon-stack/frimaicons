import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SECTORS, type Sector } from "@frimaicons/core";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { LogoLinkGrid } from "@/components/logo-link-grid";
import { PageShell } from "@/components/page-shell";
import { SECTOR_LABELS } from "@/lib/labels";
import { activeSectors, pageOpenGraph, sectorDescription, sectorIcons, sectorJsonLd, sectorPath } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return activeSectors().map((sector) => ({ sector }));
}

function toSector(value: string): Sector | undefined {
  return (SECTORS as readonly string[]).includes(value) ? (value as Sector) : undefined;
}

export async function generateMetadata({ params }: PageProps<"/sectors/[sector]">): Promise<Metadata> {
  const sector = toSector((await params).sector);
  if (!sector) return {};
  const title = `${SECTOR_LABELS[sector]} logos: free SVG & React icons`;
  const description = sectorDescription(sector);
  return {
    title,
    description,
    alternates: { canonical: sectorPath(sector) },
    openGraph: { ...pageOpenGraph({ title, description, url: sectorPath(sector) }), images: "/opengraph-image" },
  };
}

export default async function SectorPage({ params }: PageProps<"/sectors/[sector]">) {
  const sector = toSector((await params).sector);
  if (!sector) notFound();
  const list = sectorIcons(sector);

  return (
    <PageShell>
      <JsonLd data={sectorJsonLd(sector)} />
      <Container className="space-y-6 py-10">
        <div className="max-w-3xl space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">{SECTOR_LABELS[sector]} logos</h1>
          <p className="text-sm text-muted-foreground">
            {list.length} {SECTOR_LABELS[sector]} company logos, free to download as SVG or install as React components with{" "}
            <code>@frimaicons/react</code>. Pick a logo to copy its SVG, JSX or brand color.
          </p>
        </div>
        <LogoLinkGrid icons={list} />
        <p className="text-sm text-muted-foreground">
          Looking for another brand?{" "}
          <Link href="/" className="text-primary hover:underline">
            Search all logos
          </Link>
          .
        </p>
      </Container>
    </PageShell>
  );
}
