/** Quote form — multi-select services and vehicle metadata */

export const VEHICLE_SIZE_OPTIONS = [
  { value: "compact", label: "Compact / Sedan" },
  { value: "midsize", label: "Midsize / Coupe" },
  { value: "suv", label: "SUV / Crossover" },
  { value: "large-suv", label: "Large SUV (3-row, Escalade, Tahoe, etc.)" },
  { value: "truck", label: "Truck / Pickup" },
  { value: "van", label: "Van / Sprinter" },
  { value: "exotic", label: "Exotic / Low-profile" },
] as const;

export const VEHICLE_CONDITION_OPTIONS = [
  { value: "well-maintained", label: "Well maintained — regular care" },
  { value: "average", label: "Average — some wear, usable daily" },
  { value: "neglected", label: "Neglected — needs restoration-level work" },
  { value: "unknown", label: "Not sure — photos will help" },
] as const;

export const FULFILLMENT_PREFERENCE = [
  { value: "mobile", label: "Mobile — come to me" },
  { value: "studio", label: "Studio — drop off for multi-day work" },
  { value: "either", label: "Either — recommend based on scope" },
] as const;

export const QUOTE_SERVICE_OPTIONS = [
  { value: "detailing", label: "Detailing / Maintenance Detail" },
  { value: "interior-detailing", label: "Interior Detail / Deep Reset" },
  { value: "interior-restoration", label: "Interior Restoration" },
  { value: "headliner-repair", label: "Headliner Repair / Replacement" },
  { value: "starlight-headliner", label: "Starlight Headliner" },
  { value: "paint-correction", label: "Paint Correction" },
  { value: "paint-enhancement", label: "Paint Enhancement" },
  { value: "ceramic-coating", label: "Ceramic Coating" },
  { value: "headlight-restoration", label: "Headlight Restoration" },
  { value: "trim-restoration", label: "Trim Restoration" },
  { value: "ambient-lighting", label: "Ambient / Interior Lighting" },
  { value: "stellar-reset", label: "The Stellar Reset (full package)" },
  { value: "maintenance-program", label: "Maintenance Program (after initial service)" },
  { value: "other", label: "Other — describe in notes" },
] as const;
