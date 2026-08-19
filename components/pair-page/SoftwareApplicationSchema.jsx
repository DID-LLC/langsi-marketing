// Plain server component (no 'use client') — just emits a
// <script type="application/ld+json"> tag, safe to render from any page.
// Prices are the same three tiers RealPricing.jsx displays; that component
// hardcodes its display strings ("0 $", "3,99 $", "7,99 $") rather than
// reading them from content, so the numeric prices here are hardcoded to
// match — keep both in sync if pricing ever changes.
const PLAN_PRICES = { free: '0', single: '3.99', bundle: '7.99' };

export default function SoftwareApplicationSchema({ content }) {
  const P = content.pricing;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Langsi',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: [
      {
        '@type': 'Offer',
        name: P.free_label,
        price: PLAN_PRICES.free,
        priceCurrency: 'USD',
        description: P.free_sub,
      },
      {
        '@type': 'Offer',
        name: P.single_label,
        price: PLAN_PRICES.single,
        priceCurrency: 'USD',
        description: P.single_sub,
      },
      {
        '@type': 'Offer',
        name: P.bundle_label,
        price: PLAN_PRICES.bundle,
        priceCurrency: 'USD',
        description: P.bundle_sub,
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
