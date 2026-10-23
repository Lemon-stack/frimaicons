import { describe, expect, it } from "vitest";
import * as core from "./index";
import { getComponentName, icons } from "./index";

describe("getComponentName", () => {
  it("matches the generated export for every icon", () => {
    for (const icon of icons) {
      expect(core).toHaveProperty(`fi${getComponentName(icon.title)}`, icon);
    }
  });

  it("handles spaces, punctuation and leading digits", () => {
    expect(getComponentName("Mercado Pago")).toBe("MercadoPago");
    expect(getComponentName("M-Pesa")).toBe("MPesa");
    expect(getComponentName("9mobile")).toBe("Brand9mobile");
  });
});
