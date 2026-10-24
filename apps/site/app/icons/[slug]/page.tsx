import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { getIcon, icons } from "@frimaicons/core";
import { Container } from "@/components/container";
import { IconPanel } from "@/components/icon-panel";
import { PageShell } from "@/components/page-shell";

export const dynamicParams = false;

export function generateStaticParams() {
  return icons.map((icon) => ({ slug: icon.slug }));
}

export async function generateMetadata({ params }: PageProps<"/icons/[slug]">): Promise<Metadata> {
  const icon = getIcon(icons, (await params).slug);
  if (!icon) return {};
  return {
    title: `${icon.title} logo`,
    description: `Download the ${icon.title} logo as SVG, or use it as a React component. Brand color #${icon.hex}.`,
  };
}

export default async function IconPage({ params }: PageProps<"/icons/[slug]">) {
  const icon = getIcon(icons, (await params).slug);
  if (!icon) notFound();

  return (
    <PageShell>
      <Container className="py-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
          All icons
        </Link>
        <div className="mt-6 max-w-3xl text-sm">
          <IconPanel icon={icon} titleAs="h1" />
        </div>
      </Container>
    </PageShell>
  );
}
