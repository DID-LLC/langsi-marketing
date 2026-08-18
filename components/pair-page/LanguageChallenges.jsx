export default function LanguageChallenges({ content }) {
  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        Besonderheiten der thailändischen Sprache
      </h2>
      <ul style={{ paddingLeft: '1.25rem', color: '#444' }}>
        {(content.language_specific_challenges || []).map((challenge) => (
          <li key={challenge} style={{ marginBottom: '0.75rem' }}>
            {challenge}
          </li>
        ))}
      </ul>
    </section>
  );
}
