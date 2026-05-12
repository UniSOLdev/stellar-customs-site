export type ShopProduct = {
  id: string;
  section: "dropship" | "local";
  title: string;
  description: string;
  price: number;
  placeholderClass: string;
};

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "ds-hoodie",
    section: "dropship",
    title: "Stellar Customs Hoodie",
    description: "Heavyweight fleece, oversized fit, reflective print.",
    price: 54.99,
    placeholderClass: "from-zinc-800 to-stellar-blue/20",
  },
  {
    id: "ds-tee",
    section: "dropship",
    title: "Performance Tee",
    description: "Moisture-wicking blend, tagless, electric blue ink.",
    price: 28.99,
    placeholderClass: "from-stellar-void to-stellar-orange/15",
  },
  {
    id: "ds-hat",
    section: "dropship",
    title: "Snapback Hat",
    description: "Structured crown, embroidered logo, flat brim.",
    price: 32.99,
    placeholderClass: "from-neutral-900 to-stellar-blue-deep/30",
  },
  {
    id: "ds-stickers",
    section: "dropship",
    title: "Sticker Pack",
    description: "Weatherproof vinyl — assorted logo marks.",
    price: 12.99,
    placeholderClass: "from-fuchsia-950/40 to-stellar-black",
  },
  {
    id: "local-starlight",
    section: "local",
    title: "Starlight Headliner Kit",
    description: "Fiber kit + driver — professional install available.",
    price: 449.0,
    placeholderClass: "from-indigo-950/60 to-stellar-blue/20",
  },
  {
    id: "local-led-interior",
    section: "local",
    title: "LED Interior Kit",
    description: "App-controlled RGBW strips, vehicle-specific harness options.",
    price: 189.0,
    placeholderClass: "from-violet-950/50 to-cyan-900/20",
  },
  {
    id: "local-install",
    section: "local",
    title: "Installation Package",
    description: "On-site install for lighting & accessories — quote by vehicle.",
    price: 299.0,
    placeholderClass: "from-orange-950/40 to-stellar-void",
  },
];
