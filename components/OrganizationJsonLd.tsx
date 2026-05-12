import {
  SITE,
  SITE_CANONICAL,
  SERVICE_CATEGORY_LINE,
  absoluteUrl,
  sitePhoneE164,
  SOUTH_FLORIDA_MARKETS,
  ALABAMA_MARKETS,
} from "@/lib/site";

function citySchema(name: string, state: string) {
  return {
    "@type": "City" as const,
    name,
    containedInPlace: { "@type": "State" as const, name: state },
  };
}

export function OrganizationJsonLd() {
  const areaServed = [
    ...SOUTH_FLORIDA_MARKETS.map((c) => citySchema(c, "Florida")),
    ...ALABAMA_MARKETS.map((c) => citySchema(c, "Alabama")),
    {
      "@type": "AdministrativeArea" as const,
      name: "Palm Beach County",
      containedInPlace: { "@type": "State" as const, name: "Florida" },
    },
    {
      "@type": "AdministrativeArea" as const,
      name: "Broward County",
      containedInPlace: { "@type": "State" as const, name: "Florida" },
    },
    {
      "@type": "AdministrativeArea" as const,
      name: "Miami-Dade County",
      containedInPlace: { "@type": "State" as const, name: "Florida" },
    },
    {
      "@type": "AdministrativeArea" as const,
      name: "St. Clair County",
      containedInPlace: { "@type": "State" as const, name: "Alabama" },
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": ["AutomotiveBusiness", "AutoRepair"],
    "@id": `${SITE_CANONICAL}/#business`,
    name: SITE.name,
    url: SITE_CANONICAL,
    image: absoluteUrl("/stellar-logo.png"),
    description: `${SITE.tagline} ${SITE.subline} ${SERVICE_CATEGORY_LINE}`,
    telephone: sitePhoneE164(),
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.street,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      postalCode: SITE.postalCode,
      addressCountry: SITE.country,
    },
    areaServed,
    sameAs: [SITE.facebook, SITE.instagram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
