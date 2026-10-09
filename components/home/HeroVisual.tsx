"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  HERO_LOGO_PATH,
  LOGO_ASPECT_HEIGHT,
  LOGO_ASPECT_WIDTH,
} from "@/lib/site";

export function HeroVisual() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-[#090a0d] shadow-[0_40px_120px_-50px_rgba(29,78,216,0.35)]">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(90,140,255,0.18),transparent_38%),radial-gradient(circle_at_84%_70%,rgba(0,180,255,0.11),transparent_34%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.24] [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:42px_42px]"
        aria-hidden
      />

      <motion.div
        className="absolute -left-1/3 top-[18%] h-px w-[165%] bg-gradient-to-r from-transparent via-[#72b7ff]/75 to-transparent shadow-[0_0_24px_rgba(94,184,255,0.7)]"
        animate={reducedMotion ? undefined : { x: ["-18%", "18%", "-18%"], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <svg
        viewBox="0 0 720 500"
        className="absolute inset-x-[-7%] bottom-[-2%] h-[76%] w-[114%]"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="vehicle-line" x1="70" y1="260" x2="660" y2="360">
            <stop stopColor="#64748b" stopOpacity="0.05" />
            <stop offset="0.28" stopColor="#8cc8ff" stopOpacity="0.7" />
            <stop offset="0.66" stopColor="#60a5fa" stopOpacity="0.55" />
            <stop offset="1" stopColor="#64748b" stopOpacity="0.03" />
          </linearGradient>
          <radialGradient id="wheel-glow">
            <stop stopColor="#75baff" stopOpacity="0.32" />
            <stop offset="1" stopColor="#75baff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="floor-line" x1="100" y1="420" x2="630" y2="420">
            <stop stopColor="#60a5fa" stopOpacity="0" />
            <stop offset="0.5" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
          </linearGradient>
        </defs>

        <ellipse cx="218" cy="373" rx="74" ry="74" fill="url(#wheel-glow)" />
        <ellipse cx="523" cy="373" rx="74" ry="74" fill="url(#wheel-glow)" />

        <motion.path
          d="M73 345C119 334 150 317 192 273C233 230 291 211 372 211C438 211 479 229 529 275C586 283 631 304 655 337"
          stroke="url(#vehicle-line)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={reducedMotion ? undefined : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M87 348C99 365 112 373 148 376M288 377H449M594 375C624 371 643 360 655 337"
          stroke="url(#vehicle-line)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={reducedMotion ? undefined : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 1.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
        <path d="M214 273C258 241 302 230 370 230C418 230 454 241 493 274H214Z" stroke="#93c5fd" strokeOpacity="0.2" />
        <circle cx="218" cy="373" r="54" stroke="#8cc8ff" strokeOpacity="0.35" strokeWidth="2" />
        <circle cx="218" cy="373" r="36" stroke="#8cc8ff" strokeOpacity="0.12" />
        <circle cx="523" cy="373" r="54" stroke="#8cc8ff" strokeOpacity="0.35" strokeWidth="2" />
        <circle cx="523" cy="373" r="36" stroke="#8cc8ff" strokeOpacity="0.12" />
        <path d="M78 428H662" stroke="url(#floor-line)" />
      </svg>

      <div className="absolute left-6 top-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">Stellar Customs</p>
        <p className="mt-1 text-xs text-white/60">Palm Beach County</p>
      </div>

      <motion.div
        className="absolute left-1/2 top-[39%] w-[42%] -translate-x-1/2 -translate-y-1/2"
        style={{ aspectRatio: `${LOGO_ASPECT_WIDTH} / ${LOGO_ASPECT_HEIGHT}` }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={HERO_LOGO_PATH}
          alt="Stellar Customs"
          fill
          priority
          className="object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.75)]"
          sizes="(max-width: 768px) 42vw, 300px"
        />
      </motion.div>

      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-white/[0.07] pt-3">
        <p className="text-[11px] text-white/45">Mobile detailing</p>
        <p className="text-[11px] text-white/45">Studio projects</p>
      </div>
    </div>
  );
}
