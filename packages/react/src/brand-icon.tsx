import { forwardRef, type SVGProps } from "react";
import type { FrimaIcon } from "@frimaicons/core";

export interface FrimaIconProps extends Omit<SVGProps<SVGSVGElement>, "color" | "ref"> {
  size?: number | string;
  /** Any CSS color, or `"brand"` for the company's own color. Defaults to `currentColor`. */
  color?: "brand" | (string & {});
  /** Accessible label. Without it the icon is hidden from screen readers. */
  title?: string;
}

export interface BrandIconProps extends FrimaIconProps {
  icon: FrimaIcon;
}

export const BrandIcon = forwardRef<SVGSVGElement, BrandIconProps>(function BrandIcon(
  { icon, size = 24, color = "currentColor", title, ...props },
  ref,
) {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color === "brand" ? `#${icon.hex}` : color}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d={icon.path} />
    </svg>
  );
});

export function createIcon(icon: FrimaIcon) {
  const Icon = forwardRef<SVGSVGElement, FrimaIconProps>((props, ref) => (
    <BrandIcon ref={ref} icon={icon} {...props} />
  ));
  Icon.displayName = icon.title.replace(/[^A-Za-z0-9]/g, "");
  return Icon;
}
