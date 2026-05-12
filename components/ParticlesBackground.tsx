"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type ParticlesBackgroundProps = {
  /** Fewer, subtler specks for hero-only polish. */
  density?: "default" | "sparse";
  className?: string;
};

/** Minimal drifting particles — performance-friendly (no canvas). */
export function ParticlesBackground({
  density = "default",
  className = "",
}: ParticlesBackgroundProps) {
  const count = density === "sparse" ? 14 : 28;
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(Math.sin(i * 1.7) * 0.5 + 0.5) * 100}%`,
        top: `${(i * 37) % 100}%`,
        size: 1 + (i % 3),
        duration: 12 + (i % 8),
        delay: (i % 10) * 0.4,
        opacity:
          density === "sparse"
            ? 0.04 + (i % 4) * 0.015
            : 0.08 + (i % 5) * 0.02,
      })),
    [count, density]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
      aria-hidden
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-stellar-blue"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: "0 0 6px rgba(58,160,255,0.35)",
          }}
          animate={{
            y: [0, -24, 0],
            x: [0, 8, -5, 0],
            opacity: [p.opacity, p.opacity * 1.6, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
