import { describe, expect, it } from "vitest";
import { getIcon, icons, searchIcons } from "./index";

describe("searchIcons", () => {
  it("ranks exact title matches first", () => {
    expect(searchIcons(icons, { query: "pay" })[0]?.slug).toBe("paypal");
    expect(searchIcons(icons, { query: "Stripe" })[0]?.slug).toBe("stripe");
  });

  it("ignores spacing and punctuation in queries", () => {
    expect(searchIcons(icons, { query: "mercado pago" }).map((i) => i.slug)).toContain("mercadopago");
  });

  it("filters by sector and country", () => {
    const results = searchIcons(icons, { sector: "fintech", country: "NG" });
    expect(results.every((i) => i.sector === "fintech" && i.country === "NG")).toBe(true);
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
