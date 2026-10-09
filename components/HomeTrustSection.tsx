"use client";

import { SectionReveal } from "@/components/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { SITE, SITE_HIGHLIGHTS } from "@/lib/site";

const items = [
  {
    title: "Reviews",
    body: `${SITE.recommendPercent} recommend · ${SITE.reviewCount} public reviews on Facebook and Google.`,
  },
  {
    title: "Service area",
    body: `${SITE_HIGHLIGHTS.primaryCounty}. Mobile routes from Jupiter through Boca Raton.`,
  },
  {
    title: "Mobile & studio",
    body: "On-site detailing and maintenance. Studio work for correction, ceramic, headliners, and multi-day restoration.",
  },
  {
    title: "Quoting",
    body: "Every project is quoted from photos and inspection so scope, timing, and investment align before we schedule.",
  },
] as const;

export function HomeTrustSection() {
  return (
    <section className="border-y border-white/[0.06] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeader
            align="center"
            eyebrow="Stellar Customs"
            title="A vehicle concierge for Palm Beach County"
            description="We confirm scope before work begins and tailor each visit to your vehicle—whether it is a daily driver, a family SUV, or a collector car."
          />
        </SectionReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.05}>
              <GlassCard className="h-full">
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.body}</p>
              </GlassCard>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
