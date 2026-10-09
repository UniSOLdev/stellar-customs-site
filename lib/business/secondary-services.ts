/**
 * Future revenue lines — not promoted on homepage until activated.
 * Toggle `active: true` and add routes when ready.
 */
export const SECONDARY_SERVICE_LINES = [
  { id: "dealership-recon", label: "Dealership reconditioning", active: false },
  { id: "fleet", label: "Fleet services", active: false },
  { id: "property-fleet", label: "Property / client vehicle maintenance", active: false },
  { id: "luxury-maintenance", label: "Exotic / luxury maintenance plans", active: false },
  { id: "marine", label: "Marine detailing & protection", active: false },
  { id: "wraps", label: "Commercial wraps", active: false },
  { id: "concierge-transport", label: "Concierge pickup & drop-off", active: false },
] as const;
