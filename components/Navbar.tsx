"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_LOGO_PATH, LOGO_ASPECT_HEIGHT, LOGO_ASPECT_WIDTH, SITE, siteTelHref, siteSmsHref } from "@/lib/site";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/quote", label: "Get a Quote" },
  { href: "/reviews", label: "Reviews" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

const chipBase =
  "inline-flex min-h-[40px] shrink-0 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition sm:px-3.5 sm:text-xs";

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
      ? "bg-stellar-black/95 border-b border-stellar-blue/15 shadow-lg shadow-black/40 backdrop-blur-md"
      : "bg-stellar-black/85 backdrop-blur-md md:bg-transparent md:backdrop-blur-none";

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
          <Link href="/" className="flex min-h-[44px] min-w-[44px] items-center" onClick={() => setMenuOpen(false)}>
            <span
              className="relative h-9 w-auto shrink-0"
              style={{ aspectRatio: `${LOGO_ASPECT_WIDTH} / ${LOGO_ASPECT_HEIGHT}` }}
            >
              <Image src={HERO_LOGO_PATH} alt={`${SITE.shortName} logo`} fill className="object-contain" sizes="80px" priority />
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/10 bg-white/5"
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
          <Link href="/" className="flex shrink-0 items-center gap-2 group">
            <span
              className="relative h-10 w-auto shrink-0 rounded-md ring-1 ring-stellar-blue/30"
              style={{ aspectRatio: `${LOGO_ASPECT_WIDTH} / ${LOGO_ASPECT_HEIGHT}` }}
            >
              <Image src={HERO_LOGO_PATH} alt={`${SITE.shortName} logo`} fill className="object-contain p-0.5" sizes="120px" priority />
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">Stellar Customs</span>
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-x-1 gap-y-2">
            <ul className="flex flex-wrap items-center gap-x-1 text-sm text-zinc-400">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="rounded-md px-2.5 py-2 hover:text-stellar-blue">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="ml-2 flex items-center gap-1.5 border-l border-white/10 pl-3">
              <a href={siteTelHref()} className={`${chipBase} border border-stellar-blue/45 bg-stellar-blue/10 text-stellar-blue`}>
                Call
              </a>
              <a href={siteSmsHref()} className={`${chipBase} border border-white/15 text-zinc-200`}>
                Text
              </a>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-stellar-orange">
                <InstagramIcon className="h-[17px] w-[17px]" aria-hidden />
              </a>
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-[#1877F2]">
                <FacebookIcon className="h-[17px] w-[17px]" aria-hidden />
              </a>
            </div>
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
                <span className="font-display text-sm font-bold text-white">Menu</span>
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
                      className="flex min-h-[48px] items-center rounded-xl px-3 text-sm font-semibold uppercase tracking-wider text-zinc-200 hover:bg-white/5 hover:text-stellar-blue"
                      onClick={() => setMenuOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-auto space-y-3 border-t border-white/10 pt-6">
                <Link
                  href="/quote"
                  className="flex min-h-[48px] items-center justify-center rounded-xl bg-white text-sm font-medium text-zinc-950"
                  onClick={() => setMenuOpen(false)}
                >
                  Get My Quote
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <a href={siteTelHref()} className="flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 text-xs font-bold uppercase text-white">
                    Call
                  </a>
                  <a href={siteSmsHref()} className="flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 text-xs font-bold uppercase text-white">
                    Text
                  </a>
                </div>
                <div className="flex justify-center gap-3 pt-2">
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
