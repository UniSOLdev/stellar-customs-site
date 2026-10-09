"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE, siteTelHref, siteSmsHref } from "@/lib/site";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";

const links = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Work" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6" aria-hidden>
      <span
        className={`absolute left-0 top-1 h-0.5 w-6 bg-white transition-transform duration-200 ${open ? "top-[9px] rotate-45" : ""}`}
      />
      <span className={`absolute left-0 top-[9px] h-0.5 w-6 bg-white transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
      <span
        className={`absolute left-0 top-[17px] h-0.5 w-6 bg-white transition-transform duration-200 ${open ? "top-[9px] -rotate-45" : ""}`}
      />
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const headerBg =
    solid || menuOpen
      ? "border-b border-white/[0.07] bg-[#070708]/90 backdrop-blur-xl"
      : "bg-[#050506]/72 backdrop-blur-lg md:bg-transparent";

  return (
    <>
      <motion.header
        id="site-header"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${headerBg}`}
      >
        {/* Mobile: single compact bar */}
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-auto sm:px-6 sm:py-4 lg:px-8 md:hidden">
          <Link href="/" className="flex min-h-[44px] items-center text-sm font-semibold tracking-tight text-white" onClick={() => setMenuOpen(false)}>
            Stellar Customs
          </Link>
          <button
            type="button"
            className="inline-flex min-h-[42px] min-w-[42px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <MenuIcon open={menuOpen} />
          </button>
        </nav>

        {/* Desktop */}
        <nav className="mx-auto hidden max-w-7xl flex-row items-center justify-between gap-4 px-6 py-4 lg:px-8 md:flex">
          <Link href="/" className="text-sm font-semibold tracking-tight text-white">
            Stellar Customs
          </Link>

          <div className="flex items-center gap-5">
            <ul className="flex items-center gap-1 text-sm text-zinc-500">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="rounded-lg px-3 py-2 transition hover:bg-white/[0.04] hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/quote" className="rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200">
              Request a quote
            </Link>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[105] bg-black/70 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              id="mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              className="fixed inset-y-0 right-0 z-[110] flex w-[min(100vw,320px)] flex-col border-l border-white/10 bg-stellar-black/98 px-5 pb-8 pt-[max(1rem,env(safe-area-inset-top))] shadow-2xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Stellar Customs</span>
                <button
                  type="button"
                  className="min-h-[44px] min-w-[44px] rounded-lg border border-white/10 text-sm text-zinc-400"
                  onClick={() => setMenuOpen(false)}
                >
                  Close
                </button>
              </div>

              <ul className="mt-8 flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="flex min-h-[48px] items-center rounded-xl px-3 text-base text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-auto space-y-4 border-t border-white/10 pt-6">
                <Link
                  href="/quote"
                  className="flex min-h-[48px] items-center justify-center rounded-xl bg-white text-sm font-medium text-zinc-950"
                  onClick={() => setMenuOpen(false)}
                >
                  Request a quote
                </Link>
                <p className="text-center text-sm text-zinc-500">
                  <a href={siteTelHref()} className="text-zinc-400 hover:text-white">
                    {SITE.phone}
                  </a>
                  <span className="mx-2 text-zinc-700" aria-hidden>
                    ·
                  </span>
                  <a href={siteSmsHref()} className="text-zinc-400 hover:text-white">
                    Text
                  </a>
                </p>
                <div className="flex justify-center gap-3 pt-1">
                  <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-stellar-orange">
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                  <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#1877F2]">
                    <FacebookIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
