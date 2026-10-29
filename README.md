# frimaicons

Company logos as SVG and React components, from Lagos to Manila.

```bash
pnpm add @frimaicons/react
```

```tsx
import { Stripe, Andela } from "@frimaicons/react";

<Stripe size={24} />            // currentColor
<Andela color="brand" title="Andela" />
```

Raw data (path, hex, source, sector) ships in the `@frimaicons/core` package:

```ts
import { fiStripe, icons, searchIcons } from "@frimaicons/core";
```

Your AI assistant can search logos and write the code through the `@frimaicons/mcp` server:

```bash
claude mcp add frimaicons -- npx -y @frimaicons/mcp
```

## Repo layout

| Path | What |
| --- | --- |
| `icons/*.svg` | One file per brand: a single `<path>` in a 24×24 viewBox |
| `data/brands.json` | Metadata per brand: slug, title, hex, source, sector |
| `data/wanted.json` | Brands we still need logos for |
| `packages/core` | `@frimaicons/core`: icon data, search helpers, types |
| `packages/react` | `@frimaicons/react`: generated components |
| `packages/mcp` | `@frimaicons/mcp`: MCP server for AI assistants |
| `apps/site` | Next.js static site: browse, search, copy, download |

## Adding a logo

Full guide in [CONTRIBUTING.md](CONTRIBUTING.md). In short:

1. Get the logo, ideally from the company's press kit, brand page or website.
2. Reduce it to a single-color, single-path SVG in a 24×24 viewBox and save it as `icons/<slug>.svg`.
3. Add an entry to `data/brands.json` with `slug`, `title`, `hex`, `source` (the press kit URL) and `sector`.
4. Run `pnpm test` to validate.

## Development

```bash
pnpm install
pnpm dev        # site at http://localhost:3000
pnpm test       # validates icons + runs unit tests
pnpm build
```

## Deploying the site (Cloudflare, free)

The site is a static export (`apps/site/out`) served by Cloudflare Workers static assets. No server runs.

```bash
pnpm --filter site run deploy
```

The first deploy asks you to log in to Cloudflare and gives you a `frimaicons.<account>.workers.dev` URL.

## Legal

The code is MIT. Every logo is a trademark of its owner, and inclusion here doesn't imply endorsement. Use logos according to each brand's guidelines. Brand owners can request removal by opening an issue.
