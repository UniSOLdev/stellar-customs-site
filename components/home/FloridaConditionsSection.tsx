"use client";

import { SectionReveal } from "@/components/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FLORIDA_VEHICLE_PAIN_POINTS } from "@/lib/business/offers";

export function FloridaConditionsSection() {
  return (
    <section className="border-t border-white/[0.06] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeader
            eyebrow="Environment"
            title="What Florida does to vehicles"
            description="Our service mix reflects what we see on Palm Beach County vehicles every week."
          />
        </SectionReveal>

        <ul className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {FLORIDA_VEHICLE_PAIN_POINTS.map((item, i) => (
            <SectionReveal key={item} delay={i * 0.03}>
              <li className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 text-sm leading-relaxed text-zinc-400">
                {item}
              </li>
            </SectionReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
