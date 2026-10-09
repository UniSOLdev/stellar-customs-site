/**
 * Studio location — activate when lease is finalized.
 * Set `published: true` and fill address/hours/map when ready.
 */

export const STELLAR_STUDIO = {
  published: false,
  name: "Stellar Customs Studio",
  areaLabel: "West Palm Beach / Riviera Beach",
  streetAddress: "" as string,
  city: "West Palm Beach",
  region: "FL",
  postalCode: "" as string,
  googleMapsUrl: "" as string,
  googleMapsEmbedUrl: "" as string,
  hours: [] as { label: string; hours: string }[],
  bookingNote:
    "Multi-day restoration, paint correction, ceramic coatings, and custom interior work are completed in-studio when disassembly or controlled environment is required.",
} as const;
