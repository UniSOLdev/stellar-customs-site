"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { SITE, SITE_GOOGLE_REVIEW_URL } from "@/lib/site";

const PRIMARY_AREAS = ["Odenville", "Birmingham", "Trussville"] as const;

const CAPABILITIES: { title: string; body: string }[] = [
  {
    title: "Mobile Repair Specialists",
    body: "Full-service diagnostics, brakes, electrical, and drivability — performed on-site across Alabama.",
  },
  {
    title: "Performance & Custom Builds",
    body: "Bolt-ons, tuning consults, and clean install work for owners who care how it’s done.",
  },
  {
    title: "Show-Quality Lighting",
    body: "Starlight headliners, interior LED, and accent installs with factory-grade routing.",
  },
];

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden focusable="false">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41 35.6 44 30.2 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

function GoldStars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden className={i < count ? "drop-shadow-[0_0_6px_rgba(251,191,36,0.45)]" : "opacity-25"}>
          ★
        </span>
      ))}
    </div>
  );
}

export function TrustedAcrossAlabama() {
  return (
    <section className="relative border-y border-stellar-blue/10 bg-gradient-to-b from-stellar-black via-stellar-void to-stellar-black py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(58,160,255,0.07),transparent)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Trust</p>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Trusted Across Alabama
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                Mobile repair, performance, and custom lighting specialists — serving{" "}
                <span className="text-white">Odenville, Birmingham, and Trussville</span> with on-site workmanship that
                earns repeat clients.
              </p>
            </div>

            <motion.a
              href={SITE_GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex w-full max-w-sm items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.75)] backdrop-blur-md ring-1 ring-amber-300/10 transition hover:border-amber-300/30 hover:ring-amber-300/30 md:w-auto"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/95">
                <GoogleG className="h-7 w-7" />
              </span>
              <span className="flex flex-col">
                <span className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold tabular-nums text-white">
                    {SITE.googleRatingLabel}
                  </span>
                  <GoldStars count={5} />
                </span>
                <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Rating on Google
                </span>
              </span>
              <span
                aria-hidden
                className="ml-auto hidden text-xs font-semibold uppercase tracking-widest text-amber-300/70 transition group-hover:translate-x-0.5 group-hover:text-amber-200 md:inline"
              >
                See →
              </span>
            </motion.a>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.05} className="mt-10">
          <div className="flex flex-wrap items-center gap-2">
            {PRIMARY_AREAS.map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-stellar-black/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-200"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-stellar-blue shadow-[0_0_8px_rgba(0,180,255,0.6)]" aria-hidden />
                {city}
              </span>
            ))}
            <span className="inline-flex items-center rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 text-[11px] uppercase tracking-wider text-zinc-500">
              + St. Clair County
            </span>
          </div>
        </SectionReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((card, i) => (
            <SectionReveal key={card.title} delay={i * 0.06}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 shadow-[0_20px_50px_-22px_rgba(0,0,0,0.8)] backdrop-blur-md ring-1 ring-stellar-blue/[0.06] transition duration-300 hover:border-stellar-blue/20 hover:ring-stellar-blue/15">
                <div className="h-px w-10 bg-gradient-to-r from-stellar-blue/80 to-stellar-orange/60" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{card.body}</p>
              </article>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.1} className="mt-10">
          <div className="flex flex-col items-start gap-3 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Every install and service is documented — see{" "}
              <Link href="/gallery" className="text-zinc-200 underline-offset-4 hover:text-stellar-blue hover:underline">
                recent work
              </Link>{" "}
              or read{" "}
              <Link href="/reviews" className="text-zinc-200 underline-offset-4 hover:text-stellar-blue hover:underline">
                what clients say
              </Link>
              .
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-600">
              {SITE.location} · Mobile service · {SITE.recommendPercent} recommended
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
