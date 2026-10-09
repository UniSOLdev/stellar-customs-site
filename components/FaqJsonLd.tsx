import { SITE, SITE_CANONICAL } from "@/lib/site";

const faqs = [
  {
    q: `Does ${SITE.shortName} offer mobile auto detailing in Palm Beach County?`,
    a: "Yes. We provide premium mobile detailing across Palm Beach County — from Jupiter and Wellington to West Palm Beach, Delray, and Boca Raton. We come to homes, offices, and gated communities.",
  },
  {
    q: "Do you only work on exotic cars?",
    a: "No. We work on luxury vehicles and high-value daily drivers — Tahoe, F-150, Honda, Toyota, and everything in between. Condition-based quoting, not exclusionary branding.",
  },
  {
    q: "What is the difference between detailing and restoration?",
    a: "Detailing resets cleanliness and appearance. Restoration repairs or replaces components like headliners, upholstery, faded trim, and oxidized headlights. Many customers start with a detail and move into restoration once issues are identified.",
  },
  {
    q: "Do you install starlight headliners in West Palm Beach?",
    a: "Yes — starlight and custom headliner work is a core specialty, typically completed in-studio with a mobile consult. Request a quote with interior photos for an accurate scope.",
  },
  {
    q: "How does ceramic coating help in Florida?",
    a: "When paint is properly prepped, professional ceramic adds a sacrificial layer that can make maintenance easier and improve resistance to UV, chemicals, and contaminants common in South Florida. Results depend on prep, product, and how the vehicle is maintained.",
  },
  {
    q: "How do I get a quote?",
    a: "Use our quote form with your city, vehicle details, desired services, and photos. We respond with scope and pricing based on size, condition, and labor — not flat car-wash menus.",
  },
];

export function FaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_CANONICAL}/#faq`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
