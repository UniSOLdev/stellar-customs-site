"use client";

import { SectionReveal } from "@/components/SectionReveal";
import { CUSTOMER_JOURNEY } from "@/lib/business/offers";
import { GlowButton } from "@/components/GlowButton";

export function CustomerJourneySection() {
  return (
    <section className="border-t border-white/[0.06] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Your path</p>
          <h2 className="font-display mt-2 text-center text-2xl font-bold text-white sm:text-3xl">
            Start with a detail. Grow into protection &amp; custom work.
          </h2>
        </SectionReveal>

        <ol className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          {CUSTOMER_JOURNEY.map((item, i) => (
            <SectionReveal key={item.step} delay={i * 0.05}>
              <li className="flex items-center gap-3 rounded-xl border border-white/10 bg-stellar-surface/40 px-4 py-3 sm:flex-col sm:text-center">
                <span className="font-display text-sm font-bold text-stellar-blue">{item.step}</span>
                {i < CUSTOMER_JOURNEY.length - 1 ? (
                  <span className="hidden text-zinc-600 sm:block" aria-hidden>
                    ↓
                  </span>
                ) : null}
                <span className="text-xs text-zinc-400">{item.desc}</span>
              </li>
            </SectionReveal>
          ))}
        </ol>

        <SectionReveal className="mt-10 flex justify-center">
          <GlowButton href="/quote">Get My Quote</GlowButton>
        </SectionReveal>
      </div>
    </section>
  );
}
