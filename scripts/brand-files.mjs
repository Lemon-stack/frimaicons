import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export const rootDir = fileURLToPath(new URL("..", import.meta.url));
export const iconsDir = `${rootDir}icons`;
export const brandsFile = `${rootDir}data/brands.json`;

export const SECTORS = ["ai", "tech", "fintech", "banking", "telecom", "mobility", "aviation", "commerce", "media", "health", "talent", "social", "other"];

export async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

export async function readBrands() {
  try {
    return await readJson(brandsFile);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

export async function writeBrands(brands) {
  const sorted = [...brands].sort((a, b) => a.slug.localeCompare(b.slug));
  await writeFile(brandsFile, `${JSON.stringify(sorted, null, 2)}\n`);
}

export function toPascalCase(title) {
  const name = title
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
  return /^[0-9]/.test(name) ? `Brand${name}` : name;
}

export function extractPath(svg) {
  const match = svg.match(/<path d="([^"]+)"/);
  if (!match) throw new Error("SVG has no <path d=...>");
  return match[1];
}

export function toSvg(path) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${path}"/></svg>\n`;
}
