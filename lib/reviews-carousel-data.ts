import type { ReviewRow } from "@/lib/db/types";
import { REVIEWS } from "@/lib/reviews-data";

/** Shape for homepage carousel + optional future Supabase fields */
export type HomeReviewSlide = {
  id: string;
  customer_name: string;
  service_type: string;
  review_text: string;
  rating: number;
};

const SERVICE_BY_REVIEW_ID: Record<string, string> = {
  r1: "Mobile diagnostics",
  r2: "On-site repair",
  r3: "Custom interior lighting",
  r4: "Brake service",
  r5: "General maintenance",
  r6: "Starlight headliner",
};

export const STATIC_HOME_REVIEWS: HomeReviewSlide[] = REVIEWS.map((r) => ({
  id: r.id,
  customer_name: r.name.replace(/\.$/, ""),
  service_type: SERVICE_BY_REVIEW_ID[r.id] ?? "Automotive service",
  review_text: r.quote,
  rating: r.rating,
}));

export function reviewsForHomeFromDb(rows: ReviewRow[]): HomeReviewSlide[] {
  if (!rows.length) return STATIC_HOME_REVIEWS;
  return rows.map((row) => ({
    id: row.id,
    customer_name: row.customer_name,
    service_type: "Customer review",
    review_text: row.review_text,
    rating: row.rating,
  }));
}
