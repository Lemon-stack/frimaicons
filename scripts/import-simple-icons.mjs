// Pulls CC0 icon data from simple-icons for the slugs listed in data/simple-icons-seed.json.
import { writeFile } from "node:fs/promises";
import * as simpleIcons from "simple-icons";
import { iconsDir, readBrands, readJson, rootDir, toSvg, writeBrands } from "./brand-files.mjs";

const bySlug = new Map(
  Object.values(simpleIcons)
    .filter((icon) => icon && typeof icon === "object" && "slug" in icon)
    .map((icon) => [icon.slug, icon]),
);

function toBrand(icon, seed) {
  return {
    slug: icon.slug,
    title: icon.title,
    hex: icon.hex.toUpperCase(),
    source: icon.source,
    ...(icon.guidelines && { guidelines: icon.guidelines }),
    ...(icon.license && { license: icon.license }),
    country: seed.country,
    sector: seed.sector,
    origin: "simple-icons",
  };
}

async function main() {
  const seeds = await readJson(`${rootDir}data/simple-icons-seed.json`);
  const missing = seeds.filter((seed) => !bySlug.has(seed.slug));
  if (missing.length) {
    throw new Error(`Not in simple-icons: ${missing.map((s) => s.slug).join(", ")}`);
  }

  const brands = new Map((await readBrands()).map((brand) => [brand.slug, brand]));
  for (const seed of seeds) {
    const icon = bySlug.get(seed.slug);
    await writeFile(`${iconsDir}/${icon.slug}.svg`, toSvg(icon.path));
    brands.set(icon.slug, { ...brands.get(icon.slug), ...toBrand(icon, seed) });
  }

  await writeBrands([...brands.values()]);
  console.log(`Imported ${seeds.length} icons from simple-icons.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
