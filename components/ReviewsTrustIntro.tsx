"use client";

import { motion } from "framer-motion";
import { FacebookIcon } from "@/components/icons/SocialIcons";
import { SITE } from "@/lib/site";
import { FacebookReviewsCta } from "@/components/FacebookReviewsCta";

export function ReviewsTrustIntro() {
  return (
    <motion.section
      className="relative overflow-hidden rounded-3xl border border-stellar-blue/15 bg-gradient-to-br from-stellar-surface/90 to-stellar-black p-6 shadow-xl shadow-black/40 sm:p-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-stellar-blue/10 blur-3xl" aria-hidden />
      <h2 className="font-display text-center text-2xl font-bold text-white sm:text-left sm:text-3xl">
        Trusted in Palm Beach County
      </h2>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
          <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-center sm:text-left">
            <p className="text-2xl font-bold text-white">{SITE.recommendPercent}</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Recommend</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-center sm:text-left">
            <p className="text-2xl font-bold text-stellar-blue">{SITE.reviewCount}</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Reviews</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[#1877F2]/25 bg-[#1877F2]/5 px-5 py-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#1877F2]/35 bg-[#1877F2]/15 text-[#1877F2]">
              <FacebookIcon className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#9ec5ff]">Facebook</p>
              <p className="text-sm font-semibold text-white">Verified business</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center sm:justify-start">
        <FacebookReviewsCta />
      </div>
    </motion.section>
  );
}
