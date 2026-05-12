export type ReviewSource = "google" | "facebook";

export type Review = {
  id: string;
  name: string;
  quote: string;
  rating: number;
  source: ReviewSource;
  date: string;
};

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Marcus T.",
    quote:
      "Showed up on time, diagnosed the issue in minutes, and had us back on the road same day. Zero upsell.",
    rating: 5,
    source: "google",
    date: "2026-04-02",
  },
  {
    id: "r2",
    name: "Jenna R.",
    quote:
      "Finally a mechanic who explains what actually failed. Pricing matched the estimate exactly.",
    rating: 5,
    source: "facebook",
    date: "2026-03-18",
  },
  {
    id: "r3",
    name: "DeShawn K.",
    quote:
      "Interior LED install looks factory. Clean wiring, professional attitude — this is the new standard.",
    rating: 5,
    source: "google",
    date: "2026-02-27",
  },
  {
    id: "r4",
    name: "Allison P.",
    quote:
      "Mobile service saved my weekend. Brakes feel incredible and the truck tracks straight.",
    rating: 5,
    source: "google",
    date: "2026-02-09",
  },
  {
    id: "r5",
    name: "Tyler W.",
    quote:
      "Honest about what could wait vs. what couldn’t. Rare integrity in this industry.",
    rating: 5,
    source: "facebook",
    date: "2026-01-21",
  },
  {
    id: "r6",
    name: "Chris L.",
    quote:
      "Starlight headliner came out insane. Worth every penny — night drives hit different now.",
    rating: 5,
    source: "facebook",
    date: "2025-12-14",
  },
];
