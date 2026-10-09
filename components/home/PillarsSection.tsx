"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";
import { PILLAR_META } from "@/lib/business/services-catalog";
import type { ServicePillar } from "@/lib/business/types";

const ORDER: ServicePillar[] = ["detail", "restore", "protect", "customize"];

export function PillarsSection() {
  return (
    <section className="relative border-t border-stellar-blue/10 bg-stellar-void py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">How we work</p>
          <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">Built for South Florida</h2>
          <p className="mt-4 max-w-2xl text-sm text-zinc-400 sm:text-base">
            Protection designed for Palm Beach conditions — not a national template. Four clear paths from a clean
            baseline to restoration, ceramic, and custom cabins.
          </p>
        </SectionReveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ORDER.map((key, i) => {
            const p = PILLAR_META[key];
            return (
              <SectionReveal key={key} delay={i * 0.06}>
                <Link
                  href={`/services#${key}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-stellar-surface/60 p-6 transition hover:border-stellar-blue/35"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stellar-orange">{p.order}</span>
                  <h3 className="font-display mt-3 text-xl font-bold text-white group-hover:text-stellar-blue">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wide text-stellar-blue/80">{p.verb}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">{p.summary}</p>
                  <span className="mt-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-stellar-orange">
                    Explore →
                  </span>
                </Link>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
