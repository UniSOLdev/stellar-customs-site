import type { Metadata } from "next";
import { ReviewCard } from "@/components/ReviewCard";
import { FacebookReviewsCta } from "@/components/FacebookReviewsCta";
import { FacebookIcon } from "@/components/icons/SocialIcons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { reviews } from "@/data/reviews";
import { reviewsJsonLdGraph } from "@/lib/reviewsJsonLd";
import { CONCIERGE } from "@/lib/concierge-copy";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews | Palm Beach County Detailing & Customization",
  description: `Client feedback for ${SITE.name} — mobile detailing, restoration, ceramic protection, and custom interior work in Palm Beach County.`,
  keywords: [
    "Stellar Customs reviews",
    "auto detailing reviews West Palm Beach",
    "mobile detailing reviews Palm Beach County",
    "Facebook verified reviews",
  ],
  openGraph: {
    title: `Reviews | ${SITE.shortName}`,
    description: `What clients say about ${SITE.shortName} in Palm Beach County.`,
  },
};

export default function ReviewsPage() {
  const reviewsLd = reviewsJsonLdGraph(reviews);

  return (
    <div className="min-h-dvh bg-stellar-black pb-24 pt-28 md:pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsLd) }} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Client feedback"
          title={`${SITE.recommendPercent} of clients recommend us`}
          description={`${CONCIERGE.reviewsIntro} ${SITE.reviewCount} reviews on Facebook.`}
        />

        <p className="mt-6 flex items-center gap-2 text-sm text-zinc-500">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#1877F2]">
            <FacebookIcon className="h-4 w-4" aria-hidden />
          </span>
          Verified on Facebook
        </p>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <ReviewCard key={r.id} name={r.name} rating={r.rating} date={r.date} text={r.text} source={r.source} />
          ))}
        </div>

        <div className="mt-14 flex justify-center border-t border-white/[0.06] pt-12">
          <FacebookReviewsCta />
        </div>
      </div>
    </div>
  );
}
