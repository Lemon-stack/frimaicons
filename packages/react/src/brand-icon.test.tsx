import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Stripe } from "./index";

describe("generated icons", () => {
  it("renders currentColor at 24px by default and hides from screen readers", () => {
    const html = renderToStaticMarkup(<Stripe />);
    expect(html).toContain('width="24"');
    expect(html).toContain('fill="currentColor"');
    expect(html).toContain('aria-hidden="true"');
  });

  it("uses the brand hex for color=brand", () => {
    expect(renderToStaticMarkup(<Stripe color="brand" />)).toContain('fill="#635BFF"');
  });

  it("adds an accessible title when given one", () => {
    const html = renderToStaticMarkup(<Stripe title="Stripe" size={32} />);
    expect(html).toContain('role="img"');
    expect(html).toContain("<title>Stripe</title>");
    expect(html).toContain('width="32"');
  });
});
