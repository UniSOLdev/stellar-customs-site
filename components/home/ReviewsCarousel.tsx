"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { HomeReviewSlide } from "@/lib/reviews-carousel-data";
import { SectionReveal } from "@/components/SectionReveal";

const AUTO_MS = 9000;

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "?";
  const b = parts.length > 1 ? parts[parts.length - 1]![0] : parts[0]?.[1];
  return (a + (b ?? "")).toUpperCase();
}

function Stars({ n }: { n: number }) {
  const filled = Math.min(5, Math.max(0, Math.round(n)));
  return (
    <div className="flex gap-1" aria-label={`${filled} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={
            i < filled
              ? "text-lg text-[#d4af6a]"
              : "text-lg text-zinc-700"
          }
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

type Props = {
  reviews: HomeReviewSlide[];
};

export function ReviewsCarousel({ reviews }: Props) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const len = reviews.length;
  const idx = len ? i % len : 0;
  const current = reviews[idx] ?? null;

  const next = useCallback(() => {
    if (!len) return;
    setI((v) => (v + 1) % len);
  }, [len]);

  const prev = useCallback(() => {
    if (!len) return;
    setI((v) => (v - 1 + len) % len);
  }, [len]);

  useEffect(() => {
    if (!len || paused) return;
    const t = window.setInterval(next, AUTO_MS);
    return () => window.clearInterval(t);
  }, [len, paused, next]);

  if (!current) return null;

  return (
    <section className="relative border-t border-white/[0.06] bg-stellar-black py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(120,130,150,0.08),transparent)]" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">What clients say</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">
            Recent feedback from detailing, restoration, and customization clients across Palm Beach County.
          </p>
        </SectionReveal>

        <div
          className="relative mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
          }}
          onTouchStart={(e) => {
            const p = e.touches[0];
            touch.current = { x: p.clientX, y: p.clientY };
          }}
          onTouchEnd={(e) => {
            const start = touch.current;
            touch.current = null;
            if (!start) return;
            const p = e.changedTouches[0];
            const dx = p.clientX - start.x;
            const dy = p.clientY - start.y;
            if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy)) {
              if (dx < 0) next();
              else prev();
            }
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-sm font-semibold tracking-wide text-white"
                  aria-hidden
                >
                  {initials(current.customer_name)}
                </div>
                <div className="min-w-0 flex-1">
                  <Stars n={current.rating} />
                  <blockquote className="mt-6 text-lg leading-relaxed text-zinc-100 sm:text-xl">
                    &ldquo;{current.review_text}&rdquo;
                  </blockquote>
                </div>
              </div>
              <figcaption className="mt-8 flex flex-col gap-1 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-white">{current.customer_name}</p>
                  <p className="text-sm text-zinc-500">{current.service_type}</p>
                </div>
                <p className="text-xs text-zinc-600">Swipe for more reviews</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {len > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous review"
                onClick={prev}
                className="absolute left-0 top-1/2 z-10 hidden min-h-[44px] min-w-[44px] -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-stellar-black/80 text-zinc-300 backdrop-blur-sm transition hover:border-stellar-blue/40 hover:text-white md:flex lg:-translate-x-14"
              >
                <span aria-hidden className="text-lg">
                  ←
                </span>
              </button>
              <button
                type="button"
                aria-label="Next review"
                onClick={next}
                className="absolute right-0 top-1/2 z-10 hidden min-h-[44px] min-w-[44px] -translate-y-1/2 translate-x-2 items-center justify-center rounded-full border border-white/10 bg-stellar-black/80 text-zinc-300 backdrop-blur-sm transition hover:border-stellar-blue/40 hover:text-white md:flex lg:translate-x-14"
              >
                <span aria-hidden className="text-lg">
                  →
                </span>
              </button>
              <div className="mt-6 flex justify-center gap-1.5">
                {reviews.map((r, dot) => (
                  <button
                    key={r.id}
                    type="button"
                    aria-label={`Go to review ${dot + 1}`}
                    aria-current={dot === idx ? true : undefined}
                    onClick={() => setI(dot)}
                    className={`h-1.5 rounded-full transition-all ${
                      dot === idx ? "w-8 bg-white/80" : "w-1.5 bg-zinc-600 hover:bg-zinc-500"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
