import type { Metadata } from "next";
import Link from "next/link";
import { GlowButton } from "@/components/GlowButton";
import { FollowUsLinks } from "@/components/FollowUsLinks";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { CONCIERGE } from "@/lib/concierge-copy";
import { BUSINESS_HOURS, SITE, siteSmsHref, siteTelHref, absoluteUrl } from "@/lib/site";
import { STELLAR_STUDIO } from "@/lib/business/studio";

export const metadata: Metadata = {
  title: "Contact | Palm Beach County Vehicle Care",
  description: `Contact ${SITE.shortName} for mobile detailing, restoration, and customization across Palm Beach County.`,
  alternates: { canonical: "/contact" },
  openGraph: { title: `Contact | ${SITE.shortName}`, url: absoluteUrl("/contact") },
};

function studioLine(): string {
  if (STELLAR_STUDIO.published && STELLAR_STUDIO.streetAddress) {
    return `${STELLAR_STUDIO.name} — ${STELLAR_STUDIO.streetAddress}, ${STELLAR_STUDIO.city}`;
  }
  return `${STELLAR_STUDIO.name} (${STELLAR_STUDIO.areaLabel}). Studio address and hours will be published when our lease is finalized. Until then, we schedule mobile visits and intake for in-studio projects by quote.`;
}

export default function ContactPage() {
  return (
    <div className="min-h-dvh bg-stellar-black pb-24 pt-28 md:pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Contact" title="Speak with our team" description={CONCIERGE.contactIntro} />

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <GlowButton href="/quote">Request a quote</GlowButton>
          <p className="text-sm text-zinc-500">
            Prefer to talk first?{" "}
            <a href={siteTelHref()} className="text-zinc-300 underline-offset-4 hover:text-white hover:underline">
              Call {SITE.phone}
            </a>
            {" · "}
            <a href={siteSmsHref()} className="text-zinc-300 underline-offset-4 hover:text-white hover:underline">
              Send a text
            </a>
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <GlassCard className="space-y-8 p-8 sm:p-10">
            <dl className="space-y-7">
              <div>
                <dt className="text-sm font-medium text-zinc-500">Email</dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${SITE.email}`} className="text-base text-zinc-200 hover:text-white">
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-zinc-500">Service area</dt>
                <dd className="mt-1.5 text-base leading-relaxed text-zinc-300">{SITE.location}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-zinc-500">Studio</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-zinc-400">{studioLine()}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-zinc-500">Hours</dt>
                <dd className="mt-1.5">
                  <ul className="space-y-1 text-sm text-zinc-400">
                    {BUSINESS_HOURS.map((h) => (
                      <li key={h.label}>
                        <span className="text-zinc-500">{h.label}</span>
                        <span className="mx-2 text-zinc-700" aria-hidden>
                          ·
                        </span>
                        {h.hours}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            <FollowUsLinks />
          </GlassCard>

          <GlassCard className="flex flex-col justify-between p-8 sm:p-10">
            <div>
              <p className="text-sm font-medium text-white">Start with a quote</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">{CONCIERGE.quoteIntro}</p>
            </div>
            <p className="mt-8 text-sm text-zinc-600">
              <Link href="/quote" className="text-zinc-300 underline-offset-4 hover:text-white hover:underline">
                Open the quote form
              </Link>
              {" · "}
              <Link href="/services" className="text-zinc-300 underline-offset-4 hover:text-white hover:underline">
                Browse services
              </Link>
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
