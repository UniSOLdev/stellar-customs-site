"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { siteSmsHref, siteTelHref } from "@/lib/site";

/** Premium mobile conversion bar — hidden on admin, login, and booking (dedicated CTAs there). */
export function StickyMobileCall() {
  const pathname = usePathname();
  if (
    pathname?.startsWith("/admin") ||
    pathname === "/login" ||
    pathname?.startsWith("/login/") ||
    pathname === "/booking"
  ) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[110] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="pointer-events-auto flex flex-col gap-2 rounded-2xl border border-white/[0.08] bg-stellar-black/95 p-2.5 shadow-[0_-8px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl ring-1 ring-stellar-blue/15">
        <div className="flex gap-2">
          <Link
            href="/booking"
            className="flex min-h-[48px] flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-stellar-blue-deep to-stellar-blue text-xs font-bold uppercase tracking-[0.12em] text-black shadow-[0_0_24px_rgba(0,180,255,0.35)] transition active:scale-[0.99]"
          >
            Book install
          </Link>
          <Link
            href="/contact"
            className="flex min-h-[48px] min-w-[48px] flex-1 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-[10px] font-bold uppercase tracking-wider text-white transition hover:border-stellar-blue/40"
          >
            Quote
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <motion.a
            href={siteTelHref()}
            whileTap={{ scale: 0.98 }}
            className="flex min-h-[44px] items-center justify-center rounded-lg border border-white/10 bg-stellar-void/80 text-[10px] font-semibold uppercase tracking-wide text-zinc-200"
          >
            Call
          </motion.a>
          <motion.a
            href={siteSmsHref("Stellar Customs — ")}
            whileTap={{ scale: 0.98 }}
            className="flex min-h-[44px] items-center justify-center rounded-lg border border-white/10 bg-stellar-void/80 text-[10px] font-semibold uppercase tracking-wide text-zinc-200"
          >
            Text
          </motion.a>
          <Link
            href="/contact"
            className="flex min-h-[44px] items-center justify-center rounded-lg border border-stellar-orange/35 bg-stellar-orange/10 text-[10px] font-semibold uppercase tracking-wide text-stellar-orange-soft"
          >
            Emergency
          </Link>
        </div>
      </div>
    </div>
  );
}
