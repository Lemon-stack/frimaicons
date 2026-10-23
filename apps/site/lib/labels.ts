import type { Sector } from "frimaicons";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export function getCountryName(code: string) {
  return regionNames.of(code) ?? code;
}

export function getCountryFlag(code: string) {
  return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0)));
}

export const SECTOR_LABELS: Record<Sector, string> = {
  fintech: "Fintech",
  telecom: "Telecom",
  mobility: "Mobility",
  commerce: "Commerce",
  talent: "Talent",
  social: "Social",
  other: "Other",
};
