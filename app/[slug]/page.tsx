import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { CityPageView } from "@/components/areas/CityPageView";
import { getCityBySlug } from "@/lib/business/service-areas";
import { getServiceBySlug } from "@/lib/business/services-catalog";
import { allMarketingSlugs, resolveMarketingSlug } from "@/lib/business/route-slugs";
import { absoluteUrl } from "@/lib/site";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allMarketingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolveMarketingSlug(slug);
  if (!resolved) return {};

  if (resolved.kind === "service") {
    const s = getServiceBySlug(slug)!;
    return {
      title: s.seoTitle,
      description: s.seoDescription,
      keywords: s.keywords,
      alternates: { canonical: `/${slug}` },
      openGraph: {
        title: s.seoTitle,
        description: s.seoDescription,
        url: absoluteUrl(`/${slug}`),
      },
    };
  }

  const city = getCityBySlug(slug)!;
  return {
    title: city.seoTitle,
    description: city.seoDescription,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: city.seoTitle,
      description: city.seoDescription,
      url: absoluteUrl(`/${slug}`),
    },
  };
}

export default async function MarketingSlugPage({ params }: Props) {
  const { slug } = await params;
  const resolved = resolveMarketingSlug(slug);
  if (!resolved) notFound();

  if (resolved.kind === "service") {
    const service = getServiceBySlug(slug)!;
    return (
      <>
        <ServiceJsonLd service={service} url={absoluteUrl(`/${slug}`)} />
        <ServiceDetailView service={service} />
      </>
    );
  }

  const city = getCityBySlug(slug)!;
  return <CityPageView city={city} />;
}
