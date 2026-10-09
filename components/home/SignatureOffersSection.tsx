"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";
import { GlowButton } from "@/components/GlowButton";
import {
  CUSTOM_INTERIOR_OFFER,
  PROTECTION_LADDER,
  STELLAR_RESET,
  MAINTENANCE_PROGRAM,
} from "@/lib/business/offers";

export function SignatureOffersSection() {
  return (
    <section className="relative border-t border-stellar-blue/10 bg-gradient-to-b from-stellar-void to-stellar-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Signature offers</p>
          <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">From reset to protection</h2>
        </SectionReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <SectionReveal>
            <article className="h-full rounded-3xl border border-stellar-blue/20 bg-stellar-surface/50 p-8">
              <h3 className="font-display text-2xl font-bold text-white">{STELLAR_RESET.title}</h3>
              <p className="mt-2 text-stellar-blue/90">{STELLAR_RESET.subtitle}</p>
              <p className="mt-4 text-sm text-zinc-400">{STELLAR_RESET.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-zinc-300">
                {STELLAR_RESET.components.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-stellar-orange">·</span>
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs font-bold uppercase tracking-wider text-zinc-500">{STELLAR_RESET.priceNote}</p>
              <div className="mt-8">
                <GlowButton href={STELLAR_RESET.cta} variant="outline" fullWidthMobile>
                  Request Stellar Reset
                </GlowButton>
              </div>
            </article>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <article className="h-full rounded-3xl border border-white/10 bg-stellar-black/60 p-8">
              <h3 className="font-display text-2xl font-bold text-white">{CUSTOM_INTERIOR_OFFER.title}</h3>
              <p className="mt-2 text-stellar-orange/90">{CUSTOM_INTERIOR_OFFER.subtitle}</p>
              <ul className="mt-6 space-y-2 text-sm text-zinc-300">
                {CUSTOM_INTERIOR_OFFER.items.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-zinc-500">{CUSTOM_INTERIOR_OFFER.note}</p>
              <Link href="/starlight-headliner" className="mt-4 inline-block text-sm text-stellar-blue hover:underline">
                Starlight headliners →
              </Link>
            </article>
          </SectionReveal>
        </div>

        <SectionReveal className="mt-16">
          <h3 className="font-display text-xl font-semibold text-white">Stellar Protection progression</h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROTECTION_LADDER.map((step) => (
              <div key={step.step} className="rounded-2xl border border-white/10 p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-stellar-blue">{step.step}</p>
                <p className="mt-2 font-display font-semibold text-white">{step.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">{step.body}</p>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500">{step.price}</p>
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal className="mt-12 rounded-2xl border border-dashed border-stellar-blue/25 bg-stellar-blue/5 p-6 sm:p-8">
          <h3 className="font-display text-lg font-semibold text-white">{MAINTENANCE_PROGRAM.title}</h3>
          <p className="mt-2 text-sm text-zinc-400">Available after: {MAINTENANCE_PROGRAM.availableAfter}</p>
          <p className="mt-4 text-xs text-zinc-500">{MAINTENANCE_PROGRAM.pricingNote}</p>
        </SectionReveal>
      </div>
    </section>
  );
}
