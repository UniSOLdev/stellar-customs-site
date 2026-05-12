/** Public URL for the hero logo (filename as provided). Encode spaces for the browser. */
export const HERO_LOGO_PATH = "/STELLAR%20CUSTUMS%20LOGO.jpg";

/** Canonical site URL for OG, JSON-LD, and metadataBase. Override with NEXT_PUBLIC_SITE_URL in production. */
function resolveSiteCanonical(): string {
  const raw = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SITE_URL : undefined;
  if (raw && raw.trim()) return raw.replace(/\/$/, "");
  return "https://stellarcustoms.com";
}

export const SITE_CANONICAL = resolveSiteCanonical();

export const SERVICE_CATEGORY_LINE =
  "Automotive Repair Shop · Mobile Mechanic · Custom Lighting";

export const SITE = {
  name: "Stellar Customs, LLC",
  tagline: "Alabama’s Most Trusted Mobile Mechanic",
  subline: "Honest. Reliable. On-Site.",
  phone: "(207) 557-4193",
  phoneDigits: "2075574193",
  email: "stellarcustoms205@gmail.com",
  location: "Odenville, Alabama",
  instagram: "https://www.instagram.com/stellarcustomsllc",
  facebook: "https://www.facebook.com/61580189581701",
  facebookReviews: "https://www.facebook.com/61580189581701/reviews",
  /** Social proof (Facebook) */
  recommendPercent: "100%",
  reviewCount: 34,
  followerCountLabel: "3.5K+",
} as const;

/** Plausible static social proof for homepage metrics (count-up section). */
export const SITE_STATS = {
  vehiclesServiced: 780,
  fiveStarReviews: SITE.reviewCount,
  yearsExperience: 8,
  /** Shown after count-up as suffix, e.g. "2" + " hrs avg" */
  responseHours: 2,
} as const;

/** `tel:` link — digits only per click-to-call spec. */
export function siteTelHref() {
  return `tel:${SITE.phoneDigits}`;
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

/** Placeholder until hours are finalized */
export const BUSINESS_HOURS_PLACEHOLDER =
  "Hours vary by appointment — message or call for same-week availability.";
