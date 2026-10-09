"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/GlowButton";
import {
  CUSTOM_INTERIOR_OFFER,
  PROTECTION_LADDER,
  STELLAR_RESET,
  MAINTENANCE_PROGRAM,
} from "@/lib/business/offers";

export function SignatureOffersSection() {
  return (
    <section className="border-t border-white/[0.06] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeader
            eyebrow="Packages"
            title="Common project types"
            description="Final pricing depends on inspection and photos."
          />
        </SectionReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <SectionReveal>
            <GlassCard>
              <h3 className="text-xl font-semibold text-white">{STELLAR_RESET.title}</h3>
              <p className="mt-2 text-sm text-zinc-500">{STELLAR_RESET.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">{STELLAR_RESET.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-zinc-400">
                {STELLAR_RESET.components.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-zinc-600">—</span>
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-zinc-600">{STELLAR_RESET.priceNote}</p>
              <div className="mt-8">
                <GlowButton href={STELLAR_RESET.cta} variant="outline" fullWidthMobile>
                  Request scope
                </GlowButton>
              </div>
            </GlassCard>
          </SectionReveal>

          <SectionReveal delay={0.06}>
            <GlassCard>
              <h3 className="text-xl font-semibold text-white">{CUSTOM_INTERIOR_OFFER.title}</h3>
              <p className="mt-2 text-sm text-zinc-500">{CUSTOM_INTERIOR_OFFER.subtitle}</p>
              <ul className="mt-6 space-y-2 text-sm text-zinc-400">
                {CUSTOM_INTERIOR_OFFER.items.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-zinc-500">{CUSTOM_INTERIOR_OFFER.note}</p>
              <Link href="/starlight-headliner" className="mt-4 inline-block text-sm text-zinc-400 hover:text-white">
                Starlight headliners →
              </Link>
            </GlassCard>
          </SectionReveal>
        </div>

        <SectionReveal className="mt-14">
          <h3 className="text-lg font-semibold text-white">Paint protection path</h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROTECTION_LADDER.map((step) => (
              <GlassCard key={step.step} className="!p-5">
                <p className="text-xs text-zinc-600">{step.step}</p>
                <p className="mt-1 text-sm font-medium text-white">{step.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">{step.body}</p>
                <p className="mt-4 text-xs text-zinc-600">{step.price}</p>
              </GlassCard>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal className="mt-10">
          <GlassCard className="border-dashed">
            <h3 className="text-sm font-medium text-white">{MAINTENANCE_PROGRAM.title}</h3>
            <p className="mt-2 text-sm text-zinc-500">Available after: {MAINTENANCE_PROGRAM.availableAfter}</p>
            <p className="mt-3 text-xs text-zinc-600">{MAINTENANCE_PROGRAM.pricingNote}</p>
          </GlassCard>
        </SectionReveal>
      </div>
    </section>
  );
}
