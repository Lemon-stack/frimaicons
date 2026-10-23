import { getComponentName, type FrimaIcon } from "frimaicons";

export const INSTALL_COMMAND = "pnpm add @frimaicons/react";

export function getSnippets(icon: FrimaIcon) {
  const name = getComponentName(icon.title);
  return {
    svg: icon.svg,
    jsx: `<${name} size={24} color="brand" />`,
    import: `import { ${name} } from "@frimaicons/react";`,
    hex: `#${icon.hex}`,
  };
}
