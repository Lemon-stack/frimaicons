import {
  AiMagicIcon,
  Airplane01Icon,
  BankIcon,
  BubbleChatIcon,
  Car01Icon,
  CreditCardIcon,
  GridIcon,
  HealthIcon,
  LaptopIcon,
  ShoppingBag01Icon,
  SmartPhone01Icon,
  Tv01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import type { Sector } from "@frimaicons/core";

export const SECTOR_LABELS: Record<Sector, string> = {
  ai: "AI",
  tech: "Tech",
  fintech: "Fintech",
  banking: "Banking",
  telecom: "Telecom",
  mobility: "Mobility",
  aviation: "Aviation",
  commerce: "Commerce",
  media: "Media",
  health: "Health",
  talent: "Talent",
  social: "Social",
  other: "Other",
};

export const SECTOR_ICONS = {
  ai: AiMagicIcon,
  tech: LaptopIcon,
  fintech: CreditCardIcon,
  banking: BankIcon,
  telecom: SmartPhone01Icon,
  mobility: Car01Icon,
  aviation: Airplane01Icon,
  commerce: ShoppingBag01Icon,
  media: Tv01Icon,
  health: HealthIcon,
  talent: UserGroupIcon,
  social: BubbleChatIcon,
  other: GridIcon,
} satisfies Record<Sector, unknown>;
