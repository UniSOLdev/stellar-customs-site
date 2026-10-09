import type { Metadata } from "next";
import Link from "next/link";
import { GlowButton } from "@/components/GlowButton";
import { FollowUsLinks } from "@/components/FollowUsLinks";
import { BUSINESS_HOURS, SITE, siteSmsHref, siteTelHref, absoluteUrl } from "@/lib/site";
import { STELLAR_STUDIO } from "@/lib/business/studio";

export const metadata: Metadata = {
  title: "Contact | Palm Beach County Mobile Detailing",
  description: `Contact ${SITE.shortName} — mobile detailing, restoration, and customization across Palm Beach County. Call, text, or request a quote.`,
  alternates: { canonical: "/contact" },
  openGraph: { title: `Contact | ${SITE.shortName}`, url: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <div className="min-h-dvh bg-stellar-black pb-40 pt-28 md:pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Get in touch</p>
        <h1 className="font-display mt-2 text-4xl font-bold text-white sm:text-5xl">Contact</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Palm Beach County mobile routes — quote-first for restoration, ceramic, and custom interior work.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <GlowButton href="/quote">Get My Quote</GlowButton>
          <a
            href={siteTelHref()}
            className="inline-flex min-h-[48px] items-center rounded-full border border-white/15 px-6 text-sm font-bold uppercase tracking-wider text-white"
          >
            Call {SITE.phone}
          </a>
          <a
            href={siteSmsHref()}
            className="inline-flex min-h-[48px] items-center rounded-full border border-white/15 px-6 text-sm font-bold uppercase tracking-wider text-white"
          >
            Text us
          </a>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-8 rounded-3xl border border-stellar-blue/15 bg-stellar-surface/40 p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stellar-blue">Email</p>
              <a href={`mailto:${SITE.email}`} className="mt-2 block text-zinc-300 hover:text-stellar-blue">
                {SITE.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stellar-blue">Service area</p>
              <p className="mt-2 text-zinc-300">{SITE.location}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stellar-blue">Studio</p>
              <p className="mt-2 text-sm text-zinc-400">
                {STELLAR_STUDIO.published
                  ? `${STELLAR_STUDIO.name} — ${STELLAR_STUDIO.streetAddress}, ${STELLAR_STUDIO.city}`
                  : `${STELLAR_STUDIO.name} (${STELLAR_STUDIO.areaLabel}) — address and map publish when lease is finalized.`}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stellar-blue">Hours</p>
              <ul className="mt-2 space-y-1 text-sm text-zinc-400">
                {BUSINESS_HOURS.map((h) => (
                  <li key={h.label}>
                    {h.label}: {h.hours}
                  </li>
                ))}
              </ul>
            </div>
            <FollowUsLinks />
          </div>

          <div className="rounded-3xl border border-dashed border-white/15 bg-stellar-void/80 p-8 text-sm text-zinc-500">
            <p className="font-semibold text-zinc-400">Map</p>
            <p className="mt-4">
              When the West Palm / Riviera studio opens, embed Google Maps here via{" "}
              <code className="text-zinc-400">lib/business/studio.ts</code> — set{" "}
              <code className="text-zinc-400">published: true</code> and map URLs.
            </p>
            <p className="mt-6">
              Prefer a quote with photos?{" "}
              <Link href="/quote" className="text-stellar-blue hover:underline">
                Get My Quote
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
