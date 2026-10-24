import { describe, expect, it } from "vitest";
import { getIcon, icons, searchIcons } from "./index";

describe("searchIcons", () => {
  it("ranks exact title matches first", () => {
    expect(searchIcons(icons, { query: "paypal" })[0]?.slug).toBe("paypal");
    expect(searchIcons(icons, { query: "Stripe" })[0]?.slug).toBe("stripe");
  });

  it("ignores spacing and punctuation in queries", () => {
    expect(searchIcons(icons, { query: "mercado pago" }).map((i) => i.slug)).toContain("mercadopago");
  });

  it("filters by sector", () => {
    const results = searchIcons(icons, { sector: "telecom" });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((i) => i.sector === "telecom")).toBe(true);
  });

  it("orders equally good matches alphabetically, ignoring featured", () => {
    const slugs = searchIcons(icons, { query: "pay" }).map((i) => i.slug);
    expect(slugs.indexOf("paypal")).toBeLessThan(slugs.indexOf("paystack"));
  });

  it("lists all icons alphabetically by title", () => {
    const titles = searchIcons(icons).map((i) => i.title);
    expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)));
  });

  it("returns nothing for unmatched queries", () => {
    expect(searchIcons(icons, { query: "zzzz" })).toEqual([]);
  });
});

describe("getIcon", () => {
  it("finds icons by slug", () => {
    expect(getIcon(icons, "andela")?.title).toBe("Andela");
    expect(getIcon(icons, "missing")).toBeUndefined();
  });
});
