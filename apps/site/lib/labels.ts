import {
  BubbleChatIcon,
  Car01Icon,
  CreditCardIcon,
  GridIcon,
  ShoppingBag01Icon,
  SmartPhone01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import type { Sector } from "@frimaicons/core";

export const SECTOR_LABELS: Record<Sector, string> = {
  fintech: "Fintech",
  telecom: "Telecom",
  mobility: "Mobility",
  commerce: "Commerce",
  talent: "Talent",
  social: "Social",
  other: "Other",
};

export const SECTOR_ICONS = {
  fintech: CreditCardIcon,
  telecom: SmartPhone01Icon,
  mobility: Car01Icon,
  commerce: ShoppingBag01Icon,
  talent: UserGroupIcon,
  social: BubbleChatIcon,
  other: GridIcon,
} satisfies Record<Sector, unknown>;
