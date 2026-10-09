import Link from "next/link";
import { GlowButton } from "@/components/GlowButton";
import { SectionReveal } from "@/components/SectionReveal";
import { formatPrice, fulfillmentLabel, PILLAR_META } from "@/lib/business/services-catalog";
import type { CatalogService } from "@/lib/business/types";
import { portfolioForServiceSlug } from "@/lib/business/portfolio";

type Props = { service: CatalogService };

export function ServiceDetailView({ service }: Props) {
  const pillar = PILLAR_META[service.pillar];
  const projects = portfolioForServiceSlug(service.slug);

  return (
    <div className="min-h-dvh bg-stellar-black pb-40 pt-28 md:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">
          {pillar.order} · {pillar.title}
        </p>
        {service.availability === "future" ? (
          <span className="mt-3 inline-block rounded-full border border-stellar-orange/40 bg-stellar-orange/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stellar-orange-soft">
            Coming soon — quote for waitlist
          </span>
        ) : null}
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">{service.title}</h1>
        <p className="mt-4 text-lg text-stellar-blue/90">{service.tagline}</p>
        <p className="mt-6 text-base leading-relaxed text-zinc-400">{service.description}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-stellar-surface/40 p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Starting at</p>
            <p className="mt-2 font-display text-lg font-semibold text-white">{formatPrice(service)}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-stellar-surface/40 p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Where</p>
            <p className="mt-2 text-sm text-zinc-200">{fulfillmentLabel(service.fulfillment)}</p>
          </div>
          {service.timeframe ? (
            <div className="rounded-2xl border border-white/10 bg-stellar-surface/40 p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Typical time</p>
              <p className="mt-2 text-sm text-zinc-200">{service.timeframe}</p>
            </div>
          ) : null}
        </div>

        <div className="mt-12 space-y-8">
          <SectionReveal>
            <h2 className="font-display text-xl font-semibold text-white">Who it&apos;s for</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{service.whoItsFor}</p>
          </SectionReveal>
          <SectionReveal delay={0.05}>
            <h2 className="font-display text-xl font-semibold text-white">What it solves</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{service.problemSolved}</p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-display text-xl font-semibold text-white">Expected result</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{service.expectedResult}</p>
          </SectionReveal>
        </div>

        {projects.length > 0 ? (
          <SectionReveal className="mt-14">
            <h2 className="font-display text-xl font-semibold text-white">Recent results</h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              {projects.map((p) => (
                <li key={p.id}>
                  {p.vehicle.make} {p.vehicle.model}
                  {p.city ? ` · ${p.city}` : ""}
                </li>
              ))}
            </ul>
          </SectionReveal>
        ) : null}

        <SectionReveal className="mt-14 flex flex-col gap-4 sm:flex-row">
          <GlowButton href="/quote" fullWidthMobile>
            Get My Quote
          </GlowButton>
          <GlowButton href="/services" variant="outline" fullWidthMobile>
            All services
          </GlowButton>
        </SectionReveal>

        <p className="mt-10 text-center text-xs text-zinc-600">
          Palm Beach County ·{" "}
          <Link href="/services" className="text-stellar-blue hover:underline">
            Explore {pillar.title}
          </Link>
        </p>
      </div>
    </div>
  );
}
