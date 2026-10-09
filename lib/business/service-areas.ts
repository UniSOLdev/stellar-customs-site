import type { CityPage } from "./types";

/** Primary Palm Beach County service cities — order reflects routing priority. */
export const PALM_BEACH_CITY_SLUGS = [
  "west-palm-beach",
  "palm-beach",
  "palm-beach-gardens",
  "north-palm-beach",
  "singer-island",
  "riviera-beach",
  "jupiter",
  "wellington",
  "royal-palm-beach",
  "lake-worth-beach",
  "boynton-beach",
  "delray-beach",
  "boca-raton",
] as const;

export type CitySlug = (typeof PALM_BEACH_CITY_SLUGS)[number];

export const CITY_PAGES: CityPage[] = [
  {
    slug: "west-palm-beach",
    name: "West Palm Beach",
    county: "Palm Beach County",
    headline: "Mobile detailing & customization in West Palm Beach",
    intro:
      "From downtown high-rises to Northwood driveways, we bring premium detailing, restoration, and protection to your schedule — without the car-wash rush.",
    localAngle:
      "Coastal humidity, intense sun on parked cars, and road grime from I-95 wear finishes fast. We focus on UV-safe protection and interior resets that stand up to daily Florida use.",
    neighborhoods: ["Northwood", "El Cid", "Flamingo Park", "Grandview Heights"],
    seoTitle: "Auto Detailing West Palm Beach | Mobile Car Detailing",
    seoDescription:
      "Premium mobile auto detailing, paint correction, ceramic coating, and interior restoration in West Palm Beach. Stellar Customs — Detail. Restore. Protect. Customize.",
  },
  {
    slug: "palm-beach",
    name: "Palm Beach",
    county: "Palm Beach County",
    headline: "Discreet mobile automotive care on Palm Beach",
    intro:
      "White-glove mobile service for residents and seasonal vehicles — careful processes, clear communication, and results that respect your time and your driveway.",
    localAngle:
      "Salt air, sun, and limited garage space mean exteriors oxidize and interiors collect sunscreen and moisture. We tailor maintenance and protection to how your vehicle is actually used.",
    seoTitle: "Car Detailing Palm Beach | Luxury Mobile Detailing",
    seoDescription:
      "Premium mobile detailing and vehicle restoration serving Palm Beach. Ceramic protection, interior restoration, and custom cabin work by Stellar Customs.",
  },
  {
    slug: "palm-beach-gardens",
    name: "Palm Beach Gardens",
    county: "Palm Beach County",
    headline: "Detailing & protection for Palm Beach Gardens",
    intro:
      "Family SUVs, luxury sedans, and daily drivers in PGA corridor communities — we reset interiors, restore faded trim, and protect paint from Florida UV.",
    localAngle:
      "Tree sap, pollen, and afternoon storms leave water spots on paint. Our decontamination and coating paths are built for vehicles that live outside in the Gardens.",
    seoTitle: "Mobile Car Detailing Palm Beach Gardens",
    seoDescription:
      "Mobile auto detailing, ceramic coating, and interior restoration in Palm Beach Gardens. Quote-based pricing for condition-dependent work.",
  },
  {
    slug: "jupiter",
    name: "Jupiter",
    county: "Palm Beach County",
    headline: "Jupiter mobile detailing & vehicle restoration",
    intro:
      "From Abacoa to waterfront neighborhoods, we service Jupiter with mobile details and studio-capable restoration for headliners, paint, and custom interiors.",
    localAngle:
      "Coastal salt and sand track into cabins and scratch soft trim. We extract, condition leather, and restore headlights dulled by years of Atlantic sun.",
    seoTitle: "Mobile Detailing Jupiter FL | Car Detailing",
    seoDescription:
      "Premium mobile detailing Jupiter — paint correction, ceramic coating, headliner repair, and starlight installs. Stellar Customs Palm Beach County.",
  },
  {
    slug: "wellington",
    name: "Wellington",
    county: "Palm Beach County",
    headline: "Wellington auto detailing — trucks, SUVs & daily drivers",
    intro:
      "High-use vehicles deserve more than a quick wash. We deep-clean interiors, remove pet hair, and restore neglected cabins without making you feel judged for how you use your truck.",
    localAngle:
      "Dust, arena traffic, and outdoor parking beat up large SUVs and trucks. Our deep interior resets and maintenance plans keep family haulers presentable year-round.",
    seoTitle: "Car Detailing Wellington FL | Interior Restoration",
    seoDescription:
      "Mobile car detailing Wellington — deep interior resets, extraction, trim restoration, and ceramic protection. Stellar Customs.",
  },
  {
    slug: "boca-raton",
    name: "Boca Raton",
    county: "Palm Beach County",
    headline: "Boca Raton detailing, correction & ceramic protection",
    intro:
      "South Palm Beach County customers who want one team for maintenance details through multi-stage correction and long-term ceramic protection.",
    localAngle:
      "Hard water spotting and sun-faded clear coat show up fast on dark paint. We assess honestly and quote correction and coating based on real paint condition — not upsell scripts.",
    seoTitle: "Ceramic Coating Boca Raton | Auto Detailing",
    seoDescription:
      "Auto detailing Boca Raton — paint correction, ceramic coating, mobile detailing, and custom interior work. Palm Beach County based Stellar Customs.",
  },
  {
    slug: "delray-beach",
    name: "Delray Beach",
    county: "Palm Beach County",
    headline: "Delray Beach mobile auto detailing",
    intro:
      "Atlantic Avenue to suburban enclaves — mobile premium detailing and restoration with studio support for larger projects.",
    localAngle:
      "Humidity and coastal contaminants accelerate interior wear and exterior water spots. Protection packages are designed for vehicles parked outside near the coast.",
    seoTitle: "Mobile Detailing Delray Beach | Car Detailing",
    seoDescription:
      "Mobile detailing Delray Beach — interior restoration, paint enhancement, ceramic coatings. Stellar Customs Palm Beach County.",
  },
  {
    slug: "boynton-beach",
    name: "Boynton Beach",
    county: "Palm Beach County",
    headline: "Boynton Beach car detailing & restoration",
    intro:
      "Straightforward quotes, capable work — from maintenance details to headliner repair and headlight restoration for daily drivers and luxury vehicles alike.",
    localAngle:
      "Bug splatter, road film, and oxidized headlights are common on commuter routes. We restore clarity and protect what matters for Florida driving.",
    seoTitle: "Car Detailing Boynton Beach | Mobile Detailing",
    seoDescription:
      "Auto detailing Boynton Beach — mobile service, headlight restoration, interior deep cleans. Stellar Customs.",
  },
  {
    slug: "north-palm-beach",
    name: "North Palm Beach",
    county: "Palm Beach County",
    headline: "North Palm Beach mobile detailing",
    intro: "Gated communities and waterfront homes — we come to you for scheduled maintenance and full details.",
    localAngle: "Convenience without cutting corners: safe products, careful leather work, and trim restoration for sun-bleached plastics.",
    seoTitle: "Mobile Detailing North Palm Beach",
    seoDescription: "Premium mobile auto detailing North Palm Beach — Stellar Customs Palm Beach County.",
  },
  {
    slug: "singer-island",
    name: "Singer Island",
    county: "Palm Beach County",
    headline: "Singer Island vehicle detailing & protection",
    intro: "Coastal living means salt, sun, and spotted paint — we decontaminate, correct where appropriate, and protect for easier upkeep.",
    localAngle: "High-rise and condo parking often means constant UV exposure. Coatings and maintenance cadence matter more here than a monthly rinse.",
    seoTitle: "Auto Detailing Singer Island | Ceramic Coating",
    seoDescription: "Mobile detailing Singer Island — paint protection and interior care. Stellar Customs.",
  },
  {
    slug: "riviera-beach",
    name: "Riviera Beach",
    county: "Palm Beach County",
    headline: "Riviera Beach auto appearance & restoration",
    intro: "Home-base corridor for Stellar Customs mobile routes and our upcoming studio capability — restoration-heavy work welcome.",
    localAngle: "Industrial road film and coastal air combine on daily drivers. We specialize in bringing neglected vehicles back without replacing them.",
    seoTitle: "Car Detailing Riviera Beach FL",
    seoDescription: "Auto detailing Riviera Beach — restoration, mobile detailing, custom interiors. Stellar Customs.",
  },
  {
    slug: "royal-palm-beach",
    name: "Royal Palm Beach",
    county: "Palm Beach County",
    headline: "Royal Palm Beach mobile car detailing",
    intro: "Suburban SUVs, work trucks, and family vehicles — premium detailing that respects your budget and your schedule.",
    localAngle: "Sand from fields and parks, plus Florida rain, mean dirty carpets and stained seats. Extraction and odor treatment are core services here.",
    seoTitle: "Mobile Car Detailing Royal Palm Beach",
    seoDescription: "Detailing Royal Palm Beach — interior resets, pet hair, maintenance plans. Stellar Customs.",
  },
  {
    slug: "lake-worth-beach",
    name: "Lake Worth Beach",
    county: "Palm Beach County",
    headline: "Lake Worth Beach detailing & interior care",
    intro: "Art district to beachside — mobile detailing with honest scoping for older vehicles and luxury alike.",
    localAngle: "Older clear coat and faded trim are fixable. Restoration beats replacement when the structure of the vehicle is sound.",
    seoTitle: "Auto Detailing Lake Worth Beach",
    seoDescription: "Mobile auto detailing Lake Worth Beach — restoration and protection. Stellar Customs.",
  },
];

export function getCityBySlug(slug: string): CityPage | undefined {
  return CITY_PAGES.find((c) => c.slug === slug);
}

export const PRIMARY_COUNTY_LABEL = "Palm Beach County, Florida";

export const SERVICE_AREA_DISPLAY_NAMES = CITY_PAGES.map((c) => c.name);
