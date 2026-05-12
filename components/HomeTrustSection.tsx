"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { FacebookIcon } from "@/components/icons/SocialIcons";
import { SITE } from "@/lib/site";

const check =
  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-stellar-blue/40 bg-stellar-blue/10 text-stellar-blue";

export function HomeTrustSection() {
  return (
    <section className="border-y border-stellar-blue/10 bg-gradient-to-b from-stellar-black via-stellar-void to-stellar-black py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <motion.div
              className="flex gap-3 rounded-2xl border border-white/5 bg-stellar-black/30 p-4 ring-1 ring-stellar-blue/10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <span className={check} aria-hidden>
                ✓
              </span>
              <div>
                <p className="flex flex-wrap items-center gap-2 font-display text-sm font-bold leading-snug text-white sm:text-base">
                  <span>
                    {SITE.recommendPercent} Recommend ({SITE.reviewCount} Reviews)
                  </span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded border border-[#1877F2]/30 bg-[#1877F2]/10 text-[#1877F2]">
                    <FacebookIcon className="h-3 w-3" aria-hidden />
                  </span>
                </p>
                <p className="mt-1 text-xs text-zinc-500">Facebook community feedback</p>
              </div>
            </motion.div>

            <motion.div
              className="flex gap-3 rounded-2xl border border-white/5 bg-stellar-black/30 p-4 ring-1 ring-stellar-blue/10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              <span className={check} aria-hidden>
                ✓
              </span>
              <div>
                <p className="font-display text-sm font-bold text-white sm:text-base">{SITE.followerCountLabel} Followers</p>
                <p className="mt-1 text-xs text-zinc-500">Join us on Facebook & Instagram</p>
              </div>
            </motion.div>

            <motion.div
              className="flex gap-3 rounded-2xl border border-white/5 bg-stellar-black/30 p-4 ring-1 ring-stellar-blue/10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <span className={check} aria-hidden>
                ✓
              </span>
              <div>
                <p className="font-display text-sm font-bold text-white sm:text-base">Verified Business</p>
                <p className="mt-1 text-xs text-zinc-500">Verified account on Facebook</p>
              </div>
            </motion.div>

            <motion.div
              className="flex gap-3 rounded-2xl border border-white/5 bg-stellar-black/30 p-4 ring-1 ring-stellar-blue/10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              <span className={check} aria-hidden>
                ✓
              </span>
              <div>
                <p className="font-display text-sm font-bold text-white sm:text-base">Serving {SITE.location}</p>
                <p className="mt-1 text-xs text-zinc-500">Mobile service · On-site repairs</p>
              </div>
            </motion.div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
