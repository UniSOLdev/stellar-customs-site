import type { PortfolioProject } from "./types";

/**
 * Portfolio / before-after projects.
 * Add real jobs only — set published: true when ready to show on site.
 */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [];

export function publishedPortfolio(): PortfolioProject[] {
  return PORTFOLIO_PROJECTS.filter((p) => p.published);
}

export function portfolioForServiceSlug(slug: string): PortfolioProject[] {
  return publishedPortfolio().filter((p) => p.services.some((s) => s === slug));
}

export function portfolioForCity(citySlug: string): PortfolioProject[] {
  return publishedPortfolio().filter(
    (p) => p.city?.toLowerCase().replace(/\s+/g, "-") === citySlug
  );
}
