/** Public URL for brand logo (transparent PNG, optimized for web). */
export const HERO_LOGO_PATH = "/stellar-logo.png";

/** Intrinsic width / height of `stellar-logo.png` (trimmed artwork). Used for layout aspect ratio. */
export const LOGO_ASPECT_WIDTH = 768;
export const LOGO_ASPECT_HEIGHT = 460;

/** Canonical site URL for OG, JSON-LD, and metadataBase. Override with NEXT_PUBLIC_SITE_URL in production. */
function resolveSiteCanonical(): string {
  const raw = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SITE_URL : undefined;
  if (raw && raw.trim()) return raw.replace(/\/$/, "");
  return "https://stellarcustoms.com";
}

export const SITE_CANONICAL = resolveSiteCanonical();

export const SERVICE_CATEGORY_LINE =
  "Luxury mobile automotive · Custom lighting · Concierge diagnostics";

const ADDRESS_LINE = "990 Lovejoy Terrace, Odenville, AL 35120";

/** Primary luxury positioning — dual region without keyword stuffing. */
export const REGIONAL_PITCH =
  "Mobile luxury automotive services across South Florida and Alabama — from Palm Beach and Miami to Birmingham and Huntsville.";

export const SOUTH_FLORIDA_MARKETS = [
  "Palm Beach",
  "Boca Raton",
  "Miami",
  "Fort Lauderdale",
  "West Palm Beach",
] as const;

export const ALABAMA_MARKETS = [
  "Birmingham",
  "Huntsville",
  "Mobile",
  "Montgomery",
  "Odenville",
  "Trussville",
  "Moody",
  "Pell City",
] as const;

export const SITE = {
  /** Customer-facing brand (matches Google Business Profile). */
  name: "Stellar Customs & Mobile Repair",
  /** Legal entity — used for copyright + schema legalName. */
  legalName: "Stellar Customs, LLC",
  /** Compact brand variant for tight UI. */
  shortName: "Stellar Customs",
  tagline: "Luxury Mobile Automotive — South Florida & Alabama",
  subline: "Concierge diagnostics, ambient lighting, and on-site installs — with the restraint of a premium shop.",
  phone: "(207) 557-4193",
  phoneDigits: "2075574193",
  email: "stellarcustoms205@gmail.com",
  /** Address parts (also used in JSON-LD PostalAddress). */
  street: "990 Lovejoy Terrace",
  city: "Odenville",
  region: "AL",
  postalCode: "35120",
  country: "US",
  /** Single-line postal address for copy + embeds. */
  addressLine: ADDRESS_LINE,
  /** Short human location label. */
  location: "Odenville, Alabama",
  /** Legacy combined list — prefer SOUTH_FLORIDA_MARKETS + ALABAMA_MARKETS in UI. */
  serviceAreas: [
    "Miami",
    "Fort Lauderdale",
    "West Palm Beach",
    "Birmingham",
    "Huntsville",
    "Odenville",
    "Trussville",
    "Moody",
    "Pell City",
  ] as const,
  instagram: "https://www.instagram.com/stellarcustomsllc",
  facebook: "https://www.facebook.com/61580189581701",
  facebookReviews: "https://www.facebook.com/61580189581701/reviews",
  /** Google rating shown in trust UI (kept in sync with GBP). */
  googleRating: 5.0,
  googleRatingLabel: "5.0",
  googleReviewLabel: "Google Reviews",
  /** Facebook social proof. */
  recommendPercent: "100%",
  reviewCount: 34,
  followerCountLabel: "3.5K+",
} as const;

/** Plausible static social proof for homepage metrics (count-up section). */
export const SITE_STATS = {
  vehiclesCustomized: 780,
  fiveStarReviews: SITE.reviewCount,
  yearsExperience: 8,
  /** Shown after count-up as suffix, e.g. "2" + " hrs avg" */
  responseHours: 2,
} as const;

/** `tel:` link — digits only per click-to-call spec. */
export function siteTelHref() {
  return `tel:${SITE.phoneDigits}`;
}

/** SMS deep link (US). */
export function siteSmsHref(body?: string) {
  const base = `sms:+1${SITE.phoneDigits}`;
  if (!body?.trim()) return base;
  return `${base}?body=${encodeURIComponent(body)}`;
}

/** E.164 for structured data */
export function sitePhoneE164() {
  return `+1${SITE.phoneDigits}`;
}

export function absoluteUrl(path: string) {
  const base = SITE_CANONICAL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

const ADDRESS_QUERY = encodeURIComponent(ADDRESS_LINE);

/** Public Google Maps deep link to the shop. */
export const SITE_GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${ADDRESS_QUERY}`;

/**
 * Lazy-loadable Maps embed URL — no API key required for the basic search variant.
 * Pair with `<iframe loading="lazy" />` for responsive embeds.
 */
export const SITE_GOOGLE_MAPS_EMBED_URL = `https://maps.google.com/maps?q=${ADDRESS_QUERY}&z=14&output=embed`;

/**
 * Official Google review CTA URL.
 *
 * TODO (Eli): paste your real Google Business Profile review link here.
 *   1. Open your GBP dashboard → "Ask for reviews" → "Copy link".
 *   2. The link looks like `https://g.page/r/XXXXXXXXXXXXXXX/review`.
 *
 * Until then we fall back to the Maps listing so the CTA still opens your profile.
 */
export const SITE_GOOGLE_REVIEW_URL = SITE_GOOGLE_MAPS_URL;

/** Placeholder until hours are finalized */
export const BUSINESS_HOURS_PLACEHOLDER =
  "Hours vary by appointment — message or call for same-week availability.";

/** Structured weekly hours used in the footer + LocalBusiness schema. */
export type BusinessDay = {
  label: string;
  hours: string;
};

export const BUSINESS_HOURS: BusinessDay[] = [
  { label: "Mon – Fri", hours: "By appointment · same-week" },
  { label: "Saturday", hours: "By appointment" },
  { label: "Sunday", hours: "Closed" },
];
