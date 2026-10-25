import { ImageResponse } from "next/og";
import { getIcon, icons } from "@frimaicons/core";
import { needsLightBackdrop } from "@/lib/color";
import { SECTOR_LABELS } from "@/lib/labels";
import { INSTALL_COMMAND } from "@/lib/snippets";

export const alt = "Company logo as SVG and React component on frimaicons";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return icons.map((icon) => ({ slug: icon.slug }));
}

export default async function IconOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const icon = getIcon(icons, slug);
  if (!icon) throw new Error(`Unknown icon slug for OG image: ${slug}`);
  const light = needsLightBackdrop(icon.hex);

  return new ImageResponse(
    (
      <div style={{ display: "flex", alignItems: "center", width: "100%", height: "100%", padding: 72, gap: 72, background: "#0A0A0A", color: "#FAFAFA" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 420,
            height: 420,
            borderRadius: 64,
            background: light ? "#F2F2F2" : "#1F1F1F",
          }}
        >
          <svg width={240} height={240} viewBox="0 0 24 24" fill={`#${icon.hex}`}>
            <path d={icon.path} />
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1 }}>
          <div style={{ fontSize: 28, color: "#A3A3A3" }}>{`frimaicons · ${SECTOR_LABELS[icon.sector]}`}</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{`${icon.title} logo`}</div>
          <div style={{ fontSize: 30, color: "#A3A3A3" }}>{`SVG + React component · #${icon.hex}`}</div>
          <div style={{ display: "flex", fontSize: 24, fontFamily: "monospace", color: "#22EE7A" }}>{`$ ${INSTALL_COMMAND}`}</div>
        </div>
      </div>
    ),
    size,
  );
}
