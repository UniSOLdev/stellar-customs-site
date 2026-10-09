import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { BookingHelpCta } from "@/components/BookingHelpCta";
import { SITE, absoluteUrl, BRAND_TAGLINE } from "@/lib/site";
import { STELLAR_STUDIO } from "@/lib/business/studio";

export const metadata: Metadata = {
  title: "Get a Quote | Mobile Detailing & Restoration — Palm Beach County",
  description: `Request a quote from ${SITE.shortName} — ${BRAND_TAGLINE} Mobile detailing, restoration, ceramic coating, and custom interiors in Palm Beach County.`,
  alternates: { canonical: "/quote" },
  openGraph: {
    title: `Get My Quote | ${SITE.shortName}`,
    url: absoluteUrl("/quote"),
  },
};

export default function QuotePage() {
  return (
    <div className="relative min-h-dvh bg-stellar-black pb-40 pt-28 md:pb-24">
      <BookingHelpCta />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Quote</p>
        <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Get My Quote</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">
          Tell us about your vehicle, your city, and what you want done. Upload photos for headliners, interior
          restoration, and paint — we quote from real condition, not flat menu prices.
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-stellar-blue/15 bg-stellar-surface/30 p-6 sm:p-10 lg:p-12">
              <QuoteForm />
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="sticky top-28 space-y-8">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
                <h2 className="font-display text-lg font-semibold text-white">What happens next</h2>
                <ol className="mt-5 list-decimal space-y-4 pl-5 text-sm text-zinc-400">
                  <li>We review your vehicle, services, and photos.</li>
                  <li>You receive scope, timeframe, and pricing — no race-to-the-bottom menus.</li>
                  <li>Mobile visit or studio booking based on the job.</li>
                </ol>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-stellar-void/60 p-8 text-sm text-zinc-400">
                <p className="text-xs font-semibold uppercase tracking-wider text-stellar-blue">Mobile</p>
                <p className="mt-2">We come to you — ideal for maintenance, full details, and many interior jobs.</p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-stellar-orange">Studio</p>
                <p className="mt-2">
                  {STELLAR_STUDIO.published
                    ? `${STELLAR_STUDIO.name} — ${STELLAR_STUDIO.areaLabel}`
                    : `Studio (${STELLAR_STUDIO.areaLabel}) — starlights, correction, ceramic, and multi-day restoration.`}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
