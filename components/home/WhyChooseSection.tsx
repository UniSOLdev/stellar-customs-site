"use client";

import { SectionReveal } from "@/components/SectionReveal";

const CARDS = [
  {
    title: "Mobile Convenience",
    body: "Professional service at your home or workplace — no waiting rooms, no tow unless you need one.",
  },
  {
    title: "Honest Diagnostics",
    body: "Clear findings before parts are ordered. You approve the plan; we execute with care.",
  },
  {
    title: "Professional Custom Lighting",
    body: "Interior, accent, and show-ready installs with clean routing and lasting workmanship.",
  },
  {
    title: "Fast Response Times",
    body: "Same-week scheduling across our Alabama routes when capacity allows — ask for urgency.",
  },
  {
    title: "Alabama Trusted Service",
    body: "Built on referrals and repeat clients in Odenville and surrounding communities.",
  },
] as const;

const glass =
  "h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.75)] backdrop-blur-md ring-1 ring-stellar-blue/[0.06] transition duration-300 hover:border-stellar-blue/20 hover:ring-stellar-blue/15";

export function WhyChooseSection() {
  return (
    <section className="relative border-t border-stellar-blue/10 bg-stellar-black py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(58,160,255,0.08),transparent)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Why Stellar</p>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Why Choose Stellar Customs
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Restrained workmanship and straight answers — the kind of partner you want under your hood.
          </p>
        </SectionReveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {CARDS.map((card, i) => (
            <SectionReveal key={card.title} delay={i * 0.07}>
              <article className={glass}>
                <div className="h-px w-8 bg-gradient-to-r from-stellar-blue/80 to-stellar-orange/50" aria-hidden />
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{card.body}</p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
