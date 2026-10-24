# @frimaicons/react

Company logos as React components, starting with Nigerian startups: Paystack, Flutterwave, Moniepoint, OPay, Kuda and more.

```bash
npm install @frimaicons/react
```

```tsx
import { Paystack, Flutterwave, Moniepoint } from "@frimaicons/react";

export function Partners() {
  return (
    <>
      <Paystack />                          {/* 24px, currentColor */}
      <Flutterwave color="brand" size={32} /> {/* the company's own color */}
      <Moniepoint title="Moniepoint" />     {/* accessible label */}
    </>
  );
}
```

| Prop | Type | Default | |
| --- | --- | --- | --- |
| `size` | `number \| string` | `24` | Width and height |
| `color` | `"brand" \| string` | `"currentColor"` | `"brand"` uses the company's color |
| `title` | `string` | | Accessible label. Without it the icon is hidden from screen readers |

Any other SVG props are passed through. To render an icon chosen at runtime, use `BrandIcon` with the data from the [`@frimaicons/core`](https://www.npmjs.com/package/@frimaicons/core) package:

```tsx
import { BrandIcon } from "@frimaicons/react";
import { icons } from "@frimaicons/core";

icons.map((icon) => <BrandIcon key={icon.slug} icon={icon} />);
```

## Legal

The code is MIT licensed. Every logo is a trademark of its owner. Use logos according to each brand's guidelines. Brand owners can request removal at [github.com/Lemon-stack/frimaicons/issues](https://github.com/Lemon-stack/frimaicons/issues).
