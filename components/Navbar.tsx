"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HERO_LOGO_PATH, SITE, siteTelHref } from "@/lib/site";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/booking", label: "Booking" },
  { href: "/reviews", label: "Reviews" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

const socialBtn =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-stellar-black/30 text-zinc-400 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const chipBase =
  "inline-flex min-h-[40px] shrink-0 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-3.5 sm:text-xs";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className} focusable="false">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.49a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.24 1.05l-2.2 2.18z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className} focusable="false">
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 3v4M16 3v4M3.5 10h17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className} focusable="false">
      <path d="M12 17.27l5.18 3.13-1.37-5.87L20.5 9.97l-6.01-.51L12 4 9.51 9.46l-6.01.51 4.69 4.56-1.37 5.87L12 17.27z" />
    </svg>
  );
}

export function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${
        solid ? "bg-stellar-black/95 border-b border-stellar-blue/15 shadow-lg shadow-black/40 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
        <Link href="/" className="flex min-h-[44px] w-fit items-center gap-2 shrink-0 group">
          <span className="relative h-10 w-10 overflow-hidden rounded-md ring-1 ring-stellar-blue/30 shadow-glow-blue/50">
            <Image
              src={HERO_LOGO_PATH}
              alt={`${SITE.name} logo`}
              fill
              className="object-contain p-0.5 transition-transform duration-300 group-hover:scale-105"
              sizes="40px"
              priority
            />
          </span>
          <span className="font-display hidden text-sm font-bold tracking-wide text-white sm:block">
            STELLAR<span className="text-stellar-blue">CUSTOMS</span>
          </span>
        </Link>

        <div className="flex w-full flex-col gap-3 sm:ml-auto sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-x-2 sm:gap-y-2 md:gap-x-3">
          <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-[11px] font-medium uppercase tracking-wider text-zinc-300 sm:justify-end sm:text-xs md:text-sm lg:gap-x-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-2 py-2 transition-colors hover:text-stellar-blue sm:min-h-0 sm:min-w-0 sm:px-2.5 sm:py-1.5 md:px-3"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-end sm:gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.2)]"
              title="Open for business"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden />
              Open Now
            </span>

            <motion.a
              href={siteTelHref()}
              aria-label={`Call ${SITE.name} at ${SITE.phone}`}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className={`${chipBase} border border-stellar-blue/45 bg-stellar-blue/10 text-stellar-blue hover:bg-stellar-blue/20 hover:shadow-[0_0_18px_rgba(0,180,255,0.45)] focus-visible:outline-stellar-blue`}
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              <span>Call Now</span>
            </motion.a>

            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/booking"
                className={`${chipBase} border border-stellar-orange/45 bg-stellar-orange/10 text-stellar-orange hover:bg-stellar-orange/20 hover:shadow-[0_0_18px_rgba(255,107,0,0.4)] focus-visible:outline-stellar-orange`}
              >
                <CalendarIcon className="h-3.5 w-3.5" />
                <span>Book Service</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/reviews"
                aria-label={`Reviews — ${SITE.googleRatingLabel} on Google`}
                className={`${chipBase} border border-amber-400/40 bg-amber-400/10 text-amber-300 hover:bg-amber-400/15 hover:shadow-[0_0_18px_rgba(251,191,36,0.32)] focus-visible:outline-amber-300`}
              >
                <StarIcon className="h-3.5 w-3.5" />
                <span className="tabular-nums">{SITE.googleRatingLabel}</span>
                <span className="hidden sm:inline">Reviews</span>
              </Link>
            </motion.div>

            <motion.a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook — Stellar Customs"
              whileHover={{ y: -2 }}
              className={`${socialBtn} hover:border-[#1877F2]/55 hover:text-[#1877F2] hover:shadow-[0_0_18px_rgba(24,119,242,0.55)] focus-visible:outline-[#1877F2]`}
            >
              <FacebookIcon className="h-[17px] w-[17px]" aria-hidden />
            </motion.a>
            <motion.a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram — Stellar Customs"
              whileHover={{ y: -2 }}
              className={`${socialBtn} hidden hover:border-stellar-orange/50 hover:text-stellar-orange hover:shadow-[0_0_18px_rgba(255,107,0,0.35)] focus-visible:outline-stellar-orange sm:inline-flex`}
            >
              <InstagramIcon className="h-[17px] w-[17px]" aria-hidden />
            </motion.a>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
