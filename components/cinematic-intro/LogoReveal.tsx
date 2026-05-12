"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HERO_LOGO_PATH, LOGO_ASPECT_HEIGHT, LOGO_ASPECT_WIDTH, SITE } from "@/lib/site";
import type { IntroPerfTier } from "@/lib/cinematic-intro-config";

type Props = {
  tier: IntroPerfTier;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function LogoReveal({ tier }: Props) {
  const blurOnText = tier === "full";
  const copyStagger = tier === "reduced" ? 0.08 : 0.14;

  return (
    <div className="relative z-20 flex flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: tier === "reduced" ? 0.55 : 0.85, ease }}
        className="relative w-[min(72vw,320px)] sm:w-[min(56vw,380px)]"
      >
        <div
          className="pointer-events-none absolute -inset-[6%] rounded-[24%] bg-stellar-blue/20"
          style={{
            filter: tier === "full" ? "blur(28px)" : "blur(12px)",
            transform: "translateZ(0)",
          }}
          aria-hidden
        />
        <div
          className="relative mx-auto w-full"
          style={{ aspectRatio: `${LOGO_ASPECT_WIDTH} / ${LOGO_ASPECT_HEIGHT}` }}
        >
          <Image
            src={HERO_LOGO_PATH}
            alt=""
            fill
            className="object-contain bg-transparent"
            sizes="(max-width: 640px) 72vw, 380px"
            priority
          />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.12, ease }}
        className="font-display mt-6 text-center text-[clamp(1.15rem,4.2vw,1.75rem)] font-semibold tracking-[0.18em] text-white"
        style={{ textShadow: "0 0 40px rgba(0,180,255,0.25)" }}
      >
        STELLAR CUSTOMS
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12 + copyStagger, ease }}
        className={`mt-2 text-center text-xs font-medium uppercase tracking-[0.28em] text-stellar-blue/90 sm:text-sm ${
          blurOnText ? "opacity-95" : "opacity-90"
        }`}
      >
        Luxury Automotive Solutions
      </motion.p>
      <span className="sr-only">{SITE.shortName}</span>
    </div>
  );
}
