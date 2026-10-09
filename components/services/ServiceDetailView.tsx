import Link from "next/link";
import { GlowButton } from "@/components/GlowButton";
import { SectionReveal } from "@/components/SectionReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatPrice, fulfillmentLabel, PILLAR_META } from "@/lib/business/services-catalog";
import type { CatalogService } from "@/lib/business/types";
import { portfolioForServiceSlug } from "@/lib/business/portfolio";

type Props = { service: CatalogService };

export function ServiceDetailView({ service }: Props) {
  const pillar = PILLAR_META[service.pillar];
  const projects = portfolioForServiceSlug(service.slug);

  return (
    <div className="min-h-dvh pb-32 pt-24 md:pb-24 md:pt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-zinc-500">
          {pillar.order} · {pillar.title}
        </p>
        {service.availability === "future" ? (
          <span className="mt-3 inline-block rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-500">
            Planned service
          </span>
        ) : null}
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">{service.title}</h1>
        <p className="mt-5 text-xl tracking-tight text-zinc-300">{service.tagline}</p>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-500 sm:text-lg">{service.description}</p>

        <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
          <div className="bg-[#080809] p-5">
            <dt className="text-xs text-zinc-600">Price</dt>
            <dd className="mt-2 text-base font-medium text-white">{formatPrice(service)}</dd>
          </div>
          <div className="bg-[#080809] p-5">
            <dt className="text-xs text-zinc-600">Location</dt>
            <dd className="mt-2 text-sm text-zinc-300">{fulfillmentLabel(service.fulfillment)}</dd>
          </div>
          {service.timeframe ? (
            <div className="bg-[#080809] p-5">
              <dt className="text-xs text-zinc-600">Typical timeframe</dt>
              <dd className="mt-2 text-sm text-zinc-300">{service.timeframe}</dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <SectionReveal>
            <GlassCard className="h-full">
              <h2 className="text-sm font-medium text-white">Best suited for</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">{service.whoItsFor}</p>
            </GlassCard>
          </SectionReveal>
          <SectionReveal delay={0.05}>
            <GlassCard className="h-full">
              <h2 className="text-sm font-medium text-white">What it addresses</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">{service.problemSolved}</p>
            </GlassCard>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <GlassCard className="h-full">
              <h2 className="text-sm font-medium text-white">Expected result</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">{service.expectedResult}</p>
            </GlassCard>
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
            Request a quote
          </GlowButton>
          <GlowButton href="/services" variant="outline" fullWidthMobile>
            All services
          </GlowButton>
        </SectionReveal>

        <p className="mt-10 text-center text-xs text-zinc-600">
          Palm Beach County ·{" "}
          <Link href="/services" className="text-zinc-500 hover:text-white">
            Explore {pillar.title}
          </Link>
        </p>
      </div>
    </div>
  );
}
