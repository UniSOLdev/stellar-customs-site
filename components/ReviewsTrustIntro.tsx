"use client";

import { motion } from "framer-motion";
import { FacebookIcon } from "@/components/icons/SocialIcons";
import { SITE } from "@/lib/site";
import { FacebookReviewsCta } from "@/components/FacebookReviewsCta";

export function ReviewsTrustIntro() {
  return (
    <motion.section
      className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.035] p-8 backdrop-blur-xl sm:p-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <h2 className="text-center text-2xl font-semibold tracking-tight text-white sm:text-left sm:text-3xl">
        Trusted across Palm Beach County
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-zinc-500 sm:mx-0 sm:text-left">
        Verified feedback from clients who have entrusted us with detailing, restoration, and customization work.
      </p>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
          <div className="rounded-2xl border border-white/[0.08] bg-black/20 px-5 py-4 text-center sm:text-left">
            <p className="text-2xl font-semibold text-white">{SITE.recommendPercent}</p>
            <p className="text-sm text-zinc-500">Recommend</p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-black/20 px-5 py-4 text-center sm:text-left">
            <p className="text-2xl font-semibold text-white">{SITE.reviewCount}</p>
            <p className="text-sm text-zinc-500">Client reviews</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-black/20 px-5 py-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] text-[#1877F2]">
              <FacebookIcon className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm text-zinc-500">Facebook</p>
              <p className="text-sm font-medium text-white">Verified business</p>
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
