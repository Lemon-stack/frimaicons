import { icons, SECTORS, type FrimaIcon, type Sector } from "@frimaicons/core";
import { SECTOR_LABELS } from "./labels";
import { MAKER, REPO_URL } from "./site";

export const SITE_URL = "https://frimaicons.vercel.app";

export const SITE_NAME = "frimaicons";

export const SITE_TITLE = "frimaicons: Free company logo SVGs for developers";

export const SITE_DESCRIPTION = `Download ${icons.length} free company logos as SVG or tree-shakeable React components. Fintech, banking, AI and tech brand icons, MIT licensed.`;

/**
 * Next replaces a parent's `openGraph` object wholesale rather than merging it,
 * so every page builds its own from these shared fields.
 */
export function pageOpenGraph(og: { title: string; description: string; url: string }) {
  return { type: "website" as const, locale: "en_US", siteName: SITE_NAME, ...og };
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function iconPath(icon: FrimaIcon) {
  return `/icons/${icon.slug}`;
}

export function sectorPath(sector: Sector) {
  return `/sectors/${sector}`;
}

export function sectorIcons(sector: Sector) {
  return icons.filter((icon) => icon.sector === sector);
}

/** Sectors that have at least one icon, so we never publish empty listing pages. */
export function activeSectors() {
  return SECTORS.filter((sector) => sectorIcons(sector).length > 0);
}

/** Same-sector icons first, padded with featured icons so every page links somewhere useful. */
export function relatedIcons(icon: FrimaIcon, limit = 12) {
  const sameSector = icons.filter((i) => i.sector === icon.sector && i.slug !== icon.slug);
  const featured = icons.filter((i) => i.featured && i.sector !== icon.sector);
  return [...sameSector, ...featured].slice(0, limit);
}

export function iconDescription(icon: FrimaIcon) {
  return `Download the ${icon.title} logo as a free SVG or use it as a React component. Official ${SECTOR_LABELS[icon.sector].toLowerCase()} brand color #${icon.hex}, 24×24 vector, ready for your app.`;
}

export function sectorDescription(sector: Sector) {
  const count = sectorIcons(sector).length;
  return `${count} free ${SECTOR_LABELS[sector]} company logos as SVG and React components. Copy, download or install with npm.`;
}

const publisher = {
  "@type": "Person",
  name: MAKER.name,
  url: MAKER.links.find((link) => link.kind === "website")?.href,
  sameAs: MAKER.links.map((link) => link.href),
};

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher,
        inLanguage: "en",
      },
      {
        "@type": "SoftwareSourceCode",
        name: "@frimaicons/react",
        description: SITE_DESCRIPTION,
        codeRepository: REPO_URL,
        programmingLanguage: ["TypeScript", "React"],
        license: "https://opensource.org/licenses/MIT",
        author: publisher,
      },
    ],
  };
}

function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function iconJsonLd(icon: FrimaIcon) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageObject",
        name: `${icon.title} logo`,
        description: iconDescription(icon),
        contentUrl: absoluteUrl(`/icons/${icon.slug}.svg`),
        encodingFormat: "image/svg+xml",
        url: absoluteUrl(iconPath(icon)),
        acquireLicensePage: icon.guidelines ?? icon.source,
        creditText: icon.title,
        copyrightNotice: `${icon.title} is a trademark of its respective owner.`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      breadcrumbs([
        { name: "Logos", path: "/" },
        { name: SECTOR_LABELS[icon.sector], path: sectorPath(icon.sector) },
        { name: icon.title, path: iconPath(icon) },
      ]),
    ],
  };
}

export function sectorJsonLd(sector: Sector) {
  const list = sectorIcons(sector);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${SECTOR_LABELS[sector]} logos`,
        description: sectorDescription(sector),
        url: absoluteUrl(sectorPath(sector)),
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: list.length,
          itemListElement: list.map((icon, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: icon.title,
            url: absoluteUrl(iconPath(icon)),
          })),
        },
      },
      breadcrumbs([
        { name: "Logos", path: "/" },
        { name: SECTOR_LABELS[sector], path: sectorPath(sector) },
      ]),
    ],
  };
}
