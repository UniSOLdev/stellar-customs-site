import type { Metadata } from "next";
import { ReviewCard } from "@/components/ReviewCard";
import { FacebookReviewsCta } from "@/components/FacebookReviewsCta";
import { FacebookIcon } from "@/components/icons/SocialIcons";
import { reviews } from "@/data/reviews";
import { reviewsJsonLdGraph } from "@/lib/reviewsJsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews | Luxury Mobile Automotive — South Florida & Alabama",
  description: `Verified customer reviews for ${SITE.name} — luxury mobile installs, ambient lighting, and concierge repair across South Florida and Alabama.`,
  keywords: [
    "Stellar Customs reviews",
    "luxury mobile automotive reviews Miami",
    "mobile mechanic reviews Birmingham",
    "Facebook verified reviews",
  ],
  openGraph: {
    title: `Reviews | ${SITE.shortName}`,
    description: `See what clients say about ${SITE.shortName} mobile luxury service and lighting installs.`,
  },
};

export default function ReviewsPage() {
  const reviewsLd = reviewsJsonLdGraph(reviews);

  return (
    <div className="min-h-dvh bg-stellar-black pb-40 pt-28 md:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Reputation</p>

        <h1 className="font-display mt-4 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          100% Recommend <span className="text-stellar-blue">(34 Reviews)</span>
        </h1>

        <p className="mx-auto mt-4 flex items-center justify-center gap-2 text-center text-sm text-zinc-500">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#1877F2]/30 bg-[#1877F2]/10 text-[#1877F2]">
            <FacebookIcon className="h-3.5 w-3.5" aria-hidden />
          </span>
          <span>Verified on Facebook</span>
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <ReviewCard
              key={r.id}
              name={r.name}
              rating={r.rating}
              date={r.date}
              text={r.text}
              source={r.source}
            />
          ))}
        </div>

        <div className="mt-14 flex justify-center border-t border-white/5 pt-12">
          <FacebookReviewsCta />
        </div>
      </div>
    </div>
  );
}
