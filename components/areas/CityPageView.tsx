import Link from "next/link";
import { GlowButton } from "@/components/GlowButton";
import { SectionReveal } from "@/components/SectionReveal";
import type { CityPage } from "@/lib/business/types";
import { PILLAR_META, servicesByPillar } from "@/lib/business/services-catalog";
import { portfolioForCity } from "@/lib/business/portfolio";

type Props = { city: CityPage };

export function CityPageView({ city }: Props) {
  const projects = portfolioForCity(city.slug);

  return (
    <div className="min-h-dvh bg-stellar-black pb-40 pt-28 md:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">{city.county}</p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">{city.headline}</h1>
        <p className="mt-6 text-base leading-relaxed text-zinc-400">{city.intro}</p>
        <p className="mt-4 text-sm leading-relaxed text-zinc-500">{city.localAngle}</p>

        {city.neighborhoods?.length ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {city.neighborhoods.map((n) => (
              <span key={n} className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
                {n}
              </span>
            ))}
          </div>
        ) : null}

        <SectionReveal className="mt-14">
          <h2 className="font-display text-2xl font-bold text-white">What we do in {city.name}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {(Object.keys(PILLAR_META) as Array<keyof typeof PILLAR_META>).map((key) => {
              const meta = PILLAR_META[key];
              const items = servicesByPillar(key).slice(0, 3);
              return (
                <div key={key} className="rounded-2xl border border-white/10 bg-stellar-surface/30 p-6">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stellar-blue">
                    {meta.order} {meta.title}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {items.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/${s.slug}`} className="text-zinc-300 hover:text-stellar-blue">
                          {s.shortTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </SectionReveal>

        {projects.length > 0 ? (
          <SectionReveal className="mt-12">
            <h2 className="font-display text-xl font-semibold text-white">Local project highlights</h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              {projects.map((p) => (
                <li key={p.id}>{p.description}</li>
              ))}
            </ul>
          </SectionReveal>
        ) : null}

        <SectionReveal className="mt-14">
          <GlowButton href="/quote" fullWidthMobile>
            Get My Quote — {city.name}
          </GlowButton>
        </SectionReveal>
      </div>
    </div>
  );
}
