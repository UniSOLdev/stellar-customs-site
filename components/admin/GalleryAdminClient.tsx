"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { GalleryImageRow } from "@/lib/db/types";
import { createClient } from "@/lib/supabase/client";
import { deleteGalleryImageAction, insertGalleryImageAction } from "@/app/admin/actions";

const card = "rounded-2xl border border-white/10 bg-stellar-surface/50 p-4 sm:p-6";

export function GalleryAdminClient({
  initial,
  queryError,
}: {
  initial: GalleryImageRow[];
  queryError?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState<string | null>(queryError ?? null);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setBusy(true);
    setMessage(null);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setMessage("Session expired — log in again.");
      setBusy(false);
      return;
    }

    const safeName = file.name.replace(/\s+/g, "_");
    const path = `gallery/${user.id}/${Date.now()}_${safeName}`;
    const { error: upErr } = await supabase.storage.from("stellar-gallery").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (upErr) {
      setMessage(upErr.message);
      setBusy(false);
      return;
    }

    const { data: pub } = supabase.storage.from("stellar-gallery").getPublicUrl(path);
    const fd = new FormData();
    fd.set("image_url", pub.publicUrl);
    if (caption.trim()) fd.set("caption", caption.trim());

    const res = await insertGalleryImageAction(fd);
    if (!res.ok) {
      setMessage(res.message ?? "Could not save row.");
      setBusy(false);
      return;
    }

    setCaption("");
    setBusy(false);
    startTransition(() => router.refresh());
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Gallery</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Upload photos to the public gallery. Files live in the{" "}
          <span className="font-semibold text-white">stellar-gallery</span> bucket (public URLs). Deleting removes the
          file and the database row.
        </p>
      </div>

      {(message || queryError) && (
        <div className="rounded-xl border border-stellar-orange/40 bg-stellar-orange/10 px-4 py-3 text-sm text-stellar-orange-soft">
          {message ?? queryError}
        </div>
      )}

      <section className={card}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-stellar-blue">Upload</h2>
        <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Caption (optional)
        </label>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="mt-2 min-h-[48px] w-full max-w-xl rounded-xl border border-white/10 bg-stellar-black/60 px-4 py-3 text-white outline-none focus:border-stellar-blue"
          placeholder="Short label for the shot"
        />
        <label className="mt-6 block">
          <span className="inline-flex min-h-[52px] cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-stellar-blue-deep to-stellar-blue px-8 text-sm font-bold uppercase tracking-widest text-black shadow-glow-button">
            {busy ? "Uploading…" : "Choose photo"}
          </span>
          <input type="file" accept="image/*" className="sr-only" onChange={onFileChange} disabled={busy} />
        </label>
      </section>

      <section className={card}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-stellar-blue">Current images</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {initial.map((img) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-stellar-black/40 ring-1 ring-stellar-blue/10"
            >
              <div className="relative aspect-[4/3] bg-zinc-900">
                <Image src={img.image_url} alt={img.caption ?? "Gallery"} fill className="object-cover" sizes="400px" />
              </div>
              <div className="space-y-2 p-4">
                <p className="text-sm text-zinc-300">{img.caption ?? "—"}</p>
                <form action={deleteGalleryImageAction}>
                  <input type="hidden" name="id" value={img.id} />
                  <button
                    type="submit"
                    disabled={pending}
                    className="w-full min-h-[48px] rounded-xl border border-red-500/40 bg-red-500/10 text-sm font-bold uppercase tracking-wider text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
        {initial.length === 0 ? (
          <p className="mt-6 text-sm text-zinc-500">No images yet — upload your first shot above.</p>
        ) : null}
      </section>
    </div>
  );
}
