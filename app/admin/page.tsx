import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [gallery, services, products, reviews, bookings] = await Promise.all([
    supabase.from("gallery_images").select("id", { count: "exact", head: true }),
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("reviews").select("id", { count: "exact", head: true }),
    supabase.from("bookings").select("id", { count: "exact", head: true }),
  ]);

  const cards = [
    { label: "Gallery images", count: gallery.count ?? 0, href: "/admin/gallery" },
    { label: "Services", count: services.count ?? 0, href: "/admin/services" },
    { label: "Products", count: products.count ?? 0, href: "/admin/products" },
    { label: "Reviews", count: reviews.count ?? 0, href: "/admin/reviews" },
    { label: "Bookings", count: bookings.count ?? 0, href: "/admin/bookings" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Eli-friendly controls: big tap targets, simple cards. Tap a row to jump in and manage content.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-2xl border border-white/10 bg-stellar-surface/60 p-6 shadow-lg shadow-black/30 ring-1 ring-stellar-blue/10 transition hover:border-stellar-blue/40 hover:ring-stellar-blue/30"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-stellar-blue">{c.label}</p>
            <p className="mt-3 font-display text-4xl font-bold text-white">{c.count}</p>
            <p className="mt-4 text-sm font-semibold text-stellar-orange">Open →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
