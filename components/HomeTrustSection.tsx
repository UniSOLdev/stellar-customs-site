"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { FacebookIcon, GoogleGIcon } from "@/components/icons/SocialIcons";
import { REGIONAL_PITCH, SITE } from "@/lib/site";

const glass =
  "flex h-full flex-col gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md ring-1 ring-stellar-blue/[0.08] transition duration-300 hover:border-stellar-blue/20 hover:ring-stellar-blue/15 sm:p-6";

export function HomeTrustSection() {
  return (
    <section className="border-y border-stellar-blue/10 bg-gradient-to-b from-stellar-black via-stellar-void to-stellar-black py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Trust</p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              A premium shop, on your driveway
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">{REGIONAL_PITCH}</p>
          </div>
        </SectionReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <motion.div
            className={glass}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#1877F2]/35 bg-[#1877F2]/10 text-[#1877F2]">
                <FacebookIcon className="h-4 w-4" aria-hidden />
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-200">
                <GoogleGIcon className="h-4 w-4" aria-hidden />
              </span>
            </div>
            <p className="mt-4 font-display text-sm font-bold leading-snug text-white sm:text-base">
              {SITE.recommendPercent} recommend · {SITE.reviewCount} reviews
            </p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">Facebook community · Google-backed workmanship</p>
          </motion.div>

          <motion.div
            className={glass}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <p className="font-display text-sm font-bold text-white sm:text-base">{SITE.followerCountLabel} audience</p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">Instagram &amp; Facebook — real builds, real clients.</p>
          </motion.div>

          <motion.div
            className={glass}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <p className="font-display text-sm font-bold text-white sm:text-base">Verified presence</p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">Business-verified profiles and transparent booking.</p>
          </motion.div>

          <motion.div
            className={glass}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <p className="font-display text-sm font-bold text-white sm:text-base">Dual-region mobile</p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">
              South Florida luxury routes + Alabama mobile installs — schedule-first, white-glove communication.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
