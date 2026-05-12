import type { Review } from "@/data/reviews";
import { SITE_CANONICAL } from "@/lib/site";

/** Matches `OrganizationJsonLd` — same `@id` for `itemReviewed` linkage. */
const BUSINESS_SCHEMA_ID = `${SITE_CANONICAL}/#business`;

/** Maps strings like "May 2025" to ISO date (first of month). Returns undefined if not parseable. */
export function reviewDateToIsoFirstOfMonth(dateStr: string): string | undefined {
  const t = dateStr.trim();
  const m = t.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!m) return undefined;
  const parsed = new Date(`${m[1]} 1, ${m[2]}`);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString().slice(0, 10);
}

export function reviewsJsonLdGraph(reviewsList: readonly Review[]) {
  return {
    "@context": "https://schema.org",
    "@graph": reviewsList.map((r) => {
      const iso = reviewDateToIsoFirstOfMonth(r.date);
      return {
        "@type": "Review",
        "@id": `${SITE_CANONICAL}/reviews#review-${r.id}`,
        author: {
          "@type": "Person",
          name: r.name,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody: r.text,
        ...(iso ? { datePublished: iso } : {}),
        itemReviewed: {
          "@id": BUSINESS_SCHEMA_ID,
        },
      };
    }),
  };
}
