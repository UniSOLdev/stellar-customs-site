"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { CITY_PAGES, PRIMARY_COUNTY_LABEL } from "@/lib/business/service-areas";
import { REGIONAL_PITCH } from "@/lib/site";

export function ServiceAreasSection() {
  return (
    <section className="border-t border-white/[0.06] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeader eyebrow="Coverage" title={PRIMARY_COUNTY_LABEL} description={REGIONAL_PITCH} />
        </SectionReveal>

        <SectionReveal className="mt-10">
          <GlassCard>
            <p className="text-sm font-medium text-white">Cities</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {CITY_PAGES.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${city.slug}`}
                    className="inline-flex min-h-[40px] items-center rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-sm text-zinc-400 transition hover:border-white/15 hover:text-white"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </GlassCard>
        </SectionReveal>

        <p className="mt-8 text-center text-xs text-zinc-600">
          Include your address in a quote request to confirm routing. Palm Beach County is our primary base.
        </p>
      </div>
    </section>
  );
}
