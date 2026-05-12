"use client";

import { motion } from "framer-motion";
import { SITE, siteTelHref } from "@/lib/site";

/** Fixed bottom bar — visible on small screens only so tap-to-call is always one tap away. */
export function StickyMobileCall() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[110] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <motion.a
        href={siteTelHref()}
        className="pointer-events-auto flex w-full items-center justify-center gap-2 rounded-2xl border border-stellar-blue/40 bg-stellar-black/95 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_24px_rgba(0,180,255,0.25)] backdrop-blur-md transition hover:border-stellar-blue hover:shadow-[0_0_28px_rgba(0,180,255,0.45)] active:scale-[0.99]"
        style={{ minHeight: "48px" }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" aria-hidden />
        Call {SITE.phone}
      </motion.a>
    </div>
  );
}
