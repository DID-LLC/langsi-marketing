export default function Demo({ content }) {
  const demo = content.demo_vocabulary || {};

  if (!demo.word_th) {
    // content/pairs/de-th.json's demo_vocabulary is populated at build time
    // by scripts/fetchBuildTimeContent.mjs (the `prebuild` step). If this
    // renders, prebuild hasn't run — not fabricated placeholder data.
    return (
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Beispiel-Vokabel</h2>
        <p style={{ color: '#888' }}>Demo-Vokabel wird beim Build geladen.</p>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Beispiel-Vokabel</h2>
      <div style={{ border: '1px solid #e5e5e5', borderRadius: 8, padding: '1.5rem' }}>
        <p style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{demo.word_th}</p>
        <p style={{ color: '#666', marginBottom: '0.25rem' }}>{demo.romanization}</p>
        <p style={{ marginBottom: '1rem' }}>{demo.translation_de}</p>

        {(demo.example_sentences || []).map((s) => (
          <div key={s.sentence_variant_key} style={{ marginTop: '0.75rem' }}>
            <p style={{ marginBottom: '0.125rem' }}>{s.sentence_th}</p>
            <p style={{ color: '#666', marginBottom: '0.125rem' }}>{s.transliteration}</p>
            <p style={{ color: '#444' }}>{s.translation_de}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
