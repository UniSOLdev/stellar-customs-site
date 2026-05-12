import type { IntroPerfTier } from "@/lib/cinematic-intro-config";

/** Client-only: default to full until measured. */
export function detectIntroPerfTier(): IntroPerfTier {
  if (typeof window === "undefined") return "full";

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return "reduced";
  }

  const cores = typeof navigator.hardwareConcurrency === "number" ? navigator.hardwareConcurrency : 8;
  if (cores <= 4) return "reduced";

  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (conn?.saveData === true) return "reduced";
  if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") return "reduced";

  return "full";
}
