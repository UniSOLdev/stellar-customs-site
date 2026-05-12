"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Base = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  /** Full width on small screens for easier tapping. */
  fullWidthMobile?: boolean;
};

type LinkProps = Base & { href: string; type?: never };
type ButtonProps = Base & { onClick?: () => void; type?: "button" | "submit" };

const base =
  "relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stellar-blue min-h-[48px] sm:min-h-0";

const variants = {
  primary:
    "bg-gradient-to-r from-stellar-blue-deep to-stellar-blue text-black shadow-glow-button animate-pulse-glow transition-shadow duration-300 hover:from-stellar-blue hover:to-cyan-300 hover:shadow-[0_0_32px_rgba(58,160,255,0.4)]",
  outline:
    "border border-stellar-blue/50 bg-stellar-black/40 text-stellar-blue backdrop-blur-sm transition-shadow duration-300 hover:border-stellar-blue hover:bg-stellar-blue/10 hover:shadow-[0_0_24px_rgba(58,160,255,0.22)]",
};

export function GlowButton(props: LinkProps | ButtonProps) {
  const v = variants[props.variant ?? "primary"];
  const fw = props.fullWidthMobile ? "w-full sm:w-auto" : "";
  const cls = `${base} ${v} ${fw} ${props.className ?? ""}`.trim();

  if ("href" in props) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={props.fullWidthMobile ? "w-full sm:w-auto" : undefined}
      >
        <Link href={props.href} className={cls}>
          <span className="relative z-10">{props.children}</span>
          <span
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.35), transparent 55%)",
            }}
          />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={props.type ?? "button"}
      onClick={props.onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cls}
    >
      <span className="relative z-10">{props.children}</span>
    </motion.button>
  );
}
