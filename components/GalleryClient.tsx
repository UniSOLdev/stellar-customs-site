"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { GALLERY_ITEMS, type GalleryCategory } from "@/lib/gallery-data";
import type { GalleryImageRow } from "@/lib/db/types";

const FILTERS: Array<GalleryCategory | "All"> = ["All", "Repairs", "Lighting", "Custom Work", "Diagnostics"];

type Props = {
  dbImages: GalleryImageRow[];
  /** Non-null when the gallery query failed (falls back to static masonry). */
  loadError?: string | null;
};

export function GalleryClient({ dbImages, loadError }: Props) {
  const useLive = dbImages.length > 0;
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [activeId, setActiveId] = useState<string | null>(null);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const filteredStatic = useMemo(
    () => (filter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === filter)),
    [filter]
  );

  const activeStatic = activeId ? GALLERY_ITEMS.find((g) => g.id === activeId) : null;
  const activeDb = activeId ? dbImages.find((g) => g.id === activeId) : null;
  const staticIndex = activeStatic ? filteredStatic.findIndex((g) => g.id === activeStatic.id) : -1;
  const dbIndex = activeDb ? dbImages.findIndex((g) => g.id === activeDb.id) : -1;

  const goNeighborStatic = useCallback(
    (dir: -1 | 1) => {
      if (staticIndex < 0 || !filteredStatic.length) return;
      const next = filteredStatic[staticIndex + dir];
      if (next) setActiveId(next.id);
    },
    [staticIndex, filteredStatic]
  );

  const goNeighborDb = useCallback(
    (dir: -1 | 1) => {
      if (dbIndex < 0 || !dbImages.length) return;
      const next = dbImages[dbIndex + dir];
      if (next) setActiveId(next.id);
    },
    [dbIndex, dbImages]
  );

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
      if (e.key === "ArrowRight") {
        if (activeDb) goNeighborDb(1);
        else goNeighborStatic(1);
      }
      if (e.key === "ArrowLeft") {
        if (activeDb) goNeighborDb(-1);
        else goNeighborStatic(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId, activeDb, goNeighborDb, goNeighborStatic]);

  const onLightboxTouchEnd = (e: React.TouchEvent, isDb: boolean) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;
    const p = e.changedTouches[0];
    const dx = p.clientX - start.x;
    const dy = p.clientY - start.y;
    if (dy > 72 && Math.abs(dy) > Math.abs(dx)) {
      setActiveId(null);
      return;
    }
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        if (isDb) goNeighborDb(1);
        else goNeighborStatic(1);
      } else if (isDb) goNeighborDb(-1);
      else goNeighborStatic(-1);
    }
  };

  return (
    <div className="min-h-dvh bg-stellar-black pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Portfolio</p>
        <h1 className="font-display mt-2 text-4xl font-bold text-white sm:text-5xl">Gallery</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          {loadError
            ? "We couldn’t load live photos — showing curated placeholders. Try again in a moment."
            : useLive
              ? "Live photos from your Stellar Customs gallery — tap any shot to open the lightbox."
              : "Masonry layout with lightbox — swap gradient tiles for your photography when assets are uploaded."}
        </p>

        {loadError && !useLive ? (
          <div className="mt-6 rounded-xl border border-stellar-orange/35 bg-stellar-orange/10 px-4 py-3 text-sm text-stellar-orange-soft">
            Gallery sync issue: {loadError}
          </div>
        ) : null}

        {!useLive ? (
          <div className="mt-10 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`min-h-[44px] rounded-full border px-5 py-3 text-xs font-bold uppercase tracking-wider transition ${
                  filter === f
                    ? "border-stellar-blue bg-stellar-blue/20 text-stellar-blue shadow-glow-button"
                    : "border-white/10 bg-stellar-surface/50 text-zinc-400 hover:border-stellar-blue/40 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {useLive
            ? dbImages.map((item) => (
                <motion.button
                  type="button"
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  onClick={() => setActiveId(item.id)}
                  className="group mb-4 w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/5 text-left ring-1 ring-stellar-blue/10"
                >
                  <div className="relative aspect-[3/4] bg-zinc-900">
                    <motion.div
                      initial={{ opacity: 0.9 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={item.image_url}
                        alt={item.caption ?? "Gallery"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-black/40 transition duration-300 group-hover:bg-black/60" />
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stellar-orange">
                        Stellar Customs
                      </span>
                      <span className="mt-1 text-lg font-semibold text-white">{item.caption || "Project"}</span>
                      <p className="mt-2 max-w-[95%] text-sm leading-relaxed text-zinc-200 opacity-0 transition duration-300 group-hover:opacity-100">
                        {item.caption ? "Tap to view larger" : "Gallery image"}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))
            : filteredStatic.map((item) => (
                <motion.button
                  type="button"
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  onClick={() => setActiveId(item.id)}
                  className="group mb-4 w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/5 text-left ring-1 ring-stellar-blue/10"
                >
                  <div className={`relative aspect-[3/4] bg-gradient-to-br ${item.placeholderClass}`}>
                    <motion.div
                      initial={{ opacity: 0.9 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55 }}
                      className="absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-black/40 transition duration-300 group-hover:bg-black/60" />
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stellar-orange">
                        {item.category}
                      </span>
                      <span className="mt-1 text-lg font-semibold text-white">{item.title}</span>
                      <p className="mt-2 max-w-[95%] text-sm leading-relaxed text-zinc-200 opacity-0 transition duration-300 group-hover:opacity-100">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
        </div>
      </div>

      <AnimatePresence>
        {activeDb ? (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveId(null)}
            role="presentation"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-stellar-blue/30 bg-stellar-void shadow-glow-blue"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => {
                const p = e.touches[0];
                touchRef.current = { x: p.clientX, y: p.clientY };
              }}
              onTouchEnd={(e) => onLightboxTouchEnd(e, true)}
              role="dialog"
              aria-modal
              aria-labelledby="lightbox-title-db"
            >
              <div className="relative aspect-video bg-zinc-900">
                <Image
                  src={activeDb.image_url}
                  alt={activeDb.caption ?? "Gallery"}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 to-transparent p-6 sm:p-8">
                  <h2 id="lightbox-title-db" className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {activeDb.caption || "Project"}
                  </h2>
                  <p className="mt-3 text-[11px] text-zinc-500">Swipe horizontally for prev/next · swipe down to close</p>
                </div>
                {dbImages.length > 1 ? (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={(e) => {
                        e.stopPropagation();
                        goNeighborDb(-1);
                      }}
                      className="absolute left-3 top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition hover:border-stellar-blue/50"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={(e) => {
                        e.stopPropagation();
                        goNeighborDb(1);
                      }}
                      className="absolute right-3 top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition hover:border-stellar-blue/50"
                    >
                      →
                    </button>
                  </>
                ) : null}
              </div>
              <div className="flex justify-end border-t border-white/5 p-4">
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className="rounded-full border border-white/10 px-5 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:border-stellar-blue hover:text-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeStatic ? (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveId(null)}
            role="presentation"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-stellar-blue/30 bg-stellar-void shadow-glow-blue"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => {
                const p = e.touches[0];
                touchRef.current = { x: p.clientX, y: p.clientY };
              }}
              onTouchEnd={(e) => onLightboxTouchEnd(e, false)}
              role="dialog"
              aria-modal
              aria-labelledby="lightbox-title-static"
            >
              <div className={`relative aspect-video bg-gradient-to-br ${activeStatic.placeholderClass}`}>
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 to-transparent p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-stellar-orange">{activeStatic.category}</p>
                  <h2 id="lightbox-title-static" className="font-display mt-2 text-2xl font-bold text-white sm:text-3xl">
                    {activeStatic.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">{activeStatic.caption}</p>
                  <p className="mt-4 text-[11px] text-zinc-500">Swipe horizontally for prev/next · swipe down to close</p>
                </div>
                {filteredStatic.length > 1 ? (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={(e) => {
                        e.stopPropagation();
                        goNeighborStatic(-1);
                      }}
                      className="absolute left-3 top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition hover:border-stellar-blue/50"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={(e) => {
                        e.stopPropagation();
                        goNeighborStatic(1);
                      }}
                      className="absolute right-3 top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition hover:border-stellar-blue/50"
                    >
                      →
                    </button>
                  </>
                ) : null}
              </div>
              <div className="flex justify-end border-t border-white/5 p-4">
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className="rounded-full border border-white/10 px-5 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:border-stellar-blue hover:text-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
