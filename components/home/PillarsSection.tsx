"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { PILLAR_META } from "@/lib/business/services-catalog";
import type { ServicePillar } from "@/lib/business/types";

const ORDER: ServicePillar[] = ["detail", "restore", "protect", "customize"];

export function PillarsSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeader
            eyebrow="Services"
            title="Four ways we work on your vehicle"
            description="South Florida exposure — UV, salt air, humidity, and daily use — drives how we detail, restore, protect, and customize."
          />
        </SectionReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ORDER.map((key, i) => {
            const p = PILLAR_META[key];
            return (
              <SectionReveal key={key} delay={i * 0.05}>
                <Link href={`/services#${key}`} className="group block h-full">
                  <GlassCard className="h-full transition hover:border-white/[0.14] hover:bg-white/[0.05]">
                    <p className="text-xs tabular-nums text-zinc-600">{p.order}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white group-hover:text-zinc-100">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-500">{p.summary}</p>
                    <span className="mt-5 inline-block text-sm text-zinc-400 group-hover:text-white">View services →</span>
                  </GlassCard>
                </Link>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
