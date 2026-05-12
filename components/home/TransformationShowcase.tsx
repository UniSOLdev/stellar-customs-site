"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";

const CARDS = [
  {
    title: "Headliner transformation",
    before: "from-zinc-900 via-black to-zinc-950",
    after: "from-indigo-950/90 via-stellar-blue/20 to-stellar-black",
    caption: "From flat black panel to a controlled starfield — mapped, dimmable, and trim-perfect.",
  },
  {
    title: "Cabin lighting architecture",
    before: "from-zinc-800 to-stellar-black",
    after: "from-purple-950/70 to-stellar-blue/25",
    caption: "From OEM shadow pockets to layered ambient planes — no hot spots, no loose clips.",
  },
] as const;

export function TransformationShowcase() {
  return (
    <section className="relative border-t border-stellar-blue/10 bg-stellar-black py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(0,180,255,0.06),transparent)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Transformations</p>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Before / after discipline
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Restrained reveals — the kind of upgrade that reads expensive in person, not loud on a screen.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {CARDS.map((card, i) => (
            <SectionReveal key={card.title} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] backdrop-blur-md ring-1 ring-stellar-blue/[0.08]"
              >
                <div className="relative aspect-[16/10] w-full sm:aspect-[2/1]">
                  <div className="absolute inset-0 flex">
                    <motion.div
                      className={`relative w-1/2 bg-gradient-to-br ${card.before}`}
                      initial={{ opacity: 0.85 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400 backdrop-blur-sm">
                        Before
                      </span>
                    </motion.div>
                    <motion.div
                      className={`relative w-1/2 bg-gradient-to-bl ${card.after}`}
                      initial={{ opacity: 0.85 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.08 }}
                    >
                      <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                        After
                      </span>
                    </motion.div>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="border-t border-white/5 p-6 sm:p-8">
                  <h3 className="font-display text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{card.caption}</p>
                </div>
              </motion.article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
