import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { ProductRow } from "@/lib/db/types";
import { deleteProductAction, upsertProductAction } from "@/app/admin/actions";
import { ProductImageForm } from "@/components/admin/ProductImageForm";

export const dynamic = "force-dynamic";

const input =
  "mt-2 min-h-[48px] w-full rounded-xl border border-white/10 bg-stellar-black/60 px-4 py-3 text-base text-white outline-none focus:border-stellar-blue sm:text-sm";

const card = "rounded-2xl border border-white/10 bg-stellar-surface/50 p-4 sm:p-6";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("id, name, description, price, image_url, created_at")
    .order("created_at", { ascending: false });

  const products = (data ?? []) as ProductRow[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Products</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Powers the public Shop page. Upload crisp photos — they land in <span className="text-white">stellar-products</span> with public URLs.
        </p>
      </div>

      {sp.error ? (
        <div className="rounded-xl border border-stellar-orange/40 bg-stellar-orange/10 px-4 py-3 text-sm text-stellar-orange-soft">
          {decodeURIComponent(sp.error)}
        </div>
      ) : null}

      <section className={card}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-stellar-blue">Add product</h2>
        <form action={upsertProductAction} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Name</label>
            <input name="name" required className={input} placeholder="LED Interior Kit" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Description</label>
            <textarea name="description" rows={3} className={`${input} resize-none`} placeholder="What’s included" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Price label</label>
            <input name="price" className={input} placeholder="$189" />
          </div>
          <button
            type="submit"
            className="min-h-[52px] w-full rounded-full bg-gradient-to-r from-stellar-blue-deep to-stellar-blue px-6 text-sm font-bold uppercase tracking-widest text-black shadow-glow-button sm:w-auto"
          >
            Save product
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-stellar-blue">Existing</h2>
        {products.length === 0 ? (
          <p className="text-sm text-zinc-500">No products yet — add your first one above.</p>
        ) : null}
        {products.map((p) => (
          <div key={p.id} className={card}>
            <div className="grid gap-6 lg:grid-cols-[160px_1fr]">
              <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
                {p.image_url ? (
                  <Image src={p.image_url} alt={p.name} fill className="object-cover" sizes="160px" />
                ) : (
                  <div className="flex h-full items-center justify-center p-2 text-center text-xs text-zinc-500">
                    No photo yet
                  </div>
                )}
              </div>
              <div>
                <form action={upsertProductAction} className="space-y-4">
                  <input type="hidden" name="id" value={p.id} />
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Name</label>
                    <input name="name" required defaultValue={p.name} className={input} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      defaultValue={p.description ?? ""}
                      className={`${input} resize-none`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Price label</label>
                    <input name="price" defaultValue={p.price ?? ""} className={input} />
                  </div>
                  <input type="hidden" name="image_url" value={p.image_url ?? ""} />
                  <button
                    type="submit"
                    className="min-h-[48px] rounded-full border border-stellar-blue/40 bg-stellar-blue/10 px-6 text-sm font-bold uppercase tracking-widest text-stellar-blue transition hover:bg-stellar-blue/20"
                  >
                    Save text changes
                  </button>
                </form>
                <ProductImageForm productId={p.id} />
                <form action={deleteProductAction} className="mt-6 border-t border-white/5 pt-4">
                  <input type="hidden" name="id" value={p.id} />
                  <button
                    type="submit"
                    className="min-h-[48px] w-full rounded-xl border border-red-500/40 bg-red-500/10 text-sm font-bold uppercase tracking-wider text-red-300 hover:bg-red-500/20"
                  >
                    Delete product
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
