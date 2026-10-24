import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getIcon, icons, type FrimaIcon } from "@frimaicons/core";
import { needsLightBackdrop } from "@/lib/color";
import { INSTALL_COMMAND } from "@/lib/snippets";

export const alt = "frimaicons: Paystack, Flutterwave, Moniepoint and more Nigerian company logos as SVG and React components";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const SHOWCASE = [
  "paystack",
  "flutterwave",
  "moniepoint",
  "kuda",
  "opay",
  "palmpay",
  "piggyvest",
  "cowrywise",
  "interswitch",
  "jumia",
  "carbon",
  "chowdeck",
  "andela",
  "moove",
  "busha",
  "quidax",
  "bumpa",
  "termii",
  "risevest",
  "fairmoney",
];

const TILE = 92;
const GAP = 14;

function showcaseIcons() {
  return SHOWCASE.map((slug) => getIcon(icons, slug)).filter((icon): icon is FrimaIcon => !!icon);
}

function Tile({ icon }: { icon: FrimaIcon }) {
  const light = needsLightBackdrop(icon.hex);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: TILE,
        height: TILE,
        borderRadius: 22,
        background: light ? "#F2F2F2" : "#1F1F1F",
      }}
    >
      <svg width={44} height={44} viewBox="0 0 24 24" fill={`#${icon.hex}`}>
        <path d={icon.path} />
      </svg>
    </div>
  );
}

export default async function OpengraphImage() {
  const mark = await readFile(join(process.cwd(), "app/icon.svg"), "utf8");
  const markSrc = `data:image/svg+xml;base64,${Buffer.from(mark).toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", padding: 64, background: "#0A0A0A", color: "#FAFAFA" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 520 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={markSrc} width={64} height={64} alt="" />
            <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: -1 }}>frimaicons</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>Every company logo, one package.</div>
            <div style={{ fontSize: 26, color: "#A3A3A3", lineHeight: 1.35 }}>
              {`${icons.length} logos as SVG and React components, from Lagos to Manila.`}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "14px 22px",
              borderRadius: 16,
              background: "#1F1F1F",
              fontSize: 24,
              fontFamily: "monospace",
              color: "#22EE7A",
            }}
          >
            {`$ ${INSTALL_COMMAND}`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            gap: GAP,
            width: TILE * 5 + GAP * 4,
            marginLeft: "auto",
          }}
        >
          {showcaseIcons().map((icon) => (
            <Tile key={icon.slug} icon={icon} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
