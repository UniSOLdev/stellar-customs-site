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

export const BRAND_TAGLINE = "Detail. Restore. Protect. Customize.";

export const SERVICE_CATEGORY_LINE =
  "Palm Beach County automotive detailing, restoration, ceramic protection & custom interiors";

/** Primary regional pitch — Palm Beach County first. */
export const REGIONAL_PITCH =
  "Premium mobile detailing, vehicle restoration, ceramic protection, and custom interior work throughout Palm Beach County — from Jupiter to Boca Raton.";

export const HERO_SUBLINE =
  "Premium mobile detailing, vehicle restoration, ceramic protection and custom interior work throughout Palm Beach County.";

/** @deprecated Use lib/business/service-areas for city pages */
export const SOUTH_FLORIDA_MARKETS = [
  "West Palm Beach",
  "Palm Beach",
  "Palm Beach Gardens",
  "Jupiter",
  "Wellington",
  "Boca Raton",
] as const;

/** Secondary / legacy routes — not primary homepage messaging */
export const ALABAMA_MARKETS = [
  "Birmingham",
  "Huntsville",
  "Odenville",
] as const;

export const SITE = {
  /** Customer-facing brand */
  name: "Stellar Customs",
  legalName: "Stellar Customs, LLC",
  shortName: "Stellar Customs",
  tagline: BRAND_TAGLINE,
  /** Homepage H1 support line */
  heroHeadlineSupport: "Palm Beach County Automotive Detailing & Customization",
  subline: HERO_SUBLINE,
  phone: "(207) 557-4193",
  phoneDigits: "2075574193",
  email: "stellarcustoms205@gmail.com",
  /**
   * Primary market address for schema — update when Palm Beach studio lease is finalized.
   * Until then, use service-area business model (no public shop address).
   */
  street: "",
  city: "Palm Beach County",
  region: "FL",
  postalCode: "",
  country: "US",
  addressLine: "Palm Beach County, Florida — mobile & by appointment",
  location: "Palm Beach County, Florida",
  /** Legacy Alabama shop — optional secondary; not shown as primary */
  legacyShop: {
    street: "990 Lovejoy Terrace",
    city: "Odenville",
    region: "AL",
    postalCode: "35120",
    addressLine: "990 Lovejoy Terrace, Odenville, AL 35120",
  },
  serviceAreas: [
    "West Palm Beach",
    "Palm Beach",
    "Palm Beach Gardens",
    "North Palm Beach",
    "Jupiter",
    "Wellington",
    "Royal Palm Beach",
    "Lake Worth Beach",
    "Boynton Beach",
    "Delray Beach",
    "Boca Raton",
  ] as const,
  instagram: "https://www.instagram.com/stellarcustomsllc",
  facebook: "https://www.facebook.com/61580189581701",
  facebookReviews: "https://www.facebook.com/61580189581701/reviews",
  /** Only set true when verified — controls trust badge visibility */
  licensedAndInsured: false,
  googleRating: 5.0,
  googleRatingLabel: "5.0",
  googleReviewLabel: "Google Reviews",
  recommendPercent: "100%",
  reviewCount: 34,
  followerCountLabel: "3.5K+",
} as const;

/** Non-fabricated operational highlights for homepage (no unverified year/vehicle counts). */
export const SITE_HIGHLIGHTS = {
  primaryCounty: "Palm Beach County",
  mobileAndStudio: "Mobile + studio capability",
  responseNote: "Typical quote response within 1–2 business days",
} as const;

/** Plausible static social proof for homepage metrics (count-up section). */
export const SITE_STATS = {
  fiveStarReviews: SITE.reviewCount,
  responseHours: 2,
} as const;

export function siteTelHref() {
  return `tel:${SITE.phoneDigits}`;
}

export function siteSmsHref(body?: string) {
  const base = `sms:+1${SITE.phoneDigits}`;
  if (!body?.trim()) return base;
  return `${base}?body=${encodeURIComponent(body)}`;
}

export function sitePhoneE164() {
  return `+1${SITE.phoneDigits}`;
}

export function absoluteUrl(path: string) {
  const base = SITE_CANONICAL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

const LEGACY_ADDRESS_QUERY = encodeURIComponent(SITE.legacyShop.addressLine);

export const SITE_GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${LEGACY_ADDRESS_QUERY}`;

export const SITE_GOOGLE_MAPS_EMBED_URL = `https://maps.google.com/maps?q=${LEGACY_ADDRESS_QUERY}&z=14&output=embed`;

export const SITE_GOOGLE_REVIEW_URL = SITE_GOOGLE_MAPS_URL;

export const BUSINESS_HOURS_PLACEHOLDER =
  "By appointment — mobile routes across Palm Beach County. Studio hours posted when location opens.";

export type BusinessDay = {
  label: string;
  hours: string;
};

export const BUSINESS_HOURS: BusinessDay[] = [
  { label: "Mon – Fri", hours: "By appointment · mobile & studio" },
  { label: "Saturday", hours: "By appointment" },
  { label: "Sunday", hours: "Closed" },
];
