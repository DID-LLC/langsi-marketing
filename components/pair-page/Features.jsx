export default function Features({ content }) {
  return (
    <section id="features" style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        Das bietet Langsi
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {(content.feature_highlights || []).map((feature) => (
          <div key={feature.title} style={{ border: '1px solid #e5e5e5', borderRadius: 8, padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
            <p style={{ color: '#444' }}>{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
