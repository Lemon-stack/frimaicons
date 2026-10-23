// Copies raw SVGs into public/ so each icon has a downloadable URL (/icons/<slug>.svg).
import { cp, rm } from "node:fs/promises";

const source = new URL("../../../icons/", import.meta.url);
const target = new URL("../public/icons/", import.meta.url);

try {
  await rm(target, { recursive: true, force: true });
  await cp(source, target, { recursive: true });
} catch (error) {
  console.error(error);
  process.exit(1);
}
