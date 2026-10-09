"use client";

import { SectionReveal } from "@/components/SectionReveal";
import { SITE, SITE_HIGHLIGHTS, SITE_STATS } from "@/lib/site";
import { PILLAR_META } from "@/lib/business/services-catalog";

export function StatsBarSection() {
  return (
    <section className="border-y border-white/[0.06] bg-stellar-void/80 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">At a glance</p>
        </SectionReveal>
        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-white">4</p>
            <p className="mt-2 text-[11px] uppercase tracking-wider text-zinc-500">Core pillars</p>
            <p className="mt-1 text-xs text-zinc-600">{PILLAR_META.detail.title} · {PILLAR_META.restore.title} · …</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-white">{SITE_STATS.fiveStarReviews}</p>
            <p className="mt-2 text-[11px] uppercase tracking-wider text-zinc-500">Reviews (tracked)</p>
          </div>
          <div className="text-center">
            <p className="font-display text-lg font-bold text-white">{SITE_HIGHLIGHTS.primaryCounty}</p>
            <p className="mt-2 text-[11px] uppercase tracking-wider text-zinc-500">Primary market</p>
          </div>
          <div className="text-center">
            <p className="font-display text-lg font-bold text-white">Quote-first</p>
            <p className="mt-2 text-[11px] uppercase tracking-wider text-zinc-500">No cheap wash pricing</p>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-zinc-600">
          {SITE.shortName} — {SITE_HIGHLIGHTS.responseNote.toLowerCase()}.
        </p>
      </div>
    </section>
  );
}
