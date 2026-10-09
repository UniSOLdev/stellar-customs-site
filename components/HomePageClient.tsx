"use client";

import { HeroSection } from "@/components/HeroSection";
import { SectionReveal } from "@/components/SectionReveal";
import { GlowButton } from "@/components/GlowButton";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HomeTrustSection } from "@/components/HomeTrustSection";
import { ServiceAreasSection } from "@/components/home/ServiceAreasSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { PillarsSection } from "@/components/home/PillarsSection";
import { FloridaConditionsSection } from "@/components/home/FloridaConditionsSection";
import { SignatureOffersSection } from "@/components/home/SignatureOffersSection";
import { CustomerJourneySection } from "@/components/home/CustomerJourneySection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { GalleryImageRow } from "@/lib/db/types";
import type { HomeReviewSlide } from "@/lib/reviews-carousel-data";

type Props = {
  galleryPreview: GalleryImageRow[];
  initialReviews: HomeReviewSlide[];
};

export function HomePageClient({ galleryPreview, initialReviews }: Props) {
  const useDbGallery = galleryPreview.length > 0;

  return (
    <>
      <HeroSection />
      <HomeTrustSection />
      <PillarsSection />
      <SignatureOffersSection />
      <WhyChooseSection />
      <CustomerJourneySection />
      <FloridaConditionsSection />

      {useDbGallery ? (
        <section className="border-t border-white/[0.06] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <div className="flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <SectionHeader
                  eyebrow="Work"
                  title="Recent projects"
                  description="Completed work from the live Stellar Customs gallery."
                />
                <GlowButton href="/gallery" variant="outline" fullWidthMobile>
                  View gallery
                </GlowButton>
              </div>
            </SectionReveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {galleryPreview.slice(0, 4).map((g, i) => (
                <SectionReveal key={g.id} delay={i * 0.05}>
                  <Link href="/gallery" className="group block">
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"
                    >
                      <Image src={g.image_url} alt={g.caption || "Stellar Customs project"} fill className="object-cover transition duration-500 group-hover:scale-[1.02]" sizes="(max-width: 768px) 100vw, 25vw" />
                      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-4">
                        <span className="text-sm text-white">{g.caption || "Completed project"}</span>
                      </div>
                    </motion.div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ReviewsCarousel reviews={initialReviews} />
      <ServiceAreasSection />

      <section className="border-t border-white/[0.06] px-4 py-16 sm:px-6 sm:py-24">
        <SectionReveal className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/[0.09] bg-white/[0.035] p-7 backdrop-blur-xl sm:p-12">
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <SectionHeader
              eyebrow="Start here"
              title="Tell us about the vehicle."
              description="Send the year, make, model, requested services, and photos. We’ll confirm scope, location, and pricing."
            />
            <GlowButton href="/quote">Request a quote</GlowButton>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
