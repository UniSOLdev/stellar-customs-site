import type { Metadata } from "next";
import { getGalleryImages, getReviews, getServices } from "@/lib/db/public-queries";
import { HomePageClient } from "@/components/HomePageClient";
import { SITE, SITE_CANONICAL, BRAND_TAGLINE, SERVICE_CATEGORY_LINE } from "@/lib/site";
import { reviewsForHomeFromDb } from "@/lib/reviews-carousel-data";

const desc = `${SITE.heroHeadlineSupport}. ${SITE.subline}`;

export const metadata: Metadata = {
  title: "Palm Beach County Auto Detailing & Customization",
  description: desc,
  keywords: [
    "auto detailing West Palm Beach",
    "mobile detailing Palm Beach County",
    "ceramic coating West Palm Beach",
    "starlight headliner West Palm Beach",
    "Stellar Customs",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.shortName} | ${BRAND_TAGLINE}`,
    description: `${desc} ${SERVICE_CATEGORY_LINE}`,
    url: SITE_CANONICAL,
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
    images: [{ url: "/stellar-logo.png", width: 1200, height: 630, alt: SITE.name }],
  },
};

export default async function HomePage() {
  const [, galleryRes, reviewRows] = await Promise.all([getServices(), getGalleryImages(), getReviews()]);
  const initialReviews = reviewsForHomeFromDb(reviewRows);

  return (
    <HomePageClient
      galleryPreview={galleryRes.data}
      galleryLoadError={galleryRes.error}
      initialReviews={initialReviews}
    />
  );
}
