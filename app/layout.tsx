import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { SITE, SITE_CANONICAL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CANONICAL),
  title: {
    default: `${SITE.shortName} | Luxury Mobile Automotive — South Florida & Alabama`,
    template: `%s | ${SITE.shortName}`,
  },
  description: `${SITE.tagline} ${SITE.subline} Premium starlight headliner installs, ambient lighting, and concierge mobile repair across Palm Beach, Miami, Fort Lauderdale, Birmingham, Huntsville, and Alabama.`,
  keywords: [
    "luxury mobile automotive South Florida",
    "starlight headliner install Alabama",
    "ambient lighting installation Miami",
    "custom Escalade lighting",
    "mobile automotive lighting Fort Lauderdale",
    "luxury vehicle customization Palm Beach",
    "mobile mechanic Birmingham",
    "Stellar Customs",
  ],
  openGraph: {
    title: `${SITE.shortName} | Luxury Mobile Automotive`,
    description: SITE.tagline,
    url: SITE_CANONICAL,
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/stellar-logo.png",
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
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
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} font-sans min-h-dvh flex flex-col`}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
