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
    default: `${SITE.name} | Mobile Mechanic Alabama`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.tagline}. ${SITE.subline} Professional on-site automotive repair serving Odenville and surrounding Alabama communities.`,
  keywords: [
    "mobile mechanic",
    "Alabama",
    "Odenville",
    "automotive repair",
    "Stellar Customs",
    "on-site mechanic",
    "custom automotive lighting Alabama",
    "on-site vehicle repair Odenville",
  ],
  openGraph: {
    title: SITE.name,
    description: SITE.tagline,
    url: SITE_CANONICAL,
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/STELLAR%20CUSTUMS%20LOGO.jpg",
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
