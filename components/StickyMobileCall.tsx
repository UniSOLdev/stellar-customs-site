"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteSmsHref, siteTelHref } from "@/lib/site";

export function StickyMobileCall() {
  const pathname = usePathname();
  if (
    pathname?.startsWith("/admin") ||
    pathname === "/login" ||
    pathname?.startsWith("/login/") ||
    pathname === "/quote"
  ) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[110] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="pointer-events-auto flex gap-2 rounded-2xl border border-white/[0.08] bg-stellar-black/95 p-2.5 shadow-[0_-8px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl">
        <Link
          href="/quote"
          className="flex min-h-[48px] flex-[2] items-center justify-center rounded-xl bg-gradient-to-r from-stellar-blue-deep to-stellar-blue text-xs font-bold uppercase tracking-wider text-black"
        >
          Get a Quote
        </Link>
        <a
          href={siteSmsHref()}
          className="flex min-h-[48px] flex-1 items-center justify-center rounded-xl border border-white/12 text-[10px] font-bold uppercase text-white"
        >
          Text
        </a>
        <a
          href={siteTelHref()}
          className="flex min-h-[48px] flex-1 items-center justify-center rounded-xl border border-white/12 text-[10px] font-bold uppercase text-white"
        >
          Call
        </a>
      </div>
    </div>
  );
}
