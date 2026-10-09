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

const LOGO_EASE = [0.22, 1, 0.36, 1] as const;
const LOGO_DUR = 0.95;

const logoGlowStyle: CSSProperties = {
  filter: [
    "drop-shadow(0 0 20px rgba(58,160,255,0.95))",
    "drop-shadow(0 0 48px rgba(58,160,255,0.5))",
    "drop-shadow(0 0 8px rgba(255,107,0,0.9))",
    "drop-shadow(0 0 32px rgba(255,140,66,0.35))",
  ].join(" "),
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 pb-28 pt-24 md:pb-20 md:pt-20">
      <div className="absolute inset-0 bg-black" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_78%_at_50%_30%,#0f1f35_0%,#081018_32%,#03060a_58%,#000000_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(55vh,440px)] bg-gradient-to-t from-black via-[#02060c]/98 to-transparent"
        aria-hidden
      />
      <ParticlesBackground density="sparse" className="opacity-[0.65]" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <motion.div
          className="flex w-full flex-col items-center"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: LOGO_DUR, ease: LOGO_EASE }}
        >
          <div className="relative w-full max-w-md sm:max-w-lg">
            <div
              className="relative mx-auto w-[min(72vw,360px)]"
              style={{ aspectRatio: `${LOGO_ASPECT_WIDTH} / ${LOGO_ASPECT_HEIGHT}` }}
            >
              <div className="relative h-full w-full" style={logoGlowStyle}>
                <Image
                  src={HERO_LOGO_PATH}
                  alt={`${SITE.shortName} logo`}
                  fill
                  priority
                  className="object-contain bg-transparent"
                  sizes="(max-width: 768px) 72vw, 360px"
                  quality={95}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          className="font-display mt-8 text-xs font-bold uppercase tracking-[0.35em] text-stellar-blue sm:text-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: LOGO_EASE }}
        >
          {SITE.shortName.toUpperCase()}
        </motion.p>

        <motion.h1
          className="font-display mt-4 max-w-3xl text-balance text-2xl font-bold tracking-[0.08em] text-white sm:text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.65, ease: LOGO_EASE }}
        >
          {BRAND_TAGLINE}
        </motion.h1>

        <motion.p
          className="mt-4 max-w-xl text-pretty text-sm font-medium uppercase tracking-wide text-zinc-300 sm:text-base"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.6, ease: LOGO_EASE }}
        >
          {SITE.heroHeadlineSupport}
        </motion.p>

        <motion.p
          className="mt-4 max-w-xl text-pretty px-2 text-base text-white/65 sm:text-lg"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.54, duration: 0.6, ease: LOGO_EASE }}
        >
          {SITE.subline}
        </motion.p>

        <motion.div
          className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { delayChildren: LOGO_DUR + 0.06, staggerChildren: 0.1 },
            },
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="w-full sm:w-auto">
            <GlowButton href="/quote" fullWidthMobile className="!rounded-xl !animate-none">
              Get a Quote
            </GlowButton>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="w-full sm:w-auto">
            <GlowButton href="/services" variant="outline" fullWidthMobile className="!rounded-xl !animate-none">
              Explore Services
            </GlowButton>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
        >
          <a href={siteTelHref()} className="min-h-[44px] rounded-lg border border-white/15 px-4 py-3 text-zinc-200 hover:border-stellar-blue/50">
            Call
          </a>
          <a
            href={siteSmsHref("Stellar Customs quote — ")}
            className="min-h-[44px] rounded-lg border border-white/15 px-4 py-3 text-zinc-200 hover:border-stellar-blue/50"
          >
            Text
          </a>
          <span className="text-zinc-600">Mobile + studio · Jupiter to Boca</span>
        </motion.div>
      </div>
    </section>
  );
}
