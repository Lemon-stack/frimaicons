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

Raw data (path, hex, source, country, sector) ships in the `frimaicons` package:

```ts
import { fiStripe, icons, searchIcons } from "frimaicons";
```

## Repo layout

| Path | What |
| --- | --- |
| `icons/*.svg` | One file per brand: a single `<path>` in a 24×24 viewBox |
| `data/brands.json` | Metadata per brand: slug, title, hex, source, country, sector |
| `data/wanted.json` | Brands we still need official SVGs for |
| `packages/core` | `frimaicons`: icon data, search helpers, types |
| `packages/react` | `@frimaicons/react`: generated components |
| `apps/site` | Next.js static site: browse, search, copy, download |

## Adding a logo

1. Get the logo from the company's official press kit or brand page. Don't redraw it from memory.
2. Reduce it to a single-color, single-path SVG in a 24×24 viewBox and save it as `icons/<slug>.svg`.
3. Add an entry to `data/brands.json` with `slug`, `title`, `hex`, `source` (the press kit URL), `country` (ISO alpha-2 of HQ) and `sector`.
4. Run `pnpm test` to validate.

Brands that already exist in [Simple Icons](https://simpleicons.org) (CC0) can be pulled in by adding them to `data/simple-icons-seed.json` and running `pnpm import:simple-icons`.

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
