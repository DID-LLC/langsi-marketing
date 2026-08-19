// Plain server component — only used on the 11 /{source}/th/ pair pages,
// where pair_faq is real, rendered content (see FAQ.jsx). Root and the 11
// /{source}/ hub pages have no FAQ section, so they never render this.
export default function FAQPageSchema({ content }) {
  const faq = content.pair_faq || [];
  if (!faq.length) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
