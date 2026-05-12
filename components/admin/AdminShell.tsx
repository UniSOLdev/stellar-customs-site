"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOutAction } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/bookings", label: "Bookings" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const Nav = (
    <nav className="flex h-full flex-col gap-1 p-4">
      <Link
        href="/"
        className="mb-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-200 transition hover:border-stellar-blue/40 hover:text-white"
      >
        ← Back to site
      </Link>
      <p className="px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Owner</p>
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
              active
                ? "bg-stellar-blue/20 text-stellar-blue ring-1 ring-stellar-blue/40"
                : "text-zinc-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
      <div className="mt-auto border-t border-white/10 pt-4">
        <form action={signOutAction}>
          <button
            type="submit"
            className="w-full rounded-xl border border-stellar-orange/30 bg-stellar-orange/10 px-4 py-3 text-sm font-bold uppercase tracking-wider text-stellar-orange transition hover:bg-stellar-orange/20"
          >
            Log out
          </button>
        </form>
      </div>
    </nav>
  );

  return (
    <div className="min-h-dvh bg-stellar-black text-white">
      <div className="flex min-h-dvh">
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-stellar-void/95 md:block">{Nav}</aside>

        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-white/10 bg-stellar-void shadow-2xl transition-transform md:hidden ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {Nav}
        </div>

        {open ? (
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/70 md:hidden"
            onClick={() => setOpen(false)}
          />
        ) : null}

        <div className="flex min-h-dvh flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-white/10 bg-stellar-black/80 px-4 py-3 backdrop-blur md:hidden">
            <button
              type="button"
              className="rounded-lg border border-white/15 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white"
              onClick={() => setOpen(true)}
            >
              Menu
            </button>
            <span className="text-xs font-bold uppercase tracking-widest text-stellar-blue">Admin</span>
          </header>

          <div className="flex-1 p-4 sm:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
