export default function FAQ({ content }) {
  return (
    <section id="faq" style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Häufig gestellte Fragen</h2>
      {(content.faq || []).map((item) => (
        <details key={item.q} style={{ marginBottom: '0.75rem', borderBottom: '1px solid #e5e5e5', paddingBottom: '0.75rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 600 }}>{item.q}</summary>
          <p style={{ marginTop: '0.5rem', color: '#444' }}>{item.a}</p>
        </details>
      ))}
    </section>
  );
}
