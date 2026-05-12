import Image from "next/image";
import { HERO_LOGO_PATH, SITE, siteTelHref } from "@/lib/site";
import { FollowUsLinks } from "@/components/FollowUsLinks";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-stellar-blue/10 bg-stellar-void">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg ring-1 ring-stellar-blue/30">
              <Image
                src={HERO_LOGO_PATH}
                alt={`${SITE.name} logo`}
                fill
                className="object-contain p-1"
                sizes="56px"
              />
            </span>
            <div>
              <p className="font-display text-lg font-bold tracking-wide text-white">
                STELLAR<span className="text-stellar-blue">CUSTOMS</span>
              </p>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Automotive Repair Shop · Mobile Mechanic
              </p>
            </div>
          </div>

          <div className="grid gap-10 text-sm text-zinc-400 sm:grid-cols-2 md:max-w-lg md:gap-12">
            <div className="space-y-2 md:text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-stellar-blue">Contact</p>
              <a href={siteTelHref()} className="block min-h-[44px] py-1 hover:text-white md:min-h-0">
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="block min-h-[44px] py-1 break-all hover:text-white md:min-h-0">
                {SITE.email}
              </a>
              <p>{SITE.location}</p>
            </div>
            <FollowUsLinks />
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Stellar Customs LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
