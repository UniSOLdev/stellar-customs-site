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

      <section className="relative border-t border-stellar-blue/10 bg-stellar-void py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Services</p>
            <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">Palm Beach County vehicle care</h2>
            <p className="mt-3 max-w-xl text-zinc-400">
              From a $200 maintenance detail to a multi-day starlight or restoration project — one team, clear quoting.
            </p>
            <div className="mt-6">
              <GlowButton href="/services" variant="outline" fullWidthMobile>
                Full services hub
              </GlowButton>
            </div>
          </SectionReveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {pillarPreview.map((pillar, pi) => {
              const meta = PILLAR_META[pillar];
              const items = servicesByPillar(pillar).slice(0, 4);
              return (
                <SectionReveal key={pillar} delay={pi * 0.06}>
                  <div className="rounded-2xl border border-white/10 bg-stellar-surface/70 p-6">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stellar-orange">{meta.order}</p>
                    <h3 className="font-display mt-2 text-xl font-bold text-white">{meta.title}</h3>
                    <ul className="mt-4 space-y-2">
                      {items.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/${s.slug}`} className="text-sm text-zinc-300 hover:text-stellar-blue">
                            {s.shortTitle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative border-t border-stellar-blue/10 bg-stellar-void py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Portfolio</p>
                <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">Before / after</h2>
                <p className="mt-3 max-w-xl text-zinc-400">
                  Real project photos populate here as you add jobs — structure ready for local SEO titles like make +
                  service + city.
                </p>
              </div>
              <GlowButton href="/gallery" variant="outline" fullWidthMobile>
                View gallery
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

      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-stellar-void via-stellar-black to-stellar-void" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="font-display text-3xl font-bold text-white">From Jupiter to Boca — Stellar comes to you</h2>
            <p className="mt-4 max-w-2xl text-zinc-400">
              Gated communities, offices, and driveways across Palm Beach County. Studio booking for starlights,
              correction, and multi-day restoration.
            </p>
          </SectionReveal>
          <SectionReveal className="mt-10">
            <GlowButton href="/quote" fullWidthMobile>
              Get My Quote
            </GlowButton>
          </SectionReveal>
        </div>
      </section>

      <section className="border-t border-stellar-blue/10 bg-stellar-void py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Store</p>
            <h2 className="font-display mt-2 text-3xl font-bold text-white">Products &amp; kits</h2>
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
