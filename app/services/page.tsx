import type { Metadata } from "next";
import Link from "next/link";
import { GlowButton } from "@/components/GlowButton";
import { SectionReveal } from "@/components/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatPrice, fulfillmentLabel, PILLAR_META, servicesByPillar } from "@/lib/business/services-catalog";
import type { ServicePillar } from "@/lib/business/types";
import { CONCIERGE } from "@/lib/concierge-copy";
import { SITE, BRAND_TAGLINE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services | Auto Detailing, Restoration & Customization — Palm Beach County",
  description: `${SITE.shortName} — ${BRAND_TAGLINE} Premium mobile detailing, restoration, ceramic coating, and custom interiors in Palm Beach County.`,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services | ${SITE.shortName}`,
    description: "Detail · Restore · Protect · Customize — Palm Beach County",
    url: absoluteUrl("/services"),
  },
};

const PILLARS: ServicePillar[] = ["detail", "restore", "protect", "customize"];

export default function ServicesPage() {
  return (
    <div className="min-h-dvh pb-32 pt-24 md:pb-24 md:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-zinc-500">Services</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">{BRAND_TAGLINE}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">{CONCIERGE.heroLead}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">{CONCIERGE.heroSupport}</p>
          <div className="mt-8">
            <GlowButton href="/quote">Request a quote</GlowButton>
          </div>
        </div>

        <nav className="mt-12 flex flex-wrap gap-2 border-y border-white/[0.07] py-4" aria-label="Service categories">
          {PILLARS.map((pillar) => (
            <a
              key={pillar}
              href={`#${pillar}`}
              className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-sm text-zinc-400 transition hover:border-white/15 hover:text-white"
            >
              {PILLAR_META[pillar].title}
            </a>
          ))}
        </nav>

        <div className="mt-20 space-y-24">
          {PILLARS.map((pillar) => {
            const meta = PILLAR_META[pillar];
            const items = servicesByPillar(pillar);
            return (
              <section key={pillar} id={pillar} className="scroll-mt-28">
                <SectionReveal>
                  <SectionHeader
                    eyebrow={`${meta.order} / ${meta.title}`}
                    title={meta.verb}
                    description={meta.summary}
                  />
                </SectionReveal>

                <div className="mt-10 divide-y divide-white/[0.07] border-y border-white/[0.07]">
                  {items.map((s, i) => (
                    <SectionReveal key={s.slug} delay={i * 0.04}>
                      <Link
                        href={`/${s.slug}`}
                        className="group grid gap-4 py-6 transition sm:grid-cols-[1fr_11rem_7rem_auto] sm:items-center"
                      >
                        <div>
                          <h3 className="text-base font-medium text-white">{s.shortTitle}</h3>
                          <p className="mt-1 max-w-xl text-sm leading-relaxed text-zinc-500">{s.problemSolved}</p>
                        </div>
                        <p className="text-sm text-zinc-400">{formatPrice(s)}</p>
                        <p className="text-sm text-zinc-600">
                          {fulfillmentLabel(s.fulfillment)}
                        </p>
                        <span className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-white" aria-hidden>→</span>
                      </Link>
                    </SectionReveal>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
