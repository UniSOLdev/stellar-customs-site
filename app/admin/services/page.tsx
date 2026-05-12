import { createClient } from "@/lib/supabase/server";
import type { ServiceRow } from "@/lib/db/types";
import { deleteServiceAction, upsertServiceAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const input =
  "mt-2 min-h-[48px] w-full rounded-xl border border-white/10 bg-stellar-black/60 px-4 py-3 text-base text-white outline-none focus:border-stellar-blue sm:text-sm";

const card = "rounded-2xl border border-white/10 bg-stellar-surface/50 p-4 sm:p-6";

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("id, title, description, price, created_at")
    .order("created_at", { ascending: false });

  const services = (data ?? []) as ServiceRow[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Services</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          These power the homepage preview and any future service menus. Keep titles short and prices human-readable
          (e.g. &quot;From $89&quot;).
        </p>
      </div>

      {sp.error ? (
        <div className="rounded-xl border border-stellar-orange/40 bg-stellar-orange/10 px-4 py-3 text-sm text-stellar-orange-soft">
          {decodeURIComponent(sp.error)}
        </div>
      ) : null}

      <section className={card}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-stellar-blue">Add service</h2>
        <form action={upsertServiceAction} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Title</label>
            <input name="title" required className={input} placeholder="Brake inspection" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Description</label>
            <textarea name="description" rows={3} className={`${input} resize-none`} placeholder="What’s included" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Price label</label>
            <input name="price" className={input} placeholder="From $99" />
          </div>
          <button
            type="submit"
            className="min-h-[52px] w-full rounded-full bg-gradient-to-r from-stellar-blue-deep to-stellar-blue px-6 text-sm font-bold uppercase tracking-widest text-black shadow-glow-button sm:w-auto"
          >
            Save new service
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-stellar-blue">Existing</h2>
        {services.length === 0 ? (
          <p className="text-sm text-zinc-500">No rows yet — add your first service above.</p>
        ) : null}
        {services.map((s) => (
          <div key={s.id} className={card}>
            <form action={upsertServiceAction} className="space-y-4">
              <input type="hidden" name="id" value={s.id} />
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Title</label>
                <input name="title" required defaultValue={s.title} className={input} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={s.description ?? ""}
                  className={`${input} resize-none`}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Price label</label>
                <input name="price" defaultValue={s.price ?? ""} className={input} />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="min-h-[48px] flex-1 rounded-full border border-stellar-blue/40 bg-stellar-blue/10 px-6 text-sm font-bold uppercase tracking-widest text-stellar-blue transition hover:bg-stellar-blue/20"
                >
                  Save changes
                </button>
              </div>
            </form>
            <form action={deleteServiceAction} className="mt-4 border-t border-white/5 pt-4">
              <input type="hidden" name="id" value={s.id} />
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
