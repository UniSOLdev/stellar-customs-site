"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HERO_LOGO_PATH, SITE } from "@/lib/site";
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
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-24 md:pb-20 md:pt-20">
      <div className="absolute inset-0 bg-black" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_78%_at_50%_30%,#0f1f35_0%,#081018_32%,#03060a_58%,#000000_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(55vh,440px)] bg-gradient-to-t from-black via-[#02060c]/98 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#3aa0ff]/[0.055] via-[#3aa0ff]/[0.015] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[28%] h-[min(78vw,540px)] w-[min(96vw,700px)] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-[#3aa0ff]/[0.16] blur-[110px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[30%] h-[min(42vw,300px)] w-[min(58vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-stellar-orange/[0.09] blur-[80px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_56%_50%_at_50%_34%,transparent_0%,transparent_40%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.94)_100%)]"
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
            <div className="relative mx-auto aspect-[5/4] w-[min(82vw,400px)]">
              <div className="relative h-full w-full" style={logoGlowStyle}>
                <Image
                  src={HERO_LOGO_PATH}
                  alt={`${SITE.name} logo`}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 82vw, 400px"
                />
              </div>
            </div>

            <div className="relative mx-auto mt-1 h-[clamp(4rem,16vw,6rem)] w-[min(82vw,400px)] max-w-full overflow-hidden">
              <div
                className="absolute inset-x-0 top-0 h-full opacity-[0.26]"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 42%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 42%, transparent 100%)",
                }}
              >
                <div
                  className="relative mx-auto aspect-[5/4] w-full scale-y-[-1] blur-[1.2px]"
                  style={{
                    filter:
                      "drop-shadow(0 0 12px rgba(58,160,255,0.45)) drop-shadow(0 0 18px rgba(255,107,0,0.25))",
                  }}
                >
                  <Image
                    src={HERO_LOGO_PATH}
                    alt=""
                    fill
                    className="object-contain object-top"
                    sizes="(max-width: 768px) 82vw, 400px"
                    role="presentation"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.h1
          className="font-display mt-10 max-w-3xl text-balance px-1 text-3xl font-bold tracking-[0.05em] text-white sm:mt-12 sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.65, ease: LOGO_EASE }}
        >
          {SITE.tagline}
        </motion.h1>

        <motion.p
          className="mt-4 max-w-xl text-pretty px-2 text-base text-white/70 sm:text-lg"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.6, ease: LOGO_EASE }}
        >
          {SITE.subline}
        </motion.p>

        <motion.div
          className="mt-10 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: LOGO_DUR + 0.06,
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: LOGO_EASE },
              },
            }}
            className="w-full sm:w-auto"
          >
            <GlowButton
              href="/booking"
              fullWidthMobile
              className="!rounded-xl !animate-none hover:!shadow-[0_0_28px_rgba(58,160,255,0.5),0_0_52px_rgba(58,160,255,0.18)]"
            >
              Book Service
            </GlowButton>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: LOGO_EASE },
              },
            }}
            className="w-full sm:w-auto"
          >
            <GlowButton
              href="/shop"
              variant="outline"
              fullWidthMobile
              className="!rounded-xl !animate-none border-stellar-blue/60 bg-transparent hover:border-[#3aa0ff] hover:bg-[#3aa0ff]/12 hover:!shadow-[0_0_22px_rgba(58,160,255,0.28)]"
            >
              Shop Products
            </GlowButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
