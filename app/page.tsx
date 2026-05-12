import type { Metadata } from "next";
import { getGalleryImages, getReviews, getServices } from "@/lib/db/public-queries";
import { HomePageClient } from "@/components/HomePageClient";
import { SITE, SITE_CANONICAL } from "@/lib/site";
import { reviewsForHomeFromDb } from "@/lib/reviews-carousel-data";

const desc = `${SITE.tagline} ${SITE.subline} Mobile Mechanic Alabama, custom automotive lighting Alabama, and on-site vehicle repair Odenville — honest diagnostics and professional lighting installs.`;

export const metadata: Metadata = {
  title: "Mobile Mechanic Alabama | Custom Lighting & On-Site Repair",
  description: desc,
  keywords: [
    "mobile mechanic Alabama",
    "custom automotive lighting Alabama",
    "on-site vehicle repair Odenville",
    "Odenville mobile mechanic",
    "automotive lighting install",
    "Stellar Customs",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} | Mobile Mechanic Alabama`,
    description: desc,
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
};

export default async function HomePage() {
  const [services, gallery, reviewRows] = await Promise.all([
    getServices(),
    getGalleryImages(),
    getReviews(),
  ]);
  const initialReviews = reviewsForHomeFromDb(reviewRows);

  return (
    <HomePageClient services={services} galleryPreview={gallery} initialReviews={initialReviews} />
  );
}
