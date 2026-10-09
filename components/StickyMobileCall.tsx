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
      <div className="pointer-events-auto flex gap-2 rounded-2xl border border-white/[0.1] bg-[#0a0a0c]/90 p-2 backdrop-blur-xl">
        <Link
          href="/quote"
          className="flex min-h-[48px] flex-[2] items-center justify-center rounded-xl bg-white text-sm font-medium text-zinc-950"
        >
          Get a quote
        </Link>
        <a
          href={siteSmsHref()}
          className="flex min-h-[48px] flex-1 items-center justify-center rounded-xl border border-white/10 text-sm text-zinc-300"
        >
          Text
        </a>
        <a
          href={siteTelHref()}
          className="flex min-h-[48px] flex-1 items-center justify-center rounded-xl border border-white/10 text-sm text-zinc-300"
        >
          Call
        </a>
      </div>
    </div>
  );
}
