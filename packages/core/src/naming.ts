/** Component name used by `@frimaicons/react`. Must match `toPascalCase` in scripts/brand-files.mjs. */
export function getComponentName(title: string) {
  const name = title
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
  return /^[0-9]/.test(name) ? `Brand${name}` : name;
}
