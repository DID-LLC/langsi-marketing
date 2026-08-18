export default function Problem({ content }) {
  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>
        Das Problem mit klassischem Vokabeltraining
      </h2>
      <p style={{ color: '#444' }}>{content.hero_subline}</p>
    </section>
  );
}
