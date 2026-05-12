"use client";

import { useEffect, useRef, useState } from "react";
import { SectionReveal } from "@/components/SectionReveal";
import { SITE_STATS } from "@/lib/site";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function useCountUp(target: number, enabled: boolean, durationMs = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      setValue(Math.round(target * easeOutCubic(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, target, durationMs]);

  return value;
}

type StatProps = {
  label: string;
  target: number;
  suffix?: string;
  enabled: boolean;
};

function Stat({ label, target, suffix = "", enabled }: StatProps) {
  const n = useCountUp(target, enabled);
  return (
    <div className="text-center">
      <p className="font-display text-3xl font-bold tabular-nums tracking-tight text-white sm:text-4xl">
        {n}
        {suffix}
      </p>
      <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">{label}</p>
    </div>
  );
}

function ResponseStat({ enabled }: { enabled: boolean }) {
  const n = useCountUp(SITE_STATS.responseHours, enabled);
  return (
    <div className="text-center">
      <p className="font-display text-3xl font-bold tabular-nums tracking-tight text-white sm:text-4xl">
        {n}
        <span className="text-2xl font-semibold text-zinc-400 sm:text-3xl"> hrs</span>
      </p>
      <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">Avg. response</p>
    </div>
  );
}

export function StatsBarSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setOn(true);
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="border-y border-white/[0.06] bg-stellar-void/80 py-16 sm:py-20">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Proof</p>
          <h2 className="font-display mt-2 text-center text-2xl font-bold text-white sm:text-3xl">By the numbers</h2>
        </SectionReveal>
        <div className="mt-12 grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          <Stat label="Vehicles serviced" target={SITE_STATS.vehiclesServiced} suffix="+" enabled={on} />
          <Stat label="5-star reviews" target={SITE_STATS.fiveStarReviews} enabled={on} />
          <Stat label="Years experience" target={SITE_STATS.yearsExperience} suffix="+" enabled={on} />
          <ResponseStat enabled={on} />
        </div>
      </div>
    </section>
  );
}
