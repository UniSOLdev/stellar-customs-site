"use client";

import { SectionReveal } from "@/components/SectionReveal";
import { FLORIDA_VEHICLE_PAIN_POINTS } from "@/lib/business/offers";

export function FloridaConditionsSection() {
  return (
    <section className="border-t border-white/[0.06] bg-stellar-black py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Palm Beach reality</p>
          <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">
            Your vehicle takes a beating in Florida
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-zinc-400 sm:text-base">
            We bring it back — with processes aimed at UV, salt air, humidity, and the way you actually use your SUV,
            truck, or daily driver.
          </p>
        </SectionReveal>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FLORIDA_VEHICLE_PAIN_POINTS.map((item, i) => (
            <SectionReveal key={item} delay={i * 0.04}>
              <li className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4 text-sm leading-relaxed text-zinc-300">
                {item}
              </li>
            </SectionReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
