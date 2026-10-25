import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { getComponentName, getIcon, icons } from "@frimaicons/core";
import { Container } from "@/components/container";
import { IconPanel } from "@/components/icon-panel";
import { JsonLd } from "@/components/json-ld";
import { LogoLinkGrid } from "@/components/logo-link-grid";
import { PageShell } from "@/components/page-shell";
import { SECTOR_LABELS } from "@/lib/labels";
import { iconDescription, iconJsonLd, iconPath, pageOpenGraph, relatedIcons, sectorPath } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return icons.map((icon) => ({ slug: icon.slug }));
}

export async function generateMetadata({ params }: PageProps<"/icons/[slug]">): Promise<Metadata> {
  const icon = getIcon(icons, (await params).slug);
  if (!icon) return {};
  const title = `${icon.title} logo SVG & React component`;
  const description = iconDescription(icon);
  return {
    title,
    description,
    keywords: [`${icon.title} logo`, `${icon.title} logo SVG`, `${icon.title} icon`, `${icon.title} brand color`, `${icon.title} React`],
    alternates: { canonical: iconPath(icon) },
    openGraph: pageOpenGraph({ title, description, url: iconPath(icon) }),
  };
}

export default async function IconPage({ params }: PageProps<"/icons/[slug]">) {
  const icon = getIcon(icons, (await params).slug);
  if (!icon) notFound();
  const sector = SECTOR_LABELS[icon.sector];

  return (
    <PageShell>
      <JsonLd data={iconJsonLd(icon)} />
      <Container className="py-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
            All icons
          </Link>
          <span aria-hidden>/</span>
          <Link href={sectorPath(icon.sector)} className="hover:text-foreground">
            {sector} logos
          </Link>
        </nav>
        <div className="mt-6 max-w-3xl text-sm">
          <IconPanel icon={icon} titleAs="h1" />
        </div>

        <section className="mt-12 max-w-3xl space-y-3 text-sm text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">About the {icon.title} logo</h2>
          <p>
            The {icon.title} logo is available here as a free 24×24 SVG and as the <code>{getComponentName(icon.title)}</code> React
            component from <code>@frimaicons/react</code>. Its brand color is <code>#{icon.hex}</code>. Download the SVG, copy the
            markup, or import the component and set any size or color.
          </p>
          <p>
            {icon.title} is listed under <Link href={sectorPath(icon.sector)} className="text-primary hover:underline">{sector} logos</Link>.
            The {icon.title} name and logo are trademarks of their owner; follow the brand&apos;s guidelines when you use them.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-lg font-semibold">Related logos</h2>
          <LogoLinkGrid icons={relatedIcons(icon)} />
        </section>
      </Container>
    </PageShell>
  );
}
