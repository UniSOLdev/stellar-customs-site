"use client";

import { HeroSection } from "@/components/HeroSection";
import { SectionReveal } from "@/components/SectionReveal";
import { GlowButton } from "@/components/GlowButton";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERY_ITEMS } from "@/lib/gallery-data";
import { HomeTrustSection } from "@/components/HomeTrustSection";
import { TransformationShowcase } from "@/components/home/TransformationShowcase";
import { ServiceAreasSection } from "@/components/home/ServiceAreasSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { StatsBarSection } from "@/components/home/StatsBarSection";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { CinematicIntro } from "@/components/cinematic-intro/CinematicIntro";
import { PillarsSection } from "@/components/home/PillarsSection";
import { FloridaConditionsSection } from "@/components/home/FloridaConditionsSection";
import { SignatureOffersSection } from "@/components/home/SignatureOffersSection";
import { CustomerJourneySection } from "@/components/home/CustomerJourneySection";
import { PILLAR_META, servicesByPillar } from "@/lib/business/services-catalog";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import type { GalleryImageRow } from "@/lib/db/types";
import type { HomeReviewSlide } from "@/lib/reviews-carousel-data";
import type { ServicePillar } from "@/lib/business/types";

type Props = {
  galleryPreview: GalleryImageRow[];
  galleryLoadError?: string | null;
  initialReviews: HomeReviewSlide[];
};

const productCategories = [
  { title: "Starlight Headliner Kits", blurb: "Fiber optics for a controlled night sky — studio install." },
  { title: "LED Interior Kits", blurb: "App-controlled ambient cabin lighting." },
  { title: "Merch", blurb: "Hoodies, tees, and hats." },
  { title: "Gift Cards", blurb: "Toward details, restoration, or custom work." },
];

export function HomePageClient({ galleryPreview, galleryLoadError, initialReviews }: Props) {
  const useDbGallery = galleryPreview.length > 0;
  const pillarPreview: ServicePillar[] = ["detail", "restore", "protect", "customize"];

  return (
    <>
      <CinematicIntro />
      <HeroSection />
      <HomeTrustSection />
      <PillarsSection />
      <FloridaConditionsSection />
      <TransformationShowcase />
      <SignatureOffersSection />
      <WhyChooseSection />
      <CustomerJourneySection />
      <StatsBarSection />
      <ReviewsCarousel reviews={initialReviews} />

      <section className="border-t border-white/[0.06] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <SectionHeader
              eyebrow="Index"
              title="Service menu"
              description="Maintenance through multi-day restoration and custom interiors — scoped per vehicle."
            />
            <div className="mt-8">
              <GlowButton href="/services" variant="outline" fullWidthMobile>
                View all services
              </GlowButton>
            </div>
          </SectionReveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {pillarPreview.map((pillar, pi) => {
              const meta = PILLAR_META[pillar];
              const items = servicesByPillar(pillar).slice(0, 4);
              return (
                <SectionReveal key={pillar} delay={pi * 0.06}>
                  <GlassCard>
                    <p className="text-xs text-zinc-600">{meta.order}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{meta.title}</h3>
                    <ul className="mt-4 space-y-2">
                      {items.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/${s.slug}`} className="text-sm text-zinc-400 hover:text-white">
                            {s.shortTitle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                eyebrow="Work"
                title="Before and after"
                description="Project photography from your gallery appears here as jobs are published."
              />
              <GlowButton href="/gallery" variant="outline" fullWidthMobile>
                Gallery
              </GlowButton>
            </div>
          </SectionReveal>

          {galleryLoadError && !useDbGallery ? (
            <div className="mt-8 rounded-xl border border-stellar-orange/35 bg-stellar-orange/10 px-4 py-3 text-sm text-stellar-orange-soft">
              Gallery couldn’t load: {galleryLoadError}
            </div>
          ) : null}

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {useDbGallery
              ? galleryPreview.slice(0, 4).map((g, i) => (
                  <SectionReveal key={g.id} delay={i * 0.06}>
                    <Link href="/gallery" className="group block">
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/5 bg-stellar-surface"
                      >
                        <Image src={g.image_url} alt={g.caption || "Project"} fill className="object-cover" sizes="25vw" />
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 p-4">
                          <span className="text-xs text-white">{g.caption || "Project"}</span>
                        </div>
                      </motion.div>
                    </Link>
                  </SectionReveal>
                ))
              : GALLERY_ITEMS.slice(0, 4).map((item, i) => (
                  <SectionReveal key={item.id} delay={i * 0.06}>
                    <Link href="/gallery" className="group block">
                      <motion.div className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br ${item.placeholderClass}`}>
                        <div className="absolute inset-0 flex flex-col justify-end p-4">
                          <span className="text-[10px] uppercase text-stellar-orange">{item.category}</span>
                          <span className="text-sm text-white">{item.title}</span>
                        </div>
                      </motion.div>
                    </Link>
                  </SectionReveal>
                ))}
          </div>
        </div>
      </section>

      <ServiceAreasSection />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <SectionHeader
              title="Mobile service, Palm Beach County"
              description="Residences, offices, and gated communities from Jupiter to Boca. Studio appointments for correction, ceramic, and headliner installs."
            />
          </SectionReveal>
          <SectionReveal className="mt-8">
            <GlowButton href="/quote" fullWidthMobile>
              Request a quote
            </GlowButton>
          </SectionReveal>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <SectionHeader eyebrow="Shop" title="Products and kits" />
          </SectionReveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((cat, i) => (
              <SectionReveal key={cat.title} delay={i * 0.05}>
                <Link href="/shop" className="block rounded-2xl border border-white/5 bg-stellar-surface p-6 hover:ring-1 hover:ring-stellar-blue/30">
                  <h3 className="font-display font-semibold text-white">{cat.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{cat.blurb}</p>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
