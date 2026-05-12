"use client";

import { motion } from "framer-motion";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { SITE } from "@/lib/site";

const linkBase =
  "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-stellar-black/40 text-zinc-300 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stellar-blue";

const fbHover =
  "hover:border-[#1877F2]/60 hover:text-[#1877F2] hover:shadow-[0_0_22px_rgba(24,119,242,0.45)]";

const igHover =
  "hover:border-stellar-orange/50 hover:text-stellar-orange hover:shadow-[0_0_20px_rgba(255,107,0,0.35)]";

export function FollowUsLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-4"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-stellar-blue">Follow Us</p>
      <div className="flex flex-wrap items-center gap-3 md:justify-end">
        <motion.a
          href={SITE.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Stellar Customs on Facebook"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className={`${linkBase} ${fbHover}`}
        >
          <FacebookIcon className="h-[18px] w-[18px]" />
        </motion.a>
        <motion.a
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Stellar Customs on Instagram"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className={`${linkBase} ${igHover}`}
        >
          <InstagramIcon className="h-[18px] w-[18px]" />
        </motion.a>
      </div>
    </motion.div>
  );
}
