import type { Metadata } from "next";
import { getGalleryImages } from "@/lib/db/public-queries";
import { GalleryClient } from "@/components/GalleryClient";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery | Luxury Lighting & Mobile Installs",
  description:
    "Categorized portfolio of starlight headliners, ambient lighting, luxury upgrades, and mobile concierge work from Stellar Customs — South Florida to Alabama.",
  keywords: [
    "starlight headliner gallery",
    "luxury automotive lighting Miami",
    "ambient lighting install Fort Lauderdale",
    "mobile automotive gallery Alabama",
  ],
  openGraph: {
    title: `Gallery | ${SITE.shortName}`,
    description:
      "Premium installs and mobile transformations — starlight, ambient lighting, audio, and performance detailing.",
  },
};

export default async function GalleryPage() {
  const { data: dbImages, error: galleryError } = await getGalleryImages();
  return <GalleryClient dbImages={dbImages} loadError={galleryError} />;
}
