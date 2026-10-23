import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { getIcon, icons } from "frimaicons";
import { IconDetail } from "@/components/icon-detail";

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
    <div className="py-10">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
        All icons
      </Link>
      <IconDetail icon={icon} />
    </div>
  );
}
