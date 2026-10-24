import { readdir, readFile } from "node:fs/promises";
import { SECTORS, iconsDir, readBrands } from "./brand-files.mjs";

const SVG_PATTERN = /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 24 24"><path d="[^"]+"\/><\/svg>\n?$/;

function checkBrand(brand, seen) {
  const errors = [];
  if (!/^[a-z0-9]+$/.test(brand.slug ?? "")) errors.push("slug must be lowercase letters and digits");
  if (seen.has(brand.slug)) errors.push("duplicate slug");
  if (!brand.title) errors.push("missing title");
  if (!/^[0-9A-F]{6}$/.test(brand.hex ?? "")) errors.push("hex must be 6 uppercase hex digits");
  if (!/^https:\/\//.test(brand.source ?? "")) errors.push("source must be an https URL");
  if (!SECTORS.includes(brand.sector)) errors.push(`sector must be one of ${SECTORS.join(", ")}`);
  if (brand.featured !== undefined && typeof brand.featured !== "boolean") errors.push("featured must be true or false");
  return errors;
}

async function checkSvg(slug) {
  const svg = await readFile(`${iconsDir}/${slug}.svg`, "utf8");
  return SVG_PATTERN.test(svg) ? [] : ["svg must be a single path in a 24x24 viewBox"];
}

async function main() {
  const brands = await readBrands();
  const files = new Set((await readdir(iconsDir)).filter((f) => f.endsWith(".svg")));
  const seen = new Set();
  const problems = [];

  for (const brand of brands) {
    const errors = checkBrand(brand, seen);
    if (files.has(`${brand.slug}.svg`)) errors.push(...(await checkSvg(brand.slug)));
    else errors.push(`missing icons/${brand.slug}.svg`);
    files.delete(`${brand.slug}.svg`);
    seen.add(brand.slug);
    problems.push(...errors.map((e) => `${brand.slug}: ${e}`));
  }
  problems.push(...[...files].map((f) => `icons/${f}: no entry in data/brands.json`));

  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
  }
  console.log(`${brands.length} icons valid.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
