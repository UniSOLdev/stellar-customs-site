import type { CatalogService } from "@/lib/business/types";
import { formatPrice } from "@/lib/business/services-catalog";
import { SITE, sitePhoneE164 } from "@/lib/site";
import { PRIMARY_COUNTY_LABEL } from "@/lib/business/service-areas";

type Props = { service: CatalogService; url: string };

export function ServiceJsonLd({ service, url }: Props) {
  if (service.availability !== "live") return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url,
    provider: {
      "@type": "AutomotiveBusiness",
      name: SITE.name,
      telephone: sitePhoneE164(),
      areaServed: PRIMARY_COUNTY_LABEL,
    },
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        description: formatPrice(service),
      },
      availability: "https://schema.org/InStock",
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
