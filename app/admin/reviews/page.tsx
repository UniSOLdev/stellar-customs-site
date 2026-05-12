import { createClient } from "@/lib/supabase/server";
import type { ReviewRow } from "@/lib/db/types";
import { deleteReviewAction, upsertReviewAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const input =
  "mt-2 min-h-[48px] w-full rounded-xl border border-white/10 bg-stellar-black/60 px-4 py-3 text-base text-white outline-none focus:border-stellar-blue sm:text-sm";

const card = "rounded-2xl border border-white/10 bg-stellar-surface/50 p-4 sm:p-6";

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase
    .from("reviews")
    .select("id, customer_name, review_text, rating, created_at")
    .order("created_at", { ascending: false });

  const reviews = (data ?? []) as ReviewRow[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Reviews</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Curated testimonials show on the public Reviews page. Pick honest quotes and star ratings guests will
          recognize.
        </p>
      </div>

      {sp.error ? (
        <div className="rounded-xl border border-stellar-orange/40 bg-stellar-orange/10 px-4 py-3 text-sm text-stellar-orange-soft">
          {decodeURIComponent(sp.error)}
        </div>
      ) : null}

      <section className={card}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-stellar-blue">Add review</h2>
        <form action={upsertReviewAction} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Customer name</label>
            <input name="customer_name" required className={input} placeholder="Jamie R." />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Review text</label>
            <textarea name="review_text" required rows={4} className={`${input} resize-none`} placeholder="Quote" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Rating (1–5)</label>
            <select name="rating" defaultValue="5" className={input}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} stars
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="min-h-[52px] w-full rounded-full bg-gradient-to-r from-stellar-blue-deep to-stellar-blue px-6 text-sm font-bold uppercase tracking-widest text-black shadow-glow-button sm:w-auto"
          >
            Save review
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-stellar-blue">Existing</h2>
        {reviews.length === 0 ? (
          <p className="text-sm text-zinc-500">No reviews yet — add your first one above.</p>
        ) : null}
        {reviews.map((r) => (
          <div key={r.id} className={card}>
            <form action={upsertReviewAction} className="space-y-4">
              <input type="hidden" name="id" value={r.id} />
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Customer name</label>
                <input name="customer_name" required defaultValue={r.customer_name} className={input} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Review text</label>
                <textarea
                  name="review_text"
                  required
                  rows={4}
                  defaultValue={r.review_text}
                  className={`${input} resize-none`}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Rating</label>
                <select name="rating" defaultValue={String(r.rating)} className={input}>
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} stars
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="min-h-[48px] w-full rounded-full border border-stellar-blue/40 bg-stellar-blue/10 px-6 text-sm font-bold uppercase tracking-widest text-stellar-blue transition hover:bg-stellar-blue/20"
              >
                Save changes
              </button>
            </form>
            <form action={deleteReviewAction} className="mt-4 border-t border-white/5 pt-4">
              <input type="hidden" name="id" value={r.id} />
              <button
                type="submit"
                className="min-h-[48px] w-full rounded-xl border border-red-500/40 bg-red-500/10 text-sm font-bold uppercase tracking-wider text-red-300 hover:bg-red-500/20"
              >
                Delete
              </button>
            </form>
          </div>
        ))}
      </section>
    </div>
  );
}
