import { SITE, SITE_CANONICAL, SERVICE_CATEGORY_LINE, absoluteUrl, sitePhoneE164 } from "@/lib/site";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["AutomotiveBusiness", "AutoRepair"],
    "@id": `${SITE_CANONICAL}/#business`,
    name: SITE.name,
    url: SITE_CANONICAL,
    image: absoluteUrl("/STELLAR%20CUSTUMS%20LOGO.jpg"),
    description: `${SITE.tagline} ${SITE.subline} ${SERVICE_CATEGORY_LINE}`,
    telephone: sitePhoneE164(),
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Odenville",
      addressRegion: "AL",
      addressCountry: "US",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Odenville",
        containedInPlace: { "@type": "State", name: "Alabama" },
      },
      {
        "@type": "City",
        name: "Pell City",
        containedInPlace: { "@type": "State", name: "Alabama" },
      },
      {
        "@type": "City",
        name: "Moody",
        containedInPlace: { "@type": "State", name: "Alabama" },
      },
      {
        "@type": "City",
        name: "Trussville",
        containedInPlace: { "@type": "State", name: "Alabama" },
      },
      {
        "@type": "AdministrativeArea",
        name: "St. Clair County",
        containedInPlace: { "@type": "State", name: "Alabama" },
      },
    ],
    sameAs: [SITE.facebook, SITE.instagram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
