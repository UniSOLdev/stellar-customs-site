import Image from "next/image";
import Link from "next/link";
import {
  BRAND_TAGLINE,
  BUSINESS_HOURS,
  HERO_LOGO_PATH,
  LOGO_ASPECT_HEIGHT,
  LOGO_ASPECT_WIDTH,
  SITE,
  siteTelHref,
  siteSmsHref,
} from "@/lib/site";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-stellar-blue/10 bg-stellar-void">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4">
            <span
              className="relative h-14 w-auto shrink-0 rounded-lg ring-1 ring-stellar-blue/30"
              style={{ aspectRatio: `${LOGO_ASPECT_WIDTH} / ${LOGO_ASPECT_HEIGHT}` }}
            >
              <Image src={HERO_LOGO_PATH} alt={`${SITE.shortName} logo`} fill className="object-contain p-1" sizes="112px" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-white">
                STELLAR<span className="text-stellar-blue">CUSTOMS</span>
              </p>
              <p className="text-xs uppercase tracking-widest text-zinc-500">{BRAND_TAGLINE}</p>
              <p className="mt-1 text-xs text-zinc-600">Palm Beach County · Mobile &amp; studio</p>
            </div>
          </div>

          <div className="grid gap-10 text-sm text-zinc-400 sm:grid-cols-3 md:max-w-2xl">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-stellar-blue">Contact</p>
              <a href={siteTelHref()} className="block hover:text-white">
                {SITE.phone}
              </a>
              <a href={siteSmsHref()} className="block hover:text-white">
                Text us
              </a>
              <a href={`mailto:${SITE.email}`} className="block break-all hover:text-white">
                {SITE.email}
              </a>
              <Link href="/quote" className="block font-semibold text-stellar-orange hover:text-stellar-orange-soft">
                Get a quote →
              </Link>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-stellar-blue">Services</p>
              <Link href="/services" className="block hover:text-white">
                All services
              </Link>
              <Link href="/mobile-detailing" className="block hover:text-white">
                Mobile detailing
              </Link>
              <Link href="/ceramic-coating" className="block hover:text-white">
                Ceramic coating
              </Link>
              <Link href="/starlight-headliner" className="block hover:text-white">
                Starlight headliner
              </Link>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-stellar-blue">Hours</p>
              {BUSINESS_HOURS.map((row) => (
                <p key={row.label}>
                  <span className="text-zinc-500">{row.label}</span> · {row.hours}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-8 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} {SITE.legalName}. Palm Beach County automotive detailing &amp; customization.
        </div>
      </div>
    </footer>
  );
}
