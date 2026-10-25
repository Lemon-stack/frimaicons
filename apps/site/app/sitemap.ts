import type { MetadataRoute } from "next";
import { icons } from "@frimaicons/core";
import { absoluteUrl, activeSectors, iconPath, sectorPath, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const sectorRoutes: MetadataRoute.Sitemap = activeSectors().map((sector) => ({
    url: absoluteUrl(sectorPath(sector)),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const iconRoutes: MetadataRoute.Sitemap = icons.map((icon) => ({
    url: absoluteUrl(iconPath(icon)),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [absoluteUrl(`/icons/${icon.slug}.svg`)],
  }));

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...sectorRoutes,
    ...iconRoutes,
  ];
}
