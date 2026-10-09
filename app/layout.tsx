import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { SITE, SITE_CANONICAL, BRAND_TAGLINE, SERVICE_CATEGORY_LINE } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultDescription = `${SITE.heroHeadlineSupport}. ${SITE.subline} ${SERVICE_CATEGORY_LINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CANONICAL),
  title: {
    default: `${SITE.shortName} | ${BRAND_TAGLINE} — Palm Beach County`,
    template: `%s | ${SITE.shortName}`,
  },
  description: defaultDescription,
  keywords: [
    "auto detailing West Palm Beach",
    "mobile detailing West Palm Beach",
    "car detailing Palm Beach County",
    "ceramic coating West Palm Beach",
    "paint correction West Palm Beach",
    "headliner repair West Palm Beach",
    "starlight headliner West Palm Beach",
    "custom car interior West Palm Beach",
    "auto interior restoration Palm Beach County",
    "mobile car detailing Palm Beach Gardens",
    "mobile detailing Jupiter",
    "car detailing Wellington",
    "car detailing Palm Beach",
    "Stellar Customs",
  ],
  openGraph: {
    title: `${SITE.shortName} | Palm Beach County Automotive Detailing`,
    description: defaultDescription,
    url: SITE_CANONICAL,
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
    images: [{ url: "/stellar-logo.png", width: 1200, height: 630, alt: SITE.name }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta property="article:publisher" content={SITE.facebook} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-dvh flex flex-col`}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
