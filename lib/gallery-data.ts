export type GalleryInstallCategory =
  | "Starlight Headliners"
  | "Ambient Lighting"
  | "Custom Audio"
  | "Performance"
  | "Luxury Upgrades"
  | "Mobile Services";

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryInstallCategory;
  /** Short line shown on hover / lightbox */
  caption: string;
  /** Placeholder gradient — swap for uploaded image paths when assets are ready */
  placeholderClass: string;
  /** Lightbox shows a simple before / after split treatment */
  beforeAfter?: boolean;
};

export const GALLERY_CATEGORIES: Array<GalleryInstallCategory | "All"> = [
  "All",
  "Starlight Headliners",
  "Ambient Lighting",
  "Custom Audio",
  "Performance",
  "Luxury Upgrades",
  "Mobile Services",
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "sf-1",
    title: "Constellation headliner",
    category: "Starlight Headliners",
    caption: "Fiber layout mapped before a strand ships — night-sky density tuned to the cabin.",
    placeholderClass: "from-stellar-black via-indigo-950/80 to-stellar-blue/25",
    beforeAfter: true,
  },
  {
    id: "sf-2",
    title: "Ambient cabin suite",
    category: "Ambient Lighting",
    caption: "Even, factory-adjacent glow — no hot spots, no loose trim, app control where it belongs.",
    placeholderClass: "from-purple-950/60 via-stellar-void to-stellar-blue/20",
  },
  {
    id: "al-1",
    title: "Sound stage rebuild",
    category: "Custom Audio",
    caption: "Clean power runs, deadening where it counts, and staging that respects the build.",
    placeholderClass: "from-zinc-900 to-stellar-orange/15",
  },
  {
    id: "al-2",
    title: "Brembo-adjacent stop kit",
    category: "Performance",
    caption: "Pads, lines, and bedding protocol — road manners first, show finish second.",
    placeholderClass: "from-red-950/50 to-stellar-black",
  },
  {
    id: "al-3",
    title: "Executive rear treatment",
    category: "Luxury Upgrades",
    caption: "Soft-touch panels, lighting choreography, and hardware that reads concierge, not catalog.",
    placeholderClass: "from-stellar-void to-amber-950/25",
  },
  {
    id: "ms-1",
    title: "Roadside diagnostics — I-95",
    category: "Mobile Services",
    caption: "Codes, data, and a clear plan before parts — white-glove communication at the vehicle.",
    placeholderClass: "from-slate-950 to-stellar-blue/20",
    beforeAfter: true,
  },
  {
    id: "ms-2",
    title: "Underbody accent — legal set",
    category: "Ambient Lighting",
    caption: "Protected wiring, tucked controllers, and a street-smart map for every zone.",
    placeholderClass: "from-stellar-blue-deep/40 to-stellar-black",
  },
  {
    id: "ms-3",
    title: "Driveability trace",
    category: "Mobile Services",
    caption: "Intermittent faults chased with patience — replace what fails, not what guesses.",
    placeholderClass: "from-emerald-950/40 to-zinc-900",
  },
  {
    id: "lux-1",
    title: "Escalade lighting choreography",
    category: "Luxury Upgrades",
    caption: "Headlamp presence, welcome sequence, and cabin glow tuned for a white Escalade presence.",
    placeholderClass: "from-zinc-950 via-white/5 to-stellar-blue/15",
  },
];

/** Infer install category from live gallery captions for filter chips. */
export function inferGalleryCategoryFromCaption(caption: string | null): GalleryInstallCategory {
  const s = (caption ?? "").toLowerCase();
  if (s.includes("star") || s.includes("fiber") || s.includes("constellation") || s.includes("headliner"))
    return "Starlight Headliners";
  if (s.includes("ambient") || s.includes("underglow") || s.includes("interior light") || s.includes("cabin"))
    return "Ambient Lighting";
  if (s.includes("audio") || s.includes("sound") || s.includes("speaker")) return "Custom Audio";
  if (s.includes("performance") || s.includes("brake") || s.includes("exhaust") || s.includes("suspension"))
    return "Performance";
  if (s.includes("luxury") || s.includes("trim") || s.includes("upgrade") || s.includes("escalade"))
    return "Luxury Upgrades";
  return "Mobile Services";
}
