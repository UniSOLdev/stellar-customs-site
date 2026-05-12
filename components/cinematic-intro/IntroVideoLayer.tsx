"use client";

import { useEffect, useState } from "react";
import { INTRO_VIDEO_MP4, INTRO_VIDEO_WEBM } from "@/lib/cinematic-intro-config";

type Props = {
  /** After intro mounts + one frame — lazy attach. */
  mountVideo: boolean;
  className?: string;
};

/**
 * Optional background reel. 404 or decode error → hidden; CSS layers remain.
 */
export function IntroVideoLayer({ mountVideo, className }: Props) {
  const [show, setShow] = useState(false);
  const [dead, setDead] = useState(false);

  useEffect(() => {
    if (!mountVideo || dead) return;
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, [mountVideo, dead]);

  if (!show || dead) return null;

  return (
    <video
      className={className}
      muted
      playsInline
      preload="none"
      autoPlay
      loop
      onError={() => setDead(true)}
      aria-hidden
    >
      <source src={INTRO_VIDEO_WEBM} type="video/webm" />
      <source src={INTRO_VIDEO_MP4} type="video/mp4" />
    </video>
  );
}
