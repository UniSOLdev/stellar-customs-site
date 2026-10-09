"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Base = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  fullWidthMobile?: boolean;
};

type LinkProps = Base & { href: string; type?: never };
type ButtonProps = Base & { onClick?: () => void; type?: "button" | "submit" };

const base =
  "relative inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium tracking-normal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 min-h-[48px] sm:min-h-[44px]";

const variants = {
  primary:
    "bg-white text-zinc-950 hover:bg-zinc-100 active:bg-zinc-200",
  outline:
    "border border-white/[0.14] bg-white/[0.03] text-white backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/20",
};

export function GlowButton(props: LinkProps | ButtonProps) {
  const v = variants[props.variant ?? "primary"];
  const fw = props.fullWidthMobile ? "w-full sm:w-auto" : "";
  const cls = `${base} ${v} ${fw} ${props.className ?? ""}`.trim();

  if ("href" in props) {
    return (
      <motion.div whileTap={{ scale: 0.99 }} className={props.fullWidthMobile ? "w-full sm:w-auto" : undefined}>
        <Link href={props.href} className={cls}>
          {props.children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button type={props.type ?? "button"} onClick={props.onClick} whileTap={{ scale: 0.99 }} className={cls}>
      {props.children}
    </motion.button>
  );
}
