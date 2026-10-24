import reactPackage from "../../../packages/react/package.json";

export const VERSION = reactPackage.version;

export const REPO_URL = "https://github.com/Lemon-stack/frimaicons";

export type MakerLinkKind = "github" | "website" | "x" | "linkedin";

export const MAKER = {
  name: reactPackage.author,
  links: [
    { kind: "x", label: "@lemonconfidence", href: "https://x.com/lemonconfidence" },
    { kind: "linkedin", label: "in/lemonconfidence", href: "https://www.linkedin.com/in/lemonconfidence" },
    { kind: "github", label: "Lemon-stack", href: "https://github.com/Lemon-stack" },
    { kind: "website", label: "lemonconfidence.site", href: "https://www.lemonconfidence.site" },
  ] satisfies { kind: MakerLinkKind; label: string; href: string }[],
};
