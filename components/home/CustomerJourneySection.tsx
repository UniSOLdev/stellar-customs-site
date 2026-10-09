"use client";

import { SectionReveal } from "@/components/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlowButton } from "@/components/GlowButton";
import { CUSTOMER_JOURNEY } from "@/lib/business/offers";

export function CustomerJourneySection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeader
            align="center"
            title="Typical project path"
            description="Many clients start with a detail or inspection, then add restoration or protection as needed."
          />
        </SectionReveal>

        <ol className="mt-10 space-y-0">
          {CUSTOMER_JOURNEY.map((item, i) => (
            <SectionReveal key={item.step} delay={i * 0.04}>
              <li className="flex gap-4 border-l border-white/10 py-4 pl-6 first:pt-0">
                <span className="text-sm font-medium text-zinc-500">{item.step}</span>
                <span className="text-sm text-zinc-400">{item.desc}</span>
              </li>
            </SectionReveal>
          ))}
        </ol>

        <SectionReveal className="mt-10 flex justify-center">
          <GlowButton href="/quote">Request a quote</GlowButton>
        </SectionReveal>
      </div>
    </section>
  );
}
