"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { FacebookIcon, GoogleGIcon } from "@/components/icons/SocialIcons";
import { SITE, SITE_HIGHLIGHTS } from "@/lib/site";

const glass =
  "flex h-full flex-col gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md ring-1 ring-stellar-blue/[0.08] sm:p-6";

export function HomeTrustSection() {
  return (
    <section className="border-y border-stellar-blue/10 bg-gradient-to-b from-stellar-black via-stellar-void to-stellar-black py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Trust</p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Professional enough for an expensive vehicle — approachable for a daily driver
            </h2>
          </div>
        </SectionReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <motion.div className={glass} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#1877F2]/35 bg-[#1877F2]/10 text-[#1877F2]">
                <FacebookIcon className="h-4 w-4" aria-hidden />
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                <GoogleGIcon className="h-4 w-4" aria-hidden />
              </span>
            </div>
            <p className="mt-4 font-display text-sm font-bold text-white">
              {SITE.recommendPercent} recommend · {SITE.reviewCount} reviews
            </p>
            <p className="mt-2 text-xs text-zinc-500">See live reviews on our reviews page — we don&apos;t fabricate testimonials.</p>
          </motion.div>

          <motion.div className={glass} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-display text-sm font-bold text-white">{SITE_HIGHLIGHTS.primaryCounty}</p>
            <p className="mt-2 text-xs text-zinc-500">Home base for mobile routes and upcoming studio capability.</p>
          </motion.div>

          <motion.div className={glass} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-display text-sm font-bold text-white">{SITE_HIGHLIGHTS.mobileAndStudio}</p>
            <p className="mt-2 text-xs text-zinc-500">Details at your location · correction &amp; starlights in studio.</p>
          </motion.div>

          <motion.div className={glass} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-display text-sm font-bold text-white">Photo-based quotes</p>
            <p className="mt-2 text-xs text-zinc-500">{SITE_HIGHLIGHTS.responseNote}</p>
            {SITE.licensedAndInsured ? (
              <p className="mt-3 text-xs font-semibold text-emerald-400/90">Licensed &amp; insured</p>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
