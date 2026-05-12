import type { Metadata } from "next";
import Link from "next/link";
import { STRIPE_READY } from "@/lib/stripe-placeholder";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure checkout for Stellar Customs — shop orders and lighting products for Alabama customers.",
  robots: { index: false, follow: false },
  openGraph: {
    title: `Checkout | ${SITE.name}`,
    description: "Complete your Stellar Customs order.",
  },
};

export default function CheckoutPage() {
  return (
    <div className="min-h-dvh bg-stellar-black pb-24 pt-28">
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Checkout</p>
        <h1 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">Almost there</h1>
        <p className="mt-4 text-sm text-zinc-400">
          This page reserves space for Stripe Checkout or Payment Element. Wire{" "}
          <code className="text-stellar-orange">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> and a secure server route to
          create Checkout Sessions.
        </p>
        <div
          className={`mt-8 rounded-2xl border p-6 text-sm ${
            STRIPE_READY
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
              : "border-stellar-orange/30 bg-stellar-orange/5 text-zinc-300"
          }`}
        >
          <p className="font-display text-lg font-semibold text-white">Stripe status</p>
          <p className="mt-2">
            {STRIPE_READY
              ? "Stripe keys detected — replace this block with live checkout."
              : "Awaiting configuration — see lib/stripe-placeholder.ts and add your SDK calls."}
          </p>
        </div>
        <Link
          href="/shop"
          className="mt-10 inline-flex text-sm font-bold uppercase tracking-widest text-stellar-blue hover:text-white"
        >
          ← Back to shop
        </Link>
      </div>
    </div>
  );
}
