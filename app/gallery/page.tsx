import type { Metadata } from "next";
import { getGalleryImages } from "@/lib/db/public-queries";
import { GalleryClient } from "@/components/GalleryClient";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery | Before & After — Palm Beach County",
  description:
    "Portfolio of detailing, restoration, ceramic protection, starlight headliners, and custom interior work from Stellar Customs — Palm Beach County.",
  keywords: [
    "starlight headliner gallery West Palm Beach",
    "auto detailing before after Palm Beach",
    "custom car interior gallery",
  ],
  openGraph: {
    title: `Gallery | ${SITE.shortName}`,
    description: "Before/after automotive work — detailing, restoration, and customization.",
  },
};

export default async function GalleryPage() {
  const { data: dbImages, error: galleryError } = await getGalleryImages();
  return <GalleryClient dbImages={dbImages} loadError={galleryError} />;
}
