import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { BookingHelpCta } from "@/components/BookingHelpCta";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book Luxury Mobile Install | South Florida & Alabama",
  description: `Schedule ${SITE.name} — concierge mobile diagnostics, starlight headliners, ambient lighting, and on-site repair across South Florida and Alabama. Transparent quotes.`,
  keywords: [
    "book luxury mobile automotive",
    "starlight headliner install booking",
    "mobile automotive lighting South Florida",
    "Stellar Customs booking Alabama",
  ],
  openGraph: {
    title: `Book Service | ${SITE.shortName}`,
    description: `Reserve a white-glove mobile visit with ${SITE.shortName} — Florida and Alabama routes.`,
  },
};

export default function BookingPage() {
  return (
    <div className="relative min-h-dvh bg-stellar-black pb-40 pt-28 md:pb-24">
      <BookingHelpCta />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Book</p>
        <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Schedule Service</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">
          Tell us about your vehicle and what you need — we&apos;ll follow up with availability and a transparent quote.
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-stellar-blue/15 bg-stellar-surface/30 p-6 shadow-2xl shadow-black/50 backdrop-blur-md sm:p-10 lg:p-12">
              <BookingForm />
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="sticky top-28 space-y-8">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm">
                <h2 className="font-display text-lg font-semibold text-white">What happens next</h2>
                <ol className="mt-5 list-decimal space-y-4 pl-5 text-sm leading-relaxed text-zinc-400">
                  <li>We review your request and route.</li>
                  <li>You receive a time window and estimate range.</li>
                  <li>We arrive on-site prepared — no surprises.</li>
                </ol>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-stellar-void/60 p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Coverage</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  Mobile luxury coverage from Palm Beach and Miami to Birmingham and Huntsville — confirm your address
                  when we reply so we can route the bay efficiently.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
