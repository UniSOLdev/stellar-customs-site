/** Four-pillar offer architecture for Stellar Customs (Palm Beach County). */

export type ServicePillar = "detail" | "restore" | "protect" | "customize";

export type ServiceAvailability = "live" | "future";

export type FulfillmentMode = "mobile" | "studio" | "both";

export type PriceDisplay =
  | { kind: "starting"; amountLabel: string; pricingKey?: keyof import("./pricing").PricingCatalog }
  | { kind: "range"; label: string; pricingKey?: keyof import("./pricing").PricingCatalog }
  | { kind: "quote" };

export type CatalogService = {
  slug: string;
  pillar: ServicePillar;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  whoItsFor: string;
  problemSolved: string;
  expectedResult: string;
  timeframe?: string;
  price: PriceDisplay;
  fulfillment: FulfillmentMode;
  availability: ServiceAvailability;
  /** SEO primary keyword phrase */
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
};

export type CityPage = {
  slug: string;
  name: string;
  county: "Palm Beach County";
  headline: string;
  intro: string;
  localAngle: string;
  neighborhoods?: string[];
  seoTitle: string;
  seoDescription: string;
};

export type PortfolioProject = {
  id: string;
  published: boolean;
  vehicle: { year?: number; make: string; model: string };
  services: string[];
  city?: string;
  beforeImages: string[];
  afterImages: string[];
  description: string;
  customerQuote?: string;
  completedAt?: string;
};
