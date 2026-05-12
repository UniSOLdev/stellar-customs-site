"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { ALABAMA_MARKETS, REGIONAL_PITCH, SOUTH_FLORIDA_MARKETS } from "@/lib/site";

const glass =
  "rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.85)] backdrop-blur-md ring-1 ring-stellar-blue/[0.07] sm:p-8";

function CityGrid({ cities }: { cities: readonly string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {cities.map((city) => (
        <li key={city}>
          <span className="inline-flex min-h-[40px] items-center rounded-full border border-white/10 bg-stellar-black/40 px-4 py-2 text-xs font-medium text-zinc-200">
            {city}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ServiceAreasSection() {
  return (
    <section className="relative border-t border-white/[0.06] bg-gradient-to-b from-stellar-void via-stellar-black to-stellar-void py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Coverage</p>
          <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">Service areas</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">{REGIONAL_PITCH}</p>
        </SectionReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={glass}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stellar-blue">South Florida</p>
            <h3 className="font-display mt-3 text-xl font-semibold text-white">Coastal luxury routes</h3>
            <CityGrid cities={SOUTH_FLORIDA_MARKETS} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className={glass}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stellar-orange">Alabama</p>
            <h3 className="font-display mt-3 text-xl font-semibold text-white">Mobile install &amp; repair</h3>
            <CityGrid cities={ALABAMA_MARKETS} />
          </motion.div>
        </div>

        <p className="mt-10 text-center text-xs text-zinc-500 sm:text-sm">
          Confirm your address when you book — routing is optimized for mobile luxury service across both regions.
        </p>
      </div>
    </section>
  );
}
