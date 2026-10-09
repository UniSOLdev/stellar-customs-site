"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BRAND_TAGLINE,
  SITE,
  siteSmsHref,
  siteTelHref,
} from "@/lib/site";
import { GlowButton } from "@/components/GlowButton";
import { HeroVisual } from "@/components/home/HeroVisual";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-[calc(3.5rem+env(safe-area-inset-top)+1.25rem)] sm:px-6 md:min-h-dvh md:pb-16 md:pt-28 lg:flex lg:items-center">
      <div className="absolute inset-0 bg-[#050506]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(65,105,225,0.09),transparent_32%)]" aria-hidden />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="lg:order-2">
          <HeroVisual />
        </div>

        <div className="lg:order-1">
          <motion.p
            className="text-sm font-medium text-zinc-500"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Palm Beach County
          </motion.p>

          <motion.h1
            className="mt-3 max-w-xl text-balance text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.75rem]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.6, ease: EASE }}
          >
            {BRAND_TAGLINE}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55, ease: EASE }}
          >
            Mobile detailing, vehicle restoration, ceramic protection, and custom interior work—scoped for your vehicle.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5, ease: EASE }}
          >
            <GlowButton href="/quote">Request a quote</GlowButton>
            <Link href="/services" className="text-sm font-medium text-zinc-400 transition hover:text-white">
              Explore services <span aria-hidden>→</span>
            </Link>
          </motion.div>

          <motion.div
            className="mt-9 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.07] pt-5 text-xs text-zinc-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
          >
            <span>Mobile: Jupiter to Boca Raton</span>
            <span>Studio: multi-day projects</span>
            <a href={siteTelHref()} className="transition hover:text-zinc-300">
              {SITE.phone}
            </a>
            <a href={siteSmsHref()} className="transition hover:text-zinc-300">
              Text
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
