import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extractPath, iconsDir, readBrands, toPascalCase, toSvg } from "../../../scripts/brand-files.mjs";

const outDir = new URL("../src/generated/", import.meta.url);

async function toIcon(brand) {
  const path = extractPath(await readFile(`${iconsDir}/${brand.slug}.svg`, "utf8"));
  const { origin: _origin, ...meta } = brand;
  return { ...meta, path, svg: toSvg(path).trim() };
}

function renderModule(icons) {
  const consts = icons.map(
    (icon) => `export const fi${toPascalCase(icon.title)}: FrimaIcon = ${JSON.stringify(icon)};`,
  );
  const list = icons.map((icon) => `fi${toPascalCase(icon.title)}`).join(", ");
  return [
    `import type { FrimaIcon } from "../types";`,
    "",
    ...consts,
    "",
    `export const icons: readonly FrimaIcon[] = [${list}];`,
    "",
  ].join("\n");
}

async function main() {
  const icons = await Promise.all((await readBrands()).map(toIcon));
  await mkdir(outDir, { recursive: true });
  await writeFile(new URL("icons.ts", outDir), renderModule(icons));
  console.log(`Generated ${icons.length} icons.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
