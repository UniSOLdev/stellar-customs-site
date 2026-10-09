import type { Metadata } from "next";
import Link from "next/link";
import { GlowButton } from "@/components/GlowButton";
import { SectionReveal } from "@/components/SectionReveal";
import { formatPrice, fulfillmentLabel, PILLAR_META, servicesByPillar } from "@/lib/business/services-catalog";
import type { ServicePillar } from "@/lib/business/types";
import { SITE, BRAND_TAGLINE, absoluteUrl } from "@/lib/site";
import { STELLAR_STUDIO } from "@/lib/business/studio";

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
    <div className="min-h-dvh bg-stellar-black pb-40 pt-28 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Services</p>
        <h1 className="font-display mt-3 text-4xl font-bold text-white sm:text-5xl">{BRAND_TAGLINE}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">
          Four ways we improve your vehicle in South Florida — from mobile maintenance details to studio restoration,
          correction, ceramic protection, and custom cabins.
        </p>
        <div className="mt-8">
          <GlowButton href="/quote">Get My Quote</GlowButton>
        </div>

        {!STELLAR_STUDIO.published ? (
          <p className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-zinc-500">
            <span className="font-semibold text-zinc-400">{STELLAR_STUDIO.name}</span> —{" "}
            {STELLAR_STUDIO.areaLabel} studio coming soon. Multi-day installs and correction booked after lease
            confirmation.
          </p>
        ) : null}

        <div className="mt-16 space-y-20">
          {PILLARS.map((pillar) => {
            const meta = PILLAR_META[pillar];
            const items = servicesByPillar(pillar);
            return (
              <section key={pillar} id={pillar} className="scroll-mt-28">
                <SectionReveal>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-stellar-orange">{meta.order}</p>
                  <h2 className="font-display mt-2 text-3xl font-bold text-white">{meta.title}</h2>
                  <p className="mt-2 text-stellar-blue/90">{meta.verb}</p>
                  <p className="mt-3 max-w-2xl text-sm text-zinc-400">{meta.summary}</p>
                </SectionReveal>

                <div className="mt-10 grid gap-4 lg:grid-cols-2">
                  {items.map((s, i) => (
                    <SectionReveal key={s.slug} delay={i * 0.04}>
                      <Link
                        href={`/${s.slug}`}
                        className="group block h-full rounded-2xl border border-white/10 bg-stellar-surface/50 p-6 transition hover:border-stellar-blue/30"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="font-display text-lg font-semibold text-white group-hover:text-stellar-blue">
                            {s.shortTitle}
                          </h3>
                          <span className="text-xs font-bold uppercase tracking-wider text-stellar-blue">
                            {formatPrice(s)}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-zinc-400 line-clamp-2">{s.problemSolved}</p>
                        <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                          {fulfillmentLabel(s.fulfillment)}
                        </p>
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
