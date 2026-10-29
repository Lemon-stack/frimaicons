import { getComponentName, getIcon, icons, searchIcons, SECTORS, type FrimaIcon, type Sector } from "@frimaicons/core";
import wanted from "../../../data/wanted.json";

const REPO_URL = "https://github.com/Lemon-stack/frimaicons";
const TRADEMARK_NOTE =
  "Logos are trademarks of their owners. Use them according to each brand's guidelines; inclusion doesn't imply endorsement.";

export type IconColor = "currentColor" | "brand";

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function summarize(icon: FrimaIcon) {
  return {
    slug: icon.slug,
    title: icon.title,
    hex: `#${icon.hex}`,
    sector: icon.sector,
    component: getComponentName(icon.title),
  };
}

function escapeAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function toColoredSvg(icon: FrimaIcon, color: IconColor) {
  const fill = color === "brand" ? `#${icon.hex}` : "currentColor";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fill}" role="img" aria-label="${escapeAttribute(icon.title)}"><path d="${icon.path}"/></svg>`;
}

function toReactSnippet(icon: FrimaIcon, color: IconColor) {
  const name = getComponentName(icon.title);
  const colorProp = color === "brand" ? ` color="brand"` : "";
  return `import { ${name} } from "@frimaicons/react";\n\n<${name} size={24}${colorProp} title="${icon.title}" />`;
}

function findExact(name: string) {
  const q = normalize(name);
  return icons.find((icon) => icon.slug === q || normalize(icon.title) === q);
}

export function searchLogos({ query, sector, limit = 20 }: { query?: string; sector?: Sector; limit?: number }) {
  const matches = searchIcons(icons, { query, sector });
  return { total: matches.length, results: matches.slice(0, limit).map(summarize) };
}

export function getLogo({ slug, color = "currentColor" }: { slug: string; color?: IconColor }) {
  const icon = getIcon(icons, slug) ?? findExact(slug);
  if (!icon) {
    return { found: false as const, suggestions: searchLogos({ query: slug, limit: 5 }).results };
  }
  return {
    found: true as const,
    ...summarize(icon),
    svg: toColoredSvg(icon, color),
    path: icon.path,
    react: toReactSnippet(icon, color),
    install: { react: "npm install @frimaicons/react", core: "npm install @frimaicons/core" },
    source: icon.source,
    ...(icon.guidelines && { guidelines: icon.guidelines }),
    ...(icon.license && { license: icon.license }),
    note: TRADEMARK_NOTE,
  };
}

export function listSectors() {
  return SECTORS.map((sector) => {
    const inSector = searchIcons(icons, { sector });
    return { sector, count: inSector.length, examples: inSector.slice(0, 5).map((icon) => icon.title) };
  });
}

function issueUrl({ company, website, sector }: { company: string; website?: string; sector?: Sector }) {
  const params = new URLSearchParams({ template: "request-logo.yml", title: `Logo request: ${company}`, company });
  if (website) params.set("website", website);
  if (sector) params.set("sector", sector);
  return `${REPO_URL}/issues/new?${params}`;
}

export function requestLogo(input: { company: string; website?: string; sector?: Sector }) {
  const existing = findExact(input.company);
  if (existing) {
    return { status: "available" as const, icon: summarize(existing) };
  }

  const q = normalize(input.company);
  const planned = (wanted as { title: string; sector: string }[]).find((brand) => normalize(brand.title) === q);
  const similar = searchLogos({ query: input.company, limit: 5 }).results;
  const contribute = `${REPO_URL}/blob/main/CONTRIBUTING.md`;

  if (planned) {
    return {
      status: "planned" as const,
      message: `${planned.title} is already on the wanted list. Contributions welcome.`,
      contribute,
      similar,
    };
  }
  return {
    status: "missing" as const,
    message: "Not in frimaicons yet. Share the issue link with the user so they can request it; nothing has been filed.",
    issueUrl: issueUrl(input),
    contribute,
    similar,
  };
}
