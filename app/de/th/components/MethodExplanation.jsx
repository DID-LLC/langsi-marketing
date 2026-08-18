export default function MethodExplanation({ content }) {
  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Wie Langsi Aussprache vermittelt</h2>
      <p style={{ color: '#444' }}>{content.romanization_method}</p>
    </section>
  );
}
