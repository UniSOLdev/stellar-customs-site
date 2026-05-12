"use client";

import { HeroSection } from "@/components/HeroSection";
import { SectionReveal } from "@/components/SectionReveal";
import { GlowButton } from "@/components/GlowButton";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERY_ITEMS } from "@/lib/gallery-data";
import { HomeTrustSection } from "@/components/HomeTrustSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { StatsBarSection } from "@/components/home/StatsBarSection";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import type { GalleryImageRow, ServiceRow } from "@/lib/db/types";
import type { HomeReviewSlide } from "@/lib/reviews-carousel-data";

const productCategories = [
  { title: "Merch", blurb: "Print-on-demand hoodies, tees, and hats." },
  { title: "Starlight Headliner Kits", blurb: "Fiber optics that turn your roof into a night sky." },
  { title: "LED Interior Kits", blurb: "App-controlled ambient cabin lighting." },
  { title: "Underglow Kits", blurb: "Street-legal RGB underbody accents." },
  { title: "Gift Cards", blurb: "The perfect gift for any build." },
];

type Props = {
  services: ServiceRow[];
  galleryPreview: GalleryImageRow[];
  initialReviews: HomeReviewSlide[];
};

export function HomePageClient({ services, galleryPreview, initialReviews }: Props) {
  const useDbGallery = galleryPreview.length > 0;
  return (
    <>
      <HeroSection />

      <HomeTrustSection />

      <WhyChooseSection />

      <StatsBarSection />

      <ReviewsCarousel reviews={initialReviews} />

      {/* Services from Supabase */}
      <section className="relative border-t border-stellar-blue/10 bg-stellar-void py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Services</p>
                <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">What we offer</h2>
                <p className="mt-3 max-w-xl text-zinc-400">
                  {services.length > 0
                    ? "Live from your admin dashboard — update anytime."
                    : "Add services in Admin to show your menu here. Until then, book a call and we’ll tailor the job to your vehicle."}
                </p>
              </div>
              <div className="w-full shrink-0 md:w-auto">
                <GlowButton href="/booking" variant="outline" fullWidthMobile>
                  Book now
                </GlowButton>
              </div>
            </div>
          </SectionReveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(services.length > 0 ? services.slice(0, 6) : []).map((s, i) => (
              <SectionReveal key={s.id} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="h-full rounded-2xl border border-white/5 bg-stellar-surface/80 p-6 shadow-lg shadow-black/40 backdrop-blur-sm"
                >
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-stellar-blue to-stellar-orange" />
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
                  {s.price ? (
                    <p className="mt-2 text-sm font-bold uppercase tracking-wider text-stellar-blue">{s.price}</p>
                  ) : null}
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.description ?? ""}</p>
                </motion.div>
              </SectionReveal>
            ))}
            {services.length === 0 ? (
              <SectionReveal className="sm:col-span-2 lg:col-span-3">
                <div className="rounded-2xl border border-dashed border-stellar-blue/25 bg-stellar-blue/5 p-8 text-center text-sm text-zinc-400">
                  Service list coming soon — owner can add entries in{" "}
                  <Link href="/admin/services" className="text-stellar-blue underline">
                    Admin → Services
                  </Link>
                  .
                </div>
              </SectionReveal>
            ) : null}
          </div>
        </div>
      </section>

      {/* Recent Work */}
      <section className="relative border-t border-stellar-blue/10 bg-stellar-void py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Portfolio</p>
                <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">Recent Work</h2>
                <p className="mt-3 max-w-xl text-zinc-400">
                  {useDbGallery
                    ? "Photos from your live gallery — tap through to see the full wall."
                    : "Precision installs and honest workmanship — upload your project shots to replace these placeholders."}
                </p>
              </div>
              <div className="w-full shrink-0 md:w-auto">
                <GlowButton href="/gallery" variant="outline" fullWidthMobile>
                  View Full Gallery
                </GlowButton>
              </div>
            </div>
          </SectionReveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {useDbGallery
              ? galleryPreview.slice(0, 4).map((g, i) => (
                  <SectionReveal key={g.id} delay={i * 0.06}>
                    <Link href="/gallery" className="group block">
                      <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                        className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/5 bg-stellar-surface ring-1 ring-stellar-blue/10"
                      >
                        <motion.div
                          initial={{ opacity: 0.92 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.55 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={g.image_url}
                            alt={g.caption || "Gallery"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 25vw"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-black/45 transition duration-300 group-hover:bg-black/55" />
                        <div className="absolute inset-0 flex flex-col justify-end p-4">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-stellar-orange">
                            Gallery
                          </span>
                          <span className="mt-1 font-medium text-white">{g.caption || "Project"}</span>
                          <p className="mt-2 max-w-[95%] text-xs leading-relaxed text-zinc-200 opacity-0 transition duration-300 group-hover:opacity-100">
                            View full gallery
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  </SectionReveal>
                ))
              : GALLERY_ITEMS.slice(0, 4).map((item, i) => (
                  <SectionReveal key={item.id} delay={i * 0.06}>
                    <Link href="/gallery" className="group block">
                      <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                        className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/5 bg-stellar-surface ring-1 ring-stellar-blue/10"
                      >
                        <motion.div
                          initial={{ opacity: 0.88 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                          className={`absolute inset-0 bg-gradient-to-br ${item.placeholderClass}`}
                        />
                        <div className="absolute inset-0 bg-black/45 transition duration-300 group-hover:bg-black/55" />
                        <div className="absolute inset-0 flex flex-col justify-end p-4">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-stellar-orange">
                            {item.category}
                          </span>
                          <span className="mt-1 font-medium text-white">{item.title}</span>
                          <p className="mt-2 max-w-[95%] text-xs leading-relaxed text-zinc-200 opacity-0 transition duration-300 group-hover:opacity-100">
                            {item.caption}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  </SectionReveal>
                ))}
          </div>
        </div>
      </section>

      {/* Booking preview */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-stellar-void via-stellar-black to-stellar-void" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">On your schedule</p>
            <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">Schedule Service</h2>
          </SectionReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "On-Site Convenience",
                body: "We come to you with a fully equipped mobile bay — no waiting rooms.",
              },
              {
                title: "Transparent Pricing",
                body: "Clear estimates before the wrench turns. No surprise invoices.",
              },
              {
                title: "Fast Response",
                body: "Rapid scheduling across Odenville and surrounding Alabama routes.",
              },
            ].map((card, i) => (
              <SectionReveal key={card.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="h-full rounded-2xl border border-stellar-blue/15 bg-stellar-surface/80 p-6 shadow-lg shadow-black/40 backdrop-blur-sm"
                >
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-stellar-blue to-stellar-orange" />
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{card.body}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal className="mt-10 flex w-full justify-center px-0 sm:px-0" delay={0.2}>
            <div className="w-full max-w-md sm:max-w-none">
              <GlowButton href="/booking" fullWidthMobile>
                Book Now
              </GlowButton>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Products preview */}
      <section className="border-t border-stellar-blue/10 bg-stellar-void py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Store</p>
                <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">Stellar Customs Products</h2>
              </div>
              <div className="w-full shrink-0 sm:w-auto">
                <GlowButton href="/shop" variant="outline" fullWidthMobile>
                  Shop All Products
                </GlowButton>
              </div>
            </div>
          </SectionReveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((cat, i) => (
              <SectionReveal key={cat.title} delay={i * 0.05}>
                <Link href="/shop" className="block h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group h-full rounded-2xl border border-white/5 bg-gradient-to-br from-stellar-surface to-stellar-black p-6 shadow-inner shadow-stellar-blue/5 ring-1 ring-stellar-blue/10 transition hover:ring-stellar-orange/30"
                  >
                    <h3 className="font-display text-lg font-semibold text-white group-hover:text-stellar-blue">
                      {cat.title}
                    </h3>
                    <p className="mt-3 text-sm text-zinc-400">{cat.blurb}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stellar-orange">
                      Explore
                      <span aria-hidden>→</span>
                    </span>
                  </motion.div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
