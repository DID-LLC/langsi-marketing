export default function Progress({ content }) {
  const leitnerFeature = (content.feature_highlights || []).find((f) =>
    f.title.includes('Leitner'),
  );

  if (!leitnerFeature) return null;

  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{leitnerFeature.title}</h2>
      <p style={{ color: '#444' }}>{leitnerFeature.body}</p>
    </section>
  );
}
