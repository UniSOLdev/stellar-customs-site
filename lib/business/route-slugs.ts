import { DEDICATED_SERVICE_ROUTES, getServiceBySlug } from "./services-catalog";
import { CITY_PAGES, getCityBySlug } from "./service-areas";

export type ResolvedSlug =
  | { kind: "service"; slug: string }
  | { kind: "city"; slug: string }
  | null;

export function resolveMarketingSlug(slug: string): ResolvedSlug {
  if (getServiceBySlug(slug) && DEDICATED_SERVICE_ROUTES.includes(slug as (typeof DEDICATED_SERVICE_ROUTES)[number])) {
    return { kind: "service", slug };
  }
  if (getCityBySlug(slug)) {
    return { kind: "city", slug };
  }
  return null;
}

export function allMarketingSlugs(): string[] {
  return [...DEDICATED_SERVICE_ROUTES, ...CITY_PAGES.map((c) => c.slug)];
}
