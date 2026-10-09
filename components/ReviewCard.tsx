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
              ? "text-lg leading-none text-[#d4af6a]"
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
      className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm transition duration-300 hover:border-white/[0.12] hover:bg-white/[0.045] sm:p-7"
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
