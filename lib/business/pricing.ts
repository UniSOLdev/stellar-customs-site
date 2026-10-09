/**
 * Central pricing guardrails — edit here; UI reads via helpers in services-catalog.
 * Condition, size, and customization always affect final quotes.
 */

export type PricingCatalog = {
  detailMaintenance: string;
  detailInteriorReset: string;
  detailFull: string;
  detailDeepRestoration: string;
  paintEnhancement: string;
  paintCorrection: string;
  ceramicEntry: string;
  ceramicMultiYear: string;
  starlightHeadliner: string;
};

export const PRICING: PricingCatalog = {
  detailMaintenance: "Starting around $149",
  detailInteriorReset: "Starting around $199",
  detailFull: "Starting around $249–$299",
  detailDeepRestoration: "Starting around $349+",
  paintEnhancement: "Starting around $499+",
  paintCorrection: "Quote based on paint condition",
  ceramicEntry: "Starting around $799+",
  ceramicMultiYear: "Approximately $1,199–$1,599+",
  starlightHeadliner: "Starting around $999+ · vehicle-specific quote required",
};

export function priceLabel(key: keyof PricingCatalog): string {
  return PRICING[key];
}
