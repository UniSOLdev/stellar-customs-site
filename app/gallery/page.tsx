import type { Metadata } from "next";
import { getGalleryImages } from "@/lib/db/public-queries";
import { GalleryClient } from "@/components/GalleryClient";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery | Custom Automotive Lighting & Repairs",
  description:
    "Photo gallery of mobile mechanic work, custom automotive lighting Alabama, diagnostics, and on-site vehicle repair from Stellar Customs, LLC in Odenville.",
  keywords: [
    "custom automotive lighting Alabama",
    "mobile mechanic gallery",
    "Odenville automotive repair photos",
  ],
  openGraph: {
    title: `Gallery | ${SITE.name}`,
    description: "Recent repairs, lighting installs, diagnostics, and custom work from Stellar Customs.",
  },
};

export default async function GalleryPage() {
  const dbImages = await getGalleryImages();
  return <GalleryClient dbImages={dbImages} />;
}
