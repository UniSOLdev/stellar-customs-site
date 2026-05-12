"use client";

import { motion } from "framer-motion";
import { REVIEWS } from "@/lib/reviews-data";

function SourceBadge({ source }: { source: "google" | "facebook" }) {
  if (source === "google") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-300">
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M12 11.2h11.5c.1.6.2 1.2.2 1.8 0 6.2-4.2 10.6-11.7 10.6C5.4 24 0 18.6 0 12S5.4 0 12 0c3.1 0 5.7 1.1 7.7 2.9l-3.1 3C14.8 4.9 13.6 4.4 12 4.4 8.1 4.4 5 7.5 5 12s3.1 7.6 7 7.6c4 0 5.5-2.7 5.7-4.1H12V11.2z"
          />
        </svg>
        Google
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#1877F2]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#8ab4ff]">
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M22 12a10 10 0 10-11.5 9.95v-7.05H7.9V12h2.65V9.8c0-2.6 1.55-4.05 3.9-4.05 1.13 0 2.32.2 2.32.2v2.55h-1.3c-1.28 0-1.68.8-1.68 1.62V12h2.86l-.46 2.9h-2.4v7.05A10 10 0 0022 12z" />
      </svg>
      Facebook
    </span>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-stellar-orange" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} aria-hidden>
          ★
        </span>
      ))}
    </div>
  );
}

export function ReviewsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {REVIEWS.map((r, i) => (
        <motion.article
          key={r.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.04, duration: 0.5 }}
          whileHover={{ y: -5 }}
          className="flex h-full flex-col rounded-2xl border border-white/5 bg-stellar-surface/60 p-6 shadow-lg shadow-black/30 ring-1 ring-stellar-blue/10"
        >
          <Stars n={r.rating} />
          <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300">&ldquo;{r.quote}&rdquo;</p>
          <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/5 pt-4">
            <div>
              <p className="font-semibold text-white">{r.name}</p>
              <p className="text-[11px] text-zinc-500">{r.date}</p>
            </div>
            <SourceBadge source={r.source} />
          </div>
        </motion.article>
      ))}
    </div>
  );
}
