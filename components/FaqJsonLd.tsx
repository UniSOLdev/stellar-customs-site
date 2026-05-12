import { SITE, SITE_CANONICAL } from "@/lib/site";

const faqs = [
  {
    q: `Does ${SITE.name} offer mobile mechanic service in Odenville, Alabama?`,
    a: "Yes. We provide on-site automotive repair and diagnostics at your location in Odenville and nearby communities, with clear estimates before work begins.",
  },
  {
    q: "Do you install custom automotive lighting in Alabama?",
    a: "We specialize in professional custom lighting installs — interior ambient, accent lighting, and related work — with clean wiring and a factory-adjacent finish.",
  },
  {
    q: "How does pricing work for mobile mechanic visits?",
    a: "We prioritize transparent pricing: we diagnose, explain what failed and why, and agree on the scope before parts and labor. No surprise invoices.",
  },
  {
    q: "What areas do you serve?",
    a: `${SITE.name} serves Odenville, St. Clair County, and surrounding Alabama routes. Message or call to confirm same-week availability for your address.`,
  },
  {
    q: "Can you diagnose complex electrical or drivability issues?",
    a: "Yes. We use methodical diagnostics — codes, data, and road testing when appropriate — so parts are replaced because they are faulty, not guessed.",
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
