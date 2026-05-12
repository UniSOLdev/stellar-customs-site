import type { Metadata } from "next";
import { getGalleryImages, getReviews, getServices } from "@/lib/db/public-queries";
import { HomePageClient } from "@/components/HomePageClient";
import { SITE, SITE_CANONICAL, REGIONAL_PITCH } from "@/lib/site";
import { reviewsForHomeFromDb } from "@/lib/reviews-carousel-data";

const desc = `${SITE.tagline} ${SITE.subline} ${REGIONAL_PITCH}`;

export const metadata: Metadata = {
  title: "Luxury Mobile Automotive | South Florida & Alabama Lighting",
  description: desc,
  keywords: [
    "luxury automotive customization South Florida",
    "starlight headliner Alabama",
    "mobile automotive lighting South Florida",
    "ambient lighting Boca Raton",
    "custom Escalade lighting Alabama",
    "mobile mechanic Miami",
    "Stellar Customs",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.shortName} | Luxury Mobile Automotive`,
    description: desc,
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
};

export default async function HomePage() {
  const [services, galleryRes, reviewRows] = await Promise.all([
    getServices(),
    getGalleryImages(),
    getReviews(),
  ]);
  const initialReviews = reviewsForHomeFromDb(reviewRows);

  return (
    <HomePageClient
      services={services}
      galleryPreview={galleryRes.data}
      galleryLoadError={galleryRes.error}
      initialReviews={initialReviews}
    />
  );
}
