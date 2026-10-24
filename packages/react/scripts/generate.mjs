import { mkdir, writeFile } from "node:fs/promises";
import { readBrands, toPascalCase } from "../../../scripts/brand-files.mjs";

const outDir = new URL("../src/generated/", import.meta.url);

function renderModule(names) {
  return [
    `import { ${names.map((name) => `fi${name}`).join(", ")} } from "@frimaicons/core";`,
    `import { createIcon } from "../brand-icon";`,
    "",
    ...names.map((name) => `export const ${name} = /*#__PURE__*/ createIcon(fi${name});`),
    "",
  ].join("\n");
}

async function main() {
  const names = (await readBrands()).map((brand) => toPascalCase(brand.title));
  await mkdir(outDir, { recursive: true });
  await writeFile(new URL("icons.ts", outDir), renderModule(names));
  console.log(`Generated ${names.length} components.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
