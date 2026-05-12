import type { Metadata } from "next";
import { getReviews } from "@/lib/db/public-queries";
import { ReviewsDbClient } from "@/components/ReviewsDbClient";
import { ReviewsTrustIntro } from "@/components/ReviewsTrustIntro";
import { FacebookReviewsCta } from "@/components/FacebookReviewsCta";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews | 5-Star Mobile Mechanic Alabama",
  description: `Customer reviews for ${SITE.name} — mobile mechanic Alabama, on-site vehicle repair Odenville, and custom automotive lighting Alabama.`,
  keywords: ["Stellar Customs reviews", "mobile mechanic Alabama reviews", "Odenville mechanic"],
  openGraph: {
    title: `Reviews | ${SITE.name}`,
    description: `See what clients say about ${SITE.name} mobile service and lighting installs.`,
  },
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div className="min-h-dvh bg-stellar-black pb-28 pt-28 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Reputation</p>
        <h1 className="font-display mt-2 text-4xl font-bold text-white sm:text-5xl">Reviews</h1>

        <div className="mt-10">
          <ReviewsTrustIntro />
        </div>

        <div className="mt-10">
          <FacebookReviewsCta />
        </div>

        <p className="mt-10 max-w-2xl text-zinc-400">
          Featured quotes below are curated from your Supabase dashboard. Keep them fresh — customers read every star.
        </p>

        <div className="mt-12">
          <ReviewsDbClient reviews={reviews} />
        </div>
      </div>
    </div>
  );
}
