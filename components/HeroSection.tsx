"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BRAND_TAGLINE, SITE, siteSmsHref, siteTelHref } from "@/lib/site";
import { CONCIERGE } from "@/lib/concierge-copy";
import { GlowButton } from "@/components/GlowButton";
import { HeroVisual } from "@/components/home/HeroVisual";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-[calc(3.5rem+env(safe-area-inset-top)+1.25rem)] sm:px-6 md:min-h-dvh md:pb-16 md:pt-28 lg:flex lg:items-center">
      <div className="absolute inset-0 bg-[#050506]" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_0%,rgba(120,130,150,0.12),transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <motion.p
            className="text-sm font-medium tracking-wide text-zinc-500"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {CONCIERGE.heroRegion}
          </motion.p>

          <motion.h1
            className="mt-3 max-w-xl text-balance text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.65rem]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.6, ease: EASE }}
          >
            {BRAND_TAGLINE}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-pretty text-base leading-[1.65] text-zinc-400 sm:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55, ease: EASE }}
          >
            {CONCIERGE.heroLead}
          </motion.p>

          <motion.p
            className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.16, duration: 0.5, ease: EASE }}
          >
            {CONCIERGE.heroSupport}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5, ease: EASE }}
          >
            <GlowButton href="/quote">Request a quote</GlowButton>
            <Link href="/services" className="text-sm font-medium text-zinc-400 transition hover:text-white">
              View services <span aria-hidden>→</span>
            </Link>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col gap-2 border-t border-white/[0.07] pt-6 text-sm text-zinc-500 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
          >
            <span>{CONCIERGE.mobileRoute}</span>
            <span className="hidden text-zinc-700 sm:inline" aria-hidden>
              ·
            </span>
            <span>{CONCIERGE.studioNote}</span>
          </motion.div>

          <motion.p
            className="mt-4 text-sm text-zinc-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32 }}
          >
            <a href={siteTelHref()} className="text-zinc-400 transition hover:text-white">
              {SITE.phone}
            </a>
            <span className="mx-2 text-zinc-700" aria-hidden>
              ·
            </span>
            <a href={siteSmsHref()} className="text-zinc-400 transition hover:text-white">
              Text the team
            </a>
          </motion.p>
        </div>

        <div className="lg:pl-2">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
