/**
 * Intro plays once per browser tab session (closing the tab clears it).
 * We use sessionStorage (not localStorage) so it does not persist across sessions.
 */
export const INTRO_SESSION_STORAGE_KEY = "stellar_intro_session" as const;

export const INTRO_VIDEO_WEBM = "/videos/stellar-intro.webm";
export const INTRO_VIDEO_MP4 = "/videos/stellar-intro.mp4";

export type IntroPerfTier = "full" | "reduced";

export const TIMELINE_FULL_MS = {
  total: 5000,
  /** Scene 1: black, particles, headlights */
  scene1End: 1000,
  /** Scene 2: silhouette + sweep */
  scene2End: 2500,
  /** Scene 3: logo + copy */
  scene3End: 4000,
  /** Scene 4: dissolve out */
  exitStart: 4000,
} as const;

export const TIMELINE_REDUCED_MS = {
  total: 2500,
  scene1End: 500,
  scene2End: 1250,
  scene3End: 2000,
  exitStart: 2000,
} as const;

export function getTimelineMs(tier: IntroPerfTier) {
  return tier === "reduced" ? TIMELINE_REDUCED_MS : TIMELINE_FULL_MS;
}

export const PARTICLE_COUNT = { full: 44, reduced: 14 } as const;
