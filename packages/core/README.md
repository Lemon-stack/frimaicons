# @frimaicons/core

Company logos as SVG data, starting with Nigerian startups: Paystack, Flutterwave, Moniepoint, OPay, Kuda and more. For React components, use [`@frimaicons/react`](https://www.npmjs.com/package/@frimaicons/react).

```bash
npm install @frimaicons/core
```

```ts
import { fiPaystack, icons, searchIcons, getIcon } from "@frimaicons/core";

fiPaystack.svg;   // '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="…"/></svg>'
fiPaystack.path;  // the single path, for a 24×24 viewBox
fiPaystack.hex;   // "00C3F7"

searchIcons(icons, { query: "pay", sector: "fintech" });
getIcon(icons, "moniepoint");
```

Each icon has `slug`, `title`, `hex`, `path`, `svg`, `source` (where the logo came from), optional `guidelines` and `license`, `sector`, and `featured`.

Exports are named `fi` + the brand name in PascalCase: `fiPaystack`, `fiOPay`, `fiSalaryIndex`.

## Legal

The code is MIT licensed. Every logo is a trademark of its owner. Use logos according to each brand's guidelines. Some icon data comes from [Simple Icons](https://simpleicons.org) (CC0). Brand owners can request removal at [github.com/Lemon-stack/frimaicons/issues](https://github.com/Lemon-stack/frimaicons/issues).
