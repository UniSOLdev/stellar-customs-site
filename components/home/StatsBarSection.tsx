"use client";

import { SectionReveal } from "@/components/SectionReveal";
import { SITE, SITE_STATS } from "@/lib/site";

export function StatsBarSection() {
  return (
    <section className="border-y border-white/[0.06] py-12 sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionReveal>
          <dl className="grid grid-cols-2 gap-8 text-center sm:grid-cols-3">
            <div>
              <dt className="text-xs text-zinc-600">Public reviews</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-white">{SITE_STATS.fiveStarReviews}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-600">County</dt>
              <dd className="mt-1 text-sm font-medium text-white">Palm Beach</dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-xs text-zinc-600">Contact</dt>
              <dd className="mt-1 text-sm font-medium text-white">{SITE.phone}</dd>
            </div>
          </dl>
        </SectionReveal>
      </div>
    </section>
  );
}
