import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { GlassCard } from "@/components/ui/GlassCard";
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
    <div className="relative min-h-dvh pb-24 pt-24 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-zinc-500">Quote request</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">Tell us about the vehicle.</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">
          Vehicle details and clear photos help us confirm the correct service, location, and pricing before scheduling.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-8 lg:p-10">
              <QuoteForm />
            </div>
          </div>
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-4">
              <GlassCard>
                <h2 className="text-sm font-medium text-white">After you submit</h2>
                <ol className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-500">
                  <li><span className="mr-2 text-zinc-700">01</span> We review the vehicle and requested work.</li>
                  <li><span className="mr-2 text-zinc-700">02</span> We confirm scope, price range, and timeframe.</li>
                  <li><span className="mr-2 text-zinc-700">03</span> We schedule mobile or studio service.</li>
                </ol>
              </GlassCard>
              <GlassCard>
                <p className="text-sm font-medium text-white">Service location</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                  Mobile service is best for maintenance, full details, and many interior jobs.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                  {STELLAR_STUDIO.published
                    ? `${STELLAR_STUDIO.name} — ${STELLAR_STUDIO.areaLabel}`
                    : "Studio scheduling is used for starlights, paint correction, ceramic protection, and multi-day restoration."}
                </p>
              </GlassCard>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
