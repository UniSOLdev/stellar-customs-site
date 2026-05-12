"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion, useSpring, useMotionValue } from "framer-motion";
import { INTRO_SESSION_STORAGE_KEY, getTimelineMs } from "@/lib/cinematic-intro-config";
import type { IntroPerfTier } from "@/lib/cinematic-intro-config";
import { detectIntroPerfTier } from "@/lib/cinematic-intro-perf";
import { IntroParticles } from "@/components/cinematic-intro/IntroParticles";
import { LogoReveal } from "@/components/cinematic-intro/LogoReveal";
import { IntroVideoLayer } from "@/components/cinematic-intro/IntroVideoLayer";

const OVERLAY_Z = 220;
const EXIT_DURATION_S = { full: 0.95, reduced: 0.5 } as const;

export function CinematicIntro() {
  const reducePref = useReducedMotion();
  const [showIntro, setShowIntro] = useState<boolean | null>(null);
  const [tier, setTier] = useState<IntroPerfTier>("full");
  const [phase, setPhase] = useState(1);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoGate, setVideoGate] = useState(false);
  const timersRef = useRef<number[]>([]);
  const finishedRef = useRef(false);
  const exitCompleteRef = useRef(false);
  const prefersFinePointer =
    typeof window !== "undefined" && window.matchMedia?.("(pointer: fine)").matches === true;

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  }, []);

  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(INTRO_SESSION_STORAGE_KEY) === "1") {
        setShowIntro(false);
        return;
      }
    } catch {
      /* private / disabled storage */
    }
    setShowIntro(true);
  }, []);

  useLayoutEffect(() => {
    if (showIntro !== true) return;
    let t = detectIntroPerfTier();
    if (reducePref) t = "reduced";
    setTier(t);
  }, [showIntro, reducePref]);

  const beginExit = useCallback(
    (reason: "skip" | "timeline") => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      clearTimers();
      try {
        sessionStorage.setItem(INTRO_SESSION_STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      if (reason === "skip") {
        setProgress(1);
      }
      setExiting(true);
    },
    [clearTimers],
  );

  useEffect(() => {
    if (showIntro !== true || exiting || gone) return;
    const id = requestAnimationFrame(() => setVideoGate(true));
    return () => cancelAnimationFrame(id);
  }, [showIntro, exiting, gone]);

  useEffect(() => {
    if (showIntro !== true || gone || exiting) return;
    const tl = getTimelineMs(tier);
    const t0 = performance.now();
    let raf = 0;
    const tick = () => {
      if (finishedRef.current) return;
      const elapsed = performance.now() - t0;
      setProgress(Math.min(1, elapsed / tl.total));
      if (elapsed < tl.total) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [showIntro, tier, exiting, gone]);

  useEffect(() => {
    if (showIntro !== true || gone || exiting) return;
    const tl = getTimelineMs(tier);
    clearTimers();
    const push = (fn: () => void, ms: number) => {
      timersRef.current.push(window.setTimeout(fn, ms));
    };
    push(() => setPhase(2), tl.scene1End);
    push(() => setPhase(3), tl.scene2End);
    push(() => beginExit("timeline"), tl.exitStart);
    return clearTimers;
  }, [showIntro, tier, gone, exiting, beginExit, clearTimers]);

  useEffect(() => {
    if (showIntro !== true || gone) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showIntro, gone]);

  const mouseX = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 52, damping: 28, mass: 0.8 });

  useEffect(() => {
    if (!prefersFinePointer || showIntro !== true || gone) return;
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 14;
      mouseX.set(nx);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, prefersFinePointer, showIntro, gone]);

  if (showIntro === null || showIntro === false || gone) {
    return null;
  }

  const exitDur = EXIT_DURATION_S[tier];
  const useExitBlur = tier === "full";

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-intro"
        role="dialog"
        aria-modal="true"
        aria-label="Site intro"
        className="fixed inset-0 bg-stellar-black"
        style={{
          zIndex: OVERLAY_Z,
          willChange: "opacity, filter",
          pointerEvents: exiting ? "none" : "auto",
        }}
        initial={{ opacity: 1, filter: useExitBlur ? "blur(0px)" : "blur(0px)" }}
        animate={
          exiting
            ? {
                opacity: 0,
                filter: useExitBlur ? "blur(12px)" : "blur(0px)",
              }
            : { opacity: 1, filter: "blur(0px)" }
        }
        transition={{ duration: exitDur, ease: [0.4, 0, 0.2, 1] }}
        onAnimationComplete={() => {
          if (!exiting || exitCompleteRef.current) return;
          exitCompleteRef.current = true;
          setGone(true);
          setShowIntro(false);
        }}
      >
        <IntroVideoLayer
          mountVideo={videoGate && !gone}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14]"
        />

        {/* Distant headlights — layered radials, transform/opacity only in children */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <motion.div
            className="absolute -left-[20%] top-[42%] h-[min(55vw,420px)] w-[min(55vw,420px)] rounded-full bg-white/[0.07]"
            style={{
              filter: "blur(60px)",
              transform: "translate3d(0,0,0)",
            }}
            initial={{ opacity: 0.12, x: "-5%" }}
            animate={{ opacity: [0.12, 0.22, 0.16], x: ["-5%", "2%", "-2%"] }}
            transition={{ duration: tier === "reduced" ? 2.2 : 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-[18%] top-[46%] h-[min(48vw,380px)] w-[min(48vw,380px)] rounded-full bg-stellar-blue/[0.12]"
            style={{
              filter: "blur(52px)",
              transform: "translate3d(0,0,0)",
            }}
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.2, 0.14] }}
            transition={{ duration: tier === "reduced" ? 2 : 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
          <motion.div
            className="absolute bottom-[8%] left-1/2 h-[min(120vw,900px)] w-[min(120vw,900px)] -translate-x-1/2 rounded-full bg-stellar-orange/[0.06]"
            style={{
              filter: "blur(80px)",
              transform: "translate3d(-50%,0,0)",
            }}
            animate={{ opacity: [0.06, 0.1, 0.07], scale: [1, 1.03, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <IntroParticles tier={tier} />

        {/* Scene 2: silhouette + sweep */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
          style={{ x: prefersFinePointer ? smoothX : 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: tier === "reduced" ? 0.45 : 0.75, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          {!prefersFinePointer ? (
            <motion.div
              className="relative h-[38vh] w-[min(96vw,760px)]"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <SilhouetteAndSweep tier={tier} />
            </motion.div>
          ) : (
            <div className="relative h-[38vh] w-[min(96vw,760px)]">
              <SilhouetteAndSweep tier={tier} />
            </div>
          )}
        </motion.div>

        {/* Scene 3–4: logo stack */}
        <div className="absolute inset-0 flex items-center justify-center pt-[min(8vh,4rem)]">
          {phase >= 3 ? <LogoReveal tier={tier} /> : null}
        </div>

        {/* Progress */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.06]"
          aria-hidden
        >
          <div
            className="h-full bg-gradient-to-r from-stellar-blue/20 via-stellar-blue to-stellar-orange/60"
            style={{
              width: `${Math.round(progress * 100)}%`,
              opacity: 0.45 + progress * 0.45,
              transform: "translateZ(0)",
            }}
          />
        </div>

        <button
          type="button"
          onClick={() => beginExit("skip")}
          className="absolute bottom-6 right-4 z-[240] rounded-full border border-white/10 bg-stellar-surface/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 backdrop-blur-sm transition hover:border-stellar-blue/30 hover:text-stellar-blue md:bottom-8 md:right-8"
        >
          Skip Intro
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

function SilhouetteAndSweep({ tier }: { tier: IntroPerfTier }) {
  return (
    <>
      <div
        className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black via-stellar-black/95 to-transparent opacity-[0.92]"
        style={{
          clipPath: "polygon(8% 100%, 12% 38%, 28% 14%, 48% 6%, 72% 14%, 88% 40%, 92% 100%)",
          transform: "translateZ(0)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-t from-stellar-blue/[0.04] via-transparent to-transparent"
        style={{
          clipPath: "polygon(8% 100%, 12% 38%, 28% 14%, 48% 6%, 72% 14%, 88% 40%, 92% 100%)",
          transform: "translateZ(0)",
        }}
      />
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={false}
        style={{ clipPath: "polygon(8% 100%, 12% 38%, 28% 14%, 48% 6%, 72% 14%, 88% 40%, 92% 100%)" }}
      >
        <motion.div
          className="absolute -inset-y-6 -left-1/2 w-[80%] bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-90"
          style={{
            transform: "skewX(-12deg) translateZ(0)",
            filter: tier === "full" ? "blur(1px)" : "none",
          }}
          initial={{ x: "-40%" }}
          animate={{ x: ["-40%", "120%"] }}
          transition={{
            duration: tier === "reduced" ? 1.1 : 1.65,
            ease: [0.22, 1, 0.36, 1],
            repeat: Infinity,
            repeatDelay: tier === "reduced" ? 0.35 : 0.55,
          }}
        />
      </motion.div>
    </>
  );
}
