"use client";

import { motion } from "framer-motion";
import { FacebookIcon } from "@/components/icons/SocialIcons";

export type ReviewCardProps = {
  name: string;
  rating: number;
  date: string;
  text: string;
  source: string;
};

function Stars({ count }: { count: number }) {
  const n = Math.max(0, Math.min(5, Math.round(count)));
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={
            i < n
              ? "text-lg leading-none text-[#f5c518] drop-shadow-[0_0_6px_rgba(245,197,24,0.35)]"
              : "text-lg leading-none text-zinc-700"
          }
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function ReviewCard({ name, rating, date, text, source }: ReviewCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className="flex h-full flex-col rounded-2xl border border-stellar-blue/20 bg-[#0b0b0f] p-5 shadow-[0_0_0_1px_rgba(0,180,255,0.08),0_0_28px_rgba(0,180,255,0.12)] transition-shadow duration-300 hover:border-stellar-blue/35 hover:shadow-[0_0_0_1px_rgba(0,180,255,0.15),0_0_36px_rgba(0,180,255,0.22)] sm:p-6"
    >
      <Stars count={rating} />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">&ldquo;{text}&rdquo;</p>
      <div className="mt-6 border-t border-white/5 pt-4">
        <p className="font-semibold text-white">{name}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <p className="text-xs text-zinc-500">{date}</p>
          <span className="hidden h-3 w-px bg-zinc-600 sm:inline" aria-hidden />
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[#1877F2]/25 bg-[#1877F2]/10 px-2 py-0.5 text-[11px] font-semibold text-[#9ec5ff]">
            <FacebookIcon className="h-3 w-3 shrink-0" aria-hidden />
            {source}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
