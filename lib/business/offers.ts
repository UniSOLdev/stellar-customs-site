import { PRICING } from "./pricing";

export const STELLAR_RESET = {
  id: "stellar-reset",
  title: "The Stellar Reset",
  subtitle: "For vehicles that need more than a detail.",
  description:
    "A structured package for neglected or heavily used vehicles — scoped after photos and inspection, not a flat menu price.",
  components: [
    "Full interior deep clean",
    "Steam & extraction",
    "Leather cleaning / conditioning",
    "Stain & odor treatment",
    "Exterior decontamination",
    "Trim assessment & restoration where needed",
    "Headlight restoration (if required)",
    "Paint assessment for next-step protection",
  ],
  priceNote: `${PRICING.detailDeepRestoration} · Inspection / photos required`,
  cta: "/quote",
} as const;

export const PROTECTION_LADDER = [
  {
    step: "Gloss",
    title: "Paint Enhancement",
    body: "One-step gloss for light defects — we tell you if correction is needed instead.",
    price: PRICING.paintEnhancement,
  },
  {
    step: "Correct",
    title: "Paint Correction",
    body: "Remove swirls and water-spot marring common on Palm Beach daily drivers.",
    price: PRICING.paintCorrection,
  },
  {
    step: "Protect",
    title: "Professional Ceramic",
    body: "UV, heat, rain, and contaminants — ceramic makes maintenance saner when prep is done right.",
    price: `${PRICING.ceramicEntry} · ${PRICING.ceramicMultiYear}`,
  },
  {
    step: "Maintain",
    title: "Stellar Maintenance Program",
    body: "Recurring exterior/interior maintenance after a qualifying initial service — priority scheduling, custom cadence.",
    price: "Quote · vehicle, frequency & location",
  },
] as const;

export const CUSTOM_INTERIOR_OFFER = {
  title: "Stellar Custom Interior",
  subtitle: "Transform the cabin — not just clean it.",
  items: [
    "Headliner replacement or repair",
    "Starlight headliner",
    "Custom materials & colors",
    "Ambient & architectural lighting",
    "Trim accents",
    "Seat, console & door panel restoration",
  ],
  note: "Studio-heavy work with mobile consult available.",
  cta: "/quote",
} as const;

export const MAINTENANCE_PROGRAM = {
  title: "Stellar Maintenance Program",
  availableAfter: "Initial qualifying detail or protection service",
  cadence: ["Every 2 weeks", "Monthly", "Custom"],
  benefits: [
    "Priority scheduling",
    "Consistent vehicle condition",
    "Lower effort each visit",
    "Interior & exterior maintenance",
  ],
  pricingNote: "Not unlimited detailing — priced by vehicle, frequency, location, and condition.",
} as const;

export const CUSTOMER_JOURNEY = [
  { step: "Detail", desc: "Establish a clean baseline" },
  { step: "Restore", desc: "Fix headliners, trim, headlights, interior wear" },
  { step: "Correct", desc: "Paint correction when defects warrant it" },
  { step: "Protect", desc: "Ceramic and coatings for Florida exposure" },
  { step: "Customize", desc: "Starlights, lighting, upholstery" },
  { step: "Maintain", desc: "Recurring program to protect your investment" },
] as const;

/** South Florida pain points — use in copy blocks */
export const FLORIDA_VEHICLE_PAIN_POINTS = [
  "Extreme UV and heat fading paint and trim",
  "Salt and coastal air accelerating corrosion and spotting",
  "Humidity and rain driving odors and mildew risk in cabins",
  "Sand, sunscreen, and oils on leather and plastics",
  "Tree sap, bugs, and road film on daily commutes",
  "Water spots from sprinklers and hard water",
  "Oxidized headlights and chalky exterior trim",
  "High-use SUVs and trucks that never get a true deep clean",
] as const;
