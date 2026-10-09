"use client";

import { SectionReveal } from "@/components/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const CARDS = [
  {
    title: "Headliner",
    before: "from-zinc-900 via-zinc-950 to-black",
    after: "from-slate-900 via-indigo-950/40 to-black",
    caption: "Replacement or starlight upgrade after Florida heat and adhesive failure.",
  },
  {
    title: "Interior lighting",
    before: "from-zinc-800 to-zinc-950",
    after: "from-slate-900 to-indigo-950/30",
    caption: "Ambient layers with even output — typical studio install.",
  },
] as const;

export function TransformationShowcase() {
  return (
    <section className="border-t border-white/[0.06] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeader
            eyebrow="Results"
            title="Before and after"
            description="Placeholder panels below — replace with photography from completed jobs."
          />
        </SectionReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {CARDS.map((card, i) => (
            <SectionReveal key={card.title} delay={i * 0.06}>
              <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                <div className="relative aspect-[16/10] w-full">
                  <div className="absolute inset-0 flex">
                    <div className={`relative w-1/2 bg-gradient-to-br ${card.before}`}>
                      <span className="absolute left-4 top-4 rounded-md bg-black/50 px-2 py-1 text-xs text-zinc-400 backdrop-blur-sm">
                        Before
                      </span>
                    </div>
                    <div className={`relative w-1/2 bg-gradient-to-bl ${card.after}`}>
                      <span className="absolute right-4 top-4 rounded-md bg-black/50 px-2 py-1 text-xs text-zinc-300 backdrop-blur-sm">
                        After
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/[0.06] p-6">
                  <h3 className="text-sm font-medium text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{card.caption}</p>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
