import { getComponentName, type FrimaIcon } from "@frimaicons/core";

export const INSTALL_COMMAND = "pnpm add @frimaicons/react";

export const DEFAULT_SIZE = 24;

export interface SnippetOptions {
  size?: number;
  /** `"brand"`, a CSS color, or undefined for `currentColor`. */
  color?: string;
}

function toFill(icon: FrimaIcon, color: string | undefined) {
  if (!color) return "currentColor";
  return color === "brand" ? `#${icon.hex}` : color;
}

function toJsx(name: string, { size = DEFAULT_SIZE, color }: SnippetOptions) {
  const props = [size !== DEFAULT_SIZE && `size={${size}}`, color && `color="${color}"`].filter(Boolean);
  return `<${name}${props.length ? ` ${props.join(" ")}` : ""} />`;
}

export function toSvgMarkup(icon: FrimaIcon, { size = DEFAULT_SIZE, color }: SnippetOptions = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="${toFill(icon, color)}"><path d="${icon.path}"/></svg>`;
}

export function getSnippets(icon: FrimaIcon, options: SnippetOptions = {}) {
  const name = getComponentName(icon.title);
  const importLine = `import { ${name} } from "@frimaicons/react";`;
  const jsx = toJsx(name, options);
  return {
    name,
    svg: toSvgMarkup(icon, options),
    jsx,
    import: importLine,
    react: `${importLine}\n\n${jsx}`,
    hex: `#${icon.hex}`,
  };
}
