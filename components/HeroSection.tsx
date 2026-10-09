"use client";

import type { CSSProperties } from "react";
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
import { ParticlesBackground } from "@/components/ParticlesBackground";

const EASE = [0.22, 1, 0.36, 1] as const;

const logoGlowMobile: CSSProperties = {
  filter: "drop-shadow(0 0 24px rgba(58,160,255,0.35))",
};

const logoGlowDesktop: CSSProperties = {
  filter: [
    "drop-shadow(0 0 20px rgba(58,160,255,0.95))",
    "drop-shadow(0 0 48px rgba(58,160,255,0.5))",
    "drop-shadow(0 0 8px rgba(255,107,0,0.9))",
  ].join(" "),
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100dvh-3.5rem)] flex-col justify-end overflow-hidden px-4 pb-32 pt-[calc(3.5rem+env(safe-area-inset-top)+1.25rem)] md:min-h-dvh md:justify-center md:pb-24 md:pt-24">
      <div className="absolute inset-0 bg-black" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_0%,#122035_0%,#060a10_45%,#000_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent md:h-64"
        aria-hidden
      />
      <ParticlesBackground density="sparse" className="opacity-40 md:opacity-[0.55]" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col md:items-center md:text-center">
        {/* Mobile: message-first for faster comprehension */}
        <motion.p
          className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stellar-blue md:order-2 md:mt-8 md:text-xs md:tracking-[0.35em]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {SITE.heroHeadlineSupport}
        </motion.p>

        <motion.h1
          className="font-display mt-3 max-w-xl text-balance text-[1.65rem] font-bold leading-tight tracking-[0.04em] text-white sm:text-3xl md:order-3 md:mt-4 md:max-w-3xl md:text-4xl md:tracking-[0.08em]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.55, ease: EASE }}
        >
          {BRAND_TAGLINE}
        </motion.h1>

        <motion.p
          className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-zinc-400 md:order-4 md:text-base md:text-white/65"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: EASE }}
        >
          {SITE.subline}
        </motion.p>

        <motion.div
          className="mt-8 flex w-full max-w-md flex-col gap-3 md:order-5 md:mx-auto md:mt-10 md:flex-row md:justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
        >
          <GlowButton href="/quote" fullWidthMobile className="!rounded-xl !animate-none shadow-[0_0_28px_rgba(58,160,255,0.25)]">
            Get a Quote
          </GlowButton>
          <GlowButton href="/services" variant="outline" fullWidthMobile className="!rounded-xl !animate-none">
            Explore Services
          </GlowButton>
        </motion.div>

        <motion.p
          className="mt-5 hidden text-xs text-zinc-500 md:order-6 md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Mobile across Palm Beach County · Studio for starlights, correction &amp; ceramic
        </motion.p>

        {/* Desktop: call/text inline; mobile uses sticky bar only */}
        <motion.div
          className="mt-6 hidden flex-wrap items-center justify-center gap-3 md:order-7 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <a
            href={siteTelHref()}
            className="min-h-[44px] rounded-lg border border-white/15 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-200 hover:border-stellar-blue/50"
          >
            Call
          </a>
          <a
            href={siteSmsHref("Stellar Customs — quote for ")}
            className="min-h-[44px] rounded-lg border border-white/15 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-200 hover:border-stellar-blue/50"
          >
            Text
          </a>
        </motion.div>

        <motion.div
          className="relative mx-auto mt-10 w-[min(52vw,220px)] md:order-1 md:mt-0 md:w-[min(72vw,360px)]"
          style={{ aspectRatio: `${LOGO_ASPECT_WIDTH} / ${LOGO_ASPECT_HEIGHT}` }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08, duration: 0.7, ease: EASE }}
        >
          <div className="relative h-full w-full md:hidden" style={logoGlowMobile}>
            <Image
              src={HERO_LOGO_PATH}
              alt=""
              fill
              priority
              className="object-contain opacity-90"
              sizes="220px"
              aria-hidden
            />
          </div>
          <div className="relative hidden h-full w-full md:block" style={logoGlowDesktop}>
            <Image
              src={HERO_LOGO_PATH}
              alt={`${SITE.shortName} logo`}
              fill
              priority
              className="object-contain"
              sizes="360px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
