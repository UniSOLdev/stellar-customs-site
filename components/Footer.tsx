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
    <footer id="contact" className="border-t border-white/[0.06] bg-[#050506]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4">
            <span
              className="relative h-12 w-auto shrink-0 opacity-90"
              style={{ aspectRatio: `${LOGO_ASPECT_WIDTH} / ${LOGO_ASPECT_HEIGHT}` }}
            >
              <Image src={HERO_LOGO_PATH} alt={`${SITE.shortName} logo`} fill className="object-contain" sizes="96px" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Stellar Customs</p>
              <p className="mt-1 text-xs text-zinc-600">{BRAND_TAGLINE}</p>
            </div>
          </div>

          <div className="grid gap-10 text-sm sm:grid-cols-3 md:max-w-2xl">
            <div className="space-y-2 text-zinc-500">
              <p className="text-xs font-medium text-zinc-400">Contact</p>
              <a href={siteTelHref()} className="block hover:text-white">
                {SITE.phone}
              </a>
              <a href={siteSmsHref()} className="block hover:text-white">
                Text
              </a>
              <a href={`mailto:${SITE.email}`} className="block break-all hover:text-white">
                {SITE.email}
              </a>
              <Link href="/quote" className="block text-white hover:text-zinc-300">
                Get a quote
              </Link>
            </div>
            <div className="space-y-2 text-zinc-500">
              <p className="text-xs font-medium text-zinc-400">Services</p>
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
            <div className="space-y-1 text-zinc-500">
              <p className="text-xs font-medium text-zinc-400">Hours</p>
              {BUSINESS_HOURS.map((row) => (
                <p key={row.label}>
                  {row.label} · {row.hours}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.06] pt-8 text-center text-xs text-zinc-700">
          © {new Date().getFullYear()} {SITE.legalName}
        </div>
      </div>
    </footer>
  );
}
