"use client";

import { motion } from "framer-motion";
import type { IntroPerfTier } from "@/lib/cinematic-intro-config";
import { PARTICLE_COUNT } from "@/lib/cinematic-intro-config";

type Props = {
  tier: IntroPerfTier;
};

/** Deterministic layout from index — no Math.random hydration issues. */
function cell(i: number, n: number) {
  const col = i % Math.ceil(Math.sqrt(n * 2));
  const row = Math.floor(i / Math.ceil(Math.sqrt(n * 2)));
  const x = ((col * 47 + row * 13) % 100) + (i % 7) * 0.3;
  const y = ((row * 41 + i * 19) % 100) + (i % 5) * 0.4;
  const delay = ((i * 0.17) % 1.2) + (i % 5) * 0.04;
  const duration = 2.8 + (i % 6) * 0.35;
  return { x, y, delay, duration };
}

export function IntroParticles({ tier }: Props) {
  const n = PARTICLE_COUNT[tier];
  const items = Array.from({ length: n }, (_, i) => cell(i, n));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-0.5 w-0.5 rounded-full bg-stellar-blue/50 shadow-[0_0_6px_rgba(0,180,255,0.35)]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: "translate3d(-50%, -50%, 0)",
            willChange: "transform, opacity",
          }}
          initial={{ opacity: 0, y: 6 }}
          animate={{
            opacity: [0, 0.55, 0.35, 0.5, 0.25],
            y: [6, -10, -4, -14, -6],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
