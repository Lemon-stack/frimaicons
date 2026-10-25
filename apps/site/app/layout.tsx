import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { pageOpenGraph, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/seo";
import { MAKER, REPO_URL } from "@/lib/site";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// No canonical here: child routes inherit it, which would point every icon page at the home page.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: "%s — frimaicons",
  },
  description: SITE_DESCRIPTION,
  keywords: ["company logos", "brand icons", "SVG logos", "React icons", "logo SVG download", "fintech logos", "Nigerian company logos"],
  authors: [{ name: MAKER.name, url: REPO_URL }],
  creator: MAKER.name,
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: pageOpenGraph({ title: SITE_TITLE, description: SITE_DESCRIPTION, url: "/" }),
  twitter: {
    card: "summary_large_image",
    creator: "@lemonconfidence",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "dark h-full antialiased",
        geistSans.variable,
        geistMono.variable,
      )}
    >
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
