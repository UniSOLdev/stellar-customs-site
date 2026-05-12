import type { Metadata } from "next";
import Image from "next/image";
import { FollowUsLinks } from "@/components/FollowUsLinks";
import { BUSINESS_HOURS_PLACEHOLDER, HERO_LOGO_PATH, LOGO_ASPECT_HEIGHT, LOGO_ASPECT_WIDTH, SITE, siteTelHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Luxury Mobile Automotive — Florida & Alabama",
  description: `Contact ${SITE.name} — concierge mobile service across South Florida and Alabama. Request a quote, schedule an install, or reach the team for emergency routing.`,
  keywords: [
    "contact Stellar Customs",
    "luxury mobile automotive Miami",
    "mobile mechanic Birmingham",
    "ambient lighting quote Palm Beach",
  ],
  openGraph: {
    title: `Contact | ${SITE.shortName}`,
    description: `Reach ${SITE.shortName} for luxury mobile installs and repair across Florida and Alabama.`,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-dvh bg-stellar-black pb-40 pt-28 md:pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Get in touch</p>
        <h1 className="font-display mt-2 text-4xl font-bold text-white sm:text-5xl">Contact</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Call, email, or message — we serve Odenville and surrounding Alabama with on-site automotive repair and
          custom lighting.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-8 rounded-3xl border border-stellar-blue/15 bg-stellar-surface/40 p-8 shadow-lg shadow-black/30 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <span
                className="relative h-16 w-auto shrink-0 rounded-xl bg-transparent ring-1 ring-stellar-blue/30"
                style={{ aspectRatio: `${LOGO_ASPECT_WIDTH} / ${LOGO_ASPECT_HEIGHT}` }}
              >
                <Image
                  src={HERO_LOGO_PATH}
                  alt={`${SITE.name} logo`}
                  fill
                  className="object-contain p-1 [image-rendering:-webkit-optimize-contrast] bg-transparent drop-shadow-[0_0_1px_rgba(255,255,255,0.07)]"
                  sizes="(max-width: 768px) 192px, 128px"
                  quality={96}
                />
              </span>
              <div>
                <p className="font-display text-lg font-bold text-white">{SITE.name}</p>
                <p className="text-xs uppercase tracking-widest text-zinc-500">Automotive Repair Shop</p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stellar-blue">Phone</p>
                <a
                  href={siteTelHref()}
                  className="mt-1 inline-block min-h-[44px] text-lg font-semibold text-white underline-offset-4 hover:text-stellar-blue hover:underline"
                >
                  {SITE.phone}
                </a>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stellar-blue">Email</p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-1 inline-block min-h-[44px] break-all text-zinc-300 underline-offset-4 hover:text-stellar-blue hover:underline"
                >
                  {SITE.email}
                </a>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stellar-blue">Location</p>
                <p className="mt-1 text-zinc-300">{SITE.location}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stellar-blue">Hours</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{BUSINESS_HOURS_PLACEHOLDER}</p>
            </div>

            <div className="mt-6 border-t border-white/5 pt-6">
              <FollowUsLinks />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-wider text-stellar-blue">Map</p>
            <div className="flex min-h-[280px] flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-stellar-void/80 p-8 text-center text-sm text-zinc-500">
              <p className="max-w-xs">
                Google Maps embed placeholder — open Google Maps, search your business, use <strong>Share → Embed a map</strong>, and paste the iframe code here.
              </p>
              <p className="mt-4 text-xs text-zinc-600">Odenville, AL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
