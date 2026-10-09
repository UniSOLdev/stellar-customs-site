"use client";

import { SectionReveal } from "@/components/SectionReveal";
import { SITE } from "@/lib/site";

const CARDS = [
  {
    title: "Premium, not a car wash",
    body: "Condition-based quoting — sized for Tahoe owners and Porsche owners alike. No race to the bottom.",
  },
  {
    title: "Mobile + studio path",
    body: "We come to your driveway for details and maintenance; starlights, correction, and ceramic when the job needs it.",
  },
  {
    title: "Restore, don't replace",
    body: "Headliners, leather, trim, and headlights — the work that keeps an older Florida vehicle on the road looking right.",
  },
  {
    title: "Built for UV & salt air",
    body: "Processes and protection options chosen for Palm Beach sun, rain spots, and coastal contamination.",
  },
  {
    title: "Transparent quoting",
    body: "Photos and inspection drive scope. You know the plan before we start — maintenance programs after qualifying work.",
  },
] as const;

const glass =
  "h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.75)] backdrop-blur-md ring-1 ring-stellar-blue/[0.06] transition duration-300 hover:border-stellar-blue/20";

export function WhyChooseSection() {
  return (
    <section className="relative border-t border-stellar-blue/10 bg-stellar-black py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Why Stellar</p>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Palm Beach County vehicle restoration &amp; customization
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Young, capable, and premium — {SITE.shortName} is built to earn the keys to your daily driver and your
            weekend build.
          </p>
        </SectionReveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {CARDS.map((card, i) => (
            <SectionReveal key={card.title} delay={i * 0.07}>
              <article className={glass}>
                <h3 className="font-display text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{card.body}</p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
