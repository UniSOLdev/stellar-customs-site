import { SITE, SITE_CANONICAL, SERVICE_CATEGORY_LINE, absoluteUrl, sitePhoneE164 } from "@/lib/site";
import { CITY_PAGES } from "@/lib/business/service-areas";
import { STELLAR_STUDIO } from "@/lib/business/studio";

export function OrganizationJsonLd() {
  const areaServed = [
    {
      "@type": "AdministrativeArea" as const,
      name: "Palm Beach County",
      containedInPlace: { "@type": "State" as const, name: "Florida" },
    },
    ...CITY_PAGES.map((c) => ({
      "@type": "City" as const,
      name: c.name,
      containedInPlace: { "@type": "State" as const, name: "Florida" },
    })),
  ];

  const address =
    SITE.street && SITE.postalCode
      ? {
          "@type": "PostalAddress" as const,
          streetAddress: SITE.street,
          addressLocality: SITE.city,
          addressRegion: SITE.region,
          postalCode: SITE.postalCode,
          addressCountry: SITE.country,
        }
      : {
          "@type": "PostalAddress" as const,
          addressLocality: "Palm Beach County",
          addressRegion: "FL",
          addressCountry: "US",
        };

  const schema = {
    "@context": "https://schema.org",
    "@type": ["AutomotiveBusiness", "AutoRepair"],
    "@id": `${SITE_CANONICAL}/#business`,
    name: SITE.name,
    url: SITE_CANONICAL,
    image: absoluteUrl("/stellar-logo.png"),
    description: `${SERVICE_CATEGORY_LINE}. ${SITE.subline}`,
    telephone: sitePhoneE164(),
    email: SITE.email,
    address,
    areaServed,
    ...(STELLAR_STUDIO.published && STELLAR_STUDIO.streetAddress
      ? {
          department: {
            "@type": "AutomotiveBusiness",
            name: STELLAR_STUDIO.name,
            address: {
              "@type": "PostalAddress",
              streetAddress: STELLAR_STUDIO.streetAddress,
              addressLocality: STELLAR_STUDIO.city,
              addressRegion: STELLAR_STUDIO.region,
              postalCode: STELLAR_STUDIO.postalCode,
              addressCountry: "US",
            },
          },
        }
      : {}),
    sameAs: [SITE.facebook, SITE.instagram],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
