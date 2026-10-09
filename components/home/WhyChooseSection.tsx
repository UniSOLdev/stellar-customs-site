"use client";

import { SectionReveal } from "@/components/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

const CARDS = [
  {
    title: "Condition-based scope",
    body: "Vehicle size, materials, contamination, and labor drive the quote — not a one-size menu.",
  },
  {
    title: "Mobile and studio",
    body: "Driveway and garage visits for maintenance and many interior jobs. Controlled environment for correction, ceramic, and headliner work.",
  },
  {
    title: "Restoration focus",
    body: "Headliners, leather, trim, headlights, and interior wear — common in Florida-owned vehicles.",
  },
  {
    title: "Protection for local climate",
    body: "Ceramic and correction packages account for sun, rain spotting, and coastal contaminants when prep supports them.",
  },
] as const;

export function WhyChooseSection() {
  return (
    <section className="border-t border-white/[0.06] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeader
            eyebrow="Process"
            title="Built for Palm Beach County"
            description="One team for maintenance details, restoration, paint protection, and custom cabin work."
          />
        </SectionReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <SectionReveal key={card.title} delay={i * 0.05}>
              <GlassCard className="h-full">
                <h3 className="text-sm font-medium text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{card.body}</p>
              </GlassCard>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
