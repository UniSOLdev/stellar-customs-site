"use client";

import { useActionState } from "react";
import { attachProductImageAction } from "@/app/admin/actions";

export function ProductImageForm({ productId }: { productId: string }) {
  const [state, formAction, pending] = useActionState(attachProductImageAction, null);

  return (
    <form action={formAction} encType="multipart/form-data" className="mt-4 space-y-2">
      <input type="hidden" name="product_id" value={productId} />
      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
        Product photo (stellar-products bucket)
      </label>
      <input
        name="image"
        type="file"
        accept="image/*"
        className="block w-full min-h-[48px] text-sm text-zinc-300 file:mr-4 file:rounded-lg file:border-0 file:bg-stellar-blue/20 file:px-4 file:py-2 file:text-sm file:font-bold file:text-stellar-blue"
      />
      <button
        type="submit"
        disabled={pending}
        className="min-h-[44px] rounded-lg border border-white/15 px-4 text-xs font-bold uppercase tracking-wider text-white hover:border-stellar-blue/40 disabled:opacity-50"
      >
        {pending ? "Uploading…" : "Upload / replace image"}
      </button>
      {state && !state.ok && state.message ? (
        <p className="text-xs text-stellar-orange-soft">{state.message}</p>
      ) : null}
      {state?.ok ? <p className="text-xs text-emerald-400">Saved.</p> : null}
    </form>
  );
}
