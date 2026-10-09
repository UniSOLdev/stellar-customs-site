"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { CITY_PAGES, PRIMARY_COUNTY_LABEL } from "@/lib/business/service-areas";
import { REGIONAL_PITCH } from "@/lib/site";

const glass =
  "rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.85)] backdrop-blur-md ring-1 ring-stellar-blue/[0.07] sm:p-8";

export function ServiceAreasSection() {
  return (
    <section className="relative border-t border-white/[0.06] bg-gradient-to-b from-stellar-void via-stellar-black to-stellar-void py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Coverage</p>
          <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">{PRIMARY_COUNTY_LABEL}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">{REGIONAL_PITCH}</p>
        </SectionReveal>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${glass} mt-14`}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stellar-blue">Primary routes</p>
          <h3 className="font-display mt-3 text-xl font-semibold text-white">Cities we serve</h3>
          <ul className="mt-6 flex flex-wrap gap-2">
            {CITY_PAGES.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/${city.slug}`}
                  className="inline-flex min-h-[40px] items-center rounded-full border border-white/10 bg-stellar-black/40 px-4 py-2 text-xs font-medium text-zinc-200 transition hover:border-stellar-blue/40 hover:text-stellar-blue"
                >
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <p className="mt-10 text-center text-xs text-zinc-500 sm:text-sm">
          Profitable work south of Boca may be accepted — Palm Beach County is home base. Confirm your address in your
          quote request.
        </p>
      </div>
    </section>
  );
}
