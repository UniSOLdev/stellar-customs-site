"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HERO_LOGO_PATH, LOGO_ASPECT_HEIGHT, LOGO_ASPECT_WIDTH, SITE, siteTelHref, siteSmsHref } from "@/lib/site";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/quote", label: "Quote" },
  { href: "/reviews", label: "Reviews" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

const chipBase =
  "inline-flex min-h-[40px] shrink-0 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition sm:px-3.5 sm:text-xs";

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
        <Link href="/" className="flex min-h-[44px] w-fit shrink-0 items-center gap-2 group">
          <span
            className="relative h-10 w-auto shrink-0 rounded-md bg-transparent ring-1 ring-stellar-blue/30"
            style={{ aspectRatio: `${LOGO_ASPECT_WIDTH} / ${LOGO_ASPECT_HEIGHT}` }}
          >
            <Image src={HERO_LOGO_PATH} alt={`${SITE.shortName} logo`} fill className="object-contain p-0.5" sizes="120px" priority />
          </span>
          <span className="font-display hidden text-sm font-bold tracking-wide text-white sm:block">
            STELLAR<span className="text-stellar-blue">CUSTOMS</span>
          </span>
        </Link>

        <div className="flex w-full flex-col gap-3 sm:ml-auto sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-2">
          <ul className="flex flex-wrap items-center justify-center gap-x-1 text-[11px] font-medium uppercase tracking-wider text-zinc-300 sm:justify-end sm:text-xs">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-[44px] items-center justify-center rounded-md px-2.5 py-2 hover:text-stellar-blue">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-end">
            <motion.a href={siteTelHref()} whileTap={{ scale: 0.98 }} className={`${chipBase} border border-stellar-blue/45 bg-stellar-blue/10 text-stellar-blue`}>
              Call
            </motion.a>
            <motion.a href={siteSmsHref()} whileTap={{ scale: 0.98 }} className={`${chipBase} border border-white/15 text-zinc-200`}>
              Text
            </motion.a>
            <Link href="/quote" className={`${chipBase} border border-stellar-orange/45 bg-stellar-orange/10 text-stellar-orange`}>
              Get Quote
            </Link>
            <motion.a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-stellar-orange">
              <InstagramIcon className="h-[17px] w-[17px]" aria-hidden />
            </motion.a>
            <motion.a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-[#1877F2]">
              <FacebookIcon className="h-[17px] w-[17px]" aria-hidden />
            </motion.a>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
