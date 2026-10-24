# Contributing to frimaicons

Thanks for helping. Most contributions are new logos, so this guide starts there.

## Adding a logo

### 1. Get the logo

Start from the company's own assets where you can.

- Look for **Press**, **Newsroom**, **Media kit** or **Brand** links in the site footer.
- Search `"<brand> press kit"` or `"<brand> brand assets"`.
- No press kit? The SVG logo on the company's own website counts as official. Inspect the header logo in DevTools and copy the `<svg>`.
- Keep the URL you got it from. It goes in the `source` field.

Prefer the brand's **symbol** (e.g. the GCash "G") over the full wordmark, since it reads better at 24px. Use the wordmark only if the brand has no symbol.

### 2. Turn it into a single path

Every icon is one single-color `<path>` in a 24×24 viewBox.

In Figma:

1. Import the SVG and delete everything except the mark.
2. Select it all and **Flatten** (⌘E / Ctrl+E) so it becomes one path.
3. Put it in a 24×24 frame, scale it so the longest side is 24, and center it.
4. Use a single solid fill. Outline any strokes and remove gradients.
5. Export the frame as SVG.

In Inkscape: Path → Object to Path, then Path → Union, and set the document to 24×24.

Save it as `icons/<slug>.svg` in exactly this shape:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="..."/></svg>
```

The slug is the brand name in lowercase letters and digits only: `paystack`, `mpesa`, `chippercash`.

### 3. Add the metadata

Add an entry to `data/brands.json`:

```json
{
  "slug": "paystack",
  "title": "Paystack",
  "hex": "XXXXXX",
  "source": "https://...",
  "guidelines": "https://...",
  "sector": "fintech"
}
```

| Field | Rules |
| --- | --- |
| `slug` | Lowercase letters and digits, unique |
| `title` | The brand's name as the brand writes it |
| `hex` | Primary brand color: 6 uppercase hex digits, no `#`. Take it from the brand guidelines, or from the logo's fill. |
| `source` | `https://` URL of where the SVG came from |
| `guidelines` | Optional. Link to the brand's usage guidelines |
| `sector` | One of `fintech`, `telecom`, `mobility`, `commerce`, `talent`, `social`, `other` |
| `featured` | Optional. `true` for Nigerian startups |

If the brand was listed in `data/wanted.json`, remove it from there.

### 4. Validate

```bash
pnpm install
pnpm test
```

`pnpm test` checks every SVG and brand entry and fails with a clear message if something is off.

## Code changes

```bash
pnpm install
pnpm dev        # site at http://localhost:3000
pnpm test       # icon validation + unit tests
pnpm lint
pnpm typecheck
pnpm build
```

- Packages live in `packages/core` (`@frimaicons/core`) and `packages/react` (`@frimaicons/react`). Their `src/generated/` folders are built from `icons/` and `data/`, so don't edit them by hand.
- The site is a static Next.js export in `apps/site`.
- Use kebab-case file names, and keep stateful logic in hooks with presentational components.

## Pull requests

- One brand per pull request when adding logos. It keeps review and any later removal simple.
- Say where the logo came from in the description.
- CI runs the same checks as `pnpm test`, `pnpm lint`, `pnpm typecheck` and `pnpm build`. They must pass before merging.

## Removal requests

Brand owners can ask for a logo to be removed or corrected by opening a **Logo removal or correction** issue. We act on these promptly and don't argue them.
