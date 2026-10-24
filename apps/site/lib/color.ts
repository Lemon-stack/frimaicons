// Relative luminance of the dark tile surface (oklch(0.21 0 0)); OKLab L³ approximates it.
const SURFACE_LUMINANCE = 0.21 ** 3;

// WCAG 2.1 minimum contrast for graphical objects.
const MIN_CONTRAST = 3;

function channel(value: number) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => channel(parseInt(hex.slice(i, i + 2), 16)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Hex without `#` from a CSS color we generate (`#RRGGBB`), or null for anything else (e.g. currentColor). */
export function toHex(color: string, brandHex: string) {
  if (color === "brand") return brandHex;
  return /^#[0-9a-f]{6}$/i.test(color) ? color.slice(1) : null;
}

/** True when a color is too dark to read on the dark card surface and needs a light backdrop. */
export function needsLightBackdrop(hex: string | null) {
  if (!hex) return false;
  const l = luminance(hex);
  return (Math.max(l, SURFACE_LUMINANCE) + 0.05) / (Math.min(l, SURFACE_LUMINANCE) + 0.05) < MIN_CONTRAST;
}
