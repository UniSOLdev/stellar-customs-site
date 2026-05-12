import type { Metadata } from "next";
import { getProducts } from "@/lib/db/public-queries";
import { ShopClient } from "@/components/ShopClient";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop | Lighting Kits & Merch",
  description:
    "Official Stellar Customs shop — merch, starlight and LED lighting kits, and install-ready products for Alabama customers.",
  keywords: ["Stellar Customs shop", "automotive lighting kits Alabama", "LED interior kits"],
  openGraph: {
    title: `Shop | ${SITE.name}`,
    description: "Merch, lighting kits, and install products from Stellar Customs.",
  },
};

export default async function ShopPage() {
  const dbProducts = await getProducts();
  return <ShopClient dbProducts={dbProducts} />;
}
