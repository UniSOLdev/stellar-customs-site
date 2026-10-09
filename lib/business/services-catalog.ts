import { PRICING } from "./pricing";
import type { CatalogService, ServicePillar } from "./types";

export const PILLAR_META: Record<
  ServicePillar,
  { order: string; title: string; verb: string; summary: string; href: string }
> = {
  detail: {
    order: "01",
    title: "Detail",
    verb: "Return the vehicle to a refined baseline.",
    summary:
      "On-site detailing calibrated for Florida exposure—UV, salt air, sand, and daily use on luxury and utility vehicles alike.",
    href: "/services#detail",
  },
  restore: {
    order: "02",
    title: "Restore",
    verb: "Repair and renew worn interior and exterior surfaces.",
    summary:
      "Headliners, leather, trim, and headlights restored with the same care you expect from a dedicated studio.",
    href: "/services#restore",
  },
  protect: {
    order: "03",
    title: "Protect",
    verb: "Preserve finish, depth, and clarity over time.",
    summary:
      "Paint correction and ceramic coatings, applied with the environment and your driving habits in mind.",
    href: "/services#protect",
  },
  customize: {
    order: "04",
    title: "Customize",
    verb: "Elevate the cabin with bespoke lighting and trim.",
    summary: "Starlight headliners, ambient lighting, upholstery, and appearance upgrades.",
    href: "/services#customize",
  },
};

const FL_PAIN =
  "Designed for South Florida: UV, humidity, salt air, water spots, and interiors that see sunscreen, sand, and daily heat.";

function live(
  partial: Omit<CatalogService, "availability"> & { availability?: "live" }
): CatalogService {
  return { availability: "live", ...partial };
}

function future(
  partial: Omit<CatalogService, "availability" | "price"> & { price?: CatalogService["price"] }
): CatalogService {
  return {
    availability: "future",
    price: partial.price ?? { kind: "quote" },
    ...partial,
  };
}

export const SERVICE_CATALOG: CatalogService[] = [
  live({
    slug: "detailing",
    pillar: "detail",
    title: "Premium Auto Detailing",
    shortTitle: "Detailing",
    tagline: "Reset your vehicle the right way.",
    description: `Full-service detailing for Palm Beach County — interior, exterior, or both. ${FL_PAIN}`,
    whoItsFor: "Luxury sedans, daily drivers, SUVs, and trucks that need a true reset — not a tunnel wash.",
    problemSolved: "Built-up grime, water spots, dull paint, and interiors stained by Florida heat and daily use.",
    expectedResult: "A clean, dialed-in baseline we can maintain or build into restoration and protection.",
    timeframe: "Half day to full day depending on size and condition",
    price: { kind: "starting", amountLabel: PRICING.detailFull, pricingKey: "detailFull" },
    fulfillment: "mobile",
    seoTitle: "Auto Detailing West Palm Beach | Palm Beach County",
    seoDescription:
      "Premium auto detailing in Palm Beach County — mobile service from Jupiter to Boca. Interior, exterior, and full details. Stellar Customs.",
    keywords: ["auto detailing West Palm Beach", "car detailing Palm Beach County"],
  }),
  live({
    slug: "mobile-detailing",
    pillar: "detail",
    title: "Mobile Detailing",
    shortTitle: "Mobile Detailing",
    tagline: "We come to you.",
    description:
      "Fully equipped mobile detailing at your home, office, or gated community — maintenance through deep cleans across Palm Beach County.",
    whoItsFor: "Customers who value convenience without sacrificing quality — estates, condos, and driveways.",
    problemSolved: "No time for shop drop-offs; vehicle lives outside and gets dirty faster in Florida.",
    expectedResult: "Professional results curbside with clear scope before we start.",
    timeframe: "2–8+ hours based on package",
    price: { kind: "starting", amountLabel: PRICING.detailMaintenance, pricingKey: "detailMaintenance" },
    fulfillment: "mobile",
    seoTitle: "Mobile Detailing West Palm Beach | Palm Beach County",
    seoDescription:
      "Mobile car detailing in West Palm Beach and Palm Beach County. Premium on-site care by appointment.",
    keywords: ["mobile detailing West Palm Beach", "mobile car detailing Palm Beach Gardens"],
  }),
  live({
    slug: "interior-detailing",
    pillar: "detail",
    title: "Interior Detailing",
    shortTitle: "Interior Detailing",
    tagline: "Deep clean where Florida lives — inside the cabin.",
    description:
      "Steam, extraction, leather conditioning, pet hair, and odor treatment for cabins beaten by heat, humidity, and daily traffic.",
    whoItsFor: "Families, pet owners, and anyone with sunscreen, sand, or stains on seats and carpets.",
    problemSolved: "Odors, embedded dirt, dried leather, and stains that surface wipes cannot touch.",
    expectedResult: "A fresh interior baseline — ideal before restoration or customization.",
    timeframe: "3–6+ hours",
    price: { kind: "starting", amountLabel: PRICING.detailInteriorReset, pricingKey: "detailInteriorReset" },
    fulfillment: "mobile",
    seoTitle: "Interior Detailing Palm Beach County",
    seoDescription: "Deep interior detailing — extraction, steam, leather care — mobile in Palm Beach County.",
    keywords: ["interior detailing West Palm Beach", "auto interior cleaning Palm Beach County"],
  }),
  live({
    slug: "headliner-repair",
    pillar: "restore",
    title: "Headliner Repair & Replacement",
    shortTitle: "Headliner Repair",
    tagline: "Sagging, stained, or sun-damaged headliners fixed properly.",
    description:
      "Florida heat destroys headliner adhesive. We repair or replace with factory-clean finishes — prep for starlights or custom materials.",
    whoItsFor: "Vehicles with drooping, stained, or delaminating headliners — common on older SUVs and luxury cars.",
    problemSolved: "Embarrassing sag, odors trapped in fabric, and UV damage to cabin materials.",
    expectedResult: "Tight, uniform headliner — ready for daily use or custom upgrade.",
    timeframe: "Studio or mobile assessment; install often 1–2 days",
    price: { kind: "quote" },
    fulfillment: "both",
    seoTitle: "Headliner Repair West Palm Beach",
    seoDescription: "Headliner repair and replacement in Palm Beach County. Quote after photos/inspection.",
    keywords: ["headliner repair West Palm Beach", "headliner replacement Palm Beach County"],
  }),
  live({
    slug: "interior-restoration",
    pillar: "restore",
    title: "Interior Restoration",
    shortTitle: "Interior Restoration",
    tagline: "Bring the cabin back instead of replacing the vehicle.",
    description:
      "Seats, carpets, consoles, door panels, and trim — structured restoration for neglected or sun-damaged interiors.",
    whoItsFor: "Owners of older trucks, SUVs, and luxury vehicles who want the cabin to match how they feel about the drive.",
    problemSolved: "Cracked trim, faded leather, torn upholstery, and years of stains and odors.",
    expectedResult: "Cohesive, refreshed interior — scoped honestly with photos and inspection.",
    timeframe: "Multi-day for extensive work",
    price: { kind: "quote" },
    fulfillment: "both",
    seoTitle: "Auto Interior Restoration Palm Beach County",
    seoDescription: "Vehicle interior restoration — seats, carpet, trim — West Palm Beach and Palm Beach County.",
    keywords: ["auto interior restoration Palm Beach County", "custom car interior West Palm Beach"],
  }),
  live({
    slug: "headlight-restoration",
    pillar: "restore",
    title: "Headlight Restoration",
    shortTitle: "Headlight Restoration",
    tagline: "Clear lenses — safer night driving in Florida rain.",
    description:
      "Remove oxidation and yellowing from UV and road contamination. Finish with protection appropriate to your package.",
    whoItsFor: "Any vehicle with hazy, dull headlights — especially daily drivers parked outside.",
    problemSolved: "Reduced visibility, failed inspections, and aged appearance.",
    expectedResult: "Improved clarity and appearance; coating options discussed at quote.",
    timeframe: "1–3 hours typical",
    price: { kind: "quote" },
    fulfillment: "mobile",
    seoTitle: "Headlight Restoration West Palm Beach",
    seoDescription: "Headlight restoration mobile service Palm Beach County — oxidized lens correction.",
    keywords: ["headlight restoration West Palm Beach"],
  }),
  live({
    slug: "paint-correction",
    pillar: "protect",
    title: "Paint Correction",
    shortTitle: "Paint Correction",
    tagline: "Remove defects before you lock in protection.",
    description:
      "Single- or multi-stage correction for swirls, water spots, and clear-coat marring common on South Florida paint.",
    whoItsFor: "Dark colors, luxury vehicles, and enthusiasts who want gloss without hiding damage under wax.",
    problemSolved: "Dull, swirled, or spotted paint from washes, sun, and contaminants.",
    expectedResult: "True gloss baseline — required before long-term ceramic in most cases.",
    timeframe: "1–3 days studio typical",
    price: { kind: "range", label: PRICING.paintCorrection, pricingKey: "paintCorrection" },
    fulfillment: "studio",
    seoTitle: "Paint Correction West Palm Beach | Palm Beach County",
    seoDescription: "Professional paint correction West Palm Beach — quoted by paint condition.",
    keywords: ["paint correction West Palm Beach", "paint correction Palm Beach County"],
  }),
  live({
    slug: "ceramic-coating",
    pillar: "protect",
    title: "Ceramic Coating",
    shortTitle: "Ceramic Coating",
    tagline: "Protection built for Palm Beach sun and rain.",
    description:
      "Professional-grade ceramic protection after proper prep — easier maintenance, strong UV and chemical resistance when applied correctly.",
    whoItsFor: "Owners who keep vehicles outside and want durable protection, not monthly wax hassle.",
    problemSolved: "UV degradation, water spotting, and constant washing on coastal and sunny routes.",
    expectedResult: "Protected finish with documented care instructions — maintenance plans available after qualifying service.",
    timeframe: "1–2 days with prep",
    price: { kind: "starting", amountLabel: PRICING.ceramicEntry, pricingKey: "ceramicEntry" },
    fulfillment: "studio",
    seoTitle: "Ceramic Coating West Palm Beach | Palm Beach County",
    seoDescription: "Ceramic coating West Palm Beach — entry and multi-year packages. Palm Beach County.",
    keywords: ["ceramic coating West Palm Beach", "ceramic coating Palm Beach County"],
  }),
  live({
    slug: "starlight-headliner",
    pillar: "customize",
    title: "Starlight Headliner",
    shortTitle: "Starlight Headliner",
    tagline: "Fiber-optic night sky — installed with trim discipline.",
    description:
      "Custom starlight headliners and patterns — a signature Stellar upgrade for luxury and enthusiast builds in Palm Beach County.",
    whoItsFor: "Mercedes, BMW, Range Rover, Escalade, and custom builds seeking a premium cabin signature.",
    problemSolved: "Plain OEM headliner — you want a showroom moment every time you open the door.",
    expectedResult: "Even, controllable starfield with clean edges — vehicle-specific quote required.",
    timeframe: "Multi-day studio install typical",
    price: { kind: "starting", amountLabel: PRICING.starlightHeadliner, pricingKey: "starlightHeadliner" },
    fulfillment: "studio",
    seoTitle: "Starlight Headliner West Palm Beach",
    seoDescription: "Starlight headliner installation West Palm Beach and Palm Beach County — Stellar Customs.",
    keywords: ["starlight headliner West Palm Beach", "starlight headliner Palm Beach County"],
  }),
  live({
    slug: "ambient-lighting",
    pillar: "customize",
    title: "Ambient & Interior Lighting",
    shortTitle: "Ambient Lighting",
    tagline: "Layered cabin lighting — app-controlled where specified.",
    description: "Door, footwell, accent, and architectural lighting programs routed cleanly — no loose wires or hot spots.",
    whoItsFor: "Enthusiasts and luxury owners upgrading cabin feel alongside or beyond starlights.",
    problemSolved: "Dark, flat OEM ambiance that does not match the rest of your build.",
    expectedResult: "Even glow and reliable control — quoted per vehicle and scope.",
    timeframe: "1–3 days typical",
    price: { kind: "quote" },
    fulfillment: "both",
    seoTitle: "Custom Ambient Lighting West Palm Beach",
    seoDescription: "Interior ambient lighting installation Palm Beach County — custom automotive lighting.",
    keywords: ["ambient lighting car West Palm Beach", "custom car interior West Palm Beach"],
  }),
  // Additional catalog entries (hub / SEO) — same pillars
  live({
    slug: "maintenance-detail",
    pillar: "detail",
    title: "Maintenance Detail",
    shortTitle: "Maintenance Detail",
    tagline: "Keep condition easy between bigger jobs.",
    description: "Recurring-friendly exterior and light interior maintenance after an initial qualifying detail.",
    whoItsFor: "Gated-community and daily-driver clients who want consistent presentation.",
    problemSolved: "Florida dust, pollen, and rain marks that accumulate between deep services.",
    expectedResult: "Stable, clean baseline — gateway to Stellar Maintenance Program.",
    timeframe: "2–4 hours",
    price: { kind: "starting", amountLabel: PRICING.detailMaintenance, pricingKey: "detailMaintenance" },
    fulfillment: "mobile",
    seoTitle: "Maintenance Auto Detailing Palm Beach County",
    seoDescription: "Maintenance mobile detailing Palm Beach County — starting around published rates.",
    keywords: ["maintenance detailing Palm Beach"],
  }),
  live({
    slug: "trim-restoration",
    pillar: "restore",
    title: "Exterior Trim Restoration",
    shortTitle: "Trim Restoration",
    tagline: "Faded plastic and trim brought back.",
    description: "Restore sun-bleached exterior trim and complement with coating options where appropriate.",
    whoItsFor: "Florida-owned vehicles with chalky black trim and faded accents.",
    problemSolved: "UV-faded trim that makes otherwise clean paint look tired.",
    expectedResult: "Even, darker trim appearance — longevity depends on condition and follow-up care.",
    timeframe: "Half day typical",
    price: { kind: "quote" },
    fulfillment: "mobile",
    seoTitle: "Trim Restoration Palm Beach County",
    seoDescription: "Exterior trim restoration for sun-faded vehicles in Palm Beach County.",
    keywords: ["trim restoration Florida"],
  }),
  live({
    slug: "paint-enhancement",
    pillar: "protect",
    title: "Paint Enhancement",
    shortTitle: "Paint Enhancement",
    tagline: "Gloss boost without full correction.",
    description: "One-step enhancement for light defects — honest assessment if correction is needed instead.",
    whoItsFor: "Newer or well-kept paint needing pop before an event or sale.",
    problemSolved: "Minor dullness and light marring.",
    expectedResult: "Noticeable gloss improvement — not a substitute for heavy correction.",
    timeframe: "1 day",
    price: { kind: "starting", amountLabel: PRICING.paintEnhancement, pricingKey: "paintEnhancement" },
    fulfillment: "studio",
    seoTitle: "Paint Enhancement West Palm Beach",
    seoDescription: "Paint enhancement detailing West Palm Beach — starting around published rates.",
    keywords: ["paint enhancement Palm Beach"],
  }),
  future({
    slug: "paint-protection-film",
    pillar: "protect",
    title: "Paint Protection Film (PPF)",
    shortTitle: "PPF",
    tagline: "Coming soon — inquire for waitlist.",
    description: "Professional PPF for high-impact areas — activate when studio line is live.",
    whoItsFor: "Exotics and daily drivers needing stone-chip protection.",
    problemSolved: "Road debris on Florida highways.",
    expectedResult: "Protected impact zones when service launches.",
    fulfillment: "studio",
    seoTitle: "PPF West Palm Beach — Coming Soon",
    seoDescription: "Paint protection film Palm Beach County — join waitlist via quote form.",
    keywords: ["PPF West Palm Beach"],
  }),
  future({
    slug: "window-tint",
    pillar: "protect",
    title: "Professional Window Tint",
    shortTitle: "Window Tint",
    tagline: "Future service — Florida heat demands proper film.",
    description: "Automotive window tint — infrastructure ready; not offered until certified install is live.",
    whoItsFor: "Owners seeking heat rejection and UV protection.",
    problemSolved: "Cabin heat and UV through glass.",
    expectedResult: "Legal, quality film when activated.",
    fulfillment: "studio",
    seoTitle: "Window Tint West Palm Beach — Coming Soon",
    seoDescription: "Automotive window tint Palm Beach — request quote for future scheduling.",
    keywords: ["window tint West Palm Beach"],
  }),
];

export const SERVICE_SLUGS = SERVICE_CATALOG.map((s) => s.slug);

export function getServiceBySlug(slug: string): CatalogService | undefined {
  return SERVICE_CATALOG.find((s) => s.slug === slug);
}

export function servicesByPillar(pillar: ServicePillar): CatalogService[] {
  return SERVICE_CATALOG.filter((s) => s.pillar === pillar && s.availability === "live");
}

export function formatPrice(service: CatalogService): string {
  const p = service.price;
  if (p.kind === "quote") return "Quote required";
  if (p.kind === "range") return p.label;
  return p.amountLabel;
}

export function fulfillmentLabel(mode: CatalogService["fulfillment"]): string {
  if (mode === "mobile") return "Mobile";
  if (mode === "studio") return "Studio";
  return "Mobile or Studio";
}

/** Dedicated top-level routes for major SEO pages */
export const DEDICATED_SERVICE_ROUTES = [
  "detailing",
  "mobile-detailing",
  "interior-detailing",
  "paint-correction",
  "ceramic-coating",
  "headliner-repair",
  "starlight-headliner",
  "interior-restoration",
  "headlight-restoration",
  "ambient-lighting",
] as const;
