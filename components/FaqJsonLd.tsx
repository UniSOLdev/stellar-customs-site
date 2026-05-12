import { SITE, SITE_CANONICAL, REGIONAL_PITCH } from "@/lib/site";

const faqs = [
  {
    q: `Does ${SITE.shortName} offer luxury mobile automotive service in South Florida?`,
    a: "Yes. We provide concierge-level on-site diagnostics, lighting installs, and repair visits across Palm Beach, Broward, and Miami-Dade when routes are open — with the same disciplined process we use in Alabama.",
  },
  {
    q: `Can ${SITE.shortName} install a starlight headliner or ambient lighting in Alabama?`,
    a: "We specialize in premium cabin lighting — starlight headliners, ambient layers, and accent programs — routed cleanly with factory-adjacent finishes and transparent timelines.",
  },
  {
    q: "Do you serve Birmingham, Huntsville, or Montgomery with mobile installs?",
    a: `${SITE.shortName} routes mobile luxury automotive work across Alabama, including Birmingham, Huntsville, Montgomery, and the greater Odenville area. Message your address for same-week availability when capacity allows.`,
  },
  {
    q: "How does pricing work for mobile luxury automotive visits?",
    a: "We scope before we wrench: clear findings, a written plan, and agreed pricing before parts and labor move forward — no surprise invoices.",
  },
  {
    q: "What areas do you serve between Florida and Alabama?",
    a: REGIONAL_PITCH,
  },
  {
    q: "Can you diagnose complex electrical or drivability issues on-site?",
    a: "Yes. We combine scan data, road testing when appropriate, and methodical tracing so components are replaced because they failed — not because they were guessed.",
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
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
