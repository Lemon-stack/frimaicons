import { describe, expect, it } from "vitest";
import { getLogo, listSectors, requestLogo, searchLogos } from "./tools";

describe("searchLogos", () => {
  it("returns summaries with component names", () => {
    const { results } = searchLogos({ query: "stripe" });
    expect(results[0]).toMatchObject({ slug: "stripe", title: "Stripe", component: "Stripe" });
    expect(results[0]?.hex).toMatch(/^#[0-9A-F]{6}$/);
  });

  it("respects the limit but reports the full total", () => {
    const { total, results } = searchLogos({ sector: "fintech", limit: 3 });
    expect(results).toHaveLength(3);
    expect(total).toBeGreaterThan(3);
  });
});

describe("getLogo", () => {
  it("returns svg and react code", () => {
    const logo = getLogo({ slug: "paystack", color: "brand" });
    if (!logo.found) throw new Error("expected paystack");
    expect(logo.svg).toContain(`fill="${logo.hex}"`);
    expect(logo.react).toContain(`import { Paystack } from "@frimaicons/react"`);
    expect(logo.react).toContain(`color="brand"`);
  });

  it("accepts titles as well as slugs", () => {
    expect(getLogo({ slug: "Mercado Pago" }).found).toBe(true);
  });

  it("escapes titles inside svg attributes", () => {
    const logo = getLogo({ slug: "uandcmfb" });
    if (!logo.found) throw new Error("expected uandcmfb");
    expect(logo.svg).toContain(`aria-label="U&amp;C Microfinance Bank"`);
  });

  it("suggests close matches when the slug is unknown", () => {
    const logo = getLogo({ slug: "pay" });
    expect(logo.found).toBe(false);
    if (logo.found) return;
    expect(logo.suggestions.length).toBeGreaterThan(0);
  });
});

describe("listSectors", () => {
  it("covers every sector with counts", () => {
    const sectors = listSectors();
    expect(sectors.find((s) => s.sector === "fintech")?.count).toBeGreaterThan(0);
    expect(sectors.every((s) => s.examples.length <= 5)).toBe(true);
  });
});

describe("requestLogo", () => {
  it("reports logos that already exist", () => {
    expect(requestLogo({ company: "Kuda" }).status).toBe("available");
  });

  it("reports logos on the wanted list", () => {
    expect(requestLogo({ company: "fincra" }).status).toBe("planned");
  });

  it("builds a prefilled issue link for missing logos", () => {
    const result = requestLogo({ company: "Acme Corp", website: "https://acme.test", sector: "tech" });
    if (result.status !== "missing") throw new Error("expected missing");
    const url = new URL(result.issueUrl);
    expect(url.searchParams.get("template")).toBe("request-logo.yml");
    expect(url.searchParams.get("company")).toBe("Acme Corp");
    expect(url.searchParams.get("sector")).toBe("tech");
  });
});
