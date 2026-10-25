import type { Metadata } from "next";
import { IconBrowser } from "@/components/icon-browser";
import { JsonLd } from "@/components/json-ld";
import { pageOpenGraph, SITE_DESCRIPTION, SITE_TITLE, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: pageOpenGraph({ title: SITE_TITLE, description: SITE_DESCRIPTION, url: "/" }),
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <IconBrowser />
    </>
  );
}
