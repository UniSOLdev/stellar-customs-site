"use client";

import { motion } from "framer-motion";
import type { ReviewRow } from "@/lib/db/types";

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

type Props = {
  reviews: ReviewRow[];
};

export function ReviewsDbClient({ reviews }: Props) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stellar-blue/25 bg-stellar-blue/5 p-10 text-center">
        <p className="font-display text-lg font-semibold text-white">Reviews will appear here</p>
        <p className="mt-3 text-sm text-zinc-400">
          Add curated testimonials in Admin → Reviews. Facebook and Google CTAs stay above for social proof.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.map((r, i) => (
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
          <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300">&ldquo;{r.review_text}&rdquo;</p>
          <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/5 pt-4">
            <div>
              <p className="font-semibold text-white">{r.customer_name}</p>
              <p className="text-[11px] text-zinc-500">
                {new Date(r.created_at).toLocaleDateString(undefined, { dateStyle: "medium" })}
              </p>
            </div>
            <span className="rounded-full border border-stellar-blue/30 bg-stellar-blue/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stellar-blue">
              Stellar
            </span>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
