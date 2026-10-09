"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BRAND_TAGLINE,
  HERO_LOGO_PATH,
  LOGO_ASPECT_HEIGHT,
  LOGO_ASPECT_WIDTH,
  SITE,
  siteSmsHref,
  siteTelHref,
} from "@/lib/site";
import { GlowButton } from "@/components/GlowButton";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100dvh-3.5rem)] flex-col justify-center overflow-hidden px-4 pb-28 pt-[calc(3.5rem+env(safe-area-inset-top)+0.75rem)] md:min-h-dvh md:pb-24 md:pt-24">
      <div className="absolute inset-0 bg-[#050506]" aria-hidden />
      <div className="mist-bg" aria-hidden />
      <div className="hero-vignette" aria-hidden />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <motion.div
          className="relative w-[min(44vw,180px)] md:w-[min(56vw,280px)]"
          style={{ aspectRatio: `${LOGO_ASPECT_WIDTH} / ${LOGO_ASPECT_HEIGHT}` }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <Image
            src={HERO_LOGO_PATH}
            alt={`${SITE.shortName} logo`}
            fill
            priority
            className="object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            sizes="(max-width: 768px) 180px, 280px"
          />
        </motion.div>

        <motion.p
          className="mt-8 text-sm font-medium text-zinc-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.5, ease: EASE }}
        >
          {SITE.heroHeadlineSupport}
        </motion.p>

        <motion.h1
          className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:max-w-2xl md:text-[2.75rem] md:leading-[1.1]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55, ease: EASE }}
        >
          {BRAND_TAGLINE}
        </motion.h1>

        <motion.p
          className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-zinc-400"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5, ease: EASE }}
        >
          {SITE.subline}
        </motion.p>

        <motion.div
          className="mt-9 flex w-full max-w-sm flex-col gap-3 sm:max-w-md sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.5, ease: EASE }}
        >
          <GlowButton href="/quote" fullWidthMobile>
            Get a quote
          </GlowButton>
          <GlowButton href="/services" variant="outline" fullWidthMobile>
            Services
          </GlowButton>
        </motion.div>

        <motion.p
          className="mt-6 text-xs text-zinc-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.32 }}
        >
          Mobile throughout the county · Studio for multi-day work
        </motion.p>

        <motion.div className="mt-5 hidden gap-4 md:flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.36 }}>
          <a href={siteTelHref()} className="text-sm text-zinc-500 transition hover:text-white">
            {SITE.phone}
          </a>
          <span className="text-zinc-700">·</span>
          <a href={siteSmsHref()} className="text-sm text-zinc-500 transition hover:text-white">
            Text
          </a>
        </motion.div>
      </div>
    </section>
  );
}
