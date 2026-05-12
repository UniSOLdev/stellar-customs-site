export type GalleryCategory = "Repairs" | "Lighting" | "Custom Work" | "Diagnostics";

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  /** Short line shown on hover / lightbox */
  caption: string;
  /** Placeholder gradient — swap for uploaded image paths when assets are ready */
  placeholderClass: string;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "Brake service",
    category: "Repairs",
    caption: "Pads and rotors with clean hardware — road-ready same visit.",
    placeholderClass: "from-zinc-800 to-stellar-blue/30",
  },
  {
    id: "2",
    title: "Engine bay care",
    category: "Repairs",
    caption: "Fluid services and careful inspection under the hood.",
    placeholderClass: "from-stellar-void to-stellar-orange/20",
  },
  {
    id: "3",
    title: "Ambient cabin lighting",
    category: "Lighting",
    caption: "Even, factory-adjacent glow — no hot spots or loose trim.",
    placeholderClass: "from-purple-900/40 to-stellar-blue/25",
  },
  {
    id: "4",
    title: "Accent & underglow",
    category: "Lighting",
    caption: "Wiring tucked and protected; control where you want it.",
    placeholderClass: "from-stellar-blue-deep/50 to-stellar-black",
  },
  {
    id: "5",
    title: "Headliner starlight",
    category: "Custom Work",
    caption: "Fiber layout planned before a single strand is set.",
    placeholderClass: "from-stellar-black to-orange-900/30",
  },
  {
    id: "6",
    title: "Build consultation",
    category: "Custom Work",
    caption: "Lighting and mechanical work scoped to your goals and budget.",
    placeholderClass: "from-cyan-950/50 to-stellar-void",
  },
  {
    id: "7",
    title: "Driveability check",
    category: "Diagnostics",
    caption: "Codes, data, and road feel — we explain before we replace parts.",
    placeholderClass: "from-red-950/40 to-zinc-900",
  },
  {
    id: "8",
    title: "Electrical tracing",
    category: "Diagnostics",
    caption: "Intermittent faults chased methodically, not guessed away.",
    placeholderClass: "from-emerald-950/30 to-stellar-black",
  },
];
