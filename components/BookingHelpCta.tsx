"use client";

import { motion } from "framer-motion";
import { SITE, siteTelHref } from "@/lib/site";

export function BookingHelpCta() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.45 }}
      className="pointer-events-none fixed bottom-24 right-4 z-[90] max-w-[min(18rem,calc(100vw-2rem))] md:bottom-8 md:right-8 md:max-w-xs"
    >
      <div className="pointer-events-auto rounded-2xl border border-white/[0.08] bg-stellar-black/90 p-4 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-md ring-1 ring-stellar-blue/15">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Need Immediate Help?</p>
        <a
          href={siteTelHref()}
          className="mt-2 flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-stellar-blue-deep to-stellar-blue text-sm font-bold uppercase tracking-widest text-black shadow-glow-button transition hover:shadow-[0_0_28px_rgba(58,160,255,0.35)]"
        >
          Call {SITE.phone}
        </a>
      </div>
    </motion.div>
  );
}
