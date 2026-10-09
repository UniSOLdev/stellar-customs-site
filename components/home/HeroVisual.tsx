"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Editorial hero panel — silhouette and light, no street-style logo overlay. */
export function HeroVisual() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#08090c] shadow-[0_48px_100px_-60px_rgba(0,0,0,0.85)]">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(180,190,210,0.14),transparent_42%),radial-gradient(circle_at_100%_100%,rgba(90,100,130,0.08),transparent_40%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden
      />

      <motion.div
        className="absolute -left-1/4 top-[22%] h-px w-[150%] bg-gradient-to-r from-transparent via-white/25 to-transparent"
        animate={reducedMotion ? undefined : { x: ["-12%", "12%", "-12%"], opacity: [0.15, 0.45, 0.15] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <svg
        viewBox="0 0 720 500"
        className="absolute inset-x-[-5%] bottom-[-4%] h-[78%] w-[110%]"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="vehicle-line" x1="70" y1="260" x2="660" y2="360">
            <stop stopColor="#64748b" stopOpacity="0.04" />
            <stop offset="0.35" stopColor="#cbd5e1" stopOpacity="0.55" />
            <stop offset="0.7" stopColor="#94a3b8" stopOpacity="0.4" />
            <stop offset="1" stopColor="#64748b" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="floor-line" x1="100" y1="420" x2="630" y2="420">
            <stop stopColor="#94a3b8" stopOpacity="0" />
            <stop offset="0.5" stopColor="#94a3b8" stopOpacity="0.35" />
            <stop offset="1" stopColor="#94a3b8" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.path
          d="M73 345C119 334 150 317 192 273C233 230 291 211 372 211C438 211 479 229 529 275C586 283 631 304 655 337"
          stroke="url(#vehicle-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reducedMotion ? undefined : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M87 348C99 365 112 373 148 376M288 377H449M594 375C624 371 643 360 655 337"
          stroke="url(#vehicle-line)"
          strokeWidth="1.75"
          strokeLinecap="round"
          initial={reducedMotion ? undefined : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.75 }}
          transition={{ duration: 1.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
        <path
          d="M214 273C258 241 302 230 370 230C418 230 454 241 493 274H214Z"
          stroke="#e2e8f0"
          strokeOpacity="0.12"
        />
        <circle cx="218" cy="373" r="52" stroke="#cbd5e1" strokeOpacity="0.22" strokeWidth="1.5" />
        <circle cx="523" cy="373" r="52" stroke="#cbd5e1" strokeOpacity="0.22" strokeWidth="1.5" />
        <path d="M78 428H662" stroke="url(#floor-line)" />
      </svg>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/80 to-transparent px-6 pb-6 pt-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">Concierge vehicle care</p>
        <p className="mt-1 max-w-[16rem] text-sm leading-snug text-white/70">
          Detailing, restoration, protection, and custom interiors across Palm Beach County.
        </p>
      </div>
    </div>
  );
}
