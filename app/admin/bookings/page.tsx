import { createClient } from "@/lib/supabase/server";
import type { BookingRow } from "@/lib/db/types";
import { deleteBookingAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const card = "rounded-2xl border border-white/10 bg-stellar-surface/50 p-4 sm:p-6";

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase
    .from("bookings")
    .select("id, name, phone, email, vehicle, service, date, notes, created_at")
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as BookingRow[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Bookings</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Read-only log of requests from the public booking form. Tap delete only if you are clearing spam or a mistake.
        </p>
      </div>

      {sp.error ? (
        <div className="rounded-xl border border-stellar-orange/40 bg-stellar-orange/10 px-4 py-3 text-sm text-stellar-orange-soft">
          {decodeURIComponent(sp.error)}
        </div>
      ) : null}

      <section className={card}>
        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <th className="py-3 pr-4">When</th>
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Phone</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Vehicle</th>
                <th className="py-3 pr-4">Service</th>
                <th className="py-3 pr-4">Date</th>
                <th className="py-3 pr-4">Notes</th>
                <th className="py-3"> </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b.id} className="border-b border-white/5 align-top text-zinc-300">
                  <td className="py-4 pr-4 text-xs text-zinc-500">
                    {new Date(b.created_at).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}
                  </td>
                  <td className="py-4 pr-4">{b.name ?? "—"}</td>
                  <td className="py-4 pr-4">{b.phone ?? "—"}</td>
                  <td className="py-4 pr-4">{b.email ?? "—"}</td>
                  <td className="py-4 pr-4">{b.vehicle ?? "—"}</td>
                  <td className="py-4 pr-4">{b.service ?? "—"}</td>
                  <td className="py-4 pr-4">{b.date ?? "—"}</td>
                  <td className="py-4 pr-4 max-w-[200px] whitespace-pre-wrap text-xs">{b.notes ?? "—"}</td>
                  <td className="py-4">
                    <form action={deleteBookingAction}>
                      <input type="hidden" name="id" value={b.id} />
                      <button
                        type="submit"
                        className="min-h-[44px] rounded-lg border border-red-500/30 px-3 text-xs font-bold uppercase tracking-wider text-red-300 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 ? (
          <p className="mt-6 text-sm text-zinc-500">No bookings yet — they appear when customers submit the form.</p>
        ) : null}
      </section>
    </div>
  );
}
